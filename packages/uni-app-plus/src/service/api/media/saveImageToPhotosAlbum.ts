import {
  API_SAVE_IMAGE_TO_PHOTOS_ALBUM,
  type API_TYPE_SAVE_IMAGE_TO_PHOTOS_ALBUM,
  SaveImageToPhotosAlbumOptions,
  SaveImageToPhotosAlbumProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  warpPlusErrorCallback,
  warpPlusSuccessCallback,
} from '../../../helpers/plus'

export const saveImageToPhotosAlbum =
  defineAsyncApi<API_TYPE_SAVE_IMAGE_TO_PHOTOS_ALBUM>(
    API_SAVE_IMAGE_TO_PHOTOS_ALBUM,
    (options, { resolve, reject }) => {
      plus.gallery.save(
        options.filePath,
        warpPlusSuccessCallback(resolve),
        warpPlusErrorCallback(reject)
      )
    },
    SaveImageToPhotosAlbumProtocol,
    SaveImageToPhotosAlbumOptions
  )
