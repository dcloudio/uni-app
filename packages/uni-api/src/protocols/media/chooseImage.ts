import {
  CHOOSE_SIZE_TYPES,
  CHOOSE_SOURCE_TYPES,
  elemsInArray,
} from '../../helpers/protocol'
export const API_CHOOSE_IMAGE = 'chooseImage'
export type API_TYPE_CHOOSE_IMAGE = typeof uni.chooseImage

export const ChooseImageOptions: ApiOptions<API_TYPE_CHOOSE_IMAGE> = {
  formatArgs: {
    count(value, params) {
      if (!value || value <= 0) {
        params.count = 9
      }
    },
    sizeType(sizeType, params) {
      params.sizeType = elemsInArray(sizeType, CHOOSE_SIZE_TYPES)
    },
    sourceType(sourceType, params) {
      params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES)
    },
    extension(extension, params) {
      if (extension instanceof Array && extension.length === 0) {
        return 'param extension should not be empty.'
      }
      if (!extension) params.extension = ['*']
    },
  },
}

export const ChooseImageProtocol: ApiProtocol<API_TYPE_CHOOSE_IMAGE> = {
  count: Number,
  sizeType: [Array, String],
  sourceType: Array,
  extension: Array,
}
