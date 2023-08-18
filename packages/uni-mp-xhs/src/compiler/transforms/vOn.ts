import { createTransformOn } from '@dcloudio/uni-cli-shared'
import { transformOn as baseTransformOn } from '@dcloudio/uni-mp-compiler'

export const transformOn = createTransformOn(baseTransformOn)
