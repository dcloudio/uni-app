declare var __WEEX_DEVTOOL__: any
//#region import
import {
  API_CREATE_CANVAS_CONTEXT,
  type API_TYPE_CREATE_CANVAS_CONTEXT,
  CreateCanvasContextProtocol,
} from '../../protocols/context/context'
import {
  API_CANVAS_GET_IMAGE_DATA,
  API_CANVAS_PUT_IMAGE_DATA,
  API_CANVAS_TO_TEMP_FILE_PATH,
  type API_TYPE_CANVAS_GET_IMAGE_DATA,
  type API_TYPE_CANVAS_PUT_IMAGE_DATA,
  type API_TYPE_CANVAS_TO_TEMP_FILE_PATH,
  CanvasGetImageDataOptions,
  CanvasGetImageDataProtocol,
  CanvasPutImageDataOptions,
  CanvasPutImageDataProtocol,
  CanvasToTempFilePathOptions,
  CanvasToTempFilePathProtocol,
} from '../../protocols/context/canvas'

import { defineAsyncApi, defineSyncApi } from '../../helpers/api'

import { hasOwn } from '@vue/shared'

import { ON_ERROR, once } from '@dcloudio/uni-shared'

import { getCurrentPageVm, getPageIdByVm } from '@dcloudio/uni-core'

import {
  TEMP_PATH,
  deflateRaw,
  getEnv,
  inflateRaw,
} from '@dcloudio/uni-platform'

//#endregion

//#region UniServiceJSBridge
export type OperateCanvasType =
  | 'actionsChanged'
  | 'getImageData'
  | 'putImageData'
  | 'toTempFilePath'

function operateCanvas(
  canvasId: string,
  pageId: number,
  type: OperateCanvasType,
  data: any,
  callback?: Callback
) {
  UniServiceJSBridge.invokeViewMethod<{}, Record<string, any>>(
    `canvas.${canvasId}`,
    {
      type,
      data,
    },
    pageId,
    (data) => {
      if (callback) callback(data)
    }
  )
}
//#endregion

//#region methods
var methods1 = ['scale', 'rotate', 'translate', 'setTransform', 'transform']
var methods2 = [
  'drawImage',
  'fillText',
  'fill',
  'stroke',
  'fillRect',
  'strokeRect',
  'clearRect',
  'strokeText',
]
var methods3 = [
  'setFillStyle',
  'setTextAlign',
  'setStrokeStyle',
  'setGlobalAlpha',
  'setShadow',
  'setFontSize',
  'setLineCap',
  'setLineJoin',
  'setLineWidth',
  'setMiterLimit',
  'setTextBaseline',
  'setLineDash',
]
function measureText(text: string, font: string) {
  const canvas = document.createElement('canvas')
  const c2d = canvas.getContext('2d')!
  c2d.font = font
  return c2d.measureText(text).width || 0
}

//#endregion

//#region checkColor
const predefinedColor = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgrey: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  grey: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
  transparent: '#00000000',
}

function checkColor(e: string | undefined) {
  // 其他开发者适配的echarts会传入一个undefined到这里
  e = e || '#000000'
  let t: RegExpExecArray | null = null
  if ((t = /^#([0-9|A-F|a-f]{6})$/.exec(e)) != null) {
    const n = parseInt(t[1].slice(0, 2), 16)
    const o = parseInt(t[1].slice(2, 4), 16)
    const r = parseInt(t[1].slice(4), 16)
    return [n, o, r, 255]
  }
  if ((t = /^#([0-9|A-F|a-f]{3})$/.exec(e)) != null) {
    let n: string | number = t[1].slice(0, 1)
    let o: string | number = t[1].slice(1, 2)
    let r: string | number = t[1].slice(2, 3)
    n = parseInt(n + n, 16)
    o = parseInt(o + o, 16)
    r = parseInt(r + r, 16)
    return [n, o, r, 255]
  }
  if ((t = /^rgb\((.+)\)$/.exec(e)) != null) {
    return t[1]
      .split(',')
      .map(function (e) {
        return Math.min(255, parseInt(e.trim()))
      })
      .concat(255)
  }
  if ((t = /^rgba\((.+)\)$/.exec(e)) != null) {
    return t[1].split(',').map(function (e, t) {
      return t === 3
        ? Math.floor(255 * parseFloat(e.trim()))
        : Math.min(255, parseInt(e.trim()))
    })
  }
  var i = e.toLowerCase()
  if (hasOwn(predefinedColor, i)) {
    t = /^#([0-9|A-F|a-f]{6,8})$/.exec(predefinedColor[i])
    const n = parseInt(t![1].slice(0, 2), 16)
    const o = parseInt(t![1].slice(2, 4), 16)
    const r = parseInt(t![1].slice(4, 6), 16)
    let a = parseInt(t![1].slice(6, 8), 16)
    a = a >= 0 ? a : 255
    return [n, o, r, a]
  }
  console.error('unsupported color:' + e)
  return [0, 0, 0, 255]
}

type CheckColor = typeof checkColor
//#endregion

//#region Class
class CanvasGradient {
  type: string
  data: Array<number>
  colorStop: Array<[number, ReturnType<CheckColor>]>
  constructor(type: string, data: Array<number>) {
    this.type = type
    this.data = data
    this.colorStop = []
  }

  addColorStop(position: number, color: string) {
    this.colorStop.push([position, checkColor(color)])
  }
}
class Pattern {
  type: string
  data: string
  colorStop: string

  constructor(image: string, repetition: string) {
    this.type = 'pattern'
    this.data = image
    this.colorStop = repetition
  }
}
class TextMetrics {
  width: number

  constructor(width: number) {
    this.width = width
  }
}
//#endregion

const getTempPath = () => {
  let _TEMP_PATH = TEMP_PATH
  if (__PLATFORM__ === 'app' && !__PLUS__) {
    typeof getEnv !== 'undefined' && (_TEMP_PATH = getEnv().TEMP_PATH)
  }
  return _TEMP_PATH
}

const defaultState = {
  lineDash: [0, 0],
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 0,
  shadowColor: [0, 0, 0, 0],
  font: '10px sans-serif',
  fontSize: 10,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontFamily: 'sans-serif',
}

export type ToTempFilePathOptions = Pick<
  Parameters<API_TYPE_CANVAS_TO_TEMP_FILE_PATH>[0],
  | 'x'
  | 'y'
  | 'width'
  | 'height'
  | 'destHeight'
  | 'destWidth'
  | 'fileType'
  | 'quality'
> & { dirname: string }
type ActionsItemType = string | number | boolean | undefined | Array<number>
type ActionsItemData = Array<ActionsItemType>
type ActionsItem = {
  method: string
  data: ActionsItemData | Array<ActionsItem>
}
export type Actions = Array<ActionsItem>
type DefaultState = typeof defaultState
type Callback = (result: any) => void | undefined
type LineCapType = 'butt' | 'round' | 'square'
type LineJoinType = 'bevel' | 'round' | 'miter'
// type TextAlignType = 'left' | 'center' | 'right'
type TextBaselineType = 'top' | 'bottom' | 'middle' | 'normal'

export class CanvasContext implements UniApp.CanvasContext {
  id: string
  pageId: number
  actions: Actions
  path: Actions
  subpath: Array<ActionsItem['data']>
  state: DefaultState
  drawingState: Array<DefaultState>

  constructor(id: string, pageId: number) {
    this.id = id
    this.pageId = pageId
    this.actions = []
    this.path = []
    this.subpath = []
    // this.currentTransform = []
    // this.currentStepAnimates = []
    this.drawingState = []
    this.state = {
      lineDash: [0, 0],
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: [0, 0, 0, 0],
      font: '10px sans-serif',
      fontSize: 10,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontFamily: 'sans-serif',
    }
  }
  setFillStyle(color: string | UniNamespace.CanvasGradient): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setStrokeStyle(color: string): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setShadow(
    offsetX?: number | undefined,
    offsetY?: number | undefined,
    blur?: number | undefined,
    color?: string | undefined
  ): void {
    console.log('initCanvasContextProperty implemented.')
  }
  addColorStop(stop: number, color: string): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setLineWidth(lineWidth: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setLineCap(lineCap: 'butt' | 'round' | 'square'): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setLineJoin(lineJoin: 'round' | 'bevel' | 'miter'): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setLineDash(pattern: any[], offset: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setMiterLimit(miterLimit: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  fillRect(x: number, y: number, width: number, height: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  strokeRect(x: number, y: number, width: number, height: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  clearRect(x: number, y: number, width: number, height: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  fill(): void {
    console.log('initCanvasContextProperty implemented.')
  }
  stroke(): void {
    console.log('initCanvasContextProperty implemented.')
  }
  scale(scaleWidth: number, scaleHeight: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  rotate(rotate: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  translate(x: number, y: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setFontSize(fontSize: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  fillText(
    text: string,
    x: number,
    y: number,
    maxWidth?: number | undefined
  ): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setTextAlign(align: 'left' | 'right' | 'center'): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setTextBaseline(textBaseline: 'normal' | 'top' | 'bottom' | 'middle'): void {
    console.log('initCanvasContextProperty implemented.')
  }
  drawImage(
    imageResource: string,
    dx?: number | undefined,
    dy?: number | undefined,
    dWidth?: number | undefined,
    dHeigt?: number | undefined,
    sx?: number | undefined,
    sy?: number | undefined,
    sWidth?: number | undefined,
    sHeight?: number | undefined
  ): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setGlobalAlpha(alpha: number): void {
    console.log('initCanvasContextProperty implemented.')
  }
  strokeText(
    text: string,
    x: number,
    y: number,
    maxWidth?: number | undefined
  ): void {
    console.log('initCanvasContextProperty implemented.')
  }
  setTransform(
    scaleX: number,
    skewX: number,
    skewY: number,
    scaleY: number,
    translateX: number,
    translateY: number
  ): void {
    console.log('initCanvasContextProperty implemented.')
  }

  draw(reserve: boolean = false, callback?: Callback) {
    var actions = [...this.actions]
    this.actions = []
    this.path = []

    operateCanvas(
      this.id,
      this.pageId,
      'actionsChanged',
      {
        actions,
        reserve,
      },
      callback
    )
  }

  createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
    return new CanvasGradient('linear', [x0, y0, x1, y1])
  }

  createCircularGradient(x: number, y: number, r: number) {
    return new CanvasGradient('radial', [x, y, r])
  }

  createPattern(image: string, repetition: string) {
    if (undefined === repetition) {
      console.error(
        "Failed to execute 'createPattern' on 'CanvasContext': 2 arguments required, but only 1 present."
      )
    } else if (
      ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].indexOf(repetition) < 0
    ) {
      console.error(
        "Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" +
          repetition +
          "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'."
      )
    } else {
      return new Pattern(image, repetition)
    }
  }

  measureText(text: string, callback?: Callback) {
    const font = this.state.font
    let width = 0
    if (__PLATFORM__ === 'h5') {
      width = measureText(text, font)
    } else {
      if (__PLUS__ === false) {
        if (typeof callback === 'function') {
          const webview = plus.webview.getLaunchWebview()
          // @ts-expect-error evalJSASync 后新增，和 plus 签名不匹配，暂时忽略 ts 报错
          if (webview && typeof webview.evalJSAsync === 'function') {
            ;(
              (webview as any).evalJSAsync(
                `(function measureText(text, font) {
  const canvas = document.createElement('canvas')
  const c2d = canvas.getContext('2d')
  c2d.font = font
  return c2d.measureText(text).width || 0
})(${JSON.stringify(text)},${JSON.stringify(font)})`
              ) as Promise<string>
            ).then((res) => {
              callback(new TextMetrics(parseFloat(res)))
            })
          }
        }
      } else {
        const webview = plus.webview
          .all()
          .find((webview) => webview.getURL().endsWith('www/__uniappview.html'))
        if (webview) {
          width = Number(
            (webview as any).evalJSSync(
              `(${measureText.toString()})(${JSON.stringify(
                text
              )},${JSON.stringify(font)})`
            )
          )
        }
      }
    }
    return new TextMetrics(width)
  }

  save() {
    this.actions.push({
      method: 'save',
      data: [],
    })
    this.drawingState.push(this.state)
  }

  restore() {
    this.actions.push({
      method: 'restore',
      data: [],
    })
    this.state = this.drawingState.pop() || {
      lineDash: [0, 0],
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 0,
      shadowColor: [0, 0, 0, 0],
      font: '10px sans-serif',
      fontSize: 10,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontFamily: 'sans-serif',
    }
  }

  beginPath() {
    this.path = []
    this.subpath = []
    this.path.push({
      method: 'beginPath',
      data: [],
    })
  }

  moveTo(x: number, y: number) {
    this.path.push({
      method: 'moveTo',
      data: [x, y],
    })
    this.subpath = [[x, y]]
  }

  lineTo(x: number, y: number) {
    if (this.path.length === 0 && this.subpath.length === 0) {
      this.path.push({
        method: 'moveTo',
        data: [x, y],
      })
    } else {
      this.path.push({
        method: 'lineTo',
        data: [x, y],
      })
    }
    this.subpath.push([x, y])
  }

  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
    this.path.push({
      method: 'quadraticCurveTo',
      data: [cpx, cpy, x, y],
    })
    this.subpath.push([x, y])
  }

  bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ) {
    this.path.push({
      method: 'bezierCurveTo',
      data: [cp1x, cp1y, cp2x, cp2y, x, y],
    })
    this.subpath.push([x, y])
  }

  arc(
    x: number,
    y: number,
    r: number,
    sAngle: number,
    eAngle: number,
    counterclockwise: boolean = false
  ) {
    this.path.push({
      method: 'arc',
      data: [x, y, r, sAngle, eAngle, counterclockwise],
    })
    this.subpath.push([x, y])
  }

  rect(x: number, y: number, width: number, height: number) {
    this.path.push({
      method: 'rect',
      data: [x, y, width, height],
    })
    this.subpath = [[x, y]]
  }

  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number) {
    this.path.push({
      method: 'arcTo',
      data: [x1, y1, x2, y2, radius],
    })
    this.subpath.push([x2, y2])
  }

  clip() {
    this.actions.push({
      method: 'clip',
      data: [...(this.path as any)],
    })
  }

  closePath() {
    this.path.push({
      method: 'closePath',
      data: [],
    })
    if (this.subpath.length) {
      this.subpath = [this.subpath.shift()!]
    }
  }

  clearActions() {
    this.actions = []
    this.path = []
    this.subpath = []
  }

  getActions() {
    var actions = [...this.actions]
    this.clearActions()
    return actions
  }

  set lineDashOffset(value: number) {
    this.actions.push({
      method: 'setLineDashOffset',
      data: [value],
    })
  }

  set globalCompositeOperation(type: string) {
    this.actions.push({
      method: 'setGlobalCompositeOperation',
      data: [type],
    })
  }

  set shadowBlur(level: number) {
    this.actions.push({
      method: 'setShadowBlur',
      data: [level],
    })
  }

  set shadowColor(color: string) {
    this.actions.push({
      method: 'setShadowColor',
      data: [color],
    })
  }

  set shadowOffsetX(x: number) {
    this.actions.push({
      method: 'setShadowOffsetX',
      data: [x],
    })
  }

  set shadowOffsetY(y: number) {
    this.actions.push({
      method: 'setShadowOffsetY',
      data: [y],
    })
  }

  set font(value: string) {
    var self = this
    this.state.font = value
    // eslint-disable-next-line
    var fontFormat = value.match(
      // 支持小数点 github #5329
      /^(([\w\-]+\s)*)(\d+\.?\d*r?px)(\/(\d+\.?\d*(r?px)?))?\s+(.*)/
    )
    //
    if (fontFormat) {
      var style = fontFormat[1].trim().split(/\s/)
      var fontSize = parseFloat(fontFormat[3])
      var fontFamily = fontFormat[7]
      var actions: Actions = []
      style.forEach(function (value, index) {
        if (['italic', 'oblique', 'normal'].indexOf(value) > -1) {
          actions.push({
            method: 'setFontStyle',
            data: [value],
          })
          self.state.fontStyle = value
        } else if (
          ['bold', 'normal', 'lighter', 'bolder'].indexOf(value) > -1 ||
          /^\d+$/.test(value)
        ) {
          actions.push({
            method: 'setFontWeight',
            data: [value],
          })
          self.state.fontWeight = value
        } else if (index === 0) {
          actions.push({
            method: 'setFontStyle',
            data: ['normal'],
          })
          self.state.fontStyle = 'normal'
        } else if (index === 1) {
          pushAction()
        }
      })
      if (style.length === 1) {
        pushAction()
      }
      style = actions
        .map(function (action) {
          return action.data[0]
        })
        .join(' ') as any
      this.state.fontSize = fontSize
      this.state.fontFamily = fontFamily
      this.actions.push({
        method: 'setFont',
        data: [`${style} ${fontSize}px ${fontFamily}`],
      })
    } else {
      console.warn("Failed to set 'font' on 'CanvasContext': invalid format.")
    }

    function pushAction() {
      actions.push({
        method: 'setFontWeight',
        data: ['normal'],
      })
      self.state.fontWeight = 'normal'
    }
  }

  get font() {
    return this.state.font
  }

  set fillStyle(color: string) {
    this.setFillStyle(color)
  }

  set strokeStyle(color: string) {
    this.setStrokeStyle(color)
  }

  set globalAlpha(value: number) {
    value = Math.floor(255 * parseFloat(value as unknown as string))
    this.actions.push({
      method: 'setGlobalAlpha',
      data: [value],
    })
  }

  set textAlign(align: string) {
    this.actions.push({
      method: 'setTextAlign',
      data: [align],
    })
  }

  set lineCap(type: LineCapType) {
    this.actions.push({
      method: 'setLineCap',
      data: [type],
    })
  }

  set lineJoin(type: LineJoinType) {
    this.actions.push({
      method: 'setLineJoin',
      data: [type],
    })
  }

  set lineWidth(value: number) {
    this.actions.push({
      method: 'setLineWidth',
      data: [value],
    })
  }

  set miterLimit(value: number) {
    this.actions.push({
      method: 'setMiterLimit',
      data: [value],
    })
  }

  set textBaseline(type: TextBaselineType) {
    this.actions.push({
      method: 'setTextBaseline',
      data: [type],
    })
  }
}

const initCanvasContextProperty = /*#__PURE__*/ once(() => {
  ;[...methods1, ...methods2].forEach(function (method) {
    function get(method: string) {
      switch (method) {
        case 'fill':
        case 'stroke':
          return function () {
            // @ts-expect-error
            this.actions.push({
              method: method + 'Path',
              // @ts-expect-error
              data: [...this.path],
            })
          }
        case 'fillRect':
          return function (
            x: number,
            y: number,
            width: number,
            height: number
          ) {
            // @ts-expect-error
            this.actions.push({
              method: 'fillPath',
              data: [
                {
                  method: 'rect',
                  data: [x, y, width, height],
                },
              ],
            })
          }
        case 'strokeRect':
          return function (
            x: number,
            y: number,
            width: number,
            height: number
          ) {
            // @ts-expect-error
            this.actions.push({
              method: 'strokePath',
              data: [
                {
                  method: 'rect',
                  data: [x, y, width, height],
                },
              ],
            })
          }
        case 'fillText':
        case 'strokeText':
          return function (
            text: string,
            x: number,
            y: number,
            maxWidth: number
          ) {
            var data = [text.toString(), x, y]
            if (typeof maxWidth === 'number') {
              data.push(maxWidth)
            }
            // @ts-expect-error
            this.actions.push({
              method,
              data,
            })
          }
        case 'drawImage':
          return function (
            imageResource: string,
            dx: number | undefined,
            dy: number | undefined,
            dWidth: number | undefined,
            dHeight: number | undefined,
            sx: number | undefined,
            sy: number | undefined,
            sWidth: number | undefined,
            sHeight: number | undefined
          ) {
            if (sHeight === undefined) {
              sx = dx
              sy = dy
              sWidth = dWidth
              sHeight = dHeight
              dx = undefined
              dy = undefined
              dWidth = undefined
              dHeight = undefined
            }
            var data

            function isNumber(e: any) {
              return typeof e === 'number'
            }
            data =
              isNumber(dx) &&
              isNumber(dy) &&
              isNumber(dWidth) &&
              isNumber(dHeight)
                ? [
                    imageResource,
                    sx,
                    sy,
                    sWidth,
                    sHeight,
                    dx,
                    dy,
                    dWidth,
                    dHeight,
                  ]
                : isNumber(sWidth) && isNumber(sHeight)
                ? [imageResource, sx, sy, sWidth, sHeight]
                : [imageResource, sx, sy]
            // @ts-expect-error
            this.actions.push({
              method,
              data,
            })
          }
        default:
          return function (...data: any) {
            // @ts-expect-error
            this.actions.push({
              method,
              data,
            })
          }
      }
    }
    ;(CanvasContext.prototype as any)[method] = get(method)
  })
  methods3.forEach(function (method) {
    function get(method: string) {
      switch (method) {
        case 'setFillStyle':
        case 'setStrokeStyle':
          return function (color: string | Data) {
            if (typeof color !== 'object') {
              // @ts-expect-error
              this.actions.push({
                method,
                data: ['normal', checkColor(color)],
              })
            } else {
              // @ts-expect-error
              this.actions.push({
                method,
                data: [color.type, color.data, color.colorStop],
              })
            }
          }
        case 'setGlobalAlpha':
          return function (alpha: number) {
            alpha = Math.floor(255 * parseFloat(alpha as unknown as string))
            // @ts-expect-error
            this.actions.push({
              method,
              data: [alpha],
            })
          }
        case 'setShadow':
          return function (
            offsetX: number,
            offsetY: number,
            blur: number,
            color: string
          ) {
            color = checkColor(color) as any
            // @ts-expect-error
            this.actions.push({
              method,
              data: [offsetX, offsetY, blur, color],
            })
            // @ts-expect-error
            this.state.shadowBlur = blur
            // @ts-expect-error
            this.state.shadowColor = color
            // @ts-expect-error
            this.state.shadowOffsetX = offsetX
            // @ts-expect-error
            this.state.shadowOffsetY = offsetY
          }
        case 'setLineDash':
          return function (pattern: Array<number> | undefined, offset: number) {
            pattern = pattern || [0, 0]
            offset = offset || 0
            // @ts-expect-error
            this.actions.push({
              method,
              data: [pattern, offset],
            })
            // @ts-expect-error
            this.state.lineDash = pattern
          }
        case 'setFontSize':
          return function (fontSize: number) {
            // @ts-expect-error
            this.state.font = this.state.font.replace(
              /\d+\.?\d*px/,
              fontSize + 'px'
            )
            // @ts-expect-error
            this.state.fontSize = fontSize
            // @ts-expect-error
            this.actions.push({
              method,
              data: [fontSize],
            })
          }
        default:
          return function (...data: any) {
            // @ts-expect-error
            this.actions.push({
              method,
              data,
            })
          }
      }
    }
    ;(CanvasContext.prototype as any)[method] = get(method)
  })
})

export const createCanvasContext =
  defineSyncApi<API_TYPE_CREATE_CANVAS_CONTEXT>(
    API_CREATE_CANVAS_CONTEXT,
    (canvasId, componentInstance): any => {
      initCanvasContextProperty()
      if (componentInstance) {
        return new CanvasContext(canvasId, getPageIdByVm(componentInstance)!)
      }
      const pageId = getPageIdByVm(getCurrentPageVm()!)!
      if (pageId) {
        return new CanvasContext(canvasId, pageId)
      } else {
        UniServiceJSBridge.emit(ON_ERROR, 'createCanvasContext:fail')
      }
    },
    CreateCanvasContextProtocol
  )

export const canvasGetImageData =
  defineAsyncApi<API_TYPE_CANVAS_GET_IMAGE_DATA>(
    API_CANVAS_GET_IMAGE_DATA,
    ({ canvasId, x, y, width, height }, { resolve, reject }) => {
      const pageId = getPageIdByVm(getCurrentPageVm()!)!
      if (!pageId) {
        reject()
        return
      }
      function callback(
        data: UniApp.CanvasGetImageDataRes & { compressed?: boolean }
      ) {
        if (data.errMsg && data.errMsg.indexOf('fail') !== -1) {
          reject('', data)
          return
        }

        let imgData = data.data
        if (imgData && imgData.length) {
          if (__PLATFORM__ === 'app' && data.compressed) {
            imgData = inflateRaw(imgData) as any
          }
          data.data = new Uint8ClampedArray(imgData) as any
        }
        delete data.compressed
        resolve(data)
      }
      operateCanvas(
        canvasId,
        pageId,
        'getImageData',
        {
          x,
          y,
          width,
          height,
        },
        callback
      )
    },
    CanvasGetImageDataProtocol,
    CanvasGetImageDataOptions
  )

export const canvasPutImageData =
  defineAsyncApi<API_TYPE_CANVAS_PUT_IMAGE_DATA>(
    API_CANVAS_PUT_IMAGE_DATA,
    ({ canvasId, data, x, y, width, height }, { resolve, reject }) => {
      var pageId = getPageIdByVm(getCurrentPageVm()!)!
      if (!pageId) {
        reject()
        return
      }
      let compressed: boolean
      const operate = () => {
        operateCanvas(
          canvasId,
          pageId,
          'putImageData',
          {
            data,
            x,
            y,
            width,
            height,
            compressed,
          },
          (data: UniApp.CanvasGetImageDataRes) => {
            if (data.errMsg && data.errMsg.indexOf('fail') !== -1) {
              reject()
              return
            }
            resolve(data)
          }
        )
      }
      // iOS真机非调试模式压缩太慢暂时排除
      if (
        __PLATFORM__ === 'app' &&
        (plus.os.name !== 'iOS' || typeof __WEEX_DEVTOOL__ === 'boolean')
      ) {
        data = deflateRaw(data as any, { to: 'string' }) as any
        compressed = true
      } else {
        // fix ... 操作符
        data = Array.prototype.slice.call(data)
      }
      operate()
    },
    CanvasPutImageDataProtocol,
    CanvasPutImageDataOptions
  )

export const canvasToTempFilePath =
  defineAsyncApi<API_TYPE_CANVAS_TO_TEMP_FILE_PATH>(
    API_CANVAS_TO_TEMP_FILE_PATH,
    (
      {
        x = 0,
        y = 0,
        width,
        height,
        destWidth,
        destHeight,
        canvasId,
        fileType,
        quality,
      },
      { resolve, reject }
    ) => {
      var pageId = getPageIdByVm(getCurrentPageVm()!)!
      if (!pageId) {
        reject()
        return
      }
      let dirname: string = `${getTempPath()}/canvas`
      operateCanvas(
        canvasId,
        pageId,
        'toTempFilePath',
        {
          x,
          y,
          width,
          height,
          destWidth,
          destHeight,
          fileType,
          quality,
          dirname,
        } as ToTempFilePathOptions,
        (res: UniApp.CanvasToTempFilePathRes & { errMsg?: string }) => {
          if (res.errMsg && res.errMsg.indexOf('fail') !== -1) {
            reject('', res)
            return
          }
          resolve(res)
        }
      )
    },
    CanvasToTempFilePathProtocol,
    CanvasToTempFilePathOptions
  )
