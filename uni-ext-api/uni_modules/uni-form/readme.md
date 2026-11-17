# uni-form
### 开发文档
[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
[UTS 组件插件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
[Hello UTS](https://gitcode.net/dcloud/hello-uts)

### input / textarea appearance (Android、iOS、鸿蒙)

明亮模式不设置主题默认文字色，使用原生控件默认值；暗黑模式的默认文字色为
`#D1D1D1`，并同步到原生编辑控件，即使没有传入 `class` 或 `style` 也会生效。
显式设置的 `color` 优先，移除后恢复当前主题的默认值。从暗黑切回明亮时，
清除主题颜色覆盖并恢复原生默认值。

input、textarea 默认无边框，两种主题下的背景均透明。placeholder 明亮模式为
`#808080`，暗黑模式为 `#5f5f5f`，禁用时保持不变；`placeholder-class` 和
`placeholder-style` 可覆盖默认样式。

iOS、鸿蒙的 input、textarea 支持通过 CSS `caret-color` 设置光标颜色，支持 CSS 变量和媒体查询。
同时设置 `cursor-color` 时优先使用该属性；移除后回退到 `caret-color`，两者均未设置时恢复系统默认光标颜色。

回归检查：`node --test src/uni_modules/uni-form/__tests__/editor-color.test.cjs`。
