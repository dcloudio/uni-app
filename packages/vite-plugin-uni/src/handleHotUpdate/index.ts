import debug from 'debug'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'

const debugHmr = debug('uni:hmr')

export function createHandleHotUpdate(
  _options: VitePluginUniResolvedOptions
): Plugin['handleHotUpdate'] {
  return function ({ file, server }) {
    // TODO 目前简单处理，当pages.json,manifest.json发生变化，就直接刷新，理想情况下，应该区分变化的内容，仅必要时做整页面刷新
    if (file.endsWith('pages.json') || file.endsWith('manifest.json')) {
      debugHmr(file)
      server.ws.send({
        type: 'custom',
        event: 'invalidate',
        data: {},
      })
      return []
    }
  }
}
