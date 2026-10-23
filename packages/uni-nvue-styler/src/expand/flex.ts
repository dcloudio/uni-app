import {
  type Declaration,
  type TransformDecl,
  createDecl,
  isNumber,
  splitValues,
} from '../utils'
import { expandShorthand, tryExpandSingleValueVarShorthand } from './shorthand'

const flexGrow = __HYPHENATE__ ? 'flex-grow' : 'flexGrow'
const flexShrink = __HYPHENATE__ ? 'flex-shrink' : 'flexShrink'
const flexBasis = __HYPHENATE__ ? 'flex-basis' : 'flexBasis'

function isCssVarValue(value: string) {
  return /^var\(/i.test(value)
}

function transformFlexDecl(decl: Declaration, dom2: boolean): Declaration[] {
  let { value, important, raws, source } = decl
  value = value.trim()
  const result: ReturnType<TransformDecl> = []
  const splitResult = splitValues(value)
  const singleVarResult = tryExpandSingleValueVarShorthand(
    decl,
    [flexGrow, flexShrink, flexBasis],
    value,
    dom2
  )
  // 单个 var() 无法提前拆出 grow/shrink/basis，dom2 下按完整简写平铺。
  if (singleVarResult) {
    return singleVarResult
  }
  const variableResult =
    dom2 && /\bvar\(/i.test(value)
      ? expandShorthand(decl, [flexGrow, flexShrink, flexBasis], value)
      : null

  // 是否 flex-grow 的有效值 <number [0,∞]>
  const isFlexGrowValid = (v: string) =>
    isNumber(Number(v)) && !Number.isNaN(Number(v))

  const isFlexShrinkValid = (v: string) =>
    isNumber(Number(v)) && !Number.isNaN(Number(v)) && Number(v) >= 0

  const isFlexBasisValid = (v: string) =>
    typeof v === 'string' && v.trim() !== ''

  if (splitResult.length === 1) {
    // 关键字处理
    if (value === 'none') {
      result.push(
        createDecl(flexGrow, '0', important, raws, source),
        createDecl(flexShrink, '0', important, raws, source),
        createDecl(flexBasis, 'auto', important, raws, source)
      )
      return result
    }
    if (value === 'auto') {
      result.push(
        createDecl(flexGrow, '1', important, raws, source),
        createDecl(flexShrink, '1', important, raws, source),
        createDecl(flexBasis, 'auto', important, raws, source)
      )
      return result
    }
    if (value === 'initial') {
      result.push(
        createDecl(flexGrow, '0', important, raws, source),
        createDecl(flexShrink, '1', important, raws, source),
        createDecl(flexBasis, 'auto', important, raws, source)
      )
      return result
    }
    const v = splitResult[0]
    // number 视为 flex-grow
    if (isFlexGrowValid(v)) {
      if (Number(v) < 0) {
        return []
      }
      result.push(
        createDecl(flexGrow, v, important, raws, source),
        createDecl(flexShrink, '1', important, raws, source),
        createDecl(flexBasis, '0%', important, raws, source)
      )
      return result
    } else if (isFlexBasisValid(v)) {
      result.push(
        createDecl(flexGrow, '1', important, raws, source),
        createDecl(flexShrink, '1', important, raws, source),
        createDecl(flexBasis, v, important, raws, source)
      )
      return result
    } else {
      return [decl]
    }
  } else if (splitResult.length === 2) {
    const [v1, v2] = splitResult

    if (isFlexGrowValid(v1) || (dom2 && isCssVarValue(v1))) {
      if (isFlexShrinkValid(v2)) {
        // flex: 1 2 => 1 2 0%
        result.push(
          createDecl(flexGrow, v1, important, raws, source),
          createDecl(flexShrink, v2, important, raws, source),
          createDecl(flexBasis, '0%', important, raws, source)
        )
        return result
      } else {
        if (dom2 && isCssVarValue(v2)) {
          return variableResult || [decl]
        }
        // flex: 1 100px => 1 1 100px
        result.push(
          createDecl(flexGrow, v1, important, raws, source),
          createDecl(flexShrink, '1', important, raws, source),
          createDecl(flexBasis, v2, important, raws, source)
        )
        return result
      }
    } else {
      return variableResult || [decl]
    }
  } else if (splitResult.length === 3) {
    const [v1, v2, v3] = splitResult
    if (
      (isFlexGrowValid(v1) || (dom2 && isCssVarValue(v1))) &&
      (isFlexShrinkValid(v2) || (dom2 && isCssVarValue(v2)))
    ) {
      result.push(
        createDecl(flexGrow, v1, important, raws, source),
        createDecl(flexShrink, v2, important, raws, source),
        createDecl(flexBasis, v3, important, raws, source)
      )
      return result
    } else {
      // fallback
      return variableResult || [decl]
    }
  }

  // 其它情况，原样返回
  return variableResult || [decl]
}

export function createTransformFlex(dom2: boolean): TransformDecl {
  return (decl) => transformFlexDecl(decl, dom2)
}

export const transformFlex = createTransformFlex(false)
