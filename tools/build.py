#!/usr/bin/env python3
"""Sestaví extension: preklad.json -> extension/preklad.js a dist/vexcode-iq-cz-vX.Y.Z.zip.

Spouštěj z kořene repozitáře:  python3 tools/build.py
"""
import json
import pathlib
import re
import sys
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXT = ROOT / "extension"
PH = re.compile(r"%\d+|\{\{[^}]+\}\}|\{\d+\}|%[sd]|</?[a-zA-Z][^>]*>")


def check(data):
    """Základní kontroly – prázdné texty a doslovné \\n."""
    errors = []
    for sec, items in data.items():
        for key, val in items.items():
            if not isinstance(val, str) or not val.strip():
                errors.append(f"{sec}/{key}: prázdný text")
            elif "\\n" in val:
                errors.append(f"{sec}/{key}: doslovné \\n místo nového řádku")
    return errors


def main():
    data = json.loads((ROOT / "preklad.json").read_text(encoding="utf-8"))
    errors = check(data)
    if errors:
        print("\n".join(errors[:50]))
        sys.exit(f"Chyby v preklad.json: {len(errors)}")

    version = json.loads((EXT / "manifest.json").read_text(encoding="utf-8"))["version"]
    (EXT / "preklad.js").write_text(
        "// VYGENEROVÁNO z preklad.json (tools/build.py) – needitovat ručně.\n"
        "window.__VEXCODE_CZ__ = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n",
        encoding="utf-8",
    )

    dist = ROOT / "dist"
    dist.mkdir(exist_ok=True)
    out = dist / f"vexcode-iq-cz-v{version}.zip"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(EXT.iterdir()):
            z.write(f, f"vexcode-iq-cz/{f.name}")

    total = sum(len(v) for v in data.values())
    print(f"v{version}: {total} textů ({', '.join(f'{k} {len(v)}' for k, v in data.items())}) -> {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
