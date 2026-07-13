param(
    [switch]$ForceSetup
)

# Script d'aide au démarrage en développement (PowerShell)
# - crée .venv si nécessaire
# - installe les dépendances et exécute migrate/seed uniquement la première fois
# - lance le serveur de développement

$Root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $Root

$venv = Join-Path $Root '.venv'
$python = Join-Path $venv 'Scripts\python.exe'
$initialized = Join-Path $venv '.initialized'

if (!(Test-Path $venv)) {
    Write-Host "Création de l'environnement virtuel .venv..."
    python -m venv .venv
}

if (!(Test-Path $python)) {
    Write-Error "Python dans .venv introuvable. Assurez-vous que Python est installé et accessible via 'python'."
    exit 1
}

if ($ForceSetup -or !(Test-Path $initialized)) {
    Write-Host "Installation des dépendances et préparation de la base de données (premier lancement)..."
    & $python -m pip install --upgrade pip setuptools wheel
    & $python -m pip install -r requirements.txt
    & $python manage.py migrate
    & $python manage.py seed_citytram
    New-Item -ItemType File -Path $initialized -Force | Out-Null
} else {
    Write-Host "Environnement déjà initialisé. Démarrage du serveur..."
}

Write-Host "Lancement du serveur de développement Django..."
& $python manage.py runserver
