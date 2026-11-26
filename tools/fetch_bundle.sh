#!/usr/bin/env bash
# Stáhne main.bundle.js VEXcode IQ z Wayback Machine (živý web je za Cloudflare)
# a rozbalí ho (archiv ho vrací komprimovaný zstd) do raw/main.bundle.js.
#   tools/fetch_bundle.sh [verze]      např. tools/fetch_bundle.sh 4.68.0-50
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p raw
if [ $# -ge 1 ]; then
  url="https://codeiq.vex.com/dist/main.bundle.js?v=$1%3Fv%3D$1"
  ts=2026
else
  # nejnovější archivovaná verze
  read -r url ts < <(curl -s "https://web.archive.org/cdx/search/cdx?url=codeiq.vex.com/dist/main.bundle.js*&fl=original,timestamp&filter=statuscode:200" | sort -k2 | tail -1)
fi
echo "Stahuji $url ($ts)"
curl -sL "https://web.archive.org/web/${ts}id_/${url}" -o raw/main.bundle.raw
if file raw/main.bundle.raw | grep -q Zstandard; then
  zstd -dcf raw/main.bundle.raw > raw/main.bundle.js
else
  mv raw/main.bundle.raw raw/main.bundle.js
fi
ls -la raw/main.bundle.js
