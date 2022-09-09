import path from 'path'
import fs from 'fs-extra'
import type { parse, bundle, UtsTarget } from '@dcloudio/uts'
import { normalizePath } from '@dcloudio/uni-cli-shared'
import { camelize } from '@vue/shared'

export function getUtsCompiler(): {
  parse: typeof parse
  bundle: typeof bundle
  UtsTarget: typeof UtsTarget
} {
  // eslint-disable-next-line no-restricted-globals
  return require('@dcloudio/uts')
}

export function resolvePackage(filename: string) {
  const parts = normalizePath(filename).split('/')

  const isUniModules = parts.includes('uni_modules')
  const index = isUniModules
    ? parts.findIndex((part) => part === 'uni_modules')
    : parts.findIndex((part) => part === 'utssdk')
  if (index > -1) {
    return {
      is_uni_modules: isUniModules,
      name: camelize(parts[index + 1]),
    }
  }
}

export interface UTSPlatformResourceOptions {
  inputDir: string
  outputDir: string
  platform: typeof process.env.UNI_UTS_PLATFORM
  extname: '.kt' | '.swift'
}
export function genUTSPlatformResource(
  filename: string,
  options: UTSPlatformResourceOptions
) {
  const platformFile = resolveUTSPlatformFile(filename, options)
  const { platform } = options
  const utsInputDir = resolveUTSPlatformDir(filename, platform)
  const utsOutputDir = resolveUTSPlatformDir(platformFile, platform)

  // 拷贝所有非uts文件及目录
  fs.copySync(utsInputDir, utsOutputDir, {
    filter(src) {
      return path.extname(src) !== '.uts'
    },
  })

  // 生产模式下，需要将 kt 文件转移到 src 下
  const srcDir = path.resolve(utsOutputDir, 'src')
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir)
  }
  if (fs.existsSync(platformFile)) {
    fs.moveSync(platformFile, path.resolve(utsOutputDir, 'src/index.kt'))
  }
}

export function resolveAndroidDir(filename: string) {
  return resolveUTSPlatformDir(filename, 'app-android')
}

function resolveUTSPlatformDir(
  filename: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  const maybePlatformDir = path.dirname(filename)
  // 如果是根目录的 index.uts，需要定向到真正的平台目录
  const isRootIndex = path.basename(maybePlatformDir) !== platform
  if (isRootIndex) {
    if (maybePlatformDir.includes('uni_modules')) {
      return path.join(maybePlatformDir, 'utssdk/' + platform)
    }
    return path.join(maybePlatformDir, platform)
  }
  return maybePlatformDir
}

export function resolveUTSPlatformFile(
  filename: string,
  { inputDir, outputDir, platform, extname }: UTSPlatformResourceOptions
) {
  let platformFile = path
    .resolve(outputDir, path.relative(inputDir, filename))
    .replace(path.extname(filename), extname)
  const maybeModuleDir = path.dirname(filename)
  // 如果是根目录的 index.uts 编译出来的 index.kt，则移动到平台目录下
  const isRootIndex = path.basename(maybeModuleDir) !== platform
  if (isRootIndex) {
    if (fs.existsSync(platformFile)) {
      const newPlatformFile = path.resolve(
        path.dirname(platformFile),
        (maybeModuleDir.includes('uni_modules') ? 'utssdk/' : '') +
          platform +
          '/index' +
          extname
      )
      fs.moveSync(platformFile, newPlatformFile)
      platformFile = newPlatformFile
    }
  }
  return platformFile
}
