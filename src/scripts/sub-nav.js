// (c) 2016 Mapzen
// LICENSE: MIT
//
// SUB-NAVIGATION COMPONENT
//
// Handles interaction on the sub-navigation component.
//
// Dependencies: Bootstrap's "affix" JavaScript component
// (attached to its jQuery), and so there is a jQuery
// dependency that should get refactored out
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

  // Bail if there is no sub-nav component present on this page
  // TODO: This class selector could change
  var el = document.querySelector('.toc');
  var $el = $(el); // Remember the jQuery-wrapped version for affix
  if (!el) return;

  var nav = document.querySelector('nav.navbar');

  // Obtain the parent container that serves as the sub-nav's
  // maximum coverage area. This logic assumes that it's part
  // of a Bootstrap .container element. This could change
  // depending on how well it covers actual use cases.
  var container = getParentByClassName(el, 'container');

  // Affix for side nav bar
  // Don't turn on affix if the TOC height is greater than
  // document content, to prevent positioning bugs
  var affixState = false;

  if (el.offsetHeight < container.offsetHeight) {
    $el.affix({
      offset: {
        top: function () {
          var navHeight = nav ? nav.offsetHeight : 0;
          return $(container).offset().top - navHeight;
        },
        bottom: function () {
          return $(document).height() - $(container).offset().top - $(container).outerHeight(true);
        }
      }
    });

    // Record that affix is on
    affixState = true;
  }

  var toggleEls = document.querySelectorAll('.toc-subnav-toggle');
  for (var i = 0, j = toggleEls.length; i < j; i++) {
    var toggle = toggleEls[i];
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var sublist = e.target.parentNode.nextElementSibling;
      sublist.classList.toggle('toc-expand');

      // Recalc affix position after expand transition finishes
      if (affixState === true) {
        $(sublist).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
          $el.affix('checkPosition');
        });
      }
    });
  }

  // Guarantee only one active thing is up
  var activeEls = $('.toc li.active')
  activeEls.each(function (index) {
    if (index + 1 !== activeEls.length) {
      $(activeEls[index]).removeClass('active')
    }
  })

  // Utility functions
  function getParentByClassName (el, parentClass) {
    while (el !== document.documentElement && !el.classList.contains(parentClass)) {
      el = el.parentNode;
    }
    return el;
  }

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
}));
