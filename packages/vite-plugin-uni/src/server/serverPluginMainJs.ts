import path from 'path'

import { ServerPlugin } from 'vite'
import { readBody } from 'vite'
import { getRoot, isMainJs, wrapperMainCode } from '../utils'

export const serverPluginMainJs: ServerPlugin = ({ app, root }) => {
  app.use(async (ctx, next) => {
    await next()
    if (isMainJs(ctx.path)) {
      const body = await readBody(ctx.body)
      ctx.body = wrapperMainCode(body!, getRoot(path.resolve(root, ctx.path)))
    }
  })
}
