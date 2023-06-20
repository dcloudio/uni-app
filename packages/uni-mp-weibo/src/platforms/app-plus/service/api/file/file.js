import {
  warpPlusMethod,
  warpPlusErrorCallback,
  getExtName
} from '../util'

import {
  invoke
} from '../../bridge'

const SAVED_DIR = 'uniapp_save'
const SAVE_PATH = `_doc/${SAVED_DIR}`

function getSavedFileDir (success, fail) {
  fail = fail || function () { }
  plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => { // 请求_doc fs
    fs.root.getDirectory(SAVED_DIR, { // 获取文件保存目录对象
      create: true
    }, success, fail)
  }, fail)
}

let index = 0
export function saveFile ({
  tempFilePath
} = {}, callbackId) {
  const errorCallback = warpPlusErrorCallback(callbackId, 'saveFile')
  const fileName = `${Date.now()}${index++}${getExtName(tempFilePath)}`

  plus.io.resolveLocalFileSystemURL(tempFilePath, entry => { // 读取临时文件 FileEntry
    getSavedFileDir(dir => {
      entry.copyTo(dir, fileName, () => { // 复制临时文件 FileEntry，为了避免把相册里的文件删除，使用 copy，微信中是要删除临时文件的
        const savedFilePath = SAVE_PATH + '/' + fileName
        invoke(callbackId, {
          errMsg: 'saveFile:ok',
          savedFilePath
        })
      }, errorCallback)
    }, errorCallback)
  }, errorCallback)
}

export function getSavedFileList (options, callbackId) {
  const errorCallback = warpPlusErrorCallback(callbackId, 'getSavedFileList')

  getSavedFileDir(entry => {
    var reader = entry.createReader()

    var fileList = []
    reader.readEntries(entries => {
      if (entries && entries.length) {
        entries.forEach(entry => {
          entry.getMetadata(meta => {
            fileList.push({
              filePath: plus.io.convertAbsoluteFileSystem(entry.fullPath),
              createTime: meta.modificationTime.getTime(),
              size: meta.size
            })
            if (fileList.length === entries.length) {
              invoke(callbackId, {
                errMsg: 'getSavedFileList:ok',
                fileList
              })
            }
          }, errorCallback, false)
        })
      } else {
        invoke(callbackId, {
          errMsg: 'getSavedFileList:ok',
          fileList
        })
      }
    }, errorCallback)
  }, errorCallback)
}

export const getFileInfo = warpPlusMethod('io', 'getFileInfo')

export function getSavedFileInfo ({
  filePath
} = {}, callbackId) {
  const errorCallback = warpPlusErrorCallback(callbackId, 'getSavedFileInfo')

  plus.io.resolveLocalFileSystemURL(filePath, entry => {
    entry.getMetadata(meta => {
      invoke(callbackId, {
        createTime: meta.modificationTime.getTime(),
        size: meta.size,
        errMsg: 'getSavedFileInfo:ok'
      })
    }, errorCallback, false)
  }, errorCallback)
}

export function removeSavedFile ({
  filePath
} = {}, callbackId) {
  const errorCallback = warpPlusErrorCallback(callbackId, 'removeSavedFile')

  plus.io.resolveLocalFileSystemURL(filePath, entry => {
    entry.remove(() => {
      invoke(callbackId, {
        errMsg: 'removeSavedFile:ok'
      })
    }, errorCallback)
  }, errorCallback)
}
