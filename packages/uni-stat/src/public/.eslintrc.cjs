/**
 * 公有版（packages/uni-stat/src/public）独立 ESLint 配置。
 *
 * 目的：
 *   1. 物理隔离 —— 禁止 src/public/* 反向 import 同包内的私有版（src/core、src/utils、
 *      src/plugin、src/config、src/index 等），避免重构期间双向耦合。
 *   2. 局部生效 —— 只覆盖 src/public/ 子树，不影响仓库其他包的 ESLint 行为。
 *
 * 注：
 *   public 目录已于 v3.0.0 迁移至 src/public，旧 ../src/* 规则在新位置失效，
 *   故改为列出私有版具体兄弟目录前缀。如新增私有版顶级模块，需在此同步登记。
 */
module.exports = {
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          // 同包内的私有版相对路径
          // NOTE：`../config` / `../index` 在 src/public 子树解析的是 *公有版自己* 的
          // src/public/config.ts / src/public/index.ts，**不会**跨到私有版，
          // 因此不能放到屏蔽列表里（会误伤合法导入）。私有版顶层 src/config 等
          // 由下面的 `**/uni-stat/src/config` 绝对路径兜底处理。
          '../core/*',
          '../utils/*',
          '../plugin/*',
          // 任意深度（再深一层）的相对路径兜底
          '../../core/*',
          '../../utils/*',
          '../../plugin/*',
          // 绝对路径兜底（防止从其他子目录用裸路径绕过）
          '**/uni-stat/src/core/*',
          '**/uni-stat/src/utils/*',
          '**/uni-stat/src/plugin/*',
          '**/uni-stat/src/config',
          '**/uni-stat/src/index',
        ],
      },
    ],
  },
}
