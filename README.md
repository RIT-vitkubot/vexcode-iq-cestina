# VEXcode IQ – lepší čeština 🇨🇿

Rozšíření pro Google Chrome, které ve webové verzi **[VEXcode IQ](https://codeiq.vex.com)** nahradí oficiální strojový český překlad srozumitelnou češtinou.
Je určené hlavně pro **děti (cca 8–12 let)**, které programují roboty VEX IQ pomocí bloků.

| Originál | S rozšířením |
|---|---|
| Hnací ústrojí | **Podvozek** |
| pohon vpřed / zvrátit | **jeď dopředu / dozadu** |
| když začalo | **když začne program** |
| otočte se na kurz 90 stupňů | **natoč se na směr 90 stupňů** |
| rotace Motor1 vpřed pro 90 stupeň | **roztoč Motor1 dopředu o 90 stupňů** |
| navždy / přerušení | **opakuj stále / ukonči smyčku** |
| Levá pasáž / Pohon tanku | **levé arkádové řízení / tankové řízení** |
| OTEVŘENO / blízko | **otevři / zavři** |
| Utěšit | **Konzole** |
| nápověda k blokům jen anglicky | **česká nápověda (207 stránek)** |

## Instalace

1. Stáhni nejnovější `vexcode-iq-cz-vX.Y.Z.zip` ze stránky **[Releases](../../releases/latest)** a rozbal ho.
2. V Chrome otevři `chrome://extensions` a vpravo nahoře zapni **Režim pro vývojáře**.
3. Klikni na **Načíst rozbalené** a vyber rozbalenou složku `vexcode-iq-cz`.
4. Ve VEXcode IQ přepni jazyk na **Čeština** a obnov stránku (F5).

Aktualizace: stáhni novější zip, ve `chrome://extensions` starou verzi odeber a načti novou.

## Co přesně se překládá

- bloky a rozbalovací volby (všechny platformy VEXcode),
- menu, dialogy, nastavení zařízení (robot-config), příklady a návody,
- nápověda k blokům (VEXcode pro češtinu žádnou nemá),
- texty natvrdo zapsané v kódu (pojistka přes DOM).

Textový režim (Python/C++) se nepřekládá.

## Jak to funguje

Rozšíření běží v kontextu stránky (`world: MAIN`, `document_start`), ještě před aplikací:

1. obalí `JSON.parse`, kterým VEXcode načítá tabulky překladů, a přepíše v nich sekci `cs` – bloky se tak rovnou vykreslí s českým textem a správnou šířkou;
2. nápovědě k blokům (objekt bez češtiny) podstrčí českou verzi přes getter `cs`;
3. zbylé anglické texty na stránce přepíše podle slovníku (jen v češtině, nesahá do bloků ani do editoru kódu).

## Úpravy překladu

Všechny texty jsou v **`preklad.json`** (sekce → klíč VEXcode → český text). Pravidla a glosář jsou v [`docs/GLOSAR.md`](docs/GLOSAR.md).

```bash
python3 tools/build.py                       # vygeneruje extension/preklad.js + dist/*.zip
tools/fetch_bundle.sh                        # stáhne aktuální main.bundle.js VEXcode (do raw/)
node tools/test_offline.js raw/main.bundle.js  # ověří, že náhrada funguje na skutečném kódu
```

Našel jsi špatný nebo nepřeložený text? Založ [issue](../../issues) se screenshotem.

## Verzování

[Semantic Versioning](https://semver.org/lang/cs/): verze v `extension/manifest.json` = git tag `vX.Y.Z`.
Po pushnutí tagu GitHub Actions sestaví zip a vytvoří Release s poznámkami z [`CHANGELOG.md`](CHANGELOG.md).

## Upozornění

Neoficiální projekt, nijak nesouvisí s VEX Robotics / Innovation First International.
VEX, VEXcode a VEX IQ jsou ochranné známky jejich vlastníků. Kód rozšíření je pod licencí MIT.
