import { createTransformOn, matchTransformOn } from '@dcloudio/uni-cli-shared'
import { transformOn as baseTransformOn } from '@dcloudio/uni-mp-compiler'
/**
 * 快手小程序的自定义组件，不支持动态事件绑定
 */
export const transformOn = createTransformOn(baseTransformOn, {
  match: (name, node, context) => {
    if (name === 'input' && (node.tag === 'input' || node.tag === 'textarea')) {
      return true
    }
    return matchTransformOn(name, node, context)
  },
})
