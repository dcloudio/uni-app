import path from 'path'
import type { Plugin } from 'vite'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import {
  EXTNAME_VUE,
  parseVueRequest,
  isMiniProgramPageFile,
  parseProgram,
  parseScriptDescriptor,
  parseTemplateDescriptor,
  parseMainDescriptor,
  updateMiniProgramComponentsByMainFilename,
  transformDynamicImports,
  updateMiniProgramComponentsByScriptFilename,
  updateMiniProgramComponentsByTemplateFilename,
} from '@dcloudio/uni-cli-shared'
import { virtualComponentPath, virtualPagePath } from './entry'

export function uniUsingComponentsPlugin(
  options: Partial<SFCScriptCompileOptions> = {}
): Plugin {
  const parseAst = (source: string, id: string) => {
    return parseProgram(source, id, {
      babelParserPlugins: options.babelParserPlugins,
    })
  }
  const inputDir = process.env.UNI_INPUT_DIR
  return {
    name: 'vite:uni-mp-using-component',
    enforce: 'post',
    async transform(source, id) {
      const { filename, query } = parseVueRequest(id)
      if (filename.endsWith('App.vue')) {
        return null
      }
      if (query.vue) {
        if (query.type === 'script') {
          // 需要主动监听
          this.addWatchFile(filename)
          const descriptor = await parseScriptDescriptor(
            filename,
            parseAst(source, id),
            {
              resolve: this.resolve,
              isExternal: true,
            }
          )
          updateMiniProgramComponentsByScriptFilename(filename, inputDir)
          return transformDynamicImports(
            source,
            descriptor.imports,
            dynamicImport
          )
        } else if (query.type === 'template') {
          // 需要主动监听
          this.addWatchFile(filename)
          const descriptor = await parseTemplateDescriptor(
            filename,
            parseAst(source, id),
            {
              resolve: this.resolve,
              isExternal: true,
            }
          )
          updateMiniProgramComponentsByTemplateFilename(filename, inputDir)
          return transformDynamicImports(
            source,
            descriptor.imports,
            dynamicImport
          )
        }
        return null
      }
      if (!EXTNAME_VUE.includes(path.extname(filename))) {
        return null
      }

      const ast = parseAst(source, id)

      const descriptor = await parseMainDescriptor(filename, ast, this.resolve)

      updateMiniProgramComponentsByMainFilename(filename, inputDir)

      return transformDynamicImports(source, descriptor.imports, dynamicImport)
    },
  }
}

export function dynamicImport(name: string, value: string) {
  // 开发者可能将页面作为组件来引用
  if (isMiniProgramPageFile(value)) {
    return `const ${name} = ()=>import('${virtualPagePath(value)}')`
  }
  return `const ${name} = ()=>import('${virtualComponentPath(value)}')`
}
