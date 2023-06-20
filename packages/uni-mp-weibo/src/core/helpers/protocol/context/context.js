const validator = [{
  name: 'id',
  type: String,
  required: true
}]

export const createAudioContext = validator
export const createVideoContext = validator
export const createMapContext = validator
export const createCanvasContext = [{
  name: 'canvasId',
  type: String,
  required: true
}, {
  name: 'componentInstance',
  type: Object
}]
