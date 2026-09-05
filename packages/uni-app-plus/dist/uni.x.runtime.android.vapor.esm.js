import { normalizeStyles as normalizeStyles$1, addLeadingSlash, ON_BACK_PRESS, invokeArrayFnsWithResults, invokeArrayFns, ON_HIDE, ON_SHOW, parseQuery, UTSJSONObject, EventChannel, once, parseUrl, Emitter, ON_UNHANDLE_REJECTION, ON_PAGE_NOT_FOUND, ON_ERROR, removeLeadingSlash, getLen, decodedQuery, stringifyQuery, ON_TAB_ITEM_TAP, ON_UNLOAD, ON_READY, ON_PAGE_SCROLL, ON_PULL_DOWN_REFRESH, ON_REACH_BOTTOM, ON_RESIZE, ON_LAUNCH, ON_EXIT, ON_LAST_PAGE_BACK_PRESS, createUniDOMStringMap } from "@dcloudio/uni-shared";
import { extend, isString, isPlainObject, isFunction, isArray, isPromise, hasOwn, remove, invokeArrayFns as invokeArrayFns$1, toTypeString, toRawType } from "@vue/shared";
import { createMountPage, unmountPage, ref, getCurrentGenericInstance, injectHook, markRaw, defineComponent, getCurrentInstance, onMounted, camelize, createVNode, renderSlot } from "vue";
function get$pageByPage(page) {
  return page.vm.$basePage;
}
function getCurrentPage() {
  var pages2 = getCurrentPages();
  var len = pages2.length;
  if (len) {
    return pages2[len - 1];
  }
}
function getCurrentPageMeta() {
  var _getCurrentPage;
  var $page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 || (_getCurrentPage = _getCurrentPage.vm) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.$basePage;
  if ($page) {
    return $page.meta;
  }
}
function getCurrentPageVm() {
  var _getCurrentPage3;
  var page = (_getCurrentPage3 = getCurrentPage()) === null || _getCurrentPage3 === void 0 ? void 0 : _getCurrentPage3.vm;
  if (page) {
    return page.$vm;
  }
}
var PAGE_META_KEYS = ["navigationBar", "pullToRefresh"];
function initGlobalStyle() {
  return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
}
function initRouteMeta(pageMeta, id2) {
  var globalStyle = initGlobalStyle();
  var res = extend({
    id: id2
  }, globalStyle, pageMeta);
  PAGE_META_KEYS.forEach((name) => {
    res[name] = extend({}, globalStyle[name], pageMeta[name]);
  });
  var {
    navigationBar
  } = res;
  navigationBar.titleText && navigationBar.titleImage && (navigationBar.titleText = "");
  return res;
}
function initPageInternalInstance(openType, url, pageQuery, meta, eventChannel, themeMode) {
  var {
    id: id2,
    route
  } = meta;
  var titleColor = normalizeStyles$1(meta.navigationBar, __uniConfig.themeConfig, themeMode).titleColor;
  return {
    id: id2,
    path: addLeadingSlash(route),
    route,
    fullPath: url,
    options: pageQuery,
    meta,
    openType,
    eventChannel,
    statusBarStyle: titleColor === "#ffffff" ? "light" : "dark"
  };
}
function invokeHook(vm, name, args) {
  if (isString(vm)) {
    args = name;
    name = vm;
    vm = getCurrentPageVm();
  } else if (typeof vm === "number") {
    var page = getCurrentPages().find((page2) => get$pageByPage(page2).id === vm);
    if (page) {
      vm = page.$vm;
    } else {
      vm = getCurrentPageVm();
    }
  }
  if (!vm) {
    return;
  }
  {
    if (vm.__call_hook) {
      return vm.__call_hook(name, args);
    }
  }
  var hooks = vm.$[name];
  if (name === ON_BACK_PRESS) {
    return hooks && invokeArrayFnsWithResults(hooks, args).some((ret) => ret === true);
  }
  return hooks && invokeArrayFns(hooks, args);
}
function normalizeRoute(toRoute) {
  if (toRoute.indexOf("/") === 0 || toRoute.indexOf("uni:") === 0) {
    return toRoute;
  }
  var fromRoute = "";
  var pages2 = getCurrentPages();
  if (pages2.length) {
    fromRoute = get$pageByPage(pages2[pages2.length - 1]).route;
  }
  return getRealRoute(fromRoute, toRoute);
}
function getRealRoute(fromRoute, toRoute) {
  if (toRoute.indexOf("/") === 0) {
    return toRoute;
  }
  if (toRoute.indexOf("./") === 0) {
    return getRealRoute(fromRoute, toRoute.slice(2));
  }
  var toRouteArray = toRoute.split("/");
  var toRouteLength = toRouteArray.length;
  var i = 0;
  for (; i < toRouteLength && toRouteArray[i] === ".."; i++) {
  }
  toRouteArray.splice(0, i);
  toRoute = toRouteArray.join("/");
  var fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
  fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
  return addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
}
function getRouteOptions(path) {
  var alias = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  if (alias) {
    return __uniRoutes.find((route) => route.path === path || route.alias === path);
  }
  return __uniRoutes.find((route) => route.path === path);
}
function getRouteMeta(path) {
  var routeOptions = getRouteOptions(path);
  if (routeOptions) {
    return routeOptions.meta;
  }
}
var SYSTEM_DIALOG_PAGE_PATH_STARTER = "uni:";
var SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH = "uni:actionSheet";
function isSystemDialogPage(page) {
  return page.route.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER);
}
function isSystemActionSheetDialogPage(page) {
  return page.route.startsWith(SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH);
}
function dialogPageTriggerParentHide(dialogPage) {
  dialogPageTriggerParentLifeCycle(dialogPage, ON_HIDE);
}
function dialogPageTriggerParentShow(dialogPage) {
  var triggerParentHideDialogPageNum = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  dialogPageTriggerParentLifeCycle(dialogPage, ON_SHOW, triggerParentHideDialogPageNum);
}
function dialogPageTriggerParentLifeCycle(dialogPage, lifeCycle) {
  var triggerParentHideDialogPageNum = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  if (!dialogPage.$triggerParentHide)
    return;
  var pages2 = getCurrentPages();
  var currentPage = pages2[pages2.length - 1];
  if (!currentPage)
    return;
  var parentPage = dialogPage.getParentPage();
  if (!parentPage)
    return;
  if (parentPage !== currentPage)
    return;
  var dialogPages = currentPage.getDialogPages();
  for (var i = 0; i < dialogPages.length; i++) {
    if (!!dialogPages[i].$triggerParentHide) {
      triggerParentHideDialogPageNum++;
      if (triggerParentHideDialogPageNum > 1) {
        return;
      }
    }
  }
  if (triggerParentHideDialogPageNum <= 1) {
    var systemDialogPages = getSystemDialogPages(parentPage);
    for (var _i = 0; _i < systemDialogPages.length; _i++) {
      if (!!systemDialogPages[_i].$triggerParentHide) {
        triggerParentHideDialogPageNum++;
        if (triggerParentHideDialogPageNum > 1) {
          return;
        }
      }
    }
  }
  invokeHook(currentPage.vm, lifeCycle);
}
function getSystemDialogPages(parentPage) {
  if (!parentPage)
    return [];
  {
    return typeof parentPage.__$$getSystemDialogPages === "undefined" ? parentPage.$getSystemDialogPages() : parentPage.__$$getSystemDialogPages();
  }
}
function dialogPageTriggerPrevDialogPageLifeCycle(parentPage, lifeCycle) {
  if (!parentPage)
    return;
  var pages2 = getCurrentPages();
  var currentPage = pages2[pages2.length - 1];
  if (!currentPage || parentPage !== currentPage)
    return;
  var prevDialogPage = getLastDialogPage(currentPage);
  prevDialogPage && invokeHook(prevDialogPage.vm, lifeCycle);
}
function getLastDialogPage(parentPage) {
  var _lastSystemDialogPage, _lastDialogPage$vm;
  if (!parentPage)
    return null;
  var dialogPages = parentPage.getDialogPages();
  var systemDialogPages = getSystemDialogPages(parentPage);
  var lastSystemDialogPage = systemDialogPages[systemDialogPages.length - 1];
  var lastDialogPage = dialogPages[dialogPages.length - 1];
  if (!lastDialogPage)
    return lastSystemDialogPage;
  if (!lastSystemDialogPage)
    return lastDialogPage;
  var lastSystemDialogPageId = ((_lastSystemDialogPage = lastSystemDialogPage.vm) === null || _lastSystemDialogPage === void 0 || (_lastSystemDialogPage = _lastSystemDialogPage.$basePage) === null || _lastSystemDialogPage === void 0 ? void 0 : _lastSystemDialogPage.id) || Number.MAX_SAFE_INTEGER;
  var lastDialogPageId = ((_lastDialogPage$vm = lastDialogPage.vm) === null || _lastDialogPage$vm === void 0 || (_lastDialogPage$vm = _lastDialogPage$vm.$basePage) === null || _lastDialogPage$vm === void 0 ? void 0 : _lastDialogPage$vm.id) || Number.MAX_SAFE_INTEGER;
  return lastSystemDialogPageId > lastDialogPageId ? lastSystemDialogPage : lastDialogPage;
}
function invokeLastDialogPageHookByUniPage(parentPage, hook) {
  var lastDialogPage = getLastDialogPage(parentPage);
  if (lastDialogPage) {
    invokeHook(lastDialogPage.vm, hook);
  }
}
function initPageVm(pageVm, page) {
  pageVm.route = page.route;
  pageVm.$vm = pageVm;
  {
    pageVm.$basePage = page;
  }
  pageVm.$mpType = "page";
  pageVm.$fontFamilySet = /* @__PURE__ */ new Set();
  if (page.meta.isTabBar) {
    pageVm.$.__isTabBar = true;
    pageVm.$.__isActive = true;
  }
}
function createLaunchOptions() {
  return {
    path: "",
    query: {},
    scene: 1001,
    referrerInfo: {
      appId: "",
      extraData: {}
    }
  };
}
function defineGlobalData(app, defaultGlobalData) {
  var options = app.$options || {};
  options.globalData = extend(options.globalData || {}, defaultGlobalData);
  Object.defineProperty(app, "globalData", {
    get() {
      return options.globalData;
    },
    set(newGlobalData) {
      options.globalData = newGlobalData;
    }
  });
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      console.error(e);
    }
  };
}
var invokeCallbackId = 1;
var invokeCallbacks = {};
function addInvokeCallback(id2, name, callback) {
  var keepAlive = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  invokeCallbacks[id2] = {
    name,
    keepAlive,
    callback
  };
  return id2;
}
function invokeCallback(id2, res, extras) {
  if (typeof id2 === "number") {
    var opts = invokeCallbacks[id2];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id2];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
function findInvokeCallbackByName(name) {
  for (var key in invokeCallbacks) {
    if (invokeCallbacks[key].name === name) {
      return true;
    }
  }
  return false;
}
function removeKeepAliveApiCallback(name, callback) {
  for (var key in invokeCallbacks) {
    var item = invokeCallbacks[key];
    if (item.callback === callback && item.name === name) {
      delete invokeCallbacks[key];
    }
  }
}
function removeAllKeepAliveApiCallbacks(name) {
  for (var key in invokeCallbacks) {
    if (invokeCallbacks[key].name === name) {
      delete invokeCallbacks[key];
    }
  }
}
function offKeepAliveApiCallback(name, eventTransport2) {
  var eventName = eventTransport2 ? name : "api." + name;
  var transport = eventTransport2 || UniServiceJSBridge;
  transport.off(eventName);
}
function onKeepAliveApiCallback(name, eventTransport2) {
  var eventName = eventTransport2 ? name : "api." + name;
  var transport = eventTransport2 || UniServiceJSBridge;
  transport.on(eventName, (res) => {
    for (var key in invokeCallbacks) {
      var opts = invokeCallbacks[key];
      if (opts.name === name) {
        opts.callback(res);
      }
    }
  });
}
function createKeepAliveApiCallback(name, callback) {
  return addInvokeCallback(invokeCallbackId++, name, callback, true);
}
var API_SUCCESS = "success";
var API_FAIL = "fail";
var API_COMPLETE = "complete";
function getApiCallbacks(args) {
  var apiCallbacks = {};
  for (var name in args) {
    var fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name) {
  var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var {
    beforeAll,
    beforeSuccess
  } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (!isPlainObject(args)) {
    args = {};
  }
  var {
    success,
    fail,
    complete
  } = getApiCallbacks(args);
  var hasSuccess = isFunction(success);
  var hasFail = isFunction(fail);
  var hasComplete = isFunction(complete);
  var callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
var HOOK_SUCCESS = "success";
var HOOK_FAIL = "fail";
var HOOK_COMPLETE = "complete";
var globalInterceptors = {};
var scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    var hooks = interceptors[name];
    if (!isArray(hooks)) {
      return;
    }
    var oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify(name, fn) {
  return function() {
    var args = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, extend({}, args), rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, fn, extend({}, args, {
        success: resolve,
        fail: reject
      }), rest);
    })));
  };
}
function normalizeFormatApiParams(args) {
  var params = args[0];
  if (isPlainObject(params)) {
    return params;
  }
  var normalizedParams = {};
  args[0] = normalizedParams;
  return normalizedParams;
}
function formatApiArgs(args, options) {
  var rawParams = args[0];
  if (!options || !options.formatArgs || !isPlainObject(options.formatArgs) && isPlainObject(rawParams)) {
    return;
  }
  var params = normalizeFormatApiParams(args);
  var formatArgs = options.formatArgs;
  var keys = Object.keys(formatArgs);
  for (var i = 0; i < keys.length; i++) {
    var name = keys[i];
    var formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      var errMsg = formatterOrDefaultValue(params[name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id2, name, res) {
  var result = {
    errMsg: name + ":ok"
  };
  {
    result.errSubject = name;
  }
  return invokeCallback(id2, extend(res || {}, result));
}
function invokeFail(id2, name, errMsg) {
  var errRes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  var errMsgPrefix = name + ":fail";
  var apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  var res = extend({
    errMsg: apiErrMsg
  }, errRes);
  {
    if (typeof UniError !== "undefined") {
      var errOptions = extend({}, errRes);
      if (typeof errOptions.errSubject === "undefined") {
        errOptions.errSubject = name;
      }
      res = new UniError(apiErrMsg, errOptions);
    }
  }
  return invokeCallback(id2, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  if (options && options.beforeInvoke) {
    var errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  var errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function checkCallback(callback) {
  if (!isFunction(callback)) {
    throw new Error('Invalid args: type check failed for args "callback". Expected Function');
  }
}
function wrapperOnApi(name, fn, options) {
  return (callback) => {
    checkCallback(callback);
    var errMsg = beforeInvokeApi(name, [callback], void 0, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    var isFirstInvokeOnApi = !findInvokeCallbackByName(name);
    createKeepAliveApiCallback(name, callback);
    if (isFirstInvokeOnApi) {
      onKeepAliveApiCallback(name, options === null || options === void 0 ? void 0 : options.eventTransport);
      fn();
    }
  };
}
function wrapperOffApi(name, fn, options) {
  return (callback) => {
    var clearAll = (options === null || options === void 0 ? void 0 : options.allowClearAll) === true && callback == null;
    if (!clearAll) {
      checkCallback(callback);
    }
    var errMsg = beforeInvokeApi(name, clearAll ? [] : [callback], void 0, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    var onApiName = name.replace("off", "on");
    if (clearAll) {
      removeAllKeepAliveApiCallbacks(onApiName);
    } else {
      removeKeepAliveApiCallback(onApiName, callback);
    }
    var hasInvokeOnApi = findInvokeCallbackByName(onApiName);
    if (!hasInvokeOnApi) {
      offKeepAliveApiCallback(onApiName, options === null || options === void 0 ? void 0 : options.eventTransport);
      fn();
    }
  };
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    var id2 = createAsyncApiCallback(name, args, options);
    var errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id2, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id2, name, res),
      reject: (errMsg2, errRes) => invokeFail(id2, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineOnApi(name, fn, options) {
  return wrapperOnApi(name, fn, options);
}
function defineOffApi(name, fn, options) {
  return wrapperOffApi(name, fn, options);
}
function defineTaskApi(name, fn, protocol, options) {
  return promisify(name, wrapperTaskApi(name, fn, void 0, options));
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, void 0, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify(name, wrapperAsyncApi(name, fn, void 0, options));
}
var vueApp;
function getVueApp() {
  return vueApp;
}
function initVueApp(appVm) {
  var internalInstance = appVm.$;
  Object.defineProperty(internalInstance.ctx, "$children", {
    get() {
      return getAllPages().map((page) => page.$vm);
    }
  });
  var appContext = internalInstance.appContext;
  var mountPage = createMountPage(appContext);
  vueApp = extend(appContext.app, {
    mountPage(pageComponent, pageProps, pageContainer) {
      return mountPage(pageComponent, pageProps, pageContainer);
    },
    unmountPage: (pageInstance) => {
      unmountPage(pageInstance);
    }
  });
}
function getPage$BasePage(page) {
  return page.$basePage;
}
var pages = [];
function addCurrentPage(page) {
  var $page = getPage$BasePage(page);
  if (!$page.meta.isNVue) {
    return pages.push(page);
  }
  var index2 = pages.findIndex((p) => getPage$BasePage(p).id === $page.id);
  if (index2 > -1) {
    pages.splice(index2, 1, page);
  } else {
    pages.push(page);
  }
}
function getAllPages() {
  return pages;
}
function getCurrentPages$1() {
  var curPages = getCurrentBasePages();
  {
    return curPages.map((page) => page.$page);
  }
}
function getCurrentBasePages() {
  var curPages = [];
  pages.forEach((page) => {
    if (page.$.__isTabBar) {
      if (page.$.__isActive) {
        curPages.push(page);
      }
    } else {
      curPages.push(page);
    }
  });
  return curPages;
}
function removePage(curPage) {
  var index2 = pages.findIndex((page) => page === curPage);
  if (index2 === -1) {
    return;
  }
  var $basePage = getPage$BasePage(curPage);
  if (!$basePage.meta.isNVue) {
    getVueApp().unmountPage(curPage);
  }
  pages.splice(index2, 1);
  {
    var ins = curPage;
    if (ins.$.page) {
      ins.$.page.vm = null;
      ins.$.page = null;
    }
  }
}
function backbuttonListener() {
  uni.navigateBack({
    from: "backbutton",
    success() {
    }
    // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
  });
}
var enterOptions$1 = /* @__PURE__ */ createLaunchOptions();
var launchOptions$1 = /* @__PURE__ */ createLaunchOptions();
function getLaunchOptions() {
  return extend({}, launchOptions$1);
}
function initLaunchOptions(_ref2) {
  var {
    path,
    query,
    referrerInfo,
    appScheme,
    appLink
  } = _ref2;
  extend(launchOptions$1, {
    path,
    query: query ? parseQuery(query) : {},
    referrerInfo: referrerInfo || {},
    // TODO uni-app x
    channel: void 0,
    launcher: void 0,
    appScheme,
    appLink
  });
  {
    launchOptions$1.query = new UTSJSONObject(launchOptions$1.query);
  }
  extend(enterOptions$1, launchOptions$1);
  return enterOptions$1;
}
var ON_BACK_BUTTON = "onBackButton";
var ON_POP_GESTURE = "onPopGesture";
var OPEN_DIALOG_PAGE = "openDialogPage";
var homeDialogPages = [];
var homeSystemDialogPages = [];
var devToolsPageChangedListener;
function getCurrentDevToolsPage() {
  var pages2 = getCurrentPages();
  var currentPage = pages2[pages2.length - 1] || null;
  var dialogPages = homeDialogPages.length ? homeDialogPages : (currentPage === null || currentPage === void 0 ? void 0 : currentPage.getDialogPages()) || homeDialogPages;
  for (var index2 = dialogPages.length - 1; index2 >= 0; index2--) {
    var dialogPage = dialogPages[index2];
    if (dialogPage.$vm) {
      return dialogPage;
    }
  }
  return currentPage;
}
function isDevToolsDialogPage(page) {
  return page instanceof UniDialogPageImpl;
}
function setDevToolsPageChangedListener(listener) {
  devToolsPageChangedListener = listener;
}
function hasDevToolsPageChangedListener() {
  return !!devToolsPageChangedListener;
}
function notifyDevToolsPageChanged() {
  try {
    var _devToolsPageChangedL;
    (_devToolsPageChangedL = devToolsPageChangedListener) === null || _devToolsPageChangedL === void 0 || _devToolsPageChangedL();
  } catch (error) {
    console.error(error);
  }
}
var currentNormalDialogPage = null;
function setCurrentNormalDialogPage(value) {
  currentNormalDialogPage = value;
}
function getCurrentNormalDialogPage() {
  return currentNormalDialogPage;
}
var currentSystemDialogPage = null;
function setCurrentSystemDialogPage(value) {
  currentSystemDialogPage = value;
}
function getCurrentSystemDialogPage() {
  return currentSystemDialogPage;
}
function setupXPage(instance, pageInstance, pageVm, pageId, pagePath) {
  instance.$dialogPages = ref([]);
  var uniPage;
  if (pageInstance.openType === OPEN_DIALOG_PAGE) {
    if (pagePath.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER)) {
      uniPage = getCurrentSystemDialogPage();
      setCurrentSystemDialogPage(null);
    } else {
      uniPage = getCurrentNormalDialogPage();
      setCurrentNormalDialogPage(null);
    }
  } else {
    uniPage = new UniNormalPageImpl();
  }
  pageVm.$.page = uniPage;
  uniPage.route = pageVm.$basePage.route;
  uniPage.optionsByJS = pageVm.$basePage.options;
  Object.defineProperty(uniPage, "options", {
    get: function() {
      return new UTSJSONObject(pageVm.$basePage.options);
    }
  });
  uniPage.vm = pageVm;
  uniPage.$vm = pageVm;
  if (getPage$BasePage(pageVm).openType !== OPEN_DIALOG_PAGE) {
    addCurrentPageWithInitScope(pageId, pageVm, pageInstance);
  }
}
var nativeApp;
function getNativeApp() {
  return nativeApp;
}
function setNativeApp(app) {
  nativeApp = app;
}
function getPageManager() {
  return nativeApp.pageManager;
}
function removeUrlWrap(source) {
  if (source.startsWith("url(")) {
    if (source.split("format(").length > 1) {
      source = source.split("format(")[0].trim();
    }
    source = source.substring(4, source.length - 1);
  }
  if (source.startsWith('"') || source.startsWith("'")) {
    source = source.substring(1, source.length - 1);
  }
  return source;
}
function getLoadFontFaceOptions(options, res) {
  return {
    family: options.family,
    source: options.source,
    success: (_) => {
      res === null || res === void 0 || res.resolve(null);
    },
    fail: (error) => {
      res === null || res === void 0 || res.reject(
        // new LoadFontFaceErrorImpl(
        error.errMsg,
        error.errCode
        // )
      );
    }
  };
}
var loadFontFace = /* @__PURE__ */ defineAsyncApi(API_LOAD_FONT_FACE, (options, res) => {
  if (options.global === true) {
    appLoadFontFace(options, res);
  } else {
    var page = getCurrentPage();
    if (!page.vm) {
      res.reject("page is not ready", 99);
      return;
    }
    pageLoadFontFace(page.vm, options, res);
  }
});
var appLoadFontFace = (options, res) => {
  options.source = removeUrlWrap(options.source);
  var app = getNativeApp();
  var fontInfo = getLoadFontFaceOptions(options, res);
  app.loadFontFace(fontInfo);
};
var pageLoadFontFace = (pageVm, options, res) => {
  if (pageVm.$fontFamilySet.has(options.family)) {
    return;
  }
  options.source = removeUrlWrap(options.source);
  pageVm.$fontFamilySet.add(options.family);
  var fontInfo = getLoadFontFaceOptions(options, res);
  pageVm.$nativePage.loadFontFace(fontInfo);
};
function loadFontFaceByStyles(styles, pageVm) {
  styles = Array.isArray(styles) ? styles : [styles];
  var fontFaceStyle = [];
  styles.forEach((style) => {
    if (style["@FONT-FACE"]) {
      fontFaceStyle.push(...style["@FONT-FACE"]);
    }
  });
  if (fontFaceStyle.length === 0)
    return;
  fontFaceStyle.forEach((style) => {
    var fontFamily = style["fontFamily"];
    var fontWeight = style["fontWeight"];
    var fontStyle = style["fontStyle"];
    var fontVariant = style["fontVariant"];
    var src = style["src"];
    if (fontFamily != null && src != null) {
      var LoadFontFaceOptions = {
        family: fontFamily,
        source: src,
        desc: {
          style: fontStyle,
          weight: fontWeight,
          variant: fontVariant
        }
      };
      if (pageVm === null) {
        appLoadFontFace(LoadFontFaceOptions, null);
      } else {
        pageLoadFontFace(pageVm, LoadFontFaceOptions, null);
      }
    } else {
      console.warn("loadFontFace: fail, font-family or src is null");
    }
  });
}
function initNativePage(vm) {
  var instance = vm.$;
  if (instance.type.mpType === "app") {
    return;
  }
  var pageId = instance.root.attrs.__pageId;
  vm.$nativePage = getNativeApp().pageManager.findPageById(pageId + "");
  if (vm.$page && vm.$nativePage) {
    vm.$page.__nativePageId = vm.$nativePage.pageId;
  }
}
function initFontFace(vm) {
  var _vm$$page$vm, _vm$$page, _vm$$options$styles;
  var instance = vm.$;
  if (instance.type.mpType === "app") {
    return;
  }
  var pageVm = (_vm$$page$vm = (_vm$$page = vm.$page) === null || _vm$$page === void 0 ? void 0 : _vm$$page.vm) !== null && _vm$$page$vm !== void 0 ? _vm$$page$vm : null;
  if (!pageVm) {
    console.warn("[initFontFace] can not find page, skip loadFontFace");
    return;
  }
  loadFontFaceByStyles((_vm$$options$styles = vm.$options.styles) !== null && _vm$$options$styles !== void 0 ? _vm$$options$styles : [], pageVm);
}
function initComponentInstance(app) {
  app.config.uniX = {
    beforeSetupPage,
    initNativePage,
    initFontFace
  };
  !app.vapor && app.mixin({
    beforeCreate() {
      initNativePage(this);
    },
    beforeMount() {
      initFontFace(this);
    }
  });
}
var beforeSetupPage = (props, ctx) => {
  var {
    attrs: {
      __pageId,
      __pagePath,
      /*__pageQuery,*/
      __pageInstance
    }
  } = ctx;
  var instance = getCurrentGenericInstance();
  var pageVm = instance.proxy;
  initPageVm(pageVm, __pageInstance);
  {
    setupXPage(instance, __pageInstance, pageVm, __pageId, __pagePath);
    initNativePage(pageVm);
  }
};
function setupPage(component) {
  if (!component.__vapor) {
    var oldSetup = component.setup;
    component.inheritAttrs = false;
    component.setup = (props, ctx) => {
      beforeSetupPage(props, ctx);
      if (oldSetup) {
        return oldSetup(props, ctx);
      }
    };
  }
  return component;
}
function initScope(pageId, vm, pageInstance) {
  {
    Object.defineProperty(vm, "$viewToTempFilePath", {
      get() {
        return vm.$nativePage.viewToTempFilePath.bind(vm.$nativePage);
      }
    });
    Object.defineProperty(vm, "$getPageStyle", {
      get() {
        return vm.$nativePage.getPageStyle.bind(vm.$nativePage);
      }
    });
    Object.defineProperty(vm, "$setPageStyle", {
      get() {
        return vm.$nativePage.setPageStyle.bind(vm.$nativePage);
      }
    });
  }
  vm.getOpenerEventChannel = () => {
    if (!pageInstance.eventChannel) {
      pageInstance.eventChannel = new EventChannel(pageId);
    }
    return pageInstance.eventChannel;
  };
  return vm;
}
function addCurrentPageWithInitScope(pageId, pageVm, pageInstance) {
  addCurrentPage(initScope(pageId, pageVm, pageInstance));
}
function isVuePageAsyncComponent(component) {
  return isFunction(component);
}
var pagesMap = /* @__PURE__ */ new Map();
function definePage(pagePath, asyncComponent) {
  pagesMap.set(pagePath, once(createPageFactory(asyncComponent)));
}
function createPageFactory(component) {
  return () => {
    if (isVuePageAsyncComponent(component)) {
      return component().then((component2) => setupPage(clonedPageComponent(component2.default || component2)));
    }
    return setupPage(clonedPageComponent(component));
  };
}
function clonedPageComponent(component) {
  return extend({}, component);
}
function initRouteOptions(path, openType) {
  var routeOptions = JSON.parse(JSON.stringify(getRouteOptions(path)));
  routeOptions.meta = initRouteMeta(routeOptions.meta);
  if (openType !== "preloadPage" && !__uniConfig.realEntryPagePath && (openType === "reLaunch" || getCurrentPages().length === 0)) {
    routeOptions.meta.isQuit = true;
  } else if (!routeOptions.meta.isTabBar) {
    routeOptions.meta.isQuit = false;
  }
  return routeOptions;
}
var id = 1;
function getWebviewId() {
  return id;
}
function genWebviewId() {
  return id++;
}
function resetWebviewId() {
  id = 1;
}
var ANI_SHOW = "pop-in";
var ANI_DURATION = 300;
var ANI_CLOSE = "pop-out";
function hasLeadingSlash(str) {
  return str.indexOf("/") == 0;
}
function getRealPath(path) {
  var fix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  if (hasLeadingSlash(path)) {
    return path;
  }
  if (fix && path.indexOf(".") !== 0) {
    return "/" + path;
  }
  var currentPage = getCurrentPage().vm;
  var currentPath = !currentPage ? "/" : parseUrl(currentPage.route).path;
  var currentPathArray = currentPath.split("/");
  var pathArray = path.split("/");
  var resultArray = [];
  for (var index2 = 0; index2 < pathArray.length; index2++) {
    var element = pathArray[index2];
    if (element == "..") {
      currentPathArray.pop();
    } else if (element != ".") {
      resultArray.push(element);
    }
  }
  return addLeadingSlash(currentPathArray.concat(resultArray).join("/"));
}
var systemRoutes = [];
function registerSystemRoute(route, page) {
  var meta = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (systemRoutes.find((r) => r.path === route)) {
    return;
  }
  systemRoutes.push({
    path: route,
    meta: extend({
      isQuit: false,
      isEntry: false,
      route,
      navigationBar: {}
    }, meta)
  });
  definePage(route, page);
}
var API_ADD_INTERCEPTOR = "addInterceptor";
var API_REMOVE_INTERCEPTOR = "removeInterceptor";
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    var hooks = interceptors2[name];
    var hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
var addInterceptor = /* @__PURE__ */ defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
});
var removeInterceptor = /* @__PURE__ */ defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
});
var API_ON = "$on";
var API_ONCE = "$once";
var API_OFF = "$off";
var API_EMIT = "$emit";
class EventBus {
  constructor() {
    this.$emitter = new Emitter();
  }
  on(name, callback) {
    return this.$emitter.on(name, callback);
  }
  once(name, callback) {
    return this.$emitter.once(name, callback);
  }
  off(name, callback) {
    if (!name) {
      this.$emitter.e = {};
      return;
    }
    this.$emitter.off(name, callback);
  }
  emit(name) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    this.$emitter.emit(name, ...args);
  }
}
var eventBus = new EventBus();
var $on = /* @__PURE__ */ defineSyncApi(API_ON, (name, callback) => {
  var id2 = eventBus.on(name, callback);
  {
    return id2;
  }
});
var $once = /* @__PURE__ */ defineSyncApi(API_ONCE, (name, callback) => {
  var id2 = eventBus.once(name, callback);
  {
    return id2;
  }
});
var $off = /* @__PURE__ */ defineSyncApi(API_OFF, (name, callback) => {
  if (!isArray(name))
    name = name ? [name] : [];
  name.forEach((n) => {
    eventBus.off(n, callback);
    if (
      // @ts-expect-error
      typeof __uniappx__nativeEventBus !== "undefined"
    ) {
      __uniappx__nativeEventBus.off(n, callback);
    }
  });
});
var $emit = /* @__PURE__ */ defineSyncApi(API_EMIT, function(name) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  eventBus.emit(name, ...args);
});
function __f__(type, filename) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  if (filename) {
    args.push(filename);
  }
  console[type].apply(console, args);
}
var appHooks = {
  [ON_UNHANDLE_REJECTION]: [],
  [ON_PAGE_NOT_FOUND]: [],
  [ON_ERROR]: [],
  [ON_SHOW]: [],
  [ON_HIDE]: []
};
function injectAppHooks(appInstance) {
  Object.keys(appHooks).forEach((type) => {
    appHooks[type].forEach((hook) => {
      injectHook(type, hook, appInstance);
    });
  });
}
var API_ON_APP_ROUTE = "onAppRoute";
var API_OFF_APP_ROUTE = "offAppRoute";
var API_ON_BEFORE_APP_ROUTE = "onBeforeAppRoute";
var API_OFF_BEFORE_APP_ROUTE = "offBeforeAppRoute";
var API_REWRITE_ROUTE = "rewriteRoute";
var eventTransport = /* @__PURE__ */ new Emitter();
var activeBeforeAppRouteContext;
var MAX_APP_ROUTE_REWRITE_COUNT = 100;
var APP_ROUTE_ERROR_CODE = 4;
function createAppRouteRuntime() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var routeEventId = 0;
  var onAppRoute2 = /* @__PURE__ */ defineOnApi(API_ON_APP_ROUTE, () => {
  }, {
    eventTransport
  });
  var offAppRoute2 = /* @__PURE__ */ defineOffApi(API_OFF_APP_ROUTE, () => {
  }, {
    allowClearAll: true,
    eventTransport
  });
  var onBeforeAppRoute2 = /* @__PURE__ */ defineOnApi(API_ON_BEFORE_APP_ROUTE, () => {
  }, {
    eventTransport
  });
  var offBeforeAppRoute2 = /* @__PURE__ */ defineOffApi(API_OFF_BEFORE_APP_ROUTE, () => {
  }, {
    allowClearAll: true,
    eventTransport
  });
  var rewriteRoute2 = /* @__PURE__ */ defineAsyncApi(API_REWRITE_ROUTE, (_ref, _ref2) => {
    var {
      url,
      preserveQuery
    } = _ref;
    var {
      resolve,
      reject
    } = _ref2;
    var rejectRewriteRoute = (errMsg) => reject(errMsg, {
      errCode: APP_ROUTE_ERROR_CODE
    });
    var context = activeBeforeAppRouteContext;
    if (!context) {
      rejectRewriteRoute("rewriteRoute is only allowed in a onBeforeAppRoute callback");
      return;
    }
    if (context.event.openType === "navigateBack") {
      rejectRewriteRoute('a "navigateBack" event is not allowed to be rewritten');
      return;
    }
    if (context.rewrite) {
      rejectRewriteRoute('rewriteRoute can only be called once in a route event, this page has been rewritten to "'.concat(context.rewrite.path, '"'));
      return;
    }
    if ((context.rewriteCount || 0) >= MAX_APP_ROUTE_REWRITE_COUNT) {
      rejectRewriteRoute("rewriteRoute exceeded the maximum rewrite count of ".concat(MAX_APP_ROUTE_REWRITE_COUNT));
      return;
    }
    if (!context.normalizeRewriteRoute) {
      rejectRewriteRoute("not supported");
      return;
    }
    var rewrite = context.normalizeRewriteRoute({
      url,
      preserveQuery
    }, context.event);
    if (typeof rewrite === "string") {
      rejectRewriteRoute(rewrite);
      return;
    }
    context.rewrite = rewrite;
    resolve();
  });
  function createAppRouteContext2(event) {
    var _event$timeStamp, _event$routeEventId;
    var timeStamp = (_event$timeStamp = event.timeStamp) !== null && _event$timeStamp !== void 0 ? _event$timeStamp : Date.now();
    return {
      event: {
        path: event.path,
        query: Object.assign({}, event.query),
        openType: event.openType,
        notFound: event.notFound,
        timeStamp,
        routeEventId: (_event$routeEventId = event.routeEventId) !== null && _event$routeEventId !== void 0 ? _event$routeEventId : "".concat(timeStamp, "-").concat(++routeEventId)
      },
      normalizeRewriteRoute: options.normalizeRewriteRoute
    };
  }
  function dispatchBeforeAppRoute2(context) {
    var event = context.event;
    var beforeEvent = {
      path: event.path,
      query: Object.assign({}, event.query),
      openType: event.openType,
      notFound: event.notFound,
      routeEventId: event.routeEventId
    };
    var previousContext = activeBeforeAppRouteContext;
    activeBeforeAppRouteContext = context;
    try {
      eventTransport.emit(API_ON_BEFORE_APP_ROUTE, beforeEvent);
    } catch (error) {
      console.error(error);
    } finally {
      activeBeforeAppRouteContext = previousContext;
    }
    return context.rewrite;
  }
  function dispatchAppRoute2(context) {
    var event = context.event;
    try {
      var routeEvent = {
        path: event.path,
        query: Object.assign({}, event.query),
        openType: event.openType,
        notFound: event.notFound,
        timeStamp: event.timeStamp,
        routeEventId: event.routeEventId
      };
      eventTransport.emit(API_ON_APP_ROUTE, routeEvent);
    } catch (error) {
      console.error(error);
    }
  }
  return {
    onAppRoute: onAppRoute2,
    offAppRoute: offAppRoute2,
    onBeforeAppRoute: onBeforeAppRoute2,
    offBeforeAppRoute: offBeforeAppRoute2,
    rewriteRoute: rewriteRoute2,
    createAppRouteContext: createAppRouteContext2,
    dispatchBeforeAppRoute: dispatchBeforeAppRoute2,
    dispatchAppRoute: dispatchAppRoute2
  };
}
function encodeQueryString(url) {
  if (!isString(url)) {
    return url;
  }
  var index2 = url.indexOf("?");
  if (index2 === -1) {
    return url;
  }
  var query = url.slice(index2 + 1).trim().replace(/^(\?|#|&)/, "");
  if (!query) {
    return url;
  }
  url = url.slice(0, index2);
  var params = [];
  query.split("&").forEach((param) => {
    var parts = param.replace(/\+/g, " ").split("=");
    var key = parts.shift();
    var val = parts.length > 0 ? parts.join("=") : "";
    params.push(key + "=" + encodeURIComponent(val));
  });
  return params.length ? url + "?" + params.join("&") : url;
}
var ANIMATION_IN = ["slide-in-right", "slide-in-left", "slide-in-top", "slide-in-bottom", "fade-in", "zoom-out", "zoom-fade-out", "pop-in", "none"];
var ANIMATION_OUT = ["slide-out-right", "slide-out-left", "slide-out-top", "slide-out-bottom", "fade-out", "zoom-in", "zoom-fade-in", "pop-out", "none"];
var BaseRouteProtocol = {
  url: {
    type: String,
    required: true
  }
};
var API_NAVIGATE_TO = "navigateTo";
var API_REDIRECT_TO = "redirectTo";
var API_RE_LAUNCH = "reLaunch";
var API_SWITCH_TAB = "switchTab";
var API_NAVIGATE_BACK = "navigateBack";
var API_PRELOAD_PAGE = "preloadPage";
var API_UN_PRELOAD_PAGE = "unPreloadPage";
var NavigateToProtocol = /* @__PURE__ */ extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN));
var NavigateBackProtocol = /* @__PURE__ */ extend({
  delta: {
    type: Number
  }
}, createAnimationProtocol(ANIMATION_OUT));
var RedirectToProtocol = BaseRouteProtocol;
var ReLaunchProtocol = BaseRouteProtocol;
var SwitchTabProtocol = BaseRouteProtocol;
var NavigateToOptions = /* @__PURE__ */ createRouteOptions(API_NAVIGATE_TO);
var RedirectToOptions = /* @__PURE__ */ createRouteOptions(API_REDIRECT_TO);
var ReLaunchOptions = /* @__PURE__ */ createRouteOptions(API_RE_LAUNCH);
var SwitchTabOptions = /* @__PURE__ */ createRouteOptions(API_SWITCH_TAB);
var NavigateBackOptions = {
  formatArgs: {
    delta(value, params) {
      value = parseInt(value + "") || 1;
      params.delta = Math.min(getCurrentPages().length - 1, value);
    }
  }
};
function createAnimationProtocol(animationTypes) {
  return {
    animationType: {
      type: String,
      validator(type) {
        if (type && animationTypes.indexOf(type) === -1) {
          return "`" + type + "` is not supported for `animationType` (supported values are: `" + animationTypes.join("`|`") + "`)";
        }
      }
    },
    animationDuration: {
      type: Number
    }
  };
}
var navigatorLock;
function beforeRoute() {
  navigatorLock = "";
}
function createRouteOptions(type) {
  return {
    formatArgs: {
      url: createNormalizeUrl(type)
    },
    beforeAll: beforeRoute
  };
}
function createNormalizeUrl(type) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function normalizeUrl(url, params) {
    if (!url) {
      return 'Missing required args: "url"';
    }
    url = normalizeRoute(url);
    var pagePath = url.split("?")[0];
    var routeOptions = getRouteOptions(pagePath, true);
    if (!routeOptions) {
      return "page `" + url + "` is not found";
    }
    if (type === API_NAVIGATE_TO || type === API_REDIRECT_TO) {
      if (routeOptions.meta.isTabBar) {
        return "can not ".concat(type, " a tabbar page");
      }
    } else if (type === API_SWITCH_TAB) {
      if (!routeOptions.meta.isTabBar) {
        return "can not switch to no-tabBar page";
      }
    }
    if ((type === API_SWITCH_TAB || type === API_PRELOAD_PAGE) && routeOptions.meta.isTabBar && params.openType !== "appLaunch") {
      url = pagePath;
    }
    if (routeOptions.meta.isEntry) {
      url = url.replace(routeOptions.alias, "/");
    }
    params.url = encodeQueryString(url);
    if (type === API_UN_PRELOAD_PAGE) {
      return;
    } else if (type === API_PRELOAD_PAGE) {
      {
        if (!routeOptions.meta.isNVue) {
          return "can not preload vue page";
        }
      }
      if (routeOptions.meta.isTabBar) {
        var pages2 = getCurrentPages();
        var tabBarPagePath = routeOptions.path.slice(1);
        if (pages2.find((page) => page.route === tabBarPagePath)) {
          return "tabBar page `" + tabBarPagePath + "` already exists";
        }
      }
      return;
    }
    if (!options.skipNavigatorLock && navigatorLock === url && params.openType !== "appLaunch") {
      return "".concat(navigatorLock, " locked");
    }
    if (!options.skipNavigatorLock && __uniConfig.ready) {
      navigatorLock = url;
    }
  };
}
var API_LOAD_FONT_FACE = "loadFontFace";
var FRONT_COLORS = ["#ffffff", "#000000"];
var API_SET_NAVIGATION_BAR_COLOR = "setNavigationBarColor";
var SetNavigationBarColorOptions = {
  formatArgs: {
    animation(animation2, params) {
      if (!animation2) {
        animation2 = {
          duration: 0,
          timingFunc: "linear"
        };
      }
      params.animation = {
        duration: animation2.duration || 0,
        timingFunc: animation2.timingFunc || "linear"
      };
    }
  }
};
var SetNavigationBarColorProtocol = {
  frontColor: {
    type: String,
    required: true,
    validator(frontColor) {
      if (FRONT_COLORS.indexOf(frontColor) === -1) {
        return 'invalid frontColor "'.concat(frontColor, '"');
      }
    }
  },
  backgroundColor: {
    type: String,
    required: true
  },
  animation: Object
};
var API_SET_NAVIGATION_BAR_TITLE = "setNavigationBarTitle";
var API_PAGE_SCROLL_TO = "pageScrollTo";
var PageScrollToProtocol = {
  scrollTop: Number,
  selector: String,
  duration: Number
};
var PageScrollToOptions = {
  formatArgs: {
    duration: 300
  }
};
var API_START_PULL_DOWN_REFRESH = "startPullDownRefresh";
var API_STOP_PULL_DOWN_REFRESH = "stopPullDownRefresh";
var IndexProtocol = {
  index: {
    type: Number,
    required: true
  }
};
var IndexOptions = {
  beforeInvoke() {
    var pageMeta = getCurrentPageMeta();
    if (pageMeta && !pageMeta.isTabBar) {
      return "not TabBar page";
    }
  },
  formatArgs: {
    index(value) {
      if (!__uniConfig.tabBar.list[value]) {
        return "tabbar item not found";
      }
    }
  }
};
var API_SET_TAB_BAR_ITEM = "setTabBarItem";
var SetTabBarItemProtocol = /* @__PURE__ */ extend({
  text: String,
  iconPath: String,
  selectedIconPath: String,
  pagePath: String
}, IndexProtocol);
var SetTabBarItemOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /* @__PURE__ */ extend({
    pagePath(value, params) {
      if (value) {
        params.pagePath = removeLeadingSlash(value);
      }
    }
  }, IndexOptions.formatArgs)
};
var API_SET_TAB_BAR_STYLE = "setTabBarStyle";
var SetTabBarStyleProtocol = {
  color: String,
  selectedColor: String,
  backgroundColor: String,
  backgroundImage: String,
  backgroundRepeat: String,
  borderStyle: String
};
var SetTabBarStyleOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: {
    backgroundImage(value, params) {
      {
        params.backgroundImage = value;
        return;
      }
    },
    borderStyle(value, params) {
      if (value) {
        params.borderStyle = value === "white" ? "white" : "black";
      }
    }
  }
};
var API_HIDE_TAB_BAR = "hideTabBar";
var API_SHOW_TAB_BAR = "showTabBar";
var API_HIDE_TAB_BAR_RED_DOT = "hideTabBarRedDot";
var HideTabBarRedDotProtocol = IndexProtocol;
var HideTabBarRedDotOptions = IndexOptions;
var API_SHOW_TAB_BAR_RED_DOT = "showTabBarRedDot";
var ShowTabBarRedDotProtocol = IndexProtocol;
var ShowTabBarRedDotOptions = IndexOptions;
var API_REMOVE_TAB_BAR_BADGE = "removeTabBarBadge";
var RemoveTabBarBadgeProtocol = IndexProtocol;
var RemoveTabBarBadgeOptions = IndexOptions;
var API_SET_TAB_BAR_BADGE = "setTabBarBadge";
var SetTabBarBadgeProtocol = /* @__PURE__ */ extend({
  text: {
    type: String,
    required: true
  }
}, IndexProtocol);
var SetTabBarBadgeOptions = {
  beforeInvoke: IndexOptions.beforeInvoke,
  formatArgs: /* @__PURE__ */ extend({
    text(value, params) {
      if (getLen(value) >= 4) {
        params.text = "...";
      }
    }
  }, IndexOptions.formatArgs)
};
function showWebview(nPage, animationType, animationDuration, showCallback) {
  nPage.show(/* @__PURE__ */ new Map([["animationType", animationType], ["animationDuration", animationDuration]]), showCallback);
}
function closeWebview(nPage, animationType, animationDuration, callback) {
  var options = /* @__PURE__ */ new Map([["animationType", animationType]]);
  if (typeof animationDuration === "number") {
    options.set("animationDuration", animationDuration);
  }
  nPage.close(options, callback);
}
var beforeRouteHooks = [];
var afterRouteHooks = [];
var pageReadyHooks = [];
function onBeforeRoute(hook) {
  beforeRouteHooks.push(hook);
}
function onAfterRoute(hook) {
  afterRouteHooks.push(hook);
}
function onPageReady(hook) {
  pageReadyHooks.push(hook);
}
function invokeBeforeRouteHooks(type) {
  invokeArrayFns$1(beforeRouteHooks, type);
}
function invokeAfterRouteHooks(type) {
  invokeArrayFns$1(afterRouteHooks, type);
}
function invokePageReadyHooks(page) {
  invokeArrayFns$1(pageReadyHooks, page);
}
var BORDER_COLORS = /* @__PURE__ */ new Map([["white", "rgba(255, 255, 255, 0.33)"], ["black", "rgba(0, 0, 0, 0.33)"]]);
function getBorderStyle(borderStyle) {
  var value = BORDER_COLORS.get(borderStyle);
  if (borderStyle && !value) {
    console.warn("4.23 版本起，在 pages.json 设置 tabbar borderStyle、在 uni.setTabBarStyle 设置 borderStyle 时仅支持 white/black，推荐使用 borderColor 自定义颜色。");
  }
  return value || BORDER_COLORS.get("black");
}
function fixBorderStyle(tabBarConfig) {
  var borderStyle = tabBarConfig.get("borderStyle");
  var borderColor = tabBarConfig.get("borderColor");
  var isBorderColorFilled = isString(borderColor);
  borderStyle = getBorderStyle(borderStyle);
  if (isBorderColorFilled) {
    borderStyle = borderColor;
  }
  tabBarConfig.set("borderStyle", borderStyle);
  tabBarConfig.delete("borderColor");
}
function parseRedirectInfo(appid, redirectInfo) {
  var _redirectInfo$get, _redirectInfo$get2, _redirectInfo$get3, _redirectInfo$get4, _redirectInfo$get5;
  var path = (_redirectInfo$get = redirectInfo.get("path")) !== null && _redirectInfo$get !== void 0 ? _redirectInfo$get : "";
  var query = (_redirectInfo$get2 = redirectInfo.get("query")) !== null && _redirectInfo$get2 !== void 0 ? _redirectInfo$get2 : "";
  var userAction = (_redirectInfo$get3 = redirectInfo.get("userAction")) !== null && _redirectInfo$get3 !== void 0 ? _redirectInfo$get3 : false;
  var appScheme = (_redirectInfo$get4 = redirectInfo.get("appScheme")) !== null && _redirectInfo$get4 !== void 0 ? _redirectInfo$get4 : "";
  var appLink = (_redirectInfo$get5 = redirectInfo.get("appLink")) !== null && _redirectInfo$get5 !== void 0 ? _redirectInfo$get5 : "";
  var referrerInfo = {
    appId: appid,
    extraData: {}
  };
  return {
    path: path || "",
    query: query ? "?" + query : "",
    referrerInfo,
    userAction,
    appScheme,
    appLink
  };
}
function normalizeRewriteRoute(_ref, event) {
  var {
    url,
    preserveQuery
  } = _ref;
  if (preserveQuery) {
    url = parseUrl(url).path + stringifyQuery(event.query);
  }
  var params = {
    url,
    openType: event.openType
  };
  var errMsg = createNormalizeUrl(event.openType, {
    skipNavigatorLock: true
  })(url, params);
  if (errMsg) {
    return errMsg;
  }
  var {
    path,
    query
  } = parseUrl(params.url);
  return {
    url: params.url,
    path: removeLeadingSlash(path),
    query: decodedQuery(query),
    notFound: false
  };
}
var appRouteRuntime = createAppRouteRuntime({
  normalizeRewriteRoute
});
var onAppRoute = appRouteRuntime.onAppRoute;
var offAppRoute = appRouteRuntime.offAppRoute;
var onBeforeAppRoute = appRouteRuntime.onBeforeAppRoute;
var offBeforeAppRoute = appRouteRuntime.offBeforeAppRoute;
var rewriteRoute = appRouteRuntime.rewriteRoute;
function createAppRouteContext(path, query, openType) {
  var notFound = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  return appRouteRuntime.createAppRouteContext({
    path: removeLeadingSlash(path),
    query: decodedQuery(query),
    openType,
    notFound
  });
}
function resolveAppRoute(url, openType) {
  var notFound = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var routeUrl = url;
  var routeNotFound = notFound;
  var rewriteCount = 0;
  while (true) {
    var {
      path,
      query
    } = parseUrl(routeUrl);
    var context = createAppRouteContext(path, query, openType, routeNotFound);
    context.rewriteCount = rewriteCount;
    var rewrite = appRouteRuntime.dispatchBeforeAppRoute(context);
    if (!rewrite) {
      return {
        url: routeUrl,
        context
      };
    }
    routeUrl = rewrite.url;
    routeNotFound = rewrite.notFound;
    rewriteCount++;
  }
}
function dispatchBeforeAppRoute(context) {
  return appRouteRuntime.dispatchBeforeAppRoute(context);
}
function dispatchAppRoute(contextOrPath) {
  var query = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var openType = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "appLaunch";
  var notFound = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var context = typeof contextOrPath === "string" ? createAppRouteContext(contextOrPath, query, openType, notFound) : contextOrPath;
  var event = context.event;
  if (event.notFound) {
    invokeHook(getApp().vm, ON_PAGE_NOT_FOUND, {
      path: event.path,
      query: Object.assign({}, event.query),
      isEntryPage: event.openType === "appLaunch"
    });
  }
  appRouteRuntime.dispatchAppRoute(context);
}
function dispatchAppRouteNotFound(url, context) {
  if (!context) {
    var {
      path,
      query
    } = parseUrl(url);
    context = createAppRouteContext(path, query, "appLaunch", true);
  }
  dispatchAppRoute(context);
}
var onTabBarMidButtonTapCallback = [];
var tabBar0 = null;
var selected0 = -1;
var tabs = /* @__PURE__ */ new Map();
function getTabList() {
  var tabConfig = __uniConfig.tabBar ? /* @__PURE__ */ new Map() : null;
  if (__uniConfig.tabBar) {
    for (var key in __uniConfig.tabBar) {
      tabConfig.set(key, __uniConfig.tabBar[key]);
    }
  }
  if (tabConfig === null) {
    return null;
  }
  var list = tabConfig.get("list");
  return list;
}
function init() {
  var _uniConfig$globalSty, _uniConfig$globalSty2;
  var list = getTabList();
  var style = /* @__PURE__ */ new Map();
  style.set("navigationStyle", "custom");
  style.set("pageOrientation", (_uniConfig$globalSty = (_uniConfig$globalSty2 = __uniConfig.globalStyle) === null || _uniConfig$globalSty2 === void 0 ? void 0 : _uniConfig$globalSty2.pageOrientation) !== null && _uniConfig$globalSty !== void 0 ? _uniConfig$globalSty : "portrait");
  var page = getPageManager().createPage(
    "tabBar",
    // id 后增加 Date.now() 保证唯一性，与 android 端统一
    "tabBar_".concat(Date.now()),
    style
  );
  var document = page.createDocument(new NodeData("root", "view", /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map([["flex", "1"]])));
  var tabParent = document.createElement(new NodeData("tabs", "tabs", /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map([["overflow", "hidden"], ["flex", "1"]])));
  document.appendChild(tabParent);
  tabBar0 = document.getRealDomNodeById("tabs");
  var _tabBarConfig = extend({}, __uniConfig.tabBar);
  normalizeTabBarStyles(_tabBarConfig, __uniConfig.themeConfig, getAppThemeFallbackOS());
  var tabBarConfig = /* @__PURE__ */ new Map();
  for (var key in _tabBarConfig) {
    tabBarConfig.set(key, _tabBarConfig[key]);
  }
  fixBorderStyle(tabBarConfig);
  tabBar0.initTabBar(tabBarConfig);
  tabBar0.addEventListener("tabBarItemTap", function(event) {
    var index2 = event.index;
    var item = list[index2];
    var path = item.pagePath;
    if (isString(path) && findPageRoute(getRealPath(path, true))) {
      uni.switchTab({
        url: getRealPath(path, true),
        success() {
          invokeHook(ON_TAB_ITEM_TAP, {
            index: index2,
            pagePath: item.pagePath,
            text: item.text
          });
        }
      });
    } else {
      console.error("switchTab: pagePath not found");
    }
  });
  tabBar0.addEventListener("tabBarMidButtonTap", function(event) {
    onTabBarMidButtonTapCallback.forEach((callback) => {
      if (typeof callback === "function") {
        callback();
      }
    });
  });
  page.startRender();
  page.show(null);
}
function clearTabBarStatus() {
  tabBar0 = null;
  selected0 = -1;
  tabs.clear();
}
function removeTabBarPage(page) {
  var pagePath = getRealPath(page.route, true);
  if (tabs.get(pagePath) === page) {
    tabs.delete(pagePath);
    if (getTabIndex(pagePath) === selected0) {
      selected0 = -1;
    }
  }
}
function getTabBar() {
  return tabBar0;
}
function getTabIndex(path) {
  var list = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getTabList();
  var selected = -1;
  if (list && list.length !== 0) {
    for (var index2 = 0; index2 < list.length; index2++) {
      var page = list[index2];
      var pagePath = page.pagePath;
      if (isString(pagePath) && getRealPath(pagePath, true) == getRealPath(path, true)) {
        selected = index2;
        break;
      }
    }
  }
  return selected;
}
function findPageRoute(path) {
  return __uniRoutes.find((route) => route.path === path);
}
function createTab(path, query, callback) {
  registerPage({
    url: path,
    path,
    query,
    openType: "switchTab",
    onRegistered() {
      var page = getCurrentPage().vm;
      tabBar0.appendItem(page.$basePage.id.toString());
      callback(page);
    }
  });
}
function findTabPage(path) {
  var _tabs$get;
  var page = (_tabs$get = tabs.get(path)) !== null && _tabs$get !== void 0 ? _tabs$get : null;
  var pages2 = getAllPages();
  pages2.forEach((item) => item.$.__isActive = item === page);
  if (page !== null) {
    var index2 = pages2.indexOf(page);
    if (index2 !== pages2.length - 1) {
      pages2.splice(index2, 1);
      pages2.push(page);
    }
  }
  return page;
}
function isTabPage(page) {
  var has = false;
  tabs.forEach((value, key) => {
    if (value === page) {
      has = true;
    }
  });
  return has;
}
class TabPageInfo {
  constructor(page, isFirst) {
    this.page = page;
    this.isFirst = isFirst;
  }
}
function getTabPage(path) {
  var query = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var rebuild = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var callback = arguments.length > 3 ? arguments[3] : void 0;
  var page = findTabPage(path);
  var isFirst = false;
  if (page === null || rebuild) {
    isFirst = true;
    createTab(path, query, (page2) => {
      tabs.set(path, page2);
      callback(new TabPageInfo(page2, isFirst));
    });
  } else {
    callback(new TabPageInfo(page, isFirst));
  }
}
function switchSelect(selected, path) {
  var _getCurrentPage;
  var query = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var rebuild = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var callback = arguments.length > 4 ? arguments[4] : void 0;
  var appRouteOpenType = arguments.length > 5 ? arguments[5] : void 0;
  var shouldDispatchAppRoute = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : true;
  var appRouteContext = arguments.length > 7 ? arguments[7] : void 0;
  var onComplete = arguments.length > 8 ? arguments[8] : void 0;
  var shouldShow = false;
  if (tabBar0 === null) {
    init();
  }
  var currentPage = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
  var type = appRouteOpenType !== null && appRouteOpenType !== void 0 ? appRouteOpenType : currentPage == null ? "appLaunch" : "switchTab";
  invokeBeforeRouteHooks(type);
  getTabPage(getRealPath(path, true), query, rebuild, (pageInfo) => {
    callback === null || callback === void 0 || callback();
    var page = pageInfo.page;
    if (currentPage !== page) {
      shouldShow = true;
      if (currentPage && isTabPage(currentPage)) {
        invokeHook(currentPage, ON_HIDE);
      }
    }
    tabBar0.switchSelect(page.$basePage.id.toString(), selected);
    if (shouldShow) {
      invokeHook(page, ON_SHOW);
      if (shouldDispatchAppRoute) {
        if (appRouteContext) {
          dispatchAppRoute(appRouteContext);
        } else {
          dispatchAppRoute(path, query, type);
        }
      }
    }
    selected0 = selected;
    invokeAfterRouteHooks(type);
    onComplete === null || onComplete === void 0 || onComplete();
  });
}
var THEME_KEY_PREFIX = "@";
var APP_THEME_LIGHT = "light";
var APP_THEME_DARK = "dark";
function getAppThemeFallbackOS() {
  var fallbackOSTheme = APP_THEME_LIGHT;
  {
    return getNativeApp().isDarkTheme ? APP_THEME_DARK : fallbackOSTheme;
  }
}
function normalizePageStyles(pageStyle, themeConfig, themeMode) {
  var themeMap = themeConfig === null || themeConfig === void 0 ? void 0 : themeConfig[themeMode];
  if (!themeMap) {
    return;
  }
  normalizeStyles(pageStyle, themeMap);
}
function normalizeStyles(style, themeMap) {
  Object.keys(style).forEach((key) => {
    var value = style[key];
    if (isString(value)) {
      var valueAsString = value;
      if (valueAsString.startsWith(THEME_KEY_PREFIX)) {
        var valueKey = valueAsString.slice(1);
        var configValue = themeMap[valueKey];
        if (configValue != null) {
          style[key] = configValue;
        }
      }
    } else if (isArray(value)) {
      var valueAsArray = value;
      valueAsArray.forEach((item) => {
        normalizeStyles(item, themeMap);
      });
    } else if (isPlainObject(value)) {
      normalizeStyles(value, themeMap);
    }
  });
}
function normalizeTabBarStyles(tabBar, themeConfig, themeMode) {
  if (!themeConfig) {
    return;
  }
  var themeMap = themeConfig[themeMode];
  if (themeMap == null) {
    return;
  }
  normalizeStyles(tabBar, themeMap);
}
function hasThemeValue(value) {
  if (isString(value)) {
    return value.charCodeAt(0) === 64;
  }
  if (isArray(value)) {
    return value.some(hasThemeValue);
  }
  return isPlainObject(value) && Object.keys(value).some((key) => hasThemeValue(value[key]));
}
function createThemeVariants(style, themeConfig) {
  var snapshot = {};
  Object.keys(style).forEach((key) => {
    if (hasThemeValue(style[key])) {
      snapshot[key] = style[key];
    }
  });
  if (Object.keys(snapshot).some((key) => key.startsWith("navigation"))) {
    Object.keys(style).forEach((key) => {
      if (key.startsWith("navigation")) {
        snapshot[key] = style[key];
      }
    });
  }
  if (Object.keys(snapshot).length === 0) {
    return null;
  }
  var light = JSON.parse(JSON.stringify(snapshot));
  var dark = JSON.parse(JSON.stringify(snapshot));
  normalizeStyles(light, themeConfig.light || {});
  normalizeStyles(dark, themeConfig.dark || {});
  delete light.navigationStyle;
  delete dark.navigationStyle;
  if (JSON.stringify(light) === JSON.stringify(dark)) {
    return null;
  }
  return {
    light,
    dark
  };
}
function createThemeSnapshots() {
  var routes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : __uniRoutes;
  var themeConfig = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : __uniConfig.themeConfig;
  var tabBarConfig = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : __uniConfig.getTabBarConfig();
  if (themeConfig == null) {
    return;
  }
  var pages2 = {};
  routes.forEach((route) => {
    var routePath = route.meta.route || route.path.replace(/^\/+/, "");
    var style = initRouteOptions(route.path, "").meta;
    delete style.navigationBar;
    if (Object.keys(style).some((key) => key.startsWith("navigation")) && style.navigationBarTextStyle !== "custom" && !style.isQuit && routePath !== __uniConfig.realEntryPagePath) {
      style.navigationBarAutoBackButton = true;
    }
    var variants = createThemeVariants(style, themeConfig);
    if (variants != null) {
      if (!route.meta.backgroundColorContent && "backgroundColorContent" in variants.light) {
        variants.preserveDialogBackgroundColorContent = true;
      }
      pages2[routePath] = variants;
    }
  });
  var tabBar = tabBarConfig ? createThemeVariants(tabBarConfig, themeConfig) || void 0 : void 0;
  if (Object.keys(pages2).length === 0 && tabBar == null) {
    return;
  }
  var result = {
    pages: pages2
  };
  if (tabBar != null) {
    result.tabBar = tabBar;
  }
  return result;
}
function registerThemeConfig() {
  var config = createThemeSnapshots();
  if (config != null) {
    var app = getNativeApp();
    if (!__uni__app_RegisterThemeConfig(app.id, config)) {
      throw new Error("Failed to register app theme config");
    }
  }
}
function useTheme() {
  {
    registerThemeConfig();
    return;
  }
}
function setStatusBarStyle() {
  var page;
  {
    var currentPage = getCurrentPage();
    var dialogPages = currentPage === null || currentPage === void 0 ? void 0 : currentPage.getDialogPages();
    var systemDialogPages = getSystemDialogPages(currentPage);
    if (systemDialogPages !== null && systemDialogPages !== void 0 && systemDialogPages.length && dialogPages !== null && dialogPages !== void 0 && dialogPages.length) {
      var lastSystemDialogPage = systemDialogPages[systemDialogPages.length - 1];
      var lastDialogPage = dialogPages[dialogPages.length - 1];
      if (lastSystemDialogPage && lastDialogPage) {
        page = Number(lastSystemDialogPage.__nativePageId) > Number(lastDialogPage.__nativePageId) ? lastSystemDialogPage.vm : lastDialogPage.vm;
      } else {
        page = (lastSystemDialogPage === null || lastSystemDialogPage === void 0 ? void 0 : lastSystemDialogPage.vm) || (lastDialogPage === null || lastDialogPage === void 0 ? void 0 : lastDialogPage.vm);
      }
    } else if (dialogPages !== null && dialogPages !== void 0 && dialogPages.length) {
      var _dialogPages;
      page = (_dialogPages = dialogPages[dialogPages.length - 1]) === null || _dialogPages === void 0 ? void 0 : _dialogPages.vm;
    } else if (systemDialogPages !== null && systemDialogPages !== void 0 && systemDialogPages.length) {
      var _systemDialogPages;
      page = (_systemDialogPages = systemDialogPages[systemDialogPages.length - 1]) === null || _systemDialogPages === void 0 ? void 0 : _systemDialogPages.vm;
    } else {
      page = currentPage === null || currentPage === void 0 ? void 0 : currentPage.vm;
    }
  }
  if (page) {
    var nativePage = page.$nativePage;
    nativePage.applyStatusBarStyle();
  }
}
function closeNativeDialogPage(dialogPage, animationType, animationDuration, callback) {
  var _dialogPage$vm;
  var webview = getNativeApp().pageManager.findPageById(((_dialogPage$vm = dialogPage.vm) === null || _dialogPage$vm === void 0 ? void 0 : _dialogPage$vm.$basePage.id) + "");
  if (webview) {
    closeWebview(webview, animationType || "none", animationDuration || 0, () => {
      getVueApp().unmountPage(dialogPage.vm);
      setStatusBarStyle();
    });
  }
}
var closeDialogPage = (options) => {
  var _options$success, _options$complete;
  var currentPages = getCurrentPages();
  var currentPage = currentPages[currentPages.length - 1];
  if (!currentPage) {
    triggerFailCallback$1(options, "currentPage is null");
    return;
  }
  var observeDevToolsPage = typeof __UNI_X_DEVTOOLS__ !== "undefined" && __UNI_X_DEVTOOLS__ ? hasDevToolsPageChangedListener() : false;
  var previousDevToolsPage = observeDevToolsPage ? getCurrentDevToolsPage() : null;
  if ((options === null || options === void 0 ? void 0 : options.animationType) === "pop-out") {
    options.animationType = "none";
  }
  if (options !== null && options !== void 0 && options.dialogPage) {
    var dialogPage = options === null || options === void 0 ? void 0 : options.dialogPage;
    if (!(dialogPage instanceof UniDialogPageImpl)) {
      triggerFailCallback$1(options, "dialogPage is not a valid page");
      return;
    }
    var parentPage = dialogPage.getParentPage();
    if (!isSystemDialogPage(dialogPage)) {
      if (parentPage && (isTabPage(parentPage.vm) || currentPages.indexOf(parentPage) !== -1)) {
        var parentDialogPages = parentPage.getDialogPages();
        var index2 = parentDialogPages.indexOf(dialogPage);
        closeNativeDialogPage(dialogPage, (options === null || options === void 0 ? void 0 : options.animationType) || "auto", (options === null || options === void 0 ? void 0 : options.animationDuration) || ANI_DURATION);
        parentDialogPages.splice(index2, 1);
        if (index2 === parentDialogPages.length) {
          dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_SHOW);
        }
      } else {
        triggerFailCallback$1(options, "dialogPage is not a valid page");
        return;
      }
    } else {
      var systemDialogPages = getSystemDialogPages(parentPage);
      if (systemDialogPages) {
        var _index = systemDialogPages.indexOf(dialogPage);
        if (_index > -1) {
          closeNativeDialogPage(dialogPage, (options === null || options === void 0 ? void 0 : options.animationType) || "auto", (options === null || options === void 0 ? void 0 : options.animationDuration) || ANI_DURATION);
          systemDialogPages.splice(_index, 1);
          if (_index === systemDialogPages.length) {
            dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_SHOW);
          }
        } else {
          triggerFailCallback$1(options, "dialogPage is not a valid page");
        }
      }
      return;
    }
  } else {
    var dialogPages = currentPage.getDialogPages();
    for (var i = dialogPages.length - 1; i >= 0; i--) {
      closeNativeDialogPage(dialogPages[i], (options === null || options === void 0 ? void 0 : options.animationType) || "auto", (options === null || options === void 0 ? void 0 : options.animationDuration) || ANI_DURATION);
      if (i > 0) {
        invokeHook(dialogPages[i - 1].$vm, ON_SHOW);
      }
      dialogPages[i] = null;
    }
    dialogPages.length = 0;
  }
  if (observeDevToolsPage && previousDevToolsPage !== getCurrentDevToolsPage()) {
    notifyDevToolsPageChanged();
  }
  var successOptions = {
    errMsg: "closeDialogPage: ok"
  };
  options === null || options === void 0 || (_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, successOptions);
  options === null || options === void 0 || (_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, successOptions);
};
function triggerFailCallback$1(options, errMsg) {
  var _options$fail, _options$complete2;
  var failOptions = new UniError("uni-openDialogPage", 4, "openDialogPage: fail, ".concat(errMsg));
  options === null || options === void 0 || (_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, failOptions);
  options === null || options === void 0 || (_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, failOptions);
}
var VAPOR_PAGE_STYLE_PROPERTIES = [
  {
    name: "enableBackToTop",
    defaultValue: false
  },
  {
    name: "bounces",
    defaultValue: false
  },
  {
    name: "androidOverscroll",
    defaultValue: false
  },
  {
    name: "backgroundTextStyle",
    defaultValue: "dark",
    allowedValues: ["dark", "light"]
  },
  // Apply the Android-specific color after the default refresher style.
  {
    name: "androidRefresherColor",
    defaultValue: ""
  },
  {
    name: "backgroundColor",
    defaultValue: "transparent"
  }
];
function normalizeVaporPageStyleValue(value, property) {
  var {
    allowedValues,
    defaultValue
  } = property;
  if (allowedValues && !allowedValues.includes(value)) {
    return defaultValue;
  }
  return typeof value === typeof defaultValue ? value : defaultValue;
}
function initVaporPageStyle(page, pageStyle) {
  var pageStyleOwner = page.$page;
  var flushPageStyleQueue = () => {
    var _pageStyleOwner$__flu;
    pageStyleOwner === null || pageStyleOwner === void 0 || (_pageStyleOwner$__flu = pageStyleOwner.__flushVaporPageStyleQueue) === null || _pageStyleOwner$__flu === void 0 || _pageStyleOwner$__flu.call(pageStyleOwner);
  };
  var rootElement = page.$el;
  if (!rootElement || rootElement.tagName !== "PAGE" || rootElement instanceof UniViewElementImpl) {
    flushPageStyleQueue();
    return;
  }
  if (typeof (pageStyleOwner === null || pageStyleOwner === void 0 ? void 0 : pageStyleOwner.__setVaporPageStyle) !== "function") {
    flushPageStyleQueue();
    return;
  }
  var setVaporPageStyle = pageStyleOwner.__setVaporPageStyle;
  var setVaporPageStyleInitialValue = pageStyleOwner.__setVaporPageStyleInitialValue;
  VAPOR_PAGE_STYLE_PROPERTIES.forEach((property) => {
    var _pageStyleOwner$__vap;
    var value = normalizeVaporPageStyleValue(pageStyle[property.name], property);
    setVaporPageStyleInitialValue === null || setVaporPageStyleInitialValue === void 0 || setVaporPageStyleInitialValue.call(pageStyleOwner, property.name, value);
    if (value === property.defaultValue || (_pageStyleOwner$__vap = pageStyleOwner.__vaporPageStyleOverrides) !== null && _pageStyleOwner$__vap !== void 0 && _pageStyleOwner$__vap.has(property.name)) {
      return;
    }
    setVaporPageStyle.call(pageStyleOwner, property.name, value);
  });
  flushPageStyleQueue();
}
function parsePageStyle(route) {
  var style = /* @__PURE__ */ new Map();
  var routeMeta = route.meta;
  var routeKeys = [
    "id",
    "route",
    "i18n",
    "isQuit",
    "isEntry",
    "isTabBar",
    "tabBarIndex",
    "tabBarText",
    "windowTop",
    "topWindow",
    "leftWindow",
    "rightWindow",
    "eventChannel",
    // 忽略 initRouteMeta产生的 navigationBar 对象
    "navigationBar"
  ];
  var navKeys = ["navigationBarTitleText", "navigationBarBackgroundColor", "navigationBarTextStyle", "navigationStyle"];
  normalizePageStyles(routeMeta, __uniConfig.themeConfig, getAppThemeFallbackOS());
  Object.keys(routeMeta).forEach((key) => {
    if (!routeKeys.includes(key) && !navKeys.includes(key)) {
      style.set(key, routeMeta[key]);
    }
  });
  var navigationBar = {};
  navKeys.forEach((key) => {
    if (key in routeMeta) {
      navigationBar[key] = routeMeta[key];
    }
  });
  if (Object.keys(navigationBar).length > 0) {
    if (navigationBar.navigationBarTextStyle !== "custom" && !routeMeta.isQuit && routeMeta.route !== __uniConfig.realEntryPagePath) {
      style.set("navigationBarAutoBackButton", true);
    }
    Object.keys(navigationBar).forEach((key) => {
      style.set(key, navigationBar[key]);
    });
  }
  return style;
}
function invokeMountedJobs(proxy) {
  var {
    mountedJobs
  } = proxy.$;
  if (mountedJobs) {
    var jobs = mountedJobs.slice();
    mountedJobs.length = 0;
    jobs.forEach((job) => job());
  }
}
function invokePageOnReady(pageComponentPublicInstance) {
  {
    invokeMountedJobs(pageComponentPublicInstance);
    invokePageReadyHooks(pageComponentPublicInstance);
    invokeHook(pageComponentPublicInstance, ON_READY);
  }
}
function registerPage(_ref, onCreated) {
  var {
    url,
    path,
    query,
    openType,
    appRouteOpenType,
    appRouteContext,
    webview,
    nvuePageVm,
    eventChannel,
    onRegistered
  } = _ref;
  var delay = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var id2 = genWebviewId();
  var routeOptions = initRouteOptions(path, openType);
  var pageStyle = parsePageStyle(routeOptions);
  if (openType === "reLaunch") {
    pageStyle.set("disableSwipeBack", true);
  }
  var nativePage = getPageManager().createPage(url, id2.toString(), pageStyle);
  if (onCreated) {
    onCreated(nativePage);
  }
  routeOptions.meta.id = parseInt(nativePage.pageId);
  var route = path.slice(1);
  var pageInstance = initPageInternalInstance(
    openType,
    url,
    query,
    routeOptions.meta,
    eventChannel,
    // TODO ThemeMode
    "light"
  );
  function handleHomeDialogPages(homePage, sourceDialogPages, targetDialogPages) {
    sourceDialogPages.forEach((dialogPage) => {
      dialogPage.getParentPage = () => homePage;
      targetDialogPages.push(dialogPage);
    });
    sourceDialogPages.length = 0;
  }
  function fn() {
    createVuePage(id2, route, query, pageInstance, {}, nativePage).then((pageComponentPublicInstance) => {
      if (appRouteContext) {
        dispatchAppRoute(appRouteContext);
      } else if (appRouteOpenType) {
        dispatchAppRoute(route, query, appRouteOpenType);
      }
      var pages2 = getCurrentPages();
      if (pages2.length === 1) {
        var homePage = pages2[0];
        if (homeDialogPages.length) {
          handleHomeDialogPages(homePage, homeDialogPages, homePage.getDialogPages());
        }
        if (homeSystemDialogPages.length) {
          handleHomeDialogPages(homePage, homeSystemDialogPages, getSystemDialogPages(homePage));
        }
      }
      nativePage.addPageEventListener(ON_POP_GESTURE, function(e) {
        uni.navigateBack({
          from: "popGesture",
          fail(e2) {
            if (e2.errMsg.endsWith("cancel")) {
              nativePage.show();
            }
          }
        });
      });
      nativePage.addPageEventListener(ON_UNLOAD, (_) => {
        invokeHook(pageComponentPublicInstance, ON_UNLOAD);
      });
      nativePage.addPageEventListener(ON_READY, (_) => {
        {
          initVaporPageStyle(pageComponentPublicInstance, routeOptions.meta);
          initVaporPageLifeCycle(pageComponentPublicInstance, nativePage);
        }
        invokePageOnReady(pageComponentPublicInstance);
      });
      nativePage.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
        invokeHook(pageComponentPublicInstance, ON_PAGE_SCROLL, {
          scrollTop: arg.scrollTop
        });
      });
      nativePage.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
        invokeHook(pageComponentPublicInstance, ON_PULL_DOWN_REFRESH);
      });
      nativePage.addPageEventListener(ON_REACH_BOTTOM, (_) => {
        invokeHook(pageComponentPublicInstance, ON_REACH_BOTTOM);
      });
      nativePage.addPageEventListener(ON_RESIZE, (arg) => {
        var args = {
          deviceOrientation: arg.deviceOrientation,
          size: {
            windowWidth: arg.size.windowWidth,
            windowHeight: arg.size.windowHeight,
            screenWidth: arg.size.screenWidth,
            screenHeight: arg.size.screenHeight
          }
        };
        invokeHook(pageComponentPublicInstance, ON_RESIZE, args);
      });
      nativePage.startRender();
      onRegistered === null || onRegistered === void 0 || onRegistered(nativePage);
    });
  }
  if (delay) {
    setTimeout(fn, delay);
  } else {
    fn();
  }
  return nativePage;
}
function initVaporPageLifeCycle(pageComponentPublicInstance, nativePage) {
  var pageRootEl = pageComponentPublicInstance.$el;
  if (!pageRootEl)
    return;
  if (
    // @ts-expect-error
    (pageComponentPublicInstance._.onReachBottom || // @ts-expect-error
    pageComponentPublicInstance._.onPageScroll) && pageRootEl.tagName === "PAGE" && pageRootEl instanceof UniViewElementImpl == false
  ) {
    var triggeredReachBottom = false;
    var scrollEventId = pageRootEl.addEventListener("scroll", (e) => {
      var scrollTop = e.target.scrollTop;
      if (pageComponentPublicInstance._.onPageScroll) {
        invokeHook(pageComponentPublicInstance, ON_PAGE_SCROLL, {
          scrollTop
        });
      }
      if (pageComponentPublicInstance._.onReachBottom) {
        var scrollHeight = e.target.scrollHeight;
        var pageRootElHeight = pageRootEl.getBoundingClientRect().height;
        if (scrollTop + pageRootElHeight >= scrollHeight - (pageComponentPublicInstance.$basePage.meta.onReachBottomDistance || 50)) {
          !triggeredReachBottom && invokeHook(pageComponentPublicInstance, ON_REACH_BOTTOM);
          triggeredReachBottom = true;
        } else {
          triggeredReachBottom = false;
        }
      }
    });
    nativePage.addPageEventListener(ON_UNLOAD, (_) => {
      pageRootEl.removeEventListener("scroll", scrollEventId);
    });
  }
  if (pageRootEl.tagName === "PAGE" && pageRootEl instanceof UniViewElementImpl == false) {
    var pulldownRefreshEventId = pageRootEl.addEventListener("refresherrefresh", () => {
      invokeHook(pageComponentPublicInstance, ON_PULL_DOWN_REFRESH);
    });
    nativePage.addPageEventListener(ON_UNLOAD, (_) => {
      pageRootEl.removeEventListener("refresherrefresh", pulldownRefreshEventId);
    });
  }
}
function registerDialogPage(_ref2, dialogPage, onCreated) {
  var _uniRoutes$find;
  var {
    url,
    path,
    query,
    openType,
    eventChannel,
    onRegistered
  } = _ref2;
  var delay = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  var id2 = genWebviewId();
  var routeOptions = initRouteOptions(path, openType);
  var pageStyle = parsePageStyle(routeOptions);
  var routePageMeta = (_uniRoutes$find = __uniRoutes.find((route2) => route2.path === path)) === null || _uniRoutes$find === void 0 ? void 0 : _uniRoutes$find.meta;
  if (!(routePageMeta !== null && routePageMeta !== void 0 && routePageMeta.navigationStyle)) {
    pageStyle.set("navigationStyle", "custom");
  }
  if (!(routePageMeta !== null && routePageMeta !== void 0 && routePageMeta.backgroundColorContent)) {
    pageStyle.set("backgroundColorContent", "transparent");
  }
  if (typeof pageStyle.get("disableSwipeBack") !== "boolean") {
    pageStyle.set("disableSwipeBack", true);
  }
  if (typeof pageStyle.get("androidThreeButtonNavigationTranslucent") !== "boolean") {
    pageStyle.set("androidThreeButtonNavigationTranslucent", true);
  }
  var parentPage = dialogPage.getParentPage();
  var pageManager = getPageManager();
  var createDialogPage = pageManager.createDialogPage.bind(pageManager);
  var isHarmony = createDialogPage.length === 6;
  var nativePage = isHarmony ? createDialogPage(url, id2.toString(), pageStyle, parentPage === null || parentPage === void 0 ? void 0 : parentPage.getNativePage()) : createDialogPage(
    // @ts-expect-error
    parentPage ? parentPage.__nativePageId : "",
    id2.toString(),
    url,
    pageStyle
  );
  if (onCreated) {
    onCreated(nativePage);
  }
  routeOptions.meta.id = parseInt(nativePage.pageId);
  var route = path.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER) ? path : path.slice(1);
  var pageInstance = initPageInternalInstance(
    openType,
    url,
    query,
    routeOptions.meta,
    eventChannel,
    // TODO ThemeMode
    "light"
  );
  function fn() {
    createVuePage(id2, route, query, pageInstance, {}, nativePage).then((pageComponentPublicInstance) => {
      nativePage.addPageEventListener(ON_POP_GESTURE, function(e) {
        closeDialogPage({
          dialogPage
        });
      });
      nativePage.addPageEventListener(ON_UNLOAD, (_) => {
        invokeHook(pageComponentPublicInstance, ON_UNLOAD);
        dialogPageTriggerParentShow(dialogPage, isSystemDialogPage(dialogPage) ? 1 : 0);
      });
      nativePage.addPageEventListener(ON_READY, (_) => {
        invokePageOnReady(pageComponentPublicInstance);
      });
      nativePage.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
        invokeHook(pageComponentPublicInstance, ON_PAGE_SCROLL, arg);
      });
      nativePage.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
        invokeHook(pageComponentPublicInstance, ON_PULL_DOWN_REFRESH);
      });
      nativePage.addPageEventListener(ON_REACH_BOTTOM, (_) => {
        invokeHook(pageComponentPublicInstance, ON_REACH_BOTTOM);
      });
      nativePage.addPageEventListener(ON_RESIZE, (arg) => {
        var args = {
          deviceOrientation: arg.deviceOrientation,
          size: {
            windowWidth: arg.size.windowWidth,
            windowHeight: arg.size.windowHeight,
            screenWidth: arg.size.screenWidth,
            screenHeight: arg.size.screenHeight
          }
        };
        invokeHook(pageComponentPublicInstance, ON_RESIZE, args);
      });
      nativePage.startRender();
      if (typeof __UNI_X_DEVTOOLS__ !== "undefined" && __UNI_X_DEVTOOLS__ && hasDevToolsPageChangedListener() && !isSystemDialogPage(dialogPage) && getCurrentDevToolsPage() === dialogPage) {
        notifyDevToolsPageChanged();
      }
    });
  }
  if (delay) {
    setTimeout(fn, delay);
  } else {
    fn();
  }
  return nativePage;
}
function createVuePage(__pageId, __pagePath, __pageQuery, __pageInstance, pageOptions, nativePage) {
  var pageNode = nativePage.document.body;
  var app = getVueApp();
  var component = pagesMap.get(__pagePath)();
  var mountPage = (component2) => app.mountPage(component2, extend({
    __pageId,
    __pagePath,
    __pageQuery,
    __pageInstance
  }, __pageQuery), pageNode);
  if (isPromise(component)) {
    return component.then((component2) => mountPage(component2)).catch((err) => {
      console.error(err);
      throw err;
    });
  }
  return {
    then(fn) {
      return fn(mountPage(component));
    }
  };
}
var isInitEntryPage = false;
function initEntry(app, redirectInfo) {
  if (isInitEntryPage) {
    return;
  }
  isInitEntryPage = true;
  var entryPagePath;
  var entryPageQuery;
  if (redirectInfo.size > 0) {
    var {
      path,
      query
      /* referrerInfo, appScheme, appLink */
    } = parseRedirectInfo(app.appid, redirectInfo);
    if (path) {
      entryPagePath = path;
      entryPageQuery = query;
    }
  }
  if (!entryPagePath || entryPagePath === __uniConfig.entryPagePath) {
    if (entryPageQuery) {
      __uniConfig.entryPageQuery = entryPageQuery;
    }
    return;
  }
  var entryRoute = addLeadingSlash(entryPagePath);
  var routeOptions = getRouteOptions(entryRoute);
  if (!routeOptions) {
    return;
  }
  if (!routeOptions.meta.isTabBar) {
    __uniConfig.realEntryPagePath = __uniConfig.realEntryPagePath || __uniConfig.entryPagePath;
  }
  __uniConfig.entryPagePath = entryPagePath;
  __uniConfig.entryPageQuery = entryPageQuery;
}
function initGlobalEvent(app) {
  app.addKeyEventListener(ON_BACK_BUTTON, () => {
    var currentPage = getCurrentPage();
    if (currentPage) {
      var lastDialogPage = getLastDialogPage(currentPage);
      if (lastDialogPage) {
        handleDialogPageBack(lastDialogPage);
        return true;
      }
    }
    backbuttonListener();
    return true;
  });
}
function handleDialogPageBack(dialogPage) {
  var onBackPressRes = invokeHook(dialogPage.vm, ON_BACK_PRESS, {
    from: "navigateBack"
  });
  if (onBackPressRes !== true) {
    closeDialogPage({
      dialogPage,
      animationType: "auto"
    });
  }
}
var API_GET_LAUNCH_OPTIONS_SYNC = "getLaunchOptionsSync";
var launchOptions = {
  path: "",
  appScheme: null,
  appLink: null
};
var setLaunchOptionsSync = function(options) {
  launchOptions = options;
};
var getLaunchOptionsSync = /* @__PURE__ */ defineSyncApi(API_GET_LAUNCH_OPTIONS_SYNC, () => {
  var baseInfo = getLaunchOptions();
  return Object.assign({}, baseInfo, launchOptions);
});
var API_GET_ENTER_OPTIONS_SYNC = "getEnterOptionsSync";
var enterOptions = {
  path: "",
  appScheme: null,
  appLink: null
};
var setEnterOptionsSync = function(options) {
  enterOptions = options;
};
var getEnterOptionsSync = /* @__PURE__ */ defineSyncApi(API_GET_ENTER_OPTIONS_SYNC, () => {
  var baseInfo = getLaunchOptions();
  return Object.assign({}, baseInfo, enterOptions);
});
function initAppLaunch(appVm) {
  var _app$getLaunchOptions;
  injectAppHooks(appVm.$);
  var {
    entryPagePath,
    entryPageQuery,
    referrerInfo
  } = __uniConfig;
  var args = initLaunchOptions({
    path: entryPagePath,
    query: entryPageQuery,
    referrerInfo
  });
  var app = getNativeApp();
  var schemaLink = (_app$getLaunchOptions = app.getLaunchOptionsSync()) !== null && _app$getLaunchOptions !== void 0 ? _app$getLaunchOptions : {
    appScheme: "",
    appLink: ""
  };
  var appScheme = schemaLink.appScheme == null ? null : schemaLink.appScheme.length === 0 ? null : schemaLink.appScheme;
  var appLink = schemaLink.appLink == null ? null : schemaLink.appLink.length === 0 ? null : schemaLink.appLink;
  var launchOption = extend({}, args, {
    appScheme,
    appLink
  });
  setLaunchOptionsSync(launchOption);
  invokeHook(appVm, ON_LAUNCH, launchOption);
  var showOption = extend({}, launchOption);
  setEnterOptionsSync(showOption);
  invokeHook(appVm, ON_SHOW, showOption);
  var appStyle = appVm.$options.styles;
  if (appStyle) {
    loadFontFaceByStyles(appStyle, null);
  }
  useTheme();
}
function initAppError(appVm, nativeApp2) {
  nativeApp2.addEventListener(ON_ERROR, function(errorEvent) {
    invokeHook(appVm, ON_ERROR, errorEvent.error);
  });
}
var redirectTo = /* @__PURE__ */ defineAsyncApi(API_REDIRECT_TO, (_ref, _ref2) => {
  var {
    url
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var {
    path,
    query
  } = parseUrl(url);
  if (!entryPageState.isReady) {
    redirectToPagesBeforeEntryPages.push({
      args: {
        url,
        path,
        query
      },
      handler: {
        resolve,
        reject
      }
    });
    return;
  }
  _redirectTo({
    url,
    path,
    query
  }).then(resolve).catch(reject);
}, RedirectToProtocol, RedirectToOptions);
function _redirectTo(options) {
  var appRoute = resolveAppRoute(options.url, API_REDIRECT_TO);
  var {
    path,
    query
  } = parseUrl(appRoute.url);
  return new Promise((resolve) => {
    setTimeout(() => {
      var lastPage = getCurrentPage().vm;
      var isRegistered = false;
      var isShown = false;
      function callback() {
        if (!(isRegistered && isShown)) {
          return;
        }
        if (lastPage) {
          removePages(lastPage);
        }
        resolve(void 0);
        setStatusBarStyle();
      }
      invokeAfterRouteHooks(API_REDIRECT_TO);
      showWebview(registerPage({
        url: appRoute.url,
        path,
        query,
        openType: isTabPage(lastPage) || getAllPages().length === 1 ? "reLaunch" : "redirectTo",
        appRouteOpenType: API_REDIRECT_TO,
        appRouteContext: appRoute.context,
        onRegistered() {
          isRegistered = true;
          callback();
        }
      }), "none", 0, () => {
        isShown = true;
        callback();
      });
      invokeBeforeRouteHooks(API_REDIRECT_TO);
    }, 0);
  });
}
function removePages(currentPage) {
  if (isTabPage(currentPage)) {
    var pages2 = getAllPages().slice(0, -1);
    pages2.forEach((page) => {
      closePage(page, "none");
    });
  } else {
    closePage(currentPage, "none");
  }
}
var $reLaunch = (_ref, _ref2) => {
  var {
    url
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var {
    path,
    query
  } = parseUrl(url);
  if (!entryPageState.isReady) {
    reLaunchPagesBeforeEntryPages.push({
      args: {
        url
      },
      handler: {
        resolve,
        reject
      }
    });
    return;
  }
  _reLaunch({
    url,
    path,
    query
  }).then(resolve).catch(reject);
};
function _reLaunch(options) {
  var appRouteOpenType = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : API_RE_LAUNCH;
  var resolvedAppRoute = arguments.length > 2 ? arguments[2] : void 0;
  var appRoute = resolvedAppRoute || resolveAppRoute(options.url, appRouteOpenType);
  var {
    path,
    query
  } = parseUrl(appRoute.url);
  return new Promise((resolve) => {
    setTimeout(() => {
      var pages2 = getAllPages().slice(0);
      var selected = getTabIndex(path);
      var isRegistered = false;
      var isShown = false;
      function callback() {
        if (!isRegistered || !isShown) {
          return;
        }
        pages2.forEach((page) => closePage(page, "none"));
        pages2.length = 0;
        resolve(void 0);
        setStatusBarStyle();
      }
      if (selected === -1) {
        showWebview(registerPage({
          url: appRoute.url,
          path,
          query,
          openType: "reLaunch",
          appRouteOpenType,
          appRouteContext: appRoute.context,
          onRegistered() {
            isRegistered = true;
            callback();
          }
        }), "none", 0, () => {
          isShown = true;
          callback();
        });
      } else {
        isRegistered = true;
        isShown = true;
        switchSelect(selected, path, query, true, callback, appRouteOpenType, true, appRoute.context);
      }
    }, 0);
  });
}
var reLaunch = /* @__PURE__ */ defineAsyncApi(API_RE_LAUNCH, $reLaunch, ReLaunchProtocol, ReLaunchOptions);
function closePage(page, animationType, animationDuration) {
  if (page.$page) {
    clearDialogPages(page.$page);
  }
  var nativePage = page.$nativePage;
  nativePage && closeWebview(nativePage, animationType, animationDuration);
  removePage(page);
  removeTabBarPage(page);
}
function updateEntryPageIsReady(path) {
  if (!getCurrentPage() && path === addLeadingSlash(__uniConfig.entryPagePath)) {
    entryPageState.isReady = true;
  }
}
function handleBeforeEntryPageRoutes() {
  if (entryPageState.handledBeforeEntryPageRoutes) {
    return;
  }
  entryPageState.handledBeforeEntryPageRoutes = true;
  var navigateToPages = [...navigateToPagesBeforeEntryPages];
  navigateToPagesBeforeEntryPages.length = 0;
  navigateToPages.forEach((_ref) => {
    var {
      args,
      handler
    } = _ref;
    return $navigateTo(args, handler);
  });
  var switchTabPages = [...switchTabPagesBeforeEntryPages];
  switchTabPagesBeforeEntryPages.length = 0;
  switchTabPages.forEach((_ref2) => {
    var {
      args,
      handler
    } = _ref2;
    return $switchTab(args, handler);
  });
  var redirectToPages = [...redirectToPagesBeforeEntryPages];
  redirectToPagesBeforeEntryPages.length = 0;
  redirectToPages.forEach((_ref3) => {
    var {
      args,
      handler
    } = _ref3;
    return _redirectTo(args).then(handler.resolve).catch(handler.reject);
  });
  var reLaunchPages = [...reLaunchPagesBeforeEntryPages];
  reLaunchPagesBeforeEntryPages.length = 0;
  reLaunchPages.forEach((_ref4) => {
    var {
      args,
      handler
    } = _ref4;
    return $reLaunch(args, handler);
  });
}
function closePreSystemDialogPage(dialogPages, type) {
  var targetSystemDialogPages = dialogPages.filter((page) => page.route.startsWith(type));
  if (targetSystemDialogPages.length > 1) {
    setTimeout(() => {
      closeNativeDialogPage(targetSystemDialogPages[0]);
      dialogPages.splice(dialogPages.indexOf(targetSystemDialogPages[0]), 1);
    }, 150);
  }
}
function clearDialogPages(uniPage) {
  var dialogPages = uniPage.getDialogPages();
  for (var i = dialogPages.length - 1; i >= 0; i--) {
    closeNativeDialogPage(dialogPages[i]);
    if (i > 0) {
      invokeHook(dialogPages[i - 1].vm, ON_SHOW);
    }
  }
  var systemDialogPages = getSystemDialogPages(uniPage);
  for (var _i = 0; _i < systemDialogPages.length; _i++) {
    closeNativeDialogPage(systemDialogPages[_i]);
  }
  systemDialogPages.length = 0;
}
function $switchTab(args, _ref) {
  var {
    resolve,
    reject
  } = _ref;
  var appRouteOpenType = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : API_SWITCH_TAB;
  var shouldDispatchAppRoute = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  var resolvedAppRoute = arguments.length > 4 ? arguments[4] : void 0;
  var {
    url
  } = args;
  var {
    path: originalPath
  } = parseUrl(url);
  if (appRouteOpenType === "appLaunch") {
    entryPageState.isReady = true;
  } else {
    updateEntryPageIsReady(originalPath);
  }
  if (!entryPageState.isReady) {
    switchTabPagesBeforeEntryPages.push({
      args,
      handler: {
        resolve,
        reject
      }
    });
    return;
  }
  var appRoute = shouldDispatchAppRoute && (appRouteOpenType !== API_SWITCH_TAB || !isCurrentTab(originalPath)) ? resolvedAppRoute || resolveAppRoute(url, appRouteOpenType) : void 0;
  var routeUrl = (appRoute === null || appRoute === void 0 ? void 0 : appRoute.url) || url;
  var {
    path,
    query
  } = parseUrl(routeUrl);
  _switchTab({
    url: routeUrl,
    path,
    query
  }, appRouteOpenType, shouldDispatchAppRoute, appRoute === null || appRoute === void 0 ? void 0 : appRoute.context).then(resolve).catch(reject);
  handleBeforeEntryPageRoutes();
}
var switchTab = /* @__PURE__ */ defineAsyncApi(API_SWITCH_TAB, $switchTab, SwitchTabProtocol, SwitchTabOptions);
function isCurrentTab(path) {
  var pages2 = getCurrentBasePages();
  var currentPage = pages2[pages2.length - 1];
  return !!currentPage && isTabPage(currentPage) && getTabIndex(currentPage.$basePage.path) === getTabIndex(path);
}
function _switchTab(_ref2, appRouteOpenType, shouldDispatchAppRoute, appRouteContext) {
  var {
    url,
    path,
    query
  } = _ref2;
  var selected = getTabIndex(path);
  if (selected == -1) {
    return Promise.reject("tab ".concat(path, " not found"));
  }
  var pages2 = getCurrentBasePages();
  return new Promise((resolve) => {
    setTimeout(() => {
      switchSelect(selected, path, query, false, void 0, appRouteOpenType, shouldDispatchAppRoute, appRouteContext, () => resolve(void 0));
      for (var index2 = pages2.length - 1; index2 >= 0; index2--) {
        var page = pages2[index2];
        if (isTabPage(page)) {
          break;
        }
        closePage(page, "none");
      }
    }, 0);
  });
}
var isLaunchWebviewReady = false;
function subscribeWebviewReady(_data, pageId) {
  if (isLaunchWebviewReady) {
    return;
  }
  {
    isLaunchWebviewReady = true;
  }
  onLaunchWebviewReady();
}
function onLaunchWebviewReady() {
  var _routeOptions;
  var entryPageUrl = addLeadingSlash(__uniConfig.entryPagePath) + (__uniConfig.entryPageQuery || "");
  var routeOptions = getRouteOptions(parseUrl(entryPageUrl).path);
  var appRoute = resolveAppRoute(entryPageUrl, "appLaunch", !routeOptions);
  var isEntryPageNotFound = appRoute.context.event.notFound;
  if (isEntryPageNotFound) {
    dispatchAppRouteNotFound(entryPageUrl, appRoute.context);
    if (__uniRoutes.length > 0) {
      entryPageUrl = addLeadingSlash(__uniRoutes[0].path) + (__uniConfig.entryPageQuery || "");
      routeOptions = getRouteOptions(parseUrl(entryPageUrl).path);
    } else {
      console.error("未匹配到路由，请检查配置");
      return;
    }
  } else {
    entryPageUrl = appRoute.url;
    routeOptions = getRouteOptions(parseUrl(entryPageUrl).path);
  }
  var args = {
    url: entryPageUrl,
    openType: "appLaunch"
  };
  var handler = {
    resolve() {
    },
    reject() {
    }
  };
  if ((_routeOptions = routeOptions) !== null && _routeOptions !== void 0 && (_routeOptions = _routeOptions.meta) !== null && _routeOptions !== void 0 && _routeOptions.isTabBar) {
    return $switchTab(args, handler, "appLaunch", !isEntryPageNotFound, isEntryPageNotFound ? void 0 : appRoute);
  }
  return $navigateTo(args, handler, "appLaunch", !isEntryPageNotFound, isEntryPageNotFound ? void 0 : appRoute);
}
function clearWebviewReady() {
  isLaunchWebviewReady = false;
}
function initSubscribeHandlers() {
  subscribeWebviewReady();
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c), u = i.value;
  } catch (n2) {
    return void e(n2);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(r, o) {
      var a = n.apply(t, e);
      function _next(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
      }
      function _throw(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
      }
      _next(void 0);
    });
  };
}
function initOn(app, unregisterApp2) {
  app.addEventListener(ON_SHOW, /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(function* (event) {
      var _getCurrentPage;
      var app2 = getNativeApp();
      var MAX_TIMEOUT = 200;
      function getNewIntent() {
        return new Promise((resolve, reject) => {
          var callbackWrapper = null;
          var handleNewIntent = (newIntent) => {
            var _newIntent$appScheme, _newIntent$appLink;
            clearTimeout(timeout);
            app2.removeEventListener("onNewIntent", callbackWrapper);
            resolve({
              appScheme: (_newIntent$appScheme = newIntent.appScheme) !== null && _newIntent$appScheme !== void 0 ? _newIntent$appScheme : null,
              appLink: (_newIntent$appLink = newIntent.appLink) !== null && _newIntent$appLink !== void 0 ? _newIntent$appLink : null
            });
          };
          callbackWrapper = app2.addEventListener("onNewIntent", handleNewIntent);
          var timeout = setTimeout(() => {
            app2.removeEventListener("onNewIntent", callbackWrapper);
            var appLink = {
              appScheme: null,
              appLink: null
            };
            resolve(appLink);
          }, MAX_TIMEOUT);
        });
      }
      var schemaLink = yield getNewIntent();
      var showOptions = extend({
        path: __uniConfig.entryPagePath
      }, schemaLink);
      setEnterOptionsSync(showOptions);
      var page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
      invokeHook(getApp().vm, ON_SHOW, showOptions);
      if (page) {
        invokeHook(page, ON_SHOW);
      }
    });
    return function(_x) {
      return _ref.apply(this, arguments);
    };
  }());
  app.addEventListener(ON_HIDE, function() {
    var _getCurrentPage2;
    var page = (_getCurrentPage2 = getCurrentPage()) === null || _getCurrentPage2 === void 0 ? void 0 : _getCurrentPage2.vm;
    invokeHook(getApp().vm, ON_HIDE);
    if (page) {
      invokeHook(page, ON_HIDE);
    }
  });
  app.addEventListener(ON_EXIT, function() {
    var appInstance = getApp().vm;
    var pages2 = getAllPages().slice(0);
    pages2.forEach((page) => closePage(page, "none"));
    clearTabBarStatus();
    clearWebviewReady();
    resetWebviewId();
    invokeHook(appInstance, ON_EXIT);
    unregisterApp2();
  });
}
function initService(app, unregisterApp2) {
  initOn(app, unregisterApp2);
}
var appCtx;
var entryPageState = {
  isReady: false,
  handledBeforeEntryPageRoutes: false
};
var navigateToPagesBeforeEntryPages = [];
var switchTabPagesBeforeEntryPages = [];
var redirectToPagesBeforeEntryPages = [];
var reLaunchPagesBeforeEntryPages = [];
function initAppVm(appVm) {
  appVm.$vm = appVm;
  appVm.$mpType = "app";
}
function initUniApp(uniApp) {
  uniApp.vm = appCtx;
  uniApp.$vm = appCtx;
  Object.defineProperty(uniApp, "globalData", {
    get: () => {
      return appCtx.globalData || {};
    }
  });
}
function registerApp(appVm, nativeApp2, uniApp) {
  setNativeApp(nativeApp2);
  initVueApp(appVm);
  appCtx = appVm;
  initAppVm(appCtx);
  initUniApp(uniApp);
  var defaultApp = {
    globalData: {}
  };
  extend(appCtx, defaultApp);
  defineGlobalData(appCtx, defaultApp.globalData);
  initService(nativeApp2, unregisterApp);
  var redirectInfo = nativeApp2.getRedirectInfo();
  initEntry(nativeApp2, redirectInfo);
  initEntryPagePath(redirectInfo);
  initGlobalEvent(nativeApp2);
  initAppLaunch(appVm);
  initAppError(appVm, nativeApp2);
  initSubscribeHandlers();
  __uniConfig.ready = true;
}
function unregisterApp() {
  appCtx.$.appContext.app.unmount();
  appCtx = void 0;
  setNativeApp(void 0);
  __uniConfig.ready = false;
}
function initApp(app) {
  initComponentInstance(app);
}
function initEntryPagePath(redirectInfo) {
  var debugInfo = redirectInfo.get("debug");
  if (debugInfo) {
    var url = debugInfo.get("url");
    if (url && url != __uniConfig.entryPagePath) {
      __uniConfig.realEntryPagePath = __uniConfig.entryPagePath;
      var [path, query] = url.split("?");
      __uniConfig.entryPagePath = path;
      if (query) {
        __uniConfig.entryPageQuery = "?".concat(query);
      }
      return;
    }
  }
  if (__uniConfig.conditionUrl) {
    __uniConfig.realEntryPagePath = __uniConfig.entryPagePath;
    var conditionUrl = __uniConfig.conditionUrl;
    var [_path, _query] = conditionUrl.split("?");
    __uniConfig.entryPagePath = _path;
    if (_query) {
      __uniConfig.entryPageQuery = "?".concat(_query);
    }
  }
}
function $navigateTo(args, _ref) {
  var {
    resolve,
    reject
  } = _ref;
  var appRouteOpenType = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : API_NAVIGATE_TO;
  var shouldDispatchAppRoute = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  var resolvedAppRoute = arguments.length > 4 ? arguments[4] : void 0;
  var {
    url,
    events,
    animationType,
    animationDuration
  } = args;
  var {
    path: originalPath
  } = parseUrl(url);
  if (appRouteOpenType === "appLaunch") {
    entryPageState.isReady = true;
  } else {
    updateEntryPageIsReady(originalPath);
  }
  if (!entryPageState.isReady) {
    navigateToPagesBeforeEntryPages.push({
      args,
      handler: {
        resolve,
        reject
      }
    });
    return;
  }
  var appRoute = shouldDispatchAppRoute ? resolvedAppRoute || resolveAppRoute(url, appRouteOpenType) : void 0;
  var routeUrl = (appRoute === null || appRoute === void 0 ? void 0 : appRoute.url) || url;
  var {
    path,
    query
  } = parseUrl(routeUrl);
  var [aniType, aniDuration] = initAnimation$1(path, animationType, animationDuration);
  _navigateTo({
    url: routeUrl,
    path,
    query,
    events,
    aniType,
    aniDuration
  }, appRouteOpenType, shouldDispatchAppRoute, appRoute === null || appRoute === void 0 ? void 0 : appRoute.context).then(resolve).catch(reject);
  handleBeforeEntryPageRoutes();
}
var navigateTo = /* @__PURE__ */ defineAsyncApi(API_NAVIGATE_TO, $navigateTo, NavigateToProtocol, NavigateToOptions);
function _navigateTo(_ref2, appRouteOpenType, shouldDispatchAppRoute, appRouteContext) {
  var _getCurrentPage;
  var {
    url,
    path,
    query,
    events,
    aniType,
    aniDuration
  } = _ref2;
  var currentPage = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
  invokeBeforeRouteHooks(appRouteOpenType);
  invokeHook(ON_HIDE);
  currentPage && invokeLastDialogPageHookByUniPage(currentPage.$page, ON_HIDE);
  var eventChannel = new EventChannel(getWebviewId() + 1, events);
  return new Promise((resolve) => {
    setTimeout(() => {
      var noAnimation = aniType === "none" || aniDuration === 0;
      function callback(page) {
        showWebview(page, aniType, aniDuration, () => {
          invokeAfterRouteHooks(appRouteOpenType);
          resolve({
            eventChannel
          });
          setStatusBarStyle();
        });
      }
      registerPage(
        {
          url,
          path,
          query,
          openType: "navigateTo",
          appRouteOpenType: shouldDispatchAppRoute ? appRouteOpenType : void 0,
          appRouteContext,
          eventChannel,
          onRegistered(page) {
            if (noAnimation) {
              callback(page);
            }
          }
        },
        noAnimation ? void 0 : callback,
        // 有动画时延迟创建 vm
        noAnimation ? 0 : 1
      );
    }, 0);
  });
}
function initAnimation$1(path, animationType, animationDuration) {
  if (!getCurrentPage()) {
    return ["none", 0];
  }
  var {
    globalStyle
  } = __uniConfig;
  var meta = getRouteMeta(path);
  return [animationType || meta.animationType || globalStyle.animationType || ANI_SHOW, animationDuration || meta.animationDuration || globalStyle.animationDuration || ANI_DURATION];
}
function isDirectPage(page) {
  var _getCurrentPages$;
  return !!__uniConfig.realEntryPagePath && ((_getCurrentPages$ = getCurrentPages$1()[0]) === null || _getCurrentPages$ === void 0 ? void 0 : _getCurrentPages$.vm) === page;
}
function reLaunchEntryPage() {
  var _uniConfig$entryPage;
  __uniConfig.entryPagePath = __uniConfig.realEntryPagePath;
  __uniConfig.realEntryPagePath = "";
  var url = (_uniConfig$entryPage = __uniConfig.entryPagePath) !== null && _uniConfig$entryPage !== void 0 && _uniConfig$entryPage.startsWith("/") ? __uniConfig.entryPagePath : "/" + __uniConfig.entryPagePath;
  var {
    path,
    query
  } = parseUrl(url);
  void _reLaunch({
    url,
    path,
    query
  }, API_NAVIGATE_BACK);
}
var navigateBack = /* @__PURE__ */ defineAsyncApi(API_NAVIGATE_BACK, (args, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var page = getCurrentPage().vm;
  if (!page) {
    return reject("getCurrentPages is empty");
  }
  if (
    // popGesture 时不触发 onBackPress 事件，避免引发半屏弹窗这种冲突情况
    args.from !== "popGesture"
  ) {
    var onBackPressRes = invokeHook(page, ON_BACK_PRESS, {
      from: args.from || "navigateBack"
    });
    if (onBackPressRes !== true) {
      var dialogPages = page.$page.getDialogPages();
      if (dialogPages.length > 0) {
        var dialogPage = dialogPages[dialogPages.length - 1];
        onBackPressRes = invokeHook(dialogPage.$vm, ON_BACK_PRESS, {
          from: args.from || "navigateBack"
        });
      }
    }
    if (onBackPressRes === true) {
      return reject("cancel");
    }
  }
  try {
    uni.hideToast();
    uni.hideLoading();
  } catch (error) {
    console.warn(error);
  }
  if (getPage$BasePage(page).meta.isQuit) {
    invokeHook(getApp().vm, ON_LAST_PAGE_BACK_PRESS);
  } else {
    if (isDirectPage(page)) {
      return reLaunchEntryPage();
    } else {
      var {
        delta,
        animationType,
        animationDuration
      } = args;
      back(delta, animationType, animationDuration);
    }
  }
  return resolve();
}, NavigateBackProtocol, NavigateBackOptions);
function back(delta, animationType, animationDuration) {
  var pages2 = getCurrentBasePages();
  var len = pages2.length;
  var currentPage = pages2[len - 1];
  var targetPage = pages2[len - delta - 1];
  var appRouteContext = targetPage ? createAppRouteContext(targetPage.$basePage.path, targetPage.$basePage.options, API_NAVIGATE_BACK) : void 0;
  if (appRouteContext) {
    dispatchBeforeAppRoute(appRouteContext);
  }
  if (delta > 1) {
    pages2.slice(len - delta, len - 1).reverse().forEach((deltaPage) => {
      clearDialogPages(deltaPage.$page);
      var webview2 = getNativeApp().pageManager.findPageById(deltaPage.$basePage.id + "");
      if (webview2) {
        closeWebview(webview2, "none", 0);
      }
    });
  }
  var backPage = function(webview2) {
    if (animationType) {
      animationDuration = animationDuration || ANI_DURATION;
    } else {
      if (currentPage.$basePage.openType === "redirectTo") {
        animationType = ANI_CLOSE;
        animationDuration = ANI_DURATION;
      } else {
        animationType = "auto";
      }
    }
    closeWebview(webview2, animationType, animationDuration, () => {
      pages2.slice(len - delta, len).forEach((page) => removePage(page));
      invokeHook(ON_SHOW);
      var currentPage2 = getCurrentPage().vm;
      if (currentPage2) {
        if (appRouteContext) {
          dispatchAppRoute(appRouteContext);
        } else {
          dispatchAppRoute(currentPage2.$basePage.path, currentPage2.$basePage.options, API_NAVIGATE_BACK);
        }
      }
      invokeLastDialogPageHookByUniPage(getCurrentPage(), ON_SHOW);
      setStatusBarStyle();
    });
  };
  var webview = getNativeApp().pageManager.findPageById(currentPage.$basePage.id + "");
  clearDialogPages(currentPage.$page);
  webview && backPage(webview);
}
var openDialogPage = (options) => {
  var _options$success, _options$complete;
  var {
    url,
    animationType,
    animationDuration
  } = options;
  if (!options.url) {
    triggerFailCallback(options, "url is required");
    return null;
  }
  var {
    path,
    query
  } = parseUrl(url);
  path = normalizeRoute(path);
  var normalizeUrl = createNormalizeUrl("navigateTo");
  var errMsg = normalizeUrl(url, {});
  if (errMsg) {
    triggerFailCallback(options, errMsg);
    return null;
  }
  var parentPage = options.parentPage || null;
  var currentPages = getCurrentPages();
  if (parentPage) {
    if (currentPages.indexOf(parentPage) === -1) {
      triggerFailCallback(options, "parentPage is not a valid page");
      return null;
    }
  }
  if (currentPages.length && !parentPage) {
    parentPage = currentPages[currentPages.length - 1];
  }
  var dialogPage = markRaw(new UniDialogPageImpl());
  dialogPage.route = path;
  dialogPage.getParentPage = () => parentPage;
  dialogPage.$component = null;
  dialogPage.$disableEscBack = false;
  dialogPage.$triggerParentHide = !!options.triggerParentHide;
  var systemDialog = isSystemDialogPage(dialogPage);
  if (!systemDialog) {
    if (!parentPage) {
      homeDialogPages.push(dialogPage);
    } else {
      var dialogPages = parentPage.getDialogPages();
      dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE);
      dialogPages.push(dialogPage);
    }
    setCurrentNormalDialogPage(dialogPage);
  } else {
    var targetSystemDialogPages = [];
    if (!parentPage) {
      targetSystemDialogPages = homeSystemDialogPages;
    } else {
      dialogPageTriggerPrevDialogPageLifeCycle(parentPage, ON_HIDE);
      targetSystemDialogPages = getSystemDialogPages(parentPage);
    }
    targetSystemDialogPages.push(dialogPage);
    if (isSystemActionSheetDialogPage(dialogPage)) {
      closePreSystemDialogPage(targetSystemDialogPages, SYSTEM_DIALOG_ACTION_SHEET_PAGE_PATH);
    }
    setCurrentSystemDialogPage(dialogPage);
  }
  var [aniType, aniDuration] = initAnimation(
    path,
    // @ts-expect-error
    animationType,
    animationDuration
  );
  var noAnimation = aniType === "none" || aniDuration === 0;
  function callback(page2) {
    showWebview(page2, aniType, aniDuration, () => {
      beforeRoute();
      dialogPageTriggerParentHide(dialogPage);
    });
  }
  var page = registerDialogPage(
    {
      url,
      path,
      query,
      openType: OPEN_DIALOG_PAGE
    },
    dialogPage,
    noAnimation ? void 0 : callback,
    // 有动画时延迟创建 vm
    noAnimation ? 0 : 1
  );
  if (systemDialog) {
    dialogPage.__nativeType = "systemDialog";
  }
  if (noAnimation) {
    callback(page);
  }
  var successOptions = {
    errMsg: "openDialogPage:ok"
  };
  (_options$success = options.success) === null || _options$success === void 0 || _options$success.call(options, successOptions);
  (_options$complete = options.complete) === null || _options$complete === void 0 || _options$complete.call(options, successOptions);
  return dialogPage;
};
function triggerFailCallback(options, errMsg) {
  var _options$fail, _options$complete2;
  var failOptions = new UniError("uni-openDialogPage", 4, "openDialogPage: fail, ".concat(errMsg));
  (_options$fail = options.fail) === null || _options$fail === void 0 || _options$fail.call(options, failOptions);
  (_options$complete2 = options.complete) === null || _options$complete2 === void 0 || _options$complete2.call(options, failOptions);
}
function initAnimation(path, animationType, animationDuration) {
  if (!getCurrentPage()) {
    return ["none", 0];
  }
  var {
    globalStyle
  } = __uniConfig;
  var meta = getRouteMeta(path);
  var _animationType = animationType || meta.animationType || globalStyle.animationType || ANI_SHOW;
  if (_animationType == "pop-in") {
    _animationType = "none";
  }
  return [_animationType, animationDuration || meta.animationDuration || globalStyle.animationDuration || ANI_DURATION];
}
var setTabBarBadge = /* @__PURE__ */ defineAsyncApi(API_SET_TAB_BAR_BADGE, (_ref, _ref2) => {
  var {
    index: index2,
    text
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.setTabBarBadge(/* @__PURE__ */ new Map([["index", index2], ["text", text]]));
  resolve();
}, SetTabBarBadgeProtocol, SetTabBarBadgeOptions);
var removeTabBarBadge = /* @__PURE__ */ defineAsyncApi(API_REMOVE_TAB_BAR_BADGE, (_ref, _ref2) => {
  var {
    index: index2
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.removeTabBarBadge(/* @__PURE__ */ new Map([["index", index2]]));
  resolve();
}, RemoveTabBarBadgeProtocol, RemoveTabBarBadgeOptions);
var setTabBarItem = /* @__PURE__ */ defineAsyncApi(API_SET_TAB_BAR_ITEM, (_ref, _ref2) => {
  var {
    index: index2,
    text,
    iconPath,
    selectedIconPath,
    pagePath,
    visible,
    iconfont
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  var item = /* @__PURE__ */ new Map();
  item.set("index", index2);
  if (typeof text === "string") {
    item.set("text", text);
  }
  if (typeof iconPath === "string") {
    item.set("iconPath", iconPath);
  }
  if (typeof selectedIconPath === "string") {
    item.set("selectedIconPath", selectedIconPath);
  }
  if (typeof pagePath === "string") {
    item.set("pagePath", pagePath);
  }
  if (typeof visible === "boolean") {
    item.set("visible", visible);
  }
  if (iconfont != null) {
    var iconfontOptions = iconfont;
    var _iconfont = /* @__PURE__ */ new Map([["text", iconfontOptions.text], ["selectedText", iconfontOptions.selectedText], ["fontSize", iconfontOptions.fontSize], ["color", iconfontOptions.color], ["selectedColor", iconfontOptions.selectedColor]]);
    item.set("iconfont", _iconfont);
  }
  tabBar.setTabBarItem(item);
  resolve();
}, SetTabBarItemProtocol, SetTabBarItemOptions);
var setTabBarStyle = /* @__PURE__ */ defineAsyncApi(API_SET_TAB_BAR_STYLE, (options, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  var style = /* @__PURE__ */ new Map();
  if (options.color != null) {
    style.set("color", options.color);
  }
  if (options.selectedColor != null) {
    style.set("selectedColor", options.selectedColor);
  }
  if (options.backgroundColor != null) {
    style.set("backgroundColor", options.backgroundColor);
  }
  if (options.backgroundImage != null) {
    style.set("backgroundImage", options.backgroundImage);
  }
  if (options.backgroundRepeat != null) {
    style.set("backgroundRepeat", options.backgroundRepeat);
  }
  if (options.borderStyle != null) {
    style.set("borderStyle", options.borderStyle);
  }
  if (options.borderColor != null) {
    style.set("borderColor", options.borderColor);
  }
  if (!!options.midButton) {
    var midButtonOptions = options.midButton;
    var midButton = /* @__PURE__ */ new Map([["width", midButtonOptions.width], ["height", midButtonOptions.height], ["iconPath", midButtonOptions.iconPath], ["text", midButtonOptions.text], ["iconPath", midButtonOptions.iconPath], ["iconWidth", midButtonOptions.iconWidth], ["backgroundImage", midButtonOptions.backgroundImage]]);
    if (!!midButtonOptions.iconfont) {
      var iconfontOptions = midButtonOptions.iconfont;
      var iconfont = /* @__PURE__ */ new Map([["text", iconfontOptions.text], ["selectedText", iconfontOptions.selectedText], ["fontSize", iconfontOptions.fontSize], ["color", iconfontOptions.color], ["selectedColor", iconfontOptions.selectedColor]]);
      midButton.set("iconfont", iconfont);
    }
    style.set("midButton", midButton);
  }
  fixBorderStyle(style);
  tabBar.setTabBarStyle(style);
  resolve();
}, SetTabBarStyleProtocol, SetTabBarStyleOptions);
var hideTabBar = /* @__PURE__ */ defineAsyncApi(API_HIDE_TAB_BAR, (options, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.hideTabBar(/* @__PURE__ */ new Map([["animation", options === null || options === void 0 ? void 0 : options.animation]]));
  resolve();
});
var showTabBar = /* @__PURE__ */ defineAsyncApi(API_SHOW_TAB_BAR, (args, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var tabBar = getTabBar();
  var animation2 = args && args.animation;
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.showTabBar(/* @__PURE__ */ new Map([["animation", animation2]]));
  resolve();
});
var showTabBarRedDot = /* @__PURE__ */ defineAsyncApi(API_SHOW_TAB_BAR_RED_DOT, (_ref, _ref2) => {
  var {
    index: index2
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.showTabBarRedDot(/* @__PURE__ */ new Map([["index", index2]]));
  resolve();
}, ShowTabBarRedDotProtocol, ShowTabBarRedDotOptions);
var hideTabBarRedDot = /* @__PURE__ */ defineAsyncApi(API_HIDE_TAB_BAR_RED_DOT, (_ref, _ref2) => {
  var {
    index: index2
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var tabBar = getTabBar();
  if (tabBar === null) {
    reject("tabBar is not exist");
    return;
  }
  tabBar.hideTabBarRedDot(/* @__PURE__ */ new Map([["index", index2]]));
  resolve();
}, HideTabBarRedDotProtocol, HideTabBarRedDotOptions);
var onTabBarMidButtonTap = (cb) => {
  onTabBarMidButtonTapCallback.push(cb);
};
var setNavigationBarColor = /* @__PURE__ */ defineAsyncApi(API_SET_NAVIGATION_BAR_COLOR, (_ref, _ref2) => {
  var {
    frontColor,
    backgroundColor
  } = _ref;
  var {
    resolve,
    reject
  } = _ref2;
  var page = getCurrentPage();
  if (!page) {
    return reject("getCurrentPages is empty");
  }
  var appPage = page.vm.$nativePage;
  appPage.updateStyle(/* @__PURE__ */ new Map([["navigationBarTextStyle", frontColor == "#000000" ? "black" : "white"], ["navigationBarBackgroundColor", backgroundColor]]));
  resolve();
}, SetNavigationBarColorProtocol, SetNavigationBarColorOptions);
var setNavigationBarTitle = /* @__PURE__ */ defineAsyncApi(API_SET_NAVIGATION_BAR_TITLE, (options, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var page = getCurrentPage().vm;
  if (page == null) {
    reject("page is not ready");
    return;
  }
  var appPage = page.$nativePage;
  appPage.updateStyle(/* @__PURE__ */ new Map([["navigationBarTitleText", options.title]]));
  resolve();
});
var getElementById = /* @__PURE__ */ defineSyncApi("getElementById", (id2) => {
  var page = getCurrentPage();
  if (page == null) {
    return null;
  }
  return page.getElementById(id2);
});
class NodesRefImpl {
  constructor(selectorQuery, component, selector, single) {
    this._selectorQuery = selectorQuery;
    this._component = component;
    this._selector = selector;
    this._single = single;
  }
  boundingClientRect(callback) {
    var hasArg = callback === null || typeof callback === "function";
    if (hasArg) {
      this._selectorQuery._push(this._selector, this._component, this._single, {
        id: true,
        dataset: true,
        rect: true,
        size: true
      }, callback);
      return this._selectorQuery;
    } else {
      return this.boundingClientRect(null);
    }
  }
  fields(fields, callback) {
    this._selectorQuery._push(this._selector, this._component, this._single, fields, callback);
    return this._selectorQuery;
  }
  scrollOffset(callback) {
    this._selectorQuery._push(this._selector, this._component, this._single, {
      id: true,
      dataset: true,
      scrollOffset: true
    }, callback);
    return this._selectorQuery;
  }
  context(callback) {
    this._selectorQuery._push(this._selector, this._component, this._single, {
      context: true
    }, callback);
    return this._selectorQuery;
  }
  /**
   * fields({node:true})
   */
  node(_callback) {
    this._selectorQuery._push(this._selector, this._component, this._single, {
      node: true
    }, _callback);
    return this._selectorQuery;
  }
}
class SelectorQueryImpl {
  constructor(component) {
    this._component = null;
    this._component = component;
    this._queue = [];
    this._queueCb = [];
  }
  exec(callback) {
    {
      var _this$_component;
      (_this$_component = this._component) === null || _this$_component === void 0 || (_this$_component = _this$_component.$nativePage) === null || _this$_component === void 0 || _this$_component.waitNativeRender(() => {
        requestComponentInfoVapor(this._component, this._queue, (res) => {
          var queueCbs = this._queueCb;
          res.forEach((info, _index) => {
            var queueCb = queueCbs[_index];
            if (isFunction(queueCb)) {
              queueCb(info);
            }
          });
          if (callback && isFunction(callback)) {
            callback(res);
          }
        });
      });
    }
    return this._nodesRef;
  }
  in(component) {
    {
      if (component) {
        this._component = component;
      }
    }
    return this;
  }
  select(selector) {
    this._nodesRef = new NodesRefImpl(this, this._component, selector, true);
    return this._nodesRef;
  }
  selectAll(selector) {
    this._nodesRef = new NodesRefImpl(this, this._component, selector, false);
    return this._nodesRef;
  }
  selectViewport() {
    this._nodesRef = new NodesRefImpl(this, null, "", true);
    return this._nodesRef;
  }
  _push(selector, component, single, fields, callback) {
    this._queue.push({
      component,
      selector,
      single,
      fields
    });
    this._queueCb.push(callback);
  }
}
class QuerySelectorHelperVapor {
  constructor(component, fields) {
    this._component = component;
    this._fields = fields;
  }
  /**
   * entry
   */
  static queryElement(component, selector, all, fields) {
    return new QuerySelectorHelperVapor(component, fields).query(selector, all);
  }
  /**
   * 执行查询
   * @param selector 选择器
   * @param all 是否查询所有 selectAll
   * @returns
   */
  query(selector, all) {
    return all ? this.querySelectorAll(this._component, selector) : this.querySelector(this._component, selector);
  }
  querySelector(component, selector) {
    var result = component.$.sharedData._querySelector(selector);
    if (result != null) {
      return this.getNodeInfo(result);
    }
    return null;
  }
  querySelectorAll(component, selector) {
    var nodesInfoArray = [];
    var findNodes = component.$.sharedData._querySelectorAll(selector);
    findNodes === null || findNodes === void 0 || findNodes.forEach((el) => {
      nodesInfoArray.push(this.getNodeInfo(el));
    });
    return nodesInfoArray;
  }
  /**
   * 查询元素信息
   * @param element
   * @returns
   */
  getNodeInfo(element) {
    var _element$getAttribute2;
    if (this._fields.node == true) {
      var nodeInfo2 = {
        node: element
      };
      if (this._fields.dataset == true) {
        nodeInfo2.dataset = createUniDOMStringMap(element.dataset || {});
      }
      if (this._fields.size == true) {
        var rect2 = element.getBoundingClientRect();
        nodeInfo2.width = rect2.width;
        nodeInfo2.height = rect2.height;
      }
      return nodeInfo2;
    }
    var rect = element.getBoundingClientRect();
    var nodeInfo = {
      id: (_element$getAttribute2 = element.getAttribute("id")) === null || _element$getAttribute2 === void 0 ? void 0 : _element$getAttribute2.toString(),
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height
    };
    if (this._fields.dataset == true) {
      nodeInfo.dataset = createUniDOMStringMap(element.dataset || {});
    }
    return nodeInfo;
  }
}
function requestComponentInfoVapor(vueComponent, queue2, callback) {
  var result = [];
  if (vueComponent != null) {
    queue2.forEach((item) => {
      var queryResult = QuerySelectorHelperVapor.queryElement(vueComponent, item.selector, !item.single, item.fields);
      if (queryResult != null) {
        result.push(queryResult);
      }
    });
  }
  callback(result);
}
var createSelectorQuery = function() {
  var instance = getCurrentPage().vm;
  return new SelectorQueryImpl(instance);
};
class CanvasContextImpl {
  constructor(element) {
    this._element = element;
  }
  // @ts-expect-error 类型不匹配
  getContext(contextType) {
    return this._element.getContext(contextType);
  }
  toBlob(callback, type, quality) {
    throw new Error("Method not implemented.");
  }
  toDataURL(type, quality) {
    return this._element.toDataURL(type, quality);
  }
  createImage() {
    return new Image();
  }
  createPath2D() {
    return new Path2D();
  }
  requestAnimationFrame(callback) {
    return requestAnimationFrame(callback);
  }
  cancelAnimationFrame(taskId) {
    cancelAnimationFrame(taskId);
  }
}
var createCanvasContextAsync = /* @__PURE__ */ defineAsyncApi("createCanvasContextAsync", (options, _ref) => {
  var _options$component;
  var {
    resolve,
    reject
  } = _ref;
  var page = getCurrentPage().vm;
  if (page == null) {
    return null;
  }
  createSelectorQuery().in((_options$component = options.component) !== null && _options$component !== void 0 ? _options$component : null).select("#" + options.id).fields({
    node: true
  }, (ret) => {
    var node = ret.node;
    if (node != null) {
      resolve(new CanvasContextImpl(node));
    } else {
      var uniError = new UniError("uni-createCanvasContextAsync", -1, "canvas id invalid.");
      reject(uniError.errMsg);
    }
  }).exec();
});
function queryElementTop(component, selector) {
  var _component$$el;
  var scrollNode = (_component$$el = component.$el) === null || _component$$el === void 0 ? void 0 : _component$$el.querySelector(selector);
  if (scrollNode != null) {
    return scrollNode.getBoundingClientRect().top;
  }
  return null;
}
var pageScrollTo = /* @__PURE__ */ defineAsyncApi(API_PAGE_SCROLL_TO, (options, res) => {
  var currentPage = getCurrentPage().vm;
  var scrollViewNode = currentPage === null || currentPage === void 0 ? void 0 : currentPage.$el;
  if (scrollViewNode == null || scrollViewNode.tagName != "PAGE") {
    res.reject("selector invalid");
    return;
  }
  var top = options.scrollTop;
  if (!!options.selector) {
    top = queryElementTop(currentPage, options.selector);
    if (top != null) {
      var currentScrollTop = scrollViewNode.scrollTop;
      top += currentScrollTop;
    }
  }
  if (top == null || top < 0) {
    res.reject("top or selector invalid");
    return;
  }
  if (options.offsetTop != null) {
    top += options.offsetTop;
  }
  scrollViewNode.scrollTop = top;
  res.resolve();
}, PageScrollToProtocol, PageScrollToOptions);
var startPullDownRefresh = /* @__PURE__ */ defineAsyncApi(API_START_PULL_DOWN_REFRESH, (_options, res) => {
  var page = getCurrentPage().vm;
  if (page === null) {
    res.reject("page is not ready");
    return;
  }
  page.$nativePage.startPullDownRefresh({
    success: res.resolve,
    fail: (err) => {
      res.reject(err.errMsg, err);
    }
  });
});
var stopPullDownRefresh = /* @__PURE__ */ defineAsyncApi(API_STOP_PULL_DOWN_REFRESH, (_args, res) => {
  var page = getCurrentPage().vm;
  if (page === null) {
    res.reject("page is not ready");
    return;
  }
  page.$nativePage.stopPullDownRefresh();
  res.resolve();
});
var env = {
  USER_DATA_PATH: "unifile://usr/",
  CACHE_PATH: "unifile://cache/",
  SANDBOX_PATH: "unifile://sandbox/",
  TEMP_PATH: "unifile://temp/",
  ANDROID_INTERNAL_SANDBOX_PATH: "unifile://androidInternalSandbox/"
};
function loadUasm(module) {
  return new Promise((resolve, reject) => {
    var result = loadUasmSync(module);
    if (result == null) {
      reject(new Error("uni.loadUasm[".concat(module, "] 加载失败")));
      return;
    }
    resolve(result);
  });
}
function loadUasmSync(module) {
  var app = getNativeApp();
  return app.loadUasm(module);
}
var _PerformanceEntryStatus;
var APP_LAUNCH = "appLaunch";
var PERFORMANCE_BUFFER_SIZE = 30;
var ENTRY_TYPE_RENDER = "render";
var ENTRY_TYPE_NAVIGATION = "navigation";
var RENDER_TYPE_FIRST_LAYOUT = "firstLayout";
var RENDER_TYPE_FIRST_RENDER = "firstRender";
class PerformanceEntryStatus {
  constructor(entryType, name) {
    this._state = PerformanceEntryStatus.STATE_EMPTY;
    this._entryData = {
      entryType,
      name,
      duration: 0,
      startTime: 0
    };
  }
  get state() {
    return this._state;
  }
  set state(state) {
    this._state = state;
    if (this._state == PerformanceEntryStatus.STATE_BEFORE) {
      this.executeBefore();
    } else if (this._state == PerformanceEntryStatus.STATE_AFTER) {
      this.executeAfter();
    } else if (this._state == PerformanceEntryStatus.STATE_READY) {
      this.executeReady();
    }
  }
  get entryData() {
    return this._entryData;
  }
  executeBefore() {
    var _getCurrentPage;
    var page = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
    if (page != null) {
      this._entryData.referrerPath = page.route;
    }
  }
  executeAfter() {
    var _getCurrentPage2;
    var page = (_getCurrentPage2 = getCurrentPage()) === null || _getCurrentPage2 === void 0 ? void 0 : _getCurrentPage2.vm;
    if (page != null) {
      this._entryData.pageId = parseInt(page.$nativePage.pageId);
      this._entryData.path = page.route;
    }
  }
  executeReady() {
  }
  getCurrentInnerPage() {
    var _getCurrentPage3;
    var currentPage = (_getCurrentPage3 = getCurrentPage()) === null || _getCurrentPage3 === void 0 ? void 0 : _getCurrentPage3.vm;
    if (currentPage == null) {
      return null;
    }
    return currentPage.$nativePage;
  }
}
_PerformanceEntryStatus = PerformanceEntryStatus;
_PerformanceEntryStatus.STATE_EMPTY = 0;
_PerformanceEntryStatus.STATE_BEFORE = 1;
_PerformanceEntryStatus.STATE_AFTER = 2;
_PerformanceEntryStatus.STATE_READY = 3;
class PerformanceEntryStatusLayout extends PerformanceEntryStatus {
  constructor() {
    super(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_LAYOUT);
  }
  executeAfter() {
    super.executeAfter();
    this._entryData.startTime = Date.now();
  }
  executeReady() {
    super.executeReady();
    var innerPage = super.getCurrentInnerPage();
    if (innerPage != null) {
      this._entryData.duration = innerPage.getFirstPageLayoutDuration();
    }
  }
}
class PerformanceEntryStatusRender extends PerformanceEntryStatus {
  constructor() {
    super(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_RENDER);
  }
  executeAfter() {
    super.executeAfter();
    this._entryData.startTime = Date.now();
  }
  executeReady() {
    super.executeReady();
    var innerPage = super.getCurrentInnerPage();
    if (innerPage != null) {
      this._entryData.duration = innerPage.getFirstPageRenderDuration();
    }
  }
}
class PerformanceEntryStatusNavigation extends PerformanceEntryStatus {
  constructor(name, navigationType) {
    super(ENTRY_TYPE_NAVIGATION, name);
    this._entryData.navigationType = navigationType;
  }
  executeBefore() {
    super.executeBefore();
    this._entryData.startTime = Date.now();
  }
  executeReady() {
    var innerPage = super.getCurrentInnerPage();
    if (innerPage != null) {
      this._entryData.duration = Date.now() - this._entryData.startTime;
      if (this._entryData.name == APP_LAUNCH) {
        this._entryData.duration += getNativeApp().getAppStartDuration();
      }
    }
  }
}
class PerformanceEntryQueue extends Array {
  constructor() {
    super(...arguments);
    this._queueSize = PERFORMANCE_BUFFER_SIZE;
  }
  get queueSize() {
    return this._queueSize;
  }
  set queueSize(value) {
    this._queueSize = value;
    if (this.length > value) {
      this.dequeue(this.length - value);
    }
  }
  push() {
    return this.enqueue(...arguments);
  }
  enqueue() {
    if (this.length > this._queueSize - 1) {
      this.shift();
    }
    return super.push(...arguments);
  }
  dequeue() {
    var count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
    this.splice(0, count);
  }
}
class PerformanceObserverEntryListImpl {
  constructor() {
    this._queue = new PerformanceEntryQueue();
  }
  push() {
    this._queue.push(...arguments);
  }
  getEntries() {
    return this._queue;
  }
  getEntriesByType(entryType) {
    return this._queue.filter((entry) => entry.entryType == entryType);
  }
  getEntriesByName(name, entryType) {
    return this._queue.filter((entry) => entry.entryType == entryType && entry.name == name);
  }
  clear() {
    this._queue.length = 0;
  }
  get bufferSize() {
    return this._queue.queueSize;
  }
  set bufferSize(size) {
    this._queue.queueSize = size;
  }
}
class PerformanceObserverImpl {
  constructor(performance, callback) {
    this._entryTypes = [];
    this._callback = null;
    this._entryList = new PerformanceObserverEntryListImpl();
    this._owner = performance;
    this._callback = callback;
  }
  observe(options) {
    if ((options === null || options === void 0 ? void 0 : options.entryTypes) != null) {
      this._entryTypes.length = 0;
      this._entryTypes.push(...options.entryTypes);
    }
    if (this._entryTypes.length > 0) {
      this._owner.connect(this);
    } else {
      this.disconnect();
    }
  }
  disconnect() {
    this._entryList.clear();
    this._owner.disconnect(this);
  }
  dispatchCallback() {
    var _this$_callback;
    (_this$_callback = this._callback) === null || _this$_callback === void 0 || _this$_callback.call(this, this._entryList);
  }
  get entryTypes() {
    return this._entryTypes;
  }
  get entryList() {
    return this._entryList;
  }
}
class PerformanceProvider {
  constructor() {
    this._entryStatus = [];
  }
  get entryStatus() {
    return this._entryStatus;
  }
  onBefore(type) {
    if (type == APP_LAUNCH || type == API_SWITCH_TAB || type == API_NAVIGATE_TO || type == API_REDIRECT_TO || type == API_NAVIGATE_BACK) {
      this._pushEntryStatus(ENTRY_TYPE_NAVIGATION, this._navigationToName(type), type);
    }
    if (type == APP_LAUNCH || type == API_NAVIGATE_TO || type == API_REDIRECT_TO) {
      this._pushEntryStatus(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_LAYOUT, type);
      this._pushEntryStatus(ENTRY_TYPE_RENDER, RENDER_TYPE_FIRST_RENDER, type);
    }
    this._forwardState();
  }
  onAfter(type) {
    this._forwardState();
  }
  onReady() {
    this._forwardState();
  }
  removeAllStatus() {
    this._entryStatus.length = 0;
  }
  _pushEntryStatus(entryType, name, navigationType) {
    var entry = null;
    if (entryType == ENTRY_TYPE_NAVIGATION) {
      entry = new PerformanceEntryStatusNavigation(name, navigationType);
    } else if (entryType == ENTRY_TYPE_RENDER) {
      if (name == RENDER_TYPE_FIRST_LAYOUT) {
        entry = new PerformanceEntryStatusLayout();
      } else if (name == RENDER_TYPE_FIRST_RENDER) {
        entry = new PerformanceEntryStatusRender();
      }
    }
    if (entry != null) {
      this._entryStatus.push(entry);
    }
  }
  _forwardState() {
    this._entryStatus.forEach((entry) => {
      entry.state += 1;
    });
  }
  _navigationToName(type) {
    if (type == APP_LAUNCH) {
      return APP_LAUNCH;
    }
    return "route";
  }
}
class PerformanceAllocate {
  constructor(allEntryList, observerList) {
    this._allEntryList = allEntryList;
    this._observerList = observerList;
  }
  pushEntryStatus(status) {
    this.pushAllEntryData(status);
    this.pushObserverList(status);
  }
  pushAllEntryData(status) {
    status.forEach((entryStatus) => {
      this._allEntryList.push(entryStatus.entryData);
    });
  }
  pushObserverList(status) {
    this._observerList.forEach((observer) => {
      var entryList = observer.entryList;
      entryList.clear();
      status.forEach((entryStatus) => {
        var entryData = entryStatus.entryData;
        if (observer.entryTypes.includes(entryData.entryType)) {
          entryList.push(entryData);
        }
      });
      observer.dispatchCallback();
    });
  }
}
class PerformanceImpl {
  constructor() {
    this._allEntryList = new PerformanceObserverEntryListImpl();
    this._observerList = [];
    this._provider = new PerformanceProvider();
    this._allocate = new PerformanceAllocate(this._allEntryList, this._observerList);
    onBeforeRoute((type) => {
      this._provider.onBefore(type);
    });
    onAfterRoute((type) => {
      this._provider.onAfter(type);
      if (type == API_NAVIGATE_BACK) {
        this.dispatchObserver();
      }
    });
    onPageReady((page) => {
      this.dispatchObserver();
    });
  }
  dispatchObserver() {
    this._provider.onReady();
    this._allocate.pushEntryStatus(this._provider.entryStatus);
    this._provider.removeAllStatus();
  }
  createObserver(callback) {
    return new PerformanceObserverImpl(this, callback);
  }
  connect(observer) {
    var index2 = this._observerList.indexOf(observer);
    if (index2 < 0) {
      this._observerList.push(observer);
    }
  }
  disconnect(observer) {
    var index2 = this._observerList.indexOf(observer);
    if (index2 >= 0) {
      this._observerList.splice(index2, 1);
    }
  }
  getEntries() {
    return this._allEntryList.getEntries();
  }
  getEntriesByType(entryType) {
    return this._allEntryList.getEntriesByType(entryType);
  }
  getEntriesByName(name, entryType) {
    return this._allEntryList.getEntriesByName(name, entryType);
  }
  setBufferSize(size) {
    this._allEntryList.bufferSize = size;
  }
}
var getPerformance = function() {
  return new PerformanceImpl();
};
var pluginDefines = {};
function registerUTSPlugin(name, define) {
  pluginDefines[name] = define;
}
function requireUTSPlugin(name) {
  var silent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var define = pluginDefines[name];
  if (!define) {
    if (!silent) {
      console.error("".concat(name, " is not found"));
    }
  }
  return define;
}
var UTSClassInstanceRegistry;
function unregisterInstance(id2) {
  var args = {
    moduleName: "_uts_bridge",
    methodId: 1,
    keepAlive: false,
    params: [id2]
  };
  getProxy().invokeSync(args);
}
function ensureUTSClassInstanceRegistry() {
  if (!UTSClassInstanceRegistry) {
    UTSClassInstanceRegistry = new FinalizationRegistry((id2) => {
      unregisterInstance(id2);
    });
  }
}
var channel;
function getProxy() {
  if (!channel) {
    channel = {
      invokeSync(args) {
        return nativeChannel.invokeSync("APP-SERVICE", args);
      },
      invokeAsync(args, callback) {
        return nativeChannel.invokeAsync("APP-SERVICE", args, callback);
      }
    };
  }
  return channel;
}
var interfaceDefines = {};
function registerUTSInterface(options) {
  if (!interfaceDefines[options.utsBridgeName]) {
    interfaceDefines[options.utsBridgeName] = {};
  }
  interfaceDefines[options.utsBridgeName][options.name] = options;
}
var classDefines = {};
function registerUTSClass(options) {
  if (!classDefines[options.utsBridgeName]) {
    classDefines[options.utsBridgeName] = {};
  }
  classDefines[options.utsBridgeName][options.class] = options;
}
function resolveReturnValue(utsBridgeName, options, instanceOrId, instanceProxy, value) {
  if (options.returnType && typeof value === "number") {
    var _interfaceDefines$uts, _classDefines$utsBrid;
    if (value === 0) {
      return null;
    }
    var thisInstanceId = typeof instanceOrId === "number" ? instanceOrId : void 0;
    if (value === thisInstanceId) {
      return instanceProxy;
    }
    var interfaceOptions = (_interfaceDefines$uts = interfaceDefines[utsBridgeName]) === null || _interfaceDefines$uts === void 0 ? void 0 : _interfaceDefines$uts[options.returnType];
    if (interfaceOptions) {
      return initUTSProxyInterface(value, interfaceOptions);
    }
    var classOptions = (_classDefines$utsBrid = classDefines[utsBridgeName]) === null || _classDefines$utsBrid === void 0 ? void 0 : _classDefines$utsBrid[options.returnType];
    if (classOptions) {
      return initUTSProxyClassInstance(value, classOptions);
    }
  }
  return value;
}
function initProxyFunction(utsBridgeName, options, instanceOrId, instanceProxy) {
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var invokeArgs = {
      moduleName: utsBridgeName,
      methodId: options.methodId,
      keepAlive: options.keepAlive,
      instance: typeof instanceOrId === "object" ? instanceOrId : void 0,
      instanceId: typeof instanceOrId === "number" ? instanceOrId : void 0,
      params: args
    };
    if (options.async) {
      return new Promise((resolve, reject) => {
        getProxy().invokeAsync(invokeArgs, (res2) => {
          if (res2.type === "return") {
            if (res2.errMsg) {
              reject(res2.errMsg);
            } else {
              resolve(resolveReturnValue(utsBridgeName, options, instanceOrId, instanceProxy, res2.params));
            }
          }
        });
      });
    }
    var res = getProxy().invokeSync(invokeArgs);
    if (!res) {
      throw new Error("返回值为：" + JSON.stringify(res) + "；请求参数为：" + JSON.stringify(args));
    }
    if (res.errMsg) {
      throw new Error(res.errMsg);
    }
    return resolveReturnValue(utsBridgeName, options, instanceOrId, instanceProxy, res.params);
  };
}
var FUNCTION_PLACEHOLDER = () => {
};
function initUTSProxyInterface(instanceId, options) {
  var isClass = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var methods = {};
  var getters = {};
  var setters = {};
  for (var method of options.methods) {
    switch (method.type) {
      case "method":
        methods[method.name] = FUNCTION_PLACEHOLDER;
        break;
      case "getter":
        getters[method.name] = FUNCTION_PLACEHOLDER;
        break;
      case "setter":
        setters[method.name] = FUNCTION_PLACEHOLDER;
        break;
    }
  }
  var instanceProxy = new Proxy({}, {
    get(target, prop, receiver) {
      if (typeof prop !== "string") {
        return Reflect.get(target, prop, receiver);
      }
      if (prop === "__v_skip") {
        return true;
      }
      if (isClass && prop === "__classId") {
        return "".concat(options.utsBridgeName, "#").concat(options.name);
      }
      if (hasOwn(methods, prop)) {
        if (methods[prop] === FUNCTION_PLACEHOLDER) {
          methods[prop] = initProxyFunction(options.utsBridgeName, options.methods.find((m) => m.name === prop && m.type === "method"), instanceId);
        }
        return methods[prop];
      }
      if (hasOwn(getters, prop)) {
        var getter = getters[prop];
        if (getter === FUNCTION_PLACEHOLDER) {
          getters[prop] = initProxyFunction(options.utsBridgeName, options.methods.find((m) => m.name === prop && m.type === "getter"), instanceId);
        }
        return getters[prop]();
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
      if (typeof prop !== "string") {
        return Reflect.set(target, prop, value);
      }
      if (hasOwn(setters, prop)) {
        var setter = setters[prop];
        if (setter === FUNCTION_PLACEHOLDER) {
          setters[prop] = initProxyFunction(options.utsBridgeName, options.methods.find((m) => m.name === prop && m.type === "setter"), instanceId);
        }
        setters[prop](value);
        return true;
      }
      return Reflect.set(target, prop, value);
    }
  });
  if (typeof FinalizationRegistry !== "undefined") {
    ensureUTSClassInstanceRegistry();
    UTSClassInstanceRegistry.register(instanceProxy, instanceId);
  }
  return instanceProxy;
}
function initUTSProxyClassInstance(instanceId, options) {
  var interfaceOptions = {
    name: options.class,
    utsBridgeName: options.utsBridgeName,
    methods: [...options.methods]
  };
  return initUTSProxyInterface(instanceId, interfaceOptions, true);
}
function initUTSProxyClass(options) {
  var className = options.class;
  registerUTSClass(options);
  var constructor = initProxyFunction(options.utsBridgeName, options.constructor);
  var staticMethods = {};
  var staticGetters = {};
  var staticSetters = {};
  for (var method of options.staticMethods) {
    switch (method.type) {
      case "staticMethod":
        staticMethods[method.name] = FUNCTION_PLACEHOLDER;
        break;
      case "staticGetter":
        staticGetters[method.name] = FUNCTION_PLACEHOLDER;
        break;
      case "staticSetter":
        staticSetters[method.name] = FUNCTION_PLACEHOLDER;
        break;
    }
  }
  var classId = "".concat(options.utsBridgeName, "#").concat(className);
  var ProxyClass = class {
    constructor() {
      this.__instanceId = 0;
      this.__classId = classId;
      this.__instanceId = constructor(...arguments);
      if (!this.__instanceId) {
        throw new Error("new ".concat(className, " is failed"));
      }
      var instance = this;
      var methods = {};
      var getters = {};
      var setters = {};
      for (var _method of options.methods) {
        switch (_method.type) {
          case "method":
            methods[_method.name] = FUNCTION_PLACEHOLDER;
            break;
          case "getter":
            getters[_method.name] = FUNCTION_PLACEHOLDER;
            break;
          case "setter":
            setters[_method.name] = FUNCTION_PLACEHOLDER;
            break;
        }
      }
      var instanceProxy = new Proxy(instance, {
        get(target, prop, receiver) {
          if (prop === "__v_skip") {
            return true;
          }
          if (typeof prop !== "string") {
            return Reflect.get(target, prop, receiver);
          }
          if (hasOwn(methods, prop)) {
            if (methods[prop] === FUNCTION_PLACEHOLDER) {
              methods[prop] = initProxyFunction(options.utsBridgeName, options.methods.find((m) => m.name === prop && m.type === "method"), instance.__instanceId, instanceProxy);
            }
            return methods[prop];
          }
          if (hasOwn(getters, prop)) {
            var getter = getters[prop];
            if (getter === FUNCTION_PLACEHOLDER) {
              getters[prop] = initProxyFunction(options.utsBridgeName, options.methods.find((m) => m.name === prop && m.type === "getter"), instance.__instanceId, instanceProxy);
            }
            return getters[prop]();
          }
          return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value) {
          if (typeof prop !== "string") {
            return Reflect.set(target, prop, value);
          }
          if (hasOwn(setters, prop)) {
            var setter = setters[prop];
            if (setter === FUNCTION_PLACEHOLDER) {
              setters[prop] = initProxyFunction(options.utsBridgeName, options.methods.find((m) => m.name === prop && m.type === "setter"), instance.__instanceId, instanceProxy);
            }
            setters[prop](value);
            return true;
          }
          return Reflect.set(target, prop, value);
        }
      });
      if (typeof FinalizationRegistry !== "undefined") {
        ensureUTSClassInstanceRegistry();
        UTSClassInstanceRegistry.register(instanceProxy, instanceProxy.__instanceId);
      }
      return instanceProxy;
    }
    static [Symbol.hasInstance](instance) {
      return instance && instance.__classId === classId;
    }
  };
  return new Proxy(ProxyClass, {
    get(target, prop, receiver) {
      if (hasOwn(staticMethods, prop)) {
        var _method2 = staticMethods[prop];
        if (_method2 === FUNCTION_PLACEHOLDER) {
          staticMethods[prop] = initProxyFunction(options.utsBridgeName, options.staticMethods.find((m) => m.name === prop && m.type === "staticMethod"));
        }
        return staticMethods[prop];
      }
      if (hasOwn(staticGetters, prop)) {
        var getter = staticGetters[prop];
        if (getter === FUNCTION_PLACEHOLDER) {
          staticGetters[prop] = initProxyFunction(options.utsBridgeName, options.staticMethods.find((m) => m.name === prop && m.type === "staticGetter"));
        }
        return staticGetters[prop]();
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
      if (hasOwn(staticSetters, prop)) {
        var setter = staticSetters[prop];
        if (setter === FUNCTION_PLACEHOLDER) {
          staticSetters[prop] = initProxyFunction(options.utsBridgeName, options.staticMethods.find((m) => m.name === prop && m.type === "staticSetter"));
        }
        staticSetters[prop](value);
        return true;
      }
      return Reflect.set(target, prop, value);
    }
  });
}
var UNIELEMENT_PRIORITY_METHODS = [
  "hasAttribute",
  "getAttribute",
  // 'setAttribute',
  // 'removeAttribute',
  "getAnyAttribute"
  // 'setAnyAttribute',
];
var elementClassDefineId = 0;
function initUTSElementProxyClass(options) {
  var classId = ++elementClassDefineId;
  var staticMethods = {};
  var staticGetters = {};
  var staticSetters = {};
  for (var method of options.staticMethods) {
    switch (method.type) {
      case "staticMethod":
        staticMethods[method.name] = FUNCTION_PLACEHOLDER;
        break;
      case "staticGetter":
        staticGetters[method.name] = FUNCTION_PLACEHOLDER;
        break;
      case "staticSetter":
        staticSetters[method.name] = FUNCTION_PLACEHOLDER;
        break;
    }
  }
  var ProxyClass = class extends UniViewElementImpl {
    static [Symbol.hasInstance](instance) {
      return instance && instance.__element_class_id__ === classId;
    }
    constructor(nodeId, page, tagName) {
      super(nodeId, page, tagName);
      var pageId = page.pageId;
      var element = {
        __type__: "UniElement",
        pageId,
        nodeId
      };
      var methods = {};
      var getters = {};
      var setters = {};
      for (var _method3 of options.methods) {
        switch (_method3.type) {
          case "method":
            methods[_method3.name] = FUNCTION_PLACEHOLDER;
            break;
          case "getter":
            getters[_method3.name] = FUNCTION_PLACEHOLDER;
            break;
          case "setter":
            setters[_method3.name] = FUNCTION_PLACEHOLDER;
            break;
        }
      }
      return new Proxy(this, {
        get(target, prop, receiver) {
          if (prop === "__v_skip") {
            return true;
          }
          if (prop === "__element_class_id__") {
            return classId;
          }
          if (typeof prop !== "string") {
            return Reflect.get(target, prop, receiver);
          }
          if (UNIELEMENT_PRIORITY_METHODS.includes(prop) && prop in target) {
            return target[prop].bind(target);
          }
          if (hasOwn(methods, prop)) {
            if (methods[prop] === FUNCTION_PLACEHOLDER) {
              methods[prop] = initProxyFunction(options.utsBridgeName, options.methods.find((m) => m.name === prop && m.type === "method"), element);
            }
            return methods[prop];
          }
          if (hasOwn(getters, prop)) {
            var getter = getters[prop];
            if (getter === FUNCTION_PLACEHOLDER) {
              getters[prop] = initProxyFunction(options.utsBridgeName, options.methods.find((m) => m.name === prop && m.type === "getter"), element);
            }
            return getters[prop]();
          }
          return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value) {
          if (typeof prop !== "string") {
            return Reflect.set(target, prop, value);
          }
          if (hasOwn(setters, prop)) {
            var setter = setters[prop];
            if (setter === FUNCTION_PLACEHOLDER) {
              setters[prop] = initProxyFunction(options.utsBridgeName, options.methods.find((m) => m.name === prop && m.type === "setter"), element);
            }
            setters[prop](value);
            return true;
          }
          return Reflect.set(target, prop, value);
        }
      });
    }
  };
  return new Proxy(ProxyClass, {
    get(target, prop, receiver) {
      if (hasOwn(staticMethods, prop)) {
        var _method4 = staticMethods[prop];
        if (_method4 === FUNCTION_PLACEHOLDER) {
          staticMethods[prop] = initProxyFunction(options.utsBridgeName, options.staticMethods.find((m) => m.name === prop && m.type === "staticMethod"));
        }
        return staticMethods[prop];
      }
      if (hasOwn(staticGetters, prop)) {
        var getter = staticGetters[prop];
        if (getter === FUNCTION_PLACEHOLDER) {
          staticGetters[prop] = initProxyFunction(options.utsBridgeName, options.staticMethods.find((m) => m.name === prop && m.type === "staticGetter"));
        }
        return staticGetters[prop]();
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
      if (hasOwn(staticSetters, prop)) {
        var setter = staticSetters[prop];
        if (setter === FUNCTION_PLACEHOLDER) {
          staticSetters[prop] = initProxyFunction(options.utsBridgeName, options.staticMethods.find((m) => m.name === prop && m.type === "staticSetter"));
        }
        staticSetters[prop](value);
        return true;
      }
      return Reflect.set(target, prop, value);
    }
  });
}
function initUTSProxyFunction(moduleName, options) {
  return initProxyFunction(moduleName, options);
}
function __log__(type, filename) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  var res = normalizeLog(type, filename, args);
  res && console[type](res);
}
function isDebugMode() {
  return typeof __channelId__ === "string" && __channelId__;
}
function jsonStringifyReplacer(k, p) {
  switch (toRawType(p)) {
    case "Function":
      return "function() { [native code] }";
    default:
      return p;
  }
}
function normalizeLog(type, filename, args) {
  if (isDebugMode()) {
    args.push(filename.replace("at ", "uni-app:///"));
    return console[type].apply(console, args);
  }
  var msgs = args.map(function(v) {
    var type2 = toTypeString(v).toLowerCase();
    if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
      try {
        v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
      } catch (e) {
        v = type2;
      }
    } else {
      if (v === null) {
        v = "---NULL---";
      } else if (v === void 0) {
        v = "---UNDEFINED---";
      } else {
        var vType = toRawType(v).toUpperCase();
        if (vType === "NUMBER" || vType === "BOOLEAN") {
          v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
        } else {
          v = String(v);
        }
      }
    }
    return v;
  });
  return msgs.join("---COMMA---") + " " + filename;
}
const index$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $emit,
  $off,
  $on,
  $once,
  __f__,
  __log__,
  addInterceptor,
  closeDialogPage,
  createCanvasContextAsync,
  createSelectorQuery,
  env,
  getElementById,
  getEnterOptionsSync,
  getLaunchOptionsSync,
  getPerformance,
  hideTabBar,
  hideTabBarRedDot,
  initUTSElementProxyClass,
  initUTSProxyClass,
  initUTSProxyFunction,
  loadFontFace,
  loadUasm,
  loadUasmSync,
  navigateBack,
  navigateTo,
  offAppRoute,
  offBeforeAppRoute,
  onAppRoute,
  onBeforeAppRoute,
  onTabBarMidButtonTap,
  openDialogPage,
  pageScrollTo,
  reLaunch,
  redirectTo,
  registerUTSInterface,
  registerUTSPlugin,
  removeInterceptor,
  removeTabBarBadge,
  requireUTSPlugin,
  rewriteRoute,
  setNavigationBarColor,
  setNavigationBarTitle,
  setTabBarBadge,
  setTabBarItem,
  setTabBarStyle,
  showTabBar,
  showTabBarRedDot,
  startPullDownRefresh,
  stopPullDownRefresh,
  switchTab
}, Symbol.toStringTag, { value: "Module" });
function converPx(value) {
  if (/^-?\d+[ur]px$/i.test(value)) {
    return value.replace(/(^-?\d+)[ur]px$/i, (text, num) => {
      return "".concat(uni.upx2px(parseFloat(num)), "px");
    });
  } else if (/^-?[\d\.]+$/.test(value)) {
    return "".concat(value, "px");
  }
  return value || "";
}
function converType(type) {
  return type.replace(/[A-Z]/g, (text) => {
    return "-".concat(text.toLowerCase());
  }).replace("webkit", "-webkit");
}
function getStyle(action) {
  var animateTypes1 = ["matrix", "matrix3d", "scale", "scale3d", "rotate3d", "skew", "translate", "translate3d"];
  var animateTypes2 = ["scaleX", "scaleY", "scaleZ", "rotate", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "translateX", "translateY", "translateZ"];
  var animateTypes3 = ["opacity", "background-color"];
  var animateTypes4 = ["width", "height", "left", "right", "top", "bottom"];
  var animates = action.animates;
  var option = action.option;
  var transition = option.transition;
  var style = {};
  var transform = [];
  animates.forEach((animate) => {
    var type = animate.type;
    var args = [...animate.args];
    if (animateTypes1.concat(animateTypes2).includes(type)) {
      if (type.startsWith("rotate") || type.startsWith("skew")) {
        args = args.map((value2) => parseFloat(value2) + "deg");
      } else if (type.startsWith("translate")) {
        args = args.map(converPx);
      }
      if (animateTypes2.indexOf(type) >= 0) {
        args.length = 1;
      }
      transform.push("".concat(type, "(").concat(args.join(","), ")"));
    } else if (animateTypes3.concat(animateTypes4).includes(args[0])) {
      type = args[0];
      var value = args[1];
      style[type] = animateTypes4.includes(type) ? converPx(value) : value;
    }
  });
  style.transform = style.webkitTransform = transform.join(" ");
  style.transition = style.webkitTransition = Object.keys(style).map((type) => "".concat(converType(type), " ").concat(transition.duration, "ms ").concat(transition.timingFunction, " ").concat(transition.delay, "ms")).join(",");
  style.transformOrigin = style.webkitTransformOrigin = option.transformOrigin;
  return style;
}
function startAnimation(context) {
  var animation2 = context.animation;
  if (!animation2 || !animation2.actions || !animation2.actions.length) {
    return;
  }
  var index2 = 0;
  var actions = animation2.actions;
  var length = animation2.actions.length;
  function animate() {
    var action = actions[index2];
    var transition = action.option.transition;
    var style = getStyle(action);
    Object.keys(style).forEach((key) => {
      context.$el.style[key] = style[key];
    });
    index2 += 1;
    if (index2 < length) {
      setTimeout(animate, transition.duration + transition.delay);
    }
  }
  setTimeout(() => {
    animate();
  }, 0);
}
const animation = {
  props: ["animation"],
  watch: {
    animation: {
      deep: true,
      handler() {
        startAnimation(this);
      }
    }
  },
  mounted() {
    startAnimation(this);
  }
};
var defineBuiltInComponent = (options) => {
  options.__reserved = true;
  var {
    props,
    mixins
  } = options;
  if (!props || !props.animation) {
    (mixins || (options.mixins = [])).push(animation);
  }
  {
    var rootElement = options.rootElement;
    if (rootElement) {
      customElements.define(rootElement.name, rootElement.class, rootElement.options);
    }
  }
  return defineSystemComponent(options);
};
var defineSystemComponent = (options) => {
  options.__reserved = true;
  options.compatConfig = {
    MODE: 3
    // 标记为vue3
  };
  return defineComponent(options);
};
var UniNavigatorElement = /* @__PURE__ */ (() => class extends UniElementImpl {
  constructor(data, pageNode) {
    super(data, pageNode);
    this.tagName = "NAVIGATOR";
    this.nodeName = this.tagName;
    this._getAttribute = (key) => {
      return null;
    };
  }
  getAnyAttribute(key) {
    var value = this._getAttribute(key);
    if (value != null) {
      return value;
    }
    return super.getAnyAttribute(key);
  }
})();
var navigatorProps = {
  url: {
    type: String,
    default: ""
  },
  openType: {
    type: String,
    default: "navigate"
  },
  delta: {
    type: Number,
    default: 1
  },
  animationType: {
    type: String,
    default: ""
  },
  animationDuration: {
    type: Number,
    default: 300
  },
  hoverClass: {
    type: String,
    default: "navigator-hover"
  },
  hoverStopPropagation: {
    type: Boolean,
    default: false
  },
  hoverStartTime: {
    type: Number,
    default: 50
  },
  hoverStayTime: {
    type: Number,
    default: 600
  }
};
const navigator = /* @__PURE__ */ defineBuiltInComponent({
  name: "Navigator",
  rootElement: {
    name: "uni-navigator-element",
    // @ts-expect-error not web element
    class: UniNavigatorElement
  },
  props: navigatorProps,
  emits: ["click"],
  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var $uniNavigatorElement = ref();
    var instance = getCurrentInstance();
    onMounted(() => {
      instance === null || instance === void 0 || instance.$waitNativeRender(() => {
        if (!instance)
          return;
        $uniNavigatorElement.value._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
      });
    });
    var _onClick = ($event) => {
      var url = props.url;
      emit("click", $event);
      var animationDuration = props.animationDuration;
      var onFail = (res) => {
        console.error(res.errMsg);
      };
      switch (props.openType) {
        case "navigate":
          uni.navigateTo({
            url,
            animationType: props.animationType.length > 0 ? props.animationType : "pop-in",
            animationDuration,
            fail: onFail
          });
          break;
        case "redirect":
          uni.redirectTo({
            url,
            fail: onFail
          });
          break;
        case "switchTab":
          uni.switchTab({
            url,
            fail: onFail
          });
          break;
        case "reLaunch":
          uni.reLaunch({
            url,
            fail: onFail
          });
          break;
        case "navigateBack":
          uni.navigateBack({
            delta: props.delta,
            animationType: props.animationType.length > 0 ? props.animationType : "pop-out",
            animationDuration,
            fail: onFail
          });
          break;
        default:
          console.log("<navigator/> openType attribute invalid");
          break;
      }
    };
    return () => {
      return createVNode("uni-navigator-element", {
        "ref": $uniNavigatorElement,
        "onClick": _onClick,
        "hoverClass": props.hoverClass,
        "hoverStopPropagation": props.hoverStopPropagation,
        "hoverStartTime": props.hoverStartTime,
        "hoverStayTime": props.hoverStayTime
      }, [renderSlot(slots, "default")], 8, ["onClick", "hoverClass", "hoverStopPropagation", "hoverStartTime", "hoverStayTime"]);
    };
  }
});
const navigator$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniNavigatorElement,
  default: navigator
}, Symbol.toStringTag, { value: "Module" });
const index = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Navigator: navigator$1
}, Symbol.toStringTag, { value: "Module" });
export {
  definePage as __definePage,
  registerApp as __registerApp,
  registerSystemRoute as __registerSystemRoute,
  systemRoutes as __uniSystemRoutes,
  index as components,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
  getCurrentDevToolsPage,
  getCurrentPages$1 as getCurrentPages,
  initApp,
  isDevToolsDialogPage,
  setDevToolsPageChangedListener,
  index$1 as uni
};
