import {
  ElementTypes,
  NodeTypes,
  type RootNode,
  type TemplateChildNode,
} from '@vue/compiler-core'
import { isAppUVueBuiltInEasyComponent } from '@dcloudio/uni-shared'
import { camelize, capitalize } from '@dcloudio/uni-cli-shared'
import type { TransformContext } from '../transform'

export function transformElements(
  node: RootNode | TemplateChildNode,
  context: TransformContext
) {
  if (
    node.type === NodeTypes.ELEMENT &&
    (node.tagType === ElementTypes.ELEMENT ||
      (node.tagType === ElementTypes.COMPONENT &&
        isAppUVueBuiltInEasyComponent(node.tag)))
  ) {
    context.elements.add(node.tag)

    // 原生UTS customElements组件
    const utsCustomElementOptions = context.parseUTSCustomElement(
      node.tag,
      'kotlin'
    )
    if (utsCustomElementOptions) {
      // const className = `{ ${capitalize(camelize(node.tag)) + 'Element'} }`
      const className = ''
      if (
        !context.imports.find(
          (i) =>
            i.path === utsCustomElementOptions.source && i.exp === className
        )
      ) {
        context.imports.push({
          exp: className,
          path: utsCustomElementOptions.source,
        })
      }
    }

    // 原生UTS组件
    const utsComponentOptions = context.parseUTSComponent(node.tag, 'kotlin')

    if (utsComponentOptions) {
      const className = `{ ${capitalize(camelize(node.tag)) + 'Component'} }`
      if (
        !context.imports.find(
          (i) => i.path === utsComponentOptions.source && i.exp === className
        )
      ) {
        context.imports.push({
          exp: className,
          path: utsComponentOptions.source,
        })
      }
    }
  }
}
