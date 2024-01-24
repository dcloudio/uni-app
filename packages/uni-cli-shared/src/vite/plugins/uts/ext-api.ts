import type { Plugin } from 'vite'

import { parseUniExtApis } from '../../../uni_modules'
import { InjectOptions, uniViteInjectPlugin } from '../inject'

export function uniUTSExtApi(): Plugin {
  return {
    name: 'uni:uts-ext-api',
    configResolved(config) {
      // 在 uts 之前插入 ext-api-inject
      const index = config.plugins.findIndex((p) => p.name === 'uts')
      if (index > -1) {
        const injects = parseUniExtApis(
          true,
          process.env.UNI_UTS_PLATFORM,
          'javascript'
        )
        if (Object.keys(injects).length) {
          // @ts-expect-error
          config.plugins.splice(
            index,
            0,
            uniViteInjectPlugin('uni:ext-api-inject', injects as InjectOptions)
          )
        }
      }
    },
  }
}
