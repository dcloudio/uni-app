import Vue from 'vue'

import {
  getData,
  handleLink,
  handleEvent,
  getProperties
} from './util'

function initVueComponent (mpInstace, VueComponent) {
  if (mpInstace.$vm) {
    return
  }

  const options = {
    mpType: 'component',
    mpInstance: mpInstace,
    propsData: mpInstace.properties
  }
  // 初始化 vue 实例
  mpInstace.$vm = new VueComponent(options)

  // 初始化渲染数据
  mpInstace.$vm.$mount()
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

        if (__PLATFORM__ === 'mp-baidu') {
          const baiduComponentInstances = this.pageinstance.$baiduComponentInstances

          baiduComponentInstances[this.id] = this
          if (this.ownerId) { // 组件嵌组件
            const parentBaiduComponentInstance = baiduComponentInstances[this.ownerId]
            if (parentBaiduComponentInstance) {
              this.$vm.$parent = parentBaiduComponentInstance.$vm
            } else {
              console.error(`查找父组件失败${this.ownerId}`)
            }
          } else { // 页面直属组件
            this.$vm.$parent = this.pageinstance.$vm
          }
        } else {
          this.triggerEvent('__l', this.$vm) // TODO 百度仅能传递 json 对象
        }

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

  return Component(componentOptions)
}
