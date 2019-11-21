<template>
  <uni-picker @click.stop="_show">
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
          let year = new Date().getFullYear() - 60
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
          let year = new Date().getFullYear() + 60
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
  },
  beforeDestroy () {
    this.$dispatch('Form', 'uni-form-group-update', {
      type: 'remove',
      vm: this
    })
  },
  methods: {
    _show () {
      if (this.disabled) {
        return
      }
      this._showPicker(Object.assign({}, this.$props))
    },
    _showPicker (data) {
      if (this.mode === mode.TIME || this.mode === mode.DATE) {
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
