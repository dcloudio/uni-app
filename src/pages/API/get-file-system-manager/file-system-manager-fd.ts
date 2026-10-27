import type { FileSystemManagerState } from './file-system-manager-state.ts'

export type FdActions = {
  // #ifndef MP-ALIPAY
  openFileTest : () => void
  openFileSyncTest : (param : string, isTest : boolean) => string
  closeSyncTest : () => void
  closeTest : () => void
  writeTest : () => void
  writeSyncTest : () => void
  fstatTest : () => void
  fstatSyncTest : () => void
  ftruncateFileTest : () => void
  ftruncateFileSyncTest : () => void
  readZipEntry : () => void
  // #endif
}

export const createFdActions = (data : FileSystemManagerState) : FdActions => {
  // #ifndef MP-ALIPAY
  const openFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    const options : OpenFileOptions = {
      filePath: `${data.basePath}${data.readFile}`,
      flag: "a",
      success: (res : OpenFileSuccessResult) => {
        if (data.logAble) {
          data.log += 'openFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
        data.fd = res.fd
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'openFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }
    }
    fileManager.open(options)
  }
  const openFileSyncTest = (param : string, isTest : boolean) : string => {
    const fileManager = uni.getFileSystemManager()
    try {
      const options : OpenFileSyncOptions = {
        filePath: `${data.basePath}${data.readFile}`,
        flag: param,
      }
      let fd = fileManager.openSync(options)
      if (data.logAble && isTest) {
        data.log += 'openFileSyncTest success:' + fd + '\n\n'
      }
      if (isTest) {
        data.done = true
      }

      data.fd = fd
      return fd
    } catch (e) {
      if (data.logAble) {
        data.log += 'openFileSyncTest fail:' + JSON.stringify(e) + '\n\n'
      }
      console.log('fail', e)
      data.done = true
    }
    return ""
  }
  const closeSyncTest = () => {
    console.log('closeSyncTest')
    const fileManager = uni.getFileSystemManager()
    try {
      console.log('closeSync')
      const options : CloseSyncOptions = {
        fd: openFileSyncTest('r', false)
      }
      fileManager.closeSync(options)
      if (data.logAble) {
        data.log += 'closeSyncTest success:' + '\n\n'
      }
      data.done = true
      data.closeFileRet = "close:ok"
    } catch (e) {
      if (data.logAble) {
        data.log += 'closeSyncTest fail:' + JSON.stringify(e) + '\n\n'
      }
      console.log('fail', e)
      data.done = true
    }
  }
  const closeTest = () => {
    const fileManager = uni.getFileSystemManager()
    const options : CloseOptions = {
      fd: openFileSyncTest('r', false),
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'closeTest success:' + JSON.stringify(res) + '\n\n'
        }
        data.closeFileRet = res.errMsg
        console.log("success", res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'closeTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }

    }
    fileManager.close(options)
  }
  const writeTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, true)
    } catch (e) {
      console.log(`mkdirSync fail:${e}`)
    }

    const options : WriteOptions = {
      fd: openFileSyncTest('w+', false),
      data: data.writeData,
      encoding: "utf-8",
      success: (res : WriteResult) => {
        if (data.logAble) {
          data.log += 'writeTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
        data.bytesWritten = res.bytesWritten
        data.lastFailError = new UniError('uni-fileSystemManager', 0, 'writeTest success:' + JSON.stringify(res))
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'writeTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, 'writeTest:' + res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }

    }
    fileManager.write(options)
  }
  const writeSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, true)
    } catch (e) {
      console.log(`mkdirSync fail:${e}`)
    }
    const options : OpenFileOptions = {
      filePath: `${data.basePath}${data.readFile}`,
      flag: "r+",
      success: (res : OpenFileSuccessResult) => {
        console.log("success", res)
        if (res.fd.length <= 0) {
          data.done = true
          return
        }
        try {
          const writeOptions : WriteSyncOptions = {
            fd: res.fd,
            data: data.writeData,
            encoding: "utf-8"
          }
          let ret = fileManager.writeSync(writeOptions)
          if (data.logAble) {
            data.log += 'writeSyncTest success:' + JSON.stringify(ret) + '\n\n'
          }
          console.log("success", ret)
          data.done = true
          data.bytesWritten = ret.bytesWritten
        } catch (e) {
          if (data.logAble) {
            data.log += 'writeSyncTest fail:' + JSON.stringify(e) + '\n\n'
          }
          console.log('fail', e)
          data.done = true
        }
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'openFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        data.done = true
      }
    }
    fileManager.open(options)

  }
  const fstatTest = () => {
    const fileManager = uni.getFileSystemManager()
    const options : FStatOptions = {
      fd: openFileSyncTest('r', false),
      success: (res : FStatSuccessResult) => {
        if (data.logAble) {
          data.log += 'fstatTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
        data.fstat = res.stats
        data.fstatSize = res.stats.size
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'fstatTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }

    }
    fileManager.fstat(options)
  }
  const fstatSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      const options : FStatSyncOptions = {
        fd: openFileSyncTest('r', false),
      }
      let stat = fileManager.fstatSync(options)
      if (data.logAble) {
        data.log += 'fstatSyncTest success:' + JSON.stringify(stat) + '\n\n'
      }
      data.done = true
      data.fstat = stat
      data.fstatSize = stat.size
    } catch (e) {
      if (data.logAble) {
        data.log += 'fstatSyncTest fail:' + JSON.stringify(e) + '\n\n'
      }
      data.done = true
    }
  }
  const ftruncateFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    const options : FTruncateFileOptions = {
      fd: openFileSyncTest('r+', false),
      length: 6,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'ftruncateFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        data.ftruncateRet = res.errMsg
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'ftruncateFileTest fail:' + JSON.stringify(res) + '\n\n'
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
    fileManager.ftruncate(options)
  }
  const ftruncateFileSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      const options : FTruncateFileSyncOptions = {
        fd: openFileSyncTest('r+', false),
        length: 4
      }
      fileManager.ftruncateSync(options)
      if (data.logAble) {
        data.log += 'ftruncateFileSyncTest success:' + '\n\n'
      }
      data.done = true
      data.ftruncateRet = 'ftruncate:ok'
    } catch (e) {
      if (data.logAble) {
        data.log += 'ftruncateFileSyncTest fail:' + JSON.stringify(e) + '\n\n'
      }
      data.done = true
    }
  }
  const readZipEntry = () => {
    const fileManager = uni.getFileSystemManager()
    data.zipEntryNames = []
    const options : ReadZipEntryOptions = {
      filePath: '/static/filemanager/to.zip',
      encoding: 'utf-8',
      success: (res : EntriesResult) => {
        if (data.logAble) {
          data.log += 'readZipEntry success:size=' + res.result + '\n\n'
        }
        console.log("success", res)
        // #ifdef (APP-ANDROID && !VUE3-VAPOR) || APP-HARMONY
        res.entries.forEach((_ : ZipFileItem, key : string) => {
          data.zipEntryNames.push(key)
        })
        // #endif
        // #ifndef (APP-ANDROID && !VUE3-VAPOR) && APP-HARMONY
        Object.keys(res.result as UTSJSONObject).forEach((key : string) => {
          data.zipEntryNames.push(key)
        })
        // #endif
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'readZipEntry fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }
    }
    fileManager.readZipEntry(options)
  }
  // #endif

  return {
    // #ifndef MP-ALIPAY
    openFileTest,
    openFileSyncTest,
    closeSyncTest,
    closeTest,
    writeTest,
    writeSyncTest,
    fstatTest,
    fstatSyncTest,
    ftruncateFileTest,
    ftruncateFileSyncTest,
    readZipEntry,
    // #endif
  }
}
