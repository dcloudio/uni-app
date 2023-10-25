import { resolve } from 'path'
import { FORMATS, GenProxyCodeOptions, genProxyCode } from '../src/code'
import { ERR_MSG_PLACEHOLDER } from '../src/utils'

const inputDir = resolve(__dirname, 'examples/uts')
const pluginDir = resolve(__dirname, 'examples/uts/utssdk/test-uts')

describe('code', () => {
  test('genProxyCode', async () => {
    const options: GenProxyCodeOptions = {
      moduleName: '测试',
      moduleType: 'built-in',
      id: 'test-uts',
      is_uni_modules: false,
      name: 'test-uts',
      namespace: 'uts.sdk.testUTS',
      extname: '.uts',
      androidComponents: { TestUTS: '' },
      inputDir,
    }
    const res = await genProxyCode(pluginDir, options)
    expect(res.replace(ERR_MSG_PLACEHOLDER, '')).toMatchSnapshot()
    expect(options.meta).toMatchSnapshot()
    expect(options.types).toMatchSnapshot()
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
