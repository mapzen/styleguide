// (c) 2016 Mapzen
// LICENSE: MIT
//
// ACTIVE NAV LINK THINGY
//
// Highlights the appropriate active section on the navigation
// bar based on the current window.location URL.
// This mimics what the active_link.rb plugin did in the Jekyll
// -based mapzen/blog repository, but on the client side, so
// it's project-agnostic.
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
  'use strict'

  // Bail if there is no navbar present on this page
  if (!document.querySelector('nav.navbar')) return;

  // Get all of the navbar items
  var navItems = document.querySelectorAll('.navbar-nav>li');

  // If the current window location matches the path
  // on this section, add the "active" class to highlight it
  for (var i = 0, j = navItems.length; i < j; i++) {
    var el = navItems[i];

    // Clear if present
    el.classList.remove('active');
    // Get current path
    var url = el.querySelector('a').href; // This always returns a fully-qualified URL, e.g. https://mapzen.com/path/
    if (url) {
      var path = url.split(window.location.hostname)[1].replace(/\//g, ''); // --> 'path'
      var re = new RegExp('^/' + path + '/?');

      if (re.test(window.location.pathname)) {
        el.classList.add('active');
      }
    }
  }

  // Just return a value to define the module export.
  return {};
}));
