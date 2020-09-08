import {
  hasOwn
} from 'uni-shared'

import EventChannel from 'uni-helpers/EventChannel'

export default function createPage (pageVm, options) {
  const $route = pageVm.$route
  pageVm.route = $route.meta.pagePath
  if (!pageVm.options) { // 可能开发者会声明 options 属性
    pageVm.options = options
  }

  const id = hasOwn($route.params, '__id__') ? $route.params.__id__ : $route.meta.id
  pageVm.__page__ = {
    id,
    path: $route.path,
    route: $route.meta.pagePath,
    fullPath: $route.meta.isEntry ? $route.meta.pagePath : $route.fullPath,
    options: options,
    meta: Object.assign({}, $route.meta)
  }
  const eventChannel = pageVm.$router.$eventChannel || new EventChannel()
  pageVm.getOpenerEventChannel = function () {
    return eventChannel
  }
  // 兼容 mpvue
  pageVm.$vm = pageVm
  pageVm.$root = pageVm
  pageVm.$holder = pageVm.$parent.$parent
  // 补充 mp 相关属性
  pageVm.$mp = {
    mpType: 'page',
    page: pageVm,
    query: {},
    // 暂不支持
    status: ''
  }
}
