const path = require('path')
const fs = require('fs-extra')

const validate = require('./validate')

const migraters = {
  'mp-weixin': require('./mp-weixin')
}

module.exports = function migrate(input, out, options = {
  platform: 'mp-weixin'
}) {
  const migrater = migraters[options.platform]
  if (!migrater) {
    return console.error(`错误: 目前支持 Object.keys(migraters).join(',') 转换`)
  }
  out = out || input
  if (!validate(input, out, options)) {
    return
  }
  const [files, assets] = migrater.transform(input, out, options)
  files.forEach(file => {
    console.log(`write: ${file.path}`)
    fs.outputFileSync(file.path, file.content)
  })
  const styleExtname = options.extname.style

  const needCopy = input !== out
  assets.forEach(asset => {
    if (typeof asset === 'string') {
      const src = path.resolve(input, asset)
      const dest = path.resolve(out, asset.replace(styleExtname, '.css'))
      if (!migrater.patch(src, dest)) {
        if (
          needCopy || (
            asset.indexOf(styleExtname) !== -1 &&
            styleExtname !== '.css'
          )
        ) {
          console.log(`copy: ${dest}`)
          fs.copySync(src, dest)
        }
      }
    } else {
      console.log(`write: ${path.resolve(out, asset.path)}`)
      fs.outputFileSync(path.resolve(out, asset.path), asset.content)
    }
  })
}
