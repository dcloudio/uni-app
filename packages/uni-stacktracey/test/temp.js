/* eslint-disable no-restricted-globals */
const {
  getSourceMapContent,
  originalPositionFor,
} = require('../dist/uni-stacktracey.cjs.js')

getSourceMapContent(
  '/Users/lxh/Downloads/uts-test/unpackage/cache/.app-android/sourcemap/pages/index/index.kt.map'
).then((content) => {
  originalPositionFor(
    content,
    {
      line: 86,
      column: 0
    },
    true
  )
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
})
