/**
 * settingsHandler - A handler to settings pages
 * @license MIT
 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
 */

// Pre-defining the settingsHandler interface, for closure documentation and
// static verification.
var settingsHandler = {

  /**
   * Registers a form for future use.
   *
   * @param {settingsHandler.FormConfigPublic} config the registration configuration
   */
  register: function(config) { },

  /**
   * Upgrade all registered forms.
   *
   */
  upgradeAllRegistered: function() { },
};

settingsHandler = (function() {
  'use strict';

  /**
   * Stories constant properties.
   * 
   */
  var _constants = {
    SNACKBAR_ID: 'vint-snackbar-default',
  };

  /**
   * Stories messages.
   * 
   */
  var messages = {
    RESPONSE_403: 'Você não tem permissão para fazer isso',
    RESPONSE_401: 'O VINT não reconhece você',
    RESPONSE_500: 'Algo não funcionou. Tente novamente',
  };

  /** @type {!Array<settingsHandler.ConfigPublic>} */
  var _registeredSettings = [];

  var _register = function(config) {
    var newConfig = {
      ClassConstructor: config.constructor || config['constructor'],
      classAsString: config.classAsString || config['classAsString'],
      cssClass: config.cssClass || config['cssClass'],
    };

    _registeredSettings.forEach(function(item) {
      if (item.cssClass === newConfig.cssClass) {
        throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
      }
    });

    _registeredSettings.push(newConfig);
  }


  /**
   * Upgrade all registered settings in the document DOM
   * 
   */
  var _upgradeAllRegistered = function() {
    for (var i = 0; i < _registeredSettings.length; i++) {
      _upgradeClass(_registeredSettings[i]);
    }
  };


  /**
   * Defines all essential methods prototypes to settings
   * 
   * @param {settingsHandler.ConfigPublic.<ClassConstructor>}
   */
  var _settingsEssentials = function(ClassConstructor) {

    /**
    * Displays a MDL snackbar. 
    * 
    * @param {object} data Snackbar options
    * @param {string} data.message
    * @param {number} data.timeout 
    * @param {function} data.actionHandler 
    * @param {string} data.actionText 
    */
    ClassConstructor.prototype.toast = function(data) {
      var container = document.querySelector('#' + _constants.SNACKBAR_ID);
      if (!container) {
        throw new Error('Snackbar container is not defined.');
        return false;
      }

      if (!data.timeout) {
        data.timeout = 5000;
      }

      container.MaterialSnackbar.showSnackbar(data);
    };


    /**
     * Set attribute [disabled] on all buttons of step
     * 
     * @public
     */
    ClassConstructor.prototype.disableActions = function() {
      var buttons = this._element.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('disabled', '');
      }
    };

    /**
     * Remove attribute [disabled] from all buttons of step
     * 
     * @public
     */
    ClassConstructor.prototype.ableActions = function() {
      var buttons = this._element.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled');
      }
    };

    /**
     * Get the menu settings data 
     *
     * @return {object} 
     * @private
     */
    ClassConstructor.prototype._getMenu = function() {
      var getMenu = function() {
        var itemEdit /** @type {HTMLElement} */;
        var itemDelete /** @type {HTMLElement} */;
        var menuElement = this._element.querySelector('.' + this._cssClasses.SETTINGS_MENU);
        var menuButton = this._element.querySelector('.' + this._cssClasses.SETTINGS_MENU_BUTTON);
        if (menuElement) {
          itemEdit = menuElement.querySelector('.' + this._cssClasses.SETTINGS_MENU_EDIT);
          itemDelete = menuElement.querySelector('.' + this._cssClasses.SETTINGS_MENU_DELETE);
        }

        return {
          element: menuElement,
          button: menuButton,
          items: {
            edit: itemEdit,
            delete: itemDelete,
          }
        };
      };
      var menu = getMenu.bind(this)();

      return menu;
    };


    /**
     * Get the element settings data 
     *
     * @return {object|boolean} 
     * @private
     */
    ClassConstructor.prototype._getDialogs = function() {
      /**
       * Builds the data object
       * 
       * @param {HTMLElement} menu element
       * @return {object|boolean}
       */
      var getDialogs = function(menu) {
        var deleteSelector = 'dialog[data-' + this._datasets.DIALOG + '="delete"]';
        var deleteTargetSelector = '[data-' + this._datasets.DIALOG_TARGET + '="delete"]';
        var deleteButtonConfirmSelector = '.' + this._cssClasses.DIALOG_BUTTON_CONFIRM;
        var deleteButtonCancelSelector = '.' + this._cssClasses.DIALOG_BUTTON_CANCEL;
        var dialogDelete = this._element.querySelector(deleteSelector);

        if (!dialogDelete) return false;
        var dialogDeleteTarget = menu.querySelector(deleteTargetSelector);
        var dialogDeleteButtonConfirm = dialogDelete.querySelector(deleteButtonConfirmSelector);
        var dialogDeleteButtonCancel = dialogDelete.querySelector(deleteButtonCancelSelector);

        return {
          delete: {
            target: dialogDeleteTarget,
            dialog: dialogDelete,
            buttonConfirm: dialogDeleteButtonConfirm,
            buttonCancel: dialogDeleteButtonCancel,
          }
        };
      };

      var dialogs = getDialogs.bind(this)(this._menu.element);

      return dialogs;
    };

    /**
     * Show a settings element
     * 
     * @public
     */
    ClassConstructor.prototype.on = function() {
      this._element.classList.remove('is-deleted');
      var toOn /** @type {HTMLElement} */;
      if (this._element.parentNode.classList.contains('mdl-cell')) {
        toOn = this._element.parentNode;
      } else {
        toOn = this._element;
      }
      toOn.style.display = '';

    };

    /**
     * Hide a settings element
     * 
     * @public
     */
    ClassConstructor.prototype.off = function() {
      this._element.classList.add('is-deleted');
      setTimeout(function() {
        var toOff /** @type {HTMLElement} */;
        if (this._element.parentNode.classList.contains('mdl-cell')) {
          toOff = this._element.parentNode;
        } else {
          toOff = this._element;
        }
        toOff.style.display = 'none';
      }.bind(this), 400);
    };

    /**
     * Process a response with error.
     * 
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {string} errorThrown
     */
    ClassConstructor.prototype._processResponseError = function (jqXHR, textStatus, errorThrown) {
      switch (jqXHR.status) {
        case 401:
          this.toast({
            message: messages.RESPONSE_401,
            actionHandler: function () {
              window.location.href = constants.LOCATION_LOGIN
            },
            actionText: 'Fazer login'
          });
          break;
        case 403:
          this.toast({
            message: messages.RESPONSE_403
          });
          break;
        case 500:
          this.toast({
            message: messages.RESPONSE_500
          });
          break;

      }
    };

    /**
     * Hide a settings element
     * 
     * @public
     */
    ClassConstructor.prototype._sendAjaxRequest = function(options) {
      // Assumes that jQuery object is available gloabally.
      $.ajax(options);
    };
  };

  /**
   * Initialize the instance of the registered settings for each cssClass
   * 
   */
  var _upgradeClass = function(registeredSettings) {
    // All elements with the same registerd cssClass
    var _settingsElements = document.querySelectorAll('.' + registeredSettings.cssClass);

    for (var i = 0; i < _settingsElements.length; i++) {
      var element = _settingsElements[i];
      var instance;
      _settingsEssentials(registeredSettings.ClassConstructor);
      instance = new registeredSettings.ClassConstructor(element);
      element[registeredSettings.classAsString] = instance;
    }
  };

  // Now return the functions that should be made public with their publicly
  // facing names...
  return {
    register: _register,
    upgradeAllRegistered: _upgradeAllRegistered
  };
})();

/**
 * Describes the type of a registered component type managed by
 * settingsHandler. Provided for benefit of the Closure compiler.
 *
 * @typedef {{
 *   constructor: Function,
 *   classAsString: string,
 *   cssClass: string,
 * }}
 */
settingsHandler.ConfigPublic;  // jshint ignore:line


window['settingsHandler'] = settingsHandler;

window.addEventListener('load', function() {
  // Upgrade all registered forms after page loaded
  settingsHandler.upgradeAllRegistered();
});