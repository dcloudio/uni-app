import { extend } from '@vue/shared'
import { getFileName } from '../../../helpers/file'
import { TEMP_PATH } from '../constants'
import {
  API_COMPRESS_IMAGE,
  API_TYPE_COMPRESS_IMAGE,
  defineAsyncApi,
  CompressImageOptions,
  CompressImageProtocol,
} from '@dcloudio/uni-api'

export const compressImage = defineAsyncApi<API_TYPE_COMPRESS_IMAGE>(
  API_COMPRESS_IMAGE,
  (options, { resolve, reject }) => {
    const dst = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(
      options.src
    )}`
    const { compressedWidth, compressedHeight } = options
    if (typeof compressedWidth === 'number') {
      options.width = compressedWidth + 'px'
    }
    if (typeof compressedHeight === 'number') {
      options.height = compressedHeight + 'px'
    }
    plus.zip.compressImage(
      extend({}, options, {
        dst,
      }),
      () => {
        resolve({
          tempFilePath: dst,
        })
      },
      reject
    )
  },
  CompressImageProtocol,
  CompressImageOptions
)
