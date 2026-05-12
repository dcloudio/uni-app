import path from 'path'

import {
  isUniAppXAndroidJsEngine,
  isUniAppXIOS,
} from '@dcloudio/uni-cli-shared'

export function resolveSourceMapDirByCacheDir() {
  return path.resolve(process.env.UNI_APP_X_CACHE_DIR, 'sourcemap')
}

export function shouldMoveSourceMapFromCache() {
  return (
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_APP_X_CACHE_DIR &&
    process.env.NODE_ENV !== 'development' &&
    (isUniAppXIOS() || isUniAppXAndroidJsEngine())
  )
}
