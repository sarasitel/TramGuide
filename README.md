# TramGuide

Getting started (development)
-----------------------------

This project requires Python 3 and Git. The repository contains helper scripts to start the app quickly on Windows:

- `run_dev.ps1` : PowerShell script that creates a `.venv`, installs dependencies, runs migrations and seeds demo data the first time, then starts the Django dev server.
- `run_dev.bat` : Batch equivalent for Windows CMD.

Typical manual steps (one-time per machine):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py seed_citytram
python manage.py runserver
```

Or simply run the helper script from the project root:

PowerShell:
```powershell
.\run_dev.ps1
```

CMD:
```cmd
run_dev.bat
```

Notes:
- `run_dev.*` performs the heavy setup only once (it creates a marker file `.venv/.initialized`).
- If you need to force a fresh setup, run `.
un_dev.ps1 -ForceSetup` or delete `.venv` and re-run the script.
- For production use, configure secrets with environment variables and do not use Django's dev server.
