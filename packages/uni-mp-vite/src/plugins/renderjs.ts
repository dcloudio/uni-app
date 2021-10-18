import debug from 'debug'
import { Plugin } from 'vite'

import { missingModuleName, parseRenderjs } from '@dcloudio/uni-cli-shared'

const debugRenderjs = debug('vite:uni:renderjs')

export function uniRenderjsPlugin(): Plugin {
  return {
    name: 'vite:uni-mp-renderjs',
    transform(code, id) {
      const { type, name } = parseRenderjs(id)
      if (!type) {
        return
      }
      debugRenderjs(id)
      if (!name) {
        this.error(missingModuleName(type, code))
      }
      if (type === 'wxs') {
        console.log('wxs', id, code)
        // this.emitFile({
        //   type: 'asset',
        //   fileName: '',
        //   source: code,
        // })
      }
      return {
        code: 'export default {}',
      }
    },
  }
}
