import { createUniInstance } from './uni';

function getWebviewStyle () {
  return {
    titleNView: {
      autoBackButton: true,
      titleText: 'titleText'
    }
  }
}
class Router {
  constructor (routes, plus) {
    this.routes = routes;
    this.plus = plus;
    this.id = 0;

    this.aniShow = plus.os.name === 'Android' ? 'slide-in-right' : 'pop-in';
    this.aniClose = 'pop-out';
    this.aniDuration = 300;
  }

  push ({
    type,
    path
  } = {}) {
    this.plus.webview.open(
      '',
      String(this.id++),
      getWebviewStyle(),
      this.aniShow,
      this.aniDuration,
      () => {
        console.log('show.callback');
      });
  }

  replace ({
    type,
    path
  } = {}) {

  }

  go (delta) {

  }
}

let appCtx;

function getApp () {
  return appCtx
}

function registerApp (appVm, routes, plus) {
  appCtx = appVm;
  appCtx.$router = new Router(routes, plus);
}

const pageVms = [];

function getCurrentPages () {
  return pageVms
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
function registerPage (pageVm) {
  pageVms.push(pageVm);
}

const uniConfig = Object.create(null);
const uniRoutes = [];

function parseRoutes (config) {
  uniRoutes.length = 0;
  /* eslint-disable no-mixed-operators */
  const tabBarList = (config.tabBar && config.tabBar.list || []).map(item => item.pagePath);

  Object.keys(config.page).forEach(function (pagePath) {
    uniRoutes.push({
      path: '/' + pagePath,
      meta: {
        isTabBar: tabBarList.indexOf(pagePath) !== -1
      }
    });
  });
}

function registerConfig (config) {
  Object.assign(uniConfig, config);
  parseRoutes(uniConfig);
}

function createInstanceContext ({
  weex,
  WeexPlus
}) {
  const plus = new WeexPlus(weex);
  return {
    __uniConfig: uniConfig,
    __uniRoutes: uniRoutes,
    __registerConfig (config) {
      registerConfig(config);
    },
    __registerApp (appVm) {
      registerApp(appVm, uniRoutes, plus);
    },
    __registerPage (pageVm) {
      registerPage(pageVm);
    },
    uni: createUniInstance(
      weex,
      plus,
      __uniConfig,
      __uniRoutes,
      getApp,
      getCurrentPages
    ),
    getApp,
    getCurrentPages
  }
}

export { createInstanceContext };
