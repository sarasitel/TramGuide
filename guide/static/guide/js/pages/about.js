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


    const renderAbout = () => {
        setApp(html`
            <section class="about-layout reveal">
                <div class="about-main">
                    <p class="eyebrow">${t('about.eyebrow')}</p>
                    <h1>${t('about.title')}</h1>
                    <p>${t('about.text')}</p>
                    <div class="about-cards">
                        <span><b>01</b><strong>${t('about.discover')}</strong><small>${t('about.discoverText')}</small></span>
                        <span><b>02</b><strong>${t('about.move')}</strong><small>${t('about.moveText')}</small></span>
                        <span><b>03</b><strong>${t('about.organize')}</strong><small>${t('about.organizeText')}</small></span>
                        <span><b>04</b><strong>${t('about.buy')}</strong><small>${t('about.buyText')}</small></span>
                    </div>
                </div>
                <div class="about-image"><img src="${img('hero_tram.png')}" alt="CityTram Guide"></div>
            </section>
        `);
    };


    window.CityTramPages.about = renderAbout;
})();
