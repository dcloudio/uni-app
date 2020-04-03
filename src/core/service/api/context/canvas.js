import createCallbacks from 'uni-helpers/callbacks'

import {
  invokeMethod,
  getCurrentPageId
} from '../../platform'

import {
  invoke
} from '../../bridge'

const canvasEventCallbacks = createCallbacks('canvasEvent')

UniServiceJSBridge.subscribe('onDrawCanvas', ({
  callbackId,
  data
}) => {
  const callback = canvasEventCallbacks.pop(callbackId)
  if (callback) {
    callback(data)
  }
})

UniServiceJSBridge.subscribe('onCanvasMethodCallback', ({
  callbackId,
  data
}) => {
  const callback = canvasEventCallbacks.pop(callbackId)
  if (callback) {
    callback(data)
  }
})

function operateCanvas (canvasId, pageId, type, data) {
  UniServiceJSBridge.publishHandler(pageId + '-canvas-' + canvasId, {
    canvasId,
    type,
    data
  }, pageId)
}

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
  transparent: '#00000000'
}

function checkColor (e) {
  // 其他开发者适配的echarts会传入一个undefined到这里
  e = e || '#000000'
  var t = null
  if ((t = /^#([0-9|A-F|a-f]{6})$/.exec(e)) != null) {
    let n = parseInt(t[1].slice(0, 2), 16)
    let o = parseInt(t[1].slice(2, 4), 16)
    let r = parseInt(t[1].slice(4), 16)
    return [n, o, r, 255]
  }
  if ((t = /^#([0-9|A-F|a-f]{3})$/.exec(e)) != null) {
    let n = t[1].slice(0, 1)
    let o = t[1].slice(1, 2)
    let r = t[1].slice(2, 3)
    n = parseInt(n + n, 16)
    o = parseInt(o + o, 16)
    r = parseInt(r + r, 16)
    return [n, o, r, 255]
  }
  if ((t = /^rgb\((.+)\)$/.exec(e)) != null) {
    return t[1].split(',').map(function (e) {
      return Math.min(255, parseInt(e.trim()))
    }).concat(255)
  }
  if ((t = /^rgba\((.+)\)$/.exec(e)) != null) {
    return t[1].split(',').map(function (e, t) {
      return t === 3 ? Math.floor(255 * parseFloat(e.trim())) : Math.min(255, parseInt(e.trim()))
    })
  }
  var i = e.toLowerCase()
  if (predefinedColor.hasOwnProperty(i)) {
    t = /^#([0-9|A-F|a-f]{6,8})$/.exec(predefinedColor[i])
    let n = parseInt(t[1].slice(0, 2), 16)
    let o = parseInt(t[1].slice(2, 4), 16)
    let r = parseInt(t[1].slice(4, 6), 16)
    let a = parseInt(t[1].slice(6, 8), 16)
    a = a >= 0 ? a : 255
    return [n, o, r, a]
  }
  console.group('非法颜色: ' + e)
  console.error('不支持颜色：' + e)
  console.groupEnd()
  return [0, 0, 0, 255]
}

function Pattern (image, repetition) {
  this.image = image
  this.repetition = repetition
}

class CanvasGradient {
  constructor (type, data) {
    this.type = type
    this.data = data
    this.colorStop = []
  }
  addColorStop (position, color) {
    this.colorStop.push([position, checkColor(color)])
  }
}
var methods1 = ['scale', 'rotate', 'translate', 'setTransform', 'transform']
var methods2 = ['drawImage', 'fillText', 'fill', 'stroke', 'fillRect', 'strokeRect', 'clearRect',
  'strokeText'
]
var methods3 = ['setFillStyle', 'setTextAlign', 'setStrokeStyle', 'setGlobalAlpha', 'setShadow',
  'setFontSize', 'setLineCap', 'setLineJoin', 'setLineWidth', 'setMiterLimit',
  'setTextBaseline', 'setLineDash'
]

var tempCanvas
function getTempCanvas (width = 0, height = 0) {
  if (!tempCanvas) {
    tempCanvas = document.createElement('canvas')
  }
  tempCanvas.width = width
  tempCanvas.height = height
  return tempCanvas
}

function TextMetrics (width) {
  this.width = width
}

export class CanvasContext {
  constructor (id, pageId) {
    this.id = id
    this.pageId = pageId
    this.actions = []
    this.path = []
    this.subpath = []
    this.currentTransform = []
    this.currentStepAnimates = []
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
      fontFamily: 'sans-serif'
    }
  }
  draw (reserve = false, callback) {
    var actions = [...this.actions]
    this.actions = []
    this.path = []
    var callbackId

    if (typeof callback === 'function') {
      callbackId = canvasEventCallbacks.push(callback)
    }

    operateCanvas(this.id, this.pageId, 'actionsChanged', {
      actions,
      reserve,
      callbackId
    })
  }
  createLinearGradient (x0, y0, x1, y1) {
    return new CanvasGradient('linear', [x0, y0, x1, y1])
  }
  createCircularGradient (x, y, r) {
    return new CanvasGradient('radial', [x, y, r])
  }
  createPattern (image, repetition) {
    if (undefined === repetition) {
      console.error("Failed to execute 'createPattern' on 'CanvasContext': 2 arguments required, but only 1 present.")
    } else if (['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].indexOf(repetition) < 0) {
      console.error("Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" + repetition + "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.")
    } else {
      return new Pattern(image, repetition)
    }
  }
  // TODO
  measureText (text) {
    if (typeof document === 'object') {
      var c2d = getTempCanvas().getContext('2d')
      c2d.font = this.state.font
      return new TextMetrics(c2d.measureText(text).width || 0)
    } else {
      return new TextMetrics(0)
    }
  }
  save () {
    this.actions.push({
      method: 'save',
      data: []
    })
    this.drawingState.push(this.state)
  }
  restore () {
    this.actions.push({
      method: 'restore',
      data: []
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
      fontFamily: 'sans-serif'
    }
  }
  beginPath () {
    this.path = []
    this.subpath = []
  }
  moveTo (x, y) {
    this.path.push({
      method: 'moveTo',
      data: [x, y]
    })
    this.subpath = [
      [x, y]
    ]
  }
  lineTo (x, y) {
    if (this.path.length === 0 && this.subpath.length === 0) {
      this.path.push({
        method: 'moveTo',
        data: [x, y]
      })
    } else {
      this.path.push({
        method: 'lineTo',
        data: [x, y]
      })
    }
    this.subpath.push([x, y])
  }
  quadraticCurveTo (cpx, cpy, x, y) {
    this.path.push({
      method: 'quadraticCurveTo',
      data: [cpx, cpy, x, y]
    })
    this.subpath.push([x, y])
  }
  bezierCurveTo (cp1x, cp1y, cp2x, cp2y, x, y) {
    this.path.push({
      method: 'bezierCurveTo',
      data: [cp1x, cp1y, cp2x, cp2y, x, y]
    })
    this.subpath.push([x, y])
  }
  arc (x, y, r, sAngle, eAngle, counterclockwise = false) {
    this.path.push({
      method: 'arc',
      data: [x, y, r, sAngle, eAngle, counterclockwise]
    })
    this.subpath.push([x, y])
  }
  rect (x, y, width, height) {
    this.path.push({
      method: 'rect',
      data: [x, y, width, height]
    })
    this.subpath = [
      [x, y]
    ]
  }
  arcTo (x1, y1, x2, y2, radius) {
    this.path.push({
      method: 'arcTo',
      data: [x1, y1, x2, y2, radius]
    })
    this.subpath.push([x2, y2])
  }
  clip () {
    this.actions.push({
      method: 'clip',
      data: [...this.path]
    })
  }
  closePath () {
    this.path.push({
      method: 'closePath',
      data: []
    })
    if (this.subpath.length) {
      this.subpath = [this.subpath.shift()]
    }
  }
  clearActions () {
    this.actions = []
    this.path = []
    this.subpath = []
  }
  getActions () {
    var actions = [...this.actions]
    this.clearActions()
    return actions
  }
  set lineDashOffset (value) {
    this.actions.push({
      method: 'setLineDashOffset',
      data: [value]
    })
  }
  set globalCompositeOperation (type) {
    this.actions.push({
      method: 'setGlobalCompositeOperation',
      data: [type]
    })
  }
  set shadowBlur (level) {
    this.actions.push({
      method: 'setShadowBlur',
      data: [level]
    })
  }
  set shadowColor (color) {
    this.actions.push({
      method: 'setShadowColor',
      data: [color]
    })
  }
  set shadowOffsetX (x) {
    this.actions.push({
      method: 'setShadowOffsetX',
      data: [x]
    })
  }
  set shadowOffsetY (y) {
    this.actions.push({
      method: 'setShadowOffsetY',
      data: [y]
    })
  }
  set font (value) {
    var self = this
    this.state.font = value
    // eslint-disable-next-line
    var fontFormat = value.match(/^(([\w\-]+\s)*)(\d+r?px)(\/(\d+\.?\d*(r?px)?))?\s+(.*)/)
    if (fontFormat) {
      var style = fontFormat[1].trim().split(/\s/)
      var fontSize = parseFloat(fontFormat[3])
      var fontFamily = fontFormat[7]
      var actions = []
      style.forEach(function (value, index) {
        if (['italic', 'oblique', 'normal'].indexOf(value) > -1) {
          actions.push({
            method: 'setFontStyle',
            data: [value]
          })
          self.state.fontStyle = value
        } else if (['bold', 'normal'].indexOf(value) > -1) {
          actions.push({
            method: 'setFontWeight',
            data: [value]
          })
          self.state.fontWeight = value
        } else if (index === 0) {
          actions.push({
            method: 'setFontStyle',
            data: ['normal']
          })
          self.state.fontStyle = 'normal'
        } else if (index === 1) {
          pushAction()
        }
      })
      if (style.length === 1) {
        pushAction()
      }
      style = actions.map(function (action) {
        return action.data[0]
      }).join(' ')
      this.state.fontSize = fontSize
      this.state.fontFamily = fontFamily
      this.actions.push({
        method: 'setFont',
        data: [`${style} ${fontSize}px ${fontFamily}`]
      })
    } else {
      console.warn("Failed to set 'font' on 'CanvasContext': invalid format.")
    }
    function pushAction () {
      actions.push({
        method: 'setFontWeight',
        data: ['normal']
      })
      self.state.fontWeight = 'normal'
    }
  }
  get font () {
    return this.state.font
  }
  set fillStyle (color) {
    this.setFillStyle(color)
  }
  set strokeStyle (color) {
    this.setStrokeStyle(color)
  }
  set globalAlpha (value) {
    value = Math.floor(255 * parseFloat(value))
    this.actions.push({
      method: 'setGlobalAlpha',
      data: [value]
    })
  }
  set textAlign (align) {
    this.actions.push({
      method: 'setTextAlign',
      data: [align]
    })
  }
  set lineCap (type) {
    this.actions.push({
      method: 'setLineCap',
      data: [type]
    })
  }
  set lineJoin (type) {
    this.actions.push({
      method: 'setLineJoin',
      data: [type]
    })
  }
  set lineWidth (value) {
    this.actions.push({
      method: 'setLineWidth',
      data: [value]
    })
  }
  set miterLimit (value) {
    this.actions.push({
      method: 'setMiterLimit',
      data: [value]
    })
  }
  set textBaseline (type) {
    this.actions.push({
      method: 'setTextBaseline',
      data: [type]
    })
  }
}

[...methods1, ...methods2].forEach(function (method) {
  function get (method) {
    switch (method) {
      case 'fill':
      case 'stroke':
        return function () {
          this.actions.push({
            method: method + 'Path',
            data: [...this.path]
          })
        }
      case 'fillRect':
        return function (x, y, width, height) {
          this.actions.push({
            method: 'fillPath',
            data: [{
              method: 'rect',
              data: [x, y, width, height]
            }]
          })
        }
      case 'strokeRect':
        return function (x, y, width, height) {
          this.actions.push({
            method: 'strokePath',
            data: [{
              method: 'rect',
              data: [x, y, width, height]
            }]
          })
        }
      case 'fillText':
      case 'strokeText':
        return function (text, x, y, maxWidth) {
          var data = [text.toString(), x, y]
          if (typeof maxWidth === 'number') {
            data.push(maxWidth)
          }
          this.actions.push({
            method,
            data
          })
        }
      case 'drawImage':
        return function (imageResource, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight) {
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
          function isNumber (e) {
            return typeof e === 'number'
          }
          data = isNumber(dx) && isNumber(dy) && isNumber(dWidth) && isNumber(dHeight) ? [imageResource, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight] : isNumber(sWidth) && isNumber(
            sHeight) ? [imageResource, sx, sy, sWidth, sHeight] : [imageResource, sx, sy]
          this.actions.push({
            method,
            data
          })
        }
      default:
        return function (...data) {
          this.actions.push({
            method,
            data
          })
        }
    }
  }
  CanvasContext.prototype[method] = get(method)
})
methods3.forEach(function (method) {
  function get (method) {
    switch (method) {
      case 'setFillStyle':
      case 'setStrokeStyle':
        return function (color) {
          if (typeof color !== 'object') {
            this.actions.push({
              method,
              data: ['normal', checkColor(color)]
            })
          } else {
            this.actions.push({
              method,
              data: [color.type, color.data, color.colorStop]
            })
          }
        }
      case 'setGlobalAlpha':
        return function (alpha) {
          alpha = Math.floor(255 * parseFloat(alpha))
          this.actions.push({
            method,
            data: [alpha]
          })
        }
      case 'setShadow':
        return function (offsetX, offsetY, blur, color) {
          color = checkColor(color)
          this.actions.push({
            method,
            data: [offsetX, offsetY, blur, color]
          })
          this.state.shadowBlur = blur
          this.state.shadowColor = color
          this.state.shadowOffsetX = offsetX
          this.state.shadowOffsetY = offsetY
        }
      case 'setLineDash':
        return function (pattern, offset) {
          pattern = pattern || [0, 0]
          offset = offset || 0
          this.actions.push({
            method,
            data: [pattern, offset]
          })
          this.state.lineDash = pattern
        }
      case 'setFontSize':
        return function (fontSize) {
          this.state.font = this.state.font.replace(/\d+\.?\d*px/, fontSize + 'px')
          this.state.fontSize = fontSize
          this.actions.push({
            method,
            data: [fontSize]
          })
        }
      default:
        return function (...data) {
          this.actions.push({
            method,
            data
          })
        }
    }
  }
  CanvasContext.prototype[method] = get(method)
})

export function createCanvasContext (id, context) {
  if (context) {
    return new CanvasContext(id, context.$page.id)
  }
  const pageId = getCurrentPageId()
  if (pageId) {
    return new CanvasContext(id, pageId)
  } else {
    UniServiceJSBridge.emit('onError', 'createCanvasContext:fail')
  }
}

export function canvasGetImageData ({
  canvasId,
  x,
  y,
  width,
  height
}, callbackId) {
  var pageId = getCurrentPageId()
  if (!pageId) {
    invoke(callbackId, {
      errMsg: 'canvasGetImageData:fail'
    })
    return
  }
  var cId = canvasEventCallbacks.push(function (data) {
    var imgData = data.data
    if (imgData && imgData.length) {
      data.data = new Uint8ClampedArray(imgData)
    }
    invoke(callbackId, data)
  })
  operateCanvas(canvasId, pageId, 'getImageData', {
    x,
    y,
    width,
    height,
    callbackId: cId
  })
}

export function canvasPutImageData ({
  canvasId,
  data,
  x,
  y,
  width,
  height
}, callbackId) {
  var pageId = getCurrentPageId()
  if (!pageId) {
    invoke(callbackId, {
      errMsg: 'canvasPutImageData:fail'
    })
    return
  }
  var cId = canvasEventCallbacks.push(function (data) {
    invoke(callbackId, data)
  })
  // fix ...
  operateCanvas(canvasId, pageId, 'putImageData', {
    data: Array.prototype.slice.call(data),
    x,
    y,
    width,
    height,
    callbackId: cId
  })
}

export function canvasToTempFilePath ({
  x = 0,
  y = 0,
  width,
  height,
  destWidth,
  destHeight,
  canvasId,
  fileType,
  qualit
}, callbackId) {
  var pageId = getCurrentPageId()
  if (!pageId) {
    invoke(callbackId, {
      errMsg: 'canvasToTempFilePath:fail'
    })
    return
  }
  const cId = canvasEventCallbacks.push(function ({
    base64
  }) {
    if (!base64 || !base64.length) {
      invoke(callbackId, {
        errMsg: 'canvasToTempFilePath:fail'
      })
    }
    invokeMethod('base64ToTempFilePath', {
      base64Data: base64,
      x,
      y,
      width,
      height,
      destWidth,
      destHeight,
      canvasId,
      fileType,
      qualit
    }, callbackId)
  })
  operateCanvas(canvasId, pageId, 'getDataUrl', {
    x,
    y,
    width,
    height,
    destWidth,
    destHeight,
    hidpi: false,
    fileType,
    qualit,
    callbackId: cId
  })
}
