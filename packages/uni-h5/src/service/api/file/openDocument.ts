import {
  API_OPEN_DOCUMENT,
  defineAsyncApi,
  OpenDocumentProtocol,
} from '@dcloudio/uni-api'

export const openDocument = defineAsyncApi<typeof uni.openDocument>(
  API_OPEN_DOCUMENT,
  (option) => {
    window.open(option.filePath)
  },
  OpenDocumentProtocol
)
