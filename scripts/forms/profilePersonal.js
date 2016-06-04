/**
 * VintProfilePersonal - A handler to Vint Profile Personal form.
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
  var VintProfilePersonal = function(form) {
    this._form = form;

    // initialize the instance
    this.init();
  };


  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintProfilePersonal.prototype._constants = {
    REQUEST_HANDLER: 'profilePersonal::onRequest',
    REQUEST_HANDLER_UPLOAD: 'profilePersonal::onUploadAvatar',
    RESPONSE_SUCCESS: 'success',
    RESPONSE_LOCATION: 'location',
    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
    RESPONSE_BAD_REQUEST: 'badRequest',
    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
    MESSAGE_UPDATED: 'Suas informações pessoais foram atualizadas',
    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER'
  };


  /**
   * Stories the css classes.
   * 
   * @private
   */
  VintProfilePersonal.prototype._cssClasses = {
    AVATAR_UPLOAD: 'vint-avatar-upload',
    AVATAR_UPLOAD_THUMB: 'vint-avatar-upload__thumb',
    AVATAR_UPLOAD_BUTTON: 'vint-avatar-upload__button',
  };


  /**
   * Flag used to check the form state.
   * 
   * @type {boolean}
   * @private
   */
  VintProfilePersonal.prototype._formValid = true;


  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintProfilePersonal.prototype._requiredFields = ['nome', 'descricao'];

  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintProfilePersonal.prototype._defaultErrorMessages = {};


  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintProfilePersonal.prototype.fields = {};


  /**
   * Storie the valid avatar file or false
   * 
   * @type {File | boolean}
   */
  VintProfilePersonal.prototype._avatarFile = false;


  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintProfilePersonal.prototype._setFields = function() { };


  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintProfilePersonal.prototype._jqueryForm = {};


  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintProfilePersonal.prototype._setJqueryForm = function() { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintProfilePersonal.prototype._setRequestLoading = function() { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintProfilePersonal.prototype._sendAjaxRequest = function(requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintProfilePersonal.prototype.disableSubmit = function() { };


  /**
   * Able form submit action
   * 
   */
  VintProfilePersonal.prototype.ableSubmit = function() { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintProfilePersonal.prototype.resetValidationErrors = function() { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintProfilePersonal.prototype._displayValidationErrors = function(errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintProfilePersonal.prototype._displayValidationErrorDOM = function(field, message) { };


  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintProfilePersonal.prototype._displayValidationErrorConsole = function(message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintProfilePersonal.prototype._fieldsFocusedEffect = function() { };


  /**
  * Check all required fields (defined in <Constructor>._requiredFields property).
  * Add an error message on empty fields.
  * 
  * @private
  */
  VintProfilePersonal.prototype._checkRequiredFields = function() { };


  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintProfilePersonal.prototype._initialValues = {};

  /**
   * Change the current fields values to initial values (<Constructor>._initialValues). 
   * 
   */
  VintProfilePersonal.prototype.resetValues = function() { };


  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintProfilePersonal.prototype._patterns = function() {
    // input[type=file] pattern
    var addPhotoButton = this._form.querySelector('.' + this._cssClasses.AVATAR_UPLOAD_BUTTON);
    var onAddPhoto = function(event) {
      event.preventDefault();
      // Simulates a click on input[type=file][name=avatar] 
      // when add photo button is clicked
      this.fields.avatar.click();
    };
    var onChangePhoto = function(event) {
      var isValid = this._avatarPattern(this.fields.avatar.files);
      if (isValid) {
        this._avatarFile = this.fields.avatar.files[0];
        this._displayAvatar(this.fields.avatar.files[0]);
      } else {
        this._avatarFile = false;
      }
    };
    addPhotoButton.addEventListener('click', onAddPhoto.bind(this));
    this.fields.avatar.addEventListener('change', onChangePhoto.bind(this));
  };


  /**
   * Shows the file that comes from input[type=file][name=avatar] 
   * 
   * @param {File}
   * @return {boolean}
   * @private
   */
  VintProfilePersonal.prototype._displayAvatar = function(file) {
    var thumb = this._form.querySelector('.' + this._cssClasses.AVATAR_UPLOAD_THUMB);
    var onLoadEndFile = function(event) {
      thumb.style.backgroundImage = 'url(' + fileReader.result + ')';
    };
    var fileReader = new FileReader();

    if (file) {
      fileReader.readAsDataURL(file);
    }
    fileReader.addEventListener('loadend', onLoadEndFile.bind(this));
  }


  /**
   * Check if the files that comes from input[type=file][name=avatar]
   * is a valid image to be the avatar 
   * 
   * @param {FileList}
   * @return {boolean}
   * @private
   */
  VintProfilePersonal.prototype._avatarPattern = function(fileList) {
    // No file selected
    if (!fileList.length) return false;

    // More than one file selected
    if (fileList.lenght > 1) {
      var message = 'Selecione apenas um arquivo';
      this.toast({
        message: message
      });
      return false;
    }
    var input = { 'photo': fileList[0] };
    var rules = {
      'photo': {
        'image': true,
        'mimes': ['jpg', 'png', 'jpeg'],
        'max_size': 1
      }
    };
    var messages = {
      'image': 'Selecione uma imagem',
      'mimes': 'Escolha uma imagem no formato jpg, jpeg ou png',
      'max_size': 'O limite de tamanho da imagem é 1MB'
    };
    var validator = this._filePatterns.make(input, rules, messages);
    if (validator.fails()) {
      for (var error in validator.errors) {
        var errorMessage = validator.errors[error];
        this.toast({
          message: errorMessage
        });
        break;
      }
      return false;
    }
    return true;
  }


  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintProfilePersonal.prototype._filePatterns = {};


  /**
   * Handle the XMLHttpRequest (ajax) response
   * 
   * @param {object} - The response that comes from server
   * @return {undefined}
   * @private
   */
  VintProfilePersonal.prototype._processResponse = function(response) {
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
  VintProfilePersonal.prototype._getDefaultRequestOptions = function() {
    var onSuccess = function(response) {
      this._processResponse(response);
    };
    var onComplete = function() {
      this.ableSubmit();
    };

    return {
      success: onSuccess.bind(this),
      complete: onComplete.bind(this),
    };
  };


  /**
   * Defines the options to send a file to server with XMLHttpRequest (ajax)
   * 
   * @return {object}
   * @private
   */
  VintProfilePersonal.prototype._getUploadRequestOptions = function(formData) {
    var requestHandler = this._constants.REQUEST_HANDLER_UPLOAD;
    var headerHandler = this._constants.OCTOBER_REQUEST_HANDLER;
    var headers = {};
    headers[headerHandler] = requestHandler;
    var onSuccess = function(response) {
      if (response.hasOwnProperty(this._constants.RESPONSE_VALIDATION_ERRORS)) {
        // Show the first message error that comes from server
        // if exists
        for (var error in response[this._constants.RESPONSE_VALIDATION_ERRORS]) {
          this.toast({
            message: response[this._constants.RESPONSE_VALIDATION_ERRORS][error]
          });
          break;
        }
      }
    };
    var onComplete = function() {
      this.ableSubmit();
    };

    return {
      headers: headers,
      data: formData,
      type: 'post',
      cache: false,
      processData: false,
      contentType: false,
      success: onSuccess.bind(this),
      complete: onComplete.bind(this),
    };
  };


  /**
   * Send ajax request with file to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @return {boolean}
   * @private
   */
  VintProfilePersonal.prototype._sendAjaxRequestUpload = function(requestHandler, requestOptions) {
    // Test if current avatar file is valid
    if (!this._avatarFile) return false;
    var formData = new FormData();
    formData.append('avatar', this._avatarFile);
    var options = this._getUploadRequestOptions(formData);
    // Assumes that jQuery ($) is available globally
    $.ajax(options);
    return true;
  };


  /**
   * Defines the listeners to the required form events 
   * 
   * @private
   */
  VintProfilePersonal.prototype._formEvents = function() {
    var valid /** @type {boolean} */;
    var formOnSubmit = function(event) {
      event.preventDefault();
      valid = this._checkRequiredFields();

      if (!valid) return false;
      this.disableSubmit();
      // First, send the avatar file via ajax
      this._sendAjaxRequestUpload();
      // After, send the others fields via ajax
      this._sendAjaxRequest(this._constants.REQUEST_HANDLER, this._getDefaultRequestOptions());
    };

    this._form.addEventListener('submit', formOnSubmit.bind(this));
  };

  /**
   * Initialize the instance
   * 
   */
  VintProfilePersonal.prototype.init = function() {
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
    constructor: VintProfilePersonal,
    classAsString: 'VintProfilePersonal',
    cssClass: 'vint-form--profile-personal',
  });
})();