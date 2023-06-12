import { CompilerOptions } from './options'
import {
  ExpressionNode,
  SimpleExpressionNode,
  ConstantTypes,
} from '@vue/compiler-core'
import { isString } from '@vue/shared'

export function genRenderFunctionDecl({
  targetLanguage,
  filename,
}: CompilerOptions): string {
  return `${
    targetLanguage === 'kotlin' ? '@Suppress("UNUSED_PARAMETER") ' : ''
  }function ${filename}Render(_ctx: ${filename}): VNode | null`
}

export const objectExp = /\{.*\}/g
export function object2Map(exp: ExpressionNode | string, wrap = true) {
  const content = isString(exp) ? exp : (exp as SimpleExpressionNode).content
  const matched = content.match(objectExp)![0]
  const keyValues = matched.replace(/\{|\}/g, '').split(',')
  let mapConstructor = wrap ? 'new Map<string, any | null>([' : ''

  keyValues.forEach((keyValue: string, index: number) => {
    const colonIndex = keyValue.indexOf(':')
    const key = needAddQuotes(exp, keyValue)
      ? `'${keyValue.substring(0, colonIndex)}'`
      : keyValue.substring(0, colonIndex)
    const value = keyValue.substring(colonIndex + 1)
    if (key && value) {
      mapConstructor += `[${key},${value}]`
      if (index < keyValues.length - 1) {
        mapConstructor += ','
      }
    }
  })

  mapConstructor += wrap ? '])' : ''

  return content.replace(matched, mapConstructor)
}

function needAddQuotes(
  exp: ExpressionNode | string,
  keyValue: string
): boolean {
  return (
    !isString(exp) &&
    (exp as SimpleExpressionNode).constType === ConstantTypes.CAN_STRINGIFY &&
    !keyValue.startsWith("'") &&
    !keyValue.startsWith('"')
  )
}
