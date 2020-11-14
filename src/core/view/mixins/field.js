import {
  debounce,
  throttle
} from 'uni-shared'
import emitter from './emitter'
import keyboard from './keyboard'

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
    data.errMsg = 'getSelectedTextRange:fail:no focused'
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
  name: 'BaseInput',
  mixins: [emitter, keyboard],
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
    }
  },
  data () {
    return {
      valueSync: this._getValueString(this.value)
    }
  },
  watch: {
    focus (val) {
      if (val) {
        this._focus()
      } else {
        this._blur()
      }
    }
  },
  computed: {
    needFocus () {
      return this.autoFocus || this.focus
    }
  },
  created () {
    const valueChange = this.__valueChange = debounce((val) => {
      this.valueSync = this._getValueString(val)
    }, 100)
    this.$watch('value', valueChange)
    this.__triggerInput = throttle(($event, detail) => {
      this.$emit('update:value', detail.value)
      this.$trigger('input', $event, detail)
    }, 100)
    this.$triggerInput = ($event, detail) => {
      this.__valueChange.cancel()
      this.__triggerInput($event, detail)
    }
  },
  beforeDestroy () {
    this.__valueChange.cancel()
    this.__triggerInput.cancel()
  },
  methods: {
    _getValueString (value) {
      return value === null ? '' : String(value)
    },
    _initField (ref) {
      this._fieldRef = ref
      startTime = startTime || Date.now()
      if (this.needFocus) {
        this._focus()
      }
    },
    _focus () {
      if (!this.needFocus) {
        return
      }
      const field = this.$refs[this._fieldRef]
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
        plus.key.showSoftKeybord()
      }
    },
    _blur () {
      const field = this.$refs[this._fieldRef]
      field && field.blur()
    }
  }
}
