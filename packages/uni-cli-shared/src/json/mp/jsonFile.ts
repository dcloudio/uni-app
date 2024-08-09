import path from 'path'
import { extend } from '@vue/shared'
import type { ComponentJson, PageWindowOptions, UsingComponents } from './types'
import {
  normalizeMiniProgramFilename,
  normalizeNodeModules,
  normalizePath,
  removeExt,
} from '../../utils'
import { relativeFile } from '../../resolve'
import { isVueSfcFile } from '../../vue/utils'

let appJsonCache: Record<string, any> = {}
const jsonFilesCache = new Map<string, string>()
const jsonPagesCache = new Map<string, PageWindowOptions>()
const jsonComponentsCache = new Map<string, ComponentJson>()
const jsonUsingComponentsCache = new Map<string, UsingComponents>()

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

export function normalizeJsonFilename(filename: string) {
  return normalizeNodeModules(filename)
}

export function findChangedJsonFiles(
  supportGlobalUsingComponents: boolean = true
) {
  const changedJsonFiles = new Map<string, string>()
  function findChangedFile(filename: string, json: Record<string, any>) {
    const newJson = JSON.parse(JSON.stringify(json))
    if (!newJson.usingComponents) {
      newJson.usingComponents = {}
    }
    extend(newJson.usingComponents, jsonUsingComponentsCache.get(filename))
    // 格式化为相对路径，这样作为分包也可以直接运行
    // app.json mp-baidu 在 win 不支持相对路径。所有平台改用绝对路径
    if (filename !== 'app') {
      let usingComponents = newJson.usingComponents as Record<string, string>
      // 如果小程序不支持 global 的 usingComponents
      if (!supportGlobalUsingComponents) {
        // 从取全局的 usingComponents 并补充到子组件 usingComponents 中
        const globalUsingComponents = appJsonCache?.usingComponents || {}
        const globalComponents = findUsingComponents('app') || {}
        usingComponents = {
          ...globalUsingComponents,
          ...globalComponents,
          ...newJson.usingComponents,
        }
      }
      Object.keys(usingComponents).forEach((name) => {
        const componentFilename = usingComponents[name]
        if (componentFilename.startsWith('/')) {
          usingComponents[name] = relativeFile(
            filename,
            componentFilename.slice(1)
          )
        }
      })
      newJson.usingComponents = usingComponents
    }

    const jsonStr = JSON.stringify(newJson, null, 2)
    if (jsonFilesCache.get(filename) !== jsonStr) {
      changedJsonFiles.set(filename, jsonStr)
      jsonFilesCache.set(filename, jsonStr)
    }
  }
  function findChangedFiles(jsonsCache: Map<string, any>) {
    for (const name of jsonsCache.keys()) {
      findChangedFile(name, jsonsCache.get(name))
    }
  }
  findChangedFile('app', appJsonCache)
  findChangedFiles(jsonPagesCache)
  findChangedFiles(jsonComponentsCache)
  return changedJsonFiles
}

export function addMiniProgramAppJson(appJson: Record<string, any>) {
  appJsonCache = appJson
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
  [name: string]: 'plugin' | 'component' | 'dynamicLib' | 'ext' | 'xr-frame'
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
  const miniProgramComponents: MiniProgramComponents = {}
  if (globalUsingComponents) {
    extend(
      miniProgramComponents,
      findMiniProgramUsingComponent(globalUsingComponents, componentsDir)
    )
  }

  const jsonFile = findJsonFile(
    removeExt(normalizeMiniProgramFilename(filename, inputDir))
  )
  if (jsonFile) {
    if (jsonFile.usingComponents) {
      extend(
        miniProgramComponents,
        findMiniProgramUsingComponent(jsonFile.usingComponents, componentsDir)
      )
    }
    // mp-baidu 特有
    if (jsonFile.usingSwanComponents) {
      extend(
        miniProgramComponents,
        findMiniProgramUsingComponent(
          jsonFile.usingSwanComponents,
          componentsDir
        )
      )
    }
  }

  return miniProgramComponents
}

function findMiniProgramUsingComponent(
  usingComponents: Record<string, string>,
  componentsDir?: string
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
        findUsingComponentsJson(path, componentsDir).renderer === 'xr-frame'
      ) {
        // mp-weixin & x-frame
        res[name] = 'xr-frame'
      } else if (componentsDir && path.includes(componentsDir + '/')) {
        res[name] = 'component'
      }
      return res
    },
    {}
  )
}

function findUsingComponentsJson(pathInpages, componentsDir) {
  let [, dir] = pathInpages.split(componentsDir)
  dir = '.' + dir
  const fulldir = path.resolve(process.env.UNI_INPUT_DIR, componentsDir, dir)
  const json = require(path.resolve(fulldir, 'index.json')) as Record<any, any>
  return json
}
