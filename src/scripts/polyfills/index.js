var Promise = require('promise-polyfill');
require('rangeslider');
require('whatwg-fetch');

require('./Object.assign');
require('./Array.isArray');

// Attach polyfills to window that do not automatically do it
if (!window.Promise) {
  window.Promise = Promise;
}
