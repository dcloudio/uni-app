import { CompilerOptions } from '@vue/compiler-sfc'

import {
  COMPONENT_PREFIX,
  isNativeTag,
  isBuiltInComponent,
} from '@dcloudio/uni-shared'

import { isEasycomTag } from '../easycom'
import { transformEasycom, transformBuiltInEasycom } from './transforms/easycom'
import { transformBuiltInComponent } from './transforms/builtInComponent'

interface CodegenContext {
  push: (code: string, node: any) => void
  helper: (key: symbol) => string
}
interface VueCompilerOptions extends CompilerOptions {
  onContextCreated: (context: CodegenContext) => void
}

function isAutoImported(tag: string) {
  return (
    isEasycomTag(tag) || isBuiltInComponent(tag.replace(COMPONENT_PREFIX, ''))
  )
}

const resolveComponentRE = /_resolveComponent\("(.*)"\)/
export const vueCompilerOptions: VueCompilerOptions = {
  onContextCreated(context) {
    const oldPush = context.push
    context.push = (code, node) => {
      const matches = code.match(resolveComponentRE)
      // ignore auto imported component
      if (matches && matches.length === 2 && isAutoImported(matches[1])) {
        code = `// ${code}`
      }
      return oldPush(code, node)
    }
  },
  isNativeTag,
  nodeTransforms: [
    transformBuiltInComponent,
    transformBuiltInEasycom,
    transformEasycom,
  ],
}
