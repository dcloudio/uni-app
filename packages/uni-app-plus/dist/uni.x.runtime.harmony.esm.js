import { normalizeStyles as normalizeStyles$1, addLeadingSlash, invokeArrayFns, ON_HIDE, ON_SHOW, parseQuery, EventChannel, once, parseUrl, Emitter, ON_UNHANDLE_REJECTION, ON_PAGE_NOT_FOUND, ON_ERROR, removeLeadingSlash, getLen, ON_UNLOAD, ON_READY, ON_PAGE_SCROLL, ON_PULL_DOWN_REFRESH, ON_REACH_BOTTOM, ON_RESIZE, ON_BACK_PRESS, ON_LAUNCH, ON_EXIT, ON_LAST_PAGE_BACK_PRESS } from "@dcloudio/uni-shared";
import { extend, isString, isPlainObject, isFunction as isFunction$1, isArray, isPromise, hasOwn, remove, invokeArrayFns as invokeArrayFns$1, capitalize, toTypeString, toRawType, parseStringStyle } from "@vue/shared";
import { createVNode, render, ref, onMounted, onBeforeUnmount, getCurrentInstance, injectHook, defineComponent, warn, watchEffect, watch, computed, camelize, reactive, provide, inject, nextTick } from "vue";
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
    var systemDialogPage = getSystemDialogPages(parentPage);
    for (var _i = 0; _i < systemDialogPage.length; _i++) {
      if (!!systemDialogPage[_i].$triggerParentHide) {
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
  {
    var _parentPage$vm$$syste;
    return ((_parentPage$vm$$syste = parentPage.vm.$systemDialogPages) === null || _parentPage$vm$$syste === void 0 ? void 0 : _parentPage$vm$$syste.value) || [];
  }
}
function initPageVm(pageVm, page) {
  pageVm.route = page.route;
  pageVm.$vm = pageVm;
  pageVm.$page = page;
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
function offKeepAliveApiCallback(name) {
  UniServiceJSBridge.off("api." + name);
}
function onKeepAliveApiCallback(name) {
  UniServiceJSBridge.on("api." + name, (res) => {
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
    if (isFunction$1(fn)) {
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
  var hasSuccess = isFunction$1(success);
  var hasFail = isFunction$1(fail);
  var hasComplete = isFunction$1(complete);
  var callbackId2 = invokeCallbackId++;
  addInvokeCallback(callbackId2, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction$1(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction$1(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId2;
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
        return isFunction$1(oldCallback) && oldCallback(res2) || res2;
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
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction$1(args[cb]))) {
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
function formatApiArgs(args, options) {
  var params = args[0];
  if (!options || !options.formatArgs || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  var formatArgs = options.formatArgs;
  var keys = Object.keys(formatArgs);
  for (var i = 0; i < keys.length; i++) {
    var name = keys[i];
    var formatterOrDefaultValue = formatArgs[name];
    if (isFunction$1(formatterOrDefaultValue)) {
      var errMsg = formatterOrDefaultValue(args[0][name], params);
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
      res = typeof errRes.errCode !== "undefined" ? new UniError(name, errRes.errCode, apiErrMsg) : new UniError(apiErrMsg, errRes);
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
  if (!isFunction$1(callback)) {
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
      onKeepAliveApiCallback(name);
      fn();
    }
  };
}
function wrapperOffApi(name, fn, options) {
  return (callback) => {
    checkCallback(callback);
    var errMsg = beforeInvokeApi(name, [callback], void 0, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    name = name.replace("off", "on");
    removeKeepAliveApiCallback(name, callback);
    var hasInvokeOnApi = findInvokeCallbackByName(name);
    if (!hasInvokeOnApi) {
      offKeepAliveApiCallback(name);
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
  vueApp = extend(appContext.app, {
    mountPage(pageComponent, pageProps, pageContainer) {
      var vnode = createVNode(pageComponent, pageProps);
      vnode.appContext = appContext;
      vnode.__page_container__ = pageContainer;
      render(vnode, pageContainer);
      var publicThis = vnode.component.proxy;
      publicThis.__page_container__ = pageContainer;
      return publicThis;
    },
    unmountPage: (pageInstance) => {
      var {
        __page_container__
      } = pageInstance;
      if (__page_container__) {
        __page_container__.isUnmounted = true;
        render(null, __page_container__);
        delete pageInstance.__page_container__;
        var vnode = pageInstance.$.vnode;
        delete vnode.__page_container__;
      }
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
    curPage.$page.vm = null;
    curPage.$page = null;
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
    referrerInfo
  } = _ref2;
  extend(launchOptions$1, {
    path,
    query: query ? parseQuery(query) : {},
    referrerInfo: referrerInfo || {},
    // TODO uni-app x
    channel: void 0,
    launcher: void 0
  });
  extend(enterOptions$1, launchOptions$1);
  return enterOptions$1;
}
var ON_BACK_BUTTON = "onBackButton";
var ON_POP_GESTURE = "onPopGesture";
var OPEN_DIALOG_PAGE = "openDialogPage";
var homeDialogPages = [];
var homeSystemDialogPages = [];
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
  pageVm.$basePage = pageVm.$page;
  pageVm.$page = uniPage;
  uniPage.route = pageVm.$basePage.route;
  uniPage.optionsByJS = pageVm.$basePage.options;
  Object.defineProperty(uniPage, "options", {
    get: function() {
      return new UTSJSONObject(pageVm.$basePage.options);
    }
  });
  uniPage.getElementById = (id2) => {
    var _pageVm$$el;
    var containerNode = (_pageVm$$el = pageVm.$el) === null || _pageVm$$el === void 0 ? void 0 : _pageVm$$el._parent;
    if (containerNode == null) {
      console.warn("bodyNode is null");
      return null;
    }
    return containerNode.querySelector("#".concat(id2));
  };
  uniPage.vm = pageVm;
  uniPage.$vm = pageVm;
  if (getPage$BasePage(pageVm).openType !== OPEN_DIALOG_PAGE) {
    addCurrentPageWithInitScope(pageId, pageVm, pageInstance);
  }
  onMounted(() => {
    var _pageVm$$el2;
    var rootElement = (_pageVm$$el2 = pageVm.$el) === null || _pageVm$$el2 === void 0 ? void 0 : _pageVm$$el2._parent;
    if (rootElement) {
      rootElement._page = pageVm.$page;
    }
  });
  onBeforeUnmount(() => {
    var _pageVm$$el3;
    var rootElement = (_pageVm$$el3 = pageVm.$el) === null || _pageVm$$el3 === void 0 ? void 0 : _pageVm$$el3._parent;
    if (rootElement) {
      rootElement._page = null;
    }
  });
}
function setupPage(component) {
  var oldSetup = component.setup;
  component.inheritAttrs = false;
  component.setup = (props, ctx) => {
    var {
      attrs: {
        __pageId,
        __pagePath,
        /*__pageQuery,*/
        __pageInstance
      }
    } = ctx;
    var instance = getCurrentInstance();
    var pageVm = instance.proxy;
    initPageVm(pageVm, __pageInstance);
    {
      setupXPage(instance, __pageInstance, pageVm, __pageId, __pagePath);
    }
    if (oldSetup) {
      return oldSetup(props, ctx);
    }
  };
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
  return isFunction$1(component);
}
var pagesMap = /* @__PURE__ */ new Map();
function definePage(pagePath, asyncComponent) {
  pagesMap.set(pagePath, once(createPageFactory(asyncComponent)));
}
function createPageFactory(component) {
  return () => {
    if (isVuePageAsyncComponent(component)) {
      return component().then((component2) => setupPage(clonedPageComponent(component2)));
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
    if (isFunction$1(interceptor[hook])) {
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
    if (isArray(hooks) && isFunction$1(hook)) {
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
    if (navigatorLock === url && params.openType !== "appLaunch") {
      return "".concat(navigatorLock, " locked");
    }
    if (__uniConfig.ready) {
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
    if (index2 !== selected0) {
      var item = list[index2];
      var path = item.pagePath;
      if (isString(path) && findPageRoute(getRealPath(path, true))) {
        uni.switchTab({
          url: getRealPath(path, true)
        });
      } else {
        console.error("switchTab: pagePath not found");
      }
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
    openType: "switchTab"
  });
  callback === null || callback === void 0 || callback();
  var page = getCurrentPage().vm;
  tabBar0.appendItem(page.$basePage.id.toString());
  return page;
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
    page = createTab(path, query, callback);
    tabs.set(path, page);
  }
  return new TabPageInfo(page, isFirst);
}
function switchSelect(selected, path) {
  var _getCurrentPage;
  var query = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var rebuild = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var callback = arguments.length > 4 ? arguments[4] : void 0;
  var shouldShow = false;
  if (tabBar0 === null) {
    init();
  }
  var currentPage = (_getCurrentPage = getCurrentPage()) === null || _getCurrentPage === void 0 ? void 0 : _getCurrentPage.vm;
  var type = currentPage == null ? "appLaunch" : "switchTab";
  invokeBeforeRouteHooks(type);
  var pageInfo = getTabPage(getRealPath(path, true), query, rebuild, callback);
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
  }
  selected0 = selected;
  invokeAfterRouteHooks(type);
}
var APP_THEME_AUTO = "auto";
var THEME_KEY_PREFIX = "@";
function getAppThemeFallbackOS() {
  var fallbackOSTheme = "light";
  try {
    var appTheme = uni.getAppBaseInfo().appTheme;
    fallbackOSTheme = appTheme;
    if (appTheme === APP_THEME_AUTO) {
      var osTheme = uni.getDeviceInfo().osTheme;
      fallbackOSTheme = osTheme;
    }
    return fallbackOSTheme;
  } catch (e) {
    console.error(e);
    return fallbackOSTheme;
  }
}
var appThemeChangeCallbackId = -1;
function clearAppThemeChangeCallbackId() {
  appThemeChangeCallbackId = -1;
}
function registerThemeChange(callback) {
  try {
    if (appThemeChangeCallbackId !== -1) {
      uni.offAppThemeChange(appThemeChangeCallbackId);
      clearAppThemeChangeCallbackId();
    }
    appThemeChangeCallbackId = uni.onAppThemeChange(function(res1) {
      var appThemeMode = res1["appTheme"];
      callback(appThemeMode);
    });
  } catch (e) {
  }
}
var onThemeChange = function(themeMode) {
  var handlePage = () => {
    var pages2 = getAllPages();
    pages2.forEach((page) => {
      var routeOptions = initRouteOptions(page.$basePage.path, "");
      var style = parsePageStyle(routeOptions);
      page.$page.setPageStyle(new UTSJSONObject(style));
    });
  };
  handlePage();
  var handleTabBar = () => {
    var tabBar = getTabBar();
    if (tabBar !== null) {
      var tabBarConfig = __uniConfig.getTabBarConfig();
      normalizeTabBarStyles(tabBarConfig, __uniConfig.themeConfig, themeMode);
      var tabBarStyle = /* @__PURE__ */ new Map();
      var tabBarConfigKeys = Object.keys(tabBarConfig);
      tabBarConfigKeys.forEach((key) => {
        var value = tabBarConfig[key];
        if (isString(value)) {
          tabBarStyle.set(key, value);
        } else if (isArray(value)) {
          var valueAsArray = value;
          var index2 = 0;
          valueAsArray.forEach((item) => {
            var tabBarItemMap = /* @__PURE__ */ new Map();
            tabBarItemMap.set("index", index2);
            Object.keys(item).forEach((tabBarItemkey) => {
              if (item[tabBarItemkey] != null) {
                tabBarItemMap.set(tabBarItemkey, item[tabBarItemkey]);
              }
            });
            tabBar.setTabBarItem(tabBarItemMap);
            index2++;
          });
        }
      });
      fixBorderStyle(tabBarStyle);
      tabBar.setTabBarStyle(tabBarStyle);
    }
  };
  handleTabBar();
};
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
function useTheme() {
  registerThemeChange(onThemeChange);
}
function setStatusBarStyle() {
  var page;
  {
    var _currentPage$vm;
    var currentPage = getCurrentPage();
    var dialogPages = currentPage === null || currentPage === void 0 ? void 0 : currentPage.getDialogPages();
    var systemDialogPages = currentPage === null || currentPage === void 0 || (_currentPage$vm = currentPage.vm) === null || _currentPage$vm === void 0 || (_currentPage$vm = _currentPage$vm.$systemDialogPages) === null || _currentPage$vm === void 0 ? void 0 : _currentPage$vm.value;
    if (systemDialogPages !== null && systemDialogPages !== void 0 && systemDialogPages.length && dialogPages !== null && dialogPages !== void 0 && dialogPages.length) {
      var lastSystemDialogPage = systemDialogPages[systemDialogPages.length - 1];
      var lastDialogPage = dialogPages[dialogPages.length - 1];
      page = Number(lastSystemDialogPage.__nativePageId) > Number(lastDialogPage.__nativePageId) ? lastSystemDialogPage.vm : lastDialogPage.vm;
    } else if (dialogPages !== null && dialogPages !== void 0 && dialogPages.length) {
      page = dialogPages[dialogPages.length - 1].vm;
    } else if (systemDialogPages !== null && systemDialogPages !== void 0 && systemDialogPages.length) {
      page = systemDialogPages[systemDialogPages.length - 1].vm;
    } else {
      page = currentPage.vm;
    }
  }
  if (page) {
    var nativePage = page.$nativePage;
    nativePage.applyStatusBarStyle();
  }
}
function closeNativeDialogPage(dialogPage, animationType, animationDuration, callback) {
  var webview = getNativeApp().pageManager.findPageById(dialogPage.vm.$basePage.id + "");
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
      if (parentPage && currentPages.indexOf(parentPage) !== -1) {
        var parentDialogPages = parentPage.getDialogPages();
        var index2 = parentDialogPages.indexOf(dialogPage);
        closeNativeDialogPage(dialogPage, (options === null || options === void 0 ? void 0 : options.animationType) || "auto", (options === null || options === void 0 ? void 0 : options.animationDuration) || ANI_DURATION);
        parentDialogPages.splice(index2, 1);
        if (index2 > 0 && index2 === parentDialogPages.length) {
          invokeHook(parentDialogPages[parentDialogPages.length - 1].vm, ON_SHOW);
        }
      } else {
        triggerFailCallback$1(options, "dialogPage is not a valid page");
        return;
      }
    } else {
      var _parentPage$vm;
      var systemDialogPages = parentPage === null || parentPage === void 0 || (_parentPage$vm = parentPage.vm) === null || _parentPage$vm === void 0 || (_parentPage$vm = _parentPage$vm.$systemDialogPages) === null || _parentPage$vm === void 0 ? void 0 : _parentPage$vm.value;
      if (systemDialogPages) {
        var _index = systemDialogPages.indexOf(dialogPage);
        if (_index > -1) {
          systemDialogPages.splice(_index, 1);
          closeNativeDialogPage(dialogPage, (options === null || options === void 0 ? void 0 : options.animationType) || "auto", (options === null || options === void 0 ? void 0 : options.animationDuration) || ANI_DURATION);
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
function registerPage(_ref, onCreated) {
  var {
    url,
    path,
    query,
    openType,
    webview,
    nvuePageVm,
    eventChannel
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
  function fn() {
    var page = createVuePage(id2, route, query, pageInstance, {}, nativePage);
    var pages2 = getCurrentPages();
    if (pages2.length === 1) {
      if (homeDialogPages.length) {
        var homePage = pages2[0];
        var dialogPages = homePage.getDialogPages();
        homePage.vm.$.$dialogPages.value = homeDialogPages.map((dialogPage) => {
          dialogPage.getParentPage = () => homePage;
          dialogPages.push(dialogPage);
          return dialogPage;
        });
        homeDialogPages.length = 0;
      }
      if (homeSystemDialogPages.length) {
        var _homePage = pages2[0];
        if (!_homePage.vm.$systemDialogPages) {
          _homePage.vm.$systemDialogPages = ref([]);
        }
        _homePage.vm.$systemDialogPages.value = homeSystemDialogPages.map((dialogPage) => {
          dialogPage.getParentPage = () => _homePage;
          return dialogPage;
        });
        homeDialogPages.length = 0;
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
      invokeHook(page, ON_UNLOAD);
    });
    nativePage.addPageEventListener(ON_READY, (_) => {
      invokePageReadyHooks(page);
      invokeHook(page, ON_READY);
    });
    nativePage.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
      invokeHook(page, ON_PAGE_SCROLL, {
        scrollTop: arg.scrollTop
      });
    });
    nativePage.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
      invokeHook(page, ON_PULL_DOWN_REFRESH);
    });
    nativePage.addPageEventListener(ON_REACH_BOTTOM, (_) => {
      invokeHook(page, ON_REACH_BOTTOM);
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
      invokeHook(page, ON_RESIZE, args);
    });
    nativePage.startRender();
  }
  if (delay) {
    setTimeout(fn, delay);
  } else {
    fn();
  }
  return nativePage;
}
function registerDialogPage(_ref2, dialogPage, onCreated) {
  var _uniRoutes$find;
  var {
    url,
    path,
    query,
    openType,
    eventChannel
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
  var parentPage = dialogPage.getParentPage();
  var createDialogPage = getPageManager().createDialogPage;
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
    var page = createVuePage(id2, route, query, pageInstance, {}, nativePage);
    nativePage.addPageEventListener(ON_POP_GESTURE, function(e) {
      closeDialogPage({
        dialogPage
      });
    });
    nativePage.addPageEventListener(ON_UNLOAD, (_) => {
      invokeHook(page, ON_UNLOAD);
      dialogPageTriggerParentShow(dialogPage, isSystemDialogPage(dialogPage) ? 1 : 0);
    });
    nativePage.addPageEventListener(ON_READY, (_) => {
      invokePageReadyHooks(page);
      invokeHook(page, ON_READY);
    });
    nativePage.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
      invokeHook(page, ON_PAGE_SCROLL, arg);
    });
    nativePage.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
      invokeHook(page, ON_PULL_DOWN_REFRESH);
    });
    nativePage.addPageEventListener(ON_REACH_BOTTOM, (_) => {
      invokeHook(page, ON_REACH_BOTTOM);
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
      invokeHook(page, ON_RESIZE, args);
    });
    nativePage.startRender();
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
    return component.then((component2) => mountPage(component2));
  }
  return mountPage(component);
}
function initGlobalEvent(app) {
  app.addKeyEventListener(ON_BACK_BUTTON, () => {
    var currentPage = getCurrentPage();
    if (currentPage) {
      var systemDialogPages = currentPage.vm && currentPage.vm.$systemDialogPages && currentPage.vm.$systemDialogPages.value || [];
      var dialogPages = currentPage.getDialogPages();
      if (systemDialogPages.length > 0 || dialogPages.length > 0) {
        var lastSystemDialog = systemDialogPages[systemDialogPages.length - 1];
        var lastDialog = dialogPages[dialogPages.length - 1];
        if (!systemDialogPages.length) {
          handleDialogPageBack(lastDialog);
        } else if (!dialogPages.length) {
          handleDialogPageBack(lastSystemDialog);
        } else {
          handleDialogPageBack(parseInt(lastDialog.vm.$nativePage.pageId) > parseInt(lastSystemDialog.vm.$nativePage.pageId) ? lastDialog : lastSystemDialog);
        }
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
var SOURCE_REG = /(.+\.((ttf)|(otf)|(woff2?))$)|(^(http|https):\/\/.+)|(^(data:font).+)/;
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
function checkOptionSource(options, res) {
  options.source = removeUrlWrap(options.source);
  if (!SOURCE_REG.test(options.source)) {
    res.reject("loadFontFace:fail, source is invalid.", 101);
    return false;
  }
  return true;
}
function getLoadFontFaceOptions(options, res) {
  return {
    family: options.family,
    source: options.source,
    success: (_) => {
      res.resolve(null);
    },
    fail: (error) => {
      res.reject(
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
    if (checkOptionSource(options, res)) {
      var app = getNativeApp();
      var fontInfo = getLoadFontFaceOptions(options, res);
      app.loadFontFace(fontInfo);
    }
  } else {
    var page = getCurrentPage().vm;
    if (!page) {
      res.reject("page is not ready", 99);
      return;
    }
    if (page.$fontFamilySet.has(options.family)) {
      return;
    }
    if (checkOptionSource(options, res)) {
      page.$fontFamilySet.add(options.family);
      var _fontInfo = getLoadFontFaceOptions(options, res);
      page.$nativePage.loadFontFace(_fontInfo);
    }
  }
});
function loadFontFaceByStyles(styles2, global) {
  styles2 = Array.isArray(styles2) ? styles2 : [styles2];
  var fontFaceStyle = [];
  styles2.forEach((style) => {
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
      loadFontFace({
        global,
        family: fontFamily,
        source: src,
        desc: {
          style: fontStyle,
          weight: fontWeight,
          variant: fontVariant
        }
      });
    } else {
      console.warn("loadFontFace: fail, font-family or src is null");
    }
  });
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
  var schemaLink = app.getLaunchOptionsSync();
  var launchOption = extend({}, args, schemaLink);
  setLaunchOptionsSync(launchOption);
  invokeHook(appVm, ON_LAUNCH, launchOption);
  var showOption = extend({}, launchOption);
  setEnterOptionsSync(showOption);
  invokeHook(appVm, ON_SHOW, showOption);
  var appStyle = appVm.$options.styles;
  if (appStyle) {
    loadFontFaceByStyles(appStyle, true);
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
function _redirectTo(_ref3) {
  var {
    url,
    path,
    query
  } = _ref3;
  return new Promise((resolve) => {
    setTimeout(() => {
      var lastPage = getCurrentPage().vm;
      invokeAfterRouteHooks(API_REDIRECT_TO);
      showWebview(registerPage({
        url,
        path,
        query,
        openType: isTabPage(lastPage) || getAllPages().length === 1 ? "reLaunch" : "redirectTo"
      }), "none", 0, () => {
        if (lastPage) {
          removePages(lastPage);
        }
        resolve(void 0);
        setStatusBarStyle();
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
function _reLaunch(_ref3) {
  var {
    url,
    path,
    query
  } = _ref3;
  return new Promise((resolve) => {
    setTimeout(() => {
      var pages2 = getAllPages().slice(0);
      var selected = getTabIndex(path);
      function callback() {
        pages2.forEach((page) => closePage(page, "none"));
        resolve(void 0);
        setStatusBarStyle();
      }
      if (selected === -1) {
        showWebview(registerPage({
          url,
          path,
          query,
          openType: "reLaunch"
        }), "none", 0, callback);
      } else {
        switchSelect(selected, path, query, true, callback);
      }
    }, 0);
  });
}
var reLaunch = /* @__PURE__ */ defineAsyncApi(API_RE_LAUNCH, $reLaunch, ReLaunchProtocol, ReLaunchOptions);
function closePage(page, animationType, animationDuration) {
  var dialogPages = page.$page.getDialogPages();
  for (var i = dialogPages.length - 1; i >= 0; i--) {
    closeNativeDialogPage(dialogPages[i]);
  }
  if (page.$systemDialogPages) {
    var systemDialogPages = page.$systemDialogPages.value;
    for (var _i = 0; _i < systemDialogPages.length; _i++) {
      closeNativeDialogPage(systemDialogPages[_i]);
    }
    page.$systemDialogPages.value = [];
  }
  for (var _i2 = dialogPages.length - 1; _i2 >= 0; _i2--) {
    closeNativeDialogPage(dialogPages[_i2]);
  }
  closeWebview(page.$nativePage, animationType, animationDuration);
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
var $switchTab = (args, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var {
    url
  } = args;
  var {
    path,
    query
  } = parseUrl(url);
  updateEntryPageIsReady(path);
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
  _switchTab({
    url,
    path,
    query
  }).then(resolve).catch(reject);
  handleBeforeEntryPageRoutes();
};
var switchTab = /* @__PURE__ */ defineAsyncApi(API_SWITCH_TAB, $switchTab, SwitchTabProtocol, SwitchTabOptions);
function _switchTab(_ref2) {
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
      switchSelect(selected, path, query);
      for (var index2 = pages2.length - 1; index2 >= 0; index2--) {
        var page = pages2[index2];
        if (isTabPage(page)) {
          break;
        }
        closePage(page, "none");
      }
      resolve(void 0);
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
  var entryPagePath = addLeadingSlash(__uniConfig.entryPagePath);
  var routeOptions = getRouteOptions(entryPagePath);
  var args = {
    url: entryPagePath + (__uniConfig.entryPageQuery || ""),
    openType: "appLaunch"
  };
  var handler = {
    resolve() {
    },
    reject() {
    }
  };
  if (routeOptions.meta.isTabBar) {
    return $switchTab(args, handler);
  }
  return $navigateTo(args, handler);
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
function initComponentInstance(app) {
  app.mixin({
    beforeCreate() {
      var vm = this;
      var instance = vm.$;
      if (instance.type.mpType === "app") {
        return;
      }
      var pageId = instance.root.attrs.__pageId;
      vm.$nativePage = getNativeApp().pageManager.findPageById(pageId + "");
      if (vm.$page) {
        vm.$page.__nativePageId = vm.$nativePage.pageId;
      }
    },
    beforeMount() {
      var _vm$$options$styles;
      var vm = this;
      var instance = vm.$;
      if (instance.type.mpType === "app") {
        return;
      }
      loadFontFaceByStyles((_vm$$options$styles = vm.$options.styles) !== null && _vm$$options$styles !== void 0 ? _vm$$options$styles : [], false);
    }
  });
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
  initEntryPagePath(nativeApp2);
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
function initEntryPagePath(app) {
  var redirectInfo = app.getRedirectInfo();
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
var $navigateTo = (args, _ref) => {
  var {
    resolve,
    reject
  } = _ref;
  var {
    url,
    events,
    animationType,
    animationDuration
  } = args;
  var {
    path,
    query
  } = parseUrl(url);
  var [aniType, aniDuration] = initAnimation$1(path, animationType, animationDuration);
  updateEntryPageIsReady(path);
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
  _navigateTo({
    url,
    path,
    query,
    events,
    aniType,
    aniDuration
  }).then(resolve).catch(reject);
  handleBeforeEntryPageRoutes();
};
var navigateTo = /* @__PURE__ */ defineAsyncApi(API_NAVIGATE_TO, $navigateTo, NavigateToProtocol, NavigateToOptions);
function _navigateTo(_ref2) {
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
  var currentRouteType = currentPage == null ? "appLaunch" : API_NAVIGATE_TO;
  invokeBeforeRouteHooks(currentRouteType);
  invokeHook(ON_HIDE);
  var eventChannel = new EventChannel(getWebviewId() + 1, events);
  return new Promise((resolve) => {
    setTimeout(() => {
      var noAnimation = aniType === "none" || aniDuration === 0;
      function callback(page2) {
        showWebview(page2, aniType, aniDuration, () => {
          invokeAfterRouteHooks(currentRouteType);
          resolve({
            eventChannel
          });
          setStatusBarStyle();
        });
      }
      var page = registerPage(
        {
          url,
          path,
          query,
          openType: "navigateTo",
          eventChannel
        },
        noAnimation ? void 0 : callback,
        // 有动画时延迟创建 vm
        noAnimation ? 0 : 1
      );
      if (noAnimation) {
        callback(page);
      }
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
  reLaunch({
    url: (_uniConfig$entryPage = __uniConfig.entryPagePath) !== null && _uniConfig$entryPage !== void 0 && _uniConfig$entryPage.startsWith("/") ? __uniConfig.entryPagePath : "/" + __uniConfig.entryPagePath
  });
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
  if (delta > 1) {
    pages2.slice(len - delta, len - 1).reverse().forEach((deltaPage) => {
      var dialogPages2 = deltaPage.$page.getDialogPages();
      for (var i2 = dialogPages2.length - 1; i2 >= 0; i2--) {
        var dialogPage2 = dialogPages2[i2];
        closeNativeDialogPage(dialogPage2);
      }
      closeWebview(getNativeApp().pageManager.findPageById(deltaPage.$basePage.id + ""), "none", 0);
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
      setStatusBarStyle();
    });
  };
  var webview = getNativeApp().pageManager.findPageById(currentPage.$basePage.id + "");
  var dialogPages = currentPage.$page.getDialogPages();
  for (var i = dialogPages.length - 1; i >= 0; i--) {
    var dialogPage = dialogPages[i];
    closeNativeDialogPage(dialogPage);
    if (i > 0) {
      invokeHook(dialogPages[i - 1].vm, ON_SHOW);
    }
  }
  if (currentPage.$systemDialogPages) {
    var systemDialogPages = currentPage.$systemDialogPages.value;
    for (var _i = 0; _i < systemDialogPages.length; _i++) {
      closeNativeDialogPage(systemDialogPages[_i]);
    }
    currentPage.$systemDialogPages.value = [];
  }
  backPage(webview);
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
  var errMsg = normalizeUrl(path, {});
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
  var dialogPage = new UniDialogPageImpl();
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
      if (dialogPages.length) {
        invokeHook(dialogPages[dialogPages.length - 1].$vm, ON_HIDE);
      }
      dialogPages.push(dialogPage);
    }
    setCurrentNormalDialogPage(dialogPage);
  } else {
    if (!parentPage) {
      homeSystemDialogPages.push(dialogPage);
      if (isSystemActionSheetDialogPage(dialogPage)) {
        closePreActionSheet(homeSystemDialogPages);
      }
    } else {
      if (!parentPage.vm.$systemDialogPages) {
        parentPage.vm.$systemDialogPages = ref([]);
      }
      parentPage.vm.$systemDialogPages.value.push(dialogPage);
      if (isSystemActionSheetDialogPage(dialogPage)) {
        closePreActionSheet(parentPage.vm.$systemDialogPages.value);
      }
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
function closePreActionSheet(dialogPages) {
  var actionSheets = dialogPages.filter((page) => isSystemActionSheetDialogPage(page));
  if (actionSheets.length > 1) {
    setTimeout(() => {
      closeNativeDialogPage(actionSheets[0]);
      dialogPages.splice(dialogPages.indexOf(actionSheets[0]), 1);
    }, 150);
  }
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
  var item = /* @__PURE__ */ new Map([["index", index2], ["text", text], ["iconPath", iconPath], ["selectedIconPath", selectedIconPath], ["pagePath", pagePath], ["visible", visible]]);
  if (!!iconfont) {
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
  var style = /* @__PURE__ */ new Map([["color", options.color], ["selectedColor", options.selectedColor], ["backgroundColor", options.backgroundColor], ["backgroundImage", options.backgroundImage], ["backgroundRepeat", options.backgroundRepeat], ["borderStyle", options.borderStyle], ["borderColor", options.borderColor]]);
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
  var _page$$el;
  var page = getCurrentPage().vm;
  if (page == null) {
    return null;
  }
  var bodyNode = (_page$$el = page.$el) === null || _page$$el === void 0 ? void 0 : _page$$el.parentNode;
  if (bodyNode == null) {
    console.warn("bodyNode is null");
    return null;
  }
  return bodyNode.querySelector("#".concat(id2));
});
function isVueComponent(comp) {
  var has$instance = typeof comp.$ === "object";
  var has$el = typeof comp.$el === "object";
  return has$instance && has$el;
}
var isFunction = (val) => typeof val === "function";
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
    var _this$_component;
    (_this$_component = this._component) === null || _this$_component === void 0 || (_this$_component = _this$_component.$) === null || _this$_component === void 0 || _this$_component.$waitNativeRender(() => {
      requestComponentInfo(this._component, this._queue, (res) => {
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
    return this._nodesRef;
  }
  in(component) {
    if (component && isVueComponent(component)) {
      this._component = component;
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
class QuerySelectorHelper {
  constructor(element, vnode, fields) {
    this._element = element;
    this._commentStartVNode = vnode;
    this._fields = fields;
  }
  /**
   * entry
   */
  static queryElement(element, selector, all, vnode, fields) {
    return new QuerySelectorHelper(element, vnode, fields).query(selector, all);
  }
  /**
   * 执行查询
   * @param selector 选择器
   * @param all 是否查询所有 selectAll
   * @returns
   */
  query(selector, all) {
    if (this._element.nodeName == "#comment") {
      return this.queryFragment(this._element, selector, all);
    } else {
      return all ? this.querySelectorAll(this._element, selector) : this.querySelector(this._element, selector);
    }
  }
  queryFragment(el, selector, all) {
    var current = el.nextSibling;
    if (current == null) {
      return null;
    }
    if (all) {
      var result1 = [];
      while (true) {
        var queryResult = this.querySelectorAll(current, selector);
        if (queryResult != null) {
          result1.push(...queryResult);
        }
        current = current.nextSibling;
        if (current == null || this._commentStartVNode.anchor == current) {
          break;
        }
      }
      return result1;
    } else {
      var result2 = null;
      while (true) {
        result2 = this.querySelector(current, selector);
        current = current.nextSibling;
        if (result2 != null || current == null || this._commentStartVNode.anchor == current) {
          break;
        }
      }
      return result2;
    }
  }
  querySelector(element, selector) {
    var element2 = this.querySelf(element, selector);
    if (element2 == null) {
      element2 = element.querySelector(selector);
    }
    if (element2 != null) {
      return this.getNodeInfo(element2);
    }
    return null;
  }
  querySelectorAll(element, selector) {
    var nodesInfoArray = [];
    var element2 = this.querySelf(element, selector);
    if (element2 != null) {
      nodesInfoArray.push(this.getNodeInfo(element));
    }
    var findNodes = element.querySelectorAll(selector);
    findNodes === null || findNodes === void 0 || findNodes.forEach((el) => {
      nodesInfoArray.push(this.getNodeInfo(el));
    });
    return nodesInfoArray;
  }
  querySelf(element, selector) {
    if (element == null || selector.length < 2) {
      return null;
    }
    var selectorType = selector.charAt(0);
    var selectorName = selector.slice(1);
    if (selectorType == "." && element.classList.includes(selectorName)) {
      return element;
    }
    if (selectorType == "#" && element.getAttribute("id") == selectorName) {
      return element;
    }
    if (selector.toUpperCase() == element.nodeName.toUpperCase()) {
      return element;
    }
    return null;
  }
  /**
   * 查询元素信息
   * @param element
   * @returns
   */
  getNodeInfo(element) {
    var _element$getAttribute;
    if (this._fields.node == true) {
      var nodeInfo2 = {
        node: element
      };
      if (this._fields.size == true) {
        var rect2 = element.getBoundingClientRect();
        nodeInfo2.width = rect2.width;
        nodeInfo2.height = rect2.height;
      }
      return nodeInfo2;
    }
    var rect = element.getBoundingClientRect();
    var nodeInfo = {
      id: (_element$getAttribute = element.getAttribute("id")) === null || _element$getAttribute === void 0 ? void 0 : _element$getAttribute.toString(),
      dataset: null,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height
    };
    return nodeInfo;
  }
}
function requestComponentInfo(vueComponent, queue2, callback) {
  var result = [];
  var el = vueComponent === null || vueComponent === void 0 ? void 0 : vueComponent.$el;
  if (el != null) {
    queue2.forEach((item) => {
      var queryResult = QuerySelectorHelper.queryElement(el, item.selector, !item.single, vueComponent === null || vueComponent === void 0 ? void 0 : vueComponent.$.subTree, item.fields);
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
  if (scrollViewNode == null || scrollViewNode.tagName != "SCROLL-VIEW") {
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
    fail: res.reject
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
  TEMP_PATH: "unifile://temp/"
};
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
var callbackId = 1;
var proxy;
var keepAliveCallbacks = {};
function isUniElement(obj) {
  return obj && typeof obj.getNodeId === "function" && obj.pageId;
}
function isComponentPublicInstance(instance) {
  return instance && instance.$ && instance.$.proxy === instance;
}
function parseElement(obj) {
  if (isUniElement(obj)) {
    return obj;
  }
}
function parseComponentPublicInstance(obj) {
  if (isComponentPublicInstance(obj)) {
    return obj.$el;
  }
}
function serializeArrayBuffer(obj) {
  if (typeof ArrayBufferWrapper !== "undefined") {
    return {
      __type__: "ArrayBuffer",
      value: new ArrayBufferWrapper(obj)
    };
  }
  return {
    __type__: "ArrayBuffer",
    value: obj
  };
}
function serializeUniElement(el, type) {
  var nodeId = "";
  var pageId = "";
  if (el && el.getNodeId) {
    pageId = el.pageId;
    nodeId = el.getNodeId();
  }
  return {
    __type__: type,
    pageId,
    nodeId
  };
}
function toRaw(observed) {
  var raw = observed && observed.__v_raw;
  return raw ? toRaw(raw) : observed;
}
function normalizeArg(arg, callbacks, keepAlive, context) {
  arg = toRaw(arg);
  if (typeof arg === "function") {
    var id2;
    if (keepAlive) {
      var oldId = Object.keys(callbacks).find((id22) => callbacks[id22] === arg);
      id2 = oldId ? parseInt(oldId) : callbackId++;
      callbacks[id2] = arg;
    } else {
      id2 = callbackId++;
      callbacks[id2] = arg;
    }
    return id2;
  } else if (isArray(arg)) {
    context.depth++;
    return arg.map((item) => normalizeArg(item, callbacks, keepAlive, context));
  } else if (arg instanceof ArrayBuffer) {
    if (context.depth > 0) {
      context.nested = true;
    }
    return serializeArrayBuffer(arg);
  } else if (isPlainObject(arg) || isUniElement(arg)) {
    var uniElement = parseElement(arg);
    var componentPublicInstanceUniElement = !uniElement ? parseComponentPublicInstance(arg) : void 0;
    var el = uniElement || componentPublicInstanceUniElement;
    if (el) {
      if (context.depth > 0) {
        context.nested = true;
      }
      return serializeUniElement(el, uniElement ? "UniElement" : "ComponentPublicInstance");
    } else {
      var newArg = {};
      Object.keys(arg).forEach((name) => {
        context.depth++;
        newArg[name] = normalizeArg(arg[name], callbacks, keepAlive, context);
      });
      return newArg;
    }
  }
  return arg;
}
function initUTSInstanceMethod(async, opts, instanceId, proxy2) {
  return initProxyFunction("method", async, opts, instanceId, proxy2);
}
function getProxy() {
  if (!proxy) {
    {
      proxy = {
        invokeSync(args, callback) {
          return nativeChannel.invokeSync("APP-SERVICE", args, callback);
        },
        invokeAsync(args, callback) {
          return nativeChannel.invokeAsync("APP-SERVICE", args, callback);
        }
      };
    }
  }
  return proxy;
}
function resolveSyncResult(args, res, returnOptions, instanceId, proxy2) {
  if (!res) {
    throw new Error("返回值为：" + JSON.stringify(res) + "；请求参数为：" + JSON.stringify(args));
  }
  if (isString(res)) {
    try {
      res = JSON.parse(res);
    } catch (e) {
      throw new Error("JSON.parse(".concat(res, "): ") + e);
    }
  }
  if (res.errMsg) {
    throw new Error(res.errMsg);
  }
  if (returnOptions) {
    if (returnOptions.type === "interface" && typeof res.params === "number") {
      if (!res.params) {
        return null;
      }
      if (res.params === instanceId && proxy2) {
        return proxy2;
      }
      if (interfaceDefines[returnOptions.options]) {
        var ProxyClass = initUTSProxyClass(extend({
          instanceId: res.params
        }, interfaceDefines[returnOptions.options]));
        return new ProxyClass();
      }
    }
  }
  return res.params;
}
function invokePropGetter(args) {
  if (args.errMsg) {
    throw new Error(args.errMsg);
  }
  delete args.errMsg;
  return resolveSyncResult(args, getProxy().invokeSync(args, () => {
  }));
}
function initProxyFunction(type, async, _ref, instanceId, proxy2) {
  var {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    name: methodName,
    method,
    companion,
    keepAlive,
    params: methodParams,
    return: returnOptions,
    errMsg
  } = _ref;
  if (!keepAlive) {
    keepAlive = (methodName.indexOf("on") === 0 || methodName.indexOf("off") === 0) && methodParams.length === 1 && methodParams[0].type === "UTSCallback";
  }
  var baseArgs = instanceId ? {
    moduleName,
    moduleType,
    id: instanceId,
    type,
    name: methodName,
    method: methodParams,
    nested: false,
    keepAlive
  } : {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    name: method || methodName,
    type,
    companion,
    method: methodParams,
    nested: false,
    keepAlive
  };
  return function() {
    if (errMsg) {
      throw new Error(errMsg);
    }
    var callbacks = keepAlive ? keepAliveCallbacks : {};
    var invokeCallback2 = (_ref2) => {
      var {
        id: id2,
        name,
        params
      } = _ref2;
      var callback = callbacks[id2];
      if (callback) {
        callback(...params);
        if (!keepAlive) {
          delete callbacks[id2];
        }
      } else {
        console.error("uts插件[".concat(moduleName, "] ").concat(pkg).concat(cls, ".").concat(methodName.replace("ByJs", ""), " ").concat(name, "回调函数已释放，不能再次执行，参考文档：https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#keepalive"));
      }
    };
    var context = {
      depth: 0,
      nested: false
    };
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var invokeArgs = extend({}, baseArgs, {
      params: args.map((arg) => normalizeArg(arg, callbacks, keepAlive, context))
    });
    invokeArgs.nested = context.nested;
    if (async) {
      return new Promise((resolve, reject) => {
        getProxy().invokeAsync(invokeArgs, (res) => {
          if (res.type !== "return") {
            invokeCallback2(res);
          } else {
            if (res.errMsg) {
              reject(res.errMsg);
            } else {
              resolve(res.params);
            }
          }
        });
      });
    }
    return resolveSyncResult(invokeArgs, getProxy().invokeSync(invokeArgs, invokeCallback2), returnOptions, instanceId, proxy2);
  };
}
function initUTSStaticMethod(async, opts) {
  if (opts.main && !opts.method) {
    if (isUTSiOS()) {
      opts.method = "s_" + opts.name;
    }
  }
  return initProxyFunction("method", async, opts, 0);
}
var initUTSProxyFunction = initUTSStaticMethod;
function parseClassMethodName(name, methods) {
  if (typeof name === "string" && hasOwn(methods, name + "ByJs")) {
    return name + "ByJs";
  }
  return name;
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isProxyInterfaceOptions(options) {
  return !isUndefined(options.instanceId);
}
function parseClassPropertySetter(name) {
  return "__$set" + capitalize(name);
}
function initUTSProxyClass(options) {
  var {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    methods,
    props,
    setters,
    errMsg
  } = options;
  var baseOptions = {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    errMsg
  };
  var instanceId;
  var constructorParams = [];
  var staticMethods = {};
  var staticProps = [];
  var staticSetters = {};
  var isProxyInterface = false;
  if (isProxyInterfaceOptions(options)) {
    isProxyInterface = true;
    instanceId = options.instanceId;
  } else {
    constructorParams = options.constructor.params;
    staticMethods = options.staticMethods;
    staticProps = options.staticProps;
    staticSetters = options.staticSetters;
  }
  if (isUTSiOS()) {
    if (constructorParams.find((p) => p.type === "UTSCallback" || p.type.indexOf("JSONObject") > 0)) {
      constructorParams.push({
        name: "_byJs",
        type: "boolean"
      });
    }
  }
  var ProxyClass = class UTSClass {
    constructor() {
      this.__instanceId = 0;
      if (errMsg) {
        throw new Error(errMsg);
      }
      var target = {};
      if (!isProxyInterface) {
        for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          params[_key2] = arguments[_key2];
        }
        this.__instanceId = initProxyFunction("constructor", false, extend({
          name: "constructor",
          keepAlive: false,
          params: constructorParams
        }, baseOptions), 0).apply(null, params);
      } else if (typeof instanceId === "number") {
        this.__instanceId = instanceId;
      }
      if (!this.__instanceId) {
        throw new Error("new ".concat(cls, " is failed"));
      }
      var instance = this;
      var proxy2 = new Proxy(instance, {
        get(_, name) {
          if (name === "__v_skip") {
            return true;
          }
          if (!target[name]) {
            name = parseClassMethodName(name, methods);
            if (hasOwn(methods, name)) {
              var {
                async,
                keepAlive,
                params: params2,
                return: returnOptions
              } = methods[name];
              target[name] = initUTSInstanceMethod(!!async, extend({
                name,
                keepAlive,
                params: params2,
                return: returnOptions
              }, baseOptions), instance.__instanceId, proxy2);
            } else if (props.includes(name)) {
              return invokePropGetter({
                moduleName,
                moduleType,
                id: instance.__instanceId,
                type: "getter",
                keepAlive: false,
                nested: false,
                name,
                errMsg
              });
            }
          }
          return target[name];
        },
        set(_, name, newValue) {
          if (props.includes(name)) {
            var setter = parseClassPropertySetter(name);
            if (!target[setter]) {
              var param = setters[name];
              if (param) {
                target[setter] = initProxyFunction("setter", false, extend({
                  name,
                  keepAlive: false,
                  params: [param]
                }, baseOptions), instance.__instanceId, proxy2);
              }
            }
            target[parseClassPropertySetter(name)](newValue);
            return true;
          }
          return false;
        }
      });
      return Object.freeze(proxy2);
    }
  };
  var staticPropSetterCache = {};
  var staticMethodCache = {};
  return Object.freeze(new Proxy(ProxyClass, {
    get(target, name, receiver) {
      name = parseClassMethodName(name, staticMethods);
      if (hasOwn(staticMethods, name)) {
        if (!staticMethodCache[name]) {
          var {
            async,
            keepAlive,
            params,
            return: returnOptions
          } = staticMethods[name];
          staticMethodCache[name] = initUTSStaticMethod(!!async, extend({
            name,
            companion: true,
            keepAlive,
            params,
            return: returnOptions
          }, baseOptions));
        }
        return staticMethodCache[name];
      }
      if (staticProps.includes(name)) {
        return invokePropGetter(extend({
          name,
          companion: true,
          type: "getter"
        }, baseOptions));
      }
      return Reflect.get(target, name, receiver);
    },
    set(_, name, newValue) {
      if (staticProps.includes(name)) {
        var setter = parseClassPropertySetter(name);
        if (!staticPropSetterCache[setter]) {
          var param = staticSetters[name];
          if (param) {
            staticPropSetterCache[setter] = initProxyFunction("setter", false, extend({
              name,
              keepAlive: false,
              params: [param]
            }, baseOptions), 0);
          }
        }
        staticPropSetterCache[parseClassPropertySetter(name)](newValue);
        return true;
      }
      return false;
    }
  }));
}
function isUTSAndroid() {
  {
    return false;
  }
}
function isUTSiOS() {
  return !isUTSAndroid();
}
function initUTSPackageName(name, is_uni_modules) {
  if (isUTSAndroid()) {
    return "uts.sdk." + (is_uni_modules ? "modules." : "") + name;
  }
  return "";
}
function initUTSIndexClassName(moduleName, is_uni_modules) {
  return initUTSClassName(moduleName, isUTSAndroid() ? "IndexKt" : "IndexSwift", is_uni_modules);
}
function initUTSClassName(moduleName, className, is_uni_modules) {
  if (isUTSAndroid()) {
    return className;
  }
  return "UTSSDK" + (is_uni_modules ? "Modules" : "") + capitalize(moduleName) + capitalize(className);
}
var interfaceDefines = {};
function registerUTSInterface(name, define) {
  interfaceDefines[name] = define;
}
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
  initUTSClassName,
  initUTSIndexClassName,
  initUTSPackageName,
  initUTSProxyClass,
  initUTSProxyFunction,
  loadFontFace,
  navigateBack,
  navigateTo,
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
function $dispatch(context, componentName, eventName) {
  var _parent;
  var parent = context.$parent;
  var name = (_parent = parent) === null || _parent === void 0 || (_parent = _parent.$options) === null || _parent === void 0 ? void 0 : _parent.name;
  while (parent != null && (name == null || componentName != name)) {
    parent = parent.$parent;
    if (parent != null) {
      var _parent2;
      name = (_parent2 = parent) === null || _parent2 === void 0 || (_parent2 = _parent2.$options) === null || _parent2 === void 0 ? void 0 : _parent2.name;
    }
  }
  if (parent != null) {
    if (typeof parent[eventName] === "function") {
      for (var _len = arguments.length, do_not_transform_spread = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        do_not_transform_spread[_key - 3] = arguments[_key];
      }
      parent[eventName](...do_not_transform_spread);
    } else {
      warn("dispatch: ".concat(componentName, " has no method ").concat(eventName));
    }
  }
}
function $dispatchParent(context, componentName, eventName) {
  var _parent$$options;
  var parent = context.$parent;
  var name = parent === null || parent === void 0 || (_parent$$options = parent.$options) === null || _parent$$options === void 0 ? void 0 : _parent$$options.name;
  if (parent !== null && (name === null || componentName === name)) {
    if (typeof parent[eventName] === "function") {
      for (var _len2 = arguments.length, do_not_transform_spread = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        do_not_transform_spread[_key2 - 3] = arguments[_key2];
      }
      return parent[eventName](...do_not_transform_spread);
    } else {
      warn("dispatchParent: ".concat(componentName, " has no method ").concat(eventName));
    }
  }
}
function initUniCustomEvent(element, e) {
  e.target = element;
  e.currentTarget = element;
  return e;
}
var CHECKBOX_NAME = "Checkbox";
var CHECKBOX_ROOT_ELEMENT = "uni-checkbox-element";
var UniCheckboxElement = /* @__PURE__ */ (() => class extends UniElementImpl {
  constructor(data, pageNode) {
    super(data, pageNode);
    this.tagName = "CHECKBOX";
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
var checkboxProps = {
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Object, String],
    default: ""
  },
  // 图标颜色
  color: {
    type: String,
    default: "#007aff"
  },
  // 默认的背景颜色
  backgroundColor: {
    type: String,
    default: "#ffffff"
  },
  // 默认的边框颜色
  borderColor: {
    type: String,
    default: "#d1d1d1"
  },
  // 选中时的背景颜色
  activeBackgroundColor: {
    type: String,
    default: "#ffffff"
  },
  // 选中时的边框颜色
  activeBorderColor: {
    type: String,
    default: "#d1d1d1"
  },
  // 图标颜色,同color,优先级大于color
  iconColor: {
    type: String,
    default: ""
  },
  // 图标颜色,同color,优先级大于iconColor
  foreColor: {
    type: String,
    default: ""
  }
};
var styles = {
  ["uni-checkbox"]: {
    "flex-direction": "row",
    "align-items": "center"
  },
  ["uni-checkbox-input"]: {
    "justify-content": "center",
    "align-items": "center",
    position: "relative",
    "border-top-width": "1px",
    "border-right-width": "1px",
    "border-bottom-width": "1px",
    "border-left-width": "1px",
    "border-top-style": "solid",
    "border-right-style": "solid",
    "border-bottom-style": "solid",
    "border-left-style": "solid",
    "border-top-left-radius": "3px",
    "border-top-right-radius": "3px",
    "border-bottom-right-radius": "3px",
    "border-bottom-left-radius": "3px",
    width: "22px",
    height: "22px",
    "margin-right": "5px",
    "box-sizing": "content-box"
  },
  ["uni-icon"]: {
    "font-family": "uni-icon",
    "font-size": "16px",
    width: "16px",
    height: "16px"
  }
};
const checkbox = /* @__PURE__ */ defineBuiltInComponent({
  name: CHECKBOX_NAME,
  rootElement: {
    name: CHECKBOX_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniCheckboxElement
  },
  props: checkboxProps,
  emits: ["click"],
  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var icon = "";
    var instance = getCurrentInstance();
    var elementRef = ref();
    var checkboxChecked = ref(props.checked);
    var checkboxValue = ref("");
    var setCheckboxChecked = (checked) => {
      checkboxChecked.value = checked;
    };
    watchEffect(() => {
      checkboxChecked.value = props.checked;
    });
    watch(() => checkboxChecked.value, (val) => {
      var ctx = instance === null || instance === void 0 ? void 0 : instance.proxy;
      if (!ctx)
        return;
      $dispatch(ctx, "CheckboxGroup", "_changeHandler", {
        name: checkboxValue.value,
        checked: checkboxChecked.value,
        setCheckboxChecked
      });
    });
    watchEffect(() => {
      checkboxValue.value = props.value.toString();
    });
    var iconStyle = computed(() => {
      if (props.disabled) {
        return Object.assign({}, styles["uni-icon"]);
      }
      var color = "";
      if (props.foreColor.length > 0) {
        color = props.foreColor;
      } else if (props.iconColor.length > 0) {
        color = props.iconColor;
      } else {
        color = props.color;
      }
      return Object.assign({}, styles["uni-icon"], {
        color
      });
    });
    var checkInputStyle = computed(() => {
      var style = checkboxChecked.value ? checkedStyle.value : uncheckedStyle.value;
      return Object.assign({}, styles["uni-checkbox-input"], style);
    });
    var checkedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: "#e1e1e1",
          borderColor: "#d1d1d1"
        };
      }
      return {
        backgroundColor: props.activeBackgroundColor,
        borderColor: props.activeBorderColor
      };
    });
    var uncheckedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: "#e1e1e1",
          borderColor: "#d1d1d1"
        };
      }
      return {
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor
      };
    });
    onMounted(() => {
      var ctx = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx, "CheckboxGroup", "_checkboxGroupUpdateHandler", {
        setCheckboxChecked,
        name: checkboxValue.value,
        checked: checkboxChecked.value
      }, "add");
      instance === null || instance === void 0 || instance.$waitNativeRender(() => {
        var _instance$proxy;
        if (!instance)
          return;
        elementRef.value = (_instance$proxy = instance.proxy) === null || _instance$proxy === void 0 ? void 0 : _instance$proxy.$el;
        elementRef.value._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
      });
    });
    onBeforeUnmount(() => {
      var ctx = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx, "CheckboxGroup", "_checkboxGroupUpdateHandler", {
        setCheckboxChecked,
        name: checkboxValue.value,
        checked: checkboxChecked.value
      }, "remove");
    });
    var _onClick = ($event) => {
      if (props.disabled)
        return;
      emit("click", $event);
      checkboxChecked.value = !checkboxChecked.value;
    };
    return () => {
      var _slots$default;
      return createVNode("uni-checkbox-element", {
        "dataUncType": "uni-checkbox",
        "onClick": _onClick,
        "class": "uni-checkbox",
        "style": styles["uni-checkbox"]
      }, [createVNode("view", {
        "class": "uni-checkbox-input",
        "style": checkInputStyle.value
      }, [createVNode("text", {
        "class": "uni-icon",
        "style": iconStyle.value
      }, [checkboxChecked.value ? icon : ""], 4)], 4), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 12, ["onClick"]);
    };
  }
});
const checkbox$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniCheckboxElement,
  default: checkbox
}, Symbol.toStringTag, { value: "Module" });
var CHECKBOX_GROUP_NAME = "CheckboxGroup";
var CHECKBOX_GROUP_ROOT_ELEMENT = "uni-checkbox-group-element";
var checkboxGroupProps = {
  name: {
    type: String,
    default: ""
  }
};
var UniCheckboxGroupElement = /* @__PURE__ */ (() => class extends UniFormControlElement {
  constructor(data, pageNode) {
    super(data, pageNode);
    this._initialValue = [];
    this.tagName = "CHECKBOX-GROUP";
    this.nodeName = this.tagName;
    this._getAttribute = (key) => {
      return null;
    };
    this._getValue = () => {
      return this._initialValue;
    };
    this._setValue = (value) => {
    };
  }
  get value() {
    return this._getValue();
  }
  set value(value) {
    this._setValue(value);
  }
  getAnyAttribute(key) {
    var value = this._getAttribute(key);
    if (value != null) {
      return value;
    }
    return super.getAnyAttribute(key);
  }
  reset() {
    this.value = this._initialValue.slice(0);
  }
})();
class UniCheckboxGroupChangeEventDetail {
  constructor(value) {
    this.value = value;
  }
}
var UniCheckboxGroupChangeEvent = /* @__PURE__ */ (() => class extends UniCustomEvent {
  constructor(value) {
    super("change", {
      detail: new UniCheckboxGroupChangeEventDetail(value)
    });
  }
})();
const checkboxGroup = /* @__PURE__ */ defineBuiltInComponent({
  name: CHECKBOX_GROUP_NAME,
  rootElement: {
    name: CHECKBOX_GROUP_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniCheckboxGroupElement
  },
  props: checkboxGroupProps,
  emits: ["change"],
  setup(props, _ref) {
    var {
      emit,
      expose,
      slots
    } = _ref;
    var $checkboxList = ref([]);
    var uniCheckboxGroupElementRef = ref();
    var instance = getCurrentInstance();
    var _checkboxGroupUpdateHandler = (info, type) => {
      if (type == "add") {
        $checkboxList.value.push(info);
      } else {
        var index2 = $checkboxList.value.findIndex((i) => i.name === info.name);
        if (index2 !== -1) {
          $checkboxList.value.splice(index2, 1);
        }
      }
    };
    var _changeHandler = (info) => {
      $checkboxList.value.forEach((i) => {
        if (i.name === info.name) {
          i.checked = info.checked;
        }
      });
      emit("change", initUniCustomEvent(uniCheckboxGroupElementRef.value, new UniCheckboxGroupChangeEvent(_getValue())));
    };
    var _getValue = () => {
      var valueArray = [];
      $checkboxList.value.forEach((info) => {
        if (info.checked) {
          valueArray.push(info.name);
        }
      });
      return valueArray;
    };
    var _setValue = (valueArray) => {
      $checkboxList.value.forEach((info) => {
        info.setCheckboxChecked(valueArray.includes(info.name));
      });
    };
    onMounted(() => {
      instance === null || instance === void 0 || instance.$waitNativeRender(() => {
        if (!instance)
          return;
        if (!uniCheckboxGroupElementRef.value)
          return;
        uniCheckboxGroupElementRef.value._getValue = _getValue;
        uniCheckboxGroupElementRef.value._setValue = _setValue;
        uniCheckboxGroupElementRef.value._initialValue = _getValue();
        uniCheckboxGroupElementRef.value._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
      });
    });
    expose({
      _checkboxGroupUpdateHandler,
      _changeHandler,
      _getValue,
      _setValue
    });
    return () => {
      var _slots$default;
      return createVNode("uni-checkbox-group-element", {
        "ref": uniCheckboxGroupElementRef
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 512);
    };
  }
});
const checkboxGroup$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniCheckboxGroupChangeEvent,
  UniCheckboxGroupElement,
  default: checkboxGroup
}, Symbol.toStringTag, { value: "Module" });
var RADIO_NAME = "Radio";
var RADIO_ROOT_ELEMENT = "uni-radio-element";
var UniRadioElement = /* @__PURE__ */ (() => class extends UniElementImpl {
  constructor(data, pageNode) {
    super(data, pageNode);
    this.tagName = "RADIO";
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
var radioProps = {
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Object, String],
    default: ""
  },
  // 选中时的背景颜色
  color: {
    type: String,
    default: "#007AFF"
  },
  // 默认的背景颜色
  backgroundColor: {
    type: String,
    default: "#ffffff"
  },
  // 默认的边框颜色
  borderColor: {
    type: String,
    default: "#d1d1d1"
  },
  // 选中时的背景颜色,同color,优先级大于color
  activeBackgroundColor: {
    type: String,
    default: ""
  },
  // 选中时的边框颜色，默认为选中时的背景颜色
  activeBorderColor: {
    type: String,
    default: ""
  },
  // 图标颜色
  iconColor: {
    type: String,
    default: "#ffffff"
  },
  // 高于 iconColor 和 color
  foreColor: {
    type: String,
    default: ""
  }
};
var _style_0$1 = {
  "uni-radio": {
    "": {
      flexDirection: "row",
      alignItems: "center"
    }
  },
  "uni-radio-input": {
    "": {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "5px",
      borderStyle: "solid",
      borderWidth: "1px",
      borderRadius: "50px",
      width: "22px",
      height: "22px",
      boxSizing: "content-box"
    }
  },
  "uni-radio-input-icon": {
    "": {
      fontFamily: "uni-icon",
      fontSize: "14px",
      width: "14px",
      height: "14px"
    }
  }
};
var styleList = _style_0$1;
const radio = /* @__PURE__ */ defineBuiltInComponent({
  name: RADIO_NAME,
  rootElement: {
    name: RADIO_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniRadioElement
  },
  props: radioProps,
  setup(props, _ref) {
    var {
      slots,
      expose
    } = _ref;
    var uniRadioElementRef = ref();
    var styleUniRadio = computed(() => styleList["uni-radio"][""]);
    var styleUniRadioInput = computed(() => {
      return Object.assign({}, styleList["uni-radio-input"][""], radioChecked.value ? checkedStyle.value : uncheckedStyle.value);
    });
    var styleUniRadioInputIcon = computed(() => {
      return Object.assign({}, styleList["uni-radio-input-icon"][""], iconStyle.value);
    });
    var checkedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: "#e1e1e1",
          borderColor: "#d1d1d1"
        };
      }
      var backgroundColor = props.activeBackgroundColor.length > 0 ? props.activeBackgroundColor : props.color;
      var borderColor = props.activeBorderColor.length > 0 ? props.activeBorderColor : backgroundColor;
      return {
        backgroundColor,
        borderColor
      };
    });
    var uncheckedStyle = computed(() => {
      if (props.disabled) {
        return {
          backgroundColor: "#e1e1e1",
          borderColor: "#d1d1d1"
        };
      }
      return {
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor
      };
    });
    var iconStyle = computed(() => {
      var color = "";
      if (props.foreColor.length > 0) {
        color = props.foreColor;
      } else if (props.iconColor.length > 0) {
        color = props.iconColor;
      }
      return {
        color: props.disabled ? "#adadad" : color
      };
    });
    var icon = "";
    var radioChecked = ref(props.checked);
    var radioValue = ref(props.value.toString());
    watchEffect(() => {
      radioChecked.value = props.checked;
    });
    var setRadioChecked = (value) => {
      radioChecked.value = value;
    };
    watchEffect(() => {
      radioValue.value = props.value.toString();
    });
    watch(() => radioChecked.value, (val) => {
      var ctx = instance === null || instance === void 0 ? void 0 : instance.proxy;
      if (!ctx)
        return;
      if (val) {
        $dispatch(ctx, "RadioGroup", "_changeHandler", {
          name: radioValue.value,
          checked: radioChecked.value,
          setRadioChecked
        });
      }
    });
    expose({
      radioValue
    });
    var instance = getCurrentInstance();
    onMounted(() => {
      instance === null || instance === void 0 || instance.$waitNativeRender(() => {
        if (instance === null)
          return;
        uniRadioElementRef.value._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
      });
      var ctx = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx, "RadioGroup", "_radioGroupUpdateHandler", {
        name: radioValue.value,
        checked: radioChecked.value,
        setRadioChecked
      }, "add");
    });
    onBeforeUnmount(() => {
      var ctx = instance === null || instance === void 0 ? void 0 : instance.proxy;
      $dispatch(ctx, "RadioGroup", "_radioGroupUpdateHandler", {
        name: radioValue.value,
        checked: radioChecked.value,
        setRadioChecked
      }, "remove");
    });
    var _onClick = () => {
      if (props.disabled || radioChecked.value)
        return;
      radioChecked.value = !radioChecked.value;
    };
    return () => {
      var _slots$default;
      return createVNode("uni-radio-element", {
        "dataUncType": "uni-radio",
        "class": "uni-radio",
        "style": styleUniRadio.value,
        "ref": uniRadioElementRef,
        "onClick": _onClick
      }, [createVNode("view", {
        "class": "uni-radio-input",
        "style": styleUniRadioInput.value
      }, [createVNode("text", {
        "class": "uni-radio-input-icon",
        "style": styleUniRadioInputIcon.value
      }, [radioChecked.value ? icon : ""], 4)], 4), (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 12, ["onClick"]);
    };
  }
});
const radio$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniRadioElement,
  default: radio
}, Symbol.toStringTag, { value: "Module" });
var RADIOGROUP_NAME = "RadioGroup";
var RADIOGROUP_ROOT_ELEMENT = "uni-radio-group-element";
var RadioProps = {
  name: {
    type: String,
    default: ""
  }
};
var UniRadioGroupElement = /* @__PURE__ */ (() => class extends UniFormControlElement {
  constructor(data, pageNode) {
    super(data, pageNode);
    this._initialValue = "";
    this.tagName = "RADIO-GROUP";
    this.nodeName = this.tagName;
    this._getAttribute = (key) => {
      return null;
    };
    this._getValue = () => {
      return this._initialValue;
    };
    this._setValue = (value) => {
    };
  }
  getAnyAttribute(key) {
    var value = this._getAttribute(key);
    if (value != null) {
      return value;
    }
    return super.getAnyAttribute(key);
  }
  get value() {
    return this._getValue();
  }
  set value(value) {
    this._setValue(value);
  }
  reset() {
    this.value = this._initialValue;
  }
})();
class UniRadioGroupChangeEventDetail {
  constructor(value) {
    this.value = value;
  }
}
var UniRadioGroupChangeEvent = /* @__PURE__ */ (() => class extends UniCustomEvent {
  constructor(value) {
    super("change", {
      detail: new UniRadioGroupChangeEventDetail(value)
    });
  }
})();
const radioGroup = /* @__PURE__ */ defineBuiltInComponent({
  name: RADIOGROUP_NAME,
  rootElement: {
    name: RADIOGROUP_ROOT_ELEMENT,
    // @ts-expect-error not web element
    class: UniRadioGroupElement
  },
  props: RadioProps,
  emits: ["change"],
  setup(props, _ref) {
    var {
      emit,
      slots,
      expose
    } = _ref;
    var $radioList = ref([]);
    var uniRadioGroupElementRef = ref();
    var instance = getCurrentInstance();
    var _radioGroupUpdateHandler = (info, type) => {
      if (type == "add") {
        $radioList.value.push(info);
      } else {
        var index2 = $radioList.value.findIndex((i) => i.name == info.name);
        if (index2 !== -1) {
          $radioList.value.splice(index2, 1);
        }
      }
    };
    var _changeHandler = (data) => {
      _setValue(data.name);
      emit("change", initUniCustomEvent(uniRadioGroupElementRef.value, new UniRadioGroupChangeEvent(data.name)));
    };
    var _getValue = () => {
      var value = "";
      $radioList.value.forEach((info) => {
        if (info.checked) {
          value = info.name;
        }
      });
      return value;
    };
    var _setValue = (name) => {
      $radioList.value.forEach((info) => {
        if (info.name == name) {
          info.checked = true;
          info.setRadioChecked(true);
        } else {
          info.checked = false;
          info.setRadioChecked(false);
        }
      });
    };
    onMounted(() => {
      instance === null || instance === void 0 || instance.$waitNativeRender(() => {
        if (!instance)
          return;
        if (!uniRadioGroupElementRef.value)
          return;
        uniRadioGroupElementRef.value._getValue = _getValue;
        uniRadioGroupElementRef.value._setValue = _setValue;
        uniRadioGroupElementRef.value._initialValue = _getValue();
        uniRadioGroupElementRef.value._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
      });
    });
    expose({
      _radioGroupUpdateHandler,
      _getValue,
      _setValue,
      _changeHandler
    });
    return () => {
      var _slots$default;
      return createVNode("uni-radio-group-element", {
        "ref": uniRadioGroupElementRef
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 512);
    };
  }
});
const radioGroup$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniRadioGroupChangeEvent,
  UniRadioGroupElement,
  default: radioGroup
}, Symbol.toStringTag, { value: "Module" });
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
      switch (props.openType) {
        case "navigate":
          uni.navigateTo({
            url,
            animationType: props.animationType.length > 0 ? props.animationType : "pop-in",
            animationDuration
          });
          break;
        case "redirect":
          uni.redirectTo({
            url
          });
          break;
        case "switchTab":
          uni.switchTab({
            url
          });
          break;
        case "reLaunch":
          uni.reLaunch({
            url
          });
          break;
        case "navigateBack":
          uni.navigateBack({
            delta: props.delta,
            animationType: props.animationType.length > 0 ? props.animationType : "pop-out",
            animationDuration
          });
          break;
        default:
          console.log("<navigator/> openType attribute invalid");
          break;
      }
    };
    return () => {
      var _slots$default;
      return createVNode("uni-navigator-element", {
        "ref": $uniNavigatorElement,
        "onClick": _onClick,
        "hoverClass": props.hoverClass,
        "hoverStopPropagation": props.hoverStopPropagation,
        "hoverStartTime": props.hoverStartTime,
        "hoverStayTime": props.hoverStayTime
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 8, ["onClick", "hoverClass", "hoverStopPropagation", "hoverStartTime", "hoverStayTime"]);
    };
  }
});
const navigator$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniNavigatorElement,
  default: navigator
}, Symbol.toStringTag, { value: "Module" });
var BACKGROUND_COLOR = "#EBEBEB";
var PRIMARY_COLOR = "#007AFF";
var ANIMATE_INTERVAL_DEFAULT = 30;
var FONT_SIZE = 16;
var STROKE_WIDTH = 6;
class UniProgressActiveendEventDetail {
  constructor(value) {
    this.curPercent = value;
  }
}
var UniProgressActiveendEvent = /* @__PURE__ */ (() => class extends UniCustomEvent {
  constructor(value) {
    super("activeend", {
      detail: new UniProgressActiveendEventDetail(value)
    });
  }
})();
var UniProgressElement = /* @__PURE__ */ (() => class extends UniElementImpl {
  constructor(data, pageNode) {
    super(data, pageNode);
    this.tagName = "PROGRESS";
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
var progressProps = {
  percent: {
    type: Number,
    default: 0
  },
  showInfo: {
    type: Boolean,
    default: false
  },
  borderRadius: {
    type: Number,
    default: 0
  },
  fontSize: {
    type: Number,
    default: FONT_SIZE
  },
  strokeWidth: {
    type: Number,
    default: STROKE_WIDTH
  },
  active: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String,
    default: PRIMARY_COLOR
  },
  activeMode: {
    type: String,
    default: "backwards"
  },
  backgroundColor: {
    type: String,
    default: BACKGROUND_COLOR
  },
  duration: {
    type: Number,
    default: ANIMATE_INTERVAL_DEFAULT
  }
};
var _style = {
  "uni-progress": {
    "": {
      flexDirection: "row",
      alignItems: "center"
    }
  },
  "uni-progress-bar": {
    "": {
      flex: "1",
      overflow: "hidden"
    }
  },
  "uni-progress-info": {
    "": {
      marginLeft: "15px"
    }
  }
};
const progress = /* @__PURE__ */ defineBuiltInComponent({
  name: "Progress",
  rootElement: {
    name: "uni-progress-element",
    // @ts-expect-error not web element
    class: UniProgressElement
  },
  emit: ["activeend"],
  props: progressProps,
  setup(props, _ref) {
    var {
      emit
    } = _ref;
    var data = reactive({
      $uniProgressElement: null,
      curPercent: 0,
      _timerId: 0,
      _lastPercent: 0
    });
    var textStr = computed(() => {
      return "".concat(data.curPercent, "%");
    });
    var instance = getCurrentInstance();
    var styleUniProgress = computed(() => _style["uni-progress"][""]);
    var styleUniProgressBar = computed(() => _style["uni-progress-bar"][""]);
    var barStyle = computed(() => {
      var style = {
        height: "".concat(props.strokeWidth, "px"),
        borderRadius: "".concat(props.borderRadius, "px"),
        backgroundColor: props.backgroundColor
      };
      return Object.assign({}, styleUniProgressBar.value, style);
    });
    var innerBarStyle = computed(() => {
      var style = {
        width: "".concat(data.curPercent, "%"),
        height: "".concat(props.strokeWidth, "px"),
        backgroundColor: "".concat(props.activeColor)
      };
      return Object.assign({}, style);
    });
    var textStyle = computed(() => {
      var fontSize = props.fontSize;
      var style = {
        fontSize: "".concat(fontSize, "px"),
        minWidth: "".concat(fontSize * 2, "px")
      };
      return Object.assign({}, _style["uni-progress-info"][""], style);
    });
    var finalPercent = computed(() => {
      var percent = props.percent;
      if (percent > 100)
        percent = 100;
      if (percent < 0)
        percent = 0;
      return percent;
    });
    watch(() => finalPercent.value, (_, oldVal) => {
      data._lastPercent = oldVal;
      clearTimer();
      _animate();
    });
    var _animate = () => {
      var percent = finalPercent.value;
      if (!props.active) {
        data.curPercent = percent;
        return;
      }
      data.curPercent = props.activeMode === "forwards" ? data._lastPercent : 0;
      data._timerId = setInterval(() => {
        if (percent <= data.curPercent + 1) {
          clearTimer();
          data.curPercent = percent;
          emit("activeend", initUniCustomEvent(data.$uniProgressElement, new UniProgressActiveendEvent(percent)));
        } else {
          ++data.curPercent;
        }
      }, props.duration);
    };
    var clearTimer = () => {
      clearInterval(data._timerId);
    };
    onMounted(() => {
      instance === null || instance === void 0 || instance.$waitNativeRender(() => {
        var _instance$proxy;
        if (!instance)
          return;
        data.$uniProgressElement = (_instance$proxy = instance.proxy) === null || _instance$proxy === void 0 ? void 0 : _instance$proxy.$el;
        data.$uniProgressElement._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
        _animate();
      });
    });
    onBeforeUnmount(() => {
      clearTimer();
    });
    return () => {
      return createVNode("uni-progress-element", {
        "class": "uni-progress",
        "style": styleUniProgress.value
      }, [createVNode("view", {
        "class": "uni-progress-bar",
        "style": barStyle.value
      }, [createVNode("view", {
        "class": "uni-progress-inner-bar",
        "style": innerBarStyle.value
      }, null, 4)], 4), props.showInfo ? createVNode("view", {
        "class": "uni-progress-info",
        "style": textStyle.value
      }, [textStr.value], 4) : null], 4);
    };
  }
});
const progress$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniProgressActiveendEvent,
  UniProgressElement,
  default: progress
}, Symbol.toStringTag, { value: "Module" });
var _style_picker_view = {
  "uni-picker-view": {
    "": {
      position: "relative"
    }
  },
  "uni-picker-view-wrapper": {
    "": {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      overflow: "hidden"
    }
  }
};
var _style_picker_column = {
  "uni-picker-view-column": {
    "": {
      flex: "1",
      position: "relative",
      alignItems: "stretch",
      overflow: "hidden"
    }
  },
  "uni-picker-view-mask": {
    "": {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      pointerEvents: "none"
    }
  },
  "uni-picker-view-mask-top": {
    "": {
      bottom: "0",
      backgroundImage: "linear-gradient(to bottom,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))"
    }
  },
  "uni-picker-view-mask-bottom": {
    "": {
      top: "0",
      backgroundImage: "linear-gradient(to top,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))"
    }
  },
  "uni-picker-view-group": {
    "": {
      flexDirection: "column",
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0"
    }
  },
  "uni-picker-view-content": {
    "": {
      flexDirection: "column",
      paddingTop: "0",
      paddingRight: "0",
      paddingBottom: "0",
      paddingLeft: "0"
    }
  },
  "uni-picker-view-indicator": {
    "": {
      position: "absolute",
      left: "0",
      right: "0",
      top: "0",
      height: "34px",
      borderColor: "#e5e5e5",
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
      pointerEvents: "none"
    }
  }
};
var UniPickerViewColumnElement = /* @__PURE__ */ (() => class extends UniElementImpl {
  constructor(data, pageNode) {
    super(data, pageNode);
    this.tagName = "PICKER-VIEW-COLUMN";
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
class UniPickerViewChangeEventDetail {
  constructor(value) {
    this.value = value;
  }
}
var UniPickerViewChangeEvent = /* @__PURE__ */ (() => class extends UniCustomEvent {
  constructor(value) {
    super("change", {
      detail: new UniPickerViewChangeEventDetail(value)
    });
  }
})();
var UniPickerViewElement = /* @__PURE__ */ (() => class extends UniElementImpl {
  constructor(data, pageNode) {
    super(data, pageNode);
    this.tagName = "PICKER-VIEW";
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
const pickerView = /* @__PURE__ */ defineBuiltInComponent({
  name: "PickerView",
  rootElement: {
    name: "uni-picker-view-element",
    // @ts-expect-error not web element
    class: UniPickerViewElement
  },
  props: {
    value: {
      type: Array,
      default: []
    },
    indicatorStyle: {
      type: String,
      default: ""
    },
    maskTopStyle: {
      type: String,
      default: ""
    },
    maskBottomStyle: {
      type: String,
      default: ""
    }
  },
  emits: ["change"],
  setup(props, _ref) {
    var {
      emit,
      expose,
      slots
    } = _ref;
    var data = reactive({
      $uniPickerViewElement: null,
      $items: [],
      valueSync: []
    });
    watch(() => props.value, (val) => {
      val.forEach((_val, index2) => {
        if (data.$items.length > index2) {
          var _data$$items$index$$$;
          var fn = (_data$$items$index$$$ = data.$items[index2].$.exposed) === null || _data$$items$index$$$ === void 0 ? void 0 : _data$$items$index$$$.setCurrent;
          fn(_val);
        }
      });
      data.valueSync = [...val];
    }, {
      immediate: true
    });
    provide("pickerViewProps", props);
    var pickerViewElementRef = ref();
    var instance = getCurrentInstance();
    var _pickerViewUpdateHandler = (vm, type) => {
      if (type == "add") {
        data.$items.push(vm);
        if (data.$items.length > data.valueSync.length) {
          data.valueSync.push(0);
        }
      } else {
        var index2 = data.$items.indexOf(vm);
        if (index2 != -1) {
          data.$items.splice(index2, 1);
          data.valueSync.splice(index2, 1);
        }
      }
    };
    var getItemValue = (vm) => {
      var index2 = data.$items.indexOf(vm);
      if (index2 != -1) {
        if (props.value.length > index2) {
          return props.value[index2];
        }
      }
      return 0;
    };
    var setItemValue = (vm, val) => {
      var index2 = data.$items.indexOf(vm);
      if (index2 != -1) {
        if (data.valueSync.length > index2) {
          data.valueSync[index2] = val;
        }
        emit("change", initUniCustomEvent(pickerViewElementRef.value, new UniPickerViewChangeEvent([...data.valueSync])));
      }
    };
    expose({
      _pickerViewUpdateHandler,
      getItemValue,
      setItemValue
    });
    onMounted(() => {
      instance === null || instance === void 0 || instance.$waitNativeRender(() => {
        if (!instance || !pickerViewElementRef.value)
          return;
        pickerViewElementRef.value._getAttribute = (key) => {
          var _props$keyString$toSt, _props$keyString;
          var keyString = camelize(key);
          return props[keyString] !== null ? (_props$keyString$toSt = (_props$keyString = props[keyString]) === null || _props$keyString === void 0 ? void 0 : _props$keyString.toString()) !== null && _props$keyString$toSt !== void 0 ? _props$keyString$toSt : null : null;
        };
      });
    });
    var styleUniPickerView = _style_picker_view["uni-picker-view"][""];
    var styleUniPickerViewWrapper = _style_picker_view["uni-picker-view-wrapper"][""];
    return () => {
      var _slots$default;
      return createVNode("uni-picker-view-element", {
        "ref": pickerViewElementRef,
        "class": "uni-picker-view",
        "style": styleUniPickerView
      }, [createVNode("view", {
        "class": "uni-picker-view-wrapper",
        "style": styleUniPickerViewWrapper
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 4)], 4);
    };
  }
});
const pickerView$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniPickerViewChangeEvent,
  UniPickerViewElement,
  default: pickerView
}, Symbol.toStringTag, { value: "Module" });
const pickerViewColumn = /* @__PURE__ */ defineBuiltInComponent({
  name: "PickerViewColumn",
  rootElement: {
    name: "uni-picker-view-column-element",
    // @ts-expect-error
    class: UniPickerViewColumnElement
  },
  setup(_props, _ref) {
    var {
      slots,
      expose
    } = _ref;
    var instance = getCurrentInstance();
    var pickerColumnRef = ref();
    var indicator = ref();
    var scrollViewRef = ref();
    var contentRef = ref();
    var pickerViewProps = inject("pickerViewProps");
    var data = reactive({
      height: 0,
      indicatorHeight: 0,
      current: 0,
      scrollToElementTime: 0,
      maskTopStyle: "",
      maskBottomStyle: "",
      indicatorStyle: "",
      contentStyle: "",
      _isMounted: false
    });
    var formatUserStyle = (styleStr) => {
      var formatUserStyle2 = parseStringStyle(styleStr);
      if (isString(formatUserStyle2["background-color"]) || isString(formatUserStyle2["background"])) {
        formatUserStyle2 = Object.assign({}, formatUserStyle2, {
          backgroundImage: "",
          background: formatUserStyle2["background-color"] || formatUserStyle2["background"]
        });
      }
      return formatUserStyle2;
    };
    var contentStyle = computed(() => {
      return Object.assign({}, _style_picker_column["uni-picker-view-content"][""], parseStringStyle(data.contentStyle));
    });
    var maskTopStyle = computed(() => {
      var userStyle = formatUserStyle(pickerViewProps.maskTopStyle);
      var style = Object.assign({}, _style_picker_column["uni-picker-view-mask"][""], _style_picker_column["uni-picker-view-mask-top"][""], parseStringStyle(data.maskTopStyle), userStyle);
      return style;
    });
    var maskBottomStyle = computed(() => {
      var userStyle = formatUserStyle(pickerViewProps.maskBottomStyle);
      return Object.assign({}, _style_picker_column["uni-picker-view-mask"][""], _style_picker_column["uni-picker-view-mask-bottom"][""], parseStringStyle(data.maskBottomStyle), userStyle);
    });
    var indicatorStyle = computed(() => {
      var val = Object.assign({}, _style_picker_column["uni-picker-view-indicator"][""], parseStringStyle(pickerViewProps.indicatorStyle), parseStringStyle(data.indicatorStyle));
      return val;
    });
    var styleUniPickerViewColumn = computed(() => {
      return Object.assign({}, _style_picker_column["uni-picker-view-column"][""]);
    });
    var styleUniPickerViewGroup = computed(() => {
      return Object.assign({}, _style_picker_column["uni-picker-view-group"][""]);
    });
    var styleViewMask = computed(() => {
      return Object.assign({}, _style_picker_column["uni-picker-view-mask"][""]);
    });
    var init2 = () => {
      data.height = pickerColumnRef.value.offsetHeight;
      data.indicatorHeight = indicator.value.offsetHeight;
      var padding = (data.height - data.indicatorHeight) / 2;
      var maskPosition = "".concat(data.height - padding, "px");
      data.maskTopStyle += ";bottom:".concat(maskPosition);
      data.maskBottomStyle += ";top:".concat(maskPosition);
      data.indicatorStyle = ";top:".concat(padding, "px");
      data.contentStyle = "padding-top:".concat(padding, "px;padding-bottom:").concat(padding, "px");
      nextTick(() => {
        if (data.current != 0) {
          setCurrent(data.current);
        }
      });
    };
    var onScrollend = (e) => {
      if (Date.now() - data.scrollToElementTime < 200) {
        return;
      }
      var y = e.detail.scrollTop;
      if (data.indicatorHeight === 0) {
        return;
      }
      var current = Math.round(y / data.indicatorHeight);
      if (y % data.indicatorHeight != 0) {
        setCurrent(current);
      } else {
        data.current = current;
      }
    };
    var setCurrent = (current) => {
      var scrollTop = current * data.indicatorHeight;
      scrollViewRef.value.setAnyAttribute("scroll-top", scrollTop);
      data.current = current;
      data.scrollToElementTime = Date.now();
    };
    var uniResizeObserver = new UniResizeObserver((entries) => {
      init2();
    });
    var created = () => {
      var _instance$parent;
      var $parent = (instance === null || instance === void 0 || (_instance$parent = instance.parent) === null || _instance$parent === void 0 ? void 0 : _instance$parent.type.name) === "PickerView" ? instance === null || instance === void 0 ? void 0 : instance.parent : null;
      if ($parent !== null) {
        $dispatchParent(instance === null || instance === void 0 ? void 0 : instance.proxy, "PickerView", "_pickerViewUpdateHandler", instance === null || instance === void 0 ? void 0 : instance.proxy, "add");
        data.current = $dispatchParent(instance === null || instance === void 0 ? void 0 : instance.proxy, "PickerView", "getItemValue", instance === null || instance === void 0 ? void 0 : instance.proxy);
      }
    };
    created();
    expose({
      setCurrent
    });
    onMounted(() => {
      instance === null || instance === void 0 || instance.$waitNativeRender(() => {
        if (!instance || !pickerColumnRef.value)
          return;
        init2();
        setTimeout(() => {
          data._isMounted = true;
        }, 1e3);
        uniResizeObserver.observe(pickerColumnRef.value);
      });
    });
    onBeforeUnmount(() => {
      var ctx = instance === null || instance === void 0 ? void 0 : instance.proxy;
      uniResizeObserver.disconnect();
      $dispatch(ctx, "PickerView", "_pickerViewUpdateHandler", ctx, "remove");
    });
    watch(() => data.current, (val, oldVal) => {
      if (data._isMounted && val != oldVal) {
        var ctx = instance === null || instance === void 0 ? void 0 : instance.proxy;
        $dispatch(ctx, "PickerView", "setItemValue", ctx, val);
      }
    });
    return () => {
      var _slots$default;
      return createVNode("uni-picker-view-column-element", {
        "class": "uni-picker-view-column",
        "style": styleUniPickerViewColumn.value,
        "ref": pickerColumnRef
      }, [createVNode("scroll-view", {
        "deceleration-rate": 0.3,
        "onScrollend": onScrollend,
        "class": "uni-picker-view-group",
        "style": styleUniPickerViewGroup.value,
        "scroll-with-animation": data._isMounted,
        "direction": "vertical",
        "show-scrollbar": false,
        "ref": scrollViewRef
      }, [createVNode("view", {
        "class": "uni-picker-view-content",
        "style": contentStyle.value,
        "ref": contentRef
      }, [(_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots)], 4)], 44, ["onScrollend", "scroll-with-animation"]), createVNode("view", {
        "userInteractionEnabled": false,
        "class": "uni-picker-view-mask",
        "style": styleViewMask.value
      }, [createVNode("view", {
        "class": "uni-picker-view-mask uni-picker-view-mask-top",
        "style": maskTopStyle.value
      }, null, 4), createVNode("view", {
        "class": "uni-picker-view-mask uni-picker-view-mask-bottom",
        "style": maskBottomStyle.value
      }, null, 4)], 4), createVNode("view", {
        "ref": indicator,
        "userInteractionEnabled": false,
        "class": "uni-picker-view-indicator",
        "style": indicatorStyle.value
      }, null, 4)], 4);
    };
  }
});
const pickerViewColumn$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UniPickerViewColumnElement,
  default: pickerViewColumn
}, Symbol.toStringTag, { value: "Module" });
const index = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Checkbox: checkbox$1,
  CheckboxGroup: checkboxGroup$1,
  Navigator: navigator$1,
  PickerView: pickerView$1,
  PickerViewColumn: pickerViewColumn$1,
  Progress: progress$1,
  Radio: radio$1,
  RadioGroup: radioGroup$1
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
  getCurrentPages$1 as getCurrentPages,
  initApp,
  index$1 as uni
};
