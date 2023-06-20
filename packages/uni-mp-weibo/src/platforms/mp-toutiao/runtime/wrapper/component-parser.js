import {
  isPage,
  initRelation,
  handleLink,
  components
} from './util'

import {
  initSlots,
  initVueIds
} from 'uni-wrapper/util'

import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-base-parser'

function currentComponents (mpInstance, callback) {
  const webviewId = mpInstance.__webviewId__
  const currentComponents = components[webviewId]
  if (currentComponents) {
    callback(currentComponents)
  }
}

export default function parseComponent (vueComponentOptions, needVueOptions) {
  const [componentOptions, vueOptions, VueComponent] = parseBaseComponent(vueComponentOptions, {
    isPage,
    initRelation
  }, true)
  const lifetimes = componentOptions.lifetimes

  // 基础库 2.0 以上 attached 顺序错乱，按照 created 顺序强制纠正
  lifetimes.created = function created () {
    currentComponents(this, components => {
      components.push(this)
    })
  }

  lifetimes.attached = function attached () {
    this.__lifetimes_attached = function () {
      const properties = this.properties

      const options = {
        mpType: isPage.call(this) ? 'page' : 'component',
        mpInstance: this,
        propsData: properties
      }

      initVueIds(properties.vueId, this)

      // 初始化 vue 实例
      this.$vm = new VueComponent(options)

      // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
      initSlots(this.$vm, properties.vueSlots)

      // 处理父子关系
      initRelation.call(this, {
        vuePid: this._$vuePid,
        mpInstance: this
      })

      // 触发首次 setData
      this.$vm.$mount()
    }
    currentComponents(this, components => {
      let component = this
      while (component && component.__lifetimes_attached && components[0] && component === components[0]) {
        components.shift()
        component.__lifetimes_attached()
        delete component.__lifetimes_attached
        component = components[0]
      }
    })
  }

  const oldDetached = lifetimes.detached
  lifetimes.detached = function detached () {
    if (typeof oldDetached === 'function') {
      oldDetached.call(this)
    }
    currentComponents(this, components => {
      const index = components.indexOf(this)
      if (index >= 0) {
        components.splice(index, 1)
      }
    })
  }

  // ready 比 handleLink 还早，初始化逻辑放到 handleLink 中
  delete lifetimes.ready

  componentOptions.methods.__l = handleLink

  return needVueOptions ? [componentOptions, vueOptions] : componentOptions
}
