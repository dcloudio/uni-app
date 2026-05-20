import type { Plugin } from 'vite'
import { camelize, capitalize } from '@vue/shared'

import { UVUE_WEB_BUILT_IN_CUSTOM_ELEMENTS } from '@dcloudio/uni-shared'
import { isVueSfcFile } from '@dcloudio/uni-cli-shared'

const H5_COMPONENTS_PATH = '@dcloudio/uni-h5'

export function uniCustomElementPlugin(): Plugin {
  return {
    name: 'uni:h5-custom-element',
    transform: {
      filter: { id: /\.(vue|uvue)(\?|$)/, code: /\$UniCustomElement\$/ },
      handler(code, id) {
        if (!isVueSfcFile(id)) {
          return
        }
        if (!code.includes('$UniCustomElement$')) {
          return
        }
        const importSpecifiers: Set<string> = new Set()
        code = code.replace(
          /['|"]\$UniCustomElement\$([\w|-]+)['|"]/g,
          (_, name) => {
            if (!UVUE_WEB_BUILT_IN_CUSTOM_ELEMENTS.includes(name)) {
              return _
            }
            const elementName = capitalize(camelize(name))
            const localName = '_' + elementName + 'Element'
            importSpecifiers.add(`${elementName} as ${localName}`)
            return localName
          }
        )

        if (importSpecifiers.size) {
          code =
            `import {${Array.from(importSpecifiers).join(
              ','
            )}} from "${H5_COMPONENTS_PATH}";` + code
        }
        return {
          code,
          map: null,
        }
      },
    },
  }
}
