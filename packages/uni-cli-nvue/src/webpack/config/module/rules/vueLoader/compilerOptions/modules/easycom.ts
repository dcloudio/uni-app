import { ASTElement, ModuleOptions } from 'vue-template-compiler'
import { isBuiltInComponent } from '@dcloudio/uni-shared'

export function createEasycomModule() {
  return {
    preTransformNode(el: ASTElement, options: any) {
      if (isBuiltInComponent(el.tag) && el.tag !== 'App') {
        // 挂在 isUnaryTag 上边,可以保证外部访问到
        ;(
          options.isUnaryTag.autoComponents ||
          (options.isUnaryTag.autoComponents = new Set())
        ).add(el.tag)
      }
    },
  } as ModuleOptions
}
