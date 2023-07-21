import Vue from 'vue'

import {
  initData,
  initSlots,
  initVueIds,
  handleEvent,
  initBehaviors,
  initProperties,
  initVueComponent
} from 'uni-wrapper/util'

import {
  handleLink,
  initBehavior
} from './util'

export default function parseBaseComponent (vueComponentOptions, {
  isPage,
  initRelation
} = {}, needVueOptions) {
  const [VueComponent, vueOptions] = initVueComponent(Vue, vueComponentOptions)

  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    ...(vueOptions.options || {})
  }

  if (__PLATFORM__ === 'mp-weixin' || __PLATFORM__ === 'mp-qq') {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options)
    }
  }

  const componentOptions = {
    options,
    data: initData(vueOptions, Vue.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached () {
        const properties = this.properties

        const options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        }

        initVueIds(properties.vueId, this)

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        })

        // 初始化 vue 实例
        this.$vm = new VueComponent(options)

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots)

        // 触发首次 setData
        this.$vm.$mount()
      },
      ready () {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true
          this.$vm.__call_hook('mounted')
          this.$vm.__call_hook('onReady')
        } else {
          // this.is && console.warn(this.is + ' is not attached')
        }
      },
      detached () {
        this.$vm && this.$vm.$destroy()
      }
    },
    pageLifetimes: {
      show (args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args)
      },
      hide () {
        this.$vm && this.$vm.__call_hook('onPageHide')
      },
      resize (size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size)
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  }
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(callMethod => {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args)
      }
    })
  }

  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent]
  }
  if (isPage) {
    return componentOptions
  }
  return [componentOptions, VueComponent]
}
