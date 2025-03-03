import { extend } from '@vue/shared'
import { inject, provide, reactive } from 'vue'
import { useRoute } from 'vue-router'

import {
  NAVBAR_HEIGHT,
  addLeadingSlash,
  parseQuery,
} from '@dcloudio/uni-shared'
import {
  PolySymbol,
  initNavigationBarI18n,
  initRouteMeta,
  normalizePullToRefreshRpx,
} from '@dcloudio/uni-core'

import safeAreaInsets from 'safe-area-insets'

const pageMetaKey = PolySymbol(__DEV__ ? 'UniPageMeta' : 'upm')

export function usePageMeta() {
  return inject<UniApp.PageRouteMeta>(pageMetaKey)!
}

export function providePageMeta(id: number) {
  const pageMeta = initPageMeta(id)
  provide(pageMetaKey, pageMeta)
  return pageMeta
}
export function usePageRoute() {
  if (__UNI_FEATURE_PAGES__) {
    return useRoute()
  }
  const url = location.href
  const searchPos = url.indexOf('?')
  const hashPos = url.indexOf('#', searchPos > -1 ? searchPos : 0)
  let query = {}
  if (searchPos > -1) {
    query = parseQuery(
      url.slice(searchPos + 1, hashPos > -1 ? hashPos : url.length)
    )
  }
  const { meta } = __uniRoutes[0]
  const path = addLeadingSlash(meta.route)
  return {
    meta,
    query: query,
    path,
    matched: [{ path }],
  }
}
function initPageMeta(id: number) {
  if (__UNI_FEATURE_PAGES__) {
    return reactive<UniApp.PageRouteMeta>(
      normalizePageMeta(
        JSON.parse(
          JSON.stringify(
            initRouteMeta(
              useRoute().meta as unknown as UniApp.PageRouteMeta,
              id
            )
          )
        )
      )
    )
  }
  return reactive<UniApp.PageRouteMeta>(
    normalizePageMeta(
      JSON.parse(JSON.stringify(initRouteMeta(__uniRoutes[0].meta, id)))
    )
  )
}

function normalizePageMeta(pageMeta: UniApp.PageRouteMeta) {
  if (__UNI_FEATURE_PULL_DOWN_REFRESH__) {
    const { enablePullDownRefresh, navigationBar } = pageMeta
    if (__X__ || enablePullDownRefresh) {
      const pullToRefresh = normalizePullToRefreshRpx(
        extend(
          {
            support: true,
            color: '#2BD009',
            style: 'circle',
            height: 70,
            range: 150,
            offset: 0,
          },
          pageMeta.pullToRefresh
        )
      )
      const { type, style } = navigationBar
      if (style !== 'custom' && type !== 'transparent') {
        pullToRefresh.offset! +=
          NAVBAR_HEIGHT + (__NODE_JS__ ? 0 : safeAreaInsets.top)
      }
      pageMeta.pullToRefresh = pullToRefresh
    }
  }
  if (__UNI_FEATURE_NAVIGATIONBAR__ || __UNI_FEATURE_I18N_LOCALE__) {
    const { navigationBar } = pageMeta
    const { titleSize, titleColor, backgroundColor } = navigationBar
    navigationBar.titleText = navigationBar.titleText || ''
    navigationBar.type = navigationBar.type || 'default'
    navigationBar.titleSize = titleSize || '16px'
    navigationBar.titleColor = titleColor || '#000000'
    navigationBar.backgroundColor = backgroundColor || '#F8F8F8'
    __UNI_FEATURE_I18N_LOCALE__ && initNavigationBarI18n(navigationBar)
  }
  if (!__NODE_JS__ && __UNI_FEATURE_PAGES__ && history.state) {
    // 首页执行了redirectTo
    const type = history.state.__type__
    if (
      (type === 'redirectTo' || type === 'reLaunch') &&
      getCurrentPages().length === 0
    ) {
      pageMeta.isEntry = true
      pageMeta.isQuit = true
    }
  }

  return pageMeta
}
