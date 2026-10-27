import type { FileSystemManagerState } from './file-system-manager-state.ts'

export type BasicAsyncActions = {
  statFileInfoTest : (_ : any) => void
  copyFileTest : () => void
  renameFileTest : () => void
  readDirTest : () => void
  writeFileTest : (_ : any) => void
  readFileTest : () => void
  rmdirTest : () => void
  mkdirTest : () => void
  accessFileTest : () => void
  unlinkTest : () => void
  unlinkAllFileTest : () => void
  copyStaticToFilesTest : () => void
  // #ifndef MP-ALIPAY
  appendFileTest : (_ : any) => void
  // #endif
}

export const createBasicAsyncActions = (data : FileSystemManagerState) : BasicAsyncActions => {
  const statFileInfoTest = (_ : any) => {
    data.statsMethodError = ''
    const fileManager = uni.getFileSystemManager()
    const options : StatOptions = {
      path: `${data.basePath}${data.statFile}`, //USER_DATA_PATH
      // path: `${data.globalTempPath}${data.statFile}`, //CACHE_PATH
      recursive: data.recursiveVal,
      success: (res : StatSuccessResult) => {
        if (data.logAble) {
          data.log += 'statFileInfoTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('statFileInfoTest success', res)
        data.statsRet = res.stats
        console.log('data.statsRet', data.statsRet)
        // #ifdef APP-ANDROID
        const statsIsFileRet : boolean[] = []
        const statsIsDirectoryRet : boolean[] = []
        for (let i = 0; i < res.stats.length; i++) {
          try {
            statsIsFileRet.push(res.stats[i].stats.isFile())
            statsIsDirectoryRet.push(res.stats[i].stats.isDirectory())
          } catch (e) {
            data.statsMethodError += `stats[${i}] isFile/isDirectory error: ` + e + '\n'
            if (data.logAble) {
              data.log += 'statFileInfoTest statsMethod fail:' + e + '\n\n'
            }
          }
        }
        data.statsIsFileRet = statsIsFileRet
        data.statsIsDirectoryRet = statsIsDirectoryRet
        // #endif
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'statFileInfoTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('statFileInfoTest fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        console.log("statFileInfoTest complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    }
    fileManager.stat(options)
  }

  const copyFileTest = () => {
    const fileManager = uni.getFileSystemManager()

    const options : CopyFileOptions = {
      srcPath: `${data.basePath}${data.copyFromFile}`,
      destPath: `${data.copyToBasePath}${data.copyToFile}`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'copyFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'copyFileTest fail:' + JSON.stringify(res) + '\n\n'
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
    fileManager.copyFile(options)
  }

  const renameFileTest = () => {
    const fileManager = uni.getFileSystemManager()

    const options : RenameOptions = {
      oldPath: `${data.basePath}${data.renameFromFile}`,
      newPath: `${data.basePath}${data.renameToFile}`,
      success: (res) => {
        if (data.logAble) {
          data.log += 'renameFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        data.renameFileRet = "rename:ok"
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'renameFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        data.done = true
        console.log("complete", res)
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    }
    fileManager.rename(options)
  }

  const readDirTest = () => {
    const fileManager = uni.getFileSystemManager()
    const options : ReadDirOptions = {
      dirPath: `${data.basePath}${data.readDir}`,
      success: (res : ReadDirSuccessResult) => {
        if (data.logAble) {
          data.log += 'readDirTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
        data.fileListSuccess = res.files
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'readDirTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        } else {
          data.fileListComplete = (res as ReadDirSuccessResult).files
        }
      }
    }
    fileManager.readdir(options)
  }

  const writeFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()

    const options : WriteFileOptions = {
      filePath: `${data.basePath}${data.writeFile}`,
      data: data.writeFileContent,
      encoding: data.writeFileEncoding,
      success: (res) => {
        if (data.logAble) {
          data.log += 'writeFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'writeFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail')
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        data.done = true
        console.log("complete")
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }

      }
    }
    fileManager.writeFile(options)
  }

  const readFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    const options : ReadFileOptions = {
      filePath: `${data.basePath}${data.readFile}`,
      encoding: data.readFileEncoding,
      success: (res : ReadFileSuccessResult) => {
        if (data.logAble) {
          data.log += 'readFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
        data.readFileRet = res.data.toString()
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'readFileTest fail:' + JSON.stringify(res) + '\n\n'
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
    fileManager.readFile(options)
  }

  const rmdirTest = () => {
    const fileManager = uni.getFileSystemManager()
    const options : RmDirOptions = {
      dirPath: `${data.basePath}${data.rmDirFile}`,
      recursive: data.recursiveVal,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'rmdirTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'rmdirTest fail:' + JSON.stringify(res) + '\n\n'
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
    fileManager.rmdir(options)
  }

  const mkdirTest = () => {
    // 准备测试数据
    const fileManager = uni.getFileSystemManager()

    const options : MkDirOptions = {
      dirPath: `${data.basePath}${data.mkdirFile}`,
      recursive: data.recursiveVal,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'mkdirTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'mkdirTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
        data.done = true
        console.log("complete", res)
      }
    }
    fileManager.mkdir(options)

  }
  const accessFileTest = () => {
    data.accessFileRet = ''
    const fileManager = uni.getFileSystemManager()
    const options : AccessOptions = {
      path: `${data.basePath}${data.accessFile}`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'accessFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
        data.accessFileRet = res.errMsg
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'accessFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
        console.log("complete", res)
        data.done = true
      }
    }
    fileManager.access(options)

  }
  const unlinkTest = () => {
    const fileManager = uni.getFileSystemManager()

    const options : UnLinkOptions = {
      filePath: `${data.basePath}${data.unlinkFile}`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'unlinkTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'unlinkTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
        console.log("complete", res)
        data.done = true
      }
    }
    fileManager.unlink(options)
  }
  const unlinkAllFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    const readDirOptions : ReadDirOptions = {
      dirPath: `${data.basePath}${data.rmDirFile}`,
      success: (res : ReadDirSuccessResult) => {
        console.log("success to readdir", res)
        let completedCount = 0
        const fileCount = res.files.length
        if (fileCount == 0) {
          data.done = true
        }
        res.files.forEach(element => {
          console.log(element)
          let filePath : string
          if (data.rmDirFile.length <= 0) {
            filePath = `${data.basePath}${element}`
          } else {
            filePath = `${data.basePath}${data.rmDirFile}/${element}`
          }
          const unlinkOptions : UnLinkOptions = {
            filePath: filePath,
            success: (res : FileManagerSuccessResult) => {
              if (data.logAble) {
                data.log += 'unlinkAllFileTest success:' + JSON.stringify(res) + '\n\n'
              }
              console.log('success unlink', res)
            },
            fail: (res : IUniError) => {
              if (data.logAble) {
                data.log += 'unlinkAllFileTest fail:' + JSON.stringify(res) + '\n\n'
              }
              console.log('fail unlink', res)
              data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

            },
            complete: (res : any) => {
              if (res instanceof UniError) {
                data.lastCompleteError = res
              }
              console.log("complete unlink", res)
              completedCount++
              if (completedCount == fileCount) {
                data.done = true
              }
            }
          }
          fileManager.unlink(unlinkOptions)
        });
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'unlinkAllFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail to readdir', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        console.log("complete readdir", res)
        if (res instanceof UniError) {
          data.lastCompleteError = res
          data.done = true
        } else {
          data.fileListComplete = (res as ReadDirSuccessResult).files
          data.fileListSuccess = (res as ReadDirSuccessResult).files
        }
      }
    }
    fileManager.readdir(readDirOptions)
  }
  const copyStaticToFilesTest = () => {
    const fileManager = uni.getFileSystemManager()

    const options : CopyFileOptions = {
      srcPath: "/static/list-mock/mock.json",
      destPath: `${data.copyToBasePath}/a/mock.json`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'copyFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'copyFileTest fail:' + JSON.stringify(res) + '\n\n'
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
    fileManager.copyFile(options)
  }
  //start
  // #ifndef MP-ALIPAY
  const appendFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    const options : AppendFileOptions = {
      filePath: `${data.basePath}${data.writeFile}`,
      data: data.appendFileContent,
      encoding: data.writeFileEncoding,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'appendFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'appendFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail')
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        data.done = true
        console.log("complete")
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }

      }
    }
    fileManager.appendFile(options)
  }
  // #endif
  return {
    statFileInfoTest,
    copyFileTest,
    renameFileTest,
    readDirTest,
    writeFileTest,
    readFileTest,
    rmdirTest,
    mkdirTest,
    accessFileTest,
    unlinkTest,
    unlinkAllFileTest,
    copyStaticToFilesTest,
    // #ifndef MP-ALIPAY
    appendFileTest,
    // #endif
  }
}
