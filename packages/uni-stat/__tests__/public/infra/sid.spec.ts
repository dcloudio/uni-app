import { genSid } from '../../../src/public/infra/sid'

describe('infra/sid.genSid', () => {
  test('有 did（uuid）：形如 ${did}-xxxxxxxx-xxxx', () => {
    const sid = genSid('1777261806777339018')
    expect(sid.startsWith('1777261806777339018-')).toBe(true)
    const rest = sid.slice('1777261806777339018-'.length)
    expect(rest).toMatch(/^[0-9a-z]{8}-[0-9a-z]{4}$/)
  })

  test('短 uuid：仍拼接标准后缀', () => {
    const sid = genSid('user123')
    expect(sid.startsWith('user123-')).toBe(true)
    const rest = sid.slice('user123-'.length)
    expect(rest).toMatch(/^[0-9a-z]{8}-[0-9a-z]{4}$/)
  })

  test('无 uuid：数字主体 + 同形后缀', () => {
    const sid = genSid('')
    expect(sid).toMatch(/^\d+-[0-9a-z]{8}-[0-9a-z]{4}$/)
  })

  test('undefined 等价于无 uuid', () => {
    const sid = genSid(undefined)
    expect(sid).toMatch(/^\d+-[0-9a-z]{8}-[0-9a-z]{4}$/)
  })

  test('1000 次调用唯一性 ≥ 99.9%', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 1000; i++) seen.add(genSid('u'))
    expect(seen.size).toBeGreaterThanOrEqual(999)
  })
})
