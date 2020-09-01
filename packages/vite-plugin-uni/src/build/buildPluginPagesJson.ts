import fs from 'fs'
import { Plugin } from 'rollup'
import { parsePagesJson } from '../utils'

let transformed = false
const pagesJsonName = 'pages.json'
const pagesJsonAliasName = pagesJsonName + '.js'
export const buildPluginPagesJson: Plugin = {
  name: 'uni:pages',
  resolveId(source) {
    if (!transformed && source.endsWith(pagesJsonName)) {
      transformed = true
      return source.replace(pagesJsonName, pagesJsonAliasName)
    }
    return null
  },
  load(id) {
    if (id.endsWith(pagesJsonAliasName)) {
      console.log(id.replace(pagesJsonAliasName, pagesJsonName))
      return parsePagesJson(
        fs
          .readFileSync(id.replace(pagesJsonAliasName, pagesJsonName))
          .toString()
      )
    }
    return null
  }
}
