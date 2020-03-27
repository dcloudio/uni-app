const path = require('path')
const fs = require('fs-extra')

const validate = require('./validate')

const patchVant = require('./vant')

const migraters = {
  'mp-weixin': require('./mp-weixin')
}

module.exports = function migrate (input, out, options = {}) {
  options.platform = options.platform || 'mp-weixin'
  const migrater = migraters[options.platform]
  if (!migrater) {
    return console.error(`错误: 目前支持 ${Object.keys(migraters).join(',')} 转换`)
  }
  input = path.resolve(input)
  out = path.resolve(out || input)
  if (!validate(input, out, options)) {
    return
  }
  const [files, assets] = migrater.transform(input, out, options)
  files.forEach(file => {
    options.silent !== true && console.log(`write: ${file.path}`)
    fs.outputFileSync(file.path, file.content)
  })
  const styleExtname = options.extname.style

  const needCopy = input !== out
  assets.forEach(asset => {
    if (typeof asset === 'string') {
      const src = path.resolve(input, asset)
      const dest = path.resolve(out, asset.replace(styleExtname, '.css'))
      if (
        needCopy || (
          asset.indexOf(styleExtname) !== -1 &&
          styleExtname !== '.css'
        )
      ) {
        options.silent !== true && console.log(`copy: ${dest}`)
        try {
          fs.copySync(src, dest)
        } catch (e) {
          // ignore Source and destination must not be the same
        }
      }
    } else {
      options.silent !== true && console.log(`write: ${path.resolve(out, asset.path)}`)
      fs.outputFileSync(path.resolve(out, asset.path), asset.content)
    }
  })
  patchVant(files, assets, out)
}
