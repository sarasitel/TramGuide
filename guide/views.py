from django.shortcuts import render


STATIONS = [
    {
        'name': 'Bab Lamrissa', 'district': 'Salé', 'line': 'Lignes 1 et 2',
        'time': '3 min', 'desc': 'Station du tronc commun avant le pont Hassan II.'
    },
    {
        'name': 'Tour Hassan', 'district': 'Hassan', 'line': 'Lignes 1 et 2',
        'time': '5 min', 'desc': 'Station centrale pour visiter les monuments historiques.'
    },
    {
        'name': 'Mohammed V - Gare de Rabat', 'district': 'Centre-ville', 'line': 'Ligne 1',
        'time': '4 min', 'desc': 'Connexion pratique avec la gare Rabat-Ville.'
    },
    {
        'name': 'Agdal - Av. de France', 'district': 'Agdal', 'line': 'Ligne 1',
        'time': '7 min', 'desc': 'Accès vers Agdal, commerces et universités.'
    },
    {
        'name': 'Bab El Had', 'district': 'Médina', 'line': 'Ligne 2',
        'time': '6 min', 'desc': 'Accès rapide vers la médina et les ruelles historiques.'
    },
    {
        'name': 'Hôpital Moulay Youssef', 'district': 'Rabat', 'line': 'Ligne 2',
        'time': '6 min', 'desc': 'Terminus de la ligne 2 côté Rabat, selon le plan fourni.'
    },
]

MONUMENTS = [
    {
        'name': 'Tour Hassan', 'category': 'Historique', 'station': 'Tour Hassan', 'walk': '5 min',
        'address': 'Place du 16 Novembre', 'image': 'guide/img/tour_hassan.png',
        'desc': 'Un monument emblématique de Rabat et un point de départ parfait pour une visite en tramway.'
    },
    {
        'name': 'Kasbah des Oudayas', 'category': 'Patrimoine', 'station': 'Bab Chellah', 'walk': '7 min',
        'address': 'Bab Oudaia', 'image': 'guide/img/kasbah.png',
        'desc': 'Quartier historique avec ruelles bleues et blanches, vue sur le Bouregreg et accès touristique facile.'
    },
    {
        'name': 'Chellah', 'category': 'Culturel', 'station': 'Chellah', 'walk': '6 min',
        'address': 'Chellah', 'image': 'guide/img/chellah_gate.png',
        'desc': 'Site historique majeur pour découvrir la richesse archéologique et culturelle de Rabat.'
    },
    {
        'name': 'Musée Mohammed VI', 'category': 'Moderne', 'station': 'Place d’Espagne', 'walk': '8 min',
        'address': 'Centre-ville', 'image': 'guide/img/musee_modern.png',
        'desc': 'Espace culturel moderne pour découvrir l’art contemporain marocain près des stations principales.'
    },
    {
        'name': 'Marina Bouregreg', 'category': 'Famille', 'station': 'Marina Bouregreg', 'walk': '4 min',
        'address': 'Rive du Bouregreg', 'image': 'guide/img/bouregreg.png',
        'desc': 'Promenade agréable en famille, proche du tramway et des circuits touristiques proposés.'
    },
]

CIRCUITS = [
    {
        'name': 'Circuit Historique', 'duration': '4h', 'stations': 12, 'rating': '4.7',
        'image': 'guide/img/tour_hassan.png',
        'desc': 'Tour Hassan, médina, Chellah et Kasbah des Oudayas dans un parcours organisé.'
    },
    {
        'name': 'Circuit Moderne', 'duration': '3h', 'stations': 10, 'rating': '4.6',
        'image': 'guide/img/musee_modern.png',
        'desc': 'Musées, centre-ville, espaces modernes et places principales accessibles par tramway.'
    },
    {
        'name': 'Circuit Culturel', 'duration': '5h', 'stations': 14, 'rating': '4.8',
        'image': 'guide/img/chellah_gate.png',
        'desc': 'Un parcours riche en patrimoine, expositions, monuments et points de vue.'
    },
    {
        'name': 'Circuit Familial', 'duration': '2.5h', 'stations': 8, 'rating': '4.5',
        'image': 'guide/img/bouregreg.png',
        'desc': 'Balade simple, rapide et confortable pour les familles autour du Bouregreg.'
    },
]

LINES = [
    {'name': 'Ligne 1', 'from': 'Hay Karima', 'to': 'Madinat Al Irfane', 'stations': 21, 'freq': '8 min', 'color': 'line1'},
    {'name': 'Ligne 2', 'from': 'Hassan II', 'to': 'Hôpital Moulay Youssef', 'stations': 14, 'freq': '9 min', 'color': 'line2'},
]

TICKETS = [
    {'name': 'Ticket simple', 'price': '6 MAD', 'validity': '1 trajet', 'desc': 'Idéal pour un déplacement rapide.'},
    {'name': 'Ticket enfant', 'price': '3 MAD', 'validity': '1 trajet', 'desc': 'Tarif réduit pour les enfants.'},
    {'name': 'Ticket étudiant', 'price': '4 MAD', 'validity': '1 trajet', 'desc': 'Tarif adapté aux étudiants.'},
    {'name': 'Ticket touristique', 'price': '25 MAD', 'validity': 'Journée', 'desc': 'Pour visiter plusieurs monuments dans la même journée.'},
]


def base_context(active):
    return {
        'active': active,
        'monuments': MONUMENTS,
        'stations': STATIONS,
        'circuits': CIRCUITS,
        'lines': LINES,
        'tickets': TICKETS,
    }


def home(request):
    return render(request, 'guide/home.html', base_context('home'))


def monuments(request):
    return render(request, 'guide/monuments.html', base_context('monuments'))


def stations(request):
    return render(request, 'guide/stations.html', base_context('stations'))


def lignes(request):
    return render(request, 'guide/lignes.html', base_context('lignes'))


def circuits(request):
    return render(request, 'guide/circuits.html', base_context('circuits'))


def carte(request):
    return render(request, 'guide/carte.html', base_context('carte'))


def tickets(request):
    return render(request, 'guide/tickets.html', base_context('tickets'))


def about(request):
    return render(request, 'guide/about.html', base_context('about'))


def login_view(request):
    return render(request, 'guide/login.html', base_context('login'))


def register_view(request):
    return render(request, 'guide/register.html', base_context('register'))
