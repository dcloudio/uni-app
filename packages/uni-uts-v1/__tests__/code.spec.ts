import { resolve } from 'path'
import { FORMATS, genProxyCode } from '../src/code'
import { ERR_MSG_PLACEHOLDER } from '../src/utils'

const inputDir = resolve(__dirname, 'examples/uts')
const pluginDir = resolve(__dirname, 'examples/uts/utssdk/test-uts')

describe('code', () => {
  test('genProxyCode', async () => {
    expect(
      (
        await genProxyCode(pluginDir, {
          moduleName: '测试',
          moduleType: 'built-in',
          id: 'test-uts',
          is_uni_modules: false,
          name: 'test-uts',
          namespace: 'uts.sdk.testUTS',
          extname: '.uts',
          androidComponents: { TestUTS: '' },
          inputDir,
        })
      ).replace(ERR_MSG_PLACEHOLDER, '')
    ).toMatchSnapshot()
  })
  test('genProxyCode cjs', async () => {
    expect(
      (
        await genProxyCode(pluginDir, {
          id: 'test-uts',
          is_uni_modules: false,
          name: 'test-uts',
          namespace: 'uts.sdk.testUTS',
          extname: '.uts',
          format: FORMATS.CJS,
          pluginRelativeDir: 'utssdk/test-uts',
          androidComponents: { TestUTS: '' },
          inputDir,
        })
      ).replace(ERR_MSG_PLACEHOLDER, '')
    ).toMatchSnapshot()
  })
})
