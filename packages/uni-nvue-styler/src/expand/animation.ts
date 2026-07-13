import { type TransformDecl, createDecl } from '../utils'
import { parseAnimation } from '../normalize/animation'
import { tryExpandSingleValueVarShorthand } from './shorthand'

const animationName = __HYPHENATE__ ? 'animation-name' : 'animationName'
const animationDuration = __HYPHENATE__
  ? 'animation-duration'
  : 'animationDuration'
const animationDelay = __HYPHENATE__ ? 'animation-delay' : 'animationDelay'
const animationTimingFunction = __HYPHENATE__
  ? 'animation-timing-function'
  : 'animationTimingFunction'
const animationIterationCount = __HYPHENATE__
  ? 'animation-iteration-count'
  : 'animationIterationCount'
const animationDirection = __HYPHENATE__
  ? 'animation-direction'
  : 'animationDirection'
const animationFillMode = __HYPHENATE__
  ? 'animation-fill-mode'
  : 'animationFillMode'
const animationPlayState = __HYPHENATE__
  ? 'animation-play-state'
  : 'animationPlayState'
const animationLonghands = [
  animationName,
  animationDuration,
  animationDelay,
  animationTimingFunction,
  animationIterationCount,
  animationDirection,
  animationFillMode,
  animationPlayState,
]

export const transformAnimation: TransformDecl = (decl) => {
  const { value, important, raws, source } = decl
  const singleVarResult = tryExpandSingleValueVarShorthand(
    decl,
    animationLonghands,
    value
  )
  if (singleVarResult) {
    return singleVarResult
  }
  // 无法静态确定变量所属槽位时，完整平铺并由运行时按目标 longhand 投影。
  if (/\bvar\(/i.test(value)) {
    return animationLonghands.map((prop) =>
      createDecl(prop, value, important, raws, source)
    )
  }
  const animation = parseAnimation(value.trim())
  if (!animation) {
    return [decl]
  }
  return [
    createDecl(animationName, animation.name, important, raws, source),
    createDecl(animationDuration, animation.duration, important, raws, source),
    createDecl(animationDelay, animation.delay, important, raws, source),
    createDecl(
      animationTimingFunction,
      animation.timingFunction,
      important,
      raws,
      source
    ),
    createDecl(
      animationIterationCount,
      animation.iterationCount,
      important,
      raws,
      source
    ),
    createDecl(
      animationDirection,
      animation.direction,
      important,
      raws,
      source
    ),
    createDecl(animationFillMode, animation.fillMode, important, raws, source),
    createDecl(
      animationPlayState,
      animation.playState,
      important,
      raws,
      source
    ),
  ]
}
