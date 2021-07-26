import { Plugin } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'

export interface ConsoleOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

export function uniConsolePlugin(options: ConsoleOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-app-console',
    transform(code, id) {
      if (!filter(id)) return null
      if (!code.includes('console.')) {
        return null
      }
    },
  }
}
