export default function createPage (pageVm) {
  const $route = pageVm.$route
  pageVm.route = $route.meta.pagePath
  pageVm.__page__ = {
    id: $route.params.__id__,
    path: $route.path,
    route: $route.meta.pagePath,
    meta: Object.assign({}, $route.meta)
  }
  // 兼容 mpvue
  pageVm.$vm = pageVm
  pageVm.$root = pageVm
  // 补充 mp 相关属性
  pageVm.$mp = {
    mpType: 'page',
    page: pageVm,
    query: {},
    // 暂不支持
    status: ''
  }
}
