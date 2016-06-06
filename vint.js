/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(6);

	__webpack_require__(7);

	__webpack_require__(8);

	__webpack_require__(9);

	__webpack_require__(10);

	__webpack_require__(11);

	__webpack_require__(12);

	__webpack_require__(13);

	__webpack_require__(14);

	__webpack_require__(15);

	__webpack_require__(16);

	__webpack_require__(17);

	__webpack_require__(18);

	__webpack_require__(19);

	__webpack_require__(20);

	__webpack_require__(21);

	__webpack_require__(22);

	__webpack_require__(23);

	__webpack_require__(24);

	__webpack_require__(25);

	__webpack_require__(26);

	__webpack_require__(27);

	__webpack_require__(28);

	__webpack_require__(29);

	__webpack_require__(30);

	__webpack_require__(33);

	__webpack_require__(34);

	__webpack_require__(35);

	__webpack_require__(36);

	__webpack_require__(37);

	__webpack_require__(38);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* ========================================================================
	 * October CMS: front-end JavaScript framework
	 * http://octobercms.com
	 * ========================================================================
	 * Copyright 2014 Alexey Bobkov, Samuel Georges
	 *
	 * ======================================================================== */

	if (typeof jQuery === 'undefined') throw new Error('The jQuery library is not loaded. The October CMS framework cannot be initialized.');

	+function ($) {
	    "use strict";

	    var Request = function Request(element, handler, options) {
	        var $el = this.$el = $(element);
	        this.options = options || {};
	        /*
	         * Validate handler name
	         */

	        if (handler == undefined) throw new Error('The request handler name is not specified.');

	        if (!handler.match(/^(?:\w+\:{2})?on*/)) throw new Error('Invalid handler name. The correct handler name format is: "onEvent".');

	        /*
	         * Custom function, requests confirmation from the user
	         */

	        function handleConfirmMessage(message) {
	            var _event = jQuery.Event('ajaxConfirmMessage');

	            _event.promise = $.Deferred();
	            if ($(window).triggerHandler(_event, [message]) !== undefined) {
	                _event.promise.done(function () {
	                    options.confirm = null;
	                    new Request(element, handler, options);
	                });
	                return false;
	            }

	            if (_event.isDefaultPrevented()) return;
	            if (message) return confirm(message);
	        }

	        /*
	         * Initiate request
	         */

	        if (options.confirm && !handleConfirmMessage(options.confirm)) return;

	        /*
	         * Prepare the options and execute the request
	         */

	        var form = $el.closest('form'),
	            context = { handler: handler, options: options },
	            loading = options.loading !== undefined && options.loading.length ? $(options.loading) : null,
	            isRedirect = options.redirect !== undefined && options.redirect.length;

	        var _event = jQuery.Event('oc.beforeRequest');
	        form.trigger(_event, context);
	        if (_event.isDefaultPrevented()) return;

	        var data = [form.serialize()];

	        $.each($el.parents('[data-request-data]').toArray().reverse(), function extendReque() {
	            data.push($.param(paramToObj('data-request-data', $(this).data('request-data'))));
	        });

	        if ($el.is(':input') && !form.length) {
	            var inputName = $el.attr('name');
	            if (options.data[inputName] === undefined) options.data[inputName] = $el.val();
	        }

	        if (options.data !== undefined && !$.isEmptyObject(options.data)) data.push($.param(options.data));

	        var requestOptions = {
	            context: context,
	            headers: {
	                'X-OCTOBER-REQUEST-HANDLER': handler,
	                'X-OCTOBER-REQUEST-PARTIALS': this.extractPartials(options.update)
	            },
	            success: function success(data, textStatus, jqXHR) {
	                /*
	                 * Halt here if beforeUpdate() or data-request-before-update returns false
	                 */
	                if (this.options.beforeUpdate.apply(this, [data, textStatus, jqXHR]) === false) return;
	                if (options.evalBeforeUpdate && eval('(function($el, context, data, textStatus, jqXHR) {' + options.evalBeforeUpdate + '}.call($el.get(0), $el, context, data, textStatus, jqXHR))') === false) return;

	                /*
	                 * Trigger 'ajaxBeforeUpdate' on the form, halt if event.preventDefault() is called
	                 */
	                var _event = jQuery.Event('ajaxBeforeUpdate');
	                form.trigger(_event, [context, data, textStatus, jqXHR]);
	                if (_event.isDefaultPrevented()) return;

	                /*
	                 * Proceed with the update process
	                 */
	                var updatePromise = requestOptions.handleUpdateResponse(data, textStatus, jqXHR);

	                updatePromise.done(function () {
	                    form.trigger('ajaxSuccess', [context, data, textStatus, jqXHR]);
	                    options.evalSuccess && eval('(function($el, context, data, textStatus, jqXHR) {' + options.evalSuccess + '}.call($el.get(0), $el, context, data, textStatus, jqXHR))');
	                });

	                return updatePromise;
	            },
	            error: function error(jqXHR, textStatus, errorThrown) {
	                var errorMsg,
	                    updatePromise = $.Deferred();

	                if (window.ocUnloading !== undefined && window.ocUnloading || errorThrown == 'abort') return;

	                /*
	                 * Disable redirects
	                 */
	                isRedirect = false;
	                options.redirect = null;

	                /*
	                 * Error 406 is a "smart error" that returns response object that is
	                 * processed in the same fashion as a successful response.
	                 */
	                if (jqXHR.status == 406 && jqXHR.responseJSON) {
	                    errorMsg = jqXHR.responseJSON['X_OCTOBER_ERROR_MESSAGE'];
	                    updatePromise = requestOptions.handleUpdateResponse(jqXHR.responseJSON, textStatus, jqXHR);
	                }
	                /*
	                 * Standard error with standard response text
	                 */
	                else {
	                        errorMsg = jqXHR.responseText ? jqXHR.responseText : jqXHR.statusText;
	                        updatePromise.resolve();
	                    }

	                updatePromise.done(function () {
	                    $el.data('error-message', errorMsg);

	                    /*
	                     * Trigger 'ajaxError' on the form, halt if event.preventDefault() is called
	                     */
	                    var _event = jQuery.Event('ajaxError');
	                    form.trigger(_event, [context, textStatus, jqXHR]);
	                    if (_event.isDefaultPrevented()) return;

	                    /*
	                     * Halt here if the data-request-error attribute returns false
	                     */
	                    if (options.evalError && eval('(function($el, context, textStatus, jqXHR) {' + options.evalError + '}.call($el.get(0), $el, context, textStatus, jqXHR))') === false) return;

	                    requestOptions.handleErrorMessage(errorMsg);
	                });

	                return updatePromise;
	            },
	            complete: function complete(data, textStatus, jqXHR) {
	                form.trigger('ajaxComplete', [context, data, textStatus, jqXHR]);
	                options.evalComplete && eval('(function($el, context, data, textStatus, jqXHR) {' + options.evalComplete + '}.call($el.get(0), $el, context, data, textStatus, jqXHR))');
	            },

	            /*
	             * Custom function, display an error message to the user
	             */
	            handleErrorMessage: function handleErrorMessage(message) {
	                var _event = jQuery.Event('ajaxErrorMessage');
	                $(window).trigger(_event, [message]);
	                if (_event.isDefaultPrevented()) return;
	                if (message) alert(message);
	            },

	            /*
	             * Custom function, handle any application specific response values
	             * Using a promisary object here in case injected assets need time to load
	             */
	            handleUpdateResponse: function handleUpdateResponse(data, textStatus, jqXHR) {

	                /*
	                 * Update partials and finish request
	                 */
	                var updatePromise = $.Deferred().done(function () {
	                    for (var partial in data) {
	                        /*
	                         * If a partial has been supplied on the client side that matches the server supplied key, look up
	                         * it's selector and use that. If not, we assume it is an explicit selector reference.
	                         */
	                        var selector = options.update[partial] ? options.update[partial] : partial;
	                        if (jQuery.type(selector) == 'string' && selector.charAt(0) == '@') {
	                            $(selector.substring(1)).append(data[partial]).trigger('ajaxUpdate', [context, data, textStatus, jqXHR]);
	                        } else if (jQuery.type(selector) == 'string' && selector.charAt(0) == '^') {
	                            $(selector.substring(1)).prepend(data[partial]).trigger('ajaxUpdate', [context, data, textStatus, jqXHR]);
	                        } else {
	                            $(selector).trigger('ajaxBeforeReplace');
	                            $(selector).html(data[partial]).trigger('ajaxUpdate', [context, data, textStatus, jqXHR]);
	                        }
	                    }

	                    /*
	                     * Wait for .html() method to finish rendering from partial updates
	                     */
	                    setTimeout(function () {
	                        $(window).trigger('ajaxUpdateComplete', [context, data, textStatus, jqXHR]).trigger('resize');
	                    }, 0);
	                });

	                /*
	                 * Handle redirect
	                 */
	                if (data['X_OCTOBER_REDIRECT']) {
	                    options.redirect = data['X_OCTOBER_REDIRECT'];
	                    isRedirect = true;
	                }

	                if (isRedirect) window.location.href = options.redirect;

	                /*
	                 * Focus fields with errors
	                 */
	                if (data['X_OCTOBER_ERROR_FIELDS']) {
	                    var isFirstInvalidField = true;
	                    $.each(data['X_OCTOBER_ERROR_FIELDS'], function focusErrorField(fieldName, fieldMessages) {
	                        var fieldElement = form.find('[name="' + fieldName + '"], [name="' + fieldName + '[]"], [name$="[' + fieldName + ']"], [name$="[' + fieldName + '][]"]').filter(':enabled').first();
	                        if (fieldElement.length > 0) {

	                            var _event = jQuery.Event('ajaxInvalidField');
	                            $(window).trigger(_event, [fieldElement.get(0), fieldName, fieldMessages, isFirstInvalidField]);

	                            if (isFirstInvalidField) {
	                                if (!_event.isDefaultPrevented()) fieldElement.focus();
	                                isFirstInvalidField = false;
	                            }
	                        }
	                    });
	                }

	                /*
	                 * Handle asset injection
	                 */
	                if (data['X_OCTOBER_ASSETS']) {
	                    assetManager.load(data['X_OCTOBER_ASSETS'], $.proxy(updatePromise.resolve, updatePromise));
	                } else updatePromise.resolve();

	                return updatePromise;
	            }
	        };

	        /*
	         * Allow default business logic to be called from user functions
	         */
	        context.success = requestOptions.success;
	        context.error = requestOptions.error;
	        context.complete = requestOptions.complete;
	        requestOptions = $.extend(requestOptions, options);

	        requestOptions.data = data.join('&');

	        if (loading) loading.show();

	        $(window).trigger('ajaxBeforeSend', [context]);
	        $el.trigger('ajaxPromise', [context]);
	        return $.ajax(requestOptions).fail(function (jqXHR, textStatus, errorThrown) {
	            if (!isRedirect) {
	                $el.trigger('ajaxFail', [context, textStatus, jqXHR]);
	                if (loading) loading.hide();
	            }
	        }).done(function (data, textStatus, jqXHR) {
	            if (!isRedirect) {
	                $el.trigger('ajaxDone', [context, data, textStatus, jqXHR]);
	                if (loading) loading.hide();
	            }
	        }).always(function (dataOrXhr, textStatus, xhrOrError) {
	            $el.trigger('ajaxAlways', [context, dataOrXhr, textStatus, xhrOrError]);
	        });
	    };

	    Request.DEFAULTS = {
	        update: {},
	        type: 'POST',
	        beforeUpdate: function beforeUpdate(data, textStatus, jqXHR) {},
	        evalBeforeUpdate: null,
	        evalSuccess: null,
	        evalError: null,
	        evalComplete: null
	    };

	    /*
	     * Internal function, build a string of partials and their update elements.
	     */
	    Request.prototype.extractPartials = function (update) {
	        var result = [];

	        for (var partial in update) {
	            result.push(partial);
	        }return result.join('&');
	    };

	    // REQUEST PLUGIN DEFINITION
	    // ============================

	    var old = $.fn.request;

	    $.fn.request = function (handler, option) {
	        var args = arguments;

	        var $this = $(this).first();
	        var data = {
	            evalBeforeUpdate: $this.data('request-before-update'),
	            evalSuccess: $this.data('request-success'),
	            evalError: $this.data('request-error'),
	            evalComplete: $this.data('request-complete'),
	            confirm: $this.data('request-confirm'),
	            redirect: $this.data('request-redirect'),
	            loading: $this.data('request-loading'),
	            update: paramToObj('data-request-update', $this.data('request-update')),
	            data: paramToObj('data-request-data', $this.data('request-data'))
	        };
	        if (!handler) handler = $this.data('request');
	        var options = $.extend(true, {}, Request.DEFAULTS, data, (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);
	        return new Request($this, handler, options);
	    };

	    $.fn.request.Constructor = Request;

	    $.request = function (handler, option) {
	        return $('<form />').request(handler, option);
	    };

	    // REQUEST NO CONFLICT
	    // =================

	    $.fn.request.noConflict = function () {
	        $.fn.request = old;
	        return this;
	    };

	    // REQUEST DATA-API
	    // ==============

	    function paramToObj(name, value) {
	        if (value === undefined) value = '';
	        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') return value;

	        try {
	            return JSON.parse(JSON.stringify(eval("({" + value + "})")));
	        } catch (e) {
	            throw new Error('Error parsing the ' + name + ' attribute value. ' + e);
	        }
	    }

	    $(document).on('change', 'select[data-request], input[type=radio][data-request], input[type=checkbox][data-request]', function documentOnChange() {
	        $(this).request();
	    });

	    $(document).on('click', 'a[data-request], button[data-request], input[type=button][data-request], input[type=submit][data-request]', function documentOnClick() {
	        $(this).request();
	        return false;
	    });

	    $(document).on('keydown', 'input[type=text][data-request], input[type=submit][data-request], input[type=password][data-request]', function documentOnKeydown(e) {
	        if (e.keyCode == 13) {
	            if (this.dataTrackInputTimer !== undefined) window.clearTimeout(this.dataTrackInputTimer);

	            $(this).request();
	            return false;
	        }
	    });

	    $(document).on('keyup', 'input[data-request][data-track-input]', function documentOnKeyup(e) {
	        if (!$(this).is('[type=email],[type=number],[type=password],[type=search],[type=text]')) return;

	        var $el = $(this),
	            lastValue = $el.data('oc.lastvalue');

	        if (lastValue !== undefined && lastValue == this.value) return;

	        $el.data('oc.lastvalue', this.value);

	        if (this.dataTrackInputTimer !== undefined) window.clearTimeout(this.dataTrackInputTimer);

	        var interval = $(this).data('track-input');
	        if (!interval) interval = 300;

	        var self = this;
	        this.dataTrackInputTimer = window.setTimeout(function () {
	            $(self).request();
	        }, interval);
	    });

	    $(document).on('submit', '[data-request]', function documentOnsubmit() {
	        $(this).request();
	        return false;
	    });

	    $(window).on('beforeunload', function documentOnBeforeunload() {
	        window.ocUnloading = true;
	    });

	    /*
	     * Invent our own event that unifies document.ready with window.ajaxUpdateComplete
	     *
	     * $(document).render(function() { })
	     * $(document).on('render', function(){ })
	     */

	    $(document).ready(function triggerRenderOnReady() {
	        $(document).trigger('render');
	    });

	    $(window).on('ajaxUpdateComplete', function triggerRenderOnAjaxUpdateComplete() {
	        $(document).trigger('render');
	    });

	    $.fn.render = function (callback) {
	        $(document).on('render', callback);
	    };
	}(jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-05-20T17:23Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}

			return key === undefined || hasOwn.call( obj, key );
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

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
	    init: function init() {},

	    /**
	     * Push new state to url using HistoryAPI.
	     *
	     */
	    updateState: function updateState(query) {}
	  };

	  VintSearch = function () {
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
	      INPUT_ID: 'search'
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
	      REQUEST_UPDATE_VALUE: '"search/tab-todos": "#tab-todos", "search/tab-membros": "#tab-membros", "search/tab-programas": "#tab-programas", "search/tab-projetos": "#tab-projetos", "search/tab-publicacoes": "#tab-publicacoes"'
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
	    var _getInput = function _getInput() {
	      var selector = 'input[name="' + _constants.INPUT_NAME + '"]#' + _constants.INPUT_ID;
	      var input = document.querySelector(selector);
	      return input;
	    };

	    /**
	     * Get the form of _input element.
	     * 
	     * @return {HTMLElement}
	     */
	    var _getForm = function _getForm() {
	      var selector = 'form.' + _cssClasses.FORM;
	      var form = document.querySelector(selector);
	      return form;
	    };

	    /**
	     * Create a new asynchronous request.
	     * 
	     * @private
	     */
	    var _sendAjaxRequest = function _sendAjaxRequest() {
	      // Assumes that jQuery ($) object is available globally.
	      $(_input).request(_datasets.REQUEST_VALUE);
	    };

	    /**
	     * Handle the search by URL and call ajax request if necessary.
	     * 
	     * @private
	     */
	    var _searchByUrl = function _searchByUrl() {
	      var onPopState = function onPopState(event) {
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

	      window.addEventListener('popstate', onPopState.bind(this));
	    };

	    /**
	     * Initialize the instance.
	     *
	     */
	    var _init = function _init() {
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
	    var _setFormDatasets = function _setFormDatasets() {
	      _form.dataset[_datasets.REQUEST_CAMEL] = _datasets.REQUEST_VALUE;
	      _form.dataset[_datasets.REQUEST_LOADING_CAMEL] = _datasets.REQUEST_LOADING_VALUE;
	      _form.dataset[_datasets.REQUEST_UPDATE_CAMEL] = _datasets.REQUEST_UPDATE_VALUE;
	    };

	    /**
	     * Defines the input required datasets by the framework
	     * 
	     * @return   
	     */
	    var _setInputDatasets = function _setInputDatasets() {
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
	    var _updateState = function _updateState(query) {
	      var oldUrl = window.location.href;
	      var baseUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
	      var paramUri = encodeURIComponent(query);
	      var updatedUrl = baseUrl + '?q=' + paramUri;
	      if (query) {
	        if (updatedUrl !== oldUrl) {
	          history.pushState({ path: updatedUrl }, '', updatedUrl);
	        }
	      } else {
	        history.pushState('', '', baseUrl);
	      }
	    };

	    // Now return the functions that should be made public with their publicly
	    // facing names...
	    return {
	      init: _init,
	      updateState: _updateState
	    };
	  }();

	  window['VintSearch'] = VintSearch;

	  window.addEventListener('load', function () {
	    VintSearch.init();
	  });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

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
	    init: function init() {}
	  };

	  Searchable = function () {
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
	      SEARCH_ITEM_CAMEL: 'searchItem'
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
	    var _register = function _register(target, input, list) {
	      // All searchable items of the list
	      var listItems = list.querySelectorAll('[data-' + _jsDatasets.SEARCH_ITEM + ']');
	      var item = {
	        'target': target,
	        'input': input,
	        'list': list,
	        'items': listItems
	      };
	      _registeredLists[_registeredLists.length] = item;
	    };

	    /**
	     * Register all searchable lists storing it in _registeredLists object.
	     * 
	     * @private
	     */
	    var _registerAll = function _registerAll() {
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
	    var _hideListItem = function _hideListItem(item) {
	      item.style.display = 'none';
	    };

	    /**
	     * Shows an especific item of the searchable list.
	     * 
	     * @param {HTMLElement}
	     * @private
	     */
	    var _showListItem = function _showListItem(item) {
	      item.style.display = '';
	    };

	    /**
	     * Set behavior of registered list on search.
	     * 
	     * @param {Searchable.ListConfig}
	     * @private
	     */
	    var _onSearch = function _onSearch(registeredList) {
	      var query = /** @type {string} */registeredList.input.value;
	      var value /** @type {string} */;
	      var match /** @type {boolean} */;
	      for (var i = 0; i < registeredList.items.length; i++) {
	        // The value for search
	        value = registeredList.items[i].dataset[_jsDatasets.SEARCH_ITEM_CAMEL];

	        if (!value) continue;
	        // Check if query match with value of item
	        match = value.toLowerCase().indexOf(query.toLowerCase().trim()) !== -1;

	        if (!match) {
	          // Does not match the search
	          _hideListItem(registeredList.items[i]);
	        } else {
	          _showListItem(registeredList.items[i]);
	        }
	      }
	    };

	    /**
	     * Set events of searchable lists.
	     * 
	     * @private
	     */
	    var _setEvents = function _setEvents() {
	      for (var i = 0; i < _registeredLists.length; i++) {
	        _registeredLists[i].input.addEventListener('keyup', function (registeredList) {
	          return function () {
	            _onSearch(registeredList);
	          };
	        }(_registeredLists[i]));
	      }
	    };

	    /**
	     * Initializes all searchable lists present in the DOM.
	     * 
	     * @private
	     */
	    var _init = function _init() {
	      _registerAll();
	      _setEvents();
	    };

	    // Now return the functions that should be made public with their publicly
	    // facing names...
	    return {
	      init: _init
	    };
	  }();

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

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
	  register: function register(config) {},

	  /**
	   * Upgrade all registered forms.
	   *
	   */
	  upgradeAllRegistered: function upgradeAllRegistered() {}
	};

	formHandler = function () {
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
	  var camelCase = function camelCase(str) {
	    return str.replace(/-([a-z])/g, function (g) {
	      return g[1].toUpperCase();
	    });
	  };

	  /** @type {!Array<formHandler.FormConfig>} */
	  var registeredForms_ = [];

	  /**
	   * Defines if window must redirect after save data.
	   *
	   * @type {boolean} 
	   */
	  var mustRedirect = false;

	  var register_ = function register_(config) {
	    var newConfig = {
	      ClassConstructor: config.constructor || config['constructor'],
	      className: config.classAsString || config['classAsString'],
	      cssClass: config.cssClass || config['cssClass'],
	      maintenance: config.maintenance || config['maintenance'],
	      createName: config.createName || config['createName'],
	      updateName: config.updateName || config['updateName']
	    };

	    registeredForms_.forEach(function (item) {
	      if (item.cssClass === newConfig.cssClass) {
	        throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
	      }
	    });

	    registeredForms_.push(newConfig);
	  };

	  /**
	   * Upgrade all registered forms in the document DOM
	   * 
	   */
	  var upgradeAllRegistered_ = function upgradeAllRegistered_() {
	    for (var i = 0; i < registeredForms_.length; i++) {
	      upgradeClass_(registeredForms_[i]);
	    }
	  };

	  /**
	   * Initialize the instance of the registered form for each cssClass
	   * 
	   */
	  var upgradeClass_ = function upgradeClass_(registeredForm) {
	    // All elements with the same registerd cssClass
	    var formElements = document.querySelectorAll('.' + registeredForm.cssClass);
	    var form /** @type {HTMLElement} */;
	    var instance /** @type {function} */;
	    var isMaintenance /** @type {boolean} */;

	    for (var i = 0; i < formElements.length; i++) {
	      form = formElements[i];
	      isMaintenance = registeredForm.maintenance ? true : false;
	      formEssentials_(registeredForm.ClassConstructor, isMaintenance);
	      if (isMaintenance) {
	        var isCreate = form.getAttribute('name') === registeredForm.createName;
	        var isUpdate = isCreate ? false : form.getAttribute('name') === registeredForm.updateName;
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
	  var formEssentials_ = function formEssentials_(ClassConstructor, isMaintenance) {

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
	        var notIgnoreds = /** @type {string} */'';
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
	          var referredFieldName = /** @type {string} */errorElements[i].parentNode.dataset[camelCase(jsDatasets.FIELD_FOR)];
	          this._defaultErrorMessages[referredFieldName] = errorElements[i].textContent;
	        }
	      }
	      // Get all field outers that is invalid
	      var invalidOuters = this._form.querySelectorAll('[data-' + jsDatasets.FIELD_FOR + '].' + cssClasses.IS_INVALID);

	      for (var i = 0; i < invalidOuters.length; i++) {
	        var errorElement = invalidOuters[i].querySelector('[data-' + jsDatasets.FIELD_ERROR + ']');
	        var fieldName = /** @type {string} */invalidOuters[i].dataset[camelCase(jsDatasets.FIELD_FOR)];
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
	      var onFocus = function onFocus(outer) {
	        outer.classList.add(cssClasses.IS_FOCUSED);
	      };
	      var onBlur = function onBlur(outer) {
	        outer.classList.remove(cssClasses.IS_FOCUSED);
	      };

	      for (var field in this.fields) {
	        var outer = this._form.querySelector('[data-' + jsDatasets.FIELD_FOR + '="' + field + '"]');
	        if (!outer) continue;
	        this.fields[field].addEventListener('focus', function (outer) {
	          return function () {
	            onFocus(outer);
	          };
	        }(outer));
	        this.fields[field].addEventListener('blur', function (outer) {
	          return function () {
	            onBlur(outer);
	          };
	        }(outer));
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
	            actionHandler: function actionHandler() {
	              window.location.href = constants.LOCATION_LOGIN;
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
	              actionHandler: function actionHandler() {
	                window.location.href = newLocation;
	              },
	              actionText: 'Ver'
	            };
	          }
	        }
	        mustRedirect = newLocation ? this._isCreate && this._created || newLocation !== currentLocation : false;
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
	        mustRedirect = newLocation ? true : false;

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

	      if (this._isCreate && !this._created || !mustRedirect) {
	        this.ableActions();
	      }
	    };

	    /**
	     * Validates a file based on input, their required rules and referred messages 
	     *  
	     * @return {object}
	     * @private
	     */
	    ClassConstructor.prototype._filePatterns = function () {
	      return {
	        make: function make(inputs, rules, messages) {
	          var _fails = false;
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
	            _fails = true;
	          }
	          return {
	            fails: function fails() {
	              return _fails;
	            },
	            errors: errors
	          };
	        },
	        extend: function extend(rule, attribute, value, parameters) {
	          var ruleCamelCase = rule.replace(/_([a-z])/g, function (g) {
	            return g[1].toUpperCase();
	          });
	          var camelCased = ruleCamelCase.charAt(0).toUpperCase() + ruleCamelCase.slice(1);
	          var func = 'rule' + camelCased;
	          return this[func](attribute, value, parameters);
	        },
	        ruleMaxSize: function ruleMaxSize(attribute, value, parameters) {
	          var megabyte = 1024 * 1024;
	          if (value.size / megabyte > parameters) return false;
	          return true;
	        },
	        ruleImage: function ruleImage(attribute, value, parameters) {
	          var imageType = /^image\//;
	          if (parameters == true) {
	            if (imageType.test(value.type)) {
	              return true;
	            }
	          }
	          return false;
	        },
	        ruleExtension: function ruleExtension(attribute, value, parameters) {
	          var extension = value.name.split('.').pop().toLowerCase(); //file extension from input file
	          var isSuccess = parameters.indexOf(extension) > -1; //is extension in acceptable types
	          return isSuccess;
	        },
	        ruleMimes: function ruleMimes(attribute, value, parameters) {
	          var parametersLength = parameters.length;
	          var imageMime = value.type;
	          for (var j = 0; j < parametersLength; j++) {
	            var expected = 'image/' + parameters[j];
	            if (imageMime == expected) return true;
	          }
	          return false;
	        }
	      };
	    }();
	  };

	  // Now return the functions that should be made public with their publicly
	  // facing names...
	  return {
	    register: register_,
	    upgradeAllRegistered: upgradeAllRegistered_
	  };
	}();

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
	formHandler.FormConfigPublic; // jshint ignore:line

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
	formHandler.FormConfigPrivate_; // jshint ignore:line

	window['formHandler'] = formHandler;

	window.addEventListener('load', function () {
	  // Upgrade all registered forms after page loaded
	  formHandler.upgradeAllRegistered();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * VintProfilePersonal - A handler to Vint Profile Personal form.
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

	  var VintProfilePersonal = function VintProfilePersonal(form) {
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
	    AVATAR_UPLOAD_BUTTON: 'vint-avatar-upload__button'
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
	  VintProfilePersonal.prototype._setFields = function () {};

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
	  VintProfilePersonal.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintProfilePersonal.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintProfilePersonal.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintProfilePersonal.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintProfilePersonal.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintProfilePersonal.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintProfilePersonal.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintProfilePersonal.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintProfilePersonal.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintProfilePersonal.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintProfilePersonal.prototype._checkRequiredFields = function () {};

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
	  VintProfilePersonal.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintProfilePersonal.prototype._patterns = function () {
	    // input[type=file] pattern
	    var addPhotoButton = this._form.querySelector('.' + this._cssClasses.AVATAR_UPLOAD_BUTTON);
	    var onAddPhoto = function onAddPhoto(event) {
	      event.preventDefault();
	      // Simulates a click on input[type=file][name=avatar]
	      // when add photo button is clicked
	      this.fields.avatar.click();
	    };
	    var onChangePhoto = function onChangePhoto(event) {
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
	  VintProfilePersonal.prototype._displayAvatar = function (file) {
	    var thumb = this._form.querySelector('.' + this._cssClasses.AVATAR_UPLOAD_THUMB);
	    var onLoadEndFile = function onLoadEndFile(event) {
	      thumb.style.backgroundImage = 'url(' + fileReader.result + ')';
	    };
	    var fileReader = new FileReader();

	    if (file) {
	      fileReader.readAsDataURL(file);
	    }
	    fileReader.addEventListener('loadend', onLoadEndFile.bind(this));
	  };

	  /**
	   * Check if the files that comes from input[type=file][name=avatar]
	   * is a valid image to be the avatar 
	   * 
	   * @param {FileList}
	   * @return {boolean}
	   * @private
	   */
	  VintProfilePersonal.prototype._avatarPattern = function (fileList) {
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
	  };

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
	  VintProfilePersonal.prototype._processResponse = function (response) {
	    var message /** @type {string} */;

	    if (response.hasOwnProperty(this._constants.RESPONSE_BAD_REQUEST) && response[this._constants.RESPONSE_BAD_REQUEST]) {
	      // Bad request was identified by server.
	      message = this._constants.MESSAGE_BAD_REQUEST;
	      this.toast({
	        message: message
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
	  VintProfilePersonal.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onComplete = function onComplete() {
	      this.ableSubmit();
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this)
	    };
	  };

	  /**
	   * Defines the options to send a file to server with XMLHttpRequest (ajax)
	   * 
	   * @return {object}
	   * @private
	   */
	  VintProfilePersonal.prototype._getUploadRequestOptions = function (formData) {
	    var requestHandler = this._constants.REQUEST_HANDLER_UPLOAD;
	    var headerHandler = this._constants.OCTOBER_REQUEST_HANDLER;
	    var headers = {};
	    headers[headerHandler] = requestHandler;
	    var onSuccess = function onSuccess(response) {
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
	    var onComplete = function onComplete() {
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
	      complete: onComplete.bind(this)
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
	  VintProfilePersonal.prototype._sendAjaxRequestUpload = function (requestHandler, requestOptions) {
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
	  VintProfilePersonal.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
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
	  VintProfilePersonal.prototype.init = function () {
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
	    cssClass: 'vint-form--profile-personal'
	  });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintProfileAcademic - A handler to Vint Profile Academic form.
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

	  var VintProfileAcademic = function VintProfileAcademic(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintProfileAcademic.prototype._constants = {
	    REQUEST_HANDLER: 'profileAcademic::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
	    RESPONSE_FATAL_ERROR: 'fatalError',
	    RESPONSE_BAD_REQUEST: 'badRequest',
	    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
	    MESSAGE_UPDATED: 'Suas informações acadêmicas foram atualizadas'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintProfileAcademic.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintProfileAcademic.prototype._requiredFields = ['curso', 'titulacao'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintProfileAcademic.prototype._defaultErrorMessages = {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintProfileAcademic.prototype._filePatterns = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintProfileAcademic.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintProfileAcademic.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintProfileAcademic.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintProfileAcademic.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintProfileAcademic.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintProfileAcademic.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintProfileAcademic.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintProfileAcademic.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintProfileAcademic.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintProfileAcademic.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintProfileAcademic.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintProfileAcademic.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintProfileAcademic.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintProfileAcademic.prototype._checkRequiredFields = function () {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintProfileAcademic.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintProfileAcademic.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintProfileAcademic.prototype._patterns = function () {
	    var onChangeTitulacao = function onChangeTitulacao(event) {
	      if (this.fields['titulacao'].value) {
	        this.fields['titulacao-estado'].parentNode.MaterialSwitch.enable();
	      } else {
	        this.fields['titulacao-estado'].parentNode.MaterialSwitch.disable();
	      }
	    };
	    this.fields['titulacao'].addEventListener('change', onChangeTitulacao.bind(this));
	  };

	  /**
	   * Handle the XMLHttpRequest (ajax) response
	   * 
	   * @param {object} - The response that comes from server
	   * @return {undefined}
	   * @private
	   */
	  VintProfileAcademic.prototype._processResponse = function (response) {

	    if (response.hasOwnProperty(this._constants.RESPONSE_BAD_REQUEST) && response[this._constants.RESPONSE_BAD_REQUEST]) {
	      // Bad request was identified by server.
	      message = this._constants.MESSAGE_BAD_REQUEST;
	      this.toast({
	        message: message
	      });
	      return;
	    }

	    if (!response.hasOwnProperty(this._constants.RESPONSE_SUCCESS)) return;

	    if (response[this._constants.RESPONSE_SUCCESS]) {
	      var message = this._constants.MESSAGE_UPDATED;
	      this.disableSubmit();
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
	  VintProfileAcademic.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onComplete = function onComplete() {
	      this.ableSubmit();
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintProfileAcademic.prototype._formEvents = function () {
	    var valid; /** @type {boolean} */
	    var formOnSubmit = function formOnSubmit(event) {
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
	  VintProfileAcademic.prototype.init = function () {
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
	    constructor: VintProfileAcademic,
	    classAsString: 'VintProfileAcademic',
	    cssClass: 'vint-form--profile-academic'
	  });
	})();

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintProfileGroup - A handler to Vint Profile Group form.
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

	  var VintProfileGroup = function VintProfileGroup(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintProfileGroup.prototype._constants = {
	    REQUEST_HANDLER: 'profileGroup::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
	    RESPONSE_BAD_REQUEST: 'badRequest',
	    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
	    MESSAGE_UPDATED: 'Suas informações no grupo foram atualizadas'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintProfileGroup.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintProfileGroup.prototype._requiredFields = ['tipo', 'entrada'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintProfileGroup.prototype._defaultErrorMessages = {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintProfileGroup.prototype._filePatterns = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintProfileGroup.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintProfileGroup.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintProfileGroup.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintProfileGroup.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintProfileGroup.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintProfileGroup.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintProfileGroup.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintProfileGroup.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintProfileGroup.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintProfileGroup.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintProfileGroup.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintProfileGroup.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintProfileGroup.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintProfileGroup.prototype._checkRequiredFields = function () {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintProfileGroup.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintProfileGroup.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintProfileGroup.prototype._patterns = function () {
	    // input[name=ativo] pattern
	    var onChangeAtivo = function onChangeAtivo(event) {
	      if (this.fields.ativo.checked) {
	        // Case input[name=ativo] is checked, the input[name=saida] is not required
	        // and remove it from _requiredFields array.
	        if (this._requiredFields.indexOf('saida') !== -1) {
	          this._requiredFields.splice(this._requiredFields.indexOf('saida'), 1);
	        }
	        this.fields.saida.setAttribute('disabled', '');
	      } else {
	        // Case input[name=ativo] is checked, the input[name=saida] is required
	        // and add it to _requiredFields array.
	        this._requiredFields[this._requiredFields.length] = 'saida';
	        this.fields.saida.removeAttribute('disabled');
	      }
	    };
	    this.fields.ativo.addEventListener('change', onChangeAtivo.bind(this));
	  };

	  /**
	   * Handle the XMLHttpRequest (ajax) response
	   * 
	   * @param {object} - The response that comes from server
	   * @return {undefined}
	   * @private
	   */
	  VintProfileGroup.prototype._processResponse = function (response) {

	    if (response.hasOwnProperty(this._constants.RESPONSE_BAD_REQUEST) && response[this._constants.RESPONSE_BAD_REQUEST]) {
	      // Bad request was identified by server.
	      message = this._constants.MESSAGE_BAD_REQUEST;
	      this.toast({
	        message: message
	      });
	      return;
	    }

	    if (!response.hasOwnProperty(this._constants.RESPONSE_SUCCESS)) return;

	    if (response[this._constants.RESPONSE_SUCCESS]) {
	      var message = this._constants.MESSAGE_UPDATED;
	      this.disableSubmit();
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
	  VintProfileGroup.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onComplete = function onComplete() {
	      this.ableSubmit();
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintProfileGroup.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
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
	  VintProfileGroup.prototype.init = function () {
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
	    constructor: VintProfileGroup,
	    classAsString: 'VintProfileGroup',
	    cssClass: 'vint-form--profile-group'
	  });
	})();

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintSettingsEmail - A handler to Vint Vint Settings Email form.
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

	  var VintSettingsEmail = function VintSettingsEmail(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintSettingsEmail.prototype._constants = {
	    REQUEST_HANDLER: 'settingsEmail::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
	    RESPONSE_BAD_REQUEST: 'badRequest',
	    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
	    MESSAGE_UPDATED: 'As configurações de e-mail foram atualizadas'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintSettingsEmail.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintSettingsEmail.prototype._requiredFields = [];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintSettingsEmail.prototype._defaultErrorMessages = {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintSettingsEmail.prototype._filePatterns = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintSettingsEmail.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintSettingsEmail.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintSettingsEmail.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintSettingsEmail.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintSettingsEmail.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintSettingsEmail.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintSettingsEmail.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintSettingsEmail.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintSettingsEmail.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintSettingsEmail.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintSettingsEmail.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintSettingsEmail.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintSettingsEmail.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintSettingsEmail.prototype._checkRequiredFields = function () {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintSettingsEmail.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintSettingsEmail.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintSettingsEmail.prototype._patterns = function () {};

	  /**
	   * Handle the XMLHttpRequest (ajax) response
	   * 
	   * @param {object} - The response that comes from server
	   * @return {undefined}
	   * @private
	   */
	  VintSettingsEmail.prototype._processResponse = function (response) {
	    var message /** @type {string} */;

	    if (response.hasOwnProperty(this._constants.RESPONSE_BAD_REQUEST) && response[this._constants.RESPONSE_BAD_REQUEST]) {
	      // Bad request was identified by server.
	      message = this._constants.MESSAGE_BAD_REQUEST;
	      this.toast({
	        message: message
	      });
	      return;
	    }

	    if (!response.hasOwnProperty(this._constants.RESPONSE_SUCCESS)) return;

	    if (response[this._constants.RESPONSE_SUCCESS]) {
	      message = this._constants.MESSAGE_UPDATED;
	      this.disableSubmit();
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
	  VintSettingsEmail.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onComplete = function onComplete() {
	      this.ableSubmit();
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintSettingsEmail.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
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
	  VintSettingsEmail.prototype.init = function () {
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
	    constructor: VintSettingsEmail,
	    classAsString: 'VintSettingsEmail',
	    cssClass: 'vint-form--settings-email'
	  });
	})();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

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

	  var VintSettingsAccount = function VintSettingsAccount(form) {
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
	  VintSettingsAccount.prototype._setFields = function () {};

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
	  VintSettingsAccount.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintSettingsAccount.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintSettingsAccount.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintSettingsAccount.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintSettingsAccount.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintSettingsAccount.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintSettingsAccount.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintSettingsAccount.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintSettingsAccount.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintSettingsAccount.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintSettingsAccount.prototype._checkRequiredFields = function () {};

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
	  VintSettingsAccount.prototype.resetValues = function () {};

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
	    var onKeypressUsername = function onKeypressUsername(event) {
	      // Prevent the 'space' on username
	      if (event.keyCode === 32) event.preventDefault();
	    };
	    var onKeyupUsername = function onKeyupUsername(event) {
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
	        message: message
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
	    var onSuccess = function onSuccess(response) {
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
	    var onComplete = function onComplete() {
	      if (!this._updated) this.ableSubmit();
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintSettingsAccount.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
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
	    cssClass: 'vint-form--settings-account'
	  });
	})();

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintSettingsSecurity - A handler to Vint Vint Settings Security form.
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

	  var VintSettingsSecurity = function VintSettingsSecurity(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintSettingsSecurity.prototype._constants = {
	    REQUEST_HANDLER: 'settingsSecurity::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
	    RESPONSE_BAD_REQUEST: 'badRequest',
	    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
	    MESSAGE_UPDATED: 'As configurações de segurança foram atualizadas'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintSettingsSecurity.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintSettingsSecurity.prototype._requiredFields = ['old_senha', 'new_senha', 'new_senha_confirmation'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintSettingsSecurity.prototype._defaultErrorMessages = {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintSettingsSecurity.prototype._filePatterns = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintSettingsSecurity.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintSettingsSecurity.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintSettingsSecurity.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintSettingsSecurity.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintSettingsSecurity.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintSettingsSecurity.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintSettingsSecurity.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintSettingsSecurity.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintSettingsSecurity.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintSettingsSecurity.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintSettingsSecurity.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintSettingsSecurity.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintSettingsSecurity.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintSettingsSecurity.prototype._checkRequiredFields = function () {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintSettingsSecurity.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintSettingsSecurity.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintSettingsSecurity.prototype._patterns = function () {};

	  /**
	   * Handle the XMLHttpRequest (ajax) response
	   * 
	   * @param {object} - The response that comes from server
	   * @return {undefined}
	   * @private
	   */
	  VintSettingsSecurity.prototype._processResponse = function (response) {
	    var message /** @type {string} */;

	    if (response.hasOwnProperty(this._constants.RESPONSE_BAD_REQUEST) && response[this._constants.RESPONSE_BAD_REQUEST]) {
	      // Bad request was identified by server.
	      message = this._constants.MESSAGE_BAD_REQUEST;
	      this.toast({
	        message: message
	      });
	      return;
	    }

	    if (!response.hasOwnProperty(this._constants.RESPONSE_SUCCESS)) return;

	    if (response[this._constants.RESPONSE_SUCCESS]) {
	      message = this._constants.MESSAGE_UPDATED;
	      this.disableSubmit();
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
	  VintSettingsSecurity.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onComplete = function onComplete() {
	      this.ableSubmit();
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintSettingsSecurity.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
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
	  VintSettingsSecurity.prototype.init = function () {
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
	    constructor: VintSettingsSecurity,
	    classAsString: 'VintSettingsSecurity',
	    cssClass: 'vint-form--settings-security'
	  });
	})();

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintSettingsDelete - A handler to Vint Settings Delete form.
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

	  var VintSettingsDelete = function VintSettingsDelete(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintSettingsDelete.prototype._constants = {
	    REQUEST_HANDLER: 'membroDisable::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
	    MESSAGE_UPDATED: 'Sua conta foi desativada',
	    RESPONSE_BAD_REQUEST: 'badRequest',
	    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintSettingsDelete.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintSettingsDelete.prototype._requiredFields = ['password'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintSettingsDelete.prototype._defaultErrorMessages = {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintSettingsDelete.prototype._filePatterns = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintSettingsDelete.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintSettingsDelete.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintSettingsDelete.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintSettingsDelete.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintSettingsDelete.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintSettingsDelete.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintSettingsDelete.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintSettingsDelete.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintSettingsDelete.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintSettingsDelete.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintSettingsDelete.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintSettingsDelete.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintSettingsDelete.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintSettingsDelete.prototype._checkRequiredFields = function () {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintSettingsDelete.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintSettingsDelete.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintSettingsDelete.prototype._patterns = function () {};

	  /**
	   * Handle the XMLHttpRequest (ajax) response
	   * 
	   * @param {object} - The response that comes from server
	   * @return {undefined}
	   * @private
	   */
	  VintSettingsDelete.prototype._processResponse = function (response) {
	    var message /** @type {string} */;

	    if (response.hasOwnProperty(this._constants.RESPONSE_BAD_REQUEST) && response[this._constants.RESPONSE_BAD_REQUEST]) {
	      // Bad request was identified by server.
	      message = this._constants.MESSAGE_BAD_REQUEST;
	      this.toast({
	        message: message
	      });
	      return;
	    }

	    if (!response.hasOwnProperty(this._constants.RESPONSE_SUCCESS)) return;

	    if (response[this._constants.RESPONSE_SUCCESS]) {
	      message = this._constants.MESSAGE_UPDATED;
	      this.disableSubmit();
	      this.toast({
	        message: message
	      });
	      window.location.href = response[this._constants.RESPONSE_LOCATION] || '/';
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
	  VintSettingsDelete.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onComplete = function onComplete() {
	      this.ableSubmit();
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintSettingsDelete.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
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
	  VintSettingsDelete.prototype.init = function () {
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
	    constructor: VintSettingsDelete,
	    classAsString: 'VintSettingsDelete',
	    cssClass: 'vint-form--settings-delete'
	  });
	})();

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintMembro - A handler to Vint Membro form.
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

	  var VintMembro = function VintMembro(form, isCreate, isUpdate) {
	    this._form = form;
	    this._isCreate = isCreate;
	    this._isUpdate = isUpdate;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories messages.
	   * 
	   * @private
	   */
	  VintMembro.prototype._messages = {
	    CREATED: 'O membro foi convidado',
	    UPDATED: 'O membro foi atualizado'
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintMembro.prototype._constants = {
	    REQUEST_HANDLER_CREATE: 'membroCreate::onRequest',
	    REQUEST_HANDLER_UPDATE: 'membroUpdate::onRequest'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintMembro.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintMembro.prototype._requiredFields = ['nome', 'email', 'tipo'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintMembro.prototype._defaultErrorMessages = {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintMembro.prototype._filePatterns = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintMembro.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintMembro.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintMembro.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintMembro.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintMembro.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintMembro.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintMembro.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintMembro.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintMembro.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintMembro.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintMembro.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintMembro.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintMembro.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintMembro.prototype._checkRequiredFields = function () {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintMembro.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintMembro.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintMembro.prototype._patterns = function () {
	    var onChangeAtivo = function onChangeAtivo(event) {
	      // input[name=saida] is required.
	      if (!this.fields['saida']) return;

	      if (event.target.checked) {
	        this.fields['saida'].setAttribute('disabled', '');
	      } else {
	        this.fields['saida'].removeAttribute('disabled');
	      }
	    };

	    if (this.fields['ativo']) {
	      this.fields['ativo'].addEventListener('change', onChangeAtivo.bind(this));
	    }
	  };

	  /**
	   * Defines the options to send for server with XMLHttpRequest (ajax)
	   * 
	   * @return {object}
	   * @private
	   */
	  VintMembro.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponseSuccess(response);
	    };
	    var onComplete = function onComplete() {

	      if (this._isCreate && this._created) {
	        // Clear all fields.
	        this.resetValues();
	      }
	      this.ableActions();
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintMembro.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
	      var requestHandler /** @type {string} */;
	      var requestOptions /** @type {string} */;
	      event.preventDefault();
	      valid = this._checkRequiredFields();
	      requestOptions = this._getDefaultRequestOptions();

	      if (this._isCreate) {
	        requestHandler = this._constants.REQUEST_HANDLER_CREATE;
	      } else if (this._isUpdate) {
	        requestHandler = this._constants.REQUEST_HANDLER_UPDATE;
	      }

	      if (!valid) return false;
	      this.disableActions();
	      this._sendAjaxRequest(requestHandler, requestOptions);
	    };

	    this._form.addEventListener('submit', formOnSubmit.bind(this));
	  };

	  /**
	   * Initialize the instance
	   * 
	   */
	  VintMembro.prototype.init = function () {
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
	    constructor: VintMembro,
	    classAsString: 'VintMembro',
	    cssClass: 'vint-form--membro',
	    maintenance: true,
	    createName: 'membro-create',
	    updateName: 'membro-update'
	  });
	})();

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

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

	  var VintPrograma = function VintPrograma(form, isCreate, isUpdate) {
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
	    UPDATED: 'O programa foi atualizado'
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintPrograma.prototype._constants = {
	    CREATE_REQUEST_HANDLER: 'programaCreate::onRequest',
	    UPDATE_REQUEST_HANDLER: 'programaUpdate::onRequest',
	    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER'
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
	  VintPrograma.prototype._setFields = function () {};

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
	  VintPrograma.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintPrograma.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintPrograma.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintPrograma.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintPrograma.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintPrograma.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintPrograma.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintPrograma.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintPrograma.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintPrograma.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Displays a MDL snackbar. 
	  * 
	  * @param {object} data Snackbar options
	  * @param {string} data.message
	  * @param {number} data.timeout 
	  * @param {function} data.actionHandler 
	  * @param {string} data.actionText 
	  */
	  VintPrograma.prototype.toast = function (data) {};

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
	  VintPrograma.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintPrograma.prototype._patterns = function () {
	    // Fields_[fim] pattern
	    var estadoOnChange = function estadoOnChange(event) {
	      switch (this.fields.estado.value) {
	        case 'andamento':
	          {
	            this.fields.fim.setAttribute('disabled', '');
	            break;
	          }
	        case 'finalizado':
	          {
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
	    var onSuccess = function onSuccess(response) {
	      this._processResponseSuccess(response);
	    };
	    var onComplete = function onComplete() {
	      this._processResponseComplete();
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
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
	    var formOnSubmit = function formOnSubmit(event) {
	      event.preventDefault();
	      valid = this._checkRequiredFields();

	      if (!valid) return false;
	      this.disableActions();
	      var requestHandler;
	      var requestOptions;

	      switch (action) {
	        case 'create':
	          {
	            requestHandler = this._constants.CREATE_REQUEST_HANDLER;
	            requestOptions = this._getDefaultRequestOptions();
	            break;
	          }
	        case 'update':
	          {
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
	      var action = this._isCreate ? 'create' : this._isUpdate ? 'update' : false;
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
	    updateName: 'programa-update'
	  });
	})();

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

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

	  var VintProjeto = function VintProjeto(form, isCreate, isUpdate) {
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
	    UPDATED: 'O projeto foi atualizado'
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
	    MESSAGE_NO_PROGRAMA_SELECTED: 'Selecione o programa do projeto'
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
	    STEP: 'mdl-step'
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
	  VintProjeto.prototype._setFields = function () {};

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
	  VintProjeto.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintProjeto.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintProjeto.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintProjeto.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintProjeto.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintProjeto.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintProjeto.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintProjeto.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintProjeto.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintProjeto.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Displays a MDL snackbar. 
	  * 
	  * @param {object} data Snackbar options
	  * @param {string} data.message
	  * @param {number} data.timeout 
	  * @param {function} data.actionHandler 
	  * @param {string} data.actionText 
	  */
	  VintProjeto.prototype.toast = function (data) {};

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
	  VintProjeto.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintProjeto.prototype._patterns = function () {
	    // Fields_[fim] pattern
	    var estadoOnChange = function estadoOnChange(event) {
	      switch (this.fields.estado.value) {
	        case 'andamento':
	        case 'agendado':
	          {
	            // The input[name=fim] is not required
	            // and remove it from _requiredFields array.
	            if (this._requiredFields.indexOf('fim') !== -1) {
	              this._requiredFields.splice(this._requiredFields.indexOf('fim'), 1);
	            }
	            this.fields.fim.setAttribute('disabled', '');
	            break;
	          }
	        case 'finalizado':
	          {
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
	      var onDeleteChip = function onDeleteChip(event) {
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
	      this.fields.programa[i].addEventListener('change', function (field) {
	        return function () {
	          onChangePrograma(field);
	        }.bind(this);
	      }.bind(this)(this.fields.programa[i]));
	    }

	    // [name='membros[]'] patterns
	    var onChangeMembros = function (field) {
	      // Get the related chip of input.
	      // Searching by [data-input-value="fieldValue"]
	      var chipCssSelector = '.' + this._cssClasses.CHIP + '[data-' + this._jsDatasets.CHIP_INPUT_VALUE + '="' + field.value + '"]';
	      var chipElement = document.querySelector(chipCssSelector);
	      var onDeleteChip = function onDeleteChip(event) {
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
	      this.fields['membros[]'][i].addEventListener('change', function (field) {
	        return function () {
	          onChangeMembros(field);
	        }.bind(this);
	      }.bind(this)(this.fields['membros[]'][i]));
	    }
	  };

	  /**
	   * Defines the options to send for server with XMLHttpRequest (ajax)
	   * 
	   * @return {object}
	   * @private
	   */
	  VintProjeto.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
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
	    var onComplete = function onComplete() {
	      this._processResponseComplete();
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	      this._stepperComponent.error();
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @param {string | boolean} - the form action ('update' | 'create' | false)
	   * @private
	   */
	  VintProjeto.prototype._formEvents = function (action) {};

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
	    var onStepsCancel = function onStepsCancel(event) {
	      window.location.href = this._constants.ON_STEP_CANCEL_LOCATION;
	    };
	    // On clicks on [data-step-skip] button
	    var onStepsSkip = function onStepsSkip(event) {
	      this._stepperComponent.skip();
	    };
	    // On clicks on [data-step-next] button of step 'membros'
	    var onStepNextMembros = function onStepNextMembros(event) {
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
	    var onStepNextPrograma = function onStepNextPrograma(event) {
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
	    var onStepNextFields = function onStepNextFields(event) {
	      valid = this._checkRequiredFields();
	      if (valid) {
	        this._onStepNextFields();
	      } else {
	        this._stepperComponent.error('Valide todos os campos');
	      }
	    };
	    // On all required steps are completed
	    var onStepperComplete = function onStepperComplete(event) {
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
	  VintProjeto.prototype._onStepperComplete = function () {};

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
	    updateName: 'projeto-update'
	  });
	})();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

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

	  var VintPublicacao = function VintPublicacao(form, isCreate, isUpdate) {
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
	    UPDATED: 'A publicação foi atualizada'
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
	    MESSAGE_VALIDATION_ERROR_FIELDS: 'Valide todos os campos'
	  };

	  /**
	   * Stories dataset attributes.
	   * 
	   * @private
	   */
	  VintPublicacao.prototype._jsDatasets = {
	    CHIP_INPUT_VALUE: 'input-value',
	    CHIP_INPUT_VALUE_CAMEL: 'inputValue'
	  };

	  /**
	   * Stories dataset attributes.
	   * 
	   * @private
	   */
	  VintPublicacao.prototype._cssClasses = {
	    CHIP: 'vint-chip',
	    CHIP_IS_DELETED: 'is-deleted',
	    STEP: 'mdl-step'
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
	  VintPublicacao.prototype._setFields = function () {};

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
	  VintPublicacao.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintPublicacao.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintPublicacao.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintPublicacao.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintPublicacao.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintPublicacao.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintPublicacao.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintPublicacao.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintPublicacao.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintPublicacao.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Displays a MDL snackbar. 
	  * 
	  * @param {object} data Snackbar options
	  * @param {string} data.message
	  * @param {number} data.timeout 
	  * @param {function} data.actionHandler 
	  * @param {string} data.actionText 
	  */
	  VintPublicacao.prototype.toast = function (data) {};

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
	  VintPublicacao.prototype.resetValues = function () {};

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
	      var onDeleteChip = function onDeleteChip(event) {
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
	      this.fields.projeto[i].addEventListener('change', function (field) {
	        return function () {
	          toggleChip(field);
	        }.bind(this);
	      }.bind(this)(this.fields.projeto[i]));
	    }

	    if (this._isCreate) {
	      for (var i = 0; i < this.fields.publicacao_type.length; i++) {
	        this.fields.publicacao_type[i].addEventListener('change', function (field) {
	          return function () {
	            toggleChip(field);
	          }.bind(this);
	        }.bind(this)(this.fields.publicacao_type[i]));
	      }
	    }

	    // [name='membros[]'] patterns
	    var onChangeMembros = function (field) {
	      // Get the related chip of input.
	      // Searching by [data-input-value="fieldValue"]
	      var chipCssSelector = '.' + this._cssClasses.CHIP + '[data-' + this._jsDatasets.CHIP_INPUT_VALUE + '="' + field.value + '"]';
	      var chipElement = document.querySelector(chipCssSelector);
	      var onDeleteChip = function onDeleteChip(event) {
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
	      this.fields['membros[]'][i].addEventListener('change', function (field) {
	        return function () {
	          onChangeMembros(field);
	        }.bind(this);
	      }.bind(this)(this.fields['membros[]'][i]));
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
	    var onChangeDocument = function onChangeDocument(event) {
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
	    var onAjaxUpdateForm = function onAjaxUpdateForm(event, context, response, status, jqXHR) {
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
	    var orderedAsString = /** @type {string} */'';
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
	    var hasChecked = function hasChecked(fields) {
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
	    var onStepsCancel = function onStepsCancel(event) {
	      window.location.href = this._constants.ON_STEP_CANCEL_LOCATION;
	    };
	    // On clicks on [data-step-skip] button
	    var onStepsSkip = function onStepsSkip(event) {
	      this._stepperComponent.skip();
	    };
	    // On clicks on [data-step-next] button of step 'membros'
	    var onStepNextMembros = function onStepNextMembros(event) {
	      var hasMembros = hasChecked(this.fields['membros[]']);

	      if (hasMembros) {
	        this._stepperComponent.next();
	      } else {
	        this._stepperComponent.error(this._constants.MESSAGE_NO_MEMBROS_SELECTED);
	      }
	    };
	    // On clicks on [data-step-next] button of step 'programa'
	    var onStepNextProjeto = function onStepNextProjeto(event) {
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
	      var onStepNextType = function onStepNextType(event) {
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
	    var onStepNextFields = function onStepNextFields(event) {
	      var pubType /** @type {string} */;
	      var requireds /** @type {Array} */;
	      // Get the selected 'publicacao' type
	      for (var i = 0; i < this.fields.publicacao_type.length; i++) {
	        if (this._isUpdate) {
	          // Case form is update, the publicacao_type is a NodeList
	          // with only one input[type=hidden]
	          pubType = this.fields.publicacao_type[i].value;
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
	    var onStepperComplete = function onStepperComplete(event) {
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
	    var onSuccess = function onSuccess(response) {

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
	    var onComplete = function onComplete() {
	      this._processResponseComplete();
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
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
	      error: onError.bind(this)
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
	  VintPublicacao.prototype._onStepperComplete = function () {};

	  /**
	   * Get the MaterialStepper instance of stepper component present in the DOM
	   * 
	   * @return {MaterialStepper}
	   * @private
	   */
	  VintPublicacao.prototype._getStepperInstance = function () {
	    var selector /** @type {string} */;

	    if (this._isCreate) {
	      selector = '#' + this._constants.STEPPER_CREATE_ID;
	    } else {
	      selector = '#' + this._constants.STEPPER_UPDATE_ID;
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
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	      this._stepperComponent.error();
	      this.ableActions();
	    };

	    /**
	     * Prepares the object to send as options with ajax request
	     * 
	     */
	    var getRequestOptions = function getRequestOptions() {
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
	    var requestOptions = getRequestOptions.bind(this)();
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
	    updateName: 'publicacao-update'
	  });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

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

	  var VintContact = function VintContact(form) {
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
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors'
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
	  VintContact.prototype._setFields = function () {};

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
	  VintContact.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintContact.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintContact.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintContact.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintContact.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintContact.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintContact.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintContact.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintContact.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintContact.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintContact.prototype._checkRequiredFields = function () {};

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
	  VintContact.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintContact.prototype._patterns = function () {};

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
	    var onError = function onError() {
	      this.toast({
	        message: 'Algo deu errado. Tente mais tarde'
	      });
	    };

	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onComplete = function onComplete() {
	      this.ableSubmit();
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintContact.prototype._formEvents = function () {
	    var valid; /** @type {boolean} */
	    var formOnSubmit = function formOnSubmit(event) {
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
	    cssClass: 'vint-form--contact'
	  });
	})();

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintLogin - A handler to Vint Login form.
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

	  var VintLogin = function VintLogin(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintLogin.prototype._constants = {
	    REQUEST_HANDLER: 'login::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintLogin.prototype._formValid = true;

	  /**
	   * Flag used to check if the login was successfully.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintLogin.prototype.success = false;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintLogin.prototype._requiredFields = ['email', 'senha'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintLogin.prototype._defaultErrorMessages = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintLogin.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintLogin.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintLogin.prototype._jqueryForm = {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintLogin.prototype._filePatterns = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintLogin.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintLogin.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintLogin.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintLogin.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintLogin.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintLogin.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintLogin.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintLogin.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintLogin.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintLogin.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintLogin.prototype._checkRequiredFields = function () {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintLogin.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintLogin.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintLogin.prototype._patterns = function () {};

	  /**
	   * Defines the options to send for server with XMLHttpRequest (ajax)
	   * 
	   * @return {object}
	   * @private
	   */
	  VintLogin.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponseSuccess(response);
	    };
	    var onComplete = function onComplete() {
	      this._processResponseComplete();
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintLogin.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
	      event.preventDefault();
	      valid = this._checkRequiredFields();

	      if (!valid) return false;
	      this.disableActions();
	      this._sendAjaxRequest(this._constants.REQUEST_HANDLER, this._getDefaultRequestOptions());
	    };

	    this._form.addEventListener('submit', formOnSubmit.bind(this));
	  };

	  /**
	   * Initialize the instance
	   * 
	   */
	  VintLogin.prototype.init = function () {
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
	    constructor: VintLogin,
	    classAsString: 'VintLogin',
	    cssClass: 'vint-form--login'
	  });
	})();

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintLoginRecover - A handler to Vint Login Recover form.
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

	  var VintLoginRecover = function VintLoginRecover(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintLoginRecover.prototype._constants = {
	    REQUEST_HANDLER: 'loginRecover::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
	    RESPONSE_WARNING_MESSAGE: 'warningMessage',
	    RESPONSE_BAD_REQUEST: 'badRequest',
	    MESSAGE_EMAIL_SENT: 'A recuperação foi enviada',
	    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
	    MESSAGE_SERVER_ERROR: 'Algo deu errado. Tente novamente',
	    MESSAGE_DEFAULT_WARNING: 'Algo deu errado. Tente mais tarde',
	    MESSAGE_WAIT_MESSAGE: 'Aguarde...'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintLoginRecover.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintLoginRecover.prototype._requiredFields = ['email'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintLoginRecover.prototype._defaultErrorMessages = {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintLoginRecover.prototype._filePatterns = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintLoginRecover.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintLoginRecover.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintLoginRecover.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintLoginRecover.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintLoginRecover.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintLoginRecover.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintLoginRecover.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintLoginRecover.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintLoginRecover.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintLoginRecover.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintLoginRecover.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintLoginRecover.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintLoginRecover.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintLoginRecover.prototype._checkRequiredFields = function () {};

	  /**
	  * Displays a MDL snackbar. 
	  * 
	  * @param {object} data Snackbar options
	  * @param {string} data.message
	  * @param {number} data.timeout 
	  * @param {function} data.actionHandler 
	  * @param {string} data.actionText 
	  */
	  VintLoginRecover.prototype.toast = function (data) {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintLoginRecover.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintLoginRecover.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintLoginRecover.prototype._patterns = function () {};

	  /**
	   * Defines the options to send for server with XMLHttpRequest (ajax)
	   * 
	   * @return {object}
	   * @private
	   */
	  VintLoginRecover.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      var message /** @type {string} */;
	      var newLocation /** @type {string} */;
	      var timeout /** @type {number} */;

	      this._processResponseSuccess(response);

	      if (response.hasOwnProperty(this._constants.RESPONSE_SUCCESS) && response[this._constants.RESPONSE_SUCCESS] && response.hasOwnProperty(this._constants.RESPONSE_LOCATION)) {
	        newLocation = response[this._constants.RESPONSE_LOCATION];
	        timeout = 1000 * 30;
	        message = this._constants.MESSAGE_EMAIL_SENT;
	        this.toast({
	          message: message,
	          actionText: 'Ok',
	          timeout: timeout,
	          actionHandler: function actionHandler(e) {
	            window.location.href = location;
	          }
	        });
	      }
	    };
	    var onComplete = function onComplete() {
	      this._processResponseComplete();
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintLoginRecover.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var waitMessage /** @type {string} */;
	    var formOnSubmit = function formOnSubmit(event) {
	      event.preventDefault();
	      valid = this._checkRequiredFields();

	      if (!valid) return false;
	      this.disableSubmit();
	      waitMessage = this._constants.MESSAGE_WAIT_MESSAGE;
	      this.toast({
	        message: waitMessage,
	        timeout: 1000
	      });
	      this._sendAjaxRequest(this._constants.REQUEST_HANDLER, this._getDefaultRequestOptions());
	    };
	    this._form.addEventListener('submit', formOnSubmit.bind(this));
	  };

	  /**
	   * Initialize the instance
	   * 
	   */
	  VintLoginRecover.prototype.init = function () {
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
	    constructor: VintLoginRecover,
	    classAsString: 'VintLoginRecover',
	    cssClass: 'vint-form--login-recover'
	  });
	})();

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintLoginReset - A handler to Vint Login Reset form.
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

	  var VintLoginReset = function VintLoginReset(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintLoginReset.prototype._constants = {
	    REQUEST_HANDLER: 'loginReset::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
	    RESPONSE_FATAL_ERROR: 'fatalError',
	    RESPONSE_BAD_REQUEST: 'badRequest',
	    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
	    MESSAGE_SERVER_ERROR: 'Algo deu errado. Tente novamente'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintLoginReset.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintLoginReset.prototype._requiredFields = ['new_senha', 'new_senha_confirmation'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintLoginReset.prototype._defaultErrorMessages = {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintLoginReset.prototype._filePatterns = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintLoginReset.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintLoginReset.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintLoginReset.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintLoginReset.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintLoginReset.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintLoginReset.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintLoginReset.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintLoginReset.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintLoginReset.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintLoginReset.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintLoginReset.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintLoginReset.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintLoginReset.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintLoginReset.prototype._checkRequiredFields = function () {};

	  /**
	  * Displays a MDL snackbar. 
	  * 
	  * @param {object} data Snackbar options
	  * @param {string} data.message
	  * @param {number} data.timeout 
	  * @param {function} data.actionHandler 
	  * @param {string} data.actionText 
	  */
	  VintLoginReset.prototype.toast = function (data) {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintLoginReset.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintLoginReset.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintLoginReset.prototype._patterns = function () {};

	  /**
	   * Defines the options to send for server with XMLHttpRequest (ajax)
	   * 
	   * @return {object}
	   * @private
	   */
	  VintLoginReset.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponseSuccess(response);
	    };
	    var onComplete = function onComplete() {
	      this._processResponseComplete();
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintLoginReset.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
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
	  VintLoginReset.prototype.init = function () {
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
	    constructor: VintLoginReset,
	    classAsString: 'VintLoginReset',
	    cssClass: 'vint-form--login-reset'
	  });
	})();

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintAccountDisagree - A handler to Vint Account Disagree form.
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

	  var VintAccountDisagree = function VintAccountDisagree(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintAccountDisagree.prototype._constants = {
	    REQUEST_HANDLER: 'accountDisagree::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
	    RESPONSE_FATAL_ERROR: 'fatalError',
	    RESPONSE_BAD_REQUEST: 'badRequest',
	    RESPONSE_WARNING_MESSAGE: 'warningMessage',
	    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
	    MESSAGE_SERVER_ERROR: 'Algo deu errado. Tente novamente',
	    MESSAGE_DEFAULT_WARNING: 'Algo deu errado. Tente mais tarde'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintAccountDisagree.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintAccountDisagree.prototype._requiredFields = ['email'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintAccountDisagree.prototype._defaultErrorMessages = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintAccountDisagree.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintAccountDisagree.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintAccountDisagree.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintAccountDisagree.prototype._setJqueryForm = function () {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintAccountDisagree.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintAccountDisagree.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintAccountDisagree.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintAccountDisagree.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintAccountDisagree.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintAccountDisagree.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintAccountDisagree.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintAccountDisagree.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintAccountDisagree.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintAccountDisagree.prototype._checkRequiredFields = function () {};

	  /**
	  * Displays a MDL snackbar. 
	  * 
	  * @param {object} data Snackbar options
	  * @param {string} data.message
	  * @param {number} data.timeout 
	  * @param {function} data.actionHandler 
	  * @param {string} data.actionText 
	  */
	  VintAccountDisagree.prototype.toast = function (data) {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintAccountDisagree.prototype._filePatterns = {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintAccountDisagree.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintAccountDisagree.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintAccountDisagree.prototype._patterns = function () {};

	  /**
	   * Defines the options to send for server with XMLHttpRequest (ajax)
	   * 
	   * @return {object}
	   * @private
	   */
	  VintAccountDisagree.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponseSuccess(response);
	    };
	    var onComplete = function onComplete() {
	      this._processResponseComplete();
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintAccountDisagree.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
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
	  VintAccountDisagree.prototype.init = function () {
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
	    constructor: VintAccountDisagree,
	    classAsString: 'VintAccountDisagree',
	    cssClass: 'vint-form--account-disagree'
	  });
	})();

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintAccountRegister - A handler to Vint Account Register form.
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

	  var VintAccountRegister = function VintAccountRegister(form) {
	    this._form = form;

	    // initialize the instance
	    this.init();
	  };

	  /**
	   * Stories constant properties.
	   * 
	   * @private
	   */
	  VintAccountRegister.prototype._constants = {
	    REQUEST_HANDLER: 'accountRegister::onRequest',
	    RESPONSE_SUCCESS: 'success',
	    RESPONSE_LOCATION: 'location',
	    RESPONSE_VALIDATION_ERRORS: 'validationErrors',
	    RESPONSE_FATAL_ERROR: 'fatalError',
	    RESPONSE_BAD_REQUEST: 'badRequest',
	    RESPONSE_WARNING_MESSAGE: 'warningMessage',
	    MESSAGE_BAD_REQUEST: 'Você não tem permissão para fazer isso',
	    MESSAGE_SERVER_ERROR: 'Algo deu errado. Tente novamente',
	    MESSAGE_DEFAULT_WARNING: 'Algo deu errado. Tente mais tarde'
	  };

	  /**
	   * Flag used to check the form state.
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintAccountRegister.prototype._formValid = true;

	  /**
	   * Stories the value [name] attribute of all required fields.
	   * 
	   * @private
	   */
	  VintAccountRegister.prototype._requiredFields = ['senha', 'senha_confirmation'];

	  /**
	   * Stories all default error messages for fields.
	   * 
	   * @private
	   */
	  VintAccountRegister.prototype._defaultErrorMessages = {};

	  /**
	   * All fields (input, select) inside the form. Keys are the [name] attribute
	   * and values are the refered HTMLElement.
	   * 
	   */
	  VintAccountRegister.prototype.fields = {};

	  /**
	   * Set all fields (input, select) inside ClassConstructor._form
	   * and store in ClassConstructor.fields
	   * 
	   */
	  VintAccountRegister.prototype._setFields = function () {};

	  /**
	   * Jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintAccountRegister.prototype._jqueryForm = {};

	  /**
	   * Define the jquery object for the form element. Will be used to call 
	   * ajax requests.  
	   * 
	   * @private
	   */
	  VintAccountRegister.prototype._setJqueryForm = function () {};

	  /**
	   * Validates a file based on input, their required rules and referred messages 
	   *  
	   * @return {object}
	   * @private
	   */
	  VintAccountRegister.prototype._filePatterns = {};

	  /**
	   * Defines the form value of [data-request-loading] attribute. 
	   * The value is a css selector for element that's will be displayed (e.g. loading bar) 
	   * while the request is not completed.
	   * 
	   * @private
	   */
	  VintAccountRegister.prototype._setRequestLoading = function () {};

	  /**
	   * Send ajax request to backend handler with request options 
	   * 
	   * @param {string} request backend handler
	   * @param {object} request options
	   * @private
	   */
	  VintAccountRegister.prototype._sendAjaxRequest = function (requestHandler, requestOptions) {};

	  /**
	   * Disable form submit action
	   * 
	   */
	  VintAccountRegister.prototype.disableSubmit = function () {};

	  /**
	   * Able form submit action
	   * 
	   */
	  VintAccountRegister.prototype.ableSubmit = function () {};

	  /**
	   * Reset all fields to default state and error messages.
	   * 
	   */
	  VintAccountRegister.prototype.resetValidationErrors = function () {};

	  /**
	   * Show the server validation errors.
	   * 
	   * @param {object} - keys are the field [name] attribute and values are the validation messages
	   * @private
	   */
	  VintAccountRegister.prototype._displayValidationErrors = function (errors) {};

	  /**
	   * Show the validation error at the DOM. Uses the MDL textfield error pattern.
	   * 
	   * @param {HTMLElement} - field with validation error
	   * @param {string} - validation error message 
	   * @private
	   */
	  VintAccountRegister.prototype._displayValidationErrorDOM = function (field, message) {};

	  /**
	  * Show the validation error at the console as a warn.
	  * 
	  * @param {string} - validation error message 
	  * @private
	  */
	  VintAccountRegister.prototype._displayValidationErrorConsole = function (message) {};

	  /**
	  * Toggle css class 'is-focused' on outer of fields.
	  * 
	  * @private
	  */
	  VintAccountRegister.prototype._fieldsFocusedEffect = function () {};

	  /**
	  * Check all required fields (defined in <Constructor>._requiredFields property).
	  * Add an error message on empty fields.
	  * 
	  * @private
	  */
	  VintAccountRegister.prototype._checkRequiredFields = function () {};

	  /**
	  * Displays a MDL snackbar. 
	  * 
	  * @param {object} data Snackbar options
	  * @param {string} data.message
	  * @param {number} data.timeout 
	  * @param {function} data.actionHandler 
	  * @param {string} data.actionText 
	  */
	  VintAccountRegister.prototype.toast = function (data) {};

	  /**
	   * Stories the initial value of all fields.
	   * 
	   * @private
	   */
	  VintAccountRegister.prototype._initialValues = {};

	  /**
	   * Change the current fields values to initial values (<Constructor>._initialValues). 
	   * 
	   */
	  VintAccountRegister.prototype.resetValues = function () {};

	  /**
	   * Define the required patterns for the fields of form 
	   * 
	   * @private
	   */
	  VintAccountRegister.prototype._patterns = function () {};

	  /**
	   * Defines the options to send for server with XMLHttpRequest (ajax)
	   * 
	   * @return {object}
	   * @private
	   */
	  VintAccountRegister.prototype._getDefaultRequestOptions = function () {
	    var onSuccess = function onSuccess(response) {
	      this._processResponseSuccess(response);
	    };
	    var onComplete = function onComplete() {
	      this._processResponseComplete();
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };

	    return {
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Defines the listeners to the required form events 
	   * 
	   * @private
	   */
	  VintAccountRegister.prototype._formEvents = function () {
	    var valid /** @type {boolean} */;
	    var formOnSubmit = function formOnSubmit(event) {
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
	  VintAccountRegister.prototype.init = function () {
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
	    constructor: VintAccountRegister,
	    classAsString: 'VintAccountRegister',
	    cssClass: 'vint-form--account-register'
	  });
	})();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * settingsHandler - A handler to settings pages
	 * @license MIT
	 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
	 */

	// Pre-defining the settingsHandler interface, for closure documentation and
	// static verification.
	var settingsHandler = {

	  /**
	   * Registers a form for future use.
	   *
	   * @param {settingsHandler.FormConfigPublic} config the registration configuration
	   */
	  register: function register(config) {},

	  /**
	   * Upgrade all registered forms.
	   *
	   */
	  upgradeAllRegistered: function upgradeAllRegistered() {}
	};

	settingsHandler = function () {
	  'use strict';

	  /**
	   * Stories constant properties.
	   * 
	   */

	  var _constants = {
	    SNACKBAR_ID: 'vint-snackbar-default'
	  };

	  /**
	   * Stories messages.
	   * 
	   */
	  var messages = {
	    RESPONSE_403: 'Você não tem permissão para fazer isso',
	    RESPONSE_401: 'O VINT não reconhece você',
	    RESPONSE_500: 'Algo não funcionou. Tente novamente'
	  };

	  /** @type {!Array<settingsHandler.ConfigPublic>} */
	  var _registeredSettings = [];

	  var _register = function _register(config) {
	    var newConfig = {
	      ClassConstructor: config.constructor || config['constructor'],
	      classAsString: config.classAsString || config['classAsString'],
	      cssClass: config.cssClass || config['cssClass']
	    };

	    _registeredSettings.forEach(function (item) {
	      if (item.cssClass === newConfig.cssClass) {
	        throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
	      }
	    });

	    _registeredSettings.push(newConfig);
	  };

	  /**
	   * Upgrade all registered settings in the document DOM
	   * 
	   */
	  var _upgradeAllRegistered = function _upgradeAllRegistered() {
	    for (var i = 0; i < _registeredSettings.length; i++) {
	      _upgradeClass(_registeredSettings[i]);
	    }
	  };

	  /**
	   * Defines all essential methods prototypes to settings
	   * 
	   * @param {settingsHandler.ConfigPublic.<ClassConstructor>}
	   */
	  var _settingsEssentials = function _settingsEssentials(ClassConstructor) {

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
	      var container = document.querySelector('#' + _constants.SNACKBAR_ID);
	      if (!container) {
	        throw new Error('Snackbar container is not defined.');
	        return false;
	      }

	      if (!data.timeout) {
	        data.timeout = 5000;
	      }

	      container.MaterialSnackbar.showSnackbar(data);
	    };

	    /**
	     * Set attribute [disabled] on all buttons of step
	     * 
	     * @public
	     */
	    ClassConstructor.prototype.disableActions = function () {
	      var buttons = this._element.querySelectorAll('button');
	      for (var i = 0; i < buttons.length; i++) {
	        buttons[i].setAttribute('disabled', '');
	      }
	    };

	    /**
	     * Remove attribute [disabled] from all buttons of step
	     * 
	     * @public
	     */
	    ClassConstructor.prototype.ableActions = function () {
	      var buttons = this._element.querySelectorAll('button');
	      for (var i = 0; i < buttons.length; i++) {
	        buttons[i].removeAttribute('disabled');
	      }
	    };

	    /**
	     * Get the menu settings data 
	     *
	     * @return {object} 
	     * @private
	     */
	    ClassConstructor.prototype._getMenu = function () {
	      var getMenu = function getMenu() {
	        var itemEdit /** @type {HTMLElement} */;
	        var itemDelete /** @type {HTMLElement} */;
	        var menuElement = this._element.querySelector('.' + this._cssClasses.SETTINGS_MENU);
	        var menuButton = this._element.querySelector('.' + this._cssClasses.SETTINGS_MENU_BUTTON);
	        if (menuElement) {
	          itemEdit = menuElement.querySelector('.' + this._cssClasses.SETTINGS_MENU_EDIT);
	          itemDelete = menuElement.querySelector('.' + this._cssClasses.SETTINGS_MENU_DELETE);
	        }

	        return {
	          element: menuElement,
	          button: menuButton,
	          items: {
	            edit: itemEdit,
	            delete: itemDelete
	          }
	        };
	      };
	      var menu = getMenu.bind(this)();

	      return menu;
	    };

	    /**
	     * Get the element settings data 
	     *
	     * @return {object|boolean} 
	     * @private
	     */
	    ClassConstructor.prototype._getDialogs = function () {
	      /**
	       * Builds the data object
	       * 
	       * @param {HTMLElement} menu element
	       * @return {object|boolean}
	       */
	      var getDialogs = function getDialogs(menu) {
	        var deleteSelector = 'dialog[data-' + this._datasets.DIALOG + '="delete"]';
	        var deleteTargetSelector = '[data-' + this._datasets.DIALOG_TARGET + '="delete"]';
	        var deleteButtonConfirmSelector = '.' + this._cssClasses.DIALOG_BUTTON_CONFIRM;
	        var deleteButtonCancelSelector = '.' + this._cssClasses.DIALOG_BUTTON_CANCEL;
	        var dialogDelete = this._element.querySelector(deleteSelector);

	        if (!dialogDelete) return false;
	        var dialogDeleteTarget = menu.querySelector(deleteTargetSelector);
	        var dialogDeleteButtonConfirm = dialogDelete.querySelector(deleteButtonConfirmSelector);
	        var dialogDeleteButtonCancel = dialogDelete.querySelector(deleteButtonCancelSelector);

	        return {
	          delete: {
	            target: dialogDeleteTarget,
	            dialog: dialogDelete,
	            buttonConfirm: dialogDeleteButtonConfirm,
	            buttonCancel: dialogDeleteButtonCancel
	          }
	        };
	      };

	      var dialogs = getDialogs.bind(this)(this._menu.element);

	      return dialogs;
	    };

	    /**
	     * Show a settings element
	     * 
	     * @public
	     */
	    ClassConstructor.prototype.on = function () {
	      this._element.classList.remove('is-deleted');
	      var toOn /** @type {HTMLElement} */;
	      if (this._element.parentNode.classList.contains('mdl-cell')) {
	        toOn = this._element.parentNode;
	      } else {
	        toOn = this._element;
	      }
	      toOn.style.display = '';
	    };

	    /**
	     * Hide a settings element
	     * 
	     * @public
	     */
	    ClassConstructor.prototype.off = function () {
	      this._element.classList.add('is-deleted');
	      setTimeout(function () {
	        var toOff /** @type {HTMLElement} */;
	        if (this._element.parentNode.classList.contains('mdl-cell')) {
	          toOff = this._element.parentNode;
	        } else {
	          toOff = this._element;
	        }
	        toOff.style.display = 'none';
	      }.bind(this), 400);
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
	            actionHandler: function actionHandler() {
	              window.location.href = constants.LOCATION_LOGIN;
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
	          this.toast({
	            message: messages.RESPONSE_500
	          });
	          break;

	      }
	    };

	    /**
	     * Hide a settings element
	     * 
	     * @public
	     */
	    ClassConstructor.prototype._sendAjaxRequest = function (options) {
	      // Assumes that jQuery object is available gloabally.
	      $.ajax(options);
	    };
	  };

	  /**
	   * Initialize the instance of the registered settings for each cssClass
	   * 
	   */
	  var _upgradeClass = function _upgradeClass(registeredSettings) {
	    // All elements with the same registerd cssClass
	    var _settingsElements = document.querySelectorAll('.' + registeredSettings.cssClass);

	    for (var i = 0; i < _settingsElements.length; i++) {
	      var element = _settingsElements[i];
	      var instance;
	      _settingsEssentials(registeredSettings.ClassConstructor);
	      instance = new registeredSettings.ClassConstructor(element);
	      element[registeredSettings.classAsString] = instance;
	    }
	  };

	  // Now return the functions that should be made public with their publicly
	  // facing names...
	  return {
	    register: _register,
	    upgradeAllRegistered: _upgradeAllRegistered
	  };
	}();

	/**
	 * Describes the type of a registered component type managed by
	 * settingsHandler. Provided for benefit of the Closure compiler.
	 *
	 * @typedef {{
	 *   constructor: Function,
	 *   classAsString: string,
	 *   cssClass: string,
	 * }}
	 */
	settingsHandler.ConfigPublic; // jshint ignore:line

	window['settingsHandler'] = settingsHandler;

	window.addEventListener('load', function () {
	  // Upgrade all registered forms after page loaded
	  settingsHandler.upgradeAllRegistered();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintSettingsPublicacao - A handler to Vint Settings Publicacao.
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

	  var VintSettingsPublicacao = function VintSettingsPublicacao(element) {
	    this._element = element;

	    // initialize the instance
	    this.init();
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsPublicacao.prototype._datasets = {
	    DIALOG: 'vint-dialog',
	    DIALOG_TARGET: 'vint-dialog-target',
	    DIALOG_TARGET_CAMEL: 'vintDialogTarget',
	    MENU_SETTINGS: 'vint-menu',
	    MENU_SETTINGS_CAMEL: 'vintMenu',
	    SETTINGS_HREF: 'vint-href',
	    SETTINGS_HREF_CAMEL: 'vintHref'
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsPublicacao.prototype._constants = {
	    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
	    // DELETE_REQUEST_HANDLER: 'forms::onDeletePublicacaoSettings',
	    DELETE_REQUEST_HANDLER: 'publicacaoSettings::onRequest',
	    MESSAGE_PUBLICACAO_DELETED: 'A publicação foi removida'
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsPublicacao.prototype._cssClasses = {
	    SETTINGS: 'vint-settings',
	    SETTINGS_MENU: 'vint-settings__menu',
	    SETTINGS_MENU_BUTTON: 'vint-settings__menu-button',
	    SETTINGS_MENU_EDIT: 'vint-settings__menu-edit',
	    SETTINGS_MENU_DELETE: 'vint-settings__menu-delete',
	    DIALOG_BUTTON_CONFIRM: 'vint-dialog__buton-confirm',
	    DIALOG_BUTTON_CANCEL: 'vint-dialog__buton-cancel'
	  };

	  /**
	   * Stories the flag that indicates state of settings 
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintSettingsPublicacao.prototype._deleted = false;

	  /**
	   * Stories the menu settings data 
	   * 
	   * @private
	   */
	  VintSettingsPublicacao.prototype._menu = {};

	  /**
	   * Stories the menu settings data 
	   * 
	   * @private
	   */
	  VintSettingsPublicacao.prototype._dialogs = {};

	  /**
	   * Handle the behavior of menu
	   *
	   * @private 
	   */
	  VintSettingsPublicacao.prototype._menuHandler = function () {
	    var onClickEdit = function onClickEdit(event) {
	      var location = this._menu.items.edit.dataset[this._datasets.SETTINGS_HREF_CAMEL];
	      if (location) {
	        window.location.href = location;
	      }
	    };
	    this._menu.items.edit.addEventListener('click', onClickEdit.bind(this));
	  };

	  /**
	   * Handle the behavior of dialogs
	   *
	   * @private 
	   */
	  VintSettingsPublicacao.prototype._dialogsHandler = function () {
	    var deleteTarget /** @type {HTMLElement} */ = this._dialogs.delete.target;
	    var deleteDialog /** @type {HTMLElement} */ = this._dialogs.delete.dialog;
	    var deleteButtonConfirm /** @type {HTMLElement} */ = this._dialogs.delete.buttonConfirm;
	    var deleteButtonCancel /** @type {HTMLElement} */ = this._dialogs.delete.buttonCancel;
	    var onClickTargetDelete = function onClickTargetDelete(event) {
	      event.preventDefault();
	      deleteDialog.showModal();
	    };
	    var onDeleteConfirm = function onDeleteConfirm(event) {
	      this._onDelete();
	    };
	    var onDeleteCancel = function onDeleteCancel(event) {
	      deleteDialog.close();
	    };

	    // Show delete dialog
	    deleteTarget.addEventListener('click', onClickTargetDelete.bind(this));
	    // On confirm delete
	    deleteButtonConfirm.addEventListener('click', onDeleteConfirm.bind(this));
	    // On cancel delete
	    deleteButtonCancel.addEventListener('click', onDeleteCancel.bind(this));
	  };

	  /**
	   * Handle a delete of settings
	   * 
	   * @private
	   */
	  VintSettingsPublicacao.prototype._onDelete = function () {
	    // Slug of 'publicacao' to delete
	    var slug = this._menu.element.dataset[this._datasets.MENU_SETTINGS_CAMEL];
	    var ajaxOptions = this._getAjaxOptions(slug);
	    // Disable actions while the request is pending.
	    this.disableActions();
	    this._sendAjaxRequest(ajaxOptions);
	  };

	  /**
	   * Handle a delete of settings
	   * 
	   * @param {string} publicacao slug
	   * @private
	   */
	  VintSettingsPublicacao.prototype._getAjaxOptions = function (slug) {
	    var requestHandler = this._constants.DELETE_REQUEST_HANDLER;
	    var headerHandler = this._constants.OCTOBER_REQUEST_HANDLER;
	    var data = {
	      slug: slug
	    };
	    var headers = {};
	    headers[headerHandler] = requestHandler;
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onComplete = function onComplete() {
	      this._dialogs.delete.dialog.close();
	      if (this._deleted) {
	        // Removes the deleted element from page
	        this.off();
	      } else {
	        // Only able the actions if the operation was unsucessfuly
	        this.ableActions();
	      }
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };

	    return {
	      headers: headers,
	      type: 'post',
	      data: data,
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Handle the request response that's comes from server
	   * 
	   * @param {object}
	   * @private
	   */
	  VintSettingsPublicacao.prototype._processResponse = function (response) {
	    var message /** @type {string} */;
	    if (!response.hasOwnProperty('success')) return;

	    if (response.success) {
	      // Deleted with success
	      this._deleted = true;
	      message = this._constants.MESSAGE_PUBLICACAO_DELETED;
	      this.toast({
	        message: message
	      });
	    } else {
	      // Problems to delete
	      this._deleted = false;
	      this.toast({
	        message: 'Não foi possível remover a publicação'
	      });
	      // window.location.reload();
	    }
	  };

	  /**
	   * Initialize the instance
	   * 
	   * @public
	   */
	  VintSettingsPublicacao.prototype.init = function () {
	    if (this._element) {
	      // Exists the container
	      this._menu = this._getMenu();
	      this._dialogs = this._getDialogs();
	      this._menuHandler();
	      this._dialogsHandler();
	    }
	  };

	  // Assumes that formHandler is available globally
	  settingsHandler.register({
	    constructor: VintSettingsPublicacao,
	    classAsString: 'VintSettingsPublicacao',
	    cssClass: 'vint-settings--publicacao'
	  });
	})();

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintSettingsProjeto - A handler to Vint Settings Projeto.
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

	  var VintSettingsProjeto = function VintSettingsProjeto(element) {
	    this._element = element;

	    // initialize the instance
	    this.init();
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsProjeto.prototype._datasets = {
	    DIALOG: 'vint-dialog',
	    DIALOG_TARGET: 'vint-dialog-target',
	    DIALOG_TARGET_CAMEL: 'vintDialogTarget',
	    MENU_SETTINGS: 'vint-menu',
	    MENU_SETTINGS_CAMEL: 'vintMenu',
	    SETTINGS_HREF: 'vint-href',
	    SETTINGS_HREF_CAMEL: 'vintHref'
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsProjeto.prototype._constants = {
	    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
	    DELETE_REQUEST_HANDLER: 'projetoSettings::onRequest',
	    MESSAGE_PUBLICACAO_DELETED: 'O projeto foi removido'
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsProjeto.prototype._cssClasses = {
	    SETTINGS: 'vint-settings',
	    SETTINGS_MENU: 'vint-settings__menu',
	    SETTINGS_MENU_BUTTON: 'vint-settings__menu-button',
	    SETTINGS_MENU_EDIT: 'vint-settings__menu-edit',
	    SETTINGS_MENU_DELETE: 'vint-settings__menu-delete',
	    DIALOG_BUTTON_CONFIRM: 'vint-dialog__buton-confirm',
	    DIALOG_BUTTON_CANCEL: 'vint-dialog__buton-cancel'
	  };

	  /**
	   * Stories the flag that indicates state of settings 
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintSettingsProjeto.prototype._deleted = false;

	  /**
	   * Stories the menu settings data 
	   * 
	   * @private
	   */
	  VintSettingsProjeto.prototype._menu = {};

	  /**
	   * Stories the menu settings data 
	   * 
	   * @private
	   */
	  VintSettingsProjeto.prototype._dialogs = {};

	  /**
	   * Handle the behavior of menu
	   *
	   * @private 
	   */
	  VintSettingsProjeto.prototype._menuHandler = function () {
	    var onClickEdit = function onClickEdit(event) {
	      var location = this._menu.items.edit.dataset[this._datasets.SETTINGS_HREF_CAMEL];
	      if (location) {
	        window.location.href = location;
	      }
	    };
	    this._menu.items.edit.addEventListener('click', onClickEdit.bind(this));
	  };

	  /**
	   * Handle the behavior of dialogs
	   *
	   * @private 
	   */
	  VintSettingsProjeto.prototype._dialogsHandler = function () {
	    var deleteTarget /** @type {HTMLElement} */ = this._dialogs.delete.target;
	    var deleteDialog /** @type {HTMLElement} */ = this._dialogs.delete.dialog;
	    var deleteButtonConfirm /** @type {HTMLElement} */ = this._dialogs.delete.buttonConfirm;
	    var deleteButtonCancel /** @type {HTMLElement} */ = this._dialogs.delete.buttonCancel;
	    var onClickTargetDelete = function onClickTargetDelete(event) {
	      event.preventDefault();
	      deleteDialog.showModal();
	    };
	    var onDeleteConfirm = function onDeleteConfirm(event) {
	      this._onDelete();
	    };
	    var onDeleteCancel = function onDeleteCancel(event) {
	      deleteDialog.close();
	    };

	    // Show delete dialog
	    deleteTarget.addEventListener('click', onClickTargetDelete.bind(this));
	    // On confirm delete
	    deleteButtonConfirm.addEventListener('click', onDeleteConfirm.bind(this));
	    // On cancel delete
	    deleteButtonCancel.addEventListener('click', onDeleteCancel.bind(this));
	  };

	  /**
	   * Handle a delete of settings
	   * 
	   * @private
	   */
	  VintSettingsProjeto.prototype._onDelete = function () {
	    // Slug of 'publicacao' to delete
	    var slug = this._menu.element.dataset[this._datasets.MENU_SETTINGS_CAMEL];
	    var ajaxOptions = this._getAjaxOptions(slug);
	    // Disable actions while the request is pending.
	    this.disableActions();
	    this._sendAjaxRequest(ajaxOptions);
	  };

	  /**
	   * Handle a delete of settings
	   * 
	   * @param {string} publicacao slug
	   * @private
	   */
	  VintSettingsProjeto.prototype._getAjaxOptions = function (slug) {
	    var requestHandler = this._constants.DELETE_REQUEST_HANDLER;
	    var headerHandler = this._constants.OCTOBER_REQUEST_HANDLER;
	    var data = {
	      slug: slug
	    };
	    var headers = {};
	    headers[headerHandler] = requestHandler;
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onComplete = function onComplete() {
	      this._dialogs.delete.dialog.close();
	      if (this._deleted) {
	        // Removes the deleted element from page
	        this.off();
	      } else {
	        // Only able the actions if the operation was unsucessfuly
	        this.ableActions();
	      }
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };

	    return {
	      headers: headers,
	      type: 'post',
	      data: data,
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Handle the request response that's comes from server
	   * 
	   * @param {object}
	   * @private
	   */
	  VintSettingsProjeto.prototype._processResponse = function (response) {
	    var message /** @type {string} */;
	    if (!response.hasOwnProperty('success')) return;

	    if (response.success) {
	      // Deleted with success
	      this._deleted = true;
	      message = this._constants.MESSAGE_PUBLICACAO_DELETED;
	      this.toast({
	        message: message
	      });
	    } else {
	      // Problems to delete
	      this._deleted = false;
	      this.toast({
	        message: 'Não foi possível remover a projeto'
	      });
	      // window.location.reload();
	    }
	  };

	  /**
	   * Initialize the instance
	   * 
	   * @public
	   */
	  VintSettingsProjeto.prototype.init = function () {
	    if (this._element) {
	      // Exists the container
	      this._menu = this._getMenu();
	      this._dialogs = this._getDialogs();
	      this._menuHandler();
	      this._dialogsHandler();
	    }
	  };

	  // Assumes that formHandler is available globally
	  settingsHandler.register({
	    constructor: VintSettingsProjeto,
	    classAsString: 'VintSettingsProjeto',
	    cssClass: 'vint-settings--projeto'
	  });
	})();

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintSettingsPrograma - A handler to Vint Settings Programa.
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

	  var VintSettingsPrograma = function VintSettingsPrograma(element) {
	    this._element = element;

	    // initialize the instance
	    this.init();
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsPrograma.prototype._datasets = {
	    DIALOG: 'vint-dialog',
	    DIALOG_TARGET: 'vint-dialog-target',
	    DIALOG_TARGET_CAMEL: 'vintDialogTarget',
	    MENU_SETTINGS: 'vint-menu',
	    MENU_SETTINGS_CAMEL: 'vintMenu',
	    SETTINGS_HREF: 'vint-href',
	    SETTINGS_HREF_CAMEL: 'vintHref'
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsPrograma.prototype._constants = {
	    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
	    DELETE_REQUEST_HANDLER: 'programaSettings::onRequest',
	    MESSAGE_PUBLICACAO_DELETED: 'O programa foi removido'
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsPrograma.prototype._cssClasses = {
	    SETTINGS: 'vint-settings',
	    SETTINGS_MENU: 'vint-settings__menu',
	    SETTINGS_MENU_BUTTON: 'vint-settings__menu-button',
	    SETTINGS_MENU_EDIT: 'vint-settings__menu-edit',
	    SETTINGS_MENU_DELETE: 'vint-settings__menu-delete',
	    DIALOG_BUTTON_CONFIRM: 'vint-dialog__buton-confirm',
	    DIALOG_BUTTON_CANCEL: 'vint-dialog__buton-cancel'
	  };

	  /**
	   * Stories the flag that indicates state of settings 
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintSettingsPrograma.prototype._deleted = false;

	  /**
	   * Stories the menu settings data 
	   * 
	   * @private
	   */
	  VintSettingsPrograma.prototype._menu = {};

	  /**
	   * Stories the menu settings data 
	   * 
	   * @private
	   */
	  VintSettingsPrograma.prototype._dialogs = {};

	  /**
	   * Handle the behavior of menu
	   *
	   * @private 
	   */
	  VintSettingsPrograma.prototype._menuHandler = function () {
	    var onClickEdit = function onClickEdit(event) {
	      var location = this._menu.items.edit.dataset[this._datasets.SETTINGS_HREF_CAMEL];
	      if (location) {
	        window.location.href = location;
	      }
	    };
	    this._menu.items.edit.addEventListener('click', onClickEdit.bind(this));
	  };

	  /**
	   * Handle the behavior of dialogs
	   *
	   * @private 
	   */
	  VintSettingsPrograma.prototype._dialogsHandler = function () {
	    var deleteTarget /** @type {HTMLElement} */ = this._dialogs.delete.target;
	    var deleteDialog /** @type {HTMLElement} */ = this._dialogs.delete.dialog;
	    var deleteButtonConfirm /** @type {HTMLElement} */ = this._dialogs.delete.buttonConfirm;
	    var deleteButtonCancel /** @type {HTMLElement} */ = this._dialogs.delete.buttonCancel;
	    var onClickTargetDelete = function onClickTargetDelete(event) {
	      event.preventDefault();
	      deleteDialog.showModal();
	    };
	    var onDeleteConfirm = function onDeleteConfirm(event) {
	      this._onDelete();
	    };
	    var onDeleteCancel = function onDeleteCancel(event) {
	      deleteDialog.close();
	    };

	    // Show delete dialog
	    deleteTarget.addEventListener('click', onClickTargetDelete.bind(this));
	    // On confirm delete
	    deleteButtonConfirm.addEventListener('click', onDeleteConfirm.bind(this));
	    // On cancel delete
	    deleteButtonCancel.addEventListener('click', onDeleteCancel.bind(this));
	  };

	  /**
	   * Handle a delete of settings
	   * 
	   * @private
	   */
	  VintSettingsPrograma.prototype._onDelete = function () {
	    // Slug of 'publicacao' to delete
	    var slug = this._menu.element.dataset[this._datasets.MENU_SETTINGS_CAMEL];
	    var ajaxOptions = this._getAjaxOptions(slug);
	    // Disable actions while the request is pending.
	    this.disableActions();
	    this._sendAjaxRequest(ajaxOptions);
	  };

	  /**
	   * Handle a delete of settings
	   * 
	   * @param {string} publicacao slug
	   * @private
	   */
	  VintSettingsPrograma.prototype._getAjaxOptions = function (slug) {
	    var requestHandler = this._constants.DELETE_REQUEST_HANDLER;
	    var headerHandler = this._constants.OCTOBER_REQUEST_HANDLER;
	    var data = {
	      slug: slug
	    };
	    var headers = {};
	    headers[headerHandler] = requestHandler;
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };
	    var onComplete = function onComplete() {
	      this._dialogs.delete.dialog.close();
	      if (this._deleted) {
	        // Removes the deleted element from page
	        this.off();
	      } else {
	        // Only able the actions if the operation was unsucessfuly
	        this.ableActions();
	      }
	    };

	    return {
	      headers: headers,
	      type: 'post',
	      data: data,
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Handle the request response that's comes from server
	   * 
	   * @param {object}
	   * @private
	   */
	  VintSettingsPrograma.prototype._processResponse = function (response) {
	    var message /** @type {string} */;
	    if (!response.hasOwnProperty('success')) return;

	    if (response.success) {
	      // Deleted with success
	      this._deleted = true;
	      message = this._constants.MESSAGE_PUBLICACAO_DELETED;
	      this.toast({
	        message: message
	      });
	    } else {
	      // Problems to delete
	      this._deleted = false;
	      this.toast({
	        message: 'Não foi possível remover a programa'
	      });
	      // window.location.reload();
	    }
	  };

	  /**
	   * Initialize the instance
	   * 
	   * @public
	   */
	  VintSettingsPrograma.prototype.init = function () {
	    if (this._element) {
	      // Exists the container
	      this._menu = this._getMenu();
	      this._dialogs = this._getDialogs();
	      this._menuHandler();
	      this._dialogsHandler();
	    }
	  };

	  // Assumes that formHandler is available globally
	  settingsHandler.register({
	    constructor: VintSettingsPrograma,
	    classAsString: 'VintSettingsPrograma',
	    cssClass: 'vint-settings--programa'
	  });
	})();

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * VintSettingsMembro - A handler to Vint Settings Programa.
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

	  var VintSettingsMembro = function VintSettingsMembro(element) {
	    this._element = element;

	    // initialize the instance
	    this.init();
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsMembro.prototype._datasets = {
	    DIALOG: 'vint-dialog',
	    DIALOG_TARGET: 'vint-dialog-target',
	    DIALOG_TARGET_CAMEL: 'vintDialogTarget',
	    MENU_SETTINGS: 'vint-menu',
	    MENU_SETTINGS_CAMEL: 'vintMenu',
	    SETTINGS_HREF: 'vint-href',
	    SETTINGS_HREF_CAMEL: 'vintHref'
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsMembro.prototype._constants = {
	    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
	    DELETE_REQUEST_HANDLER: 'membroToggleState::onRequest',
	    MESSAGE_PUBLICACAO_DELETED: 'O membro foi atualizado',
	    ACCOUNT_COLOR_ABLED: '#69F0AE',
	    ACCOUNT_COLOR_DISABLED: '#FFFF00',
	    ACCOUNT_COLOR_REMOVED: '#F44336'
	  };

	  /** 
	   * Stories the css classes 
	   * 
	   * @private
	   */
	  VintSettingsMembro.prototype._cssClasses = {
	    SETTINGS: 'vint-settings',
	    SETTINGS_MENU: 'vint-settings__menu',
	    SETTINGS_MENU_BUTTON: 'vint-settings__menu-button',
	    SETTINGS_MENU_EDIT: 'vint-settings__menu-edit',
	    SETTINGS_MENU_DELETE: 'vint-settings__menu-delete',
	    DIALOG_BUTTON_CONFIRM: 'vint-dialog__buton-confirm',
	    DIALOG_BUTTON_CANCEL: 'vint-dialog__buton-cancel',
	    ACCOUNT_ACTIVE_CIRCLE: 'vint-active-circle--account',
	    TOOLTIP: 'mdl-tooltip'
	  };

	  /**
	   * Stories the flag that indicates state of settings 
	   * 
	   * @type {boolean}
	   * @private
	   */
	  VintSettingsMembro.prototype._deleted = false;

	  /**
	   * Stories the menu settings data 
	   * 
	   * @private
	   */
	  VintSettingsMembro.prototype._menu = {};

	  /**
	   * Stories the menu settings data 
	   * 
	   * @private
	   */
	  VintSettingsMembro.prototype._dialogs = {};

	  /**
	   * Handle the behavior of menu
	   *
	   * @private 
	   */
	  VintSettingsMembro.prototype._menuHandler = function () {
	    if (!this._menu.items.edit || this._menu.items.edit.hasAttribute('disabled')) return;
	    var onClickEdit = function onClickEdit(event) {
	      var location = this._menu.items.edit.dataset[this._datasets.SETTINGS_HREF_CAMEL];
	      if (location) {
	        window.location.href = location;
	      }
	    };
	    this._menu.items.edit.addEventListener('click', onClickEdit.bind(this));
	  };

	  /**
	   * Handle the behavior of dialogs
	   *
	   * @private 
	   */
	  VintSettingsMembro.prototype._dialogsHandler = function () {
	    if (!this._dialogs.delete) return;
	    var deleteTarget /** @type {HTMLElement} */ = this._dialogs.delete.target;
	    var deleteDialog /** @type {HTMLElement} */ = this._dialogs.delete.dialog;
	    var deleteButtonConfirm /** @type {HTMLElement} */ = this._dialogs.delete.buttonConfirm;
	    var deleteButtonCancel /** @type {HTMLElement} */ = this._dialogs.delete.buttonCancel;
	    var onClickTargetDelete = function onClickTargetDelete(event) {
	      event.preventDefault();
	      deleteDialog.showModal();
	    };
	    var onDeleteConfirm = function onDeleteConfirm(event) {
	      this._onDelete();
	    };
	    var onDeleteCancel = function onDeleteCancel(event) {
	      deleteDialog.close();
	    };

	    // Show delete dialog
	    deleteTarget.addEventListener('click', onClickTargetDelete.bind(this));
	    // On confirm delete
	    deleteButtonConfirm.addEventListener('click', onDeleteConfirm.bind(this));
	    // On cancel delete
	    deleteButtonCancel.addEventListener('click', onDeleteCancel.bind(this));
	  };

	  /**
	   * Handle a delete of settings
	   * 
	   * @private
	   */
	  VintSettingsMembro.prototype._onDelete = function () {
	    // Username to delete
	    var username = this._menu.element.dataset[this._datasets.MENU_SETTINGS_CAMEL];
	    var ajaxOptions = this._getAjaxOptions(username);
	    // Disable actions while the request is pending.
	    this.disableActions();
	    this._sendAjaxRequest(ajaxOptions);
	  };

	  /**
	   * Handle a delete of settings
	   * 
	   * @param {string} username
	   * @private
	   */
	  VintSettingsMembro.prototype._getAjaxOptions = function (username) {
	    var requestHandler = this._constants.DELETE_REQUEST_HANDLER;
	    var headerHandler = this._constants.OCTOBER_REQUEST_HANDLER;
	    var data = {
	      username: username
	    };
	    var headers = {};
	    headers[headerHandler] = requestHandler;
	    var onSuccess = function onSuccess(response) {
	      this._processResponse(response);
	    };
	    var onError = function onError(jqXHR, textStatus, errorThrown) {
	      this._processResponseError(jqXHR, textStatus, errorThrown);
	    };
	    var onComplete = function onComplete() {
	      this._dialogs.delete.dialog.close();
	      this.ableActions();
	      if (this._deleted) {
	        var newText /** @type {string} */;
	        var activeCircleColor /** @type {string} */;
	        var activeCircle = this._element.querySelector('.' + this._cssClasses.ACCOUNT_ACTIVE_CIRCLE);
	        var tooltip = this._element.querySelector('.' + this._cssClasses.TOOLTIP + '[for="' + activeCircle.getAttribute('id') + '"]');
	        if (this._element.classList.contains('is-off')) {
	          newText = 'Desativar';
	          activeCircleColor = this._constants.ACCOUNT_COLOR_ABLED;
	          tooltip.textContent = 'Conta ativa';
	          this._element.classList.remove('is-off');
	        } else {
	          newText = 'Ativar';
	          activeCircleColor = this._constants.ACCOUNT_COLOR_DISABLED;
	          tooltip.textContent = 'Conta desativada';
	          this._element.classList.add('is-off');
	        }
	        // Update the text content of menu item
	        this._menu.items.delete.textContent = newText;
	        if (activeCircle) {
	          activeCircle.style.backgroundColor = activeCircleColor;
	        }
	      }
	    };

	    return {
	      headers: headers,
	      type: 'post',
	      data: data,
	      success: onSuccess.bind(this),
	      complete: onComplete.bind(this),
	      error: onError.bind(this)
	    };
	  };

	  /**
	   * Handle the request response that's comes from server
	   * 
	   * @param {object}
	   * @private
	   */
	  VintSettingsMembro.prototype._processResponse = function (response) {
	    var message /** @type {string} */;
	    if (!response.hasOwnProperty('success')) return;

	    if (response.success) {
	      // Deleted with success
	      this._deleted = true;
	      message = this._constants.MESSAGE_PUBLICACAO_DELETED;
	      this.toast({
	        message: message
	      });
	    } else {
	      // Problems to delete
	      this._deleted = false;
	      this.toast({
	        message: 'Não foi possível atualizar a conta'
	      });
	    }
	  };

	  /**
	   * Initialize the instance
	   * 
	   * @public
	   */
	  VintSettingsMembro.prototype.init = function () {
	    if (this._element) {
	      // Exists the container
	      this._menu = this._getMenu();
	      this._dialogs = this._getDialogs();
	      this._menuHandler();
	      this._dialogsHandler();
	    }
	  };

	  // Assumes that formHandler is available globally
	  settingsHandler.register({
	    constructor: VintSettingsMembro,
	    classAsString: 'VintSettingsMembro',
	    cssClass: 'vint-settings--membro'
	  });
	})();

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

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

	  var VintChip = function VintChip(element) {
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
	    ACTIVE: 'active'
	  };

	  /**
	   * Store the custom events
	   *
	   * @private
	   */
	  VintChip.prototype._customEvents = {
	    ondelete: new CustomEvent('ondelete', {
	      bubbles: true,
	      cancelable: true
	    }),
	    onshow: new CustomEvent('onshow', {
	      bubbles: true,
	      cancelable: true
	    }),
	    onoff: new CustomEvent('onoff', {
	      bubbles: true,
	      cancelable: true
	    })
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
	    IS_DELETED: 'is-deleted'
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
	      this._element.dispatchEvent(this._customEvents.onshow);
	    }
	  };

	  /**
	  * Dispatch "ondelete" event on chip. 
	  * 
	  * @private
	  */
	  VintChip.prototype._dispatchEventOnDelete = function () {
	    // This event occurs when clicks on remove button (only if chip is deletable)
	    if (!this._chip.isDeletable || !this._chip.removeButton) return;

	    var onDeleteChip = function onDeleteChip() {
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
	    this._element.dispatchEvent(this._customEvents.onoff);
	  };

	  /**
	   * Get the chip config options
	   * 
	   * @return {Object<VintChip.ChipConfigPrivate>}
	   * @private
	   */
	  VintChip.prototype._getChip = function () {
	    var state = this._element.classList.contains(this._cssClasses.IS_DELETED) ? this._states.DELETED : this._states.ACTIVE;
	    var isDeletable = this._element.classList.contains(this._cssClasses.CHIP_DELETABLE);
	    var removeButton = this._element.querySelector('.' + this._cssClasses.CHIP_REMOVE_BUTTON) || null;

	    return {
	      state: state,
	      isDeletable: isDeletable,
	      removeButton: removeButton
	    };
	  };

	  /**
	    * Get the chip parent
	    * 
	    * @return {HTMLElement | boolean}
	    * @private
	    */
	  VintChip.prototype._getParent = function () {
	    var maxLoop = 10;
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
	    var chips = this.parent.querySelectorAll('.' + this._cssClasses.CHIP);
	    var order = {};
	    var index /** @type {number} */;
	    for (var i = 0; i < chips.length; i++) {
	      // Check if chip is active (not deleted)
	      if (!chips[i].classList.contains(this._cssClasses.IS_DELETED)) {
	        index = Object.keys(order).length + 1;
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
	  };

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

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * material-design-lite-stepper - A Material Design Lite Stepper component polyfill
	 * @version v0.1.0
	 * @license MIT
	 * @author Alexandre Thebaldi (ahlechandre@gmail.com).
	 * @link https://github.com/ahlechandre/mdl-stepper
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

	  var MaterialStepper = function MaterialStepper(element) {
	    this.element_ = element;

	    // initialize instance
	    this.init();
	  };

	  window['MaterialStepper'] = MaterialStepper;

	  /**
	   * Store properties of stepper
	   * @private
	   */
	  MaterialStepper.prototype.Stepper_ = {};

	  /**
	   * Get properties of stepper
	   * @private
	   */
	  MaterialStepper.prototype.getStepper_ = function () {
	    return {
	      isLinear: this.element_.classList.contains(this.CssClasses_.STEPPER_LINEAR),
	      hasFeedback: this.element_.classList.contains(this.CssClasses_.STEPPER_FEEDBACK)
	    };
	  };

	  /**
	   * Store strings for steps states
	   *
	   * @enum {string}
	   * @private
	   */
	  MaterialStepper.prototype.StepState_ = {
	    COMPLETED: 'completed',
	    ERROR: 'error',
	    NORMAL: 'normal'
	  };

	  /**
	   * Store strings for dataset attributes defined by this component that are used for
	   * JavaScript custom events.
	   *
	   * @enum {string}
	   * @private
	   */
	  MaterialStepper.prototype.DatasetAttributes_ = {
	    CONTINUE: 'stepper-next',
	    CANCEL: 'stepper-cancel',
	    SKIP: 'stepper-skip',
	    BACK: 'stepper-back'
	  };

	  /**
	   * Store the custom events applieds to the steps and stepper
	   *
	   * @private
	   */
	  MaterialStepper.prototype.CustomEvents_ = {
	    onstepnext: new CustomEvent('onstepnext', {
	      bubbles: true,
	      cancelable: true
	    }),
	    onstepcancel: new CustomEvent('onstepcancel', {
	      bubbles: true,
	      cancelable: true
	    }),
	    onstepskip: new CustomEvent('onstepskip', {
	      bubbles: true,
	      cancelable: true
	    }),
	    onstepback: new CustomEvent('onstepback', {
	      bubbles: true,
	      cancelable: true
	    }),
	    onstepcomplete: new CustomEvent('onstepcomplete', {
	      bubbles: true,
	      cancelable: true
	    }),
	    onsteperror: new CustomEvent('onsteperror', {
	      bubbles: true,
	      cancelable: true
	    }),
	    onsteppercomplete: new CustomEvent('onsteppercomplete', {
	      bubbles: true,
	      cancelable: true
	    })
	  };

	  /**
	   * Store strings for class names defined by this component that are used in
	   * JavaScript. This allows us to simply change it in one place should we
	   * decide to modify at a later date.
	   *
	   * @enum {string}
	   * @private
	   */
	  MaterialStepper.prototype.CssClasses_ = {
	    RIPPLE_EFFECT: 'mdl-js-ripple-effect',
	    BUTTON_JS: 'mdl-js-button',
	    STEPPER_LINEAR: 'mdl-stepper--linear',
	    STEPPER_FEEDBACK: 'mdl-stepper--feedback',
	    STEP_COMPLETED: 'mdl-step--completed',
	    STEP_ERROR: 'mdl-step--error',
	    STEP_TRANSIENT: 'mdl-step--transient',
	    STEP_OPTIONAL: 'mdl-step--optional',
	    STEP_EDITABLE: 'mdl-step--editable',
	    IS_ACTIVE: 'is-active',
	    TRANSIENT: 'mdl-step__transient',
	    TRANSIENT_OVERLAY: 'mdl-step__transient-overlay',
	    TRANSIENT_LOADER: 'mdl-step__transient-loader',
	    SPINNER: 'mdl-spinner',
	    SPINNER_JS: 'mdl-js-spinner',
	    SPINNER_IS_ACTIVE: 'is-active',
	    STEPPER: 'mdl-stepper',
	    STEP: 'mdl-step',
	    STEP_LABEL: 'mdl-step__label',
	    STEP_LABEL_INDICATOR: 'mdl-step__label-indicator',
	    STEP_LABEL_INDICATOR_CONTENT: 'mdl-step__label-indicator-content',
	    STEP_TITLE: 'mdl-step__title',
	    STEP_TITLE_TEXT: 'mdl-step__title-text',
	    STEP_TITLE_MESSAGE: 'mdl-step__title-message',
	    STEP_CONTENT: 'mdl-step__content',
	    STEP_ACTIONS: 'mdl-step__actions'
	  };

	  /**
	   * Store collection of steps and important data about them
	   * @private
	   */
	  MaterialStepper.prototype.Steps_ = {};

	  /**
	   * @param {MaterialStepper.Steps_.collection.<step>} Step that will get the label indicator
	   * @return {HTMLElement} Element that's represent the label indicator
	   * @private
	   */
	  MaterialStepper.prototype.getIndicatorElement_ = function (step) {
	    var indicatorElement = document.createElement('span');
	    var indicatorContent = this.getIndicatorContentNormal_(step.label_indicator_text);
	    indicatorElement.classList.add(this.CssClasses_.STEP_LABEL_INDICATOR);
	    indicatorElement.appendChild(indicatorContent);
	    return indicatorElement;
	  };

	  /**
	   * Create a new element that's represent "normal" label indicator
	   * @return {HTMLElement}
	   * @private
	   */
	  MaterialStepper.prototype.getIndicatorContentNormal_ = function (text) {
	    var normal = document.createElement('span');
	    normal.classList.add(this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT);
	    normal.textContent = text;
	    return normal;
	  };

	  /**
	   * Create a new element that's represent "completed" label indicator
	   * @return {HTMLElement}
	   * @private
	   */
	  MaterialStepper.prototype.getIndicatorContentCompleted_ = function (isEditable) {
	    // Creates a new material icon to represent the completed step
	    var completed = document.createElement('i');
	    completed.classList.add('material-icons', this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT);
	    // If step is editable the icon used will be "edit", else the icon will be "check"
	    completed.textContent = isEditable ? 'edit' : 'check';
	    return completed;
	  };

	  /**
	   * Create a new element that's represent "error" label indicator
	   * @return {HTMLElement}
	   * @private
	   */
	  MaterialStepper.prototype.getIndicatorContentError_ = function (step) {
	    var error = document.createElement('span');
	    error.classList.add(this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT);
	    error.textContent = '!';
	    return error;
	  };

	  /**
	   * Defines a new step model
	   * @private
	   */
	  MaterialStepper.prototype.getStepModel_ = function (step, id) {
	    var model = {};
	    model.container = step;
	    model.id = id;
	    model.label = step.querySelector('.' + this.CssClasses_.STEP_LABEL);
	    model.label_indicator_text = id;
	    model.label_title = step.querySelector('.' + this.CssClasses_.STEP_TITLE);
	    model.label_title_text = step.querySelector('.' + this.CssClasses_.STEP_TITLE_TEXT).textContent;
	    model.label_title_message = step.querySelector('.' + this.CssClasses_.STEP_TITLE_MESSAGE);
	    model.label_title_message_text = model.label_title_message ? model.label_title_message.textContent : '';
	    model.content = step.querySelector('.' + this.CssClasses_.STEP_CONTENT);
	    model.actions = step.querySelector('.' + this.CssClasses_.STEP_ACTIONS);
	    model.actions_next = model.actions.querySelector('[data-' + this.DatasetAttributes_.CONTINUE + ']') || null;
	    model.actions_cancel = model.actions.querySelector('[data-' + this.DatasetAttributes_.CANCEL + ']') || null;
	    model.actions_skip = model.actions.querySelector('[data-' + this.DatasetAttributes_.SKIP + ']') || null;
	    model.actions_back = model.actions.querySelector('[data-' + this.DatasetAttributes_.BACK + ']') || null;
	    model.label_indicator = model.label.querySelector('.' + this.CssClasses_.STEP_LABEL_INDICATOR);
	    if (!model.label_indicator) {
	      // Creates a new indicator for the label if not exists
	      model.label_indicator = this.getIndicatorElement_(model);
	      model.label.appendChild(model.label_indicator);
	    }
	    model.state = step.classList.contains(this.CssClasses_.STEP_COMPLETED) ? this.StepState_.COMPLETED : step.classList.contains(this.CssClasses_.STEP_ERROR) ? this.StepState_.ERROR : this.StepState_.NORMAL;
	    model.isActive = step.classList.contains(this.CssClasses_.IS_ACTIVE);
	    model.isOptional = step.classList.contains(this.CssClasses_.STEP_OPTIONAL);
	    model.isEditable = step.classList.contains(this.CssClasses_.STEP_EDITABLE);
	    return model;
	  };

	  /**
	   * Get the active step container
	   * @return {HTMLElement}
	   */
	  MaterialStepper.prototype.getActive = function () {
	    var element = this.Steps_.collection[this.Steps_.active - 1].container;
	    return element;
	  };

	  /**
	   * Get the active step id
	   * @return {number}
	   */
	  MaterialStepper.prototype.getActiveId = function () {
	    var id = this.Steps_.collection[this.Steps_.active - 1].id;
	    return id;
	  };

	  /**
	   * Load the model of all steps and store inside a collection
	   * @private
	   */
	  MaterialStepper.prototype.getSteps_ = function () {
	    var collection = [];
	    var total = 0;
	    var completed = 0;
	    var optional = 0;
	    var active = 0;
	    var stepElements = this.element_.querySelectorAll('.' + this.CssClasses_.STEP);
	    for (var i = 0; i < stepElements.length; i++) {
	      collection[i] = this.getStepModel_(stepElements[i], i + 1);
	      if (collection[i].isOptional) {
	        optional += 1;
	      }

	      if (collection[i].isActive) {
	        active = collection[i].id;
	      }
	    }
	    total = collection.length;
	    return {
	      collection: collection,
	      total: total,
	      completed: completed,
	      optional: optional,
	      active: active
	    };
	  };

	  /**
	   * Add material desing lite ripple effect classes on labels and upgrade the DOM.
	   * 
	   * @param {MaterialStepper.Steps_.collection[<number>]} 
	   * @private
	   */
	  MaterialStepper.prototype.LabelRippleEffect_ = function (step) {
	    var setEffect = function setEffect(step, index, steps) {
	      step.label.classList.add(this.CssClasses_.BUTTON_JS);
	      step.label.classList.add(this.CssClasses_.RIPPLE_EFFECT);
	    };

	    if (step) {
	      setEffect.bind(this)(step);
	    } else {
	      this.Steps_.collection.forEach(setEffect.bind(this));
	    }
	    // Assume componentHandler is available in the global scope.
	    componentHandler.upgradeDom();
	  };

	  /**
	   * Defines a specific step as "active".
	   * @private
	   */
	  MaterialStepper.prototype.setStepActive_ = function (step) {
	    // The transient effect blocks the stepper to move
	    if (this.hasTransient()) return false;
	    var stepsDeactivator = function stepsDeactivator(step, index, steps) {
	      step.container.classList.remove(this.CssClasses_.IS_ACTIVE);
	      if (step.isActive) {
	        step.isActive = false;
	      }
	    };
	    this.Steps_.collection.forEach(stepsDeactivator.bind(this));
	    // remove if step was in transient (feedback) effect
	    step.container.classList.remove(this.CssClasses_.STEP_TRANSIENT);
	    step.container.classList.add(this.CssClasses_.IS_ACTIVE);
	    step.isActive = true;
	    this.Steps_.active = step.id;
	    return true;
	  };

	  /**
	   * Defines as "active" the first step or a specific id.
	   * @param {number|undefined} - step model id
	   * @return {boolean}
	   * @private
	   */
	  MaterialStepper.prototype.setActive_ = function (id) {
	    // Return false if specified id is less or equal 0 and bigger than the last step
	    if (!isNaN(id) && (id > this.Steps_.total || id <= 0)) return false;

	    var moved = false;

	    if (id) {
	      for (var i = 0; i < this.Steps_.total; i++) {
	        var step = this.Steps_.collection[i];
	        if (step.id === id) {
	          moved = this.setStepActive_(step);
	          break;
	        }
	      }
	    } else {
	      var active = this.element_.querySelector('.' + this.CssClasses_.IS_ACTIVE);
	      if (!active) {
	        // Set the first step as "active" if none id was specified and
	        // no "active" step was found at the DOM
	        var first = this.Steps_.collection[0];
	        moved = this.setStepActive_(first);
	      }
	    }

	    if (this.Stepper_.isLinear) {
	      // We know that all steps previous the "active" are "completed"
	      // case the stepper is linear
	      this.updateLinearStates_();
	    }
	    return moved;
	  };

	  /**
	   * Change the state of a step
	   * 
	   * @param {MaterialStepper.Steps_.collection[<number>]}
	   * @param {string} - state can be "completed", "error", "normal"
	   * @return {boolean}
	   * @private
	   */
	  MaterialStepper.prototype.updateStepState_ = function (step, state) {
	    // We know that can't update the state for the same
	    if (step.state === state) return false;

	    // Case the current step state to change is "completed",
	    // we can decrement the total number of completed        
	    if (step.state === this.StepState_.COMPLETED) {
	      this.Steps_.completed -= 1;
	    }
	    var stateClass;
	    var indicatorContent;
	    var currentIndicatorContent = step.label_indicator.querySelector('.' + this.CssClasses_.STEP_LABEL_INDICATOR_CONTENT);
	    switch (state) {
	      case this.StepState_.COMPLETED:
	        {
	          // Case changing the current step state to "completed",
	          // we can increment the total number of completed
	          this.Steps_.completed += 1;
	          step.container.classList.remove(this.CssClasses_.STEP_ERROR);
	          indicatorContent = this.getIndicatorContentCompleted_(step.isEditable);
	          stateClass = this.CssClasses_.STEP_COMPLETED;
	          break;
	        }
	      case this.StepState_.ERROR:
	        {
	          step.container.classList.remove(this.CssClasses_.STEP_COMPLETED);
	          indicatorContent = this.getIndicatorContentError_();
	          stateClass = this.CssClasses_.STEP_ERROR;
	          break;
	        }
	      case this.StepState_.NORMAL:
	        {
	          step.container.classList.remove(this.CssClasses_.STEP_COMPLETED);
	          step.container.classList.remove(this.CssClasses_.STEP_ERROR);
	          indicatorContent = this.getIndicatorContentNormal_(step.label_indicator_text);
	          break;
	        }
	    }

	    // "normal" is the default state and don't have specific css class
	    if (stateClass) {
	      step.container.classList.add(stateClass);
	    }
	    step.label_indicator.replaceChild(indicatorContent, currentIndicatorContent);
	    step.state = state;

	    // Case the total number of completed steps
	    // are equal the total number of steps less the optionals
	    // or total number of completed steps are equal the total number of steps,
	    // we can consider that the stepper are successfully complete and
	    // dispatch the custom event
	    var stepperCompleted = false;

	    if (this.Steps_.completed === this.Steps_.total) {
	      stepperCompleted = true;
	    } else if (this.Steps_.completed === this.Steps_.total - this.Steps_.optional) {
	      var hasRequired;
	      for (var item in this.Steps_.collection) {
	        var stepItem = this.Steps_.collection[item];
	        hasRequired = !stepItem.isOptional && stepItem.state !== this.StepState_.COMPLETED;
	        if (hasRequired) break;
	      }
	      stepperCompleted = !hasRequired;
	    }

	    if (stepperCompleted) {
	      this.dispatchEventOnStepperComplete_();
	    }
	    return true;
	  };

	  /**
	   * Change to "completed" the state of all steps previous the "active"
	   * except the optionals
	   * 
	   * @private
	   */
	  MaterialStepper.prototype.updateLinearStates_ = function () {
	    for (var i = 0; i < this.Steps_.total; i++) {
	      if (!this.Steps_.collection[i].isActive) {
	        if (this.Steps_.collection[i].isOptional) continue;
	        this.updateStepState_(this.Steps_.collection[i], this.StepState_.COMPLETED);
	      } else {
	        break;
	      }
	    }
	  };

	  /**
	   * Move "active" to the previous step. This operation can returns false 
	   * if it does not regress the step.
	   * 
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.back = function () {
	    var moved = false;
	    var moveStep = function moveStep(step) {
	      var moved = this.setActive_(step.id);
	      if (moved) {
	        if (moved && this.Stepper_.hasFeedback) {
	          // Remove the (feedback) transient effect before move
	          this.removeTransientEffect_(step);
	        }
	      }
	      return moved;
	    };
	    for (var model in this.Steps_.collection) {
	      var step = this.Steps_.collection[model];

	      if (step.isActive) {
	        var previous = this.Steps_.collection[step.id - 2];
	        if (!previous) return false;
	        if (this.Stepper_.isLinear) {
	          if (previous.isEditable) {
	            moved = moveStep.bind(this)(previous);
	          }
	        } else {
	          moved = moveStep.bind(this)(previous);
	        }
	        break;
	      }
	    }
	    return moved;
	  };

	  /**
	   * Move "active" to the next if the current step is optional. This operation can returns false 
	   * if it does not advances the step.
	   * 
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.skip = function () {
	    var moved = false;
	    for (var model in this.Steps_.collection) {
	      var step = this.Steps_.collection[model];

	      if (step.isActive) {
	        if (step.isOptional) {
	          moved = this.setActive_(step.id + 1);
	          if (moved && this.Stepper_.hasFeedback) {
	            // Remove the (feedback) transient effect before move
	            this.removeTransientEffect_(step);
	          }
	        }
	        break;
	      }
	    }
	    return moved;
	  };

	  /**
	   * Move "active" to specified step id. 
	   * This operation is similar to the MaterialStepper.setActive_(<number>).
	   * 
	   * @return {boolean}
	   */
	  MaterialStepper.prototype.goto = function (id) {
	    return this.setActive_(id);
	  };

	  /**
	  * Defines the current state of step to "error" 
	  * and display alert message instead of default title message. 
	  *
	  * @param {string} 
	  */
	  MaterialStepper.prototype.error = function (message) {
	    for (var model in this.Steps_.collection) {
	      var step = this.Steps_.collection[model];

	      if (step.isActive) {
	        if (this.Stepper_.hasFeedback) {
	          // Remove the (feedback) transient effect before move
	          this.removeTransientEffect_(step);
	        }
	        this.updateStepState_(step, this.StepState_.ERROR);
	        if (message) {
	          this.updateTitleMessage_(step, message);
	        }
	        // Now dispatch on step the custom event "onsteperror" 
	        this.dispatchEventOnStepError_(step);
	        break;
	      }
	    }
	  };

	  /**
	  * Defines current step state to "completed" and move active to the next. 
	  * This operation can returns false if it does not advance the step. 
	  * 
	  * @return {boolean}
	  */
	  MaterialStepper.prototype.next = function () {
	    var moved = false;
	    for (var model in this.Steps_.collection) {
	      var step = this.Steps_.collection[model];

	      if (step.isActive) {
	        var activate = step.id + 1;

	        if (this.Stepper_.hasFeedback) {
	          // Remove the (feedback) transient effect before move
	          this.removeTransientEffect_(step);
	        }

	        if (step.state === this.StepState_.ERROR) {
	          // Case the current state of step is "error", update the error message
	          // to the original title message or just remove it.
	          if (step.label_title_message_text) {
	            this.updateTitleMessage_(step, step.label_title_message_text);
	          } else {
	            this.removeTitleMessage_(step);
	          }
	        }

	        if (step.isEditable && this.Stepper_.isLinear) {
	          // In linear steppers if the current step is editable the stepper needs to find
	          // the next step without "completed" state
	          for (var item in this.Steps_.collection) {
	            var stepItem = this.Steps_.collection[item];
	            if (stepItem.id > step.id && stepItem.state !== this.StepState_.COMPLETED) {
	              activate = stepItem.id;
	              break;
	            }
	          }
	        }
	        moved = this.setActive_(activate);
	        // Update "manually" the state of current step to "completed" because
	        // MaterialStepper.setActive_(<number>) can't change the state of non-linears steppers
	        // and can't change the state of optional or last step in linears steppers.
	        if (this.Stepper_.isLinear) {
	          if (step.isOptional || step.id === this.Steps_.total) {
	            this.updateStepState_(step, this.StepState_.COMPLETED);
	          }
	          if (step.isEditable) {
	            this.LabelRippleEffect_(step);
	          }
	        } else {
	          this.updateStepState_(step, this.StepState_.COMPLETED);
	        }

	        // Now dispatch on step the custom event "onstepcomplete"
	        this.dispatchEventOnStepComplete_(step);
	        break;
	      }
	    }
	    return moved;
	  };

	  /**
	  * Update the title message or creates a new if it not exists. 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  * @param {string}
	  */
	  MaterialStepper.prototype.updateTitleMessage_ = function (step, text) {
	    var titleMessage = step.container.querySelector('.' + this.CssClasses_.STEP_TITLE_MESSAGE);

	    if (!titleMessage) {
	      titleMessage = document.createElement('span');
	      titleMessage.classList.add(this.CssClasses_.STEP_TITLE_MESSAGE);
	      step.label_title.appendChild(titleMessage);
	    }

	    titleMessage.textContent = text;
	  };

	  /**
	  * Remove the title message if it exists. 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  */
	  MaterialStepper.prototype.removeTitleMessage_ = function (step) {
	    var titleMessage = step.container.querySelector('.' + this.CssClasses_.STEP_TITLE_MESSAGE);
	    if (titleMessage) {
	      titleMessage.parentNode.removeChild(titleMessage);
	    }
	  };

	  /**
	  * Remove (feedback) transient effect and applied to the step. 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  * @return {boolean}
	  */
	  MaterialStepper.prototype.removeTransientEffect_ = function (step) {
	    var transient = step.content.querySelector('.' + this.CssClasses_.TRANSIENT);
	    if (!transient) return false;

	    step.container.classList.remove(this.CssClasses_.STEP_TRANSIENT);
	    step.content.removeChild(transient);
	    return true;
	  };

	  /**
	  * Create (feedback) transient effect and apply to the current step. 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  * @return {boolean}
	  */
	  MaterialStepper.prototype.addTransientEffect_ = function (step) {
	    if (step.content.querySelector('.' + this.CssClasses_.TRANSIENT)) return false;
	    var transient = document.createElement('div');
	    var overlay = document.createElement('div');
	    var loader = document.createElement('div');
	    var spinner = document.createElement('div');
	    transient.classList.add(this.CssClasses_.TRANSIENT);
	    overlay.classList.add(this.CssClasses_.TRANSIENT_OVERLAY);
	    loader.classList.add(this.CssClasses_.TRANSIENT_LOADER);
	    spinner.classList.add(this.CssClasses_.SPINNER);
	    spinner.classList.add(this.CssClasses_.SPINNER_JS);
	    spinner.classList.add(this.CssClasses_.SPINNER_IS_ACTIVE);
	    loader.appendChild(spinner);
	    transient.appendChild(overlay);
	    transient.appendChild(loader);
	    step.container.classList.add(this.CssClasses_.STEP_TRANSIENT);
	    step.content.appendChild(transient);
	    // Assume componentHandler is available in the global scope.
	    componentHandler.upgradeDom();
	    return true;
	  };

	  /**
	  * Add event listener to linear, non-linear steppers and dispatch the custom events. 
	  * 
	  */
	  MaterialStepper.prototype.setCustomEvents_ = function () {
	    var linearLabels = function linearLabels(step, index, steps) {
	      // We know that editable steps can be activated by click on label case it's completed
	      if (step.isEditable) {
	        step.label.addEventListener('click', function (event) {
	          event.preventDefault();
	          if (step.state === this.StepState_.COMPLETED) {
	            this.setStepActive_(step);
	          }
	        }.bind(this));
	      }
	    };
	    var nonLinearLabels = function nonLinearLabels(step, index, steps) {
	      step.label.addEventListener('click', function (event) {
	        event.preventDefault();
	        this.setStepActive_(step);
	      }.bind(this));
	    };
	    var dispatchCustomEvents = function dispatchCustomEvents(step, index, steps) {
	      this.dispatchEventOnStepNext_(step);
	      this.dispatchEventOnStepCancel_(step);
	      this.dispatchEventOnStepSkip_(step);
	      this.dispatchEventOnStepBack_(step);
	    };

	    if (this.Stepper_.isLinear) {
	      this.Steps_.collection.forEach(linearLabels.bind(this));
	    } else {
	      this.Steps_.collection.forEach(nonLinearLabels.bind(this));
	    }
	    this.Steps_.collection.forEach(dispatchCustomEvents.bind(this));
	  };

	  /**
	  * Dispatch "onstepcomplete" event on step when method stepper.next() is invoked to the 
	  * current and return true. Or just when the active step change your state to "completed" 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  */
	  MaterialStepper.prototype.dispatchEventOnStepComplete_ = function (step) {
	    step.container.dispatchEvent(this.CustomEvents_.onstepcomplete);
	  };

	  /**
	  * Dispatch "onsteperror" event on step when method stepper.error('Your alert message') 
	  * is invoked to the current step and return true. Or just when the active step 
	  * change your state to "error" 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  */
	  MaterialStepper.prototype.dispatchEventOnStepError_ = function (step) {
	    step.container.dispatchEvent(this.CustomEvents_.onsteperror);
	  };

	  /**
	  * Dispatch "onsteppercomplete" event on stepper when all steps are completed. 
	  * If there is optionals steps, they will be ignored.
	  * 
	  */
	  MaterialStepper.prototype.dispatchEventOnStepperComplete_ = function () {
	    this.element_.dispatchEvent(this.CustomEvents_.onsteppercomplete);
	  };

	  /**
	  * Dispatch "onstepnext" event on step when the step action button/link with 
	  * [data-stepper-next] attribute is clicked. 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  */
	  MaterialStepper.prototype.dispatchEventOnStepNext_ = function (step) {
	    if (!step.actions_next) return false;

	    step.actions_next.addEventListener('click', function (event) {
	      if (this.Stepper_.hasFeedback) {
	        this.addTransientEffect_(step);
	      }
	      step.container.dispatchEvent(this.CustomEvents_.onstepnext);
	    }.bind(this));
	  };

	  /**
	  * Dispatch "onstepcancel" event on step when the step action button/link with 
	  * [data-stepper-cancel] attribute is clicked. 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  */
	  MaterialStepper.prototype.dispatchEventOnStepCancel_ = function (step) {
	    if (!step.actions_cancel) return false;

	    step.actions_cancel.addEventListener('click', function (event) {
	      event.preventDefault();
	      step.container.dispatchEvent(this.CustomEvents_.onstepcancel);
	    }.bind(this));
	  };

	  /**
	  * Dispatch "onstepskip" event on step when the step action button/link with 
	  * [data-stepper-skip] attribute is clicked. 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  */
	  MaterialStepper.prototype.dispatchEventOnStepSkip_ = function (step) {
	    if (!step.actions_skip) return false;

	    step.actions_skip.addEventListener('click', function (event) {
	      event.preventDefault();
	      step.container.dispatchEvent(this.CustomEvents_.onstepskip);
	    }.bind(this));
	  };

	  /**
	  * Dispatch "onstepback" event on step when the step action button/link with 
	  * [data-stepper-back] attribute is clicked. 
	  * 
	  * @param {MaterialStepper.Steps_.collection[<number>]}
	  */
	  MaterialStepper.prototype.dispatchEventOnStepBack_ = function (step) {
	    if (!step.actions_back) return false;

	    step.actions_back.addEventListener('click', function (event) {
	      event.preventDefault();
	      step.container.dispatchEvent(this.CustomEvents_.onstepback);
	    }.bind(this));
	  };

	  /**
	  * Check if has some active transient effect on steps
	  *
	  * @return {boolean} 
	  */
	  MaterialStepper.prototype.hasTransient = function () {
	    var cssClasseStep = '.' + this.CssClasses_.STEP;
	    var cssClasseStepContent = '.' + this.CssClasses_.STEP_CONTENT;
	    var cssClasseTransient = '.' + this.CssClasses_.TRANSIENT;
	    var transient = this.element_.querySelector(cssClasseStep + ' > ' + cssClasseStepContent + ' > ' + cssClasseTransient);
	    return transient ? true : false;
	  };

	  /**
	   * Initialize the instance
	   * @public
	   */
	  MaterialStepper.prototype.init = function () {
	    if (this.element_) {
	      this.Stepper_ = this.getStepper_();
	      this.Steps_ = this.getSteps_();
	      if (!this.Stepper_.isLinear) {
	        // non-linears stepper has ripple effect on labels
	        this.LabelRippleEffect_();
	      }
	      this.setActive_();
	      this.setCustomEvents_();
	    }
	  };

	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  componentHandler.register({
	    constructor: MaterialStepper,
	    classAsString: 'MaterialStepper',
	    cssClass: 'mdl-stepper',
	    widget: true
	  });
	})();

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function () {

	  var supportCustomEvent = window.CustomEvent;
	  if (!supportCustomEvent || (typeof supportCustomEvent === 'undefined' ? 'undefined' : _typeof(supportCustomEvent)) == 'object') {
	    supportCustomEvent = function CustomEvent(event, x) {
	      x = x || {};
	      var ev = document.createEvent('CustomEvent');
	      ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
	      return ev;
	    };
	    supportCustomEvent.prototype = window.Event.prototype;
	  }

	  /**
	   * Finds the nearest <dialog> from the passed element.
	   *
	   * @param {Element} el to search from
	   * @return {HTMLDialogElement} dialog found
	   */
	  function findNearestDialog(el) {
	    while (el) {
	      if (el.nodeName.toUpperCase() == 'DIALOG') {
	        return (/** @type {HTMLDialogElement} */el
	        );
	      }
	      el = el.parentElement;
	    }
	    return null;
	  }

	  /**
	   * Blur the specified element, as long as it's not the HTML body element.
	   * This works around an IE9/10 bug - blurring the body causes Windows to
	   * blur the whole application.
	   *
	   * @param {Element} el to blur
	   */
	  function safeBlur(el) {
	    if (el && el.blur && el != document.body) {
	      el.blur();
	    }
	  }

	  /**
	   * @param {!NodeList} nodeList to search
	   * @param {Node} node to find
	   * @return {boolean} whether node is inside nodeList
	   */
	  function inNodeList(nodeList, node) {
	    for (var i = 0; i < nodeList.length; ++i) {
	      if (nodeList[i] == node) {
	        return true;
	      }
	    }
	    return false;
	  }

	  /**
	   * @param {!HTMLDialogElement} dialog to upgrade
	   * @constructor
	   */
	  function dialogPolyfillInfo(dialog) {
	    this.dialog_ = dialog;
	    this.replacedStyleTop_ = false;
	    this.openAsModal_ = false;

	    // Set a11y role. Browsers that support dialog implicitly know this already.
	    if (!dialog.hasAttribute('role')) {
	      dialog.setAttribute('role', 'dialog');
	    }

	    dialog.show = this.show.bind(this);
	    dialog.showModal = this.showModal.bind(this);
	    dialog.close = this.close.bind(this);

	    if (!('returnValue' in dialog)) {
	      dialog.returnValue = '';
	    }

	    this.maybeHideModal = this.maybeHideModal.bind(this);
	    if ('MutationObserver' in window) {
	      // IE11+, most other browsers.
	      var mo = new MutationObserver(this.maybeHideModal);
	      mo.observe(dialog, { attributes: true, attributeFilter: ['open'] });
	    } else {
	      dialog.addEventListener('DOMAttrModified', this.maybeHideModal);
	    }
	    // Note that the DOM is observed inside DialogManager while any dialog
	    // is being displayed as a modal, to catch modal removal from the DOM.

	    Object.defineProperty(dialog, 'open', {
	      set: this.setOpen.bind(this),
	      get: dialog.hasAttribute.bind(dialog, 'open')
	    });

	    this.backdrop_ = document.createElement('div');
	    this.backdrop_.className = 'backdrop';
	    this.backdropClick_ = this.backdropClick_.bind(this);
	  }

	  dialogPolyfillInfo.prototype = {

	    get dialog() {
	      return this.dialog_;
	    },

	    /**
	     * Maybe remove this dialog from the modal top layer. This is called when
	     * a modal dialog may no longer be tenable, e.g., when the dialog is no
	     * longer open or is no longer part of the DOM.
	     */
	    maybeHideModal: function maybeHideModal() {
	      if (!this.openAsModal_) {
	        return;
	      }
	      if (this.dialog_.hasAttribute('open') && document.body.contains(this.dialog_)) {
	        return;
	      }

	      this.openAsModal_ = false;
	      this.dialog_.style.zIndex = '';

	      // This won't match the native <dialog> exactly because if the user set
	      // top on a centered polyfill dialog, that top gets thrown away when the
	      // dialog is closed. Not sure it's possible to polyfill this perfectly.
	      if (this.replacedStyleTop_) {
	        this.dialog_.style.top = '';
	        this.replacedStyleTop_ = false;
	      }

	      // Optimistically clear the modal part of this <dialog>.
	      this.backdrop_.removeEventListener('click', this.backdropClick_);
	      if (this.backdrop_.parentElement) {
	        this.backdrop_.parentElement.removeChild(this.backdrop_);
	      }
	      dialogPolyfill.dm.removeDialog(this);
	    },

	    /**
	     * @param {boolean} value whether to open or close this dialog
	     */
	    setOpen: function setOpen(value) {
	      if (value) {
	        this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
	      } else {
	        this.dialog_.removeAttribute('open');
	        this.maybeHideModal(); // nb. redundant with MutationObserver
	      }
	    },

	    /**
	     * Handles clicks on the fake .backdrop element, redirecting them as if
	     * they were on the dialog itself.
	     *
	     * @param {!Event} e to redirect
	     */
	    backdropClick_: function backdropClick_(e) {
	      var redirectedEvent = document.createEvent('MouseEvents');
	      redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
	      this.dialog_.dispatchEvent(redirectedEvent);
	      e.stopPropagation();
	    },

	    /**
	     * Sets the zIndex for the backdrop and dialog.
	     *
	     * @param {number} backdropZ
	     * @param {number} dialogZ
	     */
	    updateZIndex: function updateZIndex(backdropZ, dialogZ) {
	      this.backdrop_.style.zIndex = backdropZ;
	      this.dialog_.style.zIndex = dialogZ;
	    },

	    /**
	     * Shows the dialog. This is idempotent and will always succeed.
	     */
	    show: function show() {
	      this.setOpen(true);
	    },

	    /**
	     * Show this dialog modally.
	     */
	    showModal: function showModal() {
	      if (this.dialog_.hasAttribute('open')) {
	        throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');
	      }
	      if (!document.body.contains(this.dialog_)) {
	        throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');
	      }
	      if (!dialogPolyfill.dm.pushDialog(this)) {
	        throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');
	      }
	      this.show();
	      this.openAsModal_ = true;

	      // Optionally center vertically, relative to the current viewport.
	      if (dialogPolyfill.needsCentering(this.dialog_)) {
	        dialogPolyfill.reposition(this.dialog_);
	        this.replacedStyleTop_ = true;
	      } else {
	        this.replacedStyleTop_ = false;
	      }

	      // Insert backdrop.
	      this.backdrop_.addEventListener('click', this.backdropClick_);
	      this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling);

	      // Find element with `autofocus` attribute or first form control.
	      var target = this.dialog_.querySelector('[autofocus]:not([disabled])');
	      if (!target) {
	        // TODO: technically this is 'any focusable area'
	        var opts = ['button', 'input', 'keygen', 'select', 'textarea'];
	        var query = opts.map(function (el) {
	          return el + ':not([disabled])';
	        }).join(', ');
	        target = this.dialog_.querySelector(query);
	      }
	      safeBlur(document.activeElement);
	      target && target.focus();
	    },

	    /**
	     * Closes this HTMLDialogElement. This is optional vs clearing the open
	     * attribute, however this fires a 'close' event.
	     *
	     * @param {string=} opt_returnValue to use as the returnValue
	     */
	    close: function close(opt_returnValue) {
	      if (!this.dialog_.hasAttribute('open')) {
	        throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');
	      }
	      this.setOpen(false);

	      // Leave returnValue untouched in case it was set directly on the element
	      if (opt_returnValue !== undefined) {
	        this.dialog_.returnValue = opt_returnValue;
	      }

	      // Triggering "close" event for any attached listeners on the <dialog>.
	      var closeEvent = new supportCustomEvent('close', {
	        bubbles: false,
	        cancelable: false
	      });
	      this.dialog_.dispatchEvent(closeEvent);
	    }

	  };

	  var dialogPolyfill = {};

	  dialogPolyfill.reposition = function (element) {
	    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	    var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
	    element.style.top = Math.max(scrollTop, topValue) + 'px';
	  };

	  dialogPolyfill.isInlinePositionSetByStylesheet = function (element) {
	    for (var i = 0; i < document.styleSheets.length; ++i) {
	      var styleSheet = document.styleSheets[i];
	      var cssRules = null;
	      // Some browsers throw on cssRules.
	      try {
	        cssRules = styleSheet.cssRules;
	      } catch (e) {}
	      if (!cssRules) continue;
	      for (var j = 0; j < cssRules.length; ++j) {
	        var rule = cssRules[j];
	        var selectedNodes = null;
	        // Ignore errors on invalid selector texts.
	        try {
	          selectedNodes = document.querySelectorAll(rule.selectorText);
	        } catch (e) {}
	        if (!selectedNodes || !inNodeList(selectedNodes, element)) continue;
	        var cssTop = rule.style.getPropertyValue('top');
	        var cssBottom = rule.style.getPropertyValue('bottom');
	        if (cssTop && cssTop != 'auto' || cssBottom && cssBottom != 'auto') return true;
	      }
	    }
	    return false;
	  };

	  dialogPolyfill.needsCentering = function (dialog) {
	    var computedStyle = window.getComputedStyle(dialog);
	    if (computedStyle.position != 'absolute') {
	      return false;
	    }

	    // We must determine whether the top/bottom specified value is non-auto.  In
	    // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
	    // Firefox returns the used value. So we do this crazy thing instead: check
	    // the inline style and then go through CSS rules.
	    if (dialog.style.top != 'auto' && dialog.style.top != '' || dialog.style.bottom != 'auto' && dialog.style.bottom != '') return false;
	    return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
	  };

	  /**
	   * @param {!Element} element to force upgrade
	   */
	  dialogPolyfill.forceRegisterDialog = function (element) {
	    if (element.showModal) {
	      console.warn('This browser already supports <dialog>, the polyfill ' + 'may not work correctly', element);
	    }
	    if (element.nodeName.toUpperCase() != 'DIALOG') {
	      throw new Error('Failed to register dialog: The element is not a dialog.');
	    }
	    new dialogPolyfillInfo( /** @type {!HTMLDialogElement} */element);
	  };

	  /**
	   * @param {!Element} element to upgrade
	   */
	  dialogPolyfill.registerDialog = function (element) {
	    if (element.showModal) {
	      console.warn('Can\'t upgrade <dialog>: already supported', element);
	    } else {
	      dialogPolyfill.forceRegisterDialog(element);
	    }
	  };

	  /**
	   * @constructor
	   */
	  dialogPolyfill.DialogManager = function () {
	    /** @type {!Array<!dialogPolyfillInfo>} */
	    this.pendingDialogStack = [];

	    // The overlay is used to simulate how a modal dialog blocks the document.
	    // The blocking dialog is positioned on top of the overlay, and the rest of
	    // the dialogs on the pending dialog stack are positioned below it. In the
	    // actual implementation, the modal dialog stacking is controlled by the
	    // top layer, where z-index has no effect.
	    this.overlay = document.createElement('div');
	    this.overlay.className = '_dialog_overlay';
	    this.overlay.addEventListener('click', function (e) {
	      e.stopPropagation();
	    });

	    this.handleKey_ = this.handleKey_.bind(this);
	    this.handleFocus_ = this.handleFocus_.bind(this);
	    this.handleRemove_ = this.handleRemove_.bind(this);

	    this.zIndexLow_ = 100000;
	    this.zIndexHigh_ = 100000 + 150;
	  };

	  /**
	   * @return {Element} the top HTML dialog element, if any
	   */
	  dialogPolyfill.DialogManager.prototype.topDialogElement = function () {
	    if (this.pendingDialogStack.length) {
	      var t = this.pendingDialogStack[this.pendingDialogStack.length - 1];
	      return t.dialog;
	    }
	    return null;
	  };

	  /**
	   * Called on the first modal dialog being shown. Adds the overlay and related
	   * handlers.
	   */
	  dialogPolyfill.DialogManager.prototype.blockDocument = function () {
	    document.body.appendChild(this.overlay);
	    document.body.addEventListener('focus', this.handleFocus_, true);
	    document.addEventListener('keydown', this.handleKey_);
	    document.addEventListener('DOMNodeRemoved', this.handleRemove_);
	  };

	  /**
	   * Called on the first modal dialog being removed, i.e., when no more modal
	   * dialogs are visible.
	   */
	  dialogPolyfill.DialogManager.prototype.unblockDocument = function () {
	    document.body.removeChild(this.overlay);
	    document.body.removeEventListener('focus', this.handleFocus_, true);
	    document.removeEventListener('keydown', this.handleKey_);
	    document.removeEventListener('DOMNodeRemoved', this.handleRemove_);
	  };

	  dialogPolyfill.DialogManager.prototype.updateStacking = function () {
	    var zIndex = this.zIndexLow_;

	    for (var i = 0; i < this.pendingDialogStack.length; i++) {
	      if (i == this.pendingDialogStack.length - 1) {
	        this.overlay.style.zIndex = zIndex++;
	      }
	      this.pendingDialogStack[i].updateZIndex(zIndex++, zIndex++);
	    }
	  };

	  dialogPolyfill.DialogManager.prototype.handleFocus_ = function (event) {
	    var candidate = findNearestDialog( /** @type {Element} */event.target);
	    if (candidate != this.topDialogElement()) {
	      event.preventDefault();
	      event.stopPropagation();
	      safeBlur( /** @type {Element} */event.target);
	      // TODO: Focus on the browser chrome (aka document) or the dialog itself
	      // depending on the tab direction.
	      return false;
	    }
	  };

	  dialogPolyfill.DialogManager.prototype.handleKey_ = function (event) {
	    if (event.keyCode == 27) {
	      event.preventDefault();
	      event.stopPropagation();
	      var cancelEvent = new supportCustomEvent('cancel', {
	        bubbles: false,
	        cancelable: true
	      });
	      var dialog = this.topDialogElement();
	      if (dialog.dispatchEvent(cancelEvent)) {
	        dialog.close();
	      }
	    }
	  };

	  dialogPolyfill.DialogManager.prototype.handleRemove_ = function (event) {
	    if (event.target.nodeName.toUpperCase() != 'DIALOG') {
	      return;
	    }

	    var dialog = /** @type {HTMLDialogElement} */event.target;
	    if (!dialog.open) {
	      return;
	    }

	    // Find a dialogPolyfillInfo which matches the removed <dialog>.
	    this.pendingDialogStack.some(function (dpi) {
	      if (dpi.dialog == dialog) {
	        // This call will clear the dialogPolyfillInfo on this DialogManager
	        // as a side effect.
	        dpi.maybeHideModal();
	        return true;
	      }
	    });
	  };

	  /**
	   * @param {!dialogPolyfillInfo} dpi
	   * @return {boolean} whether the dialog was allowed
	   */
	  dialogPolyfill.DialogManager.prototype.pushDialog = function (dpi) {
	    var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
	    if (this.pendingDialogStack.length >= allowed) {
	      return false;
	    }
	    this.pendingDialogStack.push(dpi);
	    if (this.pendingDialogStack.length == 1) {
	      this.blockDocument();
	    }
	    this.updateStacking();
	    return true;
	  };

	  /**
	   * @param {dialogPolyfillInfo} dpi
	   */
	  dialogPolyfill.DialogManager.prototype.removeDialog = function (dpi) {
	    var index = this.pendingDialogStack.indexOf(dpi);
	    if (index == -1) {
	      return;
	    }

	    this.pendingDialogStack.splice(index, 1);
	    this.updateStacking();
	    if (this.pendingDialogStack.length == 0) {
	      this.unblockDocument();
	    }
	  };

	  dialogPolyfill.dm = new dialogPolyfill.DialogManager();

	  /**
	   * Global form 'dialog' method handler. Closes a dialog correctly on submit
	   * and possibly sets its return value.
	   */
	  document.addEventListener('submit', function (ev) {
	    var target = ev.target;
	    if (!target || !target.hasAttribute('method')) {
	      return;
	    }
	    if (target.getAttribute('method').toLowerCase() != 'dialog') {
	      return;
	    }
	    ev.preventDefault();

	    var dialog = findNearestDialog( /** @type {Element} */ev.target);
	    if (!dialog) {
	      return;
	    }

	    // FIXME: The original event doesn't contain the element used to submit the
	    // form (if any). Look in some possible places.
	    var returnValue;
	    var cands = [document.activeElement, ev.explicitOriginalTarget];
	    var els = ['BUTTON', 'INPUT'];
	    cands.some(function (cand) {
	      if (cand && cand.form == ev.target && els.indexOf(cand.nodeName.toUpperCase()) != -1) {
	        returnValue = cand.value;
	        return true;
	      }
	    });
	    dialog.close(returnValue);
	  }, true);

	  dialogPolyfill['forceRegisterDialog'] = dialogPolyfill.forceRegisterDialog;
	  dialogPolyfill['registerDialog'] = dialogPolyfill.registerDialog;

	  if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module['exports']) === 'object') {
	    // CommonJS support
	    module['exports'] = dialogPolyfill;
	  } else if ("function" === 'function' && 'amd' in __webpack_require__(32)) {
	    // AMD support
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return dialogPolyfill;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // all others
	    window['dialogPolyfill'] = dialogPolyfill;
	  }
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)(module)))

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * MDL File input
	 *
	 * LICENSE
	 *
	 * This source file is subject to the new BSD license that is bundled
	 * with this package in the file LICENSE.txt.
	 * It is also available through the world-wide-web at this URL:
	 * http://webhemi.gixx-web.com/license/new-bsd
	 * If you did not receive a copy of the license and are unable to
	 * obtain it through the world-wide-web, please send an email
	 * to license@gixx-web.com so we can send you a copy immediately.
	 *
	 * @author    Gabor Ivan <gixx@gixx-web.com>
	 * @copyright 2012 - 2016 Gixx-web (http://www.gixx-web.com)
	 * @license   http://webhemi.gixx-web.com/license/new-bsd   New BSD License
	 * @link      http://www.gixx-web.com
	 */
	(function () {
	    'use strict';

	    /**
	     * Class constructor for file input MDL component.
	     * Implements MDL component design pattern defined at:
	     * https://github.com/jasonmayes/mdl-component-design-pattern
	     *
	     * @param {HTMLElement} element The element that will be upgraded.
	     */

	    var MaterialFile = function MaterialFile(element) {
	        this.element_ = element;

	        // Initialize instance.
	        this.init();
	    };
	    window.MaterialFile = MaterialFile;

	    /**
	     * Store strings for class names defined by this component that are used in
	     * JavaScript. This allows us to simply change it in one place should we
	     * decide to modify at a later date.
	     *
	     * @enum {String}
	     * @private
	     */
	    MaterialFile.prototype.CssClasses_ = {
	        IS_UPGRADED: 'is-upgraded',
	        JS_FILE: 'mdl-js-file',
	        JS_TEXTFIELD: 'mdl-js-textfield',
	        FILE_FLOATING: 'mdl-file--floating-label',
	        FILE_LABEL: 'mdl-file__label',
	        TEXTFIELD: 'mdl-textfield',
	        TEXTFIELD_LABEL: 'mdl-textfield__label',
	        TEXTFIELD_FLOATING: 'mdl-textfield--floating-label',
	        TEXTFIELD_INPUT: 'mdl-textfield__input',
	        BUTTON: 'mdl-button',
	        BUTTON_PRIMARY: 'mdl-button--primary',
	        BUTTON_ICON: 'mdl-button--icon',
	        MATERIAL_ICONS: 'material-icons'
	    };

	    /**
	     *
	     * @type {string}
	     * @private
	     */
	    MaterialFile.prototype.multipleFilesSelected_ = 'files are selected';

	    /**
	     * File upload identifier string.
	     *
	     * @type {string}
	     * @private
	     */
	    MaterialFile.prototype.fileID_ = null;

	    /**
	     * File name input string;
	     *
	     * @type {string}
	     * @private
	     */
	    MaterialFile.prototype.fileNameID_ = null;

	    /**
	     * Fallback function for check string ending
	     *
	     * @param string
	     * @param search
	     * @returns {boolean}
	     * @private
	     */
	    MaterialFile.prototype.isStringEndsWith_ = function (string, search) {
	        try {
	            return string.endsWith(search);
	        } catch (exp) {
	            var stringLength = string.length;
	            var searchLength = search.length;
	            return string == string.substring(0, stringLength - searchLength) + search;
	        }
	    };

	    /**
	     * Create a variant name for the original field name.
	     * Handles arrayed names as well.
	     *
	     * @param {*} inputElement
	     * @param {string }variant
	     * @returns {string}
	     * @private
	     */
	    MaterialFile.prototype.getFieldNameVariant_ = function (inputElement, variant) {
	        var fieldName = '';
	        var nameVariant = '';

	        if (typeof inputElement == 'string') {
	            fieldName = inputElement;
	        } else {
	            fieldName = inputElement.getAttribute('name');
	        }

	        if (fieldName) {
	            if (this.isStringEndsWith_(fieldName, ']')) {
	                nameVariant = fieldName.substr(0, fieldName.length - 1) + '-' + variant + ']';
	            } else {
	                nameVariant = fieldName + '-' + variant;
	            }
	        } else {
	            console.warn('No name defined');
	        }

	        return nameVariant;
	    };

	    /**
	     * Input change event.
	     *
	     * @private
	     */
	    MaterialFile.prototype.inputChange_ = function (event) {
	        event.preventDefault();
	        var fileInput = event.target;
	        var selector = this.fileNameID_.replace(/([^a-zA-Z0-9])/g, '\\$1') + '';
	        var textInput = this.element_.querySelector('#' + selector);
	        var fileCount = fileInput.files.length;

	        if (!this.element_.classList.contains('is-focused') && !this.element_.classList.contains('is-dirty')) {
	            try {
	                var focusEvent = new Event('focus');
	                textInput.dispatchEvent(focusEvent);
	            } catch (exp) {
	                textInput.click();
	            }
	        }

	        if (fileCount > 0 && typeof fileInput.files[0].name != 'undefined') {
	            if (fileCount == 1) {
	                textInput.setAttribute('value', fileInput.files[0].name);
	            } else {
	                var label = this.element_.hasAttribute('data-placeholder-multiple') ? this.element_.getAttribute('data-placeholder-multiple') : this.multipleFilesSelected_;

	                textInput.setAttribute('value', fileCount + ' ' + label);
	            }
	            textInput.parentNode.classList.add('is-dirty');
	        } else {
	            textInput.setAttribute('value', '');
	            textInput.parentNode.classList.remove('is-dirty');
	        }
	    };

	    /**
	     * Initialize component.
	     */
	    MaterialFile.prototype.init = function () {
	        if (this.element_) {
	            // the file input
	            var fileInput = this.element_.querySelector('input[type=file]');
	            // the file input and label container
	            var mdlContainer = fileInput.parentNode;
	            // set the IDs
	            this.fileID_ = fileInput.getAttribute('id');
	            this.fileNameID_ = this.getFieldNameVariant_(this.fileID_, 'filename');

	            // update container class list
	            if (!mdlContainer.classList.contains(this.CssClasses_.TEXTFIELD)) {
	                mdlContainer.classList.add(this.CssClasses_.TEXTFIELD);
	            }

	            if (!mdlContainer.classList.contains(this.CssClasses_.JS_TEXTFIELD)) {
	                mdlContainer.classList.add(this.CssClasses_.JS_TEXTFIELD);
	            }

	            if (mdlContainer.classList.contains(this.CssClasses_.FILE_FLOATING)) {
	                mdlContainer.classList.remove(this.CssClasses_.FILE_FLOATING);
	                mdlContainer.classList.add(this.CssClasses_.TEXTFIELD_FLOATING);
	            }

	            // update the label
	            var label = mdlContainer.querySelector('label');
	            label.classList.remove(this.CssClasses_.FILE_LABEL);
	            label.classList.add(this.CssClasses_.TEXTFIELD_LABEL);
	            label.setAttribute('for', this.fileNameID_);

	            // add input field
	            var textInput = document.createElement('input');
	            textInput.setAttribute('type', 'text');
	            textInput.setAttribute('id', this.fileNameID_);
	            textInput.setAttribute('name', this.fileNameID_);
	            textInput.setAttribute('readonly', 'readonly');
	            textInput.classList.add(this.CssClasses_.TEXTFIELD_INPUT);
	            mdlContainer.insertBefore(textInput, label);

	            // create new container for the file input
	            var fileInputContainer = document.createElement('div');
	            fileInputContainer.classList.add(this.CssClasses_.BUTTON);
	            fileInputContainer.classList.add(this.CssClasses_.BUTTON_PRIMARY);
	            fileInputContainer.classList.add(this.CssClasses_.BUTTON_ICON);
	            mdlContainer.appendChild(fileInputContainer);

	            // create attach button
	            var attachButton = document.createElement('i');
	            attachButton.classList.add(this.CssClasses_.MATERIAL_ICONS);
	            fileInputContainer.appendChild(attachButton);

	            // button icon
	            var textNode = document.createTextNode("attach_file");
	            attachButton.appendChild(textNode);

	            // replace the file input
	            var clonedInput = fileInput.cloneNode(true);
	            clonedInput.classList.remove();
	            fileInputContainer.appendChild(clonedInput);
	            fileInput.remove();

	            // Add event listeners
	            clonedInput.addEventListener('change', this.inputChange_.bind(this));

	            // apply MDL on new elements
	            componentHandler.upgradeDom();
	            this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
	        }
	    };

	    // The component registers itself. It can assume componentHandler is available
	    // in the global scope.
	    componentHandler.register({
	        constructor: MaterialFile,
	        classAsString: 'MaterialFile',
	        cssClass: 'mdl-js-file',
	        widget: true
	    });
	})();

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Chart Handler - A module that handles the registration of multiple google charts 
	 * to render automatically on document load and also handle upgrades to be rendered 
	 * after initial page load. 
	 * 
	 * @author Alexandre Thebaldi <ahlechandre@gmail.com>
	 * @link <http://github.com/ahlechandre/chart-handler>
	 */
	var chartHandler = {
	  /**
	   * Registers the charts for future use. Can be called for register multiple
	   * charts or only one. This method append items in a registereds array.
	   * 
	   * @param {chartHandler.ChartConfig|Array<chartHandler.chartConfig>} The config data of charts
	   * to be registereds.
	   */
	  register: function register(ChartConfig) {},

	  /**
	   * Renders the chart of a given container selector. The chart must be registered.
	   * 
	   * @param {chartHandler.ChartConfig.containerSelector} 
	   */
	  render: function render(containerSelector) {},

	  /**
	   * Renders all registered charts.
	   * 
	   */
	  renderAll: function renderAll() {},

	  /**
	   * Renders all registered charts that is not rendered yet.
	   * 
	   */
	  renderAllDiff: function renderAllDiff() {},

	  /**
	   * Draw again all rendered charts with their data and options updates.
	   * 
	   */
	  upgradeAll: function upgradeAll() {},

	  /**
	   * Returns the array with all registereds charts.
	   * 
	   * @return {array}
	   */
	  getRegistereds: function getRegistereds() {},

	  /**
	   * Returns the array with all rendereds charts.
	   * 
	   * @return {array}
	   */
	  getRendereds: function getRendereds() {},

	  /**
	   * Initializes the basics of module.
	   * 
	   */
	  init: function init() {}
	};

	chartHandler = function () {
	  'use strict';

	  /**
	   * Stories the packages that must be loaded.
	   * 
	   */

	  var _defaultPackages = ['line', 'bar', 'corechart'];

	  /**
	   * Stories the strings used by the module.
	   * 
	   */
	  var _constants = {
	    GOOGLE_CHARTS_JS_FILE: '//www.gstatic.com/charts/loader.js',
	    DATASET_CHART_UPGRADED_CAMEL: 'chartUpgraded',
	    DATASET_CHART_UPGRADED: 'chart-upgraded',
	    CHART_CONTAINER_COMPONENT: 'Chart',
	    OPTIONS_HEIGHT: 400
	  };

	  /** @type {Array<chartHandler.ChartConfig>} */
	  var _registeredCharts = [];

	  /** @type {Array<chartHandler.Chart>} */
	  var _renderedCharts = [];

	  /**
	   * Queries for a registered chart by your container selector and return it.
	   * 
	   * @param {chartHandler.ChartConfig.containerSelector}
	   * @return {chartHandler.ChartConfig.containerSelector|null} 
	   */
	  var _findRegisteredChart = function _findRegisteredChart(containerSelector) {
	    var registered /** @type {string} */;

	    if (!containerSelector) throw new Error('Container selector was not defined.');

	    for (registered in _registeredCharts) {

	      if (_registeredCharts[registered]['containerSelector'] === containerSelector) return _registeredCharts[registered];
	    }
	    return null;
	  };

	  /**
	   * Searches for a already registered chart by your container.
	   * 
	   * @param {chartHandler.ChartConfig}
	   * @return {boolean}
	   */
	  var _existsRegisteredChart = function _existsRegisteredChart(ChartConfig) {
	    var registered /** @type {string} */;

	    if (!ChartConfig['containerSelector']) throw new Error('Container selector was not indentified for a chart of type: ' + ChartConfig['type']);

	    for (registered in _registeredCharts) {

	      if (_registeredCharts[registered]['containerSelector'] === ChartConfig['containerSelector']) return true;
	    }
	    return false;
	  };

	  /**
	   * Append the passed chart data to registered array.
	   * 
	   * @param {chartHandler.ChartConfig} Data to push in _registeredCharts.
	   * @return {boolean} True if sucessfully registered.
	   */
	  var _registerInternal = function _registerInternal(ChartConfig) {
	    // The item to append at registereds.
	    var config = {};

	    if (!ChartConfig) return false;

	    if (_existsRegisteredChart(ChartConfig)) throw new Error('Container selector already exists for: ' + ChartConfig['containerSelector']);

	    config['type'] = ChartConfig['type'];
	    config['containerSelector'] = ChartConfig['containerSelector'];
	    config['options'] = ChartConfig['options'];
	    config['dataTable'] = ChartConfig['dataTable'];

	    // Append the config.
	    _registeredCharts.push(config);
	    return true;
	  };

	  /**
	   * Registers the charts for future use. Can be called for register multiple
	   * charts or only one. This method append items in a registereds array.
	   * 
	   * @param {chartHandler.ChartConfig|Array<chartHandler.chartConfig>} The config data of charts
	   * to be registereds.
	   */
	  var _register = function _register(ChartConfig) {
	    var config;

	    if (ChartConfig instanceof Array) {
	      // Register multiple charts.

	      for (config in ChartConfig) {
	        _registerInternal(ChartConfig[config]);
	      }
	    } else if (ChartConfig instanceof Object) {
	      // Register only one chart.
	      _registerInternal(ChartConfig);
	    } else {
	      throw new Error('The data chart is not valid.');
	    }
	  };

	  /**
	   * Returns the google visualization object for type.
	   * 
	   * @param {object|array} The data of chart.
	   * @param {boolean} Defines the type of data table.
	   * @return {object|null}
	   */
	  var _getDataTable = function _getDataTable(dataTable, isArrayToDataTable) {
	    var data = {};
	    var column /** @type {string} */;

	    if (isArrayToDataTable) {
	      data = google.visualization.arrayToDataTable(dataTable);
	      return data;
	    }
	    // Must to specifies the data type and label of each column.
	    data = new google.visualization.DataTable();

	    for (column in dataTable.columns) {
	      // Passing the column type and title.
	      data.addColumn(dataTable.columns[column], column);
	    }
	    data.addRows(dataTable.rows);
	    return data;
	  };

	  /**
	   * Returns the essentials of a chart item.
	   * 
	   * @param {chartHandler.ChartConfig}
	   * @return {chartHandler.Chart}
	   */
	  var _getChart = function _getChart(ChartConfig) {
	    var chart = {};
	    var isArrayToDataTable /** @type {boolean} */;
	    chart = ChartConfig;
	    chart['container'] = document.querySelector(ChartConfig['containerSelector']) || null;

	    // chartHandler must not works without container element.
	    if (!chart['container']) throw new Error('The container element was not found for selector: ' + ChartConfig['containerSelector']);

	    // chartHandler must not works without data table.
	    if (!chart['dataTable']) throw new Error('The data table for chart "' + chart['containerSelector'] + '" was not defined.');

	    isArrayToDataTable = chart['dataTable'] instanceof Array;
	    chart['data'] = _getDataTable(chart['dataTable'], isArrayToDataTable);

	    return chart;
	  };

	  /**
	   * Returns the essentials of a chart item.
	   * 
	   * @param {chartHandler.Chart}
	   * @return {chartHandler.Chart.googleChart}
	   */
	  var _getGoogleChart = function _getGoogleChart(Chart) {
	    var googleChart = {};

	    switch (Chart.type.toLowerCase()) {
	      case 'bar':
	        googleChart = new google.charts.Bar(Chart.container);
	        break;
	      case 'line':
	        googleChart = new google.charts.Line(Chart.container);
	        break;
	      case 'pie':
	        googleChart = new google.visualization.PieChart(Chart.container);
	        break;
	    }
	    return googleChart;
	  };

	  /**
	   * Append the chart in rendereds array and indicates the chart 
	   * container as upgraded.
	   * 
	   * @param {chartHandler.Chart}
	   */
	  var _upgradeChart = function _upgradeChart(Chart) {
	    var rendered /** @type {string} */;
	    var isRendered = false;

	    for (rendered in _renderedCharts) {
	      // Chart already is upgraded.
	      if (_renderedCharts[rendered]['containerSelector'] === Chart['containerSelector']) return;
	    }
	    // Append the chart in rendereds array.
	    _renderedCharts.push(Chart);
	    // Put the chart in container element.
	    Chart.container[_constants.CHART_CONTAINER_COMPONENT] = Chart;
	    // Dataset flag to identifies if is already upgraded.
	    Chart.container.dataset[_constants.DATASET_CHART_UPGRADED_CAMEL] = Chart['type'];
	  };

	  /**
	   * Returns the default width used to render the charts.
	   * 
	   * @param {chartHandler.Chart.container} The element used to get offset width.
	   * @return {number}
	   */
	  var _getOptionsWidth = function _getOptionsWidth(container) {

	    if (!container) throw new Error('Container of chart was not found.');

	    return container.offsetWidth;
	  };

	  /**
	   * Returns the default height used to render the charts.
	   * 
	   * @return {number}
	   */
	  var _getOptionsHeight = function _getOptionsHeight() {
	    return _constants.OPTIONS_HEIGHT;
	  };

	  /**
	   * Defines the default options for chart. 
	   * 
	   * @param {chartHandler.Chart}
	   * @return {chartHandler.Chart.options}
	   */
	  var _setDefaultOptions = function _setDefaultOptions(chart) {

	    // Options must be a object.
	    if (!(chart['options'] instanceof Object)) chart['options'] = {};

	    // Gets the width of chart if it is not defined.
	    if (typeof chart['options']['width'] === 'undefined') chart['options']['width'] = _getOptionsWidth(chart['container']);

	    if (typeof chart['options']['height'] === 'undefined') chart['options']['height'] = _getOptionsHeight();
	  };

	  /**
	   * Draw the defined chart in your container element.
	   * 
	   * @param {chartHandler.Chart}
	   */
	  var _draw = function _draw(Chart) {
	    _setDefaultOptions(Chart);
	    Chart['googleChart'].draw(Chart['data'], Chart['options']);
	    // Indicates the chart container as upgraded.
	    _upgradeChart(Chart);
	  };

	  /**
	   * Renders the a chart item. 
	   * 
	   * @param {chartHandler.ChartConfig.containerSelector} 
	   */
	  var _renderInternal = function _renderInternal(containerSelector) {
	    var registeredChart = /** @type {chartHandler.ChartConfig|null} */_findRegisteredChart(containerSelector);
	    var chart /** @type {chartHandler.Chart} */;

	    if (!registeredChart) throw new Error('Chart to render was not found.');

	    chart = _getChart(registeredChart);
	    chart['googleChart'] = _getGoogleChart(chart);

	    if (!chart['googleChart']) throw new Error('The type "' + chart['type'] + '" is not valid in chartHandler');

	    // Now draw the chart.
	    _draw(chart);
	  };

	  /**
	   * Verifies if the Google visualization is available. Renders the chart of 
	   * a given container selector. The chart must be registered.
	   * 
	   * @param {chartHandler.ChartConfig.containerSelector} 
	   */
	  var _render = function _render(containerSelector) {

	    if (typeof google === 'undefined') return;

	    if (typeof google.visualization === 'undefined') {
	      // Google charts library was not loaded yet.
	      google.charts.setOnLoadCallback(function () {
	        return function () {
	          _renderInternal(containerSelector);
	        };
	      }());
	      return;
	    }
	    _renderInternal(containerSelector);
	  };

	  /**
	   * Renders all registered charts. Only internal calls.
	   * 
	   */
	  var _renderAllInternal = function _renderAllInternal() {
	    var registered /** @type {string} */;

	    for (registered in _registeredCharts) {
	      // Renders the given item.
	      _renderInternal(_registeredCharts[registered]['containerSelector']);
	    }
	  };

	  /** 
	   * Renders all registered charts that is not rendered. Only internal calls.
	   * 
	   */
	  var _renderAllDiffInternal = function _renderAllDiffInternal() {
	    var registered /** @type {string} */;
	    var rendered /** @type {string} */;
	    var isRendered /** @type {boolean} */;
	    // Defines if the container element is present in DOM.
	    var containerExists /** @type {boolean} */;

	    for (registered in _registeredCharts) {
	      // Initializes the flag as false.
	      isRendered = false;

	      // Searches for registered in rendereds.
	      for (rendered in _renderedCharts) {

	        if (_registeredCharts[registered]['containerSelector'] === _renderedCharts[rendered]['containerSelector']) isRendered = true;
	      }

	      // Only renders the chart if it is not rendered.
	      if (!isRendered) {
	        containerExists = document.querySelector(_registeredCharts[registered]['containerSelector']) ? true : false;

	        // Only renders the chart if the container is present in the DOM.
	        if (containerExists) {
	          // Renders the given item.
	          _renderInternal(_registeredCharts[registered]['containerSelector']);
	        }
	      }
	    }
	  };

	  /**
	   * Upgrade all rendereds charts.
	   * 
	   */
	  var _upgradeAll = function _upgradeAll() {
	    var renderedElements = document.querySelectorAll('[data-' + _constants.DATASET_CHART_UPGRADED + ']');

	    for (var i = 0; i < renderedElements.length; i++) {
	      _draw(renderedElements[i][_constants.CHART_CONTAINER_COMPONENT]);
	    }
	  };

	  /**
	   * Verifies if the Google visualization is available. Renders all registered charts.
	   * 
	   */
	  var _renderAll = function _renderAll() {

	    if (typeof google === 'undefined') return;

	    if (typeof google.visualization === 'undefined') {
	      // Google charts library was not loaded yet.
	      google.charts.setOnLoadCallback(function () {
	        return function () {
	          _renderAllInternal();
	        };
	      }());
	      return;
	    }
	    _renderAllInternal();
	  };

	  /**
	   * Verifies if the Google visualization is available. Renders all registered charts that
	   * is not rendered yet.
	   * 
	   */
	  var _renderAllDiff = function _renderAllDiff() {

	    if (typeof google.visualization === 'undefined') {
	      // Google charts library was not loaded yet.
	      google.charts.setOnLoadCallback(function () {
	        return function () {
	          _renderAllDiffInternal();
	        };
	      }());
	      return;
	    }
	    _renderAllDiffInternal();
	  };

	  /**
	   * Load the google charts packages supported by the module.
	   * 
	   */
	  var _loadPackages = function _loadPackages() {

	    // Check if google charts library is available.
	    if (typeof google === 'undefined' || typeof google.charts === 'undefined') throw new Error('Please, load the Google Chart library.');

	    google.charts.load('43', {
	      packages: _defaultPackages
	    });
	  };

	  /**
	   * Creates the script element and loads dinamically the google charts library. 
	   * After append the script element in document head, tries to load the packages.
	   * 
	   */
	  var _forceLoadPackages = function _forceLoadPackages() {
	    var scriptElement = document.createElement('script');
	    scriptElement.setAttribute('type', 'text/javascript');
	    scriptElement.setAttribute('src', _constants.GOOGLE_CHARTS_JS_FILE);
	    document.head.appendChild(scriptElement);

	    // Waits 1 second and try to load packages.
	    setTimeout(function () {
	      _loadPackages();
	      console.warn('chartHandler was forced to load Google charts library. We recommend that you must define manually this. Please, visit the Google charts website and see how include their script in your page.');
	    }, 1000);
	  };

	  /**
	   * Returns the array with all registereds charts.
	   * 
	   * @return {array}
	   */
	  var _getRegistereds = function _getRegistereds() {
	    return _registeredCharts;
	  };

	  /**
	   * Returns the array with all rendereds charts.
	   * 
	   * @return {array}
	   */
	  var _getRendereds = function _getRendereds() {
	    return _renderedCharts;
	  };

	  /**
	   * Initializes the basics of module.
	   * 
	   */
	  var _init = function _init() {

	    if (typeof google === 'undefined' || typeof google.charts === 'undefined') return;

	    _loadPackages();
	  };

	  // Now return the functions that should be made public.
	  return {
	    register: _register,
	    render: _render,
	    renderAll: _renderAll,
	    renderAllDiff: _renderAllDiff,
	    upgradeAll: _upgradeAll,
	    getRegistereds: _getRegistereds,
	    getRendereds: _getRendereds,
	    init: _init,
	    forceLoadPackages: _forceLoadPackages
	  };
	}();

	/**
	 * The config data of a chart to be registered.
	 * 
	 * @typedef {{
	 *   type: string,
	 *   containerSelector: string,
	 *   options: object,
	 *   dataTable: object|array,
	 * }}
	 */
	chartHandler.ChartConfig;

	/**
	 * The internal config data of a registered chart.
	 * 
	 * @typedef {{
	 *   type: string,
	 *   containerSelector: string,
	 *   container: HTMLElement,
	 *   options: object,
	 *   visualization: object,
	 *   googleChart: object,
	 *   dataTable: object|array,
	 * }}
	 */
	chartHandler.Chart;

	window['chartHandler'] = chartHandler;

	window.addEventListener('load', function () {
	  chartHandler.init();
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * The chart definition for projeto estados. 
	 * 
	 * @author Alexandre Thebaldi <ahlechandre@gmail.com>
	 */

	(function () {
	  'use strict';

	  /**
	   * Stories the data config used by chartHandler to register it.
	   * 
	   * @type {object}
	   */

	  var chartConfig = {};

	  /**
	   * Stories the data table used by getChartConfig to insert data in chart.
	   * 
	   * @type {array}
	   */
	  var dataTable = [];

	  /**
	   * Stories the css classes for future use.
	   * 
	   */
	  var cssClasses = {
	    CHART_MESSAGE: 'vint-chart__message'
	  };

	  /**
	   * 
	   * @return {HTMLElement} 
	   */
	  var getNotFoundData = function getNotFoundData() {
	    var messageContainer = document.createElement('div');
	    var iconElement = document.createElement('i');
	    var messageElement = document.createElement('span');
	    messageContainer.classList.add(cssClasses.CHART_MESSAGE);
	    iconElement.classList.add('material-icons');
	    iconElement.textContent = constants.CHART_ICON;
	    messageElement.textContent = constants.CHART_NOT_FOUND_MESSAGE;
	    messageContainer.appendChild(iconElement);
	    messageContainer.appendChild(messageElement);
	    return messageContainer;
	  };

	  /**
	   * Stories the constants for future use.
	   * 
	   */
	  var constants = {
	    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
	    REQUEST_HANDLER: 'dashboard::onRequestChartProjeto',
	    CHART_TYPE: 'pie',
	    CHART_OPTIONS_COLORS: ['#9575CD', '#5E35B1', '#311B92'],
	    CHART_CONTAINER_SELECTOR: '#chart-projeto-estados',
	    CHART_ICON: 'insert_chart',
	    CHART_NOT_FOUND_MESSAGE: 'Nenhum dado para ser exibido.',
	    CHART_IS_3D: true,
	    CHART_HEIGHT: 400
	  };

	  /**
	   * Stories the container element of chart.
	   * 
	   * @type {HTMLElement}
	   */
	  var container = {};

	  /**
	   * Returns the container element of chart.
	   * 
	   * @return {HTMLElement}
	   */
	  var getContainer = function getContainer() {
	    return document.querySelector(constants.CHART_CONTAINER_SELECTOR);
	  };

	  /**
	   * Returns the data config of chart.
	   * 
	   * @return {object}
	   */
	  var getChartConfig = function getChartConfig() {
	    var chartConfig = {
	      type: constants.CHART_TYPE,
	      containerSelector: constants.CHART_CONTAINER_SELECTOR,
	      options: {
	        is3D: constants.CHART_IS_3D,
	        colors: constants.CHART_OPTIONS_COLORS,
	        height: constants.CHART_HEIGHT // Default: 400.
	      },
	      dataTable: dataTable
	    };

	    return chartConfig;
	  };

	  /**
	   * Registers the chart in chartHandler.
	   * 
	   * @return {boolean} 
	   */
	  var registerChart = function registerChart() {
	    chartConfig = getChartConfig();

	    if (typeof chartHandler === 'undefined') {
	      console.warn('Please, load chartHandler.js before execute this.');
	      return false;
	    }
	    // Registering.
	    chartHandler.register(chartConfig);
	    return true;
	  };

	  /**
	   * Displays the not found data message. 
	   * 
	   */
	  var showNotFound = function showNotFound() {
	    var messageElement = getNotFoundData();
	    var chartContainer = document.querySelector(constants.CHART_CONTAINER_SELECTOR);
	    chartContainer.parentNode.style.height = constants.CHART_HEIGHT + 'px';
	    chartContainer.innerHTML = '';
	    chartContainer.appendChild(messageElement);
	  };

	  /**
	   * Process the response with success.
	   *
	   * @param {object} The response of server. 
	   */
	  var processResponseSuccess = function processResponseSuccess(response) {
	    var registered /** @type {boolean} */;

	    if (!response.hasOwnProperty('dataTable') || !response['dataTable']) {
	      showNotFound();
	      return;
	    }
	    dataTable = response['dataTable'];
	    registered = registerChart();

	    if (!registered) {
	      showNotFound();
	      return;
	    }
	    // All right, renders the chart.
	    chartHandler.render(chartConfig['containerSelector']);
	  };

	  /**
	   * Defines the options of ajax request.
	   * 
	   * @return {object}
	   */
	  var getAjaxOptions = function getAjaxOptions() {
	    var onSuccess = function onSuccess(response) {
	      processResponseSuccess(response);
	    };
	    var onError = function onError(obj, status, err) {
	      showNotFound();
	    };
	    var onComplete = function onComplete() {};

	    var headers = [];
	    headers[constants.OCTOBER_REQUEST_HANDLER] = constants.REQUEST_HANDLER;

	    return {
	      success: onSuccess.bind(this),
	      type: 'post',
	      error: onError.bind(this),
	      complete: onComplete.bind(this),
	      headers: headers
	    };
	  };

	  /**
	   * Sends an ajax request to server. 
	   * 
	   * @param {object} Ajax options
	   */
	  var sendAjaxRequest = function sendAjaxRequest(options) {

	    // Dependency.
	    if (!$ || !$.ajax) {
	      console.warn('Please, load jQuery ajax to execute this.');
	      return;
	    }

	    $.ajax(options);
	  };

	  /**
	   * Gets the data and renders the chart.
	   * 
	   */
	  var renderChart = function renderChart() {
	    var ajaxOptions = getAjaxOptions();
	    sendAjaxRequest(ajaxOptions);
	  };

	  /**
	   * Initializes the chart.
	   * 
	   */
	  var init = function init() {
	    container = getContainer();

	    if (!container) return;

	    renderChart();
	  };

	  window.addEventListener('load', function () {
	    init();
	  });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * The chart definition for publicacao estados. 
	 * 
	 * @author Alexandre Thebaldi <ahlechandre@gmail.com>
	 */

	(function () {
	  'use strict';

	  /**
	   * Stories the data config used by chartHandler to register it.
	   * 
	   * @type {object}
	   */

	  var chartConfig = {};

	  /**
	   * Stories the data table used by getChartConfig to insert data in chart.
	   * 
	   * @type {array}
	   */
	  var dataTable = [];

	  /**
	   * Stories the css classes for future use.
	   * 
	   */
	  var cssClasses = {
	    CHART_MESSAGE: 'vint-chart__message'
	  };

	  /**
	   * Stories the constants for future use.
	   * 
	   */
	  var constants = {
	    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
	    REQUEST_HANDLER: 'dashboard::onRequestChartPublicacao',
	    CHART_TYPE: 'pie',
	    CHART_OPTIONS_COLORS: ['#F06292', '#D81B60', '#880E4F', '#64B5F6', '#1E88E5', '#0D47A1'],
	    CHART_CONTAINER_SELECTOR: '#chart-publicacao-tipos',
	    CHART_HEIGHT: 400,
	    CHART_IS_3D: true,
	    CHART_ICON: 'insert_chart',
	    CHART_NOT_FOUND_MESSAGE: 'Nenhum dado para ser exibido.'
	  };

	  /**
	   * Stories the container element of chart.
	   * 
	   * @type {HTMLElement}
	   */
	  var container = {};

	  /**
	   * Returns the container element of chart.
	   * 
	   * @return {HTMLElement}
	   */
	  var getContainer = function getContainer() {
	    return document.querySelector(constants.CHART_CONTAINER_SELECTOR);
	  };

	  /**
	   * 
	   * @return {HTMLElement} 
	   */
	  var getNotFoundData = function getNotFoundData() {
	    var messageContainer = document.createElement('div');
	    var iconElement = document.createElement('i');
	    var messageElement = document.createElement('span');
	    messageContainer.classList.add(cssClasses.CHART_MESSAGE);
	    iconElement.classList.add('material-icons');
	    iconElement.textContent = constants.CHART_ICON;
	    messageElement.textContent = constants.CHART_NOT_FOUND_MESSAGE;
	    messageContainer.appendChild(iconElement);
	    messageContainer.appendChild(messageElement);
	    return messageContainer;
	  };

	  /**
	   * Returns the data config of chart.
	   * 
	   * @return {object}
	   */
	  var getChartConfig = function getChartConfig() {
	    var chartConfig = {
	      type: constants.CHART_TYPE,
	      containerSelector: constants.CHART_CONTAINER_SELECTOR,
	      options: {
	        is3D: constants.CHART_IS_3D,
	        sliceVisibilityThreshold: 0, // Displays 0 values.
	        colors: constants.CHART_OPTIONS_COLORS,
	        height: constants.CHART_HEIGHT // Default: 400.
	      },
	      dataTable: dataTable
	    };

	    return chartConfig;
	  };

	  /**
	   * Registers the chart in chartHandler.
	   * 
	   * @return {boolean} 
	   */
	  var registerChart = function registerChart() {
	    chartConfig = getChartConfig();

	    if (typeof chartHandler === 'undefined') {
	      console.warn('Please, load chartHandler.js before execute this.');
	      return false;
	    }
	    // Registering.
	    chartHandler.register(chartConfig);

	    return true;
	  };

	  /**
	   * Displays the not found data message. 
	   * 
	   */
	  var showNotFound = function showNotFound() {
	    var messageElement = getNotFoundData();
	    var chartContainer = document.querySelector(constants.CHART_CONTAINER_SELECTOR);
	    chartContainer.parentNode.style.height = constants.CHART_HEIGHT + 'px';
	    chartContainer.innerHTML = '';
	    chartContainer.appendChild(messageElement);
	  };

	  /**
	   * Process the response with success.
	   *
	   * @param {object} The response of server. 
	   */
	  var processResponseSuccess = function processResponseSuccess(response) {
	    var registered /** @type {boolean} */;

	    if (!response.hasOwnProperty('dataTable') || !response['dataTable']) {
	      showNotFound();
	      return;
	    }
	    dataTable = response['dataTable'];
	    registered = registerChart();

	    if (!registered) {
	      showNotFound();
	      return;
	    }
	    // All right, renders the chart.
	    chartHandler.render(chartConfig['containerSelector']);
	  };

	  /**
	   * Defines the options of ajax request.
	   * 
	   * @return {object}
	   */
	  var getAjaxOptions = function getAjaxOptions() {
	    var onSuccess = function onSuccess(response) {
	      processResponseSuccess(response);
	    };
	    var onError = function onError(obj, status, err) {
	      showNotFound();
	    };
	    var onComplete = function onComplete() {};

	    var headers = [];
	    headers[constants.OCTOBER_REQUEST_HANDLER] = constants.REQUEST_HANDLER;

	    return {
	      success: onSuccess.bind(this),
	      type: 'post',
	      error: onError.bind(this),
	      complete: onComplete.bind(this),
	      headers: headers
	    };
	  };

	  /**
	   * Sends an ajax request to server. 
	   * 
	   * @param {object} Ajax options
	   */
	  var sendAjaxRequest = function sendAjaxRequest(options) {

	    // Dependency.
	    if (!$ || !$.ajax) {
	      console.warn('Please, load jQuery ajax to execute this.');
	      return;
	    }

	    $.ajax(options);
	  };

	  /**
	   * Gets the data and renders the chart.
	   * 
	   */
	  var renderChart = function renderChart() {
	    var ajaxOptions = getAjaxOptions();
	    sendAjaxRequest(ajaxOptions);
	  };

	  /**
	   * Initializes the chart.
	   * 
	   */
	  var init = function init() {
	    container = getContainer();

	    if (!container) return;

	    renderChart();
	  };

	  window.addEventListener('load', function () {
	    init();
	  });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * The chart definition for membro status. 
	 * 
	 * @author Alexandre Thebaldi <ahlechandre@gmail.com>
	 */

	(function () {
	  'use strict';

	  /**
	   * Stories the data config used by chartHandler to register it.
	   * 
	   * @type {object}
	   */

	  var chartConfig = {};

	  /**
	   * Stories the data table used by getChartConfig to insert data in chart.
	   * 
	   * @type {array}
	   */
	  var dataTable = [];

	  /**
	   * Stories the css classes for future use.
	   * 
	   */
	  var cssClasses = {
	    CHART_MESSAGE: 'vint-chart__message'
	  };

	  /**
	   * 
	   * @return {HTMLElement} 
	   */
	  var getNotFoundData = function getNotFoundData() {
	    var messageContainer = document.createElement('div');
	    var iconElement = document.createElement('i');
	    var messageElement = document.createElement('span');
	    messageContainer.classList.add(cssClasses.CHART_MESSAGE);
	    iconElement.classList.add('material-icons');
	    iconElement.textContent = constants.CHART_ICON;
	    messageElement.textContent = constants.CHART_NOT_FOUND_MESSAGE;
	    messageContainer.appendChild(iconElement);
	    messageContainer.appendChild(messageElement);
	    return messageContainer;
	  };

	  /**
	   * Stories the constants for future use.
	   * 
	   */
	  var constants = {
	    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
	    REQUEST_HANDLER: 'dashboard::onRequestChartMembro',
	    CHART_TYPE: 'bar',
	    CHART_OPTIONS_COLORS: ['#9575CD'],
	    CHART_CONTAINER_SELECTOR: '#chart-membro-status',
	    CHART_ICON: 'insert_chart',
	    CHART_NOT_FOUND_MESSAGE: 'Nenhum dado para ser exibido.',
	    CHART_OPTIONS_LEGEND_POSITION: 'none',
	    CHART_HEIGHT: 300
	  };

	  /**
	   * Stories the container element of chart.
	   * 
	   * @type {HTMLElement}
	   */
	  var container = {};

	  /**
	   * Returns the container element of chart.
	   * 
	   * @return {HTMLElement}
	   */
	  var getContainer = function getContainer() {
	    return document.querySelector(constants.CHART_CONTAINER_SELECTOR);
	  };

	  /**
	   * Returns the data config of chart.
	   * 
	   * @return {object}
	   */
	  var getChartConfig = function getChartConfig() {
	    var chartConfig = {
	      type: constants.CHART_TYPE,
	      containerSelector: constants.CHART_CONTAINER_SELECTOR,
	      options: {
	        colors: constants.CHART_OPTIONS_COLORS,
	        legend: {
	          position: constants.CHART_OPTIONS_LEGEND_POSITION
	        },
	        height: constants.CHART_HEIGHT // Default: 400.
	      },
	      dataTable: dataTable
	    };

	    return chartConfig;
	  };

	  /**
	   * Registers the chart in chartHandler.
	   * 
	   * @return {boolean} 
	   */
	  var registerChart = function registerChart() {
	    chartConfig = getChartConfig();

	    if (typeof chartHandler === 'undefined') {
	      console.warn('Please, load chartHandler.js before execute this.');
	      return false;
	    }
	    // Registering.
	    chartHandler.register(chartConfig);
	    return true;
	  };

	  /**
	   * Displays the not found data message. 
	   * 
	   */
	  var showNotFound = function showNotFound() {
	    var messageElement = getNotFoundData();
	    var chartContainer = document.querySelector(constants.CHART_CONTAINER_SELECTOR);
	    chartContainer.parentNode.style.height = constants.CHART_HEIGHT + 'px';
	    chartContainer.innerHTML = '';
	    chartContainer.appendChild(messageElement);
	  };

	  /**
	   * Process the response with success.
	   *
	   * @param {object} The response of server. 
	   */
	  var processResponseSuccess = function processResponseSuccess(response) {
	    var registered /** @type {boolean} */;

	    if (!response.hasOwnProperty('dataTable') || !response['dataTable']) {
	      showNotFound();
	      return;
	    }
	    dataTable = response['dataTable'];
	    registered = registerChart();

	    if (!registered) {
	      showNotFound();
	      return;
	    }
	    // All right, renders the chart.
	    chartHandler.render(chartConfig['containerSelector']);
	  };

	  /**
	   * Defines the options of ajax request.
	   * 
	   * @return {object}
	   */
	  var getAjaxOptions = function getAjaxOptions() {
	    var onSuccess = function onSuccess(response) {
	      processResponseSuccess(response);
	    };
	    var onError = function onError(obj, status, err) {
	      showNotFound();
	    };
	    var onComplete = function onComplete() {};

	    var headers = [];
	    headers[constants.OCTOBER_REQUEST_HANDLER] = constants.REQUEST_HANDLER;

	    return {
	      success: onSuccess.bind(this),
	      type: 'post',
	      error: onError.bind(this),
	      complete: onComplete.bind(this),
	      headers: headers
	    };
	  };

	  /**
	   * Sends an ajax request to server. 
	   * 
	   * @param {object} Ajax options
	   */
	  var sendAjaxRequest = function sendAjaxRequest(options) {

	    // Dependency.
	    if (!$ || !$.ajax) {
	      console.warn('Please, load jQuery ajax to execute this.');
	      return;
	    }

	    $.ajax(options);
	  };

	  /**
	   * Gets the data and renders the chart.
	   * 
	   */
	  var renderChart = function renderChart() {
	    var ajaxOptions = getAjaxOptions();
	    sendAjaxRequest(ajaxOptions);
	  };

	  /**
	   * Initializes the chart.
	   * 
	   */
	  var init = function init() {
	    container = getContainer();

	    if (!container) return;

	    renderChart();
	  };

	  window.addEventListener('load', function () {
	    init();
	  });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * The chart definition for programa estados. 
	 * 
	 * @author Alexandre Thebaldi <ahlechandre@gmail.com>
	 */

	(function () {
	  'use strict';

	  /**
	   * Stories the data config used by chartHandler to register it.
	   * 
	   * @type {object}
	   */

	  var chartConfig = {};

	  /**
	   * Stories the data table used by getChartConfig to insert data in chart.
	   * 
	   * @type {array}
	   */
	  var dataTable = [];

	  /**
	   * Stories the css classes for future use.
	   * 
	   */
	  var cssClasses = {
	    CHART_MESSAGE: 'vint-chart__message'
	  };

	  /**
	   * 
	   * @return {HTMLElement} 
	   */
	  var getNotFoundData = function getNotFoundData() {
	    var messageContainer = document.createElement('div');
	    var iconElement = document.createElement('i');
	    var messageElement = document.createElement('span');
	    messageContainer.classList.add(cssClasses.CHART_MESSAGE);
	    iconElement.classList.add('material-icons');
	    iconElement.textContent = constants.CHART_ICON;
	    messageElement.textContent = constants.CHART_NOT_FOUND_MESSAGE;
	    messageContainer.appendChild(iconElement);
	    messageContainer.appendChild(messageElement);
	    return messageContainer;
	  };

	  /**
	   * Stories the constants for future use.
	   * 
	   */
	  var constants = {
	    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
	    REQUEST_HANDLER: 'dashboard::onRequestChartPrograma',
	    CHART_TYPE: 'bar',
	    CHART_OPTIONS_COLORS: ['#F06292'],
	    CHART_CONTAINER_SELECTOR: '#chart-programa-estados',
	    CHART_ICON: 'insert_chart',
	    CHART_NOT_FOUND_MESSAGE: 'Nenhum dado para ser exibido.',
	    CHART_HEIGHT: 300,
	    CHART_OPTIONS_LEGEND_POSITION: 'none'
	  };

	  /**
	   * Stories the container element of chart.
	   * 
	   * @type {HTMLElement}
	   */
	  var container = {};

	  /**
	   * Returns the container element of chart.
	   * 
	   * @return {HTMLElement}
	   */
	  var getContainer = function getContainer() {
	    return document.querySelector(constants.CHART_CONTAINER_SELECTOR);
	  };

	  /**
	   * Returns the data config of chart.
	   * 
	   * @return {object}
	   */
	  var getChartConfig = function getChartConfig() {
	    var chartConfig = {
	      type: constants.CHART_TYPE,
	      containerSelector: constants.CHART_CONTAINER_SELECTOR,
	      options: {
	        colors: constants.CHART_OPTIONS_COLORS,
	        legend: {
	          position: constants.CHART_OPTIONS_LEGEND_POSITION
	        },
	        height: constants.CHART_HEIGHT // Default: 400.
	      },
	      dataTable: dataTable
	    };

	    return chartConfig;
	  };

	  /**
	   * Registers the chart in chartHandler.
	   * 
	   * @return {boolean} 
	   */
	  var registerChart = function registerChart() {
	    chartConfig = getChartConfig();

	    if (typeof chartHandler === 'undefined') {
	      console.warn('Please, load chartHandler.js before execute this.');
	      return false;
	    }
	    // Registering.
	    chartHandler.register(chartConfig);
	    return true;
	  };

	  /**
	   * Displays the not found data message. 
	   * 
	   */
	  var showNotFound = function showNotFound() {
	    var messageElement = getNotFoundData();
	    var chartContainer = document.querySelector(constants.CHART_CONTAINER_SELECTOR);
	    chartContainer.parentNode.style.height = constants.CHART_HEIGHT + 'px';
	    chartContainer.innerHTML = '';
	    chartContainer.appendChild(messageElement);
	  };

	  /**
	   * Process the response with success.
	   *
	   * @param {object} The response of server. 
	   */
	  var processResponseSuccess = function processResponseSuccess(response) {
	    var registered /** @type {boolean} */;

	    if (!response.hasOwnProperty('dataTable') || !response['dataTable']) {
	      showNotFound();
	      return;
	    }
	    dataTable = response['dataTable'];
	    registered = registerChart();

	    if (!registered) {
	      showNotFound();
	      return;
	    }
	    // All right, renders the chart.
	    chartHandler.render(chartConfig['containerSelector']);
	  };

	  /**
	   * Defines the options of ajax request.
	   * 
	   * @return {object}
	   */
	  var getAjaxOptions = function getAjaxOptions() {
	    var onSuccess = function onSuccess(response) {
	      processResponseSuccess(response);
	    };
	    var onError = function onError(obj, status, err) {
	      showNotFound();
	    };
	    var onComplete = function onComplete() {};

	    var headers = [];
	    headers[constants.OCTOBER_REQUEST_HANDLER] = constants.REQUEST_HANDLER;

	    return {
	      success: onSuccess.bind(this),
	      type: 'post',
	      error: onError.bind(this),
	      complete: onComplete.bind(this),
	      headers: headers
	    };
	  };

	  /**
	   * Sends an ajax request to server. 
	   * 
	   * @param {object} Ajax options
	   */
	  var sendAjaxRequest = function sendAjaxRequest(options) {

	    // Dependency.
	    if (!$ || !$.ajax) {
	      console.warn('Please, load jQuery ajax to execute this.');
	      return;
	    }

	    $.ajax(options);
	  };

	  /**
	   * Gets the data and renders the chart.
	   * 
	   */
	  var renderChart = function renderChart() {
	    var ajaxOptions = getAjaxOptions();
	    sendAjaxRequest(ajaxOptions);
	  };

	  /**
	   * Initializes the chart.
	   * 
	   */
	  var init = function init() {
	    container = getContainer();

	    if (!container) return;

	    renderChart();
	  };

	  window.addEventListener('load', function () {
	    init();
	  });
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
/******/ ]);