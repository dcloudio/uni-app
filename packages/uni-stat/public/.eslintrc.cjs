/**
 * 公有版（packages/uni-stat/public）独立 ESLint 配置。
 *
 * 目的：
 *   1. 物理隔离 —— 禁止 public/* 反向 import 私有版 src/*，避免重构期间双向耦合。
 *   2. 局部生效 —— 只覆盖 public/ 子树，不影响仓库其他包的 ESLint 行为。
 */
module.exports = {
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '../src/*',
          '../../src/*',
          '../../../src/*',
          '**/uni-stat/src/*',
        ],
      },
    ],
  },
}
