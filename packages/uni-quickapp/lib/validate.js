const fs = require('fs')
const path = require('path')

module.exports = function() {
  const manifest = global.framework.manifest

  if (manifest.package === 'Bundle') {
    console.error(`> 建议配置 manifest.json->quickapp->package 应用包名`)
  }

  const signPath = './sign/' + (process.env.NODE_ENV === 'production' ? 'release' : 'debug')
  const privatePemPath = path.resolve(process.env.UNI_INPUT_DIR, signPath + '/private.pem')
  const certificatePemPath = path.resolve(process.env.UNI_INPUT_DIR, signPath + '/certificate.pem')

  if (!fs.existsSync(privatePemPath)) {
    console.error(`> 缺少私钥文件, 打包失败: ${privatePemPath}`)
    process.exit(0)
  }

  if (!fs.existsSync(certificatePemPath)) {
    console.error(`> 缺少证书文件, 打包失败: ${certificatePemPath}`)
    process.exit(0)
  }
}
