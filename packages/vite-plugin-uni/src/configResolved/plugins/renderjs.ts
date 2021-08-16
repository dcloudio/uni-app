import debug from 'debug'
import { Plugin } from 'vite'
import { rewriteDefault } from '@vue/compiler-sfc'

import { parseVueRequest } from '@dcloudio/uni-cli-shared'

const debugRenderjs = debug('vite:uni:renderjs')

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
      const name: string = (query as any).name
      if (!name) {
        this.error(
          `<script module="missing module name" lang="${type}">
${code}
</script>`
        )
      }
      return {
        code: `${rewriteDefault(
          code.replace(/module\.exports\s*=/, 'export default '),
          '_sfc_' + type
        )}
  ${type === 'renderjs' ? genRenderjsCode(name) : genWxsCode(name)}`,
        map: null,
      }
    },
  }
}

function genRenderjsCode(name: string) {
  return `export default Comp => {
  if(!Comp.mixins){Comp.mixins = []}
  Comp.mixins.push({beforeCreate(){ this['${name}'] = this }})
  Comp.mixins.push(_sfc_renderjs)
}`
}

function genWxsCode(name: string) {
  return `export default Comp => {
  if(!Comp.mixins){Comp.mixins = []}
  Comp.mixins.push({beforeCreate(){ this['${name}'] = _sfc_wxs }})
}`
}
