import { genSid } from '../../../public/infra/sid'

describe('infra/sid.genSid', () => {
  test('有 uuid：形如 ${uuid}-${ts36}-${4}', () => {
    const sid = genSid('user123')
    const parts = sid.split('-')
    expect(parts.length).toBe(3)
    expect(parts[0]).toBe('user123')
    expect(parts[1]).toMatch(/^[0-9a-z]+$/)
    expect(parts[2].length).toBe(4)
  })

  test('无 uuid：形如 anon-${ts36}-${8}', () => {
    const sid = genSid('')
    const parts = sid.split('-')
    expect(parts.length).toBe(3)
    expect(parts[0]).toBe('anon')
    expect(parts[2].length).toBe(8)
  })

  test('undefined 等价于无 uuid', () => {
    const sid = genSid(undefined)
    expect(sid.startsWith('anon-')).toBe(true)
  })

  test('1000 次调用唯一性 ≥ 99.9%', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 1000; i++) seen.add(genSid('u'))
    // 同一 uuid 同一毫秒并发碰撞概率 1/(36^4)≈6e-7，1000 次冲突几乎不可能
    expect(seen.size).toBeGreaterThanOrEqual(999)
  })
})
