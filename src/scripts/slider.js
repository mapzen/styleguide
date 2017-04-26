// Polyfill for input[type="range"] for browsers that do not support the range input.
// 
// Using rangeslider.js library: https://github.com/andreruffert/rangeslider.js
// 
// Dependencies: jquery >= 1.9.0

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
  'use strict'

  $('input[type="range"]').rangeslider({

    // set polyfill to true to only use polyfill where the range input is not supported (e.g. IE9 and below)
    // set polyfill to false to use the polyfill in any instance of a range input 
    polyfill: true,

    // Default CSS classes
    rangeClass: 'rangeslider',
    disabledClass: 'rangeslider--disabled',
    horizontalClass: 'rangeslider--horizontal',
    verticalClass: 'rangeslider--vertical',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle',

  });
  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
}));