import { initProvide, uniViteInjectPlugin } from '@dcloudio/uni-cli-shared'
import { UniAppPlugin } from './plugin'
import { uniCopyPlugin } from './plugins/copy'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniResolveIdPlugin } from './plugins/resolveId'

const plugins = [
  uniResolveIdPlugin(),
  uniCopyPlugin(),
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  uniViteInjectPlugin(initProvide()),
  UniAppPlugin,
]
export default plugins
