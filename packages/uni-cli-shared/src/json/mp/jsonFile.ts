import { extend } from '@vue/shared'
import { ComponentJson, PageWindowOptions, UsingComponents } from './types'
import { normalizeNodeModules } from '../../utils'

let appJsonCache: Record<string, any> = {}
const jsonFilesCache = new Map<string, string>()
const jsonPagesCache = new Map<string, PageWindowOptions>()
const jsonComponentsCache = new Map<string, ComponentJson>()
const jsonUsingComponentsCache = new Map<string, UsingComponents>()

export function normalizeJsonFilename(filename: string) {
  return normalizeNodeModules(filename)
}

export function findChangedJsonFiles() {
  const changedJsonFiles = new Map<string, string>()
  function findChangedFile(name: string, json: Record<string, any>) {
    const newJson = extend({}, json)
    if (!newJson.usingComponents) {
      newJson.usingComponents = {}
    }
    extend(newJson.usingComponents, jsonUsingComponentsCache.get(name))
    const jsonStr = JSON.stringify(newJson, null, 2)
    if (jsonFilesCache.get(name) !== jsonStr) {
      changedJsonFiles.set(name, jsonStr)
      jsonFilesCache.set(name, jsonStr)
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
