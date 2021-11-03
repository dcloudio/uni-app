import { createTransformOn } from '@dcloudio/uni-cli-shared'
import { transformOn as baseTransformOn } from '@dcloudio/uni-mp-compiler'
/**
 * 百度小程序的自定义组件，不支持动态事件绑定
 */
export const transformOn = createTransformOn(baseTransformOn)
