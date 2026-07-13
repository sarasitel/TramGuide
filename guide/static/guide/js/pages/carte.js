(() => {
    'use strict';

    window.CityTramPages = window.CityTramPages || {};
    const {
        html,
        t,
        data,
        route,
        img,
        setApp,
        pageHero,
        monumentCard,
        circuitCard,
        bindSimpleSearch,
        bindSearchAndFilter,
        bindMap,
        showToast
    } = window.CityTram;


    const renderCarte = () => {
        setApp(html`
            <section class="map-clean-header reveal">
                <div>
                    <p class="eyebrow">${t('mapPage.eyebrow')}</p>
                    <h1>${t('mapPage.title')}</h1>
                    <p>${t('mapPage.text')}</p>
                </div>
                <div class="filter-tabs map-tabs">
                    <button class="active" data-map="all">${t('filters.all')}</button>
                    <button data-map="line1">${data().lines[0].name}</button>
                    <button data-map="line2">${data().lines[1].name}</button>
                    <button data-map="monuments">${t('filters.monuments')}</button>
                </div>
            </section>

            <section class="map-full-card reveal">
                <div class="map-big leaflet-holder full-map">
                    <div id="leafletMap" class="leaflet-map" aria-label="Carte tramway Rabat-Salé"></div>
                    <div class="map-floating-legend">
                        <span><i class="line line1"></i>${data().lines[0].name}</span>
                        <span><i class="line line2"></i>${data().lines[1].name}</span>
                        <span><i class="line common"></i>${t('common.trunk')}</span>
                        <span><i class="dot station"></i>${t('common.station')}</span>
                        <span><i class="dot monument-dot"></i>${t('filters.monuments')}</span>
                    </div>
                    <div class="map-tooltip leaflet-note" id="mapTooltip">${t('mapPage.leafletText')}</div>
                </div>
            </section>

            <section class="map-info-grid reveal" id="mapList">
                ${data().lines.map((line, index) => html`
                    <article class="map-list-item line-summary" data-type="${index === 0 ? 'line1' : 'line2'}">
                        <span class="list-icon ${line.color}">${index + 1}</span>
                        <span><strong>${line.name}</strong><small>${line.from}<br>${line.to}</small></span>
                        <b>${line.stations}</b>
                    </article>
                `).join('')}
                ${data().monuments.map((monument, index) => html`
                    <article class="map-list-item" data-type="monuments" data-monument-index="${index}">
                        <img src="${img(monument.image)}" alt="${monument.name}" onerror="this.onerror=null;this.src='${img(monument.fallback || 'tour_hassan.png')}'">
                        <span><strong>${monument.name}</strong><small>${monument.station}<br>${monument.walk} ${t('common.walk')}</small></span>
                        <b>⌖</b>
                    </article>
                `).join('')}
            </section>
        `);
        window.setTimeout(bindMap, 0);
    };


    window.CityTramPages.carte = renderCarte;
})();
