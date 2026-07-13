(() => {
    'use strict';

    window.CityTramPages = window.CityTramPages || {};
    const { html, t, data, route, img, setApp, tramGeo } = window.CityTram;

    const cleanName = (name) => String(name).replace(' L1', '').replace(' L2', '');

    const renderLignes = () => {
        const lineStations = [tramGeo.line1, tramGeo.line2];
        setApp(html`
            <section class="lines-clean-header reveal">
                <div>
                    <p class="eyebrow">Réseau de tramway</p>
                    <h1>Lignes de tramway</h1>
                    <p>Comparez la Ligne 1 et la Ligne 2 côte à côte : couleur, terminus, fréquence et liste complète des stations.</p>
                </div>
                <a class="btn btn-red" href="${route('carte')}">Voir le réseau</a>
            </section>

            <div class="line-detail-grid line-comparison-grid reveal">
                ${data().lines.map((line, index) => html`
                    <article class="line-card line-detail ${line.color}">
                        <div class="line-top"><span>${index + 1}</span><h3>${line.name}</h3><b>${line.freq}</b></div>
                        <div class="route"><strong>${line.from}</strong><i></i><strong>${line.to}</strong></div>
                        <div class="line-meta-box">
                            <span><small>Couleur</small><b class="color-dot ${line.color}"></b></span>
                            <span><small>Terminus départ</small><b>${line.from}</b></span>
                            <span><small>Terminus arrivée</small><b>${line.to}</b></span>
                            <span><small>Fréquence</small><b>${line.freq}</b></span>
                        </div>
                        <h4>Liste ordonnée des stations</h4>
                        <ol class="ordered-stations ordered-stations-fixed">
                            ${lineStations[index].map(station => `<li>${cleanName(station[0])}</li>`).join('')}
                        </ol>
                        <a href="${route('carte')}?focus=${index === 0 ? 'line1' : 'line2'}" class="btn btn-outline slim">Voir sur la carte</a>
                    </article>
                `).join('')}
            </div>

            <section class="plan-full reveal">
                <div class="plan-full-top">
                    <div>
                        <p class="eyebrow">Visualisation</p>
                        <h2>Schéma du tracé</h2>
                        <p>Cette carte donne une vue rapide du réseau avec les lignes et le tronc commun.</p>
                    </div>
                    <div class="official-legend">
                        <span><i class="line line1"></i>${data().lines[0].name}</span>
                        <span><i class="line line2"></i>${data().lines[1].name}</span>
                        <span><i class="line common"></i>${t('common.trunk')}</span>
                    </div>
                </div>
                <div class="plan-image-frame"><img src="${img('plan_lignes_officiel.jpeg')}" alt="Plan des lignes Tramway Rabat-Salé"></div>
            </section>
        `);
    };

    window.CityTramPages.lignes = renderLignes;
})();
