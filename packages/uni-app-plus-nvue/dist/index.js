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

const __uniConfig = Object.create(null);
const __uniRoutes = [];

function createInstanceContext ({
  weex,
  WeexPlus
}) {
  const plus = new WeexPlus(weex);
  return {
    __uniConfig,
    __uniRoutes,
    __registerApp (appVm, {
      uniConfig,
      uniRoutes
    }) {
      Object.assign(__uniConfig, uniConfig);
      uniRoutes.forEach(route => __uniRoutes.push(route));
      registerApp(appVm, __uniRoutes, plus);
    },
    uni: createUniInstance(plus),
    getApp,
    getCurrentPages
  }
}

export { createInstanceContext };
