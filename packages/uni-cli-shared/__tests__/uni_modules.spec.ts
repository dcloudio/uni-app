import path from 'path'
import {
  findCloudEncryptUniModules,
  findUploadEncryptUniModulesFiles,
  parseUniModulesWithComponents,
} from '../src/uni_modules.cloud'
import { normalizePath } from '../src/utils'

const platforms = [
  'app-android',
  'app-ios',
  'web',
  'app-harmony',
  'mp-weixin',
] as const
describe('uni_modules:uni-ext-api', () => {
  const inputDir = path.resolve(__dirname, '../../playground/uni_modules/src')

  platforms.forEach((platform) => {
    test(`findCloudEncryptUniModules(${platform})`, () => {
      expect(findCloudEncryptUniModules(platform, inputDir)).toMatchSnapshot()
    })
    test(`findUploadEncryptUniModulesFiles(${platform})`, () => {
      const modules = findUploadEncryptUniModulesFiles(
        findCloudEncryptUniModules(platform, inputDir),
        platform,
        inputDir
      )
      expect(
        Object.keys(modules).reduce((res: string[], id: string) => {
          res.push(
            ...modules[id].map((item) => normalizePath(item).split('/src/')[1])
          )
          return res
        }, [])
      ).toMatchSnapshot()
    })
  })
})
describe('uni_modules:cloud', () => {
  const inputDir = path.resolve(__dirname, 'examples/cloud')
  test('parseUniModulesWithComponents', () => {
    expect(
      parseUniModulesWithComponents(inputDir, 'app-android')
    ).toMatchSnapshot()
    expect(parseUniModulesWithComponents(inputDir, 'app-ios')).toMatchSnapshot()
    expect(parseUniModulesWithComponents(inputDir, 'web')).toMatchSnapshot()
    expect(
      parseUniModulesWithComponents(inputDir, 'mp-weixin')
    ).toMatchSnapshot()
  })
})
