import {
  invoke
} from '../../bridge'

import {
  TEMP_PATH
} from '../constants'

/**
 * 5+错误对象转换为错误消息
 * @param {*} error 5+错误对象
 */
function toErrMsg (error) {
  var msg = 'base64ToTempFilePath:fail'
  if (error && error.message) {
    msg += ` ${error.message}`
  } else if (error) {
    msg += ` ${error}`
  }
  return msg
}

export function base64ToTempFilePath ({
  base64Data,
  x,
  y,
  width,
  height,
  destWidth,
  destHeight,
  canvasId,
  fileType,
  quality
} = {}, callbackId) {
  var id = Date.now()
  var bitmap = new plus.nativeObj.Bitmap(`bitmap${id}`)
  bitmap.loadBase64Data(base64Data, function () {
    var formats = ['jpg', 'png']
    var format = String(fileType).toLowerCase()
    if (formats.indexOf(format) < 0) {
      format = 'png'
    }
    /**
         * 保存配置
         */
    var saveOption = {
      overwrite: true,
      quality: typeof quality === 'number' ? quality * 100 : 100,
      format
    }
    /**
         * 保存文件路径
         */
    var tempFilePath = `${TEMP_PATH}/canvas/${id}.${format}`

    bitmap.save(tempFilePath, saveOption, function () {
      clear()
      invoke(callbackId, {
        tempFilePath,
        errMsg: 'base64ToTempFilePath:ok'
      })
    }, function (error) {
      clear()
      invoke(callbackId, {
        errMsg: toErrMsg(error)
      })
    })
  }, function (error) {
    clear()
    invoke(callbackId, {
      errMsg: toErrMsg(error)
    })
  })

  function clear () {
    bitmap.clear()
  }
}
