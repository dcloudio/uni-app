import { createUniInstance } from './uni';

const ANI_DURATION = 300;
const ANI_SHOW = 'pop-in';

function showWebview (webview, animationType, animationDuration) {
  setTimeout(() => {
    webview.show(
      animationType || ANI_SHOW,
      animationDuration || ANI_DURATION,
      () => {
        console.log('show.callback');
      }
    );
  }, 50);
}

function initNavigateTo ({
  __registerPage
}) {
  return function navigateTo (path, {
    animationType,
    animationDuration
  }) {
    showWebview(
      __registerPage({
        path
      }),
      animationType,
      animationDuration
    );
  }
}

function initRedirectTo () {
  return function redirectTo (path) {

  }
}

let firstBackTime = 0;

function initNavigateBack ({
  plus,
  getCurrentPages
}) {
  return function navigateBack (delta, {
    animationType,
    animationDuration
  }) {
    const pages = getCurrentPages();
    const len = pages.length - 1;
    const page = pages[len];
    if (page.$meta.isQuit) {
      if (!firstBackTime) {
        firstBackTime = Date.now();
        plus.nativeUI.toast('再按一次退出应用');
        setTimeout(() => {
          firstBackTime = null;
        }, 2000);
      } else if (Date.now() - firstBackTime < 2000) {
        plus.runtime.quit();
      }
    } else {
      pages.splice(len, 1);
      if (animationType) {
        page.$getAppWebview().close(animationType, animationDuration || ANI_DURATION);
      } else {
        page.$getAppWebview().close('auto');
      }
    }
  }
}

function initSwitchTab (path) {
  return function switchTab () {

  }
}

function initReLaunch () {
  return function reLaunch (path) {

  }
}

function initRouter (instanceContext) {
  return {
    navigateTo: initNavigateTo(instanceContext),
    redirectTo: initRedirectTo(instanceContext),
    navigateBack: initNavigateBack(instanceContext),
    switchTab: initSwitchTab(instanceContext),
    reLaunch: initReLaunch(instanceContext)
  }
}

class Router {
  constructor (instanceContext) {
    this.router = initRouter(instanceContext);
  }

  push ({
    type,
    path,
    animationType,
    animationDuration
  } = {}) {
    this.router[type](path, {
      animationType,
      animationDuration
    });
  }

  go (delta, {
    animationType,
    animationDuration
  } = {}) {
    delta = Math.abs(parseInt(delta) || 1);
    this.router.navigateBack(delta, {
      animationType,
      animationDuration
    });
  }
}

let appCtx;

function getApp$1 () {
  return appCtx
}

function initListeners ({
  plus
}) {
  plus.key.addEventListener('backbutton', () => {
    appCtx.$router.go(-1);
  });
}

function registerApp (appVm, instanceContext) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerApp`);
  }
  appCtx = appVm;
  appCtx.$router = new Router(instanceContext);
  initListeners(instanceContext);
}

const WEBVIEW_LISTENERS = [
  'close',
  'resize',
  'popGesture',
  'pullToRefresh',
  'titleNViewSearchInputChanged',
  'titleNViewSearchInputConfirmed',
  'titleNViewSearchInputClicked'
];

let id = 1;

function parseWebviewStyle (path, windowOptions = {}) {
  return {
    titleNView: {
      autoBackButton: true,
      titleText: 'titleText'
    },
    uniNView: {
      path
    }
  }
}

function parseWindowOptions (windowOptions = {}, globalWindowOptions = {}) {
  // TODO
  return windowOptions
}

function createWebview (path, {
  plus,
  __uniConfig
}, windowOptions) {
  return plus.webview.create(
    '',
    String(id++),
    parseWebviewStyle(
      path,
      parseWindowOptions(windowOptions, __uniConfig.window)
    ))
}

function initWebview (webview, {
  UniJSServiceBridge
}) {
  // TODO subNVues
  WEBVIEW_LISTENERS.forEach(listener => {
    webview.addEventListener(listener, (e) => {
      UniJSServiceBridge.emit(listener, e);
    });
  });
}

const pages = [];

function getCurrentPages$1 () {
  return pages
}
/**
 * @param {Object} pageVm
 *
 * page.beforeCreate 时添加 page
 * page.beforeDestroy 时移出 page
 *
 * page.viewappear  onShow
 * page.viewdisappear onHide
 *
 * navigateTo
 * redirectTo
 *
 *
 *
 *
 *
 *
 */
/**
 * 首页需要主动registerPage，二级页面路由跳转时registerPage
 */
function registerPage ({
  path,
  webview
}, instanceContext) {
  const routeOptions = instanceContext.__uniRoutes.find(route => route.path === path);

  if (!webview) {
    webview = createWebview(path, instanceContext, routeOptions.window);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerPage`, path, webview.id);
  }

  initWebview(webview, instanceContext, webview.id === '1' && routeOptions.window);

  pages.push({
    route: path.slice(1),
    $getAppWebview () {
      return webview
    },
    $meta: routeOptions.meta
  });

  return webview
}

const uniConfig = Object.create(null);
const uniRoutes = [];

function parseRoutes (config) {
  uniRoutes.length = 0;
  /* eslint-disable no-mixed-operators */
  const tabBarList = (config.tabBar && config.tabBar.list || []).map(item => item.pagePath);

  Object.keys(config.page).forEach(function (pagePath) {
    const isTabBar = tabBarList.indexOf(pagePath) !== -1;
    const isQuit = isTabBar || (config.pages[0] === pagePath);
    uniRoutes.push({
      path: '/' + pagePath,
      meta: {
        isQuit,
        isTabBar
      }
    });
  });
}

function registerConfig (config) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerConfig`);
  }
  Object.assign(uniConfig, config);
  parseRoutes(uniConfig);
}

function callHook (vm, hook, params) {
  return (vm.$vm || vm).__call_hook(hook, params)
}

function callAppHook (vm, hook, params) {
  if (hook !== 'onError') {
    console.debug(`App：${hook} have been invoked` + (params ? ` ${JSON.stringify(params)}` : ''));
  }
  return (vm.$vm || vm).__call_hook(hook, params)
}

function callPageHook (vm, hook, params) {
  // hack 一下，H5 平台通知 View 层onShow，方便 View 层来切换 scroll 事件监听
  if (__PLATFORM__ === 'h5') {
    if (hook === 'onLoad') {
      vm.$mp.query = params;
      UniServiceJSBridge.publishHandler('onPageLoad', vm, vm.$page.id);
    }
    if (hook === 'onShow') {
      if (
        vm.$route.meta.isTabBar &&
        vm.$route.params.detail
      ) {
        UniServiceJSBridge.emit('onTabItemTap', vm.$route.params.detail);
      }
      UniServiceJSBridge.publishHandler('onPageShow', vm, vm.$page.id);
    }
  }
  if (hook !== 'onPageScroll') {
    console.debug(`${vm.$page.route}[${vm.$page.id}]：${hook} have been invoked`);
  }
  return callHook(vm, hook, params)
}

function onError (err) {
  callAppHook(getApp(), 'onError', err);
}

function onPageNotFound (page) {
  callAppHook(getApp(), 'onPageNotFound', page);
}

function onPullDownRefresh (args, pageId) {
  const page = getCurrentPages().find(page => page.$page.id === pageId);
  if (page) {
    callPageHook(page, 'onPullDownRefresh');
  }
}

function callCurrentPageHook (hook, args) {
  const pages = getCurrentPages();
  if (pages.length) {
    callPageHook(pages[pages.length - 1], hook, args);
  }
}

function createCallCurrentPageHook (hook) {
  return function (args) {
    callCurrentPageHook(hook, args);
  }
}

function onAppEnterBackground () {
  callAppHook(getApp(), 'onHide');
  callCurrentPageHook('onHide');
}

function onAppEnterForeground () {
  callAppHook(getApp(), 'onShow');
  callCurrentPageHook('onShow');
}

function onWebInvokeAppService ({
  name,
  arg
}, pageId) {
  if (name === 'postMessage') ; else {
    uni[name](arg);
  }
}

function initOn (on) {
  on('onError', onError);
  on('onPageNotFound', onPageNotFound);

  on('onAppEnterBackground', onAppEnterBackground);
  on('onAppEnterForeground', onAppEnterForeground);

  on('onPullDownRefresh', onPullDownRefresh);

  on('onTabItemTap', createCallCurrentPageHook('onTabItemTap'));
  on('onNavigationBarButtonTap', createCallCurrentPageHook('onNavigationBarButtonTap'));

  on('onNavigationBarSearchInputChanged', createCallCurrentPageHook('onNavigationBarSearchInputChanged'));
  on('onNavigationBarSearchInputConfirmed', createCallCurrentPageHook('onNavigationBarSearchInputConfirmed'));
  on('onNavigationBarSearchInputClicked', createCallCurrentPageHook('onNavigationBarSearchInputClicked'));

  on('onWebInvokeAppService', onWebInvokeAppService);
}

function initServiceJSBridge (Vue) {
  const Emitter = new Vue();

  const bridge = {
    on: Emitter.$on.bind(Emitter),
    off: Emitter.$off.bind(Emitter),
    once: Emitter.$once.bind(Emitter),
    emit: Emitter.$emit.bind(Emitter)
  };

  initOn(bridge.on);

  return bridge
}

function createInstanceContext (instanceContext) {
  const {
    weex,
    Vue,
    WeexPlus
  } = instanceContext;
  const plus = new WeexPlus(weex);
  const UniJSServiceBridge = initServiceJSBridge(Vue);
  return {
    __uniConfig: uniConfig,
    __uniRoutes: uniRoutes,
    __registerConfig (config) {
      return registerConfig(config, instanceContext)
    },
    __registerApp (appVm) {
      return registerApp(appVm, instanceContext)
    },
    __registerPage (page) {
      return registerPage(page, instanceContext)
    },
    plus,
    uni: createUniInstance(
      weex,
      plus,
      uniConfig,
      uniRoutes,
      getApp$1,
      getCurrentPages$1
    ),
    getApp: getApp$1,
    getCurrentPages: getCurrentPages$1,
    UniJSServiceBridge
  }
}

export { createInstanceContext };
