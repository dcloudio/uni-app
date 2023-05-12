import { uniAppUTSPlugin } from './plugins'
import { uniAppCssPlugin } from './plugins/css'
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
    uniAppCssPlugin(),
  ]
}

export { genClassName } from './plugins/utils'
export { transformVue } from './plugins/uvue/index'
