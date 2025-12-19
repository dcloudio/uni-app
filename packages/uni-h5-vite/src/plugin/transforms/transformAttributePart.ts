import { batchGetPartClass } from '@dcloudio/uni-shared'
import type { NodeTransform } from '@vue/compiler-core'
import {
  type AttributeNode,
  ConstantTypes,
  type DirectiveNode,
  NodeTypes,
  createCompoundExpression,
  locStub,
} from '@vue/compiler-core'

export const transformAttributePart: NodeTransform = (node, context) => {
  if (node.type !== NodeTypes.ELEMENT) {
    return
  }

  const staticClassProp = node.props.find(
    (prop) => prop.type === NodeTypes.ATTRIBUTE && prop.name === 'class'
  ) as AttributeNode | undefined
  const dynamicClassProp = node.props.find(
    (prop) =>
      prop.type === NodeTypes.DIRECTIVE &&
      prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      prop.arg.content === 'class'
  ) as DirectiveNode | undefined
  node.props.forEach((prop) => {
    // 将part属性计算后添加到class中，支持动态part，支持多part
    if (prop.type === NodeTypes.ATTRIBUTE && prop.name === 'part') {
      // 静态part属性
      const partClasses = batchGetPartClass(prop.value?.content || '')
      if (staticClassProp) {
        // 已有静态class属性
        staticClassProp.value!.content += ` ${partClasses}`
      } else if (dynamicClassProp) {
        // 已有动态class属性
        dynamicClassProp.exp = createCompoundExpression([
          dynamicClassProp.exp!,
          ` + ' ${partClasses}'`,
        ])
      } else {
        // 无class属性
        node.props.push({
          type: NodeTypes.ATTRIBUTE,
          name: 'class',
          value: {
            type: NodeTypes.TEXT,
            content: partClasses,
            loc: locStub,
          },
          loc: locStub,
          nameLoc: locStub,
        })
      }
    } else if (
      prop.type === NodeTypes.DIRECTIVE &&
      prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      prop.arg.content === 'part'
    ) {
      // 动态part属性
      // TODO 使用uni-shared内的getPartClass
      const partClassExp = createCompoundExpression([
        `(`,
        prop.exp!,
        `).split(/\\s+/).filter(Boolean).map(partName => \`-_part__\${partName}_-\`).join(' ')`,
      ])
      if (staticClassProp) {
        // 已有静态class属性，需要转为动态class属性
        node.props.splice(node.props.indexOf(staticClassProp), 1)
        node.props.push({
          type: NodeTypes.DIRECTIVE,
          name: 'bind',
          exp: createCompoundExpression([
            staticClassProp.value!.content,
            `+ ' ' +`,
            partClassExp,
          ]),
          arg: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: 'class',
            isStatic: true,
            loc: locStub,
            constType: ConstantTypes.NOT_CONSTANT,
          },
          loc: locStub,
          modifiers: [],
        })
      } else if (dynamicClassProp) {
        // 已有动态class属性
        dynamicClassProp.exp = createCompoundExpression([
          dynamicClassProp.exp!,
          ` + ' ' +`,
          partClassExp,
        ])
      } else {
        // 无class属性
        node.props.push({
          type: NodeTypes.DIRECTIVE,
          name: 'bind',
          exp: partClassExp,
          arg: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: 'class',
            isStatic: true,
            loc: locStub,
            constType: ConstantTypes.NOT_CONSTANT,
          },
          loc: locStub,
          modifiers: [],
        })
      }
    }
  })
}
