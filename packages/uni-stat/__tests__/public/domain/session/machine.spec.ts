import { __resetCache as resetDevice } from '../../../../src/public/adapter/device'
import {
  __resetState,
  configure,
  consumePrevId,
  ensureSession,
  getSnapshot,
  markBackground,
  nextSeq,
  touch,
} from '../../../../src/public/domain/session/machine'
import { CST } from '../../../../src/public/domain/eventTypes'
import { storage } from '../../../../src/public/infra/storage'
import {
  type MockUniHandle,
  installMockUni,
  restoreMockUni,
} from '../../helpers/mockUni'

const KSID = 'UNI_STAT_DATA:session-test:session:id'
const KSST = 'UNI_STAT_DATA:session-test:session:start'
const KSCT = 'UNI_STAT_DATA:session-test:session:sct'
const KSEQ = 'UNI_STAT_DATA:session-test:session:seq'
const KLA = 'UNI_STAT_DATA:session-test:session:lastActive'
const KBG = 'UNI_STAT_DATA:session-test:session:bgTs'
const KSCN = 'UNI_STAT_DATA:session-test:session:lastScene'
const KPID = 'UNI_STAT_DATA:session-test:session:prevId'

const T0 = 1_700_000_000

describe('domain/session/machine', () => {
  let handle: MockUniHandle

  beforeEach(() => {
    ;(process.env as Record<string, string | undefined>).UNI_APP_ID =
      'session-test'
    handle = installMockUni({
      platform: 'mp-weixin',
      patch: { getSystemInfoSync: () => ({ deviceId: 'dev-uuid' }) },
    })
    storage.__resetCache()
    __resetState()
    resetDevice()
  })

  afterEach(() => {
    restoreMockUni()
    storage.__resetCache()
    __resetState()
    resetDevice()
    delete (process.env as Record<string, string | undefined>).UNI_APP_ID
  })

  describe('cold_launch', () => {
    test('首次冷启动 → 新 session, cst=1, sst=now, seq=0', () => {
      const r = ensureSession('cold_launch', { now: T0 })
      expect(r.isNew).toBe(true)
      expect(r.cst).toBe(CST.ColdLaunch)
      expect(r.snapshot.sst).toBe(T0)
      expect(r.snapshot.seq).toBe(0)
      expect(r.snapshot.bgTs).toBe(0)
      expect(r.snapshot.sid).toMatch(/^dev-uuid-/)
      // storage 落盘
      const snap = handle.storage.__inspect()
      expect(snap[KSID]).toBe(r.snapshot.sid)
      expect(snap[KSST]).toBe(T0)
      expect(snap[KSCT]).toBe(CST.ColdLaunch)
      expect(snap[KSEQ]).toBe(0)
    })

    test('再次 cold_launch → 旧 sid 进 prevId', () => {
      const r1 = ensureSession('cold_launch', { now: T0 })
      const r2 = ensureSession('cold_launch', { now: T0 + 10 })
      expect(r2.isNew).toBe(true)
      expect(r2.snapshot.sid).not.toBe(r1.snapshot.sid)
      expect(consumePrevId()).toBe(r1.snapshot.sid)
      // consume 后清掉
      expect(consumePrevId()).toBeUndefined()
    })
  })

  describe('app_show', () => {
    test('app_show 但 storage 没 session → 退化为冷启动 cst=1', () => {
      const r = ensureSession('app_show', { now: T0 })
      expect(r.isNew).toBe(true)
      expect(r.cst).toBe(CST.ColdLaunch)
    })

    test('app_show 未超时（bgTs + 100s < bgTimeout=300）→ 复用 cst=0，bgTs 清零', () => {
      ensureSession('cold_launch', { now: T0 })
      markBackground(T0 + 50)
      const r = ensureSession('app_show', { now: T0 + 50 + 100 })
      expect(r.isNew).toBe(false)
      expect(r.cst).toBe(0)
      expect(r.snapshot.bgTs).toBe(0)
      expect(handle.storage.__inspect()[KBG]).toBe(0)
    })

    test('app_show 后台超时（>300s）→ 新 session, cst=2', () => {
      ensureSession('cold_launch', { now: T0 })
      markBackground(T0 + 10)
      const r = ensureSession('app_show', { now: T0 + 10 + 301 })
      expect(r.isNew).toBe(true)
      expect(r.cst).toBe(CST.BackgroundTimeout)
    })

    test('app_show wx scene 变化 → 新 session, cst=2', () => {
      ensureSession('cold_launch', { now: T0, scene: '1001' })
      markBackground(T0 + 5)
      const r = ensureSession('app_show', { now: T0 + 5 + 10, scene: '1037' })
      expect(r.isNew).toBe(true)
      expect(r.cst).toBe(CST.BackgroundTimeout)
      expect(r.snapshot.lastScene).toBe('1037')
    })
  })

  describe('wx_scene_changed', () => {
    test('scene 与上次不同 → 新 session', () => {
      ensureSession('cold_launch', { now: T0, scene: '1001' })
      const r = ensureSession('wx_scene_changed', {
        now: T0 + 5,
        scene: '1037',
      })
      expect(r.isNew).toBe(true)
      expect(r.cst).toBe(CST.BackgroundTimeout)
    })

    test('scene 相同 → 不创建', () => {
      ensureSession('cold_launch', { now: T0, scene: '1001' })
      const r = ensureSession('wx_scene_changed', {
        now: T0 + 5,
        scene: '1001',
      })
      expect(r.isNew).toBe(false)
      expect(r.cst).toBe(0)
    })
  })

  describe('page_show', () => {
    test('未超时（<1800s）→ touch lastActive，不创建', () => {
      ensureSession('cold_launch', { now: T0 })
      const r = ensureSession('page_show', { now: T0 + 1000 })
      expect(r.isNew).toBe(false)
      expect(r.snapshot.lastActive).toBe(T0 + 1000)
    })

    test('超过 1800s → 新 session, cst=3', () => {
      ensureSession('cold_launch', { now: T0 })
      const r = ensureSession('page_show', { now: T0 + 1801 })
      expect(r.isNew).toBe(true)
      expect(r.cst).toBe(CST.PageInactiveTimeout)
    })
  })

  describe('configure', () => {
    test('自定义 backgroundTimeoutSec=60 → 60s 后即超时', () => {
      configure({ backgroundTimeoutSec: 60 })
      ensureSession('cold_launch', { now: T0 })
      markBackground(T0)
      const r = ensureSession('app_show', { now: T0 + 61 })
      expect(r.isNew).toBe(true)
      expect(r.cst).toBe(CST.BackgroundTimeout)
    })

    test('部分覆盖默认值', () => {
      configure({ pageInactiveTimeoutSec: 5 })
      ensureSession('cold_launch', { now: T0 })
      const r = ensureSession('page_show', { now: T0 + 6 })
      expect(r.isNew).toBe(true)
      expect(r.cst).toBe(CST.PageInactiveTimeout)
    })
  })

  describe('seq', () => {
    test('nextSeq 自增并落库', () => {
      ensureSession('cold_launch', { now: T0 })
      expect(nextSeq()).toBe(1)
      expect(nextSeq()).toBe(2)
      expect(nextSeq()).toBe(3)
      expect(handle.storage.__inspect()[KSEQ]).toBe(3)
    })

    test('未初始化 session 时 nextSeq 返回 0（不抛）', () => {
      expect(nextSeq()).toBe(0)
    })
  })

  describe('touch / markBackground', () => {
    test('touch 更新 lastActive', () => {
      ensureSession('cold_launch', { now: T0 })
      touch(T0 + 5)
      expect(handle.storage.__inspect()[KLA]).toBe(T0 + 5)
    })

    test('markBackground 写 bgTs', () => {
      ensureSession('cold_launch', { now: T0 })
      markBackground(T0 + 5)
      expect(handle.storage.__inspect()[KBG]).toBe(T0 + 5)
      expect(getSnapshot()?.bgTs).toBe(T0 + 5)
    })

    test('未初始化 → noop（不抛）', () => {
      expect(() => touch(T0)).not.toThrow()
      expect(() => markBackground(T0)).not.toThrow()
    })
  })

  describe('跨进程恢复', () => {
    test('storage 已有 session → ensureCache 复用', () => {
      handle.storage.setStorageSync(KSID, 'old-sid')
      handle.storage.setStorageSync(KSST, T0)
      handle.storage.setStorageSync(KSCT, 1)
      handle.storage.setStorageSync(KSEQ, 5)
      handle.storage.setStorageSync(KLA, T0 + 60)
      handle.storage.setStorageSync(KBG, 0)
      handle.storage.setStorageSync(KSCN, '1001')
      const snap = getSnapshot()
      expect(snap?.sid).toBe('old-sid')
      expect(snap?.seq).toBe(5)
    })

    test('storage 异常 → ensureSession 仍返回新 session（不抛）', () => {
      handle.storage.__failNext({ get: new Error('quota') })
      const r = ensureSession('cold_launch', { now: T0 })
      expect(r.isNew).toBe(true)
    })
  })

  describe('consumePrevId', () => {
    test('storage 中已有 prevId（跨进程）→ 取走并清空', () => {
      handle.storage.setStorageSync(KPID, 'persisted-prev-sid')
      expect(consumePrevId()).toBe('persisted-prev-sid')
      expect(handle.storage.__inspect()[KPID]).toBeUndefined()
    })

    test('无 prevId → undefined', () => {
      expect(consumePrevId()).toBeUndefined()
    })
  })
})
