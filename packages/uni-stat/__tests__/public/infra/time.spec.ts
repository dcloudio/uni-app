import {
  clampUrlrefStaySec,
  elapsedSec,
  nowMs,
  nowSec,
} from '../../../src/public/infra/time'

describe('infra/time', () => {
  let dateNowSpy: jest.SpyInstance

  afterEach(() => {
    dateNowSpy?.mockRestore()
  })

  test('nowMs 直接返回 Date.now', () => {
    dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1_700_000_000_123)
    expect(nowMs()).toBe(1_700_000_000_123)
  })

  test('nowSec 向下取整到秒', () => {
    dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1_700_000_000_999)
    expect(nowSec()).toBe(1_700_000_000)
  })

  test('elapsedSec 返回非负整秒', () => {
    dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1_700_000_010_000)
    expect(elapsedSec(1_700_000_005)).toBe(5)
  })

  test('elapsedSec 起点在未来时返回 0（避免负值污染上行）', () => {
    dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000)
    expect(elapsedSec(1_700_000_999)).toBe(0)
  })

  test('clampUrlrefStaySec 不足 1 秒按 1 秒（对齐私有版 get_residence_time）', () => {
    expect(clampUrlrefStaySec(0)).toBe(1)
    expect(clampUrlrefStaySec(0.9)).toBe(1)
    expect(clampUrlrefStaySec(1)).toBe(1)
    expect(clampUrlrefStaySec(5)).toBe(5)
  })

  test('clampUrlrefStaySec 负数视为 0 再钳成 1', () => {
    expect(clampUrlrefStaySec(-1)).toBe(1)
  })
})
