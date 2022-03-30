import {
  debounce,
  throttle
} from 'uni-shared'
import emitter from './emitter'
import keyboard from './keyboard'
import interact from './interact'

UniViewJSBridge.subscribe('getSelectedTextRange', function ({ pageId, callbackId }) {
  const activeElement = document.activeElement
  const tagName = activeElement.tagName.toLowerCase()
  const tagNames = ['input', 'textarea']
  const data = {}
  if (tagNames.includes(tagName)) {
    data.errMsg = 'getSelectedTextRange:ok'
    data.start = activeElement.selectionStart
    data.end = activeElement.selectionEnd
  } else {
    data.errMsg = 'getSelectedTextRange:fail no focused'
  }
  UniViewJSBridge.publishHandler('onGetSelectedTextRange', {
    callbackId,
    data
  }, pageId)
})

// App 延迟获取焦点
const FOCUS_DELAY = 200
let startTime

export default {
  name: 'Field',
  mixins: [emitter, keyboard, interact],
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * 已废弃属性，用于历史兼容
     */
    autoFocus: {
      type: [Boolean, String],
      default: false
    },
    focus: {
      type: [Boolean, String],
      default: false
    },
    cursor: {
      type: [Number, String],
      default: -1
    },
    selectionStart: {
      type: [Number, String],
      default: -1
    },
    selectionEnd: {
      type: [Number, String],
      default: -1
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    ignoreCompositionEvent: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      composing: false,
      valueSync: this._getValueString(this.value, this.type),
      focusSync: this.focus,
      // Safari 14 以上修正禁用状态颜色
      fixColor: String(navigator.vendor).indexOf('Apple') === 0 && CSS.supports('image-orientation:from-image')
    }
  },
  watch: {
    focus (val) {
      if (val) {
        this._focus()
      } else {
        this._blur()
      }
    },
    focusSync (val) {
      this.$emit('update:focus', val)
    },
    cursorNumber () {
      this._checkCursor()
    },
    selectionStartNumber () {
      this._checkSelection()
    },
    selectionEndNumber () {
      this._checkSelection()
    }
  },
  computed: {
    needFocus () {
      return this.autoFocus || this.focus
    },
    cursorNumber () {
      var cursor = Number(this.cursor)
      return isNaN(cursor) ? -1 : cursor
    },
    selectionStartNumber () {
      var selectionStart = Number(this.selectionStart)
      return isNaN(selectionStart) ? -1 : selectionStart
    },
    selectionEndNumber () {
      var selectionEnd = Number(this.selectionEnd)
      return isNaN(selectionEnd) ? -1 : selectionEnd
    }
  },
  created () {
    const valueChange = this.__valueChange = debounce((val) => {
      this.valueSync = this._getValueString(val, this.type)
    }, 100)
    this.$watch('value', valueChange)
    this.__triggerInput = throttle(($event, detail) => {
      this.__valueChange.cancel()
      this.$emit('update:value', detail.value)
      this.$trigger('input', $event, detail)
    }, 100)
    this.$triggerInput = ($event, detail, force) => {
      this.__valueChange.cancel()
      this.__triggerInput($event, detail)
      if (force) {
        this.__triggerInput.flush()
      }
    }
  },
  beforeDestroy () {
    this.__valueChange.cancel()
    this.__triggerInput.cancel()
  },
  directives: {
    field: {
      inserted (el, binding, vnode) {
        vnode.context._initField(el)
      }
    }
  },
  methods: {
    _getValueString (value, type) {
      if (type === 'number' && isNaN(Number(value))) {
        value = ''
      }
      return value === null ? '' : String(value)
    },
    _initField (el) {
      this._field = el
      startTime = startTime || Date.now()
      if (this.needFocus) {
        setTimeout(() => {
          this._focus()
        })
      }
    },
    _focus () {
      if (!this.needFocus) {
        return
      }
      const field = this._field
      if (!field || (__PLATFORM__ === 'app-plus' && !window.plus)) {
        setTimeout(this._focus.bind(this), 100)
        return
      }
      if (__PLATFORM__ === 'h5') {
        field.focus()
      } else {
        const timeout = FOCUS_DELAY - (Date.now() - startTime)
        if (timeout > 0) {
          setTimeout(this._focus.bind(this), timeout)
          return
        }
        field.focus()
        // 无用户交互的 webview 需主动显示键盘（安卓）
        if (!this.userInteract) {
          plus.key.showSoftKeybord()
        }
      }
    },
    _blur () {
      const field = this._field
      field && field.blur()
    },
    _onFocus ($event) {
      this.focusSync = true
      this.$trigger('focus', $event, {
        value: this.valueSync
      })
      // 从 watch:focusSync 中移出到这里。在watcher中如果focus初始值为ture，则不会执行以下逻辑
      this._checkSelection()
      this._checkCursor()
    },
    _onBlur ($event) {
      // iOS 输入法 compositionend 事件可能晚于 blur
      if (this.composing) {
        this.composing = false
        this._onInput($event, true)
      }
      this.focusSync = false
      const field = $event.target
      let cursor
      if (field.type === 'number') {
        field.type = 'text'
        cursor = field.selectionEnd
        field.type = 'number'
      } else {
        cursor = field.selectionEnd
      }
      this.$trigger('blur', $event, {
        value: this.valueSync,
        cursor
      })
    },
    _checkSelection () {
      const field = this._field
      if (this.focusSync && this.selectionStartNumber > -1 && this.selectionEndNumber > -1 && field.type !== 'number') {
        field.selectionStart = this.selectionStartNumber
        field.selectionEnd = this.selectionEndNumber
      }
    },
    _checkCursor () {
      const field = this._field
      if (this.focusSync && this.selectionStartNumber < 0 && this.selectionEndNumber < 0 && this.cursorNumber > -1 && field.type !== 'number') {
        field.selectionEnd = field.selectionStart = this.cursorNumber
      }
    }
  }
}
