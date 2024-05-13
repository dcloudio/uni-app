import path from 'path'
import {
  findEncryptUniModules,
  findUploadEncryptUniModulesFiles,
} from '../src/uni_modules'

const platforms = ['app-android', 'app-ios', 'web'] as const
describe('uni_modules:uni-ext-api', () => {
  const inputDir = path.resolve(__dirname, '../../playground/uni_modules/src')
  test('findEncryptUniModules', () => {
    expect(findEncryptUniModules(inputDir)).toStrictEqual({
      'test-com1': undefined,
      'test-com2': undefined,
    })
  })

  platforms.forEach((platform) => {
    test(`findUploadEncryptUniModulesFiles(${platform})`, () => {
      expect(
        findUploadEncryptUniModulesFiles(
          findEncryptUniModules(inputDir),
          platform,
          inputDir
        ).map((item) => item.replace(inputDir, '').slice(1))
      ).toMatchSnapshot()
    })
  })
})
