# Překlad nápovědy k blokům VEXcode IQ do češtiny

Nápověda (panel „Nápověda“ u bloků) pro děti cca 8–12 let, kroužek VEX IQ. Oficiální čeština neexistuje, zobrazuje se anglicky.

## Vstup/výstup
- Vstup: JSON objekt {id_bloku: "markdown v angličtině"}.
- Výstup: JSON objekt se STEJNÝMI klíči, hodnota = český markdown. Zapiš s ensure_ascii=False.
- Ověř v Pythonu: stejné klíče; každý odkaz na obrázek `![...](cesta)` zachován se STEJNOU cestou (cesty NEMĚŇ, alt text v [] může zůstat); stejný počet nadpisů `#`.

## Pravidla
- Zachovej markdown strukturu (nadpisy, **tučně**, *kurzíva*, odrážky, tabulky, prázdné řádky, `\n`).
- Názvy bloků: když text v **tučném** odkazuje na blok, použij český název bloku z /home/god/.hermes/cache/scratch/vex/r2/bloky_en_cs.json (mapování anglický text bloku → nový český). Např. **drive** → **jeď**, **when started** → **když začne program**, **forever** → **opakuj stále**, **turn for** → **otoč se o**. Placeholdery %1 v názvech vynech.
- Hodnoty z rozbalovacích nabídek (forward/reverse, left/right, brake/coast/hold…) přelož stejně jako na blocích: dopředu/dozadu, doleva/doprava, zabrzdit/volný doběh/držet pozici.
- Tón: jednoduše, srozumitelně, vykání NE – piš neosobně nebo tykej ("Vyber, který motor se má roztočit."). Krátké věty.
- Glosář: Drivetrain → podvozek, Brain → Brain, Controller → ovladač, Touch LED → dotyková LED, Bumper Switch → nárazník, Distance Sensor → senzor vzdálenosti, Optical Sensor → optický senzor, Color Sensor → senzor barev, Gyro → gyroskop, heading → směr, rotation → otočení, velocity → rychlost, torque → síla, Boolean → logická hodnota (pravda/nepravda), true/false → pravda/nepravda, reporter block → hodnotový blok (kulatý), Boolean block → logický blok (šestiúhelníkový), stack block → příkazový blok, C block → blok C, hat block → úvodní blok, parameter → parametr, Example → Příklad, How To Use → Jak používat, project → program/projekt, Python/C++ ponech.
- Žádné poznámky překladatele navíc.
- Pracuj v dávkách (třeba po 5–8 blocích), průběžně ukládej, na konci zapiš finální soubor a ověř.
