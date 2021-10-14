import { formatMiniProgramEvent } from '@dcloudio/uni-cli-shared'
import {
  AttributeNode,
  DirectiveNode,
  ElementNode,
  ExpressionNode,
  findProp,
  NodeTypes,
  RootNode,
  SimpleExpressionNode,
  TemplateChildNode,
  TextNode,
} from '@vue/compiler-core'
import { TemplateCodegenOptions } from '../options'
import { genExpr } from '../codegen'
import { isForElementNode, VForOptions } from '../transforms/vFor'
import { IfElementNode, isIfElementNode } from '../transforms/vIf'
interface TemplateCodegenContext {
  code: string
  directive: string
  push(code: string): void
}

export function generate(
  { children }: RootNode,
  { emitFile, filename, directive }: TemplateCodegenOptions
) {
  const context: TemplateCodegenContext = {
    code: '',
    directive,
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
    case NodeTypes.IF:
      return node.branches.forEach((node) => {
        genElement(node as unknown as IfElementNode, context)
      })
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
  push(`{{${genExpr(node)}}}`)
}

function genVIf(exp: string, { push, directive }: TemplateCodegenContext) {
  push(` ${directive}if="{{${exp}}}"`)
}
function genVElseIf(exp: string, { push, directive }: TemplateCodegenContext) {
  push(` ${directive}elif="{{${exp}}}"`)
}
function genVElse({ push, directive }: TemplateCodegenContext) {
  push(` ${directive}else`)
}

function genVFor(
  { sourceAlias, valueAlias, keyAlias }: VForOptions,
  node: ElementNode,
  { push, directive }: TemplateCodegenContext
) {
  push(` ${directive}for="{{${sourceAlias}}}"`)
  if (valueAlias) {
    push(` ${directive}for-item="${valueAlias}"`)
  }
  if (keyAlias) {
    push(` ${directive}for-index="${keyAlias}"`)
  }
  const keyProp = findProp(node, 'key', true)
  if (keyProp) {
    const key = ((keyProp as DirectiveNode).exp as SimpleExpressionNode).content
    push(` ${directive}key="${key.includes('.') ? key.split('.')[1] : key}"`)
    node.props.splice(node.props.indexOf(keyProp), 1)
  }
}
const tagMap: Record<string, string> = {
  template: 'block',
}
export function genElement(node: ElementNode, context: TemplateCodegenContext) {
  const { children, isSelfClosing, props } = node
  const tag = tagMap[node.tag] || node.tag
  const { push } = context
  push(`<${tag}`)
  if (isIfElementNode(node)) {
    const { name, condition } = node.vIf
    if (name === 'if') {
      genVIf(condition!, context)
    } else if (name === 'else-if') {
      genVElseIf(condition!, context)
    } else if (name === 'else') {
      genVElse(context)
    }
  }
  if (isForElementNode(node)) {
    genVFor(node.vFor, node, context)
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
      const { value } = prop
      if (value) {
        context.push(` ${prop.name}="${value.content}"`)
      } else {
        context.push(` ${prop.name}`)
      }
    } else {
      const { name } = prop
      push(` `)
      if (name === 'on') {
        genOn(prop, context)
      } else {
        genDirectiveNode(prop, context)
      }
    }
  })
}
function genOn(prop: DirectiveNode, { push }: TemplateCodegenContext) {
  const arg = (prop.arg as SimpleExpressionNode).content
  const exp = (prop.exp as SimpleExpressionNode).content
  const modifiers = prop.modifiers
  push(
    `${formatMiniProgramEvent(arg, {
      isCatch: modifiers.includes('stop') || modifiers.includes('prevent'),
      isCapture: modifiers.includes('capture'),
    })}="{{${exp}}}"`
  )
}

function genDirectiveNode(
  prop: DirectiveNode,
  { push }: TemplateCodegenContext
) {
  const arg = (prop.arg as SimpleExpressionNode).content
  const exp = (prop.exp as SimpleExpressionNode).content
  push(`${arg}="{{${exp}}}"`)
}
