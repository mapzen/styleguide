// (c) 2016 Mapzen
// LICENSE: MIT
//
// SIDE NAVIGATION COMPONENT
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
          return container.offsetTop - navHeight;
        },
        bottom: function () {
          return document.documentElement.scrollHeight - container.offsetTop - outerHeight(container);
        }
      }
    });

    // Record that affix is on
    affixState = true;
  }

  // Handle navigation list items that toggle a submenu to appear
  var toggleEls = document.querySelectorAll('.toc-subnav-toggle');
  for (var i = 0, j = toggleEls.length; i < j; i++) {
    var toggle = toggleEls[i];
    toggle.addEventListener('click', function (e) {
      // Toggles the submenu if there is no link to another page
      if (!e.target.href || e.target.href === '#') {
        var sublist = e.target.parentNode.nextElementSibling;
        sublist.classList.toggle('toc-expand');

        // Recalc affix position after expand transition finishes
        // TODO: Refactor out jQuery usage here.
        if (affixState === true) {
          $(sublist).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
            $el.affix('checkPosition');
          });
        }
      }
    });
  }

  // window.setTimeout(function () {
  //   window.addEventListener('scroll', function (e) {
  //     console.log(el);
  //     if (!el.querySelector('.active')) {
  //       var expanded = el.querySelector('.toc-expand');
  //       if (expanded) {
  //         expanded.firstChild.classList.add('active');
  //       }
  //     }
  //   });
  // }, 2000);
$('body').on('activate.bs.scrollspy', function () {
  console.log('test')
})

  // Guarantee only one active list item is highlighted at a time.
  // Use case: on the Tangram documentation page, where there is
  // a third level of navigation, we want to prevent scrollspy from
  // highlighting both the second and third level nav items.
  var activeEls = document.querySelectorAll('.toc li.active');
  for (var i = 0, j = activeEls.length; i < j; i++) {
    if (i + 1 !== activeEls.length) {
      activeEls[i].classList.remove('active');
    }
  }

  // Utility functions
  // --------------------------------------------------------------------------

  // Get the parent element of given node that matches a class name
  function getParentByClassName (el, parentClass) {
    while (el !== document.documentElement && !el.classList.contains(parentClass)) {
      el = el.parentNode;
    }
    return el;
  }

  // Get the full height of an element, including its margins
  function outerHeight (el) {
    var height = el.getBoundingClientRect().height;
    var style = getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  }

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
}));
