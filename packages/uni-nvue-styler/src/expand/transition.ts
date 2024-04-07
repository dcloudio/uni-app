import type { Declaration } from 'postcss'
import { type TransformDecl, createDecl } from '../utils'

const transitionProperty = __NODE_JS__
  ? 'transition-property'
  : 'transitionProperty'
const transitionDuration = __NODE_JS__
  ? 'transition-duration'
  : 'transitionDuration'
const transitionTimingFunction = __NODE_JS__
  ? 'transition-timing-function'
  : 'transitionTimingFunction'
const transitionDelay = __NODE_JS__ ? 'transition-delay' : 'transitionDelay'
export const transformTransition: TransformDecl = (decl) => {
  const CHUNK_REGEXP =
    /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?$/
  const { value, important, raws, source } = decl
  const result: Declaration[] = []
  const match = value.match(CHUNK_REGEXP)
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
