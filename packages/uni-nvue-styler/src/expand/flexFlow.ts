import { type TransformDecl, createDecl, splitValues } from '../utils'

const flexDirection = __HYPHENATE__ ? 'flex-direction' : 'flexDirection'
const flexWrap = __HYPHENATE__ ? 'flex-wrap' : 'flexWrap'
function createFlexFlowDecls(
  decl: Parameters<TransformDecl>[0],
  values: Array<string | null>
) {
  const { important, raws, source } = decl
  return [
    createDecl(flexDirection, values[0] || 'column', important, raws, source),
    createDecl(flexWrap, values[1] || 'nowrap', important, raws, source),
  ]
}

function transformFlexFlowImpl(
  decl: Parameters<TransformDecl>[0],
  allowSingleUnknownValue = false
) {
  let { value } = decl
  value = value.trim()
  const splitResult = splitValues(value)
  const result = [
    /^(column|column-reverse|row|row-reverse)$/,
    /^(nowrap|wrap|wrap-reverse)$/,
  ].map((item) => {
    const index = splitResult.findIndex((str) => item.test(str))
    return index < 0 ? null : splitResult.splice(index, 1)[0]
  })
  if (splitResult.length) {
    if (
      allowSingleUnknownValue &&
      splitResult.length === 1 &&
      result.some((item) => item === null)
    ) {
      result[result.findIndex((item) => item === null)] = splitResult[0]
    } else {
      return [decl]
    }
  }
  return createFlexFlowDecls(decl, result)
}

export const transformFlexFlow: TransformDecl = (decl) =>
  transformFlexFlowImpl(decl)

export const transformFlexFlowUvue: TransformDecl = (decl) =>
  transformFlexFlowImpl(decl, true)
