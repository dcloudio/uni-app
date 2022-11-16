import path from 'path'
import fs from 'fs-extra'
import type { parse, bundle, UtsTarget } from '@dcloudio/uts'
import { camelize, capitalize } from '@vue/shared'
import { Module, ModuleItem } from '../types/types'
import {
  installHBuilderXPlugin,
  normalizePath,
  resolveSourceMapPath,
  runByHBuilderX,
} from './shared'

interface ToOptions {
  inputDir: string
  outputDir: string
  sourceMap: boolean
}
export type ToKotlinOptions = ToOptions
export type ToSwiftOptions = ToOptions

export function resolveUTSSourceMapPath(_filename: string) {
  return resolveSourceMapPath()
}

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
    const id = parts[index + 1]
    const name = camelize(id)
    return {
      id,
      name,
      namespace: 'UTSSDK' + (isUniModules ? 'Modules' : '') + capitalize(name),
      is_uni_modules: isUniModules,
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
  if (fs.existsSync(utsInputDir)) {
    fs.copySync(utsInputDir, utsOutputDir, {
      filter(src) {
        return path.extname(src) !== '.uts'
      },
    })
  }

  // 生产模式下，需要将生成的平台文件转移到 src 下
  const srcDir = path.resolve(utsOutputDir, 'src')
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir)
  }
  if (fs.existsSync(platformFile)) {
    fs.moveSync(
      platformFile,
      path.resolve(utsOutputDir, 'src/index' + options.extname),
      {
        overwrite: true,
      }
    )
  }
}

export function moveRootIndexSourceMap(
  filename: string,
  { inputDir, platform, extname }: UTSPlatformResourceOptions
) {
  if (isRootIndex(filename, platform)) {
    const sourceMapFilename = path
      .resolve(
        resolveUTSSourceMapPath(filename),
        path.relative(inputDir, filename)
      )
      .replace(path.extname(filename), extname + '.map')
    if (fs.existsSync(sourceMapFilename)) {
      const newSourceMapFilename = path.resolve(
        path.dirname(sourceMapFilename),
        platform,
        path.basename(sourceMapFilename)
      )
      fs.moveSync(sourceMapFilename, newSourceMapFilename, {
        overwrite: true,
      })
    }
  }
}

export function isRootIndex(
  filename: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  return path.basename(path.dirname(filename)) !== platform
}

export function resolveAndroidDir(filename: string) {
  return resolveUTSPlatformDir(filename, 'app-android')
}

function resolveUTSPlatformDir(
  filename: string,
  platform: typeof process.env.UNI_UTS_PLATFORM
) {
  const maybePlatformDir = path.dirname(filename)
  if (isRootIndex(filename, platform)) {
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
  // 如果是根目录的 index.uts 编译出来的 index.kt，则移动到平台目录下
  if (isRootIndex(filename, platform)) {
    if (fs.existsSync(platformFile)) {
      const newPlatformFile = path.resolve(
        path.dirname(platformFile),
        platform + '/index' + extname
      )
      fs.moveSync(platformFile, newPlatformFile, {
        overwrite: true,
      })
      platformFile = newPlatformFile
    }
  }
  return platformFile
}

function resolveTypeAliasDeclNames(items: ModuleItem[]) {
  const names: string[] = []
  items.forEach((item) => {
    if (item.type === 'TsTypeAliasDeclaration') {
      names.push(item.id.value)
    }
  })
  return names
}

export function createResolveTypeReferenceName(namespace: string, ast: Module) {
  const names = resolveTypeAliasDeclNames(ast.body)
  return (name: string) => {
    if (names.includes(name)) {
      return namespace + capitalize(name)
    }
    return name
  }
}

export type CompilerServer = {}
export function getCompilerServer<T extends CompilerServer>(
  pluginName: 'uts-development-ios' | 'uniapp-runextension'
): T | undefined {
  const compilerServerPath = path.resolve(
    process.env.UNI_HBUILDERX_PLUGINS,
    `${pluginName}/out/${
      pluginName === 'uniapp-runextension' ? 'main.js' : 'external.js'
    }`
  )
  if (fs.existsSync(compilerServerPath)) {
    // eslint-disable-next-line no-restricted-globals
    return require(compilerServerPath)
  } else {
    if (runByHBuilderX()) {
      installHBuilderXPlugin(pluginName)
    } else {
      console.error(compilerServerPath + ' is not found')
    }
  }
}
