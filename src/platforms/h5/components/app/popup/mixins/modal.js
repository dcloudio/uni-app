import {
  isFn
} from 'uni-shared'

export default {
  data () {
    return {
      showModal: {
        visible: false
      }
    }
  },
  created () {
    UniServiceJSBridge.on('onShowModal', (args, callback) => {
      this.showModal = args
      this.onModalCloseCallback = callback
    })
    UniServiceJSBridge.on('onHidePopup', args => {
      this.showModal.visible = false
    })
  },
  methods: {
    // 处理 modal close 回调
    _onModalClose (type) {
      this.showModal.visible = false
      isFn(this.onModalCloseCallback) && this.onModalCloseCallback(type)
    }
  }
}
