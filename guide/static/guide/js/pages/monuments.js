(() => {
    'use strict';

    window.CityTramPages = window.CityTramPages || {};
    const { html, t, data, route, img, setApp, bindSearchAndFilter } = window.CityTram;

    const hoursByName = {
        'Tour Hassan': '09:00 - 18:00',
        'Mausolée Mohammed V': '09:00 - 18:00',
        'Kasbah des Oudayas': '09:00 - 18:30',
        'Chellah': '09:00 - 17:30',
        'Musée Mohammed VI': '10:00 - 18:00',
        'Médina de Rabat': 'Accès libre',
        'Bab El Had': 'Accès libre',
        'Bab Lamrissa': 'Accès libre',
        'Bibliothèque Nationale': '09:00 - 18:00',
        'Jardins des Oudayas': '09:00 - 18:30'
    };

    const renderMonuments = () => {
        const categories = [t('filters.all'), ...new Set(data().monuments.map(item => item.category))];
        setApp(html`
            <section class="page-hero reveal visitor-hero">
                <div>
                    <p class="eyebrow">Monuments</p>
                    <h1>Monuments de Rabat-Salé</h1>
                    <p>Découvrez les monuments avec photo, description, adresse, horaires, station la plus proche et temps de marche estimé.</p>
                    <div class="search-box inline-search"><span>⌕</span><input id="searchInput" type="search" placeholder="Rechercher un monument..."></div>
                </div>
                <a class="btn btn-red" href="${route('carte')}">Voir sur la carte</a>
            </section>

            <div class="filter-tabs reveal" id="categoryTabs">
                ${categories.map((category, index) => `<button type="button" class="${index === 0 ? 'active' : ''}" data-filter="${category}">${category}</button>`).join('')}
            </div>

            <div class="monument-detail-grid reveal" id="cardGrid">
                ${data().monuments.map((monument, index) => html`
                    <article class="monument-detail-card searchable" data-search="${monument.name} ${monument.category} ${monument.station} ${monument.address}">
                        <img src="${img(monument.image)}" alt="${monument.name}" onerror="this.onerror=null;this.src='${img(monument.fallback || 'tour_hassan.png')}'">
                        <div class="card-body">
                            <div class="tag-row"><span class="pill">${monument.category}</span><span class="walk">${monument.walk}</span></div>
                            <h3>${monument.name}</h3>
                            <p>${monument.desc}</p>
                            <div class="detail-list">
                                <span><b>Adresse</b><small>${monument.address}</small></span>
                                <span><b>Horaires</b><small>${hoursByName[monument.name] || 'Horaires variables'}</small></span>
                                <span><b>Station proche</b><small>${monument.station} · ${monument.walk} à pied</small></span>
                            </div>
                            <a class="btn btn-outline slim" href="${route('carte')}?monumentIndex=${index}">Voir sur la carte</a>
                        </div>
                    </article>
                `).join('')}
            </div>
        `);
        bindSearchAndFilter('#searchInput', '#categoryTabs', '#cardGrid');

        const requestedMonument = new URLSearchParams(window.location.search).get('monument');
        if (requestedMonument) {
            const decoded = decodeURIComponent(requestedMonument);
            const input = document.getElementById('searchInput');
            if (input) {
                input.value = decoded;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
            const target = [...document.querySelectorAll('.monument-detail-card')]
                .find(card => (card.dataset.search || '').toLowerCase().includes(decoded.toLowerCase()));
            if (target) {
                target.classList.add('monument-focus-card');
                window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
            }
        }
    };

    window.CityTramPages.monuments = renderMonuments;
})();
