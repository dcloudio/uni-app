export default function createPage (pageVm) {
  const $route = pageVm.$route
  pageVm.route = $route.meta.pagePath
  pageVm.__page__ = {
    id: $route.params.__id__,
    path: $route.path,
    route: $route.meta.pagePath,
    meta: Object.assign({}, $route.meta)
  }
}
