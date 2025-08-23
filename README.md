# MkDocs Documentation Site — Setup & Usage (from `requirements.txt`)

This README explains how to bootstrap, run, and deploy a **MkDocs + Material** documentation site using a pinned `requirements.txt`. It assumes your repo already contains:

```
mkdocs.yml
requirements.txt
/docs
  ├─ index.md
  └─ ...
```

> **Tip:** Always run MkDocs through your current Python (`python -m mkdocs …`) so the same interpreter that installed the plugins is used.

---

## 1) Prerequisites

* Python 3.10+ (works with 3.11/3.12).
* Git installed.
* On Windows, PowerShell or Git Bash; on macOS/Linux, Terminal.

---

## 2) Create & activate a virtual environment

\=== "Windows (PowerShell)"

```powershell
python -m venv .venv
. .venv\Scripts\Activate.ps1
```

\=== "macOS / Linux"

```bash
python3 -m venv .venv
source .venv/bin/activate
```

> To leave the venv later: `deactivate`

---

## 3) Install dependencies from `requirements.txt`

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

> If you see a plugin-missing error later, it usually means it’s not in `requirements.txt` **or** you ran MkDocs with a different Python.

---

## 4) Run the dev server

```bash
python -m mkdocs serve
```

* Open the printed URL (e.g. `http://127.0.0.1:8000/`).
* MkDocs watches `docs/` and `mkdocs.yml` for changes and reloads automatically.

---

## 5) Build the static site

```bash
python -m mkdocs build
```

* Output goes to the `site/` folder.

---

## 6) Project structure (suggested)

```
.
├─ mkdocs.yml
├─ requirements.txt
├─ docs/
│  ├─ index.md
│  ├─ about.md
│  ├─ manuals/
│  │  ├─ ssh-github.md
│  │  └─ flow.md
│  ├─ subjects/
│  │  ├─ programming-methodologies/
│  │  │  ├─ index.md
│  │  │  ├─ syllabus.md
│  │  │  └─ modules/
│  │  │     ├─ module-1.md
│  │  │     ├─ module-2.md
│  │  │     └─ module-3.md
│  │  └─ embedded-systems/
│  │     ├─ index.md
│  │     ├─ syllabus.md
│  │     └─ modules/
│  │        ├─ module-1.md
│  │        ├─ module-2.md
│  │        └─ module-3.md
│  └─ assets/
│     ├─ logo.png           # optional (theme.logo)
│     ├─ favicon.ico        # optional (theme.favicon)
│     └─ styles/
│        └─ overrides.css   # optional (extra_css)
└─ .github/workflows/deploy-docs.yml  # optional
```

---

## 7) License

Add your preferred license (e.g., MIT) at the repo root: `LICENSE`.
=======
# Upv-mecatronica-docs
Official documentation for Mechatronics
