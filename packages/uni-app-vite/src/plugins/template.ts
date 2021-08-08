import path from 'path'
import fs from 'fs-extra'
import { Plugin } from 'vite'

import { parsePagesJsonOnce } from '@dcloudio/uni-cli-shared'

function genViewHtml() {
  const viewHtmlStr = fs.readFileSync(
    path.resolve(__dirname, '../../lib/template/__uniappview.html'),
    'utf8'
  )
  const { globalStyle } = parsePagesJsonOnce(
    process.env.UNI_INPUT_DIR,
    process.env.UNI_PLATFORM
  )
  const __uniConfig = {
    globalStyle: {
      rpxCalcMaxDeviceWidth: (globalStyle as any).rpxCalcMaxDeviceWidth,
      rpxCalcBaseDeviceWidth: (globalStyle as any).rpxCalcBaseDeviceWidth,
    },
  }
  return viewHtmlStr
    .toString()
    .replace(
      '/*__uniConfig*/',
      `var __uniConfig = ${JSON.stringify(__uniConfig)}`
    )
}

export function uniTemplatePlugin(): Plugin {
  return {
    name: 'vite:uni-app-template',
    configResolved() {
      const outputDir = process.env.UNI_OUTPUT_DIR
      return Promise.all([
        fs.copy(
          require.resolve('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js'),
          path.resolve(outputDir, 'uni-app-view.umd.js'),
          {
            overwrite: true,
          }
        ),
        fs
          .copy(path.resolve(__dirname, '../../lib/template/'), outputDir, {
            overwrite: true,
          })
          .then(() =>
            fs.writeFile(
              path.resolve(outputDir, '__uniappview.html'),
              genViewHtml()
            )
          ),
      ]).then(() => {})
    },
  }
}
