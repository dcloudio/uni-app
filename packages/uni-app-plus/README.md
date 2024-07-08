# @dcloudio/uni-app-plus

uni-app 处理 App。

包含 `uni-app-x` 内置 api/components 等逻辑

## 项目结构

本身是一个 vite 项目，存在 `vite.config.ts` 和 `x.vite.config.ts` 两个配置文件。

### 处理 `uni-app-x`

通过 `node scripts/build.js uni-app-plus` 运行编译时候，会通过 `vite build --config x.vite.config.ts`

最终得到 `dist/uni.x.runtime.esm.js`，后续其他项目会依赖产物进一步处理。

## 参与贡献

### uni-app-x

如果你想参与到 `uni-app-x` 的贡献中，你可以着重了解 `src/x` 目录。
