import debug from 'debug'
import { Plugin } from 'vite'

import { missingModuleName, parseRenderjs } from '@dcloudio/uni-cli-shared'

const debugRenderjs = debug('vite:uni:renderjs')

export function uniRenderjsPlugin(): Plugin {
  return {
    name: 'vite:uni-app-renderjs',
    transform(code, id) {
      const { type, name } = parseRenderjs(id)
      if (!type) {
        return
      }
      debugRenderjs(id)
      if (!name) {
        this.error(missingModuleName(type, code))
      }
      this.emitFile({
        fileName: '.renderjs.js',
        type: 'asset',
        source: code,
      })
      return `export default Comp => {
        ;(Comp.$${type} || (Comp.$${type} = [])).push('${name}')
      }`
    },
  }
}
