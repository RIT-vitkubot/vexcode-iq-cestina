// Podstrčí VEXcode lepší češtinu: zachytí JSON.parse, kterým aplikace načítá
// tabulky překladů, a přepíše v nich sekci "cs" hodnotami z preklad.js.
(function () {
  const OV = window.__VEXCODE_CZ__;
  if (!OV || JSON.parse.__vexcz) return;
  const origParse = JSON.parse;
  function patch(r) {
    if (!r || typeof r !== 'object' || !r.cs || !r.en || typeof r.cs !== 'object') return;
    const cs = r.cs;
    const isMain = !!cs.blockly;
    for (const sec in OV) {
      const target = sec === 'robotconfig' ? (!isMain && cs.translations) : (isMain && cs[sec]);
      if (target && typeof target === 'object') Object.assign(target, OV[sec]);
    }
    console.info('[VEXcode CZ] překlad nahrazen');
  }
  const wrapped = function parse(text, reviver) {
    const r = origParse.apply(this, arguments);
    try { if (typeof text === 'string' && text.length > 5000 && text.indexOf('"cs"') !== -1) patch(r); } catch (e) {}
    return r;
  };
  wrapped.__vexcz = true;
  wrapped.toString = () => origParse.toString();
  JSON.parse = wrapped;
})();
