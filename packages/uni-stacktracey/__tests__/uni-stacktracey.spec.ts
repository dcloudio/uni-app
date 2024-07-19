const path = require('path')
const {
  stacktracey,
  uniStracktraceyPreset,
  utsStracktraceyPreset,
} = require('../dist/uni-stacktracey.cjs.js')

const utsProjectDir = path.resolve(__dirname, '../test/uts')

const utsErrorMsg = `Error: 
${path.resolve(
  utsProjectDir,
  'unpackage/dist/dev/app-plus/uni_modules/test-uts/app-android/index.kt'
)}:59:67: error: unresolved reference: UTSJSONObject
open suspend fun testClassAsync(opts: AsyncOptions): Deferred<UTSJSONObject> = CoroutineScope(Dispatchers.Default).async {
                                                              ^
`

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
        base: path.resolve(__dirname, '../test/__UNI_APPID__/h5/1.0.0/'),
        sourceRoot: '',
      }),
    }).then((res: string) => {
      expect(res).toEqual(`Error: Sentry Error
at   src/pages/index/index.vue:44:0
at   src/pages/index/index.vue?be58:12:17
at   node_modules/@sentry/browser/esm/helpers.js:74:22
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:1864:25
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:2189:13
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:1864:25
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:2185:8
at   node_modules/@dcloudio/vue-cli-plugin-uni/packages/h5-vue/dist/vue.runtime.esm.js:7076:24`)
    })
  })

  test('utsStracktraceyPreset local', () => {
    stacktracey(utsErrorMsg, {
      preset: utsStracktraceyPreset({
        inputRoot: '/Users/fxy/Projects/Demo/my-vue3-project-uts/src',
        outputRoot: path.resolve(utsProjectDir, 'unpackage/dist/dev/app-plus'),
        sourceMapRoot: path.resolve(
          utsProjectDir,
          'unpackage/dist/dev/.sourcemap/app-plus'
        ),
      }),
    }).then((res: string) => {
      expect(res).toEqual(`Error:
at uni_modules/test-uts/app-android/index.uts:82:52
error: unresolved reference: UTSJSONObject
open suspend fun testClassAsync(opts: AsyncOptions): Deferred<UTSJSONObject> = CoroutineScope(Dispatchers.Default).async {
^
`)
    })
  })
})
