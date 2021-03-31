import { defineAsyncApi, OpenDocumentProtocol } from '@dcloudio/uni-api'

export const openDocument = defineAsyncApi<typeof uni.openDocument>(
  'openDocument',
  (option) => {
    window.open(option.filePath)
  },
  OpenDocumentProtocol
)
