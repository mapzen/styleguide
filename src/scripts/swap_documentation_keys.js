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
      swapKeys(documentationKey);
    }
  }
}
apiKeyXhr.open('GET', '/api/developer/documentation_key.json', true);
apiKeyXhr.send();

function swapKeys(documentationKey) {
  if (!documentationKey) {
    // user not signed in or doesn't have a mapzen key so exit
    return;
  }

  // replace contents for elements with class user-api-key
  Array.prototype.forEach.call(apiKeySpans, function(apiKeySpan) {
    apiKeySpan.innerHTML = documentationKey;
  });

  // replace href for elements with class user-api-key-link
  Array.prototype.forEach.call(apiKeyLinks, function(apiKeyLink) {
    var href = apiKeyLink.getAttribute('href');
    var replaced = href.replace(/api_key=[a-zA-Z0-9\-_]+/,
                                `api_key=${documentationKey}`);
    apiKeyLink.setAttribute('href', replaced);
  });
}
