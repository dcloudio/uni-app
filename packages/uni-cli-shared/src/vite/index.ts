import { Plugin } from 'vite'
export interface UniVitePlugin extends Plugin {
  uni?: {
    transformEvent?: Record<string, string>
  }
}

export * from './utils'
export * from './plugins'
export * from './features'
