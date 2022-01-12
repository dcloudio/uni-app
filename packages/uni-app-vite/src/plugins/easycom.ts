import path from 'path'
import { Plugin } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'

import {
  parseVueRequest,
  matchEasycom,
  addImportDeclaration,
  genResolveEasycomCode,
  EXTNAME_VUE_TEMPLATE,
} from '@dcloudio/uni-cli-shared'

interface UniEasycomPluginOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

export function uniEasycomPlugin(options: UniEasycomPluginOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'uni:app-easycom',
    transform(code, id) {
      if (!filter(id)) {
        return
      }
      const { filename, query } = parseVueRequest(id)
      if (
        query.type !== 'template' &&
        (query.vue || !EXTNAME_VUE_TEMPLATE.includes(path.extname(filename)))
      ) {
        return
      }
      let i = 0
      const importDeclarations: string[] = []
      code = code.replace(
        /_resolveComponent\("(.+?)"(, true)?\)/g,
        (str, name) => {
          if (name && !name.startsWith('_')) {
            const source = matchEasycom(name)
            if (source) {
              // 处理easycom组件优先级
              return genResolveEasycomCode(
                importDeclarations,
                str,
                addImportDeclaration(
                  importDeclarations,
                  `__easycom_${i++}`,
                  source
                )
              )
            }
          }
          return str
        }
      )
      if (importDeclarations.length) {
        code = importDeclarations.join('') + code
      }
      return {
        code,
        map: null,
      }
    },
  }
}
