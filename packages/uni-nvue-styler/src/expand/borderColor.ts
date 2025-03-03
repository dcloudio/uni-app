import { capitalize, hyphenate } from '@vue/shared'
import { type TransformDecl, createDecl } from '../utils'

const borderTop = __NODE_JS__ ? 'border-top-' : 'borderTop'
const borderRight = __NODE_JS__ ? 'border-right-' : 'borderRight'
const borderBottom = __NODE_JS__ ? 'border-bottom-' : 'borderBottom'
const borderLeft = __NODE_JS__ ? 'border-left-' : 'borderLeft'

// const position = ['top', 'right', 'bottom', 'left']

export const transformBorderColor: TransformDecl = (decl) => {
  const { prop, value, important, raws, source } = decl
  let _property_split = hyphenate(prop).split('-')
  let property = _property_split[_property_split.length - 1]
  if (!__NODE_JS__) {
    property = capitalize(property)
  }
  let splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/) // 1pt
  switch (splitResult.length) {
    case 1:
      if (_property_split.length === 3) {
        // border-top-width
        return [decl]
      } else {
        // border-width
        splitResult.push(splitResult[0], splitResult[0], splitResult[0])
        break
      }

    case 2:
      splitResult.push(splitResult[0], splitResult[1])
      break
    case 3:
      splitResult.push(splitResult[1])
      break
  }

  return [
    createDecl(borderTop + property, splitResult[0], important, raws, source),
    createDecl(borderRight + property, splitResult[1], important, raws, source),
    createDecl(
      borderBottom + property,
      splitResult[2],
      important,
      raws,
      source
    ),
    createDecl(borderLeft + property, splitResult[3], important, raws, source),
  ]
}
