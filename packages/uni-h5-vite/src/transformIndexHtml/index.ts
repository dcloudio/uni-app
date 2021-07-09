import { Plugin } from 'vite'

import { parseManifestJsonOnce } from '../../../uni-cli-shared/dist'

export function createTransformIndexHtml(): Plugin['transformIndexHtml'] {
  return async function (html) {
    const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
    const title = manifestJson.h5?.title || manifestJson.name || ''
    return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`)
  }
}
