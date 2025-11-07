import type { Declaration } from 'postcss'
import { capitalize, hyphenate } from '@vue/shared'
import { createDecl } from '../utils'

function borderTop(): string {
  return __HYPHENATE__ ? 'border-top-' : 'borderTop'
}

function borderRight(): string {
  return __HYPHENATE__ ? 'border-right-' : 'borderRight'
}

function borderBottom(): string {
  return __HYPHENATE__ ? 'border-bottom-' : 'borderBottom'
}

function borderLeft(): string {
  return __HYPHENATE__ ? 'border-left-' : 'borderLeft'
}

export const transformBorderColor = (decl: Declaration): Declaration[] => {
  const { prop, value, important, raws, source } = decl
  const _property_split = hyphenate(prop).split('-')
  let property = _property_split[_property_split.length - 1]
  if (!__HYPHENATE__) {
    property = capitalize(property)
  }
  const splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/) // 1pt
  switch (splitResult.length) {
    case 1:
      if (_property_split.length === 3) {
        // border-top-width
        return [decl]
      }
      // border-width
      splitResult.push(splitResult[0], splitResult[0], splitResult[0])
      break

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

export const transformBorderColorNvue = (decl: Declaration): Declaration[] => {
  const { prop, value, important, raws, source } = decl
  let property = hyphenate(prop).split('-')[1]
  if (!__HYPHENATE__) {
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
