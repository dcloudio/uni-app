import fs from 'fs'
import path from 'path'
import slash from 'slash'
import debug from 'debug'
import { Plugin } from 'vite'
import { parseVueRequest } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '../..'

const debugPageVue = debug('uni:page-vue')

export function uniPageVuePlugin(
  options: VitePluginUniResolvedOptions
): Plugin {
  const appVuePath = slash(path.resolve(options.inputDir, 'App.vue'))
  return {
    name: 'vite:uni-page-vue',
    load(id) {
      if (options.command === 'build') {
        const { filename, query } = parseVueRequest(id)
        if (query.mpType === 'page') {
          return fs.readFileSync(filename, 'utf8')
        }
      }
    },
    transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (filename === appVuePath && !query.vue) {
        debugPageVue(filename)
        return (
          code +
          `;import {setupApp} from '@dcloudio/uni-h5';setupApp(_sfc_main);`
        )
      }
      if (query.mpType === 'page') {
        debugPageVue(filename)
        return (
          code +
          `;import {setupPage} from '@dcloudio/uni-h5';setupPage(_sfc_main);`
        )
      }
    },
  }
}
