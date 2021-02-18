import { createAsyncApi, OpenDocumentProtocol } from '@dcloudio/uni-api'

export const openDocument = createAsyncApi<typeof uni.openDocument>(
  'openDocument',
  (option) => {
    window.open(option.filePath)
  },
  OpenDocumentProtocol
)
