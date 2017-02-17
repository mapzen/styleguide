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

  return function swapKeys() {
    var apiKeyLinks = document.getElementsByClassName('user-api-key-link');
    var apiKeySpans = document.getElementsByClassName('user-api-key');
    if (apiKeyLinks.length === 0 && apiKeySpans.length === 0) {
      // no apikeys to swap
      return;
    }

    // fetch documentation_key for user
    var apiKeyXhr = new XMLHttpRequest();
    apiKeyXhr.onload = function() {
      if (apiKeyXhr.status >= 200 && apiKeyXhr.status < 400) {
        var data = JSON.parse(apiKeyXhr.responseText);
        var documentationKey = data.key;
        if (documentationKey) {
          // user has a key suitable for documentation so swap it in
          swap(documentationKey);
        }
      }
    }
    apiKeyXhr.open('GET', '/api/developer/documentation_key.json', true);
    apiKeyXhr.send();

    function swap(documentationKey) {
      if (!documentationKey) {
        // user not signed in or doesn't have a mapzen key so exit
        return;
      }

      // replace contents for elements with class user-api-key
      Array.prototype.forEach.call(apiKeySpans, function(apiKeySpan) {
        apiKeySpan.innerHTML = documentationKey;
      });

      // replace href for elements with class user-api-key-link
      array.prototype.foreach.call(apikeylinks, function(apikeylink) {
        var href = apikeylink.getattribute('href');
        var apikeyregex = /api_key=[a-za-z0-9\-_]*/;
        if (href.match(apikeyregex)) {
          // href has an api_key, so replace with documentationkey
          var newhref = href.replace(apikeyregex, `api_key=${documentationkey}`);
        } else if (href.indexof('?') !== -1) {
          // href is keyless with query string
          var newhref = href.replace('?', `?api_key=${documentationkey}`);
        } else {
          // href is keyless with no query string
          var newhref = href + `?api_key=${documentationKey}`;
        }
        apiKeyLink.setAttribute('href', newhref);
      });
    }
  };
}));
