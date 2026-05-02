// src/test/setup.js
// ─── Global Test Setup ────────────────────────────────────────────────────────
// This file runs before every test. It configures the DOM-testing matchers
// from @testing-library/jest-dom (e.g. toBeInTheDocument, toBeDisabled).
import '@testing-library/jest-dom';

// jsdom does not implement scrollIntoView (it's a layout API requiring a real browser).
// We provide a no-op mock so components that call it (like ChatAssistant's
// auto-scroll behaviour) don't throw during tests.
window.HTMLElement.prototype.scrollIntoView = function () {};
