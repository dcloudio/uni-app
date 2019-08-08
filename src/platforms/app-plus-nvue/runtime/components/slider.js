import {
  emitter,
  listeners
} from '../mixins'

function getSlider (weex) {
  return {
    name: 'U-Slider',
    mixins: [emitter, listeners],
    props: {
      name: {
        type: String,
        default: ''
      },
      min: {
        type: [Number, String],
        default: 0
      },
      max: {
        type: [Number, String],
        default: 100
      },
      value: {
        type: [Number, String],
        default: 0
      },
      step: {
        type: [Number, String],
        default: 1
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: '#e9e9e9'
      },
      backgroundColor: {
        type: String,
        default: '#e9e9e9'
      },
      activeColor: {
        type: String,
        default: '#007aff'
      },
      selectedColor: {
        type: String,
        default: '#007aff'
      },
      blockColor: {
        type: String,
        default: '#ffffff'
      },
      blockSize: {
        type: [Number, String],
        default: 28
      },
      showValue: {
        type: [Boolean, String],
        default: false
      }
    },
    data () {
      return {
        left: 0,
        width: 0,
        sliderValue: Number(this.value),
        sliderThumbValue: 0
      }
    },
    computed: {
      trackStyle () {
        return {
          backgroundColor: this._getBgColor()
        }
      },
      trackActiveStyle () {
        return {
          backgroundColor: this._getActiveColor(),
          width: this.thumbValue + 'px'
        }
      },
      thumbStyle () {
        return {
          width: this.blockSize + 'px',
          height: this.blockSize + 'px',
          marginTop: -this.blockSize / 2 + 'px',
          left: this.thumbValue + 'px',
          backgroundColor: this.blockColor
        }
      },
      thumbValue () {
        return (this.sliderValue - Number(this.min)) / (Number(this.max) - Number(this.min)) * this.width
      }
    },
    watch: {
      value (val) {
        this.sliderValue = Number(val)
      }
    },
    mounted () {
      this._x0 = 0
      this._x1 = 0
      this.$eventOld = null
      setTimeout(() => {
        const dom = weex.requireModule('dom')
        dom.getComponentRect(this.$refs['slider-track'], res => {
          this.left = res.size.left
          this.width = res.size.width
        })
      }, 50)
    },
    created () {
      this.$dispatch('Form', 'uni-form-group-update', {
        type: 'add',
        vm: this
      })
    },
    beforeDestroy () {
      this.$dispatch('Form', 'uni-form-group-update', {
        type: 'remove',
        vm: this
      })
    },
    methods: {
      _handleStart (e) {
        if (e.changedTouches.length === 1 && !this._$eventOld) {
          this._$eventOld = e
          const px = e.changedTouches[0].pageX
          this._x0 = this._x1 = px
          this._onTrack('start', px)
        }
      },
      _handleMove (e) {
        if (e.changedTouches.length === 1 && this._$eventOld) {
          const px = e.changedTouches[0].pageX
          this._onTrack('move', px)
          this._x1 = px
        }
      },
      _handleEnd (e) {
        if (e.changedTouches.length === 1 && this._$eventOld) {
          const px = e.changedTouches[0].pageX
          this._$eventOld = null
          this._onTrack('end', px)
        }
      },
      _onTrack: function (state, x) {
        if (!this.disabled) {
          if (state === 'move') {
            this._onUserChangedValue({
              x: x
            })
            this.$trigger('changing', {
              value: this.sliderValue
            })
          }
          else if (state === 'end') {
            this._onUserChangedValue({
              x: x
            })
            this.$trigger('change', {
              value: this.sliderValue
            })
          }
        }
      },
      _onUserChangedValue (e) {
        let x = e.x
        if (x < 0) {
          x = 0
        }
        if (x > this.width) {
          x = this.width
        }
        this.sliderValue = this._filterValue(x)
      },
      _filterValue (x) {
        let value = (x / this.width) * (Number(this.max) - Number(this.min))
        const step = Number(this.step)
        if (step > 0 && value > step && (value % step) / step !== 0) {
          value -= value % step
        }
        return parseInt(value + Number(this.min))
      },
      _getBgColor () {
        return this.backgroundColor !== '#e9e9e9'
          ? this.backgroundColor
          : this.color !== '#007aff'
            ? this.color
            : '#007aff'
      },
      _getActiveColor () {
        return this.activeColor !== '#007aff'
          ? this.activeColor
          : this.selectedColor !== '#e9e9e9'
            ? this.selectedColor
            : '#e9e9e9'
      },
      _resetFormData () {
        this.sliderValue = this.min
      },
      _getFormData () {
        const data = {}
        if (this.name !== '') {
          data['value'] = this.sliderValue
          data['key'] = this.name
        }
        return data
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('div', _vm._g({
        staticClass: ['uni-slider']
      }, _vm.$listeners), [createElement('div', {
        staticClass: ['uni-slider-wrapper']
      }, [createElement('div', {
        staticClass: ['uni-slider-tap-area'],
        on: {
          'touchstart': _vm._handleStart,
          'touchmove': _vm._handleMove,
          'touchend': _vm._handleEnd
        }
      }, [createElement('div', {
        ref: 'slider-track',
        staticClass: ['uni-slider-handle-wrapper'],
        style: _vm.trackStyle
      }, [createElement('div', {
        staticClass: ['uni-slider-track'],
        style: _vm.trackActiveStyle
      })]), createElement('div', {
        ref: 'uni-slider-handle',
        staticClass: ['uni-slider-thumb'],
        style: _vm.thumbStyle
      })]), (_vm.showValue) ? createElement('u-text', {
        staticClass: ['uni-slider-value']
      }, [_vm._v(_vm._s(_vm.sliderValue))]) : _vm._e()])])
    },
    style: {
      'uni-slider': {
        'marginTop': '12',
        'marginRight': 0,
        'marginBottom': '12',
        'marginLeft': 0,
        'paddingTop': 0,
        'paddingRight': 0,
        'paddingBottom': 0,
        'paddingLeft': 0
      },
      'uni-slider-wrapper': {
        'flexDirection': 'row',
        'alignItems': 'center',
        'minHeight': '30'
      },
      'uni-slider-tap-area': {
        'position': 'relative',
        'flex': 1,
        'paddingTop': '15',
        'paddingRight': 0,
        'paddingBottom': '15',
        'paddingLeft': 0
      },
      'uni-slider-handle-wrapper': {
        'position': 'relative',
        'marginTop': 0,
        'marginRight': '18',
        'marginBottom': 0,
        'marginLeft': '18',
        'height': '2',
        'borderRadius': '5',
        'backgroundColor': '#e9e9e9',
        'transitionProperty': 'backgroundColor',
        'transitionDuration': 300,
        'transitionTimingFunction': 'ease'
      },
      '@TRANSITION': {
        'uni-slider-handle-wrapper': {
          'property': 'backgroundColor',
          'duration': 300,
          'timingFunction': 'ease'
        },
        'uni-slider-track': {
          'property': 'backgroundColor',
          'duration': 300,
          'timingFunction': 'ease'
        },
        'uni-slider-thumb': {
          'property': 'borderColor',
          'duration': 300,
          'timingFunction': 'ease'
        }
      },
      'uni-slider-track': {
        'flex': 1,
        'height': '2',
        'borderRadius': '6',
        'backgroundColor': '#007aff',
        'transitionProperty': 'backgroundColor',
        'transitionDuration': 300,
        'transitionTimingFunction': 'ease'
      },
      'uni-slider-thumb': {
        'position': 'absolute',
        'width': '28',
        'height': '28',
        'borderRadius': 50,
        'boxShadow': '0 0 4px #ebebeb',
        'transitionProperty': 'borderColor',
        'transitionDuration': 300,
        'transitionTimingFunction': 'ease'
      },
      'uni-slider-step': {
        'position': 'absolute',
        'width': 100,
        'height': '2',
        'background': 'transparent',
        'zIndex': 1
      },
      'uni-slider-value': {
        'color': '#888888',
        'fontSize': '14',
        'marginRight': '14'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('u-slider', getSlider(weex))
}
