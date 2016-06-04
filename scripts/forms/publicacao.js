/**
 * VintPublicacao - A handler to Vint Publicacao form.
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
  var VintPublicacao = function (form, isCreate, isUpdate) {
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
  VintPublicacao.prototype._formValid = true;


  /**
   * Flag used to check if was created a new item.
   * 
   * @type {boolean}
   * @private
   */
  VintPublicacao.prototype._created = false;


  /**
   * Flag used to check if was updated a item.
   * 
   * @type {boolean}
   * @private
   */
  VintPublicacao.prototype._updated = false;


  /**
   * Stories the value [name] attribute of collection fields.
   * 
   * @private
   */
  VintPublicacao.prototype._collectionFields = ['membros[]', 'projeto', 'publicacao_type'];


  /**
   * Stories the value [name] attribute of all ignored fields.
   * 
   * @private
   */
  VintPublicacao.prototype._ignoredFields = ['search-membros', 'search-projetos', 'search-publicacao-type', 'membros[]', 'projeto', 'publicacao_type', '_type_token'];


  /**
   * Stories the value [name] attribute of all required fields.
   * 
   * @private
   */
  VintPublicacao.prototype._requiredFields = [];


  /**
   * Stories the value [name] attribute of all required fields for 'padrao' type.
   * 
   * @private
   */
  VintPublicacao.prototype._requiredFieldsPadrao = ['titulo'];


  /**
   * Stories the value [name] attribute of all required fields for 'evento' type.
   * 
   * @private
   */
  VintPublicacao.prototype._requiredFieldsEvento = ['titulo', 'nome_evento'];


  /**
   * Stories the value [name] attribute of all required fields for 'periodico' type.
   * 
   * @private
   */
  VintPublicacao.prototype._requiredFieldsPeriodico = ['titulo', 'nome_revista', 'mes'];


  /**
   * Stories the value [name] attribute of all required fields for 'tcc' type.
   * 
   * @private
   */
  VintPublicacao.prototype._requiredFieldsTcc = ['titulo', 'natureza_trabalho', 'area_curso', 'instituicao', 'nivel'];


  /**
   * Stories the value [name] attribute of all required fields for 'livro' type.
   * 
   * @private
   */
  VintPublicacao.prototype._requiredFieldsLivro = ['titulo', 'quantidade_paginas'];


  /**
   * Stories the value [name] attribute of all required fields for 'livro' type.
   * 
   * @private
   */
  VintPublicacao.prototype._requiredFieldsMiscelanea = ['titulo'];

  /**
   * Stories messages.
   * 
   * @private
   */
  VintPublicacao.prototype._messages = {
    CREATED: 'A publicação foi criada',
    UPDATED: 'A publicação foi atualizada',
  };

  /**
   * Stories constant properties.
   * 
   * @private
   */
  VintPublicacao.prototype._constants = {
    CREATE_REQUEST_HANDLER: 'publicacaoCreate::onRequest',
    UPDATE_REQUEST_HANDLER: 'publicacaoUpdate::onRequest',
    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
    REQUEST_HANDLER_ONCHANGETYPE: 'onChangePubType',
    RESPONSE_SUCCESS: 'success',
    RESPONSE_LOCATION: 'location',
    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
    CHIP_MODULE: 'VintChip',
    STEPPER_CREATE_ID: 'stepper-publicacao-create',
    STEPPER_UPDATE_ID: 'stepper-publicacao-update',
    STEP_MEMBROS_ID: 'step-publicacao-membros',
    STEP_PROJETO_ID: 'step-publicacao-projeto',
    STEP_TYPE_ID: 'step-publicacao-type',
    STEP_FIELDS_ID: 'step-publicacao-fields',
    ON_STEP_CANCEL_LOCATION: '/dashboard',
    STEPPER_CONSTRUCTOR: 'MaterialStepper',
    MESSAGE_NO_MEMBROS_SELECTED: 'Selecione os membros da publicação',
    MESSAGE_NO_PROJETO_SELECTED: 'Selecione o projeto da publicação',
    MESSAGE_NO_TYPE_SELECTED: 'Selecione o tipo da publicação',
    UPDATE_PARTIAL_FIELDS: 'forms/publicacao',
    UPDATE_ELEMENT_FIELDS: '#publicacao-inputs',
    RESPONSE_VALIDATION_ERROR_PROJETO: 'projeto',
    RESPONSE_VALIDATION_ERROR_AUTOR: 'autor',
    MESSAGE_VALIDATION_ERROR_PROJETO: 'Valide o passo de projeto',
    MESSAGE_VALIDATION_ERROR_AUTOR: 'Valide o passo de autores',
    MESSAGE_VALIDATION_ERROR_FIELDS: 'Valide todos os campos',
  };


  /**
   * Stories dataset attributes.
   * 
   * @private
   */
  VintPublicacao.prototype._jsDatasets = {
    CHIP_INPUT_VALUE: 'input-value',
    CHIP_INPUT_VALUE_CAMEL: 'inputValue',
  };


  /**
   * Stories dataset attributes.
   * 
   * @private
   */
  VintPublicacao.prototype._cssClasses = {
    CHIP: 'vint-chip',
    CHIP_IS_DELETED: 'is-deleted',
    STEP: 'mdl-step',
  };


  /**
   * Storie the valid document file or false
   * 
   * @type {File | boolean}
   */
  VintPublicacao.prototype._documentFile = false;


  /**
   * Stories all default error messages for fields.
   * 
   * @private
   */
  VintPublicacao.prototype._defaultErrorMessages = {};

  /**
   * Stories the instance of stepper component referred to the form.
   * 
   * @type {MaterialStepper}
   * @private
   */
  VintPublicacao.prototype._stepperComponent = {};

  /**
   * All fields (input, select) inside the form. Keys are the [name] attribute
   * and values are the refered HTMLElement.
   * 
   */
  VintPublicacao.prototype.fields = {};

  /**
   * Set all fields (input, select) inside ClassConstructor._form
   * and store in ClassConstructor.fields
   * 
   */
  VintPublicacao.prototype._setFields = function () { };


  /**
   * Validates a file based on input, their required rules and referred messages 
   *  
   * @return {object}
   * @private
   */
  VintPublicacao.prototype._filePatterns = {};


  /**
   * Jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintPublicacao.prototype._jqueryForm = {};


  /**
   * Define the jquery object for the form element. Will be used to call 
   * ajax requests.  
   * 
   * @private
   */
  VintPublicacao.prototype._setJqueryForm = function () { };


  /**
   * Defines the form value of [data-request-loading] attribute. 
   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
   * while the request is not completed.
   * 
   * @private
   */
  VintPublicacao.prototype._setRequestLoading = function () { }


  /**
   * Send ajax request to backend handler with request options 
   * 
   * @param {string} request backend handler
   * @param {object} request options
   * @private
   */
  VintPublicacao.prototype._sendAjaxRequest = function (requestHandler, requestOptions) { };

  /**
   * Disable form submit action
   * 
   */
  VintPublicacao.prototype.disableSubmit = function () { };


  /**
   * Able form submit action
   * 
   */
  VintPublicacao.prototype.ableSubmit = function () { };


  /**
   * Reset all fields to default state and error messages.
   * 
   */
  VintPublicacao.prototype.resetValidationErrors = function () { };


  /**
   * Show the server validation errors.
   * 
   * @param {object} - keys are the field [name] attribute and values are the validation messages
   * @private
   */
  VintPublicacao.prototype._displayValidationErrors = function (errors) { };


  /**
   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
   * 
   * @param {HTMLElement} - field with validation error
   * @param {string} - validation error message 
   * @private
   */
  VintPublicacao.prototype._displayValidationErrorDOM = function (field, message) { };


  /**
  * Show the validation error at the console as a warn.
  * 
  * @param {string} - validation error message 
  * @private
  */
  VintPublicacao.prototype._displayValidationErrorConsole = function (message) { };


  /**
  * Toggle css class 'is-focused' on outer of fields.
  * 
  * @private
  */
  VintPublicacao.prototype._fieldsFocusedEffect = function () { };

  /**
  * Displays a MDL snackbar. 
  * 
  * @param {object} data Snackbar options
  * @param {string} data.message
  * @param {number} data.timeout 
  * @param {function} data.actionHandler 
  * @param {string} data.actionText 
  */
  VintPublicacao.prototype.toast = function (data) { };


  /**
   * Stories the initial value of all fields.
   * 
   * @private
   */
  VintPublicacao.prototype._initialValues = {};

  /**
  * Change the current fields values to initial values (<Constructor>._initialValues). 
  * 
  */
  VintPublicacao.prototype.resetValues = function () { };


  /**
   * Define the required patterns for the fields of form 
   * 
   * @private
   */
  VintPublicacao.prototype._patterns = function () {
    // [name='projeto'] patterns
    /**
     * Toggle the chip referred to an especific field
     * 
     * @param {HTMLElement}
     */
    var toggleChip = function (field) {
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

    for (var i = 0; i < this.fields.projeto.length; i++) {
      if (this.fields.projeto[i].checked) {
        toggleChip(this.fields.projeto[i]);
      }
      this.fields.projeto[i].addEventListener('change', (function (field) {
        return function () {
          toggleChip(field);
        }.bind(this);
      }.bind(this))(this.fields.projeto[i]));
    }

    if (this._isCreate) {
      for (var i = 0; i < this.fields.publicacao_type.length; i++) {
        this.fields.publicacao_type[i].addEventListener('change', (function (field) {
          return function () {
            toggleChip(field);
          }.bind(this);
        }.bind(this))(this.fields.publicacao_type[i]));
      }
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

    // Check the 'autores' keeping the original sequence.
    var autoresSequenceField = this.fields._autores_sequence || this._form.querySelector('input[name="_autores_sequence"]');
    if (autoresSequenceField && autoresSequenceField.value) {
      var autoresSequence = autoresSequenceField.value.split(',');
      var autorValue /** @type {string} */;
      var field /** @type {HTMLElement} */;
      for (var i = 0; i < autoresSequence.length; i++) {
        autorValue = autoresSequence[i];
        field = this._form.querySelector('input[name="membros[]"][value=' + autorValue + ']');
        if (field) {
          onChangeMembros(field);
        }
      }
    }

    for (var i = 0; i < this.fields['membros[]'].length; i++) {
      this.fields['membros[]'][i].addEventListener('change', (function (field) {
        return function () {
          onChangeMembros(field);
        }.bind(this);
      }.bind(this))(this.fields['membros[]'][i]));
    }
  };

  /**
   * Define the required patterns for the fields of form loaded 
   * dinamically from ajax request or at initialization if the 
   * form is update
   * 
   * @private
   */
  VintPublicacao.prototype._patternsRequestFields = function () {
    var onChangeDocument = function (event) {
      var isValid = this._documentPattern(this.fields.document.files);
      if (isValid) {
        this._documentFile = this.fields.document.files[0];
        if (this.fields['document-filename']) {
          this.fields['document-filename'].parentNode.classList.remove('is-invalid');
        }
      } else {
        this._documentFile = false;
        if (this.fields['document-filename']) {
          this.fields['document-filename'].parentNode.classList.add('is-invalid');
        }
      }
    };
    this.fields.document.addEventListener('change', onChangeDocument.bind(this));
  };


  /**
   * Check if the files that comes from input[type=file][name=document]
   * is a valid file to be the uploaded 
   * 
   * @param {FileList}
   * @return {boolean}
   * @private
   */
  VintPublicacao.prototype._documentPattern = function (fileList) {
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
    var input = {
      'document': fileList[0]
    };
    var rules = {
      'document': {
        'extension': ['pdf'],
        'max_size': 2
      }
    };
    var messages = {
      'extension': 'Escolha um documento no formato PDF',
      'max_size': 'O tamanho máximo do documento deve ser 2MB'
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
  };

  /**
   * Defines the listeners to the required form events 
   * 
   * @private
   */
  VintPublicacao.prototype._formEvents = function () {
    var onAjaxUpdateForm = function (event, context, response, status, jqXHR) {
      // Triggered on a page element after it has been updated with the framework. 
      // The handler gets 5 parameters: the event object, the context object, 
      // the data object received from the server, the status text string, and the jqXHR object. 
      if (status === 'success') {
        if (response['is-valid']) {
          // Able the actions after request is ok
          this.ableActions();
          // Moves the stepper one step forward
          this._stepperComponent.next();
          // Remove old loaded fields in this.fields array. 
          this._resetFields(true, false);
          // Set new loaded fields in this.fields array. 
          this._setFields(true, false);
          // Add flag 'is-focused' on focus fields
          this._fieldsFocusedEffect();
          // Set the patterns of loaded fields
          this._patternsRequestFields();
          // Set the autores sequence
          this._setSequenceAutores();
        }
      }
    };

    // Assumes that jQuery ($) object is available globally.
    $(this._form).on('ajaxUpdate', onAjaxUpdateForm.bind(this));
  };


  /**
   * Defines the sequence of 'autores' based on order of choice 
   * and stories in input[type=hidden][name=_autores_sequence] 
   * 
   * @private
   */
  VintPublicacao.prototype._setSequenceAutores = function () {
    var chip /** @type {HTMLElement} */;
    var orderedChips /** @type {object} */;
    var orderedAsString = /** @type {string} */ '';
    // Check if the input[name=_autores_sequence] is registered on
    // VintPublicacao.fields object.
    if (!this.fields['_autores_sequence']) return;
    // Get current 'autores' sequence based on check order.
    // This can be done through the VintChip component that provides
    // the order of elements in the DOM.
    chip = this._form.querySelector('.' + this._cssClasses.CHIP);
    // Check if exists a chip element
    if (!chip) return;
    orderedChips = chip[this._constants.CHIP_MODULE].getParentOrder();
    // Loops at the ordered chips and fill the orderedAsString variable. 
    for (var chip in orderedChips) {
      // Create a string with ordereds 'autores' separeted by ',' (comma). 
      orderedAsString += orderedChips[chip].dataset[this._jsDatasets.CHIP_INPUT_VALUE_CAMEL] + ',';
    }
    this.fields['_autores_sequence'].setAttribute('value', orderedAsString);
  };


  /**
   * Defines the behaviors of stepper 
   * 
   * @private
   */
  VintPublicacao.prototype._stepperHandler = function () {
    var stepperId = this._isCreate ? this._constants.STEPPER_CREATE_ID : this._constants.STEPPER_UPDATE_ID;
    var stepper = document.querySelector('#' + stepperId);
    var steps = stepper.querySelectorAll('.' + this._cssClasses.STEP);
    var stepMembros = stepper.querySelector('#' + this._constants.STEP_MEMBROS_ID);
    var stepProjeto = stepper.querySelector('#' + this._constants.STEP_PROJETO_ID);
    var stepType = stepper.querySelector('#' + this._constants.STEP_TYPE_ID);
    var stepFields = stepper.querySelector('#' + this._constants.STEP_FIELDS_ID);
    var valid /** @type {boolean} */;
    /**
     * Verifies if a collection of checkboxes, radios has any element checked
     * 
     * @param {NodeList}
     * @return {boolean} 
     */
    var hasChecked = function (fields) {
      var hasCheck = false;
      for (var i = 0; i < fields.length; i++) {
        if (fields[i].checked) {
          hasCheck = true;
          break;
        }
      }
      return hasCheck;
    };
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
      var hasMembros = hasChecked(this.fields['membros[]']);

      if (hasMembros) {
        this._stepperComponent.next();
      } else {
        this._stepperComponent.error(this._constants.MESSAGE_NO_MEMBROS_SELECTED);
      }
    };
    // On clicks on [data-step-next] button of step 'programa'
    var onStepNextProjeto = function (event) {
      var hasProjeto = hasChecked(this.fields.projeto);

      if (hasProjeto) {
        this._stepperComponent.next();
      } else {
        this._stepperComponent.error(this._constants.MESSAGE_NO_PROJETO_SELECTED);
      }
    };
    // Step 'type' only when is create
    if (this._isCreate) {
      // On clicks on [data-step-next] button of step 'tipo'
      var onStepNextType = function (event) {
        var hasType = hasChecked(this.fields.publicacao_type);

        if (hasType) {
          // Load from server the fields referred to the type
          this._requestFields();
        } else {
          this._stepperComponent.error(this._constants.MESSAGE_NO_TYPE_SELECTED);
        }
      };
    }
    // On clicks on [data-step-next] button of step 'publicação'
    var onStepNextFields = function (event) {
      var pubType /** @type {string} */;
      var requireds /** @type {Array} */;
      // Get the selected 'publicacao' type
      for (var i = 0; i < this.fields.publicacao_type.length; i++) {
        if (this._isUpdate) {
          // Case form is update, the publicacao_type is a NodeList
          // with only one input[type=hidden]
          pubType = this.fields.publicacao_type[i].value
          break;
        } else {
          // Case form is create, the publicacao_type is a NodeList 
          // of input[type=radio]
          if (this.fields.publicacao_type[i].checked) {
            pubType = this.fields.publicacao_type[i].value;
            break;
          }
        }
      }
      switch (pubType) {
        case 'padrao':
          {
            requireds = this._requiredFieldsPadrao;
            break;
          }
        case 'evento':
          {
            requireds = this._requiredFieldsEvento;
            break;
          }
        case 'periodico':
          {
            requireds = this._requiredFieldsPeriodico;
            break;
          }
        case 'tcc':
          {
            requireds = this._requiredFieldsTcc;
            break;
          }
        case 'livro':
          {
            requireds = this._requiredFieldsLivro;
            break;
          }
        case 'miscelanea':
          {
            requireds = this._requiredFieldsMiscelanea;
            break;
          }
      }
      valid = this._checkRequiredFields(requireds);

      if (valid) {
        // Set the autores sequence
        this._setSequenceAutores();
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
    stepProjeto.addEventListener('onstepnext', onStepNextProjeto.bind(this));
    if (this._isCreate) {
      stepType.addEventListener('onstepnext', onStepNextType.bind(this));
    }
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
  VintPublicacao.prototype.disableActions = function () {
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
  VintPublicacao.prototype.ableActions = function () {
    var buttons = this._form.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].removeAttribute('disabled');
    }
  };

  /**
   * Send ajax request with file to backend handler with request options 
   * 
   * @return {boolean}
   * @private
   */
  VintPublicacao.prototype._sendAjaxRequestWithFile = function () {
    // Create a new form data with all fields on this._form
    var formData = new FormData(this._form);

    if (!this._documentFile) {
      // If current input[name=document] file is not valid
      // remove it from formData.
      formData.delete('document');
    }
    var options = this._getUploadRequestOptions(formData);
    // Assumes that jQuery ($) is available globally
    $.ajax(options);
    return true;
  };

  /**
   * Validates the steps with error.
   * 
   * @param {object}
   * @return 
   */
  VintPublicacao.prototype._validateStepErrors = function (response) {
    var errors /** @type {array} */;
    var message /** @type {string} */;
    
    if (response[this._constants.RESPONSE_VALIDATION_ERRORS]) {
      // Set stepper error state.
      this._stepperComponent.error(this._constants.MESSAGE_VALIDATION_ERROR_FIELDS);
      errors = response[this._constants.RESPONSE_VALIDATION_ERRORS];

      if (errors[this._constants.RESPONSE_VALIDATION_ERROR_PROJETO]) {
        // Error with 'projeto' step
        message = this._constants.MESSAGE_VALIDATION_ERROR_PROJETO;
        this.toast({
          message: message
        });
        // Activates the 'projeto' step (2)
        this._stepperComponent.error();
        this._stepperComponent.goto(2);
        this._stepperComponent.error(message);
      } else if (errors[this._constants.RESPONSE_VALIDATION_ERROR_AUTOR]) {
        // Error with 'autores' step
        message = this._constants.MESSAGE_VALIDATION_ERROR_AUTOR;
        this.toast({
          message: message
        });
        // Activates the 'autores' step (1)
        this._stepperComponent.error();
        this._stepperComponent.goto(1);
        this._stepperComponent.error(message);
      } else if (errors['document']) {
        // Error with 'document' file
        this._stepperComponent.error();
        message = response[this._constants.RESPONSE_VALIDATION_ERRORS]['document'][0];
        this.toast({
          message: message
        });
      } else {
        this._processResponseSuccess(response);
      }
    }
  };

  /**
   * Defines the options to send a file to server with XMLHttpRequest (ajax)
   * 
   * @return {object}
   * @private
   */
  VintPublicacao.prototype._getUploadRequestOptions = function (formData) {
    var requestHandler = this._isUpdate ? this._constants.UPDATE_REQUEST_HANDLER : this._constants.CREATE_REQUEST_HANDLER;
    var headerHandler = this._constants.OCTOBER_REQUEST_HANDLER;
    var headers = {};
    headers[headerHandler] = requestHandler;
    var onSuccess = function (response) {

      if (response.hasOwnProperty(this._constants.RESPONSE_SUCCESS)) {
        // Check if exists response['success'].
        if (!response[this._constants.RESPONSE_SUCCESS] && response[this._constants.RESPONSE_VALIDATION_ERRORS]) {
          // Check for errors in previous steps.
          this._validateStepErrors(response);
        } else if (response[this._constants.RESPONSE_SUCCESS]) {
          this._processResponseSuccess(response);
          // response['success'] == true.
          this._stepperComponent.next();
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
      headers: headers,
      data: formData,
      type: 'post',
      cache: false,
      processData: false,
      contentType: false,
      success: onSuccess.bind(this),
      complete: onComplete.bind(this),
      error: onError.bind(this),
    };
  };

  /** 
   * Handle when step with fields fire the onstepnext event 
   * 
   * @private
   */
  VintPublicacao.prototype._onStepNextFields = function () {
    // Disable actions while the request is pending.
    this.disableActions();
    this._sendAjaxRequestWithFile();
  };


  /** 
   * Handle when the stepper is completed
   * 
   * @private
   */
  VintPublicacao.prototype._onStepperComplete = function () { };


  /**
   * Get the MaterialStepper instance of stepper component present in the DOM
   * 
   * @return {MaterialStepper}
   * @private
   */
  VintPublicacao.prototype._getStepperInstance = function () {
    var selector /** @type {string} */;

    if (this._isCreate) {
      selector = ('#' + this._constants.STEPPER_CREATE_ID);
    } else {
      selector = ('#' + this._constants.STEPPER_UPDATE_ID);
    }
    var instance = document.querySelector(selector)[this._constants.STEPPER_CONSTRUCTOR];
    return instance;
  };

  /**
   * Send request to server and update partial with new fields 
   * 
   * @private
   */
  VintPublicacao.prototype._requestFields = function () {
    var requestHandler = this._constants.REQUEST_HANDLER_ONCHANGETYPE;
    var onError = function (jqXHR, textStatus, errorThrown) {
      this._processResponseError(jqXHR, textStatus, errorThrown);
      this._stepperComponent.error();
      this.ableActions();
    };

    /**
     * Prepares the object to send as options with ajax request
     * 
     */
    var getRequestOptions = function () {
      // Backend partial name to update
      var updatePartial = this._constants.UPDATE_PARTIAL_FIELDS;
      // {HTMLElement} to be updated
      var updateElement = this._constants.UPDATE_ELEMENT_FIELDS;
      var update = {};
      update[updatePartial] = updateElement;

      return {
        update: update,
        error: onError.bind(this)
      };
    };
    var requestOptions = (getRequestOptions.bind(this))();
    // Disable the actions while request is pending
    this.disableActions();
    this._sendAjaxRequest(requestHandler, requestOptions);
  };

  /**
   * Initialize the instance
   * 
   */
  VintPublicacao.prototype.init = function () {
    // If has the form element
    if (this._form) {
      // Define the jquery object for the this._form element. Will be used to call 
      // ajax requests.
      this._setJqueryForm();
      if (this._isCreate) {
        // Stories only the specifieds VintPublicacao._collectionFields 
        // in this.fields. 
        this._setFields(false, true);
      } else if (this._isUpdate) {
        // Stories all fields in this.fields. 
        this._setFields();
        // Add flag 'is-focused' on focus fields
        this._fieldsFocusedEffect();
        // Set the patterns of loaded fields
        this._patternsRequestFields();
      }
      // Basic fields patterns
      this._patterns();
      // Set the stepper component
      this._stepperComponent = this._getStepperInstance();
      // Defines the events of form
      this._formEvents();
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
    constructor: VintPublicacao,
    classAsString: 'VintPublicacao',
    cssClass: 'vint-form--publicacao',
    maintenance: true,
    createName: 'publicacao-create',
    updateName: 'publicacao-update',
  });
})();