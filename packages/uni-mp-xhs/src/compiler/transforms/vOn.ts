import { createTransformOn } from '@dcloudio/uni-cli-shared'
import { transformOn as baseTransformOn } from '@dcloudio/uni-mp-compiler'
/**
 * 小红书小程序的Page和自定义组件，不支持动态事件绑定，需要通过__e转发
 */
export const transformOn = createTransformOn(baseTransformOn, {
  match: (name, node, context) => {
    return true
  },
})
