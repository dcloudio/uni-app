import { once } from '@dcloudio/uni-shared'

import showActionSheetPage from '@dcloudio/uni-ext-api/uni-showActionSheet/pages/showActionSheet/showActionSheet.vue'

import { definePage } from '../../../service/framework/page'

const registerShowActionSheetPage = once(() => {
  const route = 'uni:showActionSheet'
  __uniRoutes.push({
    path: route,
    meta: {
      isQuit: false,
      isEntry: false,
      route,
      navigationBar: {},
    },
  })

  definePage(route, showActionSheetPage)
})

export const showActionSheet = (options: unknown) => {
  registerShowActionSheetPage()
  // TODO
}
