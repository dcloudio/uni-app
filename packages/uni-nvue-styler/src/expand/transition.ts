import type { Declaration } from 'postcss'
import { type TransformDecl, createDecl } from '../utils'

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
export const transformTransition: TransformDecl = (decl) => {
  let { value, important, raws, source } = decl
  value = value.trim()

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
