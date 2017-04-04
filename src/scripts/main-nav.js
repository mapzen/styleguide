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

  // Metro extract manipulates the page with its own user data
  // So we chacek if there is anything already changed dom to fetch the data
  $(document).ready(function () {
    // There is a possibility that login button was manipulated by metro extract page
    // so assign loginButton value again
    var loginButton = document.querySelector('nav.navbar #sign-in');
    if(loginButton.getAttribute('data-nav-run') !== 'yes') {
      fetchUserData();
    }
  });


  function fetchUserData () {
    // Send request to check the user is logged in or not
    var developerRequest = new XMLHttpRequest();
    developerRequest.open('GET', '/api/developer.json', true);
    developerRequest.onload = function() {
      if (developerRequest.status >= 200 && developerRequest.status < 400) {
        var data = JSON.parse(developerRequest.responseText);
        reflectUserState(data.id, data.nickname, data.avatar, data.admin);
      } else {
        loginButton.parentNode.innerHTML = getNotLoginElem();
        signupButton.innerHTML = getSignUpElem();
      }
    }

    developerRequest.onerror = function() {
      loginButton.parentNode.innerHTML = getNotLoginElem();
      signupButton.innerHTML = getSignUpElem();
    };
    developerRequest.send();
  }

function reflectUserState (id, nickname, imageurl, admin, customLogoutCall) {
    if (id || (nickname && imageurl)) {
      loginButton.parentNode.innerHTML = getLoginElem(id, nickname, imageurl, admin);
      // After 'sign out element' in the dropdown was injected
      var signOutElem = document.querySelector('nav.navbar #sign-out');
      signOutElem.addEventListener('click', customLogoutCall||makeLogoutCall);
      hideSignUpButton();
      putActiveTab();
    } else {
      showLogOutStatus();
      putActiveTab();
    }
  }

  function showLogOutStatus() {
    // When user is not logged in
    loginButton.parentNode.innerHTML = getNotLoginElem();
    signupButton.innerHTML = getSignUpElem();
  }

  function hideSignUpButton () {
    signupButton.style.minWidth = '20px'; // to keep width of nav
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

  function getLoginElem (id, nickname, githubAvatar, admin) {
    // default to showing 'account' and default avatar
    var avatarImageURL = '/common/styleguide/images/default-avatar.svg';
    var label = 'Account';
    var profileClass = 'login-profile-default';
    var profileSize = '24';

    if (nickname) {
      // github user so show github nickname and avatar instead of default
      avatarImageURL = githubAvatar;
      label = nickname;
      profileClass = 'login-profile-github';
      profileSize = '18';
    }

    var strVar = '<a id="sign-in" class="dropdown-toggle" data-toggle="dropdown"'
               + '   data-target="#" data-nav-run="yes" role="button">'
               + ' <div class="' + profileClass + '" id="login-profile">'
               + ' <img width="' + profileSize + '" height="' + profileSize + '"'
               + '      src="' + avatarImageURL + '"'
               + '      style="border-radius: 50%; position: absolute; top: 1px; left: 1px;">'
               + ' </div>'
               + ' <div class="login-txt"> ' + label + ' <\/div>'
               + '</a>'
               + '<ul class="dropdown-menu">';

      if (admin) {
        strVar += '  <li><a href="/admin/">Admin</a></li>';
      }

        strVar +='  <li><a href="/dashboard">Dashboard</a></li>'
               + '  <li><a href="/settings">Settings</a></li>'
               + '  <li id="sign-out"><a href="#"> Logout</a></li>'
               + '</ul>';

    return strVar;
  }

  function getNotLoginElem () {
    var strVar='';
    strVar += '<a id=\"sign-in\" data-nav-run="yes" href=\"\/developers\/sign_in\">';
    strVar += '  <div class=\"login-txt\">sign in<\/div>';
    strVar += '<\/a>';
    return strVar;
  }

  function getSignUpElem () {
    var strVar = '';
    strVar += '<span class="visible-xs-inline visible-sm-inline visible-md-inline visible-lg-inline btn btn-white">';
    strVar += '  sign up';
    strVar += '<\/span>';
    return strVar;
  }

  function putActiveTab () {
    var navItems = document.querySelectorAll('.navbar-nav>li');
    // After dom manipulation
    var loginButton = document.querySelector('nav.navbar #sign-in');
    var signupButton = document.querySelector('nav.navbar #sign-up');

    if (isThisDevPortalPage() && loginButton) {
      if (subPaths[1] === 'sign_in') {
        // we're on the sign_in page so highlight sign_in button
        removeClass(loginButton.parentNode, 'inactive');
        addClass(loginButton.parentNode, 'active');
      } else {
        // not on sign_in, so make sure sign_in is not highlighted
        removeClass(loginButton.parentNode, 'active');
        addClass(loginButton.parentNode, 'inactive');
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
    if (subPaths[0] === 'developers'
        || subPaths[0] === 'dashboard'
        || subPaths[0] === 'settings') {
      return true;
    }
    return false;
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
  return {
    reflectUserState: reflectUserState
  };
}));
