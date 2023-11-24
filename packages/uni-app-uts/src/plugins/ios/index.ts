import {
  resolveUTSCompiler,
  uniUTSUVueJavaScriptPlugin,
} from '@dcloudio/uni-cli-shared'

import { uniAppIOSPlugin } from './plugin'
import { uniAppIOSMainPlugin } from './mainUTS'
import { uniPrePlugin } from '../pre'
import { uniAppManifestPlugin } from './manifestJson'
import { uniAppPagesPlugin } from './pagesJson'

export function init() {
  return [
    uniPrePlugin(),
    uniAppIOSPlugin(),
    uniAppIOSMainPlugin(),
    uniAppManifestPlugin(),
    uniAppPagesPlugin(),
    uniUTSUVueJavaScriptPlugin(),
    resolveUTSCompiler().uts2js({
      inputDir: process.env.UNI_INPUT_DIR,
      version: process.env.UNI_COMPILER_VERSION,
    }),
  ]
}
