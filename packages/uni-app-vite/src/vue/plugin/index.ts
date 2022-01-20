import path from 'path'
import fs from 'fs-extra'
import {
  APP_SERVICE_FILENAME,
  parsePagesJsonOnce,
  UniVitePlugin,
} from '@dcloudio/uni-cli-shared'
import { OutputBundle } from 'rollup'
import { APP_RENDERJS_JS, APP_WXS_JS } from '../plugins/renderjs'

import { configResolved } from '../../plugin/configResolved'
import { templateDir } from '../../utils'

export function uniAppVuePlugin(): UniVitePlugin {
  return {
    name: 'uni:app-vue',
    config() {
      return {
        build: {
          rollupOptions: {
            output: {
              name: 'AppService',
              format: process.env.UNI_APP_CODE_SPLITING ? 'amd' : 'iife',
              amd: {
                autoId: true,
              },
              entryFileNames: APP_SERVICE_FILENAME,
            },
          },
        },
      }
    },
    configResolved,
    generateBundle(_, bundle) {
      this.emitFile({
        fileName: '__uniappview.html',
        source: genViewHtml(bundle),
        type: 'asset',
      })
    },
  }
}

function genViewHtml(bundle: OutputBundle) {
  const viewHtmlStr = fs.readFileSync(
    path.join(templateDir, '__uniappview.html'),
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
