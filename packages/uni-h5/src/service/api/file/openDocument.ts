import {
  API_OPEN_DOCUMENT,
  defineAsyncApi,
  OpenDocumentProtocol,
} from '@dcloudio/uni-api'

export const openDocument = defineAsyncApi<typeof uni.openDocument>(
  API_OPEN_DOCUMENT,
  ({ filePath }) => {
    window.open(filePath)
    return Promise.resolve()
  },
  OpenDocumentProtocol
)
