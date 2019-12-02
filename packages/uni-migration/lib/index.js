const path = require('path')
const fs = require('fs-extra')

const validate = require('./validate')

const migraters = {
  'mp-weixin': require('./mp-weixin')
}

/**
 * 先简单的 hack 一下,支持 vant 的 array.wxs
 * @param {Object} src
 * @param {Object} dest
 */
function hackVant(src, dest) {
  if (src.indexOf('array.wxs') !== -1) {
    fs.outputFileSync(
      dest,
      fs.readFileSync(src)
      .toString()
      .replace(`array.constructor === 'Array'`, 'Array.isArray(array)')
    )
    return true
  }
  return false
}

module.exports = function migrate(input, out, options = {
  platform: 'mp-weixin'
}) {
  const migrater = migraters[options.platform]
  if (!migrater) {
    return console.error(`错误: 目前支持 Object.keys(migraters).join(',') 转换`)
  }
  if (!validate(input, out, options)) {
    return
  }
  const [files, assets] = migrater.transform(input, out, options)
  files.forEach(file => {
    console.log(`write: ${file.path}`)
    fs.outputFileSync(file.path, file.content)
  })
  const styleExtname = options.extname.style
  assets.forEach(asset => {
    if (typeof asset === 'string') {
      const src = path.resolve(input, asset)
      const dest = path.resolve(out, asset.replace(styleExtname, '.css'))
      console.log(`copy: ${dest}`)
      if (!hackVant(src, dest)) {
        fs.copySync(src, dest)
      }
    } else {
      console.log(`write: ${path.resolve(out, asset.path)}`)
      fs.outputFileSync(path.resolve(out, asset.path), asset.content)
    }
  })
}
