import { ApiOptions, ApiProtocol } from '../type'
import {
  CHOOSE_SIZE_TYPES,
  CHOOSE_SOURCE_TYPES,
  normalizeStrArray
} from '../../helpers/protocol'

export const ChooseImageOptions: ApiOptions = {
  formatArgs: {
    count(value, params) {
      if (value <= 0) {
        params.count = 9
      }
    },
    sizeType(sizeType, params) {
      params.sizeType = normalizeStrArray(sizeType, CHOOSE_SIZE_TYPES)
    },
    sourceType(sourceType, params) {
      params.sourceType = normalizeStrArray(sourceType, CHOOSE_SOURCE_TYPES)
    }
  }
}

export const ChooseImageProtocol: ApiProtocol = {
  count: {
    type: Number,
    default: 9
  },
  sizeType: {
    type: [Array, String],
    default: CHOOSE_SIZE_TYPES
  },
  sourceType: {
    type: Array,
    default: CHOOSE_SOURCE_TYPES
  }
}
