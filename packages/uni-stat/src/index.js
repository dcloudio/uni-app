import Stat from './stat.js';
const stat = Stat.getInstance();
let isHide = false
const lifecycle = {
  onLaunch(options) {
    stat.report(options, this);
  },
  onReady() {
    stat.ready(this);
  },
  onLoad(options) {
    stat.load(options, this);
  },
  onShow() {
    isHide = false
    stat.show(this);
  },
  onHide() {
    isHide = true
    stat.hide(this);
  },
  onUnload() {
    if (isHide) {
      isHide = false
      return
    }
    stat.hide(this);
  },
  onError(e) {
    stat.error(e)
  },
  onShareAppMessage() {
    stat.interceptShare(false)
  }
}

function main() {
  const Vue = require('vue');
  if (process.env.NODE_ENV === 'development') {
    uni.report = function(type, options) {};
  }else{
    (Vue.default || Vue).mixin(lifecycle);
    uni.report = function(type, options) {
      stat.sendEvent(type, options);
    };
  }
}

main();
