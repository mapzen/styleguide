// (c) 2016 Mapzen
// LICENSE: MIT
//
// HIDE / SHOW MAIN NAVIGATION
//
// Allows user scrolling to toggle navigation stickyness.
//
// Dependencies: Bootstrap-compatible navbar in HTML/CSS.
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

  // Constants
  // Tweak this to get your desired behavior.
  var SCROLL_COUNTER_LIFESPAN = 1000

  var ALWAYS_SHOW_BELOW_Y_POSITION = 60
  var SHOW_AFTER_SCROLL_UP_DISTANCE = 10
  var HIDE_AFTER_SCROLL_DOWN_DISTANCE = 4
  var TRANSITION_BELOW_Y_POSITION = 100

  // Internal variables
  var windowPreviousYPosition
  var windowYPosition
  var scrollDistance = 0
  var scrollDirection = null
  var previousScrollDirection = null
  var scrollCounterLifespanTimer

  // Navbar is slightly different on index page
  var IS_INDEX_PAGE = document.querySelector('body.index_page') ? true : false

  // Bootstrap: cache element for dropdown menu
  var bootstrapMenu = document.getElementsByClassName('navbar-collapse')[0]
  var bootstrapMenuButton = document.getElementsByClassName('navbar-toggle')[0]

  // Functions
  function resetScrollCounters () {
    scrollDistance = 0
  }

  function showFixedMainNav () {
    document.body.classList.remove('hide-fixed-main-nav')
    document.body.classList.add('fixed-main-nav')
  }

  function hideFixedMainNav () {
    document.body.classList.remove('fixed-main-nav')
    document.body.classList.add('hide-fixed-main-nav')

    // Bootstrap: hide menu on mobile, if open
    bootstrapMenu.classList.remove('in')
    bootstrapMenuButton.blur()
  }

  function showTransparentMainNav () {
    document.body.classList.add('transparent-main-nav')
  }
  function hideTransparentMainNav () {
    document.body.classList.remove('transparent-main-nav')
  }


  // Initialize

  if (IS_INDEX_PAGE) showTransparentMainNav()

  // Explicitly declare that the main nav should be
  // fixed in place when the page is loaded
  showFixedMainNav()

  // Main navigation show/hide based on user scroll action
  window.addEventListener('scroll', function (e) {
    // Return early if some other script is doing the scrolling, as
    // indicated by the presence of the `is-scrolling` class that is
    // momentarily applied to the body element
    if (document.body.classList.contains('is-scrolling')) {
      return resetScrollCounters()
    }

    // Determine window Y positioning
    // documentElement.scrollTop returns 0 in Chrome for some reason
    // document.body.scrollTop is deprecated, but is backwards-compatible
    windowPreviousYPosition = windowYPosition
    windowYPosition = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop

    // Determine window scroll direction
    // The terms "up" and "down" are from the viewer's perspective.
    // That is, "scrolling down" means that the page moves _up_ in space
    // and "scrolling up" means that the page moves _down_ in space.
    previousScrollDirection = scrollDirection
    scrollDirection = (windowYPosition > windowPreviousYPosition) ? 'down' : 'up'

    // Set scroll distance in the current direction
    if (scrollDirection !== previousScrollDirection) {
      scrollDistance = Math.abs(windowYPosition - windowPreviousYPosition)
    } else {
      scrollDistance += Math.abs(windowYPosition - windowPreviousYPosition)
    }

    // Always show main nav when windowY is at a set position
    if (windowYPosition < ALWAYS_SHOW_BELOW_Y_POSITION) {
      return showFixedMainNav()
    }

    // Show transparent style when nav is near the top of index page
    if (windowYPosition < TRANSITION_BELOW_Y_POSITION && IS_INDEX_PAGE) {
      showTransparentMainNav()
    } else {
      hideTransparentMainNav()
    }

    // Set a timer to expire scroll counter after a set time
    window.clearTimeout(scrollCounterLifespanTimer)
    scrollCounterLifespanTimer = window.setTimeout(function () {
      resetScrollCounters()
    }, SCROLL_COUNTER_LIFESPAN)

    // As user scrolls up, reveal main navigation
    // or hide it, as user scrolls back down
    if ((scrollDirection === 'up' && scrollDistance >= SHOW_AFTER_SCROLL_UP_DISTANCE) && windowYPosition > ALWAYS_SHOW_BELOW_Y_POSITION) {
      showFixedMainNav()
    } else if (scrollDirection === 'down' && scrollDistance >= HIDE_AFTER_SCROLL_DOWN_DISTANCE && !IS_INDEX_PAGE) {
      hideFixedMainNav()
    }
  });

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {};
}));
