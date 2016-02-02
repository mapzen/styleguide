'use strict';

// Load ASAP
require('./analytics'); // No return value; attaches to window if complete

// Mapzen styleguide; common JS bundle.
// Browser compatibility: IE9+ and evergreen browsers.

var $ = require('jquery');

// Bootstrap JavaScript components. These are shimmed
// and attached to jQuery that is provided here. It cannot have
// visibility to actual jQuery global.
// If this needs to be modified, be sure to also make the
// same updates in the browserify-shim config in package.json
require('bootstrap/js/transition');
require('bootstrap/js/dropdown');
require('bootstrap/js/scrollspy');
require('bootstrap/js/affix');
require('bootstrap/js/collapse');
require('bootstrap/js/modal');

// Mapzen-styleguide specific bundled JavaScripts
var trackEvent = require('./event-tracking.js');
var social = require('./social.js');
var stickynav = require('./sticky-nav.js');
var activelink = require('./active-nav-link.js');
var sidenav = require('./side-nav.js');
var tablewrap = require('./table-wrap.js');

// Create a global MPZN object
// Inherit it if already present from elsewhere
var MPZN = window.MPZN || {};

// Export methods that should be accessible
MPZN.trackEvent = trackEvent;

// We can namespace $ to MPZN to keep it accessible.
MPZN.$ = $;

// Returns window.$ to previous version if present.
// Destroys window.$ if previous version is not present.
// This keeps the imported jQuery within this package only.
$.noConflict();

// Export the MPZN object
module.exports = window.MPZN = MPZN;
