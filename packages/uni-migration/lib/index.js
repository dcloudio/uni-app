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
  if (!validate(input, out, options)) {
    return
  }
  migrater.transform(input, out, options).forEach(file => {
    console.log(`写入: ${file.path}`)
    console.log(`${file.content}`)
    // fs.outputFileSync(file.path, file.content)
  })
}
