import { createTransformModel } from '@dcloudio/uni-cli-shared'
import { transformModel as baseTransformModel } from '@dcloudio/uni-mp-compiler'
/**
 * 京东小程序 input 事件不支持动态事件，故 v-model 也需要调整
 */
export const transformModel = createTransformModel(baseTransformModel, {
  match: (node, context) => {
    if (node.tag === 'input' || node.tag === 'textarea') {
      return true
    }
    return false
  },
})
