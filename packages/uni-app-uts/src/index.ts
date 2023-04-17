import { uniAppUTSPlugin } from './plugins'
import { uniAppMainPlugin } from './plugins/mainUTS'
import { uniAppManifestPlugin } from './plugins/manifestJson'
import { uniAppPagesPlugin } from './plugins/pagesJson'
import { uniPrePlugin } from './plugins/pre'
import { uniAppUVuePlugin } from './plugins/uvue'
export default () => {
  return [
    uniPrePlugin(),
    uniAppUTSPlugin(),
    uniAppUVuePlugin(),
    uniAppMainPlugin(),
    uniAppManifestPlugin(),
    uniAppPagesPlugin(),
  ]
}
