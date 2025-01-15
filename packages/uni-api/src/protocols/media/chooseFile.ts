import {
  CHOOSE_SOURCE_TYPES,
  elemInArray,
  elemsInArray,
} from '../../helpers/protocol'
export const API_CHOOSE_FILE = 'chooseFile'
export type API_TYPE_CHOOSE_FILE = typeof uni.chooseFile
export type API_TYPE_CHOOSE_FILE_OPTIONS = AsyncApiOptions<API_TYPE_CHOOSE_FILE>
const CHOOSE_MEDIA_TYPE: API_TYPE_CHOOSE_FILE_OPTIONS['type'][] = [
  'all',
  'image',
  'video',
]

export const ChooseFileOptions: ApiOptions<API_TYPE_CHOOSE_FILE> = {
  formatArgs: {
    count(count, params) {
      if (!count || count <= 0) {
        params.count = 100
      }
    },
    sourceType(sourceType, params) {
      params.sourceType = elemsInArray(sourceType, CHOOSE_SOURCE_TYPES)
    },
    type(type, params) {
      params.type = elemInArray(type, CHOOSE_MEDIA_TYPE)
    },
    extension(extension, params) {
      if (extension instanceof Array && extension.length === 0) {
        return 'param extension should not be empty.'
      }
      if (!extension) params.extension = ['*']
    },
  },
}

export const ChooseFileProtocol: ApiProtocol<API_TYPE_CHOOSE_FILE> = {
  count: Number,
  sourceType: Array,
  type: String as any,
  extension: Array,
}
