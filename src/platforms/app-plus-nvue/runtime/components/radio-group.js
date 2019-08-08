import {
  emitter,
  listeners
} from '../mixins'

function getRadioGroup (weex) {
  return {
    name: 'RadioGroup',
    mixins: [emitter, listeners],
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    data: function data () {
      return {
        radioList: []
      }
    },
    listeners: {
      '@radio-change': '_changeHandler',
      '@radio-group-update': '_radioGroupUpdateHandler'
    },
    mounted () {
      this._resetRadioGroupValue(this.radioList.length - 1)
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
      _changeHandler ($event, vm) {
        const index = this.radioList.indexOf(vm)
        this._resetRadioGroupValue(index, true)
        this.$trigger('change', {
          value: vm.radioValue
        })
      },
      _radioGroupUpdateHandler ($event) {
        if ($event.type === 'add') {
          this.radioList.push($event.vm)
        }
        else {
          const index = this.radioList.indexOf($event.vm)
          this.radioList.splice(index, 1)
        }
      },
      _resetRadioGroupValue (key, change) {
        const _this = this

        this.radioList.forEach(function (value, index) {
          if (index === key) {
            return
          }
          if (change) {
            _this.radioList[index].radioChecked = false
          }
          else {
            _this.radioList.forEach(function (v, i) {
              if (index >= i) {
                return
              }
              if (_this.radioList[i].radioChecked) {
                _this.radioList[index].radioChecked = false
              }
            })
          }
        })
      },
      _getFormData () {
        const data = {}
        if (this.name !== '') {
          let value = ''
          this.radioList.forEach(function (vm) {
            if (vm.radioChecked) {
              value = vm.value
            }
          })
          data['value'] = value
          data['key'] = this.name
        }
        return data
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('div', _vm._g({}, _vm.$listeners), [_vm._t('default')], 2)
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('radio-group', getRadioGroup(weex))
}
