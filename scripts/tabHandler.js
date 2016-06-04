/**
 * tabHandler - A handler to apply HistoryAPI on MDL Tabs
 * @license MIT
 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
 */

// Pre-defining the tabHandler interface, for closure documentation and
// static verification.
var tabHandler = {
    
  /**
   * Registers a tab for future use.
   *
   * @param {tabHandler.FormConfigPublic} config the registration configuration
   * @return {boolean}
   */
  register: function (config) { },

  /**
   * Upgrade all registered forms.
   *
   */
  upgradeRegistered: function () { },
};

tabHandler = (function () {
  'use strict';
  
  /**
   * Store strings for class names defined by this handler that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
  var _cssClasses = {
    TABS: 'mdl-tabs',
    TABS_TAB: 'mdl-tabs__tab',
    TABS_PANEL: 'mdl-tabs__panel',
    IS_ACTIVE: 'is-active'
  };

  /**
   * Stories the flag that's used to pushState correctly.
   * 
   * @private
   */
  var _pathnameIsRelative = true;
 
  /**
   * Stories constant properties.
   * 
   * @private
   */
  var _constants = {
    CLASS_AS_STRING: 'MaterialTabs',
    HREF_SPLIT: '#tab-',
    WINDOW_PATHNAME: window.location.pathname,
    HISTORY_STATE_PATH: 'tabPath'
  };
  
  /** @type {tabHandler.ConfigPublic} */
  var _registeredTab = {};

  /** @type {object} */
  var _registeredTabTabs = {};
  
  /**
   * Register an especific tab with cofig options.
   * 
   * @param {tabHandler.ConfigPublic}
   * @return {boolean}
   * @private
   */
  var _register = function (config) {

    if (config && Object.keys(config).length > 0) {
      _registeredTab = config;
      return true;
    }
    var tabs = document.querySelector('.' + _cssClasses.TABS);
    
    // Don't have MDL Tab component in DOM
    if (!tabs) return false;
    config = {};
    var tabPath /** @type {string} */;
    // Looping on all tab item of the tab (component)
    for (var j = 0; j < tabs[_constants.CLASS_AS_STRING].tabs_.length; j++) {
      var tab = tabs[_constants.CLASS_AS_STRING].tabs_[j];
      tabPath = _getTabPath(tab);
      // Registering all tab item using the split href attribute as key
      // and the link (HTMLElement) as value
      _registeredTabTabs[tabPath] = tab;
    }
    // Get the constructor of MDL Tabs component     
    config['constructor'] = tabs[_constants.CLASS_AS_STRING];
    _registeredTab = config;
    return true;
  };


  /**
   * Update the history of browser.
   * 
   * @param {string}
   * @private
   */
  var _updateHistory = function (tabPath) {
    if (history.state && history.state[_constants.HISTORY_STATE_PATH] && history.state[_constants.HISTORY_STATE_PATH] === tabPath) {
      return;
    }
    var pathname = _pathnameIsRelative ? _constants.WINDOW_PATHNAME + '/' + tabPath : tabPath;
    var state = {};
    state[_constants.HISTORY_STATE_PATH] = tabPath;
    history.pushState(state, document.title, pathname);
  } 
  
  
  /**
   * Get the path that's will identify the tab on URL.
   * 
   * @param {HTMLElement} an [a.mdl-tabs__tab] element
   * @return {string}
   * @private
   */
  var _getTabPath = function (tabLink) {
    var path /** @type {string} */;
    if (tabLink.getAttribute('href').indexOf(_constants.HREF_SPLIT) === 0) {
      // Tab with href pattern [href="#tab-*"] 
      path = tabLink.getAttribute('href').split(_constants.HREF_SPLIT)[1];
    } else {
      path = tabLink.getAttribute('href').split('#')[1];
    }
    return path;
  }

  
  /**
   * Set the events of all tabs.
   * 
   * @param {tabHandler._registeredTab[]}
   * @private
   */
  var _setTabsEvents = function () {
    var onTabClick = function (event) {
      var tabPath = _getTabPath(this);
      _updateHistory(tabPath);
    }

    for (var i = 0; i < _registeredTab.constructor.tabs_.length; i++) {
      _registeredTab.constructor.tabs_[i].addEventListener('click', onTabClick);
    }
  }


  /**
   * Get tab {HTMLElement} by pathname stored in {_registeredTabTabs[]}.
   * 
   * @return {HTMLElement}
   * @private 
   */
  var _getTabByPath = function (pathname) {
    var attrHref = _constants.HREF_SPLIT + pathname;
    var selector = '.' + _cssClasses.TABS_TAB + '[href="' + attrHref + '"]';
    var tab = _registeredTab.constructor.element_.querySelector(selector);
    return tab;
  }


  /**
   * Get panel {HTMLElement} by pathname stored in {_registeredTabTabs[]}.
   * 
   * @return {HTMLElement}
   * @private 
   */
  var _getPanelByPath = function (pathname) {
    var attrHref = _constants.HREF_SPLIT + pathname;
    var selector = '.' + _cssClasses.TABS_PANEL + attrHref;
    var panel = _registeredTab.constructor.element_.querySelector(selector);
    return panel;
  }


  /**
   * Set the active tab based on {_constanst.WINDOW_PATHNAME}.
   * 
   * @private 
   */
  var _setActive = function (pathname) {
    if (!pathname) {
      // Split the current pathname
      var splitPath = window.location.pathname.split('/'); 
      // Get last item of split array
      pathname = splitPath[(splitPath.length - 1)];
    }

    for (var tabPath in _registeredTabTabs) {
      // Check if the last pathname is referred by some tab item
      if (tabPath === pathname) {
        _registeredTab.constructor.resetTabState_();
        _registeredTab.constructor.resetPanelState_();
        var activateTab = _getTabByPath(tabPath);
        var activatePanel = _getPanelByPath(tabPath);
        activateTab.classList.add(_cssClasses.IS_ACTIVE);
        activatePanel.classList.add(_cssClasses.IS_ACTIVE);
        _pathnameIsRelative = false;
        return;
      }
    }
    _pathnameIsRelative = true;
  };
  

  /**
   * Upgrade the tab present in _registeredTab array.
   * 
   * @private
   */
  var _upgradeRegistered = function () {
    var onPopStateWindow = function (event) {
      var pathWillActivate;
      var pathnameDiff = window.location.pathname.replace(_constants.WINDOW_PATHNAME, '');
      if (pathnameDiff === '/' || pathnameDiff === '') {
        var initialActive = _getTabPath(_registeredTab.active);
        _setActive(initialActive);
        return;
      }
      
      // Check if history.state has the property [tabPath] that
      // indicates which tab needs to be activated on popstate
      if (history.state && history.state.hasOwnProperty(_constants.HISTORY_STATE_PATH)) {
        // Get the tab path to be activate
        pathWillActivate = history.state[_constants.HISTORY_STATE_PATH];
        _setActive(pathWillActivate);
      }
    };
    if (_constants.WINDOW_PATHNAME.lastIndexOf('/') === (_constants.WINDOW_PATHNAME.length - 1)) {
      // If last char of url is '/' remove it
      _constants.WINDOW_PATHNAME = _constants.WINDOW_PATHNAME.slice(0, -1);
    }
    // Set the active tab
    _setActive();
    var tabElement = _registeredTab.constructor.element_;
    // Get the href attribute of tab initialized as active
    _registeredTab['active'] = tabElement.querySelector('.' + _cssClasses.TABS_TAB + '.' + _cssClasses.IS_ACTIVE);
    _setTabsEvents();
    // On popstate (click on browser back button, history.back() or history.go(-<number>))
    // set manually click on specific tab
    window.addEventListener('popstate', onPopStateWindow);
  };

  // Now return the functions that should be made public with their publicly
  // facing names...
  return {
    register: _register,
    upgradeRegistered: _upgradeRegistered
  };
})();

/**
 * Describes the type of a registered component type managed by
 * tabHandler. Provided for benefit of the Closure compiler.
 *
 * @typedef {{
 *   constructor: Function,
 *   active: string,
 * }}
 */
tabHandler.ConfigPublic;  // jshint ignore:line

window.addEventListener('load', function () {
  // Register the first tab
  var registered = tabHandler.register();
  if (registered) {
    // Upgrade the registered tab
    tabHandler.upgradeRegistered();
  }
});