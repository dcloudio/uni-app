import { type TransformDecl, createDecl } from '../utils'

const flexGrow = __NODE_JS__ ? 'flex-grow' : 'flexGrow'
const flexShrink = __NODE_JS__ ? 'flex-shrink' : 'flexShrink'
const flexBasis = __NODE_JS__ ? 'flex-basis' : 'flexBasis'

const isNumber = (val: string) => /^[-+]?\d*\.?\d+$/.test(val)
const isLength = (val: string) =>
  /^(0|[-+]?\d*\.?\d+(px|rpx|upx|vw|vh|%|em|rem|pt|cm|mm|in|pc|ex|ch|vmin|vmax))$/.test(
    val
  )

export const transformFlex: TransformDecl = (decl) => {
  const { value, important, raws, source } = decl
  const result: ReturnType<TransformDecl> = []
  const splitResult = value.trim().split(/\s+/)

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

  // 是否 flex-grow 的有效值
  const isFlexGrowValid = (v: string) => isNumber(v) && Number(v) >= 0
  const isFlexShrinkValid = (v: string) => isNumber(v) && Number(v) >= 0
  const isFlexBasisValid = (v: string) =>
    isLength(v) || v === 'auto' || v.includes('content') || v === 'fill'

  if (splitResult.length === 1) {
    const v = splitResult[0]
    // number 视为 flex-grow
    if (isFlexGrowValid(v)) {
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
      // fallback
      return []
    }
  } else if (splitResult.length === 2) {
    const [v1, v2] = splitResult
    if (isFlexGrowValid(v1) && isFlexShrinkValid(v2)) {
      // flex: 1 2 => 1 2 0%
      result.push(
        createDecl(flexGrow, v1, important, raws, source),
        createDecl(flexShrink, v2, important, raws, source),
        createDecl(flexBasis, '0%', important, raws, source)
      )
      return result
    } else if (isFlexGrowValid(v1) && isFlexBasisValid(v2)) {
      // flex: 1 100px => 1 1 100px
      result.push(
        createDecl(flexGrow, v1, important, raws, source),
        createDecl(flexShrink, '1', important, raws, source),
        createDecl(flexBasis, v2, important, raws, source)
      )
      return result
    } else {
      // fallback
      return []
    }
  } else if (splitResult.length === 3) {
    const [v1, v2, v3] = splitResult
    if (isFlexGrowValid(v1) && isFlexShrinkValid(v2) && isFlexBasisValid(v3)) {
      result.push(
        createDecl(flexGrow, v1, important, raws, source),
        createDecl(flexShrink, v2, important, raws, source),
        createDecl(flexBasis, v3, important, raws, source)
      )
      return result
    } else {
      // fallback
      return []
    }
  }

  // 其它情况，原样返回
  return [decl]
}
