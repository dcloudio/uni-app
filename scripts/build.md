# 构建优化说明

构建仍使用 TypeScript 5.4.2 与 `rollup-plugin-typescript2@0.32.0`。编译子进程退出后直接继续，不再固定等待 500ms；显式启用 Node GC 时仍执行回收。`uni-console` 在 `size-check` 前构建，避免基准项目读取旧运行时。

`build.json` 可按输出分组指定相对于包内 tsconfig 的 TypeScript 输入范围：

```json
{
  "transpileInclude": ["src/service", "src/**/*.d.ts"]
}
```

只在 `check === false`、`declaration` 明确为 false、非 watch 时应用该范围；未传 `check` 时保留 rpt2 默认开启检查的行为。它通过 rpt2 的 `tsconfigOverride.include` 合并，不创建额外配置文件，其他编译选项及显式 `files` 保持继承；被导入的跨包源码仍正常解析。rpt2 按下标合并数组，原 include 的额外尾项可能保留；真实插件回归验证所有分组的最终根文件集合，防止意外引入其他入口。

`buildTypeScript.js` 在首次 emit 时保留该范围内的入口、全局脚本、显式声明及间接模块补充，减少其他入口参与分析；磁盘缓存命中时不执行分析。Rollup 别名引入的文件在 emit 时补入。适配器依赖 rpt2 0.32 的同步 `options` 钩子和共享 TypeScript 实例，升级插件时必须重新验证多入口集成测试。

App/Harmony 的 service 定位代码使用高德类型，通过 `src/service/map-types.d.ts` 显式引入已有依赖，避免依赖 view 组件间接提供声明。新增分组必须保留其所需的全局声明和模块补充，并验证产物。

类型检查、声明生成和 watch 保留完整包配置，但完整配置不等于全量检查：原配置在 CI 或 `TRANSPILE_ONLY` 下关闭 rpt2 检查；其他情况下，只有生产构建首个输出开启检查，且仅检查参与转译的文件。`test-dts` 也只覆盖其配置中的类型测试。

rpt2 0.32 原生 JS 缓存存在依赖失效限制：只修改被内联的 `const enum` 或全局声明、调用文件内容不变时，可能复用旧 JS。验证这类变更应清理 rpt2 缓存后构建；本次优化未改变该缓存策略。清缓存和产物对照应在独立检出目录进行。

可用原生 Rollup 计时分析插件耗时（先完成所需前置构建）：

```sh
pnpm exec rollup -c --environment "TARGET:uni-app-plus,NODE_ENV:production" --perf
```
