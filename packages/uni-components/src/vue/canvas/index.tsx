import { type ExtractPropTypes, type Ref, computed, onMounted, ref } from 'vue'
import { extend, hasOwn, isFunction } from '@vue/shared'
import type {
  Actions,
  OperateCanvasType,
  ToTempFilePathOptions,
} from '@dcloudio/uni-api'
import {
  defineBuiltInComponent,
  useAttrs,
  useContextInfo,
  useSubscribe,
  withWebEvent,
} from '@dcloudio/uni-components'
import { onEventPrevent } from '@dcloudio/uni-core'
import {
  deflateRaw,
  getRealPath,
  getSameOriginUrl,
  inflateRaw,
  saveImage,
} from '@dcloudio/uni-platform'
import ResizeSensor from '../resize-sensor'
import { type NativeEventTrigger, useNativeEvent } from '../../helpers/useEvent'
import { initHidpi, pixelRatio, wrapper } from '../../helpers/hidpi'
import { UniElement } from '../../helpers/UniElement'
import { once } from '@dcloudio/uni-shared'

const initHidpiOnce = /*#__PURE__*/ once(() => {
  return __NODE_JS__ ? onMounted(initHidpi) : initHidpi()
})

function $getRealPath(src: string) {
  return src ? getRealPath(src) : src
}

function resolveColor(color: number[]) {
  color = color.slice(0)
  color[3] = color[3] / 255
  return 'rgba(' + color.join(',') + ')'
}

function processTouches(rect: DOMRect, touches: TouchEvent['touches']) {
  Array.from(touches).forEach((touch) => {
    ;(touch as any).x = touch.clientX - rect.left
    ;(touch as any).y = touch.clientY - rect.top
  })
}

let tempCanvas: HTMLCanvasElement
function getTempCanvas(width = 0, height = 0) {
  if (!tempCanvas) {
    tempCanvas = document.createElement('canvas')
  }
  tempCanvas.width = width
  tempCanvas.height = height
  return tempCanvas
}

const props = {
  canvasId: {
    type: String,
    default: '',
  },
  disableScroll: {
    type: [Boolean, String],
    default: false,
  },
  hidpi: {
    type: Boolean,
    default: true,
  },
}

type Props = ExtractPropTypes<typeof props>
type MultipleArray = Array<Array<number | string | number[]>>
type LinearGradient = Parameters<CanvasFillStrokeStyles['createLinearGradient']>

export class UniCanvasElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  inheritAttrs: false,
  name: 'Canvas',
  compatConfig: {
    MODE: 3,
  },
  props,
  computed: {
    id(): Props['canvasId'] {
      return this.canvasId
    },
  },
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-canvas',
    class: UniCanvasElement,
  },
  //#endif
  setup(props, { emit, slots }) {
    initHidpiOnce()
    const rootRef = ref<HTMLElement | null>(null)
    const canvas = ref<HTMLCanvasElement | null>(null)
    const sensor = ref<HTMLElement | null>(null)
    const actionsWaiting = ref(false)
    const trigger = useNativeEvent(emit)
    const { $attrs, $excludeAttrs, $listeners } = useAttrs({
      excludeListeners: true,
    })
    const { _listeners } = useListeners(props, $listeners, trigger)

    const { _handleSubscribe, _resize } = useMethods(
      props,
      canvas,
      actionsWaiting
    )

    useSubscribe(
      _handleSubscribe as (
        type: string,
        data: unknown,
        resolve: (res: any) => void
      ) => void,
      useContextInfo(props.canvasId),
      true
    )

    onMounted(() => {
      _resize()
    })

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniCanvasElement
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      const { canvasId, disableScroll } = props
      return (
        <uni-canvas
          ref={rootRef}
          canvas-id={canvasId}
          disable-scroll={disableScroll}
          {...$attrs.value}
          {...$excludeAttrs.value}
          {..._listeners.value}
        >
          <canvas
            ref={canvas}
            class="uni-canvas-canvas"
            width="300"
            height="150"
          />
          <div style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;">
            {slots.default && slots.default()}
          </div>
          <ResizeSensor ref={sensor} onResize={_resize} />
        </uni-canvas>
      )
    }
  },
})

function useListeners(
  props: Props,
  Listeners: Ref<{}>,
  trigger: NativeEventTrigger
) {
  const _listeners = computed(() => {
    let events = ['onTouchstart', 'onTouchmove', 'onTouchend']
    let _$listeners = Listeners.value
    let $listeners = extend(
      {},
      (() => {
        let obj = {}
        for (const key in _$listeners) {
          if (hasOwn(_$listeners, key)) {
            const event = (_$listeners as any)[key]
            ;(obj as any)[key] = event
          }
        }
        return obj
      })()
    )
    events.forEach((event) => {
      let existing = ($listeners as any)[event]
      let eventHandler: Array<(...args: any[]) => any> = []
      if (existing) {
        eventHandler.push(
          withWebEvent(($event) => {
            const rect = $event.currentTarget.getBoundingClientRect()
            processTouches(rect, $event.touches)
            processTouches(rect, $event.changedTouches)
            trigger(event.replace('on', '').toLocaleLowerCase(), $event)
          })
        )
      }
      if (props.disableScroll && event === 'onTouchmove') {
        eventHandler.push(onEventPrevent)
      }
      ;($listeners as any)[event] = eventHandler
    })
    return $listeners
  })

  return {
    _listeners,
  }
}

function useMethods(
  props: Props,
  canvasRef: Ref<HTMLCanvasElement | null>,
  actionsWaiting: Ref<boolean>
) {
  let _actionsDefer: Array<[Actions, boolean, number?]> = []
  let _images: {
    [key: string]: HTMLImageElement & { ready: boolean }
  } = {}

  const _pixelRatio = computed(() => (props.hidpi ? pixelRatio : 1))

  function _resize(size?: { width: number; height: number }) {
    let canvas = canvasRef.value!
    var hasChanged =
      !size ||
      canvas.width !== Math.floor(size.width * _pixelRatio.value) ||
      canvas.height !== Math.floor(size.height * _pixelRatio.value)
    if (!hasChanged) return
    if (canvas.width > 0 && canvas.height > 0) {
      let context = canvas.getContext('2d')!
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      wrapper(canvas, props.hidpi)
      context.putImageData(imageData, 0, 0)
    } else {
      wrapper(canvas, props.hidpi)
    }
  }
  function actionsChanged(
    {
      actions,
      reserve,
    }: {
      actions: Actions
      reserve: boolean
    },
    resolve: (res: any) => void
  ) {
    if (!actions) {
      return
    }
    if (actionsWaiting.value) {
      _actionsDefer.push([actions, reserve])
      return
    }
    let canvas = canvasRef.value!
    let c2d = canvas.getContext('2d')!
    if (!reserve) {
      c2d.fillStyle = '#000000'
      c2d.strokeStyle = '#000000'
      c2d.shadowColor = '#000000'
      c2d.shadowBlur = 0
      c2d.shadowOffsetX = 0
      c2d.shadowOffsetY = 0
      c2d.setTransform(1, 0, 0, 1, 0, 0)
      c2d.clearRect(0, 0, canvas.width, canvas.height)
    }
    preloadImage(actions)
    for (let index = 0; index < actions.length; index++) {
      const action = actions[index]
      let method = action.method
      const data = action.data
      const actionType = data[0]
      if (/^set/.test(method) && method !== 'setTransform') {
        const method1 = method[3].toLowerCase() + method.slice(4)
        let color: CanvasGradient | string
        if (method1 === 'fillStyle' || method1 === 'strokeStyle') {
          if (actionType === 'normal') {
            color = resolveColor(data[1] as number[])
          } else if (actionType === 'linear') {
            const LinearGradient = c2d.createLinearGradient(
              ...(data[1] as LinearGradient)
            )
            ;(data[2] as unknown as MultipleArray).forEach(function (data2) {
              const offset = data2[0] as number
              const color = resolveColor(data2[1] as number[])
              LinearGradient.addColorStop(offset, color)
            })
            color = LinearGradient
          } else if (actionType === 'radial') {
            let _data = data[1] as number[]
            const x = _data[0]
            const y = _data[1]
            const r = _data[2]
            const LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r)
            ;(data[2] as unknown as [number, number[]][]).forEach(function (
              data2
            ) {
              const offset = data2[0]
              const color = resolveColor(data2[1])
              LinearGradient.addColorStop(offset, color)
            })
            color = LinearGradient
          } else if (actionType === 'pattern') {
            const loaded = checkImageLoaded(
              data[1] as string,
              actions.slice(index + 1),
              resolve,
              function (image) {
                if (image) {
                  c2d[method1] = c2d.createPattern(image, data[2] as string)!
                }
              }
            )
            if (!loaded) {
              break
            }
            continue
          }
          c2d[method1] = color!
        } else if (method1 === 'globalAlpha') {
          c2d[method1] = Number(actionType) / 255
        } else if (method1 === 'shadow') {
          let shadowArray = [
            'shadowOffsetX',
            'shadowOffsetY',
            'shadowBlur',
            'shadowColor',
          ]
          data.forEach(function (color_, method_) {
            ;(c2d as any)[shadowArray[method_]] =
              shadowArray[method_] === 'shadowColor'
                ? resolveColor(color_ as number[])
                : color_
          })
        } else if (method1 === 'fontSize') {
          const font = (c2d as any).__font__ || c2d.font
          ;(c2d as any).__font__ = c2d.font = font.replace(
            /\d+\.?\d*px/,
            actionType + 'px'
          )
        } else if (method1 === 'lineDash') {
          c2d.setLineDash(actionType as number[])
          c2d.lineDashOffset = (data[1] as number) || 0
        } else if (method1 === 'textBaseline') {
          if (actionType === 'normal') {
            data[0] = 'alphabetic'
          }
          ;(c2d as any)[method1] = actionType
        } else if (method1 === 'font') {
          ;(c2d as any).__font__ = c2d.font = actionType as string
        } else {
          ;(c2d as any)[method1] = actionType
        }
      } else if (method === 'fillPath' || method === 'strokePath') {
        method = method.replace(/Path/, '')
        c2d.beginPath()
        ;(data as Actions).forEach(function (data_) {
          ;(c2d as any)[data_.method].apply(c2d, data_.data)
        })
        ;(c2d as any)[method]()
      } else if (method === 'fillText') {
        // @ts-expect-error
        c2d.fillText.apply(c2d, data)
      } else if (method === 'drawImage') {
        let drawImage = (function () {
          let dataArray = [...data]
          let url = dataArray[0] as string
          let otherData = dataArray.slice(1)
          _images = _images || {}
          if (
            !checkImageLoaded(
              url,
              actions.slice(index + 1),
              resolve,
              function (image) {
                if (image) {
                  c2d.drawImage.apply(
                    c2d,
                    // @ts-expect-error
                    [image].concat(
                      // @ts-expect-error
                      [...otherData.slice(4, 8)],
                      [...otherData.slice(0, 4)]
                    )
                  )
                }
              }
            )
          )
            return 'break'
        })()
        if (drawImage === 'break') {
          break
        }
      } else {
        if (method === 'clip') {
          data.forEach(function (data_) {
            c2d[data_.method].apply(c2d, data_.data)
          })
          c2d.clip()
        } else {
          c2d[method].apply(c2d, data)
        }
      }
    }
    if (!actionsWaiting.value) {
      resolve({
        errMsg: 'drawCanvas:ok',
      })
    }
  }
  function preloadImage(actions: Actions) {
    actions.forEach(function (action) {
      let method = action.method
      let data = action.data
      let src = ''
      if (method === 'drawImage') {
        src = data[0] as string
        src = $getRealPath(src)
        data[0] = src
      } else if (method === 'setFillStyle' && data[0] === 'pattern') {
        src = data[1] as string
        src = $getRealPath(src)
        data[1] = src
      }
      if (src && !_images[src]) {
        loadImage()
      }
      /**
       * 加载图像
       */
      function loadImage() {
        // @ts-expect-error
        const image = (_images[src] = new Image())
        image.onload = function () {
          // @ts-expect-error
          image.ready = true
        }

        // 安卓 WebView 除本地路径无跨域问题
        if (__PLATFORM__ === 'app' && navigator.vendor === 'Google Inc.') {
          // @ts-expect-error 修正plus.os.name类型
          if (src.indexOf('file://') === 0 && plus.os.name !== 'HarmonyOS') {
            image.crossOrigin = 'anonymous'
          }
          image.src = src
          return
        }
        getSameOriginUrl(src)
          .then((src) => {
            image.src = src
          })
          .catch(() => {
            image.src = src
          })
      }
    })
  }
  function checkImageLoaded(
    src: string,
    actions: Actions,
    resolve: (res: any) => void,
    fn: (a: CanvasImageSource) => void
  ) {
    let image = _images[src]
    if (image.ready) {
      fn(image)
      return true
    } else {
      _actionsDefer.unshift([actions, true])
      actionsWaiting.value = true
      image.onload = function () {
        image.ready = true
        fn(image)
        actionsWaiting.value = false
        let actions = _actionsDefer.slice(0)
        _actionsDefer = []
        for (let action = actions.shift(); action; ) {
          actionsChanged(
            {
              actions: action[0],
              reserve: action[1],
            },
            resolve
          )
          action = actions.shift()
        }
      }
      return false
    }
  }
  interface GetImageDataOptions extends ToTempFilePathOptions {
    dataType: string
    hidpi: boolean
    type: ToTempFilePathOptions['fileType']
  }
  interface GetImageDataResult {
    data: string | number[]
    compressed: boolean
    width: number
    height: number
    errMsg?: undefined
  }
  function getImageData(
    {
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      hidpi = true,
      dataType,
      quality = 1,
      type = 'png',
    }: GetImageDataOptions,
    resolve?: (res: any) => void
  ) {
    const canvas = canvasRef.value!
    let data: string | number[]
    const maxWidth = canvas.offsetWidth - x
    width = width ? Math.min(width, maxWidth) : maxWidth
    const maxHeight = canvas.offsetHeight - y
    height = height ? Math.min(height, maxHeight) : maxHeight
    if (!hidpi) {
      if (!destWidth && !destHeight) {
        destWidth = Math.round(width * _pixelRatio.value)
        destHeight = Math.round(height * _pixelRatio.value)
      } else if (!destWidth) {
        if (!destHeight) {
          destHeight = Math.round(height * _pixelRatio.value)
        }
        destWidth = Math.round((width / height) * destHeight)
      } else if (!destHeight) {
        destHeight = Math.round((height / width) * destWidth)
      }
    } else {
      destWidth = width
      destHeight = height
    }
    const newCanvas = getTempCanvas(destWidth, destHeight)
    const context = newCanvas.getContext('2d')!
    if (type === 'jpeg' || type === 'jpg') {
      type = 'jpeg'
      context.fillStyle = '#fff'
      context.fillRect(0, 0, destWidth, destHeight)
    }
    // @ts-expect-error
    context.__hidpi__ = true
    // @ts-expect-error
    context.drawImageByCanvas(
      canvas,
      x,
      y,
      width,
      height,
      0,
      0,
      destWidth,
      destHeight,
      false
    )
    let result: GetImageDataResult | { errMsg: string }
    try {
      let compressed
      if (dataType === 'base64') {
        data = newCanvas.toDataURL(`image/${type}`, quality)
      } else {
        const imgData = context.getImageData(0, 0, destWidth, destHeight)
        if (__PLATFORM__ === 'app') {
          data = deflateRaw(imgData.data as any, { to: 'string' })
          compressed = true
        } else {
          // fix [...]展开TypedArray在低版本手机报错的问题，使用Array.prototype.slice
          data = Array.prototype.slice.call(imgData.data)
        }
      }
      result = {
        data,
        compressed,
        width: destWidth,
        height: destHeight,
      }
    } catch (error) {
      result = {
        errMsg: `canvasGetImageData:fail ${error}`,
      }
    }
    newCanvas.height = newCanvas.width = 0
    // @ts-expect-error
    context.__hidpi__ = false
    if (!resolve) {
      return result
    } else {
      resolve(result)
    }
  }
  function putImageData(
    {
      data,
      x,
      y,
      width,
      height,
      compressed,
    }: {
      data: Array<number>
      x: number
      y: number
      width: number
      height: number
      compressed: boolean
    },
    resolve: (res: any) => void
  ) {
    try {
      if (__PLATFORM__ === 'app' && compressed) {
        data = inflateRaw(data) as any
      }
      if (!height) {
        height = Math.round(data.length / 4 / width)
      }
      const canvas = getTempCanvas(width, height)
      const context = canvas.getContext('2d')!
      context.putImageData(
        new ImageData(new Uint8ClampedArray(data), width, height),
        0,
        0
      )
      canvasRef.value!.getContext('2d')!.drawImage(canvas, x, y, width, height)
      canvas.height = canvas.width = 0
    } catch (error) {
      resolve({ errMsg: 'canvasPutImageData:fail' })
      return
    }
    resolve({ errMsg: 'canvasPutImageData:ok' })
  }
  function toTempFilePath(
    {
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      fileType,
      quality,
      dirname,
    }: ToTempFilePathOptions,
    resolve: (res: any) => void
  ) {
    const res = getImageData({
      x,
      y,
      width,
      height,
      destWidth,
      destHeight,
      hidpi: false,
      dataType: 'base64',
      type: fileType,
      quality,
    } as GetImageDataOptions)!
    if (res.errMsg) {
      resolve({
        errMsg: res.errMsg.replace('canvasPutImageData', 'toTempFilePath'),
      })
      return
    }
    saveImage(
      (res as GetImageDataResult).data as string,
      dirname,
      (error, tempFilePath) => {
        let errMsg = `toTempFilePath:${error ? 'fail' : 'ok'}`
        if (error) {
          errMsg += ` ${error.message}`
        }
        resolve({ errMsg, tempFilePath })
      }
    )
  }

  const methods = {
    actionsChanged,
    getImageData,
    putImageData,
    toTempFilePath,
  }

  function _handleSubscribe(
    type: OperateCanvasType,
    data: any,
    resolve: (res: { callbackId: number; data: any }) => void
  ) {
    let method = methods[type]
    if (type.indexOf('_') !== 0 && isFunction(method)) {
      method(data as any, resolve)
    }
  }

  return extend(methods, {
    _resize,
    _handleSubscribe,
  })
}
