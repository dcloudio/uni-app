import { type TransformDecl, createDecl } from '../utils'

const flexDirection = __HYPHENATE__ ? 'flex-direction' : 'flexDirection'
const flexWrap = __HYPHENATE__ ? 'flex-wrap' : 'flexWrap'
export const transformFlexFlow: TransformDecl = (decl) => {
  let { value, important, raws, source } = decl
  value = value.trim()
  const splitResult = value.split(/\s+/)
  const result = [
    /^(column|column-reverse|row|row-reverse)$/,
    /^(nowrap|wrap|wrap-reverse)$/,
  ].map((item) => {
    const index = splitResult.findIndex((str) => item.test(str))
    return index < 0 ? null : splitResult.splice(index, 1)[0]
  })
  if (splitResult.length) {
    return [decl]
  }
  return [
    createDecl(flexDirection, result[0] || 'column', important, raws, source),
    createDecl(flexWrap, result[1] || 'nowrap', important, raws, source),
  ]
}
