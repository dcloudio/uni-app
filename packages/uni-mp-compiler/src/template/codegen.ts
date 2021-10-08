import {
  AttributeNode,
  DirectiveNode,
  ElementNode,
  ExpressionNode,
  NodeTypes,
  RootNode,
  SimpleExpressionNode,
  TemplateChildNode,
  TextNode,
} from '@vue/compiler-core'
import { TemplateCodegenOptions } from '../options'
import { genNode as genCodeNode } from '../codegen'
import { ForNode } from '../transforms/vFor'
import { IfNode } from '../transforms/vIf'
interface TemplateCodegenContext {
  code: string
  push(code: string): void
}

export function generate(
  { children }: RootNode,
  { emitFile, filename }: TemplateCodegenOptions
) {
  const context: TemplateCodegenContext = {
    code: '',
    push(code) {
      context.code += code
    },
  }
  children.forEach((node) => {
    genNode(node, context)
  })
  emitFile({ type: 'asset', fileName: filename, source: context.code })
}

export function genNode(
  node: TemplateChildNode,
  context: TemplateCodegenContext
) {
  switch (node.type) {
    case NodeTypes.TEXT:
      return genText(node, context)
    case NodeTypes.INTERPOLATION:
      return genExpression(node.content, context)
    case NodeTypes.ELEMENT:
      return genElement(node, context)
  }
}

function genText(node: TextNode, { push }: TemplateCodegenContext) {
  push(node.content)
}

function genExpression(node: ExpressionNode, { push }: TemplateCodegenContext) {
  push(`{{${genCodeNode(node).code}}}`)
}

function genVIf(exp: string, { push }: TemplateCodegenContext) {
  push(` wx:if="{{${exp}}}"`)
}
function genVElseIf(exp: string, { push }: TemplateCodegenContext) {
  push(` wx:elif="{{${exp}}}"`)
}
function genVElse({ push }: TemplateCodegenContext) {
  push(` wx:else`)
}

function genVFor(
  node: ForNode,
  props: (AttributeNode | DirectiveNode)[],
  { push }: TemplateCodegenContext
) {
  push(` wx:for="{{${node.source}}}"`)
  if (node.value) {
    push(` wx:for-item="${node.value}"`)
  }
  if (node.key) {
    push(` wx:for-index="${node.key}"`)
  }
  const keyIndex = props.findIndex(
    (prop) =>
      prop.type === NodeTypes.DIRECTIVE &&
      prop.name === 'bind' &&
      prop.arg &&
      prop.arg.type === NodeTypes.SIMPLE_EXPRESSION &&
      prop.arg.content === 'key'
  )
  if (keyIndex > -1) {
    const keyProp = props[keyIndex] as DirectiveNode
    const key = (keyProp.exp as SimpleExpressionNode).content
    push(` wx:key="${key.includes('.') ? key.split('.')[1] : key}"`)
    props.splice(keyIndex, 1)
  }
}

export function genElement(node: ElementNode, context: TemplateCodegenContext) {
  const { tag, children, isSelfClosing, props } = node
  const { push } = context
  push(`<${tag}`)
  const ifNode = (node as any).ifNode as IfNode
  if (ifNode) {
    if (ifNode.name === 'if') {
      genVIf(ifNode.condition, context)
    } else if (ifNode.name === 'else-if') {
      genVElseIf(ifNode.condition, context)
    } else if (ifNode.name === 'else') {
      genVElse(context)
    }
  }
  const forNode = (node as any).forNode as ForNode
  if (forNode) {
    genVFor(forNode, props, context)
  }
  if (props.length) {
    genElementProps(props, context)
  }

  if (isSelfClosing) {
    push(`/>`)
  } else {
    push(`>`)
    children.forEach((node) => {
      genNode(node, context)
    })
    push(`</${tag}>`)
  }
}

export function genElementProps(
  props: Array<AttributeNode | DirectiveNode>,
  context: TemplateCodegenContext
) {
  const { push } = context
  props.forEach((prop) => {
    if (prop.type === NodeTypes.ATTRIBUTE) {
      context.push(` ${prop.name}=${prop.value}`)
    } else {
      const { name } = prop
      if (name === 'bind') {
        push(` `)
        genDirectiveNode(prop, context)
      }
    }
  })
}

function genDirectiveNode(
  prop: DirectiveNode,
  { push }: TemplateCodegenContext
) {
  const arg = (prop.arg as SimpleExpressionNode).content
  const exp = (prop.exp as SimpleExpressionNode).content
  push(`${arg}="{{${exp}}}"`)
}
