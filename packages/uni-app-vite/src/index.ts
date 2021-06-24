import { UniAppPlugin } from './plugin'
import { uniCopyPlugin } from './plugins/copy'
import { uniMainJsPlugin } from './plugins/mainJs'
import { uniManifestJsonPlugin } from './plugins/manifestJson'
import { uniPagesJsonPlugin } from './plugins/pagesJson'

export default [
  uniCopyPlugin(),
  uniMainJsPlugin(),
  uniManifestJsonPlugin(),
  uniPagesJsonPlugin(),
  UniAppPlugin,
]
