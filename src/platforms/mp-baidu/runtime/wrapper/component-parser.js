import {
  hasOwn
} from 'uni-shared'

import {
  stringifyQuery
} from 'uni-shared/query'

import {
  isPage,
  initRelation,
  mocks
} from './util'

import {
  initMocks
} from 'uni-wrapper/util'

import {
  fixSetDataStart,
  fixSetDataEnd
} from '../../../mp-weixin/runtime/wrapper/fix-set-data'

import parseBaseComponent from '../../../mp-weixin/runtime/wrapper/component-base-parser'

const newLifecycle = swan.canIUse('lifecycle-2-0')

export default function parseComponent (vueOptions) {
  const componentOptions = parseBaseComponent(vueOptions, {
    isPage,
    initRelation
  })

  // 关于百度小程序生命周期的说明(组件作为页面时):
  // lifetimes:attached --> methods:onShow --> methods:onLoad --> methods:onReady
  // 这里在强制将onShow挪到onLoad之后触发,另外一处修改在page-parser.js
  const oldAttached = componentOptions.lifetimes.attached
  // 百度小程序基础库 3.260 以上支持页面 onInit 生命周期，提前创建 vm 实例
  componentOptions.lifetimes.onInit = function onInit (query) {
    // 百度小程序后续可能移除 pageinstance 属性，为向后兼容进行补充
    if (!this.pageinstance || !this.pageinstance.setData) {
      const pages = getCurrentPages()
      this.pageinstance = pages[pages.length - 1]
    }

    // 处理百度小程序 onInit 生命周期调用 setData 无效的问题
    fixSetDataStart(this)
    oldAttached.call(this)
    this.pageinstance.$vm = this.$vm
    this.$vm.__call_hook('onInit', query)
  }
  componentOptions.lifetimes.attached = function attached () {
    if (!this.$vm) {
      oldAttached.call(this)
    } else {
      initMocks(this.$vm, mocks)
      fixSetDataEnd(this)
    }
    if (isPage.call(this)) { // 百度 onLoad 在 attached 之前触发（基础库小于 3.70）
      // 百度 当组件作为页面时 pageinstancce 不是原来组件的 instance
      this.pageinstance.$vm = this.$vm
      if (hasOwn(this.pageinstance, '_$args')) {
        const query = this.pageinstance._$args
        const copyQuery = Object.assign({}, query)
        delete copyQuery.__id__
        this.pageinstance.$page = this.$page = {
          fullPath: '/' + this.pageinstance.route + stringifyQuery(copyQuery)
        }
        this.$vm.$mp.query = query
        this.$vm.__call_hook('onLoad', query)
        this.$vm.__call_hook('onShow')
        delete this.pageinstance._$args
      }
    } else {
      // 百度小程序组件不触发methods内的onReady
      if (this.$vm) {
        this.$vm._isMounted = true
        this.$vm.__call_hook('mounted')
      }
    }
  }

  if (newLifecycle) {
    componentOptions.methods.onReady = componentOptions.lifetimes.ready
    delete componentOptions.lifetimes.ready
  }

  componentOptions.messages = {
    __l: componentOptions.methods.__l
  }
  delete componentOptions.methods.__l

  return componentOptions
}
