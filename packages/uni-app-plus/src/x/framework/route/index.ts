import { extend } from '@vue/shared'
import { getCurrentPage } from '@dcloudio/uni-core'
import { addLeadingSlash, parseUrl } from '@dcloudio/uni-shared'

import { definePage } from '../../../service/framework/page'

export function hasLeadingSlash(str: string): boolean {
  return str.indexOf('/') == 0
}

export function getRealPath(path: string, fix: boolean = false): string {
  if (hasLeadingSlash(path)) {
    return path
  }
  if (fix && path.indexOf('.') !== 0) {
    return '/' + path
  }
  const currentPage = (getCurrentPage() as unknown as UniPage).vm
  const currentPath = !currentPage ? '/' : parseUrl(currentPage!.route!).path
  const currentPathArray = currentPath.split('/')
  const pathArray = path.split('/')
  const resultArray: string[] = []
  for (let index = 0; index < pathArray.length; index++) {
    const element = pathArray[index]
    if (element == '..') {
      currentPathArray.pop()
    } else if (element != '.') {
      resultArray.push(element)
    }
  }
  return addLeadingSlash(currentPathArray.concat(resultArray).join('/'))
}
export const systemRoutes: UniApp.UniRoute[] = []
export function registerSystemRoute(
  route: string,
  page: any,
  meta: Partial<UniApp.PageRouteMeta> = {}
) {
  if (systemRoutes.find((r) => r.path === route)) {
    return
  }
  systemRoutes.push({
    path: route,
    meta: extend(
      {
        isQuit: false,
        isEntry: false,
        route,
        navigationBar: {},
      },
      meta
    ),
  })

  definePage(route, page)
}
