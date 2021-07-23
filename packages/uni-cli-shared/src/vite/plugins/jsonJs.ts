import fs from 'fs'
import path from 'path'
import slash from 'slash'
import {
  CreateUniViteFilterPlugin,
  UniViteFilterPluginOptions,
} from '../utils/plugin'

export const defineUniPagesJsonPlugin = createDefineJsonJsPlugin('pages.json')
export const defineUniManifestJsonPlugin =
  createDefineJsonJsPlugin('manifest.json')

function createDefineJsonJsPlugin(name: 'pages.json' | 'manifest.json') {
  const JSON_JS = name + '.js'
  return function (createVitePlugin: CreateUniViteFilterPlugin) {
    const opts = {
      resolvedConfig: {},
      filter(id) {
        return id.endsWith(JSON_JS)
      },
    } as UniViteFilterPluginOptions

    const plugin = createVitePlugin(opts)
    const origLoad = plugin.load
    const origResolveId = plugin.resolveId
    const origConfigResolved = plugin.configResolved

    let jsonPath = ''

    plugin.resolveId = function (id, importer, options, ssr) {
      const res =
        origResolveId && origResolveId.call(this, id, importer, options, ssr)
      if (res) {
        return res
      }
      if (id.endsWith(JSON_JS)) {
        return jsonPath + '.js'
      }
    }
    plugin.configResolved = function (config) {
      opts.resolvedConfig = config
      jsonPath = slash(path.join(process.env.UNI_INPUT_DIR, name))
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
