import { getRealPath } from '@dcloudio/uni-platform'

export const API_SAVE_IMAGE_TO_PHOTOS_ALBUM = 'saveImageToPhotosAlbum'
export type API_TYPE_SAVE_IMAGE_TO_PHOTOS_ALBUM =
  typeof uni.saveImageToPhotosAlbum

export const SaveImageToPhotosAlbumOptions: ApiOptions<API_TYPE_SAVE_IMAGE_TO_PHOTOS_ALBUM> =
  {
    formatArgs: {
      filePath(filePath, params) {
        params.filePath = getRealPath(filePath)
      },
    },
  }

export const SaveImageToPhotosAlbumProtocol: ApiProtocol<API_TYPE_SAVE_IMAGE_TO_PHOTOS_ALBUM> =
  {
    filePath: {
      type: String,
      required: true,
    },
  }
