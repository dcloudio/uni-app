import {
  isFn
} from 'uni-shared'

export default {
  data () {
    return {
      showActionSheet: {
        visible: false
      }
    }
  },
  created () {
    UniServiceJSBridge.on('onShowActionSheet', (args, callback) => {
      this.showActionSheet = args
      this.onActionSheetCloseCallback = callback
    })
    UniServiceJSBridge.on('onHidePopup', args => {
      this.showActionSheet.visible = false
    })
  },
  methods: {
    // 处理 actionSheet close 回调
    _onActionSheetClose (type) {
      this.showActionSheet.visible = false
      isFn(this.onActionSheetCloseCallback) && this.onActionSheetCloseCallback(type)
    }
  }
}
