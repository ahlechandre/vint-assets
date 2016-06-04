/**
 * VintSettingsPublicacao - A handler to Vint Settings Publicacao.
 * @license MIT
 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
 */
(function() {
  'use strict';

  /**
   * Class constructor
   * 
   * @constructor
   * @param {HTMLElement} The form that will be handled
   */
  var VintSettingsPublicacao = function(element) {
    this._element = element;

    // initialize the instance
    this.init();
  };

  /** 
   * Stories the css classes 
   * 
   * @private
   */
  VintSettingsPublicacao.prototype._datasets = {
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
  VintSettingsPublicacao.prototype._constants = {
    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
    // DELETE_REQUEST_HANDLER: 'forms::onDeletePublicacaoSettings',
    DELETE_REQUEST_HANDLER: 'publicacaoSettings::onRequest',
    MESSAGE_PUBLICACAO_DELETED: 'A publicação foi removida'
  };

  /** 
   * Stories the css classes 
   * 
   * @private
   */
  VintSettingsPublicacao.prototype._cssClasses = {
    SETTINGS: 'vint-settings',
    SETTINGS_MENU: 'vint-settings__menu',
    SETTINGS_MENU_BUTTON: 'vint-settings__menu-button',
    SETTINGS_MENU_EDIT: 'vint-settings__menu-edit',
    SETTINGS_MENU_DELETE: 'vint-settings__menu-delete',
    DIALOG_BUTTON_CONFIRM: 'vint-dialog__buton-confirm',
    DIALOG_BUTTON_CANCEL: 'vint-dialog__buton-cancel',
  };

  /**
   * Stories the flag that indicates state of settings 
   * 
   * @type {boolean}
   * @private
   */
  VintSettingsPublicacao.prototype._deleted = false;


  /**
   * Stories the menu settings data 
   * 
   * @private
   */
  VintSettingsPublicacao.prototype._menu = {};


  /**
   * Stories the menu settings data 
   * 
   * @private
   */
  VintSettingsPublicacao.prototype._dialogs = {};


  /**
   * Handle the behavior of menu
   *
   * @private 
   */
  VintSettingsPublicacao.prototype._menuHandler = function() {
    var onClickEdit = function(event) {
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
  VintSettingsPublicacao.prototype._dialogsHandler = function() {
    var deleteTarget /** @type {HTMLElement} */ = this._dialogs.delete.target;
    var deleteDialog /** @type {HTMLElement} */ = this._dialogs.delete.dialog;
    var deleteButtonConfirm /** @type {HTMLElement} */ = this._dialogs.delete.buttonConfirm;
    var deleteButtonCancel /** @type {HTMLElement} */ = this._dialogs.delete.buttonCancel;
    var onClickTargetDelete = function(event) {
      event.preventDefault();
      deleteDialog.showModal();
    };
    var onDeleteConfirm = function(event) {
      this._onDelete();
    };
    var onDeleteCancel = function(event) {
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
  VintSettingsPublicacao.prototype._onDelete = function() {
    // Slug of 'publicacao' to delete
    var slug = this._menu.element.dataset[this._datasets.MENU_SETTINGS_CAMEL];
    var ajaxOptions = this._getAjaxOptions(slug);
    // Disable actions while the request is pending.
    this.disableActions();
    this._sendAjaxRequest(ajaxOptions);
  };

  /**
   * Handle a delete of settings
   * 
   * @param {string} publicacao slug
   * @private
   */
  VintSettingsPublicacao.prototype._getAjaxOptions = function(slug) {
    var requestHandler = this._constants.DELETE_REQUEST_HANDLER;
    var headerHandler = this._constants.OCTOBER_REQUEST_HANDLER;
    var data = {
      slug: slug
    };
    var headers = {};
    headers[headerHandler] = requestHandler;
    var onSuccess = function(response) {
      this._processResponse(response);
    };
    var onComplete = function() {
      this._dialogs.delete.dialog.close();
      if (this._deleted) {
        // Removes the deleted element from page
        this.off();        
      } else {
        // Only able the actions if the operation was unsucessfuly
        this.ableActions();
      }
    };
    var onError = function(jqXHR, textStatus, errorThrown) {
      this._processResponseError(jqXHR, textStatus, errorThrown);
    };

    return {
      headers: headers,
      type: 'post',
      data: data,
      success: onSuccess.bind(this),
      complete: onComplete.bind(this),
      error: onError.bind(this)
    };
  };


  /**
   * Handle the request response that's comes from server
   * 
   * @param {object}
   * @private
   */
  VintSettingsPublicacao.prototype._processResponse = function(response) {
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
        message: 'Não foi possível remover a publicação'
      });
      // window.location.reload();
    }
  };

  /**
   * Initialize the instance
   * 
   * @public
   */
  VintSettingsPublicacao.prototype.init = function() {
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
    constructor: VintSettingsPublicacao,
    classAsString: 'VintSettingsPublicacao',
    cssClass: 'vint-settings--publicacao',
  });
})();