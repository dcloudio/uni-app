import {
  emitter
} from '../mixins'

function getPicker (weex) {
  const picker = weex.requireModule('picker')
  const mode = {
    SELECTOR: 'selector',
    TIME: 'time',
    DATE: 'date'
  }
  return {
    name: 'Picker',
    mixins: [emitter],
    props: {
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
        type: [Number, String],
        default: 0
      },
      mode: {
        type: String,
        default: mode.SELECTOR,
        validator (val) {
          return Object.values(mode).indexOf(val) >= 0
        }
      },
      start: {
        type: String,
        default () {
          if (this.mode === mode.TIME) {
            return '00:00'
          }
          if (this.mode === mode.DATE) {
            const year = (new Date()).getFullYear() - 100
            return year + '-01-01'
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
            const year = (new Date()).getFullYear() + 100
            return year + '-12-31'
          }
          return ''
        }
      },
      disabled: {
        type: [Boolean, String],
        default: false
      }
    },
    methods: {
      onClick () {
        let data
        let method
        switch (this.mode) {
          case mode.SELECTOR:
            method = 'pick'
            data = {
              index: Number(this.value) || 0,
              items: this.range.map(item => typeof item === 'object' ? item[this.rangeKey] || '' : item)
            }
            break
          case mode.DATE:
            method = 'pickDate'
            data = {
              value: this.value,
              min: this.start,
              max: this.end
            }
            break
          case mode.TIME:
            method = 'pickTime'
            data = {
              value: this.value
            }
            break
        }
        picker[method](data, event => {
          if (event.result === 'success') {
            const value = event.data
            this.$trigger('change', {
              value
            })
          }
          else {
            this.$trigger('cancel')
          }
        })
      }
    },
    render (createElement) {
      const event = {}
      if (!this.disabled) {
        event.click = this.onClick
      }
      return createElement('div', this._g({
        on: event
      }, this.$listener), this.$slots.default, 2)
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('picker', getPicker(weex))
}
