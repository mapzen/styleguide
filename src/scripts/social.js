// (c) 2016 Mapzen
// LICENSE: MIT
//
// SOCIAL SHARING BUTTONS
//
// Some of this functionality is borrowed from RRSSB
// (Ridiculously Responsive Social Sharing Buttons) but
// stripped down because we really don't need all of it
//
// No external JS dependencies.
//
// Mapzen styleguide targets: .social-popup
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

  // Borrowed from rrssb
  function popupCenter (url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height

    var left = ((width / 2) - (w / 2)) + dualScreenLeft
    var top = ((height / 3) - (h / 3)) + dualScreenTop

    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus()
    }
  }

  function attachClickHandlers (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault()
      popupCenter(el.href, el.title, 580, 470)
    })
  }

  function init () {
    var els = document.getElementsByClassName('social-popup')
    for (var i = 0, j = els.length; i < j; i++) {
      attachClickHandlers(els[i])
    }
  }

  // LOADIT
  init()

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
}));
