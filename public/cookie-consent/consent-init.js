// CRITICAL: Initialize consent mode BEFORE any trackers load
// This MUST be synchronous and run immediately to block trackers
(function() {
  'use strict';

  // Initialize dataLayer immediately (for GTM/GA4)
  window.dataLayer = window.dataLayer || [];

  // Initialize gtag function immediately
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;

  // Set consent defaults to DENIED before any trackers load
  // This blocks ALL trackers (GTM, GA4, Meta Pixel, Google Ads, etc.) until user grants consent
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });

  // Also push to dataLayer for GTM compatibility
  window.dataLayer.push({
    'event': 'cookie_consent_default',
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  });
})();
