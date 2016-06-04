/**
 * formHandler - A handler to multiple forms
 * @license MIT
 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
 */

// Pre-defining the formHandler interface, for closure documentation and
// static verification.
var formHandler = {

  /**
   * Registers a form for future use.
   *
   * @param {formHandler.FormConfigPublic} config the registration configuration
   */
  register: function (config) { },

  /**
   * Upgrade all registered forms.
   *
   */
  upgradeAllRegistered: function () { },
};

formHandler = (function () {
  'use strict';

  /**
   * Store strings for class names defined by this handler that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   */
  var cssClasses = {
    LOADING_BAR: '.progress',
    IS_INVALID: 'is-invalid',
    IS_FOCUSED: 'is-focused'
  };

  /**
   * Store strings for dataset attributes defined by this handler that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   */
  var jsDatasets = {
    REQUEST_LOADING: 'request-loading',
    FIELD_FOR: 'field-for',
    FIELD_ERROR: 'field-error'
  };

  /**
   * Stories constant properties.
   * 
   */
  var constants = {
    INPUT_SESSION_KEY_NAME: '_session_key',
    INPUT_TOKEN_NAME: '_token',
    SNACKBAR_ID: 'vint-snackbar-default',
    MESSAGE_EMPTY_FIELD: 'O campo é obrigatório.',
    LOCATION_LOGIN: '/login',
    RESPONSE_SUCCESS: 'success',
    RESPONSE_LOCATION: 'location',
    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
    SUFFIX_UPDATE: '/settings',
    RESPONSE_MESSAGE_WARNING: 'warningMessage'
  };

  /**
   * Stories messages.
   * 
   */
  var messages = {
    RESPONSE_403: 'Você não tem permissão para fazer isso',
    RESPONSE_401: 'O VINT não reconhece você',
    RESPONSE_500: 'Algo não funcionou. Tente novamente',
    RESPONSE_WARNING: 'Algo não funcionou. Tente novamente'
  };

  /**
   * Convert any string of dataset attributes to camel casel
   * 
   * @example - 'request-loading' => 'requestLoading'
   * @param {string} string to be converted
   * @return {string} string camel cased
   */
  var camelCase = function (str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  };

  /** @type {!Array<formHandler.FormConfig>} */
  var registeredForms_ = [];

  /**
   * Defines if window must redirect after save data.
   *
   * @type {boolean} 
   */
  var mustRedirect = false;

  var register_ = function (config) {
    var newConfig = {
      ClassConstructor: config.constructor || config['constructor'],
      className: config.classAsString || config['classAsString'],
      cssClass: config.cssClass || config['cssClass'],
      maintenance: config.maintenance || config['maintenance'],
      createName: config.createName || config['createName'],
      updateName: config.updateName || config['updateName'],
    };

    registeredForms_.forEach(function (item) {
      if (item.cssClass === newConfig.cssClass) {
        throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
      }
    });

    registeredForms_.push(newConfig);
  }

  /**
   * Upgrade all registered forms in the document DOM
   * 
   */
  var upgradeAllRegistered_ = function () {
    for (var i = 0; i < registeredForms_.length; i++) {
      upgradeClass_(registeredForms_[i]);
    }
  };

  /**
   * Initialize the instance of the registered form for each cssClass
   * 
   */
  var upgradeClass_ = function (registeredForm) {
    // All elements with the same registerd cssClass
    var formElements = document.querySelectorAll('.' + registeredForm.cssClass);
    var form /** @type {HTMLElement} */;
    var instance /** @type {function} */;
    var isMaintenance /** @type {boolean} */;

    for (var i = 0; i < formElements.length; i++) {
      form = formElements[i];
      isMaintenance = (registeredForm.maintenance ? true : false);
      formEssentials_(registeredForm.ClassConstructor, isMaintenance);
      if (isMaintenance) {
        var isCreate = (form.getAttribute('name') === registeredForm.createName);
        var isUpdate = isCreate ? false : (form.getAttribute('name') === registeredForm.updateName);
        instance = new registeredForm.ClassConstructor(form, isCreate, isUpdate);
      } else {
        instance = new registeredForm.ClassConstructor(form);
      }
      form[registeredForm.className] = instance;
    }
  };


  /**
   * Defines all essential methods prototypes to forms
   * 
   * @param {boolean} isMaintenance
   * @param {formHandler.FormConfigPrivate_.<ClassConstructor>}
   */
  var formEssentials_ = function (ClassConstructor, isMaintenance) {


    /**
     * Define the form value of [data-request-loading] attribute 
     * to the selector of element that's will be displayed (e.g. loading bar) 
     * while the request is not completed
     * 
     * @private
     */
    ClassConstructor.prototype._setRequestLoading = function () {
      var requestLoading = camelCase(jsDatasets.REQUEST_LOADING);
      this._form.dataset[requestLoading] = cssClasses.LOADING_BAR;
    };


    /**
     * Define the jquery object for the form element. Will be used to call 
     * ajax requests.  
     * 
     * @private
     */
    ClassConstructor.prototype._setJqueryForm = function () {
      // Assume that jQuery object ($) is available globally
      this._jqueryForm = $(this._form);
    };

    /**
     * Reset all fields (input, select, textarea) inside ClassConstructor._form
     * and store in ClassConstructor.fields
     * 
     * @param {boolean} Defines if the all fields (in DOM) 
     *        needs to be loaded.
     * @param {boolean} Defines if the ClassConstructor._collectionFields 
     *        needs to be loaded.
     */
    ClassConstructor.prototype._resetFields = function (resetFields, resetFieldsList) {
      var fieldToReset /** type {string} */;
      if (resetFields !== false) {
        // Needs to reset all fields except the specifieds 
        // in ClassConstructor._collectionFields.
        for (fieldToReset in this.fields) {
          // Check if the field is not present in ClassConstructor._collectionFields. 
          if (this._collectionFields.indexOf(fieldToReset) === -1) {
            // Remove the item from ClassConstructor.fields object.
            delete this.fields[fieldToReset];
          }
        }
      }

      if (resetFieldsList !== false) {
        for (var i = 0; i < this._collectionFields.length; i++) {
          fieldToReset = this._collectionFields[i];
          // Remove the item from ClassConstructor.fields object.
          delete this.fields[fieldToReset];
        }
      }
    };

    /**
     * Set all fields (input, select, textarea) inside ClassConstructor._form
     * and store in ClassConstructor.fields
     * 
     * @param {boolean} Defines if the all fields (in DOM) 
     *        needs to be loaded.
     * @param {boolean} Defines if the ClassConstructor._collectionFields 
     *        needs to be loaded.
     */
    ClassConstructor.prototype._setFields = function (setFields, setFieldsList) {
      if (setFields !== false) {
        // Needs to set all fields in ClassConstructor._form.
        var notIgnoreds = /** @type {string} */ '';
        if (this._ignoredFields) {
          for (var i = 0; i < this._ignoredFields.length; i++) {
            notIgnoreds += ':not([name="' + this._ignoredFields[i] + '"])';
          }
        }
        var notSessionKey = ':not([name="' + constants.INPUT_SESSION_KEY_NAME + '"])';
        var notToken = ':not([name="' + constants.INPUT_TOKEN_NAME + '"])';
        var inputs = this._form.querySelectorAll('input' + notSessionKey + notToken + notIgnoreds);
        var selects = this._form.querySelectorAll('select');
        var textareas = this._form.querySelectorAll('textarea');
        for (var i = 0; i < inputs.length; i++) {
          this.fields[inputs[i].getAttribute('name')] = inputs[i];
          this._initialValues[inputs[i].getAttribute('name')] = inputs[i].value;
        }
        for (var i = 0; i < selects.length; i++) {
          this.fields[selects[i].getAttribute('name')] = selects[i];
          this._initialValues[selects[i].getAttribute('name')] = selects[i].value;
        }
        for (var i = 0; i < textareas.length; i++) {
          this.fields[textareas[i].getAttribute('name')] = textareas[i];
          this._initialValues[textareas[i].getAttribute('name')] = textareas[i].value;
        }
      }
      if (setFieldsList !== false) {
        // Needs to set the fields especifieds in ClassConstructor._collectionFields.
        if (this._collectionFields) {
          for (var i = 0; i < this._collectionFields.length; i++) {
            this.fields[this._collectionFields[i]] = this._form.querySelectorAll('[name="' + this._collectionFields[i] + '"]');
          }
        }
      }
    };

    /**
     * Disable form submit action
     * 
     */
    ClassConstructor.prototype.disableSubmit = function () {
      var submit = this._form.querySelector('[type="submit"]');
      submit.setAttribute('disabled', '');
    };


    /**
     * Able form submit action
     * 
     */
    ClassConstructor.prototype.ableSubmit = function () {
      var submit = this._form.querySelector('[type="submit"]');
      submit.removeAttribute('disabled');
    };


    /**
     * Disable all buttons on the form 
     * 
     * @public
     */
    ClassConstructor.prototype.disableActions = function () {
      var buttons = this._form.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('disabled', '');
      }
    };

    /**
     * Able all buttons on the form 
     * 
     * @public
     */
    ClassConstructor.prototype.ableActions = function () {
      var buttons = this._form.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled');
      }
    };


    /**
     * Send ajax request to backend handler with request options 
     * 
     * @param {string} request backend handler
     * @param {object} request options
     * @private
     */
    ClassConstructor.prototype._sendAjaxRequest = function () {
      if (!arguments[0] || !arguments[1]) {
        throw new Error('2 arguments required.');
      }
      var requestHandler = arguments[0];
      var requestOptions = arguments[1];
      this._jqueryForm.request(requestHandler, requestOptions);
    };

    /**
     * Reset all fields to default state and error messages.
     * 
     */
    ClassConstructor.prototype.resetValidationErrors = function () {
      // First needs to store all default error messages at 
      // ClassConstructor._defaultErrorMessages for future reset textContent 
      // of element that displays the messages.
      if (!Object.keys(this._defaultErrorMessages).length) {
        // If the ClassConstructor._defaultErrorMessages are not defined yet
        // get all elements that displays error messages and save
        // his referred field [name] attribute as key and 
        // his textContent as value in ClassConstructor._defaultErrorMessages object. 
        var errorElements = this._form.querySelectorAll('[data-' + jsDatasets.FIELD_ERROR + ']');
        for (var i = 0; i < errorElements.length; i++) {
          var referredFieldName = /** @type {string} */ errorElements[i].parentNode.dataset[camelCase(jsDatasets.FIELD_FOR)];
          this._defaultErrorMessages[referredFieldName] = errorElements[i].textContent;
        }
      }
      // Get all field outers that is invalid
      var invalidOuters = this._form.querySelectorAll('[data-' + jsDatasets.FIELD_FOR + '].' + cssClasses.IS_INVALID);

      for (var i = 0; i < invalidOuters.length; i++) {
        var errorElement = invalidOuters[i].querySelector('[data-' + jsDatasets.FIELD_ERROR + ']');
        var fieldName = /** @type {string} */ invalidOuters[i].dataset[camelCase(jsDatasets.FIELD_FOR)];
        // Remove the class that defines an outer as invalid
        invalidOuters[i].classList.remove(cssClasses.IS_INVALID);
        // Reset the text content of the element that displays error messages
        errorElement.textContent = this._defaultErrorMessages[fieldName];
      }
    };


    /**
     * Show the server validation errors
     * 
     * @param {object} - keys are the field [name] attribute and values are the validation messages
     * @private
     */
    ClassConstructor.prototype._displayValidationErrors = function (errors) {
      var field;
      var message;
      // Get the first field with error and the referred message
      for (var error in errors) {
        field = this.fields[error];
        // Fields may have more than one error messages and
        // here we will use only the first message for each time
        message = errors[error][0];
        break;
      }

      if (field) field.focus();

      // Show the message at the DOM
      this._displayValidationErrorDOM(field, message);
      // Show the message at the Console
      this._displayValidationErrorConsole(message);
    };


    /**
    * Show the validation error at the DOM. Uses the MDL textfield error pattern.
    * 
    * @param {HTMLElement} - field with validation error
    * @param {string} - validation error message 
    * @private
    */
    ClassConstructor.prototype._displayValidationErrorDOM = function (field, message) {
      var name = field.getAttribute('name');
      // Container of field
      var outer = this._form.querySelector('[data-' + jsDatasets.FIELD_FOR + '="' + name + '"]');

      if (!outer) return;
      // Element used to display error messages
      var error = outer.querySelector('[data-' + jsDatasets.FIELD_ERROR + ']');
      error.textContent = message;
      outer.classList.add(cssClasses.IS_INVALID);
    };


    /**
     * Show the validation error at the console as a warn.
     * 
     * @param {string} - validation error message 
     * @private
     */
    ClassConstructor.prototype._displayValidationErrorConsole = function (message) {
      console.warn(message);
    };

    /**
    * Toggle css class 'is-focused' on outer of fields.
    * 
    * @private
    */
    ClassConstructor.prototype._fieldsFocusedEffect = function () {
      var onFocus = function (outer) {
        outer.classList.add(cssClasses.IS_FOCUSED);
      };
      var onBlur = function (outer) {
        outer.classList.remove(cssClasses.IS_FOCUSED);
      };

      for (var field in this.fields) {
        var outer = this._form.querySelector('[data-' + jsDatasets.FIELD_FOR + '="' + field + '"]');
        if (!outer) continue;
        this.fields[field].addEventListener('focus', (function (outer) {
          return function () {
            onFocus(outer);
          };
        })(outer));
        this.fields[field].addEventListener('blur', (function (outer) {
          return function () {
            onBlur(outer);
          };
        })(outer));
      }
    };

    /**
     * Check all required fields (defined in <Constructor>._requiredFields property).
     * Add an error message on empty fields.
     * 
     * @param {Array|undefined}
     * @return {boolean}
     * @private
     */
    ClassConstructor.prototype._checkRequiredFields = function (requiredsOptional) {
      var messageEmptyField /** @type {string} */;
      var isFocused = false;
      var requireds = requiredsOptional || this._requiredFields;
      // Local flag to check if form is valid
      var formValid = true;
      var field;
      this.resetValidationErrors();
      for (var i = 0; i < requireds.length; i++) {
        field = requireds[i];
        if (!this.fields[field].value.trim().length) {
          messageEmptyField = constants.MESSAGE_EMPTY_FIELD;
          this._displayValidationErrorDOM(this.fields[field], messageEmptyField);
          if (!isFocused) {
            this.fields[field].focus();
            isFocused = true;
          }
          formValid = false;
          break;
        }
      }
      this._formValid = formValid;
      return formValid;
    };

    /**
    * Displays a MDL snackbar. 
    * 
    * @param {object} data Snackbar options
    * @param {string} data.message
    * @param {number} data.timeout 
    * @param {function} data.actionHandler 
    * @param {string} data.actionText 
    */
    ClassConstructor.prototype.toast = function (data) {
      var container = document.querySelector('#' + constants.SNACKBAR_ID);
      if (!container) {
        throw new Error('Snackbar container is not defined.');
      }

      if (!data.timeout) {
        data.timeout = 5000;
      }

      container.MaterialSnackbar.showSnackbar(data);
    };

    /**
    * Change the current fields values to initial values (<Constructor>._initialValues). 
    * 
    */
    ClassConstructor.prototype.resetValues = function () {
      for (var field in this.fields) {
        this.fields[field].value = this._initialValues[field];

        if (this.fields[field].parentNode.MaterialTextfield) {
          this.fields[field].parentNode.MaterialTextfield.checkDirty();
        }
      }
    };

    /**
     * Process a response with error.
     * 
     * @param {object} jqXHR
     * @param {string} textStatus
     * @param {string} errorThrown
     */
    ClassConstructor.prototype._processResponseError = function (jqXHR, textStatus, errorThrown) {
      switch (jqXHR.status) {
        case 401:
          this.toast({
            message: messages.RESPONSE_401,
            actionHandler: function () {
              window.location.href = constants.LOCATION_LOGIN
            },
            actionText: 'Fazer login'
          });
          break;
        case 403:
          this.toast({
            message: messages.RESPONSE_403
          });
          break;
        case 500:
        default:
          this.toast({
            message: messages.RESPONSE_500
          });
          break;

      }
    };

    /**
     * Handle the XMLHttpRequest (ajax) response with sucess.
     * 
     * @param {object} - The response that comes from server
     * @return {undefined}
     * @private
     */
    ClassConstructor.prototype._processResponseSuccess = function (response) {

      if (!response.hasOwnProperty(constants.RESPONSE_SUCCESS)) return;

      if (isMaintenance) {
        this._processResponseSuccessMaintenance(response);
      } else {
        this._processResponseSuccessNormal(response);
      }
    };

    /**
     * Handle the XMLHttpRequest (ajax) response with sucess of forms maintenance (create, update).
     * 
     * @param {object} - The response that comes from server
     * @return {undefined}
     * @private
     */
    ClassConstructor.prototype._processResponseSuccessMaintenance = function (response) {
      var message /** @type {string} */;
      var newLocation /** @type {string} */;
      var currentLocation /** @type {string} */;
      var toast = {};

      if (response[constants.RESPONSE_SUCCESS]) {
        newLocation = response.hasOwnProperty(constants.RESPONSE_LOCATION) ? response[constants.RESPONSE_LOCATION] : false;

        if (this._isCreate) {
          this._created = true;
          message = this._messages.CREATED;
          toast = {
            message: message
          };
        } else if (this._isUpdate) {
          this._updated = true;
          message = this._messages.UPDATED;
          currentLocation = window.location.href.split(constants.SUFFIX_UPDATE)[0];

          if (newLocation !== currentLocation) {
            toast = {
              message: message
            };
          } else {
            toast = {
              message: message,
              actionHandler: function () {
                window.location.href = newLocation
              },
              actionText: 'Ver'
            };
          }
        }
        mustRedirect = newLocation ? ((this._isCreate && this._created) || (newLocation !== currentLocation)) : false;
        this.toast(toast);

        if (mustRedirect) window.location.href = newLocation;
      } else {
        this._created = false;
        this._updated = false;

        if (response.hasOwnProperty(constants.RESPONSE_VALIDATION_ERRORS)) {
          this.resetValidationErrors();
          this._displayValidationErrors(response[constants.RESPONSE_VALIDATION_ERRORS]);
        } else {
          message = response.hasOwnProperty(constants.RESPONSE_MESSAGE_WARNING) ? response[constants.RESPONSE_MESSAGE_WARNING] : messages.RESPONSE_WARNING;

          this.toast({
            message: message
          });
        }
      }
    };

    /**
     * Handle the XMLHttpRequest (ajax) response with sucess of forms maintenance (create, update).
     * 
     * @param {object} - The response that comes from server
     * @return {undefined}
     * @private
     */
    ClassConstructor.prototype._processResponseSuccessNormal = function (response) {
      var message /** @type {string} */;
      var newLocation /** @type {string} */;

      if (response[constants.RESPONSE_SUCCESS]) {
        newLocation = response.hasOwnProperty(constants.RESPONSE_LOCATION) ? response[constants.RESPONSE_LOCATION] : false;
        this.success = true;
        mustRedirect = (newLocation ? true : false);

        if (mustRedirect) window.location.href = newLocation;
      } else {
        this.success = false;

        if (response.hasOwnProperty(constants.RESPONSE_VALIDATION_ERRORS)) {
          this.resetValidationErrors();
          this._displayValidationErrors(response[constants.RESPONSE_VALIDATION_ERRORS]);
        } else {
          message = response.hasOwnProperty(constants.RESPONSE_MESSAGE_WARNING) ? response[constants.RESPONSE_MESSAGE_WARNING] : messages.RESPONSE_WARNING;

          this.toast({
            message: message
          });
        }
      }

    };

    /**
     * Handle the XMLHttpRequest (ajax) response when completed.
     * 
     * @private
     */
    ClassConstructor.prototype._processResponseComplete = function () {
      
      if ((this._isCreate && !this._created) || !mustRedirect) {
        this.ableActions();
      }
    }

    /**
     * Validates a file based on input, their required rules and referred messages 
     *  
     * @return {object}
     * @private
     */
    ClassConstructor.prototype._filePatterns = (function () {
      return {
        make: function (inputs, rules, messages) {
          var fails = false;
          var errors = {};

          for (var input in inputs) {
            for (var rule in rules[input]) {
              var validate = this.extend(rule, input, inputs[input], rules[input][rule]);
              if (!validate) {
                errors[rule] = messages[rule];
              }
            }
          }
          if (Object.keys(errors).length > 0) {
            fails = true;
          }
          return {
            fails: function () {
              return fails;
            },
            errors: errors
          };
        },
        extend: function (rule, attribute, value, parameters) {
          var ruleCamelCase = rule.replace(/_([a-z])/g, function (g) {
            return g[1].toUpperCase();
          });
          var camelCased = ruleCamelCase.charAt(0).toUpperCase() + ruleCamelCase.slice(1);
          var func = 'rule' + camelCased;
          return this[func](attribute, value, parameters);
        },
        ruleMaxSize: function (attribute, value, parameters) {
          var megabyte = 1024 * 1024;
          if ((value.size / megabyte) > parameters) return false;
          return true;
        },
        ruleImage: function (attribute, value, parameters) {
          var imageType = /^image\//;
          if (parameters == true) {
            if (imageType.test(value.type)) {
              return true;
            }
          }
          return false;
        },
        ruleExtension: function (attribute, value, parameters) {
          var extension = value.name.split('.').pop().toLowerCase(); //file extension from input file
          var isSuccess = parameters.indexOf(extension) > -1; //is extension in acceptable types
          return isSuccess;
        },
        ruleMimes: function (attribute, value, parameters) {
          var parametersLength = parameters.length;
          var imageMime = value.type;
          for (var j = 0; j < parametersLength; j++) {
            var expected = 'image/' + parameters[j];
            if (imageMime == expected) return true;
          }
          return false;
        }
      };
    })();

  };

  // Now return the functions that should be made public with their publicly
  // facing names...
  return {
    register: register_,
    upgradeAllRegistered: upgradeAllRegistered_
  };
})();

/**
 * Describes the type of a registered component type managed by
 * formHandler. Provided for benefit of the Closure compiler.
 *
 * @typedef {{
 *   constructor: Function,
 *   classAsString: string,
 *   cssClass: string,
 *   maintenance: boolean,
 *   createName: string,
 *   updateName: string,
 * }}
 */
formHandler.FormConfigPublic;  // jshint ignore:line

/**
 * Describes the type of a registered component type managed by
 * formHandler. Provided for benefit of the Closure compiler.
 *
 * @typedef {{
 *   ClassConstructor: Function,
 *   className: string,
 *   cssClass: string,
 *   createName: string,
 *   updateName: string,
 * }}
 */
formHandler.FormConfigPrivate_;  // jshint ignore:line

window['formHandler'] = formHandler;

window.addEventListener('load', function () {
  // Upgrade all registered forms after page loaded
  formHandler.upgradeAllRegistered();
});