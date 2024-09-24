import path from 'path'
import fs from 'fs-extra'
import {
  APP_SERVICE_FILENAME,
  type UniVitePlugin,
  cssPostPlugin,
  getPlatformManifestJsonOnce,
  initPostcssPlugin,
  isNormalCompileTarget,
  isUniPageSfcFile,
  isVueSfcFile,
  normalizePath,
  parsePagesJsonOnce,
  parseRpx2UnitOnce,
  polyfillCode,
  removeExt,
  resolveBuiltIn,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import { restoreGlobalCode } from '@dcloudio/uni-cli-shared/dist/json/app/pages/code'
import type { OutputBundle } from 'rollup'
import { APP_RENDERJS_JS, APP_WXS_JS } from '../plugins/renderjs'

import { createConfigResolved } from '../../plugin/configResolved'
import { templateDir } from '../../utils'

export function uniAppVuePlugin(): UniVitePlugin {
  const inputDir = process.env.UNI_INPUT_DIR
  const mainPath = resolveMainPathOnce(inputDir)
  let appCss = ''

  function normalizeCssChunkFilename(id: string) {
    return removeExt(normalizePath(path.relative(inputDir, id))) + '.css'
  }
  return {
    name: 'uni:app-vue',
    config() {
      return {
        css: {
          postcss: {
            plugins: initPostcssPlugin({
              uniApp: parseRpx2UnitOnce(inputDir, process.env.UNI_PLATFORM),
            }),
          },
        },
        build: {
          rollupOptions: {
            external: ['vue', '@vue/shared'],
            output: {
              name: 'AppService',
              banner: polyfillCode + restoreGlobalCode,
              format: process.env.UNI_APP_CODE_SPLITING ? 'amd' : 'iife',
              amd: {
                autoId: true,
              },
              entryFileNames: APP_SERVICE_FILENAME,
              globals: {
                vue: 'Vue',
                '@vue/shared': 'uni.VueShared',
              },
            },
          },
        },
      }
    },
    configResolved: createConfigResolved({
      createCssPostPlugin(config) {
        return cssPostPlugin(config, {
          platform: 'app',
          chunkCssFilename(id: string) {
            if (id === mainPath) {
              return 'app.css'
            } else if (isUniPageSfcFile(id, inputDir)) {
              return normalizeCssChunkFilename(id)
            } else if (!isNormalCompileTarget() && isVueSfcFile(id)) {
              return normalizeCssChunkFilename(id)
            }
          },
          chunkCssCode(filename, cssCode) {
            if (filename === 'app.css') {
              if (process.env.UNI_PLATFORM === 'app-harmony') {
                appCss = fs.readFileSync(
                  resolveBuiltIn('@dcloudio/uni-app-harmony/dist/style.css'),
                  'utf8'
                )
              }
              if (!appCss) {
                appCss = fs.readFileSync(
                  resolveBuiltIn('@dcloudio/uni-app-plus/dist/style.css'),
                  'utf8'
                )
              }
              return appCss + '\n' + cssCode
            }
            return cssCode
          },
        })
      },
    }),
    generateBundle(_, bundle) {
      if (isNormalCompileTarget()) {
        this.emitFile({
          fileName: '__uniappview.html',
          source: genViewHtml(bundle),
          type: 'asset',
        })
      }
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
  const platformConfig = getPlatformManifestJsonOnce()
  const { darkmode = false } = platformConfig
  const __uniConfig = {
    globalStyle: {
      rpxCalcMaxDeviceWidth: (globalStyle as any).rpxCalcMaxDeviceWidth,
      rpxCalcBaseDeviceWidth: (globalStyle as any).rpxCalcBaseDeviceWidth,
    },
    darkmode,
    qqMapKey: platformConfig?.distribute?.sdkConfigs?.maps?.qqmap?.key,
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
