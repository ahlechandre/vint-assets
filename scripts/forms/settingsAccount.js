/**
 * VintSettingsAccount - A handler to Vint Settings Account form.
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
  var VintSettingsAccount = function (form) {
    this._form = form;
    
    // initialize the instance
    this.init();
  };
  
  
  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintSettingsAccount.prototype._constants = {
    REQUEST_HANDLER: 'settingsAccount::onRequest',
    RESPONSE_SUCCESS: 'success',
    RESPONSE_LOCATION: 'location',
    RESPONSE_USERNAME: 'username',
    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
    RESPONSE_BAD_REQUEST: 'badRequest',
    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
    MESSAGE_UPDATED: 'As configurações de conta foram atualizadas',
    ID_USERNAME_LINK: 'vint-field-username-link'
  };
  
  /**
   * Flag used to check the form state.
   * 
   * @type {boolean}
   * @private
   */
  VintSettingsAccount.prototype._formValid = true;

  /**
   * Flag used to check if was updated a item.
   * 
   * @type {boolean}
   * @private
   */
  VintSettingsAccount.prototype._updated = false;


  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintSettingsAccount.prototype._requiredFields = ['username'];
  
  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintSettingsAccount.prototype._defaultErrorMessages = {};
  

  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintSettingsAccount.prototype._filePatterns = {};


  /**
   * Stories the current username for future tests.
   * 
   * @private
   */
  VintSettingsAccount.prototype._currentUsername = '';
  
  
  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintSettingsAccount.prototype.fields = {};
  
  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintSettingsAccount.prototype._setFields = function () { };
  

  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintSettingsAccount.prototype._jqueryForm = {};
  
  
  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintSettingsAccount.prototype._setJqueryForm = function () { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintSettingsAccount.prototype._setRequestLoading = function () { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintSettingsAccount.prototype._sendAjaxRequest = function (requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintSettingsAccount.prototype.disableSubmit = function () { };


  /**
   * Able form submit action
   * 
   */
  VintSettingsAccount.prototype.ableSubmit = function () { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintSettingsAccount.prototype.resetValidationErrors = function () { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintSettingsAccount.prototype._displayValidationErrors = function (errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintSettingsAccount.prototype._displayValidationErrorDOM = function (field, message) { };
  
  
  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintSettingsAccount.prototype._displayValidationErrorConsole = function (message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintSettingsAccount.prototype._fieldsFocusedEffect = function () { };


  /**
  * Check all required fields (defined in <Constructor>._requiredFields property).
  * Add an error message on empty fields.
  * 
  * @private
  */
  VintSettingsAccount.prototype._checkRequiredFields = function () { };
  

  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintSettingsAccount.prototype._initialValues = {};

  /**
   * Change the current fields values to initial values (<Constructor>._initialValues). 
   * 
   */
  VintSettingsAccount.prototype.resetValues = function () { };


  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintSettingsAccount.prototype._patterns = function () {
    // At the init, the current username is input[name=username] value 
    this._currentUsername = this.fields.username.value;
    // Case the current username is equal of the current value of input
    // has nothing to update
    this.disableSubmit();
    var onKeypressUsername = function (event) {
      // Prevent the 'space' on username
      if (event.keyCode === 32) event.preventDefault();
    };
    var onKeyupUsername = function (event) {
      if (this.fields.username.value !== this._currentUsername && event.keyCode !== 13) {
        // Only able the submit if the current username is different
        // of the current value of input. Also if key code is not 'enter'
        // because this key dispatch 'onsubmit' event on form and must not 
        // able the submit button while the request's pending.  
        this.ableSubmit();
      } else {
        this.disableSubmit();
      }
    };

    this.fields.username.addEventListener('keypress', onKeypressUsername.bind(this));
    this.fields.username.addEventListener('keyup', onKeyupUsername.bind(this));
  };


  /**
   * Handle the XMLHttpRequest (ajax) response
   * 
   * @param {object} - The response that comes from server
   * @return {undefined}
   * @private
   */
  VintSettingsAccount.prototype._processResponse = function (response) {
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
      this.toast({
        message: message
      });
      // Case the current username is equal of the current value of input
      // has nothing to update
      this.disableSubmit();
      this._updated = true;
      return;
    } else {
      this._updated = false;      
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
  VintSettingsAccount.prototype._getDefaultRequestOptions = function () {
    var onSuccess = function (response) {
      var usernameLink /** @type {string} */;
      var usernameLinkElement /** @type {HTMLElement} */;
      
      this._processResponse(response);
      
      if (response.hasOwnProperty(this._constants.RESPONSE_USERNAME)) {
        // Change the current username value to the updated username
        // that comes from server
        this._currentUsername = response[this._constants.RESPONSE_USERNAME];
        usernameLinkElement = document.querySelector('#' + this._constants.ID_USERNAME_LINK);

        if (!usernameLinkElement) return;
        
        usernameLink = usernameLinkElement.getAttribute('href').split('@')[0] + '@' + this._currentUsername;         
        usernameLinkElement.setAttribute('href', usernameLink);        
        usernameLinkElement.textContent = usernameLink;        
      }      
    };
    var onComplete = function () {
      if (!this._updated) this.ableSubmit();
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
  VintSettingsAccount.prototype._formEvents = function () {
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
  VintSettingsAccount.prototype.init = function () {
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
    constructor: VintSettingsAccount,
    classAsString: 'VintSettingsAccount',
    cssClass: 'vint-form--settings-account',
  });
})();