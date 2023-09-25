import path from 'path'

import { parseUTSKotlinRuntimeStacktrace } from '../src/stacktrace/kotlin'

describe('uts:stacktrace:runtime', () => {
  test('parseUTSKotlinRuntimeStacktrace', async () => {
    const cacheDir = path.resolve(
      __dirname,
      'examples/uni-app-x/unpackage/cache/.kotlin'
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
          appid: '__UNI__XXXXXXX',
          cacheDir,
          logType: 'error',
        }
      )
    ).toMatchSnapshot()
  })
})
