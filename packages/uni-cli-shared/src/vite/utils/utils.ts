import type { ConfigEnv, ResolvedConfig, UserConfig } from 'vite'
import { RollupError } from 'rollup'
import { CompilerError } from '@vue/compiler-sfc'
import { extend } from '@vue/shared'
import { codeFrameColumns } from '@babel/code-frame'
import { offsetToStartAndEnd } from '../plugins/vitejs/utils'

export function withSourcemap(config: ResolvedConfig) {
  if (config.command === 'serve') {
    return true
  }
  return !!config.build.sourcemap
}

export function isInHybridNVue(config: UserConfig | ResolvedConfig): boolean {
  return (config as any).nvue && process.env.UNI_RENDERER !== 'native'
}

export function isSsr(
  command: ConfigEnv['command'],
  config: UserConfig | ResolvedConfig
) {
  if (command === 'serve') {
    return !!(config.server && config.server.middlewareMode)
  }
  if (command === 'build') {
    return !!(config.build && config.build.ssr)
  }
  return false
}

export function createRollupError(
  plugin: string,
  id: string,
  error: CompilerError | SyntaxError,
  source?: string
): RollupError {
  const { message, name, stack } = error
  const rollupError: RollupError = extend(new Error(message), {
    id,
    plugin,
    name,
    stack,
  })

  if ('code' in error && error.loc) {
    rollupError.loc = {
      file: id,
      line: error.loc.start.line,
      column: error.loc.start.column,
    }
    if (source && source.length > 0) {
      if ('offsetStart' in error && 'offsetEnd' in error) {
        rollupError.frame = codeFrameColumns(
          source,
          offsetToStartAndEnd(
            source,
            error.offsetStart as number,
            error.offsetEnd as number
          )
        )
      } else {
        rollupError.frame = codeFrameColumns(source, error.loc)
      }
    }
  }
  if (id) {
    // 指定了id后，不让后续的rollup重写
    Object.defineProperty(rollupError, 'id', {
      get() {
        return id
      },
      set(_v) {},
    })
  }
  return rollupError
}

export const generateCodeFrameColumns = codeFrameColumns
