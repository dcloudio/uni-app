import path from 'path'
import { readFileSync } from 'fs-extra'
import { extend } from '@vue/shared'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import type { Plugin } from 'vite'
import {
  EXTNAME_VUE,
  enableSourceMap,
  getWorkers,
  isEnableConsole,
  isInHBuilderX,
  isNormalCompileTarget,
  normalizePath,
  parseJson,
  requireUniHelpers,
  resolveSourceMapPath,
  resolveUTSCompiler,
  resolveWorkersRootDir,
  uniDecryptUniModulesPlugin,
  uniEncryptUniModulesAssetsPlugin,
  uniEncryptUniModulesPlugin,
  uniHBuilderXConsolePlugin,
  uniJavaScriptWorkersPlugin,
  uniSourceMapPlugin,
  uniUTSUVueJavaScriptPlugin,
  uniViteInjectPlugin,
  uniWorkersPlugin,
} from '@dcloudio/uni-cli-shared'

import {
  type UniMiniProgramPluginOptions,
  uniMiniProgramPlugin,
} from './plugin'
import { uniUsingComponentsPlugin } from './plugins/usingComponents'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniEntryPlugin } from './plugins/entry'

import { uniRenderjsPlugin } from './plugins/renderjs'
import { uniRuntimeHooksPlugin } from './plugins/runtimeHooks'
import { uniSubpackagePlugin } from './plugins/subpackage'
import { uniMiniProgramPluginPlugin } from './plugins/plugin'

import * as vueCompilerDom from '@vue/compiler-dom'
import * as uniCliShared from '@dcloudio/uni-cli-shared'

export { UniMiniProgramPluginOptions } from './plugin'
export default (options: UniMiniProgramPluginOptions) => {
  if (!options.app.subpackages) {
    delete process.env.UNI_SUBPACKAGE
  }
  if (!options.app.plugins) {
    delete process.env.UNI_MP_PLUGIN
  }
  // 云编译会使用该环境变量
  process.env.UNI_MP_GLOBAL = options.global
  const normalizeComponentName = options.template.component?.normalizeName

  const sourceMapDir = resolveSourceMapPath(
    process.env.UNI_OUTPUT_DIR,
    process.env.UNI_PLATFORM
  )

  const plugins: Plugin[] = []
  if (isInHBuilderX() && process.env.UNI_PLATFORM === 'mp-weixin') {
    const { UUVP } = requireUniHelpers()
    plugins.push(UUVP(getFilterPaths))
  }
  return [
    ...plugins,
    ...(process.env.UNI_APP_X === 'true' && isNormalCompileTarget()
      ? [uniWorkersPlugin(), uniJavaScriptWorkersPlugin()]
      : []),
    ...(isEnableConsole() ? [uniHBuilderXConsolePlugin('uni.__f__')] : []),
    ...(process.env.UNI_APP_X === 'true'
      ? [
          uniDecryptUniModulesPlugin(),
          uniUTSUVueJavaScriptPlugin(),
          resolveUTSCompiler().uts2js({
            platform: process.env.UNI_PLATFORM as any,
            inputDir: process.env.UNI_INPUT_DIR,
            version: process.env.UNI_COMPILER_VERSION,
            sourceMap: enableSourceMap(),
            cacheRoot: path.resolve(
              process.env.UNI_APP_X_CACHE_DIR,
              '.uts2js/cache'
            ),
            modules: {
              vueCompilerDom,
              uniCliShared,
            },
            workers: {
              extname: '.js',
              rewriteRootDir: resolveWorkersRootDir(),
              resolve: () => {
                return getWorkers()
              },
            },
          }),
        ]
      : []),
    ...(process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? []
      : [
          () => {
            return uniMainJsPlugin({
              normalizeComponentName,
              babelParserPlugins: ['typescript'],
            })
          },
          uniManifestJsonPlugin(options),
          uniPagesJsonPlugin(options),
        ]),
    uniEntryPlugin(options),
    ...(process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? []
      : [
          uniViteInjectPlugin(
            'uni:mp-inject',
            extend(
              { exclude: [/uni.api.esm/, /uni.mp.esm/] },
              options.vite.inject
            )
          ),
        ]),
    uniRenderjsPlugin({ lang: options.template.filter?.lang }),
    uniRuntimeHooksPlugin(),
    uniMiniProgramPlugin(options),
    (options: {
      vueOptions?: { script?: Partial<SFCScriptCompileOptions> }
    }) => {
      return uniUsingComponentsPlugin({
        normalizeComponentName,
        babelParserPlugins: options.vueOptions?.script?.babelParserPlugins,
      })
    },
    ...(process.env.UNI_SUBPACKAGE ? [uniSubpackagePlugin(options)] : []),
    ...(process.env.UNI_MP_PLUGIN ? [uniMiniProgramPluginPlugin(options)] : []),
    ...(process.env.UNI_COMPILE_TARGET === 'uni_modules'
      ? [uniEncryptUniModulesAssetsPlugin(), uniEncryptUniModulesPlugin()]
      : []),
    uniSourceMapPlugin({
      sourceMapDir,
      relativeSourceMapDir: normalizePath(
        path.relative(path.dirname(process.env.UNI_OUTPUT_DIR), sourceMapDir)
      ),
    }),
  ]
}

export function resolveMiniProgramRuntime(dirname: string, fileName: string) {
  if (process.env.UNI_APP_X === 'true') {
    return path.resolve(dirname, `../dist-x/${fileName}`)
  }
  return path.resolve(dirname, `${fileName}`)
}

function getFilterPaths() {
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  const pagesJsonPath = path.join(inputDir, 'pages.json')
  const pagesJson = parseJson(
    readFileSync(pagesJsonPath, 'utf8'),
    true,
    pagesJsonPath
  ) as UniApp.PagesJson
  const allPagesJson = parseJson(
    readFileSync(pagesJsonPath, 'utf8'),
    false,
    pagesJsonPath
  ) as UniApp.PagesJson

  const pages = pagesJson.pages.map((page) =>
    normalizePath(path.join(inputDir, page.path))
  )
  const allPages = allPagesJson.pages.map((page) =>
    normalizePath(path.join(inputDir, page.path))
  )

  const subPackages = (pagesJson.subPackages || pagesJson.subpackages || [])
    .map((subPackage) =>
      subPackage.pages.map((page) =>
        normalizePath(path.join(inputDir, subPackage.root, page.path))
      )
    )
    .flat()
  const allSubPackages = (
    allPagesJson.subPackages ||
    allPagesJson.subpackages ||
    []
  )
    .map((subPackage) =>
      subPackage.pages.map((page) =>
        normalizePath(path.join(inputDir, subPackage.root, page.path))
      )
    )
    .flat()
  const filterFiles = [
    ...allPages.filter((page) => !pages.includes(page)),
    ...allSubPackages.filter((page) => !subPackages.includes(page)),
  ]
    .map((file) => EXTNAME_VUE.map((ext) => file + ext))
    .flat()
  return filterFiles
}
