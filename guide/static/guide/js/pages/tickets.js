(() => {
    'use strict';

    window.CityTramPages = window.CityTramPages || {};
    const { html, route, setApp } = window.CityTram;

    const visitorTickets = () => ([
        { name: 'Ticket simple', price: '7 DH', validity: '1 trajet', desc: 'Idéal pour un déplacement rapide.' },
        { name: 'Ticket enfant', price: 'Gratuit', validity: 'Enfant', desc: 'Accès gratuit pour les enfants selon les conditions du service.' },
        { name: 'Ticket étudiant', price: '3 DH', validity: '1 trajet', desc: 'Tarif adapté aux étudiants.' },
        { name: 'Ticket touristique', price: '30 DH', validity: 'Journée', desc: 'Pour visiter plusieurs monuments dans la même journée.' }
    ]);

    const renderTickets = () => {
        const tickets = visitorTickets();
        setApp(html`
            <section class="page-hero reveal visitor-hero tickets-hero-clean">
                <div>
                    <p class="eyebrow">Tickets publics</p>
                    <h1>Tickets et tarifs</h1>
                    <p>Consultez les types de tickets disponibles, leurs prix et le fonctionnement général.</p>
                </div>
            </section>

            <section class="ticket-layout ticket-layout-clean reveal">
                <div class="ticket-catalog">
                    ${tickets.map(ticket => html`
                        <article class="ticket-card-public">
                            <div class="ticket-icon">▤</div>
                            <div>
                                <span class="pill">${ticket.validity}</span>
                                <h3>${ticket.name}</h3>
                                <p>${ticket.desc}</p>
                                <strong class="ticket-price">${ticket.price}</strong>
                            </div>
                            <a class="btn btn-outline slim" href="${route('register')}">Acheter</a>
                        </article>
                    `).join('')}
                </div>
            </section>
        `);
    };

    window.CityTramPages.tickets = renderTickets;
})();
