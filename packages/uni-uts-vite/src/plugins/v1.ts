import type { Plugin } from 'vite'
import path from 'path'
import { parseVueRequest, resolveUtsAppModule } from '@dcloudio/uni-cli-shared'

import { getCompiler, genProxyCode } from '../utils/compiler'
import { resolvePackage } from '../utils/compiler/utils'
import { resolvePlatformIndex, resolveRootIndex } from '../utils/compiler/code'

const UTSProxyRE = /\?uts-proxy$/

function isUTSProxy(id: string) {
  return UTSProxyRE.test(id)
}
export function uniUtsV1Plugin(): Plugin {
  let isFirst = true
  return {
    name: 'uni:uts-v1',
    apply: 'build',
    enforce: 'pre',
    resolveId(id, importer) {
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
    async transform(code, id, opts) {
      if (opts && opts.ssr) {
        return
      }
      if (!isUTSProxy(id)) {
        return
      }
      const { filename: module } = parseVueRequest(id.replace('\0', ''))

      const pkg = resolvePackage(module)
      if (!pkg) {
        return
      }
      code = await genProxyCode(module, pkg)
      if (process.env.NODE_ENV !== 'development') {
        // 生产模式 支持同时生成 android 和 ios 的 uts 插件
        if (
          process.env.UNI_UTS_PLATFORM === 'app-android' ||
          process.env.UNI_UTS_PLATFORM === 'app'
        ) {
          const filename =
            resolvePlatformIndex('app-android', module, pkg) ||
            resolveRootIndex(module, pkg)
          if (filename) {
            await getCompiler('kotlin').runProd(filename)
          }
        }
        if (
          process.env.UNI_UTS_PLATFORM === 'app-ios' ||
          process.env.UNI_UTS_PLATFORM === 'app'
        ) {
          const filename =
            resolvePlatformIndex('app-ios', module, pkg) ||
            resolveRootIndex(module, pkg)
          if (filename) {
            await getCompiler('swift').runProd(filename)
          }
        }
      } else {
        // dev 模式仅 android 支持
        if (process.env.UNI_UTS_PLATFORM === 'app-android') {
          const filename =
            resolvePlatformIndex('app-android', module, pkg) ||
            resolveRootIndex(module, pkg)
          if (filename) {
            const res = await getCompiler('kotlin').runDev(filename)
            if (!isFirst && res) {
              const files = []
              if (process.env.UNI_APP_CHANGED_DEX_FILES) {
                try {
                  files.push(
                    ...JSON.parse(process.env.UNI_APP_CHANGED_DEX_FILES)
                  )
                } catch (e) {}
              }
              files.push(res)
              process.env.UNI_APP_CHANGED_DEX_FILES = JSON.stringify([
                ...new Set(files),
              ])
            }
          }
        }
      }
      return code
    },
    buildEnd() {
      isFirst = false
    },
  }
}
