import {
  __resetCache,
  getPackageInfo,
} from '../../../src/public/adapter/package'
import { uniPlatformMpAliRaw } from '../../../src/public/adapter/platform'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

type AnyObj = Record<string, unknown>

function setGlobal(name: string, value: unknown): void {
  ;(globalThis as AnyObj)[name] = value
}

function clearGlobal(name: string): void {
  delete (globalThis as AnyObj)[name]
}

describe('adapter/package', () => {
  let originalAppName: string | undefined
  let originalVapor: string | undefined

  beforeEach(() => {
    __resetCache()
    originalAppName = (process.env as Record<string, string | undefined>)
      .UNI_APP_NAME
    originalVapor = (process.env as Record<string, string | undefined>)
      .UNI_STAT_VAPOR
    delete (process.env as Record<string, string | undefined>).UNI_STAT_VAPOR
  })

  afterEach(() => {
    __resetCache()
    restoreMockUni()
    clearGlobal('plus')
    clearGlobal('my')
    clearGlobal('tt')
    clearGlobal('swan')
    clearGlobal('document')
    if (originalAppName === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_APP_NAME
    } else {
      ;(process.env as Record<string, string | undefined>).UNI_APP_NAME =
        originalAppName
    }
    if (originalVapor === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_STAT_VAPOR
    } else {
      ;(process.env as Record<string, string | undefined>).UNI_STAT_VAPOR =
        originalVapor
    }
  })

  describe('小程序端：mpn / tdaid / pkn / an', () => {
    test('mp-weixin：tdaid = getAccountInfoSync；mpn 与 tdaid 对齐；pkn 为空', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          canIUse: (k: string) => k === 'getAccountInfoSync',
          getAccountInfoSync: () => ({ miniProgram: { appId: 'wx1234' } }),
        },
      })
      ;(process.env as Record<string, string | undefined>).UNI_APP_NAME =
        'MyApp'
      expect(getPackageInfo()).toEqual({
        mpn: 'wx1234',
        tdaid: 'wx1234',
        pkn: '',
        an: 'MyApp',
      })
    })

    test('mp-weixin：不再依赖 canIUse；存在 getAccountInfoSync 即可取 tdaid', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          canIUse: () => false,
          getAccountInfoSync: () => ({ miniProgram: { appId: 'wx1234' } }),
        },
      })
      ;(process.env as Record<string, string | undefined>).UNI_APP_NAME = 'X'
      expect(getPackageInfo()).toEqual({
        mpn: 'wx1234',
        tdaid: 'wx1234',
        pkn: '',
        an: 'X',
      })
    })

    test('mp-qq：与 wx 一致路径', () => {
      installMockUni({
        platform: 'mp-qq',
        patch: {
          canIUse: () => true,
          getAccountInfoSync: () => ({ miniProgram: { appId: 'qq-app' } }),
        },
      })
      expect(getPackageInfo().tdaid).toBe('qq-app')
    })

    test('阿里小程序：优先 my.getAppIdSync', () => {
      installMockUni({ platform: uniPlatformMpAliRaw() })
      setGlobal('my', {
        getAppIdSync: () => 'ali-1',
        getAccountInfoSync: () => ({ miniProgram: { appId: 'ali-2' } }),
      })
      expect(getPackageInfo().tdaid).toBe('ali-1')
    })

    test('阿里小程序：getAppIdSync 抛错 → 退到 getAccountInfoSync', () => {
      installMockUni({ platform: uniPlatformMpAliRaw() })
      setGlobal('my', {
        getAppIdSync: () => {
          throw new Error('not supported')
        },
        getAccountInfoSync: () => ({ miniProgram: { appId: 'ali-2' } }),
      })
      expect(getPackageInfo().tdaid).toBe('ali-2')
    })

    test('mp-toutiao：tt.getEnvInfoSync().microapp.appId', () => {
      installMockUni({ platform: 'mp-toutiao' })
      setGlobal('tt', {
        getEnvInfoSync: () => ({ microapp: { appId: 'tt-app' } }),
      })
      expect(getPackageInfo().tdaid).toBe('tt-app')
    })

    test('mp-baidu：swan.getEnvInfoSync().common.appKey', () => {
      installMockUni({ platform: 'mp-baidu' })
      setGlobal('swan', {
        getEnvInfoSync: () => ({ common: { appKey: 'bd-app' } }),
      })
      expect(getPackageInfo().tdaid).toBe('bd-app')
    })

    test('小程序：tdaid 抛错也不影响其他字段', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          canIUse: () => true,
          getAccountInfoSync: () => {
            throw new Error('boom')
          },
        },
      })
      ;(process.env as Record<string, string | undefined>).UNI_APP_NAME = 'X'
      expect(getPackageInfo()).toEqual({
        mpn: '',
        tdaid: '',
        pkn: '',
        an: 'X',
      })
    })
  })

  describe('App 端：tdaid / pkn / an', () => {
    test('Android：pkn = packageName, tdaid = plus.runtime.appid, an = appname', () => {
      installMockUni({ platform: 'app-plus' })
      setGlobal('plus', {
        os: { name: 'Android' },
        runtime: { appid: '__UNI__APP1', appname: 'DemoApp' },
        android: {
          runtimeMainActivity: () => ({ getPackageName: () => 'com.demo.app' }),
        },
      })
      expect(getPackageInfo()).toEqual({
        mpn: 'com.demo.app',
        tdaid: '__UNI__APP1',
        pkn: 'com.demo.app',
        an: 'DemoApp',
      })
    })

    test('无 plus 时回退 getAppBaseInfo（uni-app x / Harmony）', () => {
      installMockUni({
        platform: 'app',
        patch: {
          getAppBaseInfo: () => ({
            appId: '__UNI__VAPOR',
            appName: 'Vapor App',
            hostPackageName: 'io.dcloud.uniappx',
          }),
        },
      })
      expect(getPackageInfo()).toEqual({
        mpn: 'io.dcloud.uniappx',
        tdaid: '__UNI__VAPOR',
        pkn: 'io.dcloud.uniappx',
        an: 'Vapor App',
      })
    })

    test('Vapor：pkn/mpn 读取 packageName，且不访问 plus', () => {
      ;(process.env as Record<string, string | undefined>).UNI_STAT_VAPOR =
        'true'
      installMockUni({
        platform: 'app',
        patch: {
          getAppBaseInfo: () => ({
            appId: '__UNI__VAPOR',
            appName: 'Vapor App',
            packageName: 'io.dcloud.uniappx',
          }),
        },
      })
      Object.defineProperty(globalThis, 'plus', {
        get() {
          throw new Error('Vapor must not access plus')
        },
        configurable: true,
      })

      expect(getPackageInfo()).toEqual({
        mpn: 'io.dcloud.uniappx',
        tdaid: '__UNI__VAPOR',
        pkn: 'io.dcloud.uniappx',
        an: 'Vapor App',
      })
    })

    test('iOS：pkn = bundleId', () => {
      installMockUni({ platform: 'app-plus' })
      setGlobal('plus', {
        os: { name: 'iOS' },
        runtime: { appid: '__UNI__APP1', name: 'DemoApp' },
        ios: { bundleId: 'com.demo.bundle' },
      })
      expect(getPackageInfo()).toEqual({
        mpn: 'com.demo.bundle',
        tdaid: '__UNI__APP1',
        pkn: 'com.demo.bundle',
        an: 'DemoApp',
      })
    })

    test('iOS：bundleId 缺失 → 退到 runtime.appid', () => {
      installMockUni({ platform: 'app-plus' })
      setGlobal('plus', {
        os: { name: 'iPhone OS' },
        runtime: { appid: '__UNI__APP1' },
        ios: {},
      })
      expect(getPackageInfo().pkn).toBe('__UNI__APP1')
      expect(getPackageInfo().mpn).toBe('__UNI__APP1')
    })

    test('Android：getPackageName 抛错 → pkn 退到 tdaid', () => {
      installMockUni({ platform: 'app-plus' })
      setGlobal('plus', {
        os: { name: 'Android' },
        runtime: { appid: '__UNI__APP1' },
        android: {
          runtimeMainActivity: () => ({
            getPackageName: () => {
              throw new Error('plus boom')
            },
          }),
        },
      })
      expect(getPackageInfo().pkn).toBe('__UNI__APP1')
      expect(getPackageInfo().mpn).toBe('__UNI__APP1')
    })

    test('App-Harmony：暂时取 runtime.appid', () => {
      installMockUni({ platform: 'app-harmony' })
      setGlobal('plus', {
        os: { name: 'HarmonyOS' },
        runtime: { appid: '__UNI__HMOS' },
      })
      expect(getPackageInfo().pkn).toBe('__UNI__HMOS')
      expect(getPackageInfo().mpn).toBe('__UNI__HMOS')
    })

    test('App：appname 缺失 → 走 env UNI_APP_NAME', () => {
      installMockUni({ platform: 'app-plus' })
      setGlobal('plus', {
        os: { name: 'Android' },
        runtime: { appid: '__UNI__APP1' },
        android: {
          runtimeMainActivity: () => ({ getPackageName: () => 'com.demo.app' }),
        },
      })
      ;(process.env as Record<string, string | undefined>).UNI_APP_NAME =
        'EnvApp'
      expect(getPackageInfo().an).toBe('EnvApp')
    })
  })

  describe('H5 端', () => {
    test('UNI_APP_NAME 优先于 document.title', () => {
      installMockUni({ platform: 'h5' })
      setGlobal('document', { title: 'browser-tab' })
      ;(process.env as Record<string, string | undefined>).UNI_APP_NAME =
        'EnvApp'
      expect(getPackageInfo()).toEqual({
        mpn: '',
        tdaid: '',
        pkn: '',
        an: 'EnvApp',
      })
    })

    test('UNI_APP_NAME 缺失 → 退到 document.title', () => {
      installMockUni({ platform: 'h5' })
      setGlobal('document', { title: 'browser-tab' })
      delete (process.env as Record<string, string | undefined>).UNI_APP_NAME
      expect(getPackageInfo().an).toBe('browser-tab')
    })

    test('document 缺失 → an=""', () => {
      installMockUni({ platform: 'h5' })
      delete (process.env as Record<string, string | undefined>).UNI_APP_NAME
      expect(getPackageInfo().an).toBe('')
    })
  })

  describe('其他', () => {
    test('未知平台 → 全空，但 env name 仍透出', () => {
      installMockUni({ platform: 'mp-future-vendor' })
      ;(process.env as Record<string, string | undefined>).UNI_APP_NAME = 'X'
      expect(getPackageInfo()).toEqual({
        mpn: '',
        tdaid: '',
        pkn: '',
        an: 'X',
      })
    })

    test('多次调用走缓存', () => {
      installMockUni({
        platform: 'mp-weixin',
        patch: {
          canIUse: () => true,
          getAccountInfoSync: jest.fn(() => ({
            miniProgram: { appId: 'wx1' },
          })),
        },
      })
      const spy = (globalThis as { uni?: { getAccountInfoSync?: jest.Mock } })
        .uni!.getAccountInfoSync as jest.Mock
      getPackageInfo()
      getPackageInfo()
      getPackageInfo()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
