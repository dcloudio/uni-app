import {
  createAttributeNode,
  isElementNode,
  renameProp,
} from '@dcloudio/uni-cli-shared'
import {
  type ElementNode,
  ElementTypes,
  type NodeTransform,
  NodeTypes,
  type TemplateChildNode,
  findDir,
  findProp,
  isStaticExp,
} from '@vue/compiler-core'
import { camelize, hyphenate } from '@vue/shared'

const gridViewProps = [
  'crossAxisCount',
  'maxCrossAxisExtent',
  'mainAxisGap',
  'crossAxisGap',
  'padding',
]

export const transformWaterflow: NodeTransform = (node) => {
  if (node.type !== NodeTypes.ROOT) {
    return
  }
  // 在子节点的 v-for、v-if 和属性表达式被处理前调整结构，避免重复处理表达式。
  node.children.forEach(transformChild)
}

function transformChild(node: TemplateChildNode) {
  if (!isElementNode(node)) {
    return
  }
  if (node.tag === 'waterflow') {
    transformWaterflowElement(node)
  } else if (node.tag === 'flow-item') {
    node.tag = 'view'
    node.tagType = ElementTypes.ELEMENT
  }
  node.children.forEach(transformChild)
}

function transformWaterflowElement(node: ElementNode) {
  const props: ElementNode['props'] = [createAttributeNode('type', 'masonry')]
  node.props = node.props.filter((prop) => {
    const name =
      prop.type === NodeTypes.ATTRIBUTE
        ? prop.name
        : prop.name === 'bind' && prop.arg && isStaticExp(prop.arg)
        ? prop.arg.content
        : ''
    if (!gridViewProps.includes(camelize(name))) {
      return true
    }
    renameProp(hyphenate(name), prop)
    props.push(prop)
    return false
  })

  const index = node.children.findIndex(
    (child) =>
      isElementNode(child) &&
      child.tag === 'flow-item' &&
      findDir(child, 'for') &&
      findProp(child, 'key')
  )
  const gridView: ElementNode = {
    type: NodeTypes.ELEMENT,
    tag: 'grid-view',
    tagType: ElementTypes.ELEMENT,
    ns: node.ns,
    props,
    children: index === -1 ? [] : [node.children[index]],
    loc: node.loc,
    isSelfClosing: false,
    codegenNode: undefined,
  }
  if (index === -1) {
    node.children.push(gridView)
  } else {
    node.children.splice(index, 1, gridView)
  }
  node.tag = 'scroll-view'
  node.tagType = ElementTypes.ELEMENT
  node.isSelfClosing = false
  node.props.push(createAttributeNode('type', 'custom'))
}
