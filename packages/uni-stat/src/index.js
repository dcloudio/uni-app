import { get_page_vm, get_platform_name, is_debug } from './utils/pageInfo.js'
import Stat from './core/stat.js'
const stat = Stat.getInstance()

// 用于判断是隐藏页面还是卸载页面
let isHide = false

const lifecycle = {
  onLaunch(options) {
    // 进入应用上报数据
    stat.launch(options, this)
    // 上报push推送id
    stat.pushEvent(options)
  },
  onLoad(options) {
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
    isHide = false
    stat.show(this)
  },
  onHide() {
    isHide = true
    stat.hide(this)
  },
  onUnload() {
    if (isHide) {
      isHide = false
      return
    }
    stat.hide(this)
  },
  onError(e) {
    // fix by haotian 避免统计内部错误导致堆栈溢出，造成死循环
    try {
      stat.error(e)
    } catch (error) {
      console.error('uni-stat error:', error)
    }
  },
}

// 加载统计代码
function load_stat() {
  // #ifdef VUE3
  uni.onCreateVueApp((app) => {
    app.mixin(lifecycle)
    uni.report = function (type, options) {
      stat.sendEvent(type, options)
    }
  })

  if (get_platform_name() !== 'h5' && get_platform_name() !== 'n') {
    uni.onAppHide(() => {
      stat.appHide(get_page_vm())
    })
    uni.onAppShow(() => {
      stat.appShow(get_page_vm())
    })
  }
  // #endif

  // #ifndef VUE3
  // eslint-disable-next-line no-restricted-globals
  const Vue = require('vue')
  ;(Vue.default || Vue).mixin(lifecycle)
  uni.report = function (type, options) {
    stat.sendEvent(type, options)
  }
  // #endif
}

function main() {
  if (is_debug) {
    if (__STAT_VERSION__ === '1') {
      // #ifndef APP-NVUE
      console.log('=== uni统计开启,version:1.0 ===')
      // #endif
    }
    if (__STAT_VERSION__ === '2') {
      // #ifndef APP-NVUE
      console.log('=== uni统计开启,version:2.0 ===')
      // #endif
    }
    load_stat()
  } else {
    if (process.env.NODE_ENV === 'development') {
      uni.report = function (type, options) {}
    } else {
      load_stat()
    }
  }
}

main()
