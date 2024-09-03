import { type Declaration, createDecl } from '../utils'

const transitionProperty = (): string => {
  if (__NODE_JS__) {
    return 'transition-property'
  } else {
    return 'transitionProperty'
  }
}

const transitionDuration = (): string => {
  if (__NODE_JS__) {
    return 'transition-duration'
  } else {
    return 'transitionDuration'
  }
}
const transitionTimingFunction = (): string => {
  if (__NODE_JS__) {
    return 'transition-timing-function'
  } else {
    return 'transitionTimingFunction'
  }
}
const transitionDelay = (): string => {
  if (__NODE_JS__) {
    return 'transition-delay'
  } else {
    return 'transitionDelay'
  }
}
export const transformTransition = (decl: Declaration): Declaration[] => {
  const { value, important, raws, source } = decl

  const result: Declaration[] = []

  let match: RegExpExecArray | null = null

  // 针对 cubic-bezier 特殊处理
  // eg: cubic-bezier(0.42, 0, 1.0, 3) // (0.2,-2,0.8,2)
  if (decl.value.includes('cubic-bezier')) {
    const CHUNK_REGEXP =
      /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*((\S*)|cubic-bezier\(.*\))?\s*(\d*\.?\d+(?:ms|s)?)?$/

    match = CHUNK_REGEXP.exec(value)
  } else {
    const CHUNK_REGEXP =
      /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?$/

    match = CHUNK_REGEXP.exec(value)
  }

  if (match == null) {
    return result
  }
  if (match[1] != null) {
    result.push(
      createDecl(
        transitionProperty(),
        match[1] as string,
        important,
        raws,
        source
      )
    )
  }
  if (match[2] != null) {
    result.push(
      createDecl(
        transitionDuration(),
        match[2] as string,
        important,
        raws,
        source
      )
    )
  }
  if (match[3] != null) {
    result.push(
      createDecl(
        transitionTimingFunction(),
        match[3] as string,
        important,
        raws,
        source
      )
    )
  }
  if (match[4] != null) {
    result.push(
      createDecl(transitionDelay(), match[4] as string, important, raws, source)
    )
  }
  return result
}
