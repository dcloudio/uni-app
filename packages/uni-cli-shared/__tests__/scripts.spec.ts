import path from 'path'
import { parseScripts } from '../src/scripts'

describe('filter', () => {
  test(`basic`, () => {
    const pkgPath = path.resolve(
      __dirname,
      'examples/custom-scripts/package.json'
    )
    expect(parseScripts('H5-WEIXIN', pkgPath)).toEqual({
      name: 'H5-WEIXIN',
      platform: 'H5',
      define: {},
      context: { 'H5-BASE': true, 'H5-WEIXIN': true, 'H5-QQ': false },
    })
    expect(parseScripts('H5-QQ', pkgPath)).toEqual({
      name: 'H5-QQ',
      platform: 'H5',
      define: {},
      context: { 'H5-BASE': false, 'H5-QQ': true, 'H5-WEIXIN': false },
    })
  })
})
