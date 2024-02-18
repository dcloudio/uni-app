import { normalizePath } from '@dcloudio/uni-cli-shared'
import { isAbsolute, join, dirname } from 'path'
import { Plugin, TransformResult, ViteDevServer } from 'vite'

export function uniPostSourceMapPlugin(): Plugin {
  return {
    name: 'uni:post-sourcemap',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      // cli 工程呢？
      // 重要：hack 了 _pendingRequests，来修改 map
      const pendingRequests = new PendingRequests()
      pendingRequests._server = server
      pendingRequests._inputDir = normalizePath(process.env.UNI_INPUT_DIR)
      // @ts-expect-error
      server._pendingRequests = pendingRequests
    },
  }
}

interface PendingRequest {
  request: Promise<TransformResult | null>
  timestamp: number
  abort: () => void
}

class PendingRequests extends Map<string, PendingRequest> {
  _inputDir!: string
  _server!: ViteDevServer
  set(key: string, value: PendingRequest) {
    const then = value.request.then
    // @ts-expect-error
    value.request.then = (onFulfilled, onRejected) => {
      // @ts-expect-error
      return then.call(
        value.request,
        (request) => {
          const map = request?.map
          if (map) {
            // @ts-expect-error
            const mod = this._server.moduleGraph._getUnresolvedUrlToModule(key)
            if (mod && mod.file && isAbsolute(mod.file)) {
              const dir = normalizePath(dirname(mod.file))
              if (dir.startsWith(this._inputDir)) {
                for (
                  let sourcesIndex = 0;
                  sourcesIndex < map.sources.length;
                  ++sourcesIndex
                ) {
                  const sourcePath = map.sources[sourcesIndex]
                  if (sourcePath) {
                    // 将相对路径转换为绝对路径
                    if (!isAbsolute(sourcePath)) {
                      map.sources[sourcesIndex] = normalizePath(
                        join(dir, sourcePath)
                      )
                    }
                  }
                }
              }
            }
          }
          return onFulfilled?.(request)
        },
        onRejected
      )
    }
    return super.set(key, value)
  }
}
