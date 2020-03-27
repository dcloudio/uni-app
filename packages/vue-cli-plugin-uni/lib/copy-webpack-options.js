const fs = require('fs')
const path = require('path')

const assetsDir = 'static'

function getAssetsCopyOption (from, options = {}) {
  if (path.isAbsolute(from)) {
    if (fs.existsSync(from)) {
      return Object.assign({
        from,
        to: path.resolve(process.env.UNI_OUTPUT_DIR)
      }, options)
    }
  }
  const to = from
  from = path.resolve(process.env.UNI_INPUT_DIR, from)
  if (fs.existsSync(from)) {
    return Object.assign({
      from,
      to: path.resolve(process.env.UNI_OUTPUT_DIR, to)
    }, options)
  }
}
// 暂未考虑动态添加static目录
function getAssetsCopyOptions (assetsDir) {
  const ignore = []

  global.uniPlugin.platforms.forEach(platform => {
    if (global.uniPlugin.name !== platform) {
      ignore.push(platform + '/**/*')
    }
  })

  const copyOptions = []
  // 主包静态资源
  const mainAssetsCopyOption = getAssetsCopyOption(assetsDir, {
    ignore
  })
  if (mainAssetsCopyOption) {
    copyOptions.push(mainAssetsCopyOption)
  }
  // 分包静态资源
  process.UNI_SUBPACKAGES && Object.keys(process.UNI_SUBPACKAGES).forEach(root => {
    const subAssetsCopyOption = getAssetsCopyOption(path.join(root, assetsDir), {
      ignore
    })
    if (subAssetsCopyOption) {
      copyOptions.push(subAssetsCopyOption)
    }
  })
  return copyOptions
}

function getCopyWebpackPluginOptions (platformOptions, vueOptions) {
  const copyOptions = getAssetsCopyOptions(assetsDir)
  global.uniPlugin.copyWebpackOptions.forEach(copyWebpackOptions => {
    const platformCopyOptions = copyWebpackOptions(platformOptions, vueOptions) || []
    platformCopyOptions.forEach(copyOption => {
      if (typeof copyOption === 'string') {
        copyOption = getAssetsCopyOption(copyOption)
      }
      copyOption && copyOptions.push(copyOption)
    })
  })
  console.log('debug:::', copyOptions)
  return copyOptions
}

module.exports = {
  assetsDir,
  getCopyWebpackPluginOptions
}
