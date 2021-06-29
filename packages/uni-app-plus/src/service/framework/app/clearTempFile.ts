import { TEMP_PATH, TEMP_PATH_BASE } from '../../api/constants'

// 统一处理路径
function getPath(path: string) {
  path = path.replace(/\/$/, '')
  return path.indexOf('_') === 0
    ? plus.io.convertLocalFileSystemURL(path)
    : path
}
export function clearTempFile() {
  const basePath = getPath(TEMP_PATH_BASE)
  const tempPath = getPath(TEMP_PATH)
  // 获取父目录
  const dirParts = tempPath.split('/')
  dirParts.pop()
  const dirPath = dirParts.join('/')
  plus.io.resolveLocalFileSystemURL(
    plus.io.convertAbsoluteFileSystem(dirPath),
    (entry) => {
      const reader = entry.createReader()
      reader.readEntries(function (entry) {
        // plus.d.ts 类型不对
        const entries = entry as unknown as PlusIoDirectoryEntry[]
        if (entries && entries.length) {
          entries.forEach(function (entry) {
            if (
              entry.isDirectory &&
              entry.fullPath!.indexOf(basePath) === 0 &&
              entry.fullPath!.indexOf(tempPath) !== 0
            ) {
              entry.removeRecursively()
            }
          })
        }
      })
    }
  )
}
