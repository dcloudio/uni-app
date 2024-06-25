import {
  type LVal,
  type Node,
  isIdentifier,
  isTSMethodSignature,
  isTSTypeLiteral,
} from '@babel/types'
import { isCallOf } from './utils'
import type { ScriptCompileContext } from './context'

export const DEFINE_SLOTS = 'defineSlots'

export function processDefineSlots(
  ctx: ScriptCompileContext,
  node: Node,
  declId?: LVal
): boolean {
  if (!isCallOf(node, DEFINE_SLOTS)) {
    return false
  }
  if (ctx.hasDefineSlotsCall) {
    ctx.error(`duplicate ${DEFINE_SLOTS}() call`, node)
  }
  ctx.hasDefineSlotsCall = true

  if (node.arguments.length > 0) {
    ctx.error(`${DEFINE_SLOTS}() cannot accept arguments`, node)
  }

  if (
    node.typeParameters &&
    node.typeParameters.params.length === 1 &&
    isTSTypeLiteral(node.typeParameters.params[0])
  ) {
    ctx.slotsRuntimeDecl = node.typeParameters.params[0]
  }

  if (declId) {
    ctx.s.overwrite(
      ctx.startOffset! + node.start!,
      ctx.startOffset! + node.end!,
      `${ctx.helper('useSlots')}()`
    )
  }

  return true
}

export function genRuntimeSlots(ctx: ScriptCompileContext): string | undefined {
  if (!ctx.slotsRuntimeDecl) {
    return
  }
  const slots: string[] = []
  ctx.slotsRuntimeDecl.members.forEach((member) => {
    if (
      isTSMethodSignature(member) &&
      member.parameters.length === 1 &&
      isIdentifier(member.key)
    ) {
      const param = member.parameters[0]
      if (isIdentifier(param) && param.typeAnnotation) {
        const typeAnn = param.typeAnnotation
        slots.push(
          member.key.name +
            ': ' +
            ctx.source.slice(
              ctx.startOffset! + typeAnn.start! + 1,
              ctx.startOffset! + typeAnn.end!
            )
        )
      }
    }
  })
  if (!slots.length) {
    return
  }
  return `Object as SlotsType<{${slots.join(';')}}>`
}
