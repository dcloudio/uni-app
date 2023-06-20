import {
  PRIMARY_COLOR
} from '../constants'

import {
  emitter
} from '../mixins'

const BACKGROUND_COLOR = '#EBEBEB'
const ANIMATE_INTERVAL = 30
const FONT_SIZE = 16
const STROKE_WIDTH = 6

function getProgress (weex) {
  return {
    name: 'Progress',
    mixins: [emitter],
    props: {
      percent: {
        type: [String, Number],
        default: 0
      },
      showInfo: {
        type: Boolean,
        default: false
      },
      borderRadius: {
        type: [String, Number],
        default: 0
      },
      fontSize: {
        type: [String, Number],
        default: FONT_SIZE
      },
      strokeWidth: {
        type: [String, Number],
        default: STROKE_WIDTH
      },
      active: {
        type: Boolean,
        default: false
      },
      activeColor: {
        type: String,
        default: PRIMARY_COLOR
      },
      activeMode: {
        type: String,
        default: 'backwards'
      },
      backgroundColor: {
        type: String,
        default: BACKGROUND_COLOR
      }
    },
    data () {
      return {
        width: 0,
        curPercent: 0
      }
    },
    computed: {
      barStyle () {
        return {
          height: this.strokeWidth,
          borderRadius: this.borderRadius,
          backgroundColor: this.backgroundColor
        }
      },
      innerBarStyle () {
        return {
          width: this.activeWidth,
          height: this.strokeWidth,
          backgroundColor: this.activeColor
        }
      },
      activeWidth () {
        return this.curPercent * this.width / 100
      },
      finalPercent () {
        let percent = parseFloat(this.percent, 10)
        percent > 100 && (percent = 100)
        percent < 0 && (percent = 0)
        return percent
      }
    },
    watch: {
      finalPercent (newVal, oldVal) {
        this._timerId && clearInterval(this._timerId)
        this._lastPercent = oldVal || 0
        this._animate()
      }
    },
    mounted () {
      setTimeout(() => {
        const dom = weex.requireModule('dom')
        dom.getComponentRect(this.$refs.progress, res => {
          this.width = res.size.width
          this._animate()
        })
      }, 50)
    },
    methods: {
      _animate () {
        const percent = this.finalPercent
        if (!this.active) {
          return (this.curPercent = percent)
        }
        this.curPercent = this.activeMode === 'forwards' ? this._lastPercent : 0
        this._timerId = setInterval(() => {
          if (percent <= this.curPercent + 1) {
            this.curPercent = percent
            clearInterval(this._timerId)
            this.$trigger('activeend', {
              curPercent: this.curPercent
            })
          }
          else {
            ++this.curPercent
          }
        }, ANIMATE_INTERVAL)
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('div',
        _vm._g({
          ref: 'progress',
          staticClass: ['uni-progress']
        }, _vm.$listeners),
        [
          createElement('div', {
            staticClass: ['uni-progress-bar'],
            style: _vm.barStyle
          }, [
            createElement('div', {
              staticClass: ['uni-progress-inner-bar'],
              style: _vm.innerBarStyle
            })
          ]), _vm.showInfo ? [
            createElement('u-text', {
              staticClass: ['uni-progress-info'],
              style: {
                fontSize: _vm.fontSize
              }
            }, [_vm.curPercent + '%'])
          ] : _vm._e()
        ], 2)
    },
    style: {
      'uni-progress': {
        flexDirection: 'row',
        alignItems: 'center'
      },
      'uni-progress-bar': {
        flex: 1
      },
      'uni-progress-inner-bar': {
        position: 'absolute'
      },
      'uni-progress-info': {
        marginLeft: '15px'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('progress', getProgress(weex))
}
