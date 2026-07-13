@echo off
REM Script d'aide au démarrage (Windows cmd)
SET ROOT=%~dp0
cd /d "%ROOT%"

IF NOT EXIST ".venv\Scripts\python.exe" (
  echo Creating virtual environment .venv...
  python -m venv .venv
)

.venv\Scripts\python.exe -m pip install --upgrade pip setuptools wheel

IF NOT EXIST ".venv\.initialized" (
  echo Installing requirements and preparing database (first run)...
  .venv\Scripts\python.exe -m pip install -r requirements.txt
  .venv\Scripts\python.exe manage.py migrate
  .venv\Scripts\python.exe manage.py seed_citytram
  type nul > .venv\.initialized
)

echo Starting Django development server...
.venv\Scripts\python.exe manage.py runserver
