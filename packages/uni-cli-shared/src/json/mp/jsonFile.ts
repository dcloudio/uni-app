import { ComponentJson, PageWindowOptions, UsingComponents } from './types'

export const jsonPagesCache = new Map<string, PageWindowOptions>()
export const jsonComponentsCache = new Map<string, ComponentJson>()
export const jsonUsingComponentsCache = new Map<string, UsingComponents>()

export function addPageJson(filename: string, json: PageWindowOptions) {
  jsonPagesCache.set(filename, json)
}

export function addComponentJson(filename: string, json: ComponentJson) {
  jsonComponentsCache.set(filename, json)
}

export function addUsingComponents(filename: string, json: UsingComponents) {
  jsonUsingComponentsCache.set(filename, json)
}
