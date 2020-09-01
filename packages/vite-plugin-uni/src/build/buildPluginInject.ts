import { Plugin } from 'rollup'

import { RollupInjectOptions } from '@rollup/plugin-inject'

import inject from '@rollup/plugin-inject'

const APIS = [
  'upx2px',
  'canIUse',
  'makePhoneCall',
  'getSystemInfo',
  'getSystemInfoSync',
  'arrayBufferToBase64',
  'base64ToArrayBuffer'
]

const injectOptions: RollupInjectOptions = {
  exclude: /\.[n]?vue$/,
  // @dcloudio/uni-api/src/service/base/upx2px->checkDeviceWidth
  '__GLOBAL__.getSystemInfoSync': ['@dcloudio/uni-h5', 'getSystemInfoSync']
}

APIS.forEach(api => {
  injectOptions['uni.' + api] = ['@dcloudio/uni-h5', api]
})

export const buildPluginInject: Plugin = inject(injectOptions)
