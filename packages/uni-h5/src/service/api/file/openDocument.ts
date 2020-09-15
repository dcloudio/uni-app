import { createApi, OpenDocumentProtocol } from '@dcloudio/uni-api'

export const openDocument = createApi<typeof uni.openDocument>(option => {
  window.open(option.filePath)
}, OpenDocumentProtocol)
