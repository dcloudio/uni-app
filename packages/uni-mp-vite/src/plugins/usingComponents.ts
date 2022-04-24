import path from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
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
  withSourcemap,
} from '@dcloudio/uni-cli-shared'
import { virtualComponentPath, virtualPagePath } from './entry'

export function uniUsingComponentsPlugin(
  options: {
    normalizeComponentName?: (name: string) => string
    babelParserPlugins?: SFCScriptCompileOptions['babelParserPlugins']
  } = {}
): Plugin {
  const normalizeComponentName =
    options.normalizeComponentName || ((name: string) => name)
  const parseAst = (source: string, id: string) => {
    return parseProgram(source, id, {
      babelParserPlugins: options.babelParserPlugins,
    })
  }
  const inputDir = process.env.UNI_INPUT_DIR
  let resolvedConfig: ResolvedConfig
  return {
    name: 'uni:mp-using-component',
    enforce: 'post',
    configResolved(config) {
      resolvedConfig = config
    },
    async transform(source, id) {
      const { filename, query } = parseVueRequest(id)
      if (filename.endsWith('App.vue')) {
        return null
      }
      const sourceMap = withSourcemap(resolvedConfig)
      const dynamicImportOptions = {
        id,
        sourceMap,
        dynamicImport,
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
          updateMiniProgramComponentsByScriptFilename(
            filename,
            inputDir,
            normalizeComponentName
          )
          return transformDynamicImports(
            source,
            descriptor.imports,
            dynamicImportOptions
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
          updateMiniProgramComponentsByTemplateFilename(
            filename,
            inputDir,
            normalizeComponentName
          )
          return transformDynamicImports(
            source,
            descriptor.imports,
            dynamicImportOptions
          )
        }
        return null
      }
      if (!EXTNAME_VUE.includes(path.extname(filename))) {
        return null
      }

      const ast = parseAst(source, id)

      const descriptor = await parseMainDescriptor(filename, ast, this.resolve)

      updateMiniProgramComponentsByMainFilename(
        filename,
        inputDir,
        normalizeComponentName
      )

      return transformDynamicImports(
        source,
        descriptor.imports,
        dynamicImportOptions
      )
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
