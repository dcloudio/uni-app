import { uniMiniProgramPlugin, UniMiniProgramPluginOptions } from './plugin'
import { uniComponentPlugin } from './plugins/component'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniVirtualPlugin } from './plugins/virtual'
export { UniMiniProgramPluginOptions } from './plugin'
export default (options: UniMiniProgramPluginOptions) => {
  return [
    uniMainJsPlugin(options),
    uniManifestJsonPlugin(options),
    uniPagesJsonPlugin(options),
    uniVirtualPlugin(options),
    uniMiniProgramPlugin(options),
    uniComponentPlugin(),
  ]
}
