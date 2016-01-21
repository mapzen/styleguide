// Styleguide js

$(window).on('create.xrayhtml', function (e) {
  highlightCodeBlocks();

  // Trim blank lines from code snippets
  var markupEls = document.querySelectorAll('code.language-markup');
  for (var i = 0, j = markupEls.length; i < j; i++) {
    trimCodeSnippet(markupEls[i]);
  }
  initClipboard();
});

// Highlight code blocks created by xrayhtml
function highlightCodeBlocks () {
  if (Prism) {
    var prismEls = document.querySelectorAll('.source-panel code');
    for (var i = 0, j = prismEls.length; i < j; i++) {
      prismEls[i].classList.add('language-markup');
    }
    Prism.highlightAll();
  }
}

// Trim a code snippet
// This directly edits an element passed in as its argument
function trimCodeSnippet (el) {
  var first = el.childNodes[0];
  var last = el.childNodes[el.childNodes.length - 1];
  // If first node is a text node, trim whitespace only from its beginning
  if (first.nodeType === Node.TEXT_NODE) {
    first.nodeValue = first.nodeValue.replace(/^\s*/, '')
  }
  // If last node is a text node, trim whitespace only from its end
  if (last.nodeType === Node.TEXT_NODE) {
    last.nodeValue = last.nodeValue.replace(/\s*$/, '')
  }
}

// activate clipboard js
function initClipboard() {

  var clipboard = new Clipboard('.copy-btn');

  clipboard.on('success', function(e) {
      e.trigger.setAttribute('class', 'btn btn-transparent copy-btn copied');
      e.clearSelection();
  });

  clipboard.on('error', function(e) {
    e.trigger.setAttribute('class', 'btn btn-transparent copy-btn no-copied');
  });

  var copyBtns = document.querySelectorAll('.copy-btn');

  for (var i = 0; i < copyBtns.length; i++) {
    copyBtns[i].addEventListener('mouseleave', function(e) {
        e.currentTarget.setAttribute('class', 'btn btn-transparent copy-btn');
    });
  }
}
