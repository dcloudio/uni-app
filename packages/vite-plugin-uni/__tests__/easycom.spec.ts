import path from 'path'

import { initEasycoms, matchEasycom } from '../src/utils'

const rootDir = path.resolve(__dirname, 'example')

describe('easycom', () => {
  test('initEasycom with dirs', () => {
    expect(initEasycoms(rootDir, 'h5').easycoms).toEqual([
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
      {
        pattern: new RegExp('^uni-(.*)'),
        replacement: '@/components/uni-$1.vue',
      },
    ])
    expect(matchEasycom('test')).toBe('@/components/test/test.vue')
    expect(matchEasycom('test1')).toBe('@/components/test1/test1.vue')
    expect(matchEasycom('test2')).toBe(
      '@/uni_modules/plugin/components/test2/test2.vue'
    )
    expect(matchEasycom('uni-test1')).toBe('@/components/uni-test1.vue')
  })
})
