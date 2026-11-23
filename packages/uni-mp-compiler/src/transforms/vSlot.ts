import {
  type BinaryExpression,
  binaryExpression,
  callExpression,
  identifier,
  objectExpression,
  objectProperty,
  stringLiteral,
} from '@babel/types'
import { isString } from '@vue/shared'
import {
  type ComponentNode,
  type CompoundExpressionNode,
  type DirectiveNode,
  ElementTypes,
  ErrorCodes,
  type ExpressionNode,
  NodeTypes,
  type TemplateChildNode,
  type TemplateNode,
  createCompilerError,
  createCompoundExpression,
  createSimpleExpression,
  findDir,
  findProp,
  isStaticExp,
  isTemplateNode,
  locStub,
} from '@vue/compiler-core'
import { SLOT_DEFAULT_NAME, dynamicSlotName } from '@dcloudio/uni-shared'
import {
  createBindDirectiveNode,
  isCommentNode,
  isElementNode,
  isUserComponent,
} from '@dcloudio/uni-cli-shared'
import { WITH_SCOPED_SLOT } from '../runtimeHelpers'
import { parseExpr } from '../ast'
import { genBabelExpr, genExpr } from '../codegen'
import type { CodegenScope, CodegenVForScope } from '../options'
import {
  type NodeTransform,
  type TransformContext,
  isVForScope,
} from '../transform'
import {
  ATTR_VUE_ID,
  ATTR_VUE_SLOTS,
  SCOPED_SLOT_IDENTIFIER,
  rewriteExpression,
  rewriteExpressionWithoutProperty,
} from './utils'
import { createVForArrowFunctionExpression } from './vFor'
import { DYNAMIC_SLOT } from '../runtimeHelpers'

export const transformSlot: NodeTransform = (node, context) => {
  if (!isUserComponent(node, context)) {
    return
  }

  const { tag, children } = node
  const slots = new Set<string | ExpressionNode>()
  const forwardedSlots = context.miniProgram.slot.checkForwardedSlots
    ? new Map<string | ExpressionNode, string>()
    : undefined
  function addSlot(
    name: string | ExpressionNode,
    children: TemplateChildNode[],
    template?: TemplateNode
  ) {
    slots.add(name)
    if (
      !forwardedSlots ||
      (template && findDir(template, /^(if|else|else-if|for)$/, true))
    ) {
      return
    }
    const condition = findForwardedSlotCondition(children)
    if (condition) {
      forwardedSlots.set(name, condition)
    }
  }
  const onComponentSlot = findDir(node, 'slot', true)
  const implicitDefaultChildren: TemplateChildNode[] = []
  const isMiniProgramComponent = context.isMiniProgramComponent(tag)
  for (let i = 0; i < children.length; i++) {
    const slotElement = children[i]
    if (
      isElementNode(slotElement) &&
      slotElement.tag === 'template' &&
      slotElement.children.filter((node) => !isCommentNode(node)).length === 0
    ) {
      // 如果是 template 且 没有子节点 或者 子节点 都是 注释节点，直接移除节点
      children.splice(i, 1)
      i -= 1
      continue
    }
    let slotDir: DirectiveNode | undefined
    if (
      !isTemplateNode(slotElement) ||
      !(slotDir = findDir(slotElement, 'slot', true))
    ) {
      // not a <template v-slot>, skip.
      if (!isCommentNode(slotElement)) {
        implicitDefaultChildren.push(slotElement)
      }
      continue
    }

    if (onComponentSlot) {
      // already has on-component slot - this is incorrect usage.
      context.onError(
        createCompilerError(ErrorCodes.X_V_SLOT_MIXED_SLOT_USAGE, slotDir.loc)
      )
      break
    }
    if (!slotDir.arg) {
      // v-slot => v-slot:default
      slotDir.arg = createSimpleExpression('default', true)
    }
    const slotChildren = slotElement.children
    const slotName = transformTemplateSlotElement(
      slotDir,
      slotElement,
      node,
      context
    )

    // 小程序组件默认插槽，直接移除<template #default>节点
    if (isMiniProgramComponent) {
      if (slotName === 'default' && slotElement.children.length === 1) {
        children.splice(i, 1, slotElement.children[0])
      }
      continue
    }

    if (slotName) {
      addSlot(slotName, slotChildren, slotElement)
    }
  }

  if (isMiniProgramComponent) {
    return
  }

  if (implicitDefaultChildren.length && !onComponentSlot) {
    addSlot(SLOT_DEFAULT_NAME, implicitDefaultChildren)
  }

  if (onComponentSlot) {
    // <unicloud-db v-slot:default="{data, loading, error, options}"/>
    // => <unicloud-db collection=""><template v-slot:default="{data, loading, error, options}"/></unicloud-db>
    const templateNode = createTemplateNode(
      onComponentSlot,
      implicitDefaultChildren
    )
    addSlot(SLOT_DEFAULT_NAME, implicitDefaultChildren, templateNode)
    transformTemplateSlotElement(onComponentSlot, templateNode, node, context)
    node.children = [templateNode]
  }
  // 不支持 $slots, 则自动补充 props
  if (slots.size && !context.miniProgram.slot.$slots) {
    const slotsArr = [...slots]
    const hasDynamic = slotsArr.find((name) => !isString(name))
    let value: string | ExpressionNode
    if (hasDynamic) {
      const children: (string | ExpressionNode)[] = []
      const len = slotsArr.length - 1
      slotsArr.forEach((name, index) => {
        if (isString(name)) {
          children.push(`'${dynamicSlotName(name)}'`)
        } else {
          children.push(name)
        }
        if (index < len) {
          children.push(',')
        }
      })
      value = createCompoundExpression([
        context.helperString(DYNAMIC_SLOT) + '([',
        ...children,
        '])',
      ])
    } else {
      value = `[${slotsArr
        .map((name) => `'${dynamicSlotName(name as string)}'`)
        .join(',')}]`
    }
    const slotsProp = createBindDirectiveNode(ATTR_VUE_SLOTS, value)
    node.props.unshift(slotsProp)
    if (forwardedSlots?.size) {
      return () => {
        // 等动态目标名称转换为模板变量后再补充条件，避免把模板 $slots 编入 JS。
        const names = genExpr(slotsProp.exp!)
        slotsProp.exp = createSimpleExpression(
          `[${slotsArr
            .map((name, index) => {
              const value = hasDynamic
                ? `${names}[${index}]`
                : genBabelExpr(stringLiteral(dynamicSlotName(name as string)))
              const condition = forwardedSlots.get(name)
              return condition ? `(${condition})?${value}:null` : value
            })
            .join(',')}]`
        )
      }
    }
  }
}

/**
 * 静态来源的直接转发不能仅凭插槽声明就占用目标插槽，否则来源缺失时会阻止 fallback。
 * 微信在模板中按来源 $slots 生成 u-s 条件，复用已有模板更新机制。
 * 多个来源取 OR，不同目标独立判断。
 *
 * 暂不处理动态来源（<slot :name="..."/>），保留其原有编译行为，并非禁用动态插槽。
 * 父级动态名称也可能涉及作用域和循环索引，不能直接拿实际出口名查询 $slots；
 * 依赖当前 slotProps 的来源则需按每次调用判断，单个目标的 u-s 无法完整表达。
 * 此限制仅针对来源名称，不限制已有的动态目标名称（<template #[name]>）。
 *
 * 另一方案是让作用域插槽函数返回 { data, valid }，经 renderSlot 回传 valid，
 * 再由出口按本次调用结果选择 fallback。但它还需解决
 * 首次挂载延迟调用后的结果更新、上游插槽增删后的重新计算，以及普通插槽、原生组件
 * 和各平台 fallback 的兼容；模板 $slots 的 observer 不会自动更新已计算的 valid。
 * 该方案也不会自动解决已有的多出口调用共用数据问题，需独立评估。
 * 本次选择编译期条件，限定静态直接转发，不扩展插槽调用协议或 instance.slots 同步。
 */
function findForwardedSlotCondition(children: TemplateChildNode[]) {
  const conditions = new Set<string>()
  for (const child of children) {
    if (isCommentNode(child)) {
      continue
    }
    // 仅处理直接转发；真实内容、后备内容及结构指令保留原有行为。
    if (
      !isElementNode(child) ||
      child.tagType !== ElementTypes.SLOT ||
      child.children.length ||
      findDir(child, /^(if|else|else-if|for)$/, true)
    ) {
      return
    }
    const name = findProp(child, 'name')
    if (name && name.type !== NodeTypes.ATTRIBUTE) {
      // 任一来源为动态名称就保留整个目标的原有行为，不能仅凭其他静态来源判空。
      return
    }
    const slotName = dynamicSlotName(name?.value?.content ?? 'default')
    conditions.add(`$slots[${genBabelExpr(stringLiteral(slotName))}]`)
  }
  return [...conditions].join('||')
}

export function rewriteVSlot(dir: DirectiveNode, context: TransformContext) {
  dir.arg = rewriteExpression(
    createCompoundExpression([
      context.helperString(DYNAMIC_SLOT) + '(',
      dir.arg!,
      ')',
    ]),
    context
  )
}

function transformTemplateSlotElement(
  slotDir: DirectiveNode,
  slotTemplate: TemplateNode,
  slotComponent: ComponentNode,
  context: TransformContext
) {
  const slotName = findSlotName(slotDir)
  if (!slotName) {
    return
  }
  const { exp } = slotDir
  // non scoped slots
  if (!exp) {
    return slotName
  }
  // empty
  if (exp.type === NodeTypes.SIMPLE_EXPRESSION && !exp.content.trim()) {
    return slotName
  }

  // 使用vFor来简单处理scoped slot作用域问题
  slotTemplate.children = [
    createVForTemplate(
      slotTemplate,
      { name: slotName, value: genExpr(exp), slotComponent },
      context
    ),
  ]
  if (context.miniProgram.slot.dynamicSlotNames) {
    // 已经在 vFor 中补充 slot，故需要移除 slotTemplate 中的
    const index = slotTemplate.props.indexOf(slotDir)
    if (index > -1) {
      slotTemplate.props.splice(index, 1)
    }
  }
  // v-slot="slotProps" => v-slot 避免 transformIdentifier 生成 slotProps 的变量声明
  slotDir.exp = undefined
  return slotName
}

function createTemplateNode(
  slotDir: DirectiveNode,
  children: TemplateChildNode[]
): TemplateNode {
  return {
    type: NodeTypes.ELEMENT,
    tag: 'template',
    tagType: ElementTypes.TEMPLATE,
    loc: locStub,
    isSelfClosing: false,
    codegenNode: undefined,
    ns: 0,
    props: [slotDir],
    children,
  }
}

export function findSlotName(slotDir: DirectiveNode) {
  if (!slotDir.arg) {
    return SLOT_DEFAULT_NAME
  }
  if (isStaticExp(slotDir.arg)) {
    return slotDir.arg.content
  }
  return slotDir.arg
}

function findCurrentVForValueAlias(context: TransformContext) {
  let scope: CodegenScope | null = context.currentScope
  while (scope) {
    if (isVForScope(scope)) {
      return scope.valueAlias
    }
    scope = scope.parent
  }
  return ''
}

function createVForTemplate(
  slotElement: TemplateNode,
  {
    name,
    value,
    slotComponent,
  }: {
    name: string | ExpressionNode
    value: string
    slotComponent: ComponentNode
  },
  context: TransformContext
) {
  const slotName = 's' + context.scopes.vFor
  const keyProp: DirectiveNode = createBindDirectiveNode(
    'key',
    'i' + context.scopes.vFor
  )
  const source = isString(name) ? `'${name}'` : genExpr(name)
  const vForProp: DirectiveNode = {
    type: NodeTypes.DIRECTIVE,
    name: 'for',
    loc: locStub,
    modifiers: [],
    arg: undefined,
    exp: createSimpleExpression(
      `(${value}, ${slotName}) in ${SCOPED_SLOT_IDENTIFIER}(${source}, ${
        findCurrentVForValueAlias(context) || `''`
      })`
    ),
  }
  const props = [vForProp, keyProp]
  if (context.miniProgram.slot.dynamicSlotNames) {
    props.push(createBindDirectiveNode('slot', slotName))
  }
  return {
    loc: slotElement.loc,
    ns: 0,
    tag: 'template',
    type: NodeTypes.ELEMENT,
    tagType: ElementTypes.TEMPLATE,
    props,
    isSelfClosing: false,
    codegenNode: undefined,
    children: slotElement.children,
    slotComponent,
  } as TemplateNode
}

const slotNameRE = /\('(.*)',/

/**
 * ('default','') => default
 * @param source
 * @returns
 */
function findCurrentSlotName(source: ExpressionNode) {
  return stringLiteral(
    dynamicSlotName(
      ((source as CompoundExpressionNode).children[1] as string).match(
        slotNameRE
      )![1]
    )
  )
}

function createPathBinaryExpr(
  scope: CodegenVForScope,
  computed: boolean = true
) {
  return binaryExpression(
    '+',
    binaryExpression(
      '+',
      stringLiteral(parseVForPath(scope.sourceAlias) + (computed ? '[' : '.')),
      identifier(scope.indexAlias)
    ),
    stringLiteral(computed ? '].' : '.')
  )
}

export function findCurrentPath(id: string, scope: CodegenScope) {
  let parent = scope.parent
  let binaryExpr: BinaryExpression | null = null
  while (parent) {
    if (isVForScope(parent)) {
      // const computed = !isScopedSlotVFor(parent)
      if (!binaryExpr) {
        binaryExpr = createPathBinaryExpr(parent)
      } else {
        binaryExpr = binaryExpression(
          '+',
          createPathBinaryExpr(parent),
          binaryExpr
        )
      }
    }
    parent = parent.parent
  }

  return (
    (binaryExpr && binaryExpression('+', binaryExpr, stringLiteral(id))) ||
    stringLiteral(id)
  )
}

function findCurrentVueIdExpr(node: ComponentNode, context: TransformContext) {
  if (!node) {
    return stringLiteral('')
  }
  const vueIdProp = findProp(node, ATTR_VUE_ID)!
  if (vueIdProp.type === NodeTypes.ATTRIBUTE) {
    return stringLiteral(vueIdProp.value!.content)
  }
  return parseExpr(genExpr(vueIdProp.exp!), context) || stringLiteral('')
}
/**
 * 目前无用
 * @param vForScope
 * @param parentScope
 * @param context
 */
export function rewriteScopedSlotVForScope(
  vForScope: CodegenVForScope,
  parentScope: CodegenScope,
  context: TransformContext
) {
  // 生成一个新的sourceAlias，用于scopedSlots
  const { source, sourceExpr } = vForScope
  vForScope.sourceAlias = rewriteExpressionWithoutProperty(
    source,
    context,
    sourceExpr,
    parentScope
  ).content
}

function parseVForPath(id: string) {
  return id.includes('.') ? id.split('.')[1] : id
}

export function createVSlotCallExpression(
  slotComponent: ComponentNode,
  vForScope: CodegenVForScope,
  context: TransformContext
) {
  const { source, sourceAlias } = vForScope
  const id = parseVForPath(sourceAlias)
  return callExpression(identifier(context.helperString(WITH_SCOPED_SLOT)), [
    createVForArrowFunctionExpression(vForScope),
    objectExpression([
      // 插槽名称，数据更新 path，vueId
      objectProperty(identifier('name'), findCurrentSlotName(source)),
      // 暂不生成 path
      objectProperty(identifier('path'), findCurrentPath(id, vForScope)),
      objectProperty(
        identifier('vueId'),
        findCurrentVueIdExpr(slotComponent, context)
      ),
    ]),
  ])
}
