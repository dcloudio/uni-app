import type { FileSystemManagerState } from './file-system-manager-state.ts'

export type StorageActions = {
  unzipFileTest : (_ : any) => void
  unzipFileSyncTest : (_ : any) => void
  // #ifndef MP-ALIPAY
  saveFileTest : (_ : any) => void
  saveFileAndReadFileTest : (_ : any) => void
  saveFileTest1 : (_ : any) => void
  saveFileTest2 : (_ : any) => void
  saveFileTest3 : (_ : any) => void
  saveFileSyncTest : (_ : any) => void
  getSavedFileListTest : () => void
  truncateFileTest : () => void
  truncateFileSyncTest : () => void
  readCompressedFileTest : () => void
  readCompressedFileSyncTest : () => void
  removeSavedFileTest : () => void
  // #endif
}

export const createStorageActions = (data : FileSystemManagerState, writeFileSyncTest : (event : any) => void) : StorageActions => {
  // #ifndef MP-ALIPAY
  const saveFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    writeFileSyncTest("")
    data.done = false
    const options : SaveFileOptions = {
      tempFilePath: `${data.basePath}${data.temFile}`,
      success: (res : SaveFileSuccessResult) => {
        if (data.logAble) {
          data.log += 'saveFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
        data.saveFileRet = res.savedFilePath
        data.done = true
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'saveFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('saveFileTest fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        data.done = true
      },
      complete: (_) => {
        data.done = true
      }
    }
    fileManager.saveFile(options)
  }

  const saveFileAndReadFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    writeFileSyncTest("")
    data.done = false

    const options : SaveFileOptions = {
      tempFilePath: `${data.basePath}${data.temFile}`,
      success: (res : SaveFileSuccessResult) => {
        if (data.logAble) {
          data.log += 'saveFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        const readOptions : ReadFileOptions = {
          encoding: 'utf-8',
          filePath: res.savedFilePath,
          success: (res : ReadFileSuccessResult) => {
            data.log += 'saveFileAndReadFileTest 成功:' + JSON.stringify(res.data) + '\n\n'
            console.log('success', res)
            data.readFileRet = 'saveFileAndReadFileTest:ok'
            data.done = true
          },
          fail: (err : IUniError) => {
            data.log += 'saveFileAndReadFileTest 失败:' + JSON.stringify(err.errMsg) + '\n\n'
            data.done = true
          }
        }
        fileManager.readFile(readOptions)

      },

      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'saveFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('saveFileTest fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        data.done = true
      },
      complete: (_) => {}
    }
    fileManager.saveFile(options)
  }

  const saveFileToTarget = (filePath : string) : void => {
    const fileManager = uni.getFileSystemManager()
    const saveOptions : SaveFileOptions = {
      tempFilePath: `${data.basePath}${data.temFile}`,
      filePath,
      success: (res : SaveFileSuccessResult) => {
        if (data.logAble) {
          data.log += 'saveFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
        data.saveFileRet = res.savedFilePath
        data.done = true
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'saveFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('saveFileTest fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
        data.done = true
      },
      complete: (_) => {
        data.done = true
      }
    }
    fileManager.saveFile(saveOptions)
  }

  const saveFileAfterLocalCleanup = (filePath : string) : void => {
    const fileManager = uni.getFileSystemManager()
    const localPath = `${data.basePath}local`
    const accessOptions : AccessOptions = {
      path: localPath,
      success: () => {
        try {
          if (fileManager.fstatSync({ fd: fileManager.openSync({ filePath: localPath, flag: "r" }) }).isDirectory()) {
            fileManager.rmdirSync(localPath, true)
          } else {
            fileManager.unlinkSync(localPath)
          }
        } finally {
          saveFileToTarget(filePath)
        }
      },
      fail: () => {
        saveFileToTarget(filePath)
      }
    }
    fileManager.access(accessOptions)
  }

  const saveFileTest1 = (_ : any) => {
    writeFileSyncTest("")
    data.done = false
    saveFileAfterLocalCleanup(`${data.basePath}local/1.txt`)
  }

  const saveFileTest2 = (_ : any) => {
    writeFileSyncTest("")
    data.done = false
    saveFileAfterLocalCleanup(`${data.basePath}local`)
  }

  const saveFileTest3 = (_ : any) => {
    writeFileSyncTest("")
    data.done = false
    saveFileAfterLocalCleanup(`${data.basePath}local/`)
  }
  const saveFileSyncTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    writeFileSyncTest("")
    data.done = false
    try {
      fileManager.saveFileSync(
        `${data.basePath}${data.temFile}`, null)
      data.done = true

      //todo 后面打开
      // data.saveFileRet=res
    } catch (e) {
      console.log('saveFileSyncTest:' + e)
      data.done = true
    }
  }
  // #endif
  const unzipFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    const targetPath = `${data.basePath}${data.targetZip}`
    const options : UnzipFileOptions = {
      zipFilePath: '/static/filemanager/to.zip',
      targetPath,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'unzipFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'unzipFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }
    }
    const startUnzip = () => {
      fileManager.unzip(options)
    }
    const accessOptions : AccessOptions = {
      path: targetPath,
      success: () => {
        startUnzip()
      },
      fail: () => {
        const mkdirOptions : MkDirOptions = {
          dirPath: targetPath,
          recursive: true,
          success: () => {
            startUnzip()
          },
          fail: (res : IUniError) => {
            if (data.logAble) {
              data.log += 'unzipFileTest mkdir fail:' + JSON.stringify(res) + '\n\n'
            }
            console.log('mkdir fail', res)
            data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
            data.done = true
          }
        }
        fileManager.mkdir(mkdirOptions)
      }
    }
    fileManager.access(accessOptions)
  }

  // #ifdef VUE3-VAPOR
  const unzipFileSyncTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    const targetPath = `${data.basePath}${data.targetZip}-sync`
    const options : UnzipSyncOptions = {
      zipFilePath: '/static/filemanager/to.zip',
      targetPath
    }
    data.readFileRet = ''
    try {
      // 确保测试从不存在的目标目录开始。
      try {
        fileManager.accessSync(targetPath)
        fileManager.rmdirSync(targetPath, true)
      } catch (_) {}

      try {
        fileManager.mkdirSync(targetPath, true)
      } catch(_){}
      const success = fileManager.unzipSync(options)
      if (!success) {
        throw new Error('unzipSync returned false')
      }
      const entries = fileManager.readdirSync(targetPath)
      if (!entries.includes('1.txt') || !entries.includes('2.txt')) {
        throw new Error(`unexpected entries: ${JSON.stringify(entries)}`)
      }
      const file1 = fileManager.readFileSync(`${targetPath}/1.txt`, 'utf-8').toString()
      const file2 = fileManager.readFileSync(`${targetPath}/2.txt`, 'utf-8').toString()
      if (file1 !== 'fdsafds' || file2 !== 'fdsafds') {
        throw new Error(`unexpected file contents: ${file1}, ${file2}`)
      }
      data.readFileRet = 'unzipFileSyncTest:ok'
      if (data.logAble) {
        data.log += `unzipFileSyncTest result:${success}\n\n`
      }
    } catch (e) {
      data.readFileRet = `unzipFileSyncTest:fail:${e}`
      if (data.logAble) {
        data.log += `unzipFileSyncTest fail:${e}\n\n`
      }
    } finally {
      data.done = true
    }
  }
  // #endif
  // #ifndef VUE3-VAPOR
  const unzipFileSyncTest = (_ : any) => {
    data.done = true
  }
  // #endif
  // #ifndef MP-ALIPAY
  const getSavedFileListTest = () => {
    const fileManager = uni.getFileSystemManager()
    const options : GetSavedFileListOptions = {
      success: (res : GetSavedFileListResult) => {
        if (data.logAble) {
          data.log += 'getSavedFileListTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("getSavedFileListTest success", res)
        data.fileListSuccess = res.fileList
        data.getSavedFileListRet = "getSavedFileList:ok"
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'getSavedFileListTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('getSavedFileListTest fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        data.getSavedFileListRet = JSON.stringify(res)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        } else {
          data.fileListComplete = (res as GetSavedFileListResult).fileList
        }
      }
    }
    fileManager.getSavedFileList(options)
  }
  // #endif
  // #ifndef MP-ALIPAY
  const truncateFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    const options : TruncateFileOptions = {
      filePath: `${data.basePath}${data.writeFile}`,
      length: 6,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'truncateFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'truncateFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    }
    fileManager.truncate(options)
  }
  const truncateFileSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.truncateSync(
        `${data.basePath}${data.writeFile}`,
        3)
      data.done = true
    } catch (e) {
      console.log(e)
      data.done = true
    }
  }
  const readCompressedFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    data.compressedFileRet = ''
    const options : ReadCompressedFileOptions = {
      filePath: '/static/filemanager/1.txt.br',
      compressionAlgorithm: "br",
      success: (res : ReadCompressedFileResult) => {
        if (data.logAble) {
          data.log += 'readCompressedFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
        data.compressedFileRet = res.data
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'readCompressedFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }
    }
    fileManager.readCompressedFile(options)
  }
  const readCompressedFileSyncTest = () => {
    console.log('readCompressedFileSyncTest')
    const fileManager = uni.getFileSystemManager()
    data.compressedFileRet = ''
    try {
      let result = fileManager.readCompressedFileSync(
        '/static/filemanager/1.txt.br',
        "br")
      if (data.logAble) {
        data.log += result
      }
      data.compressedFileRet = result
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'readCompressedFileSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }

  }
  // #endif
  // #ifndef MP-ALIPAY
  const removeSavedFileTest = () => {
    console.log("removeSavedFileTest enter")
    const fileManager = uni.getFileSystemManager()
    const options : RemoveSavedFileOptions = {
      filePath: `${data.basePath}${data.writeFile}`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'removeSavedFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        data.removeSavedFileRet = res.errMsg
        console.log("removeSavedFileTest success", res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'removeSavedFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('removeSavedFileTest fail', res)
      },
      complete: (_) => {
        data.done = true
      }
    }
    fileManager.removeSavedFile(options)
  }

  // #endif
  return {
    unzipFileTest,
    unzipFileSyncTest,
    // #ifndef MP-ALIPAY
    saveFileTest,
    saveFileAndReadFileTest,
    saveFileTest1,
    saveFileTest2,
    saveFileTest3,
    saveFileSyncTest,
    getSavedFileListTest,
    truncateFileTest,
    truncateFileSyncTest,
    readCompressedFileTest,
    readCompressedFileSyncTest,
    removeSavedFileTest,
    // #endif
  }
}
