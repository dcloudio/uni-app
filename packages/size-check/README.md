# Size Check

用于检查最小应用发行后的 JS、CSS 体积，包含 Vue 运行时和框架，依赖工作区已构建的最新产物。

- `src` → `dist`：原有 uni-app Web VDOM 基准，保持不变。
- `vapor` → `dist-vapor`：uni-app x Web Vapor 基准，通过 `.vapor` 启用，使用 `uni build` 编译。

执行 `pnpm size` 会分进程构建两者；CI 的全量 `pnpm build` 会先构建依赖，再运行此基准。Vapor 合并异步 JS 和 CSS，避免体积统计遗漏分包。

`size` Action 对比两组产物各自的体积变化；两组项目内容及构建配置不同，不用于横向性能比较。功能开关的裁剪正确性另由 `uni-h5/__tests__/frameworkTreeShaking.spec.ts` 验证。
