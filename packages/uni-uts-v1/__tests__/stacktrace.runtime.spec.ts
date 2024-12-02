import fs from 'fs-extra'
import path from 'path'

import { parseRuntimeStacktrace } from '../src/stacktrace'

describe('uts:stacktrace:runtime', () => {
  // 添加 beforeAll 来设置 HTTP mock
  beforeAll(() => {
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
        text: () => {
          if (url.includes('appservice/pages/index/index.js')) {
            return fs.readFileSync(
              path.resolve(__dirname, 'data/mp-weixin.js'),
              'utf8'
            )
          } else if (url.includes('output/pages/index/index.js')) {
            return fs.readFileSync(
              path.resolve(__dirname, 'data/mp-baidu.js.map'),
              'utf8'
            )
          } else if (url.includes('index.worker.js.map')) {
            return fs.readFileSync(
              path.resolve(__dirname, 'data/mp-alipay.js.map'),
              'utf8'
            )
          } else if (url.includes('index.worker.js')) {
            return `//# sourceMappingURL=http://localhost:6600/sourcemaps/index.worker.js.map`
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
at Proxy.throwError  (http://127.0.0.1:54378/index.worker.js:196:13)`,
        {
          outputDir,
          platform: 'mp-alipay',
          language: 'javascript',
          cacheDir: '',
        }
      )
    ).toMatchSnapshot()
  })
})
