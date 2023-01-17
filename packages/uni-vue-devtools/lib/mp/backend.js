/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../api/lib/esm/const.js":
/*!*******************************!*\
  !*** ../api/lib/esm/const.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HOOK_PLUGIN_SETTINGS_SET": () => (/* binding */ HOOK_PLUGIN_SETTINGS_SET),
/* harmony export */   "HOOK_SETUP": () => (/* binding */ HOOK_SETUP)
/* harmony export */ });
const HOOK_SETUP = 'devtools-plugin:setup';
const HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set';

/***/ }),

/***/ "../api/lib/esm/env.js":
/*!*****************************!*\
  !*** ../api/lib/esm/env.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDevtoolsGlobalHook": () => (/* binding */ getDevtoolsGlobalHook),
/* harmony export */   "getTarget": () => (/* binding */ getTarget),
/* harmony export */   "isProxyAvailable": () => (/* binding */ isProxyAvailable)
/* harmony export */ });
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  // @ts-ignore
  return typeof navigator !== 'undefined' && typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof my !== 'undefined' ? my : {};
}
const isProxyAvailable = typeof Proxy === 'function';

/***/ }),

/***/ "../api/lib/esm/index.js":
/*!*******************************!*\
  !*** ../api/lib/esm/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPerformanceSupported": () => (/* reexport safe */ _time_js__WEBPACK_IMPORTED_MODULE_0__.isPerformanceSupported),
/* harmony export */   "now": () => (/* reexport safe */ _time_js__WEBPACK_IMPORTED_MODULE_0__.now),
/* harmony export */   "setupDevtoolsPlugin": () => (/* binding */ setupDevtoolsPlugin)
/* harmony export */ });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./env.js */ "../api/lib/esm/env.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./const.js */ "../api/lib/esm/const.js");
/* harmony import */ var _proxy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./proxy.js */ "../api/lib/esm/proxy.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time.js */ "../api/lib/esm/time.js");






function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = (0,_env_js__WEBPACK_IMPORTED_MODULE_1__.getTarget)();
  const hook = (0,_env_js__WEBPACK_IMPORTED_MODULE_1__.getDevtoolsGlobalHook)();
  const enableProxy = _env_js__WEBPACK_IMPORTED_MODULE_1__.isProxyAvailable && descriptor.enableEarlyProxy;

  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(_const_js__WEBPACK_IMPORTED_MODULE_2__.HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new _proxy_js__WEBPACK_IMPORTED_MODULE_3__.ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy) setupFn(proxy.proxiedTarget);
  }
}

/***/ }),

/***/ "../api/lib/esm/proxy.js":
/*!*******************************!*\
  !*** ../api/lib/esm/proxy.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiProxy": () => (/* binding */ ApiProxy)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const.js */ "../api/lib/esm/const.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time.js */ "../api/lib/esm/time.js");


class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};

    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }

    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);

    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e) {// noop
    }

    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },

      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e) {// noop
        }

        currentSettings = value;
      },

      now() {
        return (0,_time_js__WEBPACK_IMPORTED_MODULE_0__.now)();
      }

    };

    if (hook) {
      hook.on(_const_js__WEBPACK_IMPORTED_MODULE_1__.HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }

    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === 'on') {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {}
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise(resolve => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve
              });
            });
          };
        }
      }
    });
  }

  async setRealTarget(target) {
    this.target = target;

    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }

    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }

}

/***/ }),

/***/ "../api/lib/esm/time.js":
/*!******************************!*\
  !*** ../api/lib/esm/time.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPerformanceSupported": () => (/* binding */ isPerformanceSupported),
/* harmony export */   "now": () => (/* binding */ now)
/* harmony export */ });
let supported;
let perf;
function isPerformanceSupported() {
  var _a;

  if (supported !== undefined) {
    return supported;
  }

  if (typeof window !== 'undefined' && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof __webpack_require__.g !== 'undefined' && ((_a = __webpack_require__.g.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
    supported = true;
    perf = __webpack_require__.g.perf_hooks.performance;
  } else {
    supported = false;
  }

  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}

/***/ }),

/***/ "../app-backend-api/lib/api.js":
/*!*************************************!*\
  !*** ../app-backend-api/lib/api.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DevtoolsPluginApiInstance = exports.DevtoolsApi = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const devtools_api_1 = __webpack_require__(/*! @vue/devtools-api */ "../api/lib/esm/index.js");

const hooks_1 = __webpack_require__(/*! ./hooks */ "../app-backend-api/lib/hooks.js");

const pluginOn = [];

class DevtoolsApi {
  constructor(backend, ctx) {
    this.stateEditor = new shared_utils_1.StateEditor();
    this.backend = backend;
    this.ctx = ctx;
    this.bridge = ctx.bridge;
    this.on = new hooks_1.DevtoolsHookable(ctx);
  }

  async callHook(eventType, payload, ctx = this.ctx) {
    payload = await this.on.callHandlers(eventType, payload, ctx);

    for (const on of pluginOn) {
      payload = await on.callHandlers(eventType, payload, ctx);
    }

    return payload;
  }

  async transformCall(callName, ...args) {
    const payload = await this.callHook("transformCall"
    /* Hooks.TRANSFORM_CALL */
    , {
      callName,
      inArgs: args,
      outArgs: args.slice()
    });
    return payload.outArgs;
  }

  async getAppRecordName(app, defaultName) {
    const payload = await this.callHook("getAppRecordName"
    /* Hooks.GET_APP_RECORD_NAME */
    , {
      app,
      name: null
    });

    if (payload.name) {
      return payload.name;
    } else {
      return `App ${defaultName}`;
    }
  }

  async getAppRootInstance(app) {
    const payload = await this.callHook("getAppRootInstance"
    /* Hooks.GET_APP_ROOT_INSTANCE */
    , {
      app,
      root: null
    });
    return payload.root;
  }

  async registerApplication(app) {
    await this.callHook("registerApplication"
    /* Hooks.REGISTER_APPLICATION */
    , {
      app
    });
  }

  async walkComponentTree(instance, maxDepth = -1, filter = null, recursively = false) {
    const payload = await this.callHook("walkComponentTree"
    /* Hooks.WALK_COMPONENT_TREE */
    , {
      componentInstance: instance,
      componentTreeData: null,
      maxDepth,
      filter,
      recursively
    });
    return payload.componentTreeData;
  }

  async visitComponentTree(instance, treeNode, filter = null, app) {
    const payload = await this.callHook("visitComponentTree"
    /* Hooks.VISIT_COMPONENT_TREE */
    , {
      app,
      componentInstance: instance,
      treeNode,
      filter
    });
    return payload.treeNode;
  }

  async walkComponentParents(instance) {
    const payload = await this.callHook("walkComponentParents"
    /* Hooks.WALK_COMPONENT_PARENTS */
    , {
      componentInstance: instance,
      parentInstances: []
    });
    return payload.parentInstances;
  }

  async inspectComponent(instance, app) {
    const payload = await this.callHook("inspectComponent"
    /* Hooks.INSPECT_COMPONENT */
    , {
      app,
      componentInstance: instance,
      instanceData: null
    });
    return payload.instanceData;
  }

  async getComponentBounds(instance) {
    const payload = await this.callHook("getComponentBounds"
    /* Hooks.GET_COMPONENT_BOUNDS */
    , {
      componentInstance: instance,
      bounds: null
    });
    return payload.bounds;
  }

  async getComponentName(instance) {
    const payload = await this.callHook("getComponentName"
    /* Hooks.GET_COMPONENT_NAME */
    , {
      componentInstance: instance,
      name: null
    });
    return payload.name;
  }

  async getComponentInstances(app) {
    const payload = await this.callHook("getComponentInstances"
    /* Hooks.GET_COMPONENT_INSTANCES */
    , {
      app,
      componentInstances: []
    });
    return payload.componentInstances;
  }

  async getElementComponent(element) {
    const payload = await this.callHook("getElementComponent"
    /* Hooks.GET_ELEMENT_COMPONENT */
    , {
      element,
      componentInstance: null
    });
    return payload.componentInstance;
  }

  async getComponentRootElements(instance) {
    const payload = await this.callHook("getComponentRootElements"
    /* Hooks.GET_COMPONENT_ROOT_ELEMENTS */
    , {
      componentInstance: instance,
      rootElements: []
    });
    return payload.rootElements;
  }

  async editComponentState(instance, dotPath, type, state, app) {
    const arrayPath = dotPath.split('.');
    const payload = await this.callHook("editComponentState"
    /* Hooks.EDIT_COMPONENT_STATE */
    , {
      app,
      componentInstance: instance,
      path: arrayPath,
      type,
      state,
      set: (object, path = arrayPath, value = state.value, cb) => this.stateEditor.set(object, path, value, cb || this.stateEditor.createDefaultSetCallback(state))
    });
    return payload.componentInstance;
  }

  async getComponentDevtoolsOptions(instance) {
    const payload = await this.callHook("getAppDevtoolsOptions"
    /* Hooks.GET_COMPONENT_DEVTOOLS_OPTIONS */
    , {
      componentInstance: instance,
      options: null
    });
    return payload.options || {};
  }

  async getComponentRenderCode(instance) {
    const payload = await this.callHook("getComponentRenderCode"
    /* Hooks.GET_COMPONENT_RENDER_CODE */
    , {
      componentInstance: instance,
      code: null
    });
    return {
      code: payload.code
    };
  }

  async inspectTimelineEvent(eventData, app) {
    const payload = await this.callHook("inspectTimelineEvent"
    /* Hooks.INSPECT_TIMELINE_EVENT */
    , {
      event: eventData.event,
      layerId: eventData.layerId,
      app,
      data: eventData.event.data,
      all: eventData.all
    });
    return payload.data;
  }

  async clearTimeline() {
    await this.callHook("timelineCleared"
    /* Hooks.TIMELINE_CLEARED */
    , {});
  }

  async getInspectorTree(inspectorId, app, filter) {
    const payload = await this.callHook("getInspectorTree"
    /* Hooks.GET_INSPECTOR_TREE */
    , {
      inspectorId,
      app,
      filter,
      rootNodes: []
    });
    return payload.rootNodes;
  }

  async getInspectorState(inspectorId, app, nodeId) {
    const payload = await this.callHook("getInspectorState"
    /* Hooks.GET_INSPECTOR_STATE */
    , {
      inspectorId,
      app,
      nodeId,
      state: null
    });
    return payload.state;
  }

  async editInspectorState(inspectorId, app, nodeId, dotPath, type, state) {
    const arrayPath = dotPath.split('.');
    await this.callHook("editInspectorState"
    /* Hooks.EDIT_INSPECTOR_STATE */
    , {
      inspectorId,
      app,
      nodeId,
      path: arrayPath,
      type,
      state,
      set: (object, path = arrayPath, value = state.value, cb) => this.stateEditor.set(object, path, value, cb || this.stateEditor.createDefaultSetCallback(state))
    });
  }

  now() {
    return (0, devtools_api_1.now)();
  }

}

exports.DevtoolsApi = DevtoolsApi;

class DevtoolsPluginApiInstance {
  constructor(plugin, appRecord, ctx) {
    this.bridge = ctx.bridge;
    this.ctx = ctx;
    this.plugin = plugin;
    this.appRecord = appRecord;
    this.backendApi = appRecord.backend.api;
    this.defaultSettings = (0, shared_utils_1.getPluginDefaultSettings)(plugin.descriptor.settings);
    this.on = new hooks_1.DevtoolsHookable(ctx, plugin);
    pluginOn.push(this.on);
  } // Plugin API


  async notifyComponentUpdate(instance = null) {
    if (!this.enabled || !this.hasPermission(shared_utils_1.PluginPermission.COMPONENTS)) return;

    if (instance) {
      this.ctx.hook.emit(shared_utils_1.HookEvents.COMPONENT_UPDATED, ...(await this.backendApi.transformCall(shared_utils_1.HookEvents.COMPONENT_UPDATED, instance)));
    } else {
      this.ctx.hook.emit(shared_utils_1.HookEvents.COMPONENT_UPDATED);
    }
  }

  addTimelineLayer(options) {
    if (!this.enabled || !this.hasPermission(shared_utils_1.PluginPermission.TIMELINE)) return false;
    this.ctx.hook.emit(shared_utils_1.HookEvents.TIMELINE_LAYER_ADDED, options, this.plugin);
    return true;
  }

  addTimelineEvent(options) {
    if (!this.enabled || !this.hasPermission(shared_utils_1.PluginPermission.TIMELINE)) return false;
    this.ctx.hook.emit(shared_utils_1.HookEvents.TIMELINE_EVENT_ADDED, options, this.plugin);
    return true;
  }

  addInspector(options) {
    if (!this.enabled || !this.hasPermission(shared_utils_1.PluginPermission.CUSTOM_INSPECTOR)) return false;
    this.ctx.hook.emit(shared_utils_1.HookEvents.CUSTOM_INSPECTOR_ADD, options, this.plugin);
    return true;
  }

  sendInspectorTree(inspectorId) {
    if (!this.enabled || !this.hasPermission(shared_utils_1.PluginPermission.CUSTOM_INSPECTOR)) return false;
    this.ctx.hook.emit(shared_utils_1.HookEvents.CUSTOM_INSPECTOR_SEND_TREE, inspectorId, this.plugin);
    return true;
  }

  sendInspectorState(inspectorId) {
    if (!this.enabled || !this.hasPermission(shared_utils_1.PluginPermission.CUSTOM_INSPECTOR)) return false;
    this.ctx.hook.emit(shared_utils_1.HookEvents.CUSTOM_INSPECTOR_SEND_STATE, inspectorId, this.plugin);
    return true;
  }

  selectInspectorNode(inspectorId, nodeId) {
    if (!this.enabled || !this.hasPermission(shared_utils_1.PluginPermission.CUSTOM_INSPECTOR)) return false;
    this.ctx.hook.emit(shared_utils_1.HookEvents.CUSTOM_INSPECTOR_SELECT_NODE, inspectorId, nodeId, this.plugin);
    return true;
  }

  getComponentBounds(instance) {
    return this.backendApi.getComponentBounds(instance);
  }

  getComponentName(instance) {
    return this.backendApi.getComponentName(instance);
  }

  getComponentInstances(app) {
    return this.backendApi.getComponentInstances(app);
  }

  highlightElement(instance) {
    if (!this.enabled || !this.hasPermission(shared_utils_1.PluginPermission.COMPONENTS)) return false;
    this.ctx.hook.emit(shared_utils_1.HookEvents.COMPONENT_HIGHLIGHT, instance.__VUE_DEVTOOLS_UID__, this.plugin);
    return true;
  }

  unhighlightElement() {
    if (!this.enabled || !this.hasPermission(shared_utils_1.PluginPermission.COMPONENTS)) return false;
    this.ctx.hook.emit(shared_utils_1.HookEvents.COMPONENT_UNHIGHLIGHT, this.plugin);
    return true;
  }

  getSettings(pluginId) {
    return (0, shared_utils_1.getPluginSettings)(pluginId !== null && pluginId !== void 0 ? pluginId : this.plugin.descriptor.id, this.defaultSettings);
  }

  setSettings(value, pluginId) {
    (0, shared_utils_1.setPluginSettings)(pluginId !== null && pluginId !== void 0 ? pluginId : this.plugin.descriptor.id, value);
  }

  now() {
    return (0, devtools_api_1.now)();
  }

  get enabled() {
    return (0, shared_utils_1.hasPluginPermission)(this.plugin.descriptor.id, shared_utils_1.PluginPermission.ENABLED);
  }

  hasPermission(permission) {
    return (0, shared_utils_1.hasPluginPermission)(this.plugin.descriptor.id, permission);
  }

}

exports.DevtoolsPluginApiInstance = DevtoolsPluginApiInstance;

/***/ }),

/***/ "../app-backend-api/lib/app-record.js":
/*!********************************************!*\
  !*** ../app-backend-api/lib/app-record.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "../app-backend-api/lib/backend-context.js":
/*!*************************************************!*\
  !*** ../app-backend-api/lib/backend-context.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createBackendContext = void 0;

function createBackendContext(options) {
  return {
    bridge: options.bridge,
    hook: options.hook,
    backends: [],
    appRecords: [],
    currentTab: null,
    currentAppRecord: null,
    currentInspectedComponentId: null,
    plugins: [],
    currentPlugin: null,
    timelineLayers: [],
    nextTimelineEventId: 0,
    timelineEventMap: new Map(),
    perfUniqueGroupId: 0,
    customInspectors: [],
    timelineMarkers: []
  };
}

exports.createBackendContext = createBackendContext;

/***/ }),

/***/ "../app-backend-api/lib/backend.js":
/*!*****************************************!*\
  !*** ../app-backend-api/lib/backend.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createBackend = exports.defineBackend = exports.BuiltinBackendFeature = void 0;

const api_1 = __webpack_require__(/*! ./api */ "../app-backend-api/lib/api.js");

var BuiltinBackendFeature;

(function (BuiltinBackendFeature) {
  /**
   * @deprecated
   */
  BuiltinBackendFeature["FLUSH"] = "flush";
})(BuiltinBackendFeature = exports.BuiltinBackendFeature || (exports.BuiltinBackendFeature = {}));

function defineBackend(options) {
  return options;
}

exports.defineBackend = defineBackend;

function createBackend(options, ctx) {
  const backend = {
    options,
    api: null
  };
  backend.api = new api_1.DevtoolsApi(backend, ctx);
  options.setup(backend.api);
  return backend;
}

exports.createBackend = createBackend;

/***/ }),

/***/ "../app-backend-api/lib/global-hook.js":
/*!*********************************************!*\
  !*** ../app-backend-api/lib/global-hook.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/* eslint-disable @typescript-eslint/ban-types */

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "../app-backend-api/lib/hooks.js":
/*!***************************************!*\
  !*** ../app-backend-api/lib/hooks.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DevtoolsHookable = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

class DevtoolsHookable {
  constructor(ctx, plugin = null) {
    this.handlers = {};
    this.ctx = ctx;
    this.plugin = plugin;
  }

  hook(eventType, handler, pluginPermision = null) {
    const handlers = this.handlers[eventType] = this.handlers[eventType] || [];

    if (this.plugin) {
      const originalHandler = handler;

      handler = (...args) => {
        var _a; // Plugin permission


        if (!(0, shared_utils_1.hasPluginPermission)(this.plugin.descriptor.id, shared_utils_1.PluginPermission.ENABLED) || pluginPermision && !(0, shared_utils_1.hasPluginPermission)(this.plugin.descriptor.id, pluginPermision)) return; // App scope

        if (!this.plugin.descriptor.disableAppScope && ((_a = this.ctx.currentAppRecord) === null || _a === void 0 ? void 0 : _a.options.app) !== this.plugin.descriptor.app) return; // Plugin scope

        if (!this.plugin.descriptor.disablePluginScope && args[0].pluginId != null && args[0].pluginId !== this.plugin.descriptor.id) return;
        return originalHandler(...args);
      };
    }

    handlers.push({
      handler,
      plugin: this.ctx.currentPlugin
    });
  }

  async callHandlers(eventType, payload, ctx) {
    if (this.handlers[eventType]) {
      const handlers = this.handlers[eventType];

      for (let i = 0; i < handlers.length; i++) {
        const {
          handler,
          plugin
        } = handlers[i];

        try {
          await handler(payload, ctx);
        } catch (e) {
          console.error(`An error occurred in hook '${eventType}'${plugin ? ` registered by plugin '${plugin.descriptor.id}'` : ''} with payload:`, payload);
          console.error(e);
        }
      }
    }

    return payload;
  }

  transformCall(handler) {
    this.hook("transformCall"
    /* Hooks.TRANSFORM_CALL */
    , handler);
  }

  getAppRecordName(handler) {
    this.hook("getAppRecordName"
    /* Hooks.GET_APP_RECORD_NAME */
    , handler);
  }

  getAppRootInstance(handler) {
    this.hook("getAppRootInstance"
    /* Hooks.GET_APP_ROOT_INSTANCE */
    , handler);
  }

  registerApplication(handler) {
    this.hook("registerApplication"
    /* Hooks.REGISTER_APPLICATION */
    , handler);
  }

  walkComponentTree(handler) {
    this.hook("walkComponentTree"
    /* Hooks.WALK_COMPONENT_TREE */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  visitComponentTree(handler) {
    this.hook("visitComponentTree"
    /* Hooks.VISIT_COMPONENT_TREE */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  walkComponentParents(handler) {
    this.hook("walkComponentParents"
    /* Hooks.WALK_COMPONENT_PARENTS */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  inspectComponent(handler) {
    this.hook("inspectComponent"
    /* Hooks.INSPECT_COMPONENT */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  getComponentBounds(handler) {
    this.hook("getComponentBounds"
    /* Hooks.GET_COMPONENT_BOUNDS */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  getComponentName(handler) {
    this.hook("getComponentName"
    /* Hooks.GET_COMPONENT_NAME */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  getComponentInstances(handler) {
    this.hook("getComponentInstances"
    /* Hooks.GET_COMPONENT_INSTANCES */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  getElementComponent(handler) {
    this.hook("getElementComponent"
    /* Hooks.GET_ELEMENT_COMPONENT */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  getComponentRootElements(handler) {
    this.hook("getComponentRootElements"
    /* Hooks.GET_COMPONENT_ROOT_ELEMENTS */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  editComponentState(handler) {
    this.hook("editComponentState"
    /* Hooks.EDIT_COMPONENT_STATE */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  getComponentDevtoolsOptions(handler) {
    this.hook("getAppDevtoolsOptions"
    /* Hooks.GET_COMPONENT_DEVTOOLS_OPTIONS */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  getComponentRenderCode(handler) {
    this.hook("getComponentRenderCode"
    /* Hooks.GET_COMPONENT_RENDER_CODE */
    , handler, shared_utils_1.PluginPermission.COMPONENTS);
  }

  inspectTimelineEvent(handler) {
    this.hook("inspectTimelineEvent"
    /* Hooks.INSPECT_TIMELINE_EVENT */
    , handler, shared_utils_1.PluginPermission.TIMELINE);
  }

  timelineCleared(handler) {
    this.hook("timelineCleared"
    /* Hooks.TIMELINE_CLEARED */
    , handler, shared_utils_1.PluginPermission.TIMELINE);
  }

  getInspectorTree(handler) {
    this.hook("getInspectorTree"
    /* Hooks.GET_INSPECTOR_TREE */
    , handler, shared_utils_1.PluginPermission.CUSTOM_INSPECTOR);
  }

  getInspectorState(handler) {
    this.hook("getInspectorState"
    /* Hooks.GET_INSPECTOR_STATE */
    , handler, shared_utils_1.PluginPermission.CUSTOM_INSPECTOR);
  }

  editInspectorState(handler) {
    this.hook("editInspectorState"
    /* Hooks.EDIT_INSPECTOR_STATE */
    , handler, shared_utils_1.PluginPermission.CUSTOM_INSPECTOR);
  }

  setPluginSettings(handler) {
    this.hook("setPluginSettings"
    /* Hooks.SET_PLUGIN_SETTINGS */
    , handler);
  }

}

exports.DevtoolsHookable = DevtoolsHookable;

/***/ }),

/***/ "../app-backend-api/lib/index.js":
/*!***************************************!*\
  !*** ../app-backend-api/lib/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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

__exportStar(__webpack_require__(/*! ./api */ "../app-backend-api/lib/api.js"), exports);

__exportStar(__webpack_require__(/*! ./app-record */ "../app-backend-api/lib/app-record.js"), exports);

__exportStar(__webpack_require__(/*! ./backend */ "../app-backend-api/lib/backend.js"), exports);

__exportStar(__webpack_require__(/*! ./backend-context */ "../app-backend-api/lib/backend-context.js"), exports);

__exportStar(__webpack_require__(/*! ./global-hook */ "../app-backend-api/lib/global-hook.js"), exports);

__exportStar(__webpack_require__(/*! ./hooks */ "../app-backend-api/lib/hooks.js"), exports);

__exportStar(__webpack_require__(/*! ./plugin */ "../app-backend-api/lib/plugin.js"), exports);

/***/ }),

/***/ "../app-backend-api/lib/plugin.js":
/*!****************************************!*\
  !*** ../app-backend-api/lib/plugin.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "../app-backend-core/lib/app.js":
/*!**************************************!*\
  !*** ../app-backend-core/lib/app.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports._legacy_getAndRegisterApps = exports.removeApp = exports.sendApps = exports.waitForAppsRegistration = exports.getAppRecord = exports.getAppRecordId = exports.mapAppRecord = exports.selectApp = exports.registerApp = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const speakingurl_1 = __importDefault(__webpack_require__(/*! speakingurl */ "../../node_modules/speakingurl/index.js"));

const queue_1 = __webpack_require__(/*! ./util/queue */ "../app-backend-core/lib/util/queue.js");

const scan_1 = __webpack_require__(/*! ./legacy/scan */ "../app-backend-core/lib/legacy/scan.js");

const timeline_1 = __webpack_require__(/*! ./timeline */ "../app-backend-core/lib/timeline.js");

const backend_1 = __webpack_require__(/*! ./backend */ "../app-backend-core/lib/backend.js");

const global_hook_js_1 = __webpack_require__(/*! ./global-hook.js */ "../app-backend-core/lib/global-hook.js");

const jobs = new queue_1.JobQueue();
let recordId = 0;
const appRecordPromises = new Map();

async function registerApp(options, ctx) {
  return jobs.queue('regiserApp', () => registerAppJob(options, ctx));
}

exports.registerApp = registerApp;

async function registerAppJob(options, ctx) {
  // Dedupe
  if (ctx.appRecords.find(a => a.options.app === options.app)) {
    return;
  }

  if (!options.version) {
    throw new Error('[Vue Devtools] Vue version not found');
  } // Find correct backend


  const baseFrameworkVersion = parseInt(options.version.substring(0, options.version.indexOf('.')));

  for (let i = 0; i < backend_1.availableBackends.length; i++) {
    const backendOptions = backend_1.availableBackends[i];

    if (backendOptions.frameworkVersion === baseFrameworkVersion) {
      // Enable backend if it's not enabled
      const backend = (0, backend_1.getBackend)(backendOptions, ctx);
      await createAppRecord(options, backend, ctx);
      break;
    }
  }
}

async function createAppRecord(options, backend, ctx) {
  var _a, _b, _c;

  const rootInstance = await backend.api.getAppRootInstance(options.app);

  if (rootInstance) {
    if ((await backend.api.getComponentDevtoolsOptions(rootInstance)).hide) {
      options.app._vueDevtools_hidden_ = true;
      return;
    }

    recordId++;
    const name = await backend.api.getAppRecordName(options.app, recordId.toString());
    const id = getAppRecordId(options.app, (0, speakingurl_1.default)(name));
    const [el] = await backend.api.getComponentRootElements(rootInstance);
    const record = {
      id,
      name,
      options,
      backend,
      lastInspectedComponentId: null,
      instanceMap: new Map(),
      rootInstance,
      perfGroupIds: new Map(),
      iframe: shared_utils_1.isBrowser && el && document !== el.ownerDocument ? (_b = (_a = el.ownerDocument) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.pathname : null,
      meta: (_c = options.meta) !== null && _c !== void 0 ? _c : {}
    };
    options.app.__VUE_DEVTOOLS_APP_RECORD__ = record;
    const rootId = `${record.id}:root`;
    record.instanceMap.set(rootId, record.rootInstance);
    record.rootInstance.__VUE_DEVTOOLS_UID__ = rootId; // Timeline

    (0, timeline_1.addBuiltinLayers)(record, ctx);
    ctx.appRecords.push(record);

    if (backend.options.setupApp) {
      backend.options.setupApp(backend.api, record);
    }

    await backend.api.registerApplication(options.app);
    ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_APP_ADD, {
      appRecord: mapAppRecord(record)
    });

    if (appRecordPromises.has(options.app)) {
      for (const r of appRecordPromises.get(options.app)) {
        await r(record);
      }
    } // Auto select first app


    if (ctx.currentAppRecord == null) {
      await selectApp(record, ctx);
    }
  } else if (shared_utils_1.SharedData.debugInfo) {
    console.warn('[Vue devtools] No root instance found for app, it might have been unmounted', options.app);
  }
}

async function selectApp(record, ctx) {
  ctx.currentAppRecord = record;
  ctx.currentInspectedComponentId = record.lastInspectedComponentId;
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_APP_SELECTED, {
    id: record.id,
    lastInspectedComponentId: record.lastInspectedComponentId
  });
}

exports.selectApp = selectApp;

function mapAppRecord(record) {
  return {
    id: record.id,
    name: record.name,
    version: record.options.version,
    iframe: record.iframe
  };
}

exports.mapAppRecord = mapAppRecord;
const appIds = new Set();

function getAppRecordId(app, defaultId) {
  if (app.__VUE_DEVTOOLS_APP_RECORD_ID__ != null) {
    return app.__VUE_DEVTOOLS_APP_RECORD_ID__;
  }

  let id = defaultId !== null && defaultId !== void 0 ? defaultId : (recordId++).toString();

  if (defaultId && appIds.has(id)) {
    let count = 1;

    while (appIds.has(`${defaultId}_${count}`)) {
      count++;
    }

    id = `${defaultId}_${count}`;
  }

  appIds.add(id);
  app.__VUE_DEVTOOLS_APP_RECORD_ID__ = id;
  return id;
}

exports.getAppRecordId = getAppRecordId;

async function getAppRecord(app, ctx) {
  var _a;

  const record = (_a = app.__VUE_DEVTOOLS_APP_RECORD__) !== null && _a !== void 0 ? _a : ctx.appRecords.find(ar => ar.options.app === app);

  if (record) {
    return record;
  }

  if (app._vueDevtools_hidden_) return null;
  return new Promise((resolve, reject) => {
    let resolvers = appRecordPromises.get(app);
    let timedOut = false;

    if (!resolvers) {
      resolvers = [];
      appRecordPromises.set(app, resolvers);
    }

    const fn = record => {
      if (!timedOut) {
        clearTimeout(timer);
        resolve(record);
      }
    };

    resolvers.push(fn);
    const timer = setTimeout(() => {
      timedOut = true;
      const index = resolvers.indexOf(fn);
      if (index !== -1) resolvers.splice(index, 1);

      if (shared_utils_1.SharedData.debugInfo) {
        // eslint-disable-next-line no-console
        console.log('Timed out waiting for app record', app);
      }

      reject(new Error(`Timed out getting app record for app`));
    }, 60000);
  });
}

exports.getAppRecord = getAppRecord;

function waitForAppsRegistration() {
  return jobs.queue('waitForAppsRegistrationNoop', async () => {});
}

exports.waitForAppsRegistration = waitForAppsRegistration;

async function sendApps(ctx) {
  const appRecords = [];

  for (const appRecord of ctx.appRecords) {
    appRecords.push(appRecord);
  }

  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_APP_LIST, {
    apps: appRecords.map(mapAppRecord)
  });
}

exports.sendApps = sendApps;

function removeAppRecord(appRecord, ctx) {
  try {
    appIds.delete(appRecord.id);
    const index = ctx.appRecords.indexOf(appRecord);
    if (index !== -1) ctx.appRecords.splice(index, 1);
    (0, timeline_1.removeLayersForApp)(appRecord.options.app, ctx);
    ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_APP_REMOVE, {
      id: appRecord.id
    });
  } catch (e) {
    if (shared_utils_1.SharedData.debugInfo) {
      console.error(e);
    }
  }
}

async function removeApp(app, ctx) {
  try {
    const appRecord = await getAppRecord(app, ctx);

    if (appRecord) {
      removeAppRecord(appRecord, ctx);
    }
  } catch (e) {
    if (shared_utils_1.SharedData.debugInfo) {
      console.error(e);
    }
  }
}

exports.removeApp = removeApp;
let scanTimeout; // eslint-disable-next-line camelcase

function _legacy_getAndRegisterApps(ctx, clear = false) {
  setTimeout(() => {
    try {
      if (clear) {
        // Remove apps that are legacy
        ctx.appRecords.forEach(appRecord => {
          if (appRecord.meta.Vue) {
            removeAppRecord(appRecord, ctx);
          }
        });
      }

      const apps = (0, scan_1.scan)();
      clearTimeout(scanTimeout);

      if (!apps.length) {
        scanTimeout = setTimeout(() => _legacy_getAndRegisterApps(ctx), 1000);
      }

      apps.forEach(app => {
        const Vue = global_hook_js_1.hook.Vue;
        registerApp({
          app,
          types: {},
          version: Vue === null || Vue === void 0 ? void 0 : Vue.version,
          meta: {
            Vue
          }
        }, ctx);
      });
    } catch (e) {
      console.error(`Error scanning for legacy apps:`);
      console.error(e);
    }
  }, 0);
}

exports._legacy_getAndRegisterApps = _legacy_getAndRegisterApps;

/***/ }),

/***/ "../app-backend-core/lib/backend.js":
/*!******************************************!*\
  !*** ../app-backend-core/lib/backend.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getBackend = exports.availableBackends = void 0;

const app_backend_api_1 = __webpack_require__(/*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js"); // import { backend as backendVue1 } from '@vue-devtools/app-backend-vue1'
// import { backend as backendVue2 } from '@vue-devtools/app-backend-vue2'


const app_backend_vue3_1 = __webpack_require__(/*! @vue-devtools/app-backend-vue3 */ "../app-backend-vue3/lib/index.js");

const perf_1 = __webpack_require__(/*! ./perf */ "../app-backend-core/lib/perf.js"); // fixed by xxxxxx


exports.availableBackends = [// backendVue1,
// backendVue2,
app_backend_vue3_1.backend];
const enabledBackends = new Map();

function getBackend(backendOptions, ctx) {
  let backend;

  if (!enabledBackends.has(backendOptions)) {
    // Create backend
    backend = (0, app_backend_api_1.createBackend)(backendOptions, ctx);
    (0, perf_1.handleAddPerformanceTag)(backend, ctx);
    enabledBackends.set(backendOptions, backend);
    ctx.backends.push(backend);
  } else {
    backend = enabledBackends.get(backendOptions);
  }

  return backend;
}

exports.getBackend = getBackend;

/***/ }),

/***/ "../app-backend-core/lib/component-pick.js":
/*!*************************************************!*\
  !*** ../app-backend-core/lib/component-pick.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const highlighter_1 = __webpack_require__(/*! ./highlighter */ "../app-backend-core/lib/highlighter.js");

class ComponentPicker {
  constructor(ctx) {
    this.ctx = ctx;
    this.bindMethods();
  }
  /**
   * Adds event listeners for mouseover and mouseup
   */


  startSelecting() {
    if (!shared_utils_1.isBrowser) return;
    window.addEventListener('mouseover', this.elementMouseOver, true);
    window.addEventListener('click', this.elementClicked, true);
    window.addEventListener('mouseout', this.cancelEvent, true);
    window.addEventListener('mouseenter', this.cancelEvent, true);
    window.addEventListener('mouseleave', this.cancelEvent, true);
    window.addEventListener('mousedown', this.cancelEvent, true);
    window.addEventListener('mouseup', this.cancelEvent, true);
  }
  /**
   * Removes event listeners
   */


  stopSelecting() {
    if (!shared_utils_1.isBrowser) return;
    window.removeEventListener('mouseover', this.elementMouseOver, true);
    window.removeEventListener('click', this.elementClicked, true);
    window.removeEventListener('mouseout', this.cancelEvent, true);
    window.removeEventListener('mouseenter', this.cancelEvent, true);
    window.removeEventListener('mouseleave', this.cancelEvent, true);
    window.removeEventListener('mousedown', this.cancelEvent, true);
    window.removeEventListener('mouseup', this.cancelEvent, true);
    (0, highlighter_1.unHighlight)();
  }
  /**
   * Highlights a component on element mouse over
   */


  async elementMouseOver(e) {
    this.cancelEvent(e);
    const el = e.target;

    if (el) {
      await this.selectElementComponent(el);
    }

    (0, highlighter_1.unHighlight)();

    if (this.selectedInstance) {
      (0, highlighter_1.highlight)(this.selectedInstance, this.selectedBackend, this.ctx);
    }
  }

  async selectElementComponent(el) {
    for (const backend of this.ctx.backends) {
      const instance = await backend.api.getElementComponent(el);

      if (instance) {
        this.selectedInstance = instance;
        this.selectedBackend = backend;
        return;
      }
    }

    this.selectedInstance = null;
    this.selectedBackend = null;
  }
  /**
   * Selects an instance in the component view
   */


  async elementClicked(e) {
    this.cancelEvent(e);

    if (this.selectedInstance && this.selectedBackend) {
      const parentInstances = await this.selectedBackend.api.walkComponentParents(this.selectedInstance);
      this.ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_COMPONENT_PICK, {
        id: this.selectedInstance.__VUE_DEVTOOLS_UID__,
        parentIds: parentInstances.map(i => i.__VUE_DEVTOOLS_UID__)
      });
    } else {
      this.ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_COMPONENT_PICK_CANCELED, null);
    }

    this.stopSelecting();
  }
  /**
   * Cancel a mouse event
   */


  cancelEvent(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
  /**
   * Bind class methods to the class scope to avoid rebind for event listeners
   */


  bindMethods() {
    this.startSelecting = this.startSelecting.bind(this);
    this.stopSelecting = this.stopSelecting.bind(this);
    this.elementMouseOver = this.elementMouseOver.bind(this);
    this.elementClicked = this.elementClicked.bind(this);
  }

}

exports["default"] = ComponentPicker;

/***/ }),

/***/ "../app-backend-core/lib/component.js":
/*!********************************************!*\
  !*** ../app-backend-core/lib/component.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.sendComponentUpdateTracking = exports.refreshComponentTreeSearch = exports.getComponentInstance = exports.getComponentId = exports.editComponentState = exports.sendEmptyComponentData = exports.markSelectedInstance = exports.sendSelectedComponentData = exports.sendComponentTreeData = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const app_backend_api_1 = __webpack_require__(/*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js");

const app_1 = __webpack_require__(/*! ./app */ "../app-backend-core/lib/app.js");

const MAX_$VM = 10;
const $vmQueue = [];

async function sendComponentTreeData(appRecord, instanceId, filter = '', maxDepth = null, recursively = false, ctx) {
  if (!instanceId || appRecord !== ctx.currentAppRecord) return; // Flush will send all components in the tree
  // So we skip individiual tree updates

  if (instanceId !== '_root' && ctx.currentAppRecord.backend.options.features.includes(app_backend_api_1.BuiltinBackendFeature.FLUSH)) {
    return;
  }

  const instance = getComponentInstance(appRecord, instanceId, ctx);

  if (!instance) {
    ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_COMPONENT_TREE, {
      instanceId,
      treeData: null,
      notFound: true
    });
  } else {
    if (filter) filter = filter.toLowerCase();

    if (maxDepth == null) {
      maxDepth = instance === ctx.currentAppRecord.rootInstance ? 2 : 1;
    }

    const data = await appRecord.backend.api.walkComponentTree(instance, maxDepth, filter, recursively);
    const payload = {
      instanceId,
      treeData: (0, shared_utils_1.stringify)(data)
    };
    ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_COMPONENT_TREE, payload);
  }
}

exports.sendComponentTreeData = sendComponentTreeData;

async function sendSelectedComponentData(appRecord, instanceId, ctx) {
  if (!instanceId || appRecord !== ctx.currentAppRecord) return;
  const instance = getComponentInstance(appRecord, instanceId, ctx);

  if (!instance) {
    sendEmptyComponentData(instanceId, ctx);
  } else {
    // Expose instance on window
    if (typeof window !== 'undefined') {
      const win = window;
      win.$vm = instance; // $vm0, $vm1, $vm2, ...

      if ($vmQueue[0] !== instance) {
        if ($vmQueue.length >= MAX_$VM) {
          $vmQueue.pop();
        }

        for (let i = $vmQueue.length; i > 0; i--) {
          win[`$vm${i}`] = $vmQueue[i] = $vmQueue[i - 1];
        }

        win.$vm0 = $vmQueue[0] = instance;
      }
    }

    if (shared_utils_1.SharedData.debugInfo) {
      // eslint-disable-next-line no-console
      console.log('[DEBUG] inspect', instance);
    }

    const parentInstances = await appRecord.backend.api.walkComponentParents(instance);
    const payload = {
      instanceId,
      data: await appRecord.backend.api.inspectComponent(instance, ctx.currentAppRecord.options.app),
      parentIds: parentInstances.map(i => i.__VUE_DEVTOOLS_UID__)
    };

    if (true) {
      // 小程序及App端暂不支持 script setup 语法糖，增加提示
      payload.data.isSetup = !!instance.type.setup && !instance.type.render;
    }

    payload.data = (0, shared_utils_1.stringify)(payload.data);
    ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_COMPONENT_SELECTED_DATA, payload);
    markSelectedInstance(instanceId, ctx);
  }
}

exports.sendSelectedComponentData = sendSelectedComponentData;

function markSelectedInstance(instanceId, ctx) {
  ctx.currentInspectedComponentId = instanceId;
  ctx.currentAppRecord.lastInspectedComponentId = instanceId;
}

exports.markSelectedInstance = markSelectedInstance;

function sendEmptyComponentData(instanceId, ctx) {
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_COMPONENT_SELECTED_DATA, {
    instanceId,
    data: null
  });
}

exports.sendEmptyComponentData = sendEmptyComponentData;

async function editComponentState(instanceId, dotPath, type, state, ctx) {
  if (!instanceId) return;
  const instance = getComponentInstance(ctx.currentAppRecord, instanceId, ctx);

  if (instance) {
    if ('value' in state && state.value != null) {
      state.value = (0, shared_utils_1.parse)(state.value, true);
    }

    await ctx.currentAppRecord.backend.api.editComponentState(instance, dotPath, type, state, ctx.currentAppRecord.options.app);
    await sendSelectedComponentData(ctx.currentAppRecord, instanceId, ctx);
  }
}

exports.editComponentState = editComponentState;

async function getComponentId(app, uid, instance, ctx) {
  try {
    if (instance.__VUE_DEVTOOLS_UID__) return instance.__VUE_DEVTOOLS_UID__;
    const appRecord = await (0, app_1.getAppRecord)(app, ctx);
    if (!appRecord) return null;
    const isRoot = appRecord.rootInstance === instance;
    return `${appRecord.id}:${isRoot ? 'root' : uid}`;
  } catch (e) {
    if (shared_utils_1.SharedData.debugInfo) {
      console.error(e);
    }

    return null;
  }
}

exports.getComponentId = getComponentId;

function getComponentInstance(appRecord, instanceId, ctx) {
  if (instanceId === '_root') {
    instanceId = `${appRecord.id}:root`;
  }

  const instance = appRecord.instanceMap.get(instanceId);

  if (!instance && shared_utils_1.SharedData.debugInfo) {
    console.warn(`Instance uid=${instanceId} not found`);
  }

  return instance;
}

exports.getComponentInstance = getComponentInstance;

async function refreshComponentTreeSearch(ctx) {
  if (!ctx.currentAppRecord.componentFilter) return;
  await sendComponentTreeData(ctx.currentAppRecord, '_root', ctx.currentAppRecord.componentFilter, null, false, ctx);
}

exports.refreshComponentTreeSearch = refreshComponentTreeSearch;

async function sendComponentUpdateTracking(instanceId, ctx) {
  if (!instanceId) return;
  const payload = {
    instanceId,
    time: Date.now() // Use normal date

  };
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_COMPONENT_UPDATED, payload);
}

exports.sendComponentUpdateTracking = sendComponentUpdateTracking;

/***/ }),

/***/ "../app-backend-core/lib/flash.js":
/*!****************************************!*\
  !*** ../app-backend-core/lib/flash.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.flashComponent = void 0;

async function flashComponent(instance, backend) {
  const bounds = await backend.api.getComponentBounds(instance);

  if (bounds) {
    let overlay = instance.__VUE_DEVTOOLS_FLASH;

    if (!overlay) {
      overlay = document.createElement('div');
      instance.__VUE_DEVTOOLS_FLASH = overlay;
      overlay.style.border = '2px rgba(65, 184, 131, 0.7) solid';
      overlay.style.position = 'fixed';
      overlay.style.zIndex = '99999999999998';
      overlay.style.pointerEvents = 'none';
      overlay.style.borderRadius = '3px';
      overlay.style.boxSizing = 'border-box';
      document.body.appendChild(overlay);
    }

    overlay.style.opacity = '1';
    overlay.style.transition = null;
    overlay.style.width = Math.round(bounds.width) + 'px';
    overlay.style.height = Math.round(bounds.height) + 'px';
    overlay.style.left = Math.round(bounds.left) + 'px';
    overlay.style.top = Math.round(bounds.top) + 'px';
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 1s';
      overlay.style.opacity = '0';
    });
    clearTimeout(overlay._timer);
    overlay._timer = setTimeout(() => {
      document.body.removeChild(overlay);
      instance.__VUE_DEVTOOLS_FLASH = null;
    }, 1000);
  }
}

exports.flashComponent = flashComponent;

/***/ }),

/***/ "../app-backend-core/lib/global-hook.js":
/*!**********************************************!*\
  !*** ../app-backend-core/lib/global-hook.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.hook = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js"); // hook should have been injected before this executes.


exports.hook = shared_utils_1.target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/***/ }),

/***/ "../app-backend-core/lib/highlighter.js":
/*!**********************************************!*\
  !*** ../app-backend-core/lib/highlighter.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.unHighlight = exports.highlight = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const queue_1 = __webpack_require__(/*! ./util/queue */ "../app-backend-core/lib/util/queue.js");

let overlay;
let overlayContent;
let currentInstance;

function createOverlay() {
  if (overlay || !shared_utils_1.isBrowser) return;
  overlay = document.createElement('div');
  overlay.style.backgroundColor = 'rgba(65, 184, 131, 0.35)';
  overlay.style.position = 'fixed';
  overlay.style.zIndex = '99999999999998';
  overlay.style.pointerEvents = 'none';
  overlay.style.borderRadius = '3px';
  overlayContent = document.createElement('div');
  overlayContent.style.position = 'fixed';
  overlayContent.style.zIndex = '99999999999999';
  overlayContent.style.pointerEvents = 'none';
  overlayContent.style.backgroundColor = 'white';
  overlayContent.style.fontFamily = 'monospace';
  overlayContent.style.fontSize = '11px';
  overlayContent.style.padding = '4px 8px';
  overlayContent.style.borderRadius = '3px';
  overlayContent.style.color = '#333';
  overlayContent.style.textAlign = 'center';
  overlayContent.style.border = 'rgba(65, 184, 131, 0.5) 1px solid';
  overlayContent.style.backgroundClip = 'padding-box';
} // Use a job queue to preserve highlight/unhighlight calls order
// This prevents "sticky" highlights that are not removed because highlight is async


const jobQueue = new queue_1.JobQueue();

async function highlight(instance, backend, ctx) {
  await jobQueue.queue('highlight', async () => {
    if (!instance) return;
    const bounds = await backend.api.getComponentBounds(instance);

    if (bounds) {
      createOverlay(); // Name

      const name = (await backend.api.getComponentName(instance)) || 'Anonymous';
      const pre = document.createElement('span');
      pre.style.opacity = '0.6';
      pre.innerText = '<';
      const text = document.createElement('span');
      text.style.fontWeight = 'bold';
      text.style.color = '#09ab56';
      text.innerText = name;
      const post = document.createElement('span');
      post.style.opacity = '0.6';
      post.innerText = '>'; // Size

      const size = document.createElement('span');
      size.style.opacity = '0.5';
      size.style.marginLeft = '6px';
      size.appendChild(document.createTextNode((Math.round(bounds.width * 100) / 100).toString()));
      const multiply = document.createElement('span');
      multiply.style.marginLeft = multiply.style.marginRight = '2px';
      multiply.innerText = '×';
      size.appendChild(multiply);
      size.appendChild(document.createTextNode((Math.round(bounds.height * 100) / 100).toString()));
      currentInstance = instance;
      await showOverlay(bounds, [pre, text, post, size]);
    }

    startUpdateTimer(backend, ctx);
  });
}

exports.highlight = highlight;

async function unHighlight() {
  await jobQueue.queue('unHighlight', async () => {
    var _a, _b;

    (_a = overlay === null || overlay === void 0 ? void 0 : overlay.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(overlay);
    (_b = overlayContent === null || overlayContent === void 0 ? void 0 : overlayContent.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(overlayContent);
    currentInstance = null;
    stopUpdateTimer();
  });
}

exports.unHighlight = unHighlight;

function showOverlay(bounds, children = null) {
  if (!shared_utils_1.isBrowser || !children.length) return;
  positionOverlay(bounds);
  document.body.appendChild(overlay);
  overlayContent.innerHTML = '';
  children.forEach(child => overlayContent.appendChild(child));
  document.body.appendChild(overlayContent);
  positionOverlayContent(bounds);
}

function positionOverlay({
  width = 0,
  height = 0,
  top = 0,
  left = 0
}) {
  overlay.style.width = Math.round(width) + 'px';
  overlay.style.height = Math.round(height) + 'px';
  overlay.style.left = Math.round(left) + 'px';
  overlay.style.top = Math.round(top) + 'px';
}

function positionOverlayContent({
  height = 0,
  top = 0,
  left = 0
}) {
  // Content position (prevents overflow)
  const contentWidth = overlayContent.offsetWidth;
  const contentHeight = overlayContent.offsetHeight;
  let contentLeft = left;

  if (contentLeft < 0) {
    contentLeft = 0;
  } else if (contentLeft + contentWidth > window.innerWidth) {
    contentLeft = window.innerWidth - contentWidth;
  }

  let contentTop = top - contentHeight - 2;

  if (contentTop < 0) {
    contentTop = top + height + 2;
  }

  if (contentTop < 0) {
    contentTop = 0;
  } else if (contentTop + contentHeight > window.innerHeight) {
    contentTop = window.innerHeight - contentHeight;
  }

  overlayContent.style.left = ~~contentLeft + 'px';
  overlayContent.style.top = ~~contentTop + 'px';
}

async function updateOverlay(backend, ctx) {
  if (currentInstance) {
    const bounds = await backend.api.getComponentBounds(currentInstance);

    if (bounds) {
      const sizeEl = overlayContent.children.item(3);
      const widthEl = sizeEl.childNodes[0];
      widthEl.textContent = (Math.round(bounds.width * 100) / 100).toString();
      const heightEl = sizeEl.childNodes[2];
      heightEl.textContent = (Math.round(bounds.height * 100) / 100).toString();
      positionOverlay(bounds);
      positionOverlayContent(bounds);
    }
  }
}

let updateTimer;

function startUpdateTimer(backend, ctx) {
  stopUpdateTimer();
  updateTimer = setInterval(() => {
    jobQueue.queue('updateOverlay', async () => {
      await updateOverlay(backend, ctx);
    });
  }, 1000 / 30); // 30fps
}

function stopUpdateTimer() {
  clearInterval(updateTimer);
}

/***/ }),

/***/ "../app-backend-core/lib/index.js":
/*!****************************************!*\
  !*** ../app-backend-core/lib/index.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

var _a, _b;

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.initBackend = void 0;

const app_backend_api_1 = __webpack_require__(/*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js");

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const debounce_1 = __importDefault(__webpack_require__(/*! lodash/debounce */ "../../node_modules/lodash/debounce.js"));

const throttle_1 = __importDefault(__webpack_require__(/*! lodash/throttle */ "../../node_modules/lodash/throttle.js"));

const global_hook_1 = __webpack_require__(/*! ./global-hook */ "../app-backend-core/lib/global-hook.js");

const subscriptions_1 = __webpack_require__(/*! ./util/subscriptions */ "../app-backend-core/lib/util/subscriptions.js");

const highlighter_1 = __webpack_require__(/*! ./highlighter */ "../app-backend-core/lib/highlighter.js");

const timeline_1 = __webpack_require__(/*! ./timeline */ "../app-backend-core/lib/timeline.js");

const component_pick_1 = __importDefault(__webpack_require__(/*! ./component-pick */ "../app-backend-core/lib/component-pick.js"));

const component_1 = __webpack_require__(/*! ./component */ "../app-backend-core/lib/component.js");

const plugin_1 = __webpack_require__(/*! ./plugin */ "../app-backend-core/lib/plugin.js");

const devtools_api_1 = __webpack_require__(/*! @vue/devtools-api */ "../api/lib/esm/index.js");

const app_1 = __webpack_require__(/*! ./app */ "../app-backend-core/lib/app.js");

const inspector_1 = __webpack_require__(/*! ./inspector */ "../app-backend-core/lib/inspector.js");

const timeline_screenshot_1 = __webpack_require__(/*! ./timeline-screenshot */ "../app-backend-core/lib/timeline-screenshot.js");

const perf_1 = __webpack_require__(/*! ./perf */ "../app-backend-core/lib/perf.js");

const page_config_1 = __webpack_require__(/*! ./page-config */ "../app-backend-core/lib/page-config.js");

const timeline_marker_1 = __webpack_require__(/*! ./timeline-marker */ "../app-backend-core/lib/timeline-marker.js");

const flash_js_1 = __webpack_require__(/*! ./flash.js */ "../app-backend-core/lib/flash.js");

let ctx = (_a = shared_utils_1.target.__vdevtools_ctx) !== null && _a !== void 0 ? _a : null;
let connected = (_b = shared_utils_1.target.__vdevtools_connected) !== null && _b !== void 0 ? _b : false;

async function initBackend(bridge) {
  await (0, shared_utils_1.initSharedData)({
    bridge,
    persist: false
  });
  shared_utils_1.SharedData.isBrowser = shared_utils_1.isBrowser;
  (0, page_config_1.initOnPageConfig)();

  if (!connected) {
    // First connect
    ctx = shared_utils_1.target.__vdevtools_ctx = (0, app_backend_api_1.createBackendContext)({
      bridge,
      hook: global_hook_1.hook
    });
    shared_utils_1.SharedData.legacyApps = false;

    if (global_hook_1.hook.Vue) {
      connect();
      (0, app_1._legacy_getAndRegisterApps)(ctx, true);
      shared_utils_1.SharedData.legacyApps = true;
    }

    global_hook_1.hook.on(shared_utils_1.HookEvents.INIT, () => {
      (0, app_1._legacy_getAndRegisterApps)(ctx, true);
      shared_utils_1.SharedData.legacyApps = true;
    });
    global_hook_1.hook.on(shared_utils_1.HookEvents.APP_ADD, async app => {
      await (0, app_1.registerApp)(app, ctx);
      connect();
    }); // Add apps that already sent init

    if (global_hook_1.hook.apps.length) {
      global_hook_1.hook.apps.forEach(app => {
        (0, app_1.registerApp)(app, ctx);
        connect();
      });
    }
  } else {
    // Reconnect
    ctx.bridge = bridge;
    connectBridge();
    ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_RECONNECTED);
  }
}

exports.initBackend = initBackend;

async function connect() {
  if (connected) {
    return;
  }

  connected = shared_utils_1.target.__vdevtools_connected = true;
  await (0, app_1.waitForAppsRegistration)();
  connectBridge();
  ctx.currentTab = shared_utils_1.BuiltinTabs.COMPONENTS; // Apps

  global_hook_1.hook.on(shared_utils_1.HookEvents.APP_UNMOUNT, async app => {
    await (0, app_1.removeApp)(app, ctx);
  }); // Components

  const _sendComponentUpdate = async (appRecord, id) => {
    try {
      // Update component inspector
      if (id && (0, subscriptions_1.isSubscribed)(shared_utils_1.BridgeSubscriptions.SELECTED_COMPONENT_DATA, sub => sub.payload.instanceId === id)) {
        await (0, component_1.sendSelectedComponentData)(appRecord, id, ctx);
      } // Update tree (tags)


      if ((0, subscriptions_1.isSubscribed)(shared_utils_1.BridgeSubscriptions.COMPONENT_TREE, sub => sub.payload.instanceId === id)) {
        await (0, component_1.sendComponentTreeData)(appRecord, id, appRecord.componentFilter, 0, false, ctx);
      }
    } catch (e) {
      if (shared_utils_1.SharedData.debugInfo) {
        console.error(e);
      }
    }
  };

  const sendComponentUpdate =  false ? 0 : _sendComponentUpdate;
  global_hook_1.hook.on(shared_utils_1.HookEvents.COMPONENT_UPDATED, async (app, uid, parentUid, component) => {
    try {
      if (!app || typeof uid !== 'number' && !uid || !component) return;
      let id;
      let appRecord;

      if (app && uid != null) {
        id = await (0, component_1.getComponentId)(app, uid, component, ctx);
        appRecord = await (0, app_1.getAppRecord)(app, ctx);
      } else {
        id = ctx.currentInspectedComponentId;
        appRecord = ctx.currentAppRecord;
      }

      if (shared_utils_1.SharedData.trackUpdates) {
        await (0, component_1.sendComponentUpdateTracking)(id, ctx);
      }

      if (shared_utils_1.SharedData.flashUpdates) {
        await (0, flash_js_1.flashComponent)(component, appRecord.backend);
      }

      await sendComponentUpdate(appRecord, id);
    } catch (e) {
      if (shared_utils_1.SharedData.debugInfo) {
        console.error(e);
      }
    }
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.COMPONENT_ADDED, async (app, uid, parentUid, component) => {
    try {
      if (!app || typeof uid !== 'number' && !uid || !component) return;
      const id = await (0, component_1.getComponentId)(app, uid, component, ctx);
      const appRecord = await (0, app_1.getAppRecord)(app, ctx);

      if (component) {
        if (component.__VUE_DEVTOOLS_UID__ == null) {
          component.__VUE_DEVTOOLS_UID__ = id;
        }

        if (!appRecord.instanceMap.has(id)) {
          appRecord.instanceMap.set(id, component);
        }
      }

      if (false) {}

      if (( true) && uid !== 0) {
        const parentId = `${id.split(':')[0]}:root`;
        (0, component_1.sendComponentTreeData)(appRecord, parentId, appRecord.componentFilter, null, false, ctx);
      }

      if (parentUid != null) {
        const parentInstances = await appRecord.backend.api.walkComponentParents(component);

        if (parentInstances.length) {
          // Check two parents level to update `hasChildren
          for (let i = 0; i < parentInstances.length; i++) {
            const parentId = await (0, component_1.getComponentId)(app, parentUid, parentInstances[i], ctx);

            if (i < 2 && (0, subscriptions_1.isSubscribed)(shared_utils_1.BridgeSubscriptions.COMPONENT_TREE, sub => sub.payload.instanceId === parentId)) {
              (0, shared_utils_1.raf)(() => {
                (0, component_1.sendComponentTreeData)(appRecord, parentId, appRecord.componentFilter, null, false, ctx);
              });
            }

            if (shared_utils_1.SharedData.trackUpdates) {
              await (0, component_1.sendComponentUpdateTracking)(parentId, ctx);
            }
          }
        }
      }

      if (ctx.currentInspectedComponentId === id) {
        await (0, component_1.sendSelectedComponentData)(appRecord, id, ctx);
      }

      if (shared_utils_1.SharedData.trackUpdates) {
        await (0, component_1.sendComponentUpdateTracking)(id, ctx);
      }

      if (shared_utils_1.SharedData.flashUpdates) {
        await (0, flash_js_1.flashComponent)(component, appRecord.backend);
      }

      await (0, component_1.refreshComponentTreeSearch)(ctx);
    } catch (e) {
      if (shared_utils_1.SharedData.debugInfo) {
        console.error(e);
      }
    }
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.COMPONENT_REMOVED, async (app, uid, parentUid, component) => {
    try {
      if (!app || typeof uid !== 'number' && !uid || !component) return;
      const appRecord = await (0, app_1.getAppRecord)(app, ctx);

      if (false) {}

      if (parentUid != null) {
        const parentInstances = await appRecord.backend.api.walkComponentParents(component);

        if (parentInstances.length) {
          const parentId = await (0, component_1.getComponentId)(app, parentUid, parentInstances[0], ctx);

          if ((0, subscriptions_1.isSubscribed)(shared_utils_1.BridgeSubscriptions.COMPONENT_TREE, sub => sub.payload.instanceId === parentId)) {
            (0, shared_utils_1.raf)(async () => {
              try {
                (0, component_1.sendComponentTreeData)(await (0, app_1.getAppRecord)(app, ctx), parentId, appRecord.componentFilter, null, false, ctx);
              } catch (e) {
                if (shared_utils_1.SharedData.debugInfo) {
                  console.error(e);
                }
              }
            });
          }
        }
      }

      const id = await (0, component_1.getComponentId)(app, uid, component, ctx);

      if ((0, subscriptions_1.isSubscribed)(shared_utils_1.BridgeSubscriptions.SELECTED_COMPONENT_DATA, sub => sub.payload.instanceId === id)) {
        await (0, component_1.sendEmptyComponentData)(id, ctx);
      }

      appRecord.instanceMap.delete(id);
      await (0, component_1.refreshComponentTreeSearch)(ctx);
    } catch (e) {
      if (shared_utils_1.SharedData.debugInfo) {
        console.error(e);
      }
    }
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.TRACK_UPDATE, (id, ctx) => {
    (0, component_1.sendComponentUpdateTracking)(id, ctx);
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.FLASH_UPDATE, (instance, backend) => {
    (0, flash_js_1.flashComponent)(instance, backend);
  }); // Component perf

  global_hook_1.hook.on(shared_utils_1.HookEvents.PERFORMANCE_START, async (app, uid, vm, type, time) => {
    await (0, perf_1.performanceMarkStart)(app, uid, vm, type, time, ctx);
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.PERFORMANCE_END, async (app, uid, vm, type, time) => {
    await (0, perf_1.performanceMarkEnd)(app, uid, vm, type, time, ctx);
  }); // Highlighter

  global_hook_1.hook.on(shared_utils_1.HookEvents.COMPONENT_HIGHLIGHT, async instanceId => {
    await (0, highlighter_1.highlight)(ctx.currentAppRecord.instanceMap.get(instanceId), ctx.currentAppRecord.backend, ctx);
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.COMPONENT_UNHIGHLIGHT, async () => {
    await (0, highlighter_1.unHighlight)();
  }); // Timeline

  (0, timeline_1.setupTimeline)(ctx);
  global_hook_1.hook.on(shared_utils_1.HookEvents.TIMELINE_LAYER_ADDED, async (options, plugin) => {
    const appRecord = await (0, app_1.getAppRecord)(plugin.descriptor.app, ctx);
    ctx.timelineLayers.push({ ...options,
      appRecord,
      plugin,
      events: []
    });
    ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_TIMELINE_LAYER_ADD, {});
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.TIMELINE_EVENT_ADDED, async (options, plugin) => {
    await (0, timeline_1.addTimelineEvent)(options, plugin.descriptor.app, ctx);
  }); // Custom inspectors

  global_hook_1.hook.on(shared_utils_1.HookEvents.CUSTOM_INSPECTOR_ADD, async (options, plugin) => {
    const appRecord = await (0, app_1.getAppRecord)(plugin.descriptor.app, ctx);
    ctx.customInspectors.push({ ...options,
      appRecord,
      plugin,
      treeFilter: '',
      selectedNodeId: null
    });
    ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_CUSTOM_INSPECTOR_ADD, {});
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.CUSTOM_INSPECTOR_SEND_TREE, async (inspectorId, plugin) => {
    const inspector = (0, inspector_1.getInspector)(inspectorId, plugin.descriptor.app, ctx);

    if (inspector) {
      await (0, inspector_1.sendInspectorTree)(inspector, ctx);
    } else if (shared_utils_1.SharedData.debugInfo) {
      console.warn(`Inspector ${inspectorId} not found`);
    }
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.CUSTOM_INSPECTOR_SEND_STATE, async (inspectorId, plugin) => {
    const inspector = (0, inspector_1.getInspector)(inspectorId, plugin.descriptor.app, ctx);

    if (inspector) {
      await (0, inspector_1.sendInspectorState)(inspector, ctx);
    } else if (shared_utils_1.SharedData.debugInfo) {
      console.warn(`Inspector ${inspectorId} not found`);
    }
  });
  global_hook_1.hook.on(shared_utils_1.HookEvents.CUSTOM_INSPECTOR_SELECT_NODE, async (inspectorId, nodeId, plugin) => {
    const inspector = (0, inspector_1.getInspector)(inspectorId, plugin.descriptor.app, ctx);

    if (inspector) {
      await (0, inspector_1.selectInspectorNode)(inspector, nodeId, ctx);
    } else if (shared_utils_1.SharedData.debugInfo) {
      console.warn(`Inspector ${inspectorId} not found`);
    }
  }); // Plugins

  try {
    await (0, plugin_1.addPreviouslyRegisteredPlugins)(ctx);
  } catch (e) {
    console.error(`Error adding previously registered plugins:`);
    console.error(e);
  }

  try {
    await (0, plugin_1.addQueuedPlugins)(ctx);
  } catch (e) {
    console.error(`Error adding queued plugins:`);
    console.error(e);
  }

  global_hook_1.hook.on(shared_utils_1.HookEvents.SETUP_DEVTOOLS_PLUGIN, async (pluginDescriptor, setupFn) => {
    await (0, plugin_1.addPlugin)({
      pluginDescriptor,
      setupFn
    }, ctx);
  });
  shared_utils_1.target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ = true; // Legacy flush

  const handleFlush = (0, debounce_1.default)(async () => {
    var _a;

    if ((_a = ctx.currentAppRecord) === null || _a === void 0 ? void 0 : _a.backend.options.features.includes(app_backend_api_1.BuiltinBackendFeature.FLUSH)) {
      await (0, component_1.sendComponentTreeData)(ctx.currentAppRecord, '_root', ctx.currentAppRecord.componentFilter, null, false, ctx);

      if (ctx.currentInspectedComponentId) {
        await (0, component_1.sendSelectedComponentData)(ctx.currentAppRecord, ctx.currentInspectedComponentId, ctx);
      }
    }
  }, 500);
  global_hook_1.hook.off(shared_utils_1.HookEvents.FLUSH);
  global_hook_1.hook.on(shared_utils_1.HookEvents.FLUSH, handleFlush); // Connect done

  try {
    await (0, timeline_marker_1.addTimelineMarker)({
      id: 'vue-devtools-init-backend',
      time: (0, devtools_api_1.now)(),
      label: 'Vue Devtools connected',
      color: 0x41B883,
      all: true
    }, ctx);
  } catch (e) {
    console.error(`Error while adding devtools connected timeline marker:`);
    console.error(e);
  }
}

function connectBridge() {
  // Subscriptions
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_SUBSCRIBE, ({
    type,
    payload
  }) => {
    (0, subscriptions_1.subscribe)(type, payload);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_UNSUBSCRIBE, ({
    type,
    payload
  }) => {
    (0, subscriptions_1.unsubscribe)(type, payload);
  }); // Tabs

  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_TAB_SWITCH, async tab => {
    ctx.currentTab = tab;
    await (0, highlighter_1.unHighlight)();
  }); // Apps

  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_APP_LIST, async () => {
    await (0, app_1.sendApps)(ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_APP_SELECT, async id => {
    if (id == null) return;
    const record = ctx.appRecords.find(r => r.id === id);

    if (record) {
      await (0, app_1.selectApp)(record, ctx);
    } else if (shared_utils_1.SharedData.debugInfo) {
      console.warn(`App with id ${id} not found`);
    }
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_SCAN_LEGACY_APPS, () => {
    if (global_hook_1.hook.Vue) {
      (0, app_1._legacy_getAndRegisterApps)(ctx);
    }
  }); // Components

  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_TREE, async ({
    instanceId,
    filter,
    recursively
  }) => {
    ctx.currentAppRecord.componentFilter = filter;
    (0, subscriptions_1.subscribe)(shared_utils_1.BridgeSubscriptions.COMPONENT_TREE, {
      instanceId
    });
    await (0, component_1.sendComponentTreeData)(ctx.currentAppRecord, instanceId, filter, null, recursively, ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_SELECTED_DATA, async instanceId => {
    await (0, component_1.sendSelectedComponentData)(ctx.currentAppRecord, instanceId, ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_EDIT_STATE, async ({
    instanceId,
    dotPath,
    type,
    value,
    newKey,
    remove
  }) => {
    await (0, component_1.editComponentState)(instanceId, dotPath, type, {
      value,
      newKey,
      remove
    }, ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_INSPECT_DOM, async ({
    instanceId
  }) => {
    const instance = (0, component_1.getComponentInstance)(ctx.currentAppRecord, instanceId, ctx);

    if (instance) {
      const [el] = await ctx.currentAppRecord.backend.api.getComponentRootElements(instance);

      if (el) {
        // @ts-ignore
        shared_utils_1.target.__VUE_DEVTOOLS_INSPECT_TARGET__ = el;
        ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_COMPONENT_INSPECT_DOM, null);
      }
    }
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_SCROLL_TO, async ({
    instanceId
  }) => {
    if (!shared_utils_1.isBrowser) return;
    const instance = (0, component_1.getComponentInstance)(ctx.currentAppRecord, instanceId, ctx);

    if (instance) {
      const [el] = await ctx.currentAppRecord.backend.api.getComponentRootElements(instance);

      if (el) {
        if (typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        } else {
          // Handle nodes that don't implement scrollIntoView
          const bounds = await ctx.currentAppRecord.backend.api.getComponentBounds(instance);
          const scrollTarget = document.createElement('div');
          scrollTarget.style.position = 'absolute';
          scrollTarget.style.width = `${bounds.width}px`;
          scrollTarget.style.height = `${bounds.height}px`;
          scrollTarget.style.top = `${bounds.top}px`;
          scrollTarget.style.left = `${bounds.left}px`;
          document.body.appendChild(scrollTarget);
          scrollTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
          setTimeout(() => {
            document.body.removeChild(scrollTarget);
          }, 2000);
        }

        (0, highlighter_1.highlight)(instance, ctx.currentAppRecord.backend, ctx);
        setTimeout(() => {
          (0, highlighter_1.unHighlight)();
        }, 2000);
      }
    }
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_RENDER_CODE, async ({
    instanceId
  }) => {
    if (!shared_utils_1.isBrowser) return;
    const instance = (0, component_1.getComponentInstance)(ctx.currentAppRecord, instanceId, ctx);

    if (instance) {
      const {
        code
      } = await ctx.currentAppRecord.backend.api.getComponentRenderCode(instance);
      ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_COMPONENT_RENDER_CODE, {
        instanceId,
        code
      });
    }
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_CUSTOM_STATE_ACTION, async ({
    value,
    actionIndex
  }) => {
    const rawAction = value._custom.actions[actionIndex];
    const action = (0, shared_utils_1.revive)(rawAction === null || rawAction === void 0 ? void 0 : rawAction.action);

    if (action) {
      try {
        await action();
      } catch (e) {
        console.error(e);
      }
    } else {
      console.warn(`Couldn't revive action ${actionIndex} from`, value);
    }
  }); // Highlighter

  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_MOUSE_OVER, async instanceId => {
    await (0, highlighter_1.highlight)(ctx.currentAppRecord.instanceMap.get(instanceId), ctx.currentAppRecord.backend, ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_MOUSE_OUT, async () => {
    await (0, highlighter_1.unHighlight)();
  }); // Component picker

  const componentPicker = new component_pick_1.default(ctx);
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_PICK, () => {
    componentPicker.startSelecting();
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_COMPONENT_PICK_CANCELED, () => {
    componentPicker.stopSelecting();
  }); // Timeline

  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_TIMELINE_LAYER_LIST, async () => {
    await (0, timeline_1.sendTimelineLayers)(ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_TIMELINE_SHOW_SCREENSHOT, async ({
    screenshot
  }) => {
    await (0, timeline_screenshot_1.showScreenshot)(screenshot, ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_TIMELINE_CLEAR, async () => {
    await (0, timeline_1.clearTimeline)(ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_TIMELINE_EVENT_DATA, async ({
    id
  }) => {
    await (0, timeline_1.sendTimelineEventData)(id, ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_TIMELINE_LAYER_LOAD_EVENTS, async ({
    appId,
    layerId
  }) => {
    await (0, timeline_1.sendTimelineLayerEvents)(appId, layerId, ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_TIMELINE_LOAD_MARKERS, async () => {
    await (0, timeline_marker_1.sendTimelineMarkers)(ctx);
  }); // Custom inspectors

  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_LIST, async () => {
    await (0, inspector_1.sendCustomInspectors)(ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_TREE, async ({
    inspectorId,
    appId,
    treeFilter
  }) => {
    const inspector = await (0, inspector_1.getInspectorWithAppId)(inspectorId, appId, ctx);

    if (inspector) {
      inspector.treeFilter = treeFilter;
      (0, inspector_1.sendInspectorTree)(inspector, ctx);
    } else if (shared_utils_1.SharedData.debugInfo) {
      console.warn(`Inspector ${inspectorId} not found`);
    }
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_STATE, async ({
    inspectorId,
    appId,
    nodeId
  }) => {
    const inspector = await (0, inspector_1.getInspectorWithAppId)(inspectorId, appId, ctx);

    if (inspector) {
      inspector.selectedNodeId = nodeId;
      (0, inspector_1.sendInspectorState)(inspector, ctx);
    } else if (shared_utils_1.SharedData.debugInfo) {
      console.warn(`Inspector ${inspectorId} not found`);
    }
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_EDIT_STATE, async ({
    inspectorId,
    appId,
    nodeId,
    path,
    type,
    payload
  }) => {
    const inspector = await (0, inspector_1.getInspectorWithAppId)(inspectorId, appId, ctx);

    if (inspector) {
      await (0, inspector_1.editInspectorState)(inspector, nodeId, path, type, payload, ctx);
      inspector.selectedNodeId = nodeId;
      await (0, inspector_1.sendInspectorState)(inspector, ctx);
    } else if (shared_utils_1.SharedData.debugInfo) {
      console.warn(`Inspector ${inspectorId} not found`);
    }
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_CUSTOM_INSPECTOR_ACTION, async ({
    inspectorId,
    appId,
    actionIndex,
    actionType,
    args
  }) => {
    const inspector = await (0, inspector_1.getInspectorWithAppId)(inspectorId, appId, ctx);

    if (inspector) {
      const action = inspector[actionType !== null && actionType !== void 0 ? actionType : 'actions'][actionIndex];

      try {
        await action.action(...(args !== null && args !== void 0 ? args : []));
      } catch (e) {
        if (shared_utils_1.SharedData.debugInfo) {
          console.error(e);
        }
      }
    } else if (shared_utils_1.SharedData.debugInfo) {
      console.warn(`Inspector ${inspectorId} not found`);
    }
  }); // Misc

  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_LOG, payload => {
    let value = payload.value;

    if (payload.serialized) {
      value = (0, shared_utils_1.parse)(value, payload.revive);
    } else if (payload.revive) {
      value = (0, shared_utils_1.revive)(value);
    } // eslint-disable-next-line no-console


    console[payload.level](value);
  }); // Plugins

  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_DEVTOOLS_PLUGIN_LIST, async () => {
    await (0, plugin_1.sendPluginList)(ctx);
  });
  ctx.bridge.on(shared_utils_1.BridgeEvents.TO_BACK_DEVTOOLS_PLUGIN_SETTING_UPDATED, ({
    pluginId,
    key,
    newValue,
    oldValue
  }) => {
    const settings = (0, shared_utils_1.getPluginSettings)(pluginId);
    ctx.hook.emit(shared_utils_1.HookEvents.PLUGIN_SETTINGS_SET, pluginId, settings);
    ctx.currentAppRecord.backend.api.callHook("setPluginSettings"
    /* Hooks.SET_PLUGIN_SETTINGS */
    , {
      app: ctx.currentAppRecord.options.app,
      pluginId,
      key,
      newValue,
      oldValue,
      settings
    });
  });

  if (false) {}
}

let pageTitleObserver;

/***/ }),

/***/ "../app-backend-core/lib/inspector.js":
/*!********************************************!*\
  !*** ../app-backend-core/lib/inspector.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.selectInspectorNode = exports.sendCustomInspectors = exports.editInspectorState = exports.sendInspectorState = exports.sendInspectorTree = exports.getInspectorWithAppId = exports.getInspector = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

function getInspector(inspectorId, app, ctx) {
  return ctx.customInspectors.find(i => i.id === inspectorId && i.appRecord.options.app === app);
}

exports.getInspector = getInspector;

async function getInspectorWithAppId(inspectorId, appId, ctx) {
  for (const i of ctx.customInspectors) {
    if (i.id === inspectorId && i.appRecord.id === appId) {
      return i;
    }
  }

  return null;
}

exports.getInspectorWithAppId = getInspectorWithAppId;

async function sendInspectorTree(inspector, ctx) {
  const rootNodes = await inspector.appRecord.backend.api.getInspectorTree(inspector.id, inspector.appRecord.options.app, inspector.treeFilter);
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_CUSTOM_INSPECTOR_TREE, {
    appId: inspector.appRecord.id,
    inspectorId: inspector.id,
    rootNodes
  });
}

exports.sendInspectorTree = sendInspectorTree;

async function sendInspectorState(inspector, ctx) {
  const state = inspector.selectedNodeId ? await inspector.appRecord.backend.api.getInspectorState(inspector.id, inspector.appRecord.options.app, inspector.selectedNodeId) : null;
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_CUSTOM_INSPECTOR_STATE, {
    appId: inspector.appRecord.id,
    inspectorId: inspector.id,
    state: (0, shared_utils_1.stringify)(state)
  });
}

exports.sendInspectorState = sendInspectorState;

async function editInspectorState(inspector, nodeId, dotPath, type, state, ctx) {
  await inspector.appRecord.backend.api.editInspectorState(inspector.id, inspector.appRecord.options.app, nodeId, dotPath, type, { ...state,
    value: state.value != null ? (0, shared_utils_1.parse)(state.value, true) : state.value
  });
}

exports.editInspectorState = editInspectorState;

async function sendCustomInspectors(ctx) {
  var _a, _b;

  const inspectors = [];

  for (const i of ctx.customInspectors) {
    inspectors.push({
      id: i.id,
      appId: i.appRecord.id,
      pluginId: i.plugin.descriptor.id,
      label: i.label,
      icon: i.icon,
      treeFilterPlaceholder: i.treeFilterPlaceholder,
      stateFilterPlaceholder: i.stateFilterPlaceholder,
      noSelectionText: i.noSelectionText,
      actions: (_a = i.actions) === null || _a === void 0 ? void 0 : _a.map(a => ({
        icon: a.icon,
        tooltip: a.tooltip
      })),
      nodeActions: (_b = i.nodeActions) === null || _b === void 0 ? void 0 : _b.map(a => ({
        icon: a.icon,
        tooltip: a.tooltip
      }))
    });
  }

  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_CUSTOM_INSPECTOR_LIST, {
    inspectors
  });
}

exports.sendCustomInspectors = sendCustomInspectors;

async function selectInspectorNode(inspector, nodeId, ctx) {
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_CUSTOM_INSPECTOR_SELECT_NODE, {
    appId: inspector.appRecord.id,
    inspectorId: inspector.id,
    nodeId
  });
}

exports.selectInspectorNode = selectInspectorNode;

/***/ }),

/***/ "../app-backend-core/lib/legacy/scan.js":
/*!**********************************************!*\
  !*** ../app-backend-core/lib/legacy/scan.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.scan = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const page_config_1 = __webpack_require__(/*! ../page-config */ "../app-backend-core/lib/page-config.js");

const rootInstances = [];
/**
 * Scan the page for root level Vue instances.
 */

function scan() {
  rootInstances.length = 0;
  let inFragment = false;
  let currentFragment = null; // eslint-disable-next-line no-inner-declarations

  function processInstance(instance) {
    if (instance) {
      if (rootInstances.indexOf(instance.$root) === -1) {
        instance = instance.$root;
      }

      if (instance._isFragment) {
        inFragment = true;
        currentFragment = instance;
      } // respect Vue.config.devtools option


      let baseVue = instance.constructor;

      while (baseVue.super) {
        baseVue = baseVue.super;
      }

      if (baseVue.config && baseVue.config.devtools) {
        rootInstances.push(instance);
      }

      return true;
    }
  }

  if (shared_utils_1.isBrowser) {
    const walkDocument = document => {
      walk(document, function (node) {
        if (inFragment) {
          if (node === currentFragment._fragmentEnd) {
            inFragment = false;
            currentFragment = null;
          }

          return true;
        }

        const instance = node.__vue__;
        return processInstance(instance);
      });
    };

    walkDocument(document);
    const iframes = document.querySelectorAll('iframe');

    for (const iframe of iframes) {
      try {
        walkDocument(iframe.contentDocument);
      } catch (e) {// Ignore
      }
    } // Scan for Vue instances in the customTarget elements


    const {
      customVue2ScanSelector
    } = (0, page_config_1.getPageConfig)();
    const customTargets = customVue2ScanSelector ? document.querySelectorAll(customVue2ScanSelector) : [];

    for (const customTarget of customTargets) {
      try {
        walkDocument(customTarget);
      } catch (e) {// Ignore
      }
    }
  } else {
    if (Array.isArray(shared_utils_1.target.__VUE_ROOT_INSTANCES__)) {
      shared_utils_1.target.__VUE_ROOT_INSTANCES__.map(processInstance);
    }
  }

  return rootInstances;
}

exports.scan = scan;
/**
 * DOM walk helper
 *
 * @param {NodeList} nodes
 * @param {Function} fn
 */

function walk(node, fn) {
  if (node.childNodes) {
    for (let i = 0, l = node.childNodes.length; i < l; i++) {
      const child = node.childNodes[i];
      const stop = fn(child);

      if (!stop) {
        walk(child, fn);
      }
    }
  } // also walk shadow DOM


  if (node.shadowRoot) {
    walk(node.shadowRoot, fn);
  }
}

/***/ }),

/***/ "../app-backend-core/lib/page-config.js":
/*!**********************************************!*\
  !*** ../app-backend-core/lib/page-config.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.initOnPageConfig = exports.getPageConfig = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

let config = {};

function getPageConfig() {
  return config;
}

exports.getPageConfig = getPageConfig;

function initOnPageConfig() {
  // User project devtools config
  if (Object.hasOwnProperty.call(shared_utils_1.target, 'VUE_DEVTOOLS_CONFIG')) {
    config = shared_utils_1.SharedData.pageConfig = shared_utils_1.target.VUE_DEVTOOLS_CONFIG; // Open in editor

    if (Object.hasOwnProperty.call(config, 'openInEditorHost')) {
      shared_utils_1.SharedData.openInEditorHost = config.openInEditorHost;
    }
  }
}

exports.initOnPageConfig = initOnPageConfig;

/***/ }),

/***/ "../app-backend-core/lib/perf.js":
/*!***************************************!*\
  !*** ../app-backend-core/lib/perf.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.handleAddPerformanceTag = exports.performanceMarkEnd = exports.performanceMarkStart = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const timeline_1 = __webpack_require__(/*! ./timeline */ "../app-backend-core/lib/timeline.js");

const app_1 = __webpack_require__(/*! ./app */ "../app-backend-core/lib/app.js");

const component_1 = __webpack_require__(/*! ./component */ "../app-backend-core/lib/component.js");

const subscriptions_1 = __webpack_require__(/*! ./util/subscriptions */ "../app-backend-core/lib/util/subscriptions.js");

async function performanceMarkStart(app, uid, instance, type, time, ctx) {
  try {
    if (!shared_utils_1.SharedData.performanceMonitoringEnabled) return;
    const appRecord = await (0, app_1.getAppRecord)(app, ctx);
    const componentName = await appRecord.backend.api.getComponentName(instance);
    const groupId = ctx.perfUniqueGroupId++;
    const groupKey = `${uid}-${type}`;
    appRecord.perfGroupIds.set(groupKey, {
      groupId,
      time
    });
    await (0, timeline_1.addTimelineEvent)({
      layerId: 'performance',
      event: {
        time,
        data: {
          component: componentName,
          type,
          measure: 'start'
        },
        title: componentName,
        subtitle: type,
        groupId
      }
    }, app, ctx);

    if (markEndQueue.has(groupKey)) {
      const {
        app,
        uid,
        instance,
        type,
        time
      } = markEndQueue.get(groupKey);
      markEndQueue.delete(groupKey);
      await performanceMarkEnd(app, uid, instance, type, time, ctx);
    }
  } catch (e) {
    if (shared_utils_1.SharedData.debugInfo) {
      console.error(e);
    }
  }
}

exports.performanceMarkStart = performanceMarkStart;
const markEndQueue = new Map();

async function performanceMarkEnd(app, uid, instance, type, time, ctx) {
  try {
    if (!shared_utils_1.SharedData.performanceMonitoringEnabled) return;
    const appRecord = await (0, app_1.getAppRecord)(app, ctx);
    const componentName = await appRecord.backend.api.getComponentName(instance);
    const groupKey = `${uid}-${type}`;
    const groupInfo = appRecord.perfGroupIds.get(groupKey);

    if (!groupInfo) {
      markEndQueue.set(groupKey, {
        app,
        uid,
        instance,
        type,
        time
      });
      return;
    }

    const {
      groupId,
      time: startTime
    } = groupInfo;
    const duration = time - startTime;
    await (0, timeline_1.addTimelineEvent)({
      layerId: 'performance',
      event: {
        time,
        data: {
          component: componentName,
          type,
          measure: 'end',
          duration: {
            _custom: {
              type: 'Duration',
              value: duration,
              display: `${duration} ms`
            }
          }
        },
        title: componentName,
        subtitle: type,
        groupId
      }
    }, app, ctx); // Mark on component

    const tooSlow = duration > 10;

    if (tooSlow || instance.__VUE_DEVTOOLS_SLOW__) {
      let change = false;

      if (tooSlow && !instance.__VUE_DEVTOOLS_SLOW__) {
        instance.__VUE_DEVTOOLS_SLOW__ = {
          duration: null,
          measures: {}
        };
      }

      const data = instance.__VUE_DEVTOOLS_SLOW__;

      if (tooSlow && (data.duration == null || data.duration < duration)) {
        data.duration = duration;
        change = true;
      }

      if (data.measures[type] == null || data.measures[type] < duration) {
        data.measures[type] = duration;
        change = true;
      }

      if (change) {
        // Update component tree
        const id = await (0, component_1.getComponentId)(app, uid, instance, ctx);

        if ((0, subscriptions_1.isSubscribed)(shared_utils_1.BridgeSubscriptions.COMPONENT_TREE, sub => sub.payload.instanceId === id)) {
          (0, shared_utils_1.raf)(() => {
            (0, component_1.sendComponentTreeData)(appRecord, id, ctx.currentAppRecord.componentFilter, null, false, ctx);
          });
        }
      }
    }
  } catch (e) {
    if (shared_utils_1.SharedData.debugInfo) {
      console.error(e);
    }
  }
}

exports.performanceMarkEnd = performanceMarkEnd;

function handleAddPerformanceTag(backend, ctx) {
  backend.api.on.visitComponentTree(payload => {
    if (payload.componentInstance.__VUE_DEVTOOLS_SLOW__) {
      const {
        duration,
        measures
      } = payload.componentInstance.__VUE_DEVTOOLS_SLOW__;
      let tooltip = '<div class="grid grid-cols-2 gap-2 font-mono text-xs">';

      for (const type in measures) {
        const d = measures[type];
        tooltip += `<div>${type}</div><div class="text-right text-black rounded px-1 ${d > 30 ? 'bg-red-400' : d > 10 ? 'bg-yellow-400' : 'bg-green-400'}">${Math.round(d * 1000) / 1000} ms</div>`;
      }

      tooltip += '</div>';
      payload.treeNode.tags.push({
        backgroundColor: duration > 30 ? 0xF87171 : 0xFBBF24,
        textColor: 0x000000,
        label: `${Math.round(duration * 1000) / 1000} ms`,
        tooltip
      });
    }
  });
}

exports.handleAddPerformanceTag = handleAddPerformanceTag;

/***/ }),

/***/ "../app-backend-core/lib/plugin.js":
/*!*****************************************!*\
  !*** ../app-backend-core/lib/plugin.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.serializePlugin = exports.sendPluginList = exports.addPreviouslyRegisteredPlugins = exports.addQueuedPlugins = exports.addPlugin = void 0;

const app_backend_api_1 = __webpack_require__(/*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js");

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const app_1 = __webpack_require__(/*! ./app */ "../app-backend-core/lib/app.js");

async function addPlugin(pluginQueueItem, ctx) {
  const {
    pluginDescriptor,
    setupFn
  } = pluginQueueItem;
  const plugin = {
    descriptor: pluginDescriptor,
    setupFn,
    error: null
  };
  ctx.currentPlugin = plugin;

  try {
    const appRecord = await (0, app_1.getAppRecord)(plugin.descriptor.app, ctx);
    const api = new app_backend_api_1.DevtoolsPluginApiInstance(plugin, appRecord, ctx);

    if (pluginQueueItem.proxy) {
      await pluginQueueItem.proxy.setRealTarget(api);
    } else {
      setupFn(api);
    }
  } catch (e) {
    plugin.error = e;

    if (shared_utils_1.SharedData.debugInfo) {
      console.error(e);
    }
  }

  ctx.currentPlugin = null;
  ctx.plugins.push(plugin);
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_DEVTOOLS_PLUGIN_ADD, {
    plugin: await serializePlugin(plugin)
  });
  const targetList = shared_utils_1.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__ = shared_utils_1.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__ || [];
  targetList.push({
    pluginDescriptor,
    setupFn
  });
}

exports.addPlugin = addPlugin;

async function addQueuedPlugins(ctx) {
  if (shared_utils_1.target.__VUE_DEVTOOLS_PLUGINS__ && Array.isArray(shared_utils_1.target.__VUE_DEVTOOLS_PLUGINS__)) {
    for (const queueItem of shared_utils_1.target.__VUE_DEVTOOLS_PLUGINS__) {
      await addPlugin(queueItem, ctx);
    }

    shared_utils_1.target.__VUE_DEVTOOLS_PLUGINS__ = null;
  }
}

exports.addQueuedPlugins = addQueuedPlugins;

async function addPreviouslyRegisteredPlugins(ctx) {
  if (shared_utils_1.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__ && Array.isArray(shared_utils_1.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__)) {
    for (const queueItem of shared_utils_1.target.__VUE_DEVTOOLS_REGISTERED_PLUGINS__) {
      await addPlugin(queueItem, ctx);
    }
  }
}

exports.addPreviouslyRegisteredPlugins = addPreviouslyRegisteredPlugins;

async function sendPluginList(ctx) {
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_DEVTOOLS_PLUGIN_LIST, {
    plugins: await Promise.all(ctx.plugins.map(p => serializePlugin(p)))
  });
}

exports.sendPluginList = sendPluginList;

async function serializePlugin(plugin) {
  return {
    id: plugin.descriptor.id,
    label: plugin.descriptor.label,
    appId: (0, app_1.getAppRecordId)(plugin.descriptor.app),
    packageName: plugin.descriptor.packageName,
    homepage: plugin.descriptor.homepage,
    logo: plugin.descriptor.logo,
    componentStateTypes: plugin.descriptor.componentStateTypes,
    settingsSchema: plugin.descriptor.settings
  };
}

exports.serializePlugin = serializePlugin;

/***/ }),

/***/ "../app-backend-core/lib/timeline-builtins.js":
/*!****************************************************!*\
  !*** ../app-backend-core/lib/timeline-builtins.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.builtinLayers = void 0;
exports.builtinLayers = [{
  id: 'mouse',
  label: 'Mouse',
  color: 0xA451AF,

  screenshotOverlayRender(event, {
    events
  }) {
    const samePositionEvent = events.find(e => e !== event && e.renderMeta.textEl && e.data.x === event.data.x && e.data.y === event.data.y);

    if (samePositionEvent) {
      const text = document.createElement('div');
      text.innerText = event.data.type;
      samePositionEvent.renderMeta.textEl.appendChild(text);
      return false;
    }

    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = `${event.data.x - 4}px`;
    div.style.top = `${event.data.y - 4}px`;
    div.style.width = '8px';
    div.style.height = '8px';
    div.style.borderRadius = '100%';
    div.style.backgroundColor = 'rgba(164, 81, 175, 0.5)';
    const text = document.createElement('div');
    text.innerText = event.data.type;
    text.style.color = '#541e5b';
    text.style.fontFamily = 'monospace';
    text.style.fontSize = '9px';
    text.style.position = 'absolute';
    text.style.left = '10px';
    text.style.top = '10px';
    text.style.padding = '1px';
    text.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    text.style.borderRadius = '3px';
    div.appendChild(text);
    event.renderMeta.textEl = text;
    return div;
  }

}, {
  id: 'keyboard',
  label: 'Keyboard',
  color: 0x8151AF
}, {
  id: 'component-event',
  label: 'Component events',
  color: 0x41B883,
  screenshotOverlayRender: (event, {
    events
  }) => {
    if (!event.meta.bounds || events.some(e => e !== event && e.layerId === event.layerId && e.renderMeta.drawn && (e.meta.componentId === event.meta.componentId || e.meta.bounds.left === event.meta.bounds.left && e.meta.bounds.top === event.meta.bounds.top && e.meta.bounds.width === event.meta.bounds.width && e.meta.bounds.height === event.meta.bounds.height))) {
      return false;
    }

    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = `${event.meta.bounds.left - 4}px`;
    div.style.top = `${event.meta.bounds.top - 4}px`;
    div.style.width = `${event.meta.bounds.width}px`;
    div.style.height = `${event.meta.bounds.height}px`;
    div.style.borderRadius = '8px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '4px';
    div.style.borderColor = 'rgba(65, 184, 131, 0.5)';
    div.style.textAlign = 'center';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.overflow = 'hidden';
    const text = document.createElement('div');
    text.style.color = '#267753';
    text.style.fontFamily = 'monospace';
    text.style.fontSize = '9px';
    text.style.padding = '1px';
    text.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    text.style.borderRadius = '3px';
    text.innerText = event.data.event;
    div.appendChild(text);
    event.renderMeta.drawn = true;
    return div;
  }
}, {
  id: 'performance',
  label: 'Performance',
  color: 0x41b86a,
  groupsOnly: true,
  skipScreenshots: true,
  ignoreNoDurationGroups: true
}];

/***/ }),

/***/ "../app-backend-core/lib/timeline-marker.js":
/*!**************************************************!*\
  !*** ../app-backend-core/lib/timeline-marker.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.sendTimelineMarkers = exports.addTimelineMarker = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const devtools_api_1 = __webpack_require__(/*! @vue/devtools-api */ "../api/lib/esm/index.js");

const timeline_1 = __webpack_require__(/*! ./timeline */ "../app-backend-core/lib/timeline.js");

async function addTimelineMarker(options, ctx) {
  var _a;

  if (!ctx.currentAppRecord) {
    options.all = true;
  }

  const marker = { ...options,
    appRecord: options.all ? null : ctx.currentAppRecord
  };
  ctx.timelineMarkers.push(marker);
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_TIMELINE_MARKER, {
    marker: await serializeMarker(marker),
    appId: (_a = ctx.currentAppRecord) === null || _a === void 0 ? void 0 : _a.id
  });
}

exports.addTimelineMarker = addTimelineMarker;

async function sendTimelineMarkers(ctx) {
  if (!ctx.currentAppRecord) return;
  const markers = ctx.timelineMarkers.filter(marker => marker.all || marker.appRecord === ctx.currentAppRecord);
  const result = [];

  for (const marker of markers) {
    result.push(await serializeMarker(marker));
  }

  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_TIMELINE_LOAD_MARKERS, {
    markers: result,
    appId: ctx.currentAppRecord.id
  });
}

exports.sendTimelineMarkers = sendTimelineMarkers;

async function serializeMarker(marker) {
  var _a;

  let time = marker.time;

  if ((0, devtools_api_1.isPerformanceSupported)() && time < timeline_1.dateThreshold) {
    time += timeline_1.perfTimeDiff;
  }

  return {
    id: marker.id,
    appId: (_a = marker.appRecord) === null || _a === void 0 ? void 0 : _a.id,
    all: marker.all,
    time: Math.round(time * 1000),
    label: marker.label,
    color: marker.color
  };
}

/***/ }),

/***/ "../app-backend-core/lib/timeline-screenshot.js":
/*!******************************************************!*\
  !*** ../app-backend-core/lib/timeline-screenshot.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.showScreenshot = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const queue_1 = __webpack_require__(/*! ./util/queue */ "../app-backend-core/lib/util/queue.js");

const timeline_builtins_1 = __webpack_require__(/*! ./timeline-builtins */ "../app-backend-core/lib/timeline-builtins.js");

let overlay;
let image;
let container;
const jobQueue = new queue_1.JobQueue();

async function showScreenshot(screenshot, ctx) {
  await jobQueue.queue('showScreenshot', async () => {
    if (screenshot) {
      if (!container) {
        createElements();
      }

      image.src = screenshot.image;
      image.style.visibility = screenshot.image ? 'visible' : 'hidden';
      clearContent();
      const events = screenshot.events.map(id => ctx.timelineEventMap.get(id)).filter(Boolean).map(eventData => ({
        layer: timeline_builtins_1.builtinLayers.concat(ctx.timelineLayers).find(layer => layer.id === eventData.layerId),
        event: { ...eventData.event,
          layerId: eventData.layerId,
          renderMeta: {}
        }
      }));
      const renderContext = {
        screenshot,
        events: events.map(({
          event
        }) => event),
        index: 0
      };

      for (let i = 0; i < events.length; i++) {
        const {
          layer,
          event
        } = events[i];

        if (layer.screenshotOverlayRender) {
          renderContext.index = i;

          try {
            const result = await layer.screenshotOverlayRender(event, renderContext);

            if (result !== false) {
              if (typeof result === 'string') {
                container.innerHTML += result;
              } else {
                container.appendChild(result);
              }
            }
          } catch (e) {
            if (shared_utils_1.SharedData.debugInfo) {
              console.error(e);
            }
          }
        }
      }

      showElement();
    } else {
      hideElement();
    }
  });
}

exports.showScreenshot = showScreenshot;

function createElements() {
  overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.zIndex = '9999999999999';
  overlay.style.pointerEvents = 'none';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  overlay.style.overflow = 'hidden';
  const imageBox = document.createElement('div');
  imageBox.style.position = 'relative';
  overlay.appendChild(imageBox);
  image = document.createElement('img');
  imageBox.appendChild(image);
  container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '0';
  container.style.top = '0';
  imageBox.appendChild(container);
  const style = document.createElement('style');
  style.innerHTML = '.__vuedevtools_no-scroll { overflow: hidden; }';
  document.head.appendChild(style);
}

function showElement() {
  if (!overlay.parentNode) {
    document.body.appendChild(overlay);
    document.body.classList.add('__vuedevtools_no-scroll');
  }
}

function hideElement() {
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
    document.body.classList.remove('__vuedevtools_no-scroll');
    clearContent();
  }
}

function clearContent() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

/***/ }),

/***/ "../app-backend-core/lib/timeline.js":
/*!*******************************************!*\
  !*** ../app-backend-core/lib/timeline.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.sendTimelineLayerEvents = exports.removeLayersForApp = exports.sendTimelineEventData = exports.clearTimeline = exports.perfTimeDiff = exports.dateThreshold = exports.addTimelineEvent = exports.sendTimelineLayers = exports.addBuiltinLayers = exports.setupTimeline = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const devtools_api_1 = __webpack_require__(/*! @vue/devtools-api */ "../api/lib/esm/index.js");

const global_hook_1 = __webpack_require__(/*! ./global-hook */ "../app-backend-core/lib/global-hook.js");

const app_1 = __webpack_require__(/*! ./app */ "../app-backend-core/lib/app.js");

const timeline_builtins_1 = __webpack_require__(/*! ./timeline-builtins */ "../app-backend-core/lib/timeline-builtins.js");

function setupTimeline(ctx) {
  setupBuiltinLayers(ctx);
}

exports.setupTimeline = setupTimeline;

function addBuiltinLayers(appRecord, ctx) {
  for (const layerDef of timeline_builtins_1.builtinLayers) {
    ctx.timelineLayers.push({ ...layerDef,
      appRecord,
      plugin: null,
      events: []
    });
  }
}

exports.addBuiltinLayers = addBuiltinLayers;

function setupBuiltinLayers(ctx) {
  if (shared_utils_1.isBrowser) {
    ['mousedown', 'mouseup', 'click', 'dblclick'].forEach(eventType => {
      // @ts-ignore
      window.addEventListener(eventType, async event => {
        await addTimelineEvent({
          layerId: 'mouse',
          event: {
            time: (0, devtools_api_1.now)(),
            data: {
              type: eventType,
              x: event.clientX,
              y: event.clientY
            },
            title: eventType
          }
        }, null, ctx);
      }, {
        capture: true,
        passive: true
      });
    });
    ['keyup', 'keydown', 'keypress'].forEach(eventType => {
      // @ts-ignore
      window.addEventListener(eventType, async event => {
        await addTimelineEvent({
          layerId: 'keyboard',
          event: {
            time: (0, devtools_api_1.now)(),
            data: {
              type: eventType,
              key: event.key,
              ctrlKey: event.ctrlKey,
              shiftKey: event.shiftKey,
              altKey: event.altKey,
              metaKey: event.metaKey
            },
            title: event.key
          }
        }, null, ctx);
      }, {
        capture: true,
        passive: true
      });
    });
  }

  global_hook_1.hook.on(shared_utils_1.HookEvents.COMPONENT_EMIT, async (app, instance, event, params) => {
    try {
      if (!shared_utils_1.SharedData.componentEventsEnabled) return;
      const appRecord = await (0, app_1.getAppRecord)(app, ctx);
      const componentId = `${appRecord.id}:${instance.uid}`;
      const componentDisplay = (await appRecord.backend.api.getComponentName(instance)) || '<i>Unknown Component</i>';
      await addTimelineEvent({
        layerId: 'component-event',
        event: {
          time: (0, devtools_api_1.now)(),
          data: {
            component: {
              _custom: {
                type: 'component-definition',
                display: componentDisplay
              }
            },
            event,
            params
          },
          title: event,
          subtitle: `by ${componentDisplay}`,
          meta: {
            componentId,
            bounds: await appRecord.backend.api.getComponentBounds(instance)
          }
        }
      }, app, ctx);
    } catch (e) {
      if (shared_utils_1.SharedData.debugInfo) {
        console.error(e);
      }
    }
  });
}

async function sendTimelineLayers(ctx) {
  var _a, _b;

  const layers = [];

  for (const layer of ctx.timelineLayers) {
    try {
      layers.push({
        id: layer.id,
        label: layer.label,
        color: layer.color,
        appId: (_a = layer.appRecord) === null || _a === void 0 ? void 0 : _a.id,
        pluginId: (_b = layer.plugin) === null || _b === void 0 ? void 0 : _b.descriptor.id,
        groupsOnly: layer.groupsOnly,
        skipScreenshots: layer.skipScreenshots,
        ignoreNoDurationGroups: layer.ignoreNoDurationGroups
      });
    } catch (e) {
      if (shared_utils_1.SharedData.debugInfo) {
        console.error(e);
      }
    }
  }

  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_TIMELINE_LAYER_LIST, {
    layers
  });
}

exports.sendTimelineLayers = sendTimelineLayers;

async function addTimelineEvent(options, app, ctx) {
  const appId = app ? (0, app_1.getAppRecordId)(app) : null;
  const isAllApps = options.all || !app || appId == null;
  const id = ctx.nextTimelineEventId++;
  const eventData = {
    id,
    ...options,
    all: isAllApps
  };
  ctx.timelineEventMap.set(eventData.id, eventData);
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_TIMELINE_EVENT, {
    appId: eventData.all ? 'all' : appId,
    layerId: eventData.layerId,
    event: mapTimelineEvent(eventData)
  });
  const layer = ctx.timelineLayers.find(l => {
    var _a;

    return (isAllApps || ((_a = l.appRecord) === null || _a === void 0 ? void 0 : _a.options.app) === app) && l.id === options.layerId;
  });

  if (layer) {
    layer.events.push(eventData);
  } else if (shared_utils_1.SharedData.debugInfo) {
    console.warn(`Timeline layer ${options.layerId} not found`);
  }
}

exports.addTimelineEvent = addTimelineEvent;
const initialTime = Date.now();
exports.dateThreshold = initialTime - 1000000;
exports.perfTimeDiff = initialTime - (0, devtools_api_1.now)();

function mapTimelineEvent(eventData) {
  let time = eventData.event.time;

  if ((0, devtools_api_1.isPerformanceSupported)() && time < exports.dateThreshold) {
    time += exports.perfTimeDiff;
  }

  return {
    id: eventData.id,
    time: Math.round(time * 1000),
    logType: eventData.event.logType,
    groupId: eventData.event.groupId,
    title: eventData.event.title,
    subtitle: eventData.event.subtitle
  };
}

async function clearTimeline(ctx) {
  ctx.timelineEventMap.clear();

  for (const layer of ctx.timelineLayers) {
    layer.events = [];
  }

  for (const backend of ctx.backends) {
    await backend.api.clearTimeline();
  }
}

exports.clearTimeline = clearTimeline;

async function sendTimelineEventData(id, ctx) {
  let data = null;
  const eventData = ctx.timelineEventMap.get(id);

  if (eventData) {
    data = await ctx.currentAppRecord.backend.api.inspectTimelineEvent(eventData, ctx.currentAppRecord.options.app);
    data = (0, shared_utils_1.stringify)(data);
  } else if (shared_utils_1.SharedData.debugInfo) {
    console.warn(`Event ${id} not found`, ctx.timelineEventMap.keys());
  }

  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_TIMELINE_EVENT_DATA, {
    eventId: id,
    data
  });
}

exports.sendTimelineEventData = sendTimelineEventData;

function removeLayersForApp(app, ctx) {
  const layers = ctx.timelineLayers.filter(l => {
    var _a;

    return ((_a = l.appRecord) === null || _a === void 0 ? void 0 : _a.options.app) === app;
  });

  for (const layer of layers) {
    const index = ctx.timelineLayers.indexOf(layer);
    if (index !== -1) ctx.timelineLayers.splice(index, 1);

    for (const e of layer.events) {
      ctx.timelineEventMap.delete(e.id);
    }
  }
}

exports.removeLayersForApp = removeLayersForApp;

function sendTimelineLayerEvents(appId, layerId, ctx) {
  var _a;

  const app = (_a = ctx.appRecords.find(ar => ar.id === appId)) === null || _a === void 0 ? void 0 : _a.options.app;
  if (!app) return;
  const layer = ctx.timelineLayers.find(l => {
    var _a;

    return ((_a = l.appRecord) === null || _a === void 0 ? void 0 : _a.options.app) === app && l.id === layerId;
  });
  if (!layer) return;
  ctx.bridge.send(shared_utils_1.BridgeEvents.TO_FRONT_TIMELINE_LAYER_LOAD_EVENTS, {
    appId,
    layerId,
    events: layer.events.map(e => mapTimelineEvent(e))
  });
}

exports.sendTimelineLayerEvents = sendTimelineLayerEvents;

/***/ }),

/***/ "../app-backend-core/lib/util/queue.js":
/*!*********************************************!*\
  !*** ../app-backend-core/lib/util/queue.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.JobQueue = void 0;

class JobQueue {
  constructor() {
    this.jobs = [];
  }

  queue(id, fn) {
    const job = {
      id,
      fn
    };
    return new Promise(resolve => {
      const onDone = () => {
        this.currentJob = null;
        const nextJob = this.jobs.shift();

        if (nextJob) {
          nextJob.fn();
        }

        resolve();
      };

      const run = () => {
        this.currentJob = job;
        return job.fn().then(onDone).catch(e => {
          console.error(`Job ${job.id} failed:`);
          console.error(e);
        });
      };

      if (this.currentJob) {
        this.jobs.push({
          id: job.id,
          fn: () => run()
        });
      } else {
        run();
      }
    });
  }

}

exports.JobQueue = JobQueue;

/***/ }),

/***/ "../app-backend-core/lib/util/subscriptions.js":
/*!*****************************************************!*\
  !*** ../app-backend-core/lib/util/subscriptions.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isSubscribed = exports.unsubscribe = exports.subscribe = void 0;
const activeSubs = new Map();

function getSubs(type) {
  let subs = activeSubs.get(type);

  if (!subs) {
    subs = [];
    activeSubs.set(type, subs);
  }

  return subs;
}

function subscribe(type, payload) {
  const rawPayload = getRawPayload(payload);
  getSubs(type).push({
    payload,
    rawPayload
  });
}

exports.subscribe = subscribe;

function unsubscribe(type, payload) {
  const rawPayload = getRawPayload(payload);
  const subs = getSubs(type);
  let index;

  while ((index = subs.findIndex(sub => sub.rawPayload === rawPayload)) !== -1) {
    subs.splice(index, 1);
  }
}

exports.unsubscribe = unsubscribe;

function getRawPayload(payload) {
  const data = Object.keys(payload).sort().reduce((acc, key) => {
    acc[key] = payload[key];
    return acc;
  }, {});
  return JSON.stringify(data);
}

function isSubscribed(type, predicate = () => true) {
  return getSubs(type).some(predicate);
}

exports.isSubscribed = isSubscribed;

/***/ }),

/***/ "../app-backend-vue3/lib/components/data.js":
/*!**************************************************!*\
  !*** ../app-backend-vue3/lib/components/data.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getCustomInstanceDetails = exports.editState = exports.getCustomObjectDetails = exports.getInstanceDetails = void 0;

const util_1 = __webpack_require__(/*! ./util */ "../app-backend-vue3/lib/components/util.js");

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const util_2 = __webpack_require__(/*! ../util */ "../app-backend-vue3/lib/util.js");

const vueBuiltins = ['nextTick', 'defineComponent', 'defineAsyncComponent', 'defineCustomElement', 'ref', 'computed', 'reactive', 'readonly', 'watchEffect', 'watchPostEffect', 'watchSyncEffect', 'watch', 'isRef', 'unref', 'toRef', 'toRefs', 'isProxy', 'isReactive', 'isReadonly', 'shallowRef', 'triggerRef', 'customRef', 'shallowReactive', 'shallowReadonly', 'toRaw', 'markRaw', 'effectScope', 'getCurrentScope', 'onScopeDispose', 'onMounted', 'onUpdated', 'onUnmounted', 'onBeforeMount', 'onBeforeUpdate', 'onBeforeUnmount', 'onErrorCaptured', 'onRenderTracked', 'onRenderTriggered', 'onActivated', 'onDeactivated', 'onServerPrefetch', 'provide', 'inject', 'h', 'mergeProps', 'cloneVNode', 'isVNode', 'resolveComponent', 'resolveDirective', 'withDirectives', 'withModifiers'];
/**
 * Get the detailed information of an inspected instance.
 */

function getInstanceDetails(instance, ctx) {
  var _a;

  return {
    id: (0, util_1.getUniqueComponentId)(instance, ctx),
    name: (0, util_1.getInstanceName)(instance),
    file: (_a = instance.type) === null || _a === void 0 ? void 0 : _a.__file,
    state: getInstanceState(instance)
  };
}

exports.getInstanceDetails = getInstanceDetails;

function getInstanceState(instance) {
  const mergedType = resolveMergedOptions(instance);
  return processProps(instance).concat(processState(instance), processSetupState(instance), processComputed(instance, mergedType), processAttrs(instance), processProvide(instance), processInject(instance, mergedType), processRefs(instance));
}
/**
 * Process the props of an instance.
 * Make sure return a plain object because window.postMessage()
 * will throw an Error if the passed object contains Functions.
 *
 * @param {Vue} instance
 * @return {Array}
 */


function processProps(instance) {
  const propsData = [];
  const propDefinitions = instance.type.props;

  for (let key in instance.props) {
    const propDefinition = propDefinitions ? propDefinitions[key] : null;
    key = (0, shared_utils_1.camelize)(key);
    propsData.push({
      type: 'props',
      key,
      value: (0, util_2.returnError)(() => instance.props[key]),
      meta: propDefinition ? {
        type: propDefinition.type ? getPropType(propDefinition.type) : 'any',
        required: !!propDefinition.required,
        ...(propDefinition.default != null ? {
          default: propDefinition.default.toString()
        } : {})
      } : {
        type: 'invalid'
      },
      editable: shared_utils_1.SharedData.editableProps
    });
  }

  return propsData;
}

const fnTypeRE = /^(?:function|class) (\w+)/;
/**
 * Convert prop type constructor to string.
 */

function getPropType(type) {
  if (Array.isArray(type)) {
    return type.map(t => getPropType(t)).join(' or ');
  }

  if (type == null) {
    return 'null';
  }

  const match = type.toString().match(fnTypeRE);
  return typeof type === 'function' ? match && match[1] || 'any' : 'any';
}
/**
 * Process state, filtering out props and "clean" the result
 * with a JSON dance. This removes functions which can cause
 * errors during structured clone used by window.postMessage.
 *
 * @param {Vue} instance
 * @return {Array}
 */


function processState(instance) {
  const type = instance.type;
  const props = type.props;
  const getters = type.vuex && type.vuex.getters;
  const computedDefs = type.computed;
  const data = { ...instance.data,
    ...instance.renderContext
  };
  return Object.keys(data).filter(key => !(props && key in props) && !(getters && key in getters) && !(computedDefs && key in computedDefs)).map(key => ({
    key,
    type: 'data',
    value: (0, util_2.returnError)(() => data[key]),
    editable: true
  }));
}

function processSetupState(instance) {
  const raw = instance.devtoolsRawSetupState || {};
  return Object.keys(instance.setupState).filter(key => !vueBuiltins.includes(key) && !key.startsWith('use')).map(key => {
    var _a, _b, _c, _d;

    const value = (0, util_2.returnError)(() => toRaw(instance.setupState[key]));
    const rawData = raw[key];
    let result;
    let isOther = typeof value === 'function' || typeof (value === null || value === void 0 ? void 0 : value.render) === 'function' || typeof (value === null || value === void 0 ? void 0 : value.__asyncLoader) === 'function';

    if (rawData) {
      const info = getSetupStateInfo(rawData);
      const objectType = info.computed ? 'Computed' : info.ref ? 'Ref' : info.reactive ? 'Reactive' : null;
      const isState = info.ref || info.computed || info.reactive;
      const raw = ((_b = (_a = rawData.effect) === null || _a === void 0 ? void 0 : _a.raw) === null || _b === void 0 ? void 0 : _b.toString()) || ((_d = (_c = rawData.effect) === null || _c === void 0 ? void 0 : _c.fn) === null || _d === void 0 ? void 0 : _d.toString());

      if (objectType) {
        isOther = false;
      }

      result = { ...(objectType ? {
          objectType
        } : {}),
        ...(raw ? {
          raw
        } : {}),
        editable: isState && !info.readonly
      };
    }

    const type = isOther ? 'setup (other)' : 'setup';
    return {
      key,
      value,
      type,
      ...result
    };
  });
}

function isRef(raw) {
  return !!raw.__v_isRef;
}

function isComputed(raw) {
  return isRef(raw) && !!raw.effect;
}

function isReactive(raw) {
  return !!raw.__v_isReactive;
}

function isReadOnly(raw) {
  return !!raw.__v_isReadonly;
}

function toRaw(value) {
  if (value === null || value === void 0 ? void 0 : value.__v_raw) {
    return value.__v_raw;
  }

  return value;
}

function getSetupStateInfo(raw) {
  return {
    ref: isRef(raw),
    computed: isComputed(raw),
    reactive: isReactive(raw),
    readonly: isReadOnly(raw)
  };
}

function getCustomObjectDetails(object, proto) {
  var _a, _b, _c, _d;

  const info = getSetupStateInfo(object);
  const isState = info.ref || info.computed || info.reactive;

  if (isState) {
    const objectType = info.computed ? 'Computed' : info.ref ? 'Ref' : info.reactive ? 'Reactive' : null;
    const value = toRaw(info.reactive ? object : object._value);
    const raw = ((_b = (_a = object.effect) === null || _a === void 0 ? void 0 : _a.raw) === null || _b === void 0 ? void 0 : _b.toString()) || ((_d = (_c = object.effect) === null || _c === void 0 ? void 0 : _c.fn) === null || _d === void 0 ? void 0 : _d.toString());
    return {
      _custom: {
        type: objectType.toLowerCase(),
        objectType,
        value,
        ...(raw ? {
          tooltip: `<span class="font-mono">${raw}</span>`
        } : {})
      }
    };
  }

  if (typeof object.__asyncLoader === 'function') {
    return {
      _custom: {
        type: 'component-definition',
        display: 'Async component definition'
      }
    };
  }
}

exports.getCustomObjectDetails = getCustomObjectDetails;
/**
 * Process the computed properties of an instance.
 *
 * @param {Vue} instance
 * @return {Array}
 */

function processComputed(instance, mergedType) {
  const type = mergedType;
  const computed = [];
  const defs = type.computed || {}; // use for...in here because if 'computed' is not defined
  // on component, computed properties will be placed in prototype
  // and Object.keys does not include
  // properties from object's prototype

  for (const key in defs) {
    const def = defs[key];
    const type = typeof def === 'function' && def.vuex ? 'vuex bindings' : 'computed';
    computed.push({
      type,
      key,
      value: (0, util_2.returnError)(() => instance.proxy[key]),
      editable: typeof def.set === 'function'
    });
  }

  return computed;
}

function processAttrs(instance) {
  return Object.keys(instance.attrs).map(key => ({
    type: 'attrs',
    key,
    value: (0, util_2.returnError)(() => instance.attrs[key])
  }));
}

function processProvide(instance) {
  return Reflect.ownKeys(instance.provides).map(key => ({
    type: 'provided',
    key: key.toString(),
    value: (0, util_2.returnError)(() => instance.provides[key])
  }));
}

function processInject(instance, mergedType) {
  if (!(mergedType === null || mergedType === void 0 ? void 0 : mergedType.inject)) return [];
  let keys = [];
  let defaultValue;

  if (Array.isArray(mergedType.inject)) {
    keys = mergedType.inject.map(key => ({
      key,
      originalKey: key
    }));
  } else {
    keys = Reflect.ownKeys(mergedType.inject).map(key => {
      const value = mergedType.inject[key];
      let originalKey;

      if (typeof value === 'string' || typeof value === 'symbol') {
        originalKey = value;
      } else {
        originalKey = value.from;
        defaultValue = value.default;
      }

      return {
        key,
        originalKey
      };
    });
  }

  return keys.map(({
    key,
    originalKey
  }) => ({
    type: 'injected',
    key: originalKey && key !== originalKey ? `${originalKey.toString()} ➞ ${key.toString()}` : key.toString(),
    value: (0, util_2.returnError)(() => instance.ctx[key] || instance.provides[originalKey] || defaultValue)
  }));
}

function processRefs(instance) {
  return Object.keys(instance.refs).map(key => ({
    type: 'refs',
    key,
    value: (0, util_2.returnError)(() => instance.refs[key])
  }));
}

function editState({
  componentInstance,
  path,
  state,
  type
}, stateEditor, ctx) {
  if (!['data', 'props', 'computed', 'setup'].includes(type)) return;
  let target;
  const targetPath = path.slice();

  if (Object.keys(componentInstance.props).includes(path[0])) {
    // Props
    target = componentInstance.props;
  } else if (componentInstance.devtoolsRawSetupState && Object.keys(componentInstance.devtoolsRawSetupState).includes(path[0])) {
    // Setup
    target = componentInstance.devtoolsRawSetupState;
    const currentValue = stateEditor.get(componentInstance.devtoolsRawSetupState, path);

    if (currentValue != null) {
      const info = getSetupStateInfo(currentValue);
      if (info.readonly) return;
    }
  } else {
    target = componentInstance.proxy;
  }

  if (target && targetPath) {
    stateEditor.set(target, targetPath, 'value' in state ? state.value : undefined, stateEditor.createDefaultSetCallback(state));
  }
}

exports.editState = editState;

function reduceStateList(list) {
  if (!list.length) {
    return undefined;
  }

  return list.reduce((map, item) => {
    const key = item.type || 'data';
    const obj = map[key] = map[key] || {};
    obj[item.key] = item.value;
    return map;
  }, {});
}

function getCustomInstanceDetails(instance) {
  if (instance._) instance = instance._;
  const state = getInstanceState(instance);
  return {
    _custom: {
      type: 'component',
      id: instance.__VUE_DEVTOOLS_UID__,
      display: (0, util_1.getInstanceName)(instance),
      tooltip: 'Component instance',
      value: reduceStateList(state),
      fields: {
        abstract: true
      }
    }
  };
}

exports.getCustomInstanceDetails = getCustomInstanceDetails;

function resolveMergedOptions(instance) {
  const raw = instance.type;
  const {
    mixins,
    extends: extendsOptions
  } = raw;
  const globalMixins = instance.appContext.mixins;
  if (!globalMixins.length && !mixins && !extendsOptions) return raw;
  const options = {};
  globalMixins.forEach(m => mergeOptions(options, m, instance));
  mergeOptions(options, raw, instance);
  return options;
}

function mergeOptions(to, from, instance) {
  if (typeof from === 'function') {
    from = from.options;
  }

  if (!from) return to;
  const {
    mixins,
    extends: extendsOptions
  } = from;
  extendsOptions && mergeOptions(to, extendsOptions, instance);
  mixins && mixins.forEach(m => mergeOptions(to, m, instance));

  for (const key of ['computed', 'inject']) {
    if (Object.prototype.hasOwnProperty.call(from, key)) {
      if (!to[key]) {
        to[key] = from[key];
      } else {
        Object.assign(to[key], from[key]);
      }
    }
  }

  return to;
}

/***/ }),

/***/ "../app-backend-vue3/lib/components/el.js":
/*!************************************************!*\
  !*** ../app-backend-vue3/lib/components/el.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getInstanceOrVnodeRect = exports.getRootElementsFromComponentInstance = exports.getComponentInstanceFromElement = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const util_1 = __webpack_require__(/*! ./util */ "../app-backend-vue3/lib/components/util.js");

function getComponentInstanceFromElement(element) {
  return element.__vueParentComponent;
}

exports.getComponentInstanceFromElement = getComponentInstanceFromElement;

function getRootElementsFromComponentInstance(instance) {
  if (true) {
    return [];
  }

  if ((0, util_1.isFragment)(instance)) {
    return getFragmentRootElements(instance.subTree);
  }

  if (!instance.subTree) return [];
  return [instance.subTree.el];
}

exports.getRootElementsFromComponentInstance = getRootElementsFromComponentInstance;

function getFragmentRootElements(vnode) {
  if (!vnode.children) return [];
  const list = [];

  for (let i = 0, l = vnode.children.length; i < l; i++) {
    const childVnode = vnode.children[i];

    if (childVnode.component) {
      list.push(...getRootElementsFromComponentInstance(childVnode.component));
    } else if (childVnode.el) {
      list.push(childVnode.el);
    }
  }

  return list;
}
/**
 * Get the client rect for an instance.
 *
 * @param {Vue|Vnode} instance
 * @return {Object}
 */


function getInstanceOrVnodeRect(instance) {
  if (true) {
    return;
  }

  const el = instance.subTree.el;

  if (!shared_utils_1.isBrowser) {
    // @TODO: Find position from instance or a vnode (for functional components).
    return;
  }

  if (!(0, shared_utils_1.inDoc)(el)) {
    return;
  }

  if ((0, util_1.isFragment)(instance)) {
    return addIframePosition(getFragmentRect(instance.subTree), getElWindow(el));
  } else if (el.nodeType === 1) {
    return addIframePosition(el.getBoundingClientRect(), getElWindow(el));
  } else if (instance.subTree.component) {
    return getInstanceOrVnodeRect(instance.subTree.component);
  }
}

exports.getInstanceOrVnodeRect = getInstanceOrVnodeRect;

function createRect() {
  const rect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    get width() {
      return rect.right - rect.left;
    },

    get height() {
      return rect.bottom - rect.top;
    }

  };
  return rect;
}

function mergeRects(a, b) {
  if (!a.top || b.top < a.top) {
    a.top = b.top;
  }

  if (!a.bottom || b.bottom > a.bottom) {
    a.bottom = b.bottom;
  }

  if (!a.left || b.left < a.left) {
    a.left = b.left;
  }

  if (!a.right || b.right > a.right) {
    a.right = b.right;
  }

  return a;
}

let range;
/**
 * Get the bounding rect for a text node using a Range.
 *
 * @param {Text} node
 * @return {Rect}
 */

function getTextRect(node) {
  if (!shared_utils_1.isBrowser) return;
  if (!range) range = document.createRange();
  range.selectNode(node);
  return range.getBoundingClientRect();
}

function getFragmentRect(vnode) {
  const rect = createRect();
  if (!vnode.children) return rect;

  for (let i = 0, l = vnode.children.length; i < l; i++) {
    const childVnode = vnode.children[i];
    let childRect;

    if (childVnode.component) {
      childRect = getInstanceOrVnodeRect(childVnode.component);
    } else if (childVnode.el) {
      const el = childVnode.el;

      if (el.nodeType === 1 || el.getBoundingClientRect) {
        childRect = el.getBoundingClientRect();
      } else if (el.nodeType === 3 && el.data.trim()) {
        childRect = getTextRect(el);
      }
    }

    if (childRect) {
      mergeRects(rect, childRect);
    }
  }

  return rect;
}

function getElWindow(el) {
  return el.ownerDocument.defaultView;
}

function addIframePosition(bounds, win) {
  if (win.__VUE_DEVTOOLS_IFRAME__) {
    const rect = mergeRects(createRect(), bounds);

    const iframeBounds = win.__VUE_DEVTOOLS_IFRAME__.getBoundingClientRect();

    rect.top += iframeBounds.top;
    rect.bottom += iframeBounds.top;
    rect.left += iframeBounds.left;
    rect.right += iframeBounds.left;

    if (win.parent) {
      return addIframePosition(rect, win.parent);
    }

    return rect;
  }

  return bounds;
}

/***/ }),

/***/ "../app-backend-vue3/lib/components/filter.js":
/*!****************************************************!*\
  !*** ../app-backend-vue3/lib/components/filter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ComponentFilter = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const util_1 = __webpack_require__(/*! ./util */ "../app-backend-vue3/lib/components/util.js");

class ComponentFilter {
  constructor(filter) {
    this.filter = filter || '';
  }
  /**
   * Check if an instance is qualified.
   *
   * @param {Vue|Vnode} instance
   * @return {Boolean}
   */


  isQualified(instance) {
    const name = (0, util_1.getInstanceName)(instance);
    return (0, shared_utils_1.classify)(name).toLowerCase().indexOf(this.filter) > -1 || (0, shared_utils_1.kebabize)(name).toLowerCase().indexOf(this.filter) > -1;
  }

}

exports.ComponentFilter = ComponentFilter;

/***/ }),

/***/ "../app-backend-vue3/lib/components/tree.js":
/*!**************************************************!*\
  !*** ../app-backend-vue3/lib/components/tree.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ComponentWalker = void 0;

const util_1 = __webpack_require__(/*! ./util */ "../app-backend-vue3/lib/components/util.js");

const filter_1 = __webpack_require__(/*! ./filter */ "../app-backend-vue3/lib/components/filter.js");

const el_1 = __webpack_require__(/*! ./el */ "../app-backend-vue3/lib/components/el.js");

class ComponentWalker {
  constructor(maxDepth, filter, recursively, api, ctx) {
    this.ctx = ctx;
    this.api = api;
    this.maxDepth = maxDepth;
    this.recursively = recursively;
    this.componentFilter = new filter_1.ComponentFilter(filter);
    this.uniAppPageNames = ['Page', 'KeepAlive', 'AsyncComponentWrapper', 'BaseTransition', 'Transition'];
  }

  getComponentTree(instance) {
    this.captureIds = new Map();
    return this.findQualifiedChildren(instance, 0);
  }

  getComponentParents(instance) {
    this.captureIds = new Map();
    const parents = [];
    this.captureId(instance);
    let parent = instance; // fixed by xxxxxx 页面实例

    if ( true && instance.ctx.$mpType === 'page') {
      const appRecord = this.ctx.currentAppRecord;
      this.captureId(appRecord.rootInstance);
      parents.push(appRecord.rootInstance);
    } else {
      while (parent = parent.parent) {
        this.captureId(parent);
        parents.push(parent);
      }
    }

    return parents;
  }
  /**
   * Find qualified children from a single instance.
   * If the instance itself is qualified, just return itself.
   * This is ok because [].concat works in both cases.
   *
   * @param {Vue|Vnode} instance
   * @return {Vue|Array}
   */


  async findQualifiedChildren(instance, depth) {
    var _a;

    if (this.componentFilter.isQualified(instance) && !((_a = instance.type.devtools) === null || _a === void 0 ? void 0 : _a.hide)) {
      return [await this.capture(instance, null, depth)];
    } else if (instance.subTree) {
      // TODO functional components
      const list = this.isKeepAlive(instance) ? this.getKeepAliveCachedInstances(instance) : this.getInternalInstanceChildrenByInstance(instance);
      return this.findQualifiedChildrenFromList(list, depth);
    } else {
      return [];
    }
  }
  /**
   * Iterate through an array of instances and flatten it into
   * an array of qualified instances. This is a depth-first
   * traversal - e.g. if an instance is not matched, we will
   * recursively go deeper until a qualified child is found.
   *
   * @param {Array} instances
   * @return {Array}
   */


  async findQualifiedChildrenFromList(instances, depth) {
    instances = instances.filter(child => {
      var _a;

      return !(0, util_1.isBeingDestroyed)(child) && !((_a = child.type.devtools) === null || _a === void 0 ? void 0 : _a.hide);
    });

    if (!this.componentFilter.filter) {
      return Promise.all(instances.map((child, index, list) => this.capture(child, list, depth)));
    } else {
      return Array.prototype.concat.apply([], await Promise.all(instances.map(i => this.findQualifiedChildren(i, depth))));
    }
  }
  /**
   * fixed by xxxxxx
   * @param instance
   * @param suspense
   * @returns
   */


  getInternalInstanceChildrenByInstance(instance, suspense = null) {
    if (instance.ctx.$children) {
      return instance.ctx.$children.map(proxy => proxy.$);
    }

    return this.getInternalInstanceChildren(instance.subTree, suspense);
  }
  /**
   * Get children from a component instance.
   */


  getInternalInstanceChildren(subTree, suspense = null) {
    const list = [];

    if (subTree) {
      if (subTree.component) {
        this.getInstanceChildrenBySubTreeComponent(list, subTree, suspense);
      } else if (subTree.suspense) {
        const suspenseKey = !subTree.suspense.isInFallback ? 'suspense default' : 'suspense fallback';
        list.push(...this.getInternalInstanceChildren(subTree.suspense.activeBranch, { ...subTree.suspense,
          suspenseKey
        }));
      } else if (Array.isArray(subTree.children)) {
        subTree.children.forEach(childSubTree => {
          if (childSubTree.component) {
            this.getInstanceChildrenBySubTreeComponent(list, childSubTree, suspense);
          } else {
            list.push(...this.getInternalInstanceChildren(childSubTree, suspense));
          }
        });
      }
    }

    return list.filter(child => {
      var _a;

      return !(0, util_1.isBeingDestroyed)(child) && !((_a = child.type.devtools) === null || _a === void 0 ? void 0 : _a.hide);
    });
  }
  /**
   * getInternalInstanceChildren by subTree component for uni-app defineSystemComponent
   */


  getInstanceChildrenBySubTreeComponent(list, subTree, suspense) {
    if (subTree.type.__reserved || this.uniAppPageNames.includes(subTree.type.name)) {
      list.push(...this.getInternalInstanceChildren(subTree.component.subTree));
    } else {
      !suspense ? list.push(subTree.component) : list.push({ ...subTree.component,
        suspense
      });
    }
  }

  captureId(instance) {
    if (!instance) return null; // instance.uid is not reliable in devtools as there
    // may be 2 roots with same uid which causes unexpected
    // behaviour

    const id = instance.__VUE_DEVTOOLS_UID__ != null ? instance.__VUE_DEVTOOLS_UID__ : (0, util_1.getUniqueComponentId)(instance, this.ctx);
    instance.__VUE_DEVTOOLS_UID__ = id; // Dedupe

    if (this.captureIds.has(id)) {
      return;
    } else {
      this.captureIds.set(id, undefined);
    }

    this.mark(instance);
    return id;
  }
  /**
   * Capture the meta information of an instance. (recursive)
   *
   * @param {Vue} instance
   * @return {Object}
   */


  async capture(instance, list, depth) {
    var _a, _b;

    if (!instance) return null;
    const id = this.captureId(instance);
    const name = (0, util_1.getInstanceName)(instance);
    const children = this.getInternalInstanceChildrenByInstance(instance).filter(child => !(0, util_1.isBeingDestroyed)(child));
    const parents = this.getComponentParents(instance) || [];
    const inactive = !!instance.isDeactivated || parents.some(parent => parent.isDeactivated);
    const treeNode = {
      uid: instance.uid,
      id,
      name,
      renderKey: (0, util_1.getRenderKey)(instance.vnode ? instance.vnode.key : null),
      inactive,
      hasChildren: !!children.length,
      children: [],
      isFragment: (0, util_1.isFragment)(instance),
      tags: typeof instance.type !== 'function' ? [] : [{
        label: 'functional',
        textColor: 0x555555,
        backgroundColor: 0xeeeeee
      }],
      autoOpen: this.recursively
    };

    if ( true && instance.ctx.mpType === 'page') {
      treeNode.route = instance.ctx.$scope.is || ((_a = instance.ctx.$scope.$page) === null || _a === void 0 ? void 0 : _a.fullPath);
    }

    if (false) {}

    if (false) {} // capture children


    if (depth < this.maxDepth || instance.type.__isKeepAlive || parents.some(parent => parent.type.__isKeepAlive)) {
      treeNode.children = await Promise.all(children.map((child, index, list) => this.capture(child, list, depth + 1)).filter(Boolean));
    } // keep-alive


    if (this.isKeepAlive(instance)) {
      const cachedComponents = this.getKeepAliveCachedInstances(instance);
      const childrenIds = children.map(child => child.__VUE_DEVTOOLS_UID__);

      for (const cachedChild of cachedComponents) {
        if (!childrenIds.includes(cachedChild.__VUE_DEVTOOLS_UID__)) {
          const node = await this.capture({ ...cachedChild,
            isDeactivated: true
          }, null, depth + 1);

          if (node) {
            treeNode.children.push(node);
          }
        }
      }
    } // ensure correct ordering


    const rootElements = (0, el_1.getRootElementsFromComponentInstance)(instance);
    const firstElement = rootElements[0];

    if (firstElement === null || firstElement === void 0 ? void 0 : firstElement.parentElement) {
      const parentInstance = instance.parent;
      const parentRootElements = parentInstance ? (0, el_1.getRootElementsFromComponentInstance)(parentInstance) : [];
      let el = firstElement;
      const indexList = [];

      do {
        indexList.push(Array.from(el.parentElement.childNodes).indexOf(el));
        el = el.parentElement;
      } while (el.parentElement && parentRootElements.length && !parentRootElements.includes(el));

      treeNode.domOrder = indexList.reverse();
    } else {
      treeNode.domOrder = [-1];
    }

    if ((_b = instance.suspense) === null || _b === void 0 ? void 0 : _b.suspenseKey) {
      treeNode.tags.push({
        label: instance.suspense.suspenseKey,
        backgroundColor: 0xe492e4,
        textColor: 0xffffff
      }); // update instanceMap

      this.mark(instance, true);
    }

    return this.api.visitComponentTree(instance, treeNode, this.componentFilter.filter, this.ctx.currentAppRecord.options.app);
  }
  /**
   * Mark an instance as captured and store it in the instance map.
   *
   * @param {Vue} instance
   */


  mark(instance, force = false) {
    const instanceMap = this.ctx.currentAppRecord.instanceMap;

    if (force || !instanceMap.has(instance.__VUE_DEVTOOLS_UID__)) {
      instanceMap.set(instance.__VUE_DEVTOOLS_UID__, instance);
    }
  }

  isKeepAlive(instance) {
    return instance.type.__isKeepAlive && instance.__v_cache;
  }

  getKeepAliveCachedInstances(instance) {
    return Array.from(instance.__v_cache.values()).map(vnode => vnode.component).filter(Boolean);
  }

}

exports.ComponentWalker = ComponentWalker;

/***/ }),

/***/ "../app-backend-vue3/lib/components/util.js":
/*!**************************************************!*\
  !*** ../app-backend-vue3/lib/components/util.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getComponentInstances = exports.getRenderKey = exports.getUniqueComponentId = exports.getInstanceName = exports.isFragment = exports.getAppRecord = exports.isBeingDestroyed = void 0;

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

const util_1 = __webpack_require__(/*! ../util */ "../app-backend-vue3/lib/util.js");

function isBeingDestroyed(instance) {
  return instance._isBeingDestroyed || instance.isUnmounted;
}

exports.isBeingDestroyed = isBeingDestroyed;

function getAppRecord(instance) {
  if (instance.root) {
    return instance.appContext.app.__VUE_DEVTOOLS_APP_RECORD__;
  }
}

exports.getAppRecord = getAppRecord;

function isFragment(instance) {
  var _a;

  const appRecord = getAppRecord(instance);

  if (appRecord) {
    return appRecord.options.types.Fragment === ((_a = instance.subTree) === null || _a === void 0 ? void 0 : _a.type);
  }
}

exports.isFragment = isFragment;
/**
 * Get the appropriate display name for an instance.
 *
 * @param {Vue} instance
 * @return {String}
 */

function getInstanceName(instance) {
  var _a, _b, _c;

  const name = getComponentTypeName(instance.type || {});
  if (name) return name;
  if (isAppRoot(instance)) return 'Root';

  for (const key in (_b = (_a = instance.parent) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.components) {
    if (instance.parent.type.components[key] === instance.type) return saveComponentName(instance, key);
  }

  for (const key in (_c = instance.appContext) === null || _c === void 0 ? void 0 : _c.components) {
    if (instance.appContext.components[key] === instance.type) return saveComponentName(instance, key);
  }

  return 'Anonymous Component';
}

exports.getInstanceName = getInstanceName;

function saveComponentName(instance, key) {
  instance.type.__vdevtools_guessedName = key;
  return key;
}

function getComponentTypeName(options) {
  const name = options.name || options._componentTag || options.__vdevtools_guessedName;

  if (name) {
    return name;
  }

  const file = options.__file; // injected by vue-loader

  if (file) {
    return (0, shared_utils_1.classify)((0, util_1.basename)(file, '.vue'));
  }
}
/**
 * fixed by xxxxxx
 * @param instance
 * @returns
 */


function isAppRoot(instance) {
  return instance.ctx.$mpType === 'app';
}
/**
 * Returns a devtools unique id for instance.
 * @param {Vue} instance
 */


function getUniqueComponentId(instance, ctx) {
  const appId = instance.appContext.app.__VUE_DEVTOOLS_APP_RECORD_ID__;
  const instanceId = isAppRoot(instance) ? 'root' : instance.uid;
  return `${appId}:${instanceId}`;
}

exports.getUniqueComponentId = getUniqueComponentId;

function getRenderKey(value) {
  if (value == null) return;
  const type = typeof value;

  if (type === 'number') {
    return value;
  } else if (type === 'string') {
    return `'${value}'`;
  } else if (Array.isArray(value)) {
    return 'Array';
  } else {
    return 'Object';
  }
}

exports.getRenderKey = getRenderKey;

function getComponentInstances(app) {
  const appRecord = app.__VUE_DEVTOOLS_APP_RECORD__;
  const appId = appRecord.id.toString();
  return [...appRecord.instanceMap].filter(([key]) => key.split(':')[0] === appId).map(([, instance]) => instance); // eslint-disable-line comma-spacing
}

exports.getComponentInstances = getComponentInstances;

/***/ }),

/***/ "../app-backend-vue3/lib/index.js":
/*!****************************************!*\
  !*** ../app-backend-vue3/lib/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.backend = void 0;

const app_backend_api_1 = __webpack_require__(/*! @vue-devtools/app-backend-api */ "../app-backend-api/lib/index.js");

const tree_1 = __webpack_require__(/*! ./components/tree */ "../app-backend-vue3/lib/components/tree.js");

const data_1 = __webpack_require__(/*! ./components/data */ "../app-backend-vue3/lib/components/data.js");

const util_1 = __webpack_require__(/*! ./components/util */ "../app-backend-vue3/lib/components/util.js");

const el_1 = __webpack_require__(/*! ./components/el */ "../app-backend-vue3/lib/components/el.js");

const shared_utils_1 = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");

exports.backend = (0, app_backend_api_1.defineBackend)({
  frameworkVersion: 3,
  features: [],

  setup(api) {
    api.on.getAppRecordName(payload => {
      if (payload.app._component) {
        payload.name = payload.app._component.name;
      }
    });
    api.on.getAppRootInstance(payload => {
      var _a, _b, _c, _d;

      if (payload.app._instance) {
        payload.root = payload.app._instance;
      } else if ((_b = (_a = payload.app._container) === null || _a === void 0 ? void 0 : _a._vnode) === null || _b === void 0 ? void 0 : _b.component) {
        payload.root = (_d = (_c = payload.app._container) === null || _c === void 0 ? void 0 : _c._vnode) === null || _d === void 0 ? void 0 : _d.component;
      }
    });
    api.on.walkComponentTree(async (payload, ctx) => {
      const walker = new tree_1.ComponentWalker(payload.maxDepth, payload.filter, payload.recursively, api, ctx);
      payload.componentTreeData = await walker.getComponentTree(payload.componentInstance);
    });
    api.on.walkComponentParents((payload, ctx) => {
      const walker = new tree_1.ComponentWalker(0, null, false, api, ctx);
      payload.parentInstances = walker.getComponentParents(payload.componentInstance);
    });
    api.on.inspectComponent((payload, ctx) => {
      // @TODO refactor
      shared_utils_1.backendInjections.getCustomInstanceDetails = data_1.getCustomInstanceDetails;
      shared_utils_1.backendInjections.getCustomObjectDetails = data_1.getCustomObjectDetails;
      shared_utils_1.backendInjections.instanceMap = ctx.currentAppRecord.instanceMap;

      shared_utils_1.backendInjections.isVueInstance = val => val._ && Object.keys(val._).includes('vnode');

      payload.instanceData = (0, data_1.getInstanceDetails)(payload.componentInstance, ctx);
    });
    api.on.getComponentName(payload => {
      payload.name = (0, util_1.getInstanceName)(payload.componentInstance);
    });
    api.on.getComponentBounds(payload => {
      payload.bounds = (0, el_1.getInstanceOrVnodeRect)(payload.componentInstance);
    });
    api.on.getElementComponent(payload => {
      payload.componentInstance = (0, el_1.getComponentInstanceFromElement)(payload.element);
    });
    api.on.getComponentInstances(payload => {
      payload.componentInstances = (0, util_1.getComponentInstances)(payload.app);
    });
    api.on.getComponentRootElements(payload => {
      payload.rootElements = (0, el_1.getRootElementsFromComponentInstance)(payload.componentInstance);
    });
    api.on.editComponentState((payload, ctx) => {
      (0, data_1.editState)(payload, api.stateEditor, ctx);
    });
    api.on.getComponentDevtoolsOptions(payload => {
      payload.options = payload.componentInstance.type.devtools;
    });
    api.on.getComponentRenderCode(payload => {
      payload.code = !(payload.componentInstance.type instanceof Function) ? payload.componentInstance.render.toString() : payload.componentInstance.type.toString();
    });
    api.on.transformCall(payload => {
      if (payload.callName === shared_utils_1.HookEvents.COMPONENT_UPDATED) {
        const component = payload.inArgs[0];
        payload.outArgs = [component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component];
      }
    });

    api.stateEditor.isRef = value => !!(value === null || value === void 0 ? void 0 : value.__v_isRef);

    api.stateEditor.getRefValue = ref => ref.value;

    api.stateEditor.setRefValue = (ref, value) => {
      ref.value = value;
    };
  }

});

/***/ }),

/***/ "../app-backend-vue3/lib/util.js":
/*!***************************************!*\
  !*** ../app-backend-vue3/lib/util.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.returnError = exports.basename = exports.flatten = void 0;

const path_1 = __importDefault(__webpack_require__(/*! path */ "../../node_modules/path-browserify/index.js"));

function flatten(items) {
  return items.reduce((acc, item) => {
    if (item instanceof Array) acc.push(...flatten(item));else if (item) acc.push(item);
    return acc;
  }, []);
}

exports.flatten = flatten; // Use a custom basename functions instead of the shimed version
// because it doesn't work on Windows

function basename(filename, ext) {
  return path_1.default.basename(filename.replace(/^[a-zA-Z]:/, '').replace(/\\/g, '/'), ext);
}

exports.basename = basename;

function returnError(cb) {
  try {
    return cb();
  } catch (e) {
    return e;
  }
}

exports.returnError = returnError;

/***/ }),

/***/ "../shared-utils/lib/backend.js":
/*!**************************************!*\
  !*** ../shared-utils/lib/backend.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "../shared-utils/lib/storage.js":
/*!**************************************!*\
  !*** ../shared-utils/lib/storage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";
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

/***/ "../../node_modules/lodash/_Symbol.js":
/*!********************************************!*\
  !*** ../../node_modules/lodash/_Symbol.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "../../node_modules/lodash/_baseGetTag.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_baseGetTag.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "../../node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "../../node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

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
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "../../node_modules/lodash/_baseTrim.js":
/*!**********************************************!*\
  !*** ../../node_modules/lodash/_baseTrim.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "../../node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "../../node_modules/lodash/_freeGlobal.js":
/*!************************************************!*\
  !*** ../../node_modules/lodash/_freeGlobal.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "../../node_modules/lodash/_getRawTag.js":
/*!***********************************************!*\
  !*** ../../node_modules/lodash/_getRawTag.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../node_modules/lodash/_Symbol.js");

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
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

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

module.exports = getRawTag;


/***/ }),

/***/ "../../node_modules/lodash/_objectToString.js":
/*!****************************************************!*\
  !*** ../../node_modules/lodash/_objectToString.js ***!
  \****************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "../../node_modules/lodash/_root.js":
/*!******************************************!*\
  !*** ../../node_modules/lodash/_root.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "../../node_modules/lodash/_trimmedEndIndex.js":
/*!*****************************************************!*\
  !*** ../../node_modules/lodash/_trimmedEndIndex.js ***!
  \*****************************************************/
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "../../node_modules/lodash/debounce.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/debounce.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "../../node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "../../node_modules/lodash/toNumber.js");

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
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
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
    var time = now();
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
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
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

module.exports = debounce;


/***/ }),

/***/ "../../node_modules/lodash/isObject.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isObject.js ***!
  \*********************************************/
/***/ ((module) => {

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
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "../../node_modules/lodash/isObjectLike.js":
/*!*************************************************!*\
  !*** ../../node_modules/lodash/isObjectLike.js ***!
  \*************************************************/
/***/ ((module) => {

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

module.exports = isObjectLike;


/***/ }),

/***/ "../../node_modules/lodash/isSymbol.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/isSymbol.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../node_modules/lodash/isObjectLike.js");

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
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "../../node_modules/lodash/now.js":
/*!****************************************!*\
  !*** ../../node_modules/lodash/now.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "../../node_modules/lodash/_root.js");

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
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "../../node_modules/lodash/throttle.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/throttle.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var debounce = __webpack_require__(/*! ./debounce */ "../../node_modules/lodash/debounce.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ }),

/***/ "../../node_modules/lodash/toNumber.js":
/*!*********************************************!*\
  !*** ../../node_modules/lodash/toNumber.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "../../node_modules/lodash/_baseTrim.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "../../node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

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
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "../../node_modules/path-browserify/index.js":
/*!***************************************************!*\
  !*** ../../node_modules/path-browserify/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
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


/***/ }),

/***/ "../../node_modules/speakingurl/index.js":
/*!***********************************************!*\
  !*** ../../node_modules/speakingurl/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/speakingurl */ "../../node_modules/speakingurl/lib/speakingurl.js");


/***/ }),

/***/ "../../node_modules/speakingurl/lib/speakingurl.js":
/*!*********************************************************!*\
  !*** ../../node_modules/speakingurl/lib/speakingurl.js ***!
  \*********************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root) {
    'use strict';

    /**
     * charMap
     * @type {Object}
     */
    var charMap = {

        // latin
        'À': 'A',
        'Á': 'A',
        'Â': 'A',
        'Ã': 'A',
        'Ä': 'Ae',
        'Å': 'A',
        'Æ': 'AE',
        'Ç': 'C',
        'È': 'E',
        'É': 'E',
        'Ê': 'E',
        'Ë': 'E',
        'Ì': 'I',
        'Í': 'I',
        'Î': 'I',
        'Ï': 'I',
        'Ð': 'D',
        'Ñ': 'N',
        'Ò': 'O',
        'Ó': 'O',
        'Ô': 'O',
        'Õ': 'O',
        'Ö': 'Oe',
        'Ő': 'O',
        'Ø': 'O',
        'Ù': 'U',
        'Ú': 'U',
        'Û': 'U',
        'Ü': 'Ue',
        'Ű': 'U',
        'Ý': 'Y',
        'Þ': 'TH',
        'ß': 'ss',
        'à': 'a',
        'á': 'a',
        'â': 'a',
        'ã': 'a',
        'ä': 'ae',
        'å': 'a',
        'æ': 'ae',
        'ç': 'c',
        'è': 'e',
        'é': 'e',
        'ê': 'e',
        'ë': 'e',
        'ì': 'i',
        'í': 'i',
        'î': 'i',
        'ï': 'i',
        'ð': 'd',
        'ñ': 'n',
        'ò': 'o',
        'ó': 'o',
        'ô': 'o',
        'õ': 'o',
        'ö': 'oe',
        'ő': 'o',
        'ø': 'o',
        'ù': 'u',
        'ú': 'u',
        'û': 'u',
        'ü': 'ue',
        'ű': 'u',
        'ý': 'y',
        'þ': 'th',
        'ÿ': 'y',
        'ẞ': 'SS',

        // language specific

        // Arabic
        'ا': 'a',
        'أ': 'a',
        'إ': 'i',
        'آ': 'aa',
        'ؤ': 'u',
        'ئ': 'e',
        'ء': 'a',
        'ب': 'b',
        'ت': 't',
        'ث': 'th',
        'ج': 'j',
        'ح': 'h',
        'خ': 'kh',
        'د': 'd',
        'ذ': 'th',
        'ر': 'r',
        'ز': 'z',
        'س': 's',
        'ش': 'sh',
        'ص': 's',
        'ض': 'dh',
        'ط': 't',
        'ظ': 'z',
        'ع': 'a',
        'غ': 'gh',
        'ف': 'f',
        'ق': 'q',
        'ك': 'k',
        'ل': 'l',
        'م': 'm',
        'ن': 'n',
        'ه': 'h',
        'و': 'w',
        'ي': 'y',
        'ى': 'a',
        'ة': 'h',
        'ﻻ': 'la',
        'ﻷ': 'laa',
        'ﻹ': 'lai',
        'ﻵ': 'laa',

        // Persian additional characters than Arabic
        'گ': 'g',
        'چ': 'ch',
        'پ': 'p',
        'ژ': 'zh',
        'ک': 'k',
        'ی': 'y',

        // Arabic diactrics
        'َ': 'a',
        'ً': 'an',
        'ِ': 'e',
        'ٍ': 'en',
        'ُ': 'u',
        'ٌ': 'on',
        'ْ': '',

        // Arabic numbers
        '٠': '0',
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',

        // Persian numbers
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',

        // Burmese consonants
        'က': 'k',
        'ခ': 'kh',
        'ဂ': 'g',
        'ဃ': 'ga',
        'င': 'ng',
        'စ': 's',
        'ဆ': 'sa',
        'ဇ': 'z',
        'စျ': 'za',
        'ည': 'ny',
        'ဋ': 't',
        'ဌ': 'ta',
        'ဍ': 'd',
        'ဎ': 'da',
        'ဏ': 'na',
        'တ': 't',
        'ထ': 'ta',
        'ဒ': 'd',
        'ဓ': 'da',
        'န': 'n',
        'ပ': 'p',
        'ဖ': 'pa',
        'ဗ': 'b',
        'ဘ': 'ba',
        'မ': 'm',
        'ယ': 'y',
        'ရ': 'ya',
        'လ': 'l',
        'ဝ': 'w',
        'သ': 'th',
        'ဟ': 'h',
        'ဠ': 'la',
        'အ': 'a',
        // consonant character combos
        'ြ': 'y',
        'ျ': 'ya',
        'ွ': 'w',
        'ြွ': 'yw',
        'ျွ': 'ywa',
        'ှ': 'h',
        // independent vowels
        'ဧ': 'e',
        '၏': '-e',
        'ဣ': 'i',
        'ဤ': '-i',
        'ဉ': 'u',
        'ဦ': '-u',
        'ဩ': 'aw',
        'သြော': 'aw',
        'ဪ': 'aw',
        // numbers
        '၀': '0',
        '၁': '1',
        '၂': '2',
        '၃': '3',
        '၄': '4',
        '၅': '5',
        '၆': '6',
        '၇': '7',
        '၈': '8',
        '၉': '9',
        // virama and tone marks which are silent in transliteration
        '္': '',
        '့': '',
        'း': '',

        // Czech
        'č': 'c',
        'ď': 'd',
        'ě': 'e',
        'ň': 'n',
        'ř': 'r',
        'š': 's',
        'ť': 't',
        'ů': 'u',
        'ž': 'z',
        'Č': 'C',
        'Ď': 'D',
        'Ě': 'E',
        'Ň': 'N',
        'Ř': 'R',
        'Š': 'S',
        'Ť': 'T',
        'Ů': 'U',
        'Ž': 'Z',

        // Dhivehi
        'ހ': 'h',
        'ށ': 'sh',
        'ނ': 'n',
        'ރ': 'r',
        'ބ': 'b',
        'ޅ': 'lh',
        'ކ': 'k',
        'އ': 'a',
        'ވ': 'v',
        'މ': 'm',
        'ފ': 'f',
        'ދ': 'dh',
        'ތ': 'th',
        'ލ': 'l',
        'ގ': 'g',
        'ޏ': 'gn',
        'ސ': 's',
        'ޑ': 'd',
        'ޒ': 'z',
        'ޓ': 't',
        'ޔ': 'y',
        'ޕ': 'p',
        'ޖ': 'j',
        'ޗ': 'ch',
        'ޘ': 'tt',
        'ޙ': 'hh',
        'ޚ': 'kh',
        'ޛ': 'th',
        'ޜ': 'z',
        'ޝ': 'sh',
        'ޞ': 's',
        'ޟ': 'd',
        'ޠ': 't',
        'ޡ': 'z',
        'ޢ': 'a',
        'ޣ': 'gh',
        'ޤ': 'q',
        'ޥ': 'w',
        'ަ': 'a',
        'ާ': 'aa',
        'ި': 'i',
        'ީ': 'ee',
        'ު': 'u',
        'ޫ': 'oo',
        'ެ': 'e',
        'ޭ': 'ey',
        'ޮ': 'o',
        'ޯ': 'oa',
        'ް': '',

        // Georgian https://en.wikipedia.org/wiki/Romanization_of_Georgian
        // National system (2002)
        'ა': 'a',
        'ბ': 'b',
        'გ': 'g',
        'დ': 'd',
        'ე': 'e',
        'ვ': 'v',
        'ზ': 'z',
        'თ': 't',
        'ი': 'i',
        'კ': 'k',
        'ლ': 'l',
        'მ': 'm',
        'ნ': 'n',
        'ო': 'o',
        'პ': 'p',
        'ჟ': 'zh',
        'რ': 'r',
        'ს': 's',
        'ტ': 't',
        'უ': 'u',
        'ფ': 'p',
        'ქ': 'k',
        'ღ': 'gh',
        'ყ': 'q',
        'შ': 'sh',
        'ჩ': 'ch',
        'ც': 'ts',
        'ძ': 'dz',
        'წ': 'ts',
        'ჭ': 'ch',
        'ხ': 'kh',
        'ჯ': 'j',
        'ჰ': 'h',

        // Greek
        'α': 'a',
        'β': 'v',
        'γ': 'g',
        'δ': 'd',
        'ε': 'e',
        'ζ': 'z',
        'η': 'i',
        'θ': 'th',
        'ι': 'i',
        'κ': 'k',
        'λ': 'l',
        'μ': 'm',
        'ν': 'n',
        'ξ': 'ks',
        'ο': 'o',
        'π': 'p',
        'ρ': 'r',
        'σ': 's',
        'τ': 't',
        'υ': 'y',
        'φ': 'f',
        'χ': 'x',
        'ψ': 'ps',
        'ω': 'o',
        'ά': 'a',
        'έ': 'e',
        'ί': 'i',
        'ό': 'o',
        'ύ': 'y',
        'ή': 'i',
        'ώ': 'o',
        'ς': 's',
        'ϊ': 'i',
        'ΰ': 'y',
        'ϋ': 'y',
        'ΐ': 'i',
        'Α': 'A',
        'Β': 'B',
        'Γ': 'G',
        'Δ': 'D',
        'Ε': 'E',
        'Ζ': 'Z',
        'Η': 'I',
        'Θ': 'TH',
        'Ι': 'I',
        'Κ': 'K',
        'Λ': 'L',
        'Μ': 'M',
        'Ν': 'N',
        'Ξ': 'KS',
        'Ο': 'O',
        'Π': 'P',
        'Ρ': 'R',
        'Σ': 'S',
        'Τ': 'T',
        'Υ': 'Y',
        'Φ': 'F',
        'Χ': 'X',
        'Ψ': 'PS',
        'Ω': 'O',
        'Ά': 'A',
        'Έ': 'E',
        'Ί': 'I',
        'Ό': 'O',
        'Ύ': 'Y',
        'Ή': 'I',
        'Ώ': 'O',
        'Ϊ': 'I',
        'Ϋ': 'Y',

        // Latvian
        'ā': 'a',
        // 'č': 'c', // duplicate
        'ē': 'e',
        'ģ': 'g',
        'ī': 'i',
        'ķ': 'k',
        'ļ': 'l',
        'ņ': 'n',
        // 'š': 's', // duplicate
        'ū': 'u',
        // 'ž': 'z', // duplicate
        'Ā': 'A',
        // 'Č': 'C', // duplicate
        'Ē': 'E',
        'Ģ': 'G',
        'Ī': 'I',
        'Ķ': 'k',
        'Ļ': 'L',
        'Ņ': 'N',
        // 'Š': 'S', // duplicate
        'Ū': 'U',
        // 'Ž': 'Z', // duplicate

        // Macedonian
        'Ќ': 'Kj',
        'ќ': 'kj',
        'Љ': 'Lj',
        'љ': 'lj',
        'Њ': 'Nj',
        'њ': 'nj',
        'Тс': 'Ts',
        'тс': 'ts',

        // Polish
        'ą': 'a',
        'ć': 'c',
        'ę': 'e',
        'ł': 'l',
        'ń': 'n',
        // 'ó': 'o', // duplicate
        'ś': 's',
        'ź': 'z',
        'ż': 'z',
        'Ą': 'A',
        'Ć': 'C',
        'Ę': 'E',
        'Ł': 'L',
        'Ń': 'N',
        'Ś': 'S',
        'Ź': 'Z',
        'Ż': 'Z',

        // Ukranian
        'Є': 'Ye',
        'І': 'I',
        'Ї': 'Yi',
        'Ґ': 'G',
        'є': 'ye',
        'і': 'i',
        'ї': 'yi',
        'ґ': 'g',

        // Romanian
        'ă': 'a',
        'Ă': 'A',
        'ș': 's',
        'Ș': 'S',
        // 'ş': 's', // duplicate
        // 'Ş': 'S', // duplicate
        'ț': 't',
        'Ț': 'T',
        'ţ': 't',
        'Ţ': 'T',

        // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
        // ICAO

        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'yo',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'i',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'kh',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sh',
        'ъ': '',
        'ы': 'y',
        'ь': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya',
        'А': 'A',
        'Б': 'B',
        'В': 'V',
        'Г': 'G',
        'Д': 'D',
        'Е': 'E',
        'Ё': 'Yo',
        'Ж': 'Zh',
        'З': 'Z',
        'И': 'I',
        'Й': 'I',
        'К': 'K',
        'Л': 'L',
        'М': 'M',
        'Н': 'N',
        'О': 'O',
        'П': 'P',
        'Р': 'R',
        'С': 'S',
        'Т': 'T',
        'У': 'U',
        'Ф': 'F',
        'Х': 'Kh',
        'Ц': 'C',
        'Ч': 'Ch',
        'Ш': 'Sh',
        'Щ': 'Sh',
        'Ъ': '',
        'Ы': 'Y',
        'Ь': '',
        'Э': 'E',
        'Ю': 'Yu',
        'Я': 'Ya',

        // Serbian
        'ђ': 'dj',
        'ј': 'j',
        // 'љ': 'lj',  // duplicate
        // 'њ': 'nj', // duplicate
        'ћ': 'c',
        'џ': 'dz',
        'Ђ': 'Dj',
        'Ј': 'j',
        // 'Љ': 'Lj', // duplicate
        // 'Њ': 'Nj', // duplicate
        'Ћ': 'C',
        'Џ': 'Dz',

        // Slovak
        'ľ': 'l',
        'ĺ': 'l',
        'ŕ': 'r',
        'Ľ': 'L',
        'Ĺ': 'L',
        'Ŕ': 'R',

        // Turkish
        'ş': 's',
        'Ş': 'S',
        'ı': 'i',
        'İ': 'I',
        // 'ç': 'c', // duplicate
        // 'Ç': 'C', // duplicate
        // 'ü': 'u', // duplicate, see langCharMap
        // 'Ü': 'U', // duplicate, see langCharMap
        // 'ö': 'o', // duplicate, see langCharMap
        // 'Ö': 'O', // duplicate, see langCharMap
        'ğ': 'g',
        'Ğ': 'G',

        // Vietnamese
        'ả': 'a',
        'Ả': 'A',
        'ẳ': 'a',
        'Ẳ': 'A',
        'ẩ': 'a',
        'Ẩ': 'A',
        'đ': 'd',
        'Đ': 'D',
        'ẹ': 'e',
        'Ẹ': 'E',
        'ẽ': 'e',
        'Ẽ': 'E',
        'ẻ': 'e',
        'Ẻ': 'E',
        'ế': 'e',
        'Ế': 'E',
        'ề': 'e',
        'Ề': 'E',
        'ệ': 'e',
        'Ệ': 'E',
        'ễ': 'e',
        'Ễ': 'E',
        'ể': 'e',
        'Ể': 'E',
        'ỏ': 'o',
        'ọ': 'o',
        'Ọ': 'o',
        'ố': 'o',
        'Ố': 'O',
        'ồ': 'o',
        'Ồ': 'O',
        'ổ': 'o',
        'Ổ': 'O',
        'ộ': 'o',
        'Ộ': 'O',
        'ỗ': 'o',
        'Ỗ': 'O',
        'ơ': 'o',
        'Ơ': 'O',
        'ớ': 'o',
        'Ớ': 'O',
        'ờ': 'o',
        'Ờ': 'O',
        'ợ': 'o',
        'Ợ': 'O',
        'ỡ': 'o',
        'Ỡ': 'O',
        'Ở': 'o',
        'ở': 'o',
        'ị': 'i',
        'Ị': 'I',
        'ĩ': 'i',
        'Ĩ': 'I',
        'ỉ': 'i',
        'Ỉ': 'i',
        'ủ': 'u',
        'Ủ': 'U',
        'ụ': 'u',
        'Ụ': 'U',
        'ũ': 'u',
        'Ũ': 'U',
        'ư': 'u',
        'Ư': 'U',
        'ứ': 'u',
        'Ứ': 'U',
        'ừ': 'u',
        'Ừ': 'U',
        'ự': 'u',
        'Ự': 'U',
        'ữ': 'u',
        'Ữ': 'U',
        'ử': 'u',
        'Ử': 'ư',
        'ỷ': 'y',
        'Ỷ': 'y',
        'ỳ': 'y',
        'Ỳ': 'Y',
        'ỵ': 'y',
        'Ỵ': 'Y',
        'ỹ': 'y',
        'Ỹ': 'Y',
        'ạ': 'a',
        'Ạ': 'A',
        'ấ': 'a',
        'Ấ': 'A',
        'ầ': 'a',
        'Ầ': 'A',
        'ậ': 'a',
        'Ậ': 'A',
        'ẫ': 'a',
        'Ẫ': 'A',
        // 'ă': 'a', // duplicate
        // 'Ă': 'A', // duplicate
        'ắ': 'a',
        'Ắ': 'A',
        'ằ': 'a',
        'Ằ': 'A',
        'ặ': 'a',
        'Ặ': 'A',
        'ẵ': 'a',
        'Ẵ': 'A',
        "⓪": "0",
        "①": "1",
        "②": "2",
        "③": "3",
        "④": "4",
        "⑤": "5",
        "⑥": "6",
        "⑦": "7",
        "⑧": "8",
        "⑨": "9",
        "⑩": "10",
        "⑪": "11",
        "⑫": "12",
        "⑬": "13",
        "⑭": "14",
        "⑮": "15",
        "⑯": "16",
        "⑰": "17",
        "⑱": "18",
        "⑲": "18",
        "⑳": "18",

        "⓵": "1",
        "⓶": "2",
        "⓷": "3",
        "⓸": "4",
        "⓹": "5",
        "⓺": "6",
        "⓻": "7",
        "⓼": "8",
        "⓽": "9",
        "⓾": "10",

        "⓿": "0",
        "⓫": "11",
        "⓬": "12",
        "⓭": "13",
        "⓮": "14",
        "⓯": "15",
        "⓰": "16",
        "⓱": "17",
        "⓲": "18",
        "⓳": "19",
        "⓴": "20",

        "Ⓐ": "A",
        "Ⓑ": "B",
        "Ⓒ": "C",
        "Ⓓ": "D",
        "Ⓔ": "E",
        "Ⓕ": "F",
        "Ⓖ": "G",
        "Ⓗ": "H",
        "Ⓘ": "I",
        "Ⓙ": "J",
        "Ⓚ": "K",
        "Ⓛ": "L",
        "Ⓜ": "M",
        "Ⓝ": "N",
        "Ⓞ": "O",
        "Ⓟ": "P",
        "Ⓠ": "Q",
        "Ⓡ": "R",
        "Ⓢ": "S",
        "Ⓣ": "T",
        "Ⓤ": "U",
        "Ⓥ": "V",
        "Ⓦ": "W",
        "Ⓧ": "X",
        "Ⓨ": "Y",
        "Ⓩ": "Z",

        "ⓐ": "a",
        "ⓑ": "b",
        "ⓒ": "c",
        "ⓓ": "d",
        "ⓔ": "e",
        "ⓕ": "f",
        "ⓖ": "g",
        "ⓗ": "h",
        "ⓘ": "i",
        "ⓙ": "j",
        "ⓚ": "k",
        "ⓛ": "l",
        "ⓜ": "m",
        "ⓝ": "n",
        "ⓞ": "o",
        "ⓟ": "p",
        "ⓠ": "q",
        "ⓡ": "r",
        "ⓢ": "s",
        "ⓣ": "t",
        "ⓤ": "u",
        "ⓦ": "v",
        "ⓥ": "w",
        "ⓧ": "x",
        "ⓨ": "y",
        "ⓩ": "z",

        // symbols
        '“': '"',
        '”': '"',
        '‘': "'",
        '’': "'",
        '∂': 'd',
        'ƒ': 'f',
        '™': '(TM)',
        '©': '(C)',
        'œ': 'oe',
        'Œ': 'OE',
        '®': '(R)',
        '†': '+',
        '℠': '(SM)',
        '…': '...',
        '˚': 'o',
        'º': 'o',
        'ª': 'a',
        '•': '*',
        '၊': ',',
        '။': '.',

        // currency
        '$': 'USD',
        '€': 'EUR',
        '₢': 'BRN',
        '₣': 'FRF',
        '£': 'GBP',
        '₤': 'ITL',
        '₦': 'NGN',
        '₧': 'ESP',
        '₩': 'KRW',
        '₪': 'ILS',
        '₫': 'VND',
        '₭': 'LAK',
        '₮': 'MNT',
        '₯': 'GRD',
        '₱': 'ARS',
        '₲': 'PYG',
        '₳': 'ARA',
        '₴': 'UAH',
        '₵': 'GHS',
        '¢': 'cent',
        '¥': 'CNY',
        '元': 'CNY',
        '円': 'YEN',
        '﷼': 'IRR',
        '₠': 'EWE',
        '฿': 'THB',
        '₨': 'INR',
        '₹': 'INR',
        '₰': 'PF',
        '₺': 'TRY',
        '؋': 'AFN',
        '₼': 'AZN',
        'лв': 'BGN',
        '៛': 'KHR',
        '₡': 'CRC',
        '₸': 'KZT',
        'ден': 'MKD',
        'zł': 'PLN',
        '₽': 'RUB',
        '₾': 'GEL'

    };

    /**
     * special look ahead character array
     * These characters form with consonants to become 'single'/consonant combo
     * @type [Array]
     */
    var lookAheadCharArray = [
        // burmese
        '်',

        // Dhivehi
        'ް'
    ];

    /**
     * diatricMap for languages where transliteration changes entirely as more diatrics are added
     * @type {Object}
     */
    var diatricMap = {
        // Burmese
        // dependent vowels
        'ာ': 'a',
        'ါ': 'a',
        'ေ': 'e',
        'ဲ': 'e',
        'ိ': 'i',
        'ီ': 'i',
        'ို': 'o',
        'ု': 'u',
        'ူ': 'u',
        'ေါင်': 'aung',
        'ော': 'aw',
        'ော်': 'aw',
        'ေါ': 'aw',
        'ေါ်': 'aw',
        '်': '်', // this is special case but the character will be converted to latin in the code
        'က်': 'et',
        'ိုက်': 'aik',
        'ောက်': 'auk',
        'င်': 'in',
        'ိုင်': 'aing',
        'ောင်': 'aung',
        'စ်': 'it',
        'ည်': 'i',
        'တ်': 'at',
        'ိတ်': 'eik',
        'ုတ်': 'ok',
        'ွတ်': 'ut',
        'ေတ်': 'it',
        'ဒ်': 'd',
        'ိုဒ်': 'ok',
        'ုဒ်': 'ait',
        'န်': 'an',
        'ာန်': 'an',
        'ိန်': 'ein',
        'ုန်': 'on',
        'ွန်': 'un',
        'ပ်': 'at',
        'ိပ်': 'eik',
        'ုပ်': 'ok',
        'ွပ်': 'ut',
        'န်ုပ်': 'nub',
        'မ်': 'an',
        'ိမ်': 'ein',
        'ုမ်': 'on',
        'ွမ်': 'un',
        'ယ်': 'e',
        'ိုလ်': 'ol',
        'ဉ်': 'in',
        'ံ': 'an',
        'ိံ': 'ein',
        'ုံ': 'on',

        // Dhivehi
        'ައް': 'ah',
        'ަށް': 'ah'
    };

    /**
     * langCharMap language specific characters translations
     * @type   {Object}
     */
    var langCharMap = {
        'en': {}, // default language

        'az': { // Azerbaijani
            'ç': 'c',
            'ə': 'e',
            'ğ': 'g',
            'ı': 'i',
            'ö': 'o',
            'ş': 's',
            'ü': 'u',
            'Ç': 'C',
            'Ə': 'E',
            'Ğ': 'G',
            'İ': 'I',
            'Ö': 'O',
            'Ş': 'S',
            'Ü': 'U'
        },

        'cs': { // Czech
            'č': 'c',
            'ď': 'd',
            'ě': 'e',
            'ň': 'n',
            'ř': 'r',
            'š': 's',
            'ť': 't',
            'ů': 'u',
            'ž': 'z',
            'Č': 'C',
            'Ď': 'D',
            'Ě': 'E',
            'Ň': 'N',
            'Ř': 'R',
            'Š': 'S',
            'Ť': 'T',
            'Ů': 'U',
            'Ž': 'Z'
        },

        'fi': { // Finnish
            // 'å': 'a', duplicate see charMap/latin
            // 'Å': 'A', duplicate see charMap/latin
            'ä': 'a', // ok
            'Ä': 'A', // ok
            'ö': 'o', // ok
            'Ö': 'O' // ok
        },

        'hu': { // Hungarian
            'ä': 'a', // ok
            'Ä': 'A', // ok
            // 'á': 'a', duplicate see charMap/latin
            // 'Á': 'A', duplicate see charMap/latin
            'ö': 'o', // ok
            'Ö': 'O', // ok
            // 'ő': 'o', duplicate see charMap/latin
            // 'Ő': 'O', duplicate see charMap/latin
            'ü': 'u',
            'Ü': 'U',
            'ű': 'u',
            'Ű': 'U'
        },

        'lt': { // Lithuanian
            'ą': 'a',
            'č': 'c',
            'ę': 'e',
            'ė': 'e',
            'į': 'i',
            'š': 's',
            'ų': 'u',
            'ū': 'u',
            'ž': 'z',
            'Ą': 'A',
            'Č': 'C',
            'Ę': 'E',
            'Ė': 'E',
            'Į': 'I',
            'Š': 'S',
            'Ų': 'U',
            'Ū': 'U'
        },

        'lv': { // Latvian
            'ā': 'a',
            'č': 'c',
            'ē': 'e',
            'ģ': 'g',
            'ī': 'i',
            'ķ': 'k',
            'ļ': 'l',
            'ņ': 'n',
            'š': 's',
            'ū': 'u',
            'ž': 'z',
            'Ā': 'A',
            'Č': 'C',
            'Ē': 'E',
            'Ģ': 'G',
            'Ī': 'i',
            'Ķ': 'k',
            'Ļ': 'L',
            'Ņ': 'N',
            'Š': 'S',
            'Ū': 'u',
            'Ž': 'Z'
        },

        'pl': { // Polish
            'ą': 'a',
            'ć': 'c',
            'ę': 'e',
            'ł': 'l',
            'ń': 'n',
            'ó': 'o',
            'ś': 's',
            'ź': 'z',
            'ż': 'z',
            'Ą': 'A',
            'Ć': 'C',
            'Ę': 'e',
            'Ł': 'L',
            'Ń': 'N',
            'Ó': 'O',
            'Ś': 'S',
            'Ź': 'Z',
            'Ż': 'Z'
        },

        'sv': { // Swedish
            // 'å': 'a', duplicate see charMap/latin
            // 'Å': 'A', duplicate see charMap/latin
            'ä': 'a', // ok
            'Ä': 'A', // ok
            'ö': 'o', // ok
            'Ö': 'O' // ok
        },

        'sk': { // Slovak
            'ä': 'a',
            'Ä': 'A'
        },

        'sr': { // Serbian
            'љ': 'lj',
            'њ': 'nj',
            'Љ': 'Lj',
            'Њ': 'Nj',
            'đ': 'dj',
            'Đ': 'Dj'
        },

        'tr': { // Turkish
            'Ü': 'U',
            'Ö': 'O',
            'ü': 'u',
            'ö': 'o'
        }
    };

    /**
     * symbolMap language specific symbol translations
     * translations must be transliterated already
     * @type   {Object}
     */
    var symbolMap = {
        'ar': {
            '∆': 'delta',
            '∞': 'la-nihaya',
            '♥': 'hob',
            '&': 'wa',
            '|': 'aw',
            '<': 'aqal-men',
            '>': 'akbar-men',
            '∑': 'majmou',
            '¤': 'omla'
        },

        'az': {},

        'ca': {
            '∆': 'delta',
            '∞': 'infinit',
            '♥': 'amor',
            '&': 'i',
            '|': 'o',
            '<': 'menys que',
            '>': 'mes que',
            '∑': 'suma dels',
            '¤': 'moneda'
        },

        'cs': {
            '∆': 'delta',
            '∞': 'nekonecno',
            '♥': 'laska',
            '&': 'a',
            '|': 'nebo',
            '<': 'mensi nez',
            '>': 'vetsi nez',
            '∑': 'soucet',
            '¤': 'mena'
        },

        'de': {
            '∆': 'delta',
            '∞': 'unendlich',
            '♥': 'Liebe',
            '&': 'und',
            '|': 'oder',
            '<': 'kleiner als',
            '>': 'groesser als',
            '∑': 'Summe von',
            '¤': 'Waehrung'
        },

        'dv': {
            '∆': 'delta',
            '∞': 'kolunulaa',
            '♥': 'loabi',
            '&': 'aai',
            '|': 'noonee',
            '<': 'ah vure kuda',
            '>': 'ah vure bodu',
            '∑': 'jumula',
            '¤': 'faisaa'
        },

        'en': {
            '∆': 'delta',
            '∞': 'infinity',
            '♥': 'love',
            '&': 'and',
            '|': 'or',
            '<': 'less than',
            '>': 'greater than',
            '∑': 'sum',
            '¤': 'currency'
        },

        'es': {
            '∆': 'delta',
            '∞': 'infinito',
            '♥': 'amor',
            '&': 'y',
            '|': 'u',
            '<': 'menos que',
            '>': 'mas que',
            '∑': 'suma de los',
            '¤': 'moneda'
        },

        'fa': {
            '∆': 'delta',
            '∞': 'bi-nahayat',
            '♥': 'eshgh',
            '&': 'va',
            '|': 'ya',
            '<': 'kamtar-az',
            '>': 'bishtar-az',
            '∑': 'majmooe',
            '¤': 'vahed'
        },

        'fi': {
            '∆': 'delta',
            '∞': 'aarettomyys',
            '♥': 'rakkaus',
            '&': 'ja',
            '|': 'tai',
            '<': 'pienempi kuin',
            '>': 'suurempi kuin',
            '∑': 'summa',
            '¤': 'valuutta'
        },

        'fr': {
            '∆': 'delta',
            '∞': 'infiniment',
            '♥': 'Amour',
            '&': 'et',
            '|': 'ou',
            '<': 'moins que',
            '>': 'superieure a',
            '∑': 'somme des',
            '¤': 'monnaie'
        },

        'ge': {
            '∆': 'delta',
            '∞': 'usasruloba',
            '♥': 'siqvaruli',
            '&': 'da',
            '|': 'an',
            '<': 'naklebi',
            '>': 'meti',
            '∑': 'jami',
            '¤': 'valuta'
        },

        'gr': {},

        'hu': {
            '∆': 'delta',
            '∞': 'vegtelen',
            '♥': 'szerelem',
            '&': 'es',
            '|': 'vagy',
            '<': 'kisebb mint',
            '>': 'nagyobb mint',
            '∑': 'szumma',
            '¤': 'penznem'
        },

        'it': {
            '∆': 'delta',
            '∞': 'infinito',
            '♥': 'amore',
            '&': 'e',
            '|': 'o',
            '<': 'minore di',
            '>': 'maggiore di',
            '∑': 'somma',
            '¤': 'moneta'
        },

        'lt': {
            '∆': 'delta',
            '∞': 'begalybe',
            '♥': 'meile',
            '&': 'ir',
            '|': 'ar',
            '<': 'maziau nei',
            '>': 'daugiau nei',
            '∑': 'suma',
            '¤': 'valiuta'
        },

        'lv': {
            '∆': 'delta',
            '∞': 'bezgaliba',
            '♥': 'milestiba',
            '&': 'un',
            '|': 'vai',
            '<': 'mazak neka',
            '>': 'lielaks neka',
            '∑': 'summa',
            '¤': 'valuta'
        },

        'my': {
            '∆': 'kwahkhyaet',
            '∞': 'asaonasme',
            '♥': 'akhyait',
            '&': 'nhin',
            '|': 'tho',
            '<': 'ngethaw',
            '>': 'kyithaw',
            '∑': 'paungld',
            '¤': 'ngwekye'
        },

        'mk': {},

        'nl': {
            '∆': 'delta',
            '∞': 'oneindig',
            '♥': 'liefde',
            '&': 'en',
            '|': 'of',
            '<': 'kleiner dan',
            '>': 'groter dan',
            '∑': 'som',
            '¤': 'valuta'
        },

        'pl': {
            '∆': 'delta',
            '∞': 'nieskonczonosc',
            '♥': 'milosc',
            '&': 'i',
            '|': 'lub',
            '<': 'mniejsze niz',
            '>': 'wieksze niz',
            '∑': 'suma',
            '¤': 'waluta'
        },

        'pt': {
            '∆': 'delta',
            '∞': 'infinito',
            '♥': 'amor',
            '&': 'e',
            '|': 'ou',
            '<': 'menor que',
            '>': 'maior que',
            '∑': 'soma',
            '¤': 'moeda'
        },

        'ro': {
            '∆': 'delta',
            '∞': 'infinit',
            '♥': 'dragoste',
            '&': 'si',
            '|': 'sau',
            '<': 'mai mic ca',
            '>': 'mai mare ca',
            '∑': 'suma',
            '¤': 'valuta'
        },

        'ru': {
            '∆': 'delta',
            '∞': 'beskonechno',
            '♥': 'lubov',
            '&': 'i',
            '|': 'ili',
            '<': 'menshe',
            '>': 'bolshe',
            '∑': 'summa',
            '¤': 'valjuta'
        },

        'sk': {
            '∆': 'delta',
            '∞': 'nekonecno',
            '♥': 'laska',
            '&': 'a',
            '|': 'alebo',
            '<': 'menej ako',
            '>': 'viac ako',
            '∑': 'sucet',
            '¤': 'mena'
        },

        'sr': {},

        'tr': {
            '∆': 'delta',
            '∞': 'sonsuzluk',
            '♥': 'ask',
            '&': 've',
            '|': 'veya',
            '<': 'kucuktur',
            '>': 'buyuktur',
            '∑': 'toplam',
            '¤': 'para birimi'
        },

        'uk': {
            '∆': 'delta',
            '∞': 'bezkinechnist',
            '♥': 'lubov',
            '&': 'i',
            '|': 'abo',
            '<': 'menshe',
            '>': 'bilshe',
            '∑': 'suma',
            '¤': 'valjuta'
        },

        'vn': {
            '∆': 'delta',
            '∞': 'vo cuc',
            '♥': 'yeu',
            '&': 'va',
            '|': 'hoac',
            '<': 'nho hon',
            '>': 'lon hon',
            '∑': 'tong',
            '¤': 'tien te'
        }
    };

    var uricChars = [';', '?', ':', '@', '&', '=', '+', '$', ',', '/'].join('');

    var uricNoSlashChars = [';', '?', ':', '@', '&', '=', '+', '$', ','].join('');

    var markChars = ['.', '!', '~', '*', "'", '(', ')'].join('');

    /**
     * getSlug
     * @param  {string} input input string
     * @param  {object|string} opts config object or separator string/char
     * @api    public
     * @return {string}  sluggified string
     */
    var getSlug = function getSlug(input, opts) {
        var separator = '-';
        var result = '';
        var diatricString = '';
        var convertSymbols = true;
        var customReplacements = {};
        var maintainCase;
        var titleCase;
        var truncate;
        var uricFlag;
        var uricNoSlashFlag;
        var markFlag;
        var symbol;
        var langChar;
        var lucky;
        var i;
        var ch;
        var l;
        var lastCharWasSymbol;
        var lastCharWasDiatric;
        var allowedChars = '';

        if (typeof input !== 'string') {
            return '';
        }

        if (typeof opts === 'string') {
            separator = opts;
        }

        symbol = symbolMap.en;
        langChar = langCharMap.en;

        if (typeof opts === 'object') {
            maintainCase = opts.maintainCase || false;
            customReplacements = (opts.custom && typeof opts.custom === 'object') ? opts.custom : customReplacements;
            truncate = (+opts.truncate > 1 && opts.truncate) || false;
            uricFlag = opts.uric || false;
            uricNoSlashFlag = opts.uricNoSlash || false;
            markFlag = opts.mark || false;
            convertSymbols = (opts.symbols === false || opts.lang === false) ? false : true;
            separator = opts.separator || separator;

            if (uricFlag) {
                allowedChars += uricChars;
            }

            if (uricNoSlashFlag) {
                allowedChars += uricNoSlashChars;
            }

            if (markFlag) {
                allowedChars += markChars;
            }

            symbol = (opts.lang && symbolMap[opts.lang] && convertSymbols) ?
                symbolMap[opts.lang] : (convertSymbols ? symbolMap.en : {});

            langChar = (opts.lang && langCharMap[opts.lang]) ?
                langCharMap[opts.lang] :
                opts.lang === false || opts.lang === true ? {} : langCharMap.en;

            // if titleCase config is an Array, rewrite to object format
            if (opts.titleCase && typeof opts.titleCase.length === 'number' && Array.prototype.toString.call(opts.titleCase)) {
                opts.titleCase.forEach(function (v) {
                    customReplacements[v + ''] = v + '';
                });

                titleCase = true;
            } else {
                titleCase = !!opts.titleCase;
            }

            // if custom config is an Array, rewrite to object format
            if (opts.custom && typeof opts.custom.length === 'number' && Array.prototype.toString.call(opts.custom)) {
                opts.custom.forEach(function (v) {
                    customReplacements[v + ''] = v + '';
                });
            }

            // custom replacements
            Object.keys(customReplacements).forEach(function (v) {
                var r;

                if (v.length > 1) {
                    r = new RegExp('\\b' + escapeChars(v) + '\\b', 'gi');
                } else {
                    r = new RegExp(escapeChars(v), 'gi');
                }

                input = input.replace(r, customReplacements[v]);
            });

            // add all custom replacement to allowed charlist
            for (ch in customReplacements) {
                allowedChars += ch;
            }
        }

        allowedChars += separator;

        // escape all necessary chars
        allowedChars = escapeChars(allowedChars);

        // trim whitespaces
        input = input.replace(/(^\s+|\s+$)/g, '');

        lastCharWasSymbol = false;
        lastCharWasDiatric = false;

        for (i = 0, l = input.length; i < l; i++) {
            ch = input[i];

            if (isReplacedCustomChar(ch, customReplacements)) {
                // don't convert a already converted char
                lastCharWasSymbol = false;
            } else if (langChar[ch]) {
                // process language specific diactrics chars conversion
                ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? ' ' + langChar[ch] : langChar[ch];

                lastCharWasSymbol = false;
            } else if (ch in charMap) {
                // the transliteration changes entirely when some special characters are added
                if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
                    diatricString += ch;
                    ch = '';
                } else if (lastCharWasDiatric === true) {
                    ch = diatricMap[diatricString] + charMap[ch];
                    diatricString = '';
                } else {
                    // process diactrics chars
                    ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? ' ' + charMap[ch] : charMap[ch];
                }

                lastCharWasSymbol = false;
                lastCharWasDiatric = false;
            } else if (ch in diatricMap) {
                diatricString += ch;
                ch = '';
                // end of string, put the whole meaningful word
                if (i === l - 1) {
                    ch = diatricMap[diatricString];
                }
                lastCharWasDiatric = true;
            } else if (
                // process symbol chars
                symbol[ch] && !(uricFlag && uricChars
                    .indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars
                    // .indexOf(ch) !== -1) && !(markFlag && markChars
                    .indexOf(ch) !== -1)) {
                ch = lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
                ch += input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/) ? separator : '';

                lastCharWasSymbol = true;
            } else {
                if (lastCharWasDiatric === true) {
                    ch = diatricMap[diatricString] + ch;
                    diatricString = '';
                    lastCharWasDiatric = false;
                } else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))) {
                    // process latin chars
                    ch = ' ' + ch;
                }
                lastCharWasSymbol = false;
            }

            // add allowed chars
            result += ch.replace(new RegExp('[^\\w\\s' + allowedChars + '_-]', 'g'), separator);
        }

        if (titleCase) {
            result = result.replace(/(\w)(\S*)/g, function (_, i, r) {
                var j = i.toUpperCase() + (r !== null ? r : '');
                return (Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0) ? j : j.toLowerCase();
            });
        }

        // eliminate duplicate separators
        // add separator
        // trim separators from start and end
        result = result.replace(/\s+/g, separator)
            .replace(new RegExp('\\' + separator + '+', 'g'), separator)
            .replace(new RegExp('(^\\' + separator + '+|\\' + separator + '+$)', 'g'), '');

        if (truncate && result.length > truncate) {
            lucky = result.charAt(truncate) === separator;
            result = result.slice(0, truncate);

            if (!lucky) {
                result = result.slice(0, result.lastIndexOf(separator));
            }
        }

        if (!maintainCase && !titleCase) {
            result = result.toLowerCase();
        }

        return result;
    };

    /**
     * createSlug curried(opts)(input)
     * @param   {object|string} opts config object or input string
     * @return  {Function} function getSlugWithConfig()
     **/
    var createSlug = function createSlug(opts) {

        /**
         * getSlugWithConfig
         * @param   {string} input string
         * @return  {string} slug string
         */
        return function getSlugWithConfig(input) {
            return getSlug(input, opts);
        };
    };

    /**
     * escape Chars
     * @param   {string} input string
     */
    var escapeChars = function escapeChars(input) {
        return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, '\\$&');
    };

    /**
     * check if the char is an already converted char from custom list
     * @param   {char} ch character to check
     * @param   {object} customReplacements custom translation map
     */
    var isReplacedCustomChar = function (ch, customReplacements) {
        for (var c in customReplacements) {
            if (customReplacements[c] === ch) {
                return true;
            }
        }
    };

    if ( true && module.exports) {

        // export functions for use in Node
        module.exports = getSlug;
        module.exports.createSlug = createSlug;
    } else if (true) {

        // export function for use in AMD
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return getSlug;
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this);

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/backend.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _back_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @back/index */ "../app-backend-core/lib/index.js");
/* harmony import */ var _back_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_back_index__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue-devtools/shared-utils */ "../shared-utils/lib/index.js");
/* harmony import */ var _vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__);



_vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__.target.__VUE_DEVTOOLS_ON_SOCKET_READY__(() => {
  const socket = _vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__.target.__VUE_DEVTOOLS_SOCKET__;
  const connectedMessage = () => {
    if (_vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__.target.__VUE_DEVTOOLS_TOAST__) {
      _vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__.target.__VUE_DEVTOOLS_TOAST__("Remote Devtools Connected", "normal");
    }
  };
  const disconnectedMessage = () => {
    if (_vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__.target.__VUE_DEVTOOLS_TOAST__) {
      _vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__.target.__VUE_DEVTOOLS_TOAST__("Remote Devtools Disconnected", "error");
    }
  };
  socket.on("connect", () => {
    connectedMessage();
    (0,_back_index__WEBPACK_IMPORTED_MODULE_0__.initBackend)(bridge);
    socket.emit("vue-devtools-init");
  });
  socket.on("disconnect", () => {
    socket.disconnect();
    disconnectedMessage();
  });
  socket.on("vue-devtools-disconnect-backend", () => {
    socket.disconnect();
  });
  const bridge = new _vue_devtools_shared_utils__WEBPACK_IMPORTED_MODULE_1__.Bridge({
    listen(fn) {
      socket.on("vue-message", (data) => fn(data));
    },
    send(data) {
      socket.emit("vue-message", data);
    }
  });
  bridge.on("shutdown", () => {
    socket.disconnect();
    disconnectedMessage();
  });
});

})();

/******/ })()
;