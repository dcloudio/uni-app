import {
  isFn
} from 'uni-shared'

export default {
  data () {
    return {
      previewImage: {
        visible: false
      }
    }
  },
  created () {
    UniServiceJSBridge.on('onShowPreviewImage', (args, callback) => {
      this.previewImage = Object.assign({}, args, { visible: true })
      isFn(callback) && this.$nextTick(callback)
    })
    UniServiceJSBridge.on('onClosePreviewImage', (callback) => {
      this._onPreviewClose()
      isFn(callback) && this.$nextTick(callback)
    })
    UniServiceJSBridge.on('onHidePopup', _ => {
      this.previewImage.visible = false
    })
  },
  methods: {
    // 处理 preview-image close 回调
    _onPreviewClose (res) {
      this.previewImage.visible = false
    }
  }
}
