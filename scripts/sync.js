const path = require('path')
const fs = require('fs-extra')
const { config } = require('dotenv')
config()
if (process.env.UNI_APP_SYNTAX_DIR) {

  const utsTypesCommonDir = path.resolve(process.env.UNI_APP_SYNTAX_DIR, 'uts/common')
  fs.copySync(utsTypesCommonDir, path.resolve(__dirname, '../packages/uni-uts-v1/lib/uts/types/common'))
}
if (process.env.UNI_APP_VUE_TYPES_DIR) {
  ['reactivity', 'runtime-core', 'shared'].forEach(pkg => {
    const fileName = pkg + '/dist/' + pkg + '.d.ts'
    fs.copySync(
      path.resolve(process.env.UNI_APP_VUE_TYPES_DIR, 'packages', fileName),
      path.resolve(__dirname, '../packages/uni-uts-v1/lib/uts/types/@vue', fileName)
    )
  })
}