import { ApiProtocol } from '../type'

export const PageScrollToProtocol: ApiProtocol = {
  scrollTop: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 300
  }
}
