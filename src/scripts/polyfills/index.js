var Promise = require('promise');

require('rangeslider');
require('whatwg-fetch');
require('classlist-polyfill');
require('object-assign');

require('./Array.isArray');

// Attach polyfills to window that do not automatically do it
if (!window.Promise) {
  window.Promise = Promise;
}
