import fs from 'fs'
import { Plugin, ResolvedConfig } from 'vite'
import { parseVueRequest } from '@dcloudio/uni-cli-shared'

export function uniPageVuePlugin({
  command,
}: {
  command: ResolvedConfig['command']
}): Plugin {
  return {
    name: 'vite:uni-page-vue',
    load(id) {
      if (command === 'build') {
        const { filename, query } = parseVueRequest(id)
        if (query.mpType === 'page') {
          return fs.readFileSync(filename, 'utf8')
        }
      }
    },
    transform(code, id) {
      const { query } = parseVueRequest(id)
      if (query.mpType === 'page') {
        return code + `;_sfc_main.mpType='page'`
      }
    },
  }
}
