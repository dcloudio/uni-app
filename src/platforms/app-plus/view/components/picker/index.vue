<template>
  <uni-picker
    @click.stop="_show"
    v-on="$listeners">
    <slot />
  </uni-picker>
</template>

<script>
import { emitter } from 'uni-mixins'
import { showPage } from './page'

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
function padLeft (num) {
  return num > 9 ? num : (`0${num}`)
}
function getDate (str, mode_) {
  str = String(str || '')
  const date = new Date()
  if (mode_ === mode.TIME) {
    str = str.split(':')
    if (str.length === 2) {
      date.setHours(parseInt(str[0]), parseInt(str[1]))
    }
  } else {
    str = str.split('-')
    if (str.length === 3) {
      date.setFullYear(parseInt(str[0]), parseInt(str[1] - 1), parseInt(str[2]))
    }
  }
  return date
}

function getDefaultStartValue () {
  if (this.mode === mode.TIME) {
    return '00:00'
  }
  if (this.mode === mode.DATE) {
    let year = new Date().getFullYear() - 100
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

function getDefaultEndValue () {
  if (this.mode === mode.TIME) {
    return '23:59'
  }
  if (this.mode === mode.DATE) {
    let year = new Date().getFullYear() + 100
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
      default: ''
    },
    start: {
      type: String,
      default: getDefaultStartValue
    },
    end: {
      type: String,
      default: getDefaultEndValue
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      valueSync: null
    }
  },
  watch: {
    value () {
      this._setValueSync()
    }
  },
  created () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'add',
      vm: this
    })
    Object.keys(this.$props).forEach(key => {
      if (key !== 'name') {
        this.$watch(key, (val) => {
          const data = {}
          data[key] = val
          this._updatePicker(data)
        })
      }
    })
    this._setValueSync()
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _setValueSync () {
      let val = this.value
      switch (this.mode) {
        case mode.MULTISELECTOR:
          if (!Array.isArray(val)) {
            val = []
          }
          if (!Array.isArray(this.valueSync)) {
            this.valueSync = []
          }
          const length = this.valueSync.length = Math.max(val.length, this.range.length)
          for (let index = 0; index < length; index++) {
            const val0 = Number(val[index])
            const val1 = Number(this.valueSync[index])
            this.valueSync.splice(index, 1, isNaN(val0) ? (isNaN(val1) ? 0 : val1) : val0)
          }
          break
        case mode.TIME:
        case mode.DATE:
          this.valueSync = String(val)
          break
        default:
          this.valueSync = Number(val) || 0
          break
      }
    },
    _show () {
      if (this.disabled) {
        return
      }
      this._showPicker(Object.assign({}, this.$props))
    },
    _showPicker (data) {
      if ((data.mode === mode.TIME || data.mode === mode.DATE) && !data.fields) {
        plus.nativeUI[this.mode === mode.TIME ? 'pickTime' : 'pickDate']((res) => {
          const date = res.date
          this.$trigger('change', {}, {
            value: this.mode === mode.TIME ? `${padLeft(date.getHours())}:${padLeft(date.getMinutes())}` : `${date.getFullYear()}-${padLeft(date.getMonth() + 1)}-${padLeft(date.getDate())}`
          })
        }, () => {
          this.$trigger('cancel', {}, {})
        }, this.mode === mode.TIME ? {
          time: getDate(this.value, mode.TIME)
        } : {
          date: getDate(this.value, mode.DATE),
          minDate: getDate(this.start, mode.DATE),
          maxDate: getDate(this.end, mode.DATE)
        })
      } else {
        data.fields = Object.values(fields).includes(data.fields) ? data.fields : fields.DAY
        let res = { event: 'cancel' }
        this.page = showPage({
          url: '__uniapppicker',
          data,
          style: {
            titleNView: false,
            animationType: 'none',
            animationDuration: 0,
            background: 'rgba(0,0,0,0)',
            popGesture: 'none'
          },
          onMessage: (message) => {
            const event = message.event
            if (event === 'created') {
              this._updatePicker(data)
              return
            }
            if (event === 'columnchange') {
              delete message.event
              this.$trigger(event, {}, message)
              return
            }
            res = message
          },
          onClose: () => {
            this.page = null
            const event = res.event
            delete res.event
            this.$trigger(event, {}, res)
          }
        })
      }
    },
    _getFormData () {
      return {
        value: this.valueSync,
        key: this.name
      }
    },
    _resetFormData () {
      switch (this.mode) {
        case mode.SELECTOR:
          this.valueSync = -1
          break
        case mode.MULTISELECTOR:
          this.valueSync = this.value.map(val => 0)
          break
        case mode.DATE:
        case mode.TIME:
          this.valueSync = ''
          break
        default:
          break
      }
    },
    _updatePicker (data) {
      this.page && this.page.sendMessage(data)
    }
  }
}
</script>

<style>
uni-picker {
  display: block;
}
</style>
