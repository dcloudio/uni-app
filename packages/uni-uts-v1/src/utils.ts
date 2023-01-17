import path, { basename, resolve } from 'path'
import fs from 'fs-extra'
import type { parse, bundle, UtsTarget } from '@dcloudio/uts'
import { camelize, capitalize, extend } from '@vue/shared'
import glob from 'fast-glob'
import { Module, ModuleItem } from '../types/types'
import {
  installHBuilderXPlugin,
  normalizePath,
  parseJson,
  resolveSourceMapPath,
  runByHBuilderX,
} from './shared'

interface ToOptions {
  inputDir: string
  outputDir: string
  sourceMap: boolean
  components: Record<string, string>
}
export type ToKotlinOptions = ToOptions
export type ToSwiftOptions = ToOptions

export const ERR_MSG_PLACEHOLDER = `___ERR_MSG___`

export function resolveUTSSourceMapPath() {
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
      extname: '.uts',
    }
  }
}

export interface UTSPlatformResourceOptions {
  inputDir: string
  outputDir: string
  platform: typeof process.env.UNI_UTS_PLATFORM
  extname: '.kt' | '.swift'
  components: Record<string, string>
  package: string
}
export function genUTSPlatformResource(
  filename: string,
  options: UTSPlatformResourceOptions
) {
  const platformFile = resolveUTSPlatformFile(filename, options)
  const { platform } = options
  const utsInputDir = resolveUTSPlatformDir(filename, platform)
  const utsOutputDir = resolveUTSPlatformDir(platformFile, platform)

  // 拷贝所有非uts,vue文件及目录
  if (fs.existsSync(utsInputDir)) {
    fs.copySync(utsInputDir, utsOutputDir, {
      filter(src) {
        if (src.endsWith('config.json')) {
          return false
        }
        return !['.uts', '.vue'].includes(path.extname(src))
      },
    })
  }

  copyConfigJson(utsInputDir, utsOutputDir, options.components, options.package)

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
      .resolve(resolveUTSSourceMapPath(), path.relative(inputDir, filename))
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

export function resolveIOSDir(filename: string) {
  return resolveUTSPlatformDir(filename, 'app-ios')
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

function resolveComponents(
  platform: 'app-android' | 'app-ios',
  pluginDir: string,
  is_uni_modules: boolean
) {
  const components: Record<string, string> = {}
  const platformDir = path.resolve(
    pluginDir,
    is_uni_modules ? 'utssdk' : '',
    platform
  )
  if (fs.existsSync(platformDir)) {
    glob
      .sync('**/*.vue', { cwd: platformDir, absolute: true })
      .forEach((file) => {
        let name = parseVueComponentName(file)
        if (!name) {
          if (file.endsWith('index.vue')) {
            name = path.basename(pluginDir)
          }
        }
        if (name && !components[name]) {
          components[name] = file
        }
      })
  }
  return components
}

export function resolveAndroidComponents(
  pluginDir: string,
  is_uni_modules: boolean
) {
  return resolveComponents('app-android', pluginDir, is_uni_modules)
}

export function resolveIOSComponents(
  pluginDir: string,
  is_uni_modules: boolean
) {
  return resolveComponents('app-ios', pluginDir, is_uni_modules)
}

const nameRE = /export\s+default\s+[\s\S]*?name\s*:\s*['|"](.*?)['|"]/
function parseVueComponentName(file: string) {
  const content = fs.readFileSync(file, 'utf8')
  const matches = content.match(nameRE)
  if (matches) {
    return matches[1]
  }
}

export function genComponentsCode(
  filename: string,
  components: Record<string, string>
) {
  const codes: string[] = []
  const dirname = path.dirname(filename)
  Object.keys(components).forEach((name) => {
    const source = normalizePath(path.relative(dirname, components[name]))
    codes.push(
      `export { default as ${capitalize(camelize(name))}Component } from '${
        source.startsWith('.') ? source : './' + source
      }'`
    )
  })
  return codes.join('\n')
}

export function genConfigJson(
  platform: 'app-android' | 'app-ios',
  components: Record<string, string>,
  pluginRelativeDir: string,
  is_uni_modules: boolean,
  inputDir: string,
  outputDir: string
) {
  if (!Object.keys(components).length) {
    return
  }
  const pluginId = basename(pluginRelativeDir)
  const utsInputDir = resolve(
    inputDir,
    pluginRelativeDir,
    is_uni_modules ? 'utssdk' : '',
    platform
  )
  const utsOutputDir = resolve(
    outputDir,
    pluginRelativeDir,
    is_uni_modules ? 'utssdk' : '',
    platform
  )
  copyConfigJson(
    utsInputDir,
    utsOutputDir,
    components,
    platform === 'app-android'
      ? parseKotlinPackageWithPluginId(pluginId, is_uni_modules) + '.'
      : parseSwiftPackageWithPluginId(pluginId, is_uni_modules)
  )
}

function copyConfigJson(
  inputDir: string,
  outputDir: string,
  componentsObj: Record<string, string>,
  namespace: string
) {
  const configJsonFilename = resolve(inputDir, 'config.json')
  const outputConfigJsonFilename = resolve(outputDir, 'config.json')
  if (Object.keys(componentsObj).length) {
    //存在组件
    const components = genComponentsConfigJson(componentsObj, namespace)
    if (fs.existsSync(configJsonFilename)) {
      fs.outputFileSync(
        outputConfigJsonFilename,
        JSON.stringify(
          extend(
            { components },
            parseJson(fs.readFileSync(configJsonFilename, 'utf8'))
          ),
          null,
          2
        )
      )
    } else {
      fs.outputFileSync(
        outputConfigJsonFilename,
        JSON.stringify({ components }, null, 2)
      )
    }
  } else {
    if (fs.existsSync(configJsonFilename)) {
      fs.copySync(configJsonFilename, outputConfigJsonFilename)
    }
  }
}

function genComponentsConfigJson(
  components: Record<string, string>,
  namespace: string
) {
  const res: { name: string; class: string }[] = []
  Object.keys(components).forEach((name) => {
    res.push({
      name,
      class: namespace + capitalize(camelize(name)) + 'Component',
    })
  })
  return res
}

export function parseKotlinPackageWithPluginId(
  id: string,
  is_uni_modules: boolean
) {
  return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + camelize(id)
}

export function parseSwiftPackageWithPluginId(
  id: string,
  is_uni_modules: boolean
) {
  return 'UTSSDK' + (is_uni_modules ? 'Modules' : '') + capitalize(camelize(id))
}
