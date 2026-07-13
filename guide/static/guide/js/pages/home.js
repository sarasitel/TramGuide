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


    const renderHome = () => {
        setApp(html`
            <section class="hero-card reveal">
                <div class="hero-copy">
                    <p class="eyebrow">${t('home.eyebrow')}</p>
                    <h1>${t('home.titleStart')} <span>${t('home.titleHighlight')}</span></h1>
                    <p>${t('home.text')}</p>
                </div>
                <div class="hero-visual">
                    <img src="${img('https://commons.wikimedia.org/wiki/Special:FilePath/Tramway_rabat-sale_2013.JPG?width=1600')}" alt="Vrai tramway Rabat-Salé" onerror="this.onerror=null;this.src='${img('tram_banner.png')}'">
                    <div class="glass-stat"><b>${data().monuments.length}</b><span>${t('home.statMonuments')}</span></div>
                    <div class="glass-stat second"><b>2</b><span>${t('home.statLines')}</span></div>
                </div>
            </section>

            <div class="quick-grid reveal home-only">
                ${data().quickLinks.map(item => html`
                    <a href="${route(item.hrefKey)}" class="quick-card"><span class="quick-icon">${item.icon}</span><strong>${item.title}</strong><small>${item.text}</small></a>
                `).join('')}
            </div>
        `);
    };


    window.CityTramPages.home = renderHome;
})();
