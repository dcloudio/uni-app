import fs from 'fs'
import path from 'path'
import debug from 'debug'

import { camelize, capitalize, extend } from '@vue/shared'
import { createFilter } from '@rollup/pluginutils'

import { once } from '@dcloudio/uni-shared'
import { normalizePath } from './utils'
import { parsePagesJson, parsePagesJsonOnce } from './json/pages'
import { M } from './messages'
import {
  clearUTSComponents,
  clearUTSCustomElements,
  initUTSComponents,
  initUTSCustomElements,
} from './uts'
import { genUTSClassName } from './utsUtils'

interface EasycomOption {
  isX?: boolean
  dirs?: string[]
  rootDir: string
  extensions: string[]
  autoscan?: boolean
  custom?: EasycomCustom
}
export interface EasycomMatcher {
  name: string
  pattern: RegExp
  replacement: string
}
interface EasycomCustom {
  [key: string]: string
}

const debugEasycom = debug('uni:easycom')

const easycoms: EasycomMatcher[] = []

const easycomsCache = new Map<string, string>()
const easycomsInvalidCache = new Set<string>()

let hasEasycom = false

function clearEasycom() {
  easycoms.length = 0

  easycomsCache.clear()
  easycomsInvalidCache.clear()
}

export function initEasycoms(
  inputDir: string,
  {
    dirs,
    platform,
    isX,
  }: { dirs: string[]; platform: UniApp.PLATFORM; isX?: boolean }
) {
  const componentsDir = path.resolve(inputDir, 'components')
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  const initEasycomOptions = (pagesJson?: UniApp.PagesJson) => {
    // 初始化时，从once中读取缓存，refresh时，实时读取
    const { easycom } = pagesJson || parsePagesJson(inputDir, platform, false)
    const easycomOptions: EasycomOption = {
      isX,
      dirs:
        easycom && easycom.autoscan === false
          ? [...dirs] // 禁止自动扫描
          : [
              ...dirs,
              componentsDir,
              ...initUniModulesEasycomDirs(uniModulesDir),
            ],
      rootDir: inputDir,
      autoscan: !!(easycom && easycom.autoscan),
      custom: (easycom && easycom.custom) || {},
      extensions: [...(isX ? ['.uvue'] : []), ...['.vue', '.jsx', '.tsx']],
    }
    debugEasycom(easycomOptions)
    return easycomOptions
  }

  const easyComOptions = initEasycomOptions(
    parsePagesJsonOnce(inputDir, platform)
  )

  const initUTSEasycom = () => {
    initUTSComponents(inputDir, platform).forEach((item) => {
      const index = easycoms.findIndex((easycom) => item.name === easycom.name)
      if (index > -1) {
        easycoms.splice(index, 1, item)
      } else {
        easycoms.push(item)
      }
    })
    if (isX && (globalThis as any).uts2jsSourceCodeMap) {
      ;(globalThis as any).uts2jsSourceCodeMap.initUts2jsEasycom(easycoms)
    }
  }

  const initUTSEasycomCustomElements = () => {
    initUTSCustomElements(inputDir, platform).forEach((item) => {
      const index = easycoms.findIndex((easycom) => item.name === easycom.name)
      if (index > -1) {
        easycoms.splice(index, 1, item)
      } else {
        easycoms.push(item)
      }
    })
  }

  // ext-api 模式下，不存在 easycom 特性
  if (process.env.UNI_COMPILE_TARGET !== 'ext-api') {
    clearEasycom()
    clearUTSComponents()
    clearUTSCustomElements()
    initEasycom(easyComOptions)
    initUTSEasycomCustomElements()
    initUTSEasycom()
  }
  const componentExtNames = isX ? 'uvue|vue' : 'vue'
  const res = {
    easyComOptions,
    filter: createFilter(
      [
        'components/*/*.(' + componentExtNames + '|jsx|tsx)',
        'uni_modules/*/components/*/*.(' + componentExtNames + '|jsx|tsx)',
        'utssdk/*/**/*.(' + componentExtNames + ')',
        'uni_modules/*/utssdk/*/*.(' + componentExtNames + ')',
      ],
      [],
      {
        resolve: inputDir,
      }
    ),
    refresh() {
      res.easyComOptions = initEasycomOptions()
      if (process.env.UNI_COMPILE_TARGET !== 'ext-api') {
        clearEasycom()
        clearUTSComponents()
        clearUTSCustomElements()
        initEasycom(easyComOptions)
        initUTSEasycomCustomElements()
        initUTSEasycom()
      }
    },
    easycoms,
  }
  return res
}

export const initEasycomsOnce = once(initEasycoms)

function initUniModulesEasycomDirs(
  uniModulesDir: string,
  componentsDir: string = 'components'
) {
  if (!fs.existsSync(uniModulesDir)) {
    return []
  }
  return fs
    .readdirSync(uniModulesDir)
    .map((uniModuleDir) => {
      const uniModuleComponentsDir = path.resolve(
        uniModulesDir,
        uniModuleDir,
        componentsDir
      )
      if (fs.existsSync(uniModuleComponentsDir)) {
        return uniModuleComponentsDir
      }
    })
    .filter<string>(Boolean as any)
}

function initEasycom({
  isX,
  dirs,
  rootDir,
  custom,
  extensions,
}: EasycomOption) {
  rootDir = normalizePath(rootDir)
  const easycomsObj = Object.create(null)
  if (dirs && dirs.length && rootDir) {
    const autoEasyComObj = initAutoScanEasycoms(dirs, rootDir, extensions)
    if (isX) {
      Object.keys(autoEasyComObj).forEach((tagName) => {
        let source = autoEasyComObj[tagName]
        tagName = tagName.slice(1, -1)
        if (path.isAbsolute(source) && source.startsWith(rootDir)) {
          source = '@/' + normalizePath(path.relative(rootDir, source))
        }
        // 加密插件easycom类型导入
        if (source.includes('?uts-proxy')) {
          const moduleId = path.basename(source.split('?uts-proxy')[0])
          source = `uts.sdk.modules.${camelize(moduleId)}`
        }
        const ident = genUTSComponentPublicInstanceIdent(tagName)
        addUTSEasyComAutoImports(source, [ident, ident])
      })
    }
    extend(easycomsObj, autoEasyComObj)
  }
  if (custom) {
    Object.keys(custom).forEach((name) => {
      const componentPath = custom[name]
      easycomsObj[name] = componentPath.startsWith('@/')
        ? normalizePath(path.join(rootDir!, componentPath.slice(2)))
        : componentPath
    })
  }
  Object.keys(easycomsObj).forEach((name) => {
    easycoms.push({
      name:
        name.startsWith('^') && name.endsWith('$') ? name.slice(1, -1) : name,
      pattern: new RegExp(name),
      replacement: easycomsObj[name],
    })
  })
  debugEasycom(easycoms)
  hasEasycom = !!easycoms.length
  return easycoms
}

export function matchEasycom(tag: string) {
  if (!hasEasycom) {
    return
  }
  let source = easycomsCache.get(tag)
  if (source) {
    return source
  }
  if (easycomsInvalidCache.has(tag)) {
    return false
  }
  const matcher = easycoms.find((matcher) => matcher.pattern.test(tag))
  if (!matcher) {
    easycomsInvalidCache.add(tag)
    return false
  }
  source = tag.replace(matcher.pattern, matcher.replacement)
  easycomsCache.set(tag, source)
  debugEasycom('matchEasycom', tag, source)
  return source
}

const isDir = (path: string) => {
  const stat = fs.lstatSync(path)
  if (stat.isDirectory()) {
    return true
  } else if (stat.isSymbolicLink()) {
    return fs.lstatSync(fs.realpathSync(path)).isDirectory()
  }
  return false
}

function initAutoScanEasycom(
  dir: string,
  rootDir: string,
  extensions: string[]
): Record<string, string> {
  if (!path.isAbsolute(dir)) {
    dir = path.resolve(rootDir, dir)
  }
  const easycoms = Object.create(null)
  if (!fs.existsSync(dir)) {
    return easycoms
  }
  const is_uni_modules =
    path.basename(path.resolve(dir, '../..')) === 'uni_modules'
  const is_easycom_encrypt_uni_modules = // uni_modules模式不需要此逻辑
    process.env.UNI_COMPILE_TARGET !== 'uni_modules' &&
    is_uni_modules &&
    // 前端加密插件，不能包含utssdk目录
    fs.existsSync(path.resolve(dir, '../encrypt')) &&
    !fs.existsSync(path.resolve(dir, '../utssdk'))
  const uni_modules_plugin_id =
    is_easycom_encrypt_uni_modules && path.basename(path.resolve(dir, '..'))
  fs.readdirSync(dir).forEach((name) => {
    const folder = path.resolve(dir, name)
    if (!isDir(folder)) {
      return
    }
    const importDir = normalizePath(folder)
    const files = fs.readdirSync(folder)
    // 读取文件夹文件列表，比对文件名（fs.existsSync在大小写不敏感的系统会匹配不准确）
    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i]
      if (files.includes(name + ext)) {
        easycoms[`^${name}$`] = is_easycom_encrypt_uni_modules
          ? normalizePath(
              path.join(
                rootDir,
                `uni_modules/${uni_modules_plugin_id}?${
                  // android 走 proxy
                  process.env.UNI_APP_X === 'true' &&
                  process.env.UNI_UTS_PLATFORM === 'app-android'
                    ? 'uts-proxy'
                    : 'uni_helpers'
                }`
              )
            )
          : `${importDir}/${name}${ext}`
        break
      }
    }
  })
  return easycoms
}

function initAutoScanEasycoms(
  dirs: string[],
  rootDir: string,
  extensions: string[]
) {
  const conflict: Record<string, string[]> = {}
  const res = dirs.reduce<Record<string, string>>(
    (easycoms: Record<string, string>, dir: string) => {
      const curEasycoms = initAutoScanEasycom(dir, rootDir, extensions)
      Object.keys(curEasycoms).forEach((name) => {
        // Use the first component when name conflict
        const componentPath = easycoms[name]
        if (!componentPath) {
          easycoms[name] = curEasycoms[name]
        } else {
          ;(conflict[componentPath] || (conflict[componentPath] = [])).push(
            normalizeComponentPath(curEasycoms[name], rootDir)
          )
        }
      })
      return easycoms
    },
    Object.create(null)
  )
  const conflictComponents = Object.keys(conflict)
  if (conflictComponents.length) {
    console.warn(M['easycom.conflict'])
    conflictComponents.forEach((com) => {
      console.warn(
        [normalizeComponentPath(com, rootDir), conflict[com]].join(',')
      )
    })
  }
  return res
}

function normalizeComponentPath(componentPath: string, rootDir: string) {
  return normalizePath(path.relative(rootDir, componentPath))
}

export function addImportDeclaration(
  importDeclarations: string[],
  local: string,
  source: string,
  imported?: string
) {
  importDeclarations.push(createImportDeclaration(local, source, imported))
  return local
}

function createImportDeclaration(
  local: string,
  source: string,
  imported?: string
) {
  if (imported) {
    return `import { ${imported} as ${local} } from '${source}';`
  }
  return `import ${local} from '${source}';`
}

const RESOLVE_EASYCOM_IMPORT_CODE = `import { resolveDynamicComponent as __resolveDynamicComponent } from 'vue';import { resolveEasycom } from '@dcloudio/uni-app';`

export function genResolveEasycomCode(
  importDeclarations: string[],
  code: string,
  name: string
) {
  if (!importDeclarations.includes(RESOLVE_EASYCOM_IMPORT_CODE)) {
    importDeclarations.push(RESOLVE_EASYCOM_IMPORT_CODE)
  }
  return `resolveEasycom(${code.replace(
    '_resolveComponent',
    '__resolveDynamicComponent'
  )}, ${name})`
}

export const UNI_EASYCOM_EXCLUDE = [/@dcloudio\/uni-h5/]

const utsEasyComAutoImports: Record<string, [[string, string]]> = {}

export function getUTSEasyComAutoImports() {
  return utsEasyComAutoImports
}

export function addUTSEasyComAutoImports(
  source: string,
  imports: [string, string]
) {
  if (!utsEasyComAutoImports[source]) {
    utsEasyComAutoImports[source] = [imports]
  } else {
    if (!utsEasyComAutoImports[source].find((item) => item[0] === imports[0])) {
      utsEasyComAutoImports[source].push(imports)
    }
  }
}

export function genUTSComponentPublicInstanceIdent(tagName: string) {
  return capitalize(camelize(tagName)) + 'ComponentPublicInstance'
}

export function genUTSComponentPublicInstanceImported(
  root: string,
  fileName: string
) {
  root = normalizePath(root)
  if (path.isAbsolute(fileName) && fileName.startsWith(root)) {
    fileName = normalizePath(path.relative(root, fileName))
  }
  if (fileName.startsWith('@/')) {
    return (
      genUTSClassName(fileName.replace('@/', '')) + 'ComponentPublicInstance'
    )
  }
  return genUTSClassName(fileName) + 'ComponentPublicInstance'
}
