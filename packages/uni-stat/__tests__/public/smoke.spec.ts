/**
 * Phase 1 冒烟测试：验证
 *   1. jest 能正确发现 packages/uni-stat/__tests__/public/ 下的用例。
 *   2. 测试代码可以从 ../../src/public/* 导入公有版模块（路径与 ts-jest 编译都通）。
 *   3. 公有版常量 STAT_VERSION_PUBLIC 直接取 `process.env.UNI_COMPILER_VERSION`
 *      （uni-app 编译器版本号），与权威参数文档 `docs/uni统计上报参数.md` 中
 *      `usv: "4.24"` 的语义对齐；jest 默认环境下取不到时回退为空串。
 *
 *   注意：jest 不在仓库根 jest.config.js 之外注入 `UNI_COMPILER_VERSION`，
 *   本测试只校验"取值同源"，不校验具体字符串。真实工程由 uni-cli 在 vite
 *   `define` 阶段注入字面量，运行时一定有值。
 */

import { STAT_VERSION_PUBLIC } from '../../src/public/config'

describe('uni-stat public smoke', () => {
  test('STAT_VERSION_PUBLIC 取自 process.env.UNI_COMPILER_VERSION（uni-app 编译器版本）', () => {
    expect(STAT_VERSION_PUBLIC).toBe(process.env.UNI_COMPILER_VERSION || '')
    expect(typeof STAT_VERSION_PUBLIC).toBe('string')
  })
})
