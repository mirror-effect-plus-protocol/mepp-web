/* Cookie Consent Banner Logic - cookie-banner.ca */
(function() {
'use strict';

var COOKIE_NAME = 'cookie_consent';
var COOKIE_EXPIRY = 182;
var USE_LAZY_LOADER = true;
var USE_IDLE_CALLBACK = true;

// Load Material Symbols font for cookie icons (if not already loaded)
(function loadMaterialSymbolsFont() {
  if (document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
    return;
  }

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=cookie,cookie_off&display=swap';
  document.head.appendChild(link);
})();


// GA4 Integration not configured
function initGA4Default() {}

function initGA4() {
  console.log('GA4 integration not configured');
}

function trackConsentEvent(action) {
  console.log('GA4 consent event not tracked (not configured):', action);
}

initGA4Default();

var injectedScripts = window.__cookieBannerInjected || (window.__cookieBannerInjected = {});
var injectedExternalScripts = window.__cookieBannerExternal || (window.__cookieBannerExternal = {});

function scheduleTask(fn) {
  if (!USE_LAZY_LOADER) {
    fn();
    return;
  }

  if (USE_IDLE_CALLBACK && typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(fn);
  } else {
    setTimeout(fn, 1);
  }
}

function loadExternalScript(src, name) {
  if (injectedExternalScripts[src]) {
    return;
  }

  var scriptEl = document.createElement('script');
  scriptEl.async = true;
  scriptEl.src = src;
  scriptEl.setAttribute('data-cookie-banner-src', src);
  scriptEl.onload = function() {
    injectedExternalScripts[src] = true;
  };
  scriptEl.onerror = function(error) {
    delete injectedExternalScripts[src];
    console.error('Error loading external script:', name, error);
  };
  injectedExternalScripts[src] = true;
  document.head.appendChild(scriptEl);
  console.log('Loading external script:', name);
}

function injectInlineScript(encoded, name, cacheKey) {
  if (injectedScripts[cacheKey]) {
    return;
  }

  try {
    var scriptEl = document.createElement('script');
    scriptEl.setAttribute('data-cookie-banner-inline', cacheKey);
    scriptEl.textContent = atob(encoded);
    document.head.appendChild(scriptEl);
    injectedScripts[cacheKey] = true;
    console.log('Loaded script:', name);
  } catch (error) {
    console.error('Error injecting inline script', name, error);
  }
}

// Language translations
var TRANSLATIONS = {
  en: {
    title: "We use cookies",
    message: "This website uses cookies to enhance your browsing experience and provide personalized content.",
    acceptButton: "Accept All",
    rejectButton: "Reject All",
    preferencesButton: "Preferences",
    privacyPolicy: "Privacy Policy",
    footerLink: "Cookie Settings",
    preferencesTitle: "Cookie Preferences",
    strictlyNecessary: "Strictly Necessary",
    strictlyNecessaryDesc: "Essential for website functionality",
    functionality: "Functionality",
    functionalityDesc: "Remember preferences and choices",
    analytics: "Analytics",
    analyticsDesc: "Help us improve our website",
    marketing: "Marketing",
    marketingDesc: "Personalized ads and content",
    saveButton: "Save",
    cancelButton: "Cancel",
    modalDescription: "By clicking 'Accept', you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.",
    acceptAllModal: "ACCEPT ALL",
    manageCookiePrefs: "Manage cookie preferences",
    confirmChoices: "CONFIRM MY CHOICES",
    socialMedia: "Social Media Cookies",
    necessaryAlwaysActive: "Always active",
    detailNecessary: "These cookies are essential for the website to function properly. They enable basic features like page navigation, secure access, and session management. The website cannot function without these cookies.",
    detailFunctionality: "These cookies allow the website to remember choices you make (such as your language preference or the region you are in) and provide enhanced, more personalized features.",
    detailAnalytics: "These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously. This helps us improve the website's performance and user experience.",
    detailMarketing: "These cookies are used to deliver advertisements that are relevant to you and your interests. They may also be used to limit the number of times you see an ad and to measure the effectiveness of advertising campaigns.",
    detailSocial: "These cookies are set by social media services to allow you to share content with your friends and networks. They may track your browser across other sites and build up a profile of your interests."
  },
  fr: {
    title: "Nous utilisons des cookies",
    message: "Ce site web utilise des cookies pour améliorer votre expérience de navigation et fournir du contenu personnalisé.",
    acceptButton: "Accepter tout",
    rejectButton: "Tout rejeter",
    preferencesButton: "Préférences",
    privacyPolicy: "Politique de confidentialité",
    footerLink: "Paramètres des cookies",
    preferencesTitle: "Préférences des cookies",
    strictlyNecessary: "Strictement nécessaire",
    strictlyNecessaryDesc: "Essentiel pour le fonctionnement du site",
    functionality: "Fonctionnalité",
    functionalityDesc: "Mémoriser les préférences et les choix",
    analytics: "Analytique",
    analyticsDesc: "Nous aider à améliorer notre site",
    marketing: "Marketing",
    marketingDesc: "Publicités et contenu personnalisés",
    saveButton: "Enregistrer",
    cancelButton: "Annuler",
    modalDescription: "En cliquant « Accepter », vous acceptez le stockage de cookies sur votre appareil pour améliorer la navigation, analyser l'utilisation du site et contribuer à nos efforts marketing.",
    acceptAllModal: "TOUT ACCEPTER",
    manageCookiePrefs: "Gérer les préférences de cookies",
    confirmChoices: "CONFIRMER MES CHOIX",
    socialMedia: "Cookies de réseaux sociaux",
    necessaryAlwaysActive: "Toujours actif",
    detailNecessary: "Ces cookies sont indispensables au bon fonctionnement du site. Ils permettent les fonctions de base comme la navigation, l'accès sécurisé et la gestion des sessions. Le site ne peut pas fonctionner sans ces cookies.",
    detailFunctionality: "Ces cookies permettent au site de se souvenir de vos choix (comme votre langue ou votre région) et d'offrir des fonctionnalités améliorées et plus personnalisées.",
    detailAnalytics: "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site en collectant des informations de manière anonyme. Cela nous permet d'améliorer les performances et l'expérience utilisateur du site.",
    detailMarketing: "Ces cookies sont utilisés pour diffuser des publicités pertinentes selon vos centres d'intérêt. Ils peuvent aussi limiter le nombre de fois qu'une publicité vous est présentée et mesurer l'efficacité des campagnes publicitaires.",
    detailSocial: "Ces cookies sont déposés par les services de réseaux sociaux pour vous permettre de partager du contenu avec vos amis et réseaux. Ils peuvent suivre votre navigation sur d'autres sites et établir un profil de vos centres d'intérêt."
  },
  es: {
    title: "Utilizamos cookies",
    message: "Este sitio web utiliza cookies para mejorar su experiencia de navegación y ofrecer contenido personalizado.",
    acceptButton: "Aceptar todo",
    rejectButton: "Rechazar todo",
    privacyPolicy: "Política de privacidad",
    preferencesButton: "Preferencias",
    footerLink: "Configuración de cookies",
    preferencesTitle: "Preferencias de cookies",
    strictlyNecessary: "Estrictamente necesarias",
    strictlyNecessaryDesc: "Esencial para el funcionamiento del sitio",
    functionality: "Funcionalidad",
    functionalityDesc: "Recordar preferencias y opciones",
    analytics: "Analíticas",
    analyticsDesc: "Ayudarnos a mejorar nuestro sitio",
    marketing: "Marketing",
    marketingDesc: "Publicidad y contenido personalizados",
    saveButton: "Guardar",
    cancelButton: "Cancelar",
    modalDescription: "Al hacer clic en « Aceptar », usted acepta el almacenamiento de cookies en su dispositivo para mejorar la navegación, analizar el uso del sitio y contribuir a nuestros esfuerzos de marketing.",
    acceptAllModal: "ACEPTAR TODO",
    manageCookiePrefs: "Gestionar preferencias de cookies",
    confirmChoices: "CONFIRMAR MIS OPCIONES",
    socialMedia: "Cookies de redes sociales",
    necessaryAlwaysActive: "Siempre activas",
    detailNecessary: "Estas cookies son esenciales para el correcto funcionamiento del sitio web. Permiten funciones básicas como la navegación, el acceso seguro y la gestión de sesiones.",
    detailFunctionality: "Estas cookies permiten que el sitio recuerde sus elecciones (como el idioma o la región) y ofrezca funciones mejoradas y más personalizadas.",
    detailAnalytics: "Estas cookies nos ayudan a entender cómo los visitantes interactúan con el sitio, recopilando información de forma anónima para mejorar el rendimiento y la experiencia del usuario.",
    detailMarketing: "Estas cookies se utilizan para mostrar anuncios relevantes según sus intereses y medir la eficacia de las campañas publicitarias.",
    detailSocial: "Estas cookies son establecidas por servicios de redes sociales para permitirle compartir contenido con sus amigos y redes."
  },
  de: {
    title: "Wir verwenden Cookies",
    message: "Diese Website verwendet Cookies, um Ihr Surferlebnis zu verbessern und personalisierte Inhalte bereitzustellen.",
    acceptButton: "Alle akzeptieren",
    rejectButton: "Alle ablehnen",
    privacyPolicy: "Datenschutzrichtlinie",
    preferencesButton: "Einstellungen",
    footerLink: "Cookie-Einstellungen",
    preferencesTitle: "Cookie-Einstellungen",
    strictlyNecessary: "Unbedingt erforderlich",
    strictlyNecessaryDesc: "Wesentlich für die Funktion der Website",
    functionality: "Funktionalität",
    functionalityDesc: "Einstellungen und Auswahlen speichern",
    analytics: "Analytik",
    analyticsDesc: "Uns helfen, unsere Website zu verbessern",
    marketing: "Marketing",
    marketingDesc: "Personalisierte Werbung und Inhalte",
    saveButton: "Speichern",
    cancelButton: "Abbrechen",
    modalDescription: "Durch Klicken auf « Akzeptieren » stimmen Sie der Speicherung von Cookies auf Ihrem Gerät zu, um die Navigation zu verbessern, die Nutzung der Website zu analysieren und unsere Marketingbemühungen zu unterstützen.",
    acceptAllModal: "ALLE AKZEPTIEREN",
    manageCookiePrefs: "Cookie-Einstellungen verwalten",
    confirmChoices: "MEINE AUSWAHL BESTÄTIGEN",
    socialMedia: "Social-Media-Cookies",
    necessaryAlwaysActive: "Immer aktiv",
    detailNecessary: "Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Sie ermöglichen grundlegende Funktionen wie Seitennavigation, sicheren Zugriff und Sitzungsverwaltung.",
    detailFunctionality: "Diese Cookies ermöglichen es der Website, sich an Ihre Auswahl zu erinnern (z. B. Sprache oder Region) und erweiterte, personalisierte Funktionen bereitzustellen.",
    detailAnalytics: "Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem sie anonyme Informationen sammeln, um die Leistung und Benutzererfahrung zu verbessern.",
    detailMarketing: "Diese Cookies werden verwendet, um relevante Werbung basierend auf Ihren Interessen anzuzeigen und die Wirksamkeit von Werbekampagnen zu messen.",
    detailSocial: "Diese Cookies werden von sozialen Netzwerken gesetzt, um Ihnen das Teilen von Inhalten mit Ihren Freunden und Netzwerken zu ermöglichen."
  },
  it: {
    title: "Utilizziamo i cookie",
    message: "Questo sito web utilizza i cookie per migliorare la tua esperienza di navigazione e fornire contenuti personalizzati.",
    acceptButton: "Accetta tutto",
    rejectButton: "Rifiuta tutto",
    privacyPolicy: "Informativa sulla privacy",
    preferencesButton: "Preferenze",
    footerLink: "Impostazioni cookie",
    preferencesTitle: "Preferenze cookie",
    strictlyNecessary: "Strettamente necessari",
    strictlyNecessaryDesc: "Essenziale per il funzionamento del sito",
    functionality: "Funzionalità",
    functionalityDesc: "Ricordare preferenze e scelte",
    analytics: "Analitici",
    analyticsDesc: "Aiutarci a migliorare il nostro sito",
    marketing: "Marketing",
    marketingDesc: "Pubblicità e contenuti personalizzati",
    saveButton: "Salva",
    cancelButton: "Annulla",
    modalDescription: "Cliccando « Accetta », acconsenti alla memorizzazione dei cookie sul tuo dispositivo per migliorare la navigazione, analizzare l'utilizzo del sito e contribuire ai nostri sforzi di marketing.",
    acceptAllModal: "ACCETTA TUTTO",
    manageCookiePrefs: "Gestisci le preferenze dei cookie",
    confirmChoices: "CONFERMA LE MIE SCELTE",
    socialMedia: "Cookie dei social media",
    necessaryAlwaysActive: "Sempre attivi",
    detailNecessary: "Questi cookie sono essenziali per il corretto funzionamento del sito. Consentono funzioni di base come la navigazione, l'accesso sicuro e la gestione delle sessioni.",
    detailFunctionality: "Questi cookie consentono al sito di ricordare le tue scelte (come la lingua o la regione) e di offrire funzionalità migliorate e più personalizzate.",
    detailAnalytics: "Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito, raccogliendo informazioni in modo anonimo per migliorare le prestazioni e l'esperienza utente.",
    detailMarketing: "Questi cookie vengono utilizzati per mostrare annunci pertinenti in base ai tuoi interessi e per misurare l'efficacia delle campagne pubblicitarie.",
    detailSocial: "Questi cookie sono impostati dai servizi di social media per consentirti di condividere contenuti con i tuoi amici e le tue reti."
  },
  pt: {
    title: "Utilizamos cookies",
    message: "Este site utiliza cookies para melhorar a sua experiência de navegação e fornecer conteúdo personalizado.",
    acceptButton: "Aceitar tudo",
    rejectButton: "Rejeitar tudo",
    privacyPolicy: "Política de privacidade",
    preferencesButton: "Preferências",
    footerLink: "Configurações de cookies",
    preferencesTitle: "Preferências de cookies",
    strictlyNecessary: "Estritamente necessários",
    strictlyNecessaryDesc: "Essencial para o funcionamento do site",
    functionality: "Funcionalidade",
    functionalityDesc: "Lembrar preferências e escolhas",
    analytics: "Analíticos",
    analyticsDesc: "Ajudar-nos a melhorar o nosso site",
    marketing: "Marketing",
    marketingDesc: "Publicidade e conteúdo personalizados",
    saveButton: "Guardar",
    cancelButton: "Cancelar",
    modalDescription: "Ao clicar em « Aceitar », concorda com o armazenamento de cookies no seu dispositivo para melhorar a navegação, analisar a utilização do site e contribuir para os nossos esforços de marketing.",
    acceptAllModal: "ACEITAR TUDO",
    manageCookiePrefs: "Gerir preferências de cookies",
    confirmChoices: "CONFIRMAR AS MINHAS ESCOLHAS",
    socialMedia: "Cookies de redes sociais",
    necessaryAlwaysActive: "Sempre ativos",
    detailNecessary: "Estes cookies são essenciais para o bom funcionamento do site. Permitem funções básicas como a navegação, o acesso seguro e a gestão de sessões.",
    detailFunctionality: "Estes cookies permitem que o site se lembre das suas escolhas (como o idioma ou a região) e ofereça funcionalidades melhoradas e mais personalizadas.",
    detailAnalytics: "Estes cookies ajudam-nos a compreender como os visitantes interagem com o site, recolhendo informações de forma anónima para melhorar o desempenho e a experiência do utilizador.",
    detailMarketing: "Estes cookies são utilizados para apresentar anúncios relevantes com base nos seus interesses e medir a eficácia das campanhas publicitárias.",
    detailSocial: "Estes cookies são definidos por serviços de redes sociais para lhe permitir partilhar conteúdos com os seus amigos e redes."
  }
};

function detectLanguage() {
  // Read language from the app's localStorage key (set by i18next/MEPP app)
  var appLang = localStorage.getItem('language');
  if (appLang && TRANSLATIONS[appLang]) {
    return appLang;
  }
  // Fallback to browser language, then to French
  var browserLang = (navigator.language || navigator.userLanguage || 'fr').toLowerCase().split('-')[0];
  return TRANSLATIONS[browserLang] ? browserLang : 'fr';
}

function applyTranslations() {
  var lang = detectLanguage();
  var trans = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Main banner text
  var title = document.getElementById('cookie-title');
  var message = document.getElementById('cookie-message');
  var acceptBtn = document.getElementById('cookie-accept-btn');
  var rejectBtn = document.getElementById('cookie-reject-btn');
  var prefsBtn = document.getElementById('cookie-preferences-btn');
  var floatBtn = document.getElementById('cookie-settings-float');

  if (title) title.textContent = trans.title;
  if (message) message.textContent = trans.message;
  if (acceptBtn) acceptBtn.textContent = trans.acceptButton;
  if (rejectBtn) rejectBtn.textContent = trans.rejectButton;
  if (prefsBtn) prefsBtn.textContent = trans.preferencesButton;

  // Privacy policy links
  var privacyLink = document.getElementById('cookie-privacy-link');
  var modalPrivacyLink = document.getElementById('cookie-modal-privacy-link');
  if (privacyLink) privacyLink.textContent = trans.privacyPolicy;
  if (modalPrivacyLink) modalPrivacyLink.textContent = trans.privacyPolicy;
  // Note: Don't overwrite floatBtn content here — updateFloatingButtonIcon manages it.
  // Only update the text span inside it if it exists.
  if (floatBtn) {
    var floatSpan = floatBtn.querySelector('span');
    if (floatSpan) {
      floatSpan.textContent = trans.footerLink;
    }
  }

  // Preferences panel
  var prefsTitle = document.getElementById('prefs-title');
  var catNecessary = document.getElementById('cat-necessary');
  var catNecessaryDesc = document.getElementById('cat-necessary-desc');
  var catFunctionality = document.getElementById('cat-functionality');
  var catFunctionalityDesc = document.getElementById('cat-functionality-desc');
  var catAnalytics = document.getElementById('cat-analytics');
  var catAnalyticsDesc = document.getElementById('cat-analytics-desc');
  var catMarketing = document.getElementById('cat-marketing');
  var catMarketingDesc = document.getElementById('cat-marketing-desc');
  var saveBtn = document.getElementById('cookie-save-prefs-btn');
  var cancelBtn = document.getElementById('cookie-cancel-prefs-btn');

  if (prefsTitle) prefsTitle.textContent = trans.preferencesTitle;
  if (catNecessary) catNecessary.textContent = trans.strictlyNecessary;
  if (catNecessaryDesc) catNecessaryDesc.textContent = trans.strictlyNecessaryDesc;
  if (catFunctionality) catFunctionality.textContent = trans.functionality;
  if (catFunctionalityDesc) catFunctionalityDesc.textContent = trans.functionalityDesc;
  if (catAnalytics) catAnalytics.textContent = trans.analytics;
  if (catAnalyticsDesc) catAnalyticsDesc.textContent = trans.analyticsDesc;
  if (catMarketing) catMarketing.textContent = trans.marketing;
  if (catMarketingDesc) catMarketingDesc.textContent = trans.marketingDesc;
  if (saveBtn) saveBtn.textContent = trans.saveButton;
  if (cancelBtn) cancelBtn.textContent = trans.cancelButton;

  // Modal elements
  var modalDesc = document.getElementById('cookie-modal-description');
  var acceptAllModalBtn = document.getElementById('cookie-accept-all-btn');
  var manageCookiePrefs = document.getElementById('cookie-manage-prefs-title');
  var confirmChoicesBtn = document.getElementById('cookie-confirm-choices-btn');
  var socialMediaLabel = document.getElementById('cat-social-media');
  var necessaryDesc = document.getElementById('cat-necessary-desc');

  if (modalDesc) modalDesc.textContent = trans.modalDescription;
  if (acceptAllModalBtn) acceptAllModalBtn.textContent = trans.acceptAllModal;
  if (manageCookiePrefs) manageCookiePrefs.textContent = trans.manageCookiePrefs;
  if (confirmChoicesBtn) confirmChoicesBtn.textContent = trans.confirmChoices;
  if (socialMediaLabel) socialMediaLabel.textContent = trans.socialMedia;
  if (necessaryDesc) necessaryDesc.textContent = trans.necessaryAlwaysActive;

  // Detail descriptions for accordion
  var detailNecessary = document.getElementById('detail-necessary');
  var detailFunctionality = document.getElementById('detail-functionality');
  var detailAnalytics = document.getElementById('detail-analytics');
  var detailMarketing = document.getElementById('detail-marketing');
  var detailSocial = document.getElementById('detail-social');

  if (detailNecessary) detailNecessary.textContent = trans.detailNecessary;
  if (detailFunctionality) detailFunctionality.textContent = trans.detailFunctionality;
  if (detailAnalytics) detailAnalytics.textContent = trans.detailAnalytics;
  if (detailMarketing) detailMarketing.textContent = trans.detailMarketing;
  if (detailSocial) detailSocial.textContent = trans.detailSocial;
}

// Setup accordion behavior for cookie category cards
function setupAccordion() {
  var cards = document.querySelectorAll('.cookie-card');
  cards.forEach(function(card) {
    var header = card.querySelector('.cookie-card-header');
    var detail = card.querySelector('.cookie-card-detail');
    var chevron = card.querySelector('.cookie-card-chevron');

    if (!header || !detail || header.dataset.accordionAttached) return;

    header.addEventListener('click', function(e) {
      // Don't toggle accordion when clicking the toggle switch
      if (e.target.closest('label')) return;

      var isOpen = detail.style.display !== 'none';
      // Close all other cards
      cards.forEach(function(otherCard) {
        var otherDetail = otherCard.querySelector('.cookie-card-detail');
        var otherChevron = otherCard.querySelector('.cookie-card-chevron');
        if (otherDetail) otherDetail.style.display = 'none';
        if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
      });
      // Toggle current card
      if (!isOpen) {
        detail.style.display = 'block';
        chevron.style.transform = 'rotate(90deg)';
      }
    });

    header.dataset.accordionAttached = 'true';
  });
}


// Global function for inline cookie settings links
window.showCookiePreferences = function() {
  showPreferencesModal();
};


function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name, value, days) {
  var expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  var secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax' + secure;
}

function getConsent() {
  var cookie = getCookie(COOKIE_NAME);
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch(e) {
      return null;
    }
  }
  return null;
}

function saveConsent(consent) {
  setCookie(COOKIE_NAME, JSON.stringify(consent), COOKIE_EXPIRY);
  loadScripts(consent);
  showFloatingButton();
  updateFloatingButtonIcon(consent);
  if (consent.analytics) {
    initGA4();
  }
}

// Make toggle switches functional
function setupToggleSwitches() {
  var buttonColor = "#3b82f6";
  var inactiveColor = "rgba(255, 255, 255, 0.3)";

  var toggles = [
    { input: 'cookie-func-toggle-modal', slider: 'cookie-func-toggle-slider', thumb: 'cookie-func-toggle-thumb' },
    { input: 'cookie-performance-toggle-modal', slider: 'cookie-performance-toggle-slider', thumb: 'cookie-performance-toggle-thumb' },
    { input: 'cookie-targeting-toggle-modal', slider: 'cookie-targeting-toggle-slider', thumb: 'cookie-targeting-toggle-thumb' },
    { input: 'cookie-social-toggle-modal', slider: 'cookie-social-toggle-slider', thumb: 'cookie-social-toggle-thumb' }
  ];

  toggles.forEach(function(toggle) {
    var input = document.getElementById(toggle.input);
    var slider = document.getElementById(toggle.slider);
    var thumb = document.getElementById(toggle.thumb);

    if (input && slider && thumb) {
      // Set initial state
      if (input.checked) {
        slider.style.backgroundColor = buttonColor;
        thumb.style.transform = 'translateX(20px)';
      } else {
        slider.style.backgroundColor = inactiveColor;
        thumb.style.transform = 'translateX(0)';
      }

      // Add change event listener
      if (!input.dataset.listenerAttached) {
        input.addEventListener('change', function() {
          if (this.checked) {
            slider.style.backgroundColor = buttonColor;
            thumb.style.transform = 'translateX(20px)';
          } else {
            slider.style.backgroundColor = inactiveColor;
            thumb.style.transform = 'translateX(0)';
          }
        });

        // Handle clicks on the label reliably: the absolutely-positioned
        // slider/thumb spans can interfere with the label's native toggle
        // behavior. We intercept clicks on the label, preventDefault to
        // stop the native toggle, and manually toggle the input once.
        var label = input.closest('label');
        if (label && !label.dataset.listenerAttached) {
          label.addEventListener('click', function(e) {
            if (e.target !== input) {
              e.preventDefault();
              input.checked = !input.checked;
              input.dispatchEvent(new Event('change'));
            }
          });
          label.dataset.listenerAttached = 'true';
        }

        input.dataset.listenerAttached = 'true';
      }
    }
  });
}

function loadConsentIntoModal(consent) {
  var func = document.getElementById('cookie-func-toggle-modal');
  var performance = document.getElementById('cookie-performance-toggle-modal');
  var targeting = document.getElementById('cookie-targeting-toggle-modal');
  var social = document.getElementById('cookie-social-toggle-modal');

  if (func) func.checked = consent.functionality || false;
  if (performance) performance.checked = consent.analytics || false;
  if (targeting) targeting.checked = consent.marketing || false;
  if (social) social.checked = consent.social || false;

  // Update visual state
  setupToggleSwitches();
}

function showPreferencesModal() {
  var modal = document.getElementById('cookie-preferences-modal');

  if (!modal) {
    console.warn('Cookie preferences modal not found');
    return;
  }

  var currentConsent = getConsent();
  if (currentConsent) {
    loadConsentIntoModal(currentConsent);
  } else {
    loadConsentIntoModal({ essential: true, functionality: false, analytics: false, marketing: false, social: false });
  }

  modal.style.display = 'flex';
}

function showFloatingButton() {
  var floatBtn = document.getElementById('cookie-settings-float');
  if (floatBtn) {
    floatBtn.classList.add('show');
    floatBtn.style.setProperty('display', 'flex', 'important');
    floatBtn.onclick = function() {
      showPreferencesModal();
    };
  }
}

function hideFloatingButton() {
  var floatBtn = document.getElementById('cookie-settings-float');
  if (floatBtn) {
    floatBtn.classList.remove('show');
    floatBtn.style.setProperty('display', 'none', 'important');
  }
}

function updateFloatingButtonIcon(consent) {
  var floatBtn = document.getElementById('cookie-settings-float');
  if (!floatBtn) return;

  var cookieAcceptedIcon = "<img src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMWYxZjFmIj48cGF0aCBkPSJNNDgwLTgwcS04MyAwLTE1Ni0zMS41VDE5Ny0xOTdxLTU0LTU0LTg1LjUtMTI3VDgwLTQ4MHEwLTc1IDI5LTE0N3Q4MS0xMjguNXE1Mi01Ni41IDEyNS05MVQ0NzUtODgxcTIxIDAgNDMgMnQ0NSA3cS05IDQ1IDYgODV0NDUgNjYuNXEzMCAyNi41IDcxLjUgMzYuNXQ4NS41LTVxLTI2IDU5IDcuNSAxMTN0OTkuNSA1NnExIDExIDEuNSAyMC41dC41IDIwLjVxMCA4Mi0zMS41IDE1NC41dC04NS41IDEyN3EtNTQgNTQuNS0xMjcgODZUNDgwLTgwWm0tNjAtNDgwcTI1IDAgNDIuNS0xNy41VDQ4MC02MjBxMC0yNS0xNy41LTQyLjVUNDIwLTY4MHEtMjUgMC00Mi41IDE3LjVUMzYwLTYyMHEwIDI1IDE3LjUgNDIuNVQ0MjAtNTYwWm0tODAgMjAwcTI1IDAgNDIuNS0xNy41VDQwMC00MjBxMC0yNS0xNy41LTQyLjVUMzQwLTQ4MHEtMjUgMC00Mi41IDE3LjVUMjgwLTQyMHEwIDI1IDE3LjUgNDIuNVQzNDAtMzYwWm0yNjAgNDBxMTcgMCAyOC41LTExLjVUNjQwLTM2MHEwLTE3LTExLjUtMjguNVQ2MDAtNDAwcS0xNyAwLTI4LjUgMTEuNVQ1NjAtMzYwcTAgMTcgMTEuNSAyOC41VDYwMC0zMjBaTTQ4MC0xNjBxMTIyIDAgMjE2LjUtODRUODAwLTQ1OHEtNTAtMjItNzguNS02MFQ2ODMtNjAzcS03Ny0xMS0xMzItNjZ0LTY4LTEzMnEtODAtMi0xNDAuNSAyOXQtMTAxIDc5LjVRMjAxLTY0NCAxODAuNS01ODdUMTYwLTQ4MHEwIDEzMyA5My41IDIyNi41VDQ4MC0xNjBabTAtMzI0WiIvPjwvc3ZnPg==\" alt=\"\" style=\"width: 20px; height: 20px; display: inline-flex;\" />";
  var cookieRejectedIcon = "<img src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMWYxZjFmIj48cGF0aCBkPSJtODE1LTI2MC01OC01OHExOC0zMSAyOS02Ni41dDE0LTczLjVxLTUwLTIyLTc4LjUtNjBUNjgzLTYwM3EtNzctMTEtMTMyLTY2dC02OC0xMzJxLTQ5LTItOTAgMTB0LTc2IDMzbC01Ny01N3E2MS00MiAxMzcuNS01OC41VDU2My04NzJxLTkgNDUgNiA4NC41dDQ1IDY2LjVxMzAgMjcgNzEgMzd0ODYtNXEtMzEgNjkgMTEgMTE4dDk2IDUxcTggNzItOS41IDEzOFQ4MTUtMjYwWk0zNDAtMzYwcS0yNSAwLTQyLjUtMTcuNVQyODAtNDIwcTAtMjUgMTcuNS00Mi41VDM0MC00ODBxMjUgMCA0Mi41IDE3LjVUNDgwLTQyMHEwIDI1LTE3LjUgNDIuNVQzNDAtMzYwWk04MTktMjggNzAxLTE0NnEtNDggMzItMTAzLjUgNDlUNDgwLTgwcS04MyAwLTE1Ni0zMS41VDE5Ny0xOTdxLTU0LTU0LTg1LjUtMTI3VDgwLTQ4MHEwLTYyIDE3LTExNy41VDE0Ni03MDFMMjctODIwbDU3LTU3TDg3Ni04NWwtNTcgNTdaTTQ4MC0xNjBxNDUgMCA4NS41LTEydDc2LjUtMzNMMjA1LTY0MnEtMjEgMzYtMzMgNzYuNVQxNjAtNDgwcTAgMTMzIDkzLjUgMjI2LjVUNDgwLTE2MFptLTU2LTI2NFptMTM1LTEzN1oiLz48L3N2Zz4=\" alt=\"\" style=\"width: 20px; height: 20px; display: inline-flex;\" />";

  // Determine if user has accepted any non-essential cookies
  var hasAcceptedNonEssential = consent.functionality || consent.analytics || consent.marketing || consent.social;

  // Check if button should show text (preserve text if showText is enabled)
  var shouldShowText = true;
  var lang = detectLanguage();
  var trans = TRANSLATIONS[lang] || TRANSLATIONS.en;
  var text = trans.footerLink;
  var hasLogo = true;
  var logoUrl = "https://mirroreffectplus.org/apple-touch-icon.png";
  var shape = "pill";

  // Get the appropriate icon
  var icon = hasAcceptedNonEssential ? cookieAcceptedIcon : cookieRejectedIcon;

  // Update content based on shape and showText setting
  if (shape === 'circle') {
    // Circle always shows only icon
    floatBtn.innerHTML = icon;
  } else {
    // Pill and square respect showText setting
    // Only show logo if user has NOT rejected (hasAcceptedNonEssential is true)
    if (shouldShowText && hasLogo && logoUrl && hasAcceptedNonEssential) {
      // Show logo + text
      floatBtn.innerHTML = '<img src="' + logoUrl + '" alt="Logo" style="width: 16px; height: 16px; object-fit: contain; margin-right: 4px;" /><span>' + text + '</span>';
    } else if (shouldShowText) {
      // Show icon + text (Icon handles both rejected state and no-logo state)
      floatBtn.innerHTML = icon + '<span style="margin-left: 4px;">' + text + '</span>';
    } else {
      // Show only icon
      floatBtn.innerHTML = icon;
    }
  }
}

function loadScripts(consent) {
  console.log('Loading scripts with consent:', consent);

  // Strictly necessary (always loaded)
    // Session Management
  try {
    injectInlineScript("Ly8gRXNzZW50aWFsIHNlc3Npb24gbWFuYWdlbWVudAppZiAoIXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25JZCcpKSB7CiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvbklkJywgRGF0ZS5ub3coKS50b1N0cmluZygpKTsKfQ==", "Session Management", "strict_session_management");
  } catch(e) {
    console.error('Error loading Session Management:', e);
  }

  // Functionality scripts
  if (consent.functionality) {
    // No functionality scripts configured
  }

  // Analytics scripts
  if (consent.analytics) {
    // No analytics scripts configured
  }

  // Marketing scripts
  if (consent.marketing) {
    // No marketing scripts configured
  }

  // Google Consent Mode v2 - ALWAYS update consent (required for GDPR compliance)
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied'
    });
  }

  // Also update dataLayer for GTM compatibility
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'cookie_consent_update',
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied'
    });
  }
}

function init() {
  var banner = document.getElementById('cookie-consent-banner');
  var acceptBtn = document.getElementById('cookie-accept-btn');
  var rejectBtn = document.getElementById('cookie-reject-btn');
  var prefsBtn = document.getElementById('cookie-preferences-btn');
  var closeBtn = document.getElementById('cookie-close-btn');
  var prefsPanel = document.getElementById('cookie-preferences-panel');
  var savePrefsBtn = document.getElementById('cookie-save-prefs-btn');
  var cancelPrefsBtn = document.getElementById('cookie-cancel-prefs-btn');

  if (!banner) return;

  // Apply language translations
  applyTranslations();

  var existingConsent = getConsent();

  // Set up banner button handlers ALWAYS (needed even when consent exists, for when user reopens banner)
  if (acceptBtn && !acceptBtn.dataset.handlerAttached) {
    acceptBtn.addEventListener('click', function() {
      saveConsent({ essential: true, functionality: true, analytics: true, marketing: true, social: true });
      initGA4();
      trackConsentEvent('accept');
      banner.style.display = 'none';
    });
    acceptBtn.dataset.handlerAttached = 'true';
  }

  if (rejectBtn && !rejectBtn.dataset.handlerAttached) {
    rejectBtn.addEventListener('click', function() {
      saveConsent({ essential: true, functionality: false, analytics: false, marketing: false, social: false });
      trackConsentEvent('reject');
      banner.style.display = 'none';
    });
    rejectBtn.dataset.handlerAttached = 'true';
  }

  if (closeBtn && !closeBtn.dataset.handlerAttached) {
    closeBtn.addEventListener('click', function() {
      // Save essential-only consent so the banner doesn't reappear on next visit
      saveConsent({ essential: true, functionality: false, analytics: false, marketing: false, social: false });
      banner.style.display = 'none';
      trackConsentEvent('dismiss');
    });
    closeBtn.dataset.handlerAttached = 'true';
  }

  if (prefsBtn && !prefsBtn.dataset.handlerAttached) {
    prefsBtn.addEventListener('click', function() {
      var modal = document.getElementById('cookie-preferences-modal');
      if (modal) {
        modal.style.display = 'flex';
        var currentConsent = getConsent();
        if (currentConsent) {
          loadConsentIntoModal(currentConsent);
        } else {
          loadConsentIntoModal({ essential: true, functionality: false, analytics: false, marketing: false, social: false });
        }
      }
    });
    prefsBtn.dataset.handlerAttached = 'true';
  }

  // Modal event handlers
  var modal = document.getElementById('cookie-preferences-modal');
  var modalCloseBtn = document.getElementById('cookie-prefs-close-btn');
  var acceptAllBtn = document.getElementById('cookie-accept-all-btn');
  var confirmChoicesBtn = document.getElementById('cookie-confirm-choices-btn');

  if (modalCloseBtn && !modalCloseBtn.dataset.handlerAttached) {
    modalCloseBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    modalCloseBtn.dataset.handlerAttached = 'true';
  }

  if (acceptAllBtn && !acceptAllBtn.dataset.handlerAttached) {
    acceptAllBtn.addEventListener('click', function() {
      var consent = { essential: true, functionality: true, analytics: true, marketing: true, social: true };
      saveConsent(consent);
      loadConsentIntoModal(consent);
      banner.style.display = 'none';
      modal.style.display = 'none';
    });
    acceptAllBtn.dataset.handlerAttached = 'true';
  }

  if (confirmChoicesBtn && !confirmChoicesBtn.dataset.handlerAttached) {
    confirmChoicesBtn.addEventListener('click', function() {
      var func = document.getElementById('cookie-func-toggle-modal');
      var performance = document.getElementById('cookie-performance-toggle-modal');
      var targeting = document.getElementById('cookie-targeting-toggle-modal');
      var social = document.getElementById('cookie-social-toggle-modal');

      var consent = {
        essential: true,
        functionality: func ? func.checked : false,
        analytics: performance ? performance.checked : false,
        marketing: targeting ? targeting.checked : false,
          social: social ? social.checked : false
      };

      console.log('User confirmed cookie preferences:', consent);
      saveConsent(consent);

      banner.style.display = 'none';
      modal.style.display = 'none';
    });
    confirmChoicesBtn.dataset.handlerAttached = 'true';
  }

  // Close modal when clicking outside
  if (modal && !modal.dataset.handlerAttached) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    modal.dataset.handlerAttached = 'true';
  }

  // Initialize toggles and accordion
  setupToggleSwitches();
  setupAccordion();

  // If consent already exists, restore it and show floating button
  if (existingConsent) {
    loadScripts(existingConsent);

    if (existingConsent.analytics) {
      initGA4();
    }

    showFloatingButton();
    updateFloatingButtonIcon(existingConsent);

    return;
  }

  // No existing consent - show banner
  banner.style.display = 'block';
  trackConsentEvent('impression');

  // Hide floating button while main banner is showing
  hideFloatingButton();
}

// Load HTML template and initialize
function loadBannerHTML() {
  // Prevent duplicate injection
  if (document.getElementById('cookie-consent-banner')) {
    return Promise.resolve();
  }

  return fetch('/cookie-consent/cookie-banner.html')
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var container = document.createElement('div');
      container.innerHTML = html;
      while (container.firstChild) {
        document.body.appendChild(container.firstChild);
      }
    });
}

function start() {
  loadBannerHTML().then(function() {
    init();
  }).catch(function(err) {
    console.error('Failed to load cookie banner HTML:', err);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}

// Re-apply translations when the app language changes (same-tab)
var _origSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  _origSetItem.apply(this, arguments);
  if (key === 'language') {
    applyTranslations();
  }
};
})();
