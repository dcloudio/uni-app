import {
  type UniVitePlugin,
  resolvePiniaAlias,
  resolveVueI18nAlias,
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
            // uni-app x 使用支持 JIT 的完整版本，普通 uni-app 保持 runtime 版本以避免 new Function
            ...resolveVueI18nAlias(),
            // 项目未安装 pinia 时使用内部版本及其依赖
            ...resolvePiniaAlias(),
          },
        },
      }
    },
  }
}
