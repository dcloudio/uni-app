import { extend } from '@vue/shared'
import { ComponentJson, PageWindowOptions, UsingComponents } from './types'
import { removeExt, normalizeNodeModules } from '../../utils'
import { relativeFile } from '../../resolve'

let appJsonCache: Record<string, any> = {}
const jsonFilesCache = new Map<string, string>()
const jsonPagesCache = new Map<string, PageWindowOptions>()
const jsonComponentsCache = new Map<string, ComponentJson>()
const jsonUsingComponentsCache = new Map<string, UsingComponents>()

export function isPageFile(file: string) {
  return jsonPagesCache.has(removeExt(file))
}

export function hasJsonFile(filename: string) {
  return (
    filename === 'app' ||
    jsonPagesCache.has(filename) ||
    jsonComponentsCache.has(filename)
  )
}

export function normalizeJsonFilename(filename: string) {
  return normalizeNodeModules(filename)
}

export function findChangedJsonFiles() {
  const changedJsonFiles = new Map<string, string>()
  function findChangedFile(filename: string, json: Record<string, any>) {
    const newJson = extend({}, json)
    if (!newJson.usingComponents) {
      newJson.usingComponents = {}
    }
    extend(newJson.usingComponents, jsonUsingComponentsCache.get(filename))
    const usingComponents = newJson.usingComponents
    // 格式化为相对路径，这样作为分包也可以直接运行
    Object.keys(usingComponents).forEach((name) => {
      usingComponents[name] = relativeFile(
        filename,
        usingComponents[name].slice(1)
      )
    })

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
