import fs from 'fs'
import path from 'path'
import debug from 'debug'
import type { Connect, ViteDevServer } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import {
  isImportRequest,
  isInternalRequest,
  normalizePath,
  PUBLIC_DIR,
} from '@dcloudio/uni-cli-shared'

import { uniStaticMiddleware } from './middlewares/static'

const debugStatic = debug('uni:static')
/**
 * devServer时提供static等目录的静态资源服务
 * @param server
 * @param param
 */
export const initStatic = (server: ViteDevServer) => {
  const filter = createPublicFileFilter()
  const serve = uniStaticMiddleware({
    etag: true,
    resolve(pathname) {
      if (!filter(pathname)) {
        return
      }
      const filename = path.join(process.env.UNI_INPUT_DIR, pathname)
      if (fs.existsSync(filename)) {
        debugStatic(filename, 'success')
        return filename
      } else {
        debugStatic(filename, 'fail')
      }
    },
  })
  const viteServePublicMiddlewareIndex = server.middlewares.stack.findIndex(
    (middleware) => {
      return (
        (middleware.handle as Function).name === 'viteServePublicMiddleware'
      )
    }
  )
  // 替换 vite 自带的 public middleware
  if (viteServePublicMiddlewareIndex > -1) {
    server.middlewares.stack.splice(viteServePublicMiddlewareIndex, 1, {
      route: '',
      handle: ((req, res, next) => {
        if (isImportRequest(req.url!) || isInternalRequest(req.url!)) {
          return next()
        }
        return serve(req, res, next)
      }) as Connect.NextHandleFunction,
    })
  }
}

export function createPublicFileFilter(base: string = '/') {
  const publicDir = normalizePath(path.join(base, PUBLIC_DIR + '/**/*'))
  const uniModulesDir = normalizePath(
    path.join(base, 'uni_modules/*/' + PUBLIC_DIR + '/**/*')
  )
  return createFilter([publicDir, uniModulesDir])
}
