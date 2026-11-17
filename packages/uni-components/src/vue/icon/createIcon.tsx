import { ICON_FONT_SUCCESS_NO_CIRCLE } from '@dcloudio/uni-core'
//#if !_X_
import {
  ICON_PATH_SUCCESS_NO_CIRCLE,
  createSvgIconVNode,
} from '@dcloudio/uni-core'
//#endif

export const createFontIconVNode = (
  text: string,
  color: string,
  size: number
) => (
  <i
    class="uni-icon-font"
    style={{
      color,
      fontSize: size + 'px',
    }}
  >
    {text}
  </i>
)

export function createSuccessNoCircleIconVNode(color: string, size: number) {
  //#if _X_
  return createFontIconVNode(ICON_FONT_SUCCESS_NO_CIRCLE, color, size)
  //#else
  return createSvgIconVNode(ICON_PATH_SUCCESS_NO_CIRCLE, color, size)
  //#endif
}
