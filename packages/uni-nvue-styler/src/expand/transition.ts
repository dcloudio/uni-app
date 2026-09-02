import {
  type Declaration,
  type TransformDecl,
  createDecl,
  splitValues,
} from '../utils'
import { expandShorthand, tryExpandSingleValueVarShorthand } from './shorthand'

const transitionProperty = __HYPHENATE__
  ? 'transition-property'
  : 'transitionProperty'
const transitionDuration = __HYPHENATE__
  ? 'transition-duration'
  : 'transitionDuration'
const transitionTimingFunction = __HYPHENATE__
  ? 'transition-timing-function'
  : 'transitionTimingFunction'
const transitionDelay = __HYPHENATE__ ? 'transition-delay' : 'transitionDelay'
const transitionLonghands = [
  transitionProperty,
  transitionDuration,
  transitionTimingFunction,
  transitionDelay,
]
const TRANSITION_TIME_REGEXP = /^\d*\.?\d+(?:ms|s)$/

function isCssVarValue(value: string) {
  return /^var\(/i.test(value)
}

function containsCssVar(value: string) {
  return /\bvar\(/i.test(value)
}

function tryTransformTransitionNestedVariable(
  decl: Declaration,
  dom2: boolean
): Declaration[] | null {
  if (!dom2) {
    return null
  }
  const values = splitValues(decl.value)
  if (
    values.length < 2 ||
    values.length > 4 ||
    !values.some(containsCssVar) ||
    values.some(isCssVarValue) ||
    TRANSITION_TIME_REGEXP.test(values[0]) ||
    !TRANSITION_TIME_REGEXP.test(values[1]) ||
    (values[3] && !TRANSITION_TIME_REGEXP.test(values[3]))
  ) {
    return null
  }
  const { important, raws, source } = decl
  return values.map((value, index) =>
    createDecl(transitionLonghands[index], value, important, raws, source)
  )
}

function transformTransitionDecl(
  decl: Declaration,
  dom2: boolean
): Declaration[] {
  let { value, important, raws, source } = decl
  value = value.trim()

  const singleVarResult = tryExpandSingleValueVarShorthand(
    decl,
    transitionLonghands,
    value,
    dom2
  )
  if (singleVarResult) {
    return singleVarResult
  }
  const variableResult = tryTransformTransitionNestedVariable(decl, dom2)
  if (variableResult) {
    return variableResult
  }
  if (dom2 && /\bvar\(/i.test(value)) {
    return expandShorthand(decl, transitionLonghands, value)
  }

  const result: Declaration[] = []

  let match

  // 针对 cubic-bezier 特殊处理
  // eg: cubic-bezier(0.42, 0, 1.0, 3) // (0.2,-2,0.8,2)
  if (value.includes('cubic-bezier')) {
    const CHUNK_REGEXP =
      /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*((\S*)|cubic-bezier\(.*\))?\s*(\d*\.?\d+(?:ms|s)?)?$/

    match = value.match(CHUNK_REGEXP)
  } else {
    const CHUNK_REGEXP =
      /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?$/

    match = value.match(CHUNK_REGEXP)
  }

  if (!match) {
    return result
  }
  match[1] &&
    result.push(
      createDecl(transitionProperty, match[1], important, raws, source)
    )
  match[2] &&
    result.push(
      createDecl(transitionDuration, match[2], important, raws, source)
    )
  match[3] &&
    result.push(
      createDecl(transitionTimingFunction, match[3], important, raws, source)
    )
  match[4] &&
    result.push(createDecl(transitionDelay, match[4], important, raws, source))
  return result
}

export function createTransformTransition(dom2: boolean): TransformDecl {
  return (decl) => transformTransitionDecl(decl, dom2)
}

export const transformTransition = createTransformTransition(false)
