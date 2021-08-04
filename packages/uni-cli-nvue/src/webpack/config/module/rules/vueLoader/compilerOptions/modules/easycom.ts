import { ASTElement, ModuleOptions } from 'vue-template-compiler'
import { isBuiltInComponent } from '@dcloudio/uni-shared'

const BUILT_IN_COMPONENTS = [
  'App',
  'block',
  'component',
  'transition',
  'transition-group',
  'keep-alive',
  'slot',
  'teleport',
]
function isComponent(tagName: string) {
  if (BUILT_IN_COMPONENTS.includes(tagName)) {
    return false
  }
  if (isBuiltInComponent(tagName)) {
    return false
  }
  return true
}

export function createEasycomModule() {
  return {
    preTransformNode(el: ASTElement, options: any) {
      if (isComponent(el.tag)) {
        // 挂在 isUnaryTag 上边,可以保证外部访问到
        ;(
          options.isUnaryTag.autoComponents ||
          (options.isUnaryTag.autoComponents = new Set())
        ).add(el.tag)
      }
    },
  } as ModuleOptions
}
