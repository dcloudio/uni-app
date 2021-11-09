import { extend } from '@vue/shared'
import { initProvide, uniViteInjectPlugin } from '@dcloudio/uni-cli-shared'
import { uniMiniProgramPlugin, UniMiniProgramPluginOptions } from './plugin'
import { uniUsingComponentsPlugin } from './plugins/usingComponents'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniEntryPlugin } from './plugins/entry'
import type { SFCScriptCompileOptions } from '@vue/compiler-sfc'
import { uniRenderjsPlugin } from './plugins/renderjs'

export { UniMiniProgramPluginOptions } from './plugin'
export default (options: UniMiniProgramPluginOptions) => {
  return [
    (options: {
      vueOptions?: { script?: Partial<SFCScriptCompileOptions> }
    }) => {
      return uniMainJsPlugin(options.vueOptions?.script)
    },
    uniManifestJsonPlugin(options),
    uniPagesJsonPlugin(options),
    uniEntryPlugin(options),
    uniViteInjectPlugin(extend({}, options.vite.inject, initProvide())),
    uniRenderjsPlugin({ lang: options.template.filter?.lang }),
    uniMiniProgramPlugin(options),
    (options: {
      vueOptions?: { script?: Partial<SFCScriptCompileOptions> }
    }) => {
      return uniUsingComponentsPlugin(options.vueOptions?.script)
    },
  ]
}
