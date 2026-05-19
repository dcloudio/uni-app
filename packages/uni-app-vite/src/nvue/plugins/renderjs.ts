import type { Plugin } from 'vite'

import { parseRenderjs } from '@dcloudio/uni-cli-shared'

export function uniRenderjsPlugin(): Plugin {
  return {
    name: 'uni:app-nvue-renderjs',
    transform: {
      filter: { id: /vue&type=(?:wxs|renderjs|sjs)/ },
      async handler(code, id) {
        const { type } = parseRenderjs(id)
        if (!type) {
          return
        }
        return {
          code: `export default {}`,
          map: { mappings: '' },
        }
      },
    },
  }
}
