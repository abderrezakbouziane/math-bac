#!/usr/bin/env python3
"""Assemble les sources de src/ en un seul index.html (comme Math3AM).

Usage : python3 build.py
Pour ajouter un chapitre : créer src/ch-xxx.js (et éventuellement src/ch-xxx-ex.js),
l'ajouter à la liste JS ci-dessous, avant app.js.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"

# L'ordre compte : outils, textes, programme, chapitres, puis l'application.
JS = [
    "core.js",
    "i18n.js",
    "program.js",
    "ch-suites.js",
    "ch-suites-ex.js",
    "app.js",
]


def main():
    shell = (SRC / "shell.html").read_text(encoding="utf-8")
    css = (SRC / "style.css").read_text(encoding="utf-8")
    js = "\n".join(f"/* ======== {name} ======== */\n" + (SRC / name).read_text(encoding="utf-8") for name in JS)
    # The JS sources contain "</" sequences only inside strings; "</script" must never appear.
    if "</script" in js.lower():
        raise SystemExit("Erreur : '</script' trouvé dans le JavaScript.")
    out = shell.replace("/*@CSS@*/", css).replace("/*@JS@*/", js)
    (ROOT / "index.html").write_text(out, encoding="utf-8")
    print(f"index.html : {len(out.encode('utf-8')) // 1024} Ko")


if __name__ == "__main__":
    main()
