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
    }
  },
  data () {
    return {
      valueSync: this._getValueString(this.value)
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
    }
  }
}
