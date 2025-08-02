import path from 'path'
import {
  hbuilderKotlinCompileErrorFormatter,
  resolveUTSKotlinFilenameByClassName,
  trimKotlinErrorMessage,
} from '../src/stacktrace/kotlin'
import { SPECIAL_CHARS } from '../src/utils'

describe('uts:kotlin', () => {
  test('resolveUTSKotlinFileByClassName', () => {
    const cacheDir = path.resolve(
      __dirname,
      'examples/uni-app-x/output/cache/app-android'
    )
    expect(
      resolveUTSKotlinFilenameByClassName('GenPagesIndexIndex', { cacheDir })
    ).toBe('pages/index/index.kt')
    expect(
      resolveUTSKotlinFilenameByClassName('Demo', {
        cacheDir,
      })
    ).toBe('index.kt')
  })
  test('formatKotlinError', () => {
    expect(
      hbuilderKotlinCompileErrorFormatter({
        type: 'error',
        message:
          'Type mismatch: inferred type is () -> Unit but () -> String was expected',
      })
    ).toBe(
      '\u200C' +
        SPECIAL_CHARS.ERROR_BLOCK +
        'error: 类型不匹配: 推断类型是() -> Unit \x1b[90m/* = void */\x1b[39m，但预期的是() -> String。\u200C'
    )
    expect(
      hbuilderKotlinCompileErrorFormatter({
        type: 'error',
        message:
          'java.lang.ClassCastException: io.dcloud.uniapp.vue.UTSReactiveJSONObject cannot be cast to uni.UNIXXXXXXX.A‌',
      })
    ).toBe(
      '\u200C' +
        SPECIAL_CHARS.ERROR_BLOCK +
        'error: java.lang.ClassCastException: UTSJSONObject cannot be cast to uni.UNIXXXXXXX.A‌\u200C'
    )
    expect(
      hbuilderKotlinCompileErrorFormatter({
        type: 'error',
        message:
          'java.lang.ClassCastException: UTSReactiveSet cannot be cast to uni.UNIXXXXXXX.A‌',
      })
    ).toBe(
      '\u200C' +
        SPECIAL_CHARS.ERROR_BLOCK +
        'error: java.lang.ClassCastException: Set cannot be cast to uni.UNIXXXXXXX.A‌\u200C'
    )
    expect(
      hbuilderKotlinCompileErrorFormatter({
        type: 'error',
        message:
          'java.lang.ClassCastException: UTSReactiveMap cannot be cast to uni.UNIXXXXXXX.A‌',
      })
    ).toBe(
      '\u200C' +
        SPECIAL_CHARS.ERROR_BLOCK +
        'error: java.lang.ClassCastException: Map cannot be cast to uni.UNIXXXXXXX.A‌\u200C'
    )
    expect(
      hbuilderKotlinCompileErrorFormatter({
        type: 'error',
        message:
          'java.lang.ClassCastException: UTSReactiveArray cannot be cast to uni.UNIXXXXXXX.A‌',
      })
    ).toBe(
      '\u200C' +
        SPECIAL_CHARS.ERROR_BLOCK +
        'error: java.lang.ClassCastException: Array cannot be cast to uni.UNIXXXXXXX.A‌\u200C'
    )
  })
  test('packageFormatter', () => {
    // 'io.dcloud.uts.*',
    // 'io.dcloud.uniapp.framework.*',
    // 'io.dcloud.uniapp.vue.*',
    // 'io.dcloud.uniapp.vue.shared.*',
    // 'io.dcloud.uniapp.runtime.*',
    expect(trimKotlinErrorMessage('io.dcloud.uts.UTSArray')).toBe('UTSArray')
    expect(trimKotlinErrorMessage('io.dcloud.uniapp.framework.UniConfig')).toBe(
      'UniConfig'
    )
    expect(
      trimKotlinErrorMessage('io.dcloud.uniapp.vue.UTSReactiveJSONObject')
    ).toBe('UTSReactiveJSONObject')
    expect(trimKotlinErrorMessage('io.dcloud.uniapp.vue.shared.isTrue')).toBe(
      'isTrue'
    )
    expect(trimKotlinErrorMessage('io.dcloud.uniapp.runtime.UniEvent')).toBe(
      'UniEvent'
    )
    expect(
      trimKotlinErrorMessage(
        `Type mismatch: inferred type is A__1 but A was expected`
      )
    ).toBe(`Type mismatch: inferred type is A__1 but A was expected`)
    expect(
      trimKotlinErrorMessage(
        `Type mismatch: inferred type is A__1 but B was expected`
      )
    ).toBe(`Type mismatch: inferred type is A but B was expected`)
  })
})
