import Vue from 'vue'

import {
  getData,
  initRefs,
  initMocks,
  initMethods,
  handleLink,
  handleEvent,
  getProperties
} from './util'

export function createComponent (vueOptions) {
  vueOptions = vueOptions.default || vueOptions

  const properties = getProperties(vueOptions.props)

  const VueComponent = Vue.extend(vueOptions)

  const componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true
    },
    data: getData(vueOptions.data),
    properties,
    attached () {
      // props的处理，一个是直接 与 mp 的 properties 对接，另一个是要做成 reactive，且排除掉 render watch
      const options = {
        propsData: this.properties,
        $component: this
      }
      // 初始化 vue 实例
      this.$vm = new VueComponent(options)
      this.$vm.mpType = 'component'
      this.$vm.$mp = {
        data: {},
        component: this
      }

      initRefs(this.$vm)
      initMocks(this.$vm)

      // 初始化渲染数据
      this.$vm.$mount()
    },
    ready () {
      this.triggerEvent('__l', this.$vm)

      const eventId = this.dataset.eventId
      if (eventId) {
        const listeners = this.$vm.$parent.$mp.listeners
        if (listeners) {
          const listenerOpts = listeners[eventId]
          Object.keys(listenerOpts).forEach(eventType => {
            listenerOpts[eventType].forEach(handler => {
              this.$vm[handler.once ? '$once' : '$on'](eventType, handler)
            })
          })
        }
      }

      this.$vm._isMounted = true
      this.$vm.__call_hook('mounted')
      this.$vm.__call_hook('onReady')
    },
    detached () {
      this.$vm.$destroy()
    },
    pageLifetimes: {
      show (args) {
        this.$vm.__call_hook('onPageShow', args)
      },
      hide () {
        this.$vm.__call_hook('onPageHide')
      },
      resize (size) {
        this.$vm.__call_hook('onPageResize', size)
      }
    },
    methods: {
      __e: handleEvent,
      __l: handleLink
    }
  }

  initMethods(componentOptions.methods, vueOptions)

  return Component(componentOptions)
}
