import {
  binaryExpression,
  BinaryExpression,
  callExpression,
  identifier,
  objectExpression,
  objectProperty,
  stringLiteral,
} from '@babel/types'
import {
  ComponentNode,
  CompoundExpressionNode,
  createCompilerError,
  createSimpleExpression,
  DirectiveNode,
  ElementTypes,
  ErrorCodes,
  ExpressionNode,
  findDir,
  findProp,
  isStaticExp,
  isTemplateNode,
  locStub,
  NodeTypes,
  TemplateChildNode,
  TemplateNode,
} from '@vue/compiler-core'
import { isUserComponent } from '@dcloudio/uni-cli-shared'
import { WITH_SCOPED_SLOT } from '../runtimeHelpers'
import { createBindDirectiveNode, parseExpr } from '../ast'
import { genExpr } from '../codegen'
import { CodegenScope, CodegenVForScope } from '../options'
import { isVForScope, NodeTransform, TransformContext } from '../transform'
import {
  ATTR_VUE_ID,
  ATTR_VUE_SLOTS,
  rewriteExpressionWithoutProperty,
  SCOPED_SLOT_IDENTIFIER,
} from './utils'
import { createVForArrowFunctionExpression } from './vFor'

export const transformSlot: NodeTransform = (node, context) => {
  if (!isUserComponent(node, context as any)) {
    return
  }

  const { children } = node

  const slots = new Set<string>()
  const onComponentSlot = findDir(node, 'slot', true)
  const implicitDefaultChildren: TemplateChildNode[] = []

  for (let i = 0; i < children.length; i++) {
    const slotElement = children[i]
    let slotDir: DirectiveNode | undefined
    if (
      !isTemplateNode(slotElement) ||
      !(slotDir = findDir(slotElement, 'slot', true))
    ) {
      // not a <template v-slot>, skip.
      if (slotElement.type !== NodeTypes.COMMENT) {
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
    const slotName = transformTemplateSlotElement(
      slotDir,
      slotElement,
      node,
      context
    )
    if (slotName) {
      slots.add(slotName)
    }
  }
  if (implicitDefaultChildren.length) {
    slots.add('default')
  }
  if (onComponentSlot) {
    // <unicloud-db v-slot:default="{data, loading, error, options}"/>
    // => <unicloud-db  collection=""><template v-slot:default="{data, loading, error, options}"/></unicloud-db>
    slots.add('default')
    const templateNode = createTemplateNode(
      onComponentSlot,
      implicitDefaultChildren
    )
    transformTemplateSlotElement(onComponentSlot, templateNode, node, context)
    node.children = templateNode.children
  }
  if (slots.size) {
    node.props.unshift(
      createBindDirectiveNode(
        ATTR_VUE_SLOTS,
        `[${[...slots].map((name) => `'${name}'`).join(',')}]`
      )
    )
  }
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
    return 'default'
  }
  if (isStaticExp(slotDir.arg)) {
    return slotDir.arg.content
  }
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
    name: string
    value: string
    slotComponent: ComponentNode
  },
  context: TransformContext
) {
  const key = 's' + context.scopes.vFor
  const keyProp: DirectiveNode = createBindDirectiveNode('key', key)
  const vForProp: DirectiveNode = {
    type: NodeTypes.DIRECTIVE,
    name: 'for',
    loc: locStub,
    modifiers: [],
    arg: undefined,
    exp: createSimpleExpression(
      `(${value}, ${key}) in ${SCOPED_SLOT_IDENTIFIER}('${name}', ${
        findCurrentVForValueAlias(context) || `''`
      })`
    ),
  }
  return {
    loc: slotElement.loc,
    ns: 0,
    tag: 'template',
    type: NodeTypes.ELEMENT,
    tagType: ElementTypes.TEMPLATE,
    props: [vForProp, keyProp],
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
    ((source as CompoundExpressionNode).children[1] as string).match(
      slotNameRE
    )![1]
  )
}

function createPathBinaryExpr(scope: CodegenVForScope) {
  return binaryExpression(
    '+',
    binaryExpression(
      '+',
      stringLiteral(parseVForPath(scope.sourceAlias) + '.'),
      identifier(scope.indexAlias)
    ),
    stringLiteral('.')
  )
}

export function findCurrentPath(id: string, scope: CodegenScope) {
  let parent = scope.parent
  let binaryExpr: BinaryExpression | null = null
  while (parent) {
    if (isVForScope(parent)) {
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
  const { source /*, sourceAlias*/ } = vForScope
  // const id = parseVForPath(sourceAlias)
  return callExpression(identifier(context.helperString(WITH_SCOPED_SLOT)), [
    createVForArrowFunctionExpression(vForScope),
    objectExpression([
      // 插槽名称，数据更新path，vueId
      objectProperty(identifier('name'), findCurrentSlotName(source)),
      // 暂不生成path
      // objectProperty(identifier('path'), findCurrentPath(id, vForScope)),
      objectProperty(
        identifier('vueId'),
        findCurrentVueIdExpr(slotComponent, context)
      ),
    ]),
  ])
}
