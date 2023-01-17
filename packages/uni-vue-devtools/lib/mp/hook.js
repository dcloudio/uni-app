/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../app-backend-core/lib/hook.js":
/*!***************************************!*\
  !*** ../app-backend-core/lib/hook.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

 // this script is injected into every page.

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.installHook = void 0;
/**
 * Install the hook on window, which is an event emitter.
 * Note because Chrome content scripts cannot directly modify the window object,
 * we are evaling this function by inserting a script tag. That's why we have
 * to inline the whole event emitter implementation here.
 *
 * @param {Window|global} target
 */

function installHook(target, isIframe = false) {
  const devtoolsVersion = '6.0';
  let listeners = {};

  function injectIframeHook(iframe) {
    if (iframe.__vdevtools__injected) return;

    try {
      iframe.__vdevtools__injected = true;

      const inject = () => {
        try {
          iframe.contentWindow.__VUE_DEVTOOLS_IFRAME__ = iframe;
          const script = iframe.contentDocument.createElement('script');
          script.textContent = ';(' + installHook.toString() + ')(window, true)';
          iframe.contentDocument.documentElement.appendChild(script);
          script.parentNode.removeChild(script);
        } catch (e) {// Ignore
        }
      };

      inject();
      iframe.addEventListener('load', () => inject());
    } catch (e) {// Ignore
    }
  }

  let iframeChecks = 0;

  function injectToIframes() {
    if (typeof window === 'undefined') return;
    const iframes = document.querySelectorAll('iframe:not([data-vue-devtools-ignore])');

    for (const iframe of iframes) {
      injectIframeHook(iframe);
    }
  }

  injectToIframes();
  const iframeTimer = setInterval(() => {
    injectToIframes();
    iframeChecks++;

    if (iframeChecks >= 5) {
      clearInterval(iframeTimer);
    }
  }, 1000);

  if (Object.prototype.hasOwnProperty.call(target, '__VUE_DEVTOOLS_GLOBAL_HOOK__')) {
    if (target.__VUE_DEVTOOLS_GLOBAL_HOOK__.devtoolsVersion !== devtoolsVersion) {
      console.error(`Another version of Vue Devtools seems to be installed. Please enable only one version at a time.`);
    }

    return;
  }

  let hook;

  if (isIframe) {
    const sendToParent = cb => {
      try {
        const hook = window.parent.__VUE_DEVTOOLS_GLOBAL_HOOK__;

        if (hook) {
          return cb(hook);
        } else {
          console.warn('[Vue Devtools] No hook in parent window');
        }
      } catch (e) {
        console.warn('[Vue Devtools] Failed to send message to parent window', e);
      }
    };

    hook = {
      devtoolsVersion,

      // eslint-disable-next-line accessor-pairs
      set Vue(value) {
        sendToParent(hook => {
          hook.Vue = value;
        });
      },

      // eslint-disable-next-line accessor-pairs
      set enabled(value) {
        sendToParent(hook => {
          hook.enabled = value;
        });
      },

      on(event, fn) {
        sendToParent(hook => hook.on(event, fn));
      },

      once(event, fn) {
        sendToParent(hook => hook.once(event, fn));
      },

      off(event, fn) {
        sendToParent(hook => hook.off(event, fn));
      },

      emit(event, ...args) {
        sendToParent(hook => hook.emit(event, ...args));
      },

      cleanupBuffer(matchArg) {
        var _a;

        return (_a = sendToParent(hook => hook.cleanupBuffer(matchArg))) !== null && _a !== void 0 ? _a : false;
      }

    };
  } else {
    hook = {
      devtoolsVersion,
      Vue: null,
      enabled: undefined,
      _buffer: [],
      store: null,
      initialState: null,
      storeModules: null,
      flushStoreModules: null,
      apps: [],

      _replayBuffer(event) {
        const buffer = this._buffer;
        this._buffer = [];

        for (let i = 0, l = buffer.length; i < l; i++) {
          const allArgs = buffer[i];
          allArgs[0] === event // eslint-disable-next-line prefer-spread
          ? this.emit.apply(this, allArgs) : this._buffer.push(allArgs);
        }
      },

      on(event, fn) {
        const $event = '$' + event;

        if (listeners[$event]) {
          listeners[$event].push(fn);
        } else {
          listeners[$event] = [fn];

          this._replayBuffer(event);
        }
      },

      once(event, fn) {
        const on = (...args) => {
          this.off(event, on);
          return fn.apply(this, args);
        };

        this.on(event, on);
      },

      off(event, fn) {
        event = '$' + event;

        if (!arguments.length) {
          listeners = {};
        } else {
          const cbs = listeners[event];

          if (cbs) {
            if (!fn) {
              listeners[event] = null;
            } else {
              for (let i = 0, l = cbs.length; i < l; i++) {
                const cb = cbs[i];

                if (cb === fn || cb.fn === fn) {
                  cbs.splice(i, 1);
                  break;
                }
              }
            }
          }
        }
      },

      emit(event, ...args) {
        const $event = '$' + event;
        let cbs = listeners[$event];

        if (cbs) {
          cbs = cbs.slice();

          for (let i = 0, l = cbs.length; i < l; i++) {
            try {
              const result = cbs[i].apply(this, args);

              if (typeof (result === null || result === void 0 ? void 0 : result.catch) === 'function') {
                result.catch(e => {
                  console.error(`[Hook] Error in async event handler for ${event} with args:`, args);
                  console.error(e);
                });
              }
            } catch (e) {
              console.error(`[Hook] Error in event handler for ${event} with args:`, args);
              console.error(e);
            }
          }
        } else {
          this._buffer.push([event, ...args]);
        }
      },

      /**
       * Remove buffered events with any argument that is equal to the given value.
       * @param matchArg Given value to match.
       */
      cleanupBuffer(matchArg) {
        let wasBuffered = false;
        this._buffer = this._buffer.filter(item => {
          if (item.some(arg => arg === matchArg)) {
            wasBuffered = true;
            return false;
          }

          return true;
        });
        return wasBuffered;
      }

    };
    hook.once('init', Vue => {
      hook.Vue = Vue;

      if (Vue) {
        Vue.prototype.$inspect = function () {
          const fn = target.__VUE_DEVTOOLS_INSPECT__;
          fn && fn(this);
        };
      }
    });
    hook.on('app:init', (app, version, types) => {
      const appRecord = {
        app,
        version,
        types
      };
      hook.apps.push(appRecord);
      hook.emit('app:add', appRecord);
    });
    hook.once('vuex:init', store => {
      hook.store = store;
      hook.initialState = clone(store.state);
      const origReplaceState = store.replaceState.bind(store);

      store.replaceState = state => {
        hook.initialState = clone(state);
        origReplaceState(state);
      }; // Dynamic modules


      let origRegister, origUnregister;

      if (store.registerModule) {
        hook.storeModules = [];
        origRegister = store.registerModule.bind(store);

        store.registerModule = (path, module, options) => {
          if (typeof path === 'string') path = [path];
          hook.storeModules.push({
            path,
            module,
            options
          });
          origRegister(path, module, options);

          if (true) {
            // eslint-disable-next-line no-console
            console.log('early register module', path, module, options);
          }
        };

        origUnregister = store.unregisterModule.bind(store);

        store.unregisterModule = path => {
          if (typeof path === 'string') path = [path];
          const key = path.join('/');
          const index = hook.storeModules.findIndex(m => m.path.join('/') === key);
          if (index !== -1) hook.storeModules.splice(index, 1);
          origUnregister(path);

          if (true) {
            // eslint-disable-next-line no-console
            console.log('early unregister module', path);
          }
        };
      }

      hook.flushStoreModules = () => {
        store.replaceState = origReplaceState;

        if (store.registerModule) {
          store.registerModule = origRegister;
          store.unregisterModule = origUnregister;
        }

        return hook.storeModules || [];
      };
    });
  }

  if (false) {}

  Object.defineProperty(target, '__VUE_DEVTOOLS_GLOBAL_HOOK__', {
    get() {
      return hook;
    }

  }); // Handle apps initialized before hook injection

  if (target.__VUE_DEVTOOLS_HOOK_REPLAY__) {
    try {
      target.__VUE_DEVTOOLS_HOOK_REPLAY__.forEach(cb => cb(hook));

      target.__VUE_DEVTOOLS_HOOK_REPLAY__ = [];
    } catch (e) {
      console.error('[vue-devtools] Error during hook replay', e);
    }
  } // Clone deep utility for cloning initial state of the store
  // Forked from https://github.com/planttheidea/fast-copy
  // Last update: 2019-10-30
  // ⚠️ Don't forget to update `./hook.js`
  // utils


  const {
    toString: toStringFunction
  } = Function.prototype;
  const {
    create,
    defineProperty,
    getOwnPropertyDescriptor,
    getOwnPropertyNames,
    getOwnPropertySymbols,
    getPrototypeOf
  } = Object;
  const {
    hasOwnProperty,
    propertyIsEnumerable
  } = Object.prototype;
  /**
   * @enum
   *
   * @const {Object} SUPPORTS
   *
   * @property {boolean} SYMBOL_PROPERTIES are symbol properties supported
   * @property {boolean} WEAKSET is WeakSet supported
   */

  const SUPPORTS = {
    SYMBOL_PROPERTIES: typeof getOwnPropertySymbols === 'function',
    WEAKSET: typeof WeakSet === 'function'
  };
  /**
   * @function createCache
   *
   * @description
   * get a new cache object to prevent circular references
   *
   * @returns the new cache object
   */

  const createCache = () => {
    if (SUPPORTS.WEAKSET) {
      return new WeakSet();
    }

    const object = create({
      add: value => object._values.push(value),
      has: value => !!~object._values.indexOf(value)
    });
    object._values = [];
    return object;
  };
  /**
   * @function getCleanClone
   *
   * @description
   * get an empty version of the object with the same prototype it has
   *
   * @param object the object to build a clean clone from
   * @param realm the realm the object resides in
   * @returns the empty cloned object
   */


  const getCleanClone = (object, realm) => {
    if (!object.constructor) {
      return create(null);
    } // eslint-disable-next-line no-proto


    const prototype = object.__proto__ || getPrototypeOf(object);

    if (object.constructor === realm.Object) {
      return prototype === realm.Object.prototype ? {} : create(prototype);
    }

    if (~toStringFunction.call(object.constructor).indexOf('[native code]')) {
      try {
        return new object.constructor();
      } catch (e) {// Error
      }
    }

    return create(prototype);
  };
  /**
   * @function getObjectCloneLoose
   *
   * @description
   * get a copy of the object based on loose rules, meaning all enumerable keys
   * and symbols are copied, but property descriptors are not considered
   *
   * @param object the object to clone
   * @param realm the realm the object resides in
   * @param handleCopy the function that handles copying the object
   * @returns the copied object
   */


  const getObjectCloneLoose = (object, realm, handleCopy, cache) => {
    const clone = getCleanClone(object, realm);

    for (const key in object) {
      if (hasOwnProperty.call(object, key)) {
        clone[key] = handleCopy(object[key], cache);
      }
    }

    if (SUPPORTS.SYMBOL_PROPERTIES) {
      const symbols = getOwnPropertySymbols(object);

      if (symbols.length) {
        for (let index = 0, symbol; index < symbols.length; index++) {
          symbol = symbols[index];

          if (propertyIsEnumerable.call(object, symbol)) {
            clone[symbol] = handleCopy(object[symbol], cache);
          }
        }
      }
    }

    return clone;
  };
  /**
   * @function getObjectCloneStrict
   *
   * @description
   * get a copy of the object based on strict rules, meaning all keys and symbols
   * are copied based on the original property descriptors
   *
   * @param object the object to clone
   * @param realm the realm the object resides in
   * @param handleCopy the function that handles copying the object
   * @returns the copied object
   */


  const getObjectCloneStrict = (object, realm, handleCopy, cache) => {
    const clone = getCleanClone(object, realm);
    const properties = SUPPORTS.SYMBOL_PROPERTIES ? [].concat(getOwnPropertyNames(object), getOwnPropertySymbols(object)) : getOwnPropertyNames(object);

    if (properties.length) {
      for (let index = 0, property, descriptor; index < properties.length; index++) {
        property = properties[index];

        if (property !== 'callee' && property !== 'caller') {
          descriptor = getOwnPropertyDescriptor(object, property);
          descriptor.value = handleCopy(object[property], cache);
          defineProperty(clone, property, descriptor);
        }
      }
    }

    return clone;
  };
  /**
   * @function getRegExpFlags
   *
   * @description
   * get the flags to apply to the copied regexp
   *
   * @param regExp the regexp to get the flags of
   * @returns the flags for the regexp
   */


  const getRegExpFlags = regExp => {
    let flags = '';

    if (regExp.global) {
      flags += 'g';
    }

    if (regExp.ignoreCase) {
      flags += 'i';
    }

    if (regExp.multiline) {
      flags += 'm';
    }

    if (regExp.unicode) {
      flags += 'u';
    }

    if (regExp.sticky) {
      flags += 'y';
    }

    return flags;
  };

  const {
    isArray
  } = Array;

  const GLOBAL_THIS = (() => {
    if (typeof self !== 'undefined') {
      return self;
    }

    if (typeof window !== 'undefined') {
      return window;
    }

    if (typeof __webpack_require__.g !== 'undefined') {
      return __webpack_require__.g;
    }

    if (console && console.error) {
      console.error('Unable to locate global object, returning "this".');
    }
  })();
  /**
   * @function clone
   *
   * @description
   * copy an object deeply as much as possible
   *
   * If `strict` is applied, then all properties (including non-enumerable ones)
   * are copied with their original property descriptors on both objects and arrays.
   *
   * The object is compared to the global constructors in the `realm` provided,
   * and the native constructor is always used to ensure that extensions of native
   * objects (allows in ES2015+) are maintained.
   *
   * @param object the object to copy
   * @param [options] the options for copying with
   * @param [options.isStrict] should the copy be strict
   * @param [options.realm] the realm (this) object the object is copied from
   * @returns the copied object
   */


  function clone(object, options = null) {
    // manually coalesced instead of default parameters for performance
    const isStrict = !!(options && options.isStrict);
    const realm = options && options.realm || GLOBAL_THIS;
    const getObjectClone = isStrict ? getObjectCloneStrict : getObjectCloneLoose;
    /**
     * @function handleCopy
     *
     * @description
     * copy the object recursively based on its type
     *
     * @param object the object to copy
     * @returns the copied object
     */

    const handleCopy = (object, cache) => {
      if (!object || typeof object !== 'object' || cache.has(object)) {
        return object;
      } // DOM objects


      if (typeof HTMLElement !== 'undefined' && object instanceof HTMLElement) {
        return object.cloneNode(false);
      }

      const Constructor = object.constructor; // plain objects

      if (Constructor === realm.Object) {
        cache.add(object);
        return getObjectClone(object, realm, handleCopy, cache);
      }

      let clone; // arrays

      if (isArray(object)) {
        cache.add(object); // if strict, include non-standard properties

        if (isStrict) {
          return getObjectCloneStrict(object, realm, handleCopy, cache);
        }

        clone = new Constructor();

        for (let index = 0; index < object.length; index++) {
          clone[index] = handleCopy(object[index], cache);
        }

        return clone;
      } // dates


      if (object instanceof realm.Date) {
        return new Constructor(object.getTime());
      } // regexps


      if (object instanceof realm.RegExp) {
        clone = new Constructor(object.source, object.flags || getRegExpFlags(object));
        clone.lastIndex = object.lastIndex;
        return clone;
      } // maps


      if (realm.Map && object instanceof realm.Map) {
        cache.add(object);
        clone = new Constructor();
        object.forEach((value, key) => {
          clone.set(key, handleCopy(value, cache));
        });
        return clone;
      } // sets


      if (realm.Set && object instanceof realm.Set) {
        cache.add(object);
        clone = new Constructor();
        object.forEach(value => {
          clone.add(handleCopy(value, cache));
        });
        return clone;
      } // buffers (node-only)


      if (realm.Buffer && realm.Buffer.isBuffer(object)) {
        clone = realm.Buffer.allocUnsafe ? realm.Buffer.allocUnsafe(object.length) : new Constructor(object.length);
        object.copy(clone);
        return clone;
      } // arraybuffers / dataviews


      if (realm.ArrayBuffer) {
        // dataviews
        if (realm.ArrayBuffer.isView(object)) {
          return new Constructor(object.buffer.slice(0));
        } // arraybuffers


        if (object instanceof realm.ArrayBuffer) {
          return object.slice(0);
        }
      } // if the object cannot / should not be cloned, don't


      if ( // promise-like
      hasOwnProperty.call(object, 'then') && typeof object.then === 'function' || // errors
      object instanceof Error || // weakmaps
      realm.WeakMap && object instanceof realm.WeakMap || // weaksets
      realm.WeakSet && object instanceof realm.WeakSet) {
        return object;
      }

      cache.add(object); // assume anything left is a custom constructor

      return getObjectClone(object, realm, handleCopy, cache);
    };

    return handleCopy(object, createCache());
  }
}

exports.installHook = installHook;

/***/ }),

/***/ "../shared-utils/lib/backend.js":
/*!**************************************!*\
  !*** ../shared-utils/lib/backend.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getCatchedGetters = exports.getCustomStoreDetails = exports.getCustomRouterDetails = exports.isVueInstance = exports.getCustomObjectDetails = exports.getCustomInstanceDetails = exports.getInstanceMap = exports.backendInjections = void 0;
exports.backendInjections = {
  instanceMap: new Map(),
  isVueInstance: () => false,
  getCustomInstanceDetails: () => ({}),
  getCustomObjectDetails: () => undefined
};

function getInstanceMap() {
  return exports.backendInjections.instanceMap;
}

exports.getInstanceMap = getInstanceMap;

function getCustomInstanceDetails(instance) {
  return exports.backendInjections.getCustomInstanceDetails(instance);
}

exports.getCustomInstanceDetails = getCustomInstanceDetails;

function getCustomObjectDetails(value, proto) {
  return exports.backendInjections.getCustomObjectDetails(value, proto);
}

exports.getCustomObjectDetails = getCustomObjectDetails;

function isVueInstance(value) {
  return exports.backendInjections.isVueInstance(value);
}

exports.isVueInstance = isVueInstance; // @TODO refactor

function getCustomRouterDetails(router) {
  return {
    _custom: {
      type: 'router',
      display: 'VueRouter',
      value: {
        options: router.options,
        currentRoute: router.currentRoute
      },
      fields: {
        abstract: true
      }
    }
  };
}

exports.getCustomRouterDetails = getCustomRouterDetails; // @TODO refactor

function getCustomStoreDetails(store) {
  return {
    _custom: {
      type: 'store',
      display: 'Store',
      value: {
        state: store.state,
        getters: getCatchedGetters(store)
      },
      fields: {
        abstract: true
      }
    }
  };
}

exports.getCustomStoreDetails = getCustomStoreDetails; // @TODO refactor

function getCatchedGetters(store) {
  const getters = {};
  const origGetters = store.getters || {};
  const keys = Object.keys(origGetters);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    Object.defineProperty(getters, key, {
      enumerable: true,
      get: () => {
        try {
          return origGetters[key];
        } catch (e) {
          return e;
        }
      }
    });
  }

  return getters;
}

exports.getCatchedGetters = getCatchedGetters;

/***/ }),

/***/ "../shared-utils/lib/bridge.js":
/*!*************************************!*\
  !*** ../shared-utils/lib/bridge.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Bridge = void 0;

const events_1 = __webpack_require__(/*! events */ "../../node_modules/events/events.js");

const raf_1 = __webpack_require__(/*! ./raf */ "../shared-utils/lib/raf.js");

const BATCH_DURATION = 100;

class Bridge extends events_1.EventEmitter {
  constructor(wall) {
    super();
    this.setMaxListeners(Infinity);
    this.wall = wall;
    wall.listen(messages => {
      if (Array.isArray(messages)) {
        messages.forEach(message => this._emit(message));
      } else {
        this._emit(messages);
      }
    });
    this._batchingQueue = [];
    this._sendingQueue = [];
    this._receivingQueue = [];
    this._sending = false;
  }

  on(event, listener) {
    const wrappedListener = async (...args) => {
      try {
        await listener(...args);
      } catch (e) {
        console.error(`[Bridge] Error in listener for event ${event.toString()} with args:`, args);
        console.error(e);
      }
    };

    return super.on(event, wrappedListener);
  }

  send(event, payload) {
    this._batchingQueue.push({
      event,
      payload
    });

    if (this._timer == null) {
      this._timer = setTimeout(() => this._flush(), BATCH_DURATION);
    }
  }
  /**
   * Log a message to the devtools background page.
   */


  log(message) {
    this.send('log', message);
  }

  _flush() {
    if (this._batchingQueue.length) this._send(this._batchingQueue);
    clearTimeout(this._timer);
    this._timer = null;
    this._batchingQueue = [];
  } // @TODO types


  _emit(message) {
    if (typeof message === 'string') {
      this.emit(message);
    } else if (message._chunk) {
      this._receivingQueue.push(message._chunk);

      if (message.last) {
        this.emit(message.event, this._receivingQueue);
        this._receivingQueue = [];
      }
    } else if (message.event) {
      this.emit(message.event, message.payload);
    }
  } // @TODO types


  _send(messages) {
    this._sendingQueue.push(messages);

    this._nextSend();
  }

  _nextSend() {
    if (!this._sendingQueue.length || this._sending) return;
    this._sending = true;

    const messages = this._sendingQueue.shift();

    try {
      this.wall.send(messages);
    } catch (err) {
      if (err.message === 'Message length exceeded maximum allowed length.') {
        this._sendingQueue.splice(0, 0, messages.map(message => [message]));
      }
    }

    this._sending = false;
    (0, raf_1.raf)(() => this._nextSend());
  }

}

exports.Bridge = Bridge;

/***/ }),

/***/ "../shared-utils/lib/consts.js":
/*!*************************************!*\
  !*** ../shared-utils/lib/consts.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HookEvents = exports.BridgeSubscriptions = exports.BridgeEvents = exports.BuiltinTabs = void 0;
var BuiltinTabs;

(function (BuiltinTabs) {
  BuiltinTabs["COMPONENTS"] = "components";
  BuiltinTabs["TIMELINE"] = "timeline";
  BuiltinTabs["PLUGINS"] = "plugins";
  BuiltinTabs["SETTINGS"] = "settings";
})(BuiltinTabs = exports.BuiltinTabs || (exports.BuiltinTabs = {}));

var BridgeEvents;

(function (BridgeEvents) {
  // Misc
  BridgeEvents["TO_BACK_SUBSCRIBE"] = "b:subscribe";
  BridgeEvents["TO_BACK_UNSUBSCRIBE"] = "b:unsubscribe";
  /** Backend is ready */

  BridgeEvents["TO_FRONT_READY"] = "f:ready";
  /** Displays the "detected Vue" console log */

  BridgeEvents["TO_BACK_LOG_DETECTED_VUE"] = "b:log-detected-vue";
  /** Force refresh */

  BridgeEvents["TO_BACK_REFRESH"] = "b:refresh";
  /** Tab was switched */

  BridgeEvents["TO_BACK_TAB_SWITCH"] = "b:tab:switch";
  BridgeEvents["TO_BACK_LOG"] = "b:log";
  /** Reconnected after background script is terminated (idle) */

  BridgeEvents["TO_FRONT_RECONNECTED"] = "f:reconnected";
  /** Change app title (electron) */

  BridgeEvents["TO_FRONT_TITLE"] = "f:title"; // Apps

  /** App was registered */

  BridgeEvents["TO_FRONT_APP_ADD"] = "f:app:add";
  /** Get app list */

  BridgeEvents["TO_BACK_APP_LIST"] = "b:app:list";
  BridgeEvents["TO_FRONT_APP_LIST"] = "f:app:list";
  BridgeEvents["TO_FRONT_APP_REMOVE"] = "f:app:remove";
  BridgeEvents["TO_BACK_APP_SELECT"] = "b:app:select";
  BridgeEvents["TO_FRONT_APP_SELECTED"] = "f:app:selected";
  BridgeEvents["TO_BACK_SCAN_LEGACY_APPS"] = "b:app:scan-legacy"; // Components

  BridgeEvents["TO_BACK_COMPONENT_TREE"] = "b:component:tree";
  BridgeEvents["TO_FRONT_COMPONENT_TREE"] = "f:component:tree";
  BridgeEvents["TO_BACK_COMPONENT_SELECTED_DATA"] = "b:component:selected-data";
  BridgeEvents["TO_FRONT_COMPONENT_SELECTED_DATA"] = "f:component:selected-data";
  BridgeEvents["TO_BACK_COMPONENT_EXPAND"] = "b:component:expand";
  BridgeEvents["TO_FRONT_COMPONENT_EXPAND"] = "f:component:expand";
  BridgeEvents["TO_BACK_COMPONENT_SCROLL_TO"] = "b:component:scroll-to";
  BridgeEvents["TO_BACK_COMPONENT_FILTER"] = "b:component:filter";
  BridgeEvents["TO_BACK_COMPONENT_MOUSE_OVER"] = "b:component:mouse-over";
  BridgeEvents["TO_BACK_COMPONENT_MOUSE_OUT"] = "b:component:mouse-out";
  BridgeEvents["TO_BACK_COMPONENT_CONTEXT_MENU_TARGET"] = "b:component:context-menu-target";
  BridgeEvents["TO_BACK_COMPONENT_EDIT_STATE"] = "b:component:edit-state";
  BridgeEvents["TO_BACK_COMPONENT_PICK"] = "b:component:pick";
  BridgeEvents["TO_FRONT_COMPONENT_PICK"] = "f:component:pick";
  BridgeEvents["TO_BACK_COMPONENT_PICK_CANCELED"] = "b:component:pick-canceled";
  BridgeEvents["TO_FRONT_COMPONENT_PICK_CANCELED"] = "f:component:pick-canceled";
  BridgeEvents["TO_BACK_COMPONENT_INSPECT_DOM"] = "b:component:inspect-dom";
  BridgeEvents["TO_FRONT_COMPONENT_INSPECT_DOM"] = "f:component:inspect-dom";
  BridgeEvents["TO_BACK_COMPONENT_RENDER_CODE"] = "b:component:render-code";
  BridgeEvents["TO_FRONT_COMPONENT_RENDER_CODE"] = "f:component:render-code";
  BridgeEvents["TO_FRONT_COMPONENT_UPDATED"] = "f:component:updated"; // Timeline

  BridgeEvents["TO_FRONT_TIMELINE_EVENT"] = "f:timeline:event";
  BridgeEvents["TO_BACK_TIMELINE_LAYER_LIST"] = "b:timeline:layer-list";
  BridgeEvents["TO_FRONT_TIMELINE_LAYER_LIST"] = "f:timeline:layer-list";
  BridgeEvents["TO_FRONT_TIMELINE_LAYER_ADD"] = "f:timeline:layer-add";
  BridgeEvents["TO_BACK_TIMELINE_SHOW_SCREENSHOT"] = "b:timeline:show-screenshot";
  BridgeEvents["TO_BACK_TIMELINE_CLEAR"] = "b:timeline:clear";
  BridgeEvents["TO_BACK_TIMELINE_EVENT_DATA"] = "b:timeline:event-data";
  BridgeEvents["TO_FRONT_TIMELINE_EVENT_DATA"] = "f:timeline:event-data";
  BridgeEvents["TO_BACK_TIMELINE_LAYER_LOAD_EVENTS"] = "b:timeline:layer-load-events";
  BridgeEvents["TO_FRONT_TIMELINE_LAYER_LOAD_EVENTS"] = "f:timeline:layer-load-events";
  BridgeEvents["TO_BACK_TIMELINE_LOAD_MARKERS"] = "b:timeline:load-markers";
  BridgeEvents["TO_FRONT_TIMELINE_LOAD_MARKERS"] = "f:timeline:load-markers";
  BridgeEvents["TO_FRONT_TIMELINE_MARKER"] = "f:timeline:marker"; // Plugins

  BridgeEvents["TO_BACK_DEVTOOLS_PLUGIN_LIST"] = "b:devtools-plugin:list";
  BridgeEvents["TO_FRONT_DEVTOOLS_PLUGIN_LIST"] = "f:devtools-plugin:list";
  BridgeEvents["TO_FRONT_DEVTOOLS_PLUGIN_ADD"] = "f:devtools-plugin:add";
  BridgeEvents["TO_BACK_DEVTOOLS_PLUGIN_SETTING_UPDATED"] = "b:devtools-plugin:setting-updated"; // Custom inspectors

  BridgeEvents["TO_BACK_CUSTOM_INSPECTOR_LIST"] = "b:custom-inspector:list";
  BridgeEvents["TO_FRONT_CUSTOM_INSPECTOR_LIST"] = "f:custom-inspector:list";
  BridgeEvents["TO_FRONT_CUSTOM_INSPECTOR_ADD"] = "f:custom-inspector:add";
  BridgeEvents["TO_BACK_CUSTOM_INSPECTOR_TREE"] = "b:custom-inspector:tree";
  BridgeEvents["TO_FRONT_CUSTOM_INSPECTOR_TREE"] = "f:custom-inspector:tree";
  BridgeEvents["TO_BACK_CUSTOM_INSPECTOR_STATE"] = "b:custom-inspector:state";
  BridgeEvents["TO_FRONT_CUSTOM_INSPECTOR_STATE"] = "f:custom-inspector:state";
  BridgeEvents["TO_BACK_CUSTOM_INSPECTOR_EDIT_STATE"] = "b:custom-inspector:edit-state";
  BridgeEvents["TO_BACK_CUSTOM_INSPECTOR_ACTION"] = "b:custom-inspector:action";
  BridgeEvents["TO_BACK_CUSTOM_INSPECTOR_NODE_ACTION"] = "b:custom-inspector:node-action";
  BridgeEvents["TO_FRONT_CUSTOM_INSPECTOR_SELECT_NODE"] = "f:custom-inspector:select-node"; // Custom state

  BridgeEvents["TO_BACK_CUSTOM_STATE_ACTION"] = "b:custom-state:action";
})(BridgeEvents = exports.BridgeEvents || (exports.BridgeEvents = {}));

var BridgeSubscriptions;

(function (BridgeSubscriptions) {
  BridgeSubscriptions["SELECTED_COMPONENT_DATA"] = "component:selected-data";
  BridgeSubscriptions["COMPONENT_TREE"] = "component:tree";
})(BridgeSubscriptions = exports.BridgeSubscriptions || (exports.BridgeSubscriptions = {}));

var HookEvents;

(function (HookEvents) {
  HookEvents["INIT"] = "init";
  HookEvents["APP_INIT"] = "app:init";
  HookEvents["APP_ADD"] = "app:add";
  HookEvents["APP_UNMOUNT"] = "app:unmount";
  HookEvents["COMPONENT_UPDATED"] = "component:updated";
  HookEvents["COMPONENT_ADDED"] = "component:added";
  HookEvents["COMPONENT_REMOVED"] = "component:removed";
  HookEvents["COMPONENT_EMIT"] = "component:emit";
  HookEvents["COMPONENT_HIGHLIGHT"] = "component:highlight";
  HookEvents["COMPONENT_UNHIGHLIGHT"] = "component:unhighlight";
  HookEvents["SETUP_DEVTOOLS_PLUGIN"] = "devtools-plugin:setup";
  HookEvents["TIMELINE_LAYER_ADDED"] = "timeline:layer-added";
  HookEvents["TIMELINE_EVENT_ADDED"] = "timeline:event-added";
  HookEvents["CUSTOM_INSPECTOR_ADD"] = "custom-inspector:add";
  HookEvents["CUSTOM_INSPECTOR_SEND_TREE"] = "custom-inspector:send-tree";
  HookEvents["CUSTOM_INSPECTOR_SEND_STATE"] = "custom-inspector:send-state";
  HookEvents["CUSTOM_INSPECTOR_SELECT_NODE"] = "custom-inspector:select-node";
  HookEvents["PERFORMANCE_START"] = "perf:start";
  HookEvents["PERFORMANCE_END"] = "perf:end";
  HookEvents["PLUGIN_SETTINGS_SET"] = "plugin:settings:set";
  /**
   * @deprecated
   */

  HookEvents["FLUSH"] = "flush";
  /**
   * @deprecated
   */

  HookEvents["TRACK_UPDATE"] = "_track-update";
  /**
   * @deprecated
   */

  HookEvents["FLASH_UPDATE"] = "_flash-update";
})(HookEvents = exports.HookEvents || (exports.HookEvents = {}));

/***/ }),

/***/ "../shared-utils/lib/edit.js":
/*!***********************************!*\
  !*** ../shared-utils/lib/edit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.StateEditor = void 0;

class StateEditor {
  set(object, path, value, cb = null) {
    const sections = Array.isArray(path) ? path : path.split('.');

    while (sections.length > 1) {
      object = object[sections.shift()];

      if (this.isRef(object)) {
        object = this.getRefValue(object);
      }
    }

    const field = sections[0];

    if (cb) {
      cb(object, field, value);
    } else if (this.isRef(object[field])) {
      this.setRefValue(object[field], value);
    } else {
      object[field] = value;
    }
  }

  get(object, path) {
    const sections = Array.isArray(path) ? path : path.split('.');

    for (let i = 0; i < sections.length; i++) {
      object = object[sections[i]];

      if (this.isRef(object)) {
        object = this.getRefValue(object);
      }

      if (!object) {
        return undefined;
      }
    }

    return object;
  }

  has(object, path, parent = false) {
    if (typeof object === 'undefined') {
      return false;
    }

    const sections = Array.isArray(path) ? path.slice() : path.split('.');
    const size = !parent ? 1 : 2;

    while (object && sections.length > size) {
      object = object[sections.shift()];

      if (this.isRef(object)) {
        object = this.getRefValue(object);
      }
    }

    return object != null && Object.prototype.hasOwnProperty.call(object, sections[0]);
  }

  createDefaultSetCallback(state) {
    return (obj, field, value) => {
      if (state.remove || state.newKey) {
        if (Array.isArray(obj)) {
          obj.splice(field, 1);
        } else {
          delete obj[field];
        }
      }

      if (!state.remove) {
        const target = obj[state.newKey || field];

        if (this.isRef(target)) {
          this.setRefValue(target, value);
        } else {
          obj[state.newKey || field] = value;
        }
      }
    };
  }

  isRef(ref) {
    // To implement in subclass
    return false;
  }

  setRefValue(ref, value) {// To implement in subclass
  }

  getRefValue(ref) {
    // To implement in subclass
    return ref;
  }

}

exports.StateEditor = StateEditor;

/***/ }),

/***/ "../shared-utils/lib/env.js":
/*!**********************************!*\
  !*** ../shared-utils/lib/env.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.initEnv = exports.keys = exports.isLinux = exports.isMac = exports.isWindows = exports.isFirefox = exports.isChrome = exports.target = exports.isBrowser = void 0;
exports.isBrowser = typeof navigator !== 'undefined' && typeof window !== 'undefined';
exports.target = exports.isBrowser ? window : typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof my !== 'undefined' ? my : {};
exports.isChrome = typeof exports.target.chrome !== 'undefined' && !!exports.target.chrome.devtools;
exports.isFirefox = exports.isBrowser && navigator.userAgent && navigator.userAgent.indexOf('Firefox') > -1;
exports.isWindows = exports.isBrowser && navigator.platform.indexOf('Win') === 0;
exports.isMac = exports.isBrowser && navigator.platform === 'MacIntel';
exports.isLinux = exports.isBrowser && navigator.platform.indexOf('Linux') === 0;
exports.keys = {
  ctrl: exports.isMac ? '&#8984;' : 'Ctrl',
  shift: 'Shift',
  alt: exports.isMac ? '&#8997;' : 'Alt',
  del: 'Del',
  enter: 'Enter',
  esc: 'Esc'
};

function initEnv(Vue) {
  if (Vue.prototype.hasOwnProperty('$isChrome')) return;
  Object.defineProperties(Vue.prototype, {
    $isChrome: {
      get: () => exports.isChrome
    },
    $isFirefox: {
      get: () => exports.isFirefox
    },
    $isWindows: {
      get: () => exports.isWindows
    },
    $isMac: {
      get: () => exports.isMac
    },
    $isLinux: {
      get: () => exports.isLinux
    },
    $keys: {
      get: () => exports.keys
    }
  });
  if (exports.isWindows) document.body.classList.add('platform-windows');
  if (exports.isMac) document.body.classList.add('platform-mac');
  if (exports.isLinux) document.body.classList.add('platform-linux');
}

exports.initEnv = initEnv;

/***/ }),

/***/ "../shared-utils/lib/index.js":
/*!************************************!*\
  !*** ../shared-utils/lib/index.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__exportStar(__webpack_require__(/*! ./backend */ "../shared-utils/lib/backend.js"), exports);

__exportStar(__webpack_require__(/*! ./bridge */ "../shared-utils/lib/bridge.js"), exports);

__exportStar(__webpack_require__(/*! ./consts */ "../shared-utils/lib/consts.js"), exports);

__exportStar(__webpack_require__(/*! ./edit */ "../shared-utils/lib/edit.js"), exports);

__exportStar(__webpack_require__(/*! ./env */ "../shared-utils/lib/env.js"), exports);

__exportStar(__webpack_require__(/*! ./plugin-permissions */ "../shared-utils/lib/plugin-permissions.js"), exports);

__exportStar(__webpack_require__(/*! ./plugin-settings */ "../shared-utils/lib/plugin-settings.js"), exports);

__exportStar(__webpack_require__(/*! ./shared-data */ "../shared-utils/lib/shared-data.js"), exports);

__exportStar(__webpack_require__(/*! ./shell */ "../shared-utils/lib/shell.js"), exports);

__exportStar(__webpack_require__(/*! ./storage */ "../shared-utils/lib/storage.js"), exports);

__exportStar(__webpack_require__(/*! ./transfer */ "../shared-utils/lib/transfer.js"), exports);

__exportStar(__webpack_require__(/*! ./util */ "../shared-utils/lib/util.js"), exports);

__exportStar(__webpack_require__(/*! ./raf */ "../shared-utils/lib/raf.js"), exports);

/***/ }),

/***/ "../shared-utils/lib/plugin-permissions.js":
/*!*************************************************!*\
  !*** ../shared-utils/lib/plugin-permissions.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.setPluginPermission = exports.hasPluginPermission = exports.PluginPermission = void 0;

const shared_data_1 = __webpack_require__(/*! ./shared-data */ "../shared-utils/lib/shared-data.js");

var PluginPermission;

(function (PluginPermission) {
  PluginPermission["ENABLED"] = "enabled";
  PluginPermission["COMPONENTS"] = "components";
  PluginPermission["CUSTOM_INSPECTOR"] = "custom-inspector";
  PluginPermission["TIMELINE"] = "timeline";
})(PluginPermission = exports.PluginPermission || (exports.PluginPermission = {}));

function hasPluginPermission(pluginId, permission) {
  const result = shared_data_1.SharedData.pluginPermissions[`${pluginId}:${permission}`];
  if (result == null) return true;
  return !!result;
}

exports.hasPluginPermission = hasPluginPermission;

function setPluginPermission(pluginId, permission, active) {
  shared_data_1.SharedData.pluginPermissions = { ...shared_data_1.SharedData.pluginPermissions,
    [`${pluginId}:${permission}`]: active
  };
}

exports.setPluginPermission = setPluginPermission;

/***/ }),

/***/ "../shared-utils/lib/plugin-settings.js":
/*!**********************************************!*\
  !*** ../shared-utils/lib/plugin-settings.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getPluginDefaultSettings = exports.setPluginSettings = exports.getPluginSettings = void 0;

const shared_data_1 = __webpack_require__(/*! ./shared-data */ "../shared-utils/lib/shared-data.js");

function getPluginSettings(pluginId, defaultSettings) {
  var _a;

  return { ...(defaultSettings !== null && defaultSettings !== void 0 ? defaultSettings : {}),
    ...((_a = shared_data_1.SharedData.pluginSettings[pluginId]) !== null && _a !== void 0 ? _a : {})
  };
}

exports.getPluginSettings = getPluginSettings;

function setPluginSettings(pluginId, settings) {
  shared_data_1.SharedData.pluginSettings = { ...shared_data_1.SharedData.pluginSettings,
    [pluginId]: settings
  };
}

exports.setPluginSettings = setPluginSettings;

function getPluginDefaultSettings(schema) {
  const result = {};

  if (schema) {
    for (const id in schema) {
      const item = schema[id];
      result[id] = item.defaultValue;
    }
  }

  return result;
}

exports.getPluginDefaultSettings = getPluginDefaultSettings;

/***/ }),

/***/ "../shared-utils/lib/raf.js":
/*!**********************************!*\
  !*** ../shared-utils/lib/raf.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.raf = void 0;
let pendingCallbacks = [];
/**
 * requestAnimationFrame that also works on non-browser environments like Node.
 */

exports.raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : typeof setImmediate === 'function' ? fn => {
  if (!pendingCallbacks.length) {
    setImmediate(() => {
      const now = performance.now();
      const cbs = pendingCallbacks; // in case cbs add new callbacks

      pendingCallbacks = [];
      cbs.forEach(cb => cb(now));
    });
  }

  pendingCallbacks.push(fn);
} : function (callback) {
  return setTimeout(function () {
    callback(Date.now());
  }, 1000 / 60);
};

/***/ }),

/***/ "../shared-utils/lib/shared-data.js":
/*!******************************************!*\
  !*** ../shared-utils/lib/shared-data.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SharedData = exports.watchSharedData = exports.destroySharedData = exports.onSharedDataInit = exports.initSharedData = void 0;

const storage_1 = __webpack_require__(/*! ./storage */ "../shared-utils/lib/storage.js");

const env_1 = __webpack_require__(/*! ./env */ "../shared-utils/lib/env.js"); // Initial state


const internalSharedData = {
  openInEditorHost: '/',
  componentNameStyle: 'class',
  theme: 'auto',
  displayDensity: 'low',
  timeFormat: 'default',
  recordVuex: true,
  cacheVuexSnapshotsEvery: 50,
  cacheVuexSnapshotsLimit: 10,
  snapshotLoading: false,
  componentEventsEnabled: true,
  performanceMonitoringEnabled: true,
  editableProps: false,
  logDetected: true,
  vuexNewBackend: false,
  vuexAutoload: false,
  vuexGroupGettersByModule: true,
  showMenuScrollTip: true,
  timelineTimeGrid: true,
  timelineScreenshots: true,
  menuStepScrolling: env_1.isMac,
  pluginPermissions: {},
  pluginSettings: {},
  pageConfig: {},
  legacyApps: false,
  trackUpdates: true,
  flashUpdates: false,
  debugInfo: false,
  isBrowser: env_1.isBrowser
};
const persisted = ['componentNameStyle', 'theme', 'displayDensity', 'recordVuex', 'editableProps', 'logDetected', 'vuexNewBackend', 'vuexAutoload', 'vuexGroupGettersByModule', 'timeFormat', 'showMenuScrollTip', 'timelineTimeGrid', 'timelineScreenshots', 'menuStepScrolling', 'pluginPermissions', 'pluginSettings', 'performanceMonitoringEnabled', 'componentEventsEnabled', 'trackUpdates', 'flashUpdates', 'debugInfo'];
const storageVersion = '6.0.0-alpha.1'; // ---- INTERNALS ---- //

let bridge; // List of fields to persist to storage (disabled if 'false')
// This should be unique to each shared data client to prevent conflicts

let persist = false;
let data;
let initRetryInterval;
let initRetryCount = 0;
const initCbs = [];

function initSharedData(params) {
  return new Promise(resolve => {
    // Mandatory params
    bridge = params.bridge;
    persist = !!params.persist;

    if (persist) {
      if (true) {
        // eslint-disable-next-line no-console
        console.log('[shared data] Master init in progress...');
      } // Load persisted fields


      persisted.forEach(key => {
        const value = (0, storage_1.getStorage)(`vue-devtools-${storageVersion}:shared-data:${key}`);

        if (value !== null) {
          internalSharedData[key] = value;
        }
      });
      bridge.on('shared-data:load', () => {
        // Send all fields
        Object.keys(internalSharedData).forEach(key => {
          sendValue(key, internalSharedData[key]);
        });
        bridge.send('shared-data:load-complete');
      });
      bridge.on('shared-data:init-complete', () => {
        if (true) {
          // eslint-disable-next-line no-console
          console.log('[shared data] Master init complete');
        }

        clearInterval(initRetryInterval);
        resolve();
      });
      bridge.send('shared-data:master-init-waiting'); // In case backend init is executed after frontend

      bridge.on('shared-data:minion-init-waiting', () => {
        bridge.send('shared-data:master-init-waiting');
      });
      initRetryCount = 0;
      clearInterval(initRetryInterval);
      initRetryInterval = setInterval(() => {
        if (true) {
          // eslint-disable-next-line no-console
          console.log('[shared data] Master init retrying...');
        }

        bridge.send('shared-data:master-init-waiting');
        initRetryCount++;

        if (initRetryCount > 30) {
          clearInterval(initRetryInterval);
          console.error('[shared data] Master init failed');
        }
      }, 2000);
    } else {
      if (true) {// eslint-disable-next-line no-console
        // console.log('[shared data] Minion init in progress...')
      }

      bridge.on('shared-data:master-init-waiting', () => {
        if (true) {// eslint-disable-next-line no-console
          // console.log('[shared data] Minion loading data...')
        } // Load all persisted shared data


        bridge.send('shared-data:load');
        bridge.once('shared-data:load-complete', () => {
          if (true) {// eslint-disable-next-line no-console
            // console.log('[shared data] Minion init complete')
          }

          bridge.send('shared-data:init-complete');
          resolve();
        });
      });
      bridge.send('shared-data:minion-init-waiting');
    }

    data = { ...internalSharedData
    };

    if (params.Vue) {
      data = params.Vue.observable(data);
    } // Update value from other shared data clients


    bridge.on('shared-data:set', ({
      key,
      value
    }) => {
      setValue(key, value);
    });
    initCbs.forEach(cb => cb());
  });
}

exports.initSharedData = initSharedData;

function onSharedDataInit(cb) {
  initCbs.push(cb);
  return () => {
    const index = initCbs.indexOf(cb);
    if (index !== -1) initCbs.splice(index, 1);
  };
}

exports.onSharedDataInit = onSharedDataInit;

function destroySharedData() {
  bridge.removeAllListeners('shared-data:set');
  watchers = {};
}

exports.destroySharedData = destroySharedData;
let watchers = {};

function setValue(key, value) {
  // Storage
  if (persist && persisted.includes(key)) {
    (0, storage_1.setStorage)(`vue-devtools-${storageVersion}:shared-data:${key}`, value);
  }

  const oldValue = data[key];
  data[key] = value;
  const handlers = watchers[key];

  if (handlers) {
    handlers.forEach(h => h(value, oldValue));
  } // Validate Proxy set trap


  return true;
}

function sendValue(key, value) {
  bridge && bridge.send('shared-data:set', {
    key,
    value
  });
}

function watchSharedData(prop, handler) {
  const list = watchers[prop] || (watchers[prop] = []);
  list.push(handler);
  return () => {
    const index = list.indexOf(handler);
    if (index !== -1) list.splice(index, 1);
  };
}

exports.watchSharedData = watchSharedData;
const proxy = {};
Object.keys(internalSharedData).forEach(key => {
  Object.defineProperty(proxy, key, {
    configurable: false,
    get: () => data[key],
    set: value => {
      sendValue(key, value);
      setValue(key, value);
    }
  });
});
exports.SharedData = proxy;

/***/ }),

/***/ "../shared-utils/lib/shell.js":
/*!************************************!*\
  !*** ../shared-utils/lib/shell.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "../shared-utils/lib/storage.js":
/*!**************************************!*\
  !*** ../shared-utils/lib/storage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clearStorage = exports.removeStorage = exports.setStorage = exports.getStorage = exports.initStorage = void 0;

const env_1 = __webpack_require__(/*! ./env */ "../shared-utils/lib/env.js"); // If we can, we use the browser extension API to store data
// it's async though, so we synchronize changes from an intermediate
// storageData object


const useStorage = typeof env_1.target.chrome !== 'undefined' && typeof env_1.target.chrome.storage !== 'undefined';
let storageData = null;

function initStorage() {
  return new Promise(resolve => {
    if (useStorage) {
      env_1.target.chrome.storage.local.get(null, result => {
        storageData = result;
        resolve();
      });
    } else {
      storageData = {};
      resolve();
    }
  });
}

exports.initStorage = initStorage;

function getStorage(key, defaultValue = null) {
  checkStorage();

  if (useStorage) {
    return getDefaultValue(storageData[key], defaultValue);
  } else {
    try {
      return getDefaultValue(JSON.parse(localStorage.getItem(key)), defaultValue);
    } catch (e) {}
  }
}

exports.getStorage = getStorage;

function setStorage(key, val) {
  checkStorage();

  if (useStorage) {
    storageData[key] = val;
    env_1.target.chrome.storage.local.set({
      [key]: val
    });
  } else {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }
}

exports.setStorage = setStorage;

function removeStorage(key) {
  checkStorage();

  if (useStorage) {
    delete storageData[key];
    env_1.target.chrome.storage.local.remove([key]);
  } else {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }
}

exports.removeStorage = removeStorage;

function clearStorage() {
  checkStorage();

  if (useStorage) {
    storageData = {};
    env_1.target.chrome.storage.local.clear();
  } else {
    try {
      localStorage.clear();
    } catch (e) {}
  }
}

exports.clearStorage = clearStorage;

function checkStorage() {
  if (!storageData) {
    throw new Error('Storage wasn\'t initialized with \'init()\'');
  }
}

function getDefaultValue(value, defaultValue) {
  if (value == null) {
    return defaultValue;
  }

  return value;
}

/***/ }),

/***/ "../shared-utils/lib/transfer.js":
/*!***************************************!*\
  !*** ../shared-utils/lib/transfer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.stringifyStrictCircularAutoChunks = exports.parseCircularAutoChunks = exports.stringifyCircularAutoChunks = void 0;
const MAX_SERIALIZED_SIZE = 512 * 1024; // 1MB

function encode(data, replacer, list, seen) {
  let stored, key, value, i, l;
  const seenIndex = seen.get(data);

  if (seenIndex != null) {
    return seenIndex;
  }

  const index = list.length;
  const proto = Object.prototype.toString.call(data);

  if (proto === '[object Object]') {
    stored = {};
    seen.set(data, index);
    list.push(stored);
    const keys = Object.keys(data);

    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];

      try {
        value = data[key];
        if (replacer) value = replacer.call(data, key, value);
      } catch (e) {
        value = e;
      }

      stored[key] = encode(value, replacer, list, seen);
    }
  } else if (proto === '[object Array]') {
    stored = [];
    seen.set(data, index);
    list.push(stored);

    for (i = 0, l = data.length; i < l; i++) {
      try {
        value = data[i];
        if (replacer) value = replacer.call(data, i, value);
      } catch (e) {
        value = e;
      }

      stored[i] = encode(value, replacer, list, seen);
    }
  } else {
    list.push(data);
  }

  return index;
}

function decode(list, reviver) {
  let i = list.length;
  let j, k, data, key, value, proto;

  while (i--) {
    data = list[i];
    proto = Object.prototype.toString.call(data);

    if (proto === '[object Object]') {
      const keys = Object.keys(data);

      for (j = 0, k = keys.length; j < k; j++) {
        key = keys[j];
        value = list[data[key]];
        if (reviver) value = reviver.call(data, key, value);
        data[key] = value;
      }
    } else if (proto === '[object Array]') {
      for (j = 0, k = data.length; j < k; j++) {
        value = list[data[j]];
        if (reviver) value = reviver.call(data, j, value);
        data[j] = value;
      }
    }
  }
}

function stringifyCircularAutoChunks(data, replacer = null, space = null) {
  let result;

  try {
    result = arguments.length === 1 ? JSON.stringify(data) // @ts-ignore
    : JSON.stringify(data, replacer, space);
  } catch (e) {
    result = stringifyStrictCircularAutoChunks(data, replacer, space);
  }

  if (result.length > MAX_SERIALIZED_SIZE) {
    const chunkCount = Math.ceil(result.length / MAX_SERIALIZED_SIZE);
    const chunks = [];

    for (let i = 0; i < chunkCount; i++) {
      chunks.push(result.slice(i * MAX_SERIALIZED_SIZE, (i + 1) * MAX_SERIALIZED_SIZE));
    }

    return chunks;
  }

  return result;
}

exports.stringifyCircularAutoChunks = stringifyCircularAutoChunks;

function parseCircularAutoChunks(data, reviver = null) {
  if (Array.isArray(data)) {
    data = data.join('');
  }

  const hasCircular = /^\s/.test(data);

  if (!hasCircular) {
    return arguments.length === 1 ? JSON.parse(data) // @ts-ignore
    : JSON.parse(data, reviver);
  } else {
    const list = JSON.parse(data);
    decode(list, reviver);
    return list[0];
  }
}

exports.parseCircularAutoChunks = parseCircularAutoChunks;

function stringifyStrictCircularAutoChunks(data, replacer = null, space = null) {
  const list = [];
  encode(data, replacer, list, new Map());
  return space ? ' ' + JSON.stringify(list, null, space) : ' ' + JSON.stringify(list);
}

exports.stringifyStrictCircularAutoChunks = stringifyStrictCircularAutoChunks;

/***/ }),

/***/ "../shared-utils/lib/util.js":
/*!***********************************!*\
  !*** ../shared-utils/lib/util.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isEmptyObject = exports.copyToClipboard = exports.escape = exports.openInEditor = exports.focusInput = exports.simpleGet = exports.sortByKey = exports.searchDeepInObject = exports.isPlainObject = exports.revive = exports.parse = exports.getCustomRefDetails = exports.getCustomHTMLElementDetails = exports.getCustomFunctionDetails = exports.getCustomComponentDefinitionDetails = exports.getComponentName = exports.reviveSet = exports.getCustomSetDetails = exports.reviveMap = exports.getCustomMapDetails = exports.stringify = exports.specialTokenToString = exports.MAX_ARRAY_SIZE = exports.MAX_STRING_SIZE = exports.SPECIAL_TOKENS = exports.NAN = exports.NEGATIVE_INFINITY = exports.INFINITY = exports.UNDEFINED = exports.inDoc = exports.getComponentDisplayName = exports.kebabize = exports.camelize = exports.classify = void 0;

const path_1 = __importDefault(__webpack_require__(/*! path */ "../../node_modules/path-browserify/index.js"));

const transfer_1 = __webpack_require__(/*! ./transfer */ "../shared-utils/lib/transfer.js");

const backend_1 = __webpack_require__(/*! ./backend */ "../shared-utils/lib/backend.js");

const shared_data_1 = __webpack_require__(/*! ./shared-data */ "../shared-utils/lib/shared-data.js");

const env_1 = __webpack_require__(/*! ./env */ "../shared-utils/lib/env.js");

function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

const classifyRE = /(?:^|[-_/])(\w)/g;
exports.classify = cached(str => {
  // fix: str.replace may causes '"replace" is not a function' exception.
  // This bug may causes the UI 'Component Filter' to not work properly
  // e.g. The type of 'str' is Number.
  // So need cover 'str' to String.
  return str && ('' + str).replace(classifyRE, toUpper);
});
const camelizeRE = /-(\w)/g;
exports.camelize = cached(str => {
  return str && str.replace(camelizeRE, toUpper);
});
const kebabizeRE = /([a-z0-9])([A-Z])/g;
exports.kebabize = cached(str => {
  return str && str.replace(kebabizeRE, (_, lowerCaseCharacter, upperCaseLetter) => {
    return `${lowerCaseCharacter}-${upperCaseLetter}`;
  }).toLowerCase();
});

function toUpper(_, c) {
  return c ? c.toUpperCase() : '';
}

function getComponentDisplayName(originalName, style = 'class') {
  switch (style) {
    case 'class':
      return (0, exports.classify)(originalName);

    case 'kebab':
      return (0, exports.kebabize)(originalName);

    case 'original':
    default:
      return originalName;
  }
}

exports.getComponentDisplayName = getComponentDisplayName;

function inDoc(node) {
  if (!node) return false;
  const doc = node.ownerDocument.documentElement;
  const parent = node.parentNode;
  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
}

exports.inDoc = inDoc;
/**
 * Stringify/parse data using CircularJSON.
 */

exports.UNDEFINED = '__vue_devtool_undefined__';
exports.INFINITY = '__vue_devtool_infinity__';
exports.NEGATIVE_INFINITY = '__vue_devtool_negative_infinity__';
exports.NAN = '__vue_devtool_nan__';
exports.SPECIAL_TOKENS = {
  true: true,
  false: false,
  undefined: exports.UNDEFINED,
  null: null,
  '-Infinity': exports.NEGATIVE_INFINITY,
  Infinity: exports.INFINITY,
  NaN: exports.NAN
};
exports.MAX_STRING_SIZE = 10000;
exports.MAX_ARRAY_SIZE = 5000;

function specialTokenToString(value) {
  if (value === null) {
    return 'null';
  } else if (value === exports.UNDEFINED) {
    return 'undefined';
  } else if (value === exports.NAN) {
    return 'NaN';
  } else if (value === exports.INFINITY) {
    return 'Infinity';
  } else if (value === exports.NEGATIVE_INFINITY) {
    return '-Infinity';
  }

  return false;
}

exports.specialTokenToString = specialTokenToString;
/**
 * Needed to prevent stack overflow
 * while replacing complex objects
 * like components because we create
 * new objects with the CustomValue API
 * (.i.e `{ _custom: { ... } }`)
 */

class EncodeCache {
  constructor() {
    this.map = new Map();
  }
  /**
   * Returns a result unique to each input data
   * @param {*} data Input data
   * @param {*} factory Function used to create the unique result
   */


  cache(data, factory) {
    const cached = this.map.get(data);

    if (cached) {
      return cached;
    } else {
      const result = factory(data);
      this.map.set(data, result);
      return result;
    }
  }

  clear() {
    this.map.clear();
  }

}

const encodeCache = new EncodeCache();

class ReviveCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.map = new Map();
    this.index = 0;
    this.size = 0;
  }

  cache(value) {
    const currentIndex = this.index;
    this.map.set(currentIndex, value);
    this.size++;

    if (this.size > this.maxSize) {
      this.map.delete(currentIndex - this.size);
      this.size--;
    }

    this.index++;
    return currentIndex;
  }

  read(id) {
    return this.map.get(id);
  }

}

const reviveCache = new ReviveCache(1000);
const replacers = {
  internal: replacerForInternal,
  user: replaceForUser
};

function stringify(data, target = 'internal') {
  // Create a fresh cache for each serialization
  encodeCache.clear();
  return (0, transfer_1.stringifyCircularAutoChunks)(data, replacers[target]);
}

exports.stringify = stringify;

function replacerForInternal(key) {
  var _a; // @ts-ignore


  const val = this[key];
  const type = typeof val;

  if (Array.isArray(val)) {
    const l = val.length;

    if (l > exports.MAX_ARRAY_SIZE) {
      return {
        _isArray: true,
        length: l,
        items: val.slice(0, exports.MAX_ARRAY_SIZE)
      };
    }

    return val;
  } else if (typeof val === 'string') {
    if (val.length > exports.MAX_STRING_SIZE) {
      return val.substring(0, exports.MAX_STRING_SIZE) + `... (${val.length} total length)`;
    } else {
      return val;
    }
  } else if (type === 'undefined') {
    return exports.UNDEFINED;
  } else if (val === Infinity) {
    return exports.INFINITY;
  } else if (val === -Infinity) {
    return exports.NEGATIVE_INFINITY;
  } else if (type === 'function') {
    return getCustomFunctionDetails(val);
  } else if (type === 'symbol') {
    return `[native Symbol ${Symbol.prototype.toString.call(val)}]`;
  } else if (val !== null && type === 'object') {
    const proto = Object.prototype.toString.call(val);

    if (proto === '[object Map]') {
      return encodeCache.cache(val, () => getCustomMapDetails(val));
    } else if (proto === '[object Set]') {
      return encodeCache.cache(val, () => getCustomSetDetails(val));
    } else if (proto === '[object RegExp]') {
      // special handling of native type
      return `[native RegExp ${RegExp.prototype.toString.call(val)}]`;
    } else if (proto === '[object Date]') {
      return `[native Date ${Date.prototype.toString.call(val)}]`;
    } else if (proto === '[object Error]') {
      return `[native Error ${val.message}<>${val.stack}]`;
    } else if (val.state && val._vm) {
      return encodeCache.cache(val, () => (0, backend_1.getCustomStoreDetails)(val));
    } else if (val.constructor && val.constructor.name === 'VueRouter') {
      return encodeCache.cache(val, () => (0, backend_1.getCustomRouterDetails)(val));
    } else if ((0, backend_1.isVueInstance)(val)) {
      return encodeCache.cache(val, () => (0, backend_1.getCustomInstanceDetails)(val));
    } else if (typeof val.render === 'function') {
      return encodeCache.cache(val, () => getCustomComponentDefinitionDetails(val));
    } else if (val.constructor && val.constructor.name === 'VNode') {
      return `[native VNode <${val.tag}>]`;
    } else if (typeof HTMLElement !== 'undefined' && val instanceof HTMLElement) {
      return encodeCache.cache(val, () => getCustomHTMLElementDetails(val));
    } else if (((_a = val.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'Store' && val._wrappedGetters) {
      return `[object Store]`;
    } else if (val.currentRoute) {
      return `[object Router]`;
    }

    const customDetails = (0, backend_1.getCustomObjectDetails)(val, proto);
    if (customDetails != null) return customDetails;
  } else if (Number.isNaN(val)) {
    return exports.NAN;
  }

  return sanitize(val);
} // @TODO revive from backend to have more data to the clipboard


function replaceForUser(key) {
  // @ts-ignore
  let val = this[key];
  const type = typeof val;

  if ((val === null || val === void 0 ? void 0 : val._custom) && 'value' in val._custom) {
    val = val._custom.value;
  }

  if (type !== 'object') {
    if (val === exports.UNDEFINED) {
      return undefined;
    } else if (val === exports.INFINITY) {
      return Infinity;
    } else if (val === exports.NEGATIVE_INFINITY) {
      return -Infinity;
    } else if (val === exports.NAN) {
      return NaN;
    }

    return val;
  }

  return sanitize(val);
}

function getCustomMapDetails(val) {
  const list = [];
  val.forEach((value, key) => list.push({
    key,
    value
  }));
  return {
    _custom: {
      type: 'map',
      display: 'Map',
      value: list,
      readOnly: true,
      fields: {
        abstract: true
      }
    }
  };
}

exports.getCustomMapDetails = getCustomMapDetails;

function reviveMap(val) {
  const result = new Map();
  const list = val._custom.value;

  for (let i = 0; i < list.length; i++) {
    const {
      key,
      value
    } = list[i];
    result.set(key, revive(value));
  }

  return result;
}

exports.reviveMap = reviveMap;

function getCustomSetDetails(val) {
  const list = Array.from(val);
  return {
    _custom: {
      type: 'set',
      display: `Set[${list.length}]`,
      value: list,
      readOnly: true
    }
  };
}

exports.getCustomSetDetails = getCustomSetDetails;

function reviveSet(val) {
  const result = new Set();
  const list = val._custom.value;

  for (let i = 0; i < list.length; i++) {
    const value = list[i];
    result.add(revive(value));
  }

  return result;
}

exports.reviveSet = reviveSet; // Use a custom basename functions instead of the shimed version
// because it doesn't work on Windows

function basename(filename, ext) {
  return path_1.default.basename(filename.replace(/^[a-zA-Z]:/, '').replace(/\\/g, '/'), ext);
}

function getComponentName(options) {
  const name = options.displayName || options.name || options._componentTag;

  if (name) {
    return name;
  }

  const file = options.__file; // injected by vue-loader

  if (file) {
    return (0, exports.classify)(basename(file, '.vue'));
  }
}

exports.getComponentName = getComponentName;

function getCustomComponentDefinitionDetails(def) {
  let display = getComponentName(def);

  if (display) {
    if (def.name && def.__file) {
      display += ` <span>(${def.__file})</span>`;
    }
  } else {
    display = '<i>Unknown Component</i>';
  }

  return {
    _custom: {
      type: 'component-definition',
      display,
      tooltip: 'Component definition',
      ...(def.__file ? {
        file: def.__file
      } : {})
    }
  };
}

exports.getCustomComponentDefinitionDetails = getCustomComponentDefinitionDetails; // eslint-disable-next-line @typescript-eslint/ban-types

function getCustomFunctionDetails(func) {
  let string = '';
  let matches = null;

  try {
    string = Function.prototype.toString.call(func);
    matches = String.prototype.match.call(string, /\([\s\S]*?\)/);
  } catch (e) {// Func is probably a Proxy, which can break Function.prototype.toString()
  } // Trim any excess whitespace from the argument string


  const match = matches && matches[0];
  const args = typeof match === 'string' ? match : '(?)';
  const name = typeof func.name === 'string' ? func.name : '';
  return {
    _custom: {
      type: 'function',
      display: `<span style="opacity:.5;">function</span> ${escape(name)}${args}`,
      tooltip: string.trim() ? `<pre>${string}</pre>` : null,
      _reviveId: reviveCache.cache(func)
    }
  };
}

exports.getCustomFunctionDetails = getCustomFunctionDetails;

function getCustomHTMLElementDetails(value) {
  try {
    return {
      _custom: {
        type: 'HTMLElement',
        display: `<span class="opacity-30">&lt;</span><span class="text-blue-500">${value.tagName.toLowerCase()}</span><span class="opacity-30">&gt;</span>`,
        value: namedNodeMapToObject(value.attributes),
        actions: [{
          icon: 'input',
          tooltip: 'Log element to console',
          action: () => {
            // eslint-disable-next-line no-console
            console.log(value);
          }
        }]
      }
    };
  } catch (e) {
    return {
      _custom: {
        type: 'HTMLElement',
        display: `<span class="text-blue-500">${String(value)}</span>`
      }
    };
  }
}

exports.getCustomHTMLElementDetails = getCustomHTMLElementDetails;

function namedNodeMapToObject(map) {
  const result = {};
  const l = map.length;

  for (let i = 0; i < l; i++) {
    const node = map.item(i);
    result[node.name] = node.value;
  }

  return result;
}

function getCustomRefDetails(instance, key, ref) {
  let value;

  if (Array.isArray(ref)) {
    value = ref.map(r => getCustomRefDetails(instance, key, r)).map(data => data.value);
  } else {
    let name;

    if (ref._isVue) {
      name = getComponentName(ref.$options);
    } else {
      name = ref.tagName.toLowerCase();
    }

    value = {
      _custom: {
        display: `&lt;${name}` + (ref.id ? ` <span class="attr-title">id</span>="${ref.id}"` : '') + (ref.className ? ` <span class="attr-title">class</span>="${ref.className}"` : '') + '&gt;',
        uid: instance.__VUE_DEVTOOLS_UID__,
        type: 'reference'
      }
    };
  }

  return {
    type: '$refs',
    key: key,
    value,
    editable: false
  };
}

exports.getCustomRefDetails = getCustomRefDetails;

function parse(data, revive = false) {
  return revive ? (0, transfer_1.parseCircularAutoChunks)(data, reviver) : (0, transfer_1.parseCircularAutoChunks)(data);
}

exports.parse = parse;
const specialTypeRE = /^\[native (\w+) (.*?)(<>((.|\s)*))?\]$/;
const symbolRE = /^\[native Symbol Symbol\((.*)\)\]$/;

function reviver(key, val) {
  return revive(val);
}

function revive(val) {
  if (val === exports.UNDEFINED) {
    return undefined;
  } else if (val === exports.INFINITY) {
    return Infinity;
  } else if (val === exports.NEGATIVE_INFINITY) {
    return -Infinity;
  } else if (val === exports.NAN) {
    return NaN;
  } else if (val && val._custom) {
    const {
      _custom: custom
    } = val;

    if (custom.type === 'component') {
      return (0, backend_1.getInstanceMap)().get(custom.id);
    } else if (custom.type === 'map') {
      return reviveMap(val);
    } else if (custom.type === 'set') {
      return reviveSet(val);
    } else if (custom._reviveId) {
      return reviveCache.read(custom._reviveId);
    } else {
      return revive(custom.value);
    }
  } else if (symbolRE.test(val)) {
    const [, string] = symbolRE.exec(val);
    return Symbol.for(string);
  } else if (specialTypeRE.test(val)) {
    const [, type, string,, details] = specialTypeRE.exec(val);
    const result = new env_1.target[type](string);

    if (type === 'Error' && details) {
      result.stack = details;
    }

    return result;
  } else {
    return val;
  }
}

exports.revive = revive;
/**
 * Sanitize data to be posted to the other side.
 * Since the message posted is sent with structured clone,
 * we need to filter out any types that might cause an error.
 *
 * @param {*} data
 * @return {*}
 */

function sanitize(data) {
  if (!isPrimitive(data) && !Array.isArray(data) && !isPlainObject(data)) {
    // handle types that will probably cause issues in
    // the structured clone
    return Object.prototype.toString.call(data);
  } else {
    return data;
  }
}

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

exports.isPlainObject = isPlainObject;

function isPrimitive(data) {
  if (data == null) {
    return true;
  }

  const type = typeof data;
  return type === 'string' || type === 'number' || type === 'boolean';
}
/**
 * Searches a key or value in the object, with a maximum deepness
 * @param {*} obj Search target
 * @param {string} searchTerm Search string
 * @returns {boolean} Search match
 */


function searchDeepInObject(obj, searchTerm) {
  const seen = new Map();
  const result = internalSearchObject(obj, searchTerm.toLowerCase(), seen, 0);
  seen.clear();
  return result;
}

exports.searchDeepInObject = searchDeepInObject;
const SEARCH_MAX_DEPTH = 10;
/**
 * Executes a search on each field of the provided object
 * @param {*} obj Search target
 * @param {string} searchTerm Search string
 * @param {Map<any,boolean>} seen Map containing the search result to prevent stack overflow by walking on the same object multiple times
 * @param {number} depth Deep search depth level, which is capped to prevent performance issues
 * @returns {boolean} Search match
 */

function internalSearchObject(obj, searchTerm, seen, depth) {
  if (depth > SEARCH_MAX_DEPTH) {
    return false;
  }

  let match = false;
  const keys = Object.keys(obj);
  let key, value;

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    value = obj[key];
    match = internalSearchCheck(searchTerm, key, value, seen, depth + 1);

    if (match) {
      break;
    }
  }

  return match;
}
/**
 * Executes a search on each value of the provided array
 * @param {*} array Search target
 * @param {string} searchTerm Search string
 * @param {Map<any,boolean>} seen Map containing the search result to prevent stack overflow by walking on the same object multiple times
 * @param {number} depth Deep search depth level, which is capped to prevent performance issues
 * @returns {boolean} Search match
 */


function internalSearchArray(array, searchTerm, seen, depth) {
  if (depth > SEARCH_MAX_DEPTH) {
    return false;
  }

  let match = false;
  let value;

  for (let i = 0; i < array.length; i++) {
    value = array[i];
    match = internalSearchCheck(searchTerm, null, value, seen, depth + 1);

    if (match) {
      break;
    }
  }

  return match;
}
/**
 * Checks if the provided field matches the search terms
 * @param {string} searchTerm Search string
 * @param {string} key Field key (null if from array)
 * @param {*} value Field value
 * @param {Map<any,boolean>} seen Map containing the search result to prevent stack overflow by walking on the same object multiple times
 * @param {number} depth Deep search depth level, which is capped to prevent performance issues
 * @returns {boolean} Search match
 */


function internalSearchCheck(searchTerm, key, value, seen, depth) {
  let match = false;
  let result;

  if (key === '_custom') {
    key = value.display;
    value = value.value;
  }

  (result = specialTokenToString(value)) && (value = result);

  if (key && compare(key, searchTerm)) {
    match = true;
    seen.set(value, true);
  } else if (seen.has(value)) {
    match = seen.get(value);
  } else if (Array.isArray(value)) {
    seen.set(value, null);
    match = internalSearchArray(value, searchTerm, seen, depth);
    seen.set(value, match);
  } else if (isPlainObject(value)) {
    seen.set(value, null);
    match = internalSearchObject(value, searchTerm, seen, depth);
    seen.set(value, match);
  } else if (compare(value, searchTerm)) {
    match = true;
    seen.set(value, true);
  }

  return match;
}
/**
 * Compares two values
 * @param {*} value Mixed type value that will be cast to string
 * @param {string} searchTerm Search string
 * @returns {boolean} Search match
 */


function compare(value, searchTerm) {
  return ('' + value).toLowerCase().indexOf(searchTerm) !== -1;
}

function sortByKey(state) {
  return state && state.slice().sort((a, b) => {
    if (a.key < b.key) return -1;
    if (a.key > b.key) return 1;
    return 0;
  });
}

exports.sortByKey = sortByKey;

function simpleGet(object, path) {
  const sections = Array.isArray(path) ? path : path.split('.');

  for (let i = 0; i < sections.length; i++) {
    object = object[sections[i]];

    if (!object) {
      return undefined;
    }
  }

  return object;
}

exports.simpleGet = simpleGet;

function focusInput(el) {
  el.focus();
  el.setSelectionRange(0, el.value.length);
}

exports.focusInput = focusInput;

function openInEditor(file) {
  // Console display
  const fileName = file.replace(/\\/g, '\\\\');
  const src = `fetch('${shared_data_1.SharedData.openInEditorHost}__open-in-editor?file=${encodeURI(file)}').then(response => {
    if (response.ok) {
      console.log('File ${fileName} opened in editor')
    } else {
      const msg = 'Opening component ${fileName} failed'
      const target = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {}
      if (target.__VUE_DEVTOOLS_TOAST__) {
        target.__VUE_DEVTOOLS_TOAST__(msg, 'error')
      } else {
        console.log('%c' + msg, 'color:red')
      }
      console.log('Check the setup of your project, see https://devtools.vuejs.org/guide/open-in-editor.html')
    }
  })`;

  if (env_1.isChrome) {
    env_1.target.chrome.devtools.inspectedWindow.eval(src);
  } else {
    // eslint-disable-next-line no-eval
    [eval][0](src);
  }
}

exports.openInEditor = openInEditor;
const ESC = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '&': '&amp;'
};

function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}

exports.escape = escape;

function escapeChar(a) {
  return ESC[a] || a;
}

function copyToClipboard(state) {
  let text;

  if (typeof state !== 'object') {
    text = String(state);
  } else {
    text = stringify(state, 'user');
  } // @TODO navigator.clipboard is buggy in extensions


  if (typeof document === 'undefined') return;
  const dummyTextArea = document.createElement('textarea');
  dummyTextArea.textContent = text;
  document.body.appendChild(dummyTextArea);
  dummyTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(dummyTextArea);
}

exports.copyToClipboard = copyToClipboard;

function isEmptyObject(obj) {
  return obj === exports.UNDEFINED || !obj || Object.keys(obj).length === 0;
}

exports.isEmptyObject = isEmptyObject;

/***/ }),

/***/ "../../node_modules/events/events.js":
/*!*******************************************!*\
  !*** ../../node_modules/events/events.js ***!
  \*******************************************/
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "../../node_modules/path-browserify/index.js":
/*!***************************************************!*\
  !*** ../../node_modules/path-browserify/index.js ***!
  \***************************************************/
/***/ ((module) => {

// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/hook.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _back_hook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @back/hook */ "../app-backend-core/lib/hook.js");
/* harmony import */ var _vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");
/* harmony import */ var _vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__);



(0,_back_hook__WEBPACK_IMPORTED_MODULE_0__.installHook)(_vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__.target);

})();

/******/ })()
;