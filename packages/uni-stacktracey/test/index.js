/* eslint-disable no-restricted-globals */
const path = require('path')
const {
  stacktrace,
  uniStacktracePreset,
  utsStacktracePreset,
} = require('../dist/uni-stacktracey.cjs.js')

stacktrace(
  `UTSError(name='Error', message='setTimeout ABC', cause='null')
    at uni.UNIADA0E20.GenPagesIndexIndex$gen_error_fn$1.invoke(index.kt:86)
    at uni.UNIADA0E20.GenPagesIndexIndex$gen_error_fn$1. invoke(index.kt:85)
    at io.dcloud.uts.UTSTimerKt$setTimeout$runnable$1.doSth(UTSTimer.kt:120)
    at io.dcloud.uts.UTSRunnable.run(UTSTimer.kt:69)
    at android.os.Handler.handleCallback(Handler.java:959)
    at android.os.Handler.dispatchMessage(Handler.java:100)
    at android.os.Looper.loop0nce(Looper.java:232)
    at android.os.Looper. loop(Looper.java:317)
    at io.dcloud.px.h2.a(SourceFile:60)
    at io.dcloud.px.h2$$ExternalSyntheticLambda1. run(D8$$SyntheticClass:0)
    at android.os.Handler.handleCallback(Handler.java:959)
    at android.os.Handler.dispatchMessage(Handler.java:100)
    at android.os.Looper.loop0nce(Looper.java:232)
    at android.os.Looper.loop(Looper.java:317)
    at android.app.ActivityThread.main(ActivityThread.java:8705)
    at java. lang.reflect.Method.invoke(Native Method)
    at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:580)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:886)`,
  {
    preset: utsStacktracePreset({
      base: '/Users/lxh/Downloads/uts-test/unpackage/dist/build/.sourcemap/app-android',
      inputRoot: '/Users/lxh/Downloads/uts-test',
      outputRoot: path.resolve(
        '/Users/lxh/Downloads/uts-test/unpackage/dist/build/app-android'
      ),
      sourceMapRoot: path.resolve(
        '/Users/lxh/Downloads/uts-test/unpackage/dist/build/.sourcemap/app-android'
      ),
    }),
  }
).then((res) => {
  console.log('res :>> ', res)
})

/* const utsErrorMsg = `e: DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.kt: (9, 5): Unresolved reference: logxxxxxxx

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':nativeplugins:DCloud-UTSPlugin:compileReleaseKotlin'.
> Compilation error. See log for more details

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 2s
`
stacktrace(utsErrorMsg, {
  preset: utsStacktracePreset({
    base: path.resolve(
      __dirname,
      './nativeplugins-sourceMap/DCloud-UTSPlugin/'
    ),
    sourceRoot: 'DCloud-UTSPlugin/android/src/',
  }),
}).then((res) => {
  console.log('res :>> ', res)
})
 */
/* const uniErrorMsg = `Error: Sentry Error
at a.throwError(/static/js/pages-index-index.3ab0d0e5.js:1:567)
at click(/static/js/pages-index-index.3ab0d0e5.js:1:2745)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at n(/static/js/chunk-vendors.75525bd5.js:34:13747)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at HTMLElement.n(/static/js/chunk-vendors.75525bd5.js:34:13824)
at HTMLElement.o._wrapper(/static/js/chunk-vendors.75525bd5.js:34:53966)
at HTMLElement.i(/static/js/chunk-vendors.75525bd5.js:7:609894)`
stacktrace(uniErrorMsg, {
  preset: uniStacktracePreset({
    base: path.resolve(__dirname, './__UNI_APPID__/h5/1.0.0'),
    sourceRoot: '',
    // splitThirdParty: true
  }),
}).then((res) => {
  console.log('res :>> ', res)
})
 */
