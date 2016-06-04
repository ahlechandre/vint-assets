/**
 * VintLoginRecover - A handler to Vint Login Recover form.
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
  var VintLoginRecover = function (form) {
    this._form = form;

    // initialize the instance
    this.init();
  };


  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintLoginRecover.prototype._constants = {
    REQUEST_HANDLER: 'loginRecover::onRequest',
    RESPONSE_SUCCESS: 'success',
    RESPONSE_LOCATION: 'location',
    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
    RESPONSE_WARNING_MESSAGE: 'warningMessage',
    RESPONSE_BAD_REQUEST: 'badRequest',
    MESSAGE_EMAIL_SENT: 'A recuperação foi enviada',
    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
    MESSAGE_SERVER_ERROR: 'Algo deu errado. Tente novamente',
    MESSAGE_DEFAULT_WARNING: 'Algo deu errado. Tente mais tarde',
    MESSAGE_WAIT_MESSAGE: 'Aguarde...',
  };

  /**
   * Flag used to check the form state.
   * 
   * @type {boolean}
   * @private
   */
  VintLoginRecover.prototype._formValid = true;


  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintLoginRecover.prototype._requiredFields = ['email'];

  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintLoginRecover.prototype._defaultErrorMessages = {};


  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintLoginRecover.prototype._filePatterns = {};


  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintLoginRecover.prototype.fields = {};

  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintLoginRecover.prototype._setFields = function () { };


  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintLoginRecover.prototype._jqueryForm = {};


  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintLoginRecover.prototype._setJqueryForm = function () { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintLoginRecover.prototype._setRequestLoading = function () { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintLoginRecover.prototype._sendAjaxRequest = function (requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintLoginRecover.prototype.disableSubmit = function () { };


  /**
   * Able form submit action
   * 
   */
  VintLoginRecover.prototype.ableSubmit = function () { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintLoginRecover.prototype.resetValidationErrors = function () { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintLoginRecover.prototype._displayValidationErrors = function (errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintLoginRecover.prototype._displayValidationErrorDOM = function (field, message) { };


  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintLoginRecover.prototype._displayValidationErrorConsole = function (message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintLoginRecover.prototype._fieldsFocusedEffect = function () { };


  /**
  * Check all required fields (defined in <Constructor>._requiredFields property).
  * Add an error message on empty fields.
  * 
  * @private
  */
  VintLoginRecover.prototype._checkRequiredFields = function () { };


  /**
  * Displays a MDL snackbar. 
  * 
  * @param {object} data Snackbar options
  * @param {string} data.message
  * @param {number} data.timeout 
  * @param {function} data.actionHandler 
  * @param {string} data.actionText 
  */
  VintLoginRecover.prototype.toast = function (data) { };


  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintLoginRecover.prototype._initialValues = {};

  /**
   * Change the current fields values to initial values (<Constructor>._initialValues). 
   * 
   */
  VintLoginRecover.prototype.resetValues = function () { };


  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintLoginRecover.prototype._patterns = function () {
  };


  /**
   * Defines the options to send for server with XMLHttpRequest (ajax)
   * 
   * @return {object}
   * @private
   */
  VintLoginRecover.prototype._getDefaultRequestOptions = function () {
    var onSuccess = function (response) {
      var message /** @type {string} */;
      var newLocation /** @type {string} */;
      var timeout /** @type {number} */;

      this._processResponseSuccess(response);

      if ((response.hasOwnProperty(this._constants.RESPONSE_SUCCESS) && response[this._constants.RESPONSE_SUCCESS]) && response.hasOwnProperty(this._constants.RESPONSE_LOCATION)) {
        newLocation = response[this._constants.RESPONSE_LOCATION];
        timeout = (1000 * 30);
        message = this._constants.MESSAGE_EMAIL_SENT;
        this.toast({
          message: message,
          actionText: 'Ok',
          timeout: timeout,
          actionHandler: function (e) {
            window.location.href = location;
          }
        });

      }
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
  VintLoginRecover.prototype._formEvents = function () {
    var valid /** @type {boolean} */;
    var waitMessage /** @type {string} */;
    var formOnSubmit = function (event) {
      event.preventDefault();
      valid = this._checkRequiredFields();

      if (!valid) return false;
      this.disableSubmit();
      waitMessage = this._constants.MESSAGE_WAIT_MESSAGE;
      this.toast({
        message: waitMessage,
        timeout: 1000
      });
      this._sendAjaxRequest(this._constants.REQUEST_HANDLER, this._getDefaultRequestOptions());
    };
    this._form.addEventListener('submit', formOnSubmit.bind(this));
  };

  /**
   * Initialize the instance
   * 
   */
  VintLoginRecover.prototype.init = function () {
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
    constructor: VintLoginRecover,
    classAsString: 'VintLoginRecover',
    cssClass: 'vint-form--login-recover',
  });
})();