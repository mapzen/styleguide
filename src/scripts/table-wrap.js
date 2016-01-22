// (c) 2016 Mapzen
// LICENSE: MIT
//
// TABLES & TABLE WRAPPING
//
// Ensures that tables have .table class when needed.
// Wraps tables in an element that permits horizontal
// scrolling if they are too wide for its parent column.
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

  // Tables inside of .content or .static-content divs should automatically
  // take on the .table class. Here, we apply them client-side.
  var tables = document.querySelectorAll('.content table, .static-content table');
  for (var i = 0, j = tables.length; i < j; i++) {
    tables[i].classList.add('table');
  }

  // Wrap all tables in a container that permits horizontal scrolling if they
  // are too wide for its parent column.
  var tableEls = document.querySelectorAll('.table');

  for (var i = 0, j = tableEls.length; i < j; i++) {
    var el = tableEls[i];
    var wrapper = document.createElement('div');        // Create wrapper
    wrapper.className = 'table-wrapper';                // It's called .table-wrapper
    el.parentNode.insertBefore(wrapper, el);            // Insert it into document where table is
    wrapper.appendChild(el.parentNode.removeChild(el)); // Move the table into the wrapper
  }

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
}));
