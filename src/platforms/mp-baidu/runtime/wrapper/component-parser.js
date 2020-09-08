import {
  hasOwn
} from 'uni-shared'

import {
  stringifyQuery
} from 'uni-shared/query'

import {
  isPage,
  initRelation
} from './util'

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
  componentOptions.lifetimes.attached = function attached () {
    oldAttached.call(this)
    if (isPage.call(this)) { // 百度 onLoad 在 attached 之前触发
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
