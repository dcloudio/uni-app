function getInt (method) {
  return function (value, params) {
    if (value) {
      params[method] = Math.round(value)
    }
  }
}

export const canvasGetImageData = {
  canvasId: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true,
    validator: getInt('x')
  },
  y: {
    type: Number,
    required: true,
    validator: getInt('y')
  },
  width: {
    type: Number,
    required: true,
    validator: getInt('width')
  },
  height: {
    type: Number,
    required: true,
    validator: getInt('height')
  }
}

export const canvasPutImageData = {
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
    required: true,
    validator: getInt('x')
  },
  y: {
    type: Number,
    required: true,
    validator: getInt('y')
  },
  width: {
    type: Number,
    required: true,
    validator: getInt('width')
  },
  height: {
    type: Number,
    validator: getInt('height')
  }
}

const fileTypes = {
  PNG: 'png',
  JPG: 'jpg',
  JPEG: 'jpg'
}

export const canvasToTempFilePath = {
  x: {
    type: Number,
    default: 0,
    validator: getInt('x')
  },
  y: {
    type: Number,
    default: 0,
    validator: getInt('y')
  },
  width: {
    type: Number,
    validator: getInt('width')
  },
  height: {
    type: Number,
    validator: getInt('height')
  },
  destWidth: {
    type: Number,
    validator: getInt('destWidth')
  },
  destHeight: {
    type: Number,
    validator: getInt('destHeight')
  },
  canvasId: {
    type: String,
    require: true
  },
  fileType: {
    type: String,
    validator (value, params) {
      value = (value || '').toUpperCase()
      params.fileType = value in fileTypes ? fileTypes[value] : fileTypes.PNG
    }
  },
  quality: {
    type: Number,
    validator (value, params) {
      value = Math.floor(value)
      params.quality = value > 0 && value < 1 ? value : 1
    }
  }
}

export const drawCanvas = {
  canvasId: {
    type: String,
    require: true
  },
  actions: {
    type: Array,
    require: true
  },
  reserve: {
    type: Boolean,
    default: false
  }
}
