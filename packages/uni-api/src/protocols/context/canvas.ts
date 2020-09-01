import { extend } from '@vue/shared'

import { ApiProtocol, ApiOptions, Data } from '../type'

function getInt(name: string) {
  return function(value: number, params: Data) {
    if (value) {
      params[name] = Math.round(value)
    }
  }
}

export const CanvasGetImageDataOptions = {
  formatArgs: {
    x: getInt('x'),
    y: getInt('y'),
    width: getInt('width'),
    height: getInt('height')
  }
}

export const CanvasGetImageDataProtocol = {
  canvasId: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
}

export const CanvasPutImageDataOptions = CanvasGetImageDataOptions

export const CanvasPutImageDataProtocol = {
  canvasId: {
    type: String,
    required: true
  },
  data: {
    type: Uint8ClampedArray,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number
  }
}

const fileTypes = {
  PNG: 'png',
  JPG: 'jpg',
  JPEG: 'jpg'
}

export const CanvasToTempFilePathOptions: ApiOptions = {
  formatArgs: extend(
    {
      destWidth: getInt('destWidth'),
      destHeight: getInt('destHeight'),
      fileType(value: string, params: Data) {
        value = (value || '').toUpperCase()
        let type = fileTypes[value as keyof typeof fileTypes]
        if (!type) {
          type = fileTypes.PNG
        }
        params.fileType = type
      },
      quality(value: number, params: Data) {
        value = Math.floor(value)
        params.quality = value > 0 && value < 1 ? value : 1
      }
    },
    CanvasGetImageDataOptions.formatArgs
  )
}

export const CanvasToTempFilePathProtocol = {
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  destWidth: {
    type: Number
  },
  destHeight: {
    type: Number
  },
  canvasId: {
    type: String,
    require: true
  },
  fileType: {
    type: String,
    require: true
  },
  quality: {
    type: Number
  }
}

export const DrawCanvasProtocol: ApiProtocol = {
  canvasId: {
    type: String,
    required: true
  },
  actions: {
    type: Array,
    required: true
  },
  reserve: {
    type: Boolean,
    default: false
  }
}
