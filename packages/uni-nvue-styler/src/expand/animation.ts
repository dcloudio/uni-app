import { type NormalizeOptions, type TransformDecl, createDecl } from '../utils'
import { parseAnimation } from '../normalize/animation'
import { getNormalizeMap } from '../normalize/map'
import { expandShorthand, tryExpandSingleValueVarShorthand } from './shorthand'

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

export function createTransformAnimation(
  options: NormalizeOptions
): TransformDecl {
  const normalizeMap = __RUN_TIME__ ? null : getNormalizeMap(options)
  return (decl, onWarning) => {
    const { value, important, raws, source } = decl
    const singleVarResult = tryExpandSingleValueVarShorthand(
      decl,
      animationLonghands,
      value,
      !!options.dom2
    )
    if (singleVarResult) {
      return singleVarResult
    }
    // animation 的各值域无法仅凭变量位置可靠判断，保留完整值交给运行时投影。
    if (/\bvar\(/i.test(value)) {
      return expandShorthand(decl, animationLonghands, value)
    }
    const animation = parseAnimation(value.trim())
    if (!animation) {
      return [decl]
    }
    if (normalizeMap) {
      const values: Array<[string, string]> = [
        ['animationName', animation.name],
        ['animationDuration', animation.duration],
        ['animationDelay', animation.delay],
        ['animationTimingFunction', animation.timingFunction],
        ['animationIterationCount', animation.iterationCount],
        ['animationDirection', animation.direction],
        ['animationFillMode', animation.fillMode],
        ['animationPlayState', animation.playState],
      ]
      let invalid = false
      for (let i = 0; i < values.length; i++) {
        const [property, value] = values[i]
        const result = normalizeMap[property](value, options)
        if (result.value === null) {
          invalid = true
          if (result.reason) {
            onWarning?.(result.reason(property, value, result.value), property)
          }
        }
      }
      if (invalid) {
        return []
      }
    }
    return [
      createDecl(animationName, animation.name, important, raws, source),
      createDecl(
        animationDuration,
        animation.duration,
        important,
        raws,
        source
      ),
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
      createDecl(
        animationFillMode,
        animation.fillMode,
        important,
        raws,
        source
      ),
      createDecl(
        animationPlayState,
        animation.playState,
        important,
        raws,
        source
      ),
    ]
  }
}
