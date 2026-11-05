/**
 * FileSystemManager 系列演示页面的共享工具。
 * 页面保持自包含，仅复用此处的沙盒路径与同步准备/清理逻辑。
 */

/**
 * 根目录 key 转换为实际路径。
 * MP 平台 uni.env 路径不带尾斜杠，与旧示例保持一致统一补 '/'；
 * APP 平台 uni.env 路径自带尾斜杠（沿用旧示例约定）。
 */
export function getFsmRootPath(key : string) : string {
  // #ifdef MP
  if (key == 'usr') {
    return uni.env.USER_DATA_PATH + '/'
  }
  if (key == 'cache') {
    return uni.env.CACHE_PATH || ''
  }
  if (key == 'sandbox') {
    return uni.env.SANDBOX_PATH || ''
  }
  return ''
  // #endif
  // #ifndef MP
  if (key == 'usr') {
    return uni.env.USER_DATA_PATH
  }
  if (key == 'cache') {
    return uni.env.CACHE_PATH
  }
  if (key == 'sandbox') {
    return uni.env.SANDBOX_PATH
  }
  return ''
  // #endif
}

/**
 * 确保目录存在（递归创建，已存在时静默）。
 */
export function ensureFsmDirSync(dirPath : string) : void {
  const fileManager = uni.getFileSystemManager()
  try {
    fileManager.accessSync(dirPath)
    return
  } catch (e) {
    // 目录不存在，继续创建
  }
  try {
    fileManager.mkdirSync(dirPath, true)
  } catch (e) {
    console.error('ensureFsmDirSync fail', e)
  }
}

/**
 * 覆盖写入文件（同步），失败静默（演示页准备数据用）。
 */
export function ensureFsmFileSync(filePath : string, content : string, encoding : string = 'utf-8') : void {
  const fileManager = uni.getFileSystemManager()
  try {
    fileManager.writeFileSync(filePath, content, encoding)
  } catch (e) {
    console.error('ensureFsmFileSync fail', e)
  }
}

/**
 * 删除文件或目录（先按文件删，失败再按目录递归删），不存在时静默。
 */
export function removeFsmPathSync(path : string, recursive : boolean = true) : void {
  const fileManager = uni.getFileSystemManager()
  try {
    fileManager.accessSync(path)
  } catch (e) {
    return
  }
  try {
    fileManager.unlinkSync(path)
  } catch (e) {
    try {
      fileManager.rmdirSync(path, recursive)
    } catch (e2) {
      console.error('removeFsmPathSync fail', e2)
    }
  }
}

/**
 * 按目录删除（递归），不存在时静默。演示页的演示根目录均为目录，统一使用本方法，
 * 避免对目录执行 unlinkSync 产生可预期的异常路径。
 */
export function removeFsmDirSync(dirPath : string) : void {
  const fileManager = uni.getFileSystemManager()
  try {
    fileManager.accessSync(dirPath)
  } catch (e) {
    return
  }
  try {
    fileManager.rmdirSync(dirPath, true)
  } catch (e) {
    console.error('removeFsmDirSync fail', e)
  }
}

/**
 * 覆盖写入 ArrayBuffer（同步），失败静默（演示页准备数据用）。
 */
export function ensureFsmFileBufferSync(filePath : string, buffer : ArrayBuffer) : void {
  const fileManager = uni.getFileSystemManager()
  try {
    fileManager.writeFileSync(filePath, buffer, 'utf-8')
  } catch (e) {
    console.error('ensureFsmFileBufferSync fail', e)
  }
}

/**
 * 安全解析整数（UTS 的 || 仅支持 boolean，不能用 truthy 模式兜底）
 */
export function parseIntSafe(text : string) : number {
  const n = parseInt(text)
  if (n.toString() == 'NaN') {
    return 0
  }
  return n
}

/**
 * 默认演示错误对象（初始态）。
 */
export function createFsmMockError() : UniError {
  return new UniError('uni-file-manager', 1300000, 'mock error')
}
