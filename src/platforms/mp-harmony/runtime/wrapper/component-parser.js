import {
  hasOwn,
  isPlainObject
} from 'uni-shared'

import {
  isPage,
  initRelation,
  handleLink
} from './util'

import {
  initSlots,
  initVueIds
} from 'uni-wrapper/util'

import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-base-parser'

function resolvePropsData (properties) {
  if (__PLATFORM__ === 'mp-harmony') {
    const propsData = {}
    Object.keys(properties).forEach(name => {
      propsData[name] = resolvePropValue(properties[name])
    })
    return propsData
  }
  return properties
}

function resolvePropValue (prop) {
  if (__PLATFORM__ === 'mp-harmony') {
    if (isPlainObject(prop) && hasOwn(prop, 'value')) {
      // 目前 mp-harmony 的 prop 返回的是配置项？
      return prop.value
    }
  }
  return prop
}

export default function parseComponent (vueComponentOptions, needVueOptions) {
  const [componentOptions, vueOptions, VueComponent] = parseBaseComponent(vueComponentOptions, {
    isPage,
    initRelation
  }, true)

  const properties = componentOptions.properties
  if (properties) {
    const observers = {}
    Object.keys(properties).forEach(name => {
      const options = properties[name]
      const observer = options.observer
      if (observer) {
        observers[name] = observer
        delete options.observer
      }
    })
    componentOptions.observers = observers
  }

  componentOptions.lifetimes.attached = function attached () {
    const properties = this.properties

    const options = {
      mpType: isPage.call(this) ? 'page' : 'component',
      mpInstance: this,
      propsData: resolvePropsData(properties)
    }

    initVueIds(resolvePropValue(properties.vueId), this)

    // 初始化 vue 实例
    this.$vm = new VueComponent(options)

    // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
    initSlots(this.$vm, resolvePropValue(properties.vueSlots))

    // 处理父子关系
    initRelation.call(this, {
      vuePid: this._$vuePid,
      mpInstance: this
    })

    // 触发首次 setData
    this.$vm.$mount()
  }

  // ready 比 handleLink 还早，初始化逻辑放到 handleLink 中
  delete componentOptions.lifetimes.ready

  componentOptions.methods.__l = handleLink

  return needVueOptions ? [componentOptions, vueOptions] : componentOptions
}
