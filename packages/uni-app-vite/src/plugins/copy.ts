import path from 'path'

import {
  normalizePath,
  parsePagesJsonOnce,
  uniViteCopyPlugin,
} from '@dcloudio/uni-cli-shared'

export function uniCopyPlugin() {
  return uniViteCopyPlugin({
    copyOnce: true, // 仅copy一次，不支持动态更新 rpxCalcMaxDeviceWidth，rpxCalcBaseDeviceWidth
    targets: [
      {
        src: normalizePath(path.resolve(__dirname, '../../lib/template/*.js')),
        dest: process.env.UNI_OUTPUT_DIR,
      },
      {
        src: normalizePath(path.resolve(__dirname, '../../lib/template/*.png')),
        dest: process.env.UNI_OUTPUT_DIR,
      },
      {
        src: normalizePath(
          require.resolve('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js')
        ),
        dest: process.env.UNI_OUTPUT_DIR,
      },
      {
        src: normalizePath(
          path.resolve(__dirname, '../../lib/template/__uniappview.html')
        ),
        dest: process.env.UNI_OUTPUT_DIR,
        transform(content) {
          const { globalStyle } = parsePagesJsonOnce(
            process.env.UNI_INPUT_DIR,
            process.env.UNI_PLATFORM
          )
          const __uniConfig = {
            globalStyle: {
              rpxCalcMaxDeviceWidth: (globalStyle as any).rpxCalcMaxDeviceWidth,
              rpxCalcBaseDeviceWidth: (globalStyle as any)
                .rpxCalcBaseDeviceWidth,
            },
          }
          return content
            .toString()
            .replace(
              '/*__uniConfig*/',
              `var __uniConfig = ${JSON.stringify(__uniConfig)}`
            )
        },
      },
    ],
    hook: 'writeBundle',
    verbose: process.env.DEBUG ? true : false,
  })
}
