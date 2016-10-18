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

  var loginButton = document.querySelector('nav.navbar #sign-in');
  var signupButton = document.querySelector('nav.navbar #sign-up');
  var subPaths = getSubPaths();
  if (!loginButton) {
    putActiveTab();
    return;
  }

  checkUserState();

  function checkUserState () {

    // Send request to check the user is logged in or not
    var developerRequest = new XMLHttpRequest();
    developerRequest.open('GET', '/api/developer.json', true);

    developerRequest.onload = function() {
      if (developerRequest.status >= 200 && developerRequest.status < 400) {
        // Success!
        var data = JSON.parse(developerRequest.responseText);

        if (data.id) {
          loginButton.parentNode.innerHTML = getLoginElem(data.nickname, data.avatar);
          // After 'sign out element' in the dropdown was injected
          var signOutElem = document.getElementById('sign-out');
          signOutElem.addEventListener('click', makeLogoutCall);
          hideSignUpButton();
          putActiveTab();
        } else {
          // When user is not logged in
          loginButton.parentNode.innerHTML = getNotLoginElem();
          signupButton.innerHTML = getSignUpElem();
          putActiveTab();
        }
      } else {
        // We re1ched our target server, but it returned an error
        loginButton.innerHTML = getNotLoginElem();
        signupButton.innerHTML = getSignUpElem();
      }
    };


    developerRequest.onerror = function() {
      //
      loginButton.innerHTML = getNotLoginElem();
      signupButton.innerHTML = getSignUpElem();
    };
    developerRequest.send();
  }

  function hideSignUpButton () {
    signupButton.style.minWidth = '63px'; // to keep width of nav
    signupButton.style.padding = '0';
    signupButton.style.minHeight = '0';
    signupButton.parentNode.style.fontSize = '0';
  }

  function makeLogoutCall (e) {

    e.preventDefault();
    e.stopPropagation();
    var logoutRequest = new XMLHttpRequest();
    logoutRequest.open('POST', '/api/developer/sign_out', true);
    logoutRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    logoutRequest.send();


    // change Button UI, cancle the event when log out is successful

    logoutRequest.onload = function () {
      if (isThisDevPortalPage() || isThisCustomExtractPage()) {
        // If user was on dashboard or custom extract page, redirect the page to sign in page
        window.location = '/developers/sign_in/'
      } else {
        // If user was on other pages than dashboard and custom extract page, just refresh the page.
        window.location.reload();
      }
    }

    logoutRequest.onerror = function () {

    }
  }

  function getLoginElem (nickname, avatarImageURL) {
    var strVar = '';
    strVar += '<a id="sign-in" class="dropdown-toggle" data-toggle="dropdown" data-target="#" role="button">';
    strVar += ' <div id=\"login-profile\">';
    strVar += '   <img width=\"18\" height=\"18\" src=\"'+avatarImageURL+'\" style=\"border-radius: 50%; margin-top: -9px;\">';
    strVar += ' <\/div>';
    strVar += ' <div class="login-txt"> ' + nickname + ' <\/div>';
    strVar += '</a>';
    strVar += ' <ul class="dropdown-menu">';
    strVar += '   <li><a href="/developers/">Dashboard</a></li>';
    strVar += '   <li><a href="/data/metro-extracts/your-extracts/">Custom Extracts</a></li>';
    strVar += '   <li id="sign-out"><a href="#"> Logout</a></li>';
    strVar += ' </ul>';
    return strVar;
  }

  // function getNotLoginElem () {
  //   var strVar='';
  //   // strVar += '<a id=\"login\" href=\"\/developers\/sign_in\">';
  //   strVar += '  <div id=\"login-profile\">';
  //   strVar += '    <div class=\"compass\">';
  //   strVar += '      <div class=\"center-dot\"><\/div>';
  //   strVar += '    <\/div>';
  //   strVar += '  <\/div>';
  //   strVar += '  <div class=\"login-txt\">sign in<\/div>';
  //   // strVar += '<\/a>';
  //   return strVar;
  // }

  function getNotLoginElem () {
    var strVar = '';
    strVar += '<a id=\"login\" class="dropdown-toggle" data-toggle="dropdown" data-target="#" role="button">';
    strVar += '  <div id=\"login-profile\">';
    strVar += '    <div class=\"compass\">';
    strVar += '      <div class=\"center-dot\"><\/div>';
    strVar += '    <\/div>';
    strVar += '  <\/div>';
    strVar += '  <div class=\"login-txt\">sign in<\/div>';
    strVar += '<\/a>';
    strVar += '<ul class="dropdown-menu login-panel">';
    strVar += ' <div class="container">';
    strVar += '  <form>';
    strVar += '    <div class="form-group row">';
    strVar += '      <label class="col-sm-3 col-form-label" for=\"e-mail-id\">ID<\/label>';
    strVar += '      <div class="col-sm-9">';
    strVar += '         <input id="e-mail-id" class="form-control" type="e-mail" placeholder="e-mail">';
    strVar += '       <\/div>';
    strVar += '    <\/div>';
    strVar += '    <div class="form-group row">';
    strVar += '      <label class="col-sm-3 col-form-label" for=\"login-password\">Password<\/label>';
    strVar += '      <div class="col-sm-9">';
    strVar += '         <input id=\"login-password\" class="form-control" type=\"password\" placeholder=\"password\">';
    strVar += "       <\/div>";
    strVar += "     <\/div>";
    strVar += '    <div class="form-group row">';
    strVar += '      <div class="col-sm-12">';
    strVar += '        <input type="submit" value="login" style="width:100%;" class="btn btn-mapzen">';
    strVar += '      </div>';
    strVar += '    </div>';
    strVar += '    <div class="form-group row">';
    strVar += '      <div class="col-sm-12 text-center">';
    strVar += '        or';
    strVar += '      </div>';
    strVar += '    </div>';
    strVar += '    <div class="form-group row">';
    strVar += '      <div class="col-sm-12">';
    strVar += '        <input type="submit" value="continue with github" style="background-color:#444;width:100%;color:#fff;" class="btn btn-github">';
    strVar += '      </div>';
    strVar += '    </div>';
    strVar += "   <\/form>";
    strVar += ' </div>';
    strVar += '</ul>';

    return strVar;
  }

  function getSignUpElem () {
    var strVar = '';
    strVar += '<span class="visible-xs-inline visible-sm-inline visible-md-inline visible-lg-inline btn btn-mapzen">';
    strVar += '  sign up';
    strVar += '<\/span>';
    // strVar += '<div class="alert alert-success">';
    // strVar += ' <strong>Success!</strong> Indicates a successful or positive action.';
    // strVar += '</div>';
    return strVar;
  }

  function getSignOutElem () {
    return 'sign out';
  }

  function putActiveTab () {
    var navItems = document.querySelectorAll('.navbar-nav>li');
    // After dom manipulation
    var loginButton = document.getElementById('sign-in');
    var signupButton = document.getElementById('sign-up');

    if (isThisDevPortalPage()) {
      // If this is developer portal related page
      // Subpath changes based on user's login status.
      // Subpath values are hard coded here
      if(subPaths.length > 1) {
        if (subPaths[1] === 'sign_in') {
          removeClass(loginButton.parentNode, 'inactive');
          addClass(loginButton.parentNode, 'active');
        }
        else if (subPaths[1] === 'sign_up') ; // addClass(signupButton.parentNode, 'active');
        else if (subPaths[1] === 'api') ; // accept term page
        else {
          removeClass(loginButton.parentNode, 'inactive');
          addClass(loginButton.parentNode, 'active');
        }
      }
      else {
        removeClass(loginButton.parentNode, 'inactive');
        addClass(loginButton.parentNode, 'active');
      }
    } else {
      // Get all of the navbar items
      var navItems = document.querySelectorAll('.navbar-nav>li');

      // If the current window location matches the path
      // on this section, add the "active" class to highlight it
      for (var i = 0, j = navItems.length; i < j; i++) {
        var el = navItems[i];

        // Clear if present
        removeClass(el, 'active');
        // Get current path
        var url = el.querySelector('a').href; // This always returns a fully-qualified URL, e.g. https://mapzen.com/path/
        if (url) {
          var path = url.split(window.location.hostname)[1].replace(/\//g, ''); // --> 'path'
          var re = new RegExp('^/' + path + '/?');

          if (re.test(window.location.pathname)) {
            addClass(el, 'active');
          }
        }
      }
    }
  }

  function getSubPaths () {
    var subPaths = window.location.pathname.split('/');
    var locations = [];
    for (var i = 0; i < subPaths.length; i++) {
      if (subPaths[i] !== '') locations.push(subPaths[i]);
    }
    return locations;
  }

  function isThisDevPortalPage () {
    if (subPaths[0] === 'developers') return true;
    else return false;
  }

  function isThisCustomExtractPage () {
    if (subPaths[1] === 'your-extracts') return true;
    else return false;

  }

  function addClass(el, className) {
    if (el.classList)
      el.classList.add(className)
    else if (!hasClass(el, className)) el.className += " " + className
  }

  function removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className)
    else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className=el.className.replace(reg, ' ')
    }
  }

  // Just return a value to define the module export.
  return {};
}));