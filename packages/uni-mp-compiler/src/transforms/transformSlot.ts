import {
  type AttributeNode,
  type DirectiveNode,
  ErrorCodes,
  type ExpressionNode,
  NodeTypes,
  type SimpleExpressionNode,
  type SlotOutletNode,
  createCompilerError,
  createCompoundExpression,
  createSimpleExpression,
  findProp,
  isStaticArgOf,
  isStaticExp,
} from '@vue/compiler-core'
import { camelize } from '@vue/shared'
import { SLOT_DEFAULT_NAME, dynamicSlotName } from '@dcloudio/uni-shared'
import { RENDER_SLOT } from '../runtimeHelpers'
import { genExpr } from '../codegen'
import {
  type TransformContext,
  isScopedSlotVFor,
  isVForScope,
} from '../transform'
import { processProps } from './transformElement'
import { isReferencedByIds, removeAttribute, rewriteExpression } from './utils'
import {
  createAttributeNode,
  createBindDirectiveNode,
  isDirectiveNode,
} from '@dcloudio/uni-cli-shared'
import { DYNAMIC_SLOT } from '..'
import { parseExpr } from '../ast'

export function rewriteSlot(node: SlotOutletNode, context: TransformContext) {
  let slotName: string | ExpressionNode = `"${SLOT_DEFAULT_NAME}"`
  let hasOtherDir = false
  const nonNameProps: (AttributeNode | DirectiveNode)[] = []
  const { props } = node
  // 默认插槽强制设置name
  if (!findProp(node, 'name')) {
    props.unshift(createAttributeNode('name', 'default'))
  }
  for (let i = 0; i < props.length; i++) {
    const p = props[i]
    if (p.type === NodeTypes.ATTRIBUTE) {
      if (p.value) {
        if (p.name === 'name') {
          p.value.content = dynamicSlotName(p.value.content)
          slotName = JSON.stringify(p.value.content)
        } else {
          p.name = camelize(p.name)
          nonNameProps.push(p)
        }
      }
    } else {
      if (p.name !== 'bind') {
        hasOtherDir = true
      }
      if (p.name === 'bind' && isStaticArgOf(p.arg, 'name')) {
        if (p.exp) {
          slotName = createCompoundExpression([
            context.helperString(DYNAMIC_SLOT) + '(',
            p.exp,
            ')',
          ])
          let slotKey
          const keys = parseVForKeyAlias(context)
          if (keys.length) {
            const babelNode = parseExpr(p.exp, context)
            // 在 v-for 中，判断是否插槽名使用 v-for 的 key 变量
            if (babelNode && isReferencedByIds(babelNode, keys)) {
              slotKey = parseScopedSlotKey(context)
            }
          }
          p.exp = rewriteExpression(
            createCompoundExpression([
              context.helperString(DYNAMIC_SLOT) + '(',
              p.exp,
              slotKey ? `+'-'+` + slotKey : '',
              ')',
            ]),
            context
          )
        }
      } else {
        if (p.name === 'bind' && p.arg && isStaticExp(p.arg)) {
          p.arg.content = camelize(p.arg.content)
        }
        nonNameProps.push(p)
      }
    }
  }
  if (hasOtherDir) {
    context.onError(
      createCompilerError(
        ErrorCodes.X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET,
        node.loc
      )
    )
  }
  if (nonNameProps.length > 0) {
    processProps(node, context, nonNameProps)
    const properties: string[] = []
    nonNameProps.forEach((prop) => {
      const property = transformProperty(prop, context)
      property && properties.push(property)
    })
    if (properties.length) {
      transformScopedSlotName(node, context)
      const vForIndexAlias = parseVForIndexAlias(context)
      rewriteExpression(
        createCompoundExpression([
          context.helperString(RENDER_SLOT) + '(',
          slotName,
          ',',
          `{${properties.join(',')}}`,
          `${vForIndexAlias ? ',' + parseScopedSlotKey(context) : ''}`,
          ')',
        ]),
        context
      )
    } else {
      // 非作用域默认插槽直接移除命名
      if (slotName === `"${SLOT_DEFAULT_NAME}"`) {
        removeAttribute(node, 'name')
      }
    }
  } else {
    // 非作用域默认插槽直接移除命名
    if (slotName === `"${SLOT_DEFAULT_NAME}"`) {
      removeAttribute(node, 'name')
    }
  }
}

function parseVForIndexAlias(context: TransformContext) {
  let { currentScope } = context
  while (currentScope) {
    if (isVForScope(currentScope) && !isScopedSlotVFor(currentScope)) {
      return currentScope.indexAlias
    }
    currentScope = currentScope.parent!
  }
}

function transformScopedSlotName(
  node: SlotOutletNode,
  context: TransformContext
) {
  if (!context.miniProgram.slot.dynamicSlotNames) {
    return
  }
  const slotKey = parseScopedSlotKey(context)
  if (!slotKey) {
    return
  }
  const nameProps = findProp(node, 'name')
  if (nameProps && nameProps.type === NodeTypes.ATTRIBUTE && nameProps.value) {
    const { props } = node
    props.splice(
      props.indexOf(nameProps),
      1,
      createScopedSlotDirectiveNode(nameProps.value.content, slotKey, context)
    )
  }
}

export interface NameScopedSlotDirectiveNode extends DirectiveNode {
  slotName: string
}

function createScopedSlotDirectiveNode(
  name: string,
  slotKey: string,
  context: TransformContext
): NameScopedSlotDirectiveNode {
  const dir = createBindDirectiveNode(
    'name',
    rewriteExpression(createSimpleExpression(`"${name}-"+` + slotKey), context)
      .content
  ) as NameScopedSlotDirectiveNode
  // 存储原始的 slot 名称
  dir.slotName = name
  return dir
}

export function parseVForKeyAlias(context: TransformContext) {
  let { currentScope } = context
  const keys: string[] = []
  while (currentScope) {
    if (isVForScope(currentScope) && !isScopedSlotVFor(currentScope)) {
      keys.push(currentScope.keyAlias)
    }
    currentScope = currentScope.parent!
  }
  return keys
}

function parseVForIndexes(context: TransformContext) {
  let { currentScope } = context
  const indexes: string[] = []
  while (currentScope) {
    if (isVForScope(currentScope) && !isScopedSlotVFor(currentScope)) {
      indexes.push(currentScope.indexAlias)
    }
    currentScope = currentScope.parent!
  }
  return indexes
}

function parseSlotKeyByVForIndexes(indexes: string[]) {
  return indexes.reverse().join(`+'-'+`)
}

function parseScopedSlotKey(context: TransformContext) {
  const indexes = parseVForIndexes(context)
  const inFor = !!indexes.length
  if (inFor) {
    return parseSlotKeyByVForIndexes(indexes)
  }
}

function transformProperty(
  dir: DirectiveNode | AttributeNode,
  _: TransformContext
) {
  if (isDirectiveNode(dir)) {
    if (!dir.arg || !dir.exp) {
      return
    }

    const isStaticArg =
      dir.arg.type === NodeTypes.SIMPLE_EXPRESSION && dir.arg.isStatic

    if (isStaticArg) {
      return `${(dir.arg as SimpleExpressionNode).content}:${genExpr(dir.exp)}`
    }
    return `[${genExpr(dir.arg)}||'']:${genExpr(dir.exp)}`
  }
  if (dir.value) {
    return `${dir.name}:${genExpr(dir.value)}`
  }
}
