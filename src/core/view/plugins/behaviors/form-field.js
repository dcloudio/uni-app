/**
 * uni://form-field
 */
import {
  hasOwn
} from 'uni-shared'

import {
  emitter
} from 'uni-mixins'

function created () {
  this.$dispatch('Form', 'uni-form-group-update', {
    type: 'add',
    vm: this
  })
}

function beforeDestroy () {
  this.$dispatch('Form', 'uni-form-group-update', {
    type: 'remove',
    vm: this
  })
}

export default {
  name: 'uni://form-field',
  init (options, vm) {
    if (
      !vm.constructor.options.props.name ||
            !vm.constructor.options.props.value
    ) { // 未初始化 props
      if (!vm.constructor.options.props.name) {
        vm.constructor.options.props.name = options.props.name = {
          type: String
        }
      }
      if (!vm.constructor.options.props.value) {
        vm.constructor.options.props.value = options.props.value = {
          type: null
        }
      }
    }

    if (!options.propsData) {
      options.propsData = {}
    }

    const $vnode = vm.$vnode
    if ($vnode && $vnode.data && $vnode.data.attrs) {
      if (hasOwn($vnode.data.attrs, 'name')) {
        options.propsData.name = $vnode.data.attrs.name
      }
      if (hasOwn($vnode.data.attrs, 'value')) {
        options.propsData.value = $vnode.data.attrs.value
      }
    }

    if (
      !vm.constructor.options.methods ||
            !vm.constructor.options.methods._getFormData
    ) { // 未初始化 methods
      if (!vm.constructor.options.methods) {
        vm.constructor.options.methods = {}
      }

      if (!options.methods) {
        options.methods = {}
      }

      const formMethods = {
        _getFormData () {
          return this.name ? {
            key: this.name,
            value: this.value
          } : {}
        },
        _resetFormData () {
          this.value = ''
        }
      }

      Object.assign(vm.constructor.options.methods, formMethods)
      Object.assign(options.methods, formMethods)

      // add $dispatch
      Object.assign(vm.constructor.options.methods, emitter.methods)
      Object.assign(options.methods, emitter.methods)

      const createdHooks = options['created']
      vm.constructor.options['created'] = options['created'] =
                createdHooks ? [].concat(created, createdHooks) : [
                  created
                ]

      const beforeDestroyHooks = options['beforeDestroy']
      vm.constructor.options['beforeDestroy'] = options['beforeDestroy'] =
                beforeDestroyHooks ? [].concat(beforeDestroy, beforeDestroyHooks) : [
                  beforeDestroy
                ]
    }
  }
}
