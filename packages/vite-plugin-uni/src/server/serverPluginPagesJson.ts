import { ServerPlugin } from 'vite'
import { readBody } from 'vite'
import { parsePagesJson } from '../utils'

const uniCode = `import {uni} from '@dcloudio/uni-h5'
window.uni = window.__GLOBAL__ = uni
`

export const serverPluginPagesJson: ServerPlugin = ({ app }) => {
  app.use(async (ctx, next) => {
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
