import {
  type UniVitePlugin,
  resolveVueI18nRuntimeAlias,
} from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'

export function uniAppPlugin(
  {
    renderer,
    appService,
  }: {
    renderer?: 'native'
    appService: boolean
  } = {
    appService: false,
  }
): UniVitePlugin {
  return {
    name: 'uni:app',
    uni: uniOptions(),
    config(config, env) {
      return {
        base: '/', // app 平台强制 base
        build: buildOptions({ renderer, appService }, config, env),
        optimizeDeps: {
          noDiscovery: true,
          include: [],
        },
        resolve: {
          alias: {
            // vue-i18n 默认会启用 new Function 来构造翻译函数，导致在 Android 上可能报`TypeError: no access` 错误
            // 项目未安装 vue-i18n 时使用内部 runtime 版本，避免触发该问题
            ...resolveVueI18nRuntimeAlias(),
          },
        },
      }
    },
  }
}
