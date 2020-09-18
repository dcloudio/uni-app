import {
  TEMP_PATH
} from '../constants'

import {
  invoke
} from '../../bridge'

import {
  warpPlusErrorCallback
} from '../util'

export function chooseVideo ({
  sourceType,
  maxDuration,
  camera
} = {}, callbackId) {
  const errorCallback = warpPlusErrorCallback(callbackId, 'chooseVideo', 'cancel')

  function successCallback (tempFilePath = '') {
    plus.io.getVideoInfo({
      filePath: tempFilePath,
      success (videoInfo) {
        const result = {
          errMsg: 'chooseVideo:ok',
          tempFilePath: tempFilePath
        }
        result.size = videoInfo.size
        result.duration = videoInfo.duration
        result.width = videoInfo.width
        result.height = videoInfo.height
        invoke(callbackId, result)
      },
      errorCallback
    })
  }

  function openAlbum () {
    plus.gallery.pick(successCallback, errorCallback, {
      filter: 'video',
      system: false,
      filename: TEMP_PATH + '/gallery/'
    })
  }

  function openCamera () {
    const plusCamera = plus.camera.getCamera()
    plusCamera.startVideoCapture(successCallback, errorCallback, {
      index: camera === 'front' ? 2 : 1,
      videoMaximumDuration: maxDuration,
      filename: TEMP_PATH + '/camera/'
    })
  }

  if (sourceType.length === 1) {
    if (sourceType.includes('album')) {
      openAlbum()
      return
    } else if (sourceType.includes('camera')) {
      openCamera()
      return
    }
  }
  plus.nativeUI.actionSheet({
    cancel: '取消',
    buttons: [{
      title: '拍摄'
    }, {
      title: '从手机相册选择'
    }]
  }, e => {
    switch (e.index) {
      case 1:
        openCamera()
        break
      case 2:
        openAlbum()
        break
      default:
        errorCallback()
        break
    }
  })
}
