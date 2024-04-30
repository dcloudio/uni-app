import {
  API_SAVE_VIDEO_TO_PHOTOS_ALBUM,
  type API_TYPE_SAVE_VIDEO_TO_PHOTOS_ALBUM,
  SaveVideoToPhotosAlbumOptions,
  SaveVideoToPhotosAlbumProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  warpPlusErrorCallback,
  warpPlusSuccessCallback,
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
