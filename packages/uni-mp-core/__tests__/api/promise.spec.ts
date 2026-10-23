import { promisify, shouldPromise } from '../../src/api/promise'

describe('api promise', () => {
  test('保持 loadUasm 自身的 Promise 语义', () => {
    const originalX = global.__X__
    global.__X__ = true
    const loadUasm = jest.fn(() => Promise.resolve({ value: 1 }))

    try {
      expect(shouldPromise('loadUasm')).toBe(false)
      expect(promisify('loadUasm', loadUasm)).toBe(loadUasm)
    } finally {
      global.__X__ = originalX
    }
  })

  test('非 uni-app x 不改变同名平台 API 的 Promise 包装', () => {
    expect(shouldPromise('loadUasm')).toBe(true)
  })
})
