module.exports = async function checkUpdate () {
  const {
    isInHBuilderX
  } = require('@dcloudio/uni-cli-shared')

  if (isInHBuilderX) { // 仅 cli 提供检测更新
    return
  }

  const pkg = require('../package.json')
  const checkForUpdate = require('update-check')
  let update = null

  try {
    const options = {}
    if (pkg.version.indexOf('alpha') !== -1) {
      options.distTag = 'alpha'
    }
    update = await checkForUpdate(pkg, options)
  } catch (err) {
    // console.error(`检查更新失败: ${err}`)
  }

  if (update) {
    if (pkg.version.split('.')[0] !== update.latest.split('.')[0]) {
      console.log(`发现 uni-app 新版本 ${update.latest}`)
      console.log(`1.修改 package.json 中 @dcloudio 相关包版本为 ^${update.latest}`)
      console.log('2.删除 package-lock.json 或 yarn.lock')
      console.log('3.执行 npm install 或 yarn')
    } else {
      console.log(`发现 uni-app 新版本 ${update.latest}. 请执行 npm update 升级`)
    }
  }
}
