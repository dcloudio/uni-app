import path from 'path'

const {
  generateCodeFrameWithKotlinStacktrace,
  generateCodeFrameWithSwiftStacktrace,
} = require('../dist/uni-stacktracey.cjs.js')

const utsProjectDir = path.resolve(__dirname, '../test/uts')

describe('code-frame-uts', () => {
  test('android', async () => {
    expect(
      await generateCodeFrameWithKotlinStacktrace(androidUniModulesError, {
        name: 'uni_modules/test-uts1',
        inputDir: '/Users/fxy/DCloud/test-uts',
        outputDir: path.resolve(utsProjectDir, 'unpackage/dist/dev/app-plus'),
      })
    ).toMatchSnapshot()
    expect(
      await generateCodeFrameWithKotlinStacktrace(androidUTSsdkError, {
        name: 'utssdk/test2',
        inputDir: '/Users/fxy/DCloud/test-uts',
        outputDir: path.resolve(utsProjectDir, 'unpackage/dist/dev/app-plus'),
      })
    ).toMatchSnapshot()
  })
  test('ios', async () => {
    expect(
      await generateCodeFrameWithSwiftStacktrace(iosUniModulesError, {
        name: 'uni_modules/test-uts1',
        inputDir: '/Users/fxy/DCloud/test-uts',
        outputDir: path.resolve(utsProjectDir, 'unpackage/dist/dev/app-plus'),
      })
    ).toMatchSnapshot()
  })
})

const androidUniModulesError = `e: uni_modules/test-uts1/utssdk/app-android/index.kt: (8, 12): The integer literal does not conform to the expected type String

FAILURE: Build failed with an exception.`

const androidUTSsdkError = `e: utssdk/test2/app-android/index.kt: (8, 12): The integer literal does not conform to the expected type String

FAILURE: Build failed with an exception.`

const iosUniModulesError = `CompileSwift normal armv7 uni_modules/test-uts1/utssdk/app-ios/src/index.swift (in target 'uni_modules_test_uts1' from project 'UTS')
uni_modules/test-uts1/utssdk/app-ios/src/index.swift:3:12: error: cannot convert return expression of type 'Int' to return type 'String'

CompileSwift normal arm64 uni_modules/test-uts1/utssdk/app-ios/src/index.swift (in target 'uni_modules_test_uts1' from project 'UTS')
uni_modules/test-uts1/utssdk/app-ios/src/index.swift:3:12: error: cannot convert return expression of type 'Int' to return type 'String'`
