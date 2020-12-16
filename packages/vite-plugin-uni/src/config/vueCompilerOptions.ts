import { CompilerOptions } from '@vue/compiler-sfc'

import {
  transformEasycom,
  transformBuiltInComponent
} from '@dcloudio/uni-cli-shared'

export const vueCompilerOptions: CompilerOptions = {
  nodeTransforms: [transformEasycom, transformBuiltInComponent]
}
