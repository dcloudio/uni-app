export const API_OPEN_DOCUMENT = 'openDocument'
export type API_TYPE_OPEN_DOCUMENT = typeof uni.openDocument

export const OpenDocumentProtocol: ApiProtocol<API_TYPE_OPEN_DOCUMENT> = {
  filePath: {
    type: String,
    required: true,
  },
  fileType: String,
}
