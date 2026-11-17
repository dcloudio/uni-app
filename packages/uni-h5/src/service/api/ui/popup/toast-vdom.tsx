import { createVNode } from 'vue'
export {
  Transition as ToastTransition,
  defineComponent as defineToast,
} from 'vue'
import { ICON_FONT_SUCCESS_NO_CIRCLE, ICON_FONT_WARN } from '@dcloudio/uni-core'
//#if !_X_
import {
  ICON_PATH_SUCCESS_NO_CIRCLE,
  ICON_PATH_WARN,
  createSvgIconVNode,
} from '@dcloudio/uni-core'
//#endif
import type { API_TYPE_SHOW_TOAST_ICON } from '@dcloudio/uni-api'

const ToastIconClassName = 'uni-toast__icon'

function createToastIconVNode(icon: API_TYPE_SHOW_TOAST_ICON) {
  //#if _X_
  return createVNode(
    'i',
    {
      class: ToastIconClassName + ' uni-icon-font',
      style: { color: '#fff', fontSize: '36px' },
    },
    icon === 'success' ? ICON_FONT_SUCCESS_NO_CIRCLE : ICON_FONT_WARN
  )
  //#else
  return createVNode(
    createSvgIconVNode(
      icon === 'success' ? ICON_PATH_SUCCESS_NO_CIRCLE : ICON_PATH_WARN,
      '#fff',
      36
    ),
    { class: ToastIconClassName }
  )
  //#endif
}

export function createToastIcon(icon: API_TYPE_SHOW_TOAST_ICON) {
  switch (icon) {
    case 'success':
      return createToastIconVNode(icon)
    case 'error':
      return createToastIconVNode(icon)
    case 'loading':
      return <i class={[ToastIconClassName, 'uni-loading']}></i>
    default:
      return null
  }
}
