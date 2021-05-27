import { Plugin } from 'vite'

import { VitePluginUniResolvedOptions } from '..'
import { parseManifestJsonOnce } from '../../../uni-cli-shared/dist'

export function createTransformIndexHtml({
  inputDir,
}: VitePluginUniResolvedOptions): Plugin['transformIndexHtml'] {
  return async function (html) {
    const manifestJson = parseManifestJsonOnce(inputDir)
    const title = manifestJson.h5?.title || manifestJson.name || ''
    return html.replace(/<title>(.*?)<\/title>/, `<title>${title}</title>`)
  }
}
