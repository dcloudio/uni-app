const fs = require('fs')
const path = require('path')
const { parse, runBuild, bundle, UtsTarget } = require('../packages/uts/dist')
const projectDir = path.resolve(__dirname, '../packages/playground/uts')

const start = Date.now()
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

// bundle({
//   entry: {
//     'test-uniplugin': path.resolve(
//       projectDir,
//       'uni_modules/test-uniplugin/app-android/index.uts'
//     ),
//   },
//   output: {
//     path: path.resolve(
//       projectDir,
//       'unpackage/dist/app-plus/uni_modules/test-uniplugin/bundle'
//     ),
//   },
// }).then((res) => {
//   console.log(res)
// })

// uts
runBuild(UtsTarget.KOTLIN, {
  silent: false,
  input: {
    dir: path.resolve(projectDir, 'uni_modules/test-uniplugin'),
    extname: '.uts',
  },
  output: {
    dir: path.resolve(
      projectDir,
      'unpackage/dist/app-plus/uni_modules/test-uniplugin/android'
    ),
    sourceMap: false,
    inlineSourcesContent: false,
  },
})
runBuild(UtsTarget.SWIFT, {
  silent: false,
  input: {
    dir: path.resolve(projectDir, 'uni_modules/test-uniplugin'),
    extname: '.uts',
  },
  output: {
    dir: path.resolve(
      projectDir,
      'unpackage/dist/app-plus/uni_modules/test-uniplugin/ios'
    ),
    sourceMap: false,
    inlineSourcesContent: false,
  },
})
