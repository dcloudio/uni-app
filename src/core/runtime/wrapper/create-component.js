import Vue from 'vue'

import {
  handleLink,
  triggerLink
} from 'uni-platform/runtime/wrapper/index'

import {
  getData,
  handleEvent,
  getProperties
} from './util'

function initVueComponent (mpInstace, VueComponent, extraOptions = {}) {
  if (mpInstace.$vm) {
    return
  }

  const options = Object.assign({
    mpType: 'component',
    mpInstance: mpInstace,
    propsData: mpInstace.properties
  }, extraOptions)
  // 初始化 vue 实例
  mpInstace.$vm = new VueComponent(options)

  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  const vueSlots = mpInstace.properties.vueSlots
  if (Array.isArray(vueSlots) && vueSlots.length) {
    const $slots = Object.create(null)
    vueSlots.forEach(slotName => {
      $slots[slotName] = true
    })
    mpInstace.$vm.$scopedSlots = mpInstace.$vm.$slots = $slots
  }
}

export function createComponent (vueOptions) {
  vueOptions = vueOptions.default || vueOptions

  const properties = getProperties(vueOptions.props)

  const VueComponent = Vue.extend(vueOptions)

  const componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true
    },
    data: getData(vueOptions),
    properties,
    lifetimes: {
      attached () {
        initVueComponent(this, VueComponent)
      },
      ready () {
        initVueComponent(this, VueComponent) // 目前发现部分情况小程序 attached 不触发
        triggerLink(this) // 处理 parent,children

        // 初始化渲染数据(需要等 parent，inject 都初始化完成，否则可以放到 attached 里边初始化渲染)
        this.$vm.__call_hook('created')
        this.$vm.$mount()
        this.$vm._isMounted = true
        this.$vm.__call_hook('mounted')
        this.$vm.__call_hook('onReady')
      },
      detached () {
        if (__PLATFORM__ === 'mp-baidu') {
          delete this.pageinstance.$baiduComponentInstances[this.id]
        }
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

  return Component(componentOptions)
}
