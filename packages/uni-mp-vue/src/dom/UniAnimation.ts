import type {
  UniAnimation as IUniAnimation,
  UniAnimationPlaybackEvent,
} from '@dcloudio/uni-app-x/types/native'
import { hyphenate } from '@vue/shared'
import { toRaw } from 'vue'

// TODO App端实现未继承自EventTarget，如果后续App端调整此处也需要同步调整
export class UniAnimation implements IUniAnimation {
  id: string
  private _playState: string = ''
  private parsedKeyframes: IParsedKeyframe[] = []
  private scope: any
  private options: number | KeyframeAnimationOptions = {}

  onfinish: ((event: UniAnimationPlaybackEvent) => void) | null = null
  oncancel: ((event: UniAnimationPlaybackEvent) => void) | null = null

  constructor(
    id: string,
    scope: any,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options: number | KeyframeAnimationOptions = {}
  ) {
    this.id = id
    this.scope = scope
    this.options = typeof options === 'number' ? { duration: options } : options //as KeyframeAnimationOptions

    if (this.options?.iterations === Infinity) {
      this.options.iterations = -1
    }

    this.parsedKeyframes = coverAnimateToStyle(keyframes, options)

    this.onfinish = () => {}
    this.oncancel = () => {}
  }

  get playState(): string {
    return this._playState
  }

  get currentTime(): number {
    throw new Error('currentTime not implemented.')
  }

  cancel(): void {
    toRaw(this.scope).setData({
      ['$eA.' + this.id]: JSON.stringify({
        id: this.id,
        playState: 'cancel',
        keyframes: this.parsedKeyframes,
        options: this.options,
      }),
    })
  }

  finish(): void {
    throw new Error('finish not implemented.')
  }

  pause(): void {
    throw new Error('pause not implemented.')
  }

  play(): void {
    this.scope.setData({
      ['$eA.' + this.id]: JSON.stringify({
        id: this.id,
        playState: 'running',
        keyframes: this.parsedKeyframes,
        options: this.options,
      }),
    })
  }
}

function handleDirection(keyframes: any[], direction: string) {
  if (direction === 'reverse') {
    keyframes.reverse()
  } else if (direction === 'alternate') {
    keyframes = [...keyframes, ...keyframes.slice().reverse().slice(1)]
  } else if (direction === 'alternate-reverse') {
    keyframes = keyframes.reverse().concat(keyframes.slice(1, -1).reverse())
  }
  return JSON.parse(JSON.stringify(keyframes))
}

// 小程序中的 this.animate 不支持 color 等属性，keyframes 结构不同，需要手动转换
// 改用 wxs 的 requestAnimationFrame 实现，需要手动实现缓动函数、解析 keyframes，对产物体积有影响
// 改用 wxs 配合 requestAnimationFrame 在合适的时机设置 setStyle
export function normalizeKeyframes(keyframes: any[], direction: string): any[] {
  // 数组为空，返回空数组
  if (keyframes.length === 0) {
    return []
  }

  // hyphenate
  keyframes.forEach((kf) => {
    Object.keys(kf).forEach((key) => {
      const newKey = hyphenate(key)
      if (key !== newKey) {
        kf[newKey] = kf[key]
        delete kf[key]
      }
    })
  })

  keyframes = handleDirection(keyframes, direction)

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
  let duration = options?.duration || 0
  const direction = options?.direction || 'normal'

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
  const frames = normalizeKeyframes(keyframes, direction)

  if (direction === 'alternate') {
    duration = duration * 2
  }

  return frames.map((frame, index) => {
    const currentOffset = frame.offset
    let stepDuration

    const prevOffset = frames[index - 1]?.offset || 0
    const currentDuration = Math.round(duration * (currentOffset - prevOffset))
    const currentOffsetStartTime = Math.round(duration * prevOffset)
    stepDuration = currentDuration

    const result = frame
    // delete result.offset
    return Object.assign({}, result, {
      // ...result,
      offset: undefined,
      transition: `all ${stepDuration}ms linear`,

      _duration: stepDuration,
      _startTime: currentOffsetStartTime,
    })
  })
}
