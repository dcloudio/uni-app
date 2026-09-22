import {
  type Declaration,
  type TransformDecl,
  createDecl,
  splitValues,
} from '../utils'
import { expandShorthand, tryExpandSingleValueVarShorthand } from './shorthand'

const flexDirection = __HYPHENATE__ ? 'flex-direction' : 'flexDirection'
const flexWrap = __HYPHENATE__ ? 'flex-wrap' : 'flexWrap'
function transformFlexFlowDecl(
  decl: Declaration,
  dom2: boolean
): Declaration[] {
  let { value, important, raws, source } = decl
  value = value.trim()
  const splitResult = splitValues(value)
  const singleVarResult = tryExpandSingleValueVarShorthand(
    decl,
    [flexDirection, flexWrap],
    value,
    dom2
  )
  // 单个 var() 无法提前判断是 direction 还是 wrap，dom2 下直接平铺。
  if (singleVarResult) {
    return singleVarResult
  }

  const matchers = [
    /^(column|column-reverse|row|row-reverse)$/,
    /^(nowrap|wrap|wrap-reverse)$/,
  ]
  const result = matchers.map((item) => {
    const index = splitResult.findIndex((str) => item.test(str))
    return index < 0 ? null : splitResult.splice(index, 1)[0]
  })
  if (
    dom2 &&
    splitResult.length === 1 &&
    /^var\(/i.test(splitResult[0]) &&
    (result[0] === null || result[1] === null)
  ) {
    result[result[0] === null ? 0 : 1] = splitResult.pop()!
  }
  if (splitResult.length) {
    return dom2 && /\bvar\(/i.test(value)
      ? expandShorthand(decl, [flexDirection, flexWrap], value)
      : [decl]
  }
  return [
    createDecl(flexDirection, result[0] || 'column', important, raws, source),
    createDecl(flexWrap, result[1] || 'nowrap', important, raws, source),
  ]
}

export function createTransformFlexFlow(dom2: boolean): TransformDecl {
  return (decl) => transformFlexFlowDecl(decl, dom2)
}

export const transformFlexFlow = createTransformFlexFlow(false)
