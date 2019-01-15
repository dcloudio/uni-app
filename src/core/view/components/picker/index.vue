<template>
  <uni-picker @click.stop="_click">
    <div>
      <slot/>
    </div>
  </uni-picker>
</template>

<script>
import {
  emitter
} from 'uni-mixins'
const {
  subscribe,
  unsubscribe,
  publishHandler
} = UniViewJSBridge
const mode = {
  SELECTOR: 'selector',
  MULTISELECTOR: 'multiSelector',
  TIME: 'time',
  DATE: 'date'
  // 暂不支持城市选择
  // REGION: 'region'
}
const fields = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day'
}
export default {
  name: 'Picker',
  mixins: [emitter],
  props: {
    name: {
      type: String,
      default: ''
    },
    range: {
      type: Array,
      default () {
        return []
      }
    },
    rangeKey: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String, Array],
      default: 0
    },
    mode: {
      type: String,
      default: mode.SELECTOR,
      validator (val) {
        return Object.values(mode).indexOf(val) >= 0
      }
    },
    fields: {
      type: String,
      default: 'day',
      validator (val) {
        return Object.values(fields).indexOf(val) >= 0
      }
    },
    start: {
      type: String,
      default () {
        if (this.mode === mode.TIME) {
          return '00:00'
        }
        if (this.mode === mode.DATE) {
          let year = (new Date()).getFullYear() - 100
          switch (this.fields) {
            case fields.YEAR:
              return year
            case fields.MONTH:
              return year + '-01'
            case fields.DAY:
              return year + '-01-01'
          }
        }
        return ''
      }
    },
    end: {
      type: String,
      default () {
        if (this.mode === mode.TIME) {
          return '23:59'
        }
        if (this.mode === mode.DATE) {
          let year = (new Date()).getFullYear() + 100
          switch (this.fields) {
            case fields.YEAR:
              return year
            case fields.MONTH:
              return year + '-12'
            case fields.DAY:
              return year + '-12-31'
          }
        }
        return ''
      }
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    customItem: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      valueSync: this.value,
      visible: false,
      valueChangeSource: ''
    }
  },
  watch: {
    value (val) {
      if (Array.isArray(val)) {
        if (!Array.isArray(this.valueSync)) {
          this.valueSync = []
        }
        val.forEach((val, index) => {
          if (val !== this.valueSync[index]) {
            this.$set(this.valueSync, index, val)
          }
        })
        if (val.length !== this.valueSync.length) {
          this.valueSync.splice(val.length, val.length - this.valueSync.length)
        }
      } else if (typeof val !== 'object') {
        this.valueSync = val
      }
    },
    valueSync (val) {
      if (!this.valueChangeSource) {
        this._show()
      } else {
        this.$emit('update:value', val)
      }
    }
  },
  created () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    })
    Object.keys(this.$props).forEach(key => {
      if (key !== 'value' && key !== 'name') {
        this.$watch(key, this._show)
      }
    })
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  destroyed () {
    if (this.visible) {
      const id = this.$page.id
      publishHandler('hidePicker', {}, id)
    }
  },
  methods: {
    _click () {
      if (this.disabled) {
        return
      }
      const id = this.$page.id
      subscribe(`${id}-picker-change`, this.change)
      subscribe(`${id}-picker-columnchange`, this.columnchange)
      subscribe(`${id}-picker-cancel`, this.cancel)
      this.visible = true
      this._show()
    },
    _show () {
      if (this.visible) {
        const id = this.$page.id
        let options = Object.assign({}, this.$props)
        options.value = this.valueSync
        publishHandler('showPicker', options, id)
      }
    },
    change (args) {
      this.visible = false
      const id = this.$page.id
      unsubscribe(`${id}-picker-change`)
      unsubscribe(`${id}-picker-columnchange`)
      unsubscribe(`${id}-picker-cancel`)
      if (!this.disabled) {
        this.valueChangeSource = 'click'
        let value = args.value
        this.valueSync = Array.isArray(value) ? value.map(val => val) : value
        this.$trigger('change', {}, {
          value
        })
      }
    },
    columnchange (args) {
      this.$trigger('change', {}, args)
    },
    cancel (args) {
      this.visible = false
      const id = this.$page.id
      unsubscribe(`${id}-picker-change`)
      unsubscribe(`${id}-picker-columnchange`)
      unsubscribe(`${id}-picker-cancel`)
      this.$trigger('cancel', {}, {})
    },
    _getFormData () {
      return {
        value: this.valueSync,
        key: this.name
      }
    },
    _resetFormData () {
      this.valueSync = ''
    }
  }
}
</script>

<style>
uni-picker {
  display: block;
}
</style>
