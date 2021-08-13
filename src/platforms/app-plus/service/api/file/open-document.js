import {
  getRealPath,
  warpPlusSuccessCallback,
  warpPlusErrorCallback
} from '../util'

export function openDocument ({
  filePath,
  fileType
} = {}, callbackId) {
  const successCallback = warpPlusSuccessCallback(callbackId, 'saveFile')
  const errorCallback = warpPlusErrorCallback(callbackId, 'saveFile')

  plus.runtime.openDocument(getRealPath(filePath), undefined, successCallback, errorCallback)
}
