import path from 'path'
import type { Plugin } from 'vite'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import {
  EXTNAME_VUE,
  enableSourceMap,
  isAppVue,
  isMiniProgramPageFile,
  normalizePath,
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
import {
  getIndependentRoots,
  parseIndependentRoot,
  withoutIndependentRoot,
} from './independentUtils'
import type { CustomPluginOptions, ResolvedId } from 'rollup'

const parseMainDescriptorWithRoot =
  parseMainDescriptor as typeof parseMainDescriptor &
    ((
      filename: Parameters<typeof parseMainDescriptor>[0],
      ast: Parameters<typeof parseMainDescriptor>[1],
      resolve: Parameters<typeof parseMainDescriptor>[2],
      root?: string
    ) => ReturnType<typeof parseMainDescriptor>)
const parseScriptDescriptorWithRoot =
  parseScriptDescriptor as typeof parseScriptDescriptor &
    ((
      filename: Parameters<typeof parseScriptDescriptor>[0],
      ast: Parameters<typeof parseScriptDescriptor>[1],
      options: Parameters<typeof parseScriptDescriptor>[2] & { root?: string }
    ) => ReturnType<typeof parseScriptDescriptor>)
const parseTemplateDescriptorWithRoot =
  parseTemplateDescriptor as typeof parseTemplateDescriptor &
    ((
      filename: Parameters<typeof parseTemplateDescriptor>[0],
      ast: Parameters<typeof parseTemplateDescriptor>[1],
      options: Parameters<typeof parseTemplateDescriptor>[2] & { root?: string }
    ) => ReturnType<typeof parseTemplateDescriptor>)
const updateMiniProgramComponentsByMainFilenameWithRoot =
  updateMiniProgramComponentsByMainFilename as typeof updateMiniProgramComponentsByMainFilename &
    ((
      mainFilename: Parameters<
        typeof updateMiniProgramComponentsByMainFilename
      >[0],
      inputDir: Parameters<typeof updateMiniProgramComponentsByMainFilename>[1],
      normalizeComponentName: Parameters<
        typeof updateMiniProgramComponentsByMainFilename
      >[2],
      root?: string
    ) => ReturnType<typeof updateMiniProgramComponentsByMainFilename>)
const updateMiniProgramComponentsByScriptFilenameWithRoot =
  updateMiniProgramComponentsByScriptFilename as typeof updateMiniProgramComponentsByScriptFilename &
    ((
      scriptFilename: Parameters<
        typeof updateMiniProgramComponentsByScriptFilename
      >[0],
      inputDir: Parameters<
        typeof updateMiniProgramComponentsByScriptFilename
      >[1],
      normalizeComponentName: Parameters<
        typeof updateMiniProgramComponentsByScriptFilename
      >[2],
      root?: string
    ) => ReturnType<typeof updateMiniProgramComponentsByScriptFilename>)
const updateMiniProgramComponentsByTemplateFilenameWithRoot =
  updateMiniProgramComponentsByTemplateFilename as typeof updateMiniProgramComponentsByTemplateFilename &
    ((
      templateFilename: Parameters<
        typeof updateMiniProgramComponentsByTemplateFilename
      >[0],
      inputDir: Parameters<
        typeof updateMiniProgramComponentsByTemplateFilename
      >[1],
      normalizeComponentName: Parameters<
        typeof updateMiniProgramComponentsByTemplateFilename
      >[2],
      root?: string
    ) => ReturnType<typeof updateMiniProgramComponentsByTemplateFilename>)

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
      const independentRoot = parseIndependentRoot(id)
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
          importer
            ? withoutIndependentRoot(importer)
            : process.env.UNI_INPUT_DIR
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
          const descriptor = await parseScriptDescriptorWithRoot(
            filename,
            parseAst(source, id),
            {
              resolve,
              isExternal: true,
              root: independentRoot,
            }
          )
          updateMiniProgramComponentsByScriptFilenameWithRoot(
            filename,
            inputDir,
            normalizeComponentName,
            independentRoot
          )
          return transformDynamicImports(
            source,
            descriptor.imports,
            dynamicImportOptions
          )
        } else if (query.type === 'template') {
          // 需要主动监听
          this.addWatchFile(filename)
          const descriptor = await parseTemplateDescriptorWithRoot(
            filename,
            parseAst(source, id),
            {
              resolve,
              isExternal: true,
              root: independentRoot,
            }
          )
          updateMiniProgramComponentsByTemplateFilenameWithRoot(
            filename,
            inputDir,
            normalizeComponentName,
            independentRoot
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

      const descriptor = await parseMainDescriptorWithRoot(
        filename,
        ast,
        resolve,
        independentRoot
      )

      updateMiniProgramComponentsByMainFilenameWithRoot(
        filename,
        inputDir,
        normalizeComponentName,
        independentRoot
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
  let independentRoot = parseIndependentRoot(value)
  value = withoutIndependentRoot(value)
  independentRoot =
    independentRoot ||
    findIndependentRootByFilename(value, process.env.UNI_INPUT_DIR)
  // 开发者可能将页面作为组件来引用
  if (isMiniProgramPageFile(value, process.env.UNI_INPUT_DIR)) {
    return `const ${name} = ()=>import('${virtualPagePath(
      value,
      independentRoot
    )}')`
  }
  return `const ${name} = ()=>import('${virtualComponentPath(
    value,
    independentRoot
  )}')`
}

function findIndependentRootByFilename(filename: string, inputDir: string) {
  if (!inputDir || !path.isAbsolute(filename)) {
    return
  }
  const relativeFilename = normalizePath(path.relative(inputDir, filename))
  return [...getIndependentRoots()].find((root) => {
    const normalizedRoot = normalizePath(root).replace(/\/$/, '')
    return (
      relativeFilename === normalizedRoot ||
      relativeFilename.startsWith(`${normalizedRoot}/`)
    )
  })
}
