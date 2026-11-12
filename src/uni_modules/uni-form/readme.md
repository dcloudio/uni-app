# uni-form
### 开发文档
[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
[UTS 组件插件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
[Hello UTS](https://gitcode.net/dcloud/hello-uts)

### input / textarea appearance (iOS、鸿蒙)

暗黑模式的默认文字色为 `#ffffff`，表单背景为 `#3b3b3b`。背景通过
`prefers-color-scheme` 媒体查询切换，文字色同时同步到原生编辑控件；即使没有
传入 `class` 或 `style` 也会生效。显式设置的 `color` 优先，移除后恢复当前主题
的默认值。浅色模式默认背景为 `#ffffff`，文字为 `#000000`。placeholder 在两种主题下
均为 `#757575`。

iOS、鸿蒙的 input、textarea 支持通过 CSS `caret-color` 设置光标颜色，支持 CSS 变量和媒体查询。
同时设置 `cursor-color` 时优先使用该属性；移除后回退到 `caret-color`，两者均未设置时恢复系统默认光标颜色。

回归检查：`node --test src/uni_modules/uni-form/__tests__/editor-color.test.cjs`。
