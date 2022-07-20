import { normalizeArg } from '../module'

describe('uts-module', () => {
  test('normalize args', () => {
    expect(normalizeArg(1)).toBe(1)
    expect(normalizeArg('hello')).toBe('hello')
    expect(normalizeArg(true)).toBe(true)
    expect(normalizeArg({ callback: () => {} })).toEqual({
      callback: { $$type: 'function', value: 1 },
    })
    expect(
      normalizeArg({ success: () => {}, fail: () => {}, complete: () => {} })
    ).toEqual({
      success: { $$type: 'function', value: 2 },
      fail: { $$type: 'function', value: 3 },
      complete: { $$type: 'function', value: 4 },
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
        callback: {
          $$type: 'function',
          value: 5,
        },
      },
      success: {
        $$type: 'function',
        value: 6,
      },
    })
  })
})
