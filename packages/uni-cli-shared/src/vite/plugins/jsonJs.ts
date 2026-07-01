import fs from 'fs'
import path from 'path'
import { JSON_JS_MAP } from '../../constants'
import { MP_INDEPENDENT_ROOT_QUERY } from '../../json/mp/subpackage'
import { normalizePath } from '../../utils'
import type {
  CreateUniViteFilterPlugin,
  UniViteFilterPluginOptions,
} from '../utils/plugin'

export const defineUniPagesJsonPlugin = createDefineJsonJsPlugin('pages.json')
export const defineUniManifestJsonPlugin =
  createDefineJsonJsPlugin('manifest.json')

function createDefineJsonJsPlugin(name: 'pages.json' | 'manifest.json') {
  const JSON_JS = JSON_JS_MAP[name]
  // pages-json-js 仅允许独立分包 root query；manifest-json-js 仍保持 app 级。
  const allowedQuery = name === 'pages.json' ? MP_INDEPENDENT_ROOT_QUERY : ''
  return function (createVitePlugin: CreateUniViteFilterPlugin) {
    const opts = {
      resolvedConfig: {},
      filter(id) {
        return !!parseJsonJsRequest(id, JSON_JS, allowedQuery)
      },
    } as UniViteFilterPluginOptions

    const plugin = createVitePlugin(opts)
    const origLoad = plugin.load as Function
    const origResolveId = plugin.resolveId as Function
    const origConfigResolved = plugin.configResolved as Function

    let jsonPath = ''
    let jsonJsPath = ''

    plugin.resolveId = function (id, importer, options) {
      const res =
        origResolveId && origResolveId.call(this, id, importer, options)
      if (res) {
        return res
      }
      const jsonJsRequest = parseJsonJsRequest(id, JSON_JS, allowedQuery)
      if (jsonJsRequest) {
        return jsonJsPath + jsonJsRequest.query
      }
    }
    plugin.configResolved = function (config) {
      opts.resolvedConfig = config
      jsonPath = normalizePath(path.join(process.env.UNI_INPUT_DIR, name))
      jsonJsPath = normalizePath(path.join(process.env.UNI_INPUT_DIR, JSON_JS))
      return origConfigResolved && origConfigResolved(config)
    }

    plugin.load = function (id, ssr) {
      const res = origLoad && origLoad.call(this, id, ssr)
      if (res) {
        return res
      }
      if (!opts.filter(id)) {
        return
      }
      return fs.readFileSync(jsonPath, 'utf8')
    }
    return plugin
  }
}

function parseJsonJsRequest(id: string, jsonJs: string, allowedQuery: string) {
  const queryIndex = id.indexOf('?')
  const query = queryIndex === -1 ? '' : id.slice(queryIndex + 1)
  if (query && !isAllowedJsonJsQuery(query, allowedQuery)) {
    return
  }
  if (queryIndex !== -1 && !query) {
    return
  }
  const filename = queryIndex === -1 ? id : id.slice(0, queryIndex)
  if (!filename.endsWith(jsonJs)) {
    return
  }
  return {
    filename,
    query: queryIndex === -1 ? '' : id.slice(queryIndex),
  }
}

function isAllowedJsonJsQuery(query: string, allowedQuery: string) {
  if (!allowedQuery) {
    return false
  }
  const items = query.split('&')
  if (items.length !== 1) {
    return false
  }
  const item = items[0]
  const equalIndex = item.indexOf('=')
  if (equalIndex === -1) {
    return false
  }
  return (
    item.slice(0, equalIndex) === allowedQuery &&
    item.slice(equalIndex + 1).length > 0
  )
}
