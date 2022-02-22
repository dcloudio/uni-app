import path from 'path'
import { extend } from '@vue/shared'
import { ComponentJson, PageWindowOptions, UsingComponents } from './types'
import {
  removeExt,
  normalizePath,
  normalizeNodeModules,
  normalizeMiniProgramFilename,
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

export function findChangedJsonFiles() {
  const changedJsonFiles = new Map<string, string>()
  function findChangedFile(filename: string, json: Record<string, any>) {
    const newJson = JSON.parse(JSON.stringify(json))
    if (!newJson.usingComponents) {
      newJson.usingComponents = {}
    }
    extend(newJson.usingComponents, jsonUsingComponentsCache.get(filename))
    const usingComponents = newJson.usingComponents as Record<string, string>
    // 格式化为相对路径，这样作为分包也可以直接运行
    // app.json mp-baidu 在 win 不支持相对路径。所有平台改用绝对路径
    if (filename !== 'app') {
      Object.keys(usingComponents).forEach((name) => {
        const componentFilename = usingComponents[name]
        if (componentFilename.startsWith('/')) {
          usingComponents[name] = relativeFile(
            filename,
            componentFilename.slice(1)
          )
        }
      })
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
  [name: string]: 'plugin' | 'component'
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
  if (jsonFile?.usingComponents) {
    extend(
      miniProgramComponents,
      findMiniProgramUsingComponent(jsonFile.usingComponents, componentsDir)
    )
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
      if (componentsDir && path.includes(componentsDir + '/')) {
        res[name] = 'component'
      } else if (path.includes('plugin://')) {
        res[name] = 'plugin'
      }
      return res
    },
    {}
  )
}
