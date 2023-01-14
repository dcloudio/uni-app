import { resolve } from 'path'
import { genProxyCode } from '../src/code'
import { ERR_MSG_PLACEHOLDER } from '../src/utils'

const pluginDir = resolve(__dirname, 'examples/uts/utssdk/test-uts')

describe('code', () => {
  test('genProxyCode', async () => {
    expect(
      (
        await genProxyCode(pluginDir, {
          id: 'test-uts',
          is_uni_modules: false,
          name: 'test-uts',
          namespace: 'uts.sdk.testUts',
          extname: '.uts',
        })
      ).replace(ERR_MSG_PLACEHOLDER, '')
    ).toMatchSnapshot()
  })
})
