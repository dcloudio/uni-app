import { UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniResolveIdPlugin } from './plugins/resolveId'

const UniAppPlugin: UniVitePlugin = {
  name: 'vite:uni-app',
  uni: {
    transformEvent: {
      tap: 'click',
    },
  },
}

export default [
  uniResolveIdPlugin(),
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  UniAppPlugin,
]
