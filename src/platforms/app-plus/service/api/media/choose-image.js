import {
  TEMP_PATH
} from '../constants'

import {
  invoke
} from '../../bridge'

/**
 * 获取文件信息
 * @param {string} filePath 文件路径
 * @returns {Promise} 文件信息Promise
 */
function getFileInfo (filePath) {
  return new Promise((resolve, reject) => {
    plus.io.resolveLocalFileSystemURL(filePath, function (entry) {
      entry.getMetadata(function (meta) {
        resolve({
          size: meta.size
        })
      }, reject, false)
    }, reject)
  })
}

const invokeChooseImage = function (callbackId, type, sizeType, tempFilePaths = []) {
  if (!tempFilePaths.length) {
    invoke(callbackId, {
      code: sizeType,
      errMsg: `chooseImage:${type}`
    })
    return
  }
  var tempFiles = []
  // plus.zip.compressImage 压缩文件并发调用在iOS端容易出现问题（图像错误、闪退），改为队列执行
  tempFilePaths.reduce((promise, tempFilePath, index, array) => {
    return promise
      .then(() => {
        return getFileInfo(tempFilePath)
      })
      .then(fileInfo => {
        var size = fileInfo.size
        // 压缩阈值 0.5 兆
        var threshold = 1024 * 1024 * 0.5
        // 判断是否需要压缩
        if ((sizeType.indexOf('compressed') >= 0 && sizeType.indexOf('original') < 0) || (((
          sizeType.indexOf(
            'compressed') < 0 && sizeType.indexOf('original') < 0) || (sizeType
          .indexOf('compressed') >= 0 && sizeType.indexOf(
          'original') >= 0)) && size > threshold)) {
          return new Promise((resolve, reject) => {
            var dstPath = TEMP_PATH + '/compressed/' + Date.now() + (
              tempFilePath.match(/\.\S+$/) || [''])[0]
            plus.nativeUI.showWaiting()
            plus.zip.compressImage({
              src: tempFilePath,
              dst: dstPath,
              overwrite: true
            }, () => {
              resolve(dstPath)
            }, (error) => {
              reject(error)
            })
          })
            .then(dstPath => {
              array[index] = tempFilePath = dstPath
              return getFileInfo(tempFilePath)
            })
            .then(fileInfo => {
              return tempFiles.push({
                path: tempFilePath,
                size: fileInfo.size
              })
            })
        }
        return tempFiles.push({
          path: tempFilePath,
          size: size
        })
      })
  }, Promise.resolve())
    .then(() => {
      plus.nativeUI.closeWaiting()
      invoke(callbackId, {
        errMsg: `chooseImage:${type}`,
        tempFilePaths,
        tempFiles
      })
    }).catch(() => {
      plus.nativeUI.closeWaiting()
      invoke(callbackId, {
        errMsg: `chooseImage:${type}`
      })
    })
}
const openCamera = function (callbackId, sizeType) {
  const camera = plus.camera.getCamera()
  camera.captureImage(e => invokeChooseImage(callbackId, 'ok', sizeType, [e]),
    e => invokeChooseImage(callbackId, 'fail', 1), {
      filename: TEMP_PATH + '/camera/',
      resolution: 'high'
    })
}
const openAlbum = function (callbackId, sizeType, count) {
  // TODO Android 需要拷贝到 temp 目录
  plus.gallery.pick(e => invokeChooseImage(callbackId, 'ok', sizeType, e.files.map(file => {
    return file
  })), e => {
    invokeChooseImage(callbackId, 'fail', 2)
  }, {
    maximum: count,
    multiple: true,
    system: false,
    filename: TEMP_PATH + '/gallery/'
  })
}

export function chooseImage ({
  count = 9,
  sizeType = ['original', 'compressed'],
  sourceType = ['album', 'camera']
} = {}, callbackId) {
  let fallback = true
  if (sourceType.length === 1) {
    if (sourceType[0] === 'album') {
      fallback = false
      openAlbum(callbackId, sizeType, count)
    } else if (sourceType[0] === 'camera') {
      fallback = false
      openCamera(callbackId, sizeType)
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
    }, (e) => {
      switch (e.index) {
        case 0:
          invokeChooseImage(callbackId, 'fail', 0)
          break
        case 1:
          openCamera(callbackId, sizeType)
          break
        case 2:
          openAlbum(callbackId, sizeType, count)
          break
      }
    })
  }
}
