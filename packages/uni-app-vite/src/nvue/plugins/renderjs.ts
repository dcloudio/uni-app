import type { Plugin } from 'vite'

import { parseRenderjs } from '@dcloudio/uni-cli-shared'

export function uniRenderjsPlugin(): Plugin {
  return {
    name: 'uni:app-nvue-renderjs',
    async transform(code, id) {
      const { type } = parseRenderjs(id)
      if (!type) {
        return
      }
      return {
        code: `export default {}`,
        map: { mappings: '' },
      }
    },
  }
}
