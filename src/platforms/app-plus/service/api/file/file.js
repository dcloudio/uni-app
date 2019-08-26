import {
  getRealPath
} from '../util'

import {
  invoke
} from '../../bridge'

const SAVED_DIR = 'uniapp_save'
const SAVE_PATH = `_doc/${SAVED_DIR}`
const REGEX_FILENAME = /^.*[/]/

function getSavedFileDir (success, fail) {
  fail = fail || function () {}
  plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => { // 请求_doc fs
    fs.root.getDirectory(SAVED_DIR, { // 获取文件保存目录对象
      create: true
    }, dir => {
      success(dir)
    }, err => {
      fail('目录[' + SAVED_DIR + ']创建失败' + err.message)
    })
  }, err => {
    fail('目录[_doc]读取失败' + err.message)
  })
}

export function saveFile ({
  tempFilePath
} = {}, callbackId) {
  let fileName = tempFilePath.replace(REGEX_FILENAME, '')
  if (fileName) {
    let extName = ''
    if (~fileName.indexOf('.')) {
      extName = '.' + fileName.split('.').pop()
    }

    fileName = (+new Date()) + '' + extName

    plus.io.resolveLocalFileSystemURL(getRealPath(tempFilePath), entry => { // 读取临时文件 FileEntry
      getSavedFileDir(dir => {
        entry.copyTo(dir, fileName, () => { // 复制临时文件 FileEntry，为了避免把相册里的文件删除，使用 copy，微信中是要删除临时文件的
          const savedFilePath = SAVE_PATH + '/' + fileName
          invoke(callbackId, {
            errMsg: 'saveFile:ok',
            savedFilePath
          })
        }, err => {
          invoke(callbackId, {
            errMsg: 'saveFile:fail 保存文件[' + tempFilePath +
              '] copyTo 失败:' + err.message
          })
        })
      }, message => {
        invoke(callbackId, {
          errMsg: 'saveFile:fail ' + message
        })
      })
    }, err => {
      invoke(callbackId, {
        errMsg: 'saveFile:fail 文件[' + tempFilePath + ']读取失败' + err.message
      })
    })
  } else {
    return {
      errMsg: 'saveFile:fail 文件名[' + tempFilePath + ']不存在'
    }
  }
}

export function getSavedFileList (options, callbackId) {
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
          }, error => {
            invoke(callbackId, {
              errMsg: 'getSavedFileList:fail ' + error.message
            })
          }, false)
        })
      } else {
        invoke(callbackId, {
          errMsg: 'getSavedFileList:ok',
          fileList
        })
      }
    }, error => {
      invoke(callbackId, {
        errMsg: 'getSavedFileList:fail ' + error.message
      })
    })
  }, message => {
    invoke(callbackId, {
      errMsg: 'getSavedFileList:fail ' + message
    })
  })
}

export function getFileInfo ({
  filePath,
  digestAlgorithm = 'md5'
} = {}, callbackId) {
  // TODO 计算文件摘要
  plus.io.resolveLocalFileSystemURL(getRealPath(filePath), entry => {
    entry.getMetadata(meta => {
      invoke(callbackId, {
        errMsg: 'getFileInfo:ok',
        size: meta.size,
        digestAlgorithm: ''
      })
    }, err => {
      invoke(callbackId, {
        errMsg: 'getFileInfo:fail 文件[' +
          filePath +
          '] getMetadata 失败:' + err.message
      })
    })
  }, err => {
    invoke(callbackId, {
      errMsg: 'getFileInfo:fail 文件[' + filePath + ']读取失败:' + err.message
    })
  })
}

export function getSavedFileInfo ({
  filePath
} = {}, callbackId) {
  plus.io.resolveLocalFileSystemURL(getRealPath(filePath), entry => {
    entry.getMetadata(meta => {
      invoke(callbackId, {
        createTime: meta.modificationTime.getTime(),
        size: meta.size,
        errMsg: 'getSavedFileInfo:ok'
      })
    }, error => {
      invoke(callbackId, {
        errMsg: 'getSavedFileInfo:fail ' + error.message
      })
    }, false)
  }, () => {
    invoke(callbackId, {
      errMsg: 'getSavedFileInfo:fail file not find'
    })
  })
}

export function removeSavedFile ({
  filePath
} = {}, callbackId) {
  plus.io.resolveLocalFileSystemURL(getRealPath(filePath), entry => {
    entry.remove(() => {
      invoke(callbackId, {
        errMsg: 'removeSavedFile:ok'
      })
    }, err => {
      invoke(callbackId, {
        errMsg: 'removeSavedFile:fail 文件[' + filePath + ']删除失败:' + err.message
      })
    })
  }, () => {
    invoke(callbackId, {
      errMsg: 'removeSavedFile:fail file not find'
    })
  })
}
