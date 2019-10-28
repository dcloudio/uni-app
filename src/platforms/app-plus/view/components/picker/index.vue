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
          this._updatePicker({
            key: val
          })
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
      if (this.page) {
        return
      }
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
