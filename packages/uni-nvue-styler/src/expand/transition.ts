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
const TRANSITION_TIME_REGEXP = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:ms|s)$/
const TRANSITION_DURATION_REGEXP = /^(?:\d+(?:\.\d+)?|\.\d+)(?:ms|s)$/
const TRANSITION_SIGNED_TIME_REGEXP = /^[+-](?:\d+(?:\.\d+)?|\.\d+)(?:ms|s)$/
const TRANSITION_TIMING_FUNCTION_REGEXP =
  /^(?:linear|ease(?:-in-out|-in|-out)?|cubic-bezier\(\s*-?(?:\d+(?:\.\d+)?|\.\d+)\s*,\s*-?(?:\d+(?:\.\d+)?|\.\d+)\s*,\s*-?(?:\d+(?:\.\d+)?|\.\d+)\s*,\s*-?(?:\d+(?:\.\d+)?|\.\d+)\s*\))$/i

function isCssVarValue(value: string) {
  return /^var\(/i.test(value)
}

function containsCssVar(value: string) {
  return /\bvar\(/i.test(value)
}

interface TransitionItem {
  property?: string
  duration?: string
  timingFunction?: string
  delay?: string
}

function isTransitionTimingFunction(value: string) {
  return TRANSITION_TIMING_FUNCTION_REGEXP.test(value)
}

function parseTransitionItem(value: string): TransitionItem | null {
  const tokens = splitValues(value)
  if (!tokens.length) {
    return null
  }

  const result: TransitionItem = {}
  let hasProperty = false
  let hasDuration = false
  let hasTimingFunction = false
  let hasDelay = false

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (isTransitionTimingFunction(token)) {
      if (hasTimingFunction) {
        return null
      }
      result.timingFunction = token.toLowerCase()
      hasTimingFunction = true
      continue
    }

    if (TRANSITION_TIME_REGEXP.test(token)) {
      if (!hasDuration) {
        // transition-duration 不允许负值，负时间只能作为 delay。
        if (token[0] === '-') {
          return null
        }
        result.duration = token
        hasDuration = true
      } else if (!hasDelay) {
        result.delay = token
        hasDelay = true
      } else {
        return null
      }
      continue
    }

    if (TRANSITION_SIGNED_TIME_REGEXP.test(token)) {
      return null
    }

    if (!hasProperty) {
      result.property = token
      hasProperty = true
      continue
    }
    return null
  }

  return result
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
    !TRANSITION_DURATION_REGEXP.test(values[1]) ||
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

  if (TRANSITION_DURATION_REGEXP.test(value)) {
    return [createDecl(transitionDuration, value, important, raws, source)]
  }

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

  const parsed = parseTransitionItem(value)
  if (!parsed) {
    return []
  }

  const result: Declaration[] = []
  if (parsed.property !== undefined) {
    result.push(
      createDecl(transitionProperty, parsed.property, important, raws, source)
    )
  }
  if (parsed.duration !== undefined) {
    result.push(
      createDecl(transitionDuration, parsed.duration, important, raws, source)
    )
  }
  if (parsed.timingFunction !== undefined) {
    result.push(
      createDecl(
        transitionTimingFunction,
        parsed.timingFunction,
        important,
        raws,
        source
      )
    )
  }
  if (parsed.delay !== undefined) {
    result.push(
      createDecl(transitionDelay, parsed.delay, important, raws, source)
    )
  }
  return result
}

export function createTransformTransition(dom2: boolean): TransformDecl {
  return (decl) => transformTransitionDecl(decl, dom2)
}

export const transformTransition = createTransformTransition(false)
