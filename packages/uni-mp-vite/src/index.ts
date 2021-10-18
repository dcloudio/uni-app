import { uniMiniProgramPlugin, UniMiniProgramPluginOptions } from './plugin'
import { uniUsingComponentsPlugin } from './plugins/usingComponents'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniEntryPlugin } from './plugins/entry'
import { SFCScriptCompileOptions } from '@vue/compiler-sfc'
export { UniMiniProgramPluginOptions } from './plugin'
export default (options: UniMiniProgramPluginOptions) => {
  return [
    uniMainJsPlugin(options),
    uniManifestJsonPlugin(options),
    uniPagesJsonPlugin(options),
    uniEntryPlugin(options),
    uniMiniProgramPlugin(options),
    (options: {
      vueOptions?: { script?: Partial<SFCScriptCompileOptions> }
    }) => {
      return uniUsingComponentsPlugin(options.vueOptions?.script)
    },
  ]
}
