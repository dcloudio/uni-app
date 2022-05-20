const path = require('path')
const { runBuild, UtsTarget } = require('../packages/uts/dist')
const projectDir = path.resolve(__dirname, '../packages/playground/uts')
// uts
runBuild(UtsTarget.KOTLIN, {
  silent: false,
  input: {
    dir: path.resolve(projectDir, 'nativeplugins/test-uniplugin'),
    extname: '.uts',
  },
  output: {
    dir: path.resolve(projectDir, 'unpackage/nativeplugins/test-uniplugin'),
    sourceMap: true,
    inlineSourcesContent: false,
  },
})
