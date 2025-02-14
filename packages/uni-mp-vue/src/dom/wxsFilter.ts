function ease(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}
var easeFunctions = {
  ease: ease,
}

function handleColor(currentColor, nextColor, progress, ease = 'ease') {
  currentColor = currentColor.match(/\d+/g).map(Number)
  nextColor = nextColor.match(/\d+/g).map(Number)
  const r = Math.round(
    currentColor[0] +
      (nextColor[0] - currentColor[0]) * easeFunctions[ease](progress)
  )
  const g = Math.round(
    currentColor[1] +
      (nextColor[1] - currentColor[1]) * easeFunctions[ease](progress)
  )
  const b = Math.round(
    currentColor[2] +
      (nextColor[2] - currentColor[2]) * easeFunctions[ease](progress)
  )
  const a = Number(
    (
      currentColor[3] +
      (nextColor[3] - currentColor[3]) * easeFunctions[ease](progress)
    ).toFixed(2)
  )
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
}

function handleLength(currentValue, nextValue, frameProgress, ease = 'ease') {
  var len
  if (!isNaN(currentValue) && !isNaN(nextValue)) {
    const easedProgress = easeFunctions[ease](frameProgress)
    len = currentValue + (nextValue - currentValue) * easedProgress + 'px'
  } else {
  }
  return len
}

export function interpolateKeyframe(keyframes: any[], usedTime: number) {
  if (!keyframes || !keyframes.length) return {}

  // 当前进度
  const currentTime = usedTime

  // Find current keyframe
  let currentIndex = 0
  for (let i = 0; i < keyframes.length; i++) {
    if (currentTime >= keyframes[i]._startTime) {
      currentIndex = i
    }
  }

  const currentFrame = keyframes[currentIndex]
  const nextFrame = keyframes[currentIndex + 1]

  // 已经是最后一帧
  if (!nextFrame) {
    let _currentFrame = {}
    for (const prop in currentFrame) {
      if (!prop.startsWith('_') && prop !== 'transition') {
        _currentFrame[prop] = currentFrame[prop]
      }
    }
    return _currentFrame
  }

  // Calculate progress between current and next keyframe
  const frameProgress =
    (currentTime - currentFrame._startTime) / currentFrame._duration
  const easeType = currentFrame.transition.split(' ')[2] || 'ease'

  const style = {}
  // Interpolate all numeric properties
  for (const prop in currentFrame) {
    if (prop.startsWith('_') || prop === 'transition') continue

    var isColor = prop.toLowerCase().includes('color')
    var isLength = [
      'width',
      'height',
      'top',
      'left',
      'right',
      'bottom',
      'margin',
      'padding',
      'border-radius',
      'border-width',
      'border-top-width',
      'border-left-width',
      'border-right-width',
      'border-bottom-width',
    ].includes(prop)

    if (isColor) {
      style[prop] = handleColor(
        currentFrame[prop],
        nextFrame[prop],
        frameProgress,
        easeType
      )
      // console.log(_style)
    } else if (isLength) {
      const currentValue = parseFloat(currentFrame[prop])
      const nextValue = parseFloat(nextFrame[prop])

      style[prop] = handleLength(
        currentValue,
        nextValue,
        frameProgress,
        easeType
      )
    } else {
      // 尚未支持
    }
  }

  return style
}
