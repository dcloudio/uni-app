import {
  getRealPath,
  warpPlusSuccessCallback,
  warpPlusErrorCallback
} from '../util'

export function saveImageToPhotosAlbum ({
  filePath
} = {}, callbackId) {
  const successCallback = warpPlusSuccessCallback(callbackId, 'saveImageToPhotosAlbum')
  const errorCallback = warpPlusErrorCallback(callbackId, 'saveImageToPhotosAlbum')
  plus.gallery.save(getRealPath(filePath), successCallback, errorCallback)
}
