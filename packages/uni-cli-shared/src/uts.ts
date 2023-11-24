import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
import * as UTSCompiler from '@dcloudio/uni-uts-v1'

import { isInHBuilderX } from './hbx'
import {
  camelize,
  capitalize,
  installDepTips,
  isArray,
  normalizePath,
  version,
} from './utils'
import type { EasycomMatcher } from './easycom'

import { parseUniExtApis } from './uni_modules'

// 重要，该文件编译后的 js 需要同步到 vue2 编译器 uni-cli-shared/lib/uts

function once<T extends (...args: any[]) => any>(
  fn: T,
  ctx: unknown = null
): T {
  let res: any
  return ((...args: any[]) => {
    if (fn) {
      res = fn.apply(ctx, args)
      fn = null as any
    }
    return res
  }) as T
}

/**
 * 解析 app 平台的 uts 插件，任意平台（android|ios）存在即可
 * @param id
 * @param importer
 * @returns
 */
export function resolveUTSAppModule(
  id: string,
  importer: string,
  includeUTSSDK = true
) {
  id = path.resolve(importer, id)
  if (id.includes('uni_modules') || (includeUTSSDK && id.includes('utssdk'))) {
    const parts = normalizePath(id).split('/')
    const parentDir = parts[parts.length - 2]
    if (
      parentDir === 'uni_modules' ||
      (includeUTSSDK && parentDir === 'utssdk')
    ) {
      const basedir = parentDir === 'uni_modules' ? 'utssdk' : ''
      if (fs.existsSync(path.resolve(id, basedir, 'index.uts'))) {
        return id
      }
      const resolvePlatformDir = (p: typeof process.env.UNI_UTS_PLATFORM) => {
        return path.resolve(id, basedir, p)
      }
      const extname = ['.uts']
      if (resolveUTSFile(resolvePlatformDir('app-android'), extname)) {
        return id
      }
      if (resolveUTSFile(resolvePlatformDir('app-ios'), extname)) {
        return id
      }
    }
  }
}

// 仅限 root/uni_modules/test-plugin | root/utssdk/test-plugin 格式
export function resolveUTSModule(
  id: string,
  importer: string,
  includeUTSSDK = true
) {
  if (
    process.env.UNI_PLATFORM === 'app' ||
    process.env.UNI_PLATFORM === 'app-plus'
  ) {
    return resolveUTSAppModule(id, importer)
  }
  id = path.resolve(importer, id)
  if (id.includes('uni_modules') || (includeUTSSDK && id.includes('utssdk'))) {
    const parts = normalizePath(id).split('/')
    const parentDir = parts[parts.length - 2]
    if (
      parentDir === 'uni_modules' ||
      (includeUTSSDK && parentDir === 'utssdk')
    ) {
      const basedir = parentDir === 'uni_modules' ? 'utssdk' : ''
      const resolvePlatformDir = (p: typeof process.env.UNI_UTS_PLATFORM) => {
        return path.resolve(id, basedir, p)
      }

      let index = resolveUTSFile(
        resolvePlatformDir(process.env.UNI_UTS_PLATFORM)
      )
      if (index) {
        return index
      }
      index = path.resolve(id, basedir, 'index.uts')
      if (fs.existsSync(index)) {
        return index
      }
    }
  }
}

function resolveUTSFile(
  dir: string,
  extensions: string[] = ['.uts', '.ts', '.js']
) {
  for (let i = 0; i < extensions.length; i++) {
    const indexFile = path.join(dir, 'index' + extensions[i])
    if (fs.existsSync(indexFile)) {
      return indexFile
    }
  }
}

export function resolveUTSCompiler(): typeof UTSCompiler {
  let compilerPath: string = ''
  if (isInHBuilderX()) {
    try {
      compilerPath = require.resolve(
        path.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'uniapp-uts-v1')
      )
    } catch (e) {}
  }
  if (!compilerPath) {
    try {
      compilerPath = require.resolve('@dcloudio/uni-uts-v1', {
        paths: [process.env.UNI_CLI_CONTEXT],
      })
    } catch (e) {
      let utsCompilerVersion = version
      if (version.startsWith('2.0.')) {
        utsCompilerVersion = '^3.0.0-alpha-3060920221117001'
      }
      console.error(
        installDepTips(
          'devDependencies',
          '@dcloudio/uni-uts-v1',
          utsCompilerVersion
        )
      )
      process.exit(0)
    }
  }
  return require(compilerPath)
}

interface UTSComponentMeta {
  source: string
  kotlinPackage: string
  swiftModule: string
}

const utsComponents = new Map<string, UTSComponentMeta>()

export function isUTSComponent(name: string) {
  return utsComponents.has(name)
}

export function parseUTSComponent(name: string, type: 'kotlin' | 'swift') {
  const meta = utsComponents.get(name)
  if (meta) {
    const namespace =
      meta[type === 'swift' ? 'swiftModule' : 'kotlinPackage'] || ''
    const className = capitalize(camelize(name)) + 'Component'
    return {
      className,
      namespace,
      source: meta.source,
    }
  }
}

export function initUTSComponents(
  inputDir: string,
  platform: UniApp.PLATFORM
): EasycomMatcher[] {
  utsComponents.clear()
  const components: EasycomMatcher[] = []
  if (platform !== 'app' && platform !== 'app-plus') {
    return components
  }
  const easycomsObj: Record<
    string,
    { source: string; kotlinPackage: string; swiftModule: string }
  > = {}
  const dirs = resolveUTSComponentDirs(inputDir)
  dirs.forEach((dir) => {
    const is_uni_modules_utssdk = dir.endsWith('utssdk')
    const is_ussdk =
      !is_uni_modules_utssdk && path.dirname(dir).endsWith('utssdk')

    const pluginId = is_uni_modules_utssdk
      ? path.basename(path.dirname(dir))
      : path.basename(dir)
    if (is_uni_modules_utssdk || is_ussdk) {
      glob
        .sync('**/*.vue', {
          cwd: dir,
          absolute: true,
        })
        .forEach((file) => {
          let name = parseVueComponentName(file)
          if (!name) {
            if (file.endsWith('index.vue')) {
              name = path.basename(
                is_uni_modules_utssdk ? path.dirname(dir) : dir
              )
            }
          }
          if (name) {
            const importDir = normalizePath(
              is_uni_modules_utssdk ? path.dirname(dir) : dir
            )
            easycomsObj[`^${name}$`] = {
              source: `${importDir}?uts-proxy`,
              kotlinPackage: parseKotlinPackageWithPluginId(
                pluginId,
                is_uni_modules_utssdk
              ),
              swiftModule: parseSwiftPackageWithPluginId(
                pluginId,
                is_uni_modules_utssdk
              ),
            }
          }
        })
    }
  })
  Object.keys(easycomsObj).forEach((name) => {
    const obj = easycomsObj[name]
    const componentName = name.slice(1, -1)
    components.push({
      name: componentName,
      pattern: new RegExp(name),
      replacement: obj.source,
    })
    utsComponents.set(componentName, {
      source: obj.source,
      kotlinPackage: obj.kotlinPackage,
      swiftModule: obj.swiftModule,
    })
  })
  return components
}

function resolveUTSComponentDirs(inputDir: string) {
  const utssdkDir = path.resolve(inputDir, 'utssdk')
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  return glob
    .sync('*', {
      cwd: utssdkDir,
      absolute: true,
      onlyDirectories: true,
    })
    .concat(
      glob.sync('*/utssdk', {
        cwd: uniModulesDir,
        absolute: true,
        onlyDirectories: true,
      })
    )
}

const nameRE = /name\s*:\s*['|"](.*)['|"]/
function parseVueComponentName(file: string) {
  const content = fs.readFileSync(file, 'utf8')
  const matches = content.match(nameRE)
  if (matches) {
    return matches[1]
  }
}

function prefix(id: string) {
  if (
    process.env.UNI_UTS_MODULE_PREFIX &&
    !id.startsWith(process.env.UNI_UTS_MODULE_PREFIX)
  ) {
    return process.env.UNI_UTS_MODULE_PREFIX + '-' + id
  }
  return id
}

export function parseKotlinPackageWithPluginId(
  id: string,
  is_uni_modules: boolean
) {
  return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + camelize(prefix(id))
}

export function parseSwiftPackageWithPluginId(
  id: string,
  is_uni_modules: boolean
) {
  return (
    'UTSSDK' +
    (is_uni_modules ? 'Modules' : '') +
    capitalize(camelize(prefix(id)))
  )
}

export type UTSTargetLanguage = typeof process.env.UNI_UTS_TARGET_LANGUAGE

export const parseUniExtApiNamespacesOnce = once(
  (
    platform: typeof process.env.UNI_UTS_PLATFORM,
    language: UTSTargetLanguage
  ) => {
    const extApis = parseUniExtApiNamespacesJsOnce(platform, language)
    const namespaces: Record<string, [string, string]> = {}
    Object.keys(extApis).forEach((name) => {
      const options = extApis[name]
      let source = options[0]
      const pluginId = path.basename(options[0])
      if (language === 'kotlin') {
        source = parseKotlinPackageWithPluginId(pluginId, true)
      } else if (language === 'swift') {
        source = parseSwiftPackageWithPluginId(pluginId, true)
      }
      namespaces[name] = [source, options[1]]
    })
    return namespaces
  }
)

export const parseUniExtApiNamespacesJsOnce = once(
  (
    platform: typeof process.env.UNI_UTS_PLATFORM,
    language: UTSTargetLanguage
  ) => {
    const extApis = parseUniExtApis(true, platform, language)
    const namespaces: Record<string, [string, string]> = {}
    Object.keys(extApis).forEach((name) => {
      const options = extApis[name]
      if (isArray(options) && options.length >= 2) {
        namespaces[name.replace('uni.', '')] = [options[0], options[1]]
      }
    })
    return namespaces
  }
)
