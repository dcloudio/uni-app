import path from 'path'
import type { Plugin, ResolvedConfig } from 'vite'

import { extend } from '@vue/shared'

import {
  WEIBO_API_DEPS_CSS,
  COMMON_EXCLUDE,
  InjectOptions,
  buildInCssSet,
  uniViteInjectPlugin,
  isCombineBuiltInCss,
  isEnableTreeShaking,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'

// eslint-disable-next-line no-restricted-globals
const apiJson = require(path.resolve(__dirname, '../../lib/api.json'))
const uniInjectPluginOptions: Partial<InjectOptions> = {
  exclude: [...COMMON_EXCLUDE],
  'uni.': [
    '@dcloudio/uni-mp-weibo',
    ((method: string) => apiJson.includes(method)) as any, // API白名单
  ],
  // 兼容 wx 对象
  // 'wx.': [
  //   '@dcloudio/uni-mp-weibo',
  //   ((method: string) => apiJson.includes(method)) as any, // API白名单
  // ],
  getApp: ['@dcloudio/uni-mp-weibo', 'getApp'],
  getCurrentPages: ['@dcloudio/uni-mp-weibo', 'getCurrentPages'],
  UniServiceJSBridge: ['@dcloudio/uni-mp-weibo', 'UniServiceJSBridge'],
  UniViewJSBridge: ['@dcloudio/uni-mp-weibo', 'UniViewJSBridge'],
}

export function uniInjectPlugin(): Plugin {
  let resolvedConfig: ResolvedConfig
  const callback: InjectOptions['callback'] = function (imports, mod) {
    const styles =
      mod[0] === '@dcloudio/uni-mp-weibo' &&
      WEIBO_API_DEPS_CSS[mod[1] as keyof typeof WEIBO_API_DEPS_CSS]
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
