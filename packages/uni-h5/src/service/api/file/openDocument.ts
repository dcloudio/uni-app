import { createApi, OpenDocumentProtocol } from '@dcloudio/uni-api'

interface OpenDocumentOption {
  filePath: string
}
export const openDocument = createApi((option: OpenDocumentOption) => {
  window.open(option.filePath)
  return true
}, OpenDocumentProtocol)
