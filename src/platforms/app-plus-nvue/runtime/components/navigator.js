const OPEN_TYPES = {
  'navigate': 'navigateTo',
  'redirect': 'redirectTo',
  'switchTab': 'switchTab',
  'reLaunch': 'reLaunch',
  'navigateBack': 'navigateBack'
}

function getNavigator (weex, uni) {
  return {
    name: 'Navigator',
    props: {
      url: {
        type: String,
        default: ''
      },
      openType: {
        type: String,
        default: 'navigate',
        validator (value) {
          return !!OPEN_TYPES[value]
        }
      },
      delta: {
        type: Number,
        default: 1
      },
      animationType: {
        type: String,
        default: 'pop-in/out'
      },
      animationTime: {
        type: Number,
        default: 300
      },
      hoverClass: {
        type: String,
        default: 'navigator-hover'
      },
      hoverStopPropagation: {
        type: Boolean,
        default: false
      },
      hoverStartTime: {
        type: Number,
        default: 50
      },
      hoverStayTime: {
        type: Number,
        default: 600
      }
    },
    methods: {
      _click: function _click () {
        if (this.openType === 'navigateBack') {
          return uni.navigateBack({
            delta: this.delta
          })
        }
        if (!this.url) {
          console.error(
            '<navigator/> should have url attribute when using navigateTo, redirectTo, reLaunch or switchTab'
          )
          return
        }
        uni[OPEN_TYPES[this.openType]]({
          url: this.url
        })
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('view', _vm._g({
        attrs: {
          'hoverClass': _vm.hoverClass,
          'hoverStopPropagation': _vm.hoverStopPropagation,
          'hoverStartTime': _vm.hoverStartTime,
          'hoverStayTime': _vm.hoverStayTime
        },
        on: {
          'click': _vm._click
        }
      }, _vm.$listeners), [_vm._t('default')], 2)
    },
    style: {
      'navigator-hover': {
        'backgroundColor': 'rgba(0,0,0,0.1)',
        'opacity': 0.7
      }
    }
  }
}

export default function init (Vue, weex, instanceContext) {
  Vue.component('navigator', getNavigator(weex, instanceContext.uni))
}
