import fs from 'fs'
import path from 'path'
import { JSON_JS_MAP } from '../../constants'
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
  return function (createVitePlugin: CreateUniViteFilterPlugin) {
    const opts = {
      resolvedConfig: {},
      filter(id) {
        return id.endsWith(JSON_JS)
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
      if (id.endsWith(JSON_JS)) {
        return jsonJsPath
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
