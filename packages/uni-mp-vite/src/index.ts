import { extend } from '@vue/shared'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import { uniViteInjectPlugin } from '@dcloudio/uni-cli-shared'

import { uniMiniProgramPlugin, UniMiniProgramPluginOptions } from './plugin'
import { uniUsingComponentsPlugin } from './plugins/usingComponents'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniEntryPlugin } from './plugins/entry'

import { uniRenderjsPlugin } from './plugins/renderjs'
import { uniRuntimeHooksPlugin } from './plugins/runtimeHooks'
import { uniSubpackagePlugin } from './plugins/subpackage'
import { uniMiniProgramPluginPlugin } from './plugins/plugin'

export { UniMiniProgramPluginOptions } from './plugin'
export default (options: UniMiniProgramPluginOptions) => {
  if (!options.app.subpackages) {
    delete process.env.UNI_SUBPACKAGE
  }
  if (!options.app.plugins) {
    delete process.env.UNI_MP_PLUGIN
  }
  return [
    (options: {
      vueOptions?: { script?: Partial<SFCScriptCompileOptions> }
    }) => {
      return uniMainJsPlugin(options.vueOptions?.script)
    },
    uniManifestJsonPlugin(options),
    uniPagesJsonPlugin(options),
    uniEntryPlugin(options),
    uniViteInjectPlugin(extend({}, options.vite.inject)),
    uniRenderjsPlugin({ lang: options.template.filter?.lang }),
    uniRuntimeHooksPlugin(),
    uniMiniProgramPlugin(options),
    (options: {
      vueOptions?: { script?: Partial<SFCScriptCompileOptions> }
    }) => {
      return uniUsingComponentsPlugin(options.vueOptions?.script)
    },
    ...(process.env.UNI_SUBPACKAGE ? [uniSubpackagePlugin(options)] : []),
    ...(process.env.UNI_MP_PLUGIN ? [uniMiniProgramPluginPlugin(options)] : []),
  ]
}
