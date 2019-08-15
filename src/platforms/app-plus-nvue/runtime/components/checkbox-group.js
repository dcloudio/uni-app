import {
  emitter,
  listeners
} from '../mixins'

function getCheckboxGroup (weex) {
  return {
    name: 'CheckboxGroup',
    mixins: [emitter, listeners],
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        checkboxList: []
      }
    },

    listeners: {
      '@checkbox-change': '_changeHandler',
      '@checkbox-group-update': '_checkboxGroupUpdateHandler'
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
      _changeHandler ($event) {
        const value = []
        this.checkboxList.forEach(function (vm) {
          if (vm.checkboxChecked) {
            value.push(vm.value)
          }
        })
        this.$trigger('change', {
          value: value
        })
      },
      _checkboxGroupUpdateHandler ($event) {
        if ($event.type === 'add') {
          this.checkboxList.push($event.vm)
          //global .nativeLog(JSON.stringify(this.checkboxList))
          //global .nativeLog('checkboxList 更新')
        }
        else {
          const index = this.checkboxList.indexOf($event.vm)
          this.checkboxList.splice(index, 1)
        }
      },
      _getFormData () {
        const data = {}
        if (this.name !== '') {
          const value = []
          this.checkboxList.forEach(function (vm) {
            if (vm.checkboxChecked) {
              value.push(vm.value)
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
      return createElement('div', _vm._g({
        staticClass: ['uni-checkbox-group']
      }, _vm.$listeners), [_vm._t('default')], 2)
    },
    style: {}
  }
}

export default function init (Vue, weex) {
  Vue.component('checkbox-group', getCheckboxGroup(weex))
}
