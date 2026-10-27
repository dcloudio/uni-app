import type { FileSystemManagerState } from './file-system-manager-state.ts'

export type BasicSyncActions = {
  writeFileSyncTest : (_ : any) => void
  readFileSyncTest : () => void
  unlinkSyncTest : () => void
  mkdirSyncTest : () => void
  rmdirSyncTest : () => void
  readDirSyncTest : () => void
  copyFileSyncTest : () => void
  // #ifndef MP-ALIPAY
  accessFileSyncTest : () => void
  renameFileSync : () => void
  appendFileSyncTest : (_ : any) => void
  statFileInfoSyncTest : (_ : any) => void
  // #endif
}

export const createBasicSyncActions = (data : FileSystemManagerState) : BasicSyncActions => {
  const writeFileSyncTest = (_ : any) => {
    try {
      const fileManager = uni.getFileSystemManager()
      fileManager.writeFileSync(`${data.basePath}${data.writeFile}`, data.writeFileContent, data.writeFileEncoding)
      if (data.logAble) {
        data.log += 'writeFileSyncTest success:' + '\n\n'
      }
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'writeFileSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }

  }
  const readFileSyncTest = () => {
    try {
      const fileManager = uni.getFileSystemManager()
      let result = fileManager.readFileSync(
        `${data.basePath}${data.readFile}`,
        data.readFileEncoding)
      if (data.logAble) {
        data.log += 'readFileSyncTest result:' + result + '\n\n'
      }
      data.done = true
      data.readFileRet = result.toString()
    } catch (e) {
      if (data.logAble) {
        data.log += 'readFileSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }

  }
  const unlinkSyncTest = () => {
    try {
      const fileManager = uni.getFileSystemManager()
      fileManager.unlinkSync(
        `${data.basePath}${data.unlinkFile}`)
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'unlinkSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  const mkdirSyncTest = () => {
    // 准备测试数据
    try {
      const fileManager = uni.getFileSystemManager()
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, data.recursiveVal)
      data.done = true
    } catch (e) {
      data.done = true
      if (data.logAble) {
        data.log += 'mkdirSyncTest fail:' + e + '\n\n'
      }
    }

  }
  const rmdirSyncTest = () => {
    try {
      const fileManager = uni.getFileSystemManager()
      fileManager.rmdirSync(
        `${data.basePath}${data.rmDirFile}`,
        data.recursiveVal)
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  const readDirSyncTest = () => {
    try {
      const fileManager = uni.getFileSystemManager()
      let res = fileManager.readdirSync(
        `${data.basePath}${data.readDir}`)
      if (data.logAble) {
        data.log += 'readDirTest success:' + JSON.stringify(res) + '\n\n'
      }
      if (res != null) {
        data.fileListSuccess = res
      }
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  // #ifndef MP-ALIPAY
  const accessFileSyncTest = () => {
    data.accessFileRet = ''
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.accessSync(`${data.basePath}${data.accessFile}`)
      data.done = true
      data.accessFileRet = 'access:ok'
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  const renameFileSync = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.renameSync(`${data.basePath}${data.renameFromFile}`,
        `${data.basePath}${data.renameToFile}`)
      data.done = true
      data.renameFileRet = "rename:ok"

    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      console.log('renameSync:' + e)
      data.done = true
    }
  }
  // #endif
  const copyFileSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.copyFileSync(
        `${data.basePath}${data.copyFromFile}`,
        `${data.copyToBasePath}${data.copyToFile}`)
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  // #ifndef MP-ALIPAY
  const appendFileSyncTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.appendFileSync(
        `${data.basePath}${data.writeFile}`,
        data.appendFileContent,
        data.writeFileEncoding)
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  // #endif

  // #ifndef MP-ALIPAY
  const statFileInfoSyncTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    try {
      let res = fileManager.statSync(
        // path: `${data.basePath}${data.statFile}`, //USER_DATA_PATH
        `${data.globalTempPath}${data.statFile}`, //CACHE_PATH
        data.recursiveVal)
      if (data.logAble) {
        data.log += 'statFileInfoSyncTest success:' + JSON.stringify(res) + '\n\n'
      }
      data.statsRet = res
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'statFileInfoSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }

  }
  // #endif
  return {
    writeFileSyncTest,
    readFileSyncTest,
    unlinkSyncTest,
    mkdirSyncTest,
    rmdirSyncTest,
    readDirSyncTest,
    copyFileSyncTest,
    // #ifndef MP-ALIPAY
    accessFileSyncTest,
    renameFileSync,
    appendFileSyncTest,
    statFileInfoSyncTest,
    // #endif
  }
}
