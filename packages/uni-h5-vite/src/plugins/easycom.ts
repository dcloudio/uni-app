import path from 'path'
import type { Plugin } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { camelize, capitalize } from '@vue/shared'

import { COMPONENT_PREFIX, isBuiltInComponent } from '@dcloudio/uni-shared'
import {
  H5_COMPONENTS_STYLE_PATH,
  BASE_COMPONENTS_STYLE_PATH,
  X_BASE_COMPONENTS_STYLE_PATH,
  COMPONENT_DEPS_CSS,
  parseVueRequest,
  buildInCssSet,
  isCombineBuiltInCss,
  matchEasycom,
  addImportDeclaration,
  genResolveEasycomCode,
  EXTNAME_VUE_TEMPLATE,
} from '@dcloudio/uni-cli-shared'

const H5_COMPONENTS_PATH = '@dcloudio/uni-h5'

const xBaseComponents = ['slider', 'switch']
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
  'refresher',
  'rich-text',
  'scroll-view',
  'slider',
  'swiper',
  'swiper-item',
  'switch',
  'text',
  'textarea',
  'view',
  'list-view',
  'list-item',
  'sticky-section',
  'sticky-header',
]

interface UniEasycomPluginOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

export function uniEasycomPlugin(options: UniEasycomPluginOptions): Plugin {
  const filter = createFilter(options.include, options.exclude)
  let needCombineBuiltInCss = false
  return {
    name: 'uni:h5-easycom',
    configResolved(config) {
      needCombineBuiltInCss = isCombineBuiltInCss(config)
    },
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
            if (isBuiltInComponent(name)) {
              name = name.replace(COMPONENT_PREFIX, '')
              const local = `__syscom_${i++}`
              if (needCombineBuiltInCss) {
                // 发行模式下，应该将内置组件css输出到入口css中
                resolveBuiltInCssImport(name).forEach((cssImport) =>
                  buildInCssSet.add(cssImport)
                )
                return addImportDeclaration(
                  importDeclarations,
                  local,
                  H5_COMPONENTS_PATH,
                  capitalize(camelize(name))
                )
              }
              return addBuiltInImportDeclaration(
                importDeclarations,
                local,
                name
              )
            }
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

function resolveBuiltInCssImport(name: string) {
  const cssImports: string[] = []
  if (baseComponents.includes(name)) {
    const isX = process.env.UNI_APP_X === 'true'
    if (isX && xBaseComponents.includes(name)) {
      cssImports.push(X_BASE_COMPONENTS_STYLE_PATH + name + '.css')
    } else {
      cssImports.push(BASE_COMPONENTS_STYLE_PATH + name + '.css')
    }
  } else {
    cssImports.push(H5_COMPONENTS_STYLE_PATH + name + '.css')
  }
  const deps = COMPONENT_DEPS_CSS[name as keyof typeof COMPONENT_DEPS_CSS]
  deps && deps.forEach((dep) => cssImports.push(dep))
  return cssImports
}

function addBuiltInImportDeclaration(
  importDeclarations: string[],
  local: string,
  name: string
) {
  resolveBuiltInCssImport(name).forEach((cssImport) =>
    importDeclarations.push(`import '${cssImport}';`)
  )
  return addImportDeclaration(
    importDeclarations,
    local,
    H5_COMPONENTS_PATH,
    capitalize(camelize(name))
  )
}
