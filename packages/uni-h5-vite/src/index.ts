import { UniVitePlugin } from '@dcloudio/uni-cli-shared'
import { uniCssPlugin } from './plugins/css'
import { uniCssScopedPlugin } from './plugins/cssScoped'
import { uniInjectPlugin } from './plugins/inject'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'
import { uniResolveIdPlugin } from './plugins/resolveId'

const UniH5Plugin: UniVitePlugin = {
  name: 'vite:uni-h5',
  uni: {
    transformEvent: {
      tap: 'click',
    },
  },
}

export default [
  uniCssScopedPlugin(),
  uniResolveIdPlugin(),
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  uniInjectPlugin(),
  uniCssPlugin(),
  UniH5Plugin,
]
