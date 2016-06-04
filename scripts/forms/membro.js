/**
 * VintMembro - A handler to Vint Membro form.
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
  var VintMembro = function (form, isCreate, isUpdate) {
    this._form = form;
    this._isCreate = isCreate;
    this._isUpdate = isUpdate;

    // initialize the instance
    this.init();
  };

  /**
   * Stories messages.
   * 
   * @private
   */
  VintMembro.prototype._messages = {
    CREATED: 'O membro foi convidado',
    UPDATED: 'O membro foi atualizado',
  };

  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintMembro.prototype._constants = {
    REQUEST_HANDLER_CREATE: 'membroCreate::onRequest',
    REQUEST_HANDLER_UPDATE: 'membroUpdate::onRequest',
  };

  /**
   * Flag used to check the form state.
   * 
   * @type {boolean}
   * @private
   */
  VintMembro.prototype._formValid = true;


  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintMembro.prototype._requiredFields = ['nome', 'email', 'tipo'];

  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintMembro.prototype._defaultErrorMessages = {};


  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintMembro.prototype._filePatterns = {};


  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintMembro.prototype.fields = {};

  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintMembro.prototype._setFields = function () { };


  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintMembro.prototype._jqueryForm = {};


  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintMembro.prototype._setJqueryForm = function () { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintMembro.prototype._setRequestLoading = function () { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintMembro.prototype._sendAjaxRequest = function (requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintMembro.prototype.disableSubmit = function () { };


  /**
   * Able form submit action
   * 
   */
  VintMembro.prototype.ableSubmit = function () { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintMembro.prototype.resetValidationErrors = function () { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintMembro.prototype._displayValidationErrors = function (errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintMembro.prototype._displayValidationErrorDOM = function (field, message) { };


  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintMembro.prototype._displayValidationErrorConsole = function (message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintMembro.prototype._fieldsFocusedEffect = function () { };


  /**
  * Check all required fields (defined in <Constructor>._requiredFields property).
  * Add an error message on empty fields.
  * 
  * @private
  */
  VintMembro.prototype._checkRequiredFields = function () { };


  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintMembro.prototype._initialValues = {};

  /**
   * Change the current fields values to initial values (<Constructor>._initialValues). 
   * 
   */
  VintMembro.prototype.resetValues = function () { };

  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintMembro.prototype._patterns = function () {
    var onChangeAtivo = function (event) {
      // input[name=saida] is required.
      if (!this.fields['saida']) return;

      if (event.target.checked) {
        this.fields['saida'].setAttribute('disabled', '');
      } else {
        this.fields['saida'].removeAttribute('disabled');
      }
    };

    if (this.fields['ativo']) {
      this.fields['ativo'].addEventListener('change', onChangeAtivo.bind(this));
    }
  };

  /**
   * Defines the options to send for server with XMLHttpRequest (ajax)
   * 
   * @return {object}
   * @private
   */
  VintMembro.prototype._getDefaultRequestOptions = function () {
    var onSuccess = function (response) {
      this._processResponseSuccess(response);
    };
    var onComplete = function () {

      if (this._isCreate && this._created) {
        // Clear all fields.
        this.resetValues();
      }
      this.ableActions();
    };
    var onError = function (jqXHR, textStatus, errorThrown) {
      this._processResponseError(jqXHR, textStatus, errorThrown);
    };

    return {
      success: onSuccess.bind(this),
      complete: onComplete.bind(this),
      error: onError.bind(this),
    };
  };


  /**
   * Defines the listeners to the required form events 
   * 
   * @private
   */
  VintMembro.prototype._formEvents = function () {
    var valid /** @type {boolean} */;
    var formOnSubmit = function (event) {
      var requestHandler /** @type {string} */;
      var requestOptions /** @type {string} */;
      event.preventDefault();
      valid = this._checkRequiredFields();
      requestOptions = this._getDefaultRequestOptions();

      if (this._isCreate) {
        requestHandler = this._constants.REQUEST_HANDLER_CREATE;
      } else if (this._isUpdate) {
        requestHandler = this._constants.REQUEST_HANDLER_UPDATE;
      }

      if (!valid) return false;
      this.disableActions();
      this._sendAjaxRequest(requestHandler, requestOptions);
    };

    this._form.addEventListener('submit', formOnSubmit.bind(this));
  };

  /**
   * Initialize the instance
   * 
   */
  VintMembro.prototype.init = function () {
    // If has the form element
    if (this._form) {
      // Define the form value of [data-request-loading] attribute 
      // to the selector of element that's will be displayed (loading) 
      // while the request is not completed.
      this._setRequestLoading();
      // Define the jquery object for the this._form element. Will be used to call 
      // ajax requests.
      this._setJqueryForm();
      // Storie all fields inside form in this.fields. 
      this._setFields();
      // Add flag 'is-focused' on focus fields
      this._fieldsFocusedEffect();
      // Basic fields patterns
      this._patterns();
      // Add listeners to form events
      this._formEvents();
    }
  };

  // Assumes that formHandler is available globally
  formHandler.register({
    constructor: VintMembro,
    classAsString: 'VintMembro',
    cssClass: 'vint-form--membro',
    maintenance: true,
    createName: 'membro-create',
    updateName: 'membro-update',
  });
})();