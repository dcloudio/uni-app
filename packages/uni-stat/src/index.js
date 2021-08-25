import Stat from './stat.js'
const stat = Stat.getInstance()
let isHide = false
const lifecycle = {
  onLaunch(options) {
    console.log('report onLaunch init')
    stat.report(options, this)
  },
  onReady() {
    console.log('report onReady init')
    stat.ready(this)
  },
  onLoad(options) {
    console.log('report onLoad init')
    stat.load(options, this)
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      let oldShareAppMessage = this.$scope.onShareAppMessage
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false)
        return oldShareAppMessage.call(this, options)
      }
    }
  },
  onShow() {
    console.log('report onShow init')
    isHide = false
    stat.show(this)
  },
  onHide() {
    console.log('report onHide init')
    isHide = true
    stat.hide(this)
  },
  onUnload() {
    console.log('report onUnload init')
    if (isHide) {
      isHide = false
      return
    }
    stat.hide(this)
  },
  onError(e) {
    console.log('report onError init')
    stat.error(e)
  },
}

function main() {
  console.log('stat onload ----')
  uni.onAppLaunch((options) => {
    // 小程序平台此时也无法获取getApp，统一在options中传递一个app对象
    options.app.$vm.$.appContext.app.mixin(lifecycle)
    uni.report = function (type, options) {
      stat.sendEvent(type, options)
    }
  })
  // if (process.env.NODE_ENV === 'development') {
  //   uni.report = function (type, options) {}
  // } else {
  //   const Vue = require('vue')
  //   ;(Vue.default || Vue).mixin(lifecycle)
  //   uni.report = function (type, options) {
  //     stat.sendEvent(type, options)
  //   }
  // }
}

main()
