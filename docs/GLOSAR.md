# Překlad VEXcode IQ (web) do češtiny – zadání pro překladatele

Cíl: nový, srozumitelný český překlad rozhraní a bloků VEXcode IQ (codeiq.vex.com).
Používají ho MALÉ DĚTI (cca 8–12 let) v kroužku programování robotů VEX IQ, pracují s BLOKY.
Stávající oficiální čeština je strojová a často nesmyslná ("Hnací ústrojí", "zvrátit", "Hnutí", "Levá pasáž", "Pohon tanku", "blízko" místo "zavřít").

## Vstup / výstup
- Vstup: JSON pole objektů {"id", "en", "cs_old"}. `en` je zdroj pravdy, `cs_old` je jen pro inspiraci (často špatně).
- Výstup: JSON OBJEKT {id: "nový český text"} pro KAŽDÉ id ze vstupu (nic nevynechávej, počet klíčů musí sedět).
- Zapiš výstup s ensure_ascii=False a ověř v Pythonu, že jde načíst, že sedí počet klíčů a placeholdery (viz níže).
- Pokud je `cs_old` už dobré a přirozené, klidně ho ponech.

## Pravidla
- Placeholdery ZACHOVEJ přesně: %1 %2 … (u bloků to jsou vstupní políčka – můžeš měnit pořadí slov kolem nich, ale každý %N musí zůstat právě jednou), {{name}}, {0}, %s, %d, \n, HTML tagy <b> <a href=...> <br> atd., Markdown.
- Bloky (sekce `blockly`, klíče jako com_block_..., iq_block_...): rozkazovací způsob, 2. os. jednotného čísla (tykání), krátce: "jeď", "otoč se", "čekej", "nastav", "zastav", "přehraj zvuk". Bloky musí být KRÁTKÉ (vejdou se na blok).
- Hodnoty a "reportér" bloky (vrací hodnotu): podstatné jméno, např. "směr podvozku ve stupních", "je stisknuto?".
- Rozevírací volby (com_options_...): krátké slovo, malými písmeny pokud je v angličtině malými: forward → "dopředu", reverse → "dozadu" (u motoru "vzad"? – použij "dozadu"), open → "otevři"/"otevřít" dle kontextu, close → "zavři"/"zavřít", left → "doleva", right → "doprava".
- UI texty (sekce `translations`, `robotconfig`, `examples`, `tutorials`): normální spisovná čeština, vykání v dialozích je OK, ale jednoduše. Názvy tlačítek krátce (Uložit, Otevřít, Zrušit).
- Názvy produktů a značek NEPŘEKLÁDEJ: VEX, VEXcode, VEX IQ, Brain → viz glosář, Python, C++, Blockly, AI Vision… (AI Vision Sensor → "AI kamera (AI Vision)" jen pokud je to UI popis, jinak "senzor AI Vision").
- Technické zkratky ponech (LED, USB, ID, RGB, mm, °, %).
- Žádné vysvětlivky, poznámky ani uvozovky navíc. Jen překlad.

## Glosář (dodržuj JEDNOTNĚ)
- Drivetrain → Podvozek ; drive → jeď ; drive forward/reverse → jeď dopředu/dozadu ; drive for → jeď o
- turn → otoč se ; turn left/right → otoč se doleva/doprava ; turn for → otoč se o ; turn to heading → natoč se na směr ; turn to rotation → natoč se na otočení
- heading → směr ; rotation → otočení ; velocity → rychlost ; drive velocity → rychlost jízdy ; turn velocity → rychlost otáčení
- stopping (mode) → brzdění ; brake → zabrzdit ; coast → volný doběh ; hold → držet pozici ; timeout → časový limit
- Motor → motor ; spin → roztoč ; spin for → otoč o (u motoru: "roztoč %1 %2 o %3 %4") ; spin to position → natoč na pozici ; position → pozice ; current → proud ; torque → síla/točivý moment → "síla" ; power → výkon ; efficiency → účinnost ; temperature → teplota ; max torque → maximální síla
- Motor group → skupina motorů ; Pneumatic → pneumatika (pístek) → použij "pneumatika" ; pump → pumpa ; cylinder → válec ; extend/retract → vysuň/zasuň
- Brain → Brain (mozek robota) → v UI používej "Brain" (děti to tak znají z robota), u bloků "na Brainu"... → zjednoduš: "obrazovka" pro screen
- Controller → ovladač ; button → tlačítko ; joystick/axis → páčka/osa ; pressed → stisknuto ; released → puštěno
- Bumper (Switch) → nárazník ; Touch LED → dotyková LED ; Optical sensor → optický senzor ; Color sensor → senzor barev ; Distance sensor → senzor vzdálenosti ; Gyro → gyroskop ; Inertial → inerciální senzor ; Eye sensor → oční senzor ; Vision sensor → kamera (Vision) ; object → objekt ; found → nalezen ; hue → odstín ; brightness → jas ; bright/dark → světlo/tma
- Looks → Vzhled ; Sound → Zvuk ; Events → Události ; Control → Řízení ; Sensing → Senzory ; Operators → Operátory ; Variables → Proměnné ; My Blocks → Moje bloky ; Comments/Notes → Poznámky ; Console → Konzole ; Print → Vypiš (print → vypiš ; clear screen → vymaž obrazovku ; set cursor → nastav kurzor ; next row → další řádek ; font → písmo ; pen color → barva pera ; fill color → barva výplně ; draw → nakresli)
- when started → když začne program ; when … pressed → když je stisknuto … ; broadcast → pošli zprávu ; broadcast and wait → pošli zprávu a čekej ; when I receive → když dostanu zprávu
- wait → čekej ; wait until → čekej, dokud ; repeat → opakuj ; repeat until → opakuj, dokud ; forever → opakuj stále ; if/then/else → když / pak / jinak ; break → ukonči smyčku ; stop project → ukonči program
- seconds → sekund ; msec → ms ; degrees → stupňů ; turns → otáček ; inches → palců ; mm → mm ; rpm → ot./min ; % → %
- and don't wait → a nečekej ; is done? → je hotovo? ; is moving? → je v pohybu? ; reset → vynuluj (reset timer → vynuluj časovač)
- timer → časovač ; variable → proměnná ; list → seznam ; 2D list → 2D seznam ; project → projekt ; download → nahrát do robota (pozor: "Download" do Brainu = "Nahrát do robota") ; run → spustit ; stop → zastavit ; slot → slot ; device → zařízení ; port → port ; firmware → firmware ; Devices → Zařízení ; Help → Nápověda ; Tutorials → Návody ; Examples → Příklady ; Save → Uložit ; Open → Otevřít ; New → Nový
- Tank Drive → tankové řízení ; Arcade (Left/Right/Split Arcade) → arkádové řízení (levé/pravé/rozdělené)
- Claw → drapák ; Arm → rameno ; Kicker → kopač ; Catapult → katapult ; Intake → nabírání/sběrač
