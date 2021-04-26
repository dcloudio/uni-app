import debug from 'debug'
import { Plugin } from 'vite'
import { rewriteDefault } from '@vue/compiler-sfc'

import { parseVueRequest } from '@dcloudio/uni-cli-shared'

const debugRenderjs = debug('uni:renderjs')

export function uniRenderjsPlugin(): Plugin {
  return {
    name: 'vite:uni-renderjs',
    transform(code, id) {
      const isWxs = /vue&type=wxs/.test(id)
      const isRenderjs = /vue&type=renderjs/.test(id)
      if (!isWxs && !isRenderjs) {
        return
      }
      const type = isWxs ? 'wxs' : 'renderjs'
      const { query } = parseVueRequest(id)
      debugRenderjs(id)
      if (!(query as any).name) {
        this.error(
          `<script module="missing module name" lang="${type}">
${code}
</script>`
        )
      }
      return `${rewriteDefault(code, '_sfc_' + type)}
export default Comp => {
  if(!Comp.mixins){Comp.mixins = []}
  Comp.mixins.push({beforeCreate(){ this['${(query as any).name}'] = this }})
  Comp.mixins.push(_sfc_${type})
}`
    },
  }
}
