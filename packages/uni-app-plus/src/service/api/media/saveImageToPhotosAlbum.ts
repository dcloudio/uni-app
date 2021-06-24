import {
  API_SAVE_IMAGE_TO_PHOTOS_ALBUM,
  API_TYPE_SAVE_IMAGE_TO_PHOTOS_ALBUM,
  defineAsyncApi,
  SaveImageToPhotosAlbumOptions,
  SaveImageToPhotosAlbumProtocol,
} from '@dcloudio/uni-api'
import {
  warpPlusSuccessCallback,
  warpPlusErrorCallback,
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
