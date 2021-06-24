import {
  API_SAVE_VIDEO_TO_PHOTOS_ALBUM,
  API_TYPE_SAVE_VIDEO_TO_PHOTOS_ALBUM,
  defineAsyncApi,
  SaveVideoToPhotosAlbumOptions,
  SaveVideoToPhotosAlbumProtocol,
} from '@dcloudio/uni-api'
import {
  warpPlusSuccessCallback,
  warpPlusErrorCallback,
} from '../../../helpers/plus'

export const saveVideoToPhotosAlbum =
  defineAsyncApi<API_TYPE_SAVE_VIDEO_TO_PHOTOS_ALBUM>(
    API_SAVE_VIDEO_TO_PHOTOS_ALBUM,
    (options, { resolve, reject }) => {
      plus.gallery.save(
        options.filePath,
        warpPlusSuccessCallback(resolve),
        warpPlusErrorCallback(reject)
      )
    },
    SaveVideoToPhotosAlbumProtocol,
    SaveVideoToPhotosAlbumOptions
  )
