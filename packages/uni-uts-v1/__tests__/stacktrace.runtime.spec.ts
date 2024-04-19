import path from 'path'

import { parseUTSKotlinRuntimeStacktrace } from '../src/stacktrace/kotlin'
import { parseUTSJavaScriptRuntimeStacktrace } from '../src/stacktrace/js'

describe('uts:stacktrace:runtime', () => {
  test('parseUTSKotlinRuntimeStacktrace', async () => {
    const cacheDir = path.resolve(
      __dirname,
      'examples/uni-app-x/unpackage/cache/app-android'
    )
    expect(
      parseUTSKotlinRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.GenPagesIndexIndex$1.invoke(index.kt:24)
at java.lang.reflect.Method.invoke(Native Method)
at io.dcloud.uniapp.vue.shared.IndexKt$callFunction$invoke$1.invoke(index.kt:627)
at io.dcloud.uniapp.vue.shared.IndexKt.callFunction(index.kt:638)`,
        {
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      parseUTSKotlinRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.GenPagesIndexIndex$click$1.invoke(index.kt:59)
at java.lang.reflect.Method.invoke(Native Method)
at io.dcloud.uniapp.vue.shared.IndexKt$callFunction$invoke$1.invoke(index.kt:627)
at io.dcloud.uniapp.vue.shared.IndexKt.callFunction(index.kt:638)`,
        {
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      parseUTSKotlinRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.IndexKt.test(index.kt:40)
at uni.UNIXXXXXXX.GenPagesIndexIndex$click1$1.invoke(index.kt:63)
at java.lang.reflect.Method.invoke(Native Method)
at io.dcloud.uniapp.vue.shared.IndexKt$callFunction$invoke$1.invoke(index.kt:627)
at io.dcloud.uniapp.vue.shared.IndexKt.callFunction(index.kt:638)`,
        {
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      parseUTSKotlinRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.IndexKt.test(index.kt:40)`,
        {
          language: 'kotlin',
          appid: '__UNI__XXXXXXX',
          cacheDir,
          logType: 'warn',
        }
      )
    ).toMatchSnapshot()
    expect(
      parseUTSKotlinRuntimeStacktrace(
        `java.lang.IndexOutOfBoundsException: Index: 1, Size: 1
at java.util.ArrayList.get(ArrayList.java:437)
at uni.UNIXXXXXXX.IndexKt.test(index.kt:40)`,
        {
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
      'examples/uni-app-x/unpackage/cache/app-ios'
    )
    expect(
      parseUTSJavaScriptRuntimeStacktrace(
        `app-service.js(5:60) ReferenceError:Can't find variable: a @app-service.js:5:60`,
        {
          language: 'javascript',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
    expect(
      parseUTSJavaScriptRuntimeStacktrace(
        `at <Index __pageId=1 __pagePath="pages/index/index" __pageQuery=  ... >
Can't find variable: a
onLoad@app-service.js:9:64
callWithErrorHandling@uni-app-x-framework.js:2279:23
callWithAsyncErrorHandling@uni-app-x-framework.js:2286:38
@uni-app-x-framework.js:4763:45`,
        {
          language: 'javascript',
          cacheDir,
        }
      )
    ).toMatchSnapshot()
  })
})
