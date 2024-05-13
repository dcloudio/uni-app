const path = require('path')
const {
  findEncryptUniModules,
  packUploadEncryptUniModules,
} = require('../dist/uni_modules')

console.log(
  packUploadEncryptUniModules(
    findEncryptUniModules(
      path.resolve(__dirname, '../../playground/uni_modules/src')
    ),
    'app-android',
    path.resolve(__dirname, '../../playground/uni_modules/src'),
    path.resolve(__dirname)
  )
)
