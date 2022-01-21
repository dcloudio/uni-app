import { createTransformModel } from '@dcloudio/uni-cli-shared'
import { transformModel as baseTransformModel } from '@dcloudio/uni-mp-compiler'
/**
 * 百度小程序的自定义组件，不支持动态事件绑定，故 v-model 也需要调整
 */
export const transformModel = createTransformModel(baseTransformModel)
