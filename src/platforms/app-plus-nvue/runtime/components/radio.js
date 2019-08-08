import {
  emitter,
  listeners
} from '../mixins'

function getRadio (weex) {
  return {
    name: 'Radio',
    mixins: [emitter, listeners],
    props: {
      checked: {
        type: [Boolean, String],
        default: false
      },
      id: {
        type: String,
        default: ''
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: '#007AFF'
      },
      value: {
        type: String,
        default: ''
      }
    },
    data: function data () {
      return {
        radioChecked: this.checked,
        radioValue: this.value
      }
    },
    listeners: {
      'label-click': '_onClick',
      '@label-click': '_onClick'
    },
    computed: {
      checkedStyle: function checkedStyle () {
        return {
          backgroundColor: this.color,
          borderColor: this.color
        }
      },
      uncheckedStyle () {
        return {
          borderColor: '#d1d1d1'
        }
      }
    },
    watch: {
      checked: function checked (val) {
        this.radioChecked = val
      },
      value: function value (val) {
        this.radioValue = val
      }
    },
    beforeCreate () {
    },
    created () {
      this.$dispatch('RadioGroup', 'uni-radio-group-update', {
        type: 'add',
        vm: this
      })
      this.$dispatch('Form', 'uni-form-group-update', {
        type: 'add',
        vm: this
      })
    },
    beforeDestroy () {
      this.$dispatch('RadioGroup', 'uni-radio-group-update', {
        type: 'remove',
        vm: this
      })
      this.$dispatch('Form', 'uni-form-group-update', {
        type: 'remove',
        vm: this
      })
    },
    methods: {
      _onClick ($event) {
        if (this.disabled || this.radioChecked) {
          return
        }
        this.radioChecked = true
        this.$dispatch('RadioGroup', 'uni-radio-change', $event, this)
      },
      _resetFormData () {
        this.radioChecked = false
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('div', _vm._g({
        staticClass: ['uni-radio'],
        on: {
          'click': _vm._onClick
        }
      }, _vm.$listeners), [createElement('div', {
        staticClass: ['uni-radio-input'],
        style: _vm.radioChecked ? _vm.checkedStyle : _vm.uncheckedStyle
      }, [(_vm.radioChecked) ? createElement('u-text', {
        staticClass: ['uni-radio-input-icon']
      }, [_vm._v(_vm._s('\uEA08'))]) : _vm._e()], 1), createElement('u-text', {
        staticClass: ['uni-text']
      }, [_vm._t('default')], 2)], 1)
    },
    style: {
      'uni-radio': {
        'alignItems': 'center',
        'flexDirection': 'row'
      },
      'uni-radio-input': {
        'position': 'relative',
        'alignItems': 'center',
        'justifyContent': 'center',
        'marginRight': '5',
        'backgroundColor': '#ffffff',
        'borderStyle': 'solid',
        'borderWidth': '1',
        'borderColor': '#d1d1d1',
        'borderRadius': 50,
        'width': '22',
        'height': '22',
        'outline': 0
      },
      'uni-radio-input-icon': {
        'fontFamily': 'unincomponents',
        'fontSize': '14',
        'color': '#ffffff'
      },
      'uni-radio-input-disabled': {
        'backgroundColor': '#e1e1e1',
        'borderColor': '#d1d1d1',
        'color': '#adadad'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('radio', getRadio(weex))
}
