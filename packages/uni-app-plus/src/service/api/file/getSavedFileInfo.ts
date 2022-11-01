import {
  defineAsyncApi,
  API_GET_SAVED_FILE_INFO,
  API_TYPE_GET_SAVED_FILE_INFO,
  GetSavedFileInfoProtocol,
  GetSavedFileInfoOptions,
} from '@dcloudio/uni-api'
import { warpPlusErrorCallback } from '../../../helpers/plus'

export const getSavedFileInfo = defineAsyncApi<API_TYPE_GET_SAVED_FILE_INFO>(
  API_GET_SAVED_FILE_INFO,
  ({ filePath }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject)

    plus.io.resolveLocalFileSystemURL(
      filePath,
      (entry) => {
        entry.getMetadata(
          (meta) => {
            resolve({
              createTime: meta.modificationTime!.getTime(),
              size: meta.size!,
            })
          },
          errorCallback,
          false
        )
      },
      errorCallback
    )
  },
  GetSavedFileInfoProtocol,
  GetSavedFileInfoOptions
)
