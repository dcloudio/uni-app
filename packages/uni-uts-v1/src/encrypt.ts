import path, { join, relative } from 'path'
import fs from 'fs-extra'
import { APP_PLATFORM } from './manifest/utils'

export function isEncrypt(pluginDir: string) {
  return fs.existsSync(path.resolve(pluginDir, 'encrypt'))
}

export async function compileEncrypt(pluginDir: string) {
  const inputDir = process.env.UNI_INPUT_DIR
  const outputDir = process.env.UNI_OUTPUT_DIR
  const utsPlatform = process.env.UNI_UTS_PLATFORM as APP_PLATFORM
  const pluginRelativeDir = relative(inputDir, pluginDir)
  if (process.env.NODE_ENV !== 'development') {
    // 复制插件目录
    fs.copySync(pluginDir, join(outputDir, pluginRelativeDir))
  } else {
    // 读取缓存目录的 js code
    const cacheDir = process.env.HX_DEPENDENCIES_DIR!
    const indexJsPath = resolveJsCodeCacheFilename(
      utsPlatform,
      cacheDir,
      pluginRelativeDir
    )
    if (!fs.existsSync(indexJsPath)) {
      return console.error(
        `uts插件[${path.dirname(pluginDir)}]不存在，请重新云打包`
      )
    }
    return {
      code: fs.readFileSync(indexJsPath, 'utf-8'),
      deps: [] as string[],
    }
  }
  return
}

export function resolveJsCodeCacheFilename(
  platform: APP_PLATFORM,
  cacheDir: string,
  pluginRelativeDir: string
) {
  return join(cacheDir, platform, 'uts', pluginRelativeDir, 'index.js')
}
