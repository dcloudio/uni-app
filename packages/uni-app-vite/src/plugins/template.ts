import path from 'path'
import fs from 'fs-extra'
import { Plugin } from 'vite'
import { templateDir } from '../utils'

export function uniTemplatePlugin(): Plugin {
  let outputDir: string
  return {
    name: 'uni:app-template',
    enforce: 'post',
    configResolved() {
      outputDir = process.env.UNI_OUTPUT_DIR
      fs.copySync(
        require.resolve('@dcloudio/uni-app-plus/dist/uni-app-view.umd.js'),
        path.resolve(outputDir, 'uni-app-view.umd.js'),
        {
          overwrite: true,
        }
      )
      fs.copySync(templateDir, outputDir, {
        overwrite: true,
        filter(src) {
          return !src.includes('__uniappview.html')
        },
      })
    },
  }
}
