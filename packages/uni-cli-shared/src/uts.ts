import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'

import * as UTSCompiler from '@dcloudio/uni-uts-v1'

import { isInHBuilderX } from './hbx'
import { installDepTips, normalizePath, version } from './utils'
import type { EasycomMatcher } from './easycom'

/**
 * 解析 app 平台的 uts 插件，任意平台（android|ios）存在即可
 * @param id
 * @param importer
 * @returns
 */
export function resolveUTSAppModule(id: string, importer: string) {
  id = path.resolve(importer, id)
  if (id.includes('utssdk') || id.includes('uni_modules')) {
    const parts = normalizePath(id).split('/')
    const parentDir = parts[parts.length - 2]
    if (parentDir === 'uni_modules' || parentDir === 'utssdk') {
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
export function resolveUTSModule(id: string, importer: string) {
  if (
    process.env.UNI_PLATFORM === 'app' ||
    process.env.UNI_PLATFORM === 'app-plus'
  ) {
    return resolveUTSAppModule(id, importer)
  }
  id = path.resolve(importer, id)
  if (id.includes('utssdk') || id.includes('uni_modules')) {
    const parts = normalizePath(id).split('/')
    const parentDir = parts[parts.length - 2]
    if (parentDir === 'uni_modules' || parentDir === 'utssdk') {
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

export function initUTSComponents(
  inputDir: string,
  platform: UniApp.PLATFORM
): EasycomMatcher[] {
  const components: EasycomMatcher[] = []
  if (platform !== 'app' && platform !== 'app-plus') {
    return components
  }
  const easycomsObj = Object.create(null)
  const dirs = resolveUTSComponentDirs(inputDir)
  dirs.forEach((dir) => {
    const is_uni_modules_utssdk = dir.endsWith('utssdk')
    const is_ussdk =
      !is_uni_modules_utssdk && path.dirname(dir).endsWith('utssdk')
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
            easycomsObj[`^${name}$`] = `${importDir}?uts-proxy`
          }
        })
    }
  })
  Object.keys(easycomsObj).forEach((name) => {
    components.push({
      pattern: new RegExp(name),
      replacement: easycomsObj[name],
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
