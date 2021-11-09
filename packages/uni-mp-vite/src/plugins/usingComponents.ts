import path from 'path'
import type { Plugin } from 'vite'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import {
  EXTNAME_VUE,
  parseVueRequest,
  transformVueComponentImports,
  normalizeMiniProgramFilename,
  addMiniProgramUsingComponents,
  removeExt,
} from '@dcloudio/uni-cli-shared'
import { virtualComponentPath } from './entry'

export function uniUsingComponentsPlugin(
  options: Partial<SFCScriptCompileOptions> = {}
): Plugin {
  return {
    name: 'vite:uni-mp-using-component',
    async transform(source, id) {
      const { filename, query } = parseVueRequest(id)
      if (query.vue) {
        return null
      }
      if (!EXTNAME_VUE.includes(path.extname(filename))) {
        return null
      }
      const inputDir = process.env.UNI_INPUT_DIR
      const { code, usingComponents } = await transformVueComponentImports(
        source,
        id,
        {
          root: inputDir,
          resolve: this.resolve,
          dynamicImport,
          babelParserPlugins: options.babelParserPlugins,
        }
      )

      addMiniProgramUsingComponents(
        removeExt(normalizeMiniProgramFilename(id, inputDir)),
        usingComponents
      )

      return {
        code,
        map: this.getCombinedSourcemap(),
      }
    },
  }
}

export function dynamicImport(name: string, value: string) {
  return `const ${name} = ()=>import('${virtualComponentPath(value)}')`
}
