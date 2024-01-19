import {
  MANIFEST_JSON_UTS,
  PAGES_JSON_UTS,
  normalizePath,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'

import type { Plugin } from 'vite'

export function uniAppIOSMainPlugin(): Plugin {
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
          ${code}
          createApp().app.mount("#app");
          `,
          map: null,
        }
      }
    },
  }
}
