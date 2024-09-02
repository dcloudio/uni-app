import { capitalize, hyphenate } from '@vue/shared'
import {
  type Declaration,
  //  type TransformDecl,
  createDecl,
} from '../utils'

function borderTop(): string {
  if (__NODE_JS__) {
    return 'border-top-'
  } else {
    return 'borderTop'
  }
}

function borderRight(): string {
  if (__NODE_JS__) {
    return 'border-right-'
  } else {
    return 'borderRight'
  }
}
function borderBottom(): string {
  if (__NODE_JS__) {
    return 'border-bottom-'
  } else {
    return 'borderBottom'
  }
}
function borderLeft(): string {
  if (__NODE_JS__) {
    return 'border-left-'
  } else {
    return 'borderLeft'
  }
}

export const transformBorderColor = (decl: Declaration): Declaration[] => {
  const { prop, value, important, raws, source } = decl
  let property = hyphenate(prop).split('-')[1]
  if (!__NODE_JS__) {
    property = capitalize(property)
  }
  const splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/)
  switch (splitResult.length) {
    case 1:
      return [decl]
    case 2:
      splitResult.push(splitResult[0], splitResult[1])
      break
    case 3:
      splitResult.push(splitResult[1])
      break
  }

  return [
    createDecl(borderTop() + property, splitResult[0], important, raws, source),
    createDecl(
      borderRight() + property,
      splitResult[1],
      important,
      raws,
      source
    ),
    createDecl(
      borderBottom() + property,
      splitResult[2],
      important,
      raws,
      source
    ),
    createDecl(
      borderLeft() + property,
      splitResult[3],
      important,
      raws,
      source
    ),
  ]
}
