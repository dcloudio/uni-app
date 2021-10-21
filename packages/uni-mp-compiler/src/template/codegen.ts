import { hyphenate } from '@vue/shared'
import { formatMiniProgramEvent } from '@dcloudio/uni-cli-shared'
import {
  ComponentNode,
  DirectiveNode,
  ElementNode,
  ElementTypes,
  ExpressionNode,
  findProp,
  NodeTypes,
  RootNode,
  SimpleExpressionNode,
  SlotOutletNode,
  TemplateChildNode,
  TemplateNode,
  TextNode,
} from '@vue/compiler-core'
import { TemplateCodegenOptions } from '../options'
import { genExpr } from '../codegen'
import { isForElementNode, VForOptions } from '../transforms/vFor'
import { IfElementNode, isIfElementNode } from '../transforms/vIf'
import { createBindDirectiveNode } from '../ast'
interface TemplateCodegenContext {
  code: string
  directive: string
  scopeId?: string | null
  slot: {
    fallback: boolean
  }
  push(code: string): void
}

export function generate(
  { children }: RootNode,
  { slot, scopeId, emitFile, filename, directive }: TemplateCodegenOptions
) {
  const context: TemplateCodegenContext = {
    slot,
    code: '',
    scopeId,
    directive,
    push(code) {
      context.code += code
    },
  }
  children.forEach((node) => {
    genNode(node, context)
  })
  emitFile!({ type: 'asset', fileName: filename, source: context.code })
}

export function genNode(
  node: TemplateChildNode,
  context: TemplateCodegenContext
) {
  switch (node.type) {
    case NodeTypes.IF:
      return node.branches.forEach((node) => {
        genNode(node as unknown as IfElementNode, context)
      })
    case NodeTypes.TEXT:
      return genText(node, context)
    case NodeTypes.INTERPOLATION:
      return genExpression(node.content, context)
    case NodeTypes.ELEMENT:
      if (node.tagType === ElementTypes.SLOT) {
        return genSlot(node, context)
      } else if (node.tagType === ElementTypes.COMPONENT) {
        return genComponent(node, context)
      } else if (node.tagType === ElementTypes.TEMPLATE) {
        return genTemplate(node, context)
      } else if (isLazyElement(node)) {
        return genLazyElement(node, context)
      }
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
  const keyProp = findProp(node, 'key', true)
  if (keyProp) {
    const key = ((keyProp as DirectiveNode).exp as SimpleExpressionNode).content
    push(` ${directive}key="${key.includes('.') ? key.split('.')[1] : key}"`)
    node.props.splice(node.props.indexOf(keyProp), 1)
  }
}

function genSlot(node: SlotOutletNode, context: TemplateCodegenContext) {
  if (!node.children.length) {
    return genElement(node, context)
  }
  const children = node.children.slice()
  node.children.length = 0
  const { push } = context
  push(`<block`)
  const nameProp = findProp(node, 'name')
  genVIf(
    `$slots.` +
      (nameProp?.type === NodeTypes.ATTRIBUTE && nameProp.value?.content
        ? nameProp.value.content
        : 'default'),
    context
  )
  push(`>`)
  genElement(node, context)
  push(`</block>`)
  push(`<block`)
  genVElse(context)
  push(`>`)
  children.forEach((node) => {
    genNode(node, context)
  })
  push(`</block>`)
}

function findSlotName(node: ElementNode) {
  const slotProp = node.props.find(
    (prop) => prop.type === NodeTypes.DIRECTIVE && prop.name === 'slot'
  ) as DirectiveNode | undefined
  if (slotProp) {
    const { arg } = slotProp
    if (!arg) {
      return 'default'
    }
    if (arg.type === NodeTypes.SIMPLE_EXPRESSION && arg.isStatic) {
      return arg.content
    }
  }
}

function genTemplate(node: TemplateNode, context: TemplateCodegenContext) {
  const slotName = findSlotName(node)
  if (slotName) {
    /**
     * 仅百度、字节支持使用 block 作为命名插槽根节点
     * 此处为了统一仅默认替换为view
     * <template v-slot/> => <view slot="">
     */
    node.tag = 'view'
  } else {
    // <template/> => <block/>
    node.tag = 'block'
  }
  // @ts-ignore
  node.tagType = ElementTypes.ELEMENT
  return genElement(node, context)
}

function genComponent(node: ComponentNode, context: TemplateCodegenContext) {
  const slots = new Set<string>()
  if (!node.children.length) {
    return genElement(node, context)
  }
  node.children.forEach((child) => {
    if (child.type === NodeTypes.ELEMENT) {
      slots.add(findSlotName(child) || 'default')
    } else if (child.type === NodeTypes.TEXT) {
      slots.add('default')
    }
  })
  node.props.unshift(
    createBindDirectiveNode(
      'vue-slots',
      `[${[...slots].map((name) => `'${name}'`).join(',')}]`
    )
  )
  return genElement(node, context)
}

const lazyElementMap: Record<string, string[]> = {
  editor: ['ready'],
}

function isLazyElement(node: ElementNode) {
  const events = lazyElementMap[node.tag]
  return (
    events &&
    node.props.some(
      (prop) =>
        prop.type === NodeTypes.DIRECTIVE &&
        prop.name === 'on' &&
        prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
        events.includes(prop.arg.content)
    )
  )
}
/**
 * 部分内置组件的部分事件在初始化时会立刻触发，但标准事件需要等首次渲染才能确认事件函数，故增加wx:if="{{r0}}"
 * @param node
 * @param context
 */
function genLazyElement(node: ElementNode, context: TemplateCodegenContext) {
  const { push } = context
  push(`<block`)
  // r0 => ready 首次渲染
  genVIf(`r0`, context)
  push(`>`)
  genElement(node, context)
  push(`</block>`)
}

function genElement(node: ElementNode, context: TemplateCodegenContext) {
  const { children, isSelfClosing, props } = node
  let tag = node.tag
  if (node.tagType === ElementTypes.COMPONENT) {
    tag = hyphenate(tag)
  }
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
    genElementProps(node, context)
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
  node: ElementNode,
  context: TemplateCodegenContext
) {
  const { push } = context
  node.props.forEach((prop) => {
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
        genOn(prop, node, context)
      } else {
        genDirectiveNode(prop, context)
      }
    }
  })
}
function genOn(
  prop: DirectiveNode,
  node: ElementNode,
  { push }: TemplateCodegenContext
) {
  const arg = (prop.arg as SimpleExpressionNode).content
  const exp = prop.exp as SimpleExpressionNode
  const modifiers = prop.modifiers
  const name = formatMiniProgramEvent(arg, {
    isCatch: modifiers.includes('stop') || modifiers.includes('prevent'),
    isCapture: modifiers.includes('capture'),
    isComponent: node.tagType === ElementTypes.COMPONENT,
  })
  if (exp.isStatic) {
    push(`${name}="${exp.content}"`)
  } else {
    push(`${name}="{{${exp.content}}}"`)
  }
}

function genDirectiveNode(
  prop: DirectiveNode,
  { push }: TemplateCodegenContext
) {
  if (prop.name === 'slot') {
    if (prop.arg) {
      push(`slot="${(prop.arg as SimpleExpressionNode).content}"`)
    }
  } else if (prop.name === 'show') {
    push(`hidden="{{!${(prop.exp as SimpleExpressionNode).content}}}"`)
  } else if (prop.arg && prop.exp) {
    const arg = (prop.arg as SimpleExpressionNode).content
    const exp = (prop.exp as SimpleExpressionNode).content
    push(`${arg}="{{${exp}}}"`)
  } else {
    throw new Error(`unknown directive` + JSON.stringify(prop))
  }
}
