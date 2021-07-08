import path from 'path'
import {
  md5,
  getMac,
  checkLocalCache,
  createPostData,
} from '../src/checkUpdate'
import { parseManifestJson } from '../src/json'
const vid = 'test'
const examplesDir = path.resolve(__dirname, 'examples')
const basePostData = {
  vv: 3,
  device: md5(getMac()),
}
describe('checkUpdate', () => {
  test('checkLocalCache without lastCheck', () => {
    expect(
      checkLocalCache(
        {
          vid,
          lastCheck: 0,
        },
        ''
      )
    ).toBe(false)
  })
  test('checkLocalCache > interval', () => {
    expect(
      checkLocalCache(
        {
          vid,
          lastCheck: 1,
        },
        ''
      )
    ).toBe(false)
  })
  test('checkLocalCache < interval', () => {
    expect(
      checkLocalCache(
        {
          vid,
          lastCheck: Date.now() - 10,
        },
        ''
      )
    ).toBe(true)
  })
  test('checkLocalCache with newVersion', () => {
    expect(
      checkLocalCache(
        {
          vid,
          lastCheck: Date.now() - 10,
          newVersion: '3.1.3',
          note: 'upgrade',
        },
        '3.1.1'
      )
    ).toBe('upgrade')
  })
  test('createPostData without appid', () => {
    const inputDir = path.resolve(examplesDir, 'without-appid')
    expect(
      createPostData(
        {
          inputDir,
          versionType: 'a',
          compilerVersion: '3.1.3',
        },
        parseManifestJson(inputDir),
        {
          vid,
          lastCheck: 0,
        }
      )
    ).toBe(
      JSON.stringify(
        Object.assign({}, basePostData, { vtype: 'a', vcode: '3.1.3', vid })
      )
    )
  })
  test('createPostData with appid', () => {
    const inputDir = path.resolve(examplesDir, 'with-appid')
    const manifestJson = parseManifestJson(inputDir)
    expect(
      createPostData(
        {
          inputDir,
          versionType: 'a',
          compilerVersion: '3.1.3',
        },
        manifestJson,
        {
          vid,
          lastCheck: 0,
        }
      )
    ).toBe(
      JSON.stringify(
        Object.assign({}, basePostData, {
          vtype: 'a',
          vcode: '3.1.3',
          appid: manifestJson.appid,
        })
      )
    )
  })
})
