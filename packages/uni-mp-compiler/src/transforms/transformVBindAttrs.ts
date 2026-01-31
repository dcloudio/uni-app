import {
  type DirectiveNode,
  NodeTypes,
  createSimpleExpression,
  isStaticArgOf,
} from '@vue/compiler-core'
import { isElementNode } from '@dcloudio/uni-cli-shared'
import type { NodeTransform } from '../transform'

export const transformVBindAttrs: NodeTransform = (node, context) => {
  if (!isElementNode(node)) {
    return
  }
  const props = node.props
  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    if (
      prop.type === NodeTypes.DIRECTIVE &&
      prop.name === 'bind' &&
      !prop.arg &&
      prop.modifiers.length === 0
    ) {
      if (
        prop.exp &&
        prop.exp.type === NodeTypes.SIMPLE_EXPRESSION &&
        prop.exp.content === '$attrs'
      ) {
        const content = prop.exp.content
        const newProps: DirectiveNode[] = []
        // :class
        const classProp = props.find(
          (p) =>
            p.type === NodeTypes.DIRECTIVE &&
            p.name === 'bind' &&
            isStaticArgOf(p.arg, 'class')
        ) as DirectiveNode
        if (classProp && classProp.exp?.type === NodeTypes.SIMPLE_EXPRESSION) {
          classProp.exp.content = `[${classProp.exp.content}, ${content}.class]`
        } else {
          newProps.push(
            createBindDirective('class', `${content}.class`, prop.loc)
          )
        }
        // :style
        const styleProp = props.find(
          (p) =>
            p.type === NodeTypes.DIRECTIVE &&
            p.name === 'bind' &&
            isStaticArgOf(p.arg, 'style')
        ) as DirectiveNode
        if (styleProp && styleProp.exp?.type === NodeTypes.SIMPLE_EXPRESSION) {
          styleProp.exp.content = `[${styleProp.exp.content}, ${content}.style]`
        } else {
          newProps.push(
            createBindDirective('style', `${content}.style`, prop.loc)
          )
        }
        // @click (only add if not already defined)
        const hasClick = props.some(
          (p) =>
            p.type === NodeTypes.DIRECTIVE &&
            p.name === 'on' &&
            isStaticArgOf(p.arg, 'click')
        )
        if (!hasClick) {
          newProps.push(
            createOnDirective('click', `${content}.onClick`, prop.loc)
          )
        }
        // :id
        // 查找后面是否还有 id，如果有，则忽略当前 id
        const hasId = props
          .slice(i + 1)
          .some(
            (p) =>
              (p.type === NodeTypes.ATTRIBUTE && p.name === 'id') ||
              (p.type === NodeTypes.DIRECTIVE &&
                p.name === 'bind' &&
                isStaticArgOf(p.arg, 'id'))
          )
        if (!hasId) {
          newProps.push(createBindDirective('id', `${content}.id`, prop.loc))
        }
        props.splice(i, 1, ...newProps)
        i += newProps.length - 1
      }
    }
  }
}

function createBindDirective(
  name: string,
  value: string,
  loc: any
): DirectiveNode {
  return {
    type: NodeTypes.DIRECTIVE,
    name: 'bind',
    modifiers: [],
    loc,
    arg: createSimpleExpression(name, true, loc),
    exp: createSimpleExpression(value, false, loc),
  }
}

function createOnDirective(
  name: string,
  value: string,
  loc: any
): DirectiveNode {
  return {
    type: NodeTypes.DIRECTIVE,
    name: 'on',
    modifiers: [],
    loc,
    arg: createSimpleExpression(name, true, loc),
    exp: createSimpleExpression(value, false, loc),
  }
}
