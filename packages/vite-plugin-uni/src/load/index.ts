import debug from 'debug'
import { Plugin } from 'vite'

import { VitePluginUniResolvedOptions } from '..'
import { main } from './main'
import { pages } from './pages'

const debugLoad = debug('uni:load')

const loads = [main, pages]

export function createLoad(
  options: VitePluginUniResolvedOptions
): Plugin['load'] {
  return (id) => {
    const item = loads.find((item) => item.test(id, options.inputDir))
    if (item) {
      debugLoad(id)
      return item.load(id, options)
    }
  }
}
