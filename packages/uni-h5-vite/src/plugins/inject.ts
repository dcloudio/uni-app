import path from 'path'
import type { Plugin, ResolvedConfig } from 'vite'

import { extend } from '@vue/shared'

import {
  API_DEPS_CSS,
  COMMON_EXCLUDE,
  type InjectOptions,
  buildInCssSet,
  isCombineBuiltInCss,
  isEnableTreeShaking,
  isUniAppXWebVapor,
  normalizePath,
  parseManifestJsonOnce,
  resolveBuiltIn,
  uniViteInjectPlugin,
} from '@dcloudio/uni-cli-shared'
import { ownerModuleName, resolveFrameworkDistDir } from '../utils'

const apiJson = require(path.resolve(
  __dirname,
  process.env.UNI_APP_X === 'true'
    ? '../../lib/api.x.json'
    : '../../lib/api.json'
))
const uniInjectPluginOptions: Partial<InjectOptions> = {
  exclude: [...COMMON_EXCLUDE],
  'uni.': [
    '@dcloudio/uni-h5',
    ((method: string) => apiJson.includes(method)) as any, // API白名单
  ],
  // 兼容 wx 对象
  'wx.': [
    '@dcloudio/uni-h5',
    ((method: string) => apiJson.includes(method)) as any, // API白名单
  ],
  getApp: ['@dcloudio/uni-h5', 'getApp'],
  getCurrentPages: ['@dcloudio/uni-h5', 'getCurrentPages'],
  UniServiceJSBridge: ['@dcloudio/uni-h5', 'UniServiceJSBridge'],
  UniViewJSBridge: ['@dcloudio/uni-h5', 'UniViewJSBridge'],
}

export function uniInjectPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  let vaporFrameworkId: string | undefined

  const apiDepsCss = API_DEPS_CSS(process.env.UNI_APP_X === 'true')

  const callback: InjectOptions['callback'] = function (imports, mod, id) {
    // 编译开发者项目时，框架产物的内部调用还未摇树，不能据此全量引入样式。
    // 仍保留 API 的静态导入；样式由项目调用的入口 API 按依赖表收集。
    if (vaporFrameworkId && normalizePath(id) === vaporFrameworkId) return
    const styles =
      mod[0] === '@dcloudio/uni-h5' &&
      apiDepsCss[mod[1] as keyof typeof apiDepsCss]
    if (!styles) {
      return
    }
    styles.forEach((style) => {
      if (isCombineBuiltInCss(resolvedConfig)) {
        buildInCssSet.add(style)
      } else {
        if (!imports.has(style)) {
          imports.set(style, `import '${style}';`)
        }
      }
    })
  }
  let injectPlugin: Plugin

  return {
    name: 'uni:h5-inject',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      resolvedConfig = config
      vaporFrameworkId = isUniAppXWebVapor()
        ? normalizePath(
            resolveBuiltIn(
              path.posix.join(
                ownerModuleName,
                resolveFrameworkDistDir() + '/uni-h5.es.js'
              )
            )
          )
        : undefined
      const enableTreeShaking = isEnableTreeShaking(
        parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
      )
      if (!enableTreeShaking) {
        // 不启用摇树优化，移除 wx、uni 等 API 配置
        delete uniInjectPluginOptions['wx.']
        delete uniInjectPluginOptions['uni.']
      }
      injectPlugin = uniViteInjectPlugin(
        'uni:h5-inject',
        extend(uniInjectPluginOptions, {
          callback,
        })
      )
    },
    transform(code, id) {
      return (injectPlugin.transform as Function).call(this, code, id)
    },
  }
}
