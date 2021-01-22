import { CHOOSE_SOURCE_TYPES, normalizeStrArray } from '../../helpers/protocol'
import { ApiOptions, ApiProtocol } from '../type'

export const ChooseVideoOptions: ApiOptions = {
  formatArgs: {
    sourceType(sourceType, params) {
      params.sourceType = normalizeStrArray(sourceType, CHOOSE_SOURCE_TYPES)
    },
  },
}

export const ChooseVideoProtocol: ApiProtocol = {
  sourceType: {
    type: Array,
    default: CHOOSE_SOURCE_TYPES,
  },
}
