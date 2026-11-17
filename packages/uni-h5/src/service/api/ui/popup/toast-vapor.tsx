// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该组件
export { VaporTransition as ToastTransition } from 'vue'
export { defineSystemComponent as defineToast } from '@dcloudio/uni-components'
import { ICON_FONT_SUCCESS_NO_CIRCLE, ICON_FONT_WARN } from '@dcloudio/uni-core'
//#if !_X_
import {
  ICON_PATH_SUCCESS_NO_CIRCLE,
  ICON_PATH_WARN,
  createSvgIconVNode,
} from '@dcloudio/uni-core'
//#endif
import type { API_TYPE_SHOW_TOAST_ICON } from '@dcloudio/uni-api'

function createToastIconVNode(icon: API_TYPE_SHOW_TOAST_ICON) {
  //#if _X_
  return (
    <i
      class="uni-toast__icon uni-icon-font"
      style={{ color: '#fff', fontSize: '36px' }}
    >
      {icon === 'success' ? ICON_FONT_SUCCESS_NO_CIRCLE : ICON_FONT_WARN}
    </i>
  )
  //#else
  return createSvgIconVNode(
    icon === 'success' ? ICON_PATH_SUCCESS_NO_CIRCLE : ICON_PATH_WARN,
    '#fff',
    36
  )
  //#endif
}

export function createToastIcon(icon: API_TYPE_SHOW_TOAST_ICON) {
  switch (icon) {
    case 'success':
    case 'error': {
      const element = createToastIconVNode(icon)
      element.setAttribute('class', 'uni-toast__icon uni-icon-font')
      return element
    }
    case 'loading':
      return <i class="uni-toast__icon uni-loading"></i>
    default:
      return null
  }
}
