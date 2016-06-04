/**
 * VintProjeto - A handler to Vint Projeto form.
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
  var VintProjeto = function (form, isCreate, isUpdate) {
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
  VintProjeto.prototype._formValid = true;


  /**
   * Flag used to check if was created a new item.
   * 
   * @type {boolean}
   * @private
   */
  VintProjeto.prototype._created = false;


  /**
   * Flag used to check if was updated a item.
   * 
   * @type {boolean}
   * @private
   */
  VintProjeto.prototype._updated = false;


  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintProjeto.prototype._filePatterns = {};


  /**
   * Stories the value [name] attribute of collection fields.
   * 
   * @private
   */
  VintProjeto.prototype._collectionFields = ['membros[]', 'programa'];


  /**
   * Stories the value [name] attribute of all ignored fields.
   * 
   * @private
   */
  VintProjeto.prototype._ignoredFields = ['search-membros', 'search-programas', 'membros[]', 'programa'];


  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintProjeto.prototype._requiredFields = ['titulo', 'descricao', 'estado', 'inicio'];


  /**
   * Stories messages.
   * 
   * @private
   */
  VintProjeto.prototype._messages = {
    CREATED: 'O projeto foi criado',
    UPDATED: 'O projeto foi atualizado',
  };


  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintProjeto.prototype._constants = {
    CREATE_REQUEST_HANDLER: 'projetoCreate::onRequest',
    UPDATE_REQUEST_HANDLER: 'projetoUpdate::onRequest',
    RESPONSE_SUCCESS: 'success',
    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
    CHIP_MODULE: 'VintChip',
    STEPPER_ID: 'stepper-projeto-create',
    STEP_MEMBROS_ID: 'step-projeto-create-membros',
    STEP_PROGRAMA_ID: 'step-projeto-create-programa',
    STEP_FIELDS_ID: 'step-projeto-create-fields',
    ON_STEP_CANCEL_LOCATION: '/dashboard',
    STEPPER_CONSTRUCTOR: 'MaterialStepper',
    MESSAGE_NO_MEMBROS_SELECTED: 'Selecione os membros do projeto',
    MESSAGE_NO_PROGRAMA_SELECTED: 'Selecione o programa do projeto',
  };


  /**
   * Stories dataset attributes.
   * 
   * @private
   */
  VintProjeto.prototype._jsDatasets = {
    CHIP_INPUT_VALUE: 'input-value'
  };


  /**
   * Stories dataset attributes.
   * 
   * @private
   */
  VintProjeto.prototype._cssClasses = {
    CHIP: 'vint-chip',
    CHIP_IS_DELETED: 'is-deleted',
    STEP: 'mdl-step',
  };


  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintProjeto.prototype._defaultErrorMessages = {};

  /**
   * Stories the instance of stepper component referred to the form.
   * 
   * @type {MaterialStepper}
   * @private
   */
  VintProjeto.prototype._stepperComponent = {};

  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintProjeto.prototype.fields = {};

  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintProjeto.prototype._setFields = function () { };


  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintProjeto.prototype._jqueryForm = {};


  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintProjeto.prototype._setJqueryForm = function () { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintProjeto.prototype._setRequestLoading = function () { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintProjeto.prototype._sendAjaxRequest = function (requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintProjeto.prototype.disableSubmit = function () { };


  /**
   * Able form submit action
   * 
   */
  VintProjeto.prototype.ableSubmit = function () { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintProjeto.prototype.resetValidationErrors = function () { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintProjeto.prototype._displayValidationErrors = function (errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintProjeto.prototype._displayValidationErrorDOM = function (field, message) { };


  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintProjeto.prototype._displayValidationErrorConsole = function (message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintProjeto.prototype._fieldsFocusedEffect = function () { };

  /**
  * Displays a MDL snackbar. 
  * 
  * @param {object} data Snackbar options
  * @param {string} data.message
  * @param {number} data.timeout 
  * @param {function} data.actionHandler 
  * @param {string} data.actionText 
  */
  VintProjeto.prototype.toast = function (data) { };


  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintProjeto.prototype._initialValues = {};

  /**
  * Change the current fields values to initial values (<Constructor>._initialValues). 
  * 
  */
  VintProjeto.prototype.resetValues = function () { };


  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintProjeto.prototype._patterns = function () {
    // Fields_[fim] pattern
    var estadoOnChange = function (event) {
      switch (this.fields.estado.value) {
        case 'andamento':
        case 'agendado': {
          // The input[name=fim] is not required
          // and remove it from _requiredFields array. 
          if (this._requiredFields.indexOf('fim') !== -1) {
            this._requiredFields.splice(this._requiredFields.indexOf('fim'), 1);
          }
          this.fields.fim.setAttribute('disabled', '');
          break;
        }
        case 'finalizado': {
          // The input[name=fim] is required
          // and add it to _requiredFields array. 
          this._requiredFields[this._requiredFields.length] = 'fim';
          this.fields.fim.removeAttribute('disabled');
          break;
        }
      }
    };
    this.fields.estado.addEventListener('change', estadoOnChange.bind(this));
    // [name='programa'] patterns
    var onChangePrograma = function (field) {
      // Get the related chip of input.
      // Searching by [data-input-value="fieldValue"]
      var chipCssSelector = '.' + this._cssClasses.CHIP + '[data-' + this._jsDatasets.CHIP_INPUT_VALUE + '="' + field.value + '"]';
      var chipElement = document.querySelector(chipCssSelector);
      var chipsParent = chipElement[this._constants.CHIP_MODULE].parent;

      if (!chipsParent) return;
      // Only one chip must be active for time.
      // Find the first child of chips that is not deleted
      // and turn off it.
      var toRemoveCssSelector = '.' + this._cssClasses.CHIP + ':not(.' + this._cssClasses.CHIP_IS_DELETED + ')';
      var chipToRemove = chipsParent.querySelector(toRemoveCssSelector);
      if (chipToRemove) {
        chipToRemove[this._constants.CHIP_MODULE].off();
      }
      var onDeleteChip = function (event) {
        // Turn off the radio component of input field
        field.parentNode.MaterialRadio.uncheck();
        // Turn off the chip
        chipElement[this._constants.CHIP_MODULE].off();
      };

      // Listening for clicks on chip remove button
      chipElement.addEventListener('ondelete', onDeleteChip.bind(this));

      if (field.checked) {
        // Display chip if the input is checked
        chipElement[this._constants.CHIP_MODULE].on();
      } else {
        // Turn off chip if the input is not checked
        chipElement[this._constants.CHIP_MODULE].off();
      }
    }.bind(this);

    for (var i = 0; i < this.fields.programa.length; i++) {
      if (this.fields.programa[i].checked) {
        onChangePrograma(this.fields.programa[i]);
      }
      this.fields.programa[i].addEventListener('change', (function (field) {
        return function () {
          onChangePrograma(field);
        }.bind(this);
      }.bind(this))(this.fields.programa[i]));
    }

    // [name='membros[]'] patterns
    var onChangeMembros = function (field) {
      // Get the related chip of input.
      // Searching by [data-input-value="fieldValue"]
      var chipCssSelector = '.' + this._cssClasses.CHIP + '[data-' + this._jsDatasets.CHIP_INPUT_VALUE + '="' + field.value + '"]';
      var chipElement = document.querySelector(chipCssSelector);
      var onDeleteChip = function (event) {
        // Set checked property of field as false
        field.checked = false;
        // Turn off the switch component of input field
        field.parentNode.MaterialSwitch.off();
        // Turn off the chip
        chipElement[this._constants.CHIP_MODULE].off();
      };

      // Listening for clicks on chip remove button
      chipElement.addEventListener('ondelete', onDeleteChip.bind(this));

      if (field.checked) {
        // Display chip if the input is checked
        chipElement[this._constants.CHIP_MODULE].on();
      } else {
        // Turn off chip if the input is not checked
        chipElement[this._constants.CHIP_MODULE].off();
      }

    }.bind(this);

    for (var i = 0; i < this.fields['membros[]'].length; i++) {
      if (this.fields['membros[]'][i].checked) {
        onChangeMembros(this.fields['membros[]'][i]);
      }
      this.fields['membros[]'][i].addEventListener('change', (function (field) {
        return function () {
          onChangeMembros(field);
        }.bind(this);
      }.bind(this))(this.fields['membros[]'][i]));
    }
  };


  /**
   * Defines the options to send for server with XMLHttpRequest (ajax)
   * 
   * @return {object}
   * @private
   */
  VintProjeto.prototype._getDefaultRequestOptions = function () {
    var onSuccess = function (response) {
      this._processResponseSuccess(response);

      if (response.hasOwnProperty(this._constants.RESPONSE_SUCCESS)) {
        // Check if exists response['success'].
        if (response[this._constants.RESPONSE_SUCCESS]) {
          // response['success'] == true.
          this._stepperComponent.next();
        } else if (response[this._constants.RESPONSE_VALIDATION_ERRORS]) {
          this._stepperComponent.error('Valide todos os campos');
        } else {
          this._stepperComponent.error();
        }
      } else {
        this._stepperComponent.error();
      }
    };
    var onComplete = function () {
      this._processResponseComplete();
    };
    var onError = function (jqXHR, textStatus, errorThrown) {
      this._processResponseError(jqXHR, textStatus, errorThrown);
      this._stepperComponent.error();
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
  VintProjeto.prototype._formEvents = function (action) { };


  /**
   * Defines the behaviors of stepper 
   * 
   * @private
   */
  VintProjeto.prototype._stepperHandler = function () {
    var stepper = document.querySelector('#' + this._constants.STEPPER_ID);
    var steps = stepper.querySelectorAll('.' + this._cssClasses.STEP);
    var stepMembros = stepper.querySelector('#' + this._constants.STEP_MEMBROS_ID);
    var stepPrograma = stepper.querySelector('#' + this._constants.STEP_PROGRAMA_ID);
    var stepFields = stepper.querySelector('#' + this._constants.STEP_FIELDS_ID);
    var valid /** @type {boolean} */;
    // On clicks on [data-step-cancel] button
    var onStepsCancel = function (event) {
      window.location.href = this._constants.ON_STEP_CANCEL_LOCATION;
    };
    // On clicks on [data-step-skip] button
    var onStepsSkip = function (event) {
      this._stepperComponent.skip();
    };
    // On clicks on [data-step-next] button of step 'membros'
    var onStepNextMembros = function (event) {
      var hasMembros = false;
      for (var i = 0; i < this.fields['membros[]'].length; i++) {
        if (this.fields['membros[]'][i].checked) {
          hasMembros = true;
          break;
        }
      }

      if (hasMembros) {
        this._stepperComponent.next();
      } else {
        this._stepperComponent.error(this._constants.MESSAGE_NO_MEMBROS_SELECTED);
      }
    };
    // On clicks on [data-step-next] button of step 'programa'
    var onStepNextPrograma = function (event) {
      var hasPrograma = false;
      for (var i = 0; i < this.fields.programa.length; i++) {
        if (this.fields.programa[i].checked) {
          hasPrograma = true;
          break;
        }
      }

      if (hasPrograma) {
        this._stepperComponent.next();
      } else {
        this._stepperComponent.error(this._constants.MESSAGE_NO_PROGRAMA_SELECTED);
      }
    };
    // On clicks on [data-step-next] button of step 'projeto'
    var onStepNextFields = function (event) {
      valid = this._checkRequiredFields();
      if (valid) {
        this._onStepNextFields();
      } else {
        this._stepperComponent.error('Valide todos os campos');
      }
    };
    // On all required steps are completed
    var onStepperComplete = function (event) {
      this._onStepperComplete();
    };
    stepMembros.addEventListener('onstepnext', onStepNextMembros.bind(this));
    stepPrograma.addEventListener('onstepnext', onStepNextPrograma.bind(this));
    stepFields.addEventListener('onstepnext', onStepNextFields.bind(this));
    stepper.addEventListener('onsteppercomplete', onStepperComplete.bind(this));
    // Adding to the steps their common events
    for (var i = 0; i < steps.length; i++) {
      steps[i].addEventListener('onstepcancel', onStepsCancel.bind(this));
      steps[i].addEventListener('onstepskip', onStepsSkip.bind(this));
    }
  };

  /**
   * Set attribute [disabled] on all buttons of step
   * 
   * @public
   */
  VintProjeto.prototype.disableActions = function () {
    var buttons = this._form.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('disabled', '');
    }
  };

  /**
   * Remove attribute [disabled] from all buttons of step
   * 
   * @public
   */
  VintProjeto.prototype.ableActions = function () {
    var buttons = this._form.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].removeAttribute('disabled');
    }
  };


  /** 
   * Handle when step with fields fire the onstepnext event 
   * 
   * @private
   */
  VintProjeto.prototype._onStepNextFields = function () {
    var requestHandler /** @type {string} */;
    var requestOptions /** @type {string} */;
    // Disable actions of step while the request is pending
    this.disableActions();

    requestOptions = this._getDefaultRequestOptions();
    if (this._isCreate) {
      requestHandler = this._constants.CREATE_REQUEST_HANDLER;
    } else if (this._isUpdate) {
      requestHandler = this._constants.UPDATE_REQUEST_HANDLER;
    }

    this._sendAjaxRequest(requestHandler, requestOptions);
  };


  /** 
   * Handle when the stepper is completed
   * 
   * @private
   */
  VintProjeto.prototype._onStepperComplete = function () { };


  /**
   * Get the MaterialStepper instance of stepper component present in the DOM
   * 
   * @return {MaterialStepper}
   * @private
   */
  VintProjeto.prototype._getStepperInstance = function () {
    var instance = document.querySelector('#' + this._constants.STEPPER_ID)[this._constants.STEPPER_CONSTRUCTOR];
    return instance;
  };

  /**
   * Initialize the instance
   * 
   */
  VintProjeto.prototype.init = function () {
    // If has the form element
    if (this._form) {
      // Define the form value of [data-request-loading] attribute 
      // to the selector of element that's will be displayed (loading) 
      // while the request is not completed.
      // this._setRequestLoading();
      // Define the jquery object for the this._form element. Will be used to call 
      // ajax requests.
      this._setJqueryForm();
      // Storie all fields inside form in this.fields. 
      this._setFields();
      // Add flag 'is-focused' on focus fields
      this._fieldsFocusedEffect();
      // Basic fields patterns
      this._patterns();
      // Set the stepper component
      this._stepperComponent = this._getStepperInstance();
      // Defines the behaviors of stepper
      this._stepperHandler();
      if (this._isCreate) {
        // Create a new item

      } else if (this._isUpdate) {
        // Update a item
      }
    }
  };

  // Assumes that formHandler is available globally
  formHandler.register({
    constructor: VintProjeto,
    classAsString: 'VintProjeto',
    cssClass: 'vint-form--projeto',
    maintenance: true,
    createName: 'projeto-create',
    updateName: 'projeto-update',
  });
})();