export default {
  data () {
    return {
      showToast: {
        visible: false
      }
    }
  },
  created () {
    UniServiceJSBridge.on('onShowToast', args => {
      setTimeout(() => { // 延迟一下 show 可解决窗口打开前调用 showToast,showLoading 在 onHidePopup 之后触发
        this.showToast = args
      }, 10)
    })
    UniServiceJSBridge.on(['onHidePopup', 'onHideToast'], args => {
      setTimeout(() => { // 与 show 对应延迟10ms，避免快速调用 show，hide 导致无法关闭
        this.showToast.visible = false
      }, 10)
    })
  }
}
