import { uniMiniProgramPlugin, UniMiniProgramPluginOptions } from './plugin'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniVirtualPlugin } from './plugins/virtual'
export { UniMiniProgramPluginOptions } from './plugin'
export default (options: UniMiniProgramPluginOptions) => {
  return [
    uniMainJsPlugin(options),
    uniManifestJsonPlugin(),
    uniPagesJsonPlugin(),
    uniVirtualPlugin(options),
    uniMiniProgramPlugin(options),
  ]
}
