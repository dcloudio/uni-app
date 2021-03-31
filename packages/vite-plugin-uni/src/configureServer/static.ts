import fs from 'fs'
import path from 'path'
import debug from 'debug'
import { ViteDevServer } from 'vite'

import { isImportRequest } from '@dcloudio/uni-cli-shared'

import { VitePluginUniResolvedOptions } from '..'

import { uniStaticMiddleware } from './middlewares/static'
import { createPublicFileFilter } from '../utils'

const debugStatic = debug('uni:static')
/**
 * devServer时提供static等目录的静态资源服务
 * @param server
 * @param param
 */
export const serveStatic = (
  server: ViteDevServer,
  { inputDir }: VitePluginUniResolvedOptions
) => {
  const filter = createPublicFileFilter()
  const serve = uniStaticMiddleware({
    etag: true,
    resolve(pathname) {
      if (!filter(pathname)) {
        return
      }
      const filename = path.join(inputDir, pathname)
      if (fs.existsSync(filename)) {
        debugStatic(filename, 'success')
        return filename
      } else {
        debugStatic(filename, 'fail')
      }
    },
  })
  server.middlewares.use((req, res, next) => {
    // skip import request
    if (isImportRequest(req.url!)) {
      return next()
    }
    return serve(req, res, next)
  })
}
