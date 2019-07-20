import { createUniInstance } from './uni';

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
  if (hook !== 'onPageScroll') {
    console.debug(`${vm.$page.route}[${vm.$page.id}]：${hook} have been invoked`);
  }
  return callHook(vm, hook, params)
}

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

let firstBackTime = 0;

function navigateBack ({
  delta,
  animationType,
  animationDuration
}, {
  plus,
  getCurrentPages
}, callback) {
  const pages = getCurrentPages();
  const len = pages.length - 1;
  const page = pages[len];
  if (page.$page.meta.isQuit) {
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
    callback && callback();
  }
}

function navigateTo ({
  path,
  animationType,
  animationDuration
}, {
  __registerPage
}) {
  showWebview(
    __registerPage({
      path
    }),
    animationType,
    animationDuration
  );
}

function reLaunch ({
  path
}, instanceContext) {}

function redirectTo ({
  path
}, instanceContext) {}

function switchTab ({
  path
}, instanceContext) {}

const route = {
  navigateBack,
  navigateTo,
  reLaunch,
  redirectTo,
  switchTab
};

class Router {
  constructor (instanceContext) {
    this.instanceContext = instanceContext;
    this.$emit = instanceContext.UniServiceJSBridge.emit;
  }

  push ({
    type,
    path,
    animationType,
    animationDuration
  } = {}) {
    this.$emit('onAppRoute', {
      type,
      path
    });

    route[type]({
      path,
      animationType,
      animationDuration
    }, this.instanceContext);
  }

  go (delta, {
    animationType,
    animationDuration
  } = {}) {
    delta = Math.abs(parseInt(delta) || 1);
    route.navigateBack({
      delta,
      animationType,
      animationDuration
    }, this.instanceContext, () => {
      this.$emit('onAppRoute', {
        type: 'navigateBack'
      });
    });
  }
}

let appCtx;

const NETWORK_TYPES = [
  'unknown',
  'none',
  'ethernet',
  'wifi',
  '2g',
  '3g',
  '4g'
];

function getApp () {
  return appCtx
}

function initGlobalListeners ({
  plus,
  UniServiceJSBridge
}) {
  const emit = UniServiceJSBridge.emit;

  plus.key.addEventListener('backbutton', () => {
    appCtx.$router.go(-1);
  });

  plus.globalEvent.addEventListener('pause', () => {
    emit('onAppEnterBackground');
  });

  plus.globalEvent.addEventListener('resume', () => {
    emit('onAppEnterForeground');
  });

  plus.globalEvent.addEventListener('netchange', () => {
    const networkType = NETWORK_TYPES[plus.networkinfo.getCurrentType()];
    emit('onNetworkStatusChange', {
      isConnected: networkType !== 'none',
      networkType
    });
  });
}

function initAppLaunch (appVm, {
  __uniConfig
}) {
  const args = {
    path: __uniConfig.entryPagePath,
    query: {},
    scene: 1001
  };

  callAppHook(appVm, 'onLaunch', args);
  callAppHook(appVm, 'onShow', args);
}

function registerApp (appVm, instanceContext) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerApp`);
  }

  appCtx = appVm;

  appCtx.$router = new Router(instanceContext);

  initAppLaunch(appVm, instanceContext);

  initGlobalListeners(instanceContext);
}

const _toString = Object.prototype.toString;

function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function parseTitleNView (routeOptions) {
  const windowOptions = routeOptions.window;
  const titleNView = windowOptions.titleNView;
  if ( // 无头
    titleNView === false ||
    titleNView === 'false' ||
    (
      windowOptions.navigationStyle === 'custom' &&
      !isPlainObject(titleNView)
    )
  ) {
    return false
  }

  const ret = {
    autoBackButton: !routeOptions.meta.isQuit,
    backgroundColor: windowOptions.navigationBarBackgroundColor || '#000000',
    titleText: windowOptions.navigationBarTitleText || '',
    titleColor: windowOptions.navigationBarTextStyle === 'black' ? '#000000' : '#ffffff'
  };

  if (isPlainObject(titleNView)) {
    return Object.assign(ret, titleNView)
  }

  return ret
}

function parsePullToRefresh (routeOptions, {
  plus
}) {
  const windowOptions = routeOptions.window;

  if (windowOptions.enablePullDownRefresh) {
    const pullToRefreshStyles = Object.create(null);
    // 初始化默认值
    if (plus.os.name === 'Android') {
      Object.assign(pullToRefreshStyles, {
        support: true,
        style: 'circle'
      });
    } else {
      Object.assign(pullToRefreshStyles, {
        support: true,
        style: 'default',
        height: '50px',
        range: '200px',
        contentdown: {
          caption: ''
        },
        contentover: {
          caption: ''
        },
        contentrefresh: {
          caption: ''
        }
      });
    }

    if (windowOptions.backgroundTextStyle) {
      pullToRefreshStyles.color = windowOptions.backgroundTextStyle;
      pullToRefreshStyles.snowColor = windowOptions.backgroundTextStyle;
    }

    Object.assign(pullToRefreshStyles, windowOptions.pullToRefresh || {});

    return pullToRefreshStyles
  }
}

const WEBVIEW_STYLE_BLACKLIST = [
  'navigationBarBackgroundColor',
  'navigationBarTextStyle',
  'navigationBarTitleText',
  'navigationBarShadow',
  'navigationStyle',
  'disableScroll',
  'backgroundColor',
  'backgroundTextStyle',
  'enablePullDownRefresh',
  'onReachBottomDistance',
  'usingComponents',
  // 需要解析的
  'titleNView',
  'pullToRefresh'
];

function parseWebviewStyle (id, path, routeOptions = {}, instanceContext) {
  const {
    __uniConfig
  } = instanceContext;

  const webviewStyle = Object.create(null);

  // 合并
  const windowOptions = Object.assign(
    JSON.parse(JSON.stringify(__uniConfig.window || {})),
    routeOptions.window || {}
  );

  Object.keys(windowOptions).forEach(name => {
    if (WEBVIEW_STYLE_BLACKLIST.indexOf(name) === -1) {
      webviewStyle[name] = windowOptions[name];
    }
  });

  const titleNView = parseTitleNView(routeOptions);
  if (titleNView) {
    if (id === 1 && __uniConfig.realEntryPagePath === path) {
      titleNView.autoBackButton = true;
    }
    webviewStyle.titleNView = titleNView;
  }

  const pullToRefresh = parsePullToRefresh(routeOptions, instanceContext);
  if (pullToRefresh) {
    if (pullToRefresh.style === 'circle') {
      webviewStyle.bounce = 'none';
    }
    webviewStyle.pullToRefresh = pullToRefresh;
  }

  // 不支持 hide
  if (webviewStyle.popGesture === 'hide') {
    delete webviewStyle.popGesture;
  }

  // TODO 下拉刷新

  if (path && routeOptions.meta.isNVue) {
    webviewStyle.uniNView = {
      path,
      defaultFontSize: __uniConfig.defaultFontSize,
      viewport: __uniConfig.viewport
    };
  }

  return webviewStyle
}

function parseNavigationBar (webviewStyle) {
  let titleText = '';
  let textColor = '';
  let backgroundColor = '';
  const titleNView = webviewStyle.titleNView;
  if (titleNView) {
    titleText = titleNView.titleText || '';
    textColor = titleNView.textColor || '';
    backgroundColor = titleNView.backgroundColor || '';
  }
  return {
    titleText,
    textColor,
    backgroundColor
  }
}

let id = 2;

const WEBVIEW_LISTENERS = {
  'pullToRefresh': 'onPullDownRefresh',
  'titleNViewSearchInputChanged': 'onNavigationBarSearchInputChanged',
  'titleNViewSearchInputConfirmed': 'onNavigationBarSearchInputConfirmed',
  'titleNViewSearchInputClicked': 'onNavigationBarSearchInputClicked'
};

function createWebview (path, instanceContext, routeOptions) {
  const webviewId = id++;
  const webviewStyle = parseWebviewStyle(
    webviewId,
    path,
    routeOptions,
    instanceContext
  );
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] createWebview`, webviewId, path, webviewStyle);
  }
  const webview = instanceContext.plus.webview.create('', String(webviewId), webviewStyle);

  webview.$navigationBar = parseNavigationBar(webviewStyle);

  return webview
}

function initWebview (webview, instanceContext, routeOptions) {
  if (isPlainObject(routeOptions)) {
    const webviewStyle = parseWebviewStyle(
      parseInt(webview.id),
      '',
      routeOptions,
      instanceContext
    );
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[uni-app] updateWebview`, webviewStyle);
    }

    webview.$navigationBar = parseNavigationBar(webviewStyle);

    webview.setStyle(webviewStyle);
  }

  const {
    on,
    emit
  } = instanceContext.UniServiceJSBridge;

  // TODO subNVues
  Object.keys(WEBVIEW_LISTENERS).forEach(name => {
    webview.addEventListener(name, (e) => {
      emit(WEBVIEW_LISTENERS[name], e, parseInt(webview.id));
    });
  });

  // TODO 应该结束之前未完成的下拉刷新
  on(webview.id + '.startPullDownRefresh', () => {
    webview.beginPullToRefresh();
  });

  on(webview.id + '.stopPullDownRefresh', () => {
    webview.endPullToRefresh();
  });

  return webview
}

function createHolder (webview, {
  navigationBar
}, {
  Vue
}) {
  const navigationBarState = Vue.observable(navigationBar);

  /* eslint-disable no-new */
  new Vue({
    created () {
      this.$watch(() => navigationBarState.titleText, (val, oldVal) => {
        webview.setStyle({
          titleNView: {
            titleText: val || ''
          }
        });
      });
      this.$watch(() => [navigationBarState.textColor, navigationBarState.backgroundColor], (val) => {
        webview.setStyle({
          titleNView: {
            titleColor: val[0],
            backgroundColor: val[1]
          }
        });
      });
    }
  });

  return {
    navigationBar: navigationBarState
  }
}

const pages = [];

function getCurrentPages () {
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
  const routeOptions = JSON.parse(JSON.stringify(instanceContext.__uniRoutes.find(route => route.path === path)));

  if (!webview) {
    webview = createWebview(path, instanceContext, routeOptions);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerPage`, path, webview.id);
  }

  initWebview(webview, instanceContext, webview.id === '1' && routeOptions);

  const route = path.slice(1);
  pages.push({
    route,
    $getAppWebview () {
      return webview
    },
    $page: {
      id: parseInt(webview.id),
      meta: routeOptions.meta,
      path,
      route
    },
    $holder: createHolder(webview, {
      navigationBar: webview.$navigationBar
    }, instanceContext)
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
    const isNVue = !!config.page[pagePath].nvue;
    uniRoutes.push({
      path: '/' + pagePath,
      meta: {
        isQuit,
        isTabBar,
        isNVue
      },
      window: config.page[pagePath].window || {}
    });
  });
}

function registerConfig (config, {
  plus
}) {
  Object.assign(uniConfig, config);

  uniConfig.viewport = '';
  uniConfig.defaultFontSize = '';

  if (uniConfig.nvueCompiler === 'uni-app') {
    uniConfig.viewport = plus.screen.resolutionWidth;
    uniConfig.defaultFontSize = uniConfig.viewport / 20;
  }

  parseRoutes(uniConfig);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerConfig`, uniConfig);
  }
}

function initOn (on, {
  getApp,
  getCurrentPages
}) {
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

  const routeHooks = {
    navigateTo () {
      callCurrentPageHook('onHide');
    },
    navigateBack () {
      callCurrentPageHook('onShow');
    }
  };

  function onAppRoute ({
    type
  }) {
    const routeHook = routeHooks[type];
    routeHook && routeHook();
  }

  on('onError', onError);
  on('onPageNotFound', onPageNotFound);

  { // 后续有时间，h5 平台也要迁移到 onAppRoute
    on('onAppRoute', onAppRoute);
  }

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

let waiting;
let waitingTimeout;
let toast = false;
let toastTimeout;
// 此处设计不对
function initPopup (on, {
  plus
}) {
  on('onShowToast', showToast);
  on('onHideToast', hideToast);
  on('onShowLoading', showToast);
  on('onHideLoading', hideToast);
  on('onShowModal', showModal);
  on('onShowActionSheet', showActionSheet);

  function showToast ({
    title = '',
    icon = 'success',
    image = '',
    duration = 1500,
    mask = false,
    position = ''
  }) {
    if (position) {
      if (toast) {
        toastTimeout && clearTimeout(toastTimeout);
        plus.nativeUI.closeToast();
      }
      if (waiting) {
        waitingTimeout && clearTimeout(waitingTimeout);
        waiting.close();
      }
      if (~['top', 'center', 'bottom'].indexOf(position)) {
        let richText = `<span>${title}</span>`;
        plus.nativeUI.toast(richText, {
          verticalAlign: position,
          type: 'richtext'
        });
        toast = true;
        toastTimeout = setTimeout(() => {
          hideToast();
        }, 2000);
        return
      }
      console.warn('uni.showToast 传入的 "position" 值 "' + position + '" 无效');
    }

    if (duration) {
      if (waiting) {
        waitingTimeout && clearTimeout(waitingTimeout);
        waiting.close();
      }
      if (toast) {
        toastTimeout && clearTimeout(toastTimeout);
        plus.nativeUI.closeToast();
      }
      if (icon && !~['success', 'loading', 'none'].indexOf(icon)) {
        icon = 'success';
      }
      const waitingOptions = {
        modal: mask,
        back: 'transmit',
        padding: '10px',
        size: '16px' // 固定字体大小
      };
      if (!image && (!icon || icon === 'none')) { // 无图
        //       waitingOptions.width = '120px'
        //       waitingOptions.height = '40px'
        waitingOptions.loading = {
          display: 'none'
        };
      } else { // 有图
        waitingOptions.width = '140px';
        waitingOptions.height = '112px';
      }
      if (image) {
        waitingOptions.loading = {
          display: 'block',
          height: '55px',
          icon: image,
          interval: duration
        };
      } else {
        if (icon === 'success') {
          waitingOptions.loading = {
            display: 'block',
            height: '55px',
            icon: '__uniappsuccess.png',
            interval: duration
          };
        }
      }

      waiting = plus.nativeUI.showWaiting(title, waitingOptions);
      waitingTimeout = setTimeout(() => {
        hideToast();
      }, duration);
    }
  }

  function hideToast () {
    if (toast) {
      toastTimeout && clearTimeout(toastTimeout);
      plus.nativeUI.closeToast();
      toast = false;
    }
    if (waiting) {
      waitingTimeout && clearTimeout(waitingTimeout);
      waiting.close();
      waiting = null;
      waitingTimeout = null;
    }
  }

  function showModal ({
    title = '',
    content = '',
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#000000',
    confirmText = '确定',
    confirmColor = '#3CC51F'
  }, callback) {
    plus.nativeUI.confirm(content, (e) => {
      if (showCancel) {
        callback(e.index === 1 ? 'confirm' : 'cancel');
      } else {
        callback(e.index === 0 ? 'confirm' : 'cancel');
      }
    }, title, showCancel ? [cancelText, confirmText] : [confirmText]);
  }

  function showActionSheet ({
    itemList = [],
    itemColor = '#000000',
    title = ''
  }, callback) {
    const options = {
      buttons: itemList.map(item => ({
        title: item
      }))
    };
    if (title) {
      options.title = title;
    }

    if (plus.os.name === 'iOS') {
      options.cancel = '取消';
    }

    plus.nativeUI.actionSheet(options, (e) => {
      if (e.index > 0) {
        callback(e.index - 1);
      } else {
        callback(-1);
      }
    });
  }
}

let bridge;

function initServiceJSBridge (Vue, instanceContext) {
  if (bridge) {
    return bridge
  }

  const Emitter = new Vue();

  bridge = {
    on: Emitter.$on.bind(Emitter),
    off: Emitter.$off.bind(Emitter),
    once: Emitter.$once.bind(Emitter),
    emit: Emitter.$emit.bind(Emitter)
  };

  initOn(bridge.on, instanceContext);
  initPopup(bridge.on, instanceContext);

  return bridge
}

let uni$1;

function createInstanceContext (instanceContext) {
  const {
    weex,
    Vue,
    WeexPlus
  } = instanceContext;
  const plus = new WeexPlus(weex);

  const UniServiceJSBridge = initServiceJSBridge(Vue, {
    plus,
    getApp,
    getCurrentPages
  });

  if (!uni$1) {
    uni$1 = createUniInstance(
      weex,
      plus,
      uniConfig,
      uniRoutes,
      UniServiceJSBridge,
      getApp,
      getCurrentPages
    );
  }

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
    uni: uni$1,
    getApp,
    getCurrentPages,
    UniServiceJSBridge
  }
}

export { createInstanceContext };
