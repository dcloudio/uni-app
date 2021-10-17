import path from 'path'
import { Plugin } from 'vite'
import {
  EXTNAME_VUE,
  parseVueRequest,
  findVueComponentImports,
} from '@dcloudio/uni-cli-shared'
import MagicString from 'magic-string'
import { virtualComponentPath } from './virtual'

export function uniComponentPlugin(): Plugin {
  return {
    name: 'vite:uni-mp-component',
    async transform(code, id) {
      const { filename, query } = parseVueRequest(id)
      if (query.vue) {
        return null
      }
      if (!EXTNAME_VUE.includes(path.extname(filename))) {
        return null
      }
      const vueComponentImports = await findVueComponentImports(
        code,
        id,
        this.resolve
      )
      if (!vueComponentImports.length) {
        return null
      }
      const s = new MagicString(code)
      const rewriteImports: string[] = []
      vueComponentImports.forEach(({ n, ss, se, i }) => {
        s.remove(ss, se)
        rewriteImports.push(
          `const ${i} = ()=>import('${virtualComponentPath(n!)}')`
        )
      })
      s.prepend(rewriteImports.join(';') + ';\n')
      return s.toString()
    },
  }
}
