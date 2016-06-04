/**
 * VintSearch - A handler to vint search page with HistoryAPI features.
 * @license MIT
 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
 */

(function () {
  // Pre-defining the Searchable interface, for closure documentation and
  // static verification.
  var VintSearch = {

    /**
     * Initialize the instance.
     *
     */
    init: function () { },

    /**
     * Push new state to url using HistoryAPI.
     *
     */
    updateState: function (query) { },
  };

  VintSearch = (function () {
    'use strict';

    /**
     * Store strings defined by this handler that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {string}
     * @private
     */
    var _constants = {
      INPUT_NAME: 'q',
      INPUT_ID: 'search',
    };


    /**
     * Store css classes defined by this handler that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {string}
     * @private
     */
    var _cssClasses = {
      FORM: 'vint-form--search'
    };


    /**
     * Store datasets defined by this handler that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {string}
     * @private
     */
    var _datasets = {
      REQUEST: 'request',
      REQUEST_LOADING: 'request-loading',
      REQUEST_UPDATE: 'request-update',
      REQUEST_SUCCESS: 'request-success',
      TRACK_INPUT: 'track-input',
      REQUEST_CAMEL: 'request',
      REQUEST_UPDATE_CAMEL: 'requestUpdate',
      REQUEST_LOADING_CAMEL: 'requestLoading',
      REQUEST_SUCCESS_CAMEL: 'requestSuccess',
      TRACK_INPUT_CAMEL: 'trackInput',
      REQUEST_LOADING_VALUE: '.progress',
      REQUEST_SUCCESS_VALUE: 'VintSearch.updateState(data.query)',
      REQUEST_VALUE: 'search::onSearch',
      TRACK_INPUT_VALUE: 0,
      REQUEST_UPDATE_VALUE: '"search/tab-todos": "#tab-todos", "search/tab-membros": "#tab-membros", "search/tab-programas": "#tab-programas", "search/tab-projetos": "#tab-projetos", "search/tab-publicacoes": "#tab-publicacoes"',
    };

    /**
     * Stories the query input.
     * 
     * @type {HTMLElement}
     * @private
     */
    var _input = {};

    /**
     * Stories the form of _input.
     * 
     * @type {HTMLElement}
     * @private
     */
    var _form = {};


    /**
     * Get the query input element.
     * 
     * @return {HTMLElement}
     */
    var _getInput = function () {
      var selector = ('input[name="' + _constants.INPUT_NAME + '"]#' + _constants.INPUT_ID);
      var input = document.querySelector(selector);
      return input;
    };

    /**
     * Get the form of _input element.
     * 
     * @return {HTMLElement}
     */
    var _getForm = function () {
      var selector = ('form.' + _cssClasses.FORM);
      var form = document.querySelector(selector);
      return form;
    };


    /**
     * Create a new asynchronous request.
     * 
     * @private
     */
    var _sendAjaxRequest = function () {
      // Assumes that jQuery ($) object is available globally.
      $(_input).request(_datasets.REQUEST_VALUE);
    };

    /**
     * Handle the search by URL and call ajax request if necessary.
     * 
     * @private
     */
    var _searchByUrl = function () {
      var onPopState = function (event) {
        var query /** @type {string} */;
        if (event.state) {
          // Get the 'query' part of URL
          // @example ('?q=mySearchString') == 'mySearchString'
          query = window.location.search.split('=')[1];

          if (query) {
            // Update input value
            _input.value = decodeURIComponent(query);
            // Send ajax request to search by results
            _sendAjaxRequest();
          }
        }
      };

      window.addEventListener('popstate', onPopState.bind(this))
    };

    /**
     * Initialize the instance.
     *
     */
    var _init = function () {
      _input = _getInput();

      // Check if page contains the input element.
      if (!_input) return;
      _form = _getForm();
      if (!_form) {
        throw new Error('Cannot find the form element');
      }
      _setFormDatasets();
      _setInputDatasets();
      _input.focus();
      _searchByUrl();
    };


    /**
     * Defines the form required datasets by the framework
     * 
     * @return   
     */
    var _setFormDatasets = function () {
      _form.dataset[_datasets.REQUEST_CAMEL] = _datasets.REQUEST_VALUE;
      _form.dataset[_datasets.REQUEST_LOADING_CAMEL] = _datasets.REQUEST_LOADING_VALUE;
      _form.dataset[_datasets.REQUEST_UPDATE_CAMEL] = _datasets.REQUEST_UPDATE_VALUE;
    };


    /**
     * Defines the input required datasets by the framework
     * 
     * @return   
     */
    var _setInputDatasets = function () {
      _input.dataset[_datasets.REQUEST_CAMEL] = _datasets.REQUEST_VALUE;
      _input.dataset[_datasets.REQUEST_LOADING_CAMEL] = _datasets.REQUEST_LOADING_VALUE;
      _input.dataset[_datasets.REQUEST_UPDATE_CAMEL] = _datasets.REQUEST_UPDATE_VALUE;
      _input.dataset[_datasets.REQUEST_SUCCESS_CAMEL] = _datasets.REQUEST_SUCCESS_VALUE;
      _input.dataset[_datasets.TRACK_INPUT_CAMEL] = _datasets.TRACK_INPUT_VALUE;
    };


    /**
     * Push new state to url using HistoryAPI.
     *
     * @return
     */
    var _updateState = function (query) {
      var oldUrl = window.location.href;
      var baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
      var paramUri = encodeURIComponent(query);
      var updatedUrl = baseUrl + '?q=' + paramUri;
      if (query) {
        if (updatedUrl !== oldUrl) {
          history.pushState({ path: updatedUrl }, '', updatedUrl);
        }
      }
      else {
        history.pushState('', '', baseUrl);
      }
    };

    // Now return the functions that should be made public with their publicly
    // facing names...
    return {
      init: _init,
      updateState: _updateState,
    };
  })();
  
  window['VintSearch'] = VintSearch;
  
  window.addEventListener('load', function () {
    VintSearch.init();
  });
})();