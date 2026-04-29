import {
  formatMpvForStat,
  getClientOs,
  getPlatform,
  getRawPlatform,
  isApp,
  isH5,
  isMp,
  isNvue,
  normalizeStatOsP,
  uniPlatformMpAliRaw,
} from '../../../src/public/adapter/platform'

type EnvBag = Record<string, string | undefined>
const env = process.env as EnvBag

function setPlatform(p: string | undefined): void {
  if (p === undefined) delete env.UNI_PLATFORM
  else env.UNI_PLATFORM = p
}

function clearGlobals(): void {
  delete (globalThis as { plus?: unknown }).plus
  delete (globalThis as { my?: unknown }).my
  delete (globalThis as { __NVUE__?: unknown }).__NVUE__
}

describe('adapter/platform', () => {
  let originalPlatform: string | undefined

  beforeEach(() => {
    originalPlatform = env.UNI_PLATFORM
    clearGlobals()
  })

  afterEach(() => {
    setPlatform(originalPlatform)
    clearGlobals()
  })

  describe('getRawPlatform', () => {
    test('未设置 UNI_PLATFORM 返回空字符串', () => {
      setPlatform(undefined)
      expect(getRawPlatform()).toBe('')
    })

    test('设置后返回原值', () => {
      setPlatform('mp-weixin')
      expect(getRawPlatform()).toBe('mp-weixin')
    })
  })

  describe('getPlatform 平台映射', () => {
    test.each([
      ['app', 'n'],
      ['app-plus', 'n'],
      ['app-harmony', 'n'],
      ['h5', 'h5'],
      ['mp-weixin', 'wx'],
      [uniPlatformMpAliRaw(), 'ali'],
      ['mp-baidu', 'bd'],
      ['mp-toutiao', 'tt'],
      ['mp-qq', 'qq'],
      ['mp-kuaishou', 'ks'],
      ['mp-lark', 'lark'],
      ['mp-xhs', 'xhs'],
      ['mp-jd', 'jd'],
      ['mp-harmony', 'mhm'],
      ['quickapp-native', 'qn'],
      ['quickapp-webview', 'qw'],
    ])('%s → %s', (raw, expected) => {
      setPlatform(raw)
      expect(getPlatform()).toBe(expected)
    })

    test('陌生平台返回 unknown（避免上行字段污染）', () => {
      setPlatform('mp-some-future-vendor')
      expect(getPlatform()).toBe('unknown')
    })

    test('未设置 UNI_PLATFORM 返回 unknown', () => {
      setPlatform(undefined)
      expect(getPlatform()).toBe('unknown')
    })

    test('阿里系细分：clientName=dingtalk → dt', () => {
      setPlatform(uniPlatformMpAliRaw())
      ;(globalThis as { my?: unknown }).my = { env: { clientName: 'dingtalk' } }
      expect(getPlatform()).toBe('dt')
    })

    test('阿里系细分：clientName=ap → ali（保持原值）', () => {
      setPlatform(uniPlatformMpAliRaw())
      ;(globalThis as { my?: unknown }).my = { env: { clientName: 'ap' } }
      expect(getPlatform()).toBe('ali')
    })

    test('阿里系细分：my 不存在仍返回 ali', () => {
      setPlatform(uniPlatformMpAliRaw())
      expect(getPlatform()).toBe('ali')
    })
  })

  describe('getClientOs', () => {
    test('plus.os.name=android → a', () => {
      ;(globalThis as { plus?: unknown }).plus = { os: { name: 'Android' } }
      expect(getClientOs()).toBe('a')
    })

    test('plus.os.name=iOS → i', () => {
      ;(globalThis as { plus?: unknown }).plus = { os: { name: 'iOS' } }
      expect(getClientOs()).toBe('i')
    })

    test('plus.os.name=iPhone OS → i（兼容旧值）', () => {
      ;(globalThis as { plus?: unknown }).plus = { os: { name: 'iPhone OS' } }
      expect(getClientOs()).toBe('i')
    })

    test('plus.os.name 含 harmony → h', () => {
      ;(globalThis as { plus?: unknown }).plus = { os: { name: 'HarmonyOS' } }
      expect(getClientOs()).toBe('h')
    })

    test('plus 缺失 + UNI_PLATFORM=app-harmony → h', () => {
      setPlatform('app-harmony')
      expect(getClientOs()).toBe('h')
    })

    test('plus 缺失 + 小程序 → unknown', () => {
      setPlatform('mp-weixin')
      expect(getClientOs()).toBe('unknown')
    })
  })

  describe('normalizeStatOsP（上行 p，与私有版 sys.platform 同源）', () => {
    test('platform=ios → ios', () => {
      expect(normalizeStatOsP({ platform: 'ios' })).toBe('ios')
    })

    test('platform=android → android', () => {
      expect(normalizeStatOsP({ platform: 'Android' })).toBe('android')
    })

    test('platform=devtools 时退 system 文案', () => {
      expect(
        normalizeStatOsP({ platform: 'devtools', system: 'iOS 15.0' })
      ).toBe('ios')
    })

    test('osName=ohos → harmonyos', () => {
      expect(normalizeStatOsP({ osName: 'ohos' })).toBe('harmonyos')
    })

    test('system 含 Android 12 → android', () => {
      expect(normalizeStatOsP({ system: 'Android 12' })).toBe('android')
    })

    test('无信息且 plus 缺失 → 空串', () => {
      expect(normalizeStatOsP({})).toBe('')
    })

    test('plus.os.name 兜底（App）', () => {
      ;(globalThis as { plus?: unknown }).plus = { os: { name: 'Android' } }
      expect(normalizeStatOsP({})).toBe('android')
    })
  })

  describe('formatMpvForStat', () => {
    test('微信 + iOS + 版本号', () => {
      expect(formatMpvForStat('wx', 'ios', '8.0.50')).toBe('微信 iOS 8.0.50')
    })

    test('支付宝 + Android + 版本号', () => {
      expect(formatMpvForStat('ali', 'android', '10.5.66')).toBe(
        '支付宝 Android 10.5.66'
      )
    })

    test('全空 → 空串', () => {
      expect(formatMpvForStat('unknown', '', '')).toBe('')
    })
  })

  describe('isApp / isMp / isH5 / isNvue', () => {
    test.each([
      ['app', { isApp: true, isMp: false, isH5: false }],
      ['app-plus', { isApp: true, isMp: false, isH5: false }],
      ['app-harmony', { isApp: true, isMp: false, isH5: false }],
      ['mp-weixin', { isApp: false, isMp: true, isH5: false }],
      [uniPlatformMpAliRaw(), { isApp: false, isMp: true, isH5: false }],
      ['h5', { isApp: false, isMp: false, isH5: true }],
    ])('%s → %j', (raw, exp) => {
      setPlatform(raw)
      expect(isApp()).toBe(exp.isApp)
      expect(isMp()).toBe(exp.isMp)
      expect(isH5()).toBe(exp.isH5)
    })

    test('isNvue 默认 false', () => {
      expect(isNvue()).toBe(false)
    })

    test('isNvue 当 __NVUE__=true 返回 true', () => {
      ;(globalThis as { __NVUE__?: boolean }).__NVUE__ = true
      expect(isNvue()).toBe(true)
    })
  })
})
