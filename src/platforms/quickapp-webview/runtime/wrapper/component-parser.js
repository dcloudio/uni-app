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

export default function parseComponent (vueOptions) {
  const [componentOptions, VueComponent] = parseBaseComponent(vueOptions)

  componentOptions.lifetimes.attached = function attached () {
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

  // ready 比 handleLink 还早，初始化逻辑放到 handleLink 中
  delete componentOptions.lifetimes.ready

  componentOptions.methods.__l = handleLink

  return componentOptions
}
