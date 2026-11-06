import fs from 'fs'
import path from 'path'
import jscc from 'rollup-plugin-jscc'
import { evaluateFramework } from './utils/frameworkTsx'

jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

describe('App 语言监听', () => {
  test.each([false, true])(
    '首次翻译、语言切换和作用域清理（Vapor=%s）',
    async (vapor) => {
      const vue = vapor
        ? jest.requireActual('../../uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
        : jest.requireActual('vue')
      const appScope = vue.effectScope()
      const childScope = vue.effectScope()
      const appVm: any = { $: { scope: appScope } }
      const legacyWatch = jest.fn((source, callback) =>
        appScope.run(() => vue.watch(source, callback))
      )
      if (!vapor) appVm.$watch = legacyWatch
      const i18n = evaluateFramework(
        // 使用真正的 uni-i18n 接入逻辑，getApp 指向本测试的 App。
        "import { getApp } from './testApp'\n" +
          fs.readFileSync(
            path.resolve(__dirname, '../../uni-i18n/src/vue-i18n.ts'),
            'utf8'
          ),
        {
          './I18n': jest.requireActual('../../uni-i18n/src/I18n'),
          './testApp': { getApp: () => appVm },
        }
      ).initVueI18n(
        'en',
        { en: { title: 'Hello' }, 'zh-Hans': { title: '你好' } },
        'en'
      )
      const plugin = jscc({ values: { _X_VAPOR_: +vapor } })
      const { code } = await (plugin.load as Function).call(
        {},
        path.resolve(__dirname, '../../uni-core/src/service/init/index.ts')
      )
      const { initAppVm } = evaluateFramework(code, {
        vue,
        '../../i18n': { useI18n: () => i18n },
        './on': {},
        './subscribe': {},
      })
      const setLocale = jest.spyOn(i18n.i18n, 'setLocale')
      const rendered: string[] = []
      try {
        appScope.run(() => initAppVm(appVm))
        expect(typeof appVm.$watchLocale).toBe(vapor ? 'function' : 'undefined')
        if (vapor) expect(appVm.$watch).toBeUndefined()
        // 初始化只提供入口，首次翻译前不创建语言监听。
        expect(setLocale).not.toHaveBeenCalled()
        childScope.run(() => {
          vue.watchEffect(() => rendered.push(i18n.t('title')))
        })
        expect(rendered).toEqual(['Hello'])
        expect(legacyWatch).toHaveBeenCalledTimes(vapor ? 0 : 1)
        appVm.$locale = 'zh-Hans'
        await vue.nextTick()
        expect(i18n.t('title')).toBe('你好')
        if (vapor) expect(rendered).toEqual(['Hello', '你好'])
        // 多次翻译不重复注册；同值写入不触发监听。
        i18n.t('title')
        appVm.$locale = 'zh-Hans'
        await vue.nextTick()
        expect(setLocale).toHaveBeenCalledTimes(1)
        childScope.stop()
        appVm.$locale = 'en'
        await vue.nextTick()
        expect(i18n.t('title')).toBe('Hello')
        expect(setLocale).toHaveBeenCalledTimes(2)
        appScope.stop()
        appVm.$locale = 'zh-Hans'
        await vue.nextTick()
        expect(setLocale).toHaveBeenCalledTimes(2)
      } finally {
        childScope.stop()
        appScope.stop()
      }
    }
  )
})
