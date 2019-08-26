import {
  TEMP_PATH
} from '../constants'

import {
  invoke
} from '../../bridge'

const invokeChooseVideo = function (callbackId, type, tempFilePath = '') {
  let callbackResult = {
    errMsg: `chooseVideo:${type}`,
    tempFilePath: tempFilePath,
    duration: 0,
    size: 0,
    height: 0,
    width: 0
  }

  if (type !== 'ok') {
    invoke(callbackId, callbackResult)
    return
  }

  plus.io.getVideoInfo({
    filePath: tempFilePath,
    success (videoInfo) {
      callbackResult.size = videoInfo.size
      callbackResult.duration = videoInfo.duration
      callbackResult.width = videoInfo.width
      callbackResult.height = videoInfo.height
      invoke(callbackId, callbackResult)
    },
    fail () {
      invoke(callbackId, callbackResult)
    },
    complete () {
      invoke(callbackId, callbackResult)
    }
  })
}
const openCamera = function (callbackId, maxDuration, cameraIndex) {
  const camera = plus.camera.getCamera()
  camera.startVideoCapture(e => invokeChooseVideo(callbackId, 'ok', e), e => invokeChooseVideo(
    callbackId, 'fail'), {
    index: cameraIndex,
    videoMaximumDuration: maxDuration,
    filename: TEMP_PATH + '/camera/'
  })
}
const openAlbum = function (callbackId) {
  plus.gallery.pick(e => {
    invokeChooseVideo(callbackId, 'ok', e)
  }, e => invokeChooseVideo(callbackId, 'fail'), {
    filter: 'video',
    system: false,
    filename: TEMP_PATH + '/gallery/'
  })
}
export function chooseVideo ({
  sourceType = ['album', 'camera'],
  maxDuration = 60,
  camera = 'back'
} = {}, callbackId) {
  let fallback = true
  let cameraIndex = (camera === 'front') ? 2 : 1
  if (sourceType.length === 1) {
    if (sourceType[0] === 'album') {
      fallback = false
      openAlbum(callbackId)
    } else if (sourceType[0] === 'camera') {
      fallback = false
      openCamera(callbackId, maxDuration, cameraIndex)
    }
  }
  if (fallback) {
    plus.nativeUI.actionSheet({
      cancel: '取消',
      buttons: [{
        title: '拍摄'
      }, {
        title: '从手机相册选择'
      }]
    }, e => {
      switch (e.index) {
        case 0:
          invokeChooseVideo(callbackId, 'fail')
          break
        case 1:
          openCamera(callbackId, maxDuration, cameraIndex)
          break
        case 2:
          openAlbum(callbackId)
          break
      }
    })
  }
}
