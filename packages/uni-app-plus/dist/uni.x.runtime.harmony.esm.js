import { normalizeStyles as normalizeStyles$1, addLeadingSlash, invokeArrayFns, ON_HIDE, ON_SHOW, parseQuery, EventChannel, once, parseUrl, Emitter, ON_UNHANDLE_REJECTION, ON_PAGE_NOT_FOUND, ON_ERROR, removeLeadingSlash, getLen, ON_UNLOAD, ON_READY, ON_PAGE_SCROLL, ON_PULL_DOWN_REFRESH, ON_REACH_BOTTOM, ON_RESIZE, ON_BACK_PRESS, ON_LAUNCH, ON_EXIT, ON_LAST_PAGE_BACK_PRESS } from "@dcloudio/uni-shared";
import { extend, isString, isPlainObject, isFunction as isFunction$1, isArray, isPromise, hasOwn, remove, invokeArrayFns as invokeArrayFns$1, capitalize, toTypeString, toRawType, parseStringStyle } from "@vue/shared";
import { createVNode, render, ref, onMounted, onBeforeUnmount, getCurrentInstance, injectHook, defineComponent, warn, watchEffect, watch, computed, camelize, reactive, provide, inject, nextTick, openBlock, createElementBlock, createElementVNode, normalizeClass, normalizeStyle, Fragment, toDisplayString, createCommentVNode, renderList, resolveComponent, withDirectives, vModelText, vShow } from "vue";
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
  var removePages2 = pages.splice(index2, 1);
  {
    removePages2[0].$page = null;
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
  var lastPage = getCurrentPage().vm;
  return new Promise((resolve) => {
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
  switchSelect(selected, path, query);
  for (var index2 = pages2.length - 1; index2 >= 0; index2--) {
    var page = pages2[index2];
    if (isTabPage(page)) {
      break;
    }
    closePage(page, "none");
  }
  return Promise.resolve();
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
  return !!__uniConfig.realEntryPagePath && // getRealPath(page.$basePage.route, true) ===
  // getRealPath(parseUrl(__uniConfig.entryPagePath!).path, true) &&
  getCurrentPages$1()[0] === page;
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
    var page = getCurrentPage().vm;
    if (page != null) {
      this._entryData.pageId = parseInt(page.$nativePage.pageId);
      this._entryData.path = page.route;
    }
  }
  executeReady() {
  }
  getCurrentInnerPage() {
    var currentPage = getCurrentPage().vm;
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
var _style_0$1$1 = {
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
var styleList = _style_0$1$1;
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
const _sfc_main$6 = {
  data() {
    return {
      show: false,
      i18nCancelText: {
        en: "Cancel",
        es: "Cancelar",
        fr: "Annuler",
        "zh-Hans": "取消",
        "zh-Hant": "取消"
      },
      readyEventName: "",
      optionsEventName: "",
      successEventName: "",
      failEventName: "",
      title: null,
      itemList: [],
      optionCancelText: null,
      titleColor: null,
      itemColor: null,
      cancelColor: null,
      backgroundColor: null,
      language: "zh-Hans",
      theme: "light",
      isLandscape: false,
      bottomNavigationHeight: 0,
      appTheme: null,
      osTheme: null,
      hostTheme: null
    };
  },
  onLoad(options) {
    this.readyEventName = options["readyEventName"];
    this.optionsEventName = options["optionsEventName"];
    this.successEventName = options["successEventName"];
    this.failEventName = options["failEventName"];
    uni.$on(this.optionsEventName, (data) => {
      this.itemList = data["itemList"];
      if (data["title"] != null) {
        this.title = data["title"];
      }
      if (data["cancelText"] != null) {
        this.optionCancelText = data["cancelText"];
      }
      if (data["titleColor"] != null) {
        this.titleColor = data["titleColor"];
      }
      if (data["itemColor"] != null) {
        this.itemColor = data["itemColor"];
      }
      if (data["cancelColor"] != null) {
        this.cancelColor = data["cancelColor"];
      }
      if (data["backgroundColor"] != null) {
        this.backgroundColor = data["backgroundColor"];
      }
    });
    uni.$emit(this.readyEventName, {});
    var systemInfo = uni.getSystemInfoSync();
    var osLanguage = systemInfo.osLanguage;
    var appLanguage = systemInfo.appLanguage;
    if (appLanguage != null) {
      this.language = appLanguage;
    } else if (osLanguage != null) {
      this.language = osLanguage;
    }
    var osTheme = systemInfo.osTheme;
    var appTheme = systemInfo.appTheme;
    if (appTheme != null && appTheme != "auto") {
      this.appTheme = appTheme;
      this.handleThemeChange();
    }
    if (osTheme != null) {
      this.osTheme = osTheme;
      this.handleThemeChange();
    }
    this.isLandscape = systemInfo.deviceOrientation == "landscape";
  },
  computed: {
    cancelText() {
      if (this.optionCancelText != null) {
        var res = this.optionCancelText;
        return res;
      }
      if (this.language.startsWith("en")) {
        return this.i18nCancelText["en"];
      }
      if (this.language.startsWith("es")) {
        return this.i18nCancelText["es"];
      }
      if (this.language.startsWith("fr")) {
        return this.i18nCancelText["fr"];
      }
      if (this.language.startsWith("zh-Hans")) {
        return this.i18nCancelText["zh-Hans"];
      }
      if (this.language.startsWith("zh-Hant")) {
        return this.i18nCancelText["zh-Hant"];
      }
      return "取消";
    },
    computedBackgroundColor() {
      return this.backgroundColor !== null ? this.backgroundColor : this.theme == "dark" ? "#2C2C2B" : "#ffffff";
    }
  },
  onReady() {
    this.bottomNavigationHeight = this.$page.safeAreaInsets.bottom;
    setTimeout(() => {
      this.show = true;
    }, 10);
  },
  onResize() {
    var systemInfo = uni.getSystemInfoSync();
    this.isLandscape = systemInfo.deviceOrientation == "landscape";
  },
  onUnload() {
    uni.$off(this.optionsEventName, null);
    uni.$off(this.readyEventName, null);
    uni.$off(this.successEventName, null);
    uni.$off(this.failEventName, null);
  },
  methods: {
    closeActionSheet() {
      this.show = false;
      setTimeout(() => {
        uni.closeDialogPage({
          dialogPage: this.$page
        });
      }, 250);
    },
    handleMenuItemClick(tapIndex) {
      this.closeActionSheet();
      uni.$emit(this.successEventName, tapIndex);
    },
    handleCancel() {
      this.closeActionSheet();
      uni.$emit(this.failEventName, {});
    },
    handleThemeChange() {
      if (this.hostTheme != null) {
        this.theme = this.hostTheme;
      } else if (this.appTheme != null) {
        this.theme = this.appTheme;
      } else if (this.osTheme != null) {
        this.theme = this.osTheme;
      }
    }
  }
};
const _style_0$6 = {
  "uni-action-sheet_dialog__mask": {
    "": {
      "position": "fixed",
      "zIndex": 999,
      "top": 0,
      "right": 0,
      "left": 0,
      "bottom": 0,
      "opacity": 0,
      "backgroundColor": "rgba(0,0,0,0.6)",
      "transitionProperty": "opacity",
      "transitionDuration": "0.1s"
    }
  },
  "uni-action-sheet_dialog__mask__show": {
    "": {
      "opacity": 1
    }
  },
  "uni-action-sheet_dialog__container": {
    "": {
      "position": "fixed",
      "width": "100%",
      "left": 0,
      "bottom": 0,
      "zIndex": 999,
      "transform": "translate(0, 100%)",
      "transitionProperty": "transform",
      "transitionDuration": "0.15s",
      "backgroundColor": "#f7f7f7",
      "borderTopLeftRadius": 12,
      "borderTopRightRadius": 12
    },
    ".uni-action-sheet_dialog__show": {
      "transform": "translate(0, 0)"
    },
    ".uni-action-sheet_dark__mode": {
      "backgroundColor": "#1D1E1E"
    },
    ".uni-action-sheet_landscape__mode": {
      "width": 300,
      "position": "fixed",
      "left": "50%",
      "right": "auto",
      "top": "50%",
      "bottom": "auto",
      "zIndex": 999,
      "transform": "translate(-50%, -50%)",
      "borderTopLeftRadius": 5,
      "borderTopRightRadius": 5,
      "borderBottomLeftRadius": 5,
      "borderBottomRightRadius": 5
    }
  },
  "uni-action-sheet_dialog__menu": {
    "": {
      "borderTopLeftRadius": 12,
      "borderTopRightRadius": 12,
      "overflow": "hidden",
      "backgroundColor": "#ffffff"
    },
    ".uni-action-sheet_dark__mode": {
      "backgroundColor": "#2C2C2B"
    },
    ".uni-action-sheet_landscape__mode": {
      "borderTopLeftRadius": 5,
      "borderTopRightRadius": 5,
      "borderBottomLeftRadius": 5,
      "borderBottomRightRadius": 5,
      "boxShadow": "0 0 20px 5px rgba(0, 0, 0, 0.3)"
    }
  },
  "uni-action-sheet_dialog__title": {
    "": {
      "paddingTop": 16,
      "paddingRight": 16,
      "paddingBottom": 16,
      "paddingLeft": 16
    },
    ".uni-action-sheet_landscape__mode": {
      "paddingTop": 10,
      "paddingRight": 6,
      "paddingBottom": 10,
      "paddingLeft": 6
    }
  },
  "uni-action-sheet_dialog__cell": {
    "": {
      "paddingTop": 16,
      "paddingRight": 16,
      "paddingBottom": 16,
      "paddingLeft": 16
    },
    ".uni-action-sheet_landscape__mode": {
      "paddingTop": 10,
      "paddingRight": 6,
      "paddingBottom": 10,
      "paddingLeft": 6
    }
  },
  "uni-action-sheet_dialog__action": {
    "": {
      "paddingTop": 16,
      "paddingRight": 16,
      "paddingBottom": 16,
      "paddingLeft": 16,
      "marginTop": 8,
      "backgroundColor": "#ffffff"
    },
    ".uni-action-sheet_dark__mode": {
      "backgroundColor": "#2C2C2B"
    },
    ".uni-action-sheet_landscape__mode": {
      "display": "none",
      "paddingTop": 10,
      "paddingRight": 6,
      "paddingBottom": 10,
      "paddingLeft": 6
    }
  },
  "uni-action-sheet_dialog__title__text": {
    "": {
      "lineHeight": 1.4,
      "textAlign": "center",
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "color": "#666666"
    },
    ".uni-action-sheet_dark__mode": {
      "color": "#999999"
    }
  },
  "uni-action-sheet_dialog__cell__text": {
    "": {
      "lineHeight": 1.4,
      "textAlign": "center",
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "color": "#000000"
    },
    ".uni-action-sheet_dark__mode": {
      "color": "#ffffff"
    }
  },
  "uni-action-sheet_dialog__action__text": {
    "": {
      "lineHeight": 1.4,
      "textAlign": "center",
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "color": "#000000"
    },
    ".uni-action-sheet_dark__mode": {
      "color": "#ffffff"
    }
  },
  "uni-action-sheet_dialog__cell__container": {
    "": {
      "maxHeight": 330
    },
    ".uni-action-sheet_landscape__mode": {
      "maxHeight": 260
    }
  },
  "divider": {
    "": {
      "height": 1,
      "backgroundColor": "#e5e5e5",
      "transform": "scaleY(0.5)"
    },
    ".uni-action-sheet_dark__mode": {
      "backgroundColor": "#2F3131"
    }
  },
  "@TRANSITION": {
    "uni-action-sheet_dialog__mask": {
      "property": "opacity",
      "duration": "0.1s"
    },
    "uni-action-sheet_dialog__container": {
      "property": "transform",
      "duration": "0.15s"
    }
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var _hoisted_1$5 = ["onClick"];
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", null, [createElementVNode("view", {
    class: normalizeClass(["uni-action-sheet_dialog__mask", {
      "uni-action-sheet_dialog__mask__show": $data.show
    }]),
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.handleCancel && $options.handleCancel(...arguments);
    })
  }, null, 2), createElementVNode("view", {
    class: normalizeClass(["uni-action-sheet_dialog__container", {
      "uni-action-sheet_dialog__show": $data.show,
      "uni-action-sheet_dark__mode": $data.theme == "dark",
      "uni-action-sheet_landscape__mode": $data.isLandscape
    }])
  }, [createElementVNode("view", {
    style: normalizeStyle($data.backgroundColor != null ? {
      backgroundColor: $data.backgroundColor
    } : {}),
    class: normalizeClass(["uni-action-sheet_dialog__menu", {
      "uni-action-sheet_dark__mode": $data.theme == "dark",
      "uni-action-sheet_landscape__mode": $data.isLandscape
    }])
  }, [$data.title ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [createElementVNode("view", {
    class: normalizeClass(["uni-action-sheet_dialog__title", {
      "uni-action-sheet_dark__mode": $data.theme == "dark",
      "uni-action-sheet_landscape__mode": $data.isLandscape
    }])
  }, [createElementVNode("text", {
    style: normalizeStyle({
      color: $data.titleColor
    }),
    class: normalizeClass(["uni-action-sheet_dialog__title__text", {
      "uni-action-sheet_dark__mode": $data.theme == "dark"
    }])
  }, toDisplayString($data.title), 7)], 2), createElementVNode("view", {
    class: normalizeClass(["divider", {
      "uni-action-sheet_dark__mode": $data.theme == "dark"
    }])
  }, null, 2)], 64)) : createCommentVNode("", true), createElementVNode("scroll-view", {
    class: normalizeClass(["uni-action-sheet_dialog__cell__container", {
      "uni-action-sheet_landscape__mode": $data.isLandscape
    }])
  }, [(openBlock(true), createElementBlock(Fragment, null, renderList($data.itemList, (item, index2) => {
    return openBlock(), createElementBlock("view", {
      key: index2
    }, [index2 !== 0 ? (openBlock(), createElementBlock("view", {
      key: 0,
      class: normalizeClass(["divider", {
        "uni-action-sheet_dark__mode": $data.theme == "dark"
      }])
    }, null, 2)) : createCommentVNode("", true), createElementVNode("view", {
      class: normalizeClass(["uni-action-sheet_dialog__cell", {
        "uni-action-sheet_dark__mode": $data.theme == "dark",
        "uni-action-sheet_landscape__mode": $data.isLandscape
      }]),
      onClick: ($event) => $options.handleMenuItemClick(index2)
    }, [createElementVNode("text", {
      style: normalizeStyle({
        color: $data.itemColor
      }),
      class: normalizeClass(["uni-action-sheet_dialog__cell__text", {
        "uni-action-sheet_dark__mode": $data.theme == "dark"
      }])
    }, toDisplayString(item), 7)], 10, _hoisted_1$5)]);
  }), 128))], 2)], 6), createElementVNode("view", {
    style: normalizeStyle($data.backgroundColor != null ? {
      backgroundColor: $data.backgroundColor
    } : {}),
    class: normalizeClass(["uni-action-sheet_dialog__action", {
      "uni-action-sheet_dark__mode": $data.theme == "dark",
      "uni-action-sheet_landscape__mode": $data.isLandscape
    }]),
    onClick: _cache[1] || (_cache[1] = function() {
      return $options.handleCancel && $options.handleCancel(...arguments);
    })
  }, [createElementVNode("text", {
    style: normalizeStyle({
      color: $data.cancelColor
    }),
    class: normalizeClass(["uni-action-sheet_dialog__action__text", {
      "uni-action-sheet_dark__mode": $data.theme == "dark"
    }])
  }, toDisplayString($options.cancelText), 7)], 6), !$data.isLandscape ? (openBlock(), createElementBlock("view", {
    key: 0,
    style: normalizeStyle({
      height: "".concat($data.bottomNavigationHeight, "px"),
      backgroundColor: $options.computedBackgroundColor
    })
  }, null, 4)) : createCommentVNode("", true)], 2)]);
}
const UniActionSheetPage = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["styles", [_style_0$6]]]);
var defaultPoi = {
  latitude: 39.908823,
  longitude: 116.39747
};
var languageData = {
  "en": {
    "ok": "ok",
    "cancel": "cancel",
    "locationLoading": "positioning...",
    "search": "Search location"
  },
  "zh-Hans": {
    "ok": "确定",
    "cancel": "取消",
    "locationLoading": "获取定位中...",
    "search": "搜索地点"
  },
  "zh-Hant": {
    "ok": "確定",
    "cancel": "取消",
    "locationLoading": "獲取定位中...",
    "search": "蒐索地點"
  }
};
var loadingPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAXdJREFUSEvdVtFthTAMdAKD0E3oABixwWOSvk5SNkCYAcomZRFIZfSoUl6IQ14l2uYXnMtd7uwoOGmpk3AhGpiI3gEgQ8SnmMM/AmwAYPwfwG3bZkmS5IjY7MlIRCLjruuu8zw3VVWN232cUnOBUurFJ6UEfPNADgC1i4AT+Mb4DQC40HmPPmALdEDEZ5dqu+aSwPk7b7iVMQSU67yutsGNMa9lWV590SGiCwCwUrtM13oxTqvRpmkaXCaxD8L/aq0v0gFFxjGNIbRGZBy60dH/zge23GgfflRK1UVRDEcY9X2fG2O4l2/XVzQXxpZ7l4jY6wFgbkB3+629/Xypj0j5E//+bsY8NLTWg2SykKkW3LkstzeIWPtkDplqQcAW6F2smF2appmtgjRYvqXFM+g5h8tYdEWKiD64dvv0CQV3mstqALsNxDePN+CHHwK5byJJLxDJaNFxkoClrP9JYDYfN31vxPaYRzPmO5ReJD65o4GlO5S+fwJ6r+Yfw6D/nQAAAABJRU5ErkJggg==";
const _sfc_main$5 = {
  data() {
    var id1 = "UniMap1_".concat((Math.random() * 1e6).toString(36));
    var id2 = "UniMap2_".concat((Math.random() * 1e6).toString(36));
    var id3 = "UniMap3_".concat((Math.random() * 1e6).toString(36));
    return {
      readyEventName: "",
      optionsEventName: "",
      successEventName: "",
      failEventName: "",
      mapId: id1,
      mapTargetId: id2,
      scrollId: id3,
      isFocus: false,
      latitude: 0,
      longitude: 0,
      locationComplete: false,
      locationLoading: false,
      chooseLocationOptions: {},
      pageIndex: 1,
      pageSize: 20,
      pois: [],
      selected: -1,
      searchValue: "",
      safeArea: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      icon: {
        target: "",
        success: "",
        position: "",
        search: ""
      },
      lastTime: 0,
      searchLoading: false,
      language: "zh-Hans",
      scrollTop: 0,
      isLandscape: false,
      theme: "light",
      searchValueChangeTimer: -1,
      lastPoi: {
        latitude: null,
        longitude: null,
        selected: -1,
        pois: [],
        scrollTop: 0
      },
      errMsg: "",
      callUniMapCoErr: false,
      useUniCloud: true,
      mapHeight: 350,
      loadingPath,
      loadingRotate: 0,
      loadingTimer: -1
    };
  },
  onLoad(options) {
    this.checkUniCloud();
    this.initPageOptions(options);
    this.getSystemInfo();
    this.getLocation();
  },
  onReady() {
    this.getSafeAreaInsets();
  },
  onUnload() {
    uni.$off(this.optionsEventName, null);
    uni.$off(this.readyEventName, null);
    uni.$off(this.successEventName, null);
    uni.$off(this.failEventName, null);
  },
  onResize() {
    this.getSystemInfo();
  },
  methods: {
    checkUniCloud() {
      if (typeof uniCloud == "undefined" || typeof uniCloud.config == "undefined" || uniCloud.config.spaceId == "") {
        this.errMsg = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请先关联服务空间，并安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
        this.useUniCloud = false;
        console.error(this.errMsg);
      }
    },
    initPageOptions(options) {
      this.readyEventName = options["readyEventName"];
      this.optionsEventName = options["optionsEventName"];
      this.successEventName = options["successEventName"];
      this.failEventName = options["failEventName"];
      uni.$on(this.optionsEventName, (data) => {
        if (data["latitude"] != null) {
          this.chooseLocationOptions.latitude = data["latitude"];
        }
        if (data["longitude"] != null) {
          this.chooseLocationOptions.longitude = data["longitude"];
        }
        if (data["keyword"] != null) {
          var keyword = data["keyword"];
          this.chooseLocationOptions.keyword = keyword;
          this.searchValue = keyword;
        } else {
          this.chooseLocationOptions.keyword = "";
        }
        if (data["payload"] != null) {
          this.chooseLocationOptions.payload = data["payload"];
        }
      });
      uni.$emit(this.readyEventName, {});
    },
    getLocation() {
      if (this.chooseLocationOptions.latitude != null && this.chooseLocationOptions.longitude != null) {
        this.latitude = this.chooseLocationOptions.latitude;
        this.longitude = this.chooseLocationOptions.longitude;
        this.locationComplete = true;
        this.getPoi("getLocation");
      } else {
        this.locationLoading = true;
        uni.getLocation({
          type: "gcj02",
          success: (res) => {
            this.latitude = res.latitude;
            this.longitude = res.longitude;
            this.locationComplete = true;
            this.locationLoading = false;
            this.getPoi("getLocation");
          },
          fail: (err) => {
            console.error("getLocationErr: ", err);
            this.latitude = defaultPoi.latitude;
            this.longitude = defaultPoi.longitude;
            this.locationComplete = true;
            this.locationLoading = false;
            this.getPoi("getLocation");
          }
        });
      }
    },
    distanceHandle(distance) {
      if (distance < 1e3) {
        return distance + "m";
      } else {
        return parseFloat((distance / 1e3).toFixed(2)) + "km";
      }
    },
    poiHandle(pois) {
      var list = pois.map((item, index2) => {
        var location = item["location"];
        var distance = item["distance"];
        var latitude = location["lat"];
        var longitude = location["lng"];
        if (distance == 0) {
          latitude = this.latitude;
          longitude = this.longitude;
        }
        return {
          title: item["title"],
          address: item["address"],
          distance,
          distanceStr: this.distanceHandle(distance),
          location: {
            latitude,
            longitude
          }
        };
      });
      var pageIndex = this.pageIndex;
      if (pageIndex == 1) {
        this.pois = list;
        this.updateScrollTop(0);
      } else {
        this.pois = this.pois.concat(list);
      }
    },
    callUniMapCo(action, data) {
      var promise = new Promise((resolve, reject) => {
        if (this.useUniCloud == false) {
          reject(this.errMsg);
          return;
        }
        this.errMsg = "";
        var uniMapCo = uniCloud.importObject("uni-map-co", {
          customUI: true
        });
        var chooseLocationData = {
          action,
          data
        };
        if (this.chooseLocationOptions.payload != null) {
          chooseLocationData["payload"] = this.chooseLocationOptions.payload;
        }
        uniMapCo.chooseLocation(chooseLocationData).then((res) => {
          resolve(res);
        }).catch((err) => {
          if (err instanceof UniCloudError) {
            var cloudError = err;
            var errCode = cloudError.errCode;
            var errMsg = cloudError.errMsg;
            var errSubject = cloudError.errSubject;
            if (errMsg.indexOf("在云端不存在") > -1 || errMsg.indexOf("未匹配") > -1) {
              this.errMsg = "uni.chooseLocation 依赖 uniCloud 的 uni-map-common 插件，请安装 uni-map-common 插件，插件地址：https://ext.dcloud.net.cn/plugin?id=13872";
              console.error(this.errMsg);
            } else {
              this.errMsg = errMsg;
              console.error("获取POI信息失败，" + JSON.stringify({
                errCode,
                errMsg,
                errSubject
              }));
            }
          }
          reject(err);
        });
      });
      promise.then((res) => {
        this.callUniMapCoErr = false;
      }).catch((err) => {
        this.callUniMapCoErr = true;
      });
      return promise;
    },
    getPoi(type) {
      var searchValue = this.searchValue;
      var latitude = this.latitude;
      var longitude = this.longitude;
      var pageIndex = this.pageIndex;
      var pageSize = this.pageSize;
      if (["searchValueChange"].indexOf(type) == -1) {
        this.searchLoading = true;
      }
      if (searchValue != "" && searchValue.length > 0) {
        this.callUniMapCo("search", {
          keyword: searchValue,
          location: {
            lat: latitude,
            lng: longitude
          },
          radius: 5e3,
          auto_extend: 1,
          orderby: "weight",
          page_index: pageIndex,
          page_size: pageSize
        }).then((res) => {
          var _res$getJSON;
          var pois = (_res$getJSON = res.getJSON("result")) === null || _res$getJSON === void 0 || (_res$getJSON = _res$getJSON.getJSON("result")) === null || _res$getJSON === void 0 ? void 0 : _res$getJSON.getArray("data");
          this.poiHandle(pois);
          this.searchLoading = false;
        }).catch((err) => {
          this.searchLoading = false;
        });
      } else {
        this.callUniMapCo("location2address", {
          location: "".concat(latitude, ",").concat(longitude),
          get_poi: 1,
          poi_options: {
            radius: 3e3,
            policy: pageIndex == 1 ? 3 : 4,
            roadlevel: 1,
            homeorcorp: 1,
            page_index: pageIndex,
            page_size: pageSize
          }
        }).then((res) => {
          var _res$getJSON2;
          var pois = (_res$getJSON2 = res.getJSON("result")) === null || _res$getJSON2 === void 0 || (_res$getJSON2 = _res$getJSON2.getJSON("result")) === null || _res$getJSON2 === void 0 ? void 0 : _res$getJSON2.getArray("pois");
          this.poiHandle(pois);
          if (this.pois.length > 0 && pageIndex == 1) {
            var poi = this.pois[0];
            if (poi.distance > 0) {
              var poi1 = poi.location;
              var poi2 = {
                latitude: this.latitude,
                longitude: this.longitude
              };
              var distance = poi.distance;
              var direction = this.calcDirection(poi1, poi2);
              if (poi.address.indexOf("米") == -1) {
                var suffix = "向".concat(direction).concat(distance, "米");
                var newPoi = {
                  title: "".concat(poi.title).concat(suffix),
                  address: "".concat(poi.address).concat(suffix),
                  distance: 0,
                  distanceStr: this.distanceHandle(distance),
                  location: poi2
                };
                this.pois.unshift(newPoi);
              }
            }
            this.searchLoading = false;
            if (this.selected == -1) {
              setTimeout(() => {
                this.selected = 0;
              }, 20);
              this.lastPoi.latitude = this.latitude;
              this.lastPoi.longitude = this.longitude;
              this.lastPoi.selected = this.selected;
              this.lastPoi.pois = this.pois;
            }
          }
        }).catch((err) => {
          this.searchLoading = false;
        });
      }
    },
    calcDirection(poi1, poi2) {
      var toRadians = (angle2) => angle2 * (Math.PI / 180);
      var toDegrees = (angle2) => angle2 * (180 / Math.PI);
      var lat1 = toRadians(poi1.latitude);
      var lon1 = toRadians(poi1.longitude);
      var lat2 = toRadians(poi2.latitude);
      var lon2 = toRadians(poi2.longitude);
      var dLon = lon2 - lon1;
      var y = Math.sin(dLon) * Math.cos(lat2);
      var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
      var angleRadians = Math.atan2(y, x);
      var angle = toDegrees(angleRadians);
      angle = (angle + 360) % 360;
      if (angle < 22.5 || angle >= 337.5) {
        return "北";
      } else if (angle >= 22.5 && angle < 67.5) {
        return "东北";
      } else if (angle >= 67.5 && angle < 112.5) {
        return "东";
      } else if (angle >= 112.5 && angle < 157.5) {
        return "东南";
      } else if (angle >= 157.5 && angle < 202.5) {
        return "南";
      } else if (angle >= 202.5 && angle < 247.5) {
        return "西南";
      } else if (angle >= 247.5 && angle < 292.5) {
        return "西";
      } else {
        return "西北";
      }
    },
    getSafeAreaInsets() {
      var info = uni.getWindowInfo();
      this.safeArea.top = info.safeAreaInsets.top;
      this.safeArea.bottom = info.safeAreaInsets.bottom;
      this.safeArea.left = info.safeAreaInsets.left;
      this.safeArea.right = info.safeAreaInsets.right;
    },
    getSystemInfo() {
      var info = uni.getWindowInfo();
      this.safeArea.top = info.safeAreaInsets.top;
      this.safeArea.bottom = info.safeAreaInsets.bottom;
      this.safeArea.left = info.safeAreaInsets.left;
      this.safeArea.right = info.safeAreaInsets.right;
      var screenHeight = info.screenHeight;
      this.mapHeight = (screenHeight - this.safeArea.top - this.safeArea.bottom) * 0.6;
      var systemInfo = uni.getSystemInfoSync();
      var appLanguage = systemInfo.appLanguage;
      this.language = appLanguage;
      var osTheme = systemInfo.osTheme;
      var appTheme = systemInfo.appTheme;
      if (appTheme != null && appTheme != "auto") {
        this.theme = appTheme;
      } else if (osTheme != null) {
        this.theme = osTheme;
      }
      this.isLandscape = systemInfo.deviceOrientation == "landscape";
    },
    getMapContext() {
      return uni.createMapContext(this.mapId, this);
    },
    regionchange(e) {
      var causedBy = e.causedBy;
      if (e.type !== "end" || causedBy != "drag" || this.locationComplete == false) {
        return;
      }
      var mapContext = this.getMapContext();
      if (mapContext != null) {
        mapContext.getCenterLocation({
          success: (res) => {
            var latitudeDiff = Math.abs(res.latitude - this.latitude);
            var longitudeDiff = Math.abs(res.longitude - this.longitude);
            if (latitudeDiff > 1e-6 || longitudeDiff > 1e-6) {
              this.latitude = parseFloat(res.latitude.toFixed(6));
              this.longitude = parseFloat(res.longitude.toFixed(6));
              this.searchValue = "";
              this.selected = -1;
              this.pageIndex = 1;
              this.getPoi("regionchange");
              var element = this.$refs[this.mapTargetId];
              if (element != null) {
                var duration = 250;
                element.style.setProperty("transition-duration", "".concat(duration, "ms"));
                element.style.setProperty("transform", "translateY(0px)");
                element.style.setProperty("transform", "translateY(-15px)");
                setTimeout(() => {
                  element.style.setProperty("transform", "translateY(0px)");
                }, duration);
              }
            }
          }
        });
      }
    },
    clearSearchValueChangeTimer() {
      if (this.searchValueChangeTimer != -1) {
        clearTimeout(this.searchValueChangeTimer);
        this.searchValueChangeTimer = -1;
      }
    },
    searchValueChange(e) {
      this.clearSearchValueChangeTimer();
      this.searchValueChangeTimer = setTimeout(() => {
        this.poiSearch("searchValueChange");
      }, 200);
    },
    poiSearch(type) {
      this.clearSearchValueChangeTimer();
      this.pageIndex = 1;
      this.selected = -1;
      this.getPoi(type);
    },
    cancelSearch() {
      this.isFocus = false;
      this.searchValue = "";
      if (this.lastPoi.latitude != null) {
        this.latitude = this.lastPoi.latitude;
      }
      if (this.lastPoi.longitude != null) {
        this.longitude = this.lastPoi.longitude;
      }
      if (this.lastPoi.pois.length - 1 > this.lastPoi.selected) {
        this.pois = this.lastPoi.pois;
        this.selected = this.lastPoi.selected;
        this.updateScrollTop(this.lastPoi.scrollTop);
      } else {
        this.poiSearch("cancelSearch");
      }
    },
    updateScrollTop(scrollTop) {
      setTimeout(() => {
        this.scrollTop = scrollTop;
      }, 10);
    },
    selectPoi(item, index2) {
      this.isFocus = false;
      this.selected = index2;
      this.latitude = item.location.latitude;
      this.longitude = item.location.longitude;
      if (this.searchValue == this.chooseLocationOptions.keyword) {
        this.lastPoi.latitude = this.latitude;
        this.lastPoi.longitude = this.longitude;
        this.lastPoi.selected = this.selected;
        this.lastPoi.pois = this.pois;
        var scrollElement = this.$refs[this.scrollId];
        if (scrollElement != null) {
          var scrollTop = scrollElement.scrollTop;
          this.lastPoi.scrollTop = scrollTop;
          this.scrollTop = scrollTop;
        }
      }
    },
    scrolltolower() {
      this.pageIndex++;
      this.getPoi("scrolltolower");
    },
    mapReset() {
      this.isFocus = false;
      this.pageIndex = 1;
      this.getLocation();
    },
    closeDialogPage() {
      uni.closeDialogPage({
        dialogPage: this.$page
      });
    },
    back() {
      uni.$emit(this.failEventName, 1);
      this.closeDialogPage();
    },
    confirm() {
      if (this.selected < 0) {
        if (this.callUniMapCoErr) {
          uni.$emit(this.successEventName, {
            name: "",
            address: "",
            latitude: parseFloat(this.latitude.toFixed(6)),
            longitude: parseFloat(this.longitude.toFixed(6))
          });
          this.closeDialogPage();
        }
        return;
      }
      var item = this.pois[this.selected];
      var res = {
        name: item.title,
        address: item.address,
        latitude: item.location.latitude,
        longitude: item.location.longitude
      };
      uni.$emit(this.successEventName, res);
      this.closeDialogPage();
    }
  },
  watch: {
    searchLoading(val) {
      if (this.loadingTimer != -1) {
        clearInterval(this.loadingTimer);
        this.loadingTimer = -1;
      }
      if (val) {
        this.loadingRotate += 100;
        this.loadingTimer = setInterval(() => {
          this.loadingRotate += 100;
        }, 200);
      } else {
        this.loadingRotate = 0;
      }
    }
  },
  computed: {
    languageCom() {
      var textInfo = languageData[this.language] != null ? languageData[this.language] : languageData["zh-Hans"];
      return textInfo;
    },
    uniChooseLocationClassCom() {
      var list = [];
      if (this.theme == "dark") {
        list.push("uni-choose-location-dark");
      } else {
        list.push("uni-choose-location-light");
      }
      return list.join(" ");
    },
    landscapeClassCom() {
      return this.isLandscape ? "uni-choose-location-landscape" : "uni-choose-location-vertical";
    },
    mapBoxStyleCom() {
      var list = [];
      if (!this.useUniCloud) {
        list.push("flex: 1;");
      }
      if (!this.isLandscape) {
        var top = this.isFocus ? (300 - this.mapHeight) / 2 : 0;
        list.push("transform:translateY(".concat(top, "px);"));
        list.push("height:".concat(this.mapHeight, "px;"));
      }
      return list.join("");
    },
    poiBoxStyleCom() {
      var list = [];
      if (!this.isLandscape) {
        var top = this.isFocus ? 300 : this.mapHeight;
        list.push("top:".concat(top, "px;"));
      }
      return list.join("");
    },
    resetStyleCom() {
      var list = [];
      if (!this.isLandscape) {
        var bottom = this.isFocus ? (this.mapHeight - 300) / 2 + 300 - this.mapHeight : 0;
        list.push("transform:translateY(".concat(bottom, "px);"));
      }
      return list.join("");
    }
  }
};
const _style_0$5 = {
  "uni-choose-location-icons": {
    "": {
      "fontFamily": "UniChooseLocationFontFamily",
      "fontSize": 16,
      "fontStyle": "normal"
    }
  },
  "uni-choose-location": {
    "": {
      "position": "relative",
      "left": 0,
      "top": 0,
      "width": "100%",
      "height": "100%",
      "backgroundImage": "none",
      "backgroundColor": "#f8f8f8",
      "zIndex": 999
    }
  },
  "uni-choose-location-map-box": {
    "": {
      "position": "relative",
      "width": "100%",
      "height": 350
    },
    ".uni-choose-location-vertical": {
      "transitionProperty": "transform",
      "transitionDuration": "0.25s",
      "transitionTimingFunction": "ease-out"
    },
    ".uni-choose-location .uni-choose-location-landscape": {
      "height": "100%"
    }
  },
  "uni-choose-location-map": {
    "": {
      "width": "100%",
      "height": "100%"
    }
  },
  "uni-choose-location-map-target": {
    "": {
      "position": "absolute",
      "left": "50%",
      "bottom": "50%",
      "width": 50,
      "height": 50,
      "marginLeft": -25,
      "transitionProperty": "transform",
      "transitionDuration": "0.25s",
      "transitionTimingFunction": "ease-out"
    }
  },
  "uni-choose-location-map-target-icon": {
    "": {
      "fontSize": 50,
      "color": "#f0493e"
    }
  },
  "uni-choose-location-map-reset": {
    "": {
      "position": "absolute",
      "left": 20,
      "bottom": 40,
      "width": 40,
      "height": 40,
      "boxSizing": "border-box",
      "backgroundColor": "#ffffff",
      "borderTopLeftRadius": 20,
      "borderTopRightRadius": 20,
      "borderBottomRightRadius": 20,
      "borderBottomLeftRadius": 20,
      "pointerEvents": "auto",
      "boxShadow": "0px 0px 20px 2px rgba(0, 0, 0, .3)",
      "zIndex": 9,
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center"
    },
    ".uni-choose-location-vertical": {
      "transitionProperty": "transform",
      "transitionDuration": "0.25s",
      "transitionTimingFunction": "ease-out"
    },
    ".uni-choose-location .uni-choose-location-landscape": {
      "left": 40,
      "bottom": 40
    },
    ".uni-choose-location-dark ": {
      "backgroundColor": "#111111",
      "boxShadow": "0px 0px 5px 1px rgba(0, 0, 0, .3)"
    }
  },
  "uni-choose-location-map-reset-icon": {
    "": {
      "fontSize": 26,
      "textAlign": "center",
      "lineHeight": "40px"
    },
    ".uni-choose-location-dark ": {
      "color": "#d1d1d1"
    }
  },
  "uni-choose-location-nav": {
    "": {
      "position": "absolute",
      "top": 0,
      "left": 0,
      "width": "100%",
      "height": 60,
      "backgroundColor": "rgba(0,0,0,0)",
      "backgroundImage": "linear-gradient(to bottom, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0))"
    }
  },
  "uni-choose-location-nav-btn": {
    "": {
      "position": "absolute",
      "top": 5,
      "left": 5,
      "width": 64,
      "height": 44,
      "paddingTop": 5,
      "paddingRight": 5,
      "paddingBottom": 5,
      "paddingLeft": 5
    },
    ".uni-choose-location-nav-confirm-btn": {
      "left": "auto",
      "right": 5
    },
    ".uni-choose-location-nav-confirm-btn.active:active": {
      "opacity": 0.7
    },
    ".uni-choose-location-nav-confirm-btn.disable": {
      "opacity": 0.4
    },
    ".uni-choose-location .uni-choose-location-landscape": {
      "top": 10,
      "left": 20
    },
    ".uni-choose-location .uni-choose-location-nav-confirm-btn.uni-choose-location-landscape": {
      "left": "auto",
      "right": 20
    }
  },
  "uni-choose-location-nav-confirm-text": {
    ".uni-choose-location-nav-btn.uni-choose-location-nav-confirm-btn ": {
      "backgroundColor": "#007aff",
      "borderTopLeftRadius": 5,
      "borderTopRightRadius": 5,
      "borderBottomRightRadius": 5,
      "borderBottomLeftRadius": 5
    }
  },
  "uni-choose-location-nav-back-text": {
    ".uni-choose-location-nav-btn.uni-choose-location-nav-back-btn ": {
      "color": "#ffffff"
    }
  },
  "uni-choose-location-nav-text": {
    "": {
      "paddingTop": 8,
      "paddingRight": 0,
      "paddingBottom": 8,
      "paddingLeft": 0,
      "fontSize": 14,
      "textAlign": "center",
      "color": "#ffffff"
    }
  },
  "uni-choose-location-poi": {
    "": {
      "position": "absolute",
      "top": 350,
      "width": "100%",
      "bottom": 0,
      "backgroundColor": "#ffffff",
      "zIndex": 10
    },
    ".uni-choose-location-vertical": {
      "transitionProperty": "top",
      "transitionDuration": "0.25s",
      "transitionTimingFunction": "ease-out"
    },
    ".uni-choose-location .uni-choose-location-landscape": {
      "position": "absolute",
      "top": 80,
      "right": 25,
      "width": 300,
      "bottom": 20,
      "maxHeight": 600,
      "boxShadow": "0px 0px 20px 2px rgba(0, 0, 0, .3)",
      "borderTopLeftRadius": 5,
      "borderTopRightRadius": 5,
      "borderBottomRightRadius": 5,
      "borderBottomLeftRadius": 5
    },
    ".uni-choose-location-dark ": {
      "backgroundColor": "#181818"
    }
  },
  "uni-choose-location-poi-search": {
    "": {
      "display": "flex",
      "flexDirection": "row",
      "alignItems": "center",
      "justifyContent": "center",
      "height": 50,
      "paddingTop": 8,
      "paddingRight": 8,
      "paddingBottom": 8,
      "paddingLeft": 8,
      "backgroundColor": "#ffffff"
    },
    ".uni-choose-location-dark ": {
      "backgroundColor": "#181818"
    }
  },
  "uni-choose-location-poi-search-box": {
    "": {
      "display": "flex",
      "flexDirection": "row",
      "alignItems": "center",
      "justifyContent": "center",
      "height": 32,
      "flex": 1,
      "borderTopLeftRadius": 5,
      "borderTopRightRadius": 5,
      "borderBottomRightRadius": 5,
      "borderBottomLeftRadius": 5,
      "paddingTop": 0,
      "paddingRight": 15,
      "paddingBottom": 0,
      "paddingLeft": 15,
      "backgroundColor": "#ededed"
    },
    ".uni-choose-location-dark ": {
      "backgroundColor": "#111111"
    }
  },
  "uni-choose-location-poi-search-input": {
    "": {
      "flex": 1,
      "height": "100%",
      "borderTopLeftRadius": 5,
      "borderTopRightRadius": 5,
      "borderBottomRightRadius": 5,
      "borderBottomLeftRadius": 5,
      "paddingTop": 0,
      "paddingRight": 5,
      "paddingBottom": 0,
      "paddingLeft": 5,
      "backgroundImage": "none",
      "backgroundColor": "#ededed"
    },
    ".uni-choose-location-dark ": {
      "backgroundImage": "none",
      "backgroundColor": "#111111",
      "color": "#d1d1d1"
    }
  },
  "uni-choose-location-poi-search-cancel": {
    "": {
      "marginLeft": 5,
      "color": "#007aff",
      "fontSize": 15,
      "textAlign": "center"
    }
  },
  "uni-choose-location-poi-list": {
    "": {
      "flex": 1
    }
  },
  "uni-choose-location-poi-search-loading": {
    "": {
      "display": "flex",
      "alignItems": "center",
      "paddingTop": 10,
      "paddingRight": 0,
      "paddingBottom": 10,
      "paddingLeft": 0
    }
  },
  "uni-choose-location-poi-search-loading-text": {
    "": {
      "color": "#191919"
    },
    ".uni-choose-location-dark ": {
      "color": "#d1d1d1"
    }
  },
  "uni-choose-location-poi-search-error": {
    "": {
      "display": "flex",
      "alignItems": "center",
      "paddingTop": 10,
      "paddingRight": 10,
      "paddingBottom": 10,
      "paddingLeft": 10
    }
  },
  "uni-choose-location-poi-search-error-text": {
    "": {
      "color": "#191919",
      "fontSize": 14
    },
    ".uni-choose-location-dark ": {
      "color": "#d1d1d1"
    }
  },
  "uni-choose-location-poi-item": {
    "": {
      "position": "relative",
      "paddingTop": 15,
      "paddingRight": 40,
      "paddingBottom": 15,
      "paddingLeft": 10
    },
    ".uni-choose-location .uni-choose-location-landscape": {
      "paddingTop": 10,
      "paddingRight": 10,
      "paddingBottom": 10,
      "paddingLeft": 10
    }
  },
  "uni-choose-location-poi-item-title-text": {
    "": {
      "fontSize": 14,
      "overflow": "hidden",
      "whiteSpace": "nowrap",
      "textOverflow": "ellipsis",
      "color": "#191919"
    },
    ".uni-choose-location-dark ": {
      "color": "#d1d1d1"
    }
  },
  "uni-choose-location-poi-item-detail-text": {
    "": {
      "fontSize": 12,
      "marginTop": 5,
      "color": "#b2b2b2",
      "overflow": "hidden",
      "whiteSpace": "nowrap",
      "textOverflow": "ellipsis"
    },
    ".uni-choose-location-dark ": {
      "color": "#595959"
    }
  },
  "uni-choose-location-poi-item-selected-icon": {
    "": {
      "position": "absolute",
      "top": "50%",
      "right": 10,
      "width": 26,
      "height": 26,
      "marginTop": -13,
      "color": "#007aff",
      "fontSize": 24
    }
  },
  "uni-choose-location-poi-item-after": {
    "": {
      "position": "absolute",
      "height": 1,
      "left": 10,
      "bottom": 0,
      "right": 10,
      "width": "auto",
      "borderBottomWidth": 1,
      "borderBottomStyle": "solid",
      "borderBottomColor": "#f8f8f8"
    },
    ".uni-choose-location-dark ": {
      "borderBottomWidth": 1,
      "borderBottomStyle": "solid",
      "borderBottomColor": "#1e1e1e"
    }
  },
  "uni-choose-location-search-icon": {
    "": {
      "color": "#808080",
      "paddingLeft": 5
    },
    ".uni-choose-location-dark ": {
      "color": "#d1d1d1"
    }
  },
  "uni-choose-location-poi-search-loading-image": {
    "": {
      "width": 28,
      "height": 28,
      "transitionProperty": "transform",
      "transitionDuration": "0.2s",
      "transitionTimingFunction": "linear"
    }
  },
  "@FONT-FACE": [{
    "fontFamily": "UniChooseLocationFontFamily",
    "src": "url('data:font/ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQiCLJXoAAAE4AAAAVE9TLzI8Rkp9AAABjAAAAGBjbWFw0euemwAAAgAAAAGyZ2x5ZuUB/iAAAAPAAAACsGhlYWQp23fyAAAA4AAAADZoaGVhB94DhgAAALwAAAAkaG10eBQAAAAAAAHsAAAAFGxvY2EBUAG+AAADtAAAAAxtYXhwARIAfQAAARgAAAAgbmFtZUTMSfwAAAZwAAADS3Bvc3RLRtf0AAAJvAAAAFIAAQAAA4D/gABcBAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAUAAQAAAAEAAIZo1N5fDzz1AAsEAAAAAADjXhn6AAAAAONeGfoAAP+ABAADgQAAAAgAAgAAAAAAAAABAAAABQBxAAMAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKADAAPgACREZMVAAObGF0bgAaAAQAAAAAAAAAAQAAAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAQEAAGQAAUAAAKJAswAAACPAokCzAAAAesAMgEIAAACAAUDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBmRWQAwOYx560DgP+AAAAD3ACAAAAAAQAAAAAAAAAAAAAAAAACBAAAAAQAAAAEAAAABAAAAAQAAAAAAAAFAAAAAwAAACwAAAAEAAABcgABAAAAAABsAAMAAQAAACwAAwAKAAABcgAEAEAAAAAKAAgAAgAC5jHmU+aD563//wAA5jHmU+aD563//wAAAAAAAAAAAAEACgAKAAoACgAAAAIAAwAEAAEAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAEAAAAAAAAAABAAA5jEAAOYxAAAAAgAA5lMAAOZTAAAAAwAA5oMAAOaDAAAABAAA560AAOetAAAAAQAAAAAAAABIAGYBCAFYAAIAAP/SA4cDNgAdACoAACUGBwYnLgEnJjc+ATc2Fx4BFxYHBgcXHgEOAiYnJTI+ATQuASIOARQeAQJlSFdVT1FsDQwdHodWU1JTeBQUFhc+7AUFBAsPEAX+T0uASkqAln9LS3/MMwkIICKLV1RQUnMQEBoagVZTUlU+7AYPDwsEBAbrSoCWf0tLf5aASgAAAAEAAAAAA8ACyAANAAATNwU3Njc2NxcHBgcGB0A5AQdAVGaPnxdXbWuWfAGPN986TFl8hTpVbG6aiQAAAAMAAP+ABAADgQAzAGcAcAAAAQYHBgcGBxUUBi4BPQEmJyYnJicjIiY+ATsBNjc2NzY3NTQ2MhYdARYXFhcWFzM2HgEGKwIiJj4BOwEmJyYnJicVFAYiJj0BBgcGBwYHMzYeAQYrARYXFhcWFzU0Nh4BHQE2NzY3NiUiJjQ2MhYUBgOyBjk3WlxtDxUPbF1aNzgGNAsPAQ4LNAY4N1pdbA8VD21cWjc5BjMLDwEPC2eaCg8BDgqaBjIwT1BfDxUPXlFOMTEGmAsPAQ8LmQYxMU5RXhAVDl9QTzAy/ocWHR0rHh4BZmxdWjc4BzMLDwEOCzMHODdaXWwQFA9tXFo3OQY0ChAOCzUGOTdaXG0BDxUQEBQPX1BPMDEHmQsODwqZBzEwT1BfAQ8VEF5RTjExBpgLDwEOC5gGMTFOUUUdKx4eKx0AAAMAAP+BAyoDfgAIACYAMwAABRQWMjY0JiIGExEUBisBIiY1ES4BJyY1NDc2NzYyFxYXFhUUBw4BAwYeAj4BNC4CDgEBwCU1JiY1JWoGBEAEB0d1ISIpJ0RFokVEJykiIXX9AiRATEImJT9KQCdUEhkZIxkZAXH+iAQGBgQBeApTP0FJUUVEJykpJ0RFUUlBP1MBIiZDJwImQks/JQEjPQAAABIA3gABAAAAAAAAABMAAAABAAAAAAABABsAEwABAAAAAAACAAcALgABAAAAAAADABsANQABAAAAAAAEABsAUAABAAAAAAAFAAsAawABAAAAAAAGABsAdgABAAAAAAAKACsAkQABAAAAAAALABMAvAADAAEECQAAACYAzwADAAEECQABADYA9QADAAEECQACAA4BKwADAAEECQADADYBOQADAAEECQAEADYBbwADAAEECQAFABYBpQADAAEECQAGADYBuwADAAEECQAKAFYB8QADAAEECQALACYCR0NyZWF0ZWQgYnkgaWNvbmZvbnRVbmlDaG9vc2VMb2NhdGlvbkZvbnRGYW1pbHlSZWd1bGFyVW5pQ2hvb3NlTG9jYXRpb25Gb250RmFtaWx5VW5pQ2hvb3NlTG9jYXRpb25Gb250RmFtaWx5VmVyc2lvbiAxLjBVbmlDaG9vc2VMb2NhdGlvbkZvbnRGYW1pbHlHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQBDAHIAZQBhAHQAZQBkACAAYgB5ACAAaQBjAG8AbgBmAG8AbgB0AFUAbgBpAEMAaABvAG8AcwBlAEwAbwBjAGEAdABpAG8AbgBGAG8AbgB0AEYAYQBtAGkAbAB5AFIAZQBnAHUAbABhAHIAVQBuAGkAQwBoAG8AbwBzAGUATABvAGMAYQB0AGkAbwBuAEYAbwBuAHQARgBhAG0AaQBsAHkAVQBuAGkAQwBoAG8AbwBzAGUATABvAGMAYQB0AGkAbwBuAEYAbwBuAHQARgBhAG0AaQBsAHkAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAbgBpAEMAaABvAG8AcwBlAEwAbwBjAGEAdABpAG8AbgBGAG8AbgB0AEYAYQBtAGkAbAB5AEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAQIBAwEEAQUBBgAGc291c3VvB2dvdXh1YW4HZGluZ3dlaQtkaXR1LXR1ZGluZwAAAAA=') format('truetype')"
  }],
  "@TRANSITION": {
    "uni-choose-location-map-box": {
      "property": "transform",
      "duration": "0.25s",
      "timingFunction": "ease-out"
    },
    "uni-choose-location-map-target": {
      "property": "transform",
      "duration": "0.25s",
      "timingFunction": "ease-out"
    },
    "uni-choose-location-map-reset": {
      "property": "transform",
      "duration": "0.25s",
      "timingFunction": "ease-out"
    },
    "uni-choose-location-poi": {
      "property": "top",
      "duration": "0.25s",
      "timingFunction": "ease-out"
    },
    "uni-choose-location-poi-search-loading-image": {
      "property": "transform",
      "duration": "0.2s",
      "timingFunction": "linear"
    }
  }
};
var _hoisted_1$4 = ["id"];
var _hoisted_2$4 = {
  class: "uni-choose-location-icons uni-choose-location-map-target-icon"
};
var _hoisted_3$4 = {
  class: "uni-choose-location-icons uni-choose-location-map-reset-icon"
};
var _hoisted_4$3 = {
  class: "uni-choose-location-nav-text uni-choose-location-nav-confirm-text"
};
var _hoisted_5$2 = {
  class: "uni-choose-location-poi-search"
};
var _hoisted_6$2 = {
  class: "uni-choose-location-poi-search-box"
};
var _hoisted_7$1 = {
  class: "uni-choose-location-icons uni-choose-location-search-icon"
};
var _hoisted_8$1 = ["placeholder"];
var _hoisted_9$1 = ["id", "scroll-top"];
var _hoisted_10$1 = {
  key: 0,
  class: "uni-choose-location-poi-search-error"
};
var _hoisted_11 = {
  class: "uni-choose-location-poi-search-error-text"
};
var _hoisted_12 = {
  key: 1,
  class: "uni-choose-location-poi-search-loading"
};
var _hoisted_13 = {
  class: "uni-choose-location-poi-search-loading-text"
};
var _hoisted_14 = {
  key: 2,
  class: "uni-choose-location-poi-search-loading"
};
var _hoisted_15 = ["src"];
var _hoisted_16 = ["onClick"];
var _hoisted_17 = {
  class: "uni-choose-location-poi-item-title-text"
};
var _hoisted_18 = {
  class: "uni-choose-location-poi-item-detail-text"
};
var _hoisted_19 = {
  key: 0,
  class: "uni-choose-location-icons uni-choose-location-poi-item-selected-icon"
};
var _hoisted_20 = /* @__PURE__ */ createElementVNode("view", {
  class: "uni-choose-location-poi-item-after"
}, null, -1);
var _hoisted_21 = {
  key: 4,
  class: "uni-choose-location-poi-search-loading"
};
var _hoisted_22 = ["src"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_map = resolveComponent("map");
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(["uni-choose-location", $options.uniChooseLocationClassCom])
  }, [createElementVNode("view", {
    class: normalizeClass(["uni-choose-location-map-box", [$options.landscapeClassCom]]),
    style: normalizeStyle($options.mapBoxStyleCom)
  }, [createVNode(_component_map, {
    class: "uni-choose-location-map",
    id: $data.mapId,
    ref: $data.mapId,
    latitude: $data.latitude,
    longitude: $data.longitude,
    "layer-style": $data.theme == "dark" ? "2" : "1",
    "show-compass": false,
    "enable-zoom": true,
    "enable-scroll": true,
    "enable-rotate": false,
    "enable-poi": true,
    "show-location": true,
    onRegionchange: $options.regionchange
  }, null, 8, ["id", "latitude", "longitude", "layer-style", "onRegionchange"]), createElementVNode("view", {
    class: "uni-choose-location-map-target",
    ref: $data.mapTargetId,
    id: $data.mapTargetId
  }, [createElementVNode("text", _hoisted_2$4, toDisplayString($data.icon.target), 1)], 8, _hoisted_1$4), createElementVNode("view", {
    class: normalizeClass(["uni-choose-location-map-reset", [$options.landscapeClassCom]]),
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.mapReset && $options.mapReset(...arguments);
    }),
    style: normalizeStyle($options.resetStyleCom)
  }, [createElementVNode("text", _hoisted_3$4, toDisplayString($data.icon.position), 1)], 6)], 6), createElementVNode("view", {
    class: "uni-choose-location-nav",
    style: normalizeStyle("height:" + (60 + $data.safeArea.top) + "px;")
  }, [createElementVNode("view", {
    class: normalizeClass(["uni-choose-location-nav-btn uni-choose-location-nav-back-btn", [$options.landscapeClassCom]]),
    style: normalizeStyle($data.safeArea.top > 0 ? "top: " + $data.safeArea.top + "px;" : "")
  }, [createElementVNode("text", {
    class: "uni-choose-location-nav-text uni-choose-location-nav-back-text",
    onClick: _cache[1] || (_cache[1] = function() {
      return $options.back && $options.back(...arguments);
    })
  }, toDisplayString($options.languageCom["cancel"]), 1)], 6), createElementVNode("view", {
    class: normalizeClass(["uni-choose-location-nav-btn uni-choose-location-nav-confirm-btn", [$options.landscapeClassCom, $data.selected < 0 && !$data.callUniMapCoErr ? "disable" : "active"]]),
    style: normalizeStyle($data.safeArea.top > 0 ? "top: " + $data.safeArea.top + "px;" : ""),
    onClick: _cache[2] || (_cache[2] = function() {
      return $options.confirm && $options.confirm(...arguments);
    })
  }, [createElementVNode("text", _hoisted_4$3, toDisplayString($options.languageCom["ok"]), 1)], 6)], 4), $data.useUniCloud ? (openBlock(), createElementBlock("view", {
    key: 0,
    class: normalizeClass(["uni-choose-location-poi", [$options.landscapeClassCom]]),
    style: normalizeStyle($options.poiBoxStyleCom)
  }, [createElementVNode("view", _hoisted_5$2, [createElementVNode("view", _hoisted_6$2, [createElementVNode("text", _hoisted_7$1, toDisplayString($data.icon.search), 1), withDirectives(createElementVNode("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.searchValue = $event),
    type: "text",
    placeholder: $options.languageCom["search"],
    class: "uni-choose-location-poi-search-input uni-choose-location-icons",
    onFocus: _cache[4] || (_cache[4] = ($event) => $data.isFocus = true),
    onConfirm: _cache[5] || (_cache[5] = ($event) => $options.poiSearch("poiSearch")),
    onInput: _cache[6] || (_cache[6] = function() {
      return $options.searchValueChange && $options.searchValueChange(...arguments);
    })
  }, null, 40, _hoisted_8$1), [[vModelText, $data.searchValue]])]), $data.isFocus || $data.searchValue != "" ? (openBlock(), createElementBlock("text", {
    key: 0,
    class: "uni-choose-location-poi-search-cancel",
    onClick: _cache[7] || (_cache[7] = function() {
      return $options.cancelSearch && $options.cancelSearch(...arguments);
    })
  }, toDisplayString($options.languageCom["cancel"]), 1)) : createCommentVNode("", true)]), createElementVNode("scroll-view", {
    id: $data.scrollId,
    ref: $data.scrollId,
    "scroll-with-animation": false,
    direction: "vertical",
    "scroll-top": $data.scrollTop,
    "lower-threshold": 50,
    onScrolltolower: _cache[8] || (_cache[8] = function() {
      return $options.scrolltolower && $options.scrolltolower(...arguments);
    }),
    class: "uni-choose-location-poi-list"
  }, [$data.errMsg != "" ? (openBlock(), createElementBlock("view", _hoisted_10$1, [createElementVNode("text", _hoisted_11, toDisplayString($data.errMsg), 1)])) : $data.locationLoading ? (openBlock(), createElementBlock("view", _hoisted_12, [createElementVNode("text", _hoisted_13, toDisplayString($options.languageCom["locationLoading"]), 1)])) : $data.searchLoading && $data.pageIndex == 1 ? (openBlock(), createElementBlock("view", _hoisted_14, [createElementVNode("image", {
    src: $data.loadingPath,
    class: "uni-choose-location-poi-search-loading-image",
    mode: "widthFix",
    style: normalizeStyle("transform: rotate(" + $data.loadingRotate + "deg)")
  }, null, 12, _hoisted_15)])) : (openBlock(true), createElementBlock(Fragment, {
    key: 3
  }, renderList($data.pois, (item, index2) => {
    return openBlock(), createElementBlock("view", {
      key: index2,
      class: normalizeClass(["uni-choose-location-poi-item", [$options.landscapeClassCom]]),
      onClick: ($event) => $options.selectPoi(item, index2)
    }, [createElementVNode("view", null, [createElementVNode("view", null, [createElementVNode("text", _hoisted_17, toDisplayString(item.title), 1)]), createElementVNode("view", null, [createElementVNode("text", _hoisted_18, toDisplayString(item.distance > 0 ? item.distanceStr + " | " : "") + toDisplayString(item.address), 1)])]), $data.selected == index2 ? (openBlock(), createElementBlock("text", _hoisted_19, toDisplayString($data.icon.success), 1)) : createCommentVNode("", true), _hoisted_20], 10, _hoisted_16);
  }), 128)), $data.searchLoading && $data.pageIndex > 1 ? (openBlock(), createElementBlock("view", _hoisted_21, [createElementVNode("image", {
    src: $data.loadingPath,
    class: "uni-choose-location-poi-search-loading-image",
    mode: "widthFix",
    style: normalizeStyle("transform: rotate(" + $data.loadingRotate + "deg)")
  }, null, 12, _hoisted_22)])) : createCommentVNode("", true)], 40, _hoisted_9$1)], 6)) : createCommentVNode("", true)], 2);
}
const UniChooseLocationPage = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["styles", [_style_0$5]]]);
const _sfc_main$4 = {
  data() {
    return {
      theme: "light",
      language: "zh-Hans",
      i18nCancelText: {
        en: "Cancel",
        es: "Cancelar",
        fr: "Annuler",
        "zh-Hans": "取消",
        "zh-Hant": "取消"
      },
      i18nConfirmText: {
        en: "OK",
        es: "Confirmar",
        fr: "Confirmer",
        "zh-Hans": "确定",
        "zh-Hant": "確定"
      },
      readyEventName: "",
      optionsEventName: "",
      successEventName: "",
      failEventName: "",
      title: "",
      content: "",
      showCancel: true,
      editable: false,
      placeholderText: null,
      inputConfirmText: null,
      inputCancelText: null,
      cancelColor: "#000000",
      confirmColor: "#4A5E86",
      inputBottom: "0px",
      inputCancelColor: null,
      inputConfirmColor: null,
      hoverClassName: "uni-modal_dialog__content__bottom__button__hover",
      showAnim: false,
      isAutoHeight: true
    };
  },
  onReady() {
    setTimeout(() => {
      this.showAnim = true;
    }, 10);
  },
  computed: {
    cancelText() {
      if (this.inputCancelText != null) {
        var res = this.inputCancelText;
        return res;
      }
      if (this.language.startsWith("en")) {
        return this.i18nCancelText["en"];
      }
      if (this.language.startsWith("es")) {
        return this.i18nCancelText["es"];
      }
      if (this.language.startsWith("fr")) {
        return this.i18nCancelText["fr"];
      }
      if (this.language.startsWith("zh-Hans")) {
        return this.i18nCancelText["zh-Hans"];
      }
      if (this.language.startsWith("zh-Hant")) {
        return this.i18nCancelText["zh-Hant"];
      }
      return "取消";
    },
    confirmText() {
      if (this.inputConfirmText != null) {
        var res = this.inputConfirmText;
        return res;
      }
      if (this.language.startsWith("en")) {
        return this.i18nConfirmText["en"];
      }
      if (this.language.startsWith("es")) {
        return this.i18nConfirmText["es"];
      }
      if (this.language.startsWith("fr")) {
        return this.i18nConfirmText["fr"];
      }
      if (this.language.startsWith("zh-Hans")) {
        return this.i18nConfirmText["zh-Hans"];
      }
      if (this.language.startsWith("zh-Hant")) {
        return this.i18nConfirmText["zh-Hant"];
      }
      return "确定";
    }
  },
  onLoad(options) {
    var systemInfo = uni.getSystemInfoSync();
    var osLanguage = systemInfo.osLanguage;
    var appLanguage = systemInfo.appLanguage;
    if (appLanguage != null) {
      this.language = appLanguage;
    } else if (osLanguage != null) {
      this.language = osLanguage;
    }
    this.readyEventName = options["readyEventName"];
    this.optionsEventName = options["optionsEventName"];
    this.successEventName = options["successEventName"];
    this.failEventName = options["failEventName"];
    uni.$on(this.optionsEventName, (data) => {
      if (data["title"] != null) {
        this.title = data["title"];
      }
      if (data["content"] != null) {
        this.content = data["content"];
      }
      if (data["showCancel"] != null) {
        this.showCancel = data["showCancel"];
      }
      if (data["editable"] != null) {
        this.editable = data["editable"];
      }
      if (data["placeholderText"] != null) {
        this.placeholderText = data["placeholderText"];
      }
      if (data["confirmText"] != null) {
        this.inputConfirmText = data["confirmText"];
      }
      if (data["cancelText"] != null) {
        this.inputCancelText = data["cancelText"];
      }
      if (data["confirmColor"] != null) {
        this.inputConfirmColor = data["confirmColor"];
      }
      if (data["cancelColor"] != null) {
        this.inputCancelColor = data["cancelColor"];
      }
      this.updateUI();
    });
    uni.$emit(this.readyEventName, {});
  },
  onUnload() {
    uni.$off(this.optionsEventName, null);
    uni.$off(this.readyEventName, null);
    uni.$off(this.successEventName, null);
    uni.$off(this.failEventName, null);
  },
  onBackPress(_) {
    var ret = {
      cancel: false,
      confirm: false
    };
    uni.$emit(this.successEventName, JSON.stringify(ret));
    return false;
  },
  methods: {
    onInputBlur(e) {
      setTimeout(() => {
        this.inputBottom = "0px";
      }, 220);
    },
    onInputKeyboardChange(e) {
      var keyBoardHeight = e.detail.height;
      if (keyBoardHeight > 0) {
        var calcBottom = keyBoardHeight / 2;
        this.inputBottom = "".concat(calcBottom, "px");
      }
    },
    isValidColor(inputColor) {
      var hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (inputColor == null) {
        return false;
      }
      return hexColorRegex.test(inputColor);
    },
    /**
     * update ui when theme change.
     */
    updateUI() {
      if (this.isValidColor(this.inputConfirmColor)) {
        this.confirmColor = this.inputConfirmColor;
      } else {
        if (this.theme == "dark") {
          this.confirmColor = "#7388a2";
        } else {
          this.confirmColor = "#4A5E86";
        }
      }
      if (this.isValidColor(this.inputCancelColor)) {
        this.cancelColor = this.inputCancelColor;
      } else {
        if (this.theme == "dark") {
          this.cancelColor = "#a5a5a5";
        } else {
          this.cancelColor = "#000000";
        }
      }
      if (this.theme == "dark") {
        this.hoverClassName = "uni-modal_dialog__content__bottom__button__hover__uni-modal_dark__mode";
      } else {
        this.hoverClassName = "uni-modal_dialog__content__bottom__button__hover";
      }
    },
    closeModal() {
      this.showAnim = false;
      setTimeout(() => {
        uni.closeDialogPage({
          dialogPage: this.$page
        });
      }, 300);
    },
    handleCancel() {
      this.closeModal();
      var ret = {
        cancel: true,
        confirm: false
      };
      uni.$emit(this.successEventName, JSON.stringify(ret));
    },
    handleSure() {
      this.closeModal();
      var ret = {
        cancel: false,
        confirm: true,
        content: this.editable ? this.content : null
      };
      uni.$emit(this.successEventName, JSON.stringify(ret));
    }
  }
};
const _style_0$4 = {
  "uni-modal_dialog__mask": {
    "": {
      "display": "flex",
      "height": "100%",
      "width": "100%",
      "justifyContent": "center",
      "alignItems": "center",
      "backgroundColor": "rgba(0,0,0,0.5)",
      "transitionDuration": "0.1s",
      "transitionProperty": "opacity",
      "opacity": 0
    }
  },
  "uni-modal_dialog__mask__show": {
    "": {
      "opacity": 1
    }
  },
  "uni-modal_dialog__container": {
    "": {
      "width": 300,
      "backgroundColor": "#FFFFFF",
      "boxShadow": "0 0 10px rgba(0, 0, 0, 0.1)",
      "borderTopLeftRadius": 8,
      "borderTopRightRadius": 8,
      "borderBottomRightRadius": 8,
      "borderBottomLeftRadius": 8,
      "opacity": 0,
      "transform": "scale(0.9)",
      "transitionDuration": "0.1s",
      "transitionProperty": "opacity,transform"
    },
    ".uni-modal_dialog__show": {
      "opacity": 1,
      "transform": "scale(1)"
    },
    ".uni-modal_dark__mode": {
      "backgroundColor": "#272727"
    }
  },
  "uni-modal_dialog__container__wrapper": {
    "": {
      "width": "100%",
      "height": "100%",
      "paddingTop": 10,
      "backgroundColor": "#FFFFFF",
      "borderTopLeftRadius": 8,
      "borderTopRightRadius": 8,
      "borderBottomRightRadius": 8,
      "borderBottomLeftRadius": 8
    },
    ".uni-modal_dark__mode": {
      "backgroundColor": "#272727"
    }
  },
  "uni-modal_dialog__title__text": {
    "": {
      "fontSize": 16,
      "fontWeight": "bold",
      "textAlign": "center",
      "marginTop": 20,
      "textOverflow": "ellipsis",
      "paddingLeft": 20,
      "paddingRight": 20,
      "lines": 2
    },
    ".uni-modal_dark__mode": {
      "color": "#CFCFCF"
    }
  },
  "uni-modal_dialog__content": {
    "": {
      "justifyContent": "center",
      "alignItems": "center",
      "paddingTop": 18,
      "paddingRight": 18,
      "paddingBottom": 18,
      "paddingLeft": 18
    }
  },
  "uni-modal_dialog__content__text": {
    "": {
      "fontSize": 16,
      "fontWeight": "normal",
      "marginTop": 2,
      "marginLeft": 2,
      "marginRight": 2,
      "marginBottom": 12,
      "textAlign": "center",
      "color": "#747474",
      "lines": 6,
      "width": "100%",
      "textOverflow": "ellipsis"
    }
  },
  "uni-modal_dialog__content__textarea": {
    "": {
      "backgroundColor": "#F6F6F6",
      "color": "#000000",
      "width": "96%",
      "paddingTop": 5,
      "paddingRight": 5,
      "paddingBottom": 5,
      "paddingLeft": 5,
      "marginTop": 2,
      "marginBottom": 7,
      "maxHeight": 192
    },
    ".uni-modal_dark__mode": {
      "backgroundColor": "#3d3d3d",
      "color": "#CFCFCF"
    }
  },
  "uni-modal_dialog__content__textarea__placeholder": {
    "": {
      "color": "#808080"
    },
    ".uni-modal_dark__mode": {
      "color": "#CFCFCF"
    }
  },
  "uni-modal_dialog__content__topline": {
    "": {
      "width": "100%",
      "height": 0.5,
      "backgroundColor": "#E0E0E0"
    },
    ".uni-modal_dark__mode": {
      "backgroundColor": "#303030"
    }
  },
  "uni-modal_dialog__content__bottom": {
    "": {
      "display": "flex",
      "width": "100%",
      "height": 50,
      "flexDirection": "row",
      "overflow": "hidden"
    }
  },
  "uni-modal_dialog__content__bottom__button": {
    "": {
      "width": "50%",
      "height": "100%",
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "flexGrow": 1
    }
  },
  "uni-modal_dialog__content__bottom__button__hover": {
    "": {
      "width": "50%",
      "height": "100%",
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "backgroundColor": "#efefef"
    }
  },
  "uni-modal_dialog__content__bottom__button__hover__uni-modal_dark__mode": {
    "": {
      "width": "50%",
      "height": "100%",
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "backgroundColor": "#1C1C1C"
    }
  },
  "uni-modal_dialog__content__bottom__button__text": {
    "": {
      "letterSpacing": 1,
      "fontSize": 16,
      "fontWeight": "bold",
      "textAlign": "center",
      "lines": 1,
      "whiteSpace": "nowrap"
    }
  },
  "uni-modal_dialog__content__bottom__button__text__sure": {
    "": {
      "letterSpacing": 1,
      "fontSize": 16,
      "fontWeight": "bold",
      "lines": 1,
      "whiteSpace": "nowrap",
      "textAlign": "center",
      "color": "#4A5E86"
    }
  },
  "uni-modal_dialog__content__bottom__splitline": {
    "": {
      "width": 0.5,
      "height": "100%",
      "backgroundColor": "#E3E3E3"
    },
    ".uni-modal_dark__mode": {
      "backgroundColor": "#303030"
    }
  },
  "@TRANSITION": {
    "uni-modal_dialog__mask": {
      "duration": "0.1s",
      "property": "opacity"
    },
    "uni-modal_dialog__container": {
      "duration": "0.1s",
      "property": "opacity,transform"
    }
  }
};
var _hoisted_1$3 = {
  class: "uni-modal_dialog__content"
};
var _hoisted_2$3 = ["auto-height", "placeholder"];
var _hoisted_3$3 = {
  key: 1,
  class: "uni-modal_dialog__content__text"
};
var _hoisted_4$2 = {
  class: "uni-modal_dialog__content__bottom"
};
var _hoisted_5$1 = ["hover-class"];
var _hoisted_6$1 = ["hover-class"];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(["uni-modal_dialog__mask", {
      "uni-modal_dialog__mask__show": $data.showAnim
    }])
  }, [createElementVNode("view", {
    class: normalizeClass(["uni-modal_dialog__container", {
      "uni-modal_dialog__show": $data.showAnim,
      "uni-modal_dark__mode": $data.theme == "dark"
    }]),
    id: "modal_content",
    style: normalizeStyle({
      bottom: $data.inputBottom
    })
  }, [createElementVNode("view", {
    class: normalizeClass(["uni-modal_dialog__container__wrapper", {
      "uni-modal_dark__mode": $data.theme == "dark"
    }])
  }, [$data.title ? (openBlock(), createElementBlock("text", {
    key: 0,
    class: normalizeClass(["uni-modal_dialog__title__text", {
      "uni-modal_dark__mode": $data.theme == "dark"
    }])
  }, toDisplayString($data.title), 3)) : createCommentVNode("", true), createElementVNode("view", _hoisted_1$3, [$data.editable ? withDirectives((openBlock(), createElementBlock("textarea", {
    key: 0,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.content = $event),
    class: normalizeClass(["uni-modal_dialog__content__textarea", {
      "uni-modal_dark__mode": $data.theme == "dark"
    }]),
    "placeholder-class": "modalContent_content_edit_placeholder",
    "adjust-position": false,
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onInputBlur && $options.onInputBlur(...arguments);
    }),
    onKeyboardheightchange: _cache[2] || (_cache[2] = function() {
      return $options.onInputKeyboardChange && $options.onInputKeyboardChange(...arguments);
    }),
    id: "textarea_content_input",
    ref: "ref_textarea_content_input",
    "auto-height": $data.isAutoHeight,
    placeholder: $data.placeholderText
  }, null, 42, _hoisted_2$3)), [[vModelText, $data.content]]) : createCommentVNode("", true), !$data.editable && $data.content.length > 0 ? (openBlock(), createElementBlock("text", _hoisted_3$3, toDisplayString($data.content), 1)) : createCommentVNode("", true)]), createElementVNode("view", {
    class: normalizeClass(["uni-modal_dialog__content__topline", {
      "uni-modal_dark__mode": $data.theme == "dark"
    }])
  }, null, 2), createElementVNode("view", _hoisted_4$2, [$data.showCancel ? (openBlock(), createElementBlock("view", {
    key: 0,
    class: normalizeClass(["uni-modal_dialog__content__bottom__button", {
      "uni-modal_dark__mode": $data.theme == "dark"
    }]),
    "hover-class": $data.hoverClassName,
    onClick: _cache[3] || (_cache[3] = function() {
      return $options.handleCancel && $options.handleCancel(...arguments);
    })
  }, [createElementVNode("text", {
    style: normalizeStyle({
      color: $data.cancelColor
    }),
    class: "uni-modal_dialog__content__bottom__button__text"
  }, toDisplayString($options.cancelText), 5)], 10, _hoisted_5$1)) : createCommentVNode("", true), $data.showCancel ? (openBlock(), createElementBlock("view", {
    key: 1,
    class: normalizeClass(["uni-modal_dialog__content__bottom__splitline", {
      "uni-modal_dark__mode": $data.theme == "dark"
    }])
  }, null, 2)) : createCommentVNode("", true), createElementVNode("view", {
    class: normalizeClass(["uni-modal_dialog__content__bottom__button", {
      "uni-modal_dark__mode": $data.theme == "dark"
    }]),
    "hover-class": $data.hoverClassName,
    onClick: _cache[4] || (_cache[4] = function() {
      return $options.handleSure && $options.handleSure(...arguments);
    })
  }, [createElementVNode("text", {
    style: normalizeStyle({
      color: $data.confirmColor
    }),
    class: "uni-modal_dialog__content__bottom__button__text__sure"
  }, toDisplayString($options.confirmText), 5)], 10, _hoisted_6$1)])], 2)], 6)], 2);
}
const UniUniModalPage = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["styles", [_style_0$4]]]);
class Friction {
  // 构造函数，初始化物体的质量（m）、摩擦力大小（f，这里假设是牛顿单位的力，但乘以1000可能是为了转换为某种特定单位）
  constructor(mass, frictionForce) {
    this.endPosition = null;
    this.lastTimeElapsed = null;
    this.totalTimeToStop = 0;
    this.mass = mass;
    this.frictionForce = 1e3 * frictionForce;
    this.startTime = 0;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.acceleration = {
      x: 0,
      y: 0
    };
    this.startPosition = {
      x: 0,
      y: 0
    };
    this.endPosition = null;
    this.lastTimeElapsed = null;
  }
  // 设置物体的速度
  setVelocity(x, y) {
    var speed = Math.sqrt(x * x + y * y);
    this.velocity = {
      x,
      y
    };
    this.acceleration = {
      x: -this.frictionForce * x / speed,
      y: -this.frictionForce * y / speed
    };
    this.totalTimeToStop = Math.abs(x / this.acceleration.x);
    if (Number.isNaN(this.totalTimeToStop)) {
      this.totalTimeToStop = Math.abs(y / this.acceleration.y);
    }
    if (Number.isNaN(this.totalTimeToStop)) {
      this.totalTimeToStop = 0;
    }
    this.startTime = Date.now();
    this.lastTimeElapsed = null;
  }
  // 设置物体的起始位置
  setStartPosition(x, y) {
    this.startPosition = {
      x,
      y
    };
  }
  // 设置物体的结束位置
  setEndPosition(x, y) {
    this.endPosition = {
      x,
      y
    };
  }
  // 计算并返回物体在时间 t 时的位置
  positionAtTime(t) {
    if (t == null) {
      t = (Date.now() - this.startTime) / 1e3;
    }
    if (t > this.totalTimeToStop) {
      t = this.totalTimeToStop;
      this.lastTimeElapsed = t;
    }
    var x = this.velocity.x * t + 0.5 * this.acceleration.x * t * t + this.startPosition.x;
    var y = this.velocity.y * t + 0.5 * this.acceleration.y * t * t + this.startPosition.y;
    if (this.acceleration.x > 0 && x < this.endPosition.x || this.acceleration.x < 0 && x > this.endPosition.x) {
      x = this.endPosition.x;
    }
    if (this.acceleration.y > 0 && y < this.endPosition.y || this.acceleration.y < 0 && y > this.endPosition.y) {
      y = this.endPosition.y;
    }
    return {
      x,
      y
    };
  }
  // 计算并返回物体在时间 t 时的速度
  velocityAtTime(t) {
    if (t == null) {
      t = (Date.now() - this.startTime) / 1e3;
    }
    if (t > this.totalTimeToStop) {
      t = this.totalTimeToStop;
    }
    return {
      dx: this.velocity.x + this.acceleration.x * t,
      dy: this.velocity.y + this.acceleration.y * t
    };
  }
  // 计算物体停止前的位移量（这里的方法名可能不准确，因为 delta 通常表示变化量）
  // 注意：这个方法可能是错误的，因为它基于一个不准确的加速度公式
  displacement() {
    var tx = -1.5 * Math.pow(this.velocity.x, 2) / this.acceleration.x;
    if (Number.isNaN(tx)) {
      tx = 0;
    }
    var ty = -1.5 * Math.pow(this.velocity.y, 2) / this.acceleration.y;
    if (Number.isNaN(ty)) {
      ty = 0;
    }
    return {
      x: tx,
      y: ty
    };
  }
  // 计算物体停止所需的时间（这个方法实际上是多余的，因为已经在 setVelocity 中计算过了）
  timeToStop() {
    return -this.velocity.x / this.acceleration.x;
  }
  // 检查物体是否已经停止或到达结束位置
  isDone() {
    var currentPosition = this.positionAtTime(null);
    return currentPosition.x === this.endPosition.x && currentPosition.y === this.endPosition.y || this.lastTimeElapsed === this.totalTimeToStop;
  }
  // 重新配置物体的质量和摩擦力大小
  reconfigure(mass, frictionForce) {
    this.mass = mass;
    this.frictionForce = 1e3 * frictionForce;
  }
}
var easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
var elId = 0;
const _sfc_main$3 = {
  name: "loading-circle",
  props: {
    speed: {
      type: Number,
      default: 16
    },
    size: {
      type: Number,
      default: 20
    },
    color: {
      type: String,
      default: "#666"
    }
  },
  data() {
    elId += 1;
    var elID = "Uni_Load_Circle_".concat(elId);
    return {
      elId: elID,
      timer: 0
    };
  },
  computed: {
    iconsSize() {
      return this.size / 10 - 3;
    }
  },
  mounted() {
    this.init();
  },
  unmounted() {
    cancelAnimationFrame(this.timer);
  },
  methods: {
    /**
     * 初始化圆环
     */
    init() {
      var refs = this.$refs[this.elId];
      var ctx = refs.getDrawableContext();
      this.build_circular(ctx);
    },
    /**
     * 构建圆环动画
     */
    build_circular(ctx) {
      var startAngle = 0;
      var rotate = 0;
      var ARC_LENGTH = 359;
      var center = this.size / 2;
      var lineWidth = Math.floor(this.size / 12);
      var duration = 1200;
      var ARC_MAX = 358;
      var startTime = 0;
      var foreward_end = 0;
      var reversal_end = ARC_MAX;
      function pogress_time() {
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;
        var progress2 = elapsedTime / duration;
        var easedProgress = easeInOutCubic(progress2);
        return easedProgress;
      }
      var draw = () => {
      };
      draw = () => {
        this.timer = requestAnimationFrame(draw);
        ctx.reset();
        ctx.beginPath();
        if (reversal_end == ARC_MAX) {
          foreward_end = Math.min(pogress_time() * ARC_LENGTH, ARC_LENGTH);
          if (foreward_end >= ARC_MAX) {
            reversal_end = 0;
            foreward_end = ARC_MAX;
            startTime = Date.now();
          }
        }
        if (foreward_end == ARC_MAX) {
          reversal_end = Math.min(pogress_time() * ARC_LENGTH, ARC_LENGTH);
          if (reversal_end >= ARC_MAX) {
            reversal_end = ARC_MAX;
            foreward_end = 0;
            startTime = Date.now();
          }
        }
        ctx.arc(center, center, center - lineWidth, startAngle + rotate + reversal_end * Math.PI / 180, startAngle + rotate + foreward_end * Math.PI / 180);
        ctx.lineWidth = lineWidth;
        var fillColor = (this.color !== "" ? this.color : "#666").toString();
        ctx.strokeStyle = fillColor;
        ctx.stroke();
        ctx.update();
        rotate += 0.05;
      };
      this.timer = requestAnimationFrame(draw);
    }
  }
};
const _style_0$3 = {
  "uni-loading-block": {
    "": {
      "width": 50,
      "height": 50
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    ref: $data.elId,
    class: "uni-loading-block",
    style: normalizeStyle({
      width: $props.size + "px",
      height: $props.size + "px"
    })
  }, null, 4);
}
const loadingCircle = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["styles", [_style_0$3]]]);
var DEFAULT_DISTANCE = 4;
var FAST_SLIDE_LENGTH = 10;
var LANGUAGE = {
  "en": {
    error: "Image loading failed",
    retry: "Retry"
  },
  "zh-Hans": {
    error: "图片加载失败",
    retry: "重试"
  },
  "zh-Hant": {
    error: "圖片加載失敗",
    retry: "重試"
  }
};
const _sfc_main$2 = {
  components: {
    loadingCircle
  },
  data() {
    return {
      imageMode: "aspectFit",
      lastTouchEndTime: 0,
      srcPath: "",
      imageView: null,
      screenWidth: 0,
      screenHeight: 0,
      /* 放大系数 */
      scaleSize: 1,
      /* 上次触摸事件 */
      lastSlideTouch: null,
      /* 图片竖向滑动的距离 */
      imageTop: 0,
      /* 图片横向滑动的距离 */
      imageMarginTop: 0,
      imageLeft: 0,
      /* 是否需要动画 */
      withAnimation: false,
      imageHeight: 0,
      historyX: [0, 0],
      historyY: [0, 0],
      historyT: [0, 0],
      _friction: new Friction(1, 2),
      requestId: -1,
      needExecLongPress: false,
      androidView: null,
      downPoint: null,
      longPressActionTimeoutId: -1,
      inScaleMode: false,
      inDoubleTapMode: false,
      startTimestamp: 0,
      clickTimeoutId: -1,
      transformOrigin: [0, 0],
      loadingFinished: false,
      devicePixelRatio: 0,
      loadError: false,
      language: "zh-Hans"
    };
  },
  props: {
    "src": {
      type: String,
      default: ""
    },
    "index": {
      type: Number,
      default: -1
    },
    "longPressAction": {
      type: Object
    },
    "tips": {
      type: Object
    }
  },
  watch: {
    "src": {
      handler(newValue, oldValue) {
        if (newValue != "") {
          this.getSrcLocalPath(newValue);
        } else {
          this.loadingFinished = true;
          this.loadError = true;
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.imageView = this.$refs["imageView"];
    var dpr = uni.getDeviceInfo({
      filter: ["devicePixelRatio"]
    }).devicePixelRatio;
    if (dpr == null) {
      this.devicePixelRatio = 1;
    } else {
      this.devicePixelRatio = dpr;
    }
    var systemInfo = uni.getSystemInfoSync();
    this.language = systemInfo.appLanguage;
  },
  methods: {
    getLanguageString(name) {
      var object = LANGUAGE[this.language];
      if (object != null) {
        return object[name];
      } else {
        return LANGUAGE["en"][name];
      }
    },
    previewImageError(e) {
      var _this$$refs$mask;
      (_this$$refs$mask = this.$refs["mask"]) === null || _this$$refs$mask === void 0 || _this$$refs$mask.style.setProperty("point-events", "none");
      this.loadingFinished = true;
      this.loadError = true;
    },
    isNetPath(url) {
      if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("rtmp://") || url.startsWith("rtsp://")) {
        return true;
      }
      return false;
    },
    getSrcLocalPath(url) {
      this.srcPath = url;
    },
    onstart(e) {
      this.inScaleMode = false;
      this.withAnimation = false;
      cancelAnimationFrame(this.requestId);
      clearTimeout(this.clickTimeoutId);
      this.lastSlideTouch = e.touches;
      this.historyX = [0, 0];
      this.historyY = [0, 0];
      this.historyT = [0, 0];
      this.downPoint = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      this.inDoubleTapMode = false;
      this.startTimestamp = e.timeStamp;
      e.preventDefault();
      this.needExecLongPress = true;
      this.longPressActionTimeoutId = setTimeout(() => {
        if (this.needExecLongPress) {
          this.onLongPressAction();
        }
      }, 350);
    },
    onmove(e) {
      if (e.touches.length == 1) {
        var currentSlideTouch = e.touches[0];
        if (this.lastSlideTouch != null) {
          var slideX = currentSlideTouch.clientX - this.lastSlideTouch[0].clientX;
          var slideY = currentSlideTouch.clientY - this.lastSlideTouch[0].clientY;
          var downX = Math.abs(currentSlideTouch.clientX - this.downPoint.x);
          var downY = Math.abs(currentSlideTouch.clientY - this.downPoint.y);
          if (downX > DEFAULT_DISTANCE || downY > DEFAULT_DISTANCE) {
            if (this.scaleSize > 1 || this.imageHeight > this.screenHeight) {
              this.imageLeft = this.imageLeft + slideX;
              this.imageTop = this.imageTop + slideY;
              this.updateStyle(e, currentSlideTouch.clientX, currentSlideTouch.clientY);
            } else {
              this.needExecLongPress = true;
              this.onInterceptTouchEvent(e);
            }
            this.historyX.shift();
            this.historyX.push(this.imageLeft);
            this.historyY.shift();
            this.historyY.push(this.imageTop);
            this.historyT.shift();
            this.historyT.push(e.timeStamp);
            this.lastSlideTouch = e.touches;
            this.needExecLongPress = false;
          } else {
            this.needExecLongPress = true;
          }
        } else {
          this.lastSlideTouch = e.touches;
        }
      } else if (e.touches.length >= 2) {
        this.inScaleMode = true;
        var currentFirstTouch = e.touches[0];
        var currentSecondTouch = e.touches[1];
        var currentXSlideLength = currentFirstTouch.clientX - currentSecondTouch.clientX;
        var currentYSlideLength = currentFirstTouch.clientY - currentSecondTouch.clientY;
        var currentLongSideLength = Math.sqrt(currentXSlideLength * currentXSlideLength + currentYSlideLength * currentYSlideLength);
        if (this.lastSlideTouch != null && this.lastSlideTouch.length >= 2) {
          var lastFirstTouch = this.lastSlideTouch[0];
          var lastSecondTouch = this.lastSlideTouch[1];
          var lastXSlideLength = lastFirstTouch.clientX - lastSecondTouch.clientX;
          var lastYSlideLength = lastFirstTouch.clientY - lastSecondTouch.clientY;
          var lastLongSideLength = Math.sqrt(lastXSlideLength * lastXSlideLength + lastYSlideLength * lastYSlideLength);
          if (currentLongSideLength != lastLongSideLength) {
            this.scaleSize = this.scaleSize * (currentLongSideLength / lastLongSideLength);
            this.updateStyle(e, NaN, NaN);
          }
        }
        this.preventDefaultScall(e);
        this.needExecLongPress = false;
        this.lastSlideTouch = e.touches;
      }
    },
    onend(e) {
      this.needExecLongPress = false;
      clearTimeout(this.longPressActionTimeoutId);
      var current = Date.now();
      if (this.historyY[0] == 0 && this.historyY[1] == 0 && this.historyX[0] == 0 && this.historyX[1] == 0) {
        this.withAnimation = true;
        if (current - this.lastTouchEndTime < 350) {
          if (this.lastSlideTouch != null && this.lastSlideTouch.length > 0) {
            var downX = Math.abs(this.lastSlideTouch[0].clientX - this.downPoint.x);
            var downY = Math.abs(this.lastSlideTouch[0].clientY - this.downPoint.y);
            if (downX > FAST_SLIDE_LENGTH || downY > FAST_SLIDE_LENGTH) {
              this.lastSlideTouch = null;
              return;
            }
          }
          if (this.scaleSize > 1) {
            this.scaleSize = 1;
            this.imageLeft = 0;
            this.updateStyle(e, NaN, NaN);
          } else if (this.scaleSize == 1) {
            this.scaleSize = 2;
            this.inDoubleTapMode = true;
            this.updateStyle(e, NaN, NaN);
          }
        } else if (e.touches.length == 0) {
          if (this.lastSlideTouch != null && this.lastSlideTouch.length == 1) {
            if (e.timeStamp - this.startTimestamp < 160) {
              if (this.lastSlideTouch != null) {
                var downX = Math.abs(this.lastSlideTouch[0].clientX - this.downPoint.x);
                var downY = Math.abs(this.lastSlideTouch[0].clientY - this.downPoint.y);
                if (downX < FAST_SLIDE_LENGTH && downY < FAST_SLIDE_LENGTH) {
                  this.clickTimeoutId = setTimeout(() => {
                    uni.$emit("__UNIPREVIEWIMAGECLOSE");
                  }, 200);
                }
              } else {
                this.clickTimeoutId = setTimeout(() => {
                  uni.$emit("__UNIPREVIEWIMAGECLOSE");
                }, 200);
              }
            }
          }
          if (this.scaleSize > 3) {
            this.scaleSize = 3;
            this.updateStyle(e, NaN, NaN);
          } else if (this.scaleSize < 1) {
            this.scaleSize = 1;
            this.imageLeft = 0;
            this.updateStyle(e, NaN, NaN);
          }
          this.lastTouchEndTime = current;
        }
      } else {
        if (this.inScaleMode) {
          if (this.scaleSize > 3) {
            this.scaleSize = 3;
            this.updateStyle(e, NaN, NaN);
          } else if (this.scaleSize < 1) {
            this.scaleSize = 1;
            this.imageLeft = 0;
            this.updateStyle(e, NaN, NaN);
          }
          this.lastTouchEndTime = current;
        }
        var xv = 1e3 * (this.historyX[1] - this.historyX[0]) / (this.historyT[1] - this.historyT[0]);
        var yv = 1e3 * (this.historyY[1] - this.historyY[0]) / (this.historyT[1] - this.historyT[0]);
        this._friction.setVelocity(xv, yv);
        this._friction.setStartPosition(this.imageLeft, this.imageTop);
        var x0 = this._friction.displacement().x;
        var y0 = this._friction.displacement().y;
        var x = this.imageLeft;
        if (!Number.isNaN(x0))
          x = x0 + this.imageLeft;
        var y = this.imageTop;
        if (!Number.isNaN(y0))
          y = y0 + this.imageTop;
        this._friction.setEndPosition(x, y);
        this.doTransform(() => {
          var p = this._friction.positionAtTime(null);
          if (Number.isNaN(p.x) && Number.isNaN(p.y)) {
            cancelAnimationFrame(this.requestId);
          }
          if (!Number.isNaN(p.x))
            this.imageLeft = p.x;
          if (!Number.isNaN(p.y))
            this.imageTop = p.y;
          this.updateStyle(e, NaN, NaN);
        });
      }
      this.lastSlideTouch = null;
    },
    oncancel(e) {
      this.onend(e);
      clearTimeout(this.clickTimeoutId);
    },
    doTransform(callback) {
      this.requestId = requestAnimationFrame(() => {
        callback();
        if (!this._friction.isDone())
          this.doTransform(callback);
      });
    },
    updateStyle(e, xDistance, yDistance) {
      var _this$imageView, _this$imageView2, _this$imageView3;
      this.caculatorTransformOrigin(e);
      if (1 < this.scaleSize) {
        var scrollWidthLength = this.screenWidth * (this.scaleSize - 1);
        var scrollRadio = this.transformOrigin[0] / this.screenWidth;
        if (this.imageLeft > scrollWidthLength * scrollRadio) {
          this.imageLeft = scrollWidthLength * scrollRadio;
          this.onInterceptTouchEvent(e);
        } else if (this.imageLeft < -(scrollWidthLength * (1 - scrollRadio))) {
          this.imageLeft = -(scrollWidthLength * (1 - scrollRadio));
          this.onInterceptTouchEvent(e);
        } else {
          this.preventDefaultScall(e);
        }
      } else {
        this.imageLeft = 0;
        this.onInterceptTouchEvent(e);
      }
      if (this.screenHeight < this.imageHeight * this.scaleSize) {
        var topMargin = (this.transformOrigin[1] - (this.imageMarginTop > 0 ? this.imageMarginTop : 0)) * this.scaleSize - this.transformOrigin[1];
        var bottomMargin = (this.imageHeight + (this.imageMarginTop > 0 ? this.imageMarginTop : 0) - this.transformOrigin[1]) * this.scaleSize - (this.screenHeight - this.transformOrigin[1]);
        if (this.imageTop > topMargin) {
          this.imageTop = topMargin;
        } else if (this.imageTop < -bottomMargin) {
          this.imageTop = -bottomMargin;
        } else {
          if (!Number.isNaN(yDistance) && Math.abs(yDistance - this.downPoint.y) > DEFAULT_DISTANCE) {
            this.preventDefaultScall(e);
          }
        }
      } else {
        if (!this.inScaleMode) {
          this.imageTop = 0;
          if (!Number.isNaN(yDistance) && Math.abs(yDistance - this.downPoint.y) > DEFAULT_DISTANCE) {
            this.preventDefaultScall(e);
          }
        } else {
          this.preventDefaultScall(e);
        }
      }
      (_this$imageView = this.imageView) === null || _this$imageView === void 0 || _this$imageView.style.setProperty("transition-duration", this.withAnimation ? "200ms" : "0ms");
      (_this$imageView2 = this.imageView) === null || _this$imageView2 === void 0 || _this$imageView2.style.setProperty("transform-origin", this.transformOrigin[0] + "px " + this.transformOrigin[1] + "px");
      (_this$imageView3 = this.imageView) === null || _this$imageView3 === void 0 || _this$imageView3.style.setProperty("transform", "translate(" + this.imageLeft + "px," + this.imageTop + "px) scale(" + this.scaleSize + ")");
    },
    onLongPressAction() {
      if (this.longPressAction != null && this.longPressAction.itemList.length > 0) {
        uni.showActionSheet({
          itemList: this.longPressAction.itemList,
          itemColor: this.longPressAction.itemColor,
          success: (e) => {
            uni.$emit("__UNIPREVIEWLONGPRESS", {
              type: "success",
              tapIndex: e.tapIndex,
              index: this.index
            });
          },
          fail() {
            uni.$emit("__UNIPREVIEWLONGPRESS", {
              type: "fail",
              tapIndex: -1,
              index: -1
            });
          }
        });
      }
    },
    onImageLoad(e) {
      var _this$$refs$mask2;
      (_this$$refs$mask2 = this.$refs["mask"]) === null || _this$$refs$mask2 === void 0 || _this$$refs$mask2.style.setProperty("point-events", "none");
      uni.createSelectorQuery().in(this).select(".uni-preview-image-item").boundingClientRect().exec((ret) => {
        if (ret.length == 1) {
          var rect = this.imageView.getBoundingClientRect();
          this.screenHeight = rect.height;
          this.screenWidth = rect.width;
          this.caculatorImageSize(e.detail.width / this.devicePixelRatio, e.detail.height / this.devicePixelRatio);
        }
      });
      this.loadingFinished = true;
    },
    caculatorImageSize(imageWidth, imageHeight) {
      var scaleImageSize = imageHeight / (imageWidth / this.screenWidth);
      if (scaleImageSize > this.screenHeight) {
        var _this$imageView4;
        this.imageHeight = scaleImageSize;
        this.imageMode = "aspectFill";
        (_this$imageView4 = this.imageView) === null || _this$imageView4 === void 0 || _this$imageView4.style.setProperty("height", scaleImageSize + "px");
      } else {
        this.imageMode = "aspectFit";
      }
      this.imageMarginTop = (this.screenHeight - scaleImageSize) / 2;
      this.imageHeight = scaleImageSize;
    },
    preventDefaultScall(e) {
      e === null || e === void 0 || e.preventDefault();
      e === null || e === void 0 || e.stopPropagation();
    },
    onInterceptTouchEvent(e) {
      if (this.inScaleMode) {
        this.preventDefaultScall(e);
        return;
      }
      clearTimeout(this.clickTimeoutId);
    },
    reloadImage(e) {
      var _this$$refs$mask3;
      if (this.srcPath == "") {
        this.loadingFinished = false;
        this.loadError = false;
        setTimeout(() => {
          this.loadError = true;
          this.loadingFinished = true;
        }, 1e3);
        e.stopPropagation();
        return;
      }
      (_this$$refs$mask3 = this.$refs["mask"]) === null || _this$$refs$mask3 === void 0 || _this$$refs$mask3.style.setProperty("point-events", "none");
      this.loadingFinished = false;
      this.loadError = false;
      var tempPath = this.srcPath + "";
      this.srcPath = "";
      setTimeout(() => {
        this.srcPath = tempPath;
      }, 100);
      e.stopPropagation();
    },
    closePreviewImage() {
      uni.$emit("__UNIPREVIEWIMAGECLOSE");
    },
    // 计算transform-origin主要代码
    caculatorTransformOrigin(e) {
      var originalCenterX;
      var originalCenterY;
      if (e != null) {
        if (e.touches.length >= 2) {
          var point1 = e.touches[0];
          var point2 = e.touches[1];
          originalCenterX = (point1.clientX + point2.clientX) / 2;
          originalCenterY = (point1.clientY + point2.clientY) / 2;
          if (this.scaleSize * this.imageHeight < this.screenHeight) {
            originalCenterY = this.screenHeight / 2;
          }
          if (this.imageHeight > this.screenHeight && this.scaleSize >= 1) {
            originalCenterY = originalCenterY - this.imageTop / this.scaleSize;
          }
          var oldTransformOrigin = [this.transformOrigin[0], this.transformOrigin[1]];
          this.transformOrigin = [originalCenterX, originalCenterY];
          if (oldTransformOrigin[0] != 0 && oldTransformOrigin[1] != 1) {
            this.imageLeft = this.imageLeft + (this.scaleSize - 1) * (originalCenterX - oldTransformOrigin[0]);
            this.imageTop = this.imageTop + (this.scaleSize - 1) * (originalCenterY - oldTransformOrigin[1]);
          }
        } else if (e.type == "touchend") {
          if (this.inDoubleTapMode && this.scaleSize == 2 && this.lastSlideTouch != null && this.lastSlideTouch.length == 1) {
            originalCenterX = this.lastSlideTouch[0].clientX;
            originalCenterY = this.lastSlideTouch[0].clientY;
            if (this.scaleSize * this.imageHeight < this.screenHeight) {
              originalCenterY = this.screenHeight / 2;
            }
            if (this.imageHeight > this.screenHeight) {
              originalCenterY = originalCenterY - this.imageTop;
            }
            this.transformOrigin = [originalCenterX, originalCenterY];
            this.imageLeft = this.imageLeft + (this.scaleSize - 1) * (originalCenterX - this.transformOrigin[0]);
            this.imageTop = this.imageTop + (this.scaleSize - 1) * (originalCenterY - this.transformOrigin[1]);
          }
        }
      }
    }
  }
};
const _style_0$2 = {
  "uni-preview-image-item": {
    "": {
      "width": "100%",
      "height": "100%",
      "transitionProperty": "transform",
      "transitionDuration": "0ms"
    }
  },
  "uni-preview-image-patch": {
    "": {
      "width": "100%",
      "height": "100%",
      "backgroundColor": "rgba(0,0,0,0)",
      "position": "absolute"
    }
  },
  "uni-preview-image-loading": {
    "": {
      "position": "absolute",
      "top": 0,
      "bottom": 0,
      "left": 0,
      "right": 0,
      "pointerEvents": "none"
    }
  },
  "uni-preview-image-item-background": {
    "": {
      "backgroundColor": "#000000"
    }
  },
  "uni-preview-image-tips-retry": {
    "": {
      "color": "#0000FF",
      "fontSize": 18,
      "marginTop": 16,
      "WebkitTextDecorationLine": "underline",
      "textDecorationLine": "underline"
    }
  },
  "uni-preview-image-tips-error": {
    "": {
      "fontSize": 18,
      "color": "#FF0000"
    }
  },
  "@TRANSITION": {
    "uni-preview-image-item": {
      "property": "transform",
      "duration": "0ms"
    }
  }
};
var _hoisted_1$2 = {
  style: {
    "flex": "1"
  },
  class: "uni-preview-image-item-background"
};
var _hoisted_2$2 = ["mode", "src"];
var _hoisted_3$2 = {
  key: 0,
  class: "uni-preview-image-loading"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loadingCircle = resolveComponent("loadingCircle");
  return openBlock(), createElementBlock("view", _hoisted_1$2, [createElementVNode("image", {
    ref: "imageView",
    mode: $data.imageMode,
    class: "uni-preview-image-item",
    src: $data.srcPath,
    onError: _cache[0] || (_cache[0] = function() {
      return $options.previewImageError && $options.previewImageError(...arguments);
    }),
    onLoad: _cache[1] || (_cache[1] = function() {
      return $options.onImageLoad && $options.onImageLoad(...arguments);
    })
  }, null, 40, _hoisted_2$2), createElementVNode("view", {
    ref: "mask",
    class: "uni-preview-image-patch",
    onTouchstart: _cache[2] || (_cache[2] = function() {
      return $options.onstart && $options.onstart(...arguments);
    }),
    onTouchmove: _cache[3] || (_cache[3] = function() {
      return $options.onmove && $options.onmove(...arguments);
    }),
    onTouchend: _cache[4] || (_cache[4] = function() {
      return $options.onend && $options.onend(...arguments);
    }),
    onTouchcancel: _cache[5] || (_cache[5] = function() {
      return $options.oncancel && $options.oncancel(...arguments);
    })
  }, null, 544), !$data.loadingFinished ? (openBlock(), createElementBlock("view", _hoisted_3$2, [createVNode(_component_loadingCircle, {
    style: {
      "margin": "auto"
    },
    speed: 16,
    size: 54,
    color: "#d3d3d3"
  })])) : createCommentVNode("", true), $data.loadError ? (openBlock(), createElementBlock("view", {
    key: 1,
    style: {
      "align-items": "center",
      "justify-content": "center",
      "position": "absolute",
      "top": "0",
      "bottom": "0",
      "left": "0",
      "right": "0"
    },
    onClick: _cache[7] || (_cache[7] = function() {
      return $options.closePreviewImage && $options.closePreviewImage(...arguments);
    })
  }, [createElementVNode("image", {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMAf/kN/BOp7IxPBsMz9NzMRi0h4L7Q5pFjnhfVmIN3WUo6W6NUPrVtJ0yhcR84ApfrAAADTElEQVR42u3b3XaiMBSG4V1CABFBhFr/f1q1Tmf2/d/eHJoYrNJvu1a6Vp7zzrwthAAJFARBEARBEARBEPxmqtiuk3bZTJmnzbJN1ttC0SNeSJ76k71yhyrbqbs9LF4zG8Z8U9TO1Pc9wkG7JOI7Rh/jb3pkg96X/JBqcKtHNGhW8sOW284eyaD9K/cyrN0ewSA9577iTDk9YkGDlH+gOVo9ckH5G/9MvHF7mGCTin/spK978KAiZUA5sXvwoPGIO8XVfDM4TxZEi0k92HzdGoTTwuzBg7ZR5//yNlDOQDysUu4wOlo9DPbE7Ihuzg354RSzI2a5oHHk/sLZgr5xnrs/IhdUjNyrnb47KJOnBU3SrvngvnH5nKC8Ylv0iVxJ8aDrf7Us6GGHVD5owLZW9TrcpXSQTtmS5NTLohIOmrNlRX2pRjRoz5aEenth0SB7ampzrAcPmtnjS4E9eJA1RqIC7MGD3tn0ifbgQUtrvkB78KCddcBqtAcPStiQoT14kIrM+x8t28PomM/gHjxoaJ5BC7QHD1IxX3zAPXjQHzaM4R48KDOfd8R7GJtX38R7GDuFBnAPHlTwRazFexiaWCvywNoImpMHzIlsQx4YWue0B8xRX5MHGiNoQh5IjSBNHoiMoJw84F2Qd4fMu5Pau2Hv3YXRu6nDu8nVu9sP5wYNpmNz4MK3sLiD9dQA3+TjVnxxIvgxCDflixeSfVCEX+4cCX2Ulr2wpUT4ywbQv8i+sOGvY0AZO6MWfWEF0SPziOX4UecMHfPOVQR/6QmoYzacyQC/FoYHCLdkwV+c97dh045M+NJCf3UE/KnhxReXbhi46qPLU668ZeAMghfwXAkDo1V+iZO+2LImBL4InCdsKXMC4MvkumVLfCQAvpGgKNm2IQC81YI+I7adCABvRqmHfKXRBAC36+gs4ivpmQDYhqbFeuT+yJ4AyJYvOnZtJo6AORXZFKfGqyl3GDn5z942qCf14O/qNeZOKXS85DdWNjUB5LeetppA+OZc4AHh6duXkdNZfoM3rxQBxLfAV8j0Lv+RQHkggPxnFDMCSH9oEid7Akh/inOaaQKIfqwUV28HRTD8c660aYYf6/e9oiAIgiAIgiAIguAX+w9i21DdU9TtnwAAAABJRU5ErkJggg==",
    onClick: _cache[6] || (_cache[6] = function() {
      return $options.reloadImage && $options.reloadImage(...arguments);
    }),
    mode: "aspectFit",
    style: {
      "width": "70px",
      "height": "70px"
    }
  })])) : createCommentVNode("", true)]);
}
const uniPreviewImageItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["styles", [_style_0$2]]]);
const _sfc_main$1 = {
  components: {
    uniPreviewImageItem
  },
  data() {
    return {
      urls: null,
      current: 0,
      loop: false,
      disableTouch: false,
      numberIndicator: "",
      indicator: "number",
      longPressAction: null,
      tips: null
    };
  },
  onLoad() {
    uni.$once("__onPreviewLoadCallback", this.__onPreviewLoadCallback);
    uni.$emit("__onPreviewLoad", null);
    uni.$on("__UNIPREVIEWIMAGE", this.setDisableTouch);
    uni.$on("__UNIPREVIEWIMAGECLOSE", this.closePreviewPage);
    uni.$on("__CLOSEPREVIEWIMAGE", () => {
      this.closePreviewPage();
    });
  },
  onReady() {
    var _this$$refs$numberInd, _this$$refs$defaultIn;
    var windowInfo = uni.getWindowInfo();
    (_this$$refs$numberInd = this.$refs["numberIndicator"]) === null || _this$$refs$numberInd === void 0 || _this$$refs$numberInd.style.setProperty("top", windowInfo.statusBarHeight + 8 + "px");
    (_this$$refs$defaultIn = this.$refs["defaultIndicator"]) === null || _this$$refs$defaultIn === void 0 || _this$$refs$defaultIn.style.setProperty("bottom", windowInfo.screenHeight - windowInfo.safeArea.bottom + 8 + "px");
  },
  onUnload() {
    uni.$off("__UNIPREVIEWIMAGE");
    uni.$off("__UNIPREVIEWIMAGECLOSE");
    uni.$off("__UNIPREVIEWLONGPRESS");
    uni.$off("__CLOSEPREVIEWIMAGE");
  },
  onBackPress(options) {
    return false;
  },
  methods: {
    __onPreviewLoadCallback(result) {
      this.urls = result["urls"];
      if (result["current"] != null) {
        var c = result["current"];
        if (typeof c == "number") {
          var d = c;
          if (d < 0 || d > this.urls.length)
            d = 0;
          this.current = d;
        } else if (typeof c == "string") {
          var index2 = this.urls.indexOf(c);
          if (index2 < 0) {
            index2 = 0;
          }
          this.current = index2;
        }
      }
      if (result["indicator"] != null) {
        this.indicator = result["indicator"];
      }
      if (result["longPressActions"] != null) {
        this.longPressAction = {
          itemList: result["longPressActions"]["itemList"],
          itemColor: result["longPressActions"]["itemColor"]
        };
      }
      if (result["loop"] != null) {
        this.loop = result["loop"];
      }
      this.numberIndicator = this.current + 1 + " / " + this.urls.length;
    },
    onPreviewImageChanged(e) {
      var _this$urls;
      this.numberIndicator = e.detail.current + 1 + " / " + ((_this$urls = this.urls) === null || _this$urls === void 0 ? void 0 : _this$urls.length);
      this.current = e.detail.current;
    },
    setDisableTouch(isDisable) {
    },
    closePreviewPage() {
      uni.closeDialogPage({
        dialogPage: this.$page,
        animationType: "fade-out"
      });
    }
  }
};
const _style_0$1 = {
  "uni-preview-image-default-indicator": {
    "": {
      "width": 9,
      "height": 9,
      "borderTopStyle": "solid",
      "borderRightStyle": "solid",
      "borderBottomStyle": "solid",
      "borderLeftStyle": "solid",
      "borderTopLeftRadius": 9,
      "borderTopRightRadius": 9,
      "borderBottomRightRadius": 9,
      "borderBottomLeftRadius": 9,
      "marginTop": 2,
      "marginRight": 3,
      "marginBottom": 2,
      "marginLeft": 3,
      "borderTopWidth": 0.1,
      "borderRightWidth": 0.1,
      "borderBottomWidth": 0.1,
      "borderLeftWidth": 0.1,
      "borderTopColor": "#AAAAAA",
      "borderRightColor": "#AAAAAA",
      "borderBottomColor": "#AAAAAA",
      "borderLeftColor": "#AAAAAA"
    }
  },
  "uni-preview-image-default-indicator-default": {
    "": {
      "backgroundColor": "#AAAAAA"
    }
  },
  "uni-preview-image-default-indicator-active": {
    "": {
      "backgroundColor": "#ffffff"
    }
  },
  "uni-preview-image-default-indicator-layout": {
    "": {
      "flexDirection": "row",
      "position": "absolute",
      "bottom": 0,
      "left": 0,
      "right": 0,
      "justifyContent": "center"
    }
  },
  "uni-preview-image-number-indicator-layout": {
    "": {
      "position": "absolute",
      "left": 0,
      "right": 0
    }
  },
  "uni-preview-image-number-indicator": {
    "": {
      "color": "#FFFFFF",
      "fontSize": 16,
      "marginTop": "auto",
      "marginRight": "auto",
      "marginBottom": "auto",
      "marginLeft": "auto",
      "paddingTop": 8,
      "paddingRight": 20,
      "paddingBottom": 8,
      "paddingLeft": 20,
      "backgroundColor": "rgba(0,0,0,0.3)",
      "lineHeight": 1,
      "borderTopStyle": "solid",
      "borderRightStyle": "solid",
      "borderBottomStyle": "solid",
      "borderLeftStyle": "solid",
      "borderTopWidth": 0,
      "borderRightWidth": 0,
      "borderBottomWidth": 0,
      "borderLeftWidth": 0,
      "borderTopLeftRadius": 32,
      "borderTopRightRadius": 32,
      "borderBottomRightRadius": 32,
      "borderBottomLeftRadius": 32
    }
  }
};
var _hoisted_1$1 = ["circular", "current", "disable-touch"];
var _hoisted_2$1 = {
  key: 0,
  ref: "numberIndicator",
  class: "uni-preview-image-number-indicator-layout"
};
var _hoisted_3$1 = {
  class: "uni-preview-image-number-indicator"
};
var _hoisted_4$1 = {
  key: 1,
  ref: "defaultIndicator",
  class: "uni-preview-image-default-indicator-layout"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_uniPreviewImageItem = resolveComponent("uniPreviewImageItem");
  return openBlock(), createElementBlock(Fragment, null, [createElementVNode("swiper", {
    style: {
      "flex": "1",
      "background-color": "black"
    },
    "indicator-dots": false,
    circular: $data.loop,
    current: $data.current,
    onChange: _cache[0] || (_cache[0] = function() {
      return $options.onPreviewImageChanged && $options.onPreviewImageChanged(...arguments);
    }),
    "disable-touch": $data.disableTouch
  }, [$data.urls != null ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList($data.urls, (item, index2) => {
    return openBlock(), createElementBlock("swiper-item", null, [createVNode(_component_uniPreviewImageItem, {
      index: index2,
      src: item,
      longPressAction: $data.longPressAction,
      tips: $data.tips
    }, null, 8, ["index", "src", "longPressAction", "tips"])]);
  }), 256)) : createCommentVNode("", true)], 40, _hoisted_1$1), $data.indicator == "number" ? (openBlock(), createElementBlock("view", _hoisted_2$1, [createElementVNode("text", _hoisted_3$1, toDisplayString($data.numberIndicator), 1)], 512)) : createCommentVNode("", true), $data.indicator == "default" ? withDirectives((openBlock(), createElementBlock("view", _hoisted_4$1, [(openBlock(true), createElementBlock(Fragment, null, renderList($data.urls.length, (i) => {
    return openBlock(), createElementBlock("view", {
      class: normalizeClass(["uni-preview-image-default-indicator", $data.current + 1 == i ? "uni-preview-image-default-indicator-active" : "uni-preview-image-default-indicator-default"])
    }, null, 2);
  }), 256))], 512)), [[vShow, $data.urls != null]]) : createCommentVNode("", true)], 64);
}
const UniPreviewImagePage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["styles", [_style_0$1]]]);
const _sfc_main = {
  data() {
    return {
      show: false,
      readyEventName: "",
      optionsEventName: "",
      cancelEventName: "",
      selectorChangeEventName: "",
      multiSelectorChangeEventName: "",
      timeChangeEventName: "",
      columnChangeEventName: "",
      headerText: "",
      mode: "selector",
      disabled: false,
      range: [],
      rangeKey: "",
      value: [],
      eventValue: [],
      time: [],
      prevMultiValue: [],
      selected: {
        year: (/* @__PURE__ */ new Date()).getFullYear(),
        month: (/* @__PURE__ */ new Date()).getMonth() + 1,
        day: (/* @__PURE__ */ new Date()).getDate()
      },
      years: [],
      months: Array.from({
        length: 12
      }, (_, i) => i + 1),
      days: [],
      hours: [],
      minutes: [],
      fields: "day",
      start: [],
      end: [],
      yearRange: [],
      monthRange: [],
      dayRange: [],
      timer: 0,
      // 主题模式
      theme: "light",
      maskTopStyle: "background-image: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255, 255, 255, 0));",
      maskBottomStyle: "background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255, 255, 255, 1));",
      i18nText: {
        // 国际化
        "en": {
          "cancel": "Cancel",
          "confirm": "OK",
          "year": "",
          "month": "",
          "day": "",
          "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
        },
        "es": {
          "cancel": "Cancelar",
          "confirm": "Aceptar",
          "year": "",
          "month": "",
          "day": "",
          "months": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        },
        "fr": {
          "cancel": "Annuler",
          "confirm": "Valider",
          "year": "",
          "month": "",
          "day": "",
          "months": ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"]
        },
        "zh-Hans": {
          "cancel": "取消",
          "confirm": "确定",
          "year": "年",
          "month": "月",
          "day": "日",
          "months": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        },
        "zh-Hant": {
          "cancel": "取消",
          "confirm": "確定",
          "year": "年",
          "month": "月",
          "day": "日",
          "months": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
        }
      },
      language: "zh-Hans"
    };
  },
  onLoad(options) {
    this.readyEventName = options["readyEventName"];
    this.optionsEventName = options["optionsEventName"];
    this.cancelEventName = options["cancelEventName"];
    this.selectorChangeEventName = options["selectorChangeEventName"];
    this.multiSelectorChangeEventName = options["multiSelectorChangeEventName"];
    this.timeChangeEventName = options["timeChangeEventName"];
    this.columnChangeEventName = options["columnChangeEventName"];
    uni.$on(this.optionsEventName, (data) => {
      if (data["headerText"] != null) {
        this.headerText = data["headerText"];
      }
      if (data["mode"] != null) {
        this.mode = data["mode"];
      }
      if (data["range"] != null) {
        this.range = data["range"];
      }
      if (data["rangeKey"] != null) {
        this.rangeKey = data["rangeKey"];
      }
      if (data["selectorValue"] != null) {
        this.value = [data["selectorValue"]];
      }
      if (data["multiSelectorValue"] != null) {
        var multiSelectorValue = data["multiSelectorValue"];
        var len = this.range.length;
        var arr = Array.from({
          length: len
        }, () => 0);
        arr.forEach((_, index2) => {
          var _multiSelectorValue$i;
          var val = (_multiSelectorValue$i = multiSelectorValue[index2]) !== null && _multiSelectorValue$i !== void 0 ? _multiSelectorValue$i : 0;
          this.value.push(val);
        });
        this.prevMultiValue = this.value.slice();
      }
      if (data["timeValue"] != null) {
        var time = data["timeValue"];
        this.start = data["start"];
        this.end = data["end"];
        this.updateTimeColumns();
        this.value = this.initTimeValue(time);
      }
      if (data["dateValue"] != null) {
        var _data$start, _data$end, _parseInt, _parseInt2, _parseInt3;
        var dateValue = data["dateValue"];
        var year = dateValue[0];
        var month = dateValue[1];
        var day = dateValue[2];
        this.fields = data["fields"];
        this.start = (_data$start = data["start"]) !== null && _data$start !== void 0 ? _data$start : ["1970", "01", "01"];
        this.end = (_data$end = data["end"]) !== null && _data$end !== void 0 ? _data$end : ["2099", "12", "31"];
        this.selected = {
          year: (_parseInt = parseInt(year)) !== null && _parseInt !== void 0 ? _parseInt : (/* @__PURE__ */ new Date()).getFullYear(),
          month: (_parseInt2 = parseInt(month)) !== null && _parseInt2 !== void 0 ? _parseInt2 : 1,
          day: (_parseInt3 = parseInt(day)) !== null && _parseInt3 !== void 0 ? _parseInt3 : 1
        };
        this.selected.year = Math.max(parseInt(this.start[0]), Math.min(parseInt(this.end[0]), this.selected.year));
        this.selected.month = Math.max(1, Math.min(12, this.selected.month));
        this.selected.day = Math.max(1, Math.min(new Date(this.selected.year, this.selected.month, 0).getDate(), this.selected.day));
        this.updateDateColumns();
        var yIdx = this.years.findIndex((y) => y == this.selected.year);
        var mIdx = this.months.findIndex((m) => m == this.selected.month);
        var dIdx = this.days.findIndex((d) => d == this.selected.day);
        switch (this.fields) {
          case "year":
            this.value = [yIdx];
            break;
          case "month":
            this.value = [yIdx, mIdx];
            break;
          case "day":
            this.value = [yIdx, mIdx, dIdx];
            break;
        }
      }
      this.eventValue = this.value;
      this.calculateRanges();
    });
    uni.$emit(this.readyEventName);
    var systemInfo = uni.getDeviceInfo();
    var appBaseInfo = uni.getAppBaseInfo();
    var appLanguage = appBaseInfo.appLanguage;
    var osLanguage = systemInfo.osLanguage;
    if (appLanguage != null) {
      this.language = appLanguage;
    } else if (osLanguage != null) {
      this.language = osLanguage;
    }
    var osTheme = systemInfo.osTheme;
    if (osTheme != null) {
      this.theme = osTheme;
    }
    if (this.theme == "light") {
      this.maskTopStyle = "background-image: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255, 255, 255, 0));";
      this.maskBottomStyle = "background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255, 255, 255, 1));";
    } else {
      this.maskTopStyle = "background-image: linear-gradient(to bottom, rgba(44, 44, 43, 1), rgba(44, 44, 43, 0));";
      this.maskBottomStyle = "background-image: linear-gradient(to bottom, rgba(44, 44, 43, 0), rgba(44, 44, 43, 1));";
    }
  },
  computed: {
    selectedDate() {
      var {
        year,
        month,
        day
      } = this.selected;
      if (this.fields == "year") {
        return "".concat(year);
      }
      if (this.fields == "month") {
        return "".concat(year, "-").concat(this.formatSingle(month));
      }
      if (this.fields == "day") {
        return "".concat(year, "-").concat(this.formatSingle(month), "-").concat(this.formatSingle(day));
      }
      return "".concat(year, "-").concat(this.formatSingle(month), "-").concat(this.formatSingle(day));
    },
    year_str() {
      var years = [];
      this.years.forEach((v) => {
        years.push(this.formatSingle(v) + "年");
      });
      return years.join("\n");
    },
    month_str() {
      var months = [];
      this.months.forEach((v) => {
        months.push(this.formatSingle(v) + "月");
      });
      return months.join("\n");
    },
    day_str() {
      var days = [];
      this.days.forEach((v) => {
        days.push(this.formatSingle(v) + "日");
      });
      return days.join("\n");
    },
    indicatorStyle() {
      var basestyle = "height:50px;background:rgba(255,255,255,0);";
      var color = "#F5F5F5";
      if (this.theme == "dark") {
        color = "#3B3B3B";
      }
      return basestyle + "border-top:1px ".concat(color, " solid;border-bottom:1px ").concat(color, " solid;");
    },
    // 取消文字
    cancelText() {
      return this.i18nHandle("cancel", "取消");
    },
    confirmText() {
      return this.i18nHandle("confirm", "确定");
    },
    yearText() {
      return this.i18nHandle("year", "年");
    },
    monthText() {
      return this.i18nHandle("month", "月");
    },
    dayText() {
      return this.i18nHandle("day", "日");
    },
    monthsText() {
      var months = this.months;
      var i18months = this.i18nHandle("months", this.i18nText["zh-Hans"]["months"]);
      var arr = [];
      months.forEach((v) => {
        var index2 = v - 1;
        arr.push(i18months[index2].toString().padStart(2, "0"));
      });
      return arr;
    }
  },
  onReady() {
    setTimeout(() => {
      this.show = true;
    }, 10);
  },
  onResize() {
  },
  onUnload() {
    uni.$off(this.optionsEventName, null);
    uni.$off(this.cancelEventName, null);
  },
  methods: {
    /**
     * picker确定事件
     */
    confirm() {
      var value = this.eventValue;
      var mode = this.mode;
      switch (mode) {
        case "selector":
          uni.$emit(this.selectorChangeEventName, value[0]);
          break;
        case "multiSelector":
          uni.$emit(this.multiSelectorChangeEventName, value);
          break;
        case "time":
          var h = this.hours[value[0]];
          var m = this.minutes[value[1]];
          uni.$emit(this.timeChangeEventName, "".concat(h, ":").concat(m));
          break;
        case "date":
          uni.$emit(this.timeChangeEventName, this.selectedDate);
          break;
      }
      this.closeDialog();
    },
    /**
     * picker关闭
     */
    close() {
      uni.$emit(this.cancelEventName);
      this.closeDialog();
    },
    closeDialog() {
      this.show = false;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        var dialogPages = this.$page;
        uni.closeDialogPage({
          dialogPage: dialogPages
        });
      }, 300);
    },
    /**
     * 处理列滚动
     */
    handleChange(e) {
      var value = e.detail.value;
      if (this.mode == "date") {
        var _value$, _value$2;
        var yIdx = value[0];
        var mIdx = (_value$ = value[1]) !== null && _value$ !== void 0 ? _value$ : 0;
        var dIdx = (_value$2 = value[2]) !== null && _value$2 !== void 0 ? _value$2 : 0;
        yIdx = Math.max(this.yearRange[0], Math.min(this.yearRange[1], yIdx));
        var currentYear = this.years[yIdx];
        var sy = parseInt(this.start[0]);
        var sm = parseInt(this.start[1]);
        var ey = parseInt(this.end[0]);
        var em = parseInt(this.end[1]);
        if (currentYear == sy || currentYear == ey) {
          var newMonths = this.getMonths(currentYear);
          if (this.months.length !== newMonths.length) {
            this.calculateRanges();
            var originalMonth = this.months[mIdx];
            mIdx = newMonths.findIndex((month) => month === originalMonth);
            mIdx = Math.max(0, mIdx);
            this.months = newMonths;
          }
        } else {
          if (this.months.length != 12) {
            var nowMonth = this.months[mIdx];
            this.months = this.getMonths(currentYear);
            this.calculateRanges();
            mIdx = nowMonth - 1;
          }
        }
        var months = this.months[mIdx];
        if (currentYear == sy && months == sm || currentYear == ey && months == em) {
          var newDays = this.getDays(currentYear, months);
          if (this.days.length != newDays.length) {
            this.calculateRanges();
            var dayIdx = newDays.length - 1;
            if (currentYear == sy && months == sm) {
              dIdx = Math.max(0, dIdx - dayIdx);
            }
            if (currentYear == ey && months == em) {
              dIdx = Math.max(0, dayIdx);
            }
            this.days = newDays;
          }
        } else {
          var nowDay = this.days[dIdx];
          this.days = this.getDays(currentYear, months);
          this.calculateRanges();
          dIdx = this.days.findIndex((day) => day === nowDay);
          dIdx = Math.max(0, dIdx);
        }
        this.value = [yIdx, mIdx, dIdx];
        this.selected.year = this.years[yIdx];
        this.selected.month = this.months[mIdx];
        this.selected.day = this.days[dIdx];
        this.eventValue = [...this.value];
      } else if (this.mode == "time") {
        var h_idx = value[0];
        var m_idx = value[1];
        var h = parseInt(this.hours[h_idx]);
        var m = parseInt(this.minutes[m_idx]);
        var sh = parseInt(this.start[0]);
        var eh = parseInt(this.end[0]);
        var adjusted = this.adjustTime(h, m);
        h = adjusted.h;
        m = adjusted.m;
        var hStr = h.toString().padStart(2, "0");
        var mStr = m.toString().padStart(2, "0");
        var newHIdx = this.hours.findIndex((e2) => e2 == hStr);
        var newMIdx = this.minutes.findIndex((e2) => e2 == mStr);
        if (h == sh || h == eh) {
          var newMinutes = this.getMinutes(h);
          if (this.minutes.length !== newMinutes.length) {
            var originalMinute = this.minutes[newMIdx];
            newMIdx = newMinutes.findIndex((m2) => m2 === originalMinute);
            newMIdx = Math.max(0, newMIdx);
            this.minutes = newMinutes;
          }
        } else {
          if (this.minutes.length != 60) {
            var nowMinutes = this.minutes[newMIdx];
            this.minutes = this.getMinutes(h);
            newMIdx = parseInt(nowMinutes);
          }
        }
        if (newHIdx != h_idx || newMIdx != m_idx) {
          this.value = [newHIdx, newMIdx];
          this.eventValue = this.value.slice();
        } else {
          this.eventValue = value;
        }
      } else if (this.mode == "multiSelector") {
        var newValue = value;
        var oldValue = this.prevMultiValue;
        newValue.forEach((val, column) => {
          if (oldValue[column] !== val) {
            uni.$emit(this.columnChangeEventName, column, val);
          }
        });
        this.prevMultiValue = [...newValue];
        this.eventValue = [...newValue];
      } else {
        this.eventValue = value;
      }
    },
    /**
     * 计算范围的方法
     */
    calculateRanges() {
      var startYear = parseInt(this.start[0]);
      var endYear = parseInt(this.end[0]);
      this.yearRange = [this.years.findIndex((y) => y >= startYear), this.years.findIndex((y) => y >= endYear)];
      var startMonth = parseInt(this.start[1]);
      var endMonth = parseInt(this.end[1]);
      this.monthRange = [startMonth - 1, endMonth - 1];
      var startDay = parseInt(this.start[2]);
      var endDay = parseInt(this.end[2]);
      this.dayRange = [startDay - 1, endDay - 1];
    },
    /**
     * 生成动态年份范围（根据 start/end）
     */
    getYears() {
      var startYear = parseInt(this.start[0] || "1970");
      var endYear = parseInt(this.end[0] || "2099");
      return Array.from({
        length: endYear - startYear + 1
      }, (_, i) => startYear + i);
    },
    /**
     * 生成动态月份范围（根据当前年份和 start/end）
     */
    getMonths(year) {
      var startMonth = 1;
      var endMonth = 12;
      if (year == parseInt(this.start[0])) {
        var _parseInt4;
        startMonth = (_parseInt4 = parseInt(this.start[1])) !== null && _parseInt4 !== void 0 ? _parseInt4 : 1;
      }
      if (year == parseInt(this.end[0])) {
        var _parseInt5;
        endMonth = (_parseInt5 = parseInt(this.end[1])) !== null && _parseInt5 !== void 0 ? _parseInt5 : 12;
      }
      return Array.from({
        length: endMonth - startMonth + 1
      }, (_, i) => startMonth + i);
    },
    /**
     * 生成动态日期范围（根据当前年月和 start/end）
     */
    getDays(currentYear, currentMonth) {
      var startDay = 1;
      var endDay = new Date(currentYear, currentMonth, 0).getDate();
      if (currentYear == parseInt(this.start[0]) && currentMonth == parseInt(this.start[1])) {
        startDay = parseInt(this.start[2]) || 1;
      }
      if (currentYear == parseInt(this.end[0]) && currentMonth == parseInt(this.end[1])) {
        endDay = Math.min(endDay, parseInt(this.end[2]) || endDay);
      }
      return Array.from({
        length: endDay - startDay + 1
      }, (_, i) => startDay + i);
    },
    /**
     * 更新日期列 级联更新
     */
    updateDateColumns() {
      this.years = this.getYears();
      this.months = this.getMonths(this.selected.year);
      this.days = this.getDays(this.selected.year, this.selected.month);
    },
    // 日期合法性校验（核心）
    adjustDate(year, month, day) {
      var startDate = this.start.map(Number);
      var sy = startDate[0];
      var sm = startDate[1];
      var sd = startDate[2];
      var endDate = this.end.map(Number);
      var ey = endDate[0];
      var em = endDate[1];
      var ed = endDate[2];
      if (year < sy)
        return {
          year: sy,
          month: sm,
          day: sd
        };
      if (year > ey)
        return {
          year: ey,
          month: em,
          day: ed
        };
      if (year === sy && month < sm)
        return {
          year,
          month: sm,
          day: sd
        };
      if (year === ey && month > em)
        return {
          year,
          month: em,
          day: ed
        };
      var daysInMonth = new Date(year, month, 0).getDate();
      if (year === sy && month === sm && day < sd)
        return {
          year,
          month,
          day: sd
        };
      if (year === ey && month === em && day > ed)
        return {
          year,
          month,
          day: ed
        };
      day = Math.max(1, Math.min(day, daysInMonth));
      return {
        year,
        month,
        day
      };
    },
    getHours() {
      var sH = parseInt(this.start[0] || "1");
      var eH = parseInt(this.end[0] || "12");
      return Array.from({
        length: eH - sH + 1
      }, (_, i) => String(sH + i).padStart(2, "0"));
    },
    getMinutes(hour) {
      var startMinute = 0;
      var endMinute = 59;
      if (hour == parseInt(this.start[0])) {
        var _parseInt6;
        startMinute = (_parseInt6 = parseInt(this.start[1])) !== null && _parseInt6 !== void 0 ? _parseInt6 : 1;
      }
      if (hour == parseInt(this.end[0])) {
        var _parseInt7;
        endMinute = (_parseInt7 = parseInt(this.end[1])) !== null && _parseInt7 !== void 0 ? _parseInt7 : 12;
      }
      return Array.from({
        length: endMinute - startMinute + 1
      }, (_, i) => String(startMinute + i).padStart(2, "0"));
    },
    updateTimeColumns() {
      this.hours = this.getHours();
      var now = /* @__PURE__ */ new Date();
      var minutes = now.getHours();
      this.minutes = this.getMinutes(minutes);
    },
    /**
     * 调整时间到允许范围内
     */
    adjustTime(h, m) {
      var _this$start, _this$end;
      if (!((_this$start = this.start) !== null && _this$start !== void 0 && _this$start.length) || !((_this$end = this.end) !== null && _this$end !== void 0 && _this$end.length))
        return {
          h,
          m
        };
      var startHour = parseInt(this.start[0]);
      var startMinute = parseInt(this.start[1]);
      var endHour = parseInt(this.end[0]);
      var endMinute = parseInt(this.end[1]);
      var current = h * 60 + m;
      var startTotal = startHour * 60 + startMinute;
      var endTotal = endHour * 60 + endMinute;
      if (current < startTotal) {
        return {
          h: startHour,
          m: startMinute
        };
      } else if (current > endTotal) {
        return {
          h: endHour,
          m: endMinute
        };
      } else {
        if (h == startHour && m < startMinute)
          return {
            h,
            m: startMinute
          };
        if (h == endHour && m > endMinute)
          return {
            h,
            m: endMinute
          };
        return {
          h,
          m
        };
      }
    },
    /**
     * 初始化时处理默认时间
     */
    initTimeValue(time) {
      var h = parseInt(time[0]);
      var m = parseInt(time[1]);
      var adjusted = this.adjustTime(h, m);
      var hStr = adjusted.h.toString().padStart(2, "0");
      var mStr = adjusted.m.toString().padStart(2, "0");
      return [this.hours.findIndex((e) => e == hStr), this.minutes.findIndex((e) => e == mStr)];
    },
    /**
     * 更新当月天数
     */
    updateDays() {
      var daysInMonth = new Date(this.selected.year, this.selected.month, 0).getDate();
      this.days = Array.from({
        length: daysInMonth
      }, (_, i) => i + 1);
    },
    /**
     *  补零函数（1 → "01"）
     */
    formatSingle(num) {
      return num.toString().padStart(2, "0");
    },
    /**
     * i18n 处理
     */
    i18nHandle(key, defaultVal) {
      if (this.language.startsWith("en")) {
        return this.i18nText["en"][key];
      }
      if (this.language.startsWith("es")) {
        return this.i18nText["es"][key];
      }
      if (this.language.startsWith("fr")) {
        return this.i18nText["fr"][key];
      }
      if (this.language.startsWith("zh-Hans")) {
        return this.i18nText["zh-Hans"][key];
      }
      if (this.language.startsWith("zh-Hant")) {
        return this.i18nText["zh-Hant"][key];
      }
      return defaultVal;
    }
  }
};
const _style_0 = {
  "uni-picker__container": {
    "": {
      "flex": 1
    }
  },
  "uni-picer__mask": {
    "": {
      "flex": 1,
      "backgroundColor": "rgba(0,0,0,0.3)",
      "opacity": 0,
      "transitionProperty": "opacity",
      "transitionDuration": "0.3s"
    }
  },
  "picker__ani-show": {
    "": {
      "opacity": 1
    }
  },
  "uni-picker__inner-box": {
    "": {
      "position": "absolute",
      "bottom": 0,
      "left": 0,
      "right": 0,
      "height": 350,
      "transform": "translateY(100%)",
      "transitionProperty": "transform",
      "transitionDuration": "0.2s"
    },
    ".uni-picker-theme--light ": {
      "backgroundColor": "#ffffff"
    },
    ".uni-picker-theme--dark ": {
      "backgroundColor": "#2C2C2B"
    }
  },
  "picker__ani-box-show": {
    "": {
      "transform": "translateY(0%)"
    }
  },
  "uni-picker__header-btn": {
    "": {
      "display": "flex",
      "flexDirection": "row",
      "justifyContent": "space-between",
      "paddingTop": 15,
      "paddingRight": 15,
      "paddingBottom": 15,
      "paddingLeft": 15,
      "borderBottomWidth": 1,
      "borderBottomStyle": "solid",
      "borderBottomColor": "#f7f7f7"
    },
    ".uni-picker-theme--dark ": {
      "borderTopColor": "#3B3B3B",
      "borderRightColor": "#3B3B3B",
      "borderBottomColor": "#3B3B3B",
      "borderLeftColor": "#3B3B3B"
    }
  },
  "uni-picker__header-btn-cannel": {
    "": {
      "fontSize": 14,
      "backgroundColor": "rgba(0,0,0,0)"
    },
    ".uni-picker-theme--light ": {
      "color": "#000000"
    },
    ".uni-picker-theme--dark ": {
      "color": "#ffffff"
    }
  },
  "uni-picker__header-btn-ok": {
    "": {
      "fontSize": 14,
      "color": "#007aff"
    }
  },
  "uni-picker__view": {
    "": {
      "position": "relative",
      "flex": 1
    }
  },
  "uni-picker__inner-mask": {
    "": {
      "position": "absolute",
      "left": 0,
      "right": 0,
      "width": "100%",
      "height": "40%",
      "zIndex": 2,
      "pointerEvents": "none"
    }
  },
  "uni-picker__view-item": {
    "": {
      "width": "100%",
      "textAlign": "center",
      "height": 50,
      "lineHeight": "50px"
    },
    ".uni-picker-theme--dark ": {
      "color": "#ffffff"
    }
  },
  "picker-top": {
    ".uni-picker-theme--light ": {
      "top": 0,
      "backgroundImage": "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
      "backgroundColor": "rgba(0,0,0,0)"
    },
    ".uni-picker-theme--dark ": {
      "top": 0,
      "backgroundImage": "linear-gradient(to bottom, rgba(44, 44, 43, 1), rgba(0, 0, 0, 0))",
      "backgroundColor": "rgba(0,0,0,0)"
    }
  },
  "picker-bottom": {
    ".uni-picker-theme--light ": {
      "bottom": 0,
      "backgroundImage": "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
      "backgroundColor": "rgba(0,0,0,0)"
    },
    ".uni-picker-theme--dark ": {
      "bottom": 0,
      "backgroundImage": "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(44, 44, 43, 1))",
      "backgroundColor": "rgba(0,0,0,0)"
    }
  },
  "@TRANSITION": {
    "uni-picer__mask": {
      "property": "opacity",
      "duration": "0.3s"
    },
    "uni-picker__inner-box": {
      "property": "transform",
      "duration": "0.2s"
    }
  }
};
var _hoisted_1 = {
  class: "uni-picker__header-btn"
};
var _hoisted_2 = {
  class: "uni-picker__view"
};
var _hoisted_3 = ["mask-top-style", "mask-bottom-style", "indicatorStyle", "value"];
var _hoisted_4 = {
  key: 0
};
var _hoisted_5 = {
  key: 0,
  class: "uni-picker__view-item"
};
var _hoisted_6 = {
  key: 1,
  class: "uni-picker__view-item"
};
var _hoisted_7 = {
  key: 0,
  class: "uni-picker__view-item"
};
var _hoisted_8 = {
  key: 1,
  class: "uni-picker__view-item"
};
var _hoisted_9 = {
  key: 0
};
var _hoisted_10 = {
  key: 1
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: normalizeClass(["uni-picker__container", ["uni-picker-theme--" + $data.theme]])
  }, [createElementVNode("view", {
    class: normalizeClass(["uni-picer__mask", {
      "picker__ani-show": $data.show
    }]),
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.close && $options.close(...arguments);
    })
  }, null, 2), createElementVNode("view", {
    class: normalizeClass(["uni-picker__inner-box", {
      "picker__ani-box-show": $data.show
    }])
  }, [createElementVNode("view", _hoisted_1, [createElementVNode("text", {
    class: "uni-picker__header-btn-cannel",
    onClick: _cache[1] || (_cache[1] = function() {
      return $options.close && $options.close(...arguments);
    })
  }, toDisplayString($options.cancelText), 1), createElementVNode("text", {
    class: "uni-picker__header-btn-ok",
    onClick: _cache[2] || (_cache[2] = function() {
      return $options.confirm && $options.confirm(...arguments);
    })
  }, toDisplayString($options.confirmText), 1)]), createElementVNode("view", _hoisted_2, [createElementVNode("picker-view", {
    style: {
      "flex": "1"
    },
    onChange: _cache[3] || (_cache[3] = function() {
      return $options.handleChange && $options.handleChange(...arguments);
    }),
    "mask-top-style": $data.maskTopStyle,
    "mask-bottom-style": $data.maskBottomStyle,
    indicatorStyle: $options.indicatorStyle,
    value: $data.value
  }, [$data.mode == "selector" ? (openBlock(), createElementBlock("picker-view-column", _hoisted_4, [(openBlock(true), createElementBlock(Fragment, null, renderList($data.range, (item, selectorIdx) => {
    return openBlock(), createElementBlock(Fragment, {
      key: selectorIdx
    }, [$data.rangeKey ? (openBlock(), createElementBlock("text", _hoisted_5, toDisplayString(item[$data.rangeKey]), 1)) : (openBlock(), createElementBlock("text", _hoisted_6, toDisplayString(item), 1))], 64);
  }), 128))])) : createCommentVNode("", true), $data.mode == "multiSelector" ? (openBlock(true), createElementBlock(Fragment, {
    key: 1
  }, renderList($data.range, (item, multiIdx) => {
    return openBlock(), createElementBlock("picker-view-column", {
      key: multiIdx
    }, [(openBlock(true), createElementBlock(Fragment, null, renderList(item, (column, colIdx) => {
      return openBlock(), createElementBlock(Fragment, {
        key: colIdx
      }, [$data.rangeKey ? (openBlock(), createElementBlock("text", _hoisted_7, toDisplayString(column[$data.rangeKey]), 1)) : (openBlock(), createElementBlock("text", _hoisted_8, toDisplayString(column), 1))], 64);
    }), 128))]);
  }), 128)) : createCommentVNode("", true), $data.mode == "time" ? (openBlock(), createElementBlock(Fragment, {
    key: 2
  }, [createElementVNode("picker-view-column", null, [(openBlock(true), createElementBlock(Fragment, null, renderList($data.hours, (h, hIdx) => {
    return openBlock(), createElementBlock("text", {
      key: hIdx,
      class: "uni-picker__view-item"
    }, toDisplayString(h), 1);
  }), 128))]), createElementVNode("picker-view-column", null, [(openBlock(true), createElementBlock(Fragment, null, renderList($data.minutes, (m, mIdx) => {
    return openBlock(), createElementBlock("text", {
      key: mIdx,
      class: "uni-picker__view-item"
    }, toDisplayString(m), 1);
  }), 128))])], 64)) : createCommentVNode("", true), $data.mode == "date" ? (openBlock(), createElementBlock(Fragment, {
    key: 3
  }, [createElementVNode("picker-view-column", null, [(openBlock(true), createElementBlock(Fragment, null, renderList($data.years, (year) => {
    return openBlock(), createElementBlock("text", {
      key: year,
      class: "uni-picker__view-item"
    }, toDisplayString(year) + toDisplayString($options.yearText), 1);
  }), 128))]), $data.fields != "year" ? (openBlock(), createElementBlock("picker-view-column", _hoisted_9, [(openBlock(true), createElementBlock(Fragment, null, renderList($options.monthsText, (month) => {
    return openBlock(), createElementBlock("text", {
      key: month,
      class: "uni-picker__view-item"
    }, toDisplayString($options.formatSingle(month)) + toDisplayString($options.monthText), 1);
  }), 128))])) : createCommentVNode("", true), $data.fields == "day" ? (openBlock(), createElementBlock("picker-view-column", _hoisted_10, [(openBlock(true), createElementBlock(Fragment, null, renderList($data.days, (day) => {
    return openBlock(), createElementBlock("text", {
      key: day,
      class: "uni-picker__view-item"
    }, toDisplayString($options.formatSingle(day)) + toDisplayString($options.dayText), 1);
  }), 128))])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)], 40, _hoisted_3)])], 2)], 2);
}
const UniPickerPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
function registerSystemPages() {
  registerSystemRoute("uni:actionSheet", UniActionSheetPage, {
    disableSwipeBack: false
  });
  registerSystemRoute("uni:chooseLocation", UniChooseLocationPage, {
    disableSwipeBack: false
  });
  registerSystemRoute("uni:uniModal", UniUniModalPage, {
    disableSwipeBack: false
  });
  registerSystemRoute("uni:previewImage", UniPreviewImagePage, {
    disableSwipeBack: false
  });
  registerSystemRoute("uni:picker", UniPickerPage, {
    disableSwipeBack: false
  });
}
registerSystemPages();
export {
  definePage as __definePage,
  registerApp as __registerApp,
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
