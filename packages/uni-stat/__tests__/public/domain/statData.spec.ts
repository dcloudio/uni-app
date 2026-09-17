import { LT } from '../../../src/public/domain/eventTypes'
import {
  type StatDataDeps,
  createStatDataBuilder,
} from '../../../src/public/domain/statData'

import type {
  LocaleAndScreen,
  SystemInfoStatic,
} from '../../../src/public/adapter/system'
import type { LocationResult } from '../../../src/public/adapter/location'
import type { NetResult } from '../../../src/public/adapter/network'
import type { PackageInfo } from '../../../src/public/adapter/package'
import type { SessionSnapshot } from '../../../src/public/domain/session/machine'

function makeDeps(overrides: Partial<StatDataDeps> = {}): StatDataDeps {
  const system: SystemInfoStatic = {
    brand: 'Apple',
    md: 'iPhone 15',
    sv: '17.4',
    v: '1.0.0',
    ut: 'phone',
    appVersion: '1.0.0',
    appWgtVersion: '1.0.1',
    mpvHostVersion: '8.0.2',
    on: 'macOS',
    sdkVersion: '3.5.0',
    statusBarHeight: 44,
    osP: 'macos',
  }
  const locale: LocaleAndScreen = {
    lang: 'zh-CN',
    ww: 390,
    wh: 844,
    sw: 390,
    sh: 844,
    pr: 3,
  }
  const net: NetResult = { net: 'wifi', raw: 'wifi' }
  const location: LocationResult = { lat: '', lng: '', ok: false }
  const pkg: PackageInfo = {
    mpn: 'com.x.y',
    tdaid: 'wxabc',
    pkn: 'com.x.y',
    an: 'AppName',
  }
  return Object.assign(
    {
      config: { ak: 'AK001', usv: '3.0.0' },
      platform: { ut: 'h5' },
      system,
      locale,
      device: { uuid: 'uuid-1' },
      net,
      location,
      pkg,
      web: { domain: 'https://example.com' },
    } as StatDataDeps,
    overrides
  )
}

const baseSession: SessionSnapshot = {
  sid: 'sid-1',
  sst: 1700000000,
  sct: 1,
  seq: 0,
  lastActive: 1700000000,
  bgTs: 0,
  lastScene: '1001',
}

describe('domain/statData', () => {
  describe('基础字段', () => {
    test('每条事件都带 ak/usv/did/ut/p/brand 等基础字段（参数文档对齐：device.uuid → did）', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({ lt: LT.Page, t: 1700000000 })
      expect(data).toMatchObject({
        lt: '11',
        t: 1700000000,
        ak: 'AK001',
        usv: '3.0.0',
        did: 'uuid-1',
        brand: 'Apple',
        md: 'iPhone 15',
        sv: '17.4',
        mpsdk: '3.5.0',
        mpv: '8.0.2',
        on: 'macOS',
        ut: 'h5',
        p: 'macos',
        ww: 390,
        wh: 844,
        sw: 390,
        sh: 844,
        pr: 3,
        lang: 'zh-CN',
        net: 'wifi',
        mpn: 'com.x.y',
        tdaid: 'wxabc',
        pkn: 'com.x.y',
        an: 'AppName',
        domain: 'https://example.com',
      })
      // 旧字段不再出现在上行体（uuid/odid 已剔除）
      expect((data as Record<string, unknown>).uuid).toBeUndefined()
      expect((data as Record<string, unknown>).odid).toBeUndefined()
    })

    test('config.v 缺失时回退到 system.appVersion', () => {
      const builder = createStatDataBuilder(
        makeDeps({ config: { ak: 'A', usv: '1' } })
      )
      const data = builder.build({ lt: LT.Launch, t: 1 })
      expect(data.v).toBe('1.0.0') // system.appVersion
    })

    test('net 默认为 unknown（兜底）', () => {
      const builder = createStatDataBuilder(
        makeDeps({ net: { net: 'unknown', raw: '' } as NetResult })
      )
      const data = builder.build({ lt: LT.Page, t: 1 })
      expect(data.net).toBe('unknown')
    })

    test('提供 resolveLocale 时每次事件重新读取 ww/wh', () => {
      let current: LocaleAndScreen = {
        lang: 'zh-CN',
        ww: 360,
        wh: 720,
        sw: 360,
        sh: 800,
        pr: 3,
      }
      const builder = createStatDataBuilder(
        makeDeps({ resolveLocale: () => current })
      )

      expect(builder.build({ lt: LT.Launch, t: 1 })).toMatchObject({
        ww: 360,
        wh: 720,
      })
      current = Object.assign({}, current, { ww: 720, wh: 360 })
      expect(builder.build({ lt: LT.Page, t: 2 })).toMatchObject({
        ww: 720,
        wh: 360,
      })
    })
  })

  describe('session 字段', () => {
    test('传入 session → 仅携带 sid/cst（与文档对齐；sst/seq/pid 不上行）', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({ lt: LT.Page, t: 1, session: baseSession })
      expect(data).toMatchObject({
        sid: 'sid-1',
        cst: 1,
      })
      expect((data as Record<string, unknown>).sst).toBeUndefined()
      expect((data as Record<string, unknown>).seq).toBeUndefined()
      expect((data as Record<string, unknown>).sct).toBeUndefined()
      expect((data as Record<string, unknown>).pid).toBeUndefined()
    })

    test('未传 session → 不携带任何 session 字段', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({ lt: LT.Page, t: 1 })
      expect(data.sid).toBeUndefined()
      expect((data as Record<string, unknown>).cst).toBeUndefined()
    })
  })

  describe('页面字段（lt=11/3）', () => {
    test('完整 page 字段', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({
        lt: LT.Page,
        t: 1,
        url: 'pages/A?id=1',
        urlref: 'pages/B',
        urlref_ts: 12,
        ttn: '当前',
        ttpj: '原标题',
        ttc: '业务标题',
      })
      expect(data).toMatchObject({
        url: 'pages/A?id=1',
        urlref: 'pages/B',
        urlref_ts: 12,
        ttn: '当前',
        ttpj: '原标题',
        ttc: '业务标题',
      })
    })
  })

  describe('入口字段（lt=11 / lt=21）', () => {
    test('lt=11 时 iey/ppiey 转 0/1 上行', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({ lt: LT.Page, t: 1, iey: true, ppiey: false })
      expect(data.iey).toBe(1)
      expect(data.ppiey).toBe(0)
    })

    test('lt=11 未传 iey/ppiey → 默认 0（每条必带）', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({
        lt: LT.Page,
        t: 1,
        url: 'pages/A',
        urlref_ts: 1,
      })
      expect(data.iey).toBe(0)
      expect(data.ppiey).toBe(0)
    })

    test('lt=3 不携带 iey/ppiey（入口标记仅 lt=11）', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({
        lt: LT.Hide,
        t: 1,
        urlref: 'pages/home',
        urlref_ts: 1,
        iey: true,
        ppiey: true,
      })
      expect(data.iey).toBeUndefined()
      expect(data.ppiey).toBeUndefined()
    })

    test('lt=21（自定义事件）只携带当前页 iey', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({ lt: LT.Event, t: 1, iey: true, ppiey: true })
      expect(data.iey).toBe(1)
      expect(data.ppiey).toBeUndefined()
    })
  })

  describe('访问字段（仅 lt=1）', () => {
    test('lt=1 + visit → 携带 fvts/lvts/tvc', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({
        lt: LT.Launch,
        t: 1,
        visit: { fvts: 100, lvts: 200, tvc: 3 },
      })
      expect(data).toMatchObject({ fvts: 100, lvts: 200, tvc: 3 })
    })

    test('lt=11 + visit → 不携带 visit 字段', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({
        lt: LT.Page,
        t: 1,
        visit: { fvts: 100, lvts: 200, tvc: 3 },
      })
      expect(data.fvts).toBeUndefined()
      expect(data.lvts).toBeUndefined()
    })

    test('lt=1 + visit lvts=0 → 显式上报 0（区分新用户）', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({
        lt: LT.Launch,
        t: 1,
        visit: { fvts: 999, lvts: 0, tvc: 1 },
      })
      expect(data.lvts).toBe(0)
    })
  })

  describe('错误字段（lt=31）', () => {
    test('lt=31 + errMsg → em 字段', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({ lt: LT.Error, t: 1, errMsg: 'boom' })
      expect(data.em).toBe('boom')
    })

    test('lt=21 + errMsg → 不带 em', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({ lt: LT.Event, t: 1, errMsg: 'boom' })
      expect(data.em).toBeUndefined()
    })
  })

  describe('Push 字段（lt=101）', () => {
    test('lt=101 + cid → cid 字段', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({ lt: LT.Push, t: 1, cid: 'CID' })
      expect(data.cid).toBe('CID')
    })
  })

  describe('custom 字段', () => {
    test('普通 key 透传', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({
        lt: LT.Event,
        t: 1,
        custom: { ev: 'click', id: 'btn1' },
      })
      expect(data.ev).toBe('click')
      expect(data.id).toBe('btn1')
    })

    test('custom 不能覆盖关键字段（含 p/on/mpv/domain）', () => {
      const builder = createStatDataBuilder(makeDeps())
      const data = builder.build({
        lt: LT.Event,
        t: 1700000000,
        session: baseSession,
        custom: {
          lt: '999',
          t: 0,
          sid: 'evil',
          cst: 9 as unknown as number,
          did: 'evil-did',
          p: 'freebsd',
          on: 'evil-os',
          mpv: 'evil-host',
          domain: 'http://evil.com',
          fvts: 1,
          lvts: 1,
          tvc: 999,
          sc: 'evil',
          legitField: 'ok',
        },
      })
      expect(data.lt).toBe('21')
      expect(data.t).toBe(1700000000)
      expect(data.sid).toBe('sid-1')
      expect(data.did).toBe('uuid-1')
      expect(data.p).toBe('macos')
      expect(data.on).toBe('macOS')
      expect(data.mpv).toBe('8.0.2')
      expect(data.domain).toBe('https://example.com')
      expect(data.legitField).toBe('ok')
    })

    test('非 H5 平台 domain 为空字符串', () => {
      const builder = createStatDataBuilder(
        makeDeps({
          platform: { ut: 'wx' },
          web: { domain: '' },
        })
      )
      const data = builder.build({ lt: LT.Page, t: 1 })
      expect(data.domain).toBe('')
    })
  })

  describe('字段值兜底（修复缺陷 #14：undefined 不上行）', () => {
    test('config.v 与 system.appVersion 都为空 → v 为空字符串', () => {
      const builder = createStatDataBuilder(
        makeDeps({
          config: { ak: 'A', usv: '1' },
          system: {
            brand: '',
            md: '',
            sv: '',
            v: '',
            ut: '',
            appVersion: '',
            appWgtVersion: '',
            mpvHostVersion: '',
            on: '',
            sdkVersion: '',
            statusBarHeight: 0,
            osP: '',
          },
        })
      )
      const data = builder.build({ lt: LT.Page, t: 1 })
      expect(data.v).toBe('')
      expect(data.brand).toBe('')
      expect(data.md).toBe('')
    })

    test('locale.pr 默认为 1（避免 0 / undefined）', () => {
      const builder = createStatDataBuilder(
        makeDeps({
          locale: {
            lang: '',
            ww: 0,
            wh: 0,
            sw: 0,
            sh: 0,
            pr: NaN as unknown as number,
          },
        })
      )
      const data = builder.build({ lt: LT.Page, t: 1 })
      expect(data.pr).toBe(1)
    })
  })
})
