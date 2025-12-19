import { getRouteOptions } from '@dcloudio/uni-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { parseRedirectInfo } from './utils'

let isInitEntryPage = false

export function initEntry(app: IApp) {
  if (isInitEntryPage) {
    return
  }
  isInitEntryPage = true

  let entryPagePath
  let entryPageQuery

  const redirectInfo = app.getRedirectInfo()

  if (redirectInfo.size > 0) {
    const { path, query /* referrerInfo, appScheme, appLink */ } =
      parseRedirectInfo(app)
    if (path) {
      entryPagePath = path
      entryPageQuery = query
    }
    /* __uniConfig.referrerInfo = referrerInfo
    __uniConfig.appScheme = appScheme
    __uniConfig.appLink = appLink */
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
