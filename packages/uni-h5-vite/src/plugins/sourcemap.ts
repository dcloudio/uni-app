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
    value.request = value.request
      .then(async (request) => {
        const map = request?.map
        if (map) {
          const mod = await this._server.moduleGraph.ensureEntryFromUrl(key)
          if (mod.file && isAbsolute(mod.file)) {
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
        return request
      })
      .catch(() => {
        return null
      })
    return super.set(key, value)
  }
}
