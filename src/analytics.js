
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

export function initAnalytics() {
  if (!measurementId || initialized) return;

  // 1. Load the gtag.js script FIRST (Google's recommended order)
  const script = document.createElement("script");
  script.async = true;
  script.src =
    `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // 2. Initialize dataLayer and configure AFTER script is queued
  window.dataLayer = window.dataLayer || [];

  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: true });

  initialized = true;
}

/**
 * Send a manual page_view event — used for SPA route changes.
 * @param {string} path - The current pathname (e.g. "/projects")
 * @param {string} [title] - Optional page title override
 */
export function trackPageView(path, title) {
  if (!initialized || typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title || document.title,
  });
}

/**
 * Track a custom event (button click, form submit, outbound link, etc.)
 * @param {string} eventName - GA4 event name (e.g. "contact_form_submit")
 * @param {Object} [params] - Optional event parameters
 */
export function trackEvent(eventName, params = {}) {
  if (!initialized || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}
