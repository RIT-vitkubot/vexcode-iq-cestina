# Changelog

Formát podle [Keep a Changelog](https://keepachangelog.com/cs/1.1.0/), verze podle [SemVer](https://semver.org/lang/cs/).

## [1.1.0] - 2026-11-26

### Přidáno
- Česká nápověda k blokům – všech 207 stránek (VEXcode pro češtinu nápovědu nemá, zobrazovala se anglicky). Bloky jsou v ní pojmenované novými českými názvy.
- Bloky ostatních platforem VEXcode (V5, EXP, GO, 123, AIM, AIR, CTE, VR) – 852 textů.
- Pojistka v DOM: anglické texty zapsané natvrdo v kódu (klávesové zkratky, monitor senzorů, popisky ikon…) se přepíší podle slovníku. Aktivní jen v češtině, nezasahuje do bloků ani editoru kódu.
- Pravidla překladu nápovědy (`docs/NAPOVEDA_PRAVIDLA.md`).

## [1.0.0] - 2026-11-26

### Přidáno
- První verze rozšíření pro Chrome (Manifest V3) pro `codeiq.vex.com`.
- Nový český překlad 2 931 textů: bloky VEX IQ, rozbalovací volby, menu a dialogy, nastavení zařízení (robot-config), příklady a návody.
- Bloky v rozkazovacím způsobu pro děti („jeď dopředu“, „otoč se doleva“, „opakuj stále“, „když začne program“).
- Glosář a pravidla překladu (`docs/GLOSAR.md`).
- Nástroje: `tools/build.py`, `tools/fetch_bundle.sh`, `tools/test_offline.js`.

[1.1.0]: https://github.com/RIT-vitkubot/vexcode-iq-cestina/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/RIT-vitkubot/vexcode-iq-cestina/releases/tag/v1.0.0
