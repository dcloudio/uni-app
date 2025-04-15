import debug from 'debug'
import type { Plugin, ResolvedConfig } from 'vite'
import { type FilterPattern, createFilter } from '@rollup/pluginutils'

import { isJsFile, parseVueRequest } from '../utils'
import { restoreConsoleExpr, rewriteConsoleExpr } from '../../logs/console'
import { withSourcemap } from '../../vite/utils/utils'
import { isRenderjs, isWxs } from '../../filter'

export interface ConsoleOptions {
  method: string
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
      if (isRenderjs(id) || isWxs(id)) {
        return {
          code: restoreConsoleExpr(code),
          map: null,
        }
      }
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
        options.method,
        id,
        filename,
        code,
        withSourcemap(resolvedConfig)
      )
    },
  }
}
