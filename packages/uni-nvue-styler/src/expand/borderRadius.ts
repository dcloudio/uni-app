import { type Declaration, createDecl } from '../utils'

const borderTopLeftRadius = (): string => {
  if (__NODE_JS__) {
    return 'border-top-left-radius'
  } else {
    return 'borderTopLeftRadius'
  }
}

const borderTopRightRadius = (): string => {
  if (__NODE_JS__) {
    return 'border-top-right-radius'
  } else {
    return 'borderTopRightRadius'
  }
}
const borderBottomRightRadius = (): string => {
  if (__NODE_JS__) {
    return 'border-bottom-right-radius'
  } else {
    return 'borderBottomRightRadius'
  }
}

const borderBottomLeftRadius = (): string => {
  if (__NODE_JS__) {
    return 'border-bottom-left-radius'
  } else {
    return 'borderBottomLeftRadius'
  }
}

export const transformBorderRadius = (decl: Declaration): Declaration[] => {
  const { value, important, raws, source } = decl
  const splitResult = value.split(/\s+/)
  if (value.includes('/')) {
    return [decl]
  }
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
    createDecl(borderTopLeftRadius(), splitResult[0], important, raws, source),
    createDecl(borderTopRightRadius(), splitResult[1], important, raws, source),
    createDecl(
      borderBottomRightRadius(),
      splitResult[2],
      important,
      raws,
      source
    ),
    createDecl(
      borderBottomLeftRadius(),
      splitResult[3],
      important,
      raws,
      source
    ),
  ]
}
