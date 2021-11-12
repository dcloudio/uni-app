import fs from 'fs'
import path from 'path'
import debug from 'debug'
import type { ViteDevServer } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import {
  isImportRequest,
  normalizePath,
  PUBLIC_DIR,
} from '@dcloudio/uni-cli-shared'

import { uniStaticMiddleware } from './middlewares/static'

const debugStatic = debug('vite:uni:static')
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
  server.middlewares.use((req, res, next) => {
    // skip import request
    if (isImportRequest(req.url!)) {
      return next()
    }
    return serve(req, res, next)
  })
}

export function createPublicFileFilter(base: string = '/') {
  const publicDir = normalizePath(path.join(base, PUBLIC_DIR + '/**/*'))
  const uniModulesDir = normalizePath(
    path.join(base, 'uni_modules/*/' + PUBLIC_DIR + '/**/*')
  )
  return createFilter([publicDir, uniModulesDir])
}
