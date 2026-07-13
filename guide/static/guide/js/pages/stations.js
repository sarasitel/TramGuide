(() => {
    'use strict';

    window.CityTramPages = window.CityTramPages || {};
    const { html, data, route, setApp, tramGeo } = window.CityTram;

    const cleanName = (name) => String(name).replace(' L1', '').replace(' L2', '');
    const zoneFromName = (name) => {
        if (['Hay Karima', 'Tabriquet', 'La Poste', 'Mohammed V - Opéra', 'Diar', 'Gare de Salé-Ville', 'Bab Lamrissa', 'Hassan II', 'Bettana', 'Arrazi'].some(item => name.includes(item))) return 'Salé';
        if (['Agdal', 'Ibn', 'Nations', 'Cité', 'Madinat', 'Stade'].some(item => name.includes(item))) return 'Agdal / Souissi';
        if (['Bab El Had', 'Médina', 'Place de Russie', 'Sidi Mohamed'].some(item => name.includes(item))) return 'Médina';
        return 'Rabat centre';
    };

    const buildStations = () => {
        const line1 = tramGeo.line1.map((station, index) => ({
            name: cleanName(station[0]),
            line: 'Ligne 1',
            lineKey: 'line1',
            order: index + 1,
            zone: zoneFromName(station[0]),
            frequency: data().lines[0]?.freq || '8 min'
        }));
        const line2 = tramGeo.line2.map((station, index) => ({
            name: cleanName(station[0]),
            line: 'Ligne 2',
            lineKey: 'line2',
            order: index + 1,
            zone: zoneFromName(station[0]),
            frequency: data().lines[1]?.freq || '9 min'
        }));
        return { line1, line2, all: [...line1, ...line2] };
    };

    const stationCard = (station) => html`
        <article class="station-detail-row station-compact-row searchable" data-line="${station.lineKey}" data-zone="${station.zone}" data-search="${station.name} ${station.line} ${station.zone}">
            <div class="station-number ${station.lineKey}">${station.order}</div>
            <div class="station-content">
                <div class="station-title-row"><h3>${station.name}</h3><span>${station.line}</span></div>
                <div class="station-detail-grid-inner station-detail-grid-clean station-mini-info">
                    <small><b>Zone</b>${station.zone}</small>
                    <small><b>Passage indicatif</b>Toutes les ${station.frequency}</small>
                </div>
                <a href="${route('carte')}?focus=${station.lineKey}" class="btn btn-outline slim">Voir sur la carte</a>
            </div>
        </article>
    `;

    const renderStations = () => {
        const stationGroups = buildStations();
        const zones = ['Toutes les zones', ...new Set(stationGroups.all.map(station => station.zone))];
        setApp(html`
            <section class="page-hero station-hero reveal">
                <div>
                    <p class="eyebrow">Stations</p>
                    <h1>Stations de tramway</h1>
                    <p>Consultez les stations séparées en deux colonnes : Ligne 1 et Ligne 2, avec la zone et les horaires de passage indicatifs.</p>
                    <div class="station-tools">
                        <div class="search-box"><span>⌕</span><input id="stationSearch" type="search" placeholder="Rechercher une station..."></div>
                        <select id="zoneFilter" class="filter-select">${zones.map(zone => `<option value="${zone}">${zone}</option>`).join('')}</select>
                    </div>
                </div>
            </section>

            <div class="filter-tabs reveal station-line-tabs" id="stationLineTabs">
                <button type="button" class="active" data-line="all">Toutes les lignes</button>
                <button type="button" data-line="line1">Ligne 1</button>
                <button type="button" data-line="line2">Ligne 2</button>
            </div>

            <section class="station-split-grid reveal" id="stationGrid">
                <div class="station-line-column" data-column="line1">
                    <div class="station-column-header line1">
                        <span>1</span>
                        <div><h2>Ligne 1</h2><p>${data().lines[0].from} → ${data().lines[0].to}</p></div>
                    </div>
                    <div class="station-column-list">
                        ${stationGroups.line1.map(stationCard).join('')}
                    </div>
                </div>
                <div class="station-line-column" data-column="line2">
                    <div class="station-column-header line2">
                        <span>2</span>
                        <div><h2>Ligne 2</h2><p>${data().lines[1].from} → ${data().lines[1].to}</p></div>
                    </div>
                    <div class="station-column-list">
                        ${stationGroups.line2.map(stationCard).join('')}
                    </div>
                </div>
            </section>
        `);

        const search = document.getElementById('stationSearch');
        const zone = document.getElementById('zoneFilter');
        const tabs = document.getElementById('stationLineTabs');
        let activeLine = 'all';
        const applyFilters = () => {
            const query = (search?.value || '').toLowerCase().trim();
            const selectedZone = zone?.value || 'Toutes les zones';
            document.querySelectorAll('.station-detail-row').forEach(card => {
                const matchSearch = card.dataset.search.toLowerCase().includes(query);
                const matchLine = activeLine === 'all' || card.dataset.line === activeLine;
                const matchZone = selectedZone === 'Toutes les zones' || card.dataset.zone === selectedZone;
                card.hidden = !(matchSearch && matchLine && matchZone);
            });
            document.querySelectorAll('.station-line-column').forEach(column => {
                const matchColumn = activeLine === 'all' || column.dataset.column === activeLine;
                const visibleCards = column.querySelectorAll('.station-detail-row:not([hidden])').length;
                column.hidden = !matchColumn || visibleCards === 0;
            });
        };
        search?.addEventListener('input', applyFilters);
        zone?.addEventListener('change', applyFilters);
        tabs?.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                tabs.querySelectorAll('button').forEach(tab => tab.classList.remove('active'));
                button.classList.add('active');
                activeLine = button.dataset.line;
                applyFilters();
            });
        });
        applyFilters();
    };

    window.CityTramPages.stations = renderStations;
})();
