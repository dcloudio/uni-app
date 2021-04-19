import {
  API_OPEN_DOCUMENT,
  API_TYPE_OPEN_DOCUMENT,
  defineAsyncApi,
  OpenDocumentProtocol,
  OpenDocumentOptions,
} from '@dcloudio/uni-api'

export const openDocument = defineAsyncApi<API_TYPE_OPEN_DOCUMENT>(
  API_OPEN_DOCUMENT,
  ({ filePath }, { resolve }) => {
    window.open(filePath)
    return resolve()
  },
  OpenDocumentProtocol,
  OpenDocumentOptions
)
