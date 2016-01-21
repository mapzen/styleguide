// (c) 2016 Mapzen
// LICENSE: MIT
//
// EVENT TRACKING
// Wrapper for Google Analytics' event tracker
//
// Dependencies: Google Analytics loaded on window.ga
// --------------------------------------------------------
(function (root, factory) {
  // Universal Module Definition (UMD)
  // via https://github.com/umdjs/umd/blob/master/templates/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, function () {
  'use strict';

  var trackEvent = function (category, action, label, value) {
    // Fail silently if Google Analytics is not present
    if (typeof window.ga !== 'function') {
      console.log('Event tracking: Analytics not loaded.');
      return false;
    }
    console.log('Event tracked:', [category || '(null)', action || '(null)', label || '(null)', value || '(null)'].join(', '));
    ga('send', 'event', category, action, label, value);
  }

  return trackEvent;
}));
