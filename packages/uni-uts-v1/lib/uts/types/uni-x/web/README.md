# Web Vapor 运行时类型

此目录仅供 Web Vapor 的 UTS 类型检查使用，不影响普通 Web 和 App DOM2。
`@vue/*` 与 `@dcloudio/runtime-vapor-web` 的声明由 `vuejs-core-vapor-web`
生成，当前版本为 Vue 3.6.0-rc.9；`csstype` 为其 runtime-dom 的类型依赖（3.2.3）。

`vue/dist/vue.d.ts` 对应 `uni-h5-vue/dist-x-vapor` 的纯运行时入口，
不包含运行时未提供的模板编译 API。

在 `vuejs-core-vapor-web` 仓库更新类型：

```sh
TARGETS=shared,reactivity,runtime-core,runtime-dom,runtime-vapor,runtime-vapor-web pnpm build-dts
node scripts/sync-types.js
```
