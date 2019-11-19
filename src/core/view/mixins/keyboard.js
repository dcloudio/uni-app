export default {
  name: 'Keyboard',
  props: {
    cursorSpacing: {
      type: Number,
      default: 0
    },
    adjustPosition: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    plusReady (callback) {
      if (!callback) {
        return
      }
      if (window.plus) {
        return callback()
      }
      document.addEventListener('plusready', callback)
    },
    initKeyboard (el) {
      el.addEventListener('focus', () => {
        this.plusReady(() => {
          var currentWebview = plus.webview.currentWebview()
          var style = currentWebview.getStyle() || {}
          if (style.softinputMode === 'adjustResize') {
            return
          }
          var rect = this.$el.getBoundingClientRect()
          currentWebview.setSoftinputTemporary && currentWebview.setSoftinputTemporary({
            mode: this.adjustPosition ? 'adjustPan' : 'nothing',
            position: {
              top: rect.top,
              height: rect.height + this.cursorSpacing
            }
          })
        })
      })
    }
  }
}
