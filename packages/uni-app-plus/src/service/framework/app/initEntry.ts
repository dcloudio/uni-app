import { getRouteOptions } from '@dcloudio/uni-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { parseRedirectInfo } from './utils'

let isInitEntryPage = false

export function initEntry() {
  if (isInitEntryPage) {
    return
  }
  isInitEntryPage = true

  let entryPagePath
  let entryPageQuery

  const weexPlus = weex.requireModule('plus')

  if (weexPlus.getRedirectInfo) {
    const { path, query, referrerInfo, appScheme, appLink } =
      parseRedirectInfo()!
    if (path) {
      entryPagePath = path
      entryPageQuery = query
    }
    __uniConfig.referrerInfo = referrerInfo
    __uniConfig.appScheme = appScheme
    __uniConfig.appLink = appLink
  } else {
    const argsJsonStr = plus.runtime.arguments
    if (!argsJsonStr) {
      return
    }
    try {
      const args = JSON.parse(argsJsonStr)
      entryPagePath = args.path || args.pathName
      entryPageQuery = args.query ? '?' + args.query : ''
    } catch (e) {}
  }

  if (!entryPagePath || entryPagePath === __uniConfig.entryPagePath) {
    if (entryPageQuery) {
      __uniConfig.entryPageQuery = entryPageQuery
    }
    return
  }

  const entryRoute = addLeadingSlash(entryPagePath)
  const routeOptions = getRouteOptions(entryRoute)
  if (!routeOptions) {
    return
  }

  if (!routeOptions.meta.isTabBar) {
    __uniConfig.realEntryPagePath =
      __uniConfig.realEntryPagePath || __uniConfig.entryPagePath
  }

  __uniConfig.entryPagePath = entryPagePath
  __uniConfig.entryPageQuery = entryPageQuery
}
