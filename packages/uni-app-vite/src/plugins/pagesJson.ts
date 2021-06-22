import { Plugin } from 'vite'

import {
  defineUniPagesJsonPlugin,
  normalizeAppPagesJson,
} from '@dcloudio/uni-cli-shared'

export function uniPagesJsonPlugin(): Plugin {
  return defineUniPagesJsonPlugin((opts) => {
    return {
      name: 'vite:uni-app-pages-json',
      enforce: 'pre',
      transform(code, id) {
        if (!opts.filter(id)) {
          return
        }
        return (
          `import './manifest.json.js'\n` +
          normalizeAppPagesJson(JSON.parse(code))
        )
      },
    }
  })
}
