import fs from 'fs-extra'
import path from 'path'

import { parseRuntimeStacktrace } from '../src/stacktrace'
import { normalizePath } from '../src/shared'

describe('uts:stacktrace:runtime', () => {
  // 添加 beforeAll 来设置 HTTP mock
  beforeAll(() => {
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
        text: () => {
          // mp-weixin
          if (url.includes('appservice/pages/index/index.js')) {
            return fs.readFileSync(
              path.resolve(__dirname, 'data/mp-weixin.js'),
              'utf8'
            )
            // mp-baidu
          } else if (url.includes('output/pages/index/index.js.map')) {
            return fs.readFileSync(
              path.resolve(__dirname, 'data/mp-baidu.js.map'),
              'utf8'
            )
            // mp-alipay
          } else if (url.includes('index.worker.js.map')) {
            const dir = normalizePath(
              path.resolve(
                __dirname,
                'examples/uni-app-x/output/dist/dev/.sourcemap/mp-alipay'
              )
            )
            return fs
              .readFileSync(
                path.resolve(__dirname, 'data/mp-alipay.js.map'),
                'utf8'
              )
              .replaceAll('{OUTPUT_ROOT}', dir)
            // mp-alipay
          } else if (url.includes('index.worker.js')) {
            return `//# sourceMappingURL=http://localhost:6600/sourcemaps/index.worker.js.map`
            // mp-toutiao
          } else if (url.includes('app-dist/pages/index/index.js')) {
            return fs.readFileSync(
              path.resolve(__dirname, 'data/mp-toutiao.js'),
              'utf8'
            )
          }
        },
      })
    ) as jest.Mock
  })

  // 每个测试后清理 mock
  afterEach(() => {
    jest.clearAllMocks()
  })

  // 所有测试完成后恢复原始 fetch
  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('parseUTSKotlinRuntimeStacktrace', async () => {
    const cacheDir = path.resolve(
      __dirname,
      'examples/uni-app-x/output/cache/app-android'
    )
    expect(
      await parseRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.GenPagesIndexIndex$1.invoke(index.kt:24)
at java.lang.reflect.Method.invoke(Native Method)
at io.dcloud.uniapp.vue.shared.IndexKt$callFunction$invoke$1.invoke(index.kt:627)
at io.dcloud.uniapp.vue.shared.IndexKt.callFunction(index.kt:638)`,
        {
          platform: 'app-android',
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.GenPagesIndexIndex$click$1.invoke(index.kt:59)
at java.lang.reflect.Method.invoke(Native Method)
at io.dcloud.uniapp.vue.shared.IndexKt$callFunction$invoke$1.invoke(index.kt:627)
at io.dcloud.uniapp.vue.shared.IndexKt.callFunction(index.kt:638)`,
        {
          platform: 'app-android',
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.IndexKt.test(index.kt:40)
at uni.UNIXXXXXXX.GenPagesIndexIndex$click1$1.invoke(index.kt:63)
at java.lang.reflect.Method.invoke(Native Method)
at io.dcloud.uniapp.vue.shared.IndexKt$callFunction$invoke$1.invoke(index.kt:627)
at io.dcloud.uniapp.vue.shared.IndexKt.callFunction(index.kt:638)`,
        {
          platform: 'app-android',
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.IndexKt.test(index.kt:40)`,
        {
          platform: 'app-android',
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
          logType: 'warn',
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.IndexKt.test(index.kt:40)`,
        {
          platform: 'app-android',
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
          logType: 'error',
        }
      )
    ).toMatchSnapshot()

    expect(
      await parseRuntimeStacktrace(
        `java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Boolean
at uni.UNIXXXXXXX.GenComponentsTestBooleanTestBoolean.getDisabled1(test-boolean.kt:68)
at uni.UNIXXXXXXX.GenComponentsTestBooleanTestBoolean$1.invoke(test-boolean.kt:21)
at java.lang.reflect.Method.invoke(Native Method)
at io.dcloud.uniapp.vue.shared.IndexKt$callFunction$invoke$1.invoke(index.kt:708)`,
        {
          platform: 'app-android',
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
          logType: 'error',
        }
      )
    ).toMatchSnapshot()
  })
  test('parseUTSJavaScriptRuntimeStacktrace', async () => {
    const cacheDir = path.resolve(
      __dirname,
      'examples/uni-app-x/output/cache/app-ios'
    )
    expect(
      await parseRuntimeStacktrace(
        `app-service.js(5:60) ReferenceError:Can't find variable: a @app-service.js:5:60`,
        {
          platform: 'app-ios',
          language: 'javascript',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      await parseRuntimeStacktrace(
        `at <Index __pageId=1 __pagePath="pages/index/index" __pageQuery=  ... >
Can't find variable: a
onLoad@app-service.js:9:64
callWithErrorHandling@uni-app-x-framework.js:2279:23
callWithAsyncErrorHandling@uni-app-x-framework.js:2286:38
@uni-app-x-framework.js:4763:45`,
        {
          platform: 'app-ios',
          language: 'javascript',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
  })

  test('parseWeixinRuntimeStacktrace', async () => {
    const outputDir = path.resolve(
      __dirname,
      'examples/uni-app-x/output/dist/dev/mp-weixin'
    )
    expect(
      await parseRuntimeStacktrace(
        `Error: bbbbbbbbbbb12
at Proxy.throwError (http://127.0.0.1:36394/appservice/pages/index/index.js:10:13)`,
        {
          outputDir,
          platform: 'mp-weixin',
          language: 'javascript',
          cacheDir: '',
        }
      )
    ).toMatchSnapshot()
  })

  test('parseBaiduRuntimeStacktrace', async () => {
    const outputDir = path.resolve(
      __dirname,
      'examples/uni-app-x/output/dist/dev/mp-baidu'
    )
    expect(
      await parseRuntimeStacktrace(
        `Error: bbbbbbbbbbb12
at Proxy.throwError (http://127.0.0.1:36394/output/pages/index/index.js:11:13)`,
        {
          outputDir,
          platform: 'mp-baidu',
          language: 'javascript',
          cacheDir: '',
        }
      )
    ).toMatchSnapshot()
  })

  test('parseAlipayRuntimeStacktrace', async () => {
    const outputDir = path.resolve(
      __dirname,
      'examples/uni-app-x/output/dist/dev/mp-alipay'
    )
    expect(
      await parseRuntimeStacktrace(
        `Error: bbbbbbbbbbb12
at Proxy.throwError  (http://127.0.0.1:54378/index.worker.js?hash=66189eae:196:13)`,
        {
          outputDir,
          platform: 'mp-alipay',
          language: 'javascript',
          cacheDir: '',
        }
      )
    ).toMatchSnapshot()
  })

  test('parseToutiaoRuntimeStacktrace', async () => {
    const outputDir = path.resolve(
      __dirname,
      'examples/uni-app-x/output/dist/dev/mp-toutiao'
    )
    expect(
      await parseRuntimeStacktrace(
        `Error: bbbbbbbbbbb12
at Proxy.throwError (pages/index/index.js:26:19)
at pages/index/index.js:32:71
at callWithErrorHandling (common/vendor.js:1561:23)
at callWithAsyncErrorHandling (common/vendor.js:1568:19)
at invoke (common/vendor.js:4589:26)
at http://127.0.0.1:7046/core/3.46.0.17/tma-core.js:2:191115
at Ct (http://127.0.0.1:7046/core/3.46.0.17/tma-core.js:2:9631)
at t (http://127.0.0.1:7046/core/3.46.0.17/tma-core.js:2:15565)`,
        {
          outputDir,
          platform: 'mp-toutiao',
          language: 'javascript',
          cacheDir: '',
        }
      )
    ).toMatchSnapshot()
  })
})
