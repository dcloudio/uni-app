import {
  emitter,
  listeners
} from '../mixins'

function getCheckbox (weex) {
  return {
    name: 'Checkbox',
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
        default: '#007aff'
      },
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        checkboxChecked: this.checked,
        checkboxValue: this.value
      }
    },

    watch: {
      checked: function checked (val) {
        this.checkboxChecked = val
      },
      value: function value (val) {
        this.checkboxValue = val
      }
    },
    listeners: {
      'label-click': '_onClick',
      '@label-click': '_onClick'
    },
    computed: {
      checkboxColor: function checkboxColor () {
        return this.disabled ? '#adadad' : this.color
      }
    },
    created () {
      this.$dispatch('CheckboxGroup', 'uni-checkbox-group-update', {
        type: 'add',
        vm: this
      })
      this.$dispatch('Form', 'uni-form-group-update', {
        type: 'add',
        vm: this
      })
    },
    beforeDestroy () {
      this.$dispatch('CheckboxGroup', 'uni-checkbox-group-update', {
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
        if (this.disabled) return
        this.checkboxChecked = !this.checkboxChecked
        this.$dispatch('CheckboxGroup', 'uni-checkbox-change', $event)
      },
      _resetFormData () {
        this.checkboxChecked = false
      }
    },
    beforeCreate () {
    },
    render (createElement) {
      const _vm = this
      return createElement('div', _vm._g({}, _vm.$listeners), [
        createElement(
          'div', {
            staticClass: ['uni-checkbox']
          },
          [
            createElement(
              'div', {
                staticClass: ['uni-checkbox-input'],
                class: [_vm.disabled ? 'uni-checkbox-input-disabled' : '']
              },
              [
                _vm.checkboxChecked ?
                  createElement(
                    'u-text', {
                      staticClass: ['uni-icon'],
                      style: {
                        color: _vm.checkboxColor
                      }
                    },
                    [_vm._v(_vm._s('\uEA08'))]
                  ) :
                  _vm._e()
              ]
            ),
            createElement(
              'u-text', {
                staticClass: ['uni-slot']
              },
              [_vm._t('default')],
              2
            )
          ]
        )
      ])
    },
    style: {
      'uni-checkbox': {
        flexDirection: 'row',
        alignItems: 'center'
      },
      'uni-checkbox-input': {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: '1',
        borderColor: '#d1d1d1',
        borderStyle: 'solid',
        backgroundColor: '#ffffff',
        borderRadius: '3',
        width: '22',
        height: '22'
      },
      'uni-icon': {
        fontFamily: 'unincomponents',
        fontSize: '16',
        marginLeft: '2',
        marginTop: '2',
        color: '#007aff'
      },
      'uni-checkbox-input-disabled': {
        backgroundColor: '#e1e1e1'
      },
      'uni-checkbox-input-disabled-before': {
        color: '#adadad'
      },
      'uni-slot': {
        fontSize: '16',
        marginLeft: '5'
      },
      'uni-checkbox-group': {
        display: 'block'
      }
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('checkbox', getCheckbox(weex))
}
