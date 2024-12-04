import path from 'path'

const libDir = path.resolve(__dirname, '../../lib')

export function initAppProvide() {
  const cryptoDefine = [path.join(libDir, 'crypto.js'), 'default']
  return {
    __f__: ['@dcloudio/uni-app', 'formatAppLog'],
    crypto: cryptoDefine,
    'window.crypto': cryptoDefine,
    'global.crypto': cryptoDefine,
    'uni.getCurrentSubNVue': ['@dcloudio/uni-app', 'getCurrentSubNVue'],
    'uni.requireNativePlugin': ['@dcloudio/uni-app', 'requireNativePlugin'],
  }
}
