import path from 'path'
import { normalizePath } from '../../utils'

import {
  CreateUniViteFilterPlugin,
  UniViteFilterPluginOptions,
} from '../utils/plugin'

export function defineUniMainJsPlugin(
  createUniMainJsPlugin: CreateUniViteFilterPlugin
) {
  const opts = {
    resolvedConfig: {},
    filter(id) {
      return id === mainJsPath || id === mainTsPath || id === mainUTsPath
    },
  } as UniViteFilterPluginOptions

  const plugin = createUniMainJsPlugin(opts)
  const origConfigResolved = plugin.configResolved as Function

  let mainJsPath = ''
  let mainTsPath = ''
  let mainUTsPath = ''
  plugin.configResolved = function (config) {
    opts.resolvedConfig = config
    const mainPath = normalizePath(
      path.resolve(process.env.UNI_INPUT_DIR, 'main')
    )
    mainJsPath = mainPath + '.js'
    mainTsPath = mainPath + '.ts'
    mainUTsPath = mainPath + '.uts'
    return origConfigResolved && origConfigResolved(config)
  }

  return plugin
}
