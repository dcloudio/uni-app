import type {
  UniAnimation as IUniAnimation,
  UniAnimationPlaybackEvent,
} from '@dcloudio/uni-app-x/types/native'

let id = 0

// TODO App端实现未继承自EventTarget，如果后续App端调整此处也需要同步调整
export class UniAnimation implements IUniAnimation {
  id: string
  onfinish: ((event: UniAnimationPlaybackEvent) => void) | null = null
  oncancel: ((event: UniAnimationPlaybackEvent) => void) | null = null
  constructor() {
    this.id = String(id++)
    // auto play
    this.play()
  }

  get playState(): string {
    throw new Error('playState not implemented.')
  }

  get currentTime(): number {
    throw new Error('currentTime not implemented.')
  }

  cancel(): void {
    throw new Error('cancel not implemented.')
  }

  finish(): void {
    throw new Error('finish not implemented.')
  }

  pause(): void {
    throw new Error('pause not implemented.')
  }

  play(): void {
    throw new Error('play not implemented.')
  }
}

// 小程序中的 this.animate 不支持 color 等属性，keyframes 结构不同，需要手动转换
// 该用 wxs 的 requestAnimationFrame 实现，需要手动实现缓动函数、解析 keyframes，对产物体积有影响
// 该用 wxs 配合

export function normalizeKeyframes(keyframes: any[]): any[] {
  // 如果关键帧
  // 数组为空，返回空数组
  if (keyframes.length === 0) {
    return []
  }

  // 记录已有的 offset 位置
  const existingOffsets = keyframes
    .map((kf, index) => ({
      index,
      offset: kf.offset,
    }))
    .filter((item) => item.offset !== undefined)

  // 如果没有已有的 offset，均匀分配
  if (existingOffsets.length === 0) {
    for (let i = 0; i < keyframes.length; i++) {
      keyframes[i].offset = i / (keyframes.length - 1)
    }
    return keyframes
  }

  // 处理第一个关键帧
  if (existingOffsets[0].index > 0) {
    const firstOffset = existingOffsets[0].offset! / existingOffsets[0].index
    for (let i = 0; i < existingOffsets[0].index; i++) {
      keyframes[i].offset = firstOffset * i
    }
  }

  // 处理中间的关键帧
  for (let i = 0; i < existingOffsets.length - 1; i++) {
    const startOffset = existingOffsets[i].offset
    const endOffset = existingOffsets[i + 1].offset
    const diffFrames = existingOffsets[i + 1].index - existingOffsets[i].index

    if (diffFrames !== 1) {
      const step = (endOffset - startOffset) / diffFrames
      for (let j = 1; j <= diffFrames; j++) {
        keyframes[existingOffsets[i].index + j].offset = startOffset + j * step
      }
    }
  }

  // 处理最后一个关键帧
  if (
    existingOffsets[existingOffsets.length - 1].index <
    keyframes.length - 1
  ) {
    const lastOffset = existingOffsets[existingOffsets.length - 1].offset
    const numFrames =
      keyframes.length - existingOffsets[existingOffsets.length - 1].index
    const step = (1 - lastOffset) / (numFrames - 1)
    for (let i = 0; i < numFrames; i++) {
      keyframes[existingOffsets[existingOffsets.length - 1].index + i].offset =
        lastOffset + i * step
    }
  }

  // 保留 五位小数
  return keyframes.map((kf) => {
    kf.offset = Number(kf.offset.toFixed(5))
    return kf
  })
}
interface IParsedKeyframe {
  transition: string
  _duration: number
  _startTime: number
  [key: string]: any
}

export function coverAnimateToStyle(keyframes, options): IParsedKeyframe[] {
  const duration = options?.duration || 3000

  // Handle object format with array values
  if (!Array.isArray(keyframes)) {
    const propertyNames = Object.keys(keyframes)
    const arrayLength = keyframes[propertyNames[0]].length
    const frames = Array.from({ length: arrayLength }, (_, i) => {
      const frame = {}
      propertyNames.forEach((prop) => {
        frame[prop] = keyframes[prop][i]
      })
      return frame
    })
    return coverAnimateToStyle(frames, options)
  }

  // fill offset
  const frames = normalizeKeyframes(keyframes)

  return frames.map((frame, index) => {
    const currentOffset = frame.offset
    let stepDuration

    const prevOffset = frames[index - 1]?.offset || 0
    const currentDuration = Math.round(duration * (currentOffset - prevOffset))
    const crrentOffsetStartTime = Math.round(duration * prevOffset)
    stepDuration = currentDuration

    const result = frame
    delete result.offset
    return Object.assign(result, {
      // ...result,
      transition: `all ${stepDuration}ms ease`,

      _duration: stepDuration,
      _startTime: crrentOffsetStartTime,
    })
  })
}

export function setStyleByRequestAnimationFrame(cssRules: IParsedKeyframe[]) {
  let animationFrameId: number | null = null
  let startTimestamp: number | null = null
  let isPaused = false
  let pausedTime = 0
  let currentRuleIndex = 0

  function applyStyle(element: Element, styles: Record<string, any>) {
    Object.entries(styles).forEach(([key, value]) => {
      if (key !== 'transition' && key !== '_duration' && key !== '_startTime') {
        ;(element as any).setStyle(key, value)
      }
    })
  }

  function animate(element: Element) {
    const timestamp = Date.now()
    if (!startTimestamp) startTimestamp = timestamp

    if (isPaused) return

    const elapsedTime = timestamp - startTimestamp - pausedTime
    const currentRule = cssRules[currentRuleIndex]

    if (!currentRule) {
      stop()
      return
    }

    if (elapsedTime >= currentRule._startTime) {
      if (elapsedTime >= currentRule._startTime + currentRule._duration) {
        // Move to next rule
        currentRuleIndex++
        if (currentRuleIndex < cssRules.length) {
          applyStyle(element, cssRules[currentRuleIndex])
        } else {
          stop()
          return
        }
      } else {
        // Apply current rule
        applyStyle(element, currentRule)
      }
    }

    animationFrameId = requestAnimationFrame(() => animate(element))
  }

  function start(element: Element) {
    if (animationFrameId !== null) return

    currentRuleIndex = 0
    startTimestamp = null
    pausedTime = 0
    isPaused = false

    if (cssRules.length > 0) {
      applyStyle(element, cssRules[0])
      animationFrameId = requestAnimationFrame(() => animate(element))
    }
  }

  function pause() {
    if (!isPaused && animationFrameId !== null) {
      isPaused = true
      if (startTimestamp) {
        pausedTime = performance.now() - startTimestamp
      }
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  function resume(element: Element) {
    if (isPaused) {
      isPaused = false
      startTimestamp = Date.now() - pausedTime
      animationFrameId = requestAnimationFrame(() => animate(element))
    }
  }

  function stop() {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
    startTimestamp = null
    pausedTime = 0
    currentRuleIndex = 0
    isPaused = false
  }

  return {
    start,
    pause,
    resume,
    stop,
  }
}
