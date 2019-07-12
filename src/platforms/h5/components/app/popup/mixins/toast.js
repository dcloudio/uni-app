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
      setTimeout(() => { // 延迟一下 show 可解决窗口打开前调用 showToast 在 onHidePopup 之后触发
        this.showToast = args
      }, 10)
    })

    const createOnHide = (type) => {
      return () => {
        let warnMsg = ''
        if (type === 'onHideToast' && this.showToast.isShowLoading) {
          warnMsg = '请注意 showToast 与 hideToast 必须配对使用'
        } else if (type === 'onHideLoading' && !this.showToast.isShowLoading) {
          warnMsg = '请注意 showLoading 与 hideLoading 必须配对使用'
        }
        if (warnMsg) {
          return console.warn(warnMsg)
        }
        setTimeout(() => { // 与 show 对应延迟10ms，避免快速调用 show，hide 导致无法关闭
          this.showToast.visible = false
        }, 10)
      }
    }

    UniServiceJSBridge.on('onHidePopup', createOnHide('onHidePopup'))
    UniServiceJSBridge.on('onHideToast', createOnHide('onHideToast'))
    UniServiceJSBridge.on('onHideLoading', createOnHide('onHideLoading'))
  }
}
