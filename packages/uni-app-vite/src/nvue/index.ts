import { Plugin } from 'vite'
import { createRollupOptions } from './rollup'
export function uniNVuePlugin(pagePath: string): Plugin {
  return {
    name: 'vite:uni-app-nvue',
    config() {
      return {
        build: {
          rollupOptions: createRollupOptions(pagePath),
        },
      }
    },
  }
}
