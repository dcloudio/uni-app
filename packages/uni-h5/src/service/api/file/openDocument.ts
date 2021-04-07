import {
  API_OPEN_DOCUMENT,
  defineAsyncApi,
  OpenDocumentProtocol,
} from '@dcloudio/uni-api'

export const openDocument = defineAsyncApi<typeof uni.openDocument>(
  API_OPEN_DOCUMENT,
  ({ filePath }, { resolve }) => {
    window.open(filePath)
    return resolve()
  },
  OpenDocumentProtocol
)
