import type { Plugin } from 'vite'

import { parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'

export function createTransformIndexHtml(): Plugin['transformIndexHtml'] {
  let checked = false
  return async function (html) {
    const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
    const title = manifestJson.h5?.title || manifestJson.name || ''
    const isX = process.env.UNI_APP_X === 'true'
    if (isX) {
      if (!checked) {
        checked = true
        // 兼容旧版本模板
        const mainJs = ` src="/main.js"`
        const mainTs = ` src="/main.ts"`
        const main = ` src="/main"`
        let oldMain = ''
        if (html.includes(mainJs)) {
          oldMain = mainJs
        } else if (html.includes(mainTs)) {
          oldMain = mainTs
        }
        if (oldMain) {
          html = html.replace(oldMain, main)
          console.warn(
            `当前项目根目录 index.html 未兼容 uni-app x 的 web 平台，请将里边的${oldMain} 调整为${main}。`
          )
        }
      }
    }
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
