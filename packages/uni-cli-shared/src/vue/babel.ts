import type * as BabelCore from '@babel/core'
import type { PluginObj } from '@babel/core'
import { isBuiltInComponent } from '@dcloudio/uni-shared'

export function transformUniH5Jsx({ types }: typeof BabelCore): PluginObj {
  return {
    name: 'babel-plugin-uni-h5-jsx',
    visitor: {
      JSXOpeningElement({ node: { name } }) {
        if (types.isJSXIdentifier(name) && isBuiltInComponent(name.name)) {
          name.name = 'v-uni-' + name.name
        }
      },
    },
  }
}
