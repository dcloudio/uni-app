import path from 'path'

import { initEasycom, matchEasycom } from '../src/easycom'

const rootDir = path.resolve(__dirname, 'example')
const dirs = [
  path.resolve(__dirname, 'example/components'),
  path.resolve(__dirname, 'example/uni_modules/plugin/components'),
]

describe('easycom', () => {
  test('initEasycom with dirs', () => {
    expect(initEasycom({ dirs, rootDir })).toEqual([
      {
        pattern: new RegExp('^test$'),
        replacement: '@/components/test/test.vue',
      },
      {
        pattern: new RegExp('^test1$'),
        replacement: '@/components/test1/test1.vue',
      },
      {
        pattern: new RegExp('^test2$'),
        replacement: '@/uni_modules/plugin/components/test2/test2.vue',
      },
    ])
    expect(matchEasycom('test')).toBe('@/components/test/test.vue')
    expect(matchEasycom('test1')).toBe('@/components/test1/test1.vue')
    expect(matchEasycom('test2')).toBe(
      '@/uni_modules/plugin/components/test2/test2.vue'
    )
  })
  test('initEasycom with custom', () => {
    expect(
      initEasycom({ custom: { '^uni-(.*)': '@/components/uni-$1.vue' } })
    ).toEqual([
      {
        pattern: new RegExp('^uni-(.*)'),
        replacement: '@/components/uni-$1.vue',
      },
    ])
    expect(matchEasycom('test')).toBe(false)
    expect(matchEasycom('uni-test1')).toBe('@/components/uni-test1.vue')
  })
  test('initEasycom with dirs and custom', () => {
    expect(
      initEasycom({
        dirs,
        rootDir,
        custom: { '^test$': '@/components/uni-test.vue' },
      })
    ).toEqual([
      {
        pattern: new RegExp('^test$'),
        replacement: '@/components/uni-test.vue',
      },
      {
        pattern: new RegExp('^test1$'),
        replacement: '@/components/test1/test1.vue',
      },
      {
        pattern: new RegExp('^test2$'),
        replacement: '@/uni_modules/plugin/components/test2/test2.vue',
      },
    ])
    expect(matchEasycom('test')).toBe('@/components/uni-test.vue')
  })
})
