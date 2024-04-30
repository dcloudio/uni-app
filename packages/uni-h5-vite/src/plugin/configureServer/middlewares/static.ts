import fs, { type Stats } from 'fs'
import url from 'url'

import mime from 'mime/lite'
import type { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from 'http'

function normalizeFile(filename: string, isEtag: boolean) {
  const stats = fs.statSync(filename)
  return {
    stats,
    headers: normalizeHeaders(filename, stats, isEtag),
  }
}

function normalizeHeaders(filename: string, stats: Stats, isEtag: boolean) {
  const headers: OutgoingHttpHeaders = {
    'Content-Length': stats.size,
    'Content-Type': mime.getType(filename) || '',
    'Last-Modified': stats.mtime.toUTCString(),
  }
  if (isEtag) {
    headers['ETag'] = `W/"${stats.size}-${stats.mtime.getTime()}"`
  }
  return headers
}

function send(
  req: IncomingMessage,
  res: ServerResponse,
  filename: string,
  stats: Stats,
  headers: OutgoingHttpHeaders
) {
  let code = 200
  headers = { ...headers }
  const opts: {
    end?: number
    start?: number
  } = {}
  for (const key in headers) {
    const value = res.getHeader(key)
    if (value) {
      headers[key] = value
    }
  }
  if (res.getHeader('content-type')) {
    headers['Content-Type'] = res.getHeader('content-type')
  }
  if (req.headers.range) {
    code = 206
    const [x, y] = req.headers.range.replace('bytes=', '').split('-')
    const end = (opts.end = parseInt(y, 10) || stats.size - 1)
    const start = (opts.start = parseInt(x, 10) || 0)
    if (start >= stats.size || end >= stats.size) {
      res.setHeader('Content-Range', `bytes */${stats.size}`)
      res.statusCode = 416
      return res.end()
    }
    headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`
    headers['Content-Length'] = end - start + 1
    headers['Accept-Ranges'] = 'bytes'
  }
  res.writeHead(code, headers)
  fs.createReadStream(filename, opts).pipe(res)
}

interface UniStaticMiddlewareOptions {
  etag: boolean
  resolve: (pathname: string) => string | void
}

export type NextHandler = () => void | Promise<void>

export function uniStaticMiddleware(opts: UniStaticMiddlewareOptions) {
  const isEtag = !!opts.etag
  return function staticMiddleware(
    req: IncomingMessage,
    res: ServerResponse,
    next: NextHandler
  ) {
    const pathname = url.parse(req.url!).pathname
    if (!pathname) {
      return next()
    }
    const filename = opts.resolve(pathname)
    if (!filename) {
      return next()
    }
    const data = normalizeFile(filename, isEtag)
    if (!data) {
      return next()
    }
    if (isEtag && req.headers['if-none-match'] === data.headers['ETag']) {
      res.writeHead(304)
      return res.end()
    }
    return send(req, res, filename, data.stats, data.headers)
  }
}
