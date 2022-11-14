import { resolve } from 'path'
import { genProxyCode } from '../src/code'

const pluginDir = resolve(__dirname, 'examples/uts/utssdk/test-uts')

describe('code', () => {
  test('genProxyCode', async () => {
    expect(
      await genProxyCode(pluginDir, {
        is_uni_modules: false,
        name: 'test-uts',
        namespace: 'uts.sdk.testUts',
      })
    ).toMatchSnapshot()
  })
})
