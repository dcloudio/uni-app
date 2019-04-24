import Vue from 'vue'

import {
  isFn
} from 'uni-shared'

import {
  handleLink,
  triggerLink,
  initComponent
} from 'uni-platform/runtime/wrapper/index'

import {
  getData,
  handleEvent,
  getBehaviors,
  getProperties
} from './util'

function initVm (VueComponent) {
  if (this.$vm) {
    return
  }

  const properties = __PLATFORM__ === 'mp-alipay'
    ? this.props
    : this.properties

  const options = {
    mpType: 'component',
    mpInstance: this,
    propsData: properties
  }
  // 初始化 vue 实例
  this.$vm = new VueComponent(options)

  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  const vueSlots = properties.vueSlots
  if (Array.isArray(vueSlots) && vueSlots.length) {
    const $slots = Object.create(null)
    vueSlots.forEach(slotName => {
      $slots[slotName] = true
    })
    this.$vm.$scopedSlots = this.$vm.$slots = $slots
  }
  // 性能优先，mount 提前到 attached 中，保证组件首次渲染数据被合并
  // 导致与标准 Vue 的差异，data 和 computed 中不能使用$parent，provide等组件属性
  this.$vm.$mount()
}

export function createComponent (vueOptions) {
  vueOptions = vueOptions.default || vueOptions

  let VueComponent
  if (isFn(vueOptions)) {
    VueComponent = vueOptions // TODO form-field props.name,props.value
    vueOptions = VueComponent.extendOptions
  } else {
    VueComponent = Vue.extend(vueOptions)
  }

  const behaviors = getBehaviors(vueOptions)

  const properties = getProperties(vueOptions.props, false, vueOptions.__file)

  const componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true
    },
    data: getData(vueOptions, Vue.prototype),
    behaviors,
    properties,
    lifetimes: {
      attached () {
        initVm.call(this, VueComponent)
      },
      ready () {
        initVm.call(this, VueComponent) // 目前发现部分情况小程序 attached 不触发
        triggerLink(this) // 处理 parent,children

        // 补充生命周期
        this.$vm.__call_hook('created')
        this.$vm.__call_hook('beforeMount')
        this.$vm._isMounted = true
        this.$vm.__call_hook('mounted')
        this.$vm.__call_hook('onReady')
      },
      detached () {
        this.$vm.$destroy()
      }
    },
    pageLifetimes: {
      show (args) {
        this.$vm.__call_hook('onPageShow', args)
      },
      hide () {
        this.$vm && this.$vm.__call_hook('onPageHide')
      },
      resize (size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size)
      }
    },
    methods: {
      __e: handleEvent,
      __l: handleLink
    }
  }

  return initComponent(componentOptions, vueOptions)
}
