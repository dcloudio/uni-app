import { reactive, provide, inject } from 'vue'
import { useRoute } from 'vue-router'

import { NAVBAR_HEIGHT } from '@dcloudio/uni-shared'
import { PolySymbol, rpx2px } from '@dcloudio/uni-core'

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

function initPageMeta(id: number) {
  if (__UNI_FEATURE_PAGES__) {
    return reactive<UniApp.PageRouteMeta>(
      normalizePageMeta(
        JSON.parse(
          JSON.stringify(
            mergePageMeta(
              id,
              (useRoute().meta as unknown) as UniApp.PageRouteMeta
            )
          )
        )
      )
    )
  }
  return reactive<UniApp.PageRouteMeta>(
    normalizePageMeta(
      JSON.parse(JSON.stringify(mergePageMeta(id, __uniRoutes[0].meta)))
    )
  )
}

const PAGE_META_KEYS: ['navigationBar', 'refreshOptions'] = [
  'navigationBar',
  'refreshOptions',
]

function mergePageMeta(id: number, pageMeta: UniApp.PageRouteMeta) {
  const res = Object.assign({ id }, __uniConfig.globalStyle, pageMeta)
  PAGE_META_KEYS.forEach((name) => {
    ;(res as any)[name] = Object.assign(
      {},
      __uniConfig.globalStyle[name] || {},
      pageMeta[name] || {}
    )
  })
  return res
}

function normalizePageMeta(pageMeta: UniApp.PageRouteMeta) {
  if (__UNI_FEATURE_PULL_DOWN_REFRESH__) {
    const { enablePullDownRefresh, navigationBar } = pageMeta
    if (enablePullDownRefresh) {
      const refreshOptions = Object.assign(
        {
          support: true,
          color: '#2BD009',
          style: 'circle',
          height: 70,
          range: 150,
          offset: 0,
        },
        pageMeta.refreshOptions || {}
      )
      let offset = rpx2px(refreshOptions.offset)
      const { type } = navigationBar
      if (type !== 'transparent' && type !== 'none') {
        offset += NAVBAR_HEIGHT + safeAreaInsets.top
      }
      refreshOptions.offset = offset
      refreshOptions.height = rpx2px(refreshOptions.height)
      refreshOptions.range = rpx2px(refreshOptions.range)
      pageMeta.refreshOptions = refreshOptions
    }
  }
  if (__UNI_FEATURE_NAVIGATIONBAR__) {
    const { navigationBar } = pageMeta
    navigationBar.backButton = pageMeta.isQuit ? false : true
    navigationBar.titleColor = navigationBar.titleColor || '#fff'
    navigationBar.backgroundColor = navigationBar.backgroundColor || '#F7F7F7'
  }
  if (__UNI_FEATURE_PAGES__ && history.state) {
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
