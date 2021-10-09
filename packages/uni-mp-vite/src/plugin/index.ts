import { AliasOptions } from 'vite'
import { resolveBuiltIn, UniVitePlugin } from '@dcloudio/uni-cli-shared'

import { uniOptions } from './uni'
import { buildOptions } from './build'
import { configResolved } from './configResolved'

export interface UniMiniProgramPluginOptions {
  global: string
  alias?: AliasOptions
}

export function uniMiniProgramPlugin({
  alias,
}: UniMiniProgramPluginOptions): UniVitePlugin {
  return {
    name: 'vite:uni-mp',
    uni: uniOptions(),
    config() {
      return {
        resolve: {
          alias: {
            vue: resolveBuiltIn('@dcloudio/uni-mp-vue'),
            ...alias,
          },
        },
        build: buildOptions(),
      }
    },
    configResolved,
  }
}
