const fs = require('fs-extra')
const path = require('path')

const pkgs = [
  'uni-mp-alipay',
  'uni-mp-baidu',
  'uni-mp-qq',
  'uni-mp-toutiao',
  'uni-mp-weixin',
  'uni-quickapp-webview'
]

const branch = '/Users/fxy/Documents/GitHub/uni-app-dev'

console.log('copy[uni-mp-vue]:vue.runtime.esm.js')
fs.copySync(
  path.resolve(__dirname, '../packages/uni-mp-vue/dist/vue.runtime.esm.js'),
  path.resolve(branch, 'packages/uni-mp-vue/dist/vue.runtime.esm.js')
)

pkgs.forEach(pkg => {
  const fromDir = path.resolve(__dirname, '../packages/' + pkg + '/dist')
  const toDir = path.resolve(branch, 'packages/' + pkg + '/dist')
  console.log('copy[' + pkg + ']:uni.api.esm.js')
  fs.copySync(
    path.join(fromDir, 'uni.api.esm.js'),
    path.join(toDir, 'uni.api.esm.js')
  )
  console.log('copy[' + pkg + ']:uni.mp.esm.js')
  fs.copySync(
    path.join(fromDir, 'uni.mp.esm.js'),
    path.join(toDir, 'uni.mp.esm.js')
  )
})
