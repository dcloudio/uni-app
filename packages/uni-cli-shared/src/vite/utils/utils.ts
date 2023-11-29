import type { ConfigEnv, ResolvedConfig, UserConfig } from 'vite'
import { generateCodeFrame, locToStartAndEnd } from '../plugins/vitejs/utils'
import { RollupError } from 'rollup'
import { CompilerError } from '@vue/compiler-sfc'

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
  const rollupError: RollupError = {
    id,
    plugin,
    message,
    name,
    stack,
  }

  if ('code' in error && error.loc) {
    rollupError.loc = {
      file: id,
      line: error.loc.start.line,
      column: error.loc.start.column,
    }
    if (source && source.length > 0) {
      if ('offsetStart' in error && 'offsetEnd' in error) {
        rollupError.frame = generateCodeFrame(
          source,
          error.offsetStart as number,
          error.offsetEnd as number
        ).replace(/\t/g, ' ')
      } else {
        const { start, end } = locToStartAndEnd(source, error.loc)
        rollupError.frame = generateCodeFrame(source, start, end).replace(
          /\t/g,
          ' '
        )
      }
    }
  }
  return rollupError
}
