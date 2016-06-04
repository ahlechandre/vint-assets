/**
 * mdl-chip - A Material Design Lite chip component polyfill
 * @version v0.1.0
 * @license MIT
 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
 */

(function () {
  'use strict';
  /**
   * Class constructor for Stepper MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} The element that will be upgraded.
   */
  var VintChip = function (element) {
    this._element = element;
    // initialize instance
    this.init();
  };

  window['VintChip'] = VintChip;


  /**
   * Store strings for states
   *
   * @enum {string}
   * @private
   */
  VintChip.prototype._states = {
    DELETED: 'deleted',
    ACTIVE: 'active',
  };


  /**
   * Store the custom events
   *
   * @private
   */
  VintChip.prototype._customEvents = {
    ondelete: new CustomEvent('ondelete', {
      bubbles: true,
      cancelable: true,
    }),
    onshow: new CustomEvent('onshow', {
      bubbles: true,
      cancelable: true,
    }),
    onoff: new CustomEvent('onoff', {
      bubbles: true,
      cancelable: true,
    }),
  };


  /**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
  VintChip.prototype._cssClasses = {
    CHIPS: 'vint-chips',
    CHIP: 'vint-chip',
    CHIP_DELETABLE: 'vint-chip--deletable',
    CHIP_CONTACT: 'vint-chip__contact',
    CHIP_TITLE: 'vint-chip__title',
    CHIP_REMOVE_BUTTON: 'vint-chip__remove-button',
    IS_DELETED: 'is-deleted',
  };


  /**
   * Stories all the especifics data for the chip
   * 
   * @private
   */
  VintChip.prototype._chip = {};


  /**
   * Stories parent node for the chip
   * 
   * @private
   */
  VintChip.prototype.parent = {};


  /**
   * Turn off the chip
   * 
   * @public
   */
  VintChip.prototype.off = function () {
    // If chip already is off, do nothing.
    if (this._chip.state === this._states.DELETED) return;

    this._element.classList.add(this._cssClasses.IS_DELETED);
    this._chip.state = this._states.DELETED;
    this._dispatchEventOnOff();
  };


  /**
   * Turn up the chip
   * 
   * @public
   */
  VintChip.prototype.on = function () {
    // If chip already is on, do nothing.
    if (this._chip.state === this._states.ACTIVE) return;
    if (this.parent) {
      // Always display chips in order (append at the end)
      this.parent.appendChild(this._element);
    }
    this._element.classList.remove(this._cssClasses.IS_DELETED);
    this._chip.state = this._states.ACTIVE;
    this._dispatchEventOnShow();
  };


  /**
   * Set the custom events on chip
   * 
   * @private
   */
  VintChip.prototype._setCustomEvents = function () {
    this._dispatchEventOnShow();
    this._dispatchEventOnDelete();
  };


  /**
  * Dispatch "onshow" event on chip. 
  * 
  * @private
  */
  VintChip.prototype._dispatchEventOnShow = function () {
    // This event only occurs if chip is not deleted
    if (this._chip.state !== this._states.DELETED) {
      this._element.dispatchEvent(this._customEvents.onshow)
    }
  }
  

  /**
  * Dispatch "ondelete" event on chip. 
  * 
  * @private
  */
  VintChip.prototype._dispatchEventOnDelete = function () {
    // This event occurs when clicks on remove button (only if chip is deletable)
    if (!this._chip.isDeletable || !this._chip.removeButton) return;

    const onDeleteChip = function () {
      this._element.dispatchEvent(this._customEvents.ondelete);
    };
    this._chip.removeButton.addEventListener('click', onDeleteChip.bind(this));
  };
  
  
  /**
  * Dispatch "ondelete" event on chip. 
  * 
  * @private
  */
  VintChip.prototype._dispatchEventOnOff = function () {
    // This event occurs when VintChip.off() public method is called
    this._element.dispatchEvent(this._customEvents.onoff)
  }
  
  
  /**
   * Get the chip config options
   * 
   * @return {Object<VintChip.ChipConfigPrivate>}
   * @private
   */
  VintChip.prototype._getChip = function () {
    const state = this._element.classList.contains(this._cssClasses.IS_DELETED) ? this._states.DELETED : this._states.ACTIVE;
    const isDeletable = this._element.classList.contains(this._cssClasses.CHIP_DELETABLE);
    const removeButton = this._element.querySelector('.' + this._cssClasses.CHIP_REMOVE_BUTTON) || null;

    return {
      state: state,
      isDeletable: isDeletable,
      removeButton: removeButton,
    };
  };

  /**
    * Get the chip parent
    * 
    * @return {HTMLElement | boolean}
    * @private
    */
  VintChip.prototype._getParent = function () {
    const maxLoop = 10;
    var parent = this._element.parentNode;
    var found = false;
    var i = 0;
    while (!found) {
      if (parent.classList.contains(this._cssClasses.CHIPS)) {
        found = true;
      } else {
        parent = parent.parentNode;
      }
      i++;
      // Max number of attempts
      if (i >= maxLoop) {
        parent = false;
        break;
      }
    }
    return parent;
  };

  /**
   * Get object with chips ordered by node sequence at DOM 
   * 
   * @return {object}
   * @public
   */
  VintChip.prototype.getParentOrder = function () {
    const chips = this.parent.querySelectorAll('.' + this._cssClasses.CHIP);
    var order = {};
    var index /** @type {number} */;
    for (var i = 0; i < chips.length; i++) {
      // Check if chip is active (not deleted)
      if (!chips[i].classList.contains(this._cssClasses.IS_DELETED)) {
        index = (Object.keys(order).length) + 1;
        order[index] = chips[i];
      }
    }

    return order;
  };

  /**
   * Initialize the instance
   * @public
   */
  VintChip.prototype.init = function () {
    if (!this._element) return;
    
    // Load all important data related to chip
    this._chip = this._getChip();
    // Get the parent of chip
    this.parent = this._getParent();
    // Initialize the custom events 
    this._setCustomEvents();
  }
  
  /**
   * @type {{
   *  state: string,
   *  isDeletable: boolean,
   *  removeButton: HTMLElement | null,
   * }}
   * 
   * @private
   */
  VintChip.ChipConfigPrivate;
  
  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  componentHandler.register({
    constructor: VintChip,
    classAsString: 'VintChip',
    cssClass: 'vint-chip',
    widget: true
  });

})();