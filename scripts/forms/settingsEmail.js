/**
 * VintSettingsEmail - A handler to Vint Vint Settings Email form.
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
  var VintSettingsEmail = function (form) {
    this._form = form;
    
    // initialize the instance
    this.init();
  };
  
  
  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintSettingsEmail.prototype._constants = {
    REQUEST_HANDLER: 'settingsEmail::onRequest',
    RESPONSE_SUCCESS: 'success',
    RESPONSE_LOCATION: 'location',
    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
    RESPONSE_BAD_REQUEST: 'badRequest',
    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
    MESSAGE_UPDATED: 'As configurações de e-mail foram atualizadas'
  };
  
  /**
   * Flag used to check the form state.
   * 
   * @type {boolean}
   * @private
   */
  VintSettingsEmail.prototype._formValid = true;


  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintSettingsEmail.prototype._requiredFields = [];
  
  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintSettingsEmail.prototype._defaultErrorMessages = {};
  

  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintSettingsEmail.prototype._filePatterns = {};


  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintSettingsEmail.prototype.fields = {};
  
  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintSettingsEmail.prototype._setFields = function () { };
  

  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintSettingsEmail.prototype._jqueryForm = {};
  
  
  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintSettingsEmail.prototype._setJqueryForm = function () { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintSettingsEmail.prototype._setRequestLoading = function () { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintSettingsEmail.prototype._sendAjaxRequest = function (requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintSettingsEmail.prototype.disableSubmit = function () { };


  /**
   * Able form submit action
   * 
   */
  VintSettingsEmail.prototype.ableSubmit = function () { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintSettingsEmail.prototype.resetValidationErrors = function () { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintSettingsEmail.prototype._displayValidationErrors = function (errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintSettingsEmail.prototype._displayValidationErrorDOM = function (field, message) { };
  
  
  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintSettingsEmail.prototype._displayValidationErrorConsole = function (message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintSettingsEmail.prototype._fieldsFocusedEffect = function () { };


  /**
  * Check all required fields (defined in <Constructor>._requiredFields property).
  * Add an error message on empty fields.
  * 
  * @private
  */
  VintSettingsEmail.prototype._checkRequiredFields = function () { };
  

  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintSettingsEmail.prototype._initialValues = {};

  /**
   * Change the current fields values to initial values (<Constructor>._initialValues). 
   * 
   */
  VintSettingsEmail.prototype.resetValues = function () { };

  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintSettingsEmail.prototype._patterns = function () {
  };


  /**
   * Handle the XMLHttpRequest (ajax) response
   * 
   * @param {object} - The response that comes from server
   * @return {undefined}
   * @private
   */
  VintSettingsEmail.prototype._processResponse = function (response) {
    var message /** @type {string} */;

    if (response.hasOwnProperty(this._constants.RESPONSE_BAD_REQUEST) && response[this._constants.RESPONSE_BAD_REQUEST]) {
      // Bad request was identified by server.
      message = this._constants.MESSAGE_BAD_REQUEST;
      this.toast({
        message: message,
      });
      return;
    }

    if (!response.hasOwnProperty(this._constants.RESPONSE_SUCCESS)) return;

    if (response[this._constants.RESPONSE_SUCCESS]) {
      message = this._constants.MESSAGE_UPDATED;
      this.disableSubmit();
      this.toast({
        message: message
      });
      return;
    } else {

      if (response.hasOwnProperty(this._constants.RESPONSE_VALIDATION_ERRORS)) {
        this.resetValidationErrors();
        this._displayValidationErrors(response[this._constants.RESPONSE_VALIDATION_ERRORS]);
      }
    }
  };


  /**
   * Defines the options to send for server with XMLHttpRequest (ajax)
   * 
   * @return {object}
   * @private
   */
  VintSettingsEmail.prototype._getDefaultRequestOptions = function () {
    var onSuccess = function (response) {
      this._processResponse(response);
    };
    var onComplete = function () {
      this.ableSubmit();
    };

    return {
      success: onSuccess.bind(this),
      complete: onComplete.bind(this),
    };
  };


  /**
   * Defines the listeners to the required form events 
   * 
   * @private
   */
  VintSettingsEmail.prototype._formEvents = function () {
    var valid /** @type {boolean} */;
    var formOnSubmit = function (event) {
      event.preventDefault();
      valid = this._checkRequiredFields();

      if (!valid) return false;
      this.disableSubmit();
      this._sendAjaxRequest(this._constants.REQUEST_HANDLER, this._getDefaultRequestOptions());
    };

    this._form.addEventListener('submit', formOnSubmit.bind(this));
  };   

  /**
   * Initialize the instance
   * 
   */
  VintSettingsEmail.prototype.init = function () {
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
    constructor: VintSettingsEmail,
    classAsString: 'VintSettingsEmail',
    cssClass: 'vint-form--settings-email',
  });
})();