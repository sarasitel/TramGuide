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


    const renderLogin = () => renderAuth('login');
    const renderRegister = () => renderAuth('register');

    const renderAuth = (type) => {
        const isRegister = type === 'register';
        setApp(html`
            <section class="auth-page reveal">
                <form class="auth-form" id="authForm" novalidate>
                    <p class="eyebrow">${isRegister ? t('auth.createAccount') : t('auth.userSpace')}</p>
                    <h1>${isRegister ? t('auth.register') : t('auth.login')}</h1>
                    ${isRegister ? `<label>${t('auth.fullName')}<input name="name" type="text" placeholder="${t('auth.yourName')}" required></label>` : ''}
                    <label>${t('auth.email')}<input name="email" type="email" placeholder="${t('auth.emailPlaceholder')}" required></label>
                    <label>${t('auth.password')}<input name="password" type="password" placeholder="${t('auth.passwordPlaceholder')}" required minlength="4"></label>
                    <button type="submit" class="btn btn-red full">${isRegister ? t('auth.createDemo') : t('auth.loginDemo')}</button>
                    <p class="form-note">${isRegister ? `${t('auth.already')} <a href="${route('login')}">${t('auth.login')}</a>` : `${t('auth.noAccount')} <a href="${route('register')}">${t('auth.register')}</a>`}</p>
                    <div class="form-message" id="formMessage"></div>
                </form>
            </section>
        `);
        const form = document.getElementById('authForm');
        const message = document.getElementById('formMessage');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!form.checkValidity()) {
                message.textContent = t('auth.fillError');
                message.className = 'form-message error';
                return;
            }
            message.textContent = isRegister ? t('auth.accountCreated') : t('auth.loginSuccess');
            message.className = 'form-message success';
        });
    };


    window.CityTramPages.login = renderLogin;
    window.CityTramPages.register = renderRegister;
})();
