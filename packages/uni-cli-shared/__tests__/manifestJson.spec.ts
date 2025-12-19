/// <reference types="../../shims-uni-app.d.ts" />

import { getNativeTags, normalizeAppManifestJson } from '../src/json'
import { initDefaultManifestJson } from '../src/json/app/manifest/defaultManifestJson'
import { initLaunchwebview } from '../src/json/app/manifest/launchwebview'
import { initRecursiveMerge } from '../src/json/app/manifest/merge'
import { parseUniXSplashScreen } from '../src/json/uni-x'

let basicMergedManifestJson
describe('manifest.json', () => {
  afterAll(() => {
    // 清理环境变量
    if (process?.env?.UNI_APP_PLATFORM) {
      delete (process.env as any).UNI_APP_PLATFORM
    }
    if (process?.env?.UNI_INPUT_DIR) {
      delete (process.env as any).UNI_INPUT_DIR
    }

    // fs mock
    jest.resetModules()
    jest.clearAllMocks()
  })

  test(`parse splashScreen`, () => {
    expect(
      parseUniXSplashScreen('app-android', {
        app: {
          splashScreen: {
            autoClose: 'onReady',
          },
        },
      })
    ).toEqual({
      autoClose: 'onReady',
    })
    expect(
      parseUniXSplashScreen('app-android', {
        'app-android': {
          splashScreen: {
            autoClose: 'onReady',
          },
        },
      })
    ).toEqual({
      autoClose: 'onReady',
    })
  })

  test('uni-app useragent initRecursiveMerge', () => {
    const manifestJson = {
      'app-harmony': {
        useragent: {
          value: 'testharmony',
          concatenate: true,
        },
      },
      'app-plus': {
        // arguments,
        useragent: {
          value: 'testplus',
          concatenate: true,
        },
      },
    }

    basicMergedManifestJson = initRecursiveMerge(
      initDefaultManifestJson(),
      manifestJson
    )

    expect(basicMergedManifestJson['app-harmony'].useragent).toEqual({
      concatenate: true,
      value: 'testharmony',
    })

    expect(basicMergedManifestJson.plus.useragent).toEqual({
      concatenate: true,
      value: 'testplus',
    })
  })

  test('uni-app useragent initLaunchwebview', () => {
    // initLaunchwebview
    const pagesJson: UniApp.PagesJson = {
      pages: [
        {
          path: 'pages/index/index',
          style: {
            navigationBar: {
              backgroundColor: '#000',
            },
          },
        },
      ],
      globalStyle: {
        navigationBar: {
          backgroundColor: '#000',
        },
      },
    }
    const res = initLaunchwebview(basicMergedManifestJson, pagesJson)
    expect(res).toBe('pages/index/index')
    expect(basicMergedManifestJson['app-harmony']).toEqual({
      useragent: {
        concatenate: true,
        value: 'uni-app testharmony',
      },
    })
    expect(basicMergedManifestJson.plus.useragent).toEqual({
      concatenate: true,
      value: 'uni-app testplus',
    })
  })

  test('normalizeAppManifestJson', () => {
    // 设置环境变量
    process.env.UNI_APP_PLATFORM = 'android'
    process.env.UNI_INPUT_DIR = 'test-input-dir'

    // mock fs.existsSync(dir)
    jest.mock('fs', () => ({
      existsSync: jest.fn((dir) => dir === 'test-input-dir'),
    }))

    const a = {
      'app-plus': {
        useragent: { value: 'app123', concatenate: true },
      },
      'app-harmony': {
        useragent: { concatenate: true, value: 'test11' },
      },
    }
    const pagesJson: UniApp.PagesJson = {
      pages: [
        {
          path: 'pages/index/index',
          style: {
            navigationBar: { titleText: 'Index', type: 'default' },
          },
        },
      ],
      globalStyle: {
        navigationBar: {
          backgroundColor: '#F8F8F8',
        },
      },
    }

    expect(
      normalizeAppManifestJson(a, pagesJson)['app-harmony'].useragent
    ).toEqual({
      concatenate: true,
      value: 'uni-app test11',
    })
    expect(normalizeAppManifestJson(a, pagesJson).plus.useragent).toEqual({
      concatenate: true,
      value: 'uni-app app123',
    })
  })

  test('getNativeTags', () => {
    expect(getNativeTags(undefined, 'mp-weixin')).toEqual([])
    expect(
      getNativeTags(
        'packages/uni-cli-shared/__tests__/examples/native-tags',
        undefined
      )
    ).toEqual([])
    expect(
      getNativeTags(
        'packages/uni-cli-shared/__tests__/examples/native-tags',
        'mp-weixin'
      )
    ).toEqual(['voip-room', 'root-portal'])
    expect(
      getNativeTags(
        'packages/uni-cli-shared/__tests__/examples/native-tags',
        'mp-alipay'
      )
    ).toEqual([])
    expect(
      getNativeTags(
        'packages/uni-cli-shared/__tests__/examples/native-tags',
        'mp-baidu'
      )
    ).toEqual([])
    expect(
      getNativeTags(
        'packages/uni-cli-shared/__tests__/examples/native-tags',
        'mp-toutiao'
      )
    ).toEqual([])
  })
})
