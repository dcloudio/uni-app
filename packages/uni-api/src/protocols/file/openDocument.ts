import { ApiProtocol } from '../type'

export const OpenDocumentProtocol: ApiProtocol = {
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  }
}
