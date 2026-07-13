(() => {
    'use strict';

    const config = window.CityTramConfig || {};
    const routes = config.routes || {};
    const staticUrl = config.staticUrl || '/static/guide/';
    const app = document.getElementById('app');
    const img = (file) => {
        const value = String(file || '');
        return /^https?:\/\//i.test(value) ? value : `${staticUrl}img/${value}`;
    };
    const html = String.raw;

    const translations = {
        fr: {
            meta: { lang: 'fr', dir: 'ltr' },
            titles: {
                home: 'Accueil - CityTram Guide',
                monuments: 'Monuments - CityTram Guide',
                stations: 'Stations - CityTram Guide',
                lignes: 'Lignes - CityTram Guide',
                circuits: 'Circuits - CityTram Guide',
                carte: 'Carte - CityTram Guide',
                tickets: 'Tickets - CityTram Guide',
                about: 'À propos - CityTram Guide',
                login: 'Connexion - CityTram Guide',
                register: 'Inscription - CityTram Guide'
            },
            ui: {
                brand: { subtitle: { short: 'Rabat · Salé', full: 'Explorer Rabat-Salé' } },
                nav: {
                    aria: 'Navigation principale',
                    home: 'Accueil', monuments: 'Monuments', stations: 'Stations', lines: 'Lignes',
                    circuits: 'Circuits', map: 'Carte', trunk: 'Tronc commun', tickets: 'Tickets', about: 'À propos'
                },
                sidebar: {
                    title: 'Guide intelligent',
                    text: 'Stations, monuments et tickets dans une interface dynamique.'
                },
                topbar: { menu: 'Ouvrir le menu', theme: 'Changer le thème' },
                language: { aria: 'Choisir la langue', label: 'Langue' },
                actions: { login: 'Connexion', register: "S'inscrire" },
                filters: { all: 'Tout', stations: 'Stations', monuments: 'Monuments', circuits: 'Circuits' },
                common: {
                    stationClosest: 'Station la plus proche',
                    stations: 'stations',
                    walk: 'à pied',
                    openMap: 'Ouvrir la carte',
                    viewAll: 'Voir tout',
                    routeButton: "Afficher l'itinéraire",
                    routeReady: 'Itinéraire préparé pour :',
                    clickMarker: 'Cliquez sur un marqueur',
                    line: 'Ligne',
                    station: 'Station',
                    map: 'Carte',
                    trunk: 'Tronc commun'
                },
                home: {
                    eyebrow: 'Guide touristique connecté',
                    titleStart: 'Découvrez Rabat-Salé autrement en',
                    titleHighlight: 'tramway',
                    text: 'Explorez les monuments, suivez nos circuits touristiques et achetez vos tickets en ligne dans une interface moderne.',
                    statMonuments: 'monuments populaires',
                    statLines: 'lignes touristiques'
                },
                monuments: {
                    eyebrow: 'Tourisme en tramway',
                    title: 'Monuments de Rabat-Salé',
                    text: 'Découvrez les lieux emblématiques et trouvez directement la station la plus proche.',
                    search: 'Rechercher un monument...'
                },
                stations: {
                    eyebrow: 'Stations proches',
                    title: 'Stations de tramway',
                    text: 'Consultez les stations principales et les monuments accessibles depuis chaque arrêt.',
                    search: 'Rechercher une station...',
                    panelTitle: 'Trouvez rapidement votre arrêt',
                    panelText: 'Chaque station affiche la ligne, le quartier et le temps de marche estimé vers les sites touristiques.',
                    statStations: 'stations clés',
                    statLines: 'lignes',
                    statMonuments: 'monuments'
                },
                lines: {
                    eyebrow: 'Réseau de tramway',
                    title: 'Lignes de tramway',
                    text: 'Consultez les lignes disponibles, leurs stations principales et la fréquence estimée.',
                    action: 'Voir le réseau',
                    cardText: 'correspondances touristiques et accès aux monuments proches.',
                    bannerTitle: 'Réseau simple et lisible',
                    bannerText: "Les lignes sont organisées par couleur pour faciliter l'orientation des visiteurs.",
                    stationsLabel: 'Arrêts proches',
                    monumentsLabel: 'Sites reliés',
                    mapLabel: 'Repérage rapide', officialTitle: 'Plan des lignes Rabat-Salé', officialText: 'Carte du réseau inspirée du plan officiel. Les lignes 1 et 2 sont affichées avec leurs couleurs principales.', sourceNote: 'Carte Leaflet avec OpenStreetMap et tracés du tramway.'
                },
                circuits: {
                    eyebrow: 'Parcours organisés',
                    title: 'Circuits touristiques',
                    text: 'Choisissez un circuit, suivez les stations proposées et visitez Rabat-Salé sans vous perdre.',
                    action: 'Voir sur la carte',
                    pill: 'Circuit'
                },
                mapPage: {
                    eyebrow: 'Orientation simple',
                    title: 'Carte interactive',
                    text: 'Visualisez les stations, les lignes et les monuments populaires en un seul endroit.',
                    popular: 'Points populaires', realMap: 'Carte réelle Leaflet', leafletText: 'Déplacez la carte, zoomez et cliquez sur les stations ou monuments.', leafletFallback: "Leaflet.js n'est pas chargé. Vérifiez votre connexion internet."
                },
                tickets: {
                    eyebrow: 'Achat sécurisé',
                    title: 'Connectez-vous pour acheter vos tickets',
                    text: 'Les visiteurs non connectés peuvent consulter les informations touristiques. Pour acheter un ticket numérique, il faut se connecter ou créer un compte.',
                    available: 'Tickets disponibles'
                },
                about: {
                    eyebrow: 'Plateforme web',
                    title: 'À propos de CityTram Guide',
                    text: "CityTram Guide centralise les monuments, stations, lignes, circuits et tickets dans une seule interface JavaScript moderne. L’objectif est de rendre la visite de Rabat-Salé plus simple pour les touristes.",
                    discover: 'Découvrir', discoverText: 'Monuments et lieux touristiques',
                    move: 'Se déplacer', moveText: 'Stations et lignes de tramway',
                    organize: 'Organiser', organizeText: 'Circuits et carte interactive',
                    buy: 'Acheter', buyText: 'Tickets après connexion'
                },
                auth: {
                    createAccount: 'Créer un compte',
                    userSpace: 'Espace utilisateur',
                    register: "S'inscrire",
                    login: 'Se connecter',
                    fullName: 'Nom complet',
                    yourName: 'Votre nom',
                    email: 'Email',
                    emailPlaceholder: 'exemple@email.com',
                    password: 'Mot de passe',
                    passwordPlaceholder: '••••••••',
                    createDemo: 'Créer le compte démo',
                    loginDemo: 'Connexion démo',
                    already: 'Déjà inscrit ?',
                    noAccount: 'Pas encore de compte ?',
                    fillError: 'Veuillez remplir correctement tous les champs.',
                    accountCreated: 'Compte démo créé avec succès.',
                    loginSuccess: 'Connexion démo réussie.'
                }
            },
            data: {
                quickLinks: [
                    { icon: '▥', title: 'Monuments', text: 'Lieux emblématiques', hrefKey: 'monuments' },
                    { icon: '◎', title: 'Stations', text: 'Arrêts proches', hrefKey: 'stations' },
                    { icon: '▣', title: 'Lignes', text: 'Réseau tramway', hrefKey: 'lignes' },
                    { icon: '⌘', title: 'Circuits', text: 'Parcours organisés', hrefKey: 'circuits' },
                    { icon: '▤', title: 'Tickets', text: 'Achat en ligne', hrefKey: 'tickets' }
                ],
                monuments: [
                    { name: 'Tour Hassan', category: 'Historique', station: 'Tour Hassan', walk: '5 min', address: 'Place du 16 Novembre', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tour_Hassan-Rabat.jpg?width=1400', fallback: 'tour_hassan.png', desc: 'Minaret historique emblématique de Rabat, situé près du Mausolée Mohammed V.' },
                    { name: 'Mausolée Mohammed V', category: 'Historique', station: 'Tour Hassan', walk: '5 min', address: 'Esplanade de la Tour Hassan', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mausoleum%20of%20Mohammed%20V%2001.jpg?width=1400', fallback: 'tour_hassan.png', desc: 'Monument royal majeur connu pour son architecture marocaine traditionnelle.' },
                    { name: 'Kasbah des Oudayas', category: 'Patrimoine', station: 'Médina', walk: '10 min', address: 'Bab Oudaia', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kasbah%20des%20OUDAYAS%20-%20Rabat.jpg?width=1400', fallback: 'kasbah.png', desc: 'Quartier historique avec ruelles bleues et blanches et vue sur le Bouregreg.' },
                    { name: 'Ruelles bleues des Oudayas', category: 'Patrimoine', station: 'Médina', walk: '10 min', address: 'Kasbah des Oudayas', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ruelle%20bleue%2C%20Kasbah%20des%20Oudayas%20%28Rabat%2C%20Maroc%29%20%2815561666480%29.jpg?width=1400', fallback: 'kasbah.png', desc: 'Ruelles bleues et blanches célèbres de la Kasbah, idéales pour une visite photo.' },
                    { name: 'Jardins des Oudayas', category: 'Famille', station: 'Médina', walk: '11 min', address: 'Kasbah des Oudayas', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Maroc%20-%20Rabat%2C%20jardin%20des%20Oudayas%20%28rec0310%20g%29.jpg?width=1400', fallback: 'kasbah.png', desc: 'Jardin andalou calme à l’intérieur du secteur des Oudayas.' },
                    { name: 'Chellah', category: 'Culturel', station: 'Bab Chellah', walk: '15 min', address: 'Chellah', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gate%20of%20Chellah%2C%202019.jpg?width=1400', fallback: 'chellah_gate.png', desc: 'Site archéologique majeur avec vestiges, jardins et remparts historiques.' },
                    { name: 'Porte de Chellah', category: 'Historique', station: 'Bab Chellah', walk: '15 min', address: 'Chellah', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Main%20Gate%20Chellah%20Rabat%20Nov25%20A7CR%2008921.jpg?width=1400', fallback: 'chellah_gate.png', desc: 'Grande porte mérinide donnant accès au site historique de Chellah.' },
                    { name: 'Musée Mohammed VI', category: 'Moderne', station: 'Mohammed V - Gare de Rabat-Ville', walk: '8 min', address: '2 Avenue Moulay Hassan', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rabat%20Mohammed%20VI%20Museum.jpg?width=1400', fallback: 'musee_modern.png', desc: 'Musée d’art moderne et contemporain au centre de Rabat.' },
                    { name: 'Médina de Rabat', category: 'Patrimoine', station: 'Bab El Had', walk: '4 min', address: 'Ancienne médina de Rabat', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rue%20des%20consuls%20Rabat%202020.jpg?width=1400', fallback: 'kasbah.png', desc: 'Ancien quartier commerçant avec souks, portes historiques et ruelles traditionnelles.' },
                    { name: 'Bab El Had', category: 'Historique', station: 'Bab El Had', walk: '2 min', address: 'Place Bab El Had', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bab%20El%20Had.jpg?width=1400', fallback: 'chellah_gate.png', desc: 'Grande porte historique de la médina, accessible directement par la ligne 2.' },
                    { name: 'Bab Lamrissa', category: 'Patrimoine', station: 'Bab Lamrissa', walk: '3 min', address: 'Salé médina', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Porte%20Bab%20Lamrissa.JPG?width=1400', fallback: 'bouregreg.png', desc: 'Porte monumentale de Salé, proche du tronc commun et du pont Hassan II.' },
                    { name: 'Bibliothèque Nationale', category: 'Culturel', station: 'Bibliothèque Nationale', walk: '3 min', address: 'Avenue Ibn Khaldoun', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Biblioth%C3%A8que%20Nationale%20du%20Royaume%20du%20Maroc.jpg?width=1400', fallback: 'musee_modern.png', desc: 'Grand équipement culturel de Rabat, proche de l’Agdal et de la ligne 1.' },
                    { name: 'Bab Rouah', category: 'Historique', station: 'Bab Rouah', walk: '3 min', address: 'Avenue Moulay Hassan', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rabat%20-%20Bab%20ar-Rwah%20-%2020200827211905.jpg?width=1400', fallback: 'chellah_gate.png', desc: 'Porte monumentale des remparts de Rabat, proche du centre.' },
                    { name: 'Avenue Mohammed V', category: 'Moderne', station: 'Mohammed V - Gare de Rabat-Ville', walk: '3 min', address: 'Avenue Mohammed V', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20view%20of%20Ave%20Mohammed%20V%2C%20Rabat.jpg?width=1400', fallback: 'tram_banner.png', desc: 'Grande avenue du centre-ville reliant commerces, institutions et gare Rabat-Ville.' },
                    { name: 'Gare Rabat-Ville', category: 'Moderne', station: 'Mohammed V - Gare de Rabat-Ville', walk: '2 min', address: 'Avenue Mohammed V', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gare%20de%20Rabat-Ville%20and%20tram%202013.jpg?width=1400', fallback: 'tram_banner.png', desc: 'Point pratique pour combiner train, tramway et visite du centre de Rabat.' },
                    { name: 'Marina Bouregreg', category: 'Famille', station: 'Pont Hassan II', walk: '8 min', address: 'Rive du Bouregreg', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Eagle%20Hills%20Morocco%2C%20Marina%20Bouregreg%20-%20Rabat.jpg?width=1400', fallback: 'bouregreg.png', desc: 'Espace de promenade près du fleuve avec vue vers Rabat, Salé et le pont Hassan II.' },
                    { name: 'Cathédrale Saint-Pierre', category: 'Culturel', station: 'Place Al Joulane', walk: '4 min', address: 'Place du Golan', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/La%20Cath%C3%A9drale%20de%20Rabat.jpg?width=1400', fallback: 'musee_modern.png', desc: 'Édifice religieux et architectural important au centre-ville de Rabat.' },
                    { name: 'Musée Archéologique de Rabat', category: 'Culturel', station: 'Place Al Joulane', walk: '8 min', address: 'Rue al-Brihi', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mus%C3%A9e%20Arch%C3%A9ologique%20de%20Rabat.jpg?width=1400', fallback: 'chellah_gate.png', desc: 'Musée consacré aux collections archéologiques et à l’histoire ancienne du Maroc.' },
                    { name: 'Musée de Bank Al-Maghrib', category: 'Culturel', station: 'Mohammed V - Gare de Rabat-Ville', walk: '4 min', address: 'Avenue Mohammed V', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Morocco%20Rabat%20Bank%20Museum.jpg?width=1400', fallback: 'musee_modern.png', desc: 'Musée au centre-ville présentant la monnaie, l’art et le patrimoine économique.' },
                    { name: 'Jardin d’Essais Botaniques', category: 'Famille', station: 'Bibliothèque Nationale', walk: '12 min', address: 'Avenue Annasr', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jardin%20essais%20botaniques%20Rabat%20Maroc%204-photo%20bertrand%20SOUBEYRAND.jpg?width=1400', fallback: 'bouregreg.png', desc: 'Grand jardin urbain adapté aux balades et aux pauses nature.' },
                    { name: 'Bab El Alou', category: 'Historique', station: 'Bab El Had', walk: '9 min', address: 'Avenue Laalou', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Porte%20Bab%20El-Alou%20-%20Les%20portes%20Bab%20El-Alou%20-%20Rabat%20-%20M%C3%A9diath%C3%A8que%20de%20l%27architecture%20et%20du%20patrimoine%20-%20AP62T060892.jpg?width=1400', fallback: 'chellah_gate.png', desc: 'Porte historique située près des remparts et de l’entrée ouest de la médina.' },
                    { name: 'Musée National de la Photographie', category: 'Moderne', station: 'Médina', walk: '12 min', address: 'Fort Rottembourg', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/National%20Photography%20Museum%20%28Morocco%29.jpeg?width=1400', fallback: 'musee_modern.png', desc: 'Espace culturel consacré à la photographie, installé près de l’océan.' },
                    { name: 'Parlement du Maroc', category: 'Moderne', station: 'Mohammed V - Gare de Rabat-Ville', walk: '5 min', address: 'Avenue Mohammed V', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Moroccan%20Parliament%20Building.jpg?width=1400', fallback: 'tram_banner.png', desc: 'Bâtiment institutionnel emblématique situé sur l’avenue Mohammed V.' },
                    { name: 'Mosquée Assounna', category: 'Religieux', station: 'Place Al Joulane', walk: '6 min', address: 'Avenue Mohammed V', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rabat%20-%20As-Sunna%20Mosque%20%28Rabat%29%20-%2020131214135243.jpg?width=1400', fallback: 'tour_hassan.png', desc: 'Mosquée connue du centre de Rabat, proche des axes principaux et du tramway.' },
                    { name: 'Oudaya Museum', category: 'Culturel', station: 'Médina', walk: '11 min', address: 'Kasbah des Oudayas', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mus%C3%A9e%20des%20Oudayas%20interior%20courtyard.jpg?width=1400', fallback: 'kasbah.png', desc: 'Musée situé dans le secteur historique des Oudayas.' }
                ],
                stations: [
                    { name: 'Bab Lamrissa', district: 'Salé', line: 'Lignes 1 et 2', time: '3 min', desc: 'Station du tronc commun avant le pont Hassan II.' },
                    { name: 'Tour Hassan', district: 'Hassan', line: 'Lignes 1 et 2', time: '5 min', desc: 'Station centrale pour visiter les monuments historiques.' },
                    { name: 'Mohammed V - Gare de Rabat', district: 'Centre-ville', line: 'Ligne 1', time: '4 min', desc: 'Connexion pratique avec la gare Rabat-Ville.' },
                    { name: 'Agdal - Av. de France', district: 'Agdal', line: 'Ligne 1', time: '7 min', desc: 'Accès vers Agdal, commerces et universités.' },
                    { name: 'Bab El Had', district: 'Médina', line: 'Ligne 2', time: '6 min', desc: 'Accès rapide vers la médina et les ruelles historiques.' },
                    { name: 'Hôpital Moulay Youssef', district: 'Rabat', line: 'Ligne 2', time: '6 min', desc: 'Terminus de la ligne 2 côté Rabat, selon le plan fourni.' }
                ],
                lines: [
                    { name: 'Ligne 1', from: 'Hay Karima', to: 'Madinat Al Irfane', stations: 21, freq: '8 min', color: 'line1' },
                    { name: 'Ligne 2', from: 'Hassan II', to: 'Hôpital Moulay Youssef', stations: 14, freq: '9 min', color: 'line2' }
                ],
                circuits: [
                    { name: 'Circuit Historique', duration: '4h', stations: 12, rating: '4.7', image: 'tour_hassan.png', desc: 'Tour Hassan, médina, Chellah et Kasbah des Oudayas dans un parcours organisé.' },
                    { name: 'Circuit Moderne', duration: '3h', stations: 10, rating: '4.6', image: 'musee_modern.png', desc: 'Musées, centre-ville, espaces modernes et places principales accessibles par tramway.' },
                    { name: 'Circuit Culturel', duration: '5h', stations: 14, rating: '4.8', image: 'chellah_gate.png', desc: 'Un parcours riche en patrimoine, expositions, monuments et points de vue.' },
                    { name: 'Circuit Familial', duration: '2.5h', stations: 8, rating: '4.5', image: 'bouregreg.png', desc: 'Balade simple, rapide et confortable pour les familles autour du Bouregreg.' }
                ],
                tickets: [
                    { name: 'Ticket simple', price: '7 DH', validity: '1 trajet', desc: 'Idéal pour un déplacement rapide.' },
                    { name: 'Ticket enfant', price: 'Gratuit', validity: 'Enfant', desc: 'Accès gratuit pour les enfants selon les conditions du service.' },
                    { name: 'Ticket étudiant', price: '3 DH', validity: '1 trajet', desc: 'Tarif adapté aux étudiants.' },
                    { name: 'Ticket touristique', price: '30 DH', validity: 'Journée', desc: 'Pour visiter plusieurs monuments dans la même journée.' }
                ]
            }
        },
        en: {
            meta: { lang: 'en', dir: 'ltr' },
            titles: {
                home: 'Home - CityTram Guide',
                monuments: 'Monuments - CityTram Guide',
                stations: 'Stations - CityTram Guide',
                lignes: 'Lines - CityTram Guide',
                circuits: 'Routes - CityTram Guide',
                carte: 'Map - CityTram Guide',
                tickets: 'Tickets - CityTram Guide',
                about: 'About - CityTram Guide',
                login: 'Login - CityTram Guide',
                register: 'Register - CityTram Guide'
            },
            ui: {
                brand: { subtitle: { short: 'Rabat · Salé', full: 'Explore Rabat-Salé' } },
                nav: {
                    aria: 'Main navigation',
                    home: 'Home', monuments: 'Monuments', stations: 'Stations', lines: 'Lines',
                    circuits: 'Routes', map: 'Map', trunk: 'Shared section', tickets: 'Tickets', about: 'About'
                },
                sidebar: {
                    title: 'Smart guide',
                    text: 'Stations, monuments and tickets in a dynamic interface.'
                },
                topbar: { menu: 'Open menu', theme: 'Change theme' },
                language: { aria: 'Choose language', label: 'Language' },
                actions: { login: 'Login', register: 'Register' },
                filters: { all: 'All', stations: 'Stations', monuments: 'Monuments', circuits: 'Routes' },
                common: {
                    stationClosest: 'Closest station',
                    stations: 'stations',
                    walk: 'walk',
                    openMap: 'Open map',
                    viewAll: 'View all',
                    routeButton: 'Show itinerary',
                    routeReady: 'Itinerary prepared for:',
                    clickMarker: 'Click a marker',
                    line: 'Line',
                    station: 'Station',
                    map: 'Map',
                    trunk: 'Shared section'
                },
                home: {
                    eyebrow: 'Connected tourist guide',
                    titleStart: 'Discover Rabat-Salé differently by',
                    titleHighlight: 'tramway',
                    text: 'Explore monuments, follow our tourist routes and buy tickets online in a modern interface.',
                    statMonuments: 'popular monuments',
                    statLines: 'tourist lines'
                },
                monuments: {
                    eyebrow: 'Tourism by tramway',
                    title: 'Rabat-Salé monuments',
                    text: 'Discover emblematic places and find the closest station directly.',
                    search: 'Search for a monument...'
                },
                stations: {
                    eyebrow: 'Nearby stations',
                    title: 'Tramway stations',
                    text: 'Check the main stations and the monuments reachable from each stop.',
                    search: 'Search for a station...',
                    panelTitle: 'Find your stop quickly',
                    panelText: 'Each station shows the line, district and estimated walking time to tourist sites.',
                    statStations: 'key stations',
                    statLines: 'lines',
                    statMonuments: 'monuments'
                },
                lines: {
                    eyebrow: 'Tramway network',
                    title: 'Tramway lines',
                    text: 'View available lines, their main stations and the estimated frequency.',
                    action: 'View network',
                    cardText: 'tourist connections and access to nearby monuments.',
                    bannerTitle: 'Simple and clear network',
                    bannerText: 'Lines are organized by color to help visitors find their way easily.',
                    stationsLabel: 'Nearby stops',
                    monumentsLabel: 'Connected sites',
                    mapLabel: 'Quick location', officialTitle: 'Rabat-Salé line map', officialText: 'Network map inspired by the official plan. Lines 1 and 2 are displayed with their main colors.', sourceNote: 'Leaflet map with OpenStreetMap and tramway routes.'
                },
                circuits: {
                    eyebrow: 'Organized routes',
                    title: 'Tourist routes',
                    text: 'Choose a route, follow the suggested stations and visit Rabat-Salé without getting lost.',
                    action: 'View on the map',
                    pill: 'Route'
                },
                mapPage: {
                    eyebrow: 'Simple orientation',
                    title: 'Interactive map',
                    text: 'View stations, lines and popular monuments in one place.',
                    popular: 'Popular points', realMap: 'Real Leaflet map', leafletText: 'Move the map, zoom in and click stations or monuments.', leafletFallback: 'Leaflet.js is not loaded. Check your internet connection.'
                },
                tickets: {
                    eyebrow: 'Secure purchase',
                    title: 'Log in to buy your tickets',
                    text: 'Visitors who are not logged in can consult tourist information. To buy a digital ticket, you need to log in or create an account.',
                    available: 'Available tickets'
                },
                about: {
                    eyebrow: 'Web platform',
                    title: 'About CityTram Guide',
                    text: 'CityTram Guide brings monuments, stations, lines, routes and tickets together in one modern JavaScript interface. The goal is to make visiting Rabat-Salé easier for tourists.',
                    discover: 'Discover', discoverText: 'Monuments and tourist places',
                    move: 'Move around', moveText: 'Tramway stations and lines',
                    organize: 'Organize', organizeText: 'Routes and interactive map',
                    buy: 'Buy', buyText: 'Tickets after login'
                },
                auth: {
                    createAccount: 'Create an account',
                    userSpace: 'User area',
                    register: 'Register',
                    login: 'Log in',
                    fullName: 'Full name',
                    yourName: 'Your name',
                    email: 'Email',
                    emailPlaceholder: 'example@email.com',
                    password: 'Password',
                    passwordPlaceholder: '••••••••',
                    createDemo: 'Create demo account',
                    loginDemo: 'Demo login',
                    already: 'Already registered?',
                    noAccount: 'No account yet?',
                    fillError: 'Please fill in all fields correctly.',
                    accountCreated: 'Demo account created successfully.',
                    loginSuccess: 'Demo login successful.'
                }
            },
            data: {
                quickLinks: [
                    { icon: '▥', title: 'Monuments', text: 'Emblematic places', hrefKey: 'monuments' },
                    { icon: '◎', title: 'Stations', text: 'Nearby stops', hrefKey: 'stations' },
                    { icon: '▣', title: 'Lines', text: 'Tramway network', hrefKey: 'lignes' },
                    { icon: '⌘', title: 'Routes', text: 'Organized paths', hrefKey: 'circuits' },
                    { icon: '▤', title: 'Tickets', text: 'Online purchase', hrefKey: 'tickets' }
                ],
                monuments: [
                    { name: 'Hassan Tower', category: 'Historical', station: 'Hassan Tower', walk: '5 min', address: 'Place du 16 Novembre', image: 'tour_hassan.png', desc: 'An emblematic monument of Rabat, perfect for starting a tourist visit by tramway.' },
                    { name: 'Kasbah of the Oudayas', category: 'Heritage', station: 'Bab Chellah', walk: '7 min', address: 'Bab Oudaia', image: 'kasbah.png', desc: 'A historic district with blue and white alleys, a view over the Bouregreg and a traditional atmosphere.' },
                    { name: 'Chellah', category: 'Cultural', station: 'Chellah', walk: '6 min', address: 'Chellah', image: 'chellah_gate.png', desc: 'A major archaeological site to discover the history, gardens and heritage of Rabat.' },
                    { name: 'Mohammed VI Museum', category: 'Modern', station: 'Place d’Espagne', walk: '8 min', address: 'City center', image: 'musee_modern.png', desc: 'A modern cultural space dedicated to Moroccan contemporary art, close to the main stations.' },
                    { name: 'Bouregreg Marina', category: 'Family', station: 'Bouregreg Marina', walk: '4 min', address: 'Bouregreg riverbank', image: 'bouregreg.png', desc: 'A pleasant riverside walk, ideal for an outing with family or friends.' }
                ],
                stations: [
                    { name: 'Bab Lamrissa', district: 'Salé', line: 'Lines 1 and 2', time: '3 min', desc: 'Shared-section station before Hassan II Bridge.' },
                    { name: 'Hassan Tower', district: 'Hassan', line: 'Lines 1 and 2', time: '5 min', desc: 'Central station for historical monuments.' },
                    { name: 'Mohammed V - Rabat Station', district: 'City center', line: 'Line 1', time: '4 min', desc: 'Convenient connection with Rabat-Ville station.' },
                    { name: 'Agdal - Av. de France', district: 'Agdal', line: 'Line 1', time: '7 min', desc: 'Access to Agdal, shops and universities.' },
                    { name: 'Bab El Had', district: 'Medina', line: 'Line 2', time: '6 min', desc: 'Quick access to the medina and historic streets.' },
                    { name: 'Hôpital Moulay Youssef', district: 'Rabat', line: 'Line 2', time: '6 min', desc: 'Line 2 terminus on the Rabat side, according to the provided map.' }
                ],
                lines: [
                    { name: 'Line 1', from: 'Hay Karima', to: 'Madinat Al Irfane', stations: 21, freq: '8 min', color: 'line1' },
                    { name: 'Line 2', from: 'Hassan II', to: 'Hôpital Moulay Youssef', stations: 14, freq: '9 min', color: 'line2' }
                ],
                circuits: [
                    { name: 'Historical Route', duration: '4h', stations: 12, rating: '4.7', image: 'tour_hassan.png', desc: 'Hassan Tower, the medina, Chellah and the Kasbah of the Oudayas in an organized route.' },
                    { name: 'Modern Route', duration: '3h', stations: 10, rating: '4.6', image: 'musee_modern.png', desc: 'Museums, city center, modern spaces and main squares accessible by tramway.' },
                    { name: 'Cultural Route', duration: '5h', stations: 14, rating: '4.8', image: 'chellah_gate.png', desc: 'A route rich in heritage, exhibitions, monuments and viewpoints.' },
                    { name: 'Family Route', duration: '2.5h', stations: 8, rating: '4.5', image: 'bouregreg.png', desc: 'A simple, quick and comfortable walk for families around Bouregreg.' }
                ],
                tickets: [
                    { name: 'Single ticket', price: '7 MAD', validity: '1 trip', desc: 'Ideal for a quick ride.' },
                    { name: 'Child ticket', price: 'Free', validity: '1 trip', desc: 'Reduced fare for children.' },
                    { name: 'Student ticket', price: '3 MAD', validity: '1 trip', desc: 'Fare adapted for students.' },
                    { name: 'Tourist ticket', price: '30 MAD', validity: 'Day pass', desc: 'For visiting several monuments in the same day.' }
                ]
            }
        },
        ar: {
            meta: { lang: 'ar', dir: 'rtl' },
            titles: {
                home: 'الرئيسية - CityTram Guide',
                monuments: 'المعالم - CityTram Guide',
                stations: 'المحطات - CityTram Guide',
                lignes: 'الخطوط - CityTram Guide',
                circuits: 'المسارات - CityTram Guide',
                carte: 'الخريطة - CityTram Guide',
                tickets: 'التذاكر - CityTram Guide',
                about: 'حول - CityTram Guide',
                login: 'تسجيل الدخول - CityTram Guide',
                register: 'إنشاء حساب - CityTram Guide'
            },
            ui: {
                brand: { subtitle: { short: 'الرباط · سلا', full: 'استكشف الرباط وسلا' } },
                nav: {
                    aria: 'القائمة الرئيسية',
                    home: 'الرئيسية', monuments: 'المعالم', stations: 'المحطات', lines: 'الخطوط',
                    circuits: 'المسارات', map: 'الخريطة', trunk: 'المقطع المشترك', tickets: 'التذاكر', about: 'حول'
                },
                sidebar: {
                    title: 'دليل ذكي',
                    text: 'محطات ومعالم وتذاكر داخل واجهة تفاعلية.'
                },
                topbar: { menu: 'فتح القائمة', theme: 'تغيير النمط' },
                language: { aria: 'اختيار اللغة', label: 'اللغة' },
                actions: { login: 'دخول', register: 'إنشاء حساب' },
                filters: { all: 'الكل', stations: 'المحطات', monuments: 'المعالم', circuits: 'المسارات' },
                common: {
                    stationClosest: 'أقرب محطة',
                    stations: 'محطة',
                    walk: 'مشيا',
                    openMap: 'فتح الخريطة',
                    viewAll: 'عرض الكل',
                    routeButton: 'عرض المسار',
                    routeReady: 'تم تجهيز المسار لـ:',
                    clickMarker: 'اضغط على علامة في الخريطة',
                    line: 'الخط',
                    station: 'محطة',
                    map: 'الخريطة',
                    trunk: 'المقطع المشترك'
                },
                home: {
                    eyebrow: 'دليل سياحي متصل',
                    titleStart: 'اكتشف الرباط وسلا بطريقة مختلفة عبر',
                    titleHighlight: 'الترامواي',
                    text: 'استكشف المعالم، اتبع المسارات السياحية واشتر التذاكر عبر الإنترنت داخل واجهة عصرية.',
                    statMonuments: 'معالم مشهورة',
                    statLines: 'خطوط سياحية'
                },
                monuments: {
                    eyebrow: 'سياحة عبر الترامواي',
                    title: 'معالم الرباط وسلا',
                    text: 'اكتشف الأماكن الشهيرة واعثر مباشرة على أقرب محطة.',
                    search: 'ابحث عن معلم...'
                },
                stations: {
                    eyebrow: 'محطات قريبة',
                    title: 'محطات الترامواي',
                    text: 'اطلع على المحطات الرئيسية والمعالم التي يمكن الوصول إليها من كل محطة.',
                    search: 'ابحث عن محطة...',
                    panelTitle: 'اعثر على محطتك بسرعة',
                    panelText: 'كل محطة تعرض الخط والحي والوقت التقريبي للمشي نحو المواقع السياحية.',
                    statStations: 'محطات رئيسية',
                    statLines: 'خطوط',
                    statMonuments: 'معالم'
                },
                lines: {
                    eyebrow: 'شبكة الترامواي',
                    title: 'خطوط الترامواي',
                    text: 'اطلع على الخطوط المتاحة ومحطاتها الرئيسية والتردد التقريبي.',
                    action: 'عرض الشبكة',
                    cardText: 'روابط سياحية ووصول إلى المعالم القريبة.',
                    bannerTitle: 'شبكة سهلة وواضحة',
                    bannerText: 'تم تنظيم الخطوط بالألوان لتسهيل توجيه الزوار.',
                    stationsLabel: 'محطات قريبة',
                    monumentsLabel: 'مواقع مرتبطة',
                    mapLabel: 'تحديد سريع', officialTitle: 'خريطة خطوط الرباط وسلا', officialText: 'خريطة الشبكة مستوحاة من المخطط الرسمي. يتم عرض الخطين 1 و2 بألوانهما الأساسية.', sourceNote: 'خريطة Leaflet مع OpenStreetMap ومسارات الترامواي.'
                },
                circuits: {
                    eyebrow: 'مسارات منظمة',
                    title: 'مسارات سياحية',
                    text: 'اختر مسارا، اتبع المحطات المقترحة وزر الرباط وسلا دون أن تضيع.',
                    action: 'عرض على الخريطة',
                    pill: 'مسار'
                },
                mapPage: {
                    eyebrow: 'توجيه بسيط',
                    title: 'خريطة تفاعلية',
                    text: 'شاهد المحطات والخطوط والمعالم المشهورة في مكان واحد.',
                    popular: 'نقاط مشهورة', realMap: 'خريطة Leaflet حقيقية', leafletText: 'حرك الخريطة، قم بالتكبير واضغط على المحطات أو المعالم.', leafletFallback: 'لم يتم تحميل Leaflet.js. تحقق من اتصال الإنترنت.'
                },
                tickets: {
                    eyebrow: 'شراء آمن',
                    title: 'سجل الدخول لشراء التذاكر',
                    text: 'يمكن للزوار غير المتصلين الاطلاع على المعلومات السياحية. لشراء تذكرة رقمية يجب تسجيل الدخول أو إنشاء حساب.',
                    available: 'التذاكر المتوفرة'
                },
                about: {
                    eyebrow: 'منصة ويب',
                    title: 'حول CityTram Guide',
                    text: 'يجمع CityTram Guide المعالم والمحطات والخطوط والمسارات والتذاكر في واجهة JavaScript عصرية واحدة. الهدف هو تسهيل زيارة الرباط وسلا للسياح.',
                    discover: 'اكتشاف', discoverText: 'معالم وأماكن سياحية',
                    move: 'التنقل', moveText: 'محطات وخطوط الترامواي',
                    organize: 'تنظيم', organizeText: 'مسارات وخريطة تفاعلية',
                    buy: 'شراء', buyText: 'تذاكر بعد تسجيل الدخول'
                },
                auth: {
                    createAccount: 'إنشاء حساب',
                    userSpace: 'فضاء المستخدم',
                    register: 'إنشاء حساب',
                    login: 'تسجيل الدخول',
                    fullName: 'الاسم الكامل',
                    yourName: 'اسمك',
                    email: 'البريد الإلكتروني',
                    emailPlaceholder: 'example@email.com',
                    password: 'كلمة المرور',
                    passwordPlaceholder: '••••••••',
                    createDemo: 'إنشاء حساب تجريبي',
                    loginDemo: 'دخول تجريبي',
                    already: 'لديك حساب؟',
                    noAccount: 'ليس لديك حساب بعد؟',
                    fillError: 'يرجى ملء جميع الحقول بشكل صحيح.',
                    accountCreated: 'تم إنشاء الحساب التجريبي بنجاح.',
                    loginSuccess: 'تم تسجيل الدخول التجريبي بنجاح.'
                }
            },
            data: {
                quickLinks: [
                    { icon: '▥', title: 'المعالم', text: 'أماكن شهيرة', hrefKey: 'monuments' },
                    { icon: '◎', title: 'المحطات', text: 'محطات قريبة', hrefKey: 'stations' },
                    { icon: '▣', title: 'الخطوط', text: 'شبكة الترامواي', hrefKey: 'lignes' },
                    { icon: '⌘', title: 'المسارات', text: 'مسارات منظمة', hrefKey: 'circuits' },
                    { icon: '▤', title: 'التذاكر', text: 'شراء عبر الإنترنت', hrefKey: 'tickets' }
                ],
                monuments: [
                    { name: 'صومعة حسان', category: 'تاريخي', station: 'صومعة حسان', walk: '5 دقائق', address: 'ساحة 16 نونبر', image: 'tour_hassan.png', desc: 'معلم رمزي في الرباط، مناسب لبدء زيارة سياحية عبر الترامواي.' },
                    { name: 'قصبة الأوداية', category: 'تراث', station: 'باب شالة', walk: '7 دقائق', address: 'باب الأوداية', image: 'kasbah.png', desc: 'حي تاريخي بأزقة زرقاء وبيضاء وإطلالة على أبي رقراق وأجواء تقليدية.' },
                    { name: 'شالة', category: 'ثقافي', station: 'شالة', walk: '6 دقائق', address: 'شالة', image: 'chellah_gate.png', desc: 'موقع أثري مهم لاكتشاف تاريخ الرباط وحدائقها وتراثها.' },
                    { name: 'متحف محمد السادس', category: 'حديث', station: 'ساحة إسبانيا', walk: '8 دقائق', address: 'وسط المدينة', image: 'musee_modern.png', desc: 'فضاء ثقافي حديث مخصص للفن المغربي المعاصر وقريب من المحطات الرئيسية.' },
                    { name: 'مارينا أبي رقراق', category: 'عائلي', station: 'مارينا أبي رقراق', walk: '4 دقائق', address: 'ضفة أبي رقراق', image: 'bouregreg.png', desc: 'نزهة ممتعة قرب النهر، مناسبة للعائلة أو الأصدقاء.' }
                ],
                stations: [
                    { name: 'باب لمريسة', district: 'سلا', line: 'الخطان 1 و2', time: '3 دقائق', desc: 'محطة في الجزء المشترك قبل قنطرة الحسن الثاني.' },
                    { name: 'صومعة حسان', district: 'حسان', line: 'الخطان 1 و2', time: '5 دقائق', desc: 'محطة مركزية لزيارة المعالم التاريخية.' },
                    { name: 'محمد الخامس - محطة الرباط', district: 'وسط المدينة', line: 'الخط 1', time: '4 دقائق', desc: 'ربط مناسب مع محطة الرباط المدينة.' },
                    { name: 'أكدال - شارع فرنسا', district: 'أكدال', line: 'الخط 1', time: '7 دقائق', desc: 'وصول إلى أكدال والمحلات والجامعات.' },
                    { name: 'باب الحد', district: 'المدينة', line: 'الخط 2', time: '6 دقائق', desc: 'وصول سريع إلى المدينة والأزقة التاريخية.' },
                    { name: 'مستشفى مولاي يوسف', district: 'الرباط', line: 'الخط 2', time: '6 دقائق', desc: 'المحطة النهائية للخط 2 من جهة الرباط حسب الخريطة المرفقة.' }
                ],
                lines: [
                    { name: 'الخط 1', from: 'حي كريمة', to: 'مدينة العرفان', stations: 21, freq: '8 دقائق', color: 'line1' },
                    { name: 'الخط 2', from: 'الحسن الثاني', to: 'مستشفى مولاي يوسف', stations: 14, freq: '9 دقائق', color: 'line2' }
                ],
                circuits: [
                    { name: 'المسار التاريخي', duration: '4 ساعات', stations: 12, rating: '4.7', image: 'tour_hassan.png', desc: 'صومعة حسان والمدينة القديمة وشالة وقصبة الأوداية ضمن مسار منظم.' },
                    { name: 'المسار الحديث', duration: '3 ساعات', stations: 10, rating: '4.6', image: 'musee_modern.png', desc: 'متاحف ووسط المدينة وفضاءات حديثة وساحات رئيسية يمكن الوصول إليها بالترامواي.' },
                    { name: 'المسار الثقافي', duration: '5 ساعات', stations: 14, rating: '4.8', image: 'chellah_gate.png', desc: 'مسار غني بالتراث والمعارض والمعالم ونقاط الإطلالة.' },
                    { name: 'المسار العائلي', duration: '2.5 ساعة', stations: 8, rating: '4.5', image: 'bouregreg.png', desc: 'جولة بسيطة وسريعة ومريحة للعائلات حول أبي رقراق.' }
                ],
                tickets: [
                    { name: 'تذكرة عادية', price: '7 دراهم', validity: 'رحلة واحدة', desc: 'مناسبة لتنقل سريع.' },
                    { name: 'تذكرة الأطفال', price: 'مجاني', validity: 'رحلة واحدة', desc: 'سعر مخفض للأطفال.' },
                    { name: 'تذكرة الطالب', price: '3 دراهم', validity: 'رحلة واحدة', desc: 'سعر مناسب للطلبة.' },
                    { name: 'تذكرة سياحية', price: '30 درهما', validity: 'يوم كامل', desc: 'لزيارة عدة معالم في اليوم نفسه.' }
                ]
            }
        }
    };


    const normalizeLang = (lang) => {
        const value = String(lang || '').toLowerCase();
        if (value === 'eng') return 'en';
        if (['fr', 'en', 'ar'].includes(value)) return value;
        return 'fr';
    };

    const languageLabels = {
        fr: 'FR — Français',
        en: 'EN — English',
        ar: 'AR — العربية'
    };

    const urlLang = new URLSearchParams(window.location.search).get('lang');
    let currentLang = normalizeLang(urlLang || localStorage.getItem('citytram-lang') || 'fr');
    localStorage.setItem('citytram-lang', currentLang);

    const pack = () => translations[currentLang] || translations.fr;
    const data = () => pack().data;
    const t = (path) => {
        const parts = path.split('.');
        let value = pack().ui;
        for (const part of parts) value = value?.[part];
        return value ?? path;
    };

    const route = (key) => routes[key] || '#';


    const tramGeo = {
        // Coordonnées corrigées à partir de l'image fournie par l'utilisateur.
        // Objectif : reproduire le schéma demandé, avec L1 Hay Karima → Madinat Al Irfane
        // et L2 Hassan II → Hôpital Moulay Youssef. Le tronc commun est Bab Lamrissa → Place Al Joulane.
        center: [34.0200, -6.8330],
        commonStations: ['Bab Lamrissa', 'Pont Hassan II', 'Place du 16 Novembre', 'Tour Hassan', 'Place Al Joulane'],
        labelStations: ['Hay Karima', 'Madinat Al Irfane', 'Hassan II', 'Hôpital Moulay Youssef', 'Bab Lamrissa', 'Tour Hassan'],
        line1: [
            ['Hay Karima', 34.05780, -6.79020],
            ['Tabriquet', 34.05270, -6.79850],
            ['La Poste', 34.04760, -6.80570],
            ['Mohammed V - Opéra', 34.04410, -6.81080],
            ['Diar', 34.04040, -6.81530],
            ['Gare de Salé-Ville', 34.03640, -6.81840],
            ['Bab Lamrissa', 34.03190, -6.82060],
            ['Pont Hassan II', 34.02734, -6.81945],
            ['Place du 16 Novembre', 34.02420, -6.82470],
            ['Tour Hassan', 34.02070, -6.82650],
            ['Place Al Joulane L1', 34.01760, -6.83090],
            ['Mohammed V - Gare de Rabat-Ville', 34.01730, -6.83550],
            ['Bab Rouah', 34.01300, -6.83960],
            ['Bibliothèque Nationale', 34.00920, -6.84210],
            ['Stade Al Madina', 34.00520, -6.84320],
            ['Nations-Unies', 34.00150, -6.84440],
            ['Agdal - Av. de France', 33.99800, -6.84930],
            ['Ibn Sina', 33.99560, -6.85240],
            ['Ibn Rochd', 33.99010, -6.85750],
            ['Cité Universitaire Souissi', 33.98540, -6.86210],
            ['Madinat Al Irfane', 33.98030, -6.86580]
        ],
        line2: [
            ['Hassan II', 34.03510, -6.79820],
            ['Bettana', 34.03610, -6.80640],
            ['Arrazi', 34.03580, -6.81310],
            ['Bab Lamrissa', 34.03190, -6.82060],
            ['Pont Hassan II', 34.02734, -6.81945],
            ['Place du 16 Novembre', 34.02420, -6.82470],
            ['Tour Hassan', 34.02070, -6.82650],
            ['Place Al Joulane L2', 34.01740, -6.83130],
            ['Bab Chellah', 34.02270, -6.83490],
            ['Médina', 34.02160, -6.83870],
            ['Bab El Had', 34.01980, -6.84360],
            ['Place de Russie', 34.01750, -6.85030],
            ['Sidi Mohamed Ben Abdellah', 34.01460, -6.85600],
            ['Hôpital Moulay Youssef', 34.01220, -6.86140]
        ],
        commonPath: [
            [34.03190, -6.82060],
            [34.02960, -6.82010],
            [34.02734, -6.81945],
            [34.02550, -6.82210],
            [34.02420, -6.82470],
            [34.02230, -6.82550],
            [34.02070, -6.82650],
            [34.01870, -6.82900],
            [34.01760, -6.83090]
        ],
        line1Path: [
            [34.05780, -6.79020],
            [34.05540, -6.79230],
            [34.05270, -6.79850],
            [34.04980, -6.80240],
            [34.04760, -6.80570],
            [34.04410, -6.81080],
            [34.04040, -6.81530],
            [34.03640, -6.81840],
            [34.03190, -6.82060],
            [34.02960, -6.82010],
            [34.02734, -6.81945],
            [34.02550, -6.82210],
            [34.02420, -6.82470],
            [34.02230, -6.82550],
            [34.02070, -6.82650],
            [34.01870, -6.82900],
            [34.01760, -6.83090],
            [34.01730, -6.83550],
            [34.01520, -6.83810],
            [34.01300, -6.83960],
            [34.00920, -6.84210],
            [34.00520, -6.84320],
            [34.00150, -6.84440],
            [33.99800, -6.84930],
            [33.99560, -6.85240],
            [33.99010, -6.85750],
            [33.98540, -6.86210],
            [33.98030, -6.86580]
        ],
        line2Path: [
            [34.03510, -6.79820],
            [34.03570, -6.80260],
            [34.03610, -6.80640],
            [34.03580, -6.81310],
            [34.03190, -6.82060],
            [34.02960, -6.82010],
            [34.02734, -6.81945],
            [34.02550, -6.82210],
            [34.02420, -6.82470],
            [34.02230, -6.82550],
            [34.02070, -6.82650],
            [34.01870, -6.82900],
            [34.01740, -6.83130],
            [34.02010, -6.83310],
            [34.02270, -6.83490],
            [34.02160, -6.83870],
            [34.01980, -6.84360],
            [34.01870, -6.84720],
            [34.01750, -6.85030],
            [34.01460, -6.85600],
            [34.01220, -6.86140]
        ],
        monuments: [
            // Coordonnées replacées sur les monuments réels afin d’éviter les marqueurs dans la mer
            // ou dans des quartiers trop éloignés. L’ordre correspond à data().monuments pour le clic depuis la liste.
            ['Tour Hassan', 34.02405, -6.82205],
            ['Mausolée Mohammed V', 34.02362, -6.82178],
            ['Kasbah des Oudayas', 34.03105, -6.83525],
            ['Ruelles bleues des Oudayas', 34.03095, -6.83555],
            ['Jardins des Oudayas', 34.03062, -6.83505],
            ['Chellah', 34.00695, -6.82195],
            ['Porte de Chellah', 34.00728, -6.82265],
            ['Musée Mohammed VI', 34.01810, -6.83215],
            ['Médina de Rabat', 34.02465, -6.83735],
            ['Bab El Had', 34.02068, -6.84262],
            ['Bab Lamrissa', 34.03190, -6.82080],
            ['Bibliothèque Nationale', 34.00885, -6.84238],
            ['Bab Rouah', 34.01295, -6.83955],
            ['Avenue Mohammed V', 34.01810, -6.83330],
            ['Gare Rabat-Ville', 34.01730, -6.83545],
            ['Marina Bouregreg', 34.02655, -6.82555],
            ['Cathédrale Saint-Pierre', 34.01705, -6.83070],
            ['Musée Archéologique de Rabat', 34.01375, -6.83225],
            ['Musée de Bank Al-Maghrib', 34.01830, -6.83485],
            ['Jardin d’Essais Botaniques', 34.00570, -6.84715],
            ['Bab El Alou', 34.02415, -6.84485],
            ['Musée National de la Photographie', 34.02905, -6.84285],
            ['Parlement du Maroc', 34.01825, -6.83305],
            ['Mosquée Assounna', 34.01585, -6.83005],
            ['Oudaya Museum', 34.03088, -6.83532]
        ]
    };

    const updateLanguageButton = () => {
        const current = document.getElementById('languageCurrent');
        const options = document.querySelectorAll('.language-option');
        if (current) current.textContent = languageLabels[currentLang] || languageLabels.fr;
        options.forEach((option) => {
            const isSelected = normalizeLang(option.dataset.lang) === currentLang;
            option.classList.toggle('active', isSelected);
            option.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });
    };

    const applyStaticTranslations = () => {
        const activePack = pack();
        document.documentElement.lang = activePack.meta.lang;
        document.documentElement.dir = activePack.meta.dir;
        document.body.classList.toggle('rtl', activePack.meta.dir === 'rtl');
        document.title = activePack.titles[config.page || document.body.dataset.page || 'home'] || 'CityTram Guide';

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            element.textContent = t(element.dataset.i18n);
        });

        document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
            element.dataset.i18nAttr.split(';').forEach((instruction) => {
                const [attribute, key] = instruction.split(':');
                if (attribute && key) element.setAttribute(attribute.trim(), t(key.trim()));
            });
        });

        updateLanguageButton();
    };

    const setApp = (markup) => {
        if (!app) return;
        app.innerHTML = markup;
        requestAnimationFrame(() => {
            document.querySelectorAll('.reveal').forEach((element, index) => {
                element.style.transitionDelay = `${index * 55}ms`;
                element.classList.add('visible');
            });
        });
    };

    const pageHero = ({ eyebrow, title, text, action = '' }) => html`
        <section class="page-hero reveal">
            <div>
                <p class="eyebrow">${eyebrow}</p>
                <h1>${title}</h1>
                <p>${text}</p>
            </div>
            ${action}
        </section>
    `;

    const monumentCard = (monument) => html`
        <article class="monument-card searchable" data-search="${monument.name} ${monument.category} ${monument.station}">
            <img src="${img(monument.image)}" alt="${monument.name}">
            <div class="card-body">
                <div class="tag-row"><span class="pill">${monument.category}</span><span class="walk">${monument.walk}</span></div>
                <h3>${monument.name}</h3>
                <p>${monument.desc}</p>
                <div class="station-mini"><span>◎</span><div><b>${monument.station}</b><small>${t('common.stationClosest')} · ${monument.address}</small></div></div>
            </div>
        </article>
    `;

    const circuitCard = (circuit, large = false) => html`
        <article class="circuit-card ${large ? 'large-card' : ''}">
            <img src="${img(circuit.image)}" alt="${circuit.name}">
            <div class="card-body">
                <div class="tag-row"><span class="pill">${t('circuits.pill')}</span><span class="rating">${circuit.rating} ★</span></div>
                <h3>${circuit.name}</h3>
                <p>${circuit.desc}</p>
                <div class="meta"><span>◷ ${circuit.duration}</span><span>⌖ ${circuit.stations} ${t('common.stations')}</span></div>
                ${large ? `<button class="btn btn-outline slim js-route" data-circuit="${circuit.name}">${t('common.routeButton')}</button>` : ''}
            </div>
        </article>
    `;

    const bindSimpleSearch = (inputSelector, gridSelector) => {
        const input = document.querySelector(inputSelector);
        const grid = document.querySelector(gridSelector);
        input?.addEventListener('input', () => {
            const value = input.value.toLowerCase().trim();
            grid?.querySelectorAll('.searchable').forEach(card => {
                card.hidden = !card.dataset.search.toLowerCase().includes(value);
            });
        });
    };

    const bindSearchAndFilter = (inputSelector, tabsSelector, gridSelector) => {
        const input = document.querySelector(inputSelector);
        const tabs = document.querySelector(tabsSelector);
        const grid = document.querySelector(gridSelector);
        let activeCategory = t('filters.all');

        const apply = () => {
            const query = (input?.value || '').toLowerCase().trim();
            grid?.querySelectorAll('.searchable').forEach(card => {
                const search = card.dataset.search.toLowerCase();
                const matchQuery = search.includes(query);
                const matchCategory = activeCategory === t('filters.all') || search.includes(activeCategory.toLowerCase());
                card.hidden = !(matchQuery && matchCategory);
            });
        };

        input?.addEventListener('input', apply);
        tabs?.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                tabs.querySelectorAll('button').forEach(item => item.classList.remove('active'));
                button.classList.add('active');
                activeCategory = button.dataset.filter;
                apply();
            });
        });
    };

    const bindMap = () => {
        const mapEl = document.getElementById('leafletMap');
        const tooltip = document.getElementById('mapTooltip');
        const tabs = document.querySelectorAll('.map-tabs button');
        const listItems = document.querySelectorAll('.map-list-item');
        if (!mapEl) return;

        if (!window.L) {
            mapEl.innerHTML = `<div class="leaflet-fallback">${t('mapPage.leafletFallback')}</div>`;
            return;
        }

        const line1Color = '#d91f82';
        const line2Color = '#752f78';
        const commonColor = '#7d3c98';
        const map = L.map(mapEl, { scrollWheelZoom: true }).setView(tramGeo.center, 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const stationLayer = L.layerGroup().addTo(map);
        const monumentLayer = L.layerGroup().addTo(map);
        const routeLayer1 = L.layerGroup().addTo(map);
        const routeLayer2 = L.layerGroup().addTo(map);
        const monumentMarkers = [];

        const makeIcon = (className, label) => L.divIcon({
            className: `tram-div-icon ${className}`,
            html: `<span>${label}</span>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            popupAnchor: [0, -12]
        });

        const coords = (items) => items.map(item => typeof item[0] === 'string' ? [item[1], item[2]] : [item[0], item[1]]);
        const isImportantLabel = (station) => tramGeo.labelStations.includes(station[0]) || station[0].startsWith('Place Al Joulane');
        const drawMonumentMarkers = () => {
            monumentMarkers.length = 0;
            tramGeo.monuments.forEach((monument, index) => {
                const marker = L.marker([monument[1], monument[2]], { icon: makeIcon('monument', '▥') })
                    .bindPopup(`<strong>${monument[0]}</strong><br>${t('filters.monuments')}`)
                    .addTo(monumentLayer);
                monumentMarkers[index] = marker;
            });
        };
        const drawRoutes = (includeLine1 = true, includeLine2 = true) => {
            if (includeLine1) {
                L.polyline(coords(tramGeo.line1Path), { color: line1Color, weight: 7, opacity: .94, smoothFactor: 1 }).addTo(routeLayer1);
            }
            if (includeLine2) {
                L.polyline(coords(tramGeo.line2Path), { color: line2Color, weight: 7, opacity: .94, smoothFactor: 1 }).addTo(routeLayer2);
            }
            if (includeLine1 || includeLine2) {
                L.polyline(coords(tramGeo.commonPath), { color: commonColor, weight: 11, opacity: .35, smoothFactor: 1 }).addTo(includeLine1 ? routeLayer1 : routeLayer2);
            }
        };
        drawRoutes(true, true);

        tramGeo.line1.forEach((station) => {
            const marker = L.marker([station[1], station[2]], { icon: makeIcon('line1', '1') })
                .bindPopup(`<strong>${station[0]}</strong><br>${data().lines[0].name}`);
            if (isImportantLabel(station)) marker.bindTooltip(station[0].replace(' L1', ''), { permanent: true, direction: 'top', className: 'station-label' });
            marker.addTo(stationLayer);
        });
        tramGeo.line2.forEach((station) => {
            const marker = L.marker([station[1], station[2]], { icon: makeIcon('line2', '2') })
                .bindPopup(`<strong>${station[0]}</strong><br>${data().lines[1].name}`);
            if (isImportantLabel(station)) marker.bindTooltip(station[0].replace(' L2', ''), { permanent: true, direction: 'top', className: 'station-label' });
            marker.addTo(stationLayer);
        });
        drawMonumentMarkers();

        const allBounds = L.latLngBounds([...coords(tramGeo.line1Path), ...coords(tramGeo.line2Path), ...coords(tramGeo.monuments)]);
        map.fitBounds(allBounds, { padding: [28, 28] });
        setTimeout(() => map.invalidateSize(), 180);

        const showType = (type) => {
            stationLayer.clearLayers();
            monumentLayer.clearLayers();
            routeLayer1.clearLayers();
            routeLayer2.clearLayers();

            if (type === 'all' || type === 'line1') {
                drawRoutes(true, false);
                tramGeo.line1.forEach((station) => {
                    const marker = L.marker([station[1], station[2]], { icon: makeIcon('line1', '1') }).bindPopup(`<strong>${station[0]}</strong><br>${data().lines[0].name}`);
                    if (isImportantLabel(station)) marker.bindTooltip(station[0].replace(' L1', ''), { permanent: true, direction: 'top', className: 'station-label' });
                    marker.addTo(stationLayer);
                });
            }
            if (type === 'all' || type === 'line2') {
                drawRoutes(false, true);
                tramGeo.line2.forEach((station) => {
                    const marker = L.marker([station[1], station[2]], { icon: makeIcon('line2', '2') }).bindPopup(`<strong>${station[0]}</strong><br>${data().lines[1].name}`);
                    if (isImportantLabel(station)) marker.bindTooltip(station[0].replace(' L2', ''), { permanent: true, direction: 'top', className: 'station-label' });
                    marker.addTo(stationLayer);
                });
            }
            if (type === 'all' || type === 'monuments') {
                drawMonumentMarkers();
            }

            listItems.forEach(item => item.hidden = type !== 'all' && item.dataset.type !== type);
            const boundsByType = type === 'line1' ? coords(tramGeo.line1Path) : type === 'line2' ? coords(tramGeo.line2Path) : type === 'monuments' ? coords(tramGeo.monuments) : [...coords(tramGeo.line1Path), ...coords(tramGeo.line2Path), ...coords(tramGeo.monuments)];
            map.fitBounds(L.latLngBounds(boundsByType), { padding: [28, 28] });
            if (tooltip) tooltip.textContent = type === 'all' ? t('mapPage.leafletText') : `${t('common.map')} · ${type.toUpperCase()}`;
        };

        const activateTab = (type) => {
            const button = document.querySelector(`.map-tabs button[data-map="${type}"]`);
            if (button) {
                tabs.forEach(tab => tab.classList.remove('active'));
                button.classList.add('active');
            }
            showType(type);
        };

        tabs.forEach(button => {
            button.addEventListener('click', () => activateTab(button.dataset.map));
        });

        const focusMonument = (index) => {
            const monument = tramGeo.monuments[index];
            if (!monument) return;
            activateTab('all');
            listItems.forEach(item => item.classList.remove('map-focus-active'));
            const card = document.querySelector(`.map-list-item[data-monument-index="${index}"]`);
            card?.classList.add('map-focus-active');
            map.flyTo([monument[1], monument[2]], 17, { duration: .85 });
            window.setTimeout(() => {
                const marker = monumentMarkers[index];
                if (marker) marker.openPopup();
            }, 700);
            if (tooltip) tooltip.textContent = `${t('filters.monuments')} · ${monument[0]}`;
        };

        listItems.forEach(item => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            const openItem = () => {
                if (item.dataset.monumentIndex !== undefined) {
                    focusMonument(Number(item.dataset.monumentIndex));
                    return;
                }
                if (item.dataset.type === 'line1' || item.dataset.type === 'line2') {
                    activateTab(item.dataset.type);
                }
            };
            item.addEventListener('click', openItem);
            item.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openItem();
                }
            });
        });

        const params = new URLSearchParams(window.location.search);
        const focus = params.get('focus');
        const monumentIndex = Number(params.get('monumentIndex'));
        if (Number.isInteger(monumentIndex) && monumentIndex >= 0) {
            window.setTimeout(() => focusMonument(monumentIndex), 260);
            return;
        }
        if (focus === 'line1' || focus === 'line2' || focus === 'monuments') {
            const button = document.querySelector(`.map-tabs button[data-map="${focus}"]`);
            button?.click();
        }
    };

    const showToast = (message) => {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('active');
        window.setTimeout(() => toast.classList.remove('active'), 2600);
    };

    const initShell = () => {
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        menuToggle?.addEventListener('click', () => sidebar?.classList.toggle('open'));

        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('citytram-theme');
        if (savedTheme === 'dark') document.body.classList.add('dark');
        themeToggle?.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('citytram-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        });

        const languageSelect = document.getElementById('languageSelect');
        const languageButton = document.getElementById('languageButton');
        const languageOptions = document.querySelectorAll('.language-option');

        const closeLanguageMenu = () => {
            languageSelect?.classList.remove('open');
            languageButton?.setAttribute('aria-expanded', 'false');
        };

        const setLanguage = (lang) => {
            currentLang = normalizeLang(lang);
            localStorage.setItem('citytram-lang', currentLang);
            const url = new URL(window.location.href);
            url.searchParams.set('lang', currentLang);
            window.history.replaceState({}, '', url);
            updateLanguageButton();
            closeLanguageMenu();
            window.CityTram.renderActivePage();
        };

        updateLanguageButton();
        languageButton?.addEventListener('click', (event) => {
            event.stopPropagation();
            const willOpen = !languageSelect?.classList.contains('open');
            languageSelect?.classList.toggle('open', willOpen);
            languageButton.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });

        languageOptions.forEach((option) => {
            option.addEventListener('click', () => setLanguage(option.dataset.lang));
        });

        document.addEventListener('click', (event) => {
            if (!languageSelect?.contains(event.target)) closeLanguageMenu();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeLanguageMenu();
        });
    };


    const renderActivePage = () => {
        applyStaticTranslations();
        const currentPage = config.page || document.body.dataset.page || 'home';
        const pages = window.CityTramPages || {};
        const render = pages[currentPage] || pages.home;
        if (typeof render === 'function') render();
    };

    window.CityTramPages = window.CityTramPages || {};
    window.CityTram = {
        config,
        routes,
        staticUrl,
        img,
        html,
        t,
        data,
        route,
        tramGeo,
        applyStaticTranslations,
        setApp,
        pageHero,
        monumentCard,
        circuitCard,
        bindSimpleSearch,
        bindSearchAndFilter,
        bindMap,
        showToast,
        renderActivePage
    };

    document.addEventListener('DOMContentLoaded', () => {
        initShell();
        renderActivePage();
    });
})();
