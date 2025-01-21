import path from 'path'
import { extend } from '@vue/shared'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import {
  isEnableConsole,
  normalizePath,
  resolveSourceMapPath,
  resolveUTSCompiler,
  uniDecryptUniModulesPlugin,
  uniEncryptUniModulesAssetsPlugin,
  uniEncryptUniModulesPlugin,
  uniHBuilderXConsolePlugin,
  uniSourceMapPlugin,
  uniUTSUVueJavaScriptPlugin,
  uniViteInjectPlugin,
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
  const normalizeComponentName = options.template.component?.normalizeName

  const sourceMapDir = resolveSourceMapPath(
    process.env.UNI_OUTPUT_DIR,
    process.env.UNI_PLATFORM
  )

  return [
    ...(isEnableConsole() ? [uniHBuilderXConsolePlugin('uni.__f__')] : []),
    ...(process.env.UNI_APP_X === 'true'
      ? [
          uniDecryptUniModulesPlugin(),
          uniUTSUVueJavaScriptPlugin(),
          resolveUTSCompiler().uts2js({
            inputDir: process.env.UNI_INPUT_DIR,
            version: process.env.UNI_COMPILER_VERSION,
            cacheRoot: path.resolve(
              process.env.UNI_APP_X_CACHE_DIR,
              '.uts2js/cache'
            ),
            modules: {
              vueCompilerDom,
              uniCliShared,
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
    uniViteInjectPlugin(
      'uni:mp-inject',
      extend({ exclude: [/uni.api.esm/, /uni.mp.esm/] }, options.vite.inject)
    ),
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
