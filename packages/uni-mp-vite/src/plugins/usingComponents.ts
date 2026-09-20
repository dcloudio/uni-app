import path from 'path'
import type { Plugin } from 'vite'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import {
  EXTNAME_VUE,
  addMiniProgramComponentPackageRoot,
  enableSourceMap,
  findMiniProgramComponentPackageRoot,
  isAppVue,
  isMiniProgramPageFile,
  normalizePath,
  parseMainDescriptor,
  parseProgram,
  parseScriptDescriptor,
  parseTemplateDescriptor,
  parseVueRequest,
  resolveMiniProgramComponentPackageRoot,
  resolveUTSModule,
  transformDynamicImports,
  updateMiniProgramComponentsByMainFilename,
  updateMiniProgramComponentsByScriptFilename,
  updateMiniProgramComponentsByTemplateFilename,
} from '@dcloudio/uni-cli-shared'
import {
  getSubPackageRootByFilename,
  virtualComponentPath,
  virtualPagePath,
} from './entry'
import {
  getIndependentRootByFilename,
  parseIndependentRoot,
  withoutIndependentRoot,
} from './independentUtils'
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
      const independentRoot = parseIndependentRoot(id)
      if (isAppVue(filename)) {
        return null
      }
      const sourceMap = enableSourceMap()
      const packageRoot =
        inputDir && !independentRoot
          ? getSubPackageRootByFilename(filename, inputDir) ||
            findMiniProgramComponentPackageRoot(filename)
          : undefined
      const dynamicImportOptions = {
        id,
        sourceMap,
        dynamicImport: (name: string, value: string) =>
          dynamicImport(name, value, {
            root: independentRoot,
            packageRoot,
            checkIndependentRoot: true,
            inputDir,
          }),
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
        const cleanImporter = importer
          ? withoutIndependentRoot(importer)
          : undefined
        const id = resolveUTSModule(
          source,
          cleanImporter || process.env.UNI_INPUT_DIR
        )
        if (id) {
          source = id
        }
        return this.resolve(source, cleanImporter, options)
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
              root: independentRoot,
            }
          )
          updateMiniProgramComponentsByScriptFilename(
            filename,
            inputDir,
            normalizeComponentName,
            independentRoot,
            packageRoot
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
              root: independentRoot,
            }
          )
          updateMiniProgramComponentsByTemplateFilename(
            filename,
            inputDir,
            normalizeComponentName,
            independentRoot,
            packageRoot
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

      const descriptor = await parseMainDescriptor(
        filename,
        ast,
        resolve,
        independentRoot
      )

      updateMiniProgramComponentsByMainFilename(
        filename,
        inputDir,
        normalizeComponentName,
        independentRoot,
        packageRoot
      )

      return transformDynamicImports(
        source,
        descriptor.imports,
        dynamicImportOptions
      )
    },
  }
}

interface DynamicImportOptions {
  root?: string
  packageRoot?: string
  inferRoot?: boolean
  checkIndependentRoot?: boolean
  inputDir?: string
}

export function dynamicImport(
  name: string,
  value: string,
  options: DynamicImportOptions = {}
) {
  const sourceRoot = parseIndependentRoot(value)
  value = withoutIndependentRoot(value)
  const inputDir = options.inputDir || process.env.UNI_INPUT_DIR
  const targetRoot =
    sourceRoot ||
    (options.inferRoot || options.checkIndependentRoot
      ? getIndependentRootByFilename(value, inputDir)
      : undefined)
  if (
    options.checkIndependentRoot &&
    targetRoot &&
    targetRoot !== options.root
  ) {
    throw new Error(
      `暂不支持跨分包组件同步引用：${value} 属于独立分包 "${targetRoot}"，请将组件移动到当前包内。`
    )
  }
  let independentRoot = options.root || sourceRoot
  if (!independentRoot && options.inferRoot) {
    independentRoot = targetRoot
  }
  // 开发者可能将页面作为组件来引用
  if (isMiniProgramPageFile(value, inputDir)) {
    return `const ${name} = ()=>import('${virtualPagePath(
      value,
      independentRoot
    )}')`
  }
  return `const ${name} = ()=>import('${virtualComponentPath(
    value,
    independentRoot,
    resolveComponentPackageRoot(value, options)
  )}')`
}

function resolveComponentPackageRoot(
  value: string,
  { inputDir, packageRoot, root }: DynamicImportOptions
) {
  if (!inputDir || !packageRoot || root) {
    return
  }
  const filename = normalizePath(value).split('?')[0]
  const relativeFilename = path.isAbsolute(filename)
    ? normalizePath(path.relative(inputDir, filename))
    : filename
  if (relativeFilename.startsWith('uni_modules/')) {
    addMiniProgramComponentPackageRoot(relativeFilename, packageRoot)
    return resolveMiniProgramComponentPackageRoot(relativeFilename, packageRoot)
  }
}
