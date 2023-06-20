import {
  emitter,
  listeners
} from '../mixins'

function getSwitch (weex) {
  return {
    name: 'Switch',
    mixins: [emitter, listeners],
    props: {
      name: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'switch'
      },
      checked: {
        type: [Boolean, String],
        default: false
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: '#007aff'
      }
    },
    data () {
      return {
        switchChecked: this.checked
      }
    },
    computed: {
      switchStyle () {
        return {
          backgroundColor: this.color
        }
      }
    },
    watch: {
      checked (value) {
        this.switchChecked = value
      }
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
      _onClick ($event) {
        if (this.disabled) {
          return
        }
        this.switchChecked = !this.switchChecked
        this.$trigger('change', {
          value: this.switchChecked
        })
      },
      _resetFormData () {
        this.switchChecked = false
      },
      _getFormData () {
        const data = {}
        if (this.name !== '') {
          data['value'] = this.switchChecked
          data['key'] = this.name
        }
        return data
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('div', _vm._g({
        staticClass: ['uni-switch'],
        on: {
          'click': _vm._onClick
        }
      }, _vm.$listeners), [(_vm.type === 'switch') ? createElement('div', {
        staticClass: ['uni-switch-input'],
        style: {
          backgroundColor: _vm.switchChecked ? _vm.color : '#DFDFDF'
        }
      }, [
        createElement('div', {
          staticClass: ['uni-switch-input-bg'],
          style: {
            backgroundColor: _vm.switchChecked ? _vm.color : '#FFFFFF'
          }
        }),
        createElement('div', {
          staticClass: ['uni-switch-input-check'],
          class: [_vm.switchChecked ? 'uni-switch-input-check-checked' : '']
        })
      ]) : _vm._e(), (_vm.type === 'checkbox') ? createElement('div', {
        staticClass: ['uni-checkbox-input'],
        class: [_vm.switchChecked ? 'uni-checkbox-input-checked' : '']
      }, [(_vm.switchChecked) ? createElement('u-text', {
        staticClass: ['uni-icon', 'uni-checkbox-input-icon']
      }, [_vm._v(_vm._s('\uEA08'))]) : _vm._e()]) : _vm._e()])
    },
    style: {
      'uni-switch': {
        'position': 'relative'
      },
      'uni-switch-input': {
        'position': 'relative',
        'width': '52',
        'height': '32',
        'borderRadius': '16',
        'backgroundColor': '#dfdfdf',
        'transitionDuration': 200,
        'transitionProperty': 'backgroundColor'
      },
      'uni-switch-input-disabled': {
        'backgroundColor': '#e1e1e1'
      },
      'uni-switch-input-bg': {
        'position': 'absolute',
        'left': 1,
        'top': 1,
        'width': '50',
        'height': '30',
        'borderRadius': '15',
        'backgroundColor': '#ffffff',
        'transitionDuration': 200,
        'transitionProperty': 'backgroundColor'
      },
      'uni-switch-input-check': {
        'pointerEvents': 'none',
        'position': 'absolute',
        'left': 1,
        'top': 1,
        'width': '30',
        'height': '30',
        'borderRadius': 50,
        'backgroundColor': '#ffffff',
        'boxShadow': '0 1px 3px #e0e0e0',
        'transitionDuration': 200,
        'transitionProperty': 'transform,backgroundColor',
        'transform': 'translateX(0)'
      },
      'uni-switch-input-check-checked': {
        'background': '#ffffff',
        'borderColor': '#ffffff',
        'transform': 'translateX(20px)'
      },
      'uni-checkbox-input': {
        'position': 'relative',
        'appearance': 'none',
        'marginRight': '5',
        'backgroundColor': '#ffffff',
        'borderStyle': 'solid',
        'borderWidth': '1',
        'borderColor': '#d1d1d1',
        'borderRadius': '3',
        'width': '22',
        'height': '22',
        'outline': 0
      },
      'uni-checkbox-input-disabled': {
        'backgroundColor': '#e1e1e1',
        'color': '#adadad'
      },
      'uni-icon': {
        'fontFamily': 'unincomponents',
        'fontSize': '16',
        'marginLeft': '2',
        'marginTop': '2',
        'color': '#007aff'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('switch', getSwitch(weex))
}
