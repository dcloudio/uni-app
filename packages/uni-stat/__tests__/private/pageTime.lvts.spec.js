/**
 * 私有版 visit 字段回归：修复「首次写 fvts 时清空 lvts → 二次冷启仍 lvts=0」。
 * 模拟 sendReportRequest 调用顺序：先 get_last_visit_time，再 get_first_visit_time。
 */

const store = new Map()

jest.mock('../../src/utils/pageInfo.js', () => ({
  get_platform_name: () => 'n',
}))

jest.mock('../../src/utils/db.js', () => ({
  dbGet: (name) => store.get(name),
  dbSet: (name, value) => {
    store.set(name, value)
  },
  dbRemove: (name) => {
    store.delete(name)
  },
}))

jest.mock('../../src/config.ts', () => ({
  PAGE_PVER_TIME: 1800,
  APP_PVER_TIME: 300,
}))

const FIRST_VISIT_TIME_KEY = '__first__visit__time'
const LAST_VISIT_TIME_KEY = '__last__visit__time'

/**
 * 对齐 sendReportRequest：先读 lvts 再写 fvts。
 */
function simulateLaunchReport() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {
    get_first_visit_time,
    get_last_visit_time,
    get_total_visit_count,
  } = require('../../src/utils/pageTime.js')
  const last_time = get_last_visit_time()
  const fvts = get_first_visit_time()
  const tvc = get_total_visit_count()
  return {
    fvts,
    lvts: last_time,
    tvc,
    storedLvts: store.get(LAST_VISIT_TIME_KEY),
    storedFvts: store.get(FIRST_VISIT_TIME_KEY),
  }
}

describe('private pageTime lvts regression', () => {
  beforeEach(() => {
    store.clear()
    jest.resetModules()
  })

  test('首启上报 lvts=0，但 storage 保留 lvts 基线', () => {
    const first = simulateLaunchReport()
    expect(first.lvts).toBe(0)
    expect(first.fvts).toBeGreaterThan(0)
    expect(first.tvc).toBe(1)
    expect(first.storedFvts).toBe(first.fvts)
    expect(first.storedLvts).toBeGreaterThan(0)
  })

  test('二次冷启不再上报 lvts=0（一生只计一次新增）', () => {
    const first = simulateLaunchReport()
    expect(first.lvts).toBe(0)

    jest.resetModules()
    const second = simulateLaunchReport()
    expect(second.lvts).toBeGreaterThan(0)
    expect(second.lvts).toBe(first.storedLvts)
    expect(second.fvts).toBe(first.fvts)
    expect(second.tvc).toBe(2)
  })

  test('同进程续会话（第二次 sendReportRequest）也不再 lvts=0', () => {
    const first = simulateLaunchReport()
    expect(first.lvts).toBe(0)

    const renewal = simulateLaunchReport()
    expect(renewal.lvts).toBeGreaterThan(0)
    expect(renewal.fvts).toBe(first.fvts)
    expect(renewal.tvc).toBe(2)
  })
})
