import { reactive, provide, inject } from 'vue'
import { useRoute } from 'vue-router'

import { NAVBAR_HEIGHT } from '@dcloudio/uni-shared'
import { PolySymbol, rpx2px } from '@dcloudio/uni-core'

import safeAreaInsets from 'safe-area-insets'

const pageMetaKey = PolySymbol(__DEV__ ? 'UniPageMeta' : 'upm')

export function usePageMeta() {
  return inject<UniApp.PageRouteMeta>(pageMetaKey)!
}

export function providePageMeta() {
  const pageMeta = initPageMeta()
  provide(pageMetaKey, pageMeta)
  return pageMeta
}

function initPageMeta() {
  if (__UNI_FEATURE_PAGES__) {
    return reactive<UniApp.PageRouteMeta>(
      normalizePageMeta(
        JSON.parse(
          JSON.stringify(
            mergePageMeta((useRoute().meta as unknown) as UniApp.PageRouteMeta)
          )
        )
      )
    )
  }
  return reactive<UniApp.PageRouteMeta>(
    normalizePageMeta(
      JSON.parse(JSON.stringify(mergePageMeta(__uniRoutes[0].meta)))
    )
  )
}

const PAGE_META_KEYS: ['navigationBar', 'refreshOptions'] = [
  'navigationBar',
  'refreshOptions',
]

function mergePageMeta(pageMeta: UniApp.PageRouteMeta) {
  const res = Object.assign({}, __uniConfig.globalStyle, pageMeta)
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
    refreshOptions.height = rpx2px(refreshOptions.height)
    refreshOptions.range = rpx2px(refreshOptions.range)
    pageMeta.refreshOptions = refreshOptions
  }
  navigationBar.backButton = pageMeta.isQuit ? false : true
  navigationBar.titleColor = navigationBar.titleColor || '#fff'
  navigationBar.backgroundColor = navigationBar.backgroundColor || '#F7F7F7'
  return pageMeta
}
