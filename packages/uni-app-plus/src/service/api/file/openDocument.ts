import {
  API_OPEN_DOCUMENT,
  API_TYPE_OPEN_DOCUMENT,
  defineAsyncApi,
  OpenDocumentProtocol,
  OpenDocumentOptions,
} from '@dcloudio/uni-api'

import { getRealPath } from '@dcloudio/uni-platform'
export const openDocument = defineAsyncApi<API_TYPE_OPEN_DOCUMENT>(
  API_OPEN_DOCUMENT,
  ({ filePath, fileType }, { resolve, reject }) => {
    plus.io.resolveLocalFileSystemURL(
      getRealPath(filePath),
      (entry) => {
        plus.runtime.openFile(getRealPath(filePath))
        resolve()
      },
      (err) => {
        reject('openDocument:fail ' + err.message)
      }
    )
  },
  OpenDocumentProtocol,
  OpenDocumentOptions
)
