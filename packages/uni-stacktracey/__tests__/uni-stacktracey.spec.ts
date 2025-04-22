const path = require('path')
const {
  stacktracey,
  uniStracktraceyPreset,
  utsStracktraceyPreset,
} = require('../dist/uni-stacktracey.cjs.js')

const utsProjectDir = path.resolve(__dirname, '../test/uts')

describe('uni-stacktracey', () => {
  test('parse web stacktrace', async () => {
    expect(
      await stacktracey(
        `Error: Sentry Error
at a.throwError(/static/js/pages-index-index.3ab0d0e5.js:1:567)
at click(/static/js/pages-index-index.3ab0d0e5.js:1:2745)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at n(/static/js/chunk-vendors.75525bd5.js:34:13747)
at ee(/static/js/chunk-vendors.75525bd5.js:34:11927)
at HTMLElement.n(/static/js/chunk-vendors.75525bd5.js:34:13824)
at HTMLElement.o._wrapper(/static/js/chunk-vendors.75525bd5.js:34:53966)
at HTMLElement.i(/static/js/chunk-vendors.75525bd5.js:7:609894)`,
        {
          preset: uniStracktraceyPreset({
            base: path.resolve(__dirname, '../test/__UNI_APPID__/h5/1.0.0/'),
            sourceRoot: '',
          }),
        }
      )
    ).toMatchSnapshot()
  })

  test('parse kotlin stacktrace', async () => {
    expect(
      await stacktracey(
        `Error:
${path.resolve(
  utsProjectDir,
  'unpackage/dist/dev/app-plus/uni_modules/test-uts/app-android/index.kt'
)}:59:67: error: unresolved reference: UTSJSONObject
open suspend fun testClassAsync(opts: AsyncOptions): Deferred<UTSJSONObject> = CoroutineScope(Dispatchers.Default).async {
                                                              ^
`,
        {
          preset: utsStracktraceyPreset({
            inputRoot: '/Users/fxy/Projects/Demo/my-vue3-project-uts/src',
            outputRoot: path.resolve(
              utsProjectDir,
              'unpackage/dist/dev/app-plus'
            ),
            sourceMapRoot: path.resolve(
              utsProjectDir,
              'unpackage/dist/dev/.sourcemap/app-plus'
            ),
          }),
        }
      )
    ).toMatchSnapshot()
  })

  test('parse arkts stacktrace', async () => {
    expect(
      await stacktracey(
        `1 ERROR: ArkTS:ERROR File: ${path.resolve(
          utsProjectDir,
          'unpackage/debug/app-harmony-9ed02395/uni_modules/native-button/utssdk/app-harmony/index.ets'
        )}:74:48
        Argument of type 'UniNativeViewElement | null' is not assignable to parameter of type 'UniNativeViewElement'.
         Type 'null' is not assignable to type 'UniNativeViewElement'.`,
        {
          preset: utsStracktraceyPreset({
            inputRoot: '',
            outputRoot: path.resolve(
              utsProjectDir,
              'unpackage/debug/app-harmony-9ed02395/'
            ),
            sourceMapRoot: path.resolve(
              utsProjectDir,
              'unpackage/dist/dev/.sourcemap/app-harmony'
            ),
          }),
        }
      )
    ).toMatchSnapshot()

    expect(
      await stacktracey(
        `2 ERROR: ArkTS:ERROR File: ${path.resolve(
          utsProjectDir,
          'unpackage/debug/app-harmony-9ed02395/uni_modules/native-button/utssdk/app-harmony/builder.ets'
        )}:8:9
       Cannot find name 'param'. Did you mean 'params'?`,
        {
          preset: utsStracktraceyPreset({
            inputRoot: path.resolve(
              utsProjectDir,
              'unpackage/debug/app-harmony-9ed02395'
            ),
            outputRoot: path.resolve(
              utsProjectDir,
              'unpackage/debug/app-harmony-9ed02395'
            ),
            sourceMapRoot: path.resolve(
              utsProjectDir,
              'unpackage/dist/dev/.sourcemap/app-harmony'
            ),
          }),
        }
      )
    ).toMatchSnapshot()

    expect(
      await stacktracey(
        `1 WARN: ArkTS:WARN File: D:/demo-projects/demo-app-x/unpackage/debug/app-harmony-fde54b25/oh_modules/.ohpm/@dcloudio+uni-app-x-runtime@8kwvevyo0ovlx9ebtjtkdkzydpkx+j5qpbuuwz5vjge=/oh_modules/@dcloudio/uni-app-x-runtime/src/main/ets/runtime/dom/NamedNodeMap.ets:16:45`,
        {
          preset: utsStracktraceyPreset({
            inputRoot:
              'D:/demo-projects/demo-app-x/unpackage/debug/app-harmony-fde54b25',
            outputRoot:
              'D:/demo-projects/demo-app-x/unpackage/debug/app-harmony-fde54b25',
            sourceMapRoot: path.resolve(
              __dirname,
              'uts/unpackage/dist/dev/.sourcemap/app-harmony'
            ),
          }),
        }
      )
    ).toMatchSnapshot()
  })

  test('parse swift stacktrace', async () => {
    expect(
      await stacktracey(
        `/uts-development-ios/dependences/buildFramework/template/xcode_ust_template/unimoduleTestUTS1/src/index.swift:3:12: error: cannot convert return expression of type 'Int' to return type 'String'
/uts-development-ios/dependences/buildFramework/template/xcode_ust_template/unimoduleTestUTS1/src/index.swift:6:12: error: cannot convert return expression of type 'Int' to return type 'String'
`,
        {
          preset: utsStracktraceyPreset({
            inputRoot: '/Users/fxy/DCloud/test-uts',
            outputRoot:
              '/uts-development-ios/dependences/buildFramework/template/xcode_ust_template/unimoduleTestUTS1/src',
            sourceMapRoot: path.resolve(utsProjectDir, 'examples/sourcemap'),
          }),
        }
      )
    ).toMatchSnapshot()
  })
})
