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
  let dropConsole = false
  return {
    name: 'uni:console',
    enforce: 'pre',
    configResolved(config) {
      resolvedConfig = config
      // 理论上发行模式就不应该有这个逻辑了，只不过为了尽量不引发兼容性问题，目前严谨一些判断是否配置了 drop_console
      if (process.env.NODE_ENV !== 'development') {
        const compressOptions = resolvedConfig.build.terserOptions?.compress
        if (compressOptions && typeof compressOptions === 'object') {
          dropConsole = !!compressOptions.drop_console
        }
      }
    },
    transform(code, id) {
      if (dropConsole) {
        return
      }
      if (isRenderjs(id) || isWxs(id)) {
        return {
          code: restoreConsoleExpr(code),
          map: { mappings: '' },
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
