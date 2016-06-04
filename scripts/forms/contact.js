/**
 * VintContact - A handler to Vint Login form.
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
  var VintContact = function (form) {
    this._form = form;
    
    // initialize the instance
    this.init();
  };
  
  
  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintContact.prototype._constants = {
    REQUEST_HANDLER: 'contact::onRequest',
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
  VintContact.prototype._formValid = true;


  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintContact.prototype._requiredFields = ['name', 'email', 'subject', 'message'];
  
  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintContact.prototype._defaultErrorMessages = {};
  
  
  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintContact.prototype.fields = {};
  
  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintContact.prototype._setFields = function () { };
  

  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintContact.prototype._jqueryForm = {};
  

  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintContact.prototype._filePatterns = {};


  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintContact.prototype._setJqueryForm = function () { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintContact.prototype._setRequestLoading = function () { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintContact.prototype._sendAjaxRequest = function (requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintContact.prototype.disableSubmit = function () { };


  /**
   * Able form submit action
   * 
   */
  VintContact.prototype.ableSubmit = function () { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintContact.prototype.resetValidationErrors = function () { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintContact.prototype._displayValidationErrors = function (errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintContact.prototype._displayValidationErrorDOM = function (field, message) { };
  
  
  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintContact.prototype._displayValidationErrorConsole = function (message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintContact.prototype._fieldsFocusedEffect = function () { };


  /**
  * Check all required fields (defined in <Constructor>._requiredFields property).
  * Add an error message on empty fields.
  * 
  * @private
  */
  VintContact.prototype._checkRequiredFields = function () { };
  

  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintContact.prototype._initialValues = {};

  /**
   * Change the current fields values to initial values (<Constructor>._initialValues). 
   * 
   */
  VintContact.prototype.resetValues = function () { };

  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintContact.prototype._patterns = function () {
  };


  /**
   * Handle the XMLHttpRequest (ajax) response
   * 
   * @param {object} - The response that comes from server
   * @return {undefined}
   * @private
   */
  VintContact.prototype._processResponse = function (response) {
    if (!response.hasOwnProperty(this._constants.RESPONSE_SUCCESS)) return;

    if (response[this._constants.RESPONSE_SUCCESS]) {
      this.disableSubmit();
      this.toast({
        message: 'Seu contato foi enviado'
      });      
      // Server defines the new location
      if (response.hasOwnProperty(this._constants.RESPONSE_LOCATION)) {
        window.location.href = response[this._constants.RESPONSE_LOCATION];
      }
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
  VintContact.prototype._getDefaultRequestOptions = function () {
    var onError = function () {
      this.toast({
        message: 'Algo deu errado. Tente mais tarde'
      });
    };
    
    var onSuccess = function (response) {
      this._processResponse(response);
    };
    var onComplete = function () {
      this.ableSubmit();
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
  VintContact.prototype._formEvents = function () {
    var valid /** @type {boolean} */
    var formOnSubmit = function (event) {
      event.preventDefault();
      valid = this._checkRequiredFields();

      if (!valid) return false;
      this.toast({
        message: 'Aguarde...'
      });
      this.disableSubmit();
      this._sendAjaxRequest(this._constants.REQUEST_HANDLER, this._getDefaultRequestOptions());
    };

    this._form.addEventListener('submit', formOnSubmit.bind(this));
  };   

  /**
   * Initialize the instance
   * 
   */
  VintContact.prototype.init = function () {
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
    constructor: VintContact,
    classAsString: 'VintContact',
    cssClass: 'vint-form--contact',
  });
})();