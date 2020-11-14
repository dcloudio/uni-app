import {
  TEMP_PATH
} from '../constants'

import {
  invoke
} from '../../bridge'

import {
  warpPlusErrorCallback,
  getFileName
} from '../util'

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

function compressImage (tempFilePath) {
  const dstPath = `${TEMP_PATH}/compressed/${Date.now()}_${getFileName(tempFilePath)}`
  return new Promise((resolve, reject) => {
    plus.nativeUI.showWaiting()
    plus.zip.compressImage({
      src: tempFilePath,
      dst: dstPath,
      overwrite: true
    }, () => {
      plus.nativeUI.closeWaiting()
      resolve(dstPath)
    }, (error) => {
      plus.nativeUI.closeWaiting()
      reject(error)
    })
  })
}

export function chooseImage ({
  count,
  sizeType,
  sourceType
} = {}, callbackId) {
  const errorCallback = warpPlusErrorCallback(callbackId, 'chooseImage', 'cancel')

  function successCallback (paths) {
    const tempFiles = []
    const tempFilePaths = []
    // plus.zip.compressImage 压缩文件并发调用在iOS端容易出现问题（图像错误、闪退），改为队列执行
    paths.reduce((promise, path) => {
      return promise.then(() => {
        return getFileInfo(path)
      }).then(fileInfo => {
        const size = fileInfo.size
        // 压缩阈值 0.5 兆
        const THRESHOLD = 1024 * 1024 * 0.5
        // 判断是否需要压缩
        if (sizeType.includes('compressed') && size > THRESHOLD) {
          return compressImage(path).then(dstPath => {
            path = dstPath
            return getFileInfo(path)
          })
        }
        return fileInfo
      }).then(({ size }) => {
        tempFilePaths.push(path)
        tempFiles.push({
          path,
          size
        })
      })
    }, Promise.resolve()).then(() => {
      invoke(callbackId, {
        errMsg: 'chooseImage:ok',
        tempFilePaths,
        tempFiles
      })
    }).catch(errorCallback)
  }

  function openCamera () {
    const camera = plus.camera.getCamera()
    camera.captureImage(path => successCallback([path]),
      errorCallback, {
        filename: TEMP_PATH + '/camera/',
        resolution: 'high'
      })
  }

  function openAlbum () {
    plus.gallery.pick(({ files }) => successCallback(files), errorCallback, {
      maximum: count,
      multiple: true,
      system: false,
      filename: TEMP_PATH + '/gallery/',
      permissionAlert: true
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
