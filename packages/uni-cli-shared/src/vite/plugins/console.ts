import debug from 'debug'
import { Plugin, ResolvedConfig } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'

import { isJsFile, parseVueRequest } from '../utils'
import { rewriteConsoleExpr } from '../../logs/console'
import { withSourcemap } from '../../vite/utils/utils'

export interface ConsoleOptions {
  filename?: (filename: string) => string
  include?: FilterPattern
  exclude?: FilterPattern
}

const debugConsole = debug('uni:console')

export function uniConsolePlugin(options: ConsoleOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:console',
    enforce: 'pre',
    configResolved(config) {
      resolvedConfig = config
    },
    transform(code, id) {
      if (!filter(id)) return null
      if (!isJsFile(id)) return null
      let { filename } = parseVueRequest(id)
      if (options.filename) {
        filename = options.filename(filename)
      }
      if (!filename) {
        return null
      }
      if (!code.includes('console.')) {
        return null
      }
      debugConsole(id)
      return rewriteConsoleExpr(
        id,
        filename,
        code,
        withSourcemap(resolvedConfig)
      )
    },
  }
}
