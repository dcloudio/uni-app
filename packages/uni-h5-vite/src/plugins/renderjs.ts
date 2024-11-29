import debug from 'debug'
import type { Plugin } from 'vite'

import { missingModuleName, parseRenderjs } from '@dcloudio/uni-cli-shared'

const debugRenderjs = debug('uni:h5-renderjs')

export function uniRenderjsPlugin(): Plugin {
  return {
    name: 'uni:h5-renderjs',
    transform(code, id) {
      const { type, name } = parseRenderjs(id)
      if (!type) {
        return
      }
      debugRenderjs(id)
      if (!name) {
        this.error(missingModuleName(type, code))
      }
      return {
        code: `${require('@vue/compiler-sfc').rewriteDefault(
          code.replace(/module\.exports\s*=/, 'export default '),
          '_sfc_' + type
        )}
${type === 'renderjs' ? genRenderjsCode(name) : genWxsCode(name)}`,
        map: { mappings: '' },
      }
    },
  }
}

function genRenderjsCode(name: string) {
  return `export default Comp => {
  if(!Comp.$renderjs){Comp.$renderjs = []}
  Comp.$renderjs.push('${name}')
  if(!Comp.mixins){Comp.mixins = []}
  Comp.mixins.push({beforeCreate(){ this['${name}'] = this },mounted(){ this.$ownerInstance = this.$gcd(this, true) }})
  Comp.mixins.push(_sfc_renderjs)
}`
}

function genWxsCode(name: string) {
  return `export default Comp => {
  if(!Comp.$wxs){Comp.$wxs = []} 
  Comp.$wxs.push('${name}')
  if(!Comp.mixins){Comp.mixins = []}
  Comp.mixins.push({beforeCreate(){ this['${name}'] = _sfc_wxs }})
}`
}
