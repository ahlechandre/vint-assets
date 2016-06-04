/**
 * VintSettingsMembro - A handler to Vint Settings Programa.
 * @license MIT
 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
 */
(function () {
  'use strict';

  /**
   * Class constructor
   * 
   * @constructor
   * @param {HTMLElement} The form that will be handled
   */
  var VintSettingsMembro = function (element) {
    this._element = element;

    // initialize the instance
    this.init();
  };

  /** 
   * Stories the css classes 
   * 
   * @private
   */
  VintSettingsMembro.prototype._datasets = {
    DIALOG: 'vint-dialog',
    DIALOG_TARGET: 'vint-dialog-target',
    DIALOG_TARGET_CAMEL: 'vintDialogTarget',
    MENU_SETTINGS: 'vint-menu',
    MENU_SETTINGS_CAMEL: 'vintMenu',
    SETTINGS_HREF: 'vint-href',
    SETTINGS_HREF_CAMEL: 'vintHref',
  };

  /** 
   * Stories the css classes 
   * 
   * @private
   */
  VintSettingsMembro.prototype._constants = {
    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
    DELETE_REQUEST_HANDLER: 'membroToggleState::onRequest',
    MESSAGE_PUBLICACAO_DELETED: 'O membro foi atualizado',
    ACCOUNT_COLOR_ABLED: '#69F0AE',
    ACCOUNT_COLOR_DISABLED: '#FFFF00',
    ACCOUNT_COLOR_REMOVED: '#F44336',
  };

  /** 
   * Stories the css classes 
   * 
   * @private
   */
  VintSettingsMembro.prototype._cssClasses = {
    SETTINGS: 'vint-settings',
    SETTINGS_MENU: 'vint-settings__menu',
    SETTINGS_MENU_BUTTON: 'vint-settings__menu-button',
    SETTINGS_MENU_EDIT: 'vint-settings__menu-edit',
    SETTINGS_MENU_DELETE: 'vint-settings__menu-delete',
    DIALOG_BUTTON_CONFIRM: 'vint-dialog__buton-confirm',
    DIALOG_BUTTON_CANCEL: 'vint-dialog__buton-cancel',
    ACCOUNT_ACTIVE_CIRCLE: 'vint-active-circle--account',
    TOOLTIP: 'mdl-tooltip'
  };

  /**
   * Stories the flag that indicates state of settings 
   * 
   * @type {boolean}
   * @private
   */
  VintSettingsMembro.prototype._deleted = false;


  /**
   * Stories the menu settings data 
   * 
   * @private
   */
  VintSettingsMembro.prototype._menu = {};


  /**
   * Stories the menu settings data 
   * 
   * @private
   */
  VintSettingsMembro.prototype._dialogs = {};


  /**
   * Handle the behavior of menu
   *
   * @private 
   */
  VintSettingsMembro.prototype._menuHandler = function () {
    if (!this._menu.items.edit || this._menu.items.edit.hasAttribute('disabled')) return;
    var onClickEdit = function (event) {
      var location = this._menu.items.edit.dataset[this._datasets.SETTINGS_HREF_CAMEL];
      if (location) {
        window.location.href = location;
      }
    };
    this._menu.items.edit.addEventListener('click', onClickEdit.bind(this));
  };


  /**
   * Handle the behavior of dialogs
   *
   * @private 
   */
  VintSettingsMembro.prototype._dialogsHandler = function () {
    if (!this._dialogs.delete) return;
    var deleteTarget /** @type {HTMLElement} */ = this._dialogs.delete.target;
    var deleteDialog /** @type {HTMLElement} */ = this._dialogs.delete.dialog;
    var deleteButtonConfirm /** @type {HTMLElement} */ = this._dialogs.delete.buttonConfirm;
    var deleteButtonCancel /** @type {HTMLElement} */ = this._dialogs.delete.buttonCancel;
    var onClickTargetDelete = function (event) {
      event.preventDefault();
      deleteDialog.showModal();
    };
    var onDeleteConfirm = function (event) {
      this._onDelete();
    };
    var onDeleteCancel = function (event) {
      deleteDialog.close();
    };

    // Show delete dialog
    deleteTarget.addEventListener('click', onClickTargetDelete.bind(this));
    // On confirm delete
    deleteButtonConfirm.addEventListener('click', onDeleteConfirm.bind(this));
    // On cancel delete
    deleteButtonCancel.addEventListener('click', onDeleteCancel.bind(this));
  };


  /**
   * Handle a delete of settings
   * 
   * @private
   */
  VintSettingsMembro.prototype._onDelete = function () {
    // Username to delete
    var username = this._menu.element.dataset[this._datasets.MENU_SETTINGS_CAMEL];
    var ajaxOptions = this._getAjaxOptions(username);
    // Disable actions while the request is pending.
    this.disableActions();
    this._sendAjaxRequest(ajaxOptions);
  };

  /**
   * Handle a delete of settings
   * 
   * @param {string} username
   * @private
   */
  VintSettingsMembro.prototype._getAjaxOptions = function (username) {
    var requestHandler = this._constants.DELETE_REQUEST_HANDLER;
    var headerHandler = this._constants.OCTOBER_REQUEST_HANDLER;
    var data = {
      username: username
    };
    var headers = {};
    headers[headerHandler] = requestHandler;
    var onSuccess = function (response) {
      this._processResponse(response);
    };
    var onError = function (jqXHR, textStatus, errorThrown) {
      this._processResponseError(jqXHR, textStatus, errorThrown);
    };
    var onComplete = function () {
      this._dialogs.delete.dialog.close();
      this.ableActions();
      if (this._deleted) {
        var newText /** @type {string} */;
        var activeCircleColor /** @type {string} */;
        var activeCircle = this._element.querySelector('.' + this._cssClasses.ACCOUNT_ACTIVE_CIRCLE);
        var tooltip = this._element.querySelector('.' + this._cssClasses.TOOLTIP + '[for="' + activeCircle.getAttribute('id') + '"]');
        if (this._element.classList.contains('is-off')) {
          newText = 'Desativar';
          activeCircleColor = this._constants.ACCOUNT_COLOR_ABLED;
          tooltip.textContent = 'Conta ativa';
          this._element.classList.remove('is-off');
        } else {
          newText = 'Ativar';
          activeCircleColor = this._constants.ACCOUNT_COLOR_DISABLED;
          tooltip.textContent = 'Conta desativada';
          this._element.classList.add('is-off');
        }
        // Update the text content of menu item
        this._menu.items.delete.textContent = newText;
        if (activeCircle) {
          activeCircle.style.backgroundColor = activeCircleColor;
        }
      }
    };

    return {
      headers: headers,
      type: 'post',
      data: data,
      success: onSuccess.bind(this),
      complete: onComplete.bind(this),
      error: onError.bind(this),
    };
  };


  /**
   * Handle the request response that's comes from server
   * 
   * @param {object}
   * @private
   */
  VintSettingsMembro.prototype._processResponse = function (response) {
    var message /** @type {string} */;
    if (!response.hasOwnProperty('success')) return;

    if (response.success) {
      // Deleted with success
      this._deleted = true;
      message = this._constants.MESSAGE_PUBLICACAO_DELETED;
      this.toast({
        message: message
      });

    } else {
      // Problems to delete
      this._deleted = false;
      this.toast({
        message: 'Não foi possível atualizar a conta'
      });
    }
  };

  /**
   * Initialize the instance
   * 
   * @public
   */
  VintSettingsMembro.prototype.init = function () {
    if (this._element) {
      // Exists the container
      this._menu = this._getMenu();
      this._dialogs = this._getDialogs();
      this._menuHandler();
      this._dialogsHandler();
    }
  };

  // Assumes that formHandler is available globally
  settingsHandler.register({
    constructor: VintSettingsMembro,
    classAsString: 'VintSettingsMembro',
    cssClass: 'vint-settings--membro',
  });
})();