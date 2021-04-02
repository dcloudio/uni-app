import path from 'path'
import { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { camelize, capitalize } from '@vue/shared'

import { isBuiltInComponent } from '@dcloudio/uni-shared'
import { EXTNAME_VUE, parseVueRequest } from '@dcloudio/uni-cli-shared'

import { UniPluginFilterOptions } from '.'
import { debugEasycom, matchEasycom } from '../../utils'

const COMPONENTS_PATH = '@dcloudio/uni-h5/dist/uni-h5.esm.js'
const COMPONENTS_STYLE_PATH = '@dcloudio/uni-h5/style/'

export function uniEasycomPlugin(options: UniPluginFilterOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'vite:uni-easycom',
    transform(code, id) {
      if (!filter(id)) {
        return
      }
      const { filename, query } = parseVueRequest(id)
      if (query.vue || !EXTNAME_VUE.includes(path.extname(filename))) {
        return
      }
      debugEasycom(id)
      let i = 0
      const importDeclarations: string[] = []
      code = code.replace(/_resolveComponent\("(.+?)"\)/g, (str, name) => {
        if (name && !name.startsWith('_')) {
          if (isBuiltInComponent(name)) {
            return addBuiltInImportDeclaration(
              importDeclarations,
              `__syscom_${i++}`,
              name
            )
          }
          const source = matchEasycom(name)
          if (source) {
            return addImportDeclaration(
              importDeclarations,
              `__easycom_${i++}`,
              source
            )
          }
        }
        return str
      })
      if (importDeclarations.length) {
        code = importDeclarations.join('') + code
      }
      return code
    },
  }
}

function addBuiltInImportDeclaration(
  importDeclarations: string[],
  local: string,
  name: string
) {
  importDeclarations.push(`import '${COMPONENTS_STYLE_PATH + name + '.css'}';`)
  return addImportDeclaration(
    importDeclarations,
    local,
    COMPONENTS_PATH,
    capitalize(camelize(name))
  )
}

function addImportDeclaration(
  importDeclarations: string[],
  local: string,
  source: string,
  imported?: string
) {
  importDeclarations.push(createImportDeclaration(local, source, imported))
  return local
}

function createImportDeclaration(
  local: string,
  source: string,
  imported?: string
) {
  if (imported) {
    return `import {${imported} as ${local}} from '${source}';`
  }
  return `import ${local} from '${source}';`
}
