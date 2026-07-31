import path from 'path'
import fs from 'fs'
import { extend } from '@vue/shared'
import type {
  ComponentJson,
  MiniProgramComponentsType,
  PageWindowOptions,
  UsingComponents,
} from './types'
import {
  normalizeMiniProgramFilename,
  normalizeNodeModules,
  normalizePath,
  removeExt,
} from '../../utils'
import { relativeFile } from '../../resolve'
import { isVueSfcFile } from '../../vue/utils'
import { UNI_AD_PLUGINS } from '@dcloudio/uni-shared'
import {
  parseIndependentSubPackages,
  setIndependentSubPackages,
} from './subpackage'

let appJsonCache: Record<string, any> = {}
let subPackageRootsCache: string[] = []
let independentRootsCache: string[] = []
const jsonFilesCache = new Map<string, string>()
const jsonPagesCache = new Map<string, PageWindowOptions>()
const jsonComponentsCache = new Map<string, ComponentJson>()
const jsonUsingComponentsCache = new Map<string, UsingComponents>()
const componentPackageRootsCache = new Map<string, Set<string>>()
const mainPackageRoot = ''

export function isMiniProgramPageFile(file: string, inputDir?: string) {
  if (inputDir && path.isAbsolute(file)) {
    file = normalizePath(path.relative(inputDir, file))
  }
  return jsonPagesCache.has(removeExt(file))
}

export function isMiniProgramPageSfcFile(file: string, inputDir?: string) {
  return isVueSfcFile(file) && isMiniProgramPageFile(file, inputDir)
}

export function hasJsonFile(filename: string) {
  return (
    filename === 'app' ||
    jsonPagesCache.has(filename) ||
    jsonComponentsCache.has(filename)
  )
}

export function getComponentJsonFilenames() {
  return [...jsonComponentsCache.keys()]
}

export function findJsonFile(filename: string) {
  if (filename === 'app') {
    return appJsonCache
  }
  return jsonPagesCache.get(filename) || jsonComponentsCache.get(filename)
}

export function findUsingComponents(filename: string) {
  return jsonUsingComponentsCache.get(filename)
}

export function findMiniProgramSubPackageRoot(filename: string) {
  return findSubPackageRoot(filename, subPackageRootsCache)
}

export function addMiniProgramComponentPackageRoot(
  filename: string,
  packageRoot?: string
) {
  const normalizedFilename = normalizeComponentPackageFilename(filename)
  if (!normalizedFilename.startsWith('uni_modules/')) {
    return
  }
  const roots =
    componentPackageRootsCache.get(normalizedFilename) || new Set<string>()
  roots.add(packageRoot || mainPackageRoot)
  componentPackageRootsCache.set(normalizedFilename, roots)
}

export function findMiniProgramComponentPackageRoot(filename: string) {
  const roots = getMiniProgramComponentPackageRoots(filename)
  if (roots?.size === 1) {
    const [root] = [...roots]
    return root || undefined
  }
}

export function resolveMiniProgramComponentPackageRoot(
  filename: string,
  packageRoot?: string
) {
  const roots = getMiniProgramComponentPackageRoots(filename)
  if (!roots) {
    return packageRoot
  }
  if (roots.size === 1) {
    return [...roots][0]
  }
}

export function normalizeJsonFilename(filename: string) {
  return normalizeNodeModules(filename)
}

export function findChangedJsonFiles(
  supportGlobalUsingComponents: boolean | ((filename: string) => boolean) = true
) {
  const changedJsonFiles = new Map<string, string>()
  function findChangedFile(filename: string, json: Record<string, any>) {
    const cacheFilename = filename
    const outputFilename = normalizeJsonPackageFilename(filename)
    const newJson = JSON.parse(JSON.stringify(json))
    if (!newJson.usingComponents) {
      newJson.usingComponents = {}
    }
    extend(newJson.usingComponents, jsonUsingComponentsCache.get(cacheFilename))
    // 格式化为相对路径，这样作为分包也可以直接运行
    // app.json mp-baidu 在 win 不支持相对路径。所有平台改用绝对路径
    if (outputFilename !== 'app') {
      let usingComponents = newJson.usingComponents as Record<string, string>
      const independentRoot = findSubPackageRoot(
        outputFilename,
        independentRootsCache
      )
      const supportGlobalUsingComponentsForFile =
        typeof supportGlobalUsingComponents === 'function'
          ? supportGlobalUsingComponents(filename)
          : supportGlobalUsingComponents
      // 如果小程序不支持 global 的 usingComponents，或独立分包冷启动不能依赖 app.json
      if (!supportGlobalUsingComponentsForFile || independentRoot) {
        // 从取全局的 usingComponents 并补充到子组件 usingComponents 中
        const globalUsingComponents = appJsonCache?.usingComponents || {}
        const globalComponents = findUsingComponents('app') || {}
        usingComponents = {
          ...globalUsingComponents,
          ...globalComponents,
          ...newJson.usingComponents,
        }
      }
      if (independentRoot) {
        validateIndependentUsingComponents(
          outputFilename,
          independentRoot,
          usingComponents
        )
      }
      Object.keys(usingComponents).forEach((name) => {
        const componentFilename = normalizeUsingComponentPackageFilename(
          usingComponents[name],
          outputFilename
        )
        if (componentFilename.startsWith('/')) {
          usingComponents[name] = relativeFile(
            outputFilename,
            componentFilename.slice(1)
          )
        }
      })
      newJson.usingComponents = usingComponents
    }

    const jsonStr = JSON.stringify(newJson, null, 2)
    if (jsonFilesCache.get(outputFilename) !== jsonStr) {
      changedJsonFiles.set(outputFilename, jsonStr)
      jsonFilesCache.set(outputFilename, jsonStr)
    }
  }
  function findChangedFiles(jsonsCache: Map<string, any>) {
    for (const name of jsonsCache.keys()) {
      findChangedFile(name, jsonsCache.get(name))
    }
  }
  if (process.env.UNI_COMPILE_TARGET !== 'uni_modules') {
    findChangedFile('app', appJsonCache)
    findChangedFiles(jsonPagesCache)
  }
  findChangedFiles(jsonComponentsCache)
  return changedJsonFiles
}

function findSubPackageRoot(filename: string, roots: string[]) {
  return roots.find((root) => {
    return filename === root || filename.startsWith(root + '/')
  })
}

function validateIndependentUsingComponents(
  filename: string,
  root: string,
  usingComponents: Record<string, string>
) {
  Object.keys(usingComponents).forEach((name) => {
    const componentFilename = usingComponents[name]
    if (
      isLocalUsingComponent(componentFilename) &&
      !isUsingComponentInRoot(componentFilename, root, filename)
    ) {
      throw new Error(
        `独立分包 "${root}" 不能在 "${filename}" 中使用 root 外组件 "${name}"（${componentFilename}），请移动到 "${root}" 内或改为页面局部组件。`
      )
    }
  })
}

function isUsingComponentInRoot(
  componentFilename: string,
  root: string,
  ownerFilename: string
) {
  const filename = normalizeUsingComponentFilename(
    componentFilename,
    ownerFilename
  )
  return filename === root || filename.startsWith(root + '/')
}

function normalizeUsingComponentFilename(
  componentFilename: string,
  ownerFilename: string
) {
  if (componentFilename.startsWith('/')) {
    return normalizePath(componentFilename).replace(/^\/+/, '')
  }
  if (componentFilename.startsWith('.')) {
    return normalizePath(
      path.join(path.dirname(ownerFilename), componentFilename)
    )
  }
  return normalizePath(componentFilename)
}

function isLocalUsingComponent(componentFilename: string) {
  return (
    !/^(?:plugin|dynamicLib|ext):\/\//.test(componentFilename) &&
    !componentFilename.startsWith('weui-miniprogram')
  )
}

export function addMiniProgramAppJson(appJson: Record<string, any>) {
  appJsonCache = appJson
  subPackageRootsCache = parseSubPackageRoots(appJson as UniApp.PagesJson)
  independentRootsCache = parseIndependentSubPackages(
    appJson as UniApp.PagesJson
  ).map(({ root }) => root)
}

export function addMiniProgramPageJson(
  filename: string,
  json: PageWindowOptions
) {
  jsonPagesCache.set(filename, json)
}

export function addMiniProgramComponentJson(
  filename: string,
  json: ComponentJson
) {
  jsonComponentsCache.set(filename, json)
}

export function addMiniProgramUsingComponents(
  filename: string,
  json: UsingComponents
) {
  jsonUsingComponentsCache.set(filename, json)
}

export function resetMiniProgramJsonFiles() {
  appJsonCache = {}
  subPackageRootsCache = []
  independentRootsCache = []
  setIndependentSubPackages([])
  componentPackageRootsCache.clear()
  jsonFilesCache.clear()
  jsonPagesCache.clear()
  jsonComponentsCache.clear()
  jsonUsingComponentsCache.clear()
}

function parseSubPackageRoots(pagesJson: UniApp.PagesJson | undefined) {
  const subPackages = pagesJson?.subPackages || pagesJson?.subpackages || []
  if (!Array.isArray(subPackages)) {
    return []
  }
  return subPackages
    .map((subPackage) => {
      if (
        !subPackage ||
        subPackage.independent === true ||
        typeof subPackage.root !== 'string'
      ) {
        return ''
      }
      return normalizePath(subPackage.root).replace(/^\/+|\/+$/g, '')
    })
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
}

function normalizeJsonPackageFilename(filename: string) {
  const unrootedFilename = withoutSubPackageRootForUniModules(filename)
  if (
    unrootedFilename !== filename &&
    getMiniProgramComponentPackageRoots(unrootedFilename) &&
    !findMiniProgramComponentPackageRoot(unrootedFilename)
  ) {
    return unrootedFilename
  }
  return filename
}

function normalizeUsingComponentPackageFilename(
  componentFilename: string,
  ownerFilename: string
) {
  if (!componentFilename.startsWith('/')) {
    return componentFilename
  }
  const normalizedFilename = normalizePath(componentFilename).replace(
    /^\/+/,
    ''
  )
  const unrootedFilename =
    withoutSubPackageRootForUniModules(normalizedFilename)
  if (!unrootedFilename.startsWith('uni_modules/')) {
    return componentFilename
  }
  const roots = getMiniProgramComponentPackageRoots(unrootedFilename)
  if (!roots) {
    return componentFilename
  }
  const packageRoot =
    roots.size === 1
      ? findMiniProgramComponentPackageRoot(unrootedFilename)
      : ''
  const ownerRoot = findMiniProgramSubPackageRoot(ownerFilename)
  if (packageRoot && ownerRoot === packageRoot) {
    return '/' + `${packageRoot}/${unrootedFilename}`
  }
  return '/' + unrootedFilename
}

function withoutSubPackageRootForUniModules(filename: string) {
  for (const root of subPackageRootsCache) {
    if (filename.startsWith(`${root}/uni_modules/`)) {
      return filename.slice(root.length + 1)
    }
  }
  return filename
}

function normalizeComponentPackageFilename(filename: string) {
  let normalizedFilename = withoutSubPackageRootForUniModules(
    normalizePath(filename).split('?')[0].replace(/^\/+/, '')
  )
  const uniModulesIndex = normalizedFilename.indexOf('uni_modules/')
  if (uniModulesIndex > -1) {
    normalizedFilename = normalizedFilename.slice(uniModulesIndex)
  }
  return removeExt(normalizedFilename)
}

function getMiniProgramComponentPackageRoots(filename: string) {
  return componentPackageRootsCache.get(
    normalizeComponentPackageFilename(filename)
  )
}

export function isMiniProgramUsingComponent(
  name: string,
  options: {
    filename: string
    inputDir: string
    componentsDir?: string
  }
) {
  return !!findMiniProgramUsingComponents(options)[name]
}

interface MiniProgramComponents {
  [name: string]: MiniProgramComponentsType
}

export function findMiniProgramUsingComponents({
  filename,
  inputDir,
  componentsDir,
}: {
  filename: string
  inputDir: string
  componentsDir?: string
}): MiniProgramComponents {
  const globalUsingComponents = appJsonCache && appJsonCache.usingComponents
  // 避免 uniad 相关插件 被当作 vue 组件处理
  const enableUniAdPlugin = process.env.UNI_PLATFORM === 'mp-weixin'
  const miniProgramComponents: MiniProgramComponents = enableUniAdPlugin
    ? UNI_AD_PLUGINS.reduce((acc, name) => {
        acc[name] = 'plugin'
        return acc
      }, {})
    : {}
  if (globalUsingComponents) {
    extend(
      miniProgramComponents,
      findMiniProgramUsingComponent(globalUsingComponents, componentsDir)
    )
  }

  const ownerFilename = removeExt(
    normalizeMiniProgramFilename(filename, inputDir)
  )
  const jsonFile = findJsonFile(ownerFilename)
  if (jsonFile) {
    if (jsonFile.usingComponents) {
      extend(
        miniProgramComponents,
        findMiniProgramUsingComponent(
          jsonFile.usingComponents,
          componentsDir,
          ownerFilename
        )
      )
    }
    // mp-baidu 特有
    if (jsonFile.usingSwanComponents) {
      extend(
        miniProgramComponents,
        findMiniProgramUsingComponent(
          jsonFile.usingSwanComponents,
          componentsDir,
          ownerFilename
        )
      )
    }
  }

  return miniProgramComponents
}

function findMiniProgramUsingComponent(
  usingComponents: Record<string, string>,
  componentsDir?: string,
  ownerFilename?: string
) {
  return Object.keys(usingComponents).reduce<MiniProgramComponents>(
    (res, name) => {
      const path = usingComponents[name]
      if (path.includes('plugin://')) {
        // mp-weixin & mp-alipay
        res[name] = 'plugin'
      } else if (path.includes('dynamicLib://')) {
        // mp-baidu
        res[name] = 'dynamicLib'
      } else if (path.includes('ext://')) {
        // mp-toutiao
        res[name] = 'ext'
      } else if (
        componentsDir &&
        path.includes(componentsDir + '/') &&
        findUsingComponentsJson(path, componentsDir, ownerFilename).renderer ===
          'xr-frame'
      ) {
        // mp-weixin & x-frame
        res[name] = 'xr-frame'
      } else if (componentsDir && path.includes(componentsDir + '/')) {
        res[name] = 'component'
      } else if (path.startsWith('weui-miniprogram')) {
        res[name] = 'weui'
      }
      return res
    },
    {}
  )
}

/**
 * 开发者在配置usingComponents时，可以指向具体路径（不含文件后缀），也可以指向目录（指向目录时查找目录下的index.wxml/.json等）
 * 当usingComponents配置为`"demo": "/components/demo"`时，查找优先级为：
 * 1. /components/demo.wxml
 * 2. /components/demo/index.wxml
 *
 * 注意如下配置是非法的：
 * - "demo": "/components/demo.wxml"
 * - "demo": "/components/demo/"
 *
 * 注意用户的pages.json内可以配置如下三种路径：
 * - "demo": "/wxcomponents/demo"
 * - "demo": "wxcomponents/demo"
 * - [TODO 待确认] "demo": "../wxcomponents/demo"
 */

export function findUsingComponentsJson(
  pathInpages: string,
  componentsDir: string,
  ownerFilename?: string
): Record<any, any> {
  // 兼容test case
  if (!process.env.UNI_INPUT_DIR) return {}

  const fulldir = resolveUsingComponentsDir(
    pathInpages,
    componentsDir,
    ownerFilename
  )
  if (!fulldir) {
    console.warn(`${pathInpages} 路径里没有找到对应的 ${componentsDir} 目录`)
    return {}
  }
  let jsonPath = fulldir + '.json'
  if (fs.existsSync(jsonPath)) {
    return require(jsonPath) as Record<any, any>
  }
  jsonPath = path.resolve(fulldir, 'index.json')
  if (fs.existsSync(jsonPath)) {
    return require(jsonPath) as Record<any, any>
  }

  console.warn(`${pathInpages} 路径下没有找到对应的json文件`)
  return {}
}

function resolveUsingComponentsDir(
  pathInpages: string,
  componentsDir: string,
  ownerFilename?: string
) {
  const normalizedPath = normalizePath(pathInpages)
  if (normalizedPath.startsWith('/')) {
    return path.resolve(process.env.UNI_INPUT_DIR, '.' + normalizedPath)
  }
  if (ownerFilename && normalizedPath.startsWith('.')) {
    return path.resolve(
      process.env.UNI_INPUT_DIR,
      path.dirname(ownerFilename),
      normalizedPath
    )
  }
  const marker = componentsDir + '/'
  const index = normalizedPath.indexOf(marker)
  if (index === -1) {
    return
  }
  const dir = normalizedPath.slice(index + componentsDir.length)
  if (!dir) {
    return
  }
  return path.resolve(process.env.UNI_INPUT_DIR, componentsDir, '.' + dir)
}
