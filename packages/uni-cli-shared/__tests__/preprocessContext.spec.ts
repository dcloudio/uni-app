import { initPreContext, preUVueHtml, preUVueJs } from '../src/preprocess'
import {
  getPreNVueContext,
  getPreUVueContext,
  getPreVueContext,
  initScopedPreContext,
} from '../src/preprocess/context'
import { createAppHarmonyUniModulesSyncFilePreprocessorOnce } from '../src/vite/plugins/uts/uni_modules'

describe('preprocess context', () => {
  const originalHarmonyScriptEngine =
    process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE
  const originalDom2 = process.env.UNI_APP_X_DOM2

  afterEach(() => {
    if (originalHarmonyScriptEngine === undefined) {
      delete process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE
    } else {
      process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE = originalHarmonyScriptEngine
    }
    if (originalDom2 === undefined) {
      delete process.env.UNI_APP_X_DOM2
    } else {
      process.env.UNI_APP_X_DOM2 = originalDom2
    }
  })

  test.each([
    ['jsvm', true, true],
    ['jsvm', false, false],
    ['arkts', true, false],
    [undefined, true, false],
  ] as const)(
    'sets APP-HARMONY-JSVM for Harmony script engine %s in Vapor %s to %s',
    (scriptEngine, isVapor, expected) => {
      if (scriptEngine === undefined) {
        delete process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE
      } else {
        process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE = scriptEngine
      }
      if (isVapor) {
        process.env.UNI_APP_X_DOM2 = 'true'
      } else {
        delete process.env.UNI_APP_X_DOM2
      }

      initPreContext('app-harmony', undefined, 'app-harmony', true)
      expect(getPreVueContext().APP_HARMONY_JSVM).toBe(false)
      expect(getPreNVueContext().APP_HARMONY_JSVM).toBe(false)
      expect(getPreUVueContext().APP).toBe(true)
      expect(getPreUVueContext().APP_HARMONY).toBe(true)
      expect(getPreUVueContext().APP_HARMONY_JSVM).toBe(expected)
    }
  )

  test('does not enable APP-HARMONY-JSVM outside uni-app x Harmony', () => {
    process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE = 'jsvm'
    process.env.UNI_APP_X_DOM2 = 'true'

    initPreContext('app', undefined, 'app-android', true)
    const appXAndroidContexts = [
      getPreVueContext(),
      getPreNVueContext(),
      getPreUVueContext(),
    ]

    appXAndroidContexts.forEach((context) => {
      expect(context.APP_HARMONY_JSVM).toBe(false)
    })

    initPreContext('app-harmony', undefined, 'app-harmony', false)
    const uniAppHarmonyContexts = [
      getPreVueContext(),
      getPreNVueContext(),
      getPreUVueContext(),
    ]

    uniAppHarmonyContexts.forEach((context) => {
      expect(context.APP_HARMONY).toBe(true)
      expect(context.APP_HARMONY_JSVM).toBe(false)
    })
  })

  test('keeps APP-HARMONY-JSVM false in scoped contexts', () => {
    process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE = 'jsvm'
    process.env.UNI_APP_X_DOM2 = 'true'

    const contexts = initScopedPreContext(
      'app-harmony',
      undefined,
      'app-harmony',
      true
    )

    Object.values(contexts).forEach((context) => {
      expect(context.APP_HARMONY_JSVM).toBe(false)
    })
  })

  test('keeps APP-HARMONY-JSVM false in uni_modules files', async () => {
    process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE = 'jsvm'
    process.env.UNI_APP_X_DOM2 = 'true'
    const preprocessor =
      createAppHarmonyUniModulesSyncFilePreprocessorOnce(true)

    const code = await preprocessor(
      `// #ifdef APP-HARMONY-JSVM
const isHarmonyJsvm = true
// #endif
// #ifndef APP-HARMONY-JSVM
const isHarmonyJsvm = false
// #endif`,
      '/project/uni_modules/test/utssdk/index.uts'
    )

    expect(code).not.toContain('const isHarmonyJsvm = true')
    expect(code).toContain('const isHarmonyJsvm = false')
  })

  test.each([
    ['jsvm', 'jsvm'],
    ['arkts', 'arkts'],
  ] as const)(
    'preprocesses APP-HARMONY-JSVM branches for the %s engine',
    (scriptEngine, expected) => {
      process.env.UNI_APP_X_HARMONY_SCRIPT_ENGINE = scriptEngine
      process.env.UNI_APP_X_DOM2 = 'true'
      initPreContext('app-harmony', undefined, 'app-harmony', true)

      const jsCode = preUVueJs(
        `// #ifdef APP-HARMONY-JSVM
const engine = 'jsvm'
// #endif
// #ifndef APP-HARMONY-JSVM
const engine = 'arkts'
// #endif`,
        'index.uvue'
      )
      const htmlCode = preUVueHtml(
        `<!-- #ifdef APP-HARMONY-JSVM -->
<text>jsvm</text>
<!-- #endif -->
<!-- #ifndef APP-HARMONY-JSVM -->
<text>arkts</text>
<!-- #endif -->`,
        'index.uvue'
      )

      expect(jsCode).toContain(`const engine = '${expected}'`)
      expect(jsCode).not.toContain(
        `const engine = '${expected === 'jsvm' ? 'arkts' : 'jsvm'}'`
      )
      expect(htmlCode).toContain(`<text>${expected}</text>`)
      expect(htmlCode).not.toContain(
        `<text>${expected === 'jsvm' ? 'arkts' : 'jsvm'}</text>`
      )
    }
  )
})
