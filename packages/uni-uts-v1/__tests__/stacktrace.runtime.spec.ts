import path from 'path'

import { parseRuntimeStacktrace } from '../src/stacktrace'

describe('uts:stacktrace:runtime', () => {
  test('parseUTSKotlinRuntimeStacktrace', async () => {
    const cacheDir = path.resolve(
      __dirname,
      'examples/uni-app-x/output/cache/app-android'
    )
    expect(
      parseRuntimeStacktrace(
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
      parseRuntimeStacktrace(
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
      parseRuntimeStacktrace(
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
      parseRuntimeStacktrace(
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
      parseRuntimeStacktrace(
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
      parseRuntimeStacktrace(
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
      parseRuntimeStacktrace(
        `app-service.js(5:60) ReferenceError:Can't find variable: a @app-service.js:5:60`,
        {
          platform: 'app-ios',
          language: 'javascript',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      parseRuntimeStacktrace(
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
      parseRuntimeStacktrace(
        `Error: click2
at Proxy.click2 (http://127.0.0.1:22515/appservice/pages/index/index.js:23:13)
at http://127.0.0.1:22515/appservice/pages/index/index.js:36:49
at callWithErrorHandling (http://127.0.0.1:22515/appservice/common/vendor.js:2135:22)
at callWithAsyncErrorHandling (http://127.0.0.1:22515/appservice/common/vendor.js:2142:15)
at Function.invoke (http://127.0.0.1:22515/appservice/common/vendor.js:5498:14)
at f (http://127.0.0.1:22515/appservice/__dev__/WASubContext.js?t=wechat&s=1732624710099&v=3.6.6:1:147076)
at http://127.0.0.1:22515/appservice/__dev__/WASubContext.js?t=wechat&s=1732624710099&v=3.6.6:1:147519`,
        {
          outputDir,
          platform: 'mp-weixin',
          language: 'javascript',
          cacheDir: '',
        }
      )
    ).toMatchSnapshot()
    expect(
      parseRuntimeStacktrace(
        `MiniProgramError
bbbbbbbbbbb12
Error: bbbbbbbbbbb12
at http://127.0.0.1:37922/appservice/pages/index/index.js:23:13
at http://127.0.0.1:37922/appservice/__dev__/WASubContext.js?t=wechat&s=1732621970683&v=3.6.1:1:512000
at p.runWith (http://127.0.0.1:37922/appservice/__dev__/WASubContext.js?t=wechat&s=1732621970683&v=3.6.1:1:501622)
at q (http://127.0.0.1:37922/appservice/__dev__/WASubContext.js?t=wechat&s=1732621970683&v=3.6.1:1:511978)
at ide:///package/__APP__/appservice.js:1111:7
at t.doWhenAllScriptLoaded (ide:///getmainpackage.js:1174:21)`,
        {
          outputDir,
          platform: 'mp-weixin',
          language: 'javascript',
          cacheDir: '',
        }
      )
    ).toMatchSnapshot()
  })
})
