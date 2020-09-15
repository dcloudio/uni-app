import { ApiProtocol } from '../type'

export const LoadFontFaceProtocol: ApiProtocol = {
  family: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  desc: {
    type: Object
  }
}
