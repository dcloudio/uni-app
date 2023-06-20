import {
  emitter,
  listeners
} from '../mixins'

function getButton (weex) {
  return {
    name: 'Button',
    mixins: [emitter, listeners],
    props: {
      hoverClass: {
        type: String,
        default: 'button-hover'
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      id: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: 'default'
      },
      plain: {
        type: [Boolean, String],
        default: false
      },
      loading: {
        type: [Boolean, String],
        default: false
      },
      hoverStopPropagation: {
        type: Boolean,
        default: false
      },
      hoverStartTime: {
        type: [Number, String],
        default: 20
      },
      hoverStayTime: {
        type: [Number, String],
        default: 70
      },
      formType: {
        type: String,
        default: '',
        validator: function validator (value) {
          return ~['', 'submit', 'reset'].indexOf(value)
        }
      }
    },
    data: function data () {
      return {
        TYPES: {
          default: 'd',
          primary: 'p',
          warn: 'w'
        },
        clickFunction: null
      }
    },
    methods: {
      _onClick ($event, isLabelClick) {
        if (this.disabled) {
          return
        }
        if (isLabelClick) {
          this.$el.click()
        }
        if (this.formType) {
          this.$dispatch('Form', this.formType === 'submit' ? 'uni-form-submit' : 'uni-form-reset', {
            type: this.formType
          }, this)
        }
      },
      _getClass (t) {
        let cl = 'ub-' + this.TYPES[this.type] + t
        if (this.disabled) {
          cl += '-d'
        }
        if (this.plain) {
          cl += '-plain'
        }
        if (t === '-t' && this.size === 'mini') {
          cl += ' ub-mini'
        }
        return cl
      },
      _getHoverClass (t) {
        if (this.disabled) {
          return ''
        }
        let cl = 'ub-' + this.TYPES[this.type] + t + '-hover'
        if (this.plain) {
          cl += '-plain'
        }
        return cl
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('view', _vm._g({
        staticClass: ['ub'],
        class: _vm._getClass(''),
        attrs: {
          'hoverClass': _vm._getHoverClass('')
        },
        on: {
          'click': _vm._onClick
        }
      }, _vm.$listeners), [(_vm.loading) ? createElement('loading-indicator', {
        staticClass: ['ub-loading'],
        class: ['ub-' + _vm.TYPES[_vm.type] + '-loading'],
        attrs: {
          'arrow': 'false',
          'animating': 'true'
        }
      }) : _vm._e(), createElement('u-text', {
        staticClass: ['ub-t'],
        class: _vm._getClass('-t')
      }, [_vm._t('default')], 2)], 1)
    },
    style: {
      'ub': {
        'flexDirection': 'row',
        'alignItems': 'center',
        'justifyContent': 'center',
        'position': 'relative',
        'paddingLeft': '5',
        'paddingRight': '5',
        'overflow': 'hidden',
        'color': '#000000',
        'backgroundColor': '#f8f8f8',
        'borderRadius': '5',
        'borderStyle': 'solid',
        'borderWidth': '1',
        'borderColor': '#dbdbdb'
      },
      'ub-t': {
        'color': '#000000',
        'fontSize': '18',
        'textDecoration': 'none',
        'lineHeight': '46'
      },
      'ub-d': {
        'backgroundColor': '#f8f8f8'
      },
      'ub-p': {
        'backgroundColor': '#007aff',
        'borderColor': '#0062cc'
      },
      'ub-w': {
        'backgroundColor': '#e64340',
        'borderColor': '#b83633'
      },
      'ub-d-t': {
        'color': '#000000'
      },
      'ub-p-t': {
        'color': '#ffffff'
      },
      'ub-w-t': {
        'color': '#ffffff'
      },
      'ub-d-d': {
        'backgroundColor': '#f7f7f7'
      },
      'ub-p-d': {
        'backgroundColor': '#63acfc',
        'borderColor': '#4f8aca'
      },
      'ub-w-d': {
        'backgroundColor': '#ec8b89',
        'borderColor': '#bd6f6e'
      },
      'ub-d-t-d': {
        'color': '#cccccc'
      },
      'ub-p-t-d': {
        'color': 'rgba(255,255,255,0.6)'
      },
      'ub-w-t-d': {
        'color': 'rgba(255,255,255,0.6)'
      },
      'ub-d-plain': {
        'borderColor': '#353535',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-p-plain': {
        'borderColor': '#007aff',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-w-plain': {
        'borderColor': '#e64340',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-d-t-plain': {
        'color': '#353535'
      },
      'ub-p-t-plain': {
        'color': '#007aff'
      },
      'ub-w-t-plain': {
        'color': '#e64340'
      },
      'ub-d-d-plain': {
        'borderColor': '#c6c6c6',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-p-d-plain': {
        'borderColor': '#c6c6c6',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-w-d-plain': {
        'borderColor': '#c6c6c6',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-d-t-d-plain': {
        'color': 'rgba(0,0,0,0.2)'
      },
      'ub-p-t-d-plain': {
        'color': 'rgba(0,0,0,0.2)'
      },
      'ub-w-t-d-plain': {
        'color': 'rgba(0,0,0,0.2)'
      },
      'ub-mini': {
        'lineHeight': '30',
        'fontSize': '13',
        'paddingTop': 0,
        'paddingRight': '17.5',
        'paddingBottom': 0,
        'paddingLeft': '17.5'
      },
      'ub-loading': {
        'width': '18',
        'height': '18',
        'marginRight': '10'
      },
      'ub-d-loading': {
        'color': 'rgba(255,255,255,0.6)',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-p-loading': {
        'color': 'rgba(255,255,255,0.6)',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-w-loading': {
        'color': 'rgba(255,255,255,0.6)',
        'backgroundColor': '#ce3c39'
      },
      'ub-d-loading-plain': {
        'color': '#353535'
      },
      'ub-p-loading-plain': {
        'color': '#007aff',
        'backgroundColor': '#0062cc'
      },
      'ub-w-loading-plain': {
        'color': '#e64340',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-d-hover': {
        'opacity': 0.8,
        'backgroundColor': '#dedede'
      },
      'ub-p-hover': {
        'opacity': 0.8,
        'backgroundColor': '#0062cc'
      },
      'ub-w-hover': {
        'opacity': 0.8,
        'backgroundColor': '#ce3c39'
      },
      'ub-d-t-hover': {
        'color': 'rgba(0,0,0,0.6)'
      },
      'ub-p-t-hover': {
        'color': 'rgba(255,255,255,0.6)'
      },
      'ub-w-t-hover': {
        'color': 'rgba(255,255,255,0.6)'
      },
      'ub-d-hover-plain': {
        'color': 'rgba(53,53,53,0.6)',
        'borderColor': 'rgba(53,53,53,0.6)',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-p-hover-plain': {
        'color': 'rgba(26,173,25,0.6)',
        'borderColor': 'rgba(0,122,255,0.6)',
        'backgroundColor': 'rgba(0,0,0,0)'
      },
      'ub-w-hover-plain': {
        'color': 'rgba(230,67,64,0.6)',
        'borderColor': 'rgba(230,67,64,0.6)',
        'backgroundColor': 'rgba(0,0,0,0)'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('button', getButton(weex))
}
