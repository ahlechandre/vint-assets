/**
 * VintPrograma - A handler to Vint Programa form.
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
  var VintPrograma = function (form, isCreate, isUpdate) {
    this._form = form;
    this._isCreate = isCreate;
    this._isUpdate = isUpdate;
    // initialize the instance
    this.init();
  };


  /**
   * Flag used to check the form state.
   * 
   * @type {boolean}
   * @private
   */
  VintPrograma.prototype._formValid = true;


  /**
   * Flag used to check if was created a new item.
   * 
   * @type {boolean}
   * @private
   */
  VintPrograma.prototype._created = false;


  /**
   * Flag used to check if was updated an item.
   * 
   * @type {boolean}
   * @private
   */
  VintPrograma.prototype._updated = false;


  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintPrograma.prototype._filePatterns = {};


  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintPrograma.prototype._requiredFields = ['titulo', 'descricao', 'estado', 'inicio'];

  /**
   * Stories messages.
   * 
   * @private
   */
  VintPrograma.prototype._messages = {
    CREATED: 'O programa foi criado',
    UPDATED: 'O programa foi atualizado',
  };

  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintPrograma.prototype._constants = {
    CREATE_REQUEST_HANDLER: 'programaCreate::onRequest',
    UPDATE_REQUEST_HANDLER: 'programaUpdate::onRequest',
    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
  };


  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintPrograma.prototype._defaultErrorMessages = {};


  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintPrograma.prototype.fields = {};

  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintPrograma.prototype._setFields = function () { };


  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintPrograma.prototype._jqueryForm = {};


  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintPrograma.prototype._setJqueryForm = function () { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintPrograma.prototype._setRequestLoading = function () { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintPrograma.prototype._sendAjaxRequest = function (requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintPrograma.prototype.disableSubmit = function () { };


  /**
   * Able form submit action
   * 
   */
  VintPrograma.prototype.ableSubmit = function () { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintPrograma.prototype.resetValidationErrors = function () { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintPrograma.prototype._displayValidationErrors = function (errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintPrograma.prototype._displayValidationErrorDOM = function (field, message) { };


  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintPrograma.prototype._displayValidationErrorConsole = function (message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintPrograma.prototype._fieldsFocusedEffect = function () { };

  /**
  * Displays a MDL snackbar. 
  * 
  * @param {object} data Snackbar options
  * @param {string} data.message
  * @param {number} data.timeout 
  * @param {function} data.actionHandler 
  * @param {string} data.actionText 
  */
  VintPrograma.prototype.toast = function (data) { };


  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintPrograma.prototype._initialValues = {};

  /**
  * Change the current fields values to initial values (<Constructor>._initialValues). 
  * 
  */
  VintPrograma.prototype.resetValues = function () { };


  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintPrograma.prototype._patterns = function () {
    // Fields_[fim] pattern
    var estadoOnChange = function (event) {
      switch (this.fields.estado.value) {
        case 'andamento': {
          this.fields.fim.setAttribute('disabled', '');
          break;
        }
        case 'finalizado': {
          this.fields.fim.removeAttribute('disabled');
          break;
        }
      }
    };

    this.fields.estado.addEventListener('change', estadoOnChange.bind(this));
  };


  /**
   * Defines the options to send for server with XMLHttpRequest (ajax)
   * 
   * @return {object}
   * @private
   */
  VintPrograma.prototype._getDefaultRequestOptions = function () {
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
   * @param {string | boolean} - the form action ('update' | 'create' | false)
   * @private
   */
  VintPrograma.prototype._formEvents = function (action) {
    if (!action) return;
    var valid /** @type {boolean} */;
    var formOnSubmit = function (event) {
      event.preventDefault();
      valid = this._checkRequiredFields();

      if (!valid) return false;
      this.disableActions();
      var requestHandler;
      var requestOptions;

      switch (action) {
        case 'create': {
          requestHandler = this._constants.CREATE_REQUEST_HANDLER;
          requestOptions = this._getDefaultRequestOptions();
          break;
        }
        case 'update': {
          requestHandler = this._constants.UPDATE_REQUEST_HANDLER;
          requestOptions = this._getDefaultRequestOptions();
          break;
        }
      };

      this._sendAjaxRequest(requestHandler, requestOptions);
    };

    this._form.addEventListener('submit', formOnSubmit.bind(this));
  };

  /**
   * Initialize the instance
   * 
   */
  VintPrograma.prototype.init = function () {
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
      var action = this._isCreate ? 'create' :
        this._isUpdate ? 'update' : false;
      this._formEvents(action);

      if (this._isCreate) {
        // Create a new item

      } else if (this._isUpdate) {
        // Update a item
      }
    }
  };

  // Assumes that formHandler is available globally
  formHandler.register({
    constructor: VintPrograma,
    classAsString: 'VintPrograma',
    cssClass: 'vint-form--programa',
    maintenance: true,
    createName: 'programa-create',
    updateName: 'programa-update',
  });
})();