import { UniAppPlugin } from './plugin'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'

export default [
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  UniAppPlugin,
]
