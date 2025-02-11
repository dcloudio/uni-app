import type {
  UniAnimation as IUniAnimation,
  UniAnimationPlaybackEvent,
} from '@dcloudio/uni-app-x/types/native'
import {} from '@dcloudio/uni-nvue-styler/src/parse'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

export const animateFunctions = {
  linear: (t) => t,
  ease: ease,
  'ease-in': (t) => t * t,
  'ease-out': easeOutCubic,
  'ease-in-out': (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
}

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

// keyframe transform
export function parseKeyFrames(keyframes: any | any[]) {
  const currentKeyframes = [] as any[]
  const warnMessage = [] as string[]
  const typeNumber = ['number']
  const typeString = ['string']
  const typeArray = ['array']
  const typeNumberOrString = ['number', 'string']

  const allowProperties = {
    transformOrigin: typeString,
    backgroundColor: typeString,
    bottom: typeNumberOrString,
    top: typeNumberOrString,
    right: typeNumberOrString,
    left: typeNumberOrString,
    width: typeNumberOrString,
    height: typeNumberOrString,
    opacity: typeNumber,
    matrix: [],
    matrix3d: [],
    rotate: typeNumber,
    rotate3d: [],
    rotateX: [],
    rotateY: [],
    rotateZ: [],
    scale: typeArray,
    scale3d: typeArray,
    scaleX: typeNumber,
    scaleY: typeNumber,
    scaleZ: typeNumber,
    skew: typeArray,
    skewX: typeNumber,
    skewY: typeNumber,
    translate: typeArray,
    translate3d: typeArray,
    translateX: typeNumber,
    translateY: typeNumber,
    translateZ: typeNumber,
  }

  const handleTransform = (item, key) => {
    const itemStyle: any = {}
    const warnMessage = [] as string[]
    const value = item[key]
    if (typeof value === 'string') {
      const transformValue = value.split(' ')
      for (const transformItem of transformValue) {
        const [transformKey, transformValue] = transformItem.split('(')
        if (allowPropertiesKeys.includes(transformKey)) {
          itemStyle[transformKey] = transformValue.replace(')', '')
          // number
          if (allowProperties[transformKey].includes('number')) {
            itemStyle[transformKey] = Number.parseFloat(itemStyle[transformKey])
          }
        } else {
          warnMessage.push(
            `The property ${transformKey} is not supported in keyframes`
          )
        }
      }
    }
    return { itemStyle, warnMessage }
  }

  const handleProperty = (item) => {
    let itemStyle: any = {}
    const warnMessage = [] as string[]
    for (const key in item) {
      if (key === 'transform') {
        const { itemStyle: _itemStyle, warnMessage: _warnMessage } =
          handleTransform(item, key)
        itemStyle = Object.assign(itemStyle, _itemStyle)
        warnMessage.push(..._warnMessage)
      } else if (!allowPropertiesKeys.includes(key)) {
        warnMessage.push(`The property ${key} is not supported in keyframes`)
      } else {
        const value = item[key]
        if (Array.isArray(value)) {
          if (allowProperties[key].includes('array')) {
            itemStyle[key] = value
          } else {
            // todo
          }
        } else {
          itemStyle[key] = item[key]
        }
      }
    }
    return { itemStyle, warnMessage }
  }
  const allowPropertiesKeys = Object.keys(allowProperties)
  if (Array.isArray(keyframes)) {
    for (const item of keyframes) {
      const { itemStyle: _itemStyle, warnMessage: _warnMessage } =
        handleProperty(item)
      // console.log(4, _itemStyle)
      currentKeyframes.push(_itemStyle)
      warnMessage.push(..._warnMessage)
    }
  } else if (typeof keyframes === 'object') {
    handleProperty(keyframes)
  }

  return { currentKeyframes, warnMessage }
}
