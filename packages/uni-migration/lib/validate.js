const fs = require('fs')
const path = require('path')

const migraters = {
  'mp-weixin': require('./mp-weixin')
}

module.exports = function validate(input, out, options) {
  if (!fs.existsSync(input)) {
    return console.error(`错误: '${input}' 不存在`)
  }
  Object.assign(options, migraters[options.platform].options)
  const templateExtname = options.extname.template

  const stat = fs.lstatSync(input)
  if (stat.isFile()) {
    if (path.extname(input) !== templateExtname) {
      return console.error(`错误: 单文件转换需要传入 ${templateExtname.substr(1)} 文件地址`)
    }
    options.target = 'file'
  } else if (stat.isDirectory()) {
    options.base = input
    if (fs.existsSync(path.resolve(input, 'app.json'))) {
      options.target = 'app'
    } else {
      options.target = 'folder'
    }
  } else {
    return console.error(`错误: '${input}' 不支持转换`)
  }
  return true
}
