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

BUILD FAILED in 2s`

const uniErrorMsg = `Error: Sentry Error
at a.throwError(/static/js/pages-index-index.3ab0d0e5.js:1:567)
at click(/static/js/pages-index-index.3ab0d0e5.js:1:2745)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at n(/static/js/chunk-vendors.75525bd5.js:34:13747)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at HTMLElement.n(/static/js/chunk-vendors.75525bd5.js:34:13824)
at HTMLElement.o._wrapper(/static/js/chunk-vendors.75525bd5.js:34:53966)
at HTMLElement.i(/static/js/chunk-vendors.75525bd5.js:7:609894)`

describe('uni-stacktracey', () => {
  test('uniStracktraceyPreset local', () => {
    stacktracey(uniErrorMsg, {
      preset: uniStracktraceyPreset({
        base: path.resolve(
          __dirname,
          '../test/__UNI__APPID__/1.0.0/.sourcemap/h5/'
        ),
        sourceRoot: '',
      }),
    }).then((res: string) => {
      expect(res).toEqual(`Error: Sentry Error
at   src/pages/index/index.vue:44                                                            
at   src/pages/index/index.vue?be58:12                                                       
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:1864  
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:2189  
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:1864  
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:2185  
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:7076  
at   node_modules/@sentry/browser/esm/helpers.js:74                                          `)
    })
  })

  test('uniStracktraceyPreset local', () => {
    stacktracey(utsErrorMsg, {
      preset: utsStracktraceyPreset({
        base: path.resolve(
          __dirname,
          '../test/nativeplugins-sourceMap/DCloud-UTSPlugin/'
        ),
        sourceRoot: 'DCloud-UTSPlugin/android/src/',
      }),
    }).then((res: string) => {
      expect(res)
        .toEqual(`e: C:/Users/xianyang/Documents/HBuilderProjects/test-uni2/nativeplugins/DCloud-UTSPlugin/android/src/io/dcloud/uniplugin/TestModule.uts: (7, 0): Unresolved reference: logxxxxxxx

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':nativeplugins:DCloud-UTSPlugin:compileReleaseKotlin'.
> Compilation error. See log for more details

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 2s`)
    })
  })
})
