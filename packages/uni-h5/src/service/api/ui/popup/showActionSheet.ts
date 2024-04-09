import {
  API_SHOW_ACTION_SHEET,
  type API_TYPE_SHOW_ACTION_SHEET,
  ShowActionSheetOptions,
  ShowActionSheetProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { once } from '@dcloudio/uni-shared'
import { extend } from '@vue/shared'
import { nextTick, reactive } from 'vue'
import actionSheet, { type Props } from './actionSheet'
import { createRootApp, ensureRoot } from './utils'

let resolveAction: UniApp.ShowActionSheetOptions['success']
let rejectAction: UniApp.ShowActionSheetOptions['fail']

let showActionSheetState: Props

const onHidePopupOnce = /*#__PURE__*/ once(() => {
  UniServiceJSBridge.on(
    'onHidePopup',
    () => (showActionSheetState.visible = false)
  )
})

function onActionSheetClose(tapIndex: number) {
  if (tapIndex === -1) {
    rejectAction && rejectAction('cancel')
  } else {
    resolveAction && resolveAction({ tapIndex })
  }
}

export const hideActionSheet = () => {
  if (showActionSheetState) {
    showActionSheetState.visible = false
  }
}

export const showActionSheet = defineAsyncApi<API_TYPE_SHOW_ACTION_SHEET>(
  API_SHOW_ACTION_SHEET,
  (args, { resolve, reject }) => {
    onHidePopupOnce()
    resolveAction = resolve
    rejectAction = reject
    if (!showActionSheetState) {
      showActionSheetState = reactive(args as Props)
      // 异步执行，避免干扰 getCurrentInstance
      nextTick(
        () => (
          createRootApp(
            actionSheet,
            showActionSheetState,
            onActionSheetClose
          ).mount(ensureRoot('u-s-a-s')), //下一帧执行，确保首次显示时有动画效果
          nextTick(() => (showActionSheetState.visible = true))
        )
      )
    } else {
      extend(showActionSheetState, args)
      showActionSheetState.visible = true
    }
  },
  ShowActionSheetProtocol,
  ShowActionSheetOptions
)
