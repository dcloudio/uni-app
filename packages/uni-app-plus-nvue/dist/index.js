import { createUniInstance } from './uni';

const ANI_SHOW = 'pop-in';
const ANI_DURATION = 300;

let id = 0;

function getId () {
  return id++
}

function parseWebviewStyle (path) {
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

function initNavigateTo ({
  plus,
  __registerPage
}) {
  return function navigateTo (path, {
    animationType,
    animationDuration
  }) {
    const webview = plus.webview.open(
      '',
      String(getId()),
      parseWebviewStyle(path),
      animationType || ANI_SHOW,
      animationDuration || ANI_DURATION,
      () => {
        console.log('show.callback');
      });

    __registerPage({
      path,
      webview
    });
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

function getApp () {
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

function registerPage ({
  vm,
  path,
  webview
}, instanceContext) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[uni-app] registerPage`, path, webview.id);
  }
  pages.push({
    route: path.slice(1),
    $getAppWebview () {
      return webview
    },
    $meta: instanceContext.__uniRoutes.find(route => route.path === path).meta,
    $vm: vm
  });
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

function createInstanceContext (instanceContext) {
  const {
    weex,
    WeexPlus
  } = instanceContext;
  const plus = new WeexPlus(weex);
  return {
    __uniConfig: uniConfig,
    __uniRoutes: uniRoutes,
    __registerConfig (config) {
      registerConfig(config, instanceContext);
    },
    __registerApp (appVm) {
      registerApp(appVm, instanceContext);
    },
    __registerPage (page) {
      registerPage(page, instanceContext);
    },
    plus,
    uni: createUniInstance(
      weex,
      plus,
      uniConfig,
      uniRoutes,
      getApp,
      getCurrentPages
    ),
    getApp,
    getCurrentPages
  }
}

export { createInstanceContext };
