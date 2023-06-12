import { parse as parseUrl } from 'url'
import { IncomingMessage, ServerResponse } from 'http'
import type { ViteDevServer } from 'vite'
import { NextHandler } from './static'
import path from 'path'
import { EXTNAME_VUE_RE } from '@dcloudio/uni-cli-shared'

export function uniTimestampMiddleware(server: ViteDevServer) {
  return async function timestampMiddleware(
    req: IncomingMessage,
    _: ServerResponse,
    next: NextHandler
  ) {
    // 当页面被作为组件引用时，会导致history刷新该页面直接显示js代码，因为该页面已被缓存为了module，
    // https://github.com/vitejs/vite/blob/702d50315535c189151c67d33e4a22124f926bed/packages/vite/src/node/server/transformRequest.ts#L52
    // /pages/tabBar/API/API
    let { url } = req
    if (url) {
      const base = server.config.base
      const parsed = parseUrl(url)
      let newUrl = url
      if ((parsed.pathname || '/').startsWith(base)) {
        newUrl = newUrl.replace(base, '/')
      }
      if (
        !path.extname(newUrl) &&
        !newUrl.endsWith('/') &&
        !newUrl.includes('?')
      ) {
        const module = await server.moduleGraph.getModuleByUrl(newUrl)
        if (module && module.file && EXTNAME_VUE_RE.test(module.file)) {
          // /pages/tabBar/API/API => /pages/tabBar/API/API?__t__=time
          req.url = url + '?__t__=' + Date.now()
        }
      }
    }
    next()
  }
}
