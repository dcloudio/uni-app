import type { ResolvedConfig } from 'vite'

export function withSourcemap(config: ResolvedConfig) {
  if (config.command === 'serve') {
    return true
  }
  return !!config.build.sourcemap
}
