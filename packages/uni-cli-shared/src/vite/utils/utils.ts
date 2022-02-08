import type { ConfigEnv, ResolvedConfig, UserConfig } from 'vite'

export function withSourcemap(config: ResolvedConfig) {
  if (config.command === 'serve') {
    return true
  }
  return !!config.build.sourcemap
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
