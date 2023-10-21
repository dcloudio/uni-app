import {
  t
} from 'uni-core/helpers/i18n'
export default {
  data () {
    return {
      showToast: {
        visible: false
      }
    }
  },
  created () {
    let showType = ''

    const createOnShow = (type) => {
      return (args) => {
        showType = type
        setTimeout(() => { // 延迟一下 show 可解决窗口打开前调用 showToast 在 onHidePopup 之后触发
          this.showToast = args
        }, 10)
      }
    }

    UniServiceJSBridge.on('onShowToast', createOnShow('onShowToast'))
    UniServiceJSBridge.on('onShowLoading', createOnShow('onShowLoading'))

    const createOnHide = (type) => {
      return () => {
        if (!showType) {
          return
        }
        let warnMsg = ''
        if (type === 'onHideToast' && showType !== 'onShowToast') {
          warnMsg = t('uni.showToast.unpaired')
        } else if (type === 'onHideLoading' && showType !== 'onShowLoading') {
          warnMsg = t('uni.showLoading.unpaired')
        }
        if (warnMsg) {
          return console.warn(warnMsg)
        }
        showType = ''
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
