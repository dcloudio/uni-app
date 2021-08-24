import path from 'path'
import fs from 'fs-extra'
import { Plugin } from 'vite'
import { OutputBundle } from 'rollup'
import { parsePagesJsonOnce } from '@dcloudio/uni-cli-shared'
import { APP_RENDERJS_JS, APP_WXS_JS } from './renderjs'

function genViewHtml(bundle: OutputBundle) {
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
  const wxsCode = bundle[APP_WXS_JS]
    ? `<script src="${APP_WXS_JS}"></script>`
    : ''
  const renderjsCode = bundle[APP_RENDERJS_JS]
    ? `<script src="${APP_RENDERJS_JS}"></script>`
    : ''

  const automatorCode = process.env.UNI_AUTOMATOR_WS_ENDPOINT
    ? `<script src="__uniappautomator.js"></script>`
    : ''

  return viewHtmlStr
    .toString()
    .replace('<!--wxsCode-->', wxsCode)
    .replace('<!--renderjsCode-->', renderjsCode)
    .replace('<!--automatorCode-->', automatorCode)
    .replace(
      '/*__uniConfig*/',
      `var __uniConfig = ${JSON.stringify(__uniConfig)}`
    )
}

export function uniTemplatePlugin(): Plugin {
  let outputDir: string
  return {
    name: 'vite:uni-app-template',
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
      fs.copySync(path.resolve(__dirname, '../../lib/template/'), outputDir, {
        overwrite: true,
        filter(src) {
          return !src.includes('__uniappview.html')
        },
      })
    },
    generateBundle(_, bundle) {
      this.emitFile({
        fileName: '__uniappview.html',
        source: genViewHtml(bundle),
        type: 'asset',
      })
    },
  }
}
