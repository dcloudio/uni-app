import path from 'path'
import fs from 'fs-extra'
import type { Plugin } from 'vite'
import { templateDir } from '../utils'
import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'

export function uniTemplatePlugin({
  renderer,
}: {
  renderer?: 'native'
} = {}): Plugin {
  let outputDir: string
  return {
    name: 'uni:app-template',
    enforce: 'post',
    configResolved() {
      outputDir = process.env.UNI_OUTPUT_DIR
      if (renderer !== 'native') {
        fs.copySync(
          resolveBuiltIn('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js'),
          path.resolve(outputDir, 'uni-app-view.umd.js'),
          {
            overwrite: true,
          }
        )
      }
      fs.copySync(templateDir, outputDir, {
        overwrite: true,
        filter(src) {
          if (renderer === 'native') {
            if (
              src.includes('__uniappquill') ||
              src.includes('__uniappautomator')
            ) {
              return false
            }
          }
          return !src.includes('__uniappview.html')
        },
      })
    },
  }
}
