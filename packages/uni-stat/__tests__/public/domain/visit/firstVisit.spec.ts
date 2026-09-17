import {
  __resetState,
  buildVisitFields,
  buildVisitFieldsForSessionRenewal,
  commitVisitOnAck,
  getCommitted,
  loadVisitSnapshot,
  rollbackPendingVisit,
} from '../../../../src/public/domain/visit/firstVisit'
import { storage } from '../../../../src/public/infra/storage'
import {
  type MockUniHandle,
  installMockUni,
  restoreMockUni,
} from '../../helpers/mockUni'

const T1 = 1_700_000_000
const T2 = 1_700_001_000
const T3 = 1_700_002_000

const KFV = 'UNI_STAT_DATA:firstvisit-test:visit:fvts'
const KLV = 'UNI_STAT_DATA:firstvisit-test:visit:lvts'
const KTV = 'UNI_STAT_DATA:firstvisit-test:visit:tvc'

let warnSpy: jest.SpyInstance

describe('domain/visit/firstVisit（缺陷 #5 修复矩阵 T1~T9）', () => {
  let handle: MockUniHandle
  let originalVapor: string | undefined

  beforeEach(() => {
    originalVapor = (process.env as Record<string, string | undefined>)
      .UNI_STAT_VAPOR
    delete (process.env as Record<string, string | undefined>).UNI_STAT_VAPOR
    ;(process.env as Record<string, string | undefined>).UNI_APP_ID =
      'firstvisit-test'
    handle = installMockUni({ platform: 'mp-weixin' })
    storage.__resetCache()
    __resetState()
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined)
  })

  afterEach(() => {
    warnSpy.mockRestore()
    restoreMockUni()
    storage.__resetCache()
    __resetState()
    delete (process.env as Record<string, string | undefined>).UNI_APP_ID
    if (originalVapor === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_STAT_VAPOR
    } else {
      ;(process.env as Record<string, string | undefined>).UNI_STAT_VAPOR =
        originalVapor
    }
  })

  describe('loadVisitSnapshot 纯读，无副作用', () => {
    test('storage 空 → fvts=lvts=tvc=0, isNewUser=true, degraded=false', () => {
      const setSpy = jest.spyOn(
        handle.uni as { setStorageSync: jest.Mock },
        'setStorageSync'
      )
      const removeSpy = jest.spyOn(
        handle.uni as { removeStorageSync: jest.Mock },
        'removeStorageSync'
      )
      const snap = loadVisitSnapshot()
      expect(snap).toEqual({
        fvts: 0,
        lvts: 0,
        tvc: 0,
        isNewUser: true,
        degraded: false,
      })
      expect(setSpy).not.toHaveBeenCalled()
      expect(removeSpy).not.toHaveBeenCalled()
      setSpy.mockRestore()
      removeSpy.mockRestore()
    })

    test('老用户 fvts/lvts/tvc 完整 → isNewUser=false', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 1)
      const snap = loadVisitSnapshot()
      expect(snap).toEqual({
        fvts: T1,
        lvts: T1,
        tvc: 1,
        isNewUser: false,
        degraded: false,
      })
    })

    test('storage 抛错 → degraded=true，字段退到 0', () => {
      handle.storage.__failNext({ get: new Error('quota') })
      const snap = loadVisitSnapshot()
      expect(snap.degraded).toBe(true)
      expect(snap.lvts).toBe(0)
    })

    test('storage 中是字符串数字 → 兼容转换', () => {
      handle.storage.setStorageSync(KFV, String(T1))
      handle.storage.setStorageSync(KLV, String(T1))
      handle.storage.setStorageSync(KTV, '5')
      const snap = loadVisitSnapshot()
      expect(snap).toMatchObject({
        fvts: T1,
        lvts: T1,
        tvc: 5,
        isNewUser: false,
      })
    })
  })

  describe('禁止跨字段写入（缺陷 #5 核心约束）', () => {
    test('fvts 落库时不会触发 lvts 的 remove（私有版的副作用）', () => {
      loadVisitSnapshot()
      buildVisitFields(T1)
      const removeSpy = jest.spyOn(
        handle.uni as { removeStorageSync: jest.Mock },
        'removeStorageSync'
      )
      commitVisitOnAck(T1)
      const removedKeys = removeSpy.mock.calls.map((c) => c[0])
      expect(removedKeys).not.toContain(KLV)
      removeSpy.mockRestore()
    })

    test('老用户 build 期间不调 setStorageSync（仅 ack 后才落库）', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 1)
      loadVisitSnapshot()
      const setSpy = jest.spyOn(
        handle.uni as { setStorageSync: jest.Mock },
        'setStorageSync'
      )
      buildVisitFields(T2)
      expect(setSpy).not.toHaveBeenCalled()
      setSpy.mockRestore()
    })

    test('新用户 build 立即落库基线 {fvts:now, lvts:now, tvc:1}（一生只计一次新增）', () => {
      loadVisitSnapshot()
      const fields = buildVisitFields(T1)
      // 首条 lt=1 仍上报 lvts=0（唯一一次新增）
      expect(fields).toEqual({ fvts: T1, lvts: 0, tvc: 1 })
      // 但 storage 已被乐观写入基线，使后续不再被算成新增
      expect(handle.storage.__inspect()).toEqual({
        [KFV]: T1,
        [KLV]: T1,
        [KTV]: 1,
      })
    })
  })

  describe('T1 新用户首启 + 上报成功', () => {
    test('上报 lvts=0；ack 后 storage = {fvts:T1, lvts:T1, tvc:1}', () => {
      loadVisitSnapshot()
      const fields = buildVisitFields(T1)
      expect(fields).toEqual({ fvts: T1, lvts: 0, tvc: 1 })
      commitVisitOnAck(T1)
      expect(handle.storage.__inspect()).toEqual({
        [KFV]: T1,
        [KLV]: T1,
        [KTV]: 1,
      })
    })
  })

  describe('T2 新用户首启 + 上报失败（乐观落库，确保只计一次新增）', () => {
    test('首条上报 lvts=0；build 已落库基线，rollback 不回滚 storage', () => {
      loadVisitSnapshot()
      const fields = buildVisitFields(T1)
      expect(fields.lvts).toBe(0)
      rollbackPendingVisit()
      // 与旧契约相反：基线已在 build 落库，首条上报失败也不会丢失这唯一一次新增信号
      // （失败批次由 pipeline/retry 暂存重试），且下次启动不再重复计新增。
      expect(handle.storage.__inspect()).toEqual({
        [KFV]: T1,
        [KLV]: T1,
        [KTV]: 1,
      })
    })

    test('rollback 后下次启动按老用户（不再重复计新增）', () => {
      loadVisitSnapshot()
      buildVisitFields(T1)
      rollbackPendingVisit()
      __resetState()
      storage.__resetCache()
      const snap = loadVisitSnapshot()
      expect(snap.isNewUser).toBe(false)
      expect(snap.lvts).toBe(T1)
    })
  })

  describe('T3 老用户第 2 次启动 + 上报成功', () => {
    test('上报 lvts=T1（不是 0，也不是 T2）；ack 后 lvts=T2, tvc=2', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 1)
      loadVisitSnapshot()
      const fields = buildVisitFields(T2)
      expect(fields).toEqual({ fvts: T1, lvts: T1, tvc: 2 })
      commitVisitOnAck(T2)
      expect(handle.storage.__inspect()).toEqual({
        [KFV]: T1,
        [KLV]: T2,
        [KTV]: 2,
      })
    })
  })

  describe('T4 老用户第 N 次启动', () => {
    test('lvts 上报为 T(N-1)，commit 后递推', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T2)
      handle.storage.setStorageSync(KTV, 7)
      loadVisitSnapshot()
      const fields = buildVisitFields(T3)
      expect(fields).toEqual({ fvts: T1, lvts: T2, tvc: 8 })
      commitVisitOnAck(T3)
      expect(handle.storage.__inspect()).toEqual({
        [KFV]: T1,
        [KLV]: T3,
        [KTV]: 8,
      })
    })
  })

  describe('T5 同进程冷启动 + 后台超时 cst=2', () => {
    test('buildVisitFields 同进程内只允许一次；cst=2 走 sessionRenewal', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 1)
      loadVisitSnapshot()

      const fields1 = buildVisitFields(T2)
      expect(fields1.lvts).toBe(T1)
      commitVisitOnAck(T2)
      expect(getCommitted()?.lvts).toBe(T2)

      const fields2 = buildVisitFieldsForSessionRenewal(T3)
      expect(fields2).toEqual({ fvts: T1, lvts: T2, tvc: 3 })

      commitVisitOnAck(T3)
      expect(getCommitted()?.lvts).toBe(T3)
      expect(handle.storage.__inspect()[KLV]).toBe(T3)
    })
  })

  describe('T6 同进程冷启动 + 前台无操作超时 cst=3', () => {
    test('与 T5 等价：sessionRenewal 推进 tvc 且 ack 后更新 lvts', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 1)
      loadVisitSnapshot()
      buildVisitFields(T2)
      commitVisitOnAck(T2)

      const fields = buildVisitFieldsForSessionRenewal(T3)
      expect(fields).toEqual({ fvts: T1, lvts: T2, tvc: 3 })
      commitVisitOnAck(T3)
      expect(getCommitted()?.lvts).toBe(T3)
      expect(handle.storage.__inspect()[KLV]).toBe(T3)
    })
  })

  describe('T7 storage getStorageSync 抛错', () => {
    test('degraded=true，按 EMPTY 推进；下次启动恢复后正常', () => {
      handle.storage.__failNext({ get: new Error('quota') })
      const snap = loadVisitSnapshot()
      expect(snap.degraded).toBe(true)
      const fields = buildVisitFields(T2)
      expect(fields).toEqual({ fvts: T2, lvts: 0, tvc: 1 })

      commitVisitOnAck(T2)
      // 下次启动：清状态 + 缓存
      __resetState()
      storage.__resetCache()
      const snap2 = loadVisitSnapshot()
      expect(snap2).toMatchObject({
        fvts: T2,
        lvts: T2,
        tvc: 1,
        isNewUser: false,
      })
    })
  })

  describe('T8 setStorageSync 抛错（commit 阶段）', () => {
    test('storage 写失败：内存 committed=T2，但持久化仍是旧值；下次启动仍按老用户', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 1)
      loadVisitSnapshot()
      buildVisitFields(T2)

      // 注入 set 失败：firstVisit 的 commit 调 storage.set 三次，全部失败
      handle.storage.__failNext({ set: new Error('boom') })
      commitVisitOnAck(T2)

      // 内存 committed 已更新到 T2
      expect(getCommitted()?.lvts).toBe(T2)

      // 下次启动若内存丢失，read 老 storage 仍为 T1，仍按老用户
      __resetState()
      storage.__resetCache()
      handle.storage.__reset()
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 1)
      const snap2 = loadVisitSnapshot()
      expect(snap2.isNewUser).toBe(false)
      expect(snap2.lvts).toBe(T1)
    })
  })

  describe('T9 用户主动 clearStorage', () => {
    test('全空 → 按新用户重新计', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 5)
      handle.storage.clearStorageSync()
      const snap = loadVisitSnapshot()
      expect(snap).toMatchObject({ fvts: 0, lvts: 0, tvc: 0, isNewUser: true })
      const fields = buildVisitFields(T2)
      expect(fields).toEqual({ fvts: T2, lvts: 0, tvc: 1 })
      commitVisitOnAck(T2)
      expect(handle.storage.__inspect()).toEqual({
        [KFV]: T2,
        [KLV]: T2,
        [KTV]: 1,
      })
    })
  })

  describe('P2-7 degraded 消费：读失败但非全新设备 → 不当新增', () => {
    test('degraded + tvc 有历史值（lvts 读 0）→ 按老用户兜底，不上报 lvts=0、不落库基线', () => {
      // tvc 在 storage 中有值（=5）；fvts/lvts 未设。让首个 get（fvts）读失败 → degraded。
      handle.storage.setStorageSync(KTV, 5)
      storage.__resetCache()
      __resetState()
      handle.storage.__failNext({ get: new Error('fvts read boom') })

      const snap = loadVisitSnapshot()
      expect(snap.degraded).toBe(true)
      expect(snap.isNewUser).toBe(true) // lvts=0 → 表面像新用户
      expect(snap.tvc).toBe(5) // 但 tvc 有历史 → 非全新设备

      const fields = buildVisitFields(T2)
      // 保护：不当新增（lvts 不为 0），tvc 在历史基础上 +1
      expect(fields.lvts).not.toBe(0)
      expect(fields.tvc).toBe(6)
      // 不落库基线：storage 中 fvts/lvts 仍未被写入
      const after = handle.storage.__inspect()
      expect(after[KFV]).toBeUndefined()
      expect(after[KLV]).toBeUndefined()
    })

    test('degraded 但全字段 0（全新设备）→ 仍按新用户计一次新增（兼容 T7）', () => {
      storage.__resetCache()
      __resetState()
      handle.storage.__failNext({ get: new Error('boom') })
      const snap = loadVisitSnapshot()
      expect(snap.degraded).toBe(true)
      const fields = buildVisitFields(T2)
      expect(fields).toEqual({ fvts: T2, lvts: 0, tvc: 1 })
    })
  })

  describe('Vapor 残缺历史兼容', () => {
    test('普通公有版保持原逻辑：lvts 缺失仍以 lvts 为新用户唯一判据', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KTV, 5)

      const snap = loadVisitSnapshot()
      expect(snap).toMatchObject({
        fvts: T1,
        lvts: 0,
        tvc: 5,
        isNewUser: true,
        degraded: false,
      })
      expect(buildVisitFields(T2)).toEqual({ fvts: T2, lvts: 0, tvc: 1 })
    })

    test('Vapor：存在 fvts/tvc 但 lvts 缺失时按老用户兜底，不重复上报新增', () => {
      ;(process.env as Record<string, string | undefined>).UNI_STAT_VAPOR =
        'true'
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KTV, 5)

      const snap = loadVisitSnapshot()
      expect(snap.degraded).toBe(false)
      expect(snap.isNewUser).toBe(true)
      expect(buildVisitFields(T2)).toEqual({ fvts: T1, lvts: T1, tvc: 6 })
      expect(handle.storage.__inspect()[KLV]).toBeUndefined()
    })
  })

  describe('辅助：commit 与 rollback 的幂等', () => {
    test('未 build 直接 commit → noop', () => {
      loadVisitSnapshot()
      commitVisitOnAck(T1)
      expect(handle.storage.__inspect()).toEqual({})
    })

    test('rollback 后 commit → noop（新用户基线已在 build 落库，commit 不再额外写）', () => {
      loadVisitSnapshot()
      buildVisitFields(T1)
      rollbackPendingVisit()
      commitVisitOnAck(T1)
      expect(handle.storage.__inspect()).toEqual({
        [KFV]: T1,
        [KLV]: T1,
        [KTV]: 1,
      })
    })
  })

  describe('一生只计一次新增（新增>活跃 修复回归）', () => {
    test('路径A：新用户首条 lt=1 未 ack，进程内续会话(cst=2/3)不再上报 lvts=0', () => {
      loadVisitSnapshot()
      const first = buildVisitFields(T1)
      expect(first.lvts).toBe(0)
      // 故意不 commit（模拟首条尚未 ack）
      const renewal = buildVisitFieldsForSessionRenewal(T2)
      expect(renewal.lvts).not.toBe(0)
      expect(renewal.lvts).toBe(T1)
    })

    test('路径B：新用户首条 lt=1 未 ack，进程被杀重启后不再算新增', () => {
      loadVisitSnapshot()
      buildVisitFields(T1)
      // 不 commit，直接模拟下次冷启动（清内存状态，但 storage 保留 build 落库的基线）
      __resetState()
      const snap = loadVisitSnapshot()
      expect(snap.isNewUser).toBe(false)
      const fields = buildVisitFields(T2)
      expect(fields.lvts).toBe(T1)
      expect(fields.lvts).not.toBe(0)
    })

    test('lvts 有效但 fvts 缺失（迁移脏数据）→ 仍按老用户上报真实 lvts，不计新增', () => {
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 3)
      const snap = loadVisitSnapshot()
      expect(snap.isNewUser).toBe(false)
      const fields = buildVisitFields(T2)
      expect(fields.lvts).toBe(T1)
    })
  })
})
