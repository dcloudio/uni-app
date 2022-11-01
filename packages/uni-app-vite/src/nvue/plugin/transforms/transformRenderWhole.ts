import {
  renameProp,
  isElementNode,
  createBindDirectiveNode,
} from '@dcloudio/uni-cli-shared'
import {
  createSimpleExpression,
  findProp,
  NodeTransform,
  RootNode,
} from '@vue/compiler-core'

export const transformRenderWhole: NodeTransform = (node, _) => {
  if (!isElementNode(node)) {
    return
  }
  const prop = findProp(node, 'render-whole')
  if (!prop) {
    return
  }
  // render-whole => append
  renameProp('append', prop)
}

//
const RENDER_WHOLE_TAGS = [
  'view',
  'scroll-view',
  'swiper',
  'match-media',
  'movable-area',
  'movable-view',
  'cover-view',
  'cover-image',
  'form',
  'picker',
  'picker-view',
  'navigator',
  'map',
]
/**
 * 仅当根节点只有一个，标签在白名单，且开发者未主动配置的情况下，才补充
 * @param node
 */
export function addRenderWhole(node: RootNode) {
  if (node.children.length === 1) {
    const element = node.children[0]
    if (isElementNode(element) && RENDER_WHOLE_TAGS.includes(element.tag)) {
      if (
        !findProp(element, 'render-whole') &&
        !findProp(element, 'append') &&
        !findProp(element, 'appendAsTree')
      ) {
        element.props.push(
          createBindDirectiveNode(
            'render-whole',
            createSimpleExpression('true')
          )
        )
      }
    }
  }
}
