import {
  emitter,
  listeners
} from '../mixins'

const NATIVE_COMPONENT_TYPES = ['u-input', 'u-textarea']

function getForm (weex) {
  const modulePlus = weex.requireModule('plus')
  return {
    name: 'Form',
    mixins: [emitter, listeners],
    data: function data () {
      return {
        childrenList: []
      }
    },
    listeners: {
      '@form-submit': '_onSubmit',
      '@form-reset': '_onReset',
      '@form-group-update': '_formGroupUpdateHandler'
    },
    methods: {
      _onSubmit ($event) {
        const data = this._getNativeFormData() || {}
        this.childrenList.forEach(function (vm) {
          if (vm._getFormData && vm._getFormData().key) {
            data[vm._getFormData().key] = vm._getFormData().value
          }
        })
        this.$trigger('submit', {
          value: data
        })
      },
      _onReset ($event) {
        this.$trigger('reset', {})
        this._getNativeFormData(true)
        this.childrenList.forEach(function (vm) {
          vm._resetFormData && vm._resetFormData()
        })
      },
      _formGroupUpdateHandler ($event) {
        if ($event.type === 'add') {
          this.childrenList.push($event.vm)
        }
        else {
          const index = this.childrenList.indexOf($event.vm)
          this.childrenList.splice(index, 1)
        }
      },
      _getNativeFormData (isClear) {
        const data = {}

        function find (nodes) {
          nodes.forEach(function (node) {
            if (NATIVE_COMPONENT_TYPES.indexOf(node.tag) >= 0 && node.data.attrs && node.data.attrs['name']) {
              if (isClear) {
                node.elm.setValue('')
              }
              else {
                data[node.data.attrs['name']] = modulePlus.getValue(node.elm.nodeId)
              }
            }
            if (node.children) {
              find(node.children)
            }
          })
        }

        find(this.$vnode.componentOptions.children)

        return data
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('view', _vm._g({}, _vm.$listeners), [_vm._t('default')], 2)
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('form', getForm(weex))
}
