import type { Plugin } from 'vite'
import { isArray } from '@vue/shared'
import { once } from '@dcloudio/uni-shared'
import AutoImport from 'unplugin-auto-import/vite'

import { type Injects, parseUniExtApis } from '../../../uni_modules'
import { isJsFile } from '../../utils/url'

const escape = (str: string) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')

export const parseUniExtApisOnce = once(parseUniExtApis)

export function uniUTSExtApiReplace(): Plugin {
  const injects = parseUniExtApisOnce(
    true,
    process.env.UNI_UTS_PLATFORM,
    process.env.UNI_UTS_TARGET_LANGUAGE
  )
  const injectApis = Object.keys(injects)
  const firstPass = new RegExp(`(?:${injectApis.map(escape).join('|')})`, 'g')
  return {
    name: 'uni:uts-ext-api-replace',
    configResolved(config) {
      const index = config.plugins.findIndex((p) => p.name === 'uts')
      if (index > -1) {
        if (Object.keys(injects).length) {
          // @ts-expect-error
          config.plugins.splice(
            index,
            0,
            AutoImport({
              include: [/\.[u]?ts$/, /\.[u]?vue/],
              exclude: [/[\\/]\.git[\\/]/],
              imports: injectsToAutoImports(injects),
              dts: false,
            })
          )
        }
      }
    },
    transform(code, id) {
      if (!injectApis.length) {
        return
      }
      if (!isJsFile(id)) {
        return
      }
      if (code.search(firstPass) === -1) {
        return
      }
      injectApis.forEach((api) => {
        code = code.replaceAll(api, api.replace('.', '_'))
      })
      return {
        code,
        map: { mappings: '' },
      }
    },
  }
}

/**
 * { 'uni.getBatteryInfo': ['@/uni_modules/uni-getbatteryinfo/utssdk/web/index.uts','getBatteryInfo'] }
 * { '@/uni_modules/uni-getbatteryinfo/utssdk/web/index.ts': [['getBatteryInfo', 'uni_getBatteryInfo']] }
 * @param injects
 */
export function injectsToAutoImports(
  injects: Injects
): { from: string; imports: [string, string][] }[] {
  const autoImports: Record<string, [string, string][]> = {}
  Object.keys(injects).forEach((api) => {
    const options = injects[api]
    if (isArray(options) && options.length >= 2) {
      const source = options[0]
      const name = options[1]
      if (!autoImports[source]) {
        autoImports[source] = []
      }
      autoImports[source].push([name, api.replace('.', '_')])
    }
  })

  return Object.keys(autoImports).map((source) => {
    return {
      from: source,
      imports: autoImports[source],
    }
  })
}
