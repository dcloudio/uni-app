import fs from 'fs'
import { uniCssPlugin } from '@dcloudio/uni-cli-shared'
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
  UniAppPlugin,
]
if (!process.env.UNI_APP_CODE_SPLITING) {
  plugins.push(
    uniCssPlugin({
      app: fs.readFileSync(
        require.resolve('@dcloudio/uni-app-plus/dist/style.css'),
        'utf8'
      ),
    })
  )
}
export default plugins
