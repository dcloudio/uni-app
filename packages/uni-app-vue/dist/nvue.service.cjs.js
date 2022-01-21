'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
}); // eslint-disable-next-line no-restricted-globals

var VueFactory = require('./nvue.factory.cjs');

var instanceOptions = {};

function createInstanceContext(instanceId, runtimeContext) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var nvue = runtimeContext.nvue;
  var instance = instanceOptions[instanceId] = {
    instanceId,
    config: nvue.config,
    document: nvue.document,
    data
  };
  var Vue = instance.Vue = createVueModuleInstance(instanceId, nvue, runtimeContext.SharedObject);
  var instanceContext = {
    Vue
  };
  Object.freeze(instanceContext);
  return instanceContext;
}

function destroyInstance(instanceId) {
  var instance = instanceOptions[instanceId];

  if (instance && instance.app && instance.document) {
    try {
      instance.app.$.appContext.app.unmount();
      instance.document.destroy();
    } catch (e) {}

    delete instance.document;
    delete instance.app;
  }

  delete instanceOptions[instanceId];
}

function refreshInstance(instanceId, data) {
  var instance = instanceOptions[instanceId];

  if (!instance || !instance.app) {
    return new Error("refreshInstance: instance ".concat(instanceId, " not found!"));
  }

  instance.document.taskCenter.send('dom', {
    action: 'refreshFinish'
  }, []);
}

function createVueModuleInstance(instanceId, nvue, SharedObject) {
  var exports = {};
  VueFactory(exports, nvue.document, SharedObject);
  var Vue = exports.Vue;
  var {
    createApp
  } = Vue;

  Vue.createApp = (rootComponent, rootProps) => initApp(createApp(rootComponent, rootProps), {
    instanceId,
    nvue
  });

  return Vue;
}

function initApp(app, _ref) {
  var {
    instanceId,
    nvue
  } = _ref;
  var {
    config: {
      compilerOptions,
      globalProperties
    },
    mount
  } = app;

  compilerOptions.isCustomElement = name => {
    return !!nvue.supports("@component/".concat(name));
  };

  var instance = instanceOptions[instanceId];
  globalProperties.$instanceId = instanceId;
  globalProperties.$document = instance.document;
  globalProperties.$requireModule = nvue.requireModule;

  app.mount = rootContainer => {
    var proxy = instance.app = mount(rootContainer);

    if (rootContainer === '#root') {
      try {
        // Send "createFinish" signal to native.
        nvue.document.taskCenter.send('dom', {
          action: 'createFinish'
        }, []);
      } catch (e) {}
    }

    return proxy;
  };

  return app;
}

exports.createInstanceContext = createInstanceContext;
exports.destroyInstance = destroyInstance;
exports.refreshInstance = refreshInstance;
