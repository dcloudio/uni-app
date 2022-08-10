const fs = require('fs')
const path = require('path')
const { parse, runBuild, bundle, UtsTarget } = require('../packages/uts/dist')
const projectDir = path.resolve(__dirname, '../packages/playground/uts')

let start = Date.now()
parse(
  fs.readFileSync(
    path.resolve(
      projectDir,
      'uni_modules/test-uniplugin/app-android/index.uts'
    ),
    'utf8'
  )
).then((res) => {
  console.log('parse: ' + (Date.now() - start) + 'ms')
  console.log(JSON.stringify(res))
})
start = Date.now()
bundle({
  input: {
    root: path.resolve(projectDir, 'uni_modules/test-uniplugin'),
    filename: path.resolve(
      projectDir,
      'uni_modules/test-uniplugin/app-android/index.uts'
    ),
  },
  output: {
    outDir: path.resolve(
      projectDir,
      'unpackage/dist/app-plus/uni_modules/test-uniplugin/'
    ),
    package: 'uts.modules.testUniPlugin',
    imports: ['kotlinx.coroutines.*', 'io.dcloud.uts.runtime.*'],
    sourceMap: true,
    extname: 'kt',
  },
}).then((res) => {
  console.log('bundle: ' + (Date.now() - start) + 'ms')
  console.log(JSON.stringify(res))
})
