import { createVNode } from 'vue'
export {
  Transition as ToastTransition,
  defineComponent as defineToast,
} from 'vue'
import {
  ICON_PATH_SUCCESS_NO_CIRCLE,
  ICON_PATH_WARN,
  createSvgIconVNode,
} from '@dcloudio/uni-core'
import type { API_TYPE_SHOW_TOAST_ICON } from '@dcloudio/uni-api'

const ToastIconClassName = 'uni-toast__icon'

export function createToastIcon(icon: API_TYPE_SHOW_TOAST_ICON) {
  switch (icon) {
    case 'success':
      return createVNode(
        createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, '#fff', 36),
        { class: ToastIconClassName }
      )
    case 'error':
      return createVNode(createSvgIconVNode(ICON_PATH_WARN, '#fff', 36), {
        class: ToastIconClassName,
      })
    case 'loading':
      return <i class={[ToastIconClassName, 'uni-loading']}></i>
    default:
      return null
  }
}
