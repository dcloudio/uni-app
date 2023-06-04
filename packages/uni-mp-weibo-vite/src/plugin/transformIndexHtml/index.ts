import type { Plugin } from 'vite'

import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'

export function createTransformIndexHtml(): Plugin['transformIndexHtml'] {
  return async function (html) {
    const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
    const title = manifestJson.h5?.title || manifestJson.name || ''
    return {
      html: html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`),
      tags:
        process.env.NODE_ENV === 'development'
          ? [
              {
                tag: 'script',
                children: `if (typeof globalThis === 'undefined') {
  window.globalThis = window
}`,
                injectTo: 'head-prepend',
              },
            ]
          : [],
    }
  }
}
