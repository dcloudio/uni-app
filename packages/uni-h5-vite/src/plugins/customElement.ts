import type { Plugin } from 'vite'
import { camelize, capitalize } from '@vue/shared'

import { UVUE_WEB_BUILT_IN_CUSTOM_ELEMENTS } from '@dcloudio/uni-shared'
import { isVueSfcFile } from '@dcloudio/uni-cli-shared'

const H5_COMPONENTS_PATH = '@dcloudio/uni-h5'

export function uniCustomElementPlugin(): Plugin {
  return {
    name: 'uni:h5-custom-element',
    transform(code, id) {
      if (!isVueSfcFile(id)) {
        return
      }
      if (!code.includes('$UniCustomElement$')) {
        return
      }
      const importSpecifiers: string[] = []
      code = code.replace(
        /['|"]\$UniCustomElement\$([\w|-]+)['|"]/g,
        (_, name) => {
          if (!UVUE_WEB_BUILT_IN_CUSTOM_ELEMENTS.includes(name)) {
            return _
          }
          const elementName = capitalize(camelize(name))
          const localName = '_' + elementName + 'Element'
          importSpecifiers.push(`${elementName} as ${localName}`)
          return localName
        }
      )

      if (importSpecifiers.length) {
        code =
          `import {${importSpecifiers.join(
            ','
          )}} from "${H5_COMPONENTS_PATH}";` + code
      }
      return {
        code,
        map: null,
      }
    },
  }
}
