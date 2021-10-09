import { uniMiniProgramPlugin, UniMiniProgramPluginOptions } from './plugin'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniVirtualPlugin } from './plugins/virtual'
export default (options: UniMiniProgramPluginOptions) => {
  return [
    uniMainJsPlugin(),
    uniManifestJsonPlugin(),
    uniPagesJsonPlugin(),
    uniVirtualPlugin(options),
    uniMiniProgramPlugin(options),
  ]
}
