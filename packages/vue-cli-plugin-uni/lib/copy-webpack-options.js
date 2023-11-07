const fs = require('fs')
const path = require('path')
const {
  compileI18nJsonStr
} = require('@dcloudio/uni-i18n')
const {
  initI18nOptions
} = require('@dcloudio/uni-cli-shared/lib/i18n')
const assetsDir = 'static'
const CopyWebpackPluginVersion = Number(require('copy-webpack-plugin/package.json').version.split('.')[0])

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

function addIgnore (ignore, platform, ignoreStatic) {
  if (CopyWebpackPluginVersion > 5) {
    if (platform === 'app-plus') {
      ignore.push(`${process.env.UNI_INPUT_DIR.replace(/\\/g, '/')}/static/app/**/*`)
    } else if (platform === 'h5') {
      ignore.push(`${process.env.UNI_INPUT_DIR.replace(/\\/g, '/')}/static/web/**/*`)
    }
    ignore.push(`${process.env.UNI_INPUT_DIR.replace(/\\/g, '/')}/static/${platform}/**/*`)
  } else {
    if (platform === 'app-plus') {
      ignore.push('app/**/*')
    } else if (platform === 'h5') {
      ignore.push('web/**/*')
    }
    ignore.push(platform + '/**/*')
  }
  if (platform === 'app-plus') {
    ignoreStatic.push(['static', 'app'])
  } else if (platform === 'h5') {
    ignoreStatic.push(['static', 'web'])
  }
  ignoreStatic.push(['static', platform])
}

let isIgnoreChecked = false

function checkIgnoreStatic (ignoreStatic) {
  if (isIgnoreChecked) {
    return
  }
  isIgnoreChecked = true
  const existIgnore = new Set()
  ignoreStatic.forEach(ignore => {
    const dir = path.resolve(process.env.UNI_INPUT_DIR, ...ignore)
    if (fs.existsSync(dir)) {
      existIgnore.add(ignore.join('/'))
    }
  })
  if (existIgnore.size) {
    console.log('已忽略静态资源目录：' + [...existIgnore].join('、') +
      '。详见：https://uniapp.dcloud.net.cn/tutorial/platform.html#static')
  }
}

// 暂未考虑动态添加static目录
function getAssetsCopyOptions (assetsDir) {
  const ignore = []
  const ignoreStatic = []
  global.uniPlugin.platforms.forEach(platform => {
    if (global.uniPlugin.name !== platform) {
      addIgnore(ignore, platform, ignoreStatic)
    }
  })
  checkIgnoreStatic(ignoreStatic)
  const copyOptions = []
  // 主包静态资源
  const mainAssetsCopyOption = getAssetsCopyOption(assetsDir, CopyWebpackPluginVersion > 5 ? {
    globOptions: {
      ignore
    }
  } : {
    ignore
  })
  if (mainAssetsCopyOption) {
    copyOptions.push(mainAssetsCopyOption)
  }
  // 分包静态资源
  process.UNI_SUBPACKAGES &&
    Object.keys(process.UNI_SUBPACKAGES).forEach(root => {
      const subAssetsCopyOption = getAssetsCopyOption(path.join(root, assetsDir), CopyWebpackPluginVersion > 5 ? {
        globOptions: {
          ignore
        }
      } : {
        ignore
      })
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
    const fileName = 'androidPrivacy.json'
    const context = path.resolve(process.env.UNI_INPUT_DIR)
    if (fs.existsSync(path.join(context, fileName))) {
      copyOptions.push({
        from: fileName,
        context,
        to: fileName,
        transform (content) {
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
      })
    }
  }
  return copyOptions
}

module.exports = {
  assetsDir,
  getCopyWebpackPluginOptions
}
