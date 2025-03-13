import path from 'path'
import type { Plugin } from 'vite'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import {
  EXTNAME_VUE,
  enableSourceMap,
  isAppVue,
  isMiniProgramPageFile,
  parseMainDescriptor,
  parseProgram,
  parseScriptDescriptor,
  parseTemplateDescriptor,
  parseVueRequest,
  resolveUTSModule,
  transformDynamicImports,
  updateMiniProgramComponentsByMainFilename,
  updateMiniProgramComponentsByScriptFilename,
  updateMiniProgramComponentsByTemplateFilename,
} from '@dcloudio/uni-cli-shared'
import { virtualComponentPath, virtualPagePath } from './entry'
import type { CustomPluginOptions, ResolvedId } from 'rollup'

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
  return {
    name: 'uni:mp-using-component',
    enforce: 'post',
    async transform(source, id) {
      const { filename, query } = parseVueRequest(id)
      if (isAppVue(filename)) {
        return null
      }
      const sourceMap = enableSourceMap()
      const dynamicImportOptions = {
        id,
        sourceMap,
        dynamicImport,
      }
      const resolve = async (
        source: string,
        importer?: string,
        options?: {
          custom?: CustomPluginOptions
          isEntry?: boolean
          skipSelf?: boolean
        }
      ): Promise<ResolvedId | null> => {
        const id = resolveUTSModule(
          source,
          importer || process.env.UNI_INPUT_DIR
        )
        if (id) {
          source = id
        }
        return this.resolve(source, importer, options)
      }
      if (query.vue) {
        if (query.type === 'script') {
          // 需要主动监听
          this.addWatchFile(filename)
          const descriptor = await parseScriptDescriptor(
            filename,
            parseAst(source, id),
            {
              resolve,
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
              resolve,
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

      const descriptor = await parseMainDescriptor(filename, ast, resolve)

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
  if (isMiniProgramPageFile(value, process.env.UNI_INPUT_DIR)) {
    return `const ${name} = ()=>import('${virtualPagePath(value)}')`
  }
  return `const ${name} = ()=>import('${virtualComponentPath(value)}')`
}
