import type { Plugin } from 'vite'
import type { OutputAsset } from 'rollup'
import { ASSETS_INLINE_LIMIT } from '@dcloudio/uni-cli-shared'
import initMiniProgramPlugin from '@dcloudio/uni-mp-vite'
import { options } from './options'

const uniMiniProgramHarmonyPlugin: Plugin = {
  name: 'uni:mp-harmony',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: true,
      },
      build: {
        // css 中不支持引用本地资源
        assetsInlineLimit: ASSETS_INLINE_LIMIT,
      },
    }
  },
  generateBundle(_, bundle) {
    const appJson = bundle['app.json'] as OutputAsset
    if (appJson) {
      const appJsonStr = appJson.source.toString()
      if (appJsonStr.includes('subPackages')) {
        const appJsonObj = JSON.parse(appJsonStr)
        const subPackages = appJsonObj['subPackages'] as {
          root?: string
          resource?: string
        }[]
        if (subPackages) {
          if (Array.isArray(subPackages)) {
            subPackages.forEach((subPackage) => {
              if (subPackage && subPackage.root && !subPackage.resource) {
                subPackage.resource = subPackage.root.replace(/\//g, '_')
              }
            })
          }
          delete appJsonObj['subPackages']
          appJsonObj['subpackages'] = subPackages
          appJson.source = JSON.stringify(appJsonObj, null, 2)
        }
      }
    }
  },
}

export default [uniMiniProgramHarmonyPlugin, ...initMiniProgramPlugin(options)]
