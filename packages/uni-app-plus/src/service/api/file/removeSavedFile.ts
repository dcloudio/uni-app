import {
  API_REMOVE_SAVED_FILE,
  type API_TYPE_REMOVE_SAVED_FILE,
  RemoveSavedFileOptions,
  RemoveSavedFileProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { warpPlusErrorCallback } from '../../../helpers/plus'

export const removeSavedFile = defineAsyncApi<API_TYPE_REMOVE_SAVED_FILE>(
  API_REMOVE_SAVED_FILE,
  ({ filePath }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject)

    plus.io.resolveLocalFileSystemURL(
      filePath,
      (entry) => {
        entry.remove(() => {
          resolve()
        }, errorCallback)
      },
      errorCallback
    )
  },
  RemoveSavedFileProtocol,
  RemoveSavedFileOptions
)
