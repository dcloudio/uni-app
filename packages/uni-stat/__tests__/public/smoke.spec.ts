/**
 * Phase 1 冒烟测试：验证
 *   1. jest 能正确发现 packages/uni-stat/__tests__/public/ 下的用例。
 *   2. 测试代码可以从 ../../public/* 导入公有版模块（路径与 ts-jest 编译都通）。
 *   3. 公有版常量 STAT_VERSION_PUBLIC 与设计文档一致（'3'）。
 */

import { STAT_VERSION_PUBLIC } from '../../public/config'

describe('uni-stat public smoke', () => {
  test('STAT_VERSION_PUBLIC 等于设计文档约定的 "3"', () => {
    expect(STAT_VERSION_PUBLIC).toBe('3')
  })
})
