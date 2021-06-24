import { getRealPath } from '@dcloudio/uni-platform'
export const API_SAVE_VIDEO_TO_PHOTOS_ALBUM = 'saveVideoToPhotosAlbum'
export type API_TYPE_SAVE_VIDEO_TO_PHOTOS_ALBUM =
  typeof uni.saveVideoToPhotosAlbum

export const SaveVideoToPhotosAlbumOptions: ApiOptions<API_TYPE_SAVE_VIDEO_TO_PHOTOS_ALBUM> =
  {
    formatArgs: {
      filePath(filePath, params) {
        params.filePath = getRealPath(filePath)
      },
    },
  }

export const SaveVideoToPhotosAlbumProtocol: ApiProtocol<API_TYPE_SAVE_VIDEO_TO_PHOTOS_ALBUM> =
  {
    filePath: {
      type: String,
      required: true,
    },
  }
