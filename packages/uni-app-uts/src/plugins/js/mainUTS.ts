import {
  MANIFEST_JSON_UTS,
  PAGES_JSON_UTS,
  normalizePath,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'

import type { Plugin } from 'vite'

export function uniAppJsEngineMainPlugin(): Plugin {
  const mainUTS = resolveMainPathOnce(process.env.UNI_INPUT_DIR)
  return {
    name: 'uni:app-main',
    apply: 'build',
    async transform(code, id) {
      if (normalizePath(id) === mainUTS) {
        return {
          code: `
          import './${MANIFEST_JSON_UTS}'
          import './${PAGES_JSON_UTS}'
          const __global__ = typeof globalThis === 'undefined' ? Function('return this')() : globalThis
          __global__.__uniX = true
          ${code}
          ${
            process.env.UNI_UTS_PLATFORM === 'app-harmony'
              ? '__global__.__mount__ = () => {createApp().app.mount("#app");}'
              : 'createApp().app.mount("#app");'
          }
          `,
          map: {
            mappings: '',
          },
        }
      }
    },
  }
}
