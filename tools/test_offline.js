// Offline test: pustí extension proti skutečnému main.bundle.js z VEXcode IQ.
//   node tools/test_offline.js cesta/k/main.bundle.js
// (bundle stáhneš přes tools/fetch_bundle.sh)
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const bundlePath = process.argv[2];
if (!bundlePath) { console.error('Použití: node tools/test_offline.js <main.bundle.js>'); process.exit(2); }
const ext = path.join(__dirname, '..', 'extension');

global.window = global;
global.document = { addEventListener() {} };
eval(fs.readFileSync(path.join(ext, 'preklad.js'), 'utf8'));
eval(fs.readFileSync(path.join(ext, 'inject.js'), 'utf8'));

const t = fs.readFileSync(bundlePath, 'utf8');
function parseLiteral(prefix) {
  const st = t.indexOf(prefix);
  assert(st >= 0, 'nenalezeno: ' + prefix);
  let j = st + 12;
  for (;; j++) { if (t[j] === '\\') { j++; continue; } if (t[j] === "'") break; }
  return eval(t.slice(st, j + 2));
}

// 1) hlavní tabulka (bloky + UI)
const main = parseLiteral('JSON.parse(\'{"ar":{"blockly"');
assert.strictEqual(main.cs.translations.drivetrain, 'Podvozek');
assert.strictEqual(main.cs.blockly.com_options_motor_direction_reverse, 'dozadu');
assert.strictEqual(main.cs.blockly.com_events_when_started, 'když začne program');
assert.strictEqual(main.en.translations.Drivetrain, 'Drivetrain', 'angličtina musí zůstat netknutá');

// 2) tabulka robot-config
const rc = parseLiteral('JSON.parse(\'{"ar":{"translations"');
assert.strictEqual(rc.cs.translations.Delete, window.__VEXCODE_CZ__.robotconfig.Delete);

// 3) nápověda k blokům (objekt bez "cs" -> getter)
if (window.__VEXCODE_CZ__.help) {
  const i = t.indexOf('\n/***/ "./src/HelpSystem/helpSystemDataIQ.ts":');
  const s = t.slice(i, t.indexOf('\n/***/ "./', i + 10));
  const data = JSON.parse(s.slice(s.indexOf('var data=') + 9, s.indexOf(';/* harmony default export */')));
  assert(data.cs && data.cs.blocks.drive.markdown.startsWith('# Jeď'), 'česká nápověda');
  assert(!Object.keys(data).includes('cs'), 'getter nesmí být vidět ve for-in');
  assert.strictEqual(({}).cs, undefined, 'cizí objekty nemají cs');
  const o = {}; o.cs = 5; assert.strictEqual(o.cs, 5, 'zápis .cs musí fungovat');
}
console.log('OK – všechny testy prošly');
