import { normalizeStyles as normalizeStyles$1, addLeadingSlash, invokeArrayFns, ON_HIDE, ON_SHOW, parseQuery, EventChannel, once, parseUrl, ON_UNLOAD, ON_READY, ON_PAGE_SCROLL, ON_PULL_DOWN_REFRESH, ON_REACH_BOTTOM, ON_RESIZE, ON_LAUNCH, ON_ERROR, Emitter, ON_UNHANDLE_REJECTION, ON_PAGE_NOT_FOUND, removeLeadingSlash, getLen, ON_BACK_PRESS } from "@dcloudio/uni-shared";
import { extend, isString, isPlainObject, isFunction as isFunction$1, isArray, isPromise, hasOwn, invokeArrayFns as invokeArrayFns$1, remove, capitalize, toTypeString, toRawType, parseStringStyle } from "@vue/shared";
import { createVNode, render, onMounted, onBeforeUnmount, getCurrentInstance, injectHook, defineComponent, warn, isInSSRComponentSetup, ref, watchEffect, watch, computed, camelize, onUnmounted, reactive, provide, inject, nextTick, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, toDisplayString, withDirectives, vModelText, createCommentVNode, Fragment, renderList } from "vue";
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
  if (parentPage && parentPage !== currentPage)
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
  invokeHook(currentPage.vm, lifeCycle);
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
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, fn, extend(args, {
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
function setupXPage(instance, pageInstance, pageVm, pageId, pagePath) {
  instance.$dialogPages = [];
  var uniPage;
  if (pageInstance.openType === OPEN_DIALOG_PAGE) {
    var currentPage = getCurrentPage();
    if (pagePath.startsWith(SYSTEM_DIALOG_PAGE_PATH_STARTER)) {
      var systemDialogPages = currentPage.vm.$systemDialogPages;
      uniPage = systemDialogPages[systemDialogPages.length - 1];
    } else {
      uniPage = getCurrentNormalDialogPage();
      setCurrentNormalDialogPage(null);
    }
    uniPage.getElementById = (id2) => {
      var _pageVm$$el;
      var currentPage2 = getCurrentPage();
      if (currentPage2 !== uniPage.getParentPage()) {
        return null;
      }
      var containerNode = (_pageVm$$el = pageVm.$el) === null || _pageVm$$el === void 0 ? void 0 : _pageVm$$el._parent;
      if (containerNode == null) {
        console.warn("bodyNode is null");
        return null;
      }
      return containerNode.querySelector("#".concat(id2));
    };
  } else {
    uniPage = new UniNormalPageImpl();
    uniPage.getElementById = (id2) => {
      var _pageVm$$el2;
      var currentPage2 = getCurrentPage();
      if (currentPage2 !== uniPage) {
        return null;
      }
      var bodyNode = (_pageVm$$el2 = pageVm.$el) === null || _pageVm$$el2 === void 0 ? void 0 : _pageVm$$el2.parentNode;
      if (bodyNode == null) {
        console.warn("bodyNode is null");
        return null;
      }
      return bodyNode.querySelector("#".concat(id2));
    };
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
  uniPage.vm = pageVm;
  uniPage.$vm = pageVm;
  uniPage.getParentPage = () => {
    var parentPage = uniPage.getParentPageByJS();
    return parentPage || null;
  };
  uniPage.getPageStyle = () => {
    var pageStyle = uniPage.getPageStyleByJS();
    return new UTSJSONObject(pageStyle);
  };
  uniPage.$getPageStyle = () => {
    return uniPage.getPageStyle();
  };
  uniPage.setPageStyle = (styles2) => {
    uniPage.setPageStyleByJS(styles2);
  };
  uniPage.$setPageStyle = (styles2) => {
    uniPage.setPageStyle(styles2);
  };
  uniPage.getAndroidView = () => null;
  uniPage.getIOSView = () => null;
  uniPage.getHTMLElement = () => null;
  if (getPage$BasePage(pageVm).openType !== OPEN_DIALOG_PAGE) {
    addCurrentPageWithInitScope(pageId, pageVm, pageInstance);
  }
  onMounted(() => {
    var _pageVm$$el3;
    var rootElement = (_pageVm$$el3 = pageVm.$el) === null || _pageVm$$el3 === void 0 ? void 0 : _pageVm$$el3._parent;
    if (rootElement) {
      rootElement._page = pageVm.$page;
    }
    if (getPage$BasePage(pageVm).openType === OPEN_DIALOG_PAGE) {
      dialogPageTriggerParentHide(uniPage);
    }
  });
  onBeforeUnmount(() => {
    var _pageVm$$el4;
    var rootElement = (_pageVm$$el4 = pageVm.$el) === null || _pageVm$$el4 === void 0 ? void 0 : _pageVm$$el4._parent;
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
  pagesMap.set(pagePath, once(createFactory(asyncComponent)));
}
function createFactory(component) {
  return () => {
    if (isVuePageAsyncComponent(component)) {
      return component().then((component2) => setupPage(component2));
    }
    return setupPage(component);
  };
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
    console.warn("监听 OS 主题变化", e);
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
  var nativePage2 = getPageManager().createPage(url, id2.toString(), pageStyle);
  if (onCreated) {
    onCreated(nativePage2);
  }
  routeOptions.meta.id = parseInt(nativePage2.pageId);
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
    var page = createVuePage(id2, route, query, pageInstance, {}, nativePage2);
    var pages2 = getCurrentPages();
    if (pages2.length === 1) {
      if (homeDialogPages.length) {
        var homePage = pages2[0];
        homePage.vm.$.$dialogPages = homeDialogPages.map((dialogPage) => {
          dialogPage.getParentPage = () => homePage;
          return dialogPage;
        });
        homeDialogPages.length = 0;
      }
      if (homeSystemDialogPages.length) {
        var _homePage = pages2[0];
        _homePage.vm.$systemDialogPages = homeSystemDialogPages.map((dialogPage) => {
          dialogPage.getParentPage = () => _homePage;
          return dialogPage;
        });
        homeDialogPages.length = 0;
      }
    }
    nativePage2.addPageEventListener(ON_POP_GESTURE, function(e) {
      uni.navigateBack({
        from: "popGesture",
        fail(e2) {
          if (e2.errMsg.endsWith("cancel")) {
            nativePage2.show();
          }
        }
      });
    });
    nativePage2.addPageEventListener(ON_UNLOAD, (_) => {
      invokeHook(page, ON_UNLOAD);
    });
    nativePage2.addPageEventListener(ON_READY, (_) => {
      invokePageReadyHooks(page);
      invokeHook(page, ON_READY);
    });
    nativePage2.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
      invokeHook(page, ON_PAGE_SCROLL, {
        scrollTop: arg.scrollTop
      });
    });
    nativePage2.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
      invokeHook(page, ON_PULL_DOWN_REFRESH);
    });
    nativePage2.addPageEventListener(ON_REACH_BOTTOM, (_) => {
      invokeHook(page, ON_REACH_BOTTOM);
    });
    nativePage2.addPageEventListener(ON_RESIZE, (arg) => {
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
    nativePage2.startRender();
  }
  if (delay) {
    setTimeout(fn, delay);
  } else {
    fn();
  }
  return nativePage2;
}
function registerDialogPage(_ref2, dialogPage, onCreated) {
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
  pageStyle.set("navigationStyle", "custom");
  pageStyle.set("backgroundColorContent", "transparent");
  if (typeof pageStyle.get("disableSwipeBack") !== "boolean") {
    pageStyle.set("disableSwipeBack", true);
  }
  var parentPage = dialogPage.getParentPage();
  var nativePage2 = getPageManager().createDialogPage(
    // @ts-expect-error
    parentPage ? parentPage.__nativePageId : "",
    id2.toString(),
    url,
    pageStyle
  );
  if (onCreated) {
    onCreated(nativePage2);
  }
  routeOptions.meta.id = parseInt(nativePage2.pageId);
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
    var page = createVuePage(id2, route, query, pageInstance, {}, nativePage2);
    nativePage2.addPageEventListener(ON_POP_GESTURE, function(e) {
      closeDialogPage({
        dialogPage
      });
    });
    nativePage2.addPageEventListener(ON_UNLOAD, (_) => {
      invokeHook(page, ON_UNLOAD);
      dialogPageTriggerParentShow(dialogPage);
    });
    nativePage2.addPageEventListener(ON_READY, (_) => {
      invokePageReadyHooks(page);
      invokeHook(page, ON_READY);
    });
    nativePage2.addPageEventListener(ON_PAGE_SCROLL, (arg) => {
      invokeHook(page, ON_PAGE_SCROLL, arg);
    });
    nativePage2.addPageEventListener(ON_PULL_DOWN_REFRESH, (_) => {
      invokeHook(page, ON_PULL_DOWN_REFRESH);
    });
    nativePage2.addPageEventListener(ON_REACH_BOTTOM, (_) => {
      invokeHook(page, ON_REACH_BOTTOM);
    });
    nativePage2.addPageEventListener(ON_RESIZE, (arg) => {
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
    nativePage2.startRender();
  }
  if (delay) {
    setTimeout(fn, delay);
  } else {
    fn();
  }
  return nativePage2;
}
function createVuePage(__pageId, __pagePath, __pageQuery, __pageInstance, pageOptions, nativePage2) {
  var pageNode = nativePage2.document.body;
  var app = getVueApp();
  var component = pagesMap.get(__pagePath)();
  var mountPage = (component2) => app.mountPage(component2, {
    __pageId,
    __pagePath,
    __pageQuery,
    __pageInstance
  }, pageNode);
  if (isPromise(component)) {
    return component.then((component2) => mountPage(component2));
  }
  return mountPage(component);
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
function initGlobalEvent(app) {
  app.addKeyEventListener(ON_BACK_BUTTON, () => {
    backbuttonListener();
    return true;
  });
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
function initOn(app) {
  app.addEventListener(ON_SHOW, /* @__PURE__ */ function() {
    var _ref = _asyncToGenerator(function* (event) {
      var _getCurrentPage;
      var app2 = getNativeApp();
      var MAX_TIMEOUT = 200;
      function getNewIntent() {
        return new Promise((resolve, reject) => {
          var handleNewIntent = (newIntent) => {
            var _newIntent$appScheme, _newIntent$appLink;
            clearTimeout(timeout);
            app2.removeEventListener("onNewIntent", handleNewIntent);
            resolve({
              appScheme: (_newIntent$appScheme = newIntent.appScheme) !== null && _newIntent$appScheme !== void 0 ? _newIntent$appScheme : null,
              appLink: (_newIntent$appLink = newIntent.appLink) !== null && _newIntent$appLink !== void 0 ? _newIntent$appLink : null
            });
          };
          var timeout = setTimeout(() => {
            app2.removeEventListener("onNewIntent", handleNewIntent);
            var appLink = {
              appScheme: null,
              appLink: null
            };
            resolve(appLink);
          }, MAX_TIMEOUT);
          app2.addEventListener("onNewIntent", handleNewIntent);
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
}
function initService(app) {
  initOn(app);
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
var defaultApp = {
  globalData: {}
};
class UniAppImpl {
  get vm() {
    return appCtx;
  }
  get $vm() {
    return appCtx;
  }
  get globalData() {
    var _appCtx;
    return ((_appCtx = appCtx) === null || _appCtx === void 0 ? void 0 : _appCtx.globalData) || {};
  }
  getAndroidApplication() {
    return null;
  }
}
var $uniApp = new UniAppImpl();
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
function getApp$1() {
  return $uniApp;
}
function registerApp(appVm, nativeApp2) {
  initEntryPagePath(nativeApp2);
  setNativeApp(nativeApp2);
  initVueApp(appVm);
  appCtx = appVm;
  initAppVm(appCtx);
  extend(appCtx, defaultApp);
  defineGlobalData(appCtx, defaultApp.globalData);
  initService(nativeApp2);
  initGlobalEvent(nativeApp2);
  initAppLaunch(appVm);
  initAppError(appVm, nativeApp2);
  initSubscribeHandlers();
  __uniConfig.ready = true;
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
function setStatusBarStyle() {
  var page;
  {
    var currentPage = getCurrentPage();
    var dialogPages = currentPage === null || currentPage === void 0 ? void 0 : currentPage.getDialogPages();
    if (dialogPages !== null && dialogPages !== void 0 && dialogPages.length) {
      page = dialogPages[dialogPages.length - 1].vm;
    } else {
      page = currentPage.vm;
    }
  }
  if (page) {
    var nativePage2 = page.$nativePage;
    nativePage2.applyStatusBarStyle();
  }
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
  var systemDialogPages = page.$systemDialogPages || [];
  for (var _i = 0; _i < systemDialogPages.length; _i++) {
    closeNativeDialogPage(systemDialogPages[_i]);
  }
  page.$systemDialogPages = [];
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
function closeNativeDialogPage(dialogPage, animationType, animationDuration, callback) {
  var webview = getNativeApp().pageManager.findPageById(dialogPage.$vm.$basePage.id + "");
  if (webview) {
    closeWebview(webview, animationType || "none", animationDuration || 0, () => {
      setStatusBarStyle();
      callback === null || callback === void 0 || callback();
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
        parentDialogPages.splice(index2, 1);
        closeNativeDialogPage(dialogPage, (options === null || options === void 0 ? void 0 : options.animationType) || "none", (options === null || options === void 0 ? void 0 : options.animationDuration) || ANI_DURATION);
        if (index2 > 0 && index2 === parentDialogPages.length) {
          invokeHook(parentDialogPages[parentDialogPages.length - 1].$vm, ON_SHOW);
        }
      } else {
        triggerFailCallback$1(options, "dialogPage is not a valid page");
        return;
      }
    } else {
      var systemDialogPages = parentPage.vm.$systemDialogPages;
      var _index = systemDialogPages.indexOf(dialogPage);
      systemDialogPages.splice(_index, 1);
      closeNativeDialogPage(dialogPage);
      return;
    }
  } else {
    var dialogPages = currentPage.getDialogPages();
    for (var i = dialogPages.length - 1; i >= 0; i--) {
      closeNativeDialogPage(dialogPages[i], (options === null || options === void 0 ? void 0 : options.animationType) || "none", (options === null || options === void 0 ? void 0 : options.animationDuration) || ANI_DURATION);
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
  name.forEach((n) => eventBus.off(n, callback));
});
var $emit = /* @__PURE__ */ defineSyncApi(API_EMIT, function(name) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  eventBus.emit(name, ...args);
});
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
  return !!__uniConfig.realEntryPagePath && getRealPath(page.$basePage.route, true) === getRealPath(parseUrl(__uniConfig.entryPagePath).path, true);
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
  if (getPage$BasePage(page).meta.isQuit)
    ;
  else {
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
      invokeHook(dialogPages[i - 1].$vm, ON_SHOW);
    }
  }
  var systemDialogPages = currentPage.$systemDialogPages || [];
  for (var _i = 0; _i < systemDialogPages.length; _i++) {
    closeNativeDialogPage(systemDialogPages[_i]);
  }
  currentPage.$systemDialogPages = [];
  backPage(webview);
}
var openDialogPage = (options) => {
  var _options$success, _options$complete;
  var {
    url,
    animationType
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
      setCurrentNormalDialogPage(dialogPage);
    }
  } else {
    if (!parentPage) {
      homeSystemDialogPages.push(dialogPage);
      if (isSystemActionSheetDialogPage(dialogPage)) {
        closePreActionSheet(homeSystemDialogPages);
      }
    } else {
      if (!parentPage.vm.$systemDialogPages) {
        parentPage.vm.$systemDialogPages = [];
      }
      parentPage.vm.$systemDialogPages.push(dialogPage);
      if (isSystemActionSheetDialogPage(dialogPage)) {
        closePreActionSheet(parentPage.vm.$systemDialogPages);
      }
    }
  }
  var [aniType, aniDuration] = initAnimation(path, animationType);
  var noAnimation = aniType === "none" || aniDuration === 0;
  function callback(page2) {
    showWebview(page2, aniType, aniDuration, () => {
      beforeRoute();
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
function initAnimation(path, animationType) {
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
  return [_animationType, meta.animationDuration || globalStyle.animationDuration || ANI_DURATION];
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
  SANDBOX_PATH: "unifile://sandbox/"
};
var _PerformanceEntryStatus;
var APP_LAUNCH = "appLaunch";
var PERFORMANCE_BUFFER_SIZE = 30;
var ENTRY_TYPE_RENDER = "render";
var ENTRY_TYPE_NAVIGATION = "navigation";
var RENDER_TYPE_FIRST_LAYOUT = "firstLayout";
var RENDER_TYPE_FIRST_RENDER = "firstRender";
var AppStartDuration = 1;
var PageFirstPageRenderDuration = 7;
var PageFirstPageLayoutDuration = 8;
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
      this._entryData.duration = nativePage.getDuration(innerPage.pageId, PageFirstPageLayoutDuration);
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
      this._entryData.duration = nativePage.getDuration(innerPage.pageId, PageFirstPageRenderDuration);
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
        this._entryData.duration += nativePage.getDuration(AppStartDuration);
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
    keepAlive = methodName.indexOf("on") === 0 && methodParams.length === 1 && methodParams[0].type === "UTSCallback";
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
  var define = pluginDefines[name];
  if (!define) {
    console.error("".concat(name, " is not found"));
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
const uni$1 = /* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $emit,
  $off,
  $on,
  $once,
  __log__,
  addInterceptor,
  closeDialogPage,
  closeNativeDialogPage,
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
class UniCheckboxElement extends UniElementImpl {
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
}
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
var createHook = (lifecycle) => function(hook) {
  var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstance();
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
var onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
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
    onUnload(() => {
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
class UniCheckboxGroupElement extends UniFormControlElement {
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
}
class UniCheckboxGroupChangeEventDetail {
  constructor(value) {
    this.value = value;
  }
}
class UniCheckboxGroupChangeEvent extends UniCustomEvent {
  constructor(value) {
    super("change", {
      detail: new UniCheckboxGroupChangeEventDetail(value)
    });
  }
}
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
class UniRadioElement extends UniElementImpl {
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
}
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
    onUnmounted(() => {
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
class UniRadioGroupElement extends UniFormControlElement {
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
}
class UniRadioGroupChangeEventDetail {
  constructor(value) {
    this.value = value;
  }
}
class UniRadioGroupChangeEvent extends UniCustomEvent {
  constructor(value) {
    super("change", {
      detail: new UniRadioGroupChangeEventDetail(value)
    });
  }
}
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
class UniNavigatorElement extends UniElementImpl {
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
}
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
class UniProgressActiveendEvent extends UniCustomEvent {
  constructor(value) {
    super("activeend", {
      detail: new UniProgressActiveendEventDetail(value)
    });
  }
}
class UniProgressElement extends UniElementImpl {
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
}
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
    onUnmounted(() => {
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
class UniPickerViewColumnElement extends UniElementImpl {
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
}
class UniPickerViewChangeEventDetail {
  constructor(value) {
    this.value = value;
  }
}
class UniPickerViewChangeEvent extends UniCustomEvent {
  constructor(value) {
    super("change", {
      detail: new UniPickerViewChangeEventDetail(value)
    });
  }
}
class UniPickerViewElement extends UniElementImpl {
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
}
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
    onUnmounted(() => {
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
const components = /* @__PURE__ */ Object.defineProperty({
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
var defaultPoi = {
  latitude: 39.908823,
  longitude: 116.39747
};
var languageData = {
  "en": {
    "back": "cancel",
    "ok": "ok",
    "cancel": "cancel",
    "loading": "loading...",
    "locationLoading": "positioning...",
    "search": "Search location",
    "current-location": "current location"
  },
  "zh-Hans": {
    "back": "取消",
    "ok": "确定",
    "cancel": "取消",
    "loading": "请求中...",
    "locationLoading": "获取定位中...",
    "search": "搜索地点",
    "current-location": "当前位置"
  },
  "zh-Hant": {
    "back": "取消",
    "ok": "確定",
    "cancel": "取消",
    "loading": "請求中...",
    "locationLoading": "獲取定位中...",
    "search": "蒐索地點",
    "current-location": "當前位置"
  }
};
var loadingPath = "data:image/gif;base64,R0lGODlhLAEsAaIFAMPDw/j4+J2dneHh4aWlpf///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjIxOTdCRjQ2MEQ2MTFFRUI1NjJFQzJFRDFFNUYwODYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjIxOTdCRjU2MEQ2MTFFRUI1NjJFQzJFRDFFNUYwODYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMzMzNjFGRjYwRDMxMUVFQjU2MkVDMkVEMUU1RjA4NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMzMzNjIwMDYwRDMxMUVFQjU2MkVDMkVEMUU1RjA4NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV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";
const _sfc_main = {
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
      loadingPath,
      mapHeight: 350
    };
  },
  onLoad(options) {
    this.checkUniCloud();
    this.initPageOptions(options);
    this.getSystemInfo();
    this.getLocation();
  },
  onReady() {
  },
  onUnload() {
    uni.$off(this.optionsEventName, null);
    uni.$off(this.readyEventName, null);
    uni.$off(this.successEventName, null);
    uni.$off(this.failEventName, null);
    __uniappx__nativeEventBus.off(this.optionsEventName, null);
    __uniappx__nativeEventBus.off(this.readyEventName, null);
    __uniappx__nativeEventBus.off(this.successEventName, null);
    __uniappx__nativeEventBus.off(this.failEventName, null);
  },
  onResize() {
    this.getSystemInfo();
  },
  methods: {
    checkUniCloud() {
      if (typeof uniCloud == "undefined") {
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
            if (this.selected == -1) {
              this.selected = 0;
              this.lastPoi.latitude = this.latitude;
              this.lastPoi.longitude = this.longitude;
              this.lastPoi.selected = this.selected;
              this.lastPoi.pois = this.pois;
            }
          }
          this.searchLoading = false;
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
const _style_0 = {
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
      "borderRadius": 20,
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
      "borderRadius": 5
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
      "borderRadius": 5
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
      "borderRadius": 5,
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
      "borderRadius": 5,
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
      "width": 30,
      "height": 30
    }
  },
  "@FONT-FACE": [{
    "fontFamily": "UniChooseLocationFontFamily",
    "src": "url('data:font/ttf;charset=utf-8;base64,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') format('truetype')"
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
var _hoisted_1 = ["id"];
var _hoisted_2 = {
  class: "uni-choose-location-icons uni-choose-location-map-target-icon"
};
var _hoisted_3 = {
  class: "uni-choose-location-icons uni-choose-location-map-reset-icon"
};
var _hoisted_4 = {
  class: "uni-choose-location-nav-text uni-choose-location-nav-confirm-text"
};
var _hoisted_5 = {
  class: "uni-choose-location-poi-search"
};
var _hoisted_6 = {
  class: "uni-choose-location-poi-search-box"
};
var _hoisted_7 = {
  class: "uni-choose-location-icons uni-choose-location-search-icon"
};
var _hoisted_8 = ["placeholder"];
var _hoisted_9 = ["id", "scroll-top"];
var _hoisted_10 = {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
  }, [createElementVNode("text", _hoisted_2, toDisplayString($data.icon.target), 1)], 8, _hoisted_1), createElementVNode("view", {
    class: normalizeClass(["uni-choose-location-map-reset", [$options.landscapeClassCom]]),
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.mapReset && $options.mapReset(...arguments);
    }),
    style: normalizeStyle($options.resetStyleCom)
  }, [createElementVNode("text", _hoisted_3, toDisplayString($data.icon.position), 1)], 6)], 6), createElementVNode("view", {
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
  }, toDisplayString($options.languageCom["back"]), 1)], 6), createElementVNode("view", {
    class: normalizeClass(["uni-choose-location-nav-btn uni-choose-location-nav-confirm-btn", [$options.landscapeClassCom, $data.selected < 0 && !$data.callUniMapCoErr ? "disable" : "active"]]),
    style: normalizeStyle($data.safeArea.top > 0 ? "top: " + $data.safeArea.top + "px;" : ""),
    onClick: _cache[2] || (_cache[2] = function() {
      return $options.confirm && $options.confirm(...arguments);
    })
  }, [createElementVNode("text", _hoisted_4, toDisplayString($options.languageCom["ok"]), 1)], 6)], 4), $data.useUniCloud ? (openBlock(), createElementBlock("view", {
    key: 0,
    class: normalizeClass(["uni-choose-location-poi", [$options.landscapeClassCom]]),
    style: normalizeStyle($options.poiBoxStyleCom)
  }, [createElementVNode("view", _hoisted_5, [createElementVNode("view", _hoisted_6, [createElementVNode("text", _hoisted_7, toDisplayString($data.icon.search), 1), withDirectives(createElementVNode("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.searchValue = $event),
    type: "text",
    placeholder: $options.languageCom["search"],
    class: "uni-choose-location-poi-search-input uni-choose-location-icons",
    onFocus: _cache[4] || (_cache[4] = ($event) => $data.isFocus = true),
    onConfirm: _cache[5] || (_cache[5] = ($event) => $options.poiSearch("poiSearch")),
    onInput: _cache[6] || (_cache[6] = function() {
      return $options.searchValueChange && $options.searchValueChange(...arguments);
    })
  }, null, 40, _hoisted_8), [[vModelText, $data.searchValue]])]), $data.isFocus || $data.searchValue != "" ? (openBlock(), createElementBlock("text", {
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
  }, [$data.errMsg != "" ? (openBlock(), createElementBlock("view", _hoisted_10, [createElementVNode("text", _hoisted_11, toDisplayString($data.errMsg), 1)])) : $data.locationLoading ? (openBlock(), createElementBlock("view", _hoisted_12, [createElementVNode("text", _hoisted_13, toDisplayString($options.languageCom["locationLoading"]), 1)])) : $data.searchLoading && $data.pageIndex == 1 ? (openBlock(), createElementBlock("view", _hoisted_14, [createElementVNode("image", {
    src: $data.loadingPath,
    class: "uni-choose-location-poi-search-loading-image",
    mode: "widthFix"
  }, null, 8, _hoisted_15)])) : (openBlock(true), createElementBlock(Fragment, {
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
    mode: "widthFix"
  }, null, 8, _hoisted_22)])) : createCommentVNode("", true)], 40, _hoisted_9)], 6)) : createCommentVNode("", true)], 2);
}
const UniChooseLocationPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
registerSystemRoute("uni:chooseLocation", UniChooseLocationPage, {
  disableSwipeBack: false
});
const index = {
  uni: uni$1,
  getApp: getApp$1,
  getCurrentPages: getCurrentPages$1,
  __definePage: definePage,
  __registerApp: registerApp,
  __uniSystemRoutes: systemRoutes,
  initApp,
  components
};
export {
  index as default
};
