import fs from 'fs'
import path from 'path'
import { normalizePath } from '../../utils'
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

    plugin.resolveId = function (id, importer, options) {
      const res =
        origResolveId && origResolveId.call(this, id, importer, options)
      if (res) {
        return res
      }
      if (id.endsWith(JSON_JS)) {
        return jsonPath + '.js'
      }
    }
    plugin.configResolved = function (config) {
      opts.resolvedConfig = config
      jsonPath = normalizePath(path.join(process.env.UNI_INPUT_DIR, name))
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

      var pagesJson = fs.readFileSync(jsonPath, 'utf8')
      const pagesJsonJsFileName = name.split('.')[0] + '.js'
      const pagesJsonJsPath = path.join(
        process.env.UNI_INPUT_DIR,
        pagesJsonJsFileName
      )

      if (fs.existsSync(pagesJsonJsPath)) {
        delete require.cache[pagesJsonJsPath]
        const pagesJsonJsFn = require(pagesJsonJsPath)
        if (typeof pagesJsonJsFn === 'function') {
          pagesJson = pagesJsonJsFn(pagesJson)
          if (!pagesJson) {
            console.error(`${pagesJsonJsFileName}  必须返回一个 json 对象`)
          }
        } else {
          console.error(`${pagesJsonJsFileName} 必须导出 function`)
        }
      }

      return pagesJson
    }
    return plugin
  }
}
