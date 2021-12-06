import path from 'path'
import type { Plugin } from 'vite'
import {
  decodeBase64Url,
  encodeBase64Url,
  normalizePath,
  polyfillCode,
} from '@dcloudio/uni-cli-shared'

const uniNVuePagePrefix = 'uniNVuePage://'

function isUniNVuePageUrl(id: string) {
  return id.startsWith(uniNVuePagePrefix)
}

export function createUniNVuePagePath(pagePath: string) {
  return uniNVuePagePrefix + encodeBase64Url(pagePath + '.nvue')
}

function parseUniNvuePagePath(uniNVuePageUrl: string) {
  return decodeBase64Url(uniNVuePageUrl.replace(uniNVuePagePrefix, ''))
}

export function uniNVueEntryPlugin(): Plugin {
  const inputDir = process.env.UNI_INPUT_DIR
  return {
    name: 'vite:uni-app-nvue-entry',
    enforce: 'pre',
    resolveId(id) {
      if (isUniNVuePageUrl(id)) {
        return id
      }
    },
    load(id) {
      if (isUniNVuePageUrl(id)) {
        const filepath = normalizePath(
          path.resolve(inputDir, parseUniNvuePagePath(id))
        )
        this.addWatchFile(filepath)
        return {
          code: `import { createApp } from 'vue'
import App from '${filepath}'
${polyfillCode}
createApp(App).mount('#app')
`,
        }
      }
    },
  }
}
