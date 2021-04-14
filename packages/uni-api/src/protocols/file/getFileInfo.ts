export const API_GET_FILE_INFO = 'getFileInfo'
export type API_TYPE_GET_FILE_INFO = typeof uni.getFileInfo

export const GetFileInfoProtocol: ApiProtocol<API_TYPE_GET_FILE_INFO> = {
  filePath: {
    type: String,
    required: true,
  },
}
