import { isArray } from '@vue/shared'
import { once } from '@dcloudio/uni-shared'
import { updateStyle } from '@dcloudio/uni-core'

// @ts-expect-error
import { showActionSheet as showActionSheetOrig } from '@dcloudio/uni-ext-api/uni-showActionSheet'

import showActionSheetPage from '@dcloudio/uni-ext-api/uni-showActionSheet/pages/showActionSheet/showActionSheet.vue'

import { renderPage } from '../utils'
import { setupPage } from '../../../../../framework/setup'

const registerShowActionSheetPageOnce = once(() => {
  if (
    isArray(showActionSheetPage.styles) &&
    showActionSheetPage.styles.length > 0
  ) {
    // 插入dom style
    showActionSheetPage.styles.forEach((style: string, index: number) => {
      updateStyle(`uni-showActionSheet-style-${index}`, style)
    })
  }
  setupPage(showActionSheetPage)
  __uniRoutes.push({
    path: 'uni:showActionSheet',
    component: {
      setup() {
        const app = getApp()
        const query = (app && app.$route && app.$route.query) || {}
        return () => renderPage(showActionSheetPage, query)
      },
    },
    meta: {
      isQuit: false,
      isEntry: false,
      navigationBar: {},
      route: 'uni:showActionSheet',
    },
  })
})

export const showActionSheet = (options: unknown) => {
  registerShowActionSheetPageOnce()
  return showActionSheetOrig(options)
}
