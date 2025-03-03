import path from 'path'
import type { Plugin } from 'vite'
import { camelize, capitalize } from '@vue/shared'
import { type FilterPattern, createFilter } from '@rollup/pluginutils'
import { parseVueRequest } from '../utils/url'
import { EXTNAME_VUE_TEMPLATE } from '../../constants'
import {
  addImportDeclaration,
  genResolveEasycomCode,
  matchEasycom,
} from '../../easycom'

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
      const { filename } = parseVueRequest(id)
      if (!EXTNAME_VUE_TEMPLATE.includes(path.extname(filename))) {
        return
      }
      if (!code.includes('_resolveComponent')) {
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
                  source,
                  source.includes('uts-proxy')
                    ? capitalize(camelize(name)) + 'Component'
                    : source.includes('uni_helpers')
                    ? capitalize(camelize(name))
                    : ''
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
        map: {
          mappings: '',
        },
      }
    },
  }
}
