// VEXcode IQ – lepší čeština
// 1) Zachytí JSON.parse, kterým VEXcode načítá tabulky překladů, a přepíše sekci "cs".
// 2) Doplní českou nápovědu k blokům (VEXcode ji pro češtinu nemá → jinak anglicky).
// 3) Pojistka: anglické texty, které se i tak objeví na stránce (natvrdo v kódu),
//    přepíše přímo v DOM podle slovníku – jen když je VEXcode přepnutý do češtiny.
(function () {
  const OV = window.__VEXCODE_CZ__;
  if (!OV || window.__VEXCODE_CZ_ON__) return;
  window.__VEXCODE_CZ_ON__ = true;

  // ---------- 1) tabulky překladů ----------
  const origParse = JSON.parse;
  function patchTables(r) {
    if (!r || typeof r !== 'object' || !r.cs || !r.en || typeof r.cs !== 'object') return;
    const cs = r.cs, isMain = !!cs.blockly;
    for (const sec of ['blockly', 'translations', 'examples', 'tutorials', 'robotconfig']) {
      if (!OV[sec]) continue;
      const target = sec === 'robotconfig' ? (!isMain && cs.translations) : (isMain && cs[sec]);
      if (target && typeof target === 'object') Object.assign(target, OV[sec]);
    }
    console.info('[VEXcode CZ] tabulka překladů nahrazena');
  }
  const wrapped = function parse(text) {
    const r = origParse.apply(this, arguments);
    try { if (typeof text === 'string' && text.length > 5000 && text.indexOf('"cs"') !== -1) patchTables(r); } catch (e) {}
    return r;
  };
  wrapped.toString = () => origParse.toString();
  JSON.parse = wrapped;

  // ---------- 2) nápověda k blokům ----------
  // Data nápovědy jsou objekt {en:{blocks,python,cpp}, es:{...}, ...} bez "cs".
  // VEXcode hledá helpData[jazyk]; getterem na Object.prototype podstrčíme češtinu.
  if (OV.help) {
    let helpObj = null;
    const buildHelp = (enData) => {
      if (helpObj) return helpObj;
      const blocks = {};
      for (const k in enData.blocks) {
        const e = enData.blocks[k];
        blocks[k] = OV.help[k] ? Object.assign({}, e, { markdown: OV.help[k] }) : e;
      }
      helpObj = { blocks };
      return helpObj;
    };
    try {
      Object.defineProperty(Object.prototype, 'cs', {
        configurable: true,
        enumerable: false,
        get() {
          const en = this && Object.prototype.hasOwnProperty.call(this, 'en') ? this.en : null;
          if (en && en.blocks && (en.python || en.cpp) && en.blocks.when_started) return buildHelp(en);
          return undefined;
        },
        set(v) {
          Object.defineProperty(this, 'cs', { value: v, writable: true, enumerable: true, configurable: true });
        }
      });
    } catch (e) { console.warn('[VEXcode CZ] nápovědu nešlo napojit', e); }
  }

  // ---------- 3) pojistka v DOM ----------
  const DICT = new Map(Object.entries(OV.dom || {}));
  if (!DICT.size) return;
  const MARKERS = ['když začne program', 'Podvozek', 'Řízení', 'Události'];
  const SKIP = ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'PRE'];
  const ATTRS = ['title', 'placeholder', 'aria-label', 'alt'];
  let czActive = false;
  // bloky (SVG) jsou přeložené přes tabulky – DOM pojistka do nich nesahá, stejně jako do editoru kódu
  const inCode = (el) => el && el.closest && el.closest('.monaco-editor, [contenteditable="true"], svg, .blocklyWidgetDiv input');
  function fixText(node) {
    const v = node.nodeValue;
    if (!v || v.length < 2) return;
    const t = v.trim();
    const cz = DICT.get(t);
    if (cz && cz !== t) {
      const p = node.parentElement;
      if (!p || SKIP.includes(p.tagName) || inCode(p)) return;
      node.nodeValue = v.replace(t, cz);
    }
  }
  function fixEl(el) {
    for (const a of ATTRS) {
      const v = el.getAttribute && el.getAttribute(a);
      if (v) { const cz = DICT.get(v.trim()); if (cz && cz !== v) el.setAttribute(a, cz); }
    }
  }
  function walk(root) {
    if (root.nodeType === 3) return fixText(root);
    if (root.nodeType !== 1 || SKIP.includes(root.tagName) || inCode(root)) return;
    fixEl(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = w.nextNode())) n.nodeType === 3 ? fixText(n) : fixEl(n);
  }
  function checkCz() {
    if (czActive) return true;
    const txt = document.body ? document.body.textContent : '';
    if (MARKERS.some((m) => txt.includes(m))) { czActive = true; walk(document.body); }
    return czActive;
  }
  let queued = new Set(), scheduled = false;
  function flush() {
    scheduled = false;
    const q = queued; queued = new Set();
    if (!checkCz()) return;
    for (const n of q) if (n.isConnected) walk(n);
  }
  function start() {
    new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'childList') m.addedNodes.forEach((n) => queued.add(n));
        else queued.add(m.target);
      }
      if (!scheduled) { scheduled = true; setTimeout(flush, 50); }
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    checkCz();
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
