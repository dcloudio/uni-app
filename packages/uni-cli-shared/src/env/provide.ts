import path from 'path'

const libDir = path.resolve(__dirname, '../../lib')

export function initAppProvide() {
  const cryptoDefine = [path.join(libDir, 'crypto.js'), 'default']
  return {
    __f__: ['@dcloudio/uni-shared', 'formatAppLog'],
    crypto: cryptoDefine,
    'window.crypto': cryptoDefine,
    'global.crypto': cryptoDefine,
    'uni.getCurrentSubNVue': ['@dcloudio/uni-app', 'getCurrentSubNVue'],
  }
}

export function initH5Provide() {
  return {
    __f__: ['@dcloudio/uni-shared', 'formatH5Log'],
  }
}
