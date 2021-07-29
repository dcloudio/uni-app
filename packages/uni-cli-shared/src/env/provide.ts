import path from 'path'
const libDir = path.resolve(__dirname, '../lib')
export function initProvide() {
  const cryptoDefine = [path.join(libDir, 'crypto.js'), 'default']
  return {
    crypto: cryptoDefine,
    'window.crypto': cryptoDefine,
    'global.crypto': cryptoDefine,
  }
}
