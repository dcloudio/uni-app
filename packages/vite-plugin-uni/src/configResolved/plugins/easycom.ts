import path from 'path'
import { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { camelize, capitalize } from '@vue/shared'

import { isBuiltInComponent } from '@dcloudio/uni-shared'
import { EXTNAME_VUE, parseVueRequest } from '@dcloudio/uni-cli-shared'

import { UniPluginFilterOptions } from '.'
import { debugEasycom, matchEasycom } from '../../utils'

const BASE_COMPONENTS_STYLE_PATH = '@dcloudio/uni-components/style/'
const H5_COMPONENTS_PATH = '@dcloudio/uni-h5/dist/uni-h5.esm.js'
const H5_COMPONENTS_STYLE_PATH = '@dcloudio/uni-h5/style/'

const baseComponents = [
  'audio',
  'button',
  'canvas',
  'checkbox',
  'checkbox-group',
  'editor',
  'form',
  'icon',
  'image',
  'input',
  'label',
  'movable-area',
  'movable-view',
  'navigator',
  'picker-view',
  'picker-view-column',
  'progress',
  'radio',
  'radio-group',
  'resize-sensor',
  'rich-text',
  'scroll-view',
  'slider',
  'swiper',
  'swiper-item',
  'switch',
  'text',
  'textarea',
  'view',
]

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
  if (baseComponents.includes(name)) {
    importDeclarations.push(
      `import '${BASE_COMPONENTS_STYLE_PATH + name + '.css'}';`
    )
  } else {
    importDeclarations.push(
      `import '${H5_COMPONENTS_STYLE_PATH + name + '.css'}';`
    )
  }
  return addImportDeclaration(
    importDeclarations,
    local,
    H5_COMPONENTS_PATH,
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
