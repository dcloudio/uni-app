import { once } from '@dcloudio/uni-shared'

import showActionSheetPage from '@dcloudio/uni-ext-api/uni-actionSheet/pages/actionSheet/actionSheet.vue'

import { definePage } from '../../../../service/framework/page'

const registerShowActionSheetPage = once(() => {
  const route = 'uni:actionSheet'
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

export const showActionSheet2 = (options: any) => {
  registerShowActionSheetPage()
  const uuid = Date.now() + '' + Math.floor(Math.random() * 1e7)
  const baseEventName = `_action_sheet_${uuid}`
  const readyEventName = `${baseEventName}_ready`
  const optionsEventName = `${baseEventName}_options`
  const successEventName = `${baseEventName}_success`
  const failEventName = `${baseEventName}_fail`
  uni.$on(readyEventName, () => {
    uni.$emit(optionsEventName, options)
  })
  uni.$on(successEventName, (index: number) => {
    options.success?.({ errMsg: 'showActionSheet:ok', tapIndex: index })
  })
  uni.$on(failEventName, () => {
    options.fail?.({ errMsg: `showActionSheet:failed cancel` })
  })
  uni.openDialogPage({
    url: `uni:actionSheet?readyEventName=${readyEventName}&optionsEventName=${optionsEventName}&successEventName=${successEventName}&failEventName=${failEventName}`,
    fail: function (err) {
      options.fail?.({ errMsg: `showActionSheet:failed, ${err.errMsg}` })
      uni.$off(readyEventName)
    },
  })
}
