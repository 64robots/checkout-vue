import http$1 from 'http';
import https from 'https';
import url$1 from 'url';
import assert from 'assert';
import stream from 'stream';
import tty from 'tty';
import util from 'util';
import os from 'os';
import zlib from 'zlib';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'R64Alert',
  props: {
    message: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'error'
    },
    visible: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        'c-text-red-600': this.isError,
        'c-text-green-500': this.isSuccess
      };
    },

    isError() {
      return this.type === 'error';
    },

    isSuccess() {
      return this.type === 'success';
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.visible,
      expression: "visible"
    }],
    staticClass: "c-flex c-w-full c-text-sm c-text-white c-mt-1"
  }, [_c('span', {
    class: _vm.classes
  }, [_vm._v("\n    " + _vm._s(_vm.message) + "\n  ")]), _vm._v(" "), _vm.closable ? _c('span', {
    staticClass: "c-px-4 c-text-lg c-cursor-pointer",
    on: {
      "click": function ($event) {
        return _vm.$emit('close');
      }
    }
  }, [_vm._v("x")]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var R64Alert = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

//
var script$1 = {
  name: 'R64FormInput',
  components: {
    R64Alert
  },
  props: {
    id: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: 'c-h-10 c-w-full c-px-3 c-rounded c-border c-text-base c-focus:outline-none'
    },
    alertClass: {
      type: String,
      default: null
    },
    errorMessage: {
      type: String,
      default: ''
    },
    showError: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    validator: {
      type: Object,
      default: null
    },
    value: {
      type: [String, Number, Object],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      hasInput: false,
      localValue: this.value
    };
  },

  computed: {
    internalType() {
      if (this.type === 'date' || this.type === 'phone' || this.type === 'email') {
        return 'text';
      }

      return this.type;
    },

    error() {
      return this.validator && this.validator.$error && (this.hasInput || this.showError);
    },

    errorId() {
      if (!this.invalidMessage) {
        return null;
      }

      if (!this.id) {
        return 'error-feedback';
      }

      return `${this.id}-error-feedback`;
    },

    errorVisible() {
      return this.error && this.errorMessage !== null;
    },

    keyboardType() {
      switch (this.type) {
        case 'date':
        case 'phone':
          return 'numeric';

        case 'email':
          return 'email';

        default:
          return 'normal';
      }
    },

    valid() {
      return this.state === 'valid';
    }

  },
  watch: {
    value(newVal) {
      this.localValue = newVal;
    },

    localValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal);
      }
    }

  },
  methods: {
    onBlur() {
      if (this.validator && this.hasInput) {
        this.validator.$touch();
      }

      this.$emit('blur', this.localValue);
    },

    onInput() {
      this.hasInput = true;
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "c-relative"
  }, [_vm.label ? _c('div', {
    staticClass: "c-mb-2"
  }, [_vm._v("\n    " + _vm._s(_vm.label) + "\n  ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "c-relative"
  }, [_vm.internalType === 'checkbox' ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localValue,
      expression: "localValue"
    }],
    ref: "input",
    class: [_vm.inputClass, {
      'c-border-red-500 c-focus:border-red-600': _vm.error,
      'c-border-c-gray c-focus:border-c-grayer': !_vm.error,
      'c-bg-c-light-gray': _vm.disabled
    }],
    attrs: {
      "disabled": _vm.disabled,
      "id": _vm.id,
      "placeholder": _vm.placeholder,
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.localValue) ? _vm._i(_vm.localValue, null) > -1 : _vm.localValue
    },
    on: {
      "blur": _vm.onBlur,
      "input": _vm.onInput,
      "change": function ($event) {
        var $$a = _vm.localValue,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.localValue = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.localValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.localValue = $$c;
        }
      }
    }
  }) : _vm.internalType === 'radio' ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localValue,
      expression: "localValue"
    }],
    ref: "input",
    class: [_vm.inputClass, {
      'c-border-red-500 c-focus:border-red-600': _vm.error,
      'c-border-c-gray c-focus:border-c-grayer': !_vm.error,
      'c-bg-c-light-gray': _vm.disabled
    }],
    attrs: {
      "disabled": _vm.disabled,
      "id": _vm.id,
      "placeholder": _vm.placeholder,
      "type": "radio"
    },
    domProps: {
      "checked": _vm._q(_vm.localValue, null)
    },
    on: {
      "blur": _vm.onBlur,
      "input": _vm.onInput,
      "change": function ($event) {
        _vm.localValue = null;
      }
    }
  }) : _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localValue,
      expression: "localValue"
    }],
    ref: "input",
    class: [_vm.inputClass, {
      'c-border-red-500 c-focus:border-red-600': _vm.error,
      'c-border-c-gray c-focus:border-c-grayer': !_vm.error,
      'c-bg-c-light-gray': _vm.disabled
    }],
    attrs: {
      "disabled": _vm.disabled,
      "id": _vm.id,
      "placeholder": _vm.placeholder,
      "type": _vm.internalType
    },
    domProps: {
      "value": _vm.localValue
    },
    on: {
      "blur": _vm.onBlur,
      "input": [function ($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.localValue = $event.target.value;
      }, _vm.onInput]
    }
  }), _vm._v(" "), _c('R64Alert', {
    staticClass: "c-absolute c-left-0",
    class: _vm.alertClass,
    attrs: {
      "visible": _vm.errorVisible,
      "message": _vm.errorMessage
    }
  })], 1)]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

var R64FormInput = normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies$1 = cookies;

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies$1.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

var debug = createCommonjsModule(function (module, exports) {
/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = ms;

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}
});
var debug_1 = debug.coerce;
var debug_2 = debug.disable;
var debug_3 = debug.enable;
var debug_4 = debug.enabled;
var debug_5 = debug.humanize;
var debug_6 = debug.instances;
var debug_7 = debug.names;
var debug_8 = debug.skips;
var debug_9 = debug.formatters;

var browser = createCommonjsModule(function (module, exports) {
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
});
var browser_1 = browser.log;
var browser_2 = browser.formatArgs;
var browser_3 = browser.save;
var browser_4 = browser.load;
var browser_5 = browser.useColors;
var browser_6 = browser.storage;
var browser_7 = browser.colors;

var hasFlag = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}
if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

var supportsColor_1 = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};

var node = createCommonjsModule(function (module, exports) {
/**
 * Module dependencies.
 */




/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = supportsColor_1;
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());
});
var node_1 = node.init;
var node_2 = node.log;
var node_3 = node.formatArgs;
var node_4 = node.save;
var node_5 = node.load;
var node_6 = node.useColors;
var node_7 = node.colors;
var node_8 = node.inspectOpts;

var src = createCommonjsModule(function (module) {
/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = browser;
} else {
  module.exports = node;
}
});

var Writable = stream.Writable;
var debug$1 = src("follow-redirects");

// RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg) {
    this._redirectable.emit(event, arg);
  };
});

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  options.headers = options.headers || {};
  this._options = options;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new Error("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new Error("Request body larger than maxBodyLength limit"));
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data and end
  var currentRequest = this._currentRequest;
  this.write(data || "", encoding, function () {
    currentRequest.end(null, null, callback);
  });
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive", "setTimeout",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new Error("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url$1.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var buffers = this._requestBodyBuffers;
    (function writeNext() {
      if (i < buffers.length) {
        var buffer = buffers[i++];
        request.write(buffer.data, buffer.encoding, writeNext);
      }
      else {
        request.end();
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: response.statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      response.statusCode >= 300 && response.statusCode < 400) {
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new Error("Max redirects exceeded."));
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe […],
    // since the user might not wish to redirect an unsafe request.
    // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
    // that the target resource resides temporarily under a different URI
    // and the user agent MUST NOT change the request method
    // if it performs an automatic redirection to that URI.
    var header;
    var headers = this._options.headers;
    if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      for (header in headers) {
        if (/^content-/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Drop the Host header, as the redirect might lead to a different host
    if (!this._isRedirect) {
      for (header in headers) {
        if (/^host$/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Perform the redirected request
    var redirectUrl = url$1.resolve(this._currentUrl, location);
    debug$1("redirecting to", redirectUrl);
    Object.assign(this._options, url$1.parse(redirectUrl));
    this._isRedirect = true;
    this._performRequest();

    // Discard the remainder of the response to avoid waiting for data
    response.destroy();
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    wrappedProtocol.request = function (options, callback) {
      if (typeof options === "string") {
        options = url$1.parse(options);
        options.maxRedirects = exports.maxRedirects;
      }
      else {
        options = Object.assign({
          protocol: protocol,
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, options);
      }
      options.nativeProtocols = nativeProtocols;
      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug$1("options", options);
      return new RedirectableRequest(options, callback);
    };

    // Executes a GET request, following redirects
    wrappedProtocol.get = function (options, callback) {
      var request = wrappedProtocol.request(options, callback);
      request.end();
      return request;
    };
  });
  return exports;
}

// Exports
var followRedirects = wrap({ http: http$1, https: https });
var wrap_1 = wrap;
followRedirects.wrap = wrap_1;

var name = "axios";
var version = "0.19.2";
var description = "Promise based HTTP client for the browser and node.js";
var main = "index.js";
var scripts = {
	test: "grunt test && bundlesize",
	start: "node ./sandbox/server.js",
	build: "NODE_ENV=production grunt build",
	preversion: "npm test",
	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
	postversion: "git push && git push --tags",
	examples: "node ./examples/server.js",
	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
	fix: "eslint --fix lib/**/*.js"
};
var repository = {
	type: "git",
	url: "https://github.com/axios/axios.git"
};
var keywords = [
	"xhr",
	"http",
	"ajax",
	"promise",
	"node"
];
var author = "Matt Zabriskie";
var license = "MIT";
var bugs = {
	url: "https://github.com/axios/axios/issues"
};
var homepage = "https://github.com/axios/axios";
var devDependencies = {
	bundlesize: "^0.17.0",
	coveralls: "^3.0.0",
	"es6-promise": "^4.2.4",
	grunt: "^1.0.2",
	"grunt-banner": "^0.6.0",
	"grunt-cli": "^1.2.0",
	"grunt-contrib-clean": "^1.1.0",
	"grunt-contrib-watch": "^1.0.0",
	"grunt-eslint": "^20.1.0",
	"grunt-karma": "^2.0.0",
	"grunt-mocha-test": "^0.13.3",
	"grunt-ts": "^6.0.0-beta.19",
	"grunt-webpack": "^1.0.18",
	"istanbul-instrumenter-loader": "^1.0.0",
	"jasmine-core": "^2.4.1",
	karma: "^1.3.0",
	"karma-chrome-launcher": "^2.2.0",
	"karma-coverage": "^1.1.1",
	"karma-firefox-launcher": "^1.1.0",
	"karma-jasmine": "^1.1.1",
	"karma-jasmine-ajax": "^0.1.13",
	"karma-opera-launcher": "^1.0.0",
	"karma-safari-launcher": "^1.0.0",
	"karma-sauce-launcher": "^1.2.0",
	"karma-sinon": "^1.0.5",
	"karma-sourcemap-loader": "^0.3.7",
	"karma-webpack": "^1.7.0",
	"load-grunt-tasks": "^3.5.2",
	minimist: "^1.2.0",
	mocha: "^5.2.0",
	sinon: "^4.5.0",
	typescript: "^2.8.1",
	"url-search-params": "^0.10.0",
	webpack: "^1.13.1",
	"webpack-dev-server": "^1.14.1"
};
var browser$1 = {
	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
};
var typings = "./index.d.ts";
var dependencies = {
	"follow-redirects": "1.5.10"
};
var bundlesize = [
	{
		path: "./dist/axios.min.js",
		threshold: "5kB"
	}
];
var _package = {
	name: name,
	version: version,
	description: description,
	main: main,
	scripts: scripts,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	bugs: bugs,
	homepage: homepage,
	devDependencies: devDependencies,
	browser: browser$1,
	typings: typings,
	dependencies: dependencies,
	bundlesize: bundlesize
};

var _package$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  name: name,
  version: version,
  description: description,
  main: main,
  scripts: scripts,
  repository: repository,
  keywords: keywords,
  author: author,
  license: license,
  bugs: bugs,
  homepage: homepage,
  devDependencies: devDependencies,
  browser: browser$1,
  typings: typings,
  dependencies: dependencies,
  bundlesize: bundlesize,
  'default': _package
});

var pkg = getCjsExportFromNamespace(_package$1);

var httpFollow = followRedirects.http;
var httpsFollow = followRedirects.https;






var isHttps = /https:?/;

/*eslint consistent-return:0*/
var http_1 = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url$1.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url$1.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }


        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http$1;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
      /*eslint default-case:0*/
      case 'gzip':
      case 'compress':
      case 'deflate':
        // add the unzipper to the body stream processing pipeline
        stream = (res.statusCode === 204) ? stream : stream.pipe(zlib.createUnzip());

        // remove the content-encoding in order to not confuse downstream operations
        delete res.headers['content-encoding'];
        break;
      }

      // return the last request in case of redirects
      var lastRequest = res.req || req;

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted) return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = http_1;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var _default = axios;
axios_1.default = _default;

var axios$1 = axios_1;

var http = {
  get(params) {
    return axios$1.get(params).then(response => response.data);
  },

  post(...params) {
    return axios$1.post(...params).then(response => response.data);
  },

  put(...params) {
    return axios$1.put(...params).then(response => response.data);
  },

  delete(...params) {
    return axios$1.delete(...params).then(response => response.data);
  }

};

var cartApi = {
  url: '/api/carts',

  create(productId) {
    return http.post(this.url, {
      product_id: productId
    });
  },

  get(cartToken) {
    return http.get(this.url + `/${cartToken}`);
  },

  update(cartToken, params) {
    return http.put(this.url + `/${cartToken}`, params);
  },

  updateZipCode(cartToken, zipCode) {
    return http.put(this.url + `/${cartToken}/zipcode`, {
      zipcode: zipCode
    });
  },

  updateShipping(cartToken, zipCode) {
    return http.put(this.url + `/${cartToken}/shipping`, {
      zipcode: zipCode
    });
  },

  addOptions(cartToken, options) {
    return http.post(this.url + `/${cartToken}/options`, {
      options: options
    });
  },

  updateEmail(cartToken, email) {
    return http.put(this.url + `/${cartToken}/email`, {
      customer_email: email
    });
  },

  delete(cartToken) {
    return http.delete(this.url + `/${cartToken}`);
  }

};

var cartItemApi = {
  url: '/api/cart-items',

  create(cartToken, cartItem) {
    return http.post(cartApi.url + `/${cartToken}/cart-items`, {
      product_id: cartItem.product_id,
      quantity: cartItem.quantity
    });
  },

  update(cartItemToken, data) {
    return http.put(this.url + `/${cartItemToken}`, data);
  },

  delete(cartItemToken) {
    return http.delete(this.url + `/${cartItemToken}`);
  }

};

var cartItem = {
  props: {
    cartItem: {
      type: Object,
      default: null
    }
  },
  computed: {
    hasImage() {
      return this.cartItem.product.image;
    },

    imageSrc() {
      return this.cartItem.product.image.src;
    },

    productName() {
      return this.cartItem.product.name;
    }

  }
};

var money = {
  props: {
    currencySymbol: {
      type: String,
      default: '$'
    }
  },
  methods: {
    money(price) {
      return `${this.currencySymbol}${price}`;
    }

  }
};

var vval = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchChildren = patchChildren;
exports.h = h;

function isUndef(v) {
  return v === null || v === undefined;
}

function isDef(v) {
  return v !== null && v !== undefined;
}

function sameVval(oldVval, vval) {
  return vval.tag === oldVval.tag && vval.key === oldVval.key;
}

function createVm(vval) {
  var Vm = vval.tag;
  vval.vm = new Vm({
    data: vval.args
  });
}

function updateVval(vval) {
  var keys = Object.keys(vval.args);

  for (var i = 0; i < keys.length; i++) {
    keys.forEach(function (k) {
      vval.vm[k] = vval.args[k];
    });
  }
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }

  return map;
}

function updateChildren(oldCh, newCh) {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVval = oldCh[0];
  var oldEndVval = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVval = newCh[0];
  var newEndVval = newCh[newEndIdx];
  var oldKeyToIdx, idxInOld, elmToMove;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVval)) {
      oldStartVval = oldCh[++oldStartIdx];
    } else if (isUndef(oldEndVval)) {
      oldEndVval = oldCh[--oldEndIdx];
    } else if (sameVval(oldStartVval, newStartVval)) {
      patchVval(oldStartVval, newStartVval);
      oldStartVval = oldCh[++oldStartIdx];
      newStartVval = newCh[++newStartIdx];
    } else if (sameVval(oldEndVval, newEndVval)) {
      patchVval(oldEndVval, newEndVval);
      oldEndVval = oldCh[--oldEndIdx];
      newEndVval = newCh[--newEndIdx];
    } else if (sameVval(oldStartVval, newEndVval)) {
      patchVval(oldStartVval, newEndVval);
      oldStartVval = oldCh[++oldStartIdx];
      newEndVval = newCh[--newEndIdx];
    } else if (sameVval(oldEndVval, newStartVval)) {
      patchVval(oldEndVval, newStartVval);
      oldEndVval = oldCh[--oldEndIdx];
      newStartVval = newCh[++newStartIdx];
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = isDef(newStartVval.key) ? oldKeyToIdx[newStartVval.key] : null;

      if (isUndef(idxInOld)) {
        createVm(newStartVval);
        newStartVval = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];

        if (sameVval(elmToMove, newStartVval)) {
          patchVval(elmToMove, newStartVval);
          oldCh[idxInOld] = undefined;
          newStartVval = newCh[++newStartIdx];
        } else {
          createVm(newStartVval);
          newStartVval = newCh[++newStartIdx];
        }
      }
    }
  }

  if (oldStartIdx > oldEndIdx) {
    addVvals(newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVvals(oldCh, oldStartIdx, oldEndIdx);
  }
}

function addVvals(vvals, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createVm(vvals[startIdx]);
  }
}

function removeVvals(vvals, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vvals[startIdx];

    if (isDef(ch)) {
      ch.vm.$destroy();
      ch.vm = null;
    }
  }
}

function patchVval(oldVval, vval) {
  if (oldVval === vval) {
    return;
  }

  vval.vm = oldVval.vm;
  updateVval(vval);
}

function patchChildren(oldCh, ch) {
  if (isDef(oldCh) && isDef(ch)) {
    if (oldCh !== ch) updateChildren(oldCh, ch);
  } else if (isDef(ch)) {
    addVvals(ch, 0, ch.length - 1);
  } else if (isDef(oldCh)) {
    removeVvals(oldCh, 0, oldCh.length - 1);
  }
}

function h(tag, key, args) {
  return {
    tag: tag,
    key: key,
    args: args
  };
}
});

unwrapExports(vval);
var vval_1 = vval.patchChildren;
var vval_2 = vval.h;

var params = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushParams = pushParams;
exports.popParams = popParams;
exports.withParams = withParams;
exports._setTarget = exports.target = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var stack = [];
var target = null;
exports.target = target;

var _setTarget = function _setTarget(x) {
  exports.target = target = x;
};

exports._setTarget = _setTarget;

function pushParams() {
  if (target !== null) {
    stack.push(target);
  }

  exports.target = target = {};
}

function popParams() {
  var lastTarget = target;
  var newTarget = exports.target = target = stack.pop() || null;

  if (newTarget) {
    if (!Array.isArray(newTarget.$sub)) {
      newTarget.$sub = [];
    }

    newTarget.$sub.push(lastTarget);
  }

  return lastTarget;
}

function addParams(params) {
  if (_typeof(params) === 'object' && !Array.isArray(params)) {
    exports.target = target = _objectSpread({}, target, {}, params);
  } else {
    throw new Error('params must be an object');
  }
}

function withParamsDirect(params, validator) {
  return withParamsClosure(function (add) {
    return function () {
      add(params);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return validator.apply(this, args);
    };
  });
}

function withParamsClosure(closure) {
  var validator = closure(addParams);
  return function () {
    pushParams();

    try {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return validator.apply(this, args);
    } finally {
      popParams();
    }
  };
}

function withParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return withParamsDirect(paramsOrClosure, maybeValidator);
  }

  return withParamsClosure(paramsOrClosure);
}
});

unwrapExports(params);
var params_1 = params.pushParams;
var params_2 = params.popParams;
var params_3 = params.withParams;
var params_4 = params._setTarget;
var params_5 = params.target;

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vuelidate = Vuelidate;
Object.defineProperty(exports, "withParams", {
  enumerable: true,
  get: function get() {
    return params.withParams;
  }
});
exports.default = exports.validationMixin = void 0;





function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var NIL = function NIL() {
  return null;
};

var buildFromKeys = function buildFromKeys(keys, fn, keyFn) {
  return keys.reduce(function (build, key) {
    build[keyFn ? keyFn(key) : key] = fn(key);
    return build;
  }, {});
};

function isFunction(val) {
  return typeof val === 'function';
}

function isObject(val) {
  return val !== null && (_typeof(val) === 'object' || isFunction(val));
}

function isPromise(object) {
  return isObject(object) && isFunction(object.then);
}

var getPath = function getPath(ctx, obj, path, fallback) {
  if (typeof path === 'function') {
    return path.call(ctx, obj, fallback);
  }

  path = Array.isArray(path) ? path : path.split('.');

  for (var i = 0; i < path.length; i++) {
    if (obj && _typeof(obj) === 'object') {
      obj = obj[path[i]];
    } else {
      return fallback;
    }
  }

  return typeof obj === 'undefined' ? fallback : obj;
};

var __isVuelidateAsyncVm = '__isVuelidateAsyncVm';

function makePendingAsyncVm(Vue, promise) {
  var asyncVm = new Vue({
    data: {
      p: true,
      v: false
    }
  });
  promise.then(function (value) {
    asyncVm.p = false;
    asyncVm.v = value;
  }, function (error) {
    asyncVm.p = false;
    asyncVm.v = false;
    throw error;
  });
  asyncVm[__isVuelidateAsyncVm] = true;
  return asyncVm;
}

var validationGetters = {
  $invalid: function $invalid() {
    var _this = this;

    var proxy = this.proxy;
    return this.nestedKeys.some(function (nested) {
      return _this.refProxy(nested).$invalid;
    }) || this.ruleKeys.some(function (rule) {
      return !proxy[rule];
    });
  },
  $dirty: function $dirty() {
    var _this2 = this;

    if (this.dirty) {
      return true;
    }

    if (this.nestedKeys.length === 0) {
      return false;
    }

    return this.nestedKeys.every(function (key) {
      return _this2.refProxy(key).$dirty;
    });
  },
  $anyDirty: function $anyDirty() {
    var _this3 = this;

    if (this.dirty) {
      return true;
    }

    if (this.nestedKeys.length === 0) {
      return false;
    }

    return this.nestedKeys.some(function (key) {
      return _this3.refProxy(key).$anyDirty;
    });
  },
  $error: function $error() {
    return this.$dirty && !this.$pending && this.$invalid;
  },
  $anyError: function $anyError() {
    var _this4 = this;

    if (this.$error) return true;
    return this.nestedKeys.some(function (key) {
      return _this4.refProxy(key).$anyError;
    });
  },
  $pending: function $pending() {
    var _this5 = this;

    return this.ruleKeys.some(function (key) {
      return _this5.getRef(key).$pending;
    }) || this.nestedKeys.some(function (key) {
      return _this5.refProxy(key).$pending;
    });
  },
  $params: function $params() {
    var _this6 = this;

    var vals = this.validations;
    return _objectSpread({}, buildFromKeys(this.nestedKeys, function (key) {
      return vals[key] && vals[key].$params || null;
    }), {}, buildFromKeys(this.ruleKeys, function (key) {
      return _this6.getRef(key).$params;
    }));
  }
};

function setDirtyRecursive(newState) {
  this.dirty = newState;
  var proxy = this.proxy;
  var method = newState ? '$touch' : '$reset';
  this.nestedKeys.forEach(function (key) {
    proxy[key][method]();
  });
}

var validationMethods = {
  $touch: function $touch() {
    setDirtyRecursive.call(this, true);
  },
  $reset: function $reset() {
    setDirtyRecursive.call(this, false);
  },
  $flattenParams: function $flattenParams() {
    var proxy = this.proxy;
    var params = [];

    for (var key in this.$params) {
      if (this.isNested(key)) {
        var childParams = proxy[key].$flattenParams();

        for (var j = 0; j < childParams.length; j++) {
          childParams[j].path.unshift(key);
        }

        params = params.concat(childParams);
      } else {
        params.push({
          path: [],
          name: key,
          params: this.$params[key]
        });
      }
    }

    return params;
  }
};
var getterNames = Object.keys(validationGetters);
var methodNames = Object.keys(validationMethods);
var _cachedComponent = null;

var getComponent = function getComponent(Vue) {
  if (_cachedComponent) {
    return _cachedComponent;
  }

  var VBase = Vue.extend({
    computed: {
      refs: function refs() {
        var oldVval = this._vval;
        this._vval = this.children;
        (0, vval.patchChildren)(oldVval, this._vval);
        var refs = {};

        this._vval.forEach(function (c) {
          refs[c.key] = c.vm;
        });

        return refs;
      }
    },
    beforeCreate: function beforeCreate() {
      this._vval = null;
    },
    beforeDestroy: function beforeDestroy() {
      if (this._vval) {
        (0, vval.patchChildren)(this._vval);
        this._vval = null;
      }
    },
    methods: {
      getModel: function getModel() {
        return this.lazyModel ? this.lazyModel(this.prop) : this.model;
      },
      getModelKey: function getModelKey(key) {
        var model = this.getModel();

        if (model) {
          return model[key];
        }
      },
      hasIter: function hasIter() {
        return false;
      }
    }
  });
  var ValidationRule = VBase.extend({
    data: function data() {
      return {
        rule: null,
        lazyModel: null,
        model: null,
        lazyParentModel: null,
        rootModel: null
      };
    },
    methods: {
      runRule: function runRule(parent) {
        var model = this.getModel();
        (0, params.pushParams)();
        var rawOutput = this.rule.call(this.rootModel, model, parent);
        var output = isPromise(rawOutput) ? makePendingAsyncVm(Vue, rawOutput) : rawOutput;
        var rawParams = (0, params.popParams)();
        var params$1 = rawParams && rawParams.$sub ? rawParams.$sub.length > 1 ? rawParams : rawParams.$sub[0] : null;
        return {
          output: output,
          params: params$1
        };
      }
    },
    computed: {
      run: function run() {
        var _this7 = this;

        var parent = this.lazyParentModel();

        var isArrayDependant = Array.isArray(parent) && parent.__ob__;

        if (isArrayDependant) {
          var arrayDep = parent.__ob__.dep;
          arrayDep.depend();
          var target = arrayDep.constructor.target;

          if (!this._indirectWatcher) {
            var Watcher = target.constructor;
            this._indirectWatcher = new Watcher(this, function () {
              return _this7.runRule(parent);
            }, null, {
              lazy: true
            });
          }

          var model = this.getModel();

          if (!this._indirectWatcher.dirty && this._lastModel === model) {
            this._indirectWatcher.depend();

            return target.value;
          }

          this._lastModel = model;

          this._indirectWatcher.evaluate();

          this._indirectWatcher.depend();
        } else if (this._indirectWatcher) {
          this._indirectWatcher.teardown();

          this._indirectWatcher = null;
        }

        return this._indirectWatcher ? this._indirectWatcher.value : this.runRule(parent);
      },
      $params: function $params() {
        return this.run.params;
      },
      proxy: function proxy() {
        var output = this.run.output;

        if (output[__isVuelidateAsyncVm]) {
          return !!output.v;
        }

        return !!output;
      },
      $pending: function $pending() {
        var output = this.run.output;

        if (output[__isVuelidateAsyncVm]) {
          return output.p;
        }

        return false;
      }
    },
    destroyed: function destroyed() {
      if (this._indirectWatcher) {
        this._indirectWatcher.teardown();

        this._indirectWatcher = null;
      }
    }
  });
  var Validation = VBase.extend({
    data: function data() {
      return {
        dirty: false,
        validations: null,
        lazyModel: null,
        model: null,
        prop: null,
        lazyParentModel: null,
        rootModel: null
      };
    },
    methods: _objectSpread({}, validationMethods, {
      refProxy: function refProxy(key) {
        return this.getRef(key).proxy;
      },
      getRef: function getRef(key) {
        return this.refs[key];
      },
      isNested: function isNested(key) {
        return typeof this.validations[key] !== 'function';
      }
    }),
    computed: _objectSpread({}, validationGetters, {
      nestedKeys: function nestedKeys() {
        return this.keys.filter(this.isNested);
      },
      ruleKeys: function ruleKeys() {
        var _this8 = this;

        return this.keys.filter(function (k) {
          return !_this8.isNested(k);
        });
      },
      keys: function keys() {
        return Object.keys(this.validations).filter(function (k) {
          return k !== '$params';
        });
      },
      proxy: function proxy() {
        var _this9 = this;

        var keyDefs = buildFromKeys(this.keys, function (key) {
          return {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _this9.refProxy(key);
            }
          };
        });
        var getterDefs = buildFromKeys(getterNames, function (key) {
          return {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _this9[key];
            }
          };
        });
        var methodDefs = buildFromKeys(methodNames, function (key) {
          return {
            enumerable: false,
            configurable: true,
            get: function get() {
              return _this9[key];
            }
          };
        });
        var iterDefs = this.hasIter() ? {
          $iter: {
            enumerable: true,
            value: Object.defineProperties({}, _objectSpread({}, keyDefs))
          }
        } : {};
        return Object.defineProperties({}, _objectSpread({}, keyDefs, {}, iterDefs, {
          $model: {
            enumerable: true,
            get: function get() {
              var parent = _this9.lazyParentModel();

              if (parent != null) {
                return parent[_this9.prop];
              } else {
                return null;
              }
            },
            set: function set(value) {
              var parent = _this9.lazyParentModel();

              if (parent != null) {
                parent[_this9.prop] = value;

                _this9.$touch();
              }
            }
          }
        }, getterDefs, {}, methodDefs));
      },
      children: function children() {
        var _this10 = this;

        return [].concat(_toConsumableArray(this.nestedKeys.map(function (key) {
          return renderNested(_this10, key);
        })), _toConsumableArray(this.ruleKeys.map(function (key) {
          return renderRule(_this10, key);
        }))).filter(Boolean);
      }
    })
  });
  var GroupValidation = Validation.extend({
    methods: {
      isNested: function isNested(key) {
        return typeof this.validations[key]() !== 'undefined';
      },
      getRef: function getRef(key) {
        var vm = this;
        return {
          get proxy() {
            return vm.validations[key]() || false;
          }

        };
      }
    }
  });
  var EachValidation = Validation.extend({
    computed: {
      keys: function keys() {
        var model = this.getModel();

        if (isObject(model)) {
          return Object.keys(model);
        } else {
          return [];
        }
      },
      tracker: function tracker() {
        var _this11 = this;

        var trackBy = this.validations.$trackBy;
        return trackBy ? function (key) {
          return "".concat(getPath(_this11.rootModel, _this11.getModelKey(key), trackBy));
        } : function (x) {
          return "".concat(x);
        };
      },
      getModelLazy: function getModelLazy() {
        var _this12 = this;

        return function () {
          return _this12.getModel();
        };
      },
      children: function children() {
        var _this13 = this;

        var def = this.validations;
        var model = this.getModel();

        var validations = _objectSpread({}, def);

        delete validations['$trackBy'];
        var usedTracks = {};
        return this.keys.map(function (key) {
          var track = _this13.tracker(key);

          if (usedTracks.hasOwnProperty(track)) {
            return null;
          }

          usedTracks[track] = true;
          return (0, vval.h)(Validation, track, {
            validations: validations,
            prop: key,
            lazyParentModel: _this13.getModelLazy,
            model: model[key],
            rootModel: _this13.rootModel
          });
        }).filter(Boolean);
      }
    },
    methods: {
      isNested: function isNested() {
        return true;
      },
      getRef: function getRef(key) {
        return this.refs[this.tracker(key)];
      },
      hasIter: function hasIter() {
        return true;
      }
    }
  });

  var renderNested = function renderNested(vm, key) {
    if (key === '$each') {
      return (0, vval.h)(EachValidation, key, {
        validations: vm.validations[key],
        lazyParentModel: vm.lazyParentModel,
        prop: key,
        lazyModel: vm.getModel,
        rootModel: vm.rootModel
      });
    }

    var validations = vm.validations[key];

    if (Array.isArray(validations)) {
      var root = vm.rootModel;
      var refVals = buildFromKeys(validations, function (path) {
        return function () {
          return getPath(root, root.$v, path);
        };
      }, function (v) {
        return Array.isArray(v) ? v.join('.') : v;
      });
      return (0, vval.h)(GroupValidation, key, {
        validations: refVals,
        lazyParentModel: NIL,
        prop: key,
        lazyModel: NIL,
        rootModel: root
      });
    }

    return (0, vval.h)(Validation, key, {
      validations: validations,
      lazyParentModel: vm.getModel,
      prop: key,
      lazyModel: vm.getModelKey,
      rootModel: vm.rootModel
    });
  };

  var renderRule = function renderRule(vm, key) {
    return (0, vval.h)(ValidationRule, key, {
      rule: vm.validations[key],
      lazyParentModel: vm.lazyParentModel,
      lazyModel: vm.getModel,
      rootModel: vm.rootModel
    });
  };

  _cachedComponent = {
    VBase: VBase,
    Validation: Validation
  };
  return _cachedComponent;
};

var _cachedVue = null;

function getVue(rootVm) {
  if (_cachedVue) return _cachedVue;
  var Vue = rootVm.constructor;

  while (Vue.super) {
    Vue = Vue.super;
  }

  _cachedVue = Vue;
  return Vue;
}

var validateModel = function validateModel(model, validations) {
  var Vue = getVue(model);

  var _getComponent = getComponent(Vue),
      Validation = _getComponent.Validation,
      VBase = _getComponent.VBase;

  var root = new VBase({
    computed: {
      children: function children() {
        var vals = typeof validations === 'function' ? validations.call(model) : validations;
        return [(0, vval.h)(Validation, '$v', {
          validations: vals,
          lazyParentModel: NIL,
          prop: '$v',
          model: model,
          rootModel: model
        })];
      }
    }
  });
  return root;
};

var validationMixin = {
  data: function data() {
    var vals = this.$options.validations;

    if (vals) {
      this._vuelidate = validateModel(this, vals);
    }

    return {};
  },
  beforeCreate: function beforeCreate() {
    var options = this.$options;
    var vals = options.validations;
    if (!vals) return;
    if (!options.computed) options.computed = {};
    if (options.computed.$v) return;

    options.computed.$v = function () {
      return this._vuelidate ? this._vuelidate.refs.$v.proxy : null;
    };
  },
  beforeDestroy: function beforeDestroy() {
    if (this._vuelidate) {
      this._vuelidate.$destroy();

      this._vuelidate = null;
    }
  }
};
exports.validationMixin = validationMixin;

function Vuelidate(Vue) {
  Vue.mixin(validationMixin);
}

var _default = Vuelidate;
exports.default = _default;
});

unwrapExports(lib);
var lib_1 = lib.Vuelidate;
var lib_2 = lib.withParams;
var lib_3 = lib.validationMixin;

var withParamsBrowser = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withParams = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var root = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : {};

var fakeWithParams = function fakeWithParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return maybeValidator;
  }

  return paramsOrClosure(function () {});
};

var withParams = root.vuelidate ? root.vuelidate.withParams : fakeWithParams;
exports.withParams = withParams;
});

unwrapExports(withParamsBrowser);
var withParamsBrowser_1 = withParamsBrowser.withParams;

var withParams_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var withParams = process.env.BUILD === 'web' ? withParamsBrowser.withParams : params.withParams;
var _default = withParams;
exports.default = _default;
});

unwrapExports(withParams_1);

var common = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withParams", {
  enumerable: true,
  get: function get() {
    return _withParams.default;
  }
});
exports.regex = exports.ref = exports.len = exports.req = void 0;

var _withParams = _interopRequireDefault(withParams_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var req = function req(value) {
  if (Array.isArray(value)) return !!value.length;

  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  if (_typeof(value) === 'object') {
    for (var _ in value) {
      return true;
    }

    return false;
  }

  return !!String(value).length;
};

exports.req = req;

var len = function len(value) {
  if (Array.isArray(value)) return value.length;

  if (_typeof(value) === 'object') {
    return Object.keys(value).length;
  }

  return String(value).length;
};

exports.len = len;

var ref = function ref(reference, vm, parentVm) {
  return typeof reference === 'function' ? reference.call(vm, parentVm) : parentVm[reference];
};

exports.ref = ref;

var regex = function regex(type, expr) {
  return (0, _withParams.default)({
    type: type
  }, function (value) {
    return !req(value) || expr.test(value);
  });
};

exports.regex = regex;
});

unwrapExports(common);
var common_1 = common.withParams;
var common_2 = common.regex;
var common_3 = common.ref;
var common_4 = common.len;
var common_5 = common.req;

var alpha = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('alpha', /^[a-zA-Z]*$/);

exports.default = _default;
});

unwrapExports(alpha);

var alphaNum = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('alphaNum', /^[a-zA-Z0-9]*$/);

exports.default = _default;
});

unwrapExports(alphaNum);

var numeric = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('numeric', /^[0-9]*$/);

exports.default = _default;
});

unwrapExports(numeric);

var between = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(min, max) {
  return (0, common.withParams)({
    type: 'between',
    min: min,
    max: max
  }, function (value) {
    return !(0, common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +min <= +value && +max >= +value;
  });
};

exports.default = _default;
});

unwrapExports(between);

var email = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

var _default = (0, common.regex)('email', emailRegex);

exports.default = _default;
});

unwrapExports(email);

var ipAddress = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.withParams)({
  type: 'ipAddress'
}, function (value) {
  if (!(0, common.req)(value)) {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  var nibbles = value.split('.');
  return nibbles.length === 4 && nibbles.every(nibbleValid);
});

exports.default = _default;

var nibbleValid = function nibbleValid(nibble) {
  if (nibble.length > 3 || nibble.length === 0) {
    return false;
  }

  if (nibble[0] === '0' && nibble !== '0') {
    return false;
  }

  if (!nibble.match(/^\d+$/)) {
    return false;
  }

  var numeric = +nibble | 0;
  return numeric >= 0 && numeric <= 255;
};
});

unwrapExports(ipAddress);

var macAddress = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default() {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
  return (0, common.withParams)({
    type: 'macAddress'
  }, function (value) {
    if (!(0, common.req)(value)) {
      return true;
    }

    if (typeof value !== 'string') {
      return false;
    }

    var parts = typeof separator === 'string' && separator !== '' ? value.split(separator) : value.length === 12 || value.length === 16 ? value.match(/.{2}/g) : null;
    return parts !== null && (parts.length === 6 || parts.length === 8) && parts.every(hexValid);
  });
};

exports.default = _default;

var hexValid = function hexValid(hex) {
  return hex.toLowerCase().match(/^[0-9a-f]{2}$/);
};
});

unwrapExports(macAddress);

var maxLength = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(length) {
  return (0, common.withParams)({
    type: 'maxLength',
    max: length
  }, function (value) {
    return !(0, common.req)(value) || (0, common.len)(value) <= length;
  });
};

exports.default = _default;
});

unwrapExports(maxLength);

var minLength = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(length) {
  return (0, common.withParams)({
    type: 'minLength',
    min: length
  }, function (value) {
    return !(0, common.req)(value) || (0, common.len)(value) >= length;
  });
};

exports.default = _default;
});

unwrapExports(minLength);

var required = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.withParams)({
  type: 'required'
}, function (value) {
  if (typeof value === 'string') {
    return (0, common.req)(value.trim());
  }

  return (0, common.req)(value);
});

exports.default = _default;
});

unwrapExports(required);

var requiredIf = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(prop) {
  return (0, common.withParams)({
    type: 'requiredIf',
    prop: prop
  }, function (value, parentVm) {
    return (0, common.ref)(prop, this, parentVm) ? (0, common.req)(value) : true;
  });
};

exports.default = _default;
});

unwrapExports(requiredIf);

var requiredUnless = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(prop) {
  return (0, common.withParams)({
    type: 'requiredUnless',
    prop: prop
  }, function (value, parentVm) {
    return !(0, common.ref)(prop, this, parentVm) ? (0, common.req)(value) : true;
  });
};

exports.default = _default;
});

unwrapExports(requiredUnless);

var sameAs = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(equalTo) {
  return (0, common.withParams)({
    type: 'sameAs',
    eq: equalTo
  }, function (value, parentVm) {
    return value === (0, common.ref)(equalTo, this, parentVm);
  });
};

exports.default = _default;
});

unwrapExports(sameAs);

var url = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

var _default = (0, common.regex)('url', urlRegex);

exports.default = _default;
});

unwrapExports(url);

var or = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, common.withParams)({
    type: 'or'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid || fn.apply(_this, args);
    }, false);
  });
};

exports.default = _default;
});

unwrapExports(or);

var and = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, common.withParams)({
    type: 'and'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid && fn.apply(_this, args);
    }, true);
  });
};

exports.default = _default;
});

unwrapExports(and);

var not = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(validator) {
  return (0, common.withParams)({
    type: 'not'
  }, function (value, vm) {
    return !(0, common.req)(value) || !validator.call(this, value, vm);
  });
};

exports.default = _default;
});

unwrapExports(not);

var minValue = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(min) {
  return (0, common.withParams)({
    type: 'minValue',
    min: min
  }, function (value) {
    return !(0, common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value >= +min;
  });
};

exports.default = _default;
});

unwrapExports(minValue);

var maxValue = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(max) {
  return (0, common.withParams)({
    type: 'maxValue',
    max: max
  }, function (value) {
    return !(0, common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value <= +max;
  });
};

exports.default = _default;
});

unwrapExports(maxValue);

var integer = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('integer', /(^[0-9]*$)|(^-[0-9]+$)/);

exports.default = _default;
});

unwrapExports(integer);

var decimal = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('decimal', /^[-]?\d*(\.\d+)?$/);

exports.default = _default;
});

unwrapExports(decimal);

var validators = createCommonjsModule(function (module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "alpha", {
  enumerable: true,
  get: function get() {
    return _alpha.default;
  }
});
Object.defineProperty(exports, "alphaNum", {
  enumerable: true,
  get: function get() {
    return _alphaNum.default;
  }
});
Object.defineProperty(exports, "numeric", {
  enumerable: true,
  get: function get() {
    return _numeric.default;
  }
});
Object.defineProperty(exports, "between", {
  enumerable: true,
  get: function get() {
    return _between.default;
  }
});
Object.defineProperty(exports, "email", {
  enumerable: true,
  get: function get() {
    return _email.default;
  }
});
Object.defineProperty(exports, "ipAddress", {
  enumerable: true,
  get: function get() {
    return _ipAddress.default;
  }
});
Object.defineProperty(exports, "macAddress", {
  enumerable: true,
  get: function get() {
    return _macAddress.default;
  }
});
Object.defineProperty(exports, "maxLength", {
  enumerable: true,
  get: function get() {
    return _maxLength.default;
  }
});
Object.defineProperty(exports, "minLength", {
  enumerable: true,
  get: function get() {
    return _minLength.default;
  }
});
Object.defineProperty(exports, "required", {
  enumerable: true,
  get: function get() {
    return _required.default;
  }
});
Object.defineProperty(exports, "requiredIf", {
  enumerable: true,
  get: function get() {
    return _requiredIf.default;
  }
});
Object.defineProperty(exports, "requiredUnless", {
  enumerable: true,
  get: function get() {
    return _requiredUnless.default;
  }
});
Object.defineProperty(exports, "sameAs", {
  enumerable: true,
  get: function get() {
    return _sameAs.default;
  }
});
Object.defineProperty(exports, "url", {
  enumerable: true,
  get: function get() {
    return _url.default;
  }
});
Object.defineProperty(exports, "or", {
  enumerable: true,
  get: function get() {
    return _or.default;
  }
});
Object.defineProperty(exports, "and", {
  enumerable: true,
  get: function get() {
    return _and.default;
  }
});
Object.defineProperty(exports, "not", {
  enumerable: true,
  get: function get() {
    return _not.default;
  }
});
Object.defineProperty(exports, "minValue", {
  enumerable: true,
  get: function get() {
    return _minValue.default;
  }
});
Object.defineProperty(exports, "maxValue", {
  enumerable: true,
  get: function get() {
    return _maxValue.default;
  }
});
Object.defineProperty(exports, "integer", {
  enumerable: true,
  get: function get() {
    return _integer.default;
  }
});
Object.defineProperty(exports, "decimal", {
  enumerable: true,
  get: function get() {
    return _decimal.default;
  }
});
exports.helpers = void 0;

var _alpha = _interopRequireDefault(alpha);

var _alphaNum = _interopRequireDefault(alphaNum);

var _numeric = _interopRequireDefault(numeric);

var _between = _interopRequireDefault(between);

var _email = _interopRequireDefault(email);

var _ipAddress = _interopRequireDefault(ipAddress);

var _macAddress = _interopRequireDefault(macAddress);

var _maxLength = _interopRequireDefault(maxLength);

var _minLength = _interopRequireDefault(minLength);

var _required = _interopRequireDefault(required);

var _requiredIf = _interopRequireDefault(requiredIf);

var _requiredUnless = _interopRequireDefault(requiredUnless);

var _sameAs = _interopRequireDefault(sameAs);

var _url = _interopRequireDefault(url);

var _or = _interopRequireDefault(or);

var _and = _interopRequireDefault(and);

var _not = _interopRequireDefault(not);

var _minValue = _interopRequireDefault(minValue);

var _maxValue = _interopRequireDefault(maxValue);

var _integer = _interopRequireDefault(integer);

var _decimal = _interopRequireDefault(decimal);

var helpers = _interopRequireWildcard(common);

exports.helpers = helpers;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});

unwrapExports(validators);
var validators_1 = validators.alpha;
var validators_2 = validators.alphaNum;
var validators_3 = validators.numeric;
var validators_4 = validators.between;
var validators_5 = validators.email;
var validators_6 = validators.ipAddress;
var validators_7 = validators.macAddress;
var validators_8 = validators.maxLength;
var validators_9 = validators.minLength;
var validators_10 = validators.required;
var validators_11 = validators.requiredIf;
var validators_12 = validators.requiredUnless;
var validators_13 = validators.sameAs;
var validators_14 = validators.url;
var validators_15 = validators.or;
var validators_16 = validators.and;
var validators_17 = validators.not;
var validators_18 = validators.minValue;
var validators_19 = validators.maxValue;
var validators_20 = validators.integer;
var validators_21 = validators.decimal;
var validators_22 = validators.helpers;

//
var script$2 = {
  mixins: [cartItem, money, lib_3],

  data() {
    return {
      localCartItem: Object.assign({}, this.cartItem)
    };
  },

  components: {
    R64FormInput
  },
  computed: {
    classes() {
      return this.hasImage ? 'c-mt-4 md:c-mt-auto' : 'c-mt-4 md:c-mt-10';
    }

  },
  watch: {
    cartItem(newCartItem) {
      this.localCartItem = Object.assign({}, newCartItem);
    }

  },
  validations: {
    localCartItem: {
      quantity: {
        numeric: validators_3
      }
    }
  },
  methods: {
    async updateQuantity(newQuantity) {
      if (this.$v.localCartItem.quantity.$invalid) {
        return;
      }

      try {
        await cartItemApi.update(this.cartItem.cart_item_token, {
          quantity: newQuantity
        });
      } catch (e) {//
      }

      this.$emit('cart-item:update');
    },

    async updateCustomerNote(newCustomerNote) {
      try {
        await cartItemApi.update(this.cartItem.cart_item_token, {
          customer_note: newCustomerNote
        });
      } catch (e) {//
      }

      this.$emit('cart-item:update');
    },

    async remove() {
      try {
        await cartItemApi.delete(this.cartItem.cart_item_token);
      } catch (e) {//
      }

      this.$emit('cart-item:delete');
    }

  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "c-flex c-flex-col md:c-flex-row c-mt-10 c-pb-10 c-border-b c-border-c-gray"
  }, [_vm.hasImage ? _c('div', {
    staticClass: "c-w-full c-flex c-items-center c-justify-center md:c-w-40 md:c-h-40 c-bg-c-mid-gray c-flex-shrink-0 cursor-pointer",
    on: {
      "click": function ($event) {
        return _vm.$emit('cart-item:show', _vm.cartItem);
      }
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.imageSrc,
      "alt": "Product image"
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "c-mt-4 md:c-ml-6 md:c-mt-0 c-w-full c-flex c-flex-col"
  }, [_c('div', {
    staticClass: "c-flex c-justify-between"
  }, [_c('span', {
    staticClass: "c-text-xl cursor-pointer",
    on: {
      "click": function ($event) {
        return _vm.$emit('cart-item:show', _vm.cartItem);
      }
    }
  }, [_vm._v(_vm._s(_vm.cartItem.product.name))]), _vm._v(" "), _c('span', {
    staticClass: "c-text-xl c-font-bold"
  }, [_vm._v(_vm._s(_vm.money(_vm.cartItem.price)))])]), _vm._v(" "), _c('R64FormInput', {
    attrs: {
      "id": "customer_note_" + _vm.localCartItem.cart_item_token,
      "input-class": "c-h-10 c-w-full c-max-w-lg c-mt-4 c-px-3 c-rounded c-border c-border-c-gray c-focus:border-c-grayer c-text-base c-focus:outline-none c-focus:border-c-grayer",
      "placeholder": "Custom note (Optional)"
    },
    on: {
      "blur": _vm.updateCustomerNote
    },
    model: {
      value: _vm.localCartItem.customer_note,
      callback: function ($$v) {
        _vm.$set(_vm.localCartItem, "customer_note", $$v);
      },
      expression: "localCartItem.customer_note"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "c-flex c-items-center",
    class: _vm.classes
  }, [_c('label', {
    attrs: {
      "for": "quantity_" + _vm.localCartItem.cart_item_token
    }
  }, [_vm._v("Qty")]), _vm._v(" "), _c('R64FormInput', {
    attrs: {
      "validator": _vm.$v.localCartItem.quantity,
      "show-error": _vm.$v.localCartItem.quantity.$error,
      "id": "quantity_" + _vm.localCartItem.cart_item_token,
      "error-message": "Quantity must be a positive number",
      "input-class": "c-w-10 c-h-8 c-ml-5 c-rounded c-border c-border-c-gray c-focus:outline-none c-focus:border-c-grayer c-text-center",
      "alert-class": "c-ml-5 c-whitespace-no-wrap"
    },
    on: {
      "blur": _vm.updateQuantity
    },
    model: {
      value: _vm.localCartItem.quantity,
      callback: function ($$v) {
        _vm.$set(_vm.localCartItem, "quantity", $$v);
      },
      expression: "localCartItem.quantity"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "c-w-px c-h-6 c-ml-5 c-border-l c-border-c-gray"
  }), _vm._v(" "), _c('button', {
    staticClass: "c-ml-5",
    on: {
      "click": _vm.remove
    }
  }, [_c('svg', {
    staticClass: "c-w-5 c-h-5",
    attrs: {
      "viewBox": "0 0 14 18",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1 15.9999C1 17.0999 1.9 17.9999 3 17.9999H11C12.1 17.9999 13 17.0999 13 15.9999V3.99994H1V15.9999ZM14 0.999939H10.5L9.5 -6.10352e-05H4.5L3.5 0.999939H0V2.99994H14V0.999939Z",
      "fill": "#737373"
    }
  })])])], 1)], 1)]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

const __vue_inject_styles__$2 = undefined;
/* scoped */

const __vue_scope_id__$2 = undefined;
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

var R64CartItem = normalizeComponent_1({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined);

/* script */

/* template */
var __vue_render__$3 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', [_c('svg', {
    staticClass: "c-w-6 c-h-6 c-fill-current",
    attrs: {
      "viewBox": "0 0 24 24",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M23.6667 2.68331L21.3167 0.333313L12 9.64998L2.68334 0.333313L0.333344 2.68331L9.65001 12L0.333344 21.3167L2.68334 23.6667L12 14.35L21.3167 23.6667L23.6667 21.3167L14.35 12L23.6667 2.68331Z",
      "fill": "black"
    }
  })])]);
};

var __vue_staticRenderFns__$3 = [];
/* style */

const __vue_inject_styles__$3 = undefined;
/* scoped */

const __vue_scope_id__$3 = undefined;
/* module identifier */

const __vue_module_identifier__$3 = undefined;
/* functional template */

const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

var R64CloseButton = normalizeComponent_1({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, {}, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
var script$3 = {
  props: {
    value: {
      type: String,
      default: null
    }
  }
};

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser$2 = createInjector;

/* script */
const __vue_script__$3 = script$3;
/* template */

var __vue_render__$4 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('textarea', {
    staticClass: "c-p-3 c-rounded c-border c-border-c-gray c-text-base c-focus:outline-none c-focus:border-c-grayer",
    domProps: {
      "value": _vm.value
    },
    on: {
      "blur": function (e) {
        return _vm.$emit('blur', e.target.value);
      },
      "input": function (e) {
        return _vm.$emit('input', e.target.value);
      }
    }
  });
};

var __vue_staticRenderFns__$4 = [];
/* style */

const __vue_inject_styles__$4 = function (inject) {
  if (!inject) return;
  inject("data-v-02410d9d_0", {
    source: "textarea[data-v-02410d9d]::placeholder{color:#737373}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$4 = "data-v-02410d9d";
/* module identifier */

const __vue_module_identifier__$4 = undefined;
/* functional template */

const __vue_is_functional_template__$4 = false;
/* style inject SSR */

var R64TextArea = normalizeComponent_1({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$3, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, browser$2, undefined);

var theme = {
  props: {
    font: {
      type: String,
      default: 'c-font-sans'
    },
    btnPrimary: {
      type: String,
      default: 'c-bg-c-blue c-text-white c-font-bold'
    },
    btnSecondary: {
      type: String,
      default: 'c-bg-white c-text-c-blue c-border c-border-c-blue'
    },
    btnSecondaryTransparent: {
      type: String,
      default: 'c-bg-transparent c-text-c-blue c-border c-border-c-blue'
    },
    textPrimary: {
      type: String,
      default: 'c-text-c-blue'
    },
    iconColor: {
      type: String,
      default: 'c-text-c-blue'
    }
  }
};

//
var script$4 = {
  mixins: [theme],
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      if (this.disabled) {
        return 'c-bg-c-mid-grayer c-text-c-grayer';
      }

      if (this.variant === 'primary') {
        return `${this.btnPrimary}`;
      } else if (this.variant === 'secondary') {
        return this.btnSecondary;
      } else if (this.variant === 'secondary-transparent') {
        return this.btnSecondaryTransparent;
      }

      return `${this.btnPrimary}`;
    }

  }
};

/* script */
const __vue_script__$4 = script$4;
/* template */

var __vue_render__$5 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('button', {
    staticClass: "c-w-full c-py-3 c-rounded",
    class: _vm.classes,
    attrs: {
      "disabled": _vm.disabled
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$5 = [];
/* style */

const __vue_inject_styles__$5 = undefined;
/* scoped */

const __vue_scope_id__$5 = undefined;
/* module identifier */

const __vue_module_identifier__$5 = undefined;
/* functional template */

const __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

var R64Button = normalizeComponent_1({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$4, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, undefined, undefined);

var cartMixin = {
  props: {
    cartToken: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      cart: null
    };
  },

  computed: {
    cartItems() {
      return this.cart ? this.cart.cart_items : [];
    }

  },
  methods: {
    async fetchCart() {
      try {
        if (!this.cartToken) {
          const {
            data
          } = await cartApi.create();
          this.cart = data;
        } else {
          const {
            data
          } = await cartApi.get(this.cartToken);
          this.cart = data;
        }
      } catch (e) {//
      }

      this.$emit('cart:update', this.cart);
    }

  }
};

//
var script$5 = {
  mixins: [cartMixin, money, theme],
  components: {
    R64CartItem,
    R64CloseButton,
    R64TextArea,
    R64Button
  },

  data() {
    return {
      orderNoteVisible: false
    };
  },

  async mounted() {
    window.scrollTo(0, 0);
    await this.fetchCart();
  },

  methods: {
    async setCustomerNote(customerNote) {
      try {
        const {
          data
        } = await cartApi.update(this.cartToken, {
          customer_notes: customerNote
        });
        this.cart = data;
      } catch (e) {//
      }

      this.$emit('cart:update', this.cart);
    },

    toggleNote() {
      this.orderNoteVisible = !this.orderNoteVisible;

      if (!this.orderNoteVisible) {
        this.setCustomerNote(null);
      }
    },

    checkout() {
      this.$emit('checkout');
    }

  },
  watch: {
    'cart.customer_notes'(newCustomerNotes) {
      this.orderNoteVisible = !!newCustomerNotes;
    }

  }
};

/* script */
const __vue_script__$5 = script$5;
/* template */

var __vue_render__$6 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "c-antialiased c-z-50 c-text-c-black",
    class: _vm.font,
    staticStyle: {
      "box-sizing": "border-box"
    }
  }, [_c('div', {
    staticClass: "c-fixed c-inset-0 c-bg-c-black c-opacity-40"
  }), _vm._v(" "), _vm.cart ? _c('div', {
    staticClass: "c-absolute c-top-0 c-left-0 c-right-0 c-flex c-min-h-screen md:c-justify-end"
  }, [_c('div', {
    staticClass: "c-bg-white c-w-full c-max-w-4xl c-p-5 md:c-p-12"
  }, [_c('div', {
    staticClass: "c-flex c-justify-between c-items-center"
  }, [_c('span', {
    staticClass: "c-text-4xl"
  }, [_vm._v("Your Cart (" + _vm._s(_vm.cartItems.length) + ")")]), _vm._v(" "), _c('R64CloseButton', {
    nativeOn: {
      "click": function ($event) {
        return _vm.$emit('close');
      }
    }
  })], 1), _vm._v(" "), _vm._l(_vm.cartItems, function (cartItem, index) {
    return _c('R64CartItem', {
      key: index,
      attrs: {
        "cart-item": cartItem,
        "currency-symbol": _vm.currencySymbol
      },
      on: {
        "cart-item:update": _vm.fetchCart,
        "cart-item:delete": _vm.fetchCart,
        "cart-item:show": function (cartItem) {
          return _vm.$emit('cart-item:show', cartItem);
        }
      }
    });
  }), _vm._v(" "), _c('div', {
    staticClass: "c-mt-10 c-pb-10 c-border-b c-border-c-gray"
  }, [_c('button', {
    staticClass: "c-flex c-items-center",
    on: {
      "click": _vm.toggleNote
    }
  }, [_c('svg', {
    staticClass: "c-w-5 c-h-5 c-fill-current",
    class: _vm.iconColor,
    attrs: {
      "viewBox": "0 0 19 19",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M0 15.2501V19.0001H3.75L14.81 7.94006L11.06 4.19006L0 15.2501ZM17.71 5.04006C18.1 4.65006 18.1 4.02006 17.71 3.63006L15.37 1.29006C14.98 0.900059 14.35 0.900059 13.96 1.29006L12.13 3.12006L15.88 6.87006L17.71 5.04006Z"
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "c-ml-2",
    class: _vm.textPrimary
  }, [_vm._v("Add a note about your order (Optional)")])]), _vm._v(" "), _vm.orderNoteVisible ? _c('R64TextArea', {
    staticClass: "c-mt-10 c-w-full c-h-32",
    attrs: {
      "value": _vm.cart.customer_notes,
      "placeholder": "Your order note ..."
    },
    on: {
      "blur": _vm.setCustomerNote
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-10 c-flex c-flex-col c-items-end"
  }, [_c('span', [_vm._v("Shipping and taxes will be calculated at check out")]), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6 c-w-full c-justify-between c-flex c-items-center md:c-w-auto"
  }, [_c('span', {
    staticClass: "c-text-xl"
  }, [_vm._v("Subtotal")]), _vm._v(" "), _c('span', {
    staticClass: "c-ml-10 c-text-4xl"
  }, [_vm._v(_vm._s(_vm.money(_vm.cart.items_subtotal)))])]), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6 c-w-full c-flex c-flex-col md:c-w-auto"
  }, [_c('R64Button', {
    attrs: {
      "btn-primary": _vm.btnPrimary,
      "disabled": _vm.cart.cart_items.length === 0
    },
    nativeOn: {
      "click": function ($event) {
        return _vm.checkout($event);
      }
    }
  }, [_vm._v("\n            Checkout\n          ")]), _vm._v(" "), _c('span', {
    staticClass: "c-mt-4 c-text-sm"
  }, [_vm._v("Have a promo code? Apply it at check out.")])], 1)])], 2)]) : _vm._e()]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

const __vue_inject_styles__$6 = undefined;
/* scoped */

const __vue_scope_id__$6 = undefined;
/* module identifier */

const __vue_module_identifier__$6 = undefined;
/* functional template */

const __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

var R64Cart = normalizeComponent_1({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$5, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, undefined, undefined);

//
var script$6 = {
  mixins: [cartItem, money],
  props: {
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return this.hasImage ? 'c-ml-4' : '';
    }

  }
};

/* script */
const __vue_script__$6 = script$6;
/* template */

var __vue_render__$7 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "c-flex c-pb-4",
    class: {
      'border-b border-c-gray': _vm.border
    }
  }, [_vm.hasImage ? _c('div', {
    staticClass: "c-flex c-items-center c-justify-center c-w-16 c-h-16 c-bg-c-mid-gray c-flex-shrink-0"
  }, [_c('img', {
    attrs: {
      "src": _vm.imageSrc,
      "alt": "Product image"
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "c-w-full c-flex c-flex-col c-items-end",
    class: _vm.classes
  }, [_c('div', {
    staticClass: "c-w-full c-flex c-justify-between"
  }, [_c('span', {
    staticClass: "c-font-bold"
  }, [_vm._v(_vm._s(_vm.cartItem.product.name))]), _vm._v(" "), _c('span', {
    staticClass: "c-text-sm"
  }, [_vm._v("Qty " + _vm._s(_vm.cartItem.quantity))])]), _vm._v(" "), _c('div', {
    staticClass: "c-w-full c-flex c-justify-between"
  }, [_c('span', {
    staticClass: "c-text-sm"
  }, [_vm._v(_vm._s(_vm.cartItem.customer_note))]), _vm._v(" "), _c('span', {
    staticClass: "c-font-bold c-text-xl"
  }, [_vm._v(_vm._s(_vm.money(_vm.cartItem.price)))])])])]);
};

var __vue_staticRenderFns__$7 = [];
/* style */

const __vue_inject_styles__$7 = undefined;
/* scoped */

const __vue_scope_id__$7 = undefined;
/* module identifier */

const __vue_module_identifier__$7 = undefined;
/* functional template */

const __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

var R64CartItemPreview = normalizeComponent_1({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$6, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, undefined, undefined);

//
var script$7 = {
  name: 'R64FormSelect',
  extends: R64FormInput,
  props: {
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange() {
      if (this.validator) {
        this.validator.$touch();
      }

      this.$nextTick(() => this.$emit('change'));
    }

  }
};

/* script */
const __vue_script__$7 = script$7;
/* template */

var __vue_render__$8 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "c-relative"
  }, [_vm.label ? _c('div', {
    staticClass: "c-mb-2"
  }, [_vm._v("\n    " + _vm._s(_vm.label) + "\n  ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "c-relative"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.localValue,
      expression: "localValue"
    }],
    ref: "input",
    staticClass: "c-bg-white",
    class: [_vm.inputClass, {
      'c-border-red-500 c-focus:border-red-600': _vm.error,
      'c-border-c-gray c-focus:border-c-grayer': !_vm.error,
      'c-bg-c-light-gray': _vm.disabled
    }],
    attrs: {
      "disabled": _vm.disabled
    },
    on: {
      "change": [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.localValue = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, _vm.onChange]
    }
  }, [_c('option', {
    domProps: {
      "value": null
    }
  }, [_vm._v(_vm._s(_vm.placeholder))]), _vm._v(" "), _vm._l(_vm.options, function (option, index) {
    return _c('option', {
      key: index,
      domProps: {
        "value": option.value
      }
    }, [_vm._v(_vm._s(option.value))]);
  })], 2), _vm._v(" "), _c('R64Alert', {
    staticClass: "c-absolute c-left-0",
    class: _vm.alertClass,
    attrs: {
      "visible": _vm.errorVisible,
      "message": _vm.errorMessage
    }
  })], 1)]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

const __vue_inject_styles__$8 = undefined;
/* scoped */

const __vue_scope_id__$8 = undefined;
/* module identifier */

const __vue_module_identifier__$8 = undefined;
/* functional template */

const __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

var R64FormSelect = normalizeComponent_1({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$7, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined);

//
//
//
//
//
//
var script$8 = {
  props: {
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return this.border ? 'c-border-b c-border-c-gray' : '';
    }

  }
};

/* script */
const __vue_script__$8 = script$8;
/* template */

var __vue_render__$9 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "c-pt-5 c-pl-5 c-pr-5 c-pb-8 lg:c-pt-16 lg:c-pb-8 lg:c-pl-24",
    class: _vm.classes
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$9 = [];
/* style */

const __vue_inject_styles__$9 = undefined;
/* scoped */

const __vue_scope_id__$9 = undefined;
/* module identifier */

const __vue_module_identifier__$9 = undefined;
/* functional template */

const __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

var R64CheckoutSection = normalizeComponent_1({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$8, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, undefined, undefined);

//
//
//
//
var script$9 = {
  props: {
    value: {
      type: String,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return this.error ? 'c-border-red-400 c-focus:border-red-600' : 'c-border-c-gray c-focus:border-c-grayer';
    }

  }
};

/* script */
const __vue_script__$9 = script$9;
/* template */

var __vue_render__$a = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('input', {
    staticClass: "c-h-10 c-px-3 c-rounded c-border c-text-base c-focus:outline-none",
    class: _vm.classes,
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function (e) {
        return _vm.$emit('input', e.target.value);
      },
      "change": function (e) {
        return _vm.$emit('change', e.target.value);
      }
    }
  });
};

var __vue_staticRenderFns__$a = [];
/* style */

const __vue_inject_styles__$a = function (inject) {
  if (!inject) return;
  inject("data-v-f8f38878_0", {
    source: "input[data-v-f8f38878]::placeholder{color:#737373}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$a = "data-v-f8f38878";
/* module identifier */

const __vue_module_identifier__$a = undefined;
/* functional template */

const __vue_is_functional_template__$a = false;
/* style inject SSR */

var R64Input = normalizeComponent_1({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$9, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, browser$2, undefined);

var promoCode = {
  data() {
    return {
      hasPromoCode: false,
      promoCode: null
    };
  },

  methods: {
    applyPromoCode() {
      this.$emit('apply', this.promoCode);
    }

  },
  watch: {
    hasPromoCode() {
      this.$nextTick(() => this.$refs.promo_code.$el.focus());
    }

  }
};

//
var script$a = {
  mixins: [promoCode, theme],
  components: {
    R64Button,
    R64Input
  }
};

/* script */
const __vue_script__$a = script$a;
/* template */

var __vue_render__$b = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [!_vm.hasPromoCode ? _c('R64Button', {
    staticClass: "c-w-full c-px-0",
    attrs: {
      "btn-secondary": _vm.btnSecondary,
      "variant": "secondary",
      "type": "button"
    },
    nativeOn: {
      "click": function ($event) {
        _vm.hasPromoCode = true;
      }
    }
  }, [_vm._v("\n    Add promo code\n  ")]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.hasPromoCode,
      expression: "hasPromoCode"
    }]
  }, [_c('label', {
    staticClass: "block",
    attrs: {
      "for": "promo_code"
    }
  }, [_vm._v("Promo code")]), _vm._v(" "), _c('R64Input', {
    ref: "promo_code",
    staticClass: "c-w-full c-mt-2",
    attrs: {
      "id": "promo_code"
    },
    model: {
      value: _vm.promoCode,
      callback: function ($$v) {
        _vm.promoCode = $$v;
      },
      expression: "promoCode"
    }
  }), _vm._v(" "), _c('R64Button', {
    staticClass: "c-mt-4",
    attrs: {
      "btn-primary": _vm.btnPrimary
    },
    nativeOn: {
      "click": function ($event) {
        return _vm.applyPromoCode($event);
      }
    }
  }, [_vm._v("\n      Apply\n    ")])], 1)], 1);
};

var __vue_staticRenderFns__$b = [];
/* style */

const __vue_inject_styles__$b = undefined;
/* scoped */

const __vue_scope_id__$b = undefined;
/* module identifier */

const __vue_module_identifier__$b = undefined;
/* functional template */

const __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

var R64PromoCode = normalizeComponent_1({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$a, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, undefined, undefined);

//
var script$b = {
  mixins: [promoCode, theme],
  components: {
    R64Button,
    R64Input
  }
};

/* script */
const __vue_script__$b = script$b;
/* template */

var __vue_render__$c = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return !_vm.hasPromoCode ? _c('div', {
    staticClass: "c-flex c-items-center c-w-full"
  }, [_c('span', {
    staticClass: "c-flex-shrink-0"
  }, [_vm._v("Have a promo code ?")]), _vm._v(" "), _c('R64Button', {
    staticClass: "c-ml-4",
    attrs: {
      "btn-secondary-transparent": _vm.btnSecondaryTransparent,
      "variant": "secondary-transparent"
    },
    nativeOn: {
      "click": function ($event) {
        _vm.hasPromoCode = true;
      }
    }
  }, [_vm._v("Add promo code")])], 1) : _c('div', [_c('label', {
    staticClass: "c-block",
    attrs: {
      "for": "promo_code"
    }
  }, [_vm._v("Promo code")]), _vm._v(" "), _c('R64Input', {
    ref: "promo_code",
    staticClass: "c-w-full c-mt-2",
    attrs: {
      "id": "promo_code"
    },
    model: {
      value: _vm.promoCode,
      callback: function ($$v) {
        _vm.promoCode = $$v;
      },
      expression: "promoCode"
    }
  }), _vm._v(" "), _c('R64Button', {
    staticClass: "c-mt-4",
    attrs: {
      "btn-secondary-transparent": _vm.btnSecondaryTransparent,
      "variant": "secondary-transparent"
    },
    nativeOn: {
      "click": function ($event) {
        return _vm.applyPromoCode($event);
      }
    }
  }, [_vm._v("Apply")])], 1);
};

var __vue_staticRenderFns__$c = [];
/* style */

const __vue_inject_styles__$c = undefined;
/* scoped */

const __vue_scope_id__$c = undefined;
/* module identifier */

const __vue_module_identifier__$c = undefined;
/* functional template */

const __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

var R64InlinePromoCode = normalizeComponent_1({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$b, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, undefined, undefined);

/* script */

/* template */
var __vue_render__$d = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "c-h-px c-bg-c-gray"
  });
};

var __vue_staticRenderFns__$d = [];
/* style */

const __vue_inject_styles__$d = undefined;
/* scoped */

const __vue_scope_id__$d = undefined;
/* module identifier */

const __vue_module_identifier__$d = undefined;
/* functional template */

const __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

var R64HorizontalLine = normalizeComponent_1({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, {}, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, undefined, undefined);

const injectStripe = url => {
  return new Promise(resolve => {
    if (document.getElementById('stripe_script')) {
      resolve();
      return;
    }

    const object = document.createElement('script');
    object.id = 'stripe_script';
    const scriptTag = document.getElementsByTagName('script')[0];
    object.src = `//${url}`;
    object.addEventListener('load', () => {
      resolve();
    });
    scriptTag.parentNode.insertBefore(object, scriptTag);
  });
};

const createStripe = stripeKey => {
  return window['Stripe'] && window['Stripe'](stripeKey);
};

//
var script$c = {
  props: {
    cardholderName: {
      type: String,
      default: null
    },
    stripeKey: {
      type: String,
      default: null
    }
  },
  mixins: [lib_3],
  components: {
    R64Alert
  },

  data() {
    return {
      stripe: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      cardNumberError: null,
      cardExpiryError: null,
      cardCvcError: null
    };
  },

  async mounted() {
    await injectStripe('js.stripe.com/v3/');
    this.stripe = createStripe(this.stripeKey);
    const stripeElements = this.stripe.elements();
    const style = {
      base: {
        fontSize: '16px',
        '::placeholder': {
          color: '#CCCCCC'
        }
      }
    };
    this.cardNumber = stripeElements.create('cardNumber', {
      style: style
    });
    this.cardExpiry = stripeElements.create('cardExpiry', {
      style: style
    });
    this.cardCvc = stripeElements.create('cardCvc', {
      style: style
    });
    this.cardNumber.mount(this.$refs.card_number);
    this.cardExpiry.mount(this.$refs.card_expiry);
    this.cardCvc.mount(this.$refs.card_cvc);
    this.cardNumber.on('change', event => {
      if (!event.complete && event.error) {
        this.cardNumberError = event.error.message;
        this.$emit('error:number', event);
      } else {
        this.cardNumberError = null;
        this.$emit('complete:number', event);
      }

      this.$emit('change');
    });
    this.cardExpiry.on('change', event => {
      if (!event.complete && event.error) {
        this.cardExpiryError = event.error.message;
        this.$emit('error:expiry', event);
      } else {
        this.cardExpiryError = null;
        this.$emit('complete:expiry', event);
      }

      this.$emit('change');
    });
    this.cardCvc.on('change', event => {
      if (!event.complete && event.error) {
        this.cardCvcError = event.error.message;
        this.$emit('error:cvc', event);
      } else {
        this.cardCvcError = null;
        this.$emit('complete:cvc', event);
      }

      this.$emit('change');
    });
  },

  beforeDestroy() {
    this.cardNumber.unmount();
    this.cardExpiry.unmount();
    this.cardCvc.unmount();
  },

  methods: {
    createToken() {
      if (this.cardholderName) {
        return this.stripe.createToken(this.cardNumber, {
          name: this.cardholderName
        });
      }

      return this.stripe.createToken(this.cardNumber);
    }

  }
};

const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIJSURBVHgB1VTLbtNAFD0zGbuJk7RxC60oCFreFQ8ViQVlFQELEAuWbPgEvoANP8CSDZ/AV9AVKySk7pAQILqoVDWPSk3jxPbczrgTZ2ynrdRVe6V5Xd977tvAWSeW3t7/bILLJk5Dkq/j86N1fRUpU4Mx/hGkzSSbWmTZNXdiWZaW5VJzcoCw9EdKVgAFIrORbVhhFwSZtWxegWl4OZYomNUWGVlAOVAiy4DRmQToCo439xsIYwlR4qmgwxl2gxhLsy7+tUP4FfWNMXT2I/iewK/tAD/+91AI+cPzefzeGeCq7+JCtYTNboggIqxeriCShD+tEFcaDl7dm8Hf1hC358voh4Trc27GwxRwbyjx4k4NAwXiVwTePZ7FilIKY+DZrTrWlj2ECnizM8TDxTJiqY2VIemIHH76tp3ia69mKiV4DoPCw0B54nsldPox2r0YXXXq98ZWAFelpHmjdtgzKFSZkoLcvOiiPsXxdLmGB5fKKr8Mdxem0OlFiFVRqg5LRNeWqghCiberjaKHNs1Vhcqlk4TlORxPrnlJTV+r/C1OC7SVhwt1B7v9CC9XpvF1o3sMoLL85Xtr/EgO07zMtAqZ+6iF6KTGTvrRPMg0L7Mmglnjl+tsMQHNGkHKvhMRyo5mblKKRRnhMitExsaTN5rhTCSTPOTqFyRlJh/jHOa0Mjw61D03dAA2RrKqUOdVHgAAAABJRU5ErkJggg==";

const img$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAASCAYAAADR/2dRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANDSURBVHgB7ZXfT1NnGMc/72mhZQVKGfSUC5eVTelNS7YwxF3MaScbxM39yDaWGZrFZTe4v4BsksVeEC9csmSZmxdjW8sFdWjQMUfCNhdMdiNUDaLV+DOoCGikIoj2+J63h9ZEuZYLnqTpc558z/M87/N8v+8RhjSkZYwMmhDSM39PxzSWka00s5Qtq2bseVdgcllYPhiYzBYmqY3Fp+yzwoksBkMouJKByGIsqJXJwrGIM/I5rNhjzRwfGeHA/gO4XC6a3mqi+oVqftizh5aPW4jHY0zfnGbbts/x6l72JRIkR5LUr63nvc3NnO3/hfToCJUvruaZ17YQS/TzSUsLVT4fg4ODpNMzpFLnuDObxldVhe7VSSaTPLdqFQ0NDZR5PDLuy68plUpxbHiYmdszRD6LqGLd8TgHD/bx75EjrFm9hrm5OTo7O+nt7ZWNrOXK+DWGf4zy4LsdVBxNUPDrLuZ+/pqx0ZP09fVhZAx2f7tbTcU8kMdTjq7rDAz8xbzM1dPTo3CPTUYIjZpADTu+6aC42EUi0aPuHbe7lInr15mYmMDpcNC773cG//kbr9fLvZlb/P9hELdLoDlsFBYJCq/+R2TzLnZ+/xv1da8wNTnF+vWvy7V0MH51HHeZW9Wrkk2NOZ1UeCvRfbqKPZHA5oY1TVN7DYffoKuri/MXzhONRikuKeHe/LzCLWTuU1nioLDUwPWsDZdXw14uqKt7GbvdTnt7O59u3UpBQfbMoWCIUCikaBLv7kazabS2tubq5poxb+DLFy+x96e9HOr/g3c/eJ+MjMdiMTnWAdwlpfJUZWwMbyS6M8rhPw+T2H8I94Y3cZSDs1zDVqGh1TRQqPt5e8s7jI6dorm5SVYRlhAM0pIGGbm+1kiEyRuTnEgez3HY1iFNnXJhgempKfXS9u1fEggEeLBwn8bGRoaGhnAWFdHW1samxk2SV7dl7Ch+fzUvffQFBXLMRmUFBMLYNnyFcJTif94vOeKRkw0r1dydnVWrviu5EgwGqa2t5dV16zh95gwh6Zt1Rf7bZKgxWSI0SZTbmSlrM6H6t2TJ4gWwqFxyKleOsGScTWVp/9FrwSD/olVLrHwol7CVZpayZdXMQ5BAO48be8OIAAAAAElFTkSuQmCC";

const img$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAUCAYAAABxnDbHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN/SURBVHgBxZZdbBRVGIafmc7+zEx3p93udukiJVvd0lI0aYMSVEig1RsTYyLeeEGiRkkwIRjjDReakKAXJmpi8MZ/Q9T4g2kvpIEKyp9NNK6SwhbQppQ1EXfZdtvtbt12Zjy7C8VdurVwAe/kzGTmnO97v+/MO29GsgW4xZC5DVAqHxQaHzh2muhIAlNxYituscrBw10h1rb4uRyP83tfP+7sHKoFqqjbpWkEnn+yGNt35ggXJkbRHOB22jjFdUNzDyFveGHSQtBT299h//FzZHQNWzWQNA+220ODoWGkRnnvia34MxaBaQn/jEwdNdQvC+DdtoXuvc8xmBjCq0FQM/Hp4BGVRfxtZaRl2xuLjfHtwSi2BJI4KrHvld2YeZOF8F1skB/HhliKQspIJ9LTRcJqyKQzVecS2UlgkeBqpJWQpFLZlamuPq1sSipbXD21wiJY0+xjfVcryVwpk0tTCW/eSGt7O3VODWUiix0bQf7pLKsbV/LsuscQ2hMCsnA5TEbGo6TyozdAKtro6Qzzxo5NxC6mOTqc4KV9H2I0+Ih+8Bl/9R6h3qHS9EAnmdgF7m25m447VrGz71UUS2bPpl3IksyOA1turNNK1Dc28sfJQQ7v2iPUC7MzNeR7jwn1+ovzsthbj1ujzq3yj5nnzKVfxC4ll0Za2EypcLqiqjnTuto8spBn6d1JFRFg2hZ/Z1KM50yy+RwrjBbCdXcuTtoaaWL70z38fD6Bres88+g9gsjm0Kk/0VU36WSSFfet5cGXXyC5/zA+Vy3L13eS+7S/WFFBWrJdqmd6NkfY1yxIV13f1H+9d/hsnHc/PkQoHMLl1ZmalfhhOMnAcJq92+4n/uaLRFaGibS1Y7jUopDmYqNwNMr4wGt8/etBJJeM22FR64L0TJyhy8fZ3f02Xcs2LNxpKjXJJ1+cYEbTyYphqd55RyogOznFqb4DXPqq/zpHOp+I89aJL4V0bQy93JEqsWTDtxb78KX/sQX7JkgLCQMeR9X5mkC9sL/qtF6HUZ1Umi+rNOQrJXY0GzzS1cQ1fyqqpnRfIxN8fee1+HlVF1JbdAbXEW7oKCMtE9LYxQSff3OSOWErsw5hLWIsDxpsfWg1TkWh//2PkCamqLUk9LyEatcQeryb2ra7+C1+jt7T34sY4VwOG10xWROMsDG8WdSlVCe9Vbgtfw7/AqatNsM2x4a+AAAAAElFTkSuQmCC";

const img$3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIzSURBVHgB3VXNbtNAEP5218EJSdFWLVKQiLpSuHHJiROHtE9Q7hzKkRPwBJQ3aM99ib5B/QjmhJAQWaRK5ILqAm6q+GeZjePITm0rV/pJlme93+y3M5mZAPcFrG5jAim7aB8acMXBghiJ/wRTL9//c9YfCy5GBkbCGJ9Hxu+8neqNROzhPXQ/kvm+gqzF6/RD+4C/o+V4fd8wnHQQfmJvgqBWZClwQeYIFXAHt9g6+IXo+Q6S3TZqbu27LNwvCvEiYRlBpYDoxXj4IvNrfb0Ci9NKEUP+s+yconCGn+grB2KCGrSHN+i9vFqt470txOoRavks3M6jWUXSQmuEBrjPbkprfj1voiNMu4crbm6kSGWTk01XEew2xqbgmxKTv05pbVzRyGcmvfvDU7rOm5yi6YOyaL/bRIftmzsi29ABAzutc5p96cHMszoxbUHJdeuotsJOi41ZSpeAc0wvv9JxzvH7Ymdhx0O5EKqC7ZMOC4+L30oiNhoHrf26iKKp6wU/Bq+SXVdXXoQiWG/EpXA1bN/Ysk6QjOzsIqr/GJdevj87ezo23CxmlwHTXR6erx9eKaKUystYaoJd0ytYfh/TY0WsHazzCsdIJ4b6dqm9SpHhQB3RkJM2hzQ09iiZ1yyBZgIyTSGZgSaPMaVlQvZnI6AskXjSvskvMIYe4n/X+iQ/t1T8XMCPiJhmG8q2m7A3j2n6OuSMhZgvOLzITmSKjnNospXDQX8H8HmKI15TPP8//gE+Us2m68Qe9AAAAABJRU5ErkJggg==";

const img$4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAKCAYAAADVTVykAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANRSURBVHgBZVRdSFRREJ455+6uQmQU9EfourlbkWWUVgRWZBYR/RD4UEYPEkUtRb30UEj2YkhQ1FN/WvRL9FIPBoXVVkbRH/3AFrr+lL5U/oSoqPfeM805925Ie+HeO2dmzjffzJk5GIlW7gDCCrDEYkAJQHIYBJ1qT9Y3gP9Eig43oJBlhPhnyKEVE0Khe+wbEyDutL6pOVKw7PgskNknUIothHIK2whQfLaGB8u+vTnaqzEKyus3g8RzgBayLZl6sHOD1mM6SCxWVeQgPQMhchBFc1vyUqnWh+ceCssQdRhyQl4dDTn7Q3bWEAgLEWXclVajAHjGch4Dg+/HOcn+tsTByWn8aPnlFrZHGZ/t1tiAoyb/fLRrSKQdWloaPiHQUyDiFS3g15ATQXu750FAarQ2MBIsMcTZzwH6IEhVIFGeXvO/Mtg7GCIK5iK42/4lV36+DEBFGUOBhlcqOAGwyODD+EfBExOIKCc3WpXvx93jkYKm9o/nWoVQS32SY+FsfIekZoBBNe/cgYGJsu15vCuVOJxIwzqu2mv2ENzhT5+JYUFJBgEBbpMPDpaEZZHCfRs5q7Beo6su+iRLTTCid4lEjYMuXGfCw3ofa6tD+XayYGVdZRozvPpMmINUaNklusm+77Uv64ozCLS2Xv/KyN0eCVHM2R3wgqlU6svZu15BVIkJpqjZ7Hlb89EFms+a2+YYFBMmcWP2ytN7tN3CQLXJGNyO9qbdjSy/NAkptSbzCExbYqMJirCOAdd7malabYosOhjlwzcll+C8SG/pfF3T2faqegf34Ca/OtwPqpyzn4SgtniEEaNrL9QLoFX+kc7M33xrmvV/fCLVzHOyl6VCRmEi1D/m2ve98uNCHlFTB1fIz3nLj8wLOIFikPbTEWH3gk2jzEzv0aR7Ai5uJYk8lqi7NszlrzLB0SMpxuwVGRWQrnzoU9HNyMzV/e5kfZ8pDlCp32zf29/X/ZA2ruZZuUaU1ZWlcoZJqEd+BX65tlvH98ZRswTiEaQ4d0GczB96tVYQLcmoQCp15XcktounAWImW3Jqx9VnOoN3s9acPxJyX9E3Ls0cvhT0aPaw/IRIHMOAmMpyNntxT8HJ1OP41TRKdO2lQr6UNvFdkfsXi86iTP3AkcIAAAAASUVORK5CYII=";

/* script */
const __vue_script__$c = script$c;

var __vue_render__$e = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    staticClass: "c-mt-6"
  }, [_c('label', {
    staticClass: "c-block"
  }, [_c('span', [_vm._v("Card Number")]), _vm._v(" "), _c('div', {
    staticClass: "c-relative"
  }, [_c('span', {
    staticClass: "c-absolute c-top-0 c-bottom-0 c-left-0 c-px-3 c-flex c-items-center"
  }, [_c('svg', {
    staticClass: "c-w-5 c-h-5",
    attrs: {
      "viewBox": "0 0 20 16",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M18 0H2C.89 0 .01.89.01 2L0 14c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V2c0-1.11-.89-2-2-2zm0 14H2V8h16v6zm0-10H2V2h16v2z",
      "fill": "#737373"
    }
  })])]), _vm._v(" "), _c('div', {
    ref: "card_number",
    staticClass: "c-mt-2 c-w-full c-h-10 c-px-10 c-rounded c-border c-border-c-gray c-text-base c-focus:outline-none c-focus:border-c-grayer",
    staticStyle: {
      "padding-top": "10px"
    }
  })])]), _vm._v(" "), _c('R64Alert', {
    staticClass: "c-mt-2",
    attrs: {
      "visible": _vm.cardNumberError !== null,
      "message": _vm.cardNumberError
    }
  }), _vm._v(" "), _vm._m(0)], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6 c-flex"
  }, [_c('div', {
    staticClass: "c-w-1/2"
  }, [_c('label', {
    staticClass: "c-block"
  }, [_c('span', [_vm._v("Expiration Date")]), _vm._v(" "), _c('div', {
    ref: "card_expiry",
    staticClass: "c-mt-2 c-h-10 c-px-3 c-rounded c-border c-border-c-gray c-text-base c-focus:outline-none c-focus:border-c-grayer",
    staticStyle: {
      "padding-top": "10px"
    }
  }), _vm._v(" "), _c('R64Alert', {
    staticClass: "c-mt-2",
    attrs: {
      "visible": _vm.cardExpiryError !== null,
      "message": _vm.cardExpiryError
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "c-w-1/2 c-ml-4"
  }, [_c('label', {
    staticClass: "c-block"
  }, [_c('span', [_vm._v("Security Code")]), _vm._v(" "), _c('div', {
    ref: "card_cvc",
    staticClass: "c-mt-2 c-h-10 c-px-3 c-rounded c-border c-border-c-gray c-text-base c-focus:outline-none c-focus:border-c-grayer",
    staticStyle: {
      "padding-top": "10px"
    }
  }), _vm._v(" "), _c('R64Alert', {
    staticClass: "c-mt-2",
    attrs: {
      "visible": _vm.cardCvcError !== null,
      "message": _vm.cardCvcError
    }
  })], 1)])])]);
};

var __vue_staticRenderFns__$e = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "c-mt-2 c-flex c-items-center"
  }, [_c('span', {
    staticClass: "c-text-sm"
  }, [_vm._v("We accept")]), _vm._v(" "), _c('span', {
    staticClass: "c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm"
  }, [_c('img', {
    attrs: {
      "src": img
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm"
  }, [_c('img', {
    attrs: {
      "src": img$1
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm"
  }, [_c('img', {
    attrs: {
      "src": img$2
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm"
  }, [_c('img', {
    attrs: {
      "src": img$3
    }
  })]), _vm._v(" "), _c('span', {
    staticClass: "c-ml-2 c-w-8 c-h-5 c-flex c-items-center c-justify-center c-border c-border-c-gray c-rounded-sm"
  }, [_c('img', {
    attrs: {
      "src": img$4
    }
  })])]);
}];
/* style */

const __vue_inject_styles__$e = undefined;
/* scoped */

const __vue_scope_id__$e = undefined;
/* module identifier */

const __vue_module_identifier__$e = undefined;
/* functional template */

const __vue_is_functional_template__$e = false;
/* style inject */

/* style inject SSR */

var R64StripePayment = normalizeComponent_1({
  render: __vue_render__$e,
  staticRenderFns: __vue_staticRenderFns__$e
}, __vue_inject_styles__$e, __vue_script__$c, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, undefined, undefined);

/* script */

/* template */
var __vue_render__$f = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('svg', {
    staticStyle: {
      "enable-background": "new 0 0 50 50"
    },
    attrs: {
      "version": "1.1",
      "id": "loader-1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "width": "24",
      "height": "24",
      "x": "0px",
      "y": "0px",
      "viewBox": "0 0 50 50",
      "xml:space": "preserve"
    }
  }, [_c('path', {
    attrs: {
      "fill": "#AFAFAF",
      "d": "M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z",
      "transform": "rotate(297.965 25 25)"
    }
  }, [_c('animateTransform', {
    attrs: {
      "attributeType": "xml",
      "attributeName": "transform",
      "type": "rotate",
      "from": "0 25 25",
      "to": "360 25 25",
      "dur": "0.6s",
      "repeatCount": "indefinite"
    }
  })], 1)]);
};

var __vue_staticRenderFns__$f = [];
/* style */

const __vue_inject_styles__$f = undefined;
/* scoped */

const __vue_scope_id__$f = undefined;
/* module identifier */

const __vue_module_identifier__$f = undefined;
/* functional template */

const __vue_is_functional_template__$f = false;
/* style inject */

/* style inject SSR */

var R64Spinner = normalizeComponent_1({
  render: __vue_render__$f,
  staticRenderFns: __vue_staticRenderFns__$f
}, __vue_inject_styles__$f, {}, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, undefined, undefined);

var error = {
  methods: {
    focusError(component = this) {
      if (component.error) {
        component.$refs.input.focus();
        return true;
      }

      let focused = false;
      component.$children.some(child => {
        focused = this.focusError(child);
        return focused;
      });
      return focused;
    }

  }
};

var orderApi = {
  url: '/api/orders',

  create(params) {
    return http.post(`${this.url}?token=${params.auth_token}`, params);
  },

  get(orderToken, authToken) {
    return http.get(`${this.url}/${orderToken}?token=${authToken}`);
  }

};

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$1;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root.Date.now();
};

var now_1 = now;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber_1(wait) || 0;
  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now_1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

//
var script$d = {
  mixins: [cartMixin, money, lib_3, theme, error],
  props: {
    stripeKey: {
      type: String,
      default: null
    },
    authToken: {
      type: String,
      default: null
    },
    settings: {
      type: Object,
      default: null
    },
    shippingRequest: {
      type: Boolean,
      default: false
    },
    zipcodeRequest: {
      type: Boolean,
      default: false
    }
  },
  components: {
    R64Button,
    R64CartItemPreview,
    R64FormInput,
    R64FormSelect,
    R64CheckoutSection,
    R64InlinePromoCode,
    R64PromoCode,
    R64HorizontalLine,
    R64StripePayment,
    R64Alert,
    R64Spinner
  },

  data() {
    return {
      itemSummaryVisible: false,
      form: {
        customer_email: null,
        customer_notes: null,
        shipping_first_name: null,
        shipping_last_name: null,
        shipping_address_line1: null,
        shipping_address_line2: null,
        shipping_address_city: null,
        shipping_address_region: null,
        shipping_address_zipcode: null,
        shipping_address_phone: null,
        billing_same: false,
        billing_first_name: null,
        billing_last_name: null,
        billing_address_line1: null,
        billing_address_line2: null,
        billing_address_zipcode: null,
        billing_address_city: null,
        billing_address_region: null,
        billing_address_phone: null
      },
      stripeValidated: {
        number: false,
        expiry: false,
        cvc: false
      },
      paymentErrorVisible: false,
      promoCodeErrorVisible: false,
      consent: false,
      busyZipCode: false,
      busyShipping: false,
      busyOrder: false
    };
  },

  validations() {
    const requiredFields = {
      customer_email: {
        email: validators_5
      },
      shipping_first_name: {},
      shipping_last_name: {},
      shipping_address_line1: {},
      shipping_address_line2: {},
      shipping_address_city: {},
      shipping_address_region: {},
      shipping_address_zipcode: {},
      shipping_address_phone: {},
      billing_same: {
        required: validators_10
      },
      billing_first_name: {},
      billing_last_name: {},
      billing_address_line1: {},
      billing_address_line2: {},
      billing_address_zipcode: {},
      billing_address_city: {},
      billing_address_region: {},
      billing_address_phone: {}
    };
    Object.keys(this.settings.required).forEach(field => {
      if (this.settings.required[field]) {
        requiredFields[field] = { ...requiredFields[field],
          required: validators_10
        };
      } else {
        requiredFields[field] = { ...requiredFields[field]
        };
      }
    });
    return {
      form: { ...requiredFields
      }
    };
  },

  async mounted() {
    window.scrollTo(0, 0);
    await this.fetchCart();
    this.form = Object.assign({}, this.cart);
  },

  computed: {
    itemSummaryText() {
      return this.itemSummaryVisible ? 'Hide item summary' : 'Show item summary';
    },

    tocUrl() {
      return this.settings ? this.settings.toc_url : '#';
    },

    stripeAllValidated() {
      if (this.isFree) {
        return true;
      }

      return this.stripeValidated.number && this.stripeValidated.expiry && this.stripeValidated.cvc;
    },

    billingAllValidated() {
      return !this.$v.form.billing_first_name.$invalid && !this.$v.form.billing_last_name.$invalid && !this.$v.form.billing_address_line1.$invalid && !this.$v.form.billing_address_line2.$invalid && !this.$v.form.billing_address_zipcode.$invalid && !this.$v.form.billing_address_city.$invalid && !this.$v.form.billing_address_region.$invalid && !this.$v.form.billing_address_phone.$invalid;
    },

    hasCouponCode() {
      return parseFloat(this.cart.discount) !== 0;
    },

    hasTax() {
      return parseFloat(this.cart.tax) !== 0;
    },

    isFree() {
      return parseFloat(this.cart.total) === 0;
    },

    hasShipping() {
      return parseFloat(this.cart.shipping) !== 0;
    }

  },
  methods: {
    async applyPromoCode(couponCode) {
      try {
        await cartApi.update(this.cartToken, {
          coupon_code: couponCode
        });
        this.fetchCart();
      } catch (e) {
        this.promoCodeErrorVisible = true;
      }
    },

    formValid() {
      this.$v.$touch();

      if (!this.stripeAllValidated) {
        this.paymentErrorVisible = true;
      }

      if (!this.billingAllValidated) {
        this.form.billing_same = true;
      }

      if (!this.$v.$invalid && this.stripeAllValidated) {
        this.paymentErrorVisible = false;
        return true;
      }

      return false;
    },

    async createOrder() {
      if (!this.formValid()) {
        this.$nextTick(() => this.focusError());
        return;
      }

      this.busyOrder = true;
      let orderParams = {
        order: {
          cart_token: this.cartToken,
          ...this.form
        },
        auth_token: this.authToken
      };

      try {
        if (!this.isFree) {
          const {
            token
          } = await this.$refs.stripe.createToken();
          orderParams = { ...orderParams,
            stripe: {
              token: token.id
            }
          };
        }

        try {
          const {
            data
          } = await orderApi.create(orderParams);
          this.$emit('order:create', data);
        } catch (e) {//
        }

        this.busyOrder = false;
      } catch (e) {//
      }
    },

    updateCart: debounce_1(async function (property) {
      if (this.$v.form[property].$invalid || !this.propertyDiff(property)) {
        return;
      }

      try {
        const {
          data
        } = await cartApi.update(this.cartToken, { ...this.form
        });
        this.cart = data;

        if (this.cart.billing_same) {
          this.form.billing_first_name = this.cart.shipping_first_name;
          this.form.billing_last_name = this.cart.shipping_last_name;
          this.form.billing_address_line1 = this.cart.shipping_address_line1;
          this.form.billing_address_line2 = this.cart.shipping_address_line2;
          this.form.billing_address_zipcode = this.cart.shipping_address_zipcode;
          this.form.billing_address_city = this.cart.shipping_address_city;
          this.form.billing_address_region = this.cart.shipping_address_region;
          this.form.billing_address_phone = this.cart.shipping_address_phone;
        }

        this.$emit('cart:update', data);
      } catch (e) {//
      }
    }, 100),

    async updateCartZipCode(zipCode) {
      this.busyZipCode = true;

      try {
        const {
          data
        } = await cartApi.updateZipCode(this.cartToken, zipCode);
        this.cart = data;

        if (data.shipping_address_city) {
          this.form.shipping_address_city = data.shipping_address_city;
          this.form.billing_address_city = data.billing_address_city;
        }

        if (data.shipping_address_region) {
          this.form.shipping_address_region = data.shipping_address_region;
          this.form.billing_address_region = data.billing_address_region;
        }

        this.$emit('cart:update', data);
        await this.updateCartShipping(zipCode);
      } catch (e) {
        this.form.shipping_address_zipcode = null;
      }

      this.busyZipCode = false;
    },

    async updateCartShipping(zipCode) {
      this.busyShipping = true;

      try {
        const {
          data
        } = await cartApi.updateShipping(this.cartToken, zipCode);
        this.cart = data;
      } catch (e) {//
      }

      this.busyShipping = false;
      this.$emit('cart:update', this.cart);
    },

    async updateBillingSame(billingSame) {
      try {
        const {
          data
        } = await cartApi.update(this.cartToken, {
          billing_same: billingSame
        });
        this.cart = data;
        this.form = Object.assign({}, this.cart);
        this.$emit('cart:update', data);
      } catch (e) {//
      }
    },

    propertyDiff(property) {
      const cartProperty = this.cart[property];
      const formProperty = this.form[property];

      if (cartProperty === null && formProperty === "") {
        return false;
      }

      return cartProperty !== formProperty;
    }

  }
};

/* script */
const __vue_script__$d = script$d;
/* template */

var __vue_render__$g = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.cart ? _c('div', {
    staticClass: "c-antialiased c-text-c-black c-bg-c-light-gray",
    class: _vm.font,
    staticStyle: {
      "box-sizing": "border-box"
    }
  }, [_c('div', {
    staticClass: "checkout-cart-items c-fixed c-p-5 c-top-0 c-left-0 c-right-0 c-z-10 c-bg-white lg:c-hidden"
  }, [_c('div', {
    staticClass: "c-flex c-items-center c-justify-between"
  }, [_c('span', {
    staticClass: "c-text-xl"
  }, [_vm._v("Total to pay (" + _vm._s(_vm.cartItems.length) + " items)")]), _vm._v(" "), _c('span', {
    staticClass: "c-text-xl c-font-bold"
  }, [_vm._v(_vm._s(_vm.money(_vm.cart.total)))])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.itemSummaryVisible,
      expression: "itemSummaryVisible"
    }],
    staticClass: "c-mt-10"
  }, _vm._l(_vm.cartItems, function (cartItem, index) {
    return _c('R64CartItemPreview', {
      key: index,
      staticClass: "c-mt-4",
      attrs: {
        "cart-item": cartItem,
        "currency-symbol": _vm.currencySymbol,
        "border": index !== _vm.cartItems.length - 1
      }
    });
  }), 1), _vm._v(" "), _c('button', {
    staticClass: "c-flex c-items-center c-justify-between c-w-full c-mt-2",
    on: {
      "click": function ($event) {
        _vm.itemSummaryVisible = !_vm.itemSummaryVisible;
      }
    }
  }, [_c('span', {
    class: _vm.textPrimary
  }, [_vm._v(_vm._s(_vm.itemSummaryText))]), _vm._v(" "), _c('span', {
    class: {
      'c-rotate-1/2': _vm.itemSummaryVisible
    }
  }, [_c('svg', {
    staticClass: "c-w-3 c-h-3 c-fill-current",
    class: _vm.textPrimary,
    attrs: {
      "viewBox": "0 0 12 7",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M1.41 0.0380859L6 3.86986L10.59 0.0380859L12 1.21774L6 6.23753L0 1.21774L1.41 0.0380859Z"
    }
  })])])])]), _vm._v(" "), _vm.settings ? _c('div', {
    staticClass: "c-min-h-screen lg:c-flex lg:c-mx-auto lg:c-max-w-7xl"
  }, [_c('div', {
    staticClass: "checkout-form c-w-full c-mt-24 c-bg-white lg:c-flex-shrink-0 lg:c-max-w-2xl lg:c-mt-0 xl:c-max-w-4xl"
  }, [_c('R64CheckoutSection', [_c('button', {
    staticClass: "c-flex c-items-center",
    class: _vm.textPrimary,
    attrs: {
      "type": "button"
    },
    on: {
      "click": function ($event) {
        return _vm.$emit('cart');
      }
    }
  }, [_c('span', [_c('svg', {
    staticClass: "c-w-3 c-h-3 c-fill-current",
    class: _vm.iconColor,
    attrs: {
      "viewBox": "0 0 8 12",
      "fill": "none",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M7.41 10.59L2.83 6l4.58-4.59L6 0 0 6l6 6 1.41-1.41z"
    }
  })])]), _vm._v(" "), _c('span', {
    staticClass: "c-ml-3"
  }, [_vm._v("Back to cart")])]), _vm._v(" "), _c('h2', {
    staticClass: "c-mt-3 c-text-3xl"
  }, [_vm._v("Check Out")]), _vm._v(" "), _c('div', {
    staticClass: "xl:c-flex c-mt-6"
  }, [_c('span', {
    staticClass: "c-block c-text-xl c-font-bold xl:c-w-1/3"
  }, [_vm._v("Contact")]), _vm._v(" "), _c('div', {
    staticClass: "c-w-full c-mt-6 lg:c-max-w-sm xl:c-mt-0"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Email address",
      "validator": _vm.$v.form.customer_email,
      "show-error": _vm.$v.form.customer_email.$error,
      "error-message": "Valid email address is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('customer_email');
      }
    },
    model: {
      value: _vm.form.customer_email,
      callback: function ($$v) {
        _vm.$set(_vm.form, "customer_email", $$v);
      },
      expression: "form.customer_email"
    }
  })], 1)])]), _vm._v(" "), _c('R64CheckoutSection', [_c('div', {
    staticClass: "xl:c-flex c-mt-6"
  }, [_c('span', {
    staticClass: "c-block c-text-xl c-font-bold xl:c-w-1/3"
  }, [_vm._v("Shipping")]), _vm._v(" "), _c('div', {
    staticClass: "c-w-full lg:c-max-w-sm"
  }, [_c('span', {
    staticClass: "c-mt-6 c-block c-text-xl xl:c-mt-0"
  }, [_vm._v("Shipping Address")]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "First name",
      "validator": _vm.$v.form.shipping_first_name,
      "show-error": _vm.$v.form.shipping_first_name.$error,
      "error-message": "First name is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('shipping_first_name');
      }
    },
    model: {
      value: _vm.form.shipping_first_name,
      callback: function ($$v) {
        _vm.$set(_vm.form, "shipping_first_name", $$v);
      },
      expression: "form.shipping_first_name"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Last name",
      "validator": _vm.$v.form.shipping_last_name,
      "show-error": _vm.$v.form.shipping_last_name.$error,
      "error-message": "Last name is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('shipping_last_name');
      }
    },
    model: {
      value: _vm.form.shipping_last_name,
      callback: function ($$v) {
        _vm.$set(_vm.form, "shipping_last_name", $$v);
      },
      expression: "form.shipping_last_name"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Street",
      "validator": _vm.$v.form.shipping_address_line1,
      "show-error": _vm.$v.form.shipping_address_line1.$error,
      "error-message": "Street address is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('shipping_address_line1');
      }
    },
    model: {
      value: _vm.form.shipping_address_line1,
      callback: function ($$v) {
        _vm.$set(_vm.form, "shipping_address_line1", $$v);
      },
      expression: "form.shipping_address_line1"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Apartment, suite, etc ...",
      "validator": _vm.$v.form.shipping_address_line2,
      "show-error": _vm.$v.form.shipping_address_line2.$error,
      "error-message": "Appartment or suite is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('shipping_address_line2');
      }
    },
    model: {
      value: _vm.form.shipping_address_line2,
      callback: function ($$v) {
        _vm.$set(_vm.form, "shipping_address_line2", $$v);
      },
      expression: "form.shipping_address_line2"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6 c-flex"
  }, [_c('div', {
    staticClass: "c-w-full"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Zipcode",
      "alert-class": "whitespace-no-wrap",
      "validator": _vm.$v.form.shipping_address_zipcode,
      "show-error": _vm.$v.form.shipping_address_zipcode.$error,
      "error-message": "Zipcode is required"
    },
    on: {
      "blur": _vm.updateCartZipCode
    },
    model: {
      value: _vm.form.shipping_address_zipcode,
      callback: function ($$v) {
        _vm.$set(_vm.form, "shipping_address_zipcode", $$v);
      },
      expression: "form.shipping_address_zipcode"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-w-full c-ml-2"
  }, [_c('R64FormInput', {
    attrs: {
      "disabled": _vm.busyZipCode,
      "validator": _vm.$v.form.shipping_address_city,
      "show-error": _vm.$v.form.shipping_address_city.$error,
      "error-message": "City is required",
      "label": "City"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('shipping_address_city');
      }
    },
    model: {
      value: _vm.form.shipping_address_city,
      callback: function ($$v) {
        _vm.$set(_vm.form, "shipping_address_city", $$v);
      },
      expression: "form.shipping_address_city"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-w-full c-ml-2"
  }, [_c('R64FormSelect', {
    attrs: {
      "disabled": _vm.busyZipCode,
      "options": _vm.settings.states,
      "validator": _vm.$v.form.shipping_address_region,
      "show-error": _vm.$v.form.shipping_address_region.$error,
      "label": "State",
      "placeholder": "Select state",
      "error-message": "State is required"
    },
    on: {
      "change": function ($event) {
        return _vm.updateCart('shipping_address_region');
      }
    },
    model: {
      value: _vm.form.shipping_address_region,
      callback: function ($$v) {
        _vm.$set(_vm.form, "shipping_address_region", $$v);
      },
      expression: "form.shipping_address_region"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Phone",
      "validator": _vm.$v.form.shipping_address_phone,
      "show-error": _vm.$v.form.shipping_address_phone.$error,
      "error-message": "Phone is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('shipping_address_phone');
      }
    },
    model: {
      value: _vm.form.shipping_address_phone,
      callback: function ($$v) {
        _vm.$set(_vm.form, "shipping_address_phone", $$v);
      },
      expression: "form.shipping_address_phone"
    }
  })], 1)]), _vm._v(" "), _vm._t("shipping")], 2)])]), _vm._v(" "), !_vm.isFree ? _c('R64CheckoutSection', {
    attrs: {
      "border": false
    }
  }, [_c('div', {
    staticClass: "xl:c-flex c-mt-6"
  }, [_c('span', {
    staticClass: "c-block c-text-xl c-font-bold xl:c-w-1/3"
  }, [_vm._v("Payment")]), _vm._v(" "), _c('div', {
    staticClass: "c-w-full lg:c-max-w-sm"
  }, [_c('span', {
    staticClass: "c-mt-6 c-block c-text-xl xl:c-mt-0"
  }, [_vm._v("Payment method")]), _vm._v(" "), _c('R64StripePayment', {
    ref: "stripe",
    attrs: {
      "stripe-key": _vm.stripeKey
    },
    on: {
      "complete:number": function ($event) {
        _vm.stripeValidated.number = true;
      },
      "error:number": function ($event) {
        _vm.stripeValidated.number = false;
      },
      "complete:expiry": function ($event) {
        _vm.stripeValidated.expiry = true;
      },
      "error:expiry": function ($event) {
        _vm.stripeValidated.expiry = false;
      },
      "complete:cvc": function ($event) {
        _vm.stripeValidated.cvc = true;
      },
      "error:cvc": function ($event) {
        _vm.stripeValidated.cvc = false;
      },
      "change": function ($event) {
        _vm.paymentErrorVisible = false;
      }
    }
  }), _vm._v(" "), _c('R64Alert', {
    staticClass: "c-mt-2",
    attrs: {
      "visible": _vm.paymentErrorVisible,
      "message": "Correct payments details are required"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6"
  }, [_c('span', {
    staticClass: "c-block c-text-xl"
  }, [_vm._v("Billing Address")]), _vm._v(" "), _c('div', {
    staticClass: "c-mt-5 c-w-full c-flex"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.billing_same,
      expression: "form.billing_same"
    }],
    staticClass: "c-form-radio",
    attrs: {
      "type": "radio",
      "id": "billing_address_same"
    },
    domProps: {
      "value": true,
      "checked": _vm._q(_vm.form.billing_same, true)
    },
    on: {
      "change": [function ($event) {
        return _vm.$set(_vm.form, "billing_same", true);
      }, function ($event) {
        return _vm.updateBillingSame(true);
      }]
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "c-ml-3",
    attrs: {
      "for": "billing_address_same"
    }
  }, [_vm._v("Same as shipping address")])]), _vm._v(" "), _c('div', {
    staticClass: "c-mt-5 c-w-full c-flex"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.form.billing_same,
      expression: "form.billing_same"
    }],
    staticClass: "c-form-radio",
    attrs: {
      "name": "billing",
      "type": "radio",
      "id": "billing_address_different"
    },
    domProps: {
      "value": false,
      "checked": _vm._q(_vm.form.billing_same, false)
    },
    on: {
      "change": [function ($event) {
        return _vm.$set(_vm.form, "billing_same", false);
      }, function ($event) {
        return _vm.updateBillingSame(false);
      }]
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "c-ml-3",
    attrs: {
      "for": "billing_address_different"
    }
  }, [_vm._v("Use a different billing address")])])]), _vm._v(" "), !_vm.form.billing_same ? _c('div', [_c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "First name",
      "validator": _vm.$v.form.billing_first_name,
      "show-error": _vm.$v.form.billing_first_name.$error,
      "error-message": "First name is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('billing_first_name');
      }
    },
    model: {
      value: _vm.form.billing_first_name,
      callback: function ($$v) {
        _vm.$set(_vm.form, "billing_first_name", $$v);
      },
      expression: "form.billing_first_name"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Last name",
      "validator": _vm.$v.form.billing_last_name,
      "show-error": _vm.$v.form.billing_last_name.$error,
      "error-message": "Last name is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('billing_last_name');
      }
    },
    model: {
      value: _vm.form.billing_last_name,
      callback: function ($$v) {
        _vm.$set(_vm.form, "billing_last_name", $$v);
      },
      expression: "form.billing_last_name"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Street",
      "validator": _vm.$v.form.billing_address_line1,
      "show-error": _vm.$v.form.billing_address_line1.$error,
      "error-message": "Street address is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('billing_address_line1');
      }
    },
    model: {
      value: _vm.form.billing_address_line1,
      callback: function ($$v) {
        _vm.$set(_vm.form, "billing_address_line1", $$v);
      },
      expression: "form.billing_address_line1"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Apartment, suite, etc ...",
      "validator": _vm.$v.form.billing_address_line2,
      "show-error": _vm.$v.form.billing_address_line2.$error,
      "error-message": "Appartment or suite is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('billing_address_line2');
      }
    },
    model: {
      value: _vm.form.billing_address_line2,
      callback: function ($$v) {
        _vm.$set(_vm.form, "billing_address_line2", $$v);
      },
      expression: "form.billing_address_line2"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6 c-flex"
  }, [_c('div', {
    staticClass: "c-w-full"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Zipcode",
      "alert-class": "whitespace-no-wrap",
      "validator": _vm.$v.form.billing_address_zipcode,
      "show-error": _vm.$v.form.billing_address_zipcode.$error,
      "error-message": "Zipcode is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('billing_address_zipcode');
      }
    },
    model: {
      value: _vm.form.billing_address_zipcode,
      callback: function ($$v) {
        _vm.$set(_vm.form, "billing_address_zipcode", $$v);
      },
      expression: "form.billing_address_zipcode"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-w-full c-ml-2"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "City",
      "validator": _vm.$v.form.billing_address_city,
      "show-error": _vm.$v.form.billing_address_city.$error,
      "error-message": "City is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('billing_address_city');
      }
    },
    model: {
      value: _vm.form.billing_address_city,
      callback: function ($$v) {
        _vm.$set(_vm.form, "billing_address_city", $$v);
      },
      expression: "form.billing_address_city"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "c-w-full c-ml-2"
  }, [_c('R64FormSelect', {
    attrs: {
      "label": "State",
      "placeholder": "Select state",
      "options": _vm.settings.states,
      "validator": _vm.$v.form.billing_address_region,
      "show-error": _vm.$v.form.billing_address_region.$error,
      "error-message": "State is required"
    },
    on: {
      "change": function ($event) {
        return _vm.updateCart('billing_address_region');
      }
    },
    model: {
      value: _vm.form.billing_address_region,
      callback: function ($$v) {
        _vm.$set(_vm.form, "billing_address_region", $$v);
      },
      expression: "form.billing_address_region"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "c-mt-6"
  }, [_c('R64FormInput', {
    attrs: {
      "label": "Phone",
      "validator": _vm.$v.form.billing_address_phone,
      "show-error": _vm.$v.form.billing_address_phone.$error,
      "error-message": "Phone is required"
    },
    on: {
      "blur": function ($event) {
        return _vm.updateCart('billing_address_phone');
      }
    },
    model: {
      value: _vm.form.billing_address_phone,
      callback: function ($$v) {
        _vm.$set(_vm.form, "billing_address_phone", $$v);
      },
      expression: "form.billing_address_phone"
    }
  })], 1)]) : _vm._e(), _vm._v(" "), !_vm.hasCouponCode ? _c('div', {
    staticClass: "c-mt-6 lg:c-hidden"
  }, [_c('span', {
    staticClass: "c-block c-text-xl"
  }, [_vm._v("Have a promo code ?")]), _vm._v(" "), _c('R64PromoCode', {
    staticClass: "c-mt-5",
    attrs: {
      "btn-primary": _vm.btnPrimary,
      "btn-secondary": _vm.btnSecondary
    },
    on: {
      "apply": _vm.applyPromoCode
    }
  }), _vm._v(" "), _c('R64Alert', {
    staticClass: "c-mt-2",
    attrs: {
      "visible": _vm.promoCodeErrorVisible,
      "message": "Promo code is not valid"
    }
  })], 1) : _vm._e()], 1)])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "c-pt-12 c-pl-5 c-pr-6 c-pb-8 lg:c-hidden c-border-t c-border-c-gray"
  }, [_vm._t("options"), _vm._v(" "), _c('div', {
    staticClass: "c-flex c-items-start"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.consent,
      expression: "consent"
    }],
    staticClass: "c-form-checkbox",
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.consent) ? _vm._i(_vm.consent, null) > -1 : _vm.consent
    },
    on: {
      "change": function ($event) {
        var $$a = _vm.consent,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.consent = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.consent = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.consent = $$c;
        }
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "c-ml-3 c--mt-1 c-align-top"
  }, [_vm._v("I have read and understood, and accept our "), _c('a', {
    staticClass: "c-hover:underline",
    class: _vm.textPrimary,
    attrs: {
      "href": _vm.tocUrl,
      "target": "_blank"
    }
  }, [_vm._v("Terms and Conditions, Return Policy, and Privacy Policy")]), _vm._v(".")])]), _vm._v(" "), _c('R64Button', {
    staticClass: "c-mt-6 c-w-full",
    attrs: {
      "disabled": !_vm.consent || _vm.busyOrder,
      "btn-primary": _vm.btnPrimary
    },
    nativeOn: {
      "click": function ($event) {
        return _vm.createOrder($event);
      }
    }
  }, [!_vm.busyOrder ? _c('span', [_vm._v("Place Order")]) : _c('span', {
    staticClass: "c-inline-block c-w-full c-text-center"
  }, [_c('span', [_vm._v("Placing Order ... ")]), _vm._v(" "), _c('R64Spinner', {
    staticClass: "c-inline-block"
  })], 1)])], 2)], 1), _vm._v(" "), _c('div', {
    staticClass: "c-hidden c-w-full lg:c-block lg:c-px-8 lg:c-pt-12 xl:c-px-16"
  }, [_vm.cart ? _c('div', {
    staticClass: "lg:c-max-w-sm"
  }, [_vm._l(_vm.cartItems, function (cartItem, index) {
    return _c('R64CartItemPreview', {
      key: index,
      staticClass: "c-mt-4",
      attrs: {
        "cart-item": cartItem,
        "currency-symbol": _vm.currencySymbol
      }
    });
  }), _vm._v(" "), !_vm.hasCouponCode ? _c('div', [_c('R64InlinePromoCode', {
    staticClass: "c-pt-6",
    class: {
      'c-pb-6': !_vm.promoCodeErrorVisible
    },
    attrs: {
      "btn-secondary-transparent": _vm.btnSecondaryTransparent
    },
    on: {
      "apply": _vm.applyPromoCode
    }
  }), _vm._v(" "), _c('R64Alert', {
    staticClass: "c-mt-2 c-mb-4",
    attrs: {
      "visible": _vm.promoCodeErrorVisible,
      "message": "Promo code is not valid"
    }
  }), _vm._v(" "), _c('R64HorizontalLine')], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "c-my-6"
  }, [_c('div', {
    staticClass: "c-flex c-justify-between"
  }, [_c('span', [_vm._v("Subtotal")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.money(_vm.cart.items_subtotal)))])]), _vm._v(" "), _vm.hasCouponCode ? _c('div', {
    staticClass: "c-flex c-justify-between c-mt-4"
  }, [_c('span', [_vm._v("Discount")]), _vm._v(" "), _c('span', [_vm._v("- " + _vm._s(_vm.money(_vm.cart.discount)))])]) : _vm._e(), _vm._v(" "), _vm.hasTax ? _c('div', {
    staticClass: "c-flex c-justify-between c-mt-4"
  }, [_c('span', [_vm._v("Taxes")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.money(_vm.cart.tax)))])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "c-flex c-justify-between c-mt-4"
  }, [_c('span', [_vm._v("Shipping")]), _vm._v(" "), _vm.busyShipping ? _c('span', [_c('R64Spinner')], 1) : _vm.hasShipping ? _c('span', [_vm._v("\n              " + _vm._s(_vm.money(_vm.cart.shipping)) + "\n            ")]) : _c('span', [_vm._v("TBD")])])]), _vm._v(" "), _c('R64HorizontalLine'), _vm._v(" "), _c('div', {
    staticClass: "c-flex c-items-center c-justify-between c-my-6"
  }, [_c('span', {
    staticClass: "c-text-xl c-font-bold"
  }, [_vm._v("Total to Pay")]), _vm._v(" "), _c('span', {
    staticClass: "c-text-4xl"
  }, [_vm.busyShipping || _vm.busyZipCode ? _c('span', [_c('R64Spinner')], 1) : _c('span', [_vm._v(_vm._s(_vm.money(_vm.cart.total)))])])]), _vm._v(" "), _vm._t("lg:options"), _vm._v(" "), _c('div', {
    staticClass: "c-flex c-items-start"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.consent,
      expression: "consent"
    }],
    staticClass: "c-form-checkbox",
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.consent) ? _vm._i(_vm.consent, null) > -1 : _vm.consent
    },
    on: {
      "change": function ($event) {
        var $$a = _vm.consent,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && (_vm.consent = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.consent = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.consent = $$c;
        }
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "c-ml-3 c--mt-1 c-align-top"
  }, [_vm._v("I have read and understood, and accept our "), _c('a', {
    staticClass: "c-hover:underline",
    class: _vm.textPrimary,
    attrs: {
      "href": _vm.tocUrl,
      "target": "_blank"
    }
  }, [_vm._v("Terms and Conditions, Return Policy, and Privacy Policy")]), _vm._v(".")])]), _vm._v(" "), _c('R64Button', {
    staticClass: "c-mt-6",
    attrs: {
      "disabled": !_vm.consent || _vm.busyOrder,
      "btn-primary": _vm.btnPrimary
    },
    nativeOn: {
      "click": function ($event) {
        return _vm.createOrder($event);
      }
    }
  }, [!_vm.busyOrder ? _c('span', [_vm._v("Place Order")]) : _c('span', {
    staticClass: "c-inline-block c-w-full c-text-center"
  }, [_c('span', [_vm._v("Placing Order ... ")]), _vm._v(" "), _c('R64Spinner', {
    staticClass: "c-inline-block"
  })], 1)])], 2) : _vm._e()])]) : _vm._e()]) : _vm._e();
};

var __vue_staticRenderFns__$g = [];
/* style */

const __vue_inject_styles__$g = undefined;
/* scoped */

const __vue_scope_id__$g = undefined;
/* module identifier */

const __vue_module_identifier__$g = undefined;
/* functional template */

const __vue_is_functional_template__$g = false;
/* style inject */

/* style inject SSR */

var R64Checkout = normalizeComponent_1({
  render: __vue_render__$g,
  staticRenderFns: __vue_staticRenderFns__$g
}, __vue_inject_styles__$g, __vue_script__$d, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, undefined, undefined);

/* script */

/* template */
var __vue_render__$h = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "c-px-12 c-pt-8 c-pb-12 c-bg-white"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$h = [];
/* style */

const __vue_inject_styles__$h = undefined;
/* scoped */

const __vue_scope_id__$h = undefined;
/* module identifier */

const __vue_module_identifier__$h = undefined;
/* functional template */

const __vue_is_functional_template__$h = false;
/* style inject */

/* style inject SSR */

var R64OrderSection = normalizeComponent_1({
  render: __vue_render__$h,
  staticRenderFns: __vue_staticRenderFns__$h
}, __vue_inject_styles__$h, {}, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, undefined, undefined);

//
var script$e = {
  mixins: [money, theme],
  props: {
    withShipping: {
      type: Boolean,
      default: false
    },
    withBilling: {
      type: Boolean,
      default: false
    },
    orderToken: {
      type: String,
      default: null
    },
    authToken: {
      type: String,
      default: null
    }
  },
  components: {
    R64CartItemPreview,
    R64OrderSection,
    R64HorizontalLine,
    R64CloseButton
  },

  data() {
    return {
      order: null
    };
  },

  computed: {
    hasCouponCode() {
      return parseFloat(this.order.discount) !== 0;
    },

    hasTax() {
      return parseFloat(this.order.tax) !== 0;
    },

    hasShipping() {
      return parseFloat(this.order.shipping) !== 0;
    }

  },

  mounted() {
    window.scrollTo(0, 0);
    this.fetchOrder();
  },

  methods: {
    async fetchOrder() {
      try {
        const {
          data
        } = await orderApi.get(this.orderToken, this.authToken);
        this.order = data;
        this.$emit('order:get', data);
      } catch (e) {
        this.$emit('close');
      }
    }

  }
};

/* script */
const __vue_script__$e = script$e;
/* template */

var __vue_render__$i = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.order ? _c('div', {
    staticClass: "c-antialiased c-text-c-black c-bg-c-light-gray",
    class: _vm.font
  }, [_c('div', {
    staticClass: "c-max-w-2xl c-min-h-screen c-mx-auto c-py-20"
  }, [_c('R64OrderSection', {
    staticClass: "c-relative"
  }, [_c('R64CloseButton', {
    staticClass: "c-absolute c-right-0 c-top-0 c-pt-8 c-pr-12",
    nativeOn: {
      "click": function ($event) {
        return _vm.$emit('close');
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "c-block"
  }), _vm._v(" "), _c('span', {
    staticClass: "c-block c-text-center c-text-4xl c-font-bold c-text-c-blue"
  }, [_vm._t("logo", [_vm._v("Logo")])], 2), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-10 c-text-4xl c-font-bold"
  }, [_vm._v("Thank you for your order!")]), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-4"
  }, [_vm._t("text")], 2), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-4"
  }, [_vm._v("Order Number: " + _vm._s(_vm.order.order_number))]), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-2"
  }, [_vm._v("Order Date: " + _vm._s(_vm.order.created_at))]), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-2"
  }, [_vm._v("Payment Method: " + _vm._s(_vm.order.order_purchase.card_type) + " ending in " + _vm._s(_vm.order.order_purchase.card_last4))]), _vm._v(" "), _vm.order.customer_notes ? _c('span', {
    staticClass: "c-block c-mt-2"
  }, [_vm._v("Note: " + _vm._s(_vm.order.customer_notes))]) : _vm._e(), _vm._v(" "), _vm._t("delivery-date")], 2), _vm._v(" "), _c('R64OrderSection', {
    staticClass: "c-mt-2"
  }, [_c('span', {
    staticClass: "c-font-bold c-text-xl"
  }, [_vm._v(_vm._s(_vm.order.order_items.length) + " items")]), _vm._v(" "), _c('div', {
    staticClass: "c-mt-8"
  }, _vm._l(_vm.order.order_items, function (orderItem, index) {
    return _c('R64CartItemPreview', {
      key: index,
      staticClass: "c-mt-4",
      attrs: {
        "currency-symbol": _vm.currencySymbol,
        "cart-item": orderItem
      }
    });
  }), 1), _vm._v(" "), _c('div', {
    staticClass: "c-my-6"
  }, [_c('div', {
    staticClass: "c-flex c-justify-between"
  }, [_c('span', [_vm._v("Subtotal")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.money(_vm.order.items_total)))])]), _vm._v(" "), _vm.hasCouponCode ? _c('div', {
    staticClass: "c-flex c-justify-between c-mt-4"
  }, [_c('span', [_vm._v("Discount")]), _vm._v(" "), _c('span', [_vm._v("-" + _vm._s(_vm.money(_vm.order.discount)))])]) : _vm._e(), _vm._v(" "), _vm.hasTax ? _c('div', {
    staticClass: "c-flex c-justify-between c-mt-4"
  }, [_c('span', [_vm._v("Taxes")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.money(_vm.order.tax)))])]) : _vm._e(), _vm._v(" "), _vm.hasShipping ? _c('div', {
    staticClass: "c-flex c-justify-between c-mt-4"
  }, [_c('span', [_vm._v("Shipping")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.money(_vm.order.shipping)))])]) : _vm._e()]), _vm._v(" "), _c('R64HorizontalLine'), _vm._v(" "), _c('div', {
    staticClass: "c-flex c-items-center c-justify-between c-mt-6"
  }, [_c('span', {
    staticClass: "c-text-xl c-font-bold"
  }, [_vm._v("Total")]), _vm._v(" "), _c('span', {
    staticClass: "c-text-xl c-font-bold"
  }, [_vm._v(_vm._s(_vm.money(_vm.order.total)))])])], 1), _vm._v(" "), _vm.withShipping ? _c('R64OrderSection', {
    staticClass: "c-mt-2"
  }, [_c('span', {
    staticClass: "c-font-bold c-text-xl"
  }, [_vm._v("Shipping Details")]), _vm._v(" "), _c('div', {
    staticClass: "c-flex c-mt-4"
  }, [_c('div', {
    staticClass: "c-w-1/2"
  }, [_c('span', {
    staticClass: "c-block c-font-bold"
  }, [_vm._v("Shipping address")]), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-2"
  }, [_vm._v(_vm._s(_vm.order.shipping_address_line1))]), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-1"
  }, [_vm._v(_vm._s(_vm.order.shipping_address_line2))]), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-1"
  }, [_vm._v(_vm._s(_vm.order.shipping_address_city) + ", " + _vm._s(_vm.order.shipping_address_region))]), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-1"
  }, [_vm._v(_vm._s(_vm.order.shipping_address_zipcode))])]), _vm._v(" "), _c('div', {
    staticClass: "c-w-1/2"
  }, [_vm._t("shipping-method")], 2)])]) : _vm._e(), _vm._v(" "), _vm.withBilling ? _c('R64OrderSection', {
    staticClass: "c-mt-2"
  }, [_c('span', {
    staticClass: "c-font-bold c-text-xl"
  }, [_vm._v("Billing Details")]), _vm._v(" "), _c('div', {
    staticClass: "c-flex c-mt-4"
  }, [_c('div', {
    staticClass: "c-w-1/2"
  }, [_c('span', {
    staticClass: "c-block c-mt-2"
  }, [_vm._v(_vm._s(_vm.order.billing_first_name))]), _vm._v(" "), _c('span', {
    staticClass: "c-block c-mt-2"
  }, [_vm._v(_vm._s(_vm.order.billing_last_name))])])])]) : _vm._e()], 1)]) : _vm._e();
};

var __vue_staticRenderFns__$i = [];
/* style */

const __vue_inject_styles__$i = undefined;
/* scoped */

const __vue_scope_id__$i = undefined;
/* module identifier */

const __vue_module_identifier__$i = undefined;
/* functional template */

const __vue_is_functional_template__$i = false;
/* style inject */

/* style inject SSR */

var R64Order = normalizeComponent_1({
  render: __vue_render__$i,
  staticRenderFns: __vue_staticRenderFns__$i
}, __vue_inject_styles__$i, __vue_script__$e, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, undefined, undefined);

var script$f = {
  props: {
    cartToken: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      loading: false,
      hasError: false,
      cart: null
    };
  },

  methods: {
    async addToCart(productId, quantity = 1) {
      try {
        this.loading = true;
        this.hasError = false;

        if (!this.cartToken) {
          const {
            data
          } = await cartApi.create(productId);
          this.cart = data;
        } else {
          const {
            data
          } = await cartItemApi.create(this.cartToken, {
            product_id: productId,
            quantity: quantity
          });
          this.cart = data;
        }
      } catch (e) {
        this.hasError = true;
      }

      this.loading = false;

      if (!this.hasError) {
        this.$emit('cart:update', this.cart);
      }

      return this.cart;
    }

  },

  render() {
    return this.$scopedSlots.default({
      addToCart: this.addToCart,
      loading: this.loading,
      hasError: this.hasError,
      cart: this.cart
    });
  }

};

/* script */
const __vue_script__$f = script$f;
/* template */

/* style */

const __vue_inject_styles__$j = undefined;
/* scoped */

const __vue_scope_id__$j = undefined;
/* module identifier */

const __vue_module_identifier__$j = undefined;
/* functional template */

const __vue_is_functional_template__$j = undefined;
/* style inject */

/* style inject SSR */

var R64AddToCart = normalizeComponent_1({}, __vue_inject_styles__$j, __vue_script__$f, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, undefined, undefined);

var checkoutApi = {
  url: '/api/checkout',

  settings() {
    return http.get(this.url + '/settings');
  }

};

const components = {
  R64Cart,
  R64Checkout,
  R64Order,
  R64AddToCart,
  cartApi,
  cartItemApi,
  orderApi,
  checkoutApi
};

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.keys(components).forEach(component => {
    Vue.component(component);
  });
};

const plugin = {
  install
}; // Auto-install when vue is found

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
export { R64AddToCart, R64Cart, R64Checkout, R64Order, cartApi, cartItemApi, checkoutApi, orderApi };
