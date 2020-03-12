import {
  urlToFile
} from 'uni-platform/helpers/file'

const {
  invokeCallbackHandler: invoke
} = UniServiceJSBridge

export function getFileInfo ({
  filePath
} = {}, callbackId) {
  // TODO 计算文件摘要
  urlToFile(filePath).then((res) => {
    invoke(callbackId, {
      errMsg: 'getFileInfo:ok',
      size: res.size
    })
  }).catch((err) => {
    invoke(callbackId, {
      errMsg: 'getFileInfo:fail 文件[' +
        filePath +
        '] getFileInfo 失败:' + err.message
    })
  })
}
