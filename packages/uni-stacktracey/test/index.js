/* eslint-disable no-restricted-globals */
const path = require('path')
const {
  stacktracey,
  uniStracktraceyPreset,
  utsStracktraceyPreset,
} = require('../dist/uni-stacktracey.cjs.js')

const utsErrorMsg = `e: DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (9, 5): Unresolved reference: logxxxxxxx

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':nativeplugins:DCloud-UTSPlugin:compileReleaseKotlin'.
> Compilation error. See log for more details

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 2s
`
stacktracey(utsErrorMsg, {
  preset: utsStracktraceyPreset({
    base: path.resolve(
      __dirname,
      './nativeplugins-sourceMap/DCloud-UTSPlugin/'
    ),
    sourceRoot: 'DCloud-UTSPlugin/android/src/',
  }),
}).then((res) => {
  console.log('res :>> ', res)
})

const uniErrorMsg = `Error: Sentry Error
at a.throwError(/static/js/pages-index-index.3ab0d0e5.js:1:567)
at click(/static/js/pages-index-index.3ab0d0e5.js:1:2745)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at n(/static/js/chunk-vendors.75525bd5.js:34:13747)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at HTMLElement.n(/static/js/chunk-vendors.75525bd5.js:34:13824)
at HTMLElement.o._wrapper(/static/js/chunk-vendors.75525bd5.js:34:53966)
at HTMLElement.i(/static/js/chunk-vendors.75525bd5.js:7:609894)`
stacktracey(uniErrorMsg, {
  preset: uniStracktraceyPreset({
    base: path.resolve(__dirname, './__UNI__APPID__/1.0.0/.sourcemap/h5/'),
    sourceRoot: '',
    // splitThirdParty: true
  }),
}).then((res) => {
  console.log('res :>> ', res)
})
