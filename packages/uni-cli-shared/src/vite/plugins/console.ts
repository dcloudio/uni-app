import debug from 'debug'
import { Plugin } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'

import { isJsFile, parseVueRequest } from '../utils'
import { rewriteConsoleExpr } from '../../logs/console'

export interface ConsoleOptions {
  filename?: (filename: string) => string
  include?: FilterPattern
  exclude?: FilterPattern
}

const debugConsole = debug('vite:uni:console')

export function uniConsolePlugin(options: ConsoleOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-console',
    enforce: 'pre',
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
      return {
        code: rewriteConsoleExpr(filename, code),
        map: null,
      }
    },
  }
}
