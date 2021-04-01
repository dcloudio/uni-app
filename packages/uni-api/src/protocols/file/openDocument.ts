import { ApiProtocol } from '../type'
export const API_OPEN_DOCUMENT = 'openDocument'

export const OpenDocumentProtocol: ApiProtocol = {
  filePath: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
  },
}
