import {
  AttributeNode,
  createCompilerError,
  createCompoundExpression,
  createSimpleExpression,
  DirectiveNode,
  ErrorCodes,
  ExpressionNode,
  findProp,
  isStaticArgOf,
  isStaticExp,
  NodeTypes,
  SimpleExpressionNode,
  SlotOutletNode,
} from '@vue/compiler-core'
import { camelize } from '@vue/shared'
import { dynamicSlotName, SLOT_DEFAULT_NAME } from '@dcloudio/uni-shared'
import { RENDER_SLOT } from '../runtimeHelpers'
import { genExpr } from '../codegen'
import { isScopedSlotVFor, isVForScope, TransformContext } from '../transform'
import { processProps } from './transformElement'
import { removeAttribute, rewriteExpression } from './utils'
import {
  createAttributeNode,
  createBindDirectiveNode,
} from '@dcloudio/uni-cli-shared'
import { DYNAMIC_SLOT } from '..'

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
          p.exp = rewriteExpression(
            createCompoundExpression([
              context.helperString(DYNAMIC_SLOT) + '(',
              p.exp,
              ')',
            ]),
            context
          )
          slotName = p.exp
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
      if (prop.type === NodeTypes.DIRECTIVE && prop.name === 'bind') {
        const property = transformProperty(prop, context)
        property && properties.push(property)
      }
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
      createBindDirectiveNode(
        'name',
        rewriteExpression(
          createSimpleExpression(`"${nameProps.value.content}-"+` + slotKey),
          context
        ).content
      )
    )
  }
}

function parseScopedSlotKey(context: TransformContext) {
  let { currentScope } = context
  const indexs: string[] = []
  while (currentScope) {
    if (isVForScope(currentScope)) {
      indexs.push(currentScope.indexAlias)
    }
    currentScope = currentScope.parent!
  }
  const inFor = !!indexs.length
  if (inFor) {
    return indexs.reverse().join(`+'-'+`)
  }
}

function transformProperty(dir: DirectiveNode, context: TransformContext) {
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
