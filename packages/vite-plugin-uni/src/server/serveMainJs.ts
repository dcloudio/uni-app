import path from 'path'

import { readBody, ViteDevServer } from 'vite'

import { getRoot, isMainJs, wrapperMainCode } from '../utils'

export const serveMainJs = (server: ViteDevServer) => {
  server.app.use(async (ctx, next) => {
    await next()
    if (isMainJs(ctx.path)) {
      const body = await readBody(ctx.body)
      ctx.body = wrapperMainCode(body!, getRoot(path.resolve(root, ctx.path)))
    }
  })
}
