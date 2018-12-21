const defaultProps = {
  visible: false,
  mode: '',
  range: [],
  'range-key': '',
  value: '',
  disabled: false,
  start: '',
  end: '',
  fields: 'day',
  'custom-item': ''
}

export default {
  data () {
    return {
      showPicker: {
        visible: false
      }
    }
  },
  created () {
    // 订阅 View 层的 showPicker 事件
    UniServiceJSBridge.subscribe('showPicker', (args, pageId) => {
      // 根据不同参数，渲染不同类型 picker(注意全局仅一个 picker 组件对象,每次 showPicker 需传入当前类型 picker 的完整参数)
      this.showPicker = Object.assign(defaultProps, args, {
        pageId,
        visible: true
      })
    })
    // 订阅 View 层的 hidePicker 事件
    UniServiceJSBridge.subscribe('hidePicker', () => {
      this._onPickerClose()
    })
    // 订阅页面返回跳转时触发的 uni.onHidePopup 事件，隐藏 picker
    UniServiceJSBridge.on('onHidePopup', () => {
      this._onPickerClose()
    })
  },
  methods: {
    // 处理 Picker close 回调
    _onPickerClose () {
      // 隐藏 picker 重置数据
      this.showPicker.visible = false
      this.showPicker.mode = 'selector'
      this.showPicker.range = []
      this.showPicker.value = 0
    }
  }
}
