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
    rejectButton: "Reject",
    preferencesButton: "Preferences",
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
    necessaryAlwaysActive: "Always active"
  },
  fr: {
    title: "Nous utilisons des cookies",
    message: "Ce site web utilise des cookies pour améliorer votre expérience de navigation et fournir du contenu personnalisé.",
    acceptButton: "Accepter tout",
    rejectButton: "Rejeter",
    preferencesButton: "Préférences",
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
    necessaryAlwaysActive: "Toujours actif"
  },
  es: {
    title: "Utilizamos cookies",
    message: "Este sitio web utiliza cookies para mejorar su experiencia de navegación y ofrecer contenido personalizado.",
    acceptButton: "Aceptar todo",
    rejectButton: "Rechazar",
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
    necessaryAlwaysActive: "Siempre activas"
  },
  de: {
    title: "Wir verwenden Cookies",
    message: "Diese Website verwendet Cookies, um Ihr Surferlebnis zu verbessern und personalisierte Inhalte bereitzustellen.",
    acceptButton: "Alle akzeptieren",
    rejectButton: "Ablehnen",
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
    necessaryAlwaysActive: "Immer aktiv"
  },
  it: {
    title: "Utilizziamo i cookie",
    message: "Questo sito web utilizza i cookie per migliorare la tua esperienza di navigazione e fornire contenuti personalizzati.",
    acceptButton: "Accetta tutto",
    rejectButton: "Rifiuta",
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
    necessaryAlwaysActive: "Sempre attivi"
  },
  pt: {
    title: "Utilizamos cookies",
    message: "Este site utiliza cookies para melhorar a sua experiência de navegação e fornecer conteúdo personalizado.",
    acceptButton: "Aceitar tudo",
    rejectButton: "Rejeitar",
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
    necessaryAlwaysActive: "Sempre ativos"
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
  if (floatBtn) floatBtn.textContent = trans.footerLink;

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

        // Add click event listener to slider for better UX
        slider.addEventListener('click', function() {
          input.checked = !input.checked;
          input.dispatchEvent(new Event('change'));
        });

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
  if (social) social.checked = consent.marketing || false;

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
    loadConsentIntoModal({ essential: true, functionality: false, analytics: false, marketing: false });
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
  var hasAcceptedNonEssential = consent.functionality || consent.analytics || consent.marketing;

  // Check if button should show text (preserve text if showText is enabled)
  var shouldShowText = true;
  var text = "Cookie Settings";
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
      saveConsent({ essential: true, functionality: true, analytics: true, marketing: true });
      initGA4();
      trackConsentEvent('accept');
      banner.style.display = 'none';
    });
    acceptBtn.dataset.handlerAttached = 'true';
  }

  if (rejectBtn && !rejectBtn.dataset.handlerAttached) {
    rejectBtn.addEventListener('click', function() {
      saveConsent({ essential: true, functionality: false, analytics: false, marketing: false });
      trackConsentEvent('reject');
      banner.style.display = 'none';
    });
    rejectBtn.dataset.handlerAttached = 'true';
  }

  if (closeBtn && !closeBtn.dataset.handlerAttached) {
    closeBtn.addEventListener('click', function() {
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
          loadConsentIntoModal({ essential: true, functionality: false, analytics: false, marketing: false });
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
      var consent = { essential: true, functionality: true, analytics: true, marketing: true };
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
        marketing: (targeting ? targeting.checked : false) || (social ? social.checked : false)
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

  // Initialize toggles
  setupToggleSwitches();

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
