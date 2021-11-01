import { CHOOSE_SOURCE_TYPES, elemsInArray } from '../../helpers/protocol'
export const API_CHOOSE_VIDEO = 'chooseVideo'
export type API_TYPE_CHOOSE_VIDEO = typeof uni.chooseVideo

export const ChooseVideoOptions: ApiOptions<API_TYPE_CHOOSE_VIDEO> = {
  formatArgs: {
    sourceType(sourceType, params) {
      params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES)
    },
    compressed: true,
    maxDuration: 60,
    camera: 'back',
    extension(extension, params) {
      if (extension instanceof Array && extension.length === 0) {
        return 'param extension should not be empty.'
      }
      if (!extension) params.extension = ['*']
    },
  },
}

export const ChooseVideoProtocol: ApiProtocol<API_TYPE_CHOOSE_VIDEO> = {
  sourceType: Array,
  compressed: Boolean,
  maxDuration: Number,
  camera: String as any,
  extension: Array,
}
