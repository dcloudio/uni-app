import type { ResolvedConfig, UserConfig } from 'vite'

export function withSourcemap(config: ResolvedConfig) {
  if (config.command === 'serve') {
    return true
  }
  return !!config.build.sourcemap
}

export function isInHybridNVue(config: UserConfig | ResolvedConfig): boolean {
  return (config as any).nvue && process.env.UNI_RENDERER !== 'native'
}
