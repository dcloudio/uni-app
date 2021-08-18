import path from 'path'
const libDir = path.resolve(__dirname, '../lib')
export function initProvide() {
  const cryptoDefine = [path.join(libDir, 'crypto.js'), 'default']
  return {
    __f__: [path.join(__dirname, '../hbx/formatLog.js'), 'formatLog'],
    crypto: cryptoDefine,
    'window.crypto': cryptoDefine,
    'global.crypto': cryptoDefine,
  }
}
