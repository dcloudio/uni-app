const fs = require('fs')
const path = require('path')
const uniI18n = require('@dcloudio/uni-cli-i18n')
const migraters = {
  'mp-weixin': require('./mp-weixin')
}

module.exports = function validate (input, out, options) {
  if (!fs.existsSync(input)) {
    return console.error(uniI18n.__('migration.errorInputNotExists', { 0: input }))
  }
  Object.assign(options, migraters[options.platform].options)
  const templateExtname = options.extname.template

  const stat = fs.lstatSync(input)
  if (stat.isFile()) {
    if (path.extname(input) !== templateExtname) {
      return console.error(uniI18n.__('migration.errorConvertRequireFileUrl', { 0: templateExtname.substr(1) }))
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
    return console.error(uniI18n.__('migration.errorCannotConvert', { 0: input }))
  }
  return true
}
