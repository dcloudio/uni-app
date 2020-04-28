import {
  debounce,
  throttle
} from 'uni-shared'
import emitter from './emitter'
import keyboard from './keyboard'

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
  watch: {
    valueSync (value) {
      this.$emit('update:value', value)
    }
  },
  created () {
    const valueChange = this.__valueChange = debounce((val, oldVal) => {
      this.valueSync = this._getValueString(val)
    }, 100)
    this.$watch('value', valueChange)
    this.__triggerInput = throttle(($event, detail) => {
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
