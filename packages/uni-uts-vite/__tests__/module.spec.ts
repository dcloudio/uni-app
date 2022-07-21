import { normalizeArg } from '../module'

describe('uts-module', () => {
  test('normalize args', () => {
    expect(normalizeArg(1)).toBe(1)
    expect(normalizeArg('hello')).toBe('hello')
    expect(normalizeArg(true)).toBe(true)
    expect(normalizeArg({ callback: () => {} })).toEqual({
      callback: 1,
    })
    expect(
      normalizeArg({ success: () => {}, fail: () => {}, complete: () => {} })
    ).toEqual({
      success: 2,
      fail: 3,
      complete: 4,
    })
    expect(
      normalizeArg({
        user: {
          name: 'test',
          age: 10,
          callback() {},
        },
        success() {},
      })
    ).toEqual({
      user: {
        name: 'test',
        age: 10,
        callback: 5,
      },
      success: 6,
    })
  })
})
