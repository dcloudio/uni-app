import getRealPath from 'uni-platform/helpers/get-real-path'

export const saveImageToPhotosAlbum = {
  filePath: {
    type: String,
    required: true,
    validator (filePath, params) {
      params.filePath = getRealPath(filePath)
    }
  }
}
