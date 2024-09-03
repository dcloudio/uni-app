import { type Declaration, createDecl } from '../utils'

const top = (): string => {
  if (__NODE_JS__) {
    return '-top'
  } else {
    return 'Top'
  }
}
const right = (): string => {
  if (__NODE_JS__) {
    return '-right'
  } else {
    return 'Right'
  }
}
const bottom = (): string => {
  if (__NODE_JS__) {
    return '-bottom'
  } else {
    return 'Bottom'
  }
}
const left = (): string => {
  if (__NODE_JS__) {
    return '-left'
  } else {
    return 'Left'
  }
}

export const createTransformBox = (
  type: 'margin' | 'padding'
): ((decl: Declaration) => Declaration[]) => {
  return (decl: Declaration): Declaration[] => {
    const { value, important, raws, source } = decl
    const splitResult = value.split(/\s+/)

    switch (splitResult.length) {
      case 1:
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
      createDecl(type + top(), splitResult[0], important, raws, source),
      createDecl(type + right(), splitResult[1], important, raws, source),
      createDecl(type + bottom(), splitResult[2], important, raws, source),
      createDecl(type + left(), splitResult[3], important, raws, source),
    ]
  }
}
export const transformMargin = createTransformBox('margin')
