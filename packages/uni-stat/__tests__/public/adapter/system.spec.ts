import {
  __resetCache,
  getLocaleAndScreen,
  getSystemInfo,
} from '../../../src/public/adapter/system'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

type SysInfoFn = () => unknown

function installWithSys(getSystemInfoSync: SysInfoFn, platform = 'mp-weixin') {
  return installMockUni({
    platform,
    patch: { getSystemInfoSync },
  })
}

describe('adapter/system', () => {
  afterEach(() => {
    __resetCache()
    restoreMockUni()
    delete (globalThis as { plus?: unknown }).plus
  })

  describe('getSystemInfo（静态字段，懒加载 + 缓存）', () => {
    test('uni 缺失返回安全空对象，不抛', () => {
      delete (globalThis as { uni?: unknown }).uni
      expect(getSystemInfo()).toEqual({
        brand: '',
        md: '',
        sv: '',
        v: '',
        ut: 'unknown',
        appVersion: '',
        appWgtVersion: '',
        mpvHostVersion: '',
        sdkVersion: '',
        statusBarHeight: 0,
        osP: '',
      })
    })

    test('getSystemInfoSync 抛错 → 返回空对象（tryRun 兜底）', () => {
      installWithSys(() => {
        throw new Error('boom')
      })
      expect(getSystemInfo().brand).toBe('')
    })

    test('正确读取 uni-app 4.x 新字段', () => {
      installWithSys(() => ({
        brand: 'Apple',
        deviceModel: 'iPhone 15',
        osVersion: '17.4',
        version: '8.0.50',
        deviceType: 'phone',
        platform: 'ios',
        SDKVersion: '3.4.2',
        statusBarHeight: 44,
      }))
      expect(getSystemInfo()).toMatchObject({
        brand: 'Apple',
        md: 'iPhone 15',
        sv: '17.4',
        v: '8.0.50',
        ut: 'phone',
        sdkVersion: '3.4.2',
        statusBarHeight: 44,
        osP: 'ios',
        mpvHostVersion: '8.0.50',
      })
    })

    test('退化老字段：model/system → md/sv', () => {
      installWithSys(() => ({
        brand: 'HUAWEI',
        model: 'Mate60',
        system: 'Android 14',
      }))
      const info = getSystemInfo()
      expect(info.md).toBe('Mate60')
      expect(info.sv).toBe('Android 14')
      expect(info.osP).toBe('android')
    })

    test('plus.runtime.version 优先于 sys.appVersion', () => {
      installWithSys(() => ({ appVersion: '1.0.0' }), 'app-plus')
      ;(globalThis as { plus?: unknown }).plus = {
        runtime: { version: '2.5.7', appWgtVersion: '2.5.8' },
      }
      const info = getSystemInfo()
      expect(info.appVersion).toBe('2.5.7')
      expect(info.appWgtVersion).toBe('2.5.8')
    })

    test('多次调用走缓存（getSystemInfoSync 只调一次）', () => {
      const spy = jest.fn(() => ({ brand: 'X', model: 'Y' }))
      installWithSys(spy)
      getSystemInfo()
      getSystemInfo()
      getSystemInfo()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test('__resetCache 后重新读取', () => {
      const spy = jest.fn(() => ({ brand: 'X' }))
      installWithSys(spy)
      getSystemInfo()
      __resetCache()
      getSystemInfo()
      expect(spy).toHaveBeenCalledTimes(2)
    })
  })

  describe('getLocaleAndScreen（实时字段，每次重取，修复缺陷 #18）', () => {
    test('每次调用重新读 getSystemInfoSync', () => {
      const spy = jest.fn(() => ({
        language: 'zh-CN',
        windowWidth: 375,
        windowHeight: 600,
        screenWidth: 390,
        screenHeight: 844,
        pixelRatio: 3,
      }))
      installWithSys(spy)
      getLocaleAndScreen()
      getLocaleAndScreen()
      expect(spy).toHaveBeenCalledTimes(2)
    })

    test('字段缺失退化为 0/空字符串/dpr=1', () => {
      installWithSys(() => ({}))
      expect(getLocaleAndScreen()).toEqual({
        lang: '',
        ww: 0,
        wh: 0,
        sw: 0,
        sh: 0,
        pr: 1,
      })
    })

    test('uni 缺失走兜底', () => {
      delete (globalThis as { uni?: unknown }).uni
      expect(getLocaleAndScreen()).toEqual({
        lang: '',
        ww: 0,
        wh: 0,
        sw: 0,
        sh: 0,
        pr: 1,
      })
    })

    test('lang 切换后能反映新值（不缓存）', () => {
      let lang = 'zh-CN'
      installWithSys(() => ({ language: lang }))
      expect(getLocaleAndScreen().lang).toBe('zh-CN')
      lang = 'en-US'
      expect(getLocaleAndScreen().lang).toBe('en-US')
    })
  })
})
