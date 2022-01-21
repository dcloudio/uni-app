import {
  createTransformModel,
  matchTransformModel,
} from '@dcloudio/uni-cli-shared'
import { transformModel as baseTransformModel } from '@dcloudio/uni-mp-compiler'
/**
 * 快手小程序的自定义组件，不支持动态事件绑定，故 v-model 也需要调整，其中 input、textarea 也不支持
 */
export const transformModel = createTransformModel(baseTransformModel, {
  match: (node, context) => {
    if (node.tag === 'input' || node.tag === 'textarea') {
      return true
    }
    return matchTransformModel(node, context)
  },
})
