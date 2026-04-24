import {
  __resetState,
  buildVisitFields,
  commitVisitOnAck,
  getCommitted,
  loadVisitSnapshot,
  rollbackPendingVisit,
} from '../../../../public/domain/visit/firstVisit'
import { storage } from '../../../../public/infra/storage'
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

  beforeEach(() => {
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

    test('build/load 期间不调 setStorageSync', () => {
      loadVisitSnapshot()
      const setSpy = jest.spyOn(
        handle.uni as { setStorageSync: jest.Mock },
        'setStorageSync'
      )
      buildVisitFields(T1)
      expect(setSpy).not.toHaveBeenCalled()
      setSpy.mockRestore()
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

  describe('T2 新用户首启 + 上报失败', () => {
    test('上报 lvts=0；rollback 后 storage 仍为空', () => {
      loadVisitSnapshot()
      const fields = buildVisitFields(T1)
      expect(fields.lvts).toBe(0)
      rollbackPendingVisit()
      expect(handle.storage.__inspect()).toEqual({})
    })

    test('rollback 后下次启动 loadVisitSnapshot 仍按新用户', () => {
      loadVisitSnapshot()
      buildVisitFields(T1)
      rollbackPendingVisit()
      __resetState()
      storage.__resetCache()
      const snap = loadVisitSnapshot()
      expect(snap.isNewUser).toBe(true)
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
    test('buildVisitFields 同进程内只允许一次；cst=2 不再调用 build', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 1)
      loadVisitSnapshot()

      const fields1 = buildVisitFields(T2)
      expect(fields1.lvts).toBe(T1)
      commitVisitOnAck(T2)
      expect(getCommitted()?.lvts).toBe(T2)

      // cst=2 触发 → collector 不应再调 build；这里如果误调，应该返回 cached pending 并 warn
      const fields2 = buildVisitFields(T3)
      expect(fields2).toEqual(fields1)
      expect(warnSpy).toHaveBeenCalled()

      // storage 不能被 T3 覆盖
      expect(handle.storage.__inspect()[KLV]).toBe(T2)
    })
  })

  describe('T6 同进程冷启动 + 前台无操作超时 cst=3', () => {
    test('与 T5 等价：buildVisitFields 仅一次，storage lvts=T2 不变', () => {
      handle.storage.setStorageSync(KFV, T1)
      handle.storage.setStorageSync(KLV, T1)
      handle.storage.setStorageSync(KTV, 1)
      loadVisitSnapshot()
      buildVisitFields(T2)
      commitVisitOnAck(T2)
      // cst=3 不再 build
      expect(getCommitted()?.lvts).toBe(T2)
      expect(handle.storage.__inspect()[KLV]).toBe(T2)
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

  describe('辅助：commit 与 rollback 的幂等', () => {
    test('未 build 直接 commit → noop', () => {
      loadVisitSnapshot()
      commitVisitOnAck(T1)
      expect(handle.storage.__inspect()).toEqual({})
    })

    test('rollback 后 commit → noop', () => {
      loadVisitSnapshot()
      buildVisitFields(T1)
      rollbackPendingVisit()
      commitVisitOnAck(T1)
      expect(handle.storage.__inspect()).toEqual({})
    })
  })
})
