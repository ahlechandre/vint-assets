/**
 * VintLogin - A handler to Vint Login form.
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
  var VintLogin = function (form) {
    this._form = form;

    // initialize the instance
    this.init();
  };


  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintLogin.prototype._constants = {
    REQUEST_HANDLER: 'login::onRequest',
    RESPONSE_SUCCESS: 'success',
    RESPONSE_LOCATION: 'location',
    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
  };

  /**
   * Flag used to check the form state.
   * 
   * @type {boolean}
   * @private
   */
  VintLogin.prototype._formValid = true;

  /**
   * Flag used to check if the login was successfully.
   * 
   * @type {boolean}
   * @private
   */
  VintLogin.prototype.success = false;

  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintLogin.prototype._requiredFields = ['email', 'senha'];

  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintLogin.prototype._defaultErrorMessages = {};


  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintLogin.prototype.fields = {};

  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintLogin.prototype._setFields = function () { };


  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintLogin.prototype._jqueryForm = {};


  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintLogin.prototype._filePatterns = {};


  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintLogin.prototype._setJqueryForm = function () { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintLogin.prototype._setRequestLoading = function () { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintLogin.prototype._sendAjaxRequest = function (requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintLogin.prototype.disableSubmit = function () { };


  /**
   * Able form submit action
   * 
   */
  VintLogin.prototype.ableSubmit = function () { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintLogin.prototype.resetValidationErrors = function () { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintLogin.prototype._displayValidationErrors = function (errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintLogin.prototype._displayValidationErrorDOM = function (field, message) { };


  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintLogin.prototype._displayValidationErrorConsole = function (message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintLogin.prototype._fieldsFocusedEffect = function () { };


  /**
  * Check all required fields (defined in <Constructor>._requiredFields property).
  * Add an error message on empty fields.
  * 
  * @private
  */
  VintLogin.prototype._checkRequiredFields = function () { };


  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintLogin.prototype._initialValues = {};

  /**
   * Change the current fields values to initial values (<Constructor>._initialValues). 
   * 
   */
  VintLogin.prototype.resetValues = function () { };

  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintLogin.prototype._patterns = function () { };


  /**
   * Defines the options to send for server with XMLHttpRequest (ajax)
   * 
   * @return {object}
   * @private
   */
  VintLogin.prototype._getDefaultRequestOptions = function () {
    var onSuccess = function (response) {
      this._processResponseSuccess(response);
    };
    var onComplete = function () {
      this._processResponseComplete();
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
  VintLogin.prototype._formEvents = function () {
    var valid /** @type {boolean} */;
    var formOnSubmit = function (event) {
      event.preventDefault();
      valid = this._checkRequiredFields();

      if (!valid) return false;
      this.disableActions();
      this._sendAjaxRequest(this._constants.REQUEST_HANDLER, this._getDefaultRequestOptions());
    };

    this._form.addEventListener('submit', formOnSubmit.bind(this));
  };

  /**
   * Initialize the instance
   * 
   */
  VintLogin.prototype.init = function () {
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
    constructor: VintLogin,
    classAsString: 'VintLogin',
    cssClass: 'vint-form--login',
  });
})();