import { ViteDevServer } from 'vite'

import { parsePagesJson } from '../utils'

const uniCode = `import {uni,getCurrentPages,getApp,UniServiceJSBridge,UniViewJSBridge} from '@dcloudio/uni-h5'
window.getApp = getApp
window.getCurrentPages = getCurrentPages
window.uni = window.__GLOBAL__ = uni
window.UniViewJSBridge = UniViewJSBridge
window.UniServiceJSBridge = UniServiceJSBridge
`

export const servePagesJson = (server: ViteDevServer) => {
  server.app.use(async (ctx, next) => {
    const isPagesJson = ctx.path.endsWith('pages.json')
    if (isPagesJson) {
      //skip serverPluginJson
      delete ctx.query.import
    }
    await next()
    if (isPagesJson) {
      const body = await readBody(ctx.body)
      ctx.type = 'js'
      ctx.body = body ? uniCode + parsePagesJson(body) : ''
    }
  })
}
