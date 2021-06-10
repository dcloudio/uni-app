import { Plugin, ResolvedConfig } from 'vite'

export type CreateUniViteFilterPlugin = (
  opts: UniViteFilterPluginOptions
) => Plugin
export interface UniViteFilterPluginOptions {
  resolvedConfig: ResolvedConfig
  filter: (id: string) => boolean
}
