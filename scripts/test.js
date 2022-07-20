const fs = require('fs')
const path = require('path')
const { parse, runBuild, UtsTarget } = require('../packages/uts/dist')
const projectDir = path.resolve(__dirname, '../packages/playground/uts')

const start = Date.now()
parse(
  fs.readFileSync(
    path.resolve(projectDir, 'uni_modules/test-uniplugin/interface.uts'),
    'utf8'
  )
).then((res) => {
  console.log('parse: ' + (Date.now() - start) + 'ms')
  console.log(JSON.stringify(res))
})

// uts
runBuild(UtsTarget.KOTLIN, {
  silent: false,
  input: {
    dir: path.resolve(projectDir, 'nativeplugins/test-uniplugin'),
    extname: '.uts',
  },
  output: {
    dir: path.resolve(
      projectDir,
      'unpackage/nativeplugins/test-uniplugin-android'
    ),
    sourceMap: false,
    inlineSourcesContent: false,
  },
})
runBuild(UtsTarget.SWIFT, {
  silent: false,
  input: {
    dir: path.resolve(projectDir, 'nativeplugins/test-uniplugin'),
    extname: '.uts',
  },
  output: {
    dir: path.resolve(projectDir, 'unpackage/nativeplugins/test-uniplugin-ios'),
    sourceMap: false,
    inlineSourcesContent: false,
  },
})
