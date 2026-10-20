import { normalizeLengthWithOptions } from '../src/normalize/length'

describe('normalizeLengthWithOptions', () => {
  const normalizeLineHeightLength = normalizeLengthWithOptions({
    extraUnits: ['em'],
  })
  test.each(['16px', '16rpx', '2em'])('保留长度单位 %s', (value) => {
    expect(normalizeLineHeightLength(value, { type: 'uvue' })).toEqual({
      value,
    })
  })

  test.each(['2%', '2rem', 'abc'])('拒绝不支持的长度 %s', (value) => {
    expect(normalizeLineHeightLength(value, { type: 'uvue' }).value).toBeNull()
  })

  test('额外单位由配置决定', () => {
    const normalize = normalizeLengthWithOptions({ extraUnits: ['rem'] })
    expect(normalize('2rem', { type: 'uvue' })).toEqual({ value: '2rem' })
    expect(normalize('2em', { type: 'uvue' }).value).toBeNull()
  })

  test('普通长度不会因属性名为 line-height 而支持 em', () => {
    const normalize = normalizeLengthWithOptions({ property: 'line-height' })
    expect(normalize('2em', { type: 'uvue' }).value).toBeNull()
  })
})
