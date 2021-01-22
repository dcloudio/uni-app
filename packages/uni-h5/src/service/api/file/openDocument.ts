import {
  API_TYPE_ASYNC,
  createApi,
  OpenDocumentProtocol,
} from '@dcloudio/uni-api'

export const openDocument = createApi<typeof uni.openDocument>(
  { type: API_TYPE_ASYNC, name: 'openDocument' },
  (option) => {
    window.open(option.filePath)
  },
  OpenDocumentProtocol
)
