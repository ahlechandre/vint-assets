/**
 * searchable - A handler to create searchable lists in DOM
 * @license MIT
 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
 */

(function () {
  // Pre-defining the Searchable interface, for closure documentation and
  // static verification.
  var Searchable = {

    /**
     * Initialize all searchable lists.
     *
     */
    init: function () { },
  };

  Searchable = (function () {
    'use strict';

    /**
     * Store strings for dataset attributes defined by this handler that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {string}
     * @private
     */
    var _jsDatasets = {
      SEARCH: 'search',
      SEARCH_LIST: 'search-list',
      SEARCH_ITEM: 'search-item',
      SEARCH_ITEM_CAMEL: 'searchItem',
    };


    /**
     * Stories all searchable lists with your referred input.
     * 
     * @type {Array<Searchable.ListConfig>}
     * @private
     */
    var _registeredLists = [];


    /**
     * Register an specific item of searchable lists storing it 
     * in _registeredLists object.
     * 
     * @param {string}
     * @param {HTMLElement}
     * @param {HTMLElement}
     * @private
     */
    var _register = function (target, input, list) {
      // All searchable items of the list 
      var listItems = list.querySelectorAll('[data-' + _jsDatasets.SEARCH_ITEM + ']');
      var item = {
        'target': target,
        'input': input,
        'list': list,
        'items': listItems
      };
      _registeredLists[_registeredLists.length] = item;
    }


    /**
     * Register all searchable lists storing it in _registeredLists object.
     * 
     * @private
     */
    var _registerAll = function () {
      var inputs = document.querySelectorAll('[data-' + _jsDatasets.SEARCH + ']');
      var list /** @type {HTMLElement} */;
      var listTarget /** @type {string} */;
      for (var i = 0; i < inputs.length; i++) {
        // Get the identifier of list 
        listTarget = inputs[i].dataset.search;

        if (!listTarget) continue;
        // Get the list of input
        list = document.querySelector('[data-' + _jsDatasets.SEARCH_LIST + '="' + listTarget + '"]');

        if (!list) continue;
        // Register list
        _register(listTarget, inputs[i], list);
      }
    };

    /**
     * Hides an especific item of the searchable list.
     * 
     * @param {HTMLElement}
     * @private
     */
    var _hideListItem = function (item) {
      item.style.display = 'none';
    };


    /**
     * Shows an especific item of the searchable list.
     * 
     * @param {HTMLElement}
     * @private
     */
    var _showListItem = function (item) {
      item.style.display = '';
    };


    /**
     * Set behavior of registered list on search.
     * 
     * @param {Searchable.ListConfig}
     * @private
     */
    var _onSearch = function (registeredList) {
      var query = /** @type {string} */registeredList.input.value;
      var value /** @type {string} */;
      var match /** @type {boolean} */;
      for (var i = 0; i < registeredList.items.length; i++) {
        // The value for search
        value = registeredList.items[i].dataset[_jsDatasets.SEARCH_ITEM_CAMEL];

        if (!value) continue;
        // Check if query match with value of item
        match = (value.toLowerCase().indexOf(query.toLowerCase().trim()) !== -1);

        if (!match) {
          // Does not match the search
          _hideListItem(registeredList.items[i]);
        } else {
          _showListItem(registeredList.items[i]);
        }
      }
    }


    /**
     * Set events of searchable lists.
     * 
     * @private
     */
    var _setEvents = function () {
      for (var i = 0; i < _registeredLists.length; i++) {
        _registeredLists[i].input.addEventListener('keyup', (function (registeredList) {
          return function () {
            _onSearch(registeredList);
          };
        })(_registeredLists[i]));
      }
    }


    /**
     * Initializes all searchable lists present in the DOM.
     * 
     * @private
     */
    var _init = function () {
      _registerAll();
      _setEvents();
    };

    // Now return the functions that should be made public with their publicly
    // facing names...
    return {
      init: _init,
    };
  })();


  /**
   * @typedef {{
   *  target: string,
   *  input: HTMLElement,
   *  list: HTMLElement,
   *  items: NodeList,
   * }}
   * 
   */
  Searchable.ListConfig;

  window.addEventListener('load', function () {
    Searchable.init();
  });
})();