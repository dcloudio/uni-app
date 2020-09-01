import { ProtocolOptions } from '../type'

const validator: ProtocolOptions<String>[] = [
  {
    name: 'id',
    type: String,
    required: true
  }
]

export const CreateAudioContextProtocol = validator
export const CreateVideoContextProtocol = validator
export const CreateMapContextProtocol = validator
export const CreateCanvasContextProtocol: ProtocolOptions<String | Object>[] = [
  {
    name: 'canvasId',
    type: String,
    required: true
  },
  {
    name: 'componentInstance',
    type: Object
  }
]
