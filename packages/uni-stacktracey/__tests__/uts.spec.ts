import path from 'path'

const {
  generateCodeFrameWithAndroidStacktrace,
} = require('../dist/uni-stacktracey.cjs.js')

const utsProjectDir = path.resolve(__dirname, '../test/uts')

describe('code-frame-uts', () => {
  test('android', async () => {
    expect(
      await generateCodeFrameWithAndroidStacktrace(androidUniModulesError, {
        name: 'uni_modules/test-uts1',
        inputDir: '/Users/fxy/DCloud/test-uts',
        outputDir: path.resolve(utsProjectDir, 'unpackage/dist/dev/app-plus'),
      })
    ).toMatchSnapshot()
    expect(
      await generateCodeFrameWithAndroidStacktrace(androidUtssdkError, {
        name: 'utssdk/test2',
        inputDir: '/Users/fxy/DCloud/test-uts',
        outputDir: path.resolve(utsProjectDir, 'unpackage/dist/dev/app-plus'),
      })
    ).toMatchSnapshot()
  })
})

const androidUniModulesError = `e: uni_modules/test-uts1/utssdk/app-android/index.kt: (8, 12): The integer literal does not conform to the expected type String

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':uni_modules:test-uts1:compileReleaseKotlin'.
> Compilation error. See log for more details

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 50s`

const androidUtssdkError = `e: utssdk/test2/app-android/index.kt: (8, 12): The integer literal does not conform to the expected type String

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':uni_modules:test-uts1:compileReleaseKotlin'.
> Compilation error. See log for more details

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 50s`
