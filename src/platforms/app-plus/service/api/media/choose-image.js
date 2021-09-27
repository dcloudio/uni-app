import {
  TEMP_PATH
} from '../constants'

import {
  invoke
} from '../../bridge'

import {
  warpPlusErrorCallback
} from '../util'

import {
  t
} from 'uni-core/helpers/i18n'

/**
 * 获取文件信息
 * @param {string} filePath 文件路径
 * @returns {Promise} 文件信息Promise
 */
function getFileInfo (filePath) {
  return new Promise((resolve, reject) => {
    plus.io.resolveLocalFileSystemURL(filePath, function (entry) {
      entry.getMetadata(resolve, reject, false)
    }, reject)
  })
}

export function chooseImage ({
  count,
  sizeType,
  sourceType,
  crop
} = {}, callbackId) {
  const errorCallback = warpPlusErrorCallback(callbackId, 'chooseImage', 'cancel')

  function successCallback (paths) {
    const tempFiles = []
    const tempFilePaths = []
    Promise.all(paths.map((path) => getFileInfo(path)))
      .then((filesInfo) => {
        filesInfo.forEach((file, index) => {
          const path = paths[index]
          tempFilePaths.push(path)
          tempFiles.push({ path, size: file.size })
        })

        invoke(callbackId, {
          errMsg: 'chooseImage:ok',
          tempFilePaths,
          tempFiles
        })
      })
      .catch(errorCallback)
  }

  function openCamera () {
    const camera = plus.camera.getCamera()
    camera.captureImage(path => successCallback([path]),
      errorCallback, {
        filename: TEMP_PATH + '/camera/',
        resolution: 'high',
        crop,
        sizeType
      })
  }

  function openAlbum () {
    plus.gallery.pick(({ files }) => successCallback(files), errorCallback, {
      maximum: count,
      multiple: true,
      system: false,
      filename: TEMP_PATH + '/gallery/',
      permissionAlert: true,
      crop,
      sizeType
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
    cancel: t('uni.chooseImage.cancel'),
    buttons: [{
      title: t('uni.chooseImage.sourceType.camera')
    }, {
      title: t('uni.chooseImage.sourceType.album')
    }]
  }, (e) => {
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
