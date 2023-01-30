import type { Plugin } from 'vite'
import path from 'path'
import {
  parseVueRequest,
  resolveUtsAppModule,
  resolveUTSCompiler,
} from '@dcloudio/uni-cli-shared'
import { once } from '@dcloudio/uni-shared'

const UTSProxyRE = /\?uts-proxy$/
function isUTSProxy(id: string) {
  return UTSProxyRE.test(id)
}

const utsModuleCaches = new Map<
  string,
  () => Promise<void | { code: string; deps: string[] }>
>()
export function uniUtsV1Plugin(): Plugin {
  return {
    name: 'uni:uts',
    apply: 'build',
    enforce: 'pre',
    resolveId(id, importer) {
      if (isUTSProxy(id)) {
        return id
      }
      const module = resolveUtsAppModule(
        id,
        importer ? path.dirname(importer) : process.env.UNI_INPUT_DIR
      )
      if (module) {
        // prefix the polyfill id with \0 to tell other plugins not to try to load or transform it
        return '\0' + module + '?uts-proxy'
      }
    },
    load(id) {
      if (isUTSProxy(id)) {
        return ''
      }
    },
    buildEnd() {
      utsModuleCaches.clear()
    },
    async transform(_, id, opts) {
      if (opts && opts.ssr) {
        return
      }
      if (!isUTSProxy(id)) {
        return
      }
      const { filename: pluginDir } = parseVueRequest(id.replace('\0', ''))
      // 当 vue 和 nvue 均引用了相同 uts 插件，解决两套编译器会编译两次 uts 插件的问题
      // 通过缓存，保证同一个 uts 插件只编译一次
      if (utsModuleCaches.get(pluginDir)) {
        return utsModuleCaches.get(pluginDir)!().then((result) => {
          if (result) {
            result.deps.forEach((dep) => {
              this.addWatchFile(dep)
            })
            return result.code
          }
        })
      }
      const compile = once(() => {
        return resolveUTSCompiler().compile(pluginDir)
      })
      utsModuleCaches.set(pluginDir, compile)
      const result = await compile()
      if (result) {
        result.deps.forEach((dep) => {
          this.addWatchFile(dep)
        })
        return result.code
      }
    },
  }
}
