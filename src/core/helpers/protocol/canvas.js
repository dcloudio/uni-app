export const canvasGetImageData = {
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

const fileType = {
  PNG: 'PNG',
  JPG: 'JPG'
}

export const canvasToTempFilePath = {
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
    validator (value, params) {
      value = (value || '').toUpperCase()
      params.fileType = Object.values(fileType).indexOf(value) < 0 ? fileType.PNG : value
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
