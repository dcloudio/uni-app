const fs = require('fs')
const path = require('path')
const {
  compileI18nJsonStr
} = require('@dcloudio/uni-i18n')
const {
  initI18nOptions
} = require('@dcloudio/uni-cli-shared/lib/i18n')
const assetsDir = 'static'

function getAssetsCopyOption (from, options = {}) {
  if (path.isAbsolute(from)) {
    if (fs.existsSync(from)) {
      return Object.assign({
        from,
        to: path.resolve(process.env.UNI_OUTPUT_DIR)
      },
      options
      )
    }
  }
  const to = from
  from = path.resolve(process.env.UNI_INPUT_DIR, from)
  if (fs.existsSync(from)) {
    return Object.assign({
      from,
      to: path.resolve(process.env.UNI_OUTPUT_DIR, to)
    },
    options
    )
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
  process.UNI_SUBPACKAGES &&
    Object.keys(process.UNI_SUBPACKAGES).forEach(root => {
      const subAssetsCopyOption = getAssetsCopyOption(
        path.join(root, assetsDir), {
          ignore
        }
      )
      if (subAssetsCopyOption) {
        copyOptions.push(subAssetsCopyOption)
      }
    })
  return copyOptions
}

function getUniModulesAssetsCopyOptions (assetsDir) {
  const copyOptions = []
  global.uniModules.forEach(module => {
    copyOptions.push(
      ...getAssetsCopyOptions('uni_modules/' + module + '/' + assetsDir)
    )
  })
  return copyOptions
}

function getCopyWebpackPluginOptions (platformOptions, vueOptions) {
  const copyOptions = getAssetsCopyOptions(assetsDir).concat(
    getUniModulesAssetsCopyOptions(assetsDir)
  )
  global.uniPlugin.copyWebpackOptions.forEach(copyWebpackOptions => {
    const platformCopyOptions =
      copyWebpackOptions(platformOptions, vueOptions, copyOptions) || []
    platformCopyOptions.forEach(copyOption => {
      if (typeof copyOption === 'string') {
        copyOption = getAssetsCopyOption(copyOption)
      }
      copyOption && copyOptions.push(copyOption)
    })
  })
  // 自动化测试时，不启用androidPrivacy.json
  if (process.env.UNI_PLATFORM === 'app-plus' && !process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
    copyOptions.push({
      from: path.resolve(process.env.UNI_INPUT_DIR, 'android*.json'),
      to: '[name].[ext]',
      globOptions: {
        ignored: require('./util').getWatchOptions().ignored
      },
      transform (content, path) {
        if (path.endsWith('androidPrivacy.json')) {
          const options = initI18nOptions(
            process.env.UNI_PLATFORM,
            process.env.UNI_INPUT_DIR,
            false,
            true
          )
          if (!options) {
            return content
          }
          return compileI18nJsonStr(content.toString(), options)
        }
        return content
      }
    })
  }
  return copyOptions
}

module.exports = {
  assetsDir,
  getCopyWebpackPluginOptions
}
