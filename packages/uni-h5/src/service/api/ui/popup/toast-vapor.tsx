// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该组件
export { VaporTransition as ToastTransition } from 'vue'
export { defineSystemComponent as defineToast } from '@dcloudio/uni-components'
import { ICON_FONT_SUCCESS_NO_CIRCLE, ICON_FONT_WARN } from '@dcloudio/uni-core'
import type { API_TYPE_SHOW_TOAST_ICON } from '@dcloudio/uni-api'

function createToastIconVNode(icon: API_TYPE_SHOW_TOAST_ICON) {
  const element = (
    <i
      class="uni-toast__icon uni-icon-font"
      style={{ color: '#fff', fontSize: '36px' }}
    />
  )
  // 图标在 computed 中创建，直接写入字形以避免生成依赖组件作用域的渲染副作用。
  element.textContent =
    icon === 'success' ? ICON_FONT_SUCCESS_NO_CIRCLE : ICON_FONT_WARN
  return element
}

export function createToastIcon(icon: string) {
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
