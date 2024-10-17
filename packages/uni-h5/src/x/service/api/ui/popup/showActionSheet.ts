import { isArray } from '@vue/shared'
import { once } from '@dcloudio/uni-shared'
import { updateStyle } from '@dcloudio/uni-core'

// @ts-expect-error
import { showActionSheet2 as showActionSheetOrig } from '@dcloudio/uni-ext-api/uni-actionSheet'

import showActionSheetPage from '@dcloudio/uni-ext-api/uni-actionSheet/pages/actionSheet/actionSheet.vue'

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
  const __uniPage = setupPage(showActionSheetPage)
  __uniRoutes.push({
    path: 'uni:actionSheet',
    component: {
      mpType: 'page',
      setup() {
        const app = getApp()
        const query = (app && app.$route && app.$route.query) || {}
        return () => renderPage(__uniPage, query)
      },
    },
    meta: {
      isQuit: false,
      isEntry: false,
      navigationBar: {},
      route: 'uni:actionSheet',
    },
  })
})

export const showActionSheet2 = (options: unknown) => {
  registerShowActionSheetPageOnce()
  return showActionSheetOrig(options)
}
