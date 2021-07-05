import path from 'path'
import slash from 'slash'

import { uniViteCopyPlugin } from '@dcloudio/uni-cli-shared'

export function uniCopyPlugin() {
  return uniViteCopyPlugin({
    targets: [
      {
        src: slash(path.resolve(__dirname, '../../lib/template/*')),
        dest: process.env.UNI_OUTPUT_DIR,
      },
      {
        src: slash(
          require.resolve('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js')
        ),
        dest: process.env.UNI_OUTPUT_DIR,
      },
    ],
    hook: 'writeBundle',
    verbose: process.env.DEBUG ? true : false,
  })
}
