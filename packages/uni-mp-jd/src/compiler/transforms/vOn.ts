import { createTransformOn } from '@dcloudio/uni-cli-shared'
import { transformOn as baseTransformOn } from '@dcloudio/uni-mp-compiler'
/**
 * 京东小程序 input 事件不支持动态事件
 */
export const transformOn = createTransformOn(baseTransformOn, {
  match: (name, node, context) => {
    if (name === 'input' && (node.tag === 'input' || node.tag === 'textarea')) {
      return true
    }
    return false
  },
})
