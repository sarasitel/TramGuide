(() => {
    'use strict';

    window.CityTramPages = window.CityTramPages || {};
    const { html, route, img, setApp, data, tramGeo } = window.CityTram;

    const circuits = [
        {
            name: 'Circuit Tour Hassan',
            theme: 'Historique',
            duration: '18 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tour_Hassan-Rabat.jpg?width=1400',
            desc: 'Un circuit court autour du quartier Hassan pour découvrir les monuments les plus symboliques de Rabat. Le parcours présente les étapes principales et les stations à utiliser pour découvrir facilement le quartier.',
            monuments: ['Tour Hassan', 'Mausolée Mohammed V'],
            stations: ['Tour Hassan']
        },
        {
            name: 'Circuit Oudayas bleu',
            theme: 'Patrimoine',
            duration: '24 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ruelle%20bleue%2C%20Kasbah%20des%20Oudayas%20%28Rabat%2C%20Maroc%29%20%2815561666480%29.jpg?width=1400',
            desc: 'Ce circuit mène vers l’ambiance traditionnelle des Oudayas. Il regroupe la Kasbah, les ruelles bleues et les jardins andalous, avec des stations proches pour commencer la visite facilement.',
            monuments: ['Kasbah des Oudayas', 'Ruelles bleues des Oudayas', 'Jardins des Oudayas'],
            stations: ['Médina', 'Bab Chellah']
        },
        {
            name: 'Circuit Chellah',
            theme: 'Archéologique',
            duration: '26 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gate%20of%20Chellah%2C%202019.jpg?width=1400',
            desc: 'Un parcours orienté histoire et patrimoine archéologique. Il présente l’accès à Chellah, sa porte monumentale et son site historique depuis une station de la ligne 2.',
            monuments: ['Porte de Chellah', 'Chellah'],
            stations: ['Bab Chellah']
        },
        {
            name: 'Circuit Médina',
            theme: 'Traditionnel',
            duration: '22 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rue%20des%20consuls%20Rabat%202020.jpg?width=1400',
            desc: 'Un circuit pratique pour découvrir l’entrée de la médina et ses ruelles commerciales. Il commence près de Bab El Had et continue vers les lieux patrimoniaux proches.',
            monuments: ['Bab El Had', 'Médina de Rabat', 'Bab El Alou'],
            stations: ['Bab El Had']
        },
        {
            name: 'Circuit Musées du centre',
            theme: 'Culturel',
            duration: '25 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rabat%20Mohammed%20VI%20Museum.jpg?width=1400',
            desc: 'Un circuit culturel au centre-ville de Rabat. Il relie les musées, l’avenue Mohammed V et des bâtiments importants proches de la gare Rabat-Ville.',
            monuments: ['Musée Mohammed VI', 'Musée de Bank Al-Maghrib', 'Avenue Mohammed V', 'Gare Rabat-Ville'],
            stations: ['Mohammed V - Gare de Rabat-Ville', 'Place Al Joulane']
        },
        {
            name: 'Circuit Bibliothèque & Agdal',
            theme: 'Étudiant',
            duration: '20 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Biblioth%C3%A8que%20Nationale%20du%20Royaume%20du%20Maroc.jpg?width=1400',
            desc: 'Un parcours adapté aux étudiants et visiteurs de l’Agdal. Il met en avant la Bibliothèque Nationale et le Jardin d’Essais Botaniques à partir de la ligne 1.',
            monuments: ['Bibliothèque Nationale', 'Jardin d’Essais Botaniques'],
            stations: ['Bibliothèque Nationale', 'Stade Al Madina']
        },
        {
            name: 'Circuit Salé historique',
            theme: 'Patrimoine',
            duration: '19 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Porte%20Bab%20Lamrissa.JPG?width=1400',
            desc: 'Un circuit court côté Salé pour découvrir Bab Lamrissa, l’ancienne médina et la rive du Bouregreg à proximité du tronc commun.',
            monuments: ['Bab Lamrissa', 'Marina Bouregreg'],
            stations: ['Bab Lamrissa', 'Pont Hassan II']
        },
        {
            name: 'Circuit Bouregreg',
            theme: 'Panoramique',
            duration: '26 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Eagle%20Hills%20Morocco%2C%20Marina%20Bouregreg%20-%20Rabat.jpg?width=1400',
            desc: 'Un circuit de promenade avec vue sur le fleuve Bouregreg, le pont Hassan II et les deux rives Rabat-Salé. Il est utile pour une visite calme et visuelle.',
            monuments: ['Marina Bouregreg', 'Tour Hassan', 'Mausolée Mohammed V'],
            stations: ['Pont Hassan II', 'Tour Hassan']
        },
        {
            name: 'Circuit Portes de Rabat',
            theme: 'Historique',
            duration: '25 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rabat%20-%20Bab%20ar-Rwah%20-%2020200827211905.jpg?width=1400',
            desc: 'Ce parcours regroupe plusieurs portes historiques de Rabat. Il aide le visiteur à comprendre les anciens accès de la ville et les remparts.',
            monuments: ['Bab Rouah', 'Bab El Had', 'Bab El Alou'],
            stations: ['Bab Rouah', 'Bab El Had']
        },
        {
            name: 'Circuit Photographie',
            theme: 'Moderne',
            duration: '28 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/National%20Photography%20Museum%20%28Morocco%29.jpeg?width=1400',
            desc: 'Un circuit orienté photographie et vues urbaines. Il associe le Musée National de la Photographie, la Kasbah et les ruelles des Oudayas.',
            monuments: ['Musée National de la Photographie', 'Kasbah des Oudayas', 'Ruelles bleues des Oudayas'],
            stations: ['Médina']
        },
        {
            name: 'Circuit Avenue Mohammed V',
            theme: 'Urbain',
            duration: '21 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20view%20of%20Ave%20Mohammed%20V%2C%20Rabat.jpg?width=1400',
            desc: 'Un parcours urbain dans le centre de Rabat. Il permet de voir la gare, l’avenue Mohammed V, le Parlement et les lieux proches de la ligne 1.',
            monuments: ['Gare Rabat-Ville', 'Avenue Mohammed V', 'Parlement du Maroc', 'Musée de Bank Al-Maghrib'],
            stations: ['Mohammed V - Gare de Rabat-Ville']
        },
        {
            name: 'Circuit Culture & architecture',
            theme: 'Culturel',
            duration: '27 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/La%20Cath%C3%A9drale%20de%20Rabat.jpg?width=1400',
            desc: 'Un circuit pour découvrir des lieux culturels et architecturaux proches du centre-ville : cathédrale, musée archéologique et mosquée Assounna.',
            monuments: ['Cathédrale Saint-Pierre', 'Musée Archéologique de Rabat', 'Mosquée Assounna'],
            stations: ['Place Al Joulane']
        },
        {
            name: 'Circuit Nature',
            theme: 'Famille',
            duration: '27 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jardin%20essais%20botaniques%20Rabat%20Maroc%204-photo%20bertrand%20SOUBEYRAND.jpg?width=1400',
            desc: 'Un parcours simple pour une balade plus calme autour de la Bibliothèque Nationale et du Jardin d’Essais Botaniques.',
            monuments: ['Bibliothèque Nationale', 'Jardin d’Essais Botaniques'],
            stations: ['Bibliothèque Nationale']
        },
        {
            name: 'Circuit Oudayas musée',
            theme: 'Culturel',
            duration: '23 min',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mus%C3%A9e%20des%20Oudayas%20interior%20courtyard.jpg?width=1400',
            desc: 'Un circuit autour des Oudayas avec une orientation musée et patrimoine. Il complète la visite des ruelles et des jardins par l’Oudaya Museum.',
            monuments: ['Oudaya Museum', 'Jardins des Oudayas', 'Kasbah des Oudayas'],
            stations: ['Médina']
        }
    ];

    const normalizeStation = (value) => String(value || '').replace(/\s+L[12]$/i, '').trim();

    const lineForStation = (stationName) => {
        const name = normalizeStation(stationName);
        const inLine1 = tramGeo.line1.some(station => normalizeStation(station[0]) === name);
        const inLine2 = tramGeo.line2.some(station => normalizeStation(station[0]) === name);
        if (inLine1 && inLine2) return 'Lignes 1 et 2';
        if (inLine1) return 'Ligne 1';
        if (inLine2) return 'Ligne 2';
        return 'Station proche';
    };

    const stationLineClass = (lineLabel) => {
        if (/Lignes 1 et 2/i.test(lineLabel)) return 'common';
        if (/Ligne 1/i.test(lineLabel)) return 'line1';
        if (/Ligne 2/i.test(lineLabel)) return 'line2';
        return 'neutral';
    };

    const monumentByName = (name) => data().monuments.find(monument => monument.name === name) || {
        name,
        image: 'tour_hassan.png',
        fallback: 'tour_hassan.png',
        station: 'Station proche',
        desc: 'Monument inclus dans ce circuit.'
    };

    const bindCircuitCards = () => {
        document.querySelectorAll('[data-circuit-index]').forEach((card) => {
            const open = () => renderCircuitDetail(Number(card.dataset.circuitIndex));
            card.addEventListener('click', open);
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    open();
                }
            });
        });
    };

    const renderCircuits = () => {
        const selected = new URLSearchParams(window.location.search).get('circuit');
        if (selected !== null && circuits[Number(selected)]) {
            renderCircuitDetail(Number(selected), false);
            return;
        }

        setApp(html`
            <section class="page-hero reveal visitor-hero">
                <div>
                    <p class="eyebrow">Parcours touristiques</p>
                    <h1>Circuits prédéfinis</h1>
                    <p>Consultez les circuits touristiques, leurs durées, les monuments inclus et les stations concernées.</p>
                </div>
                <a class="btn btn-red" href="${route('carte')}">Voir la carte</a>
            </section>

            <div class="circuit-list-grid reveal">
                ${circuits.map((circuit, index) => html`
                    <article class="circuit-list-card" role="button" tabindex="0" data-circuit-index="${index}" aria-label="Voir le détail du ${circuit.name}">
                        <div class="circuit-cover"><img src="${img(circuit.image)}" alt="${circuit.name}" onerror="this.onerror=null;this.src='${img('tour_hassan.png')}'"><span>${circuit.theme}</span></div>
                        <div class="card-body">
                            <h3>${circuit.name}</h3>
                            <div class="circuit-summary-stats" aria-label="Résumé du circuit">
                                <span><b>${circuit.duration}</b><small>Durée totale estimée</small></span>
                                <span><b>${circuit.monuments.length}</b><small>Monuments inclus</small></span>
                                <span><b>${circuit.stations.length}</b><small>Stations concernées</small></span>
                            </div>
                        </div>
                    </article>
                `).join('')}
            </div>
        `);
        bindCircuitCards();
    };

    const renderCircuitDetail = (index, updateUrl = true) => {
        const circuit = circuits[index];
        if (!circuit) return renderCircuits();
        if (updateUrl) {
            const url = new URL(window.location.href);
            url.searchParams.set('circuit', String(index));
            window.history.pushState({}, '', url);
        }

        const monuments = circuit.monuments.map(monumentByName);
        const stations = circuit.stations.map(station => {
            const line = lineForStation(station);
            return { name: station, line, lineClass: stationLineClass(line) };
        });

        setApp(html`
            <section class="page-hero reveal visitor-hero circuit-detail-hero">
                <div>
                    <p class="eyebrow">Détail du circuit</p>
                    <h1>${circuit.name}</h1>
                    <p>${circuit.desc}</p>
                    <div class="detail-stats compact-stats">
                        <span><b>${circuit.duration}</b><small>Durée totale estimée</small></span>
                        <span><b>${monuments.length}</b><small>Monuments inclus</small></span>
                        <span><b>${stations.length}</b><small>Stations concernées</small></span>
                    </div>
                </div>
                <button type="button" class="btn btn-outline" id="backCircuits">Retour aux circuits</button>
            </section>

            <section class="circuit-detail-page reveal">
                <article class="circuit-detail-panel">
                    <h2>Monuments du circuit</h2>
                    <p class="section-help">Liste des monuments dans l’ordre de visite. Chaque lien ouvre la fiche du monument.</p>
                    <div class="circuit-monument-list">
                        ${monuments.map((monument, position) => html`
                            <a class="circuit-monument-row" href="${route('monuments')}?monument=${encodeURIComponent(monument.name)}">
                                <span class="step-number">${position + 1}</span>
                                <img src="${img(monument.image)}" alt="${monument.name}" onerror="this.onerror=null;this.src='${img(monument.fallback || 'tour_hassan.png')}'">
                                <span>
                                    <strong>${monument.name}</strong>
                                    <small>${monument.station} · ${monument.desc}</small>
                                </span>
                            </a>
                        `).join('')}
                    </div>
                </article>

                <aside class="circuit-detail-panel">
                    <h2>Stations concernées</h2>
                    <p class="section-help">Stations dans l’ordre du trajet.</p>
                    <ol class="circuit-station-list">
                        ${stations.map((station) => html`
                            <li class="${station.lineClass}">
                                <strong>${station.name}</strong>
                                <small>${station.line}</small>
                            </li>
                        `).join('')}
                    </ol>
                </aside>
            </section>
        `);

        document.getElementById('backCircuits')?.addEventListener('click', () => {
            const url = new URL(window.location.href);
            url.searchParams.delete('circuit');
            window.history.pushState({}, '', url);
            renderCircuits();
        });
    };

    window.addEventListener('popstate', renderCircuits);
    window.CityTramPages.circuits = renderCircuits;
})();
