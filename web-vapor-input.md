# Web Vapor Input 单根重构属性、方法与事件实现

本文以当前 Web Vapor Input 的源码和 Web 执行路径为准，属性标题采用模板写法。组件只渲染一个 `<input uni-input>`，`rootRef` 和 `fieldRef` 都指向这个节点。 [组件入口](./packages/uni-components/src/vue/input/index-vapor.tsx#L39) · [属性处理](./packages/uni-components/src/vue/input/useInput.ts#L20)

## `name`

类型为 `String`，默认值为 `''`。组件从 `UNI_FORM_CTX` 获取 `uni-form` 上下文，有非空名称时注册字段。表单通过字段的 `getValue()` 读取最新的组件状态 `state.value`，通过 `reset()` 写回字段注册前保存的初始值。改名时先注销旧名称再注册新名称，清空名称或卸载时注销字段。独立使用 Input 时会跳过注册。 [表单字段注册](./packages/uni-components/src/helpers/form-vapor.ts#L32)

`name` 由 uni 表单协议消费，组件模板没有把它绑定到原生 `input.name`。因此设置这个属性会影响 `uni-form` 的字段键，原生表单序列化仍依据真正的 HTML `name`。组件的 `getAttribute('name')` 优先读取已声明的 prop。 [单根模板](./packages/uni-components/src/vue/input/index-vapor.tsx#L121) · [属性读取](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L23093)

## `model-value`

对应 `modelValue`，接受 `String` 或 `Number`，没有显式默认值。模板中的 `v-model` 通过该属性传值。初始化时，只要传入的 `modelValue` 不是 `undefined`，它就优先于 `value`。例如 `modelValue=""` 会保持空值。初始值转换为字符串，并按有效的 `maxlength` 截断。 [初始值计算](./packages/uni-components/src/helpers/useField.ts#L61) · [优先级](./packages/uni-components/src/helpers/useField.ts#L239)

挂载后，`modelValue` 和 `value` 各自被监听，统一进入 100 ms 节流的外部值同步逻辑。用户输入时，组件从原生节点读取最新值，按 100 ms 节流派发 `update:modelValue`、`update:value` 和 `input`。输入流程会取消等待中的外部值写回，以免覆盖刚输入的内容。 [值和事件同步](./packages/uni-components/src/helpers/useField.ts#L295) · [节流实现](./packages/uni-components/src/helpers/throttle.ts#L1)

## `value`

接受 `String` 或 `Number`，没有显式默认值，可用 `v-model:value` 双向同步。初始挂载时，在 `modelValue` 缺省的情况下使用 `value`，两个属性都缺省时以空字符串开始。外部更新经过同一套字符串转换和长度处理。原始 `type` 为 `number` 且传入值无法转为数字时，组件状态使用空字符串。用户输入会发出 `update:value`。 [值转换](./packages/uni-components/src/helpers/useField.ts#L61) · [初始化与同步](./packages/uni-components/src/helpers/useField.ts#L239)

在最小 Web Vapor SSR 用例中，Input 的服务端正文只输出注释节点 `<!---->`。客户端接管时发现节点不匹配，重新创建输入框并设置初始值。 [组件返回值](./packages/uni-components/src/vue/input/index-vapor.tsx#L162) · [服务端处理](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L8684) · [客户端节点匹配](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L11375)

客户端用独立的 `renderEffect` 调用 `setValue(root, state.value)`，只跟踪值与生效的原生类型。这样会在类型切换后重新应用受控值，同时更新占位文字、类或样式时会保留通过 `ref.value` 直接写入的原生值。直接赋值本身只改变 DOM 值，业务状态在输入处理或外部值同步时更新。 [独立值同步](./packages/uni-components/src/vue/input/index-vapor.tsx#L155) · [原生输入处理](./packages/uni-components/src/helpers/useField.ts#L487)

输入法组字期间，组件继续读取原生输入框的当前值，延迟同步业务 `input` 和双向绑定的更新事件。组字结束时处理最终值，组字结束前失焦则提交当时的值。 [原生输入处理](./packages/uni-components/src/helpers/useField.ts#L487) · [组字与失焦处理](./packages/uni-components/src/helpers/useField.ts#L504)

## `type`

类型为 `String`，默认值为 `text`。运行时计算原生 `input.type`，映射如下。 [类型计算](./packages/uni-components/src/vue/input/useInput.ts#L89)

| 组件属性                                       | 原生 `input.type`                                    |
| ---------------------------------------------- | ---------------------------------------------------- |
| `text`                                         | `confirm-type="search"` 时为 `search`，其余为 `text` |
| `idcard`、`none`                               | `text`                                               |
| `digit`                                        | `number`                                             |
| `number`、`password`、`tel`、`search`、`email` | 对应的原生类型                                       |
| 其他值，例如 `url`                             | `text`                                               |

`password` 开启时优先使用原生 `password`。`inputmode` 根据原始 `type` 或显式传入值独立计算，因此 `type="url"` 仍可以请求 URL 键盘。仅当原始 `type` 为 `number` 且未进入 Safari 只读兼容分支时，根节点会绑定 `pattern="[0-9]*"`。 [类型与键盘模式](./packages/uni-components/src/vue/input/useInput.ts#L89) · [原生属性绑定](./packages/uni-components/src/vue/input/index-vapor.tsx#L137)

组件对 `number` 和 `digit` 使用固定的原生步长 `0.000000000000000001`，继续由浏览器进行数值有效性检查。 [原生步长绑定](./packages/uni-components/src/vue/input/index-vapor.tsx#L136)

类型变化直接更新同一个原生节点。浏览器可能在切成 `number` 时清空无效文本，客户端值同步会重新应用 `state.value`，再由原生类型决定如何显示。对比属性时，`ref.type` 是原生类型，`ref.getAttribute('type')` 优先返回组件传入的类型。 [客户端值同步](./packages/uni-components/src/vue/input/index-vapor.tsx#L155) · [属性读取](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L23093)

## `password`

接受 `Boolean` 或 `String`，默认值为 `false`。开启时优先将原生类型设为 `password`，遮蔽文字由浏览器负责。关闭后恢复由 `type` 和 `confirm-type` 算出的类型。切换时复用根节点，`value` 仍按组件状态同步。键盘模式继续根据原始 `type` 或显式 `inputmode` 计算。 [密码类型优先级](./packages/uni-components/src/vue/input/useInput.ts#L112) · [根节点更新](./packages/uni-components/src/vue/input/index-vapor.tsx#L121)

## `maxlength`

接受 `Number` 或 `String`。Web Vapor 的默认值为 `Infinity`。共享逻辑用 `Number()` 转换输入，负数或无法转换的值代表无限制，其余值向下取整。初始值、外部值同步和有效长度变化都会按长度截断 `state.value`。Input 还保留了监听原始属性并通过 `parseInt()` 进行截断的路径。根节点同时绑定原生 `maxlength`，受支持的文本输入类型会由浏览器限制输入。 [长度计算与同步](./packages/uni-components/src/helpers/useField.ts#L229) · [原始属性变化](./packages/uni-components/src/vue/input/useInput.ts#L221) · [原生绑定](./packages/uni-components/src/vue/input/index-vapor.tsx#L135)

`number` 和 `digit` 渲染为原生 `type="number"` 时，浏览器不会应用 `maxlength` 的编辑限制。Web Vapor 跳过共享的旧数字校验分支。模板监听会尝试截断超长粘贴并写入字段状态，随后共享监听从原生节点读取完整值，覆盖字段状态并向 `@input` 和双向绑定派发完整值。设置 `maxlength="2"` 后模拟粘贴 `12345`，输入框和回调仍得到 `12345`。 [数字校验分支](./packages/uni-components/src/vue/input/useInput.ts#L146) · [模板截断逻辑](./packages/uni-components/src/vue/input/useInput.ts#L260) · [共享输入监听](./packages/uni-components/src/helpers/useField.ts#L487)

## `inputmode`

uni-app x 官方自 5.0 起将 `inputmode` 标为废弃，推荐使用 `type`。Web Vapor 为兼容已有用法继续接受 `inputmode`，显式传值时优先于 `type` 推导。 [官方属性说明](https://doc.dcloud.net.cn/uni-app-x/component/input.html#属性) · [键盘模式计算](./packages/uni-components/src/vue/input/useInput.ts#L119)

类型为 `String`，默认未设置。声明的可选值是 `none`、`text`、`decimal`、`numeric`、`tel`、`search`、`email` 和 `url`。未传入 `inputmode` 时，若原始 `type` 本身是可选键盘模式就直接使用，否则按 `number → numeric`、`digit → decimal`、`idcard → text` 映射。无匹配时交由浏览器决定。 [可选值](./packages/uni-components/src/helpers/useField.ts#L78) · [类型映射](./packages/uni-components/src/vue/input/useInput.ts#L124)

结果写入同一原生节点的 `inputmode`。例如 `inputmode="none"` 提示浏览器无需显示软键盘。控件是否可编辑由 `disabled` 等属性决定，最终键盘布局由浏览器和输入法决定。 [原生绑定](./packages/uni-components/src/vue/input/index-vapor.tsx#L142)

## `disabled`

接受 `Boolean` 或 `String`，默认值为 `false`。普通分支将其按布尔值绑定到原生 `disabled`，禁用交互由浏览器负责。禁用时组件优先处理原生 `disabled` 及其透传别名，重新启用后恢复业务透传。根节点样式保留禁用状态的文字颜色和光标继承。 [禁用绑定](./packages/uni-components/src/vue/input/index-vapor.tsx#L131) · [原生禁用样式](./packages/uni-h5/style/vapor/input.css#L128)

客户端检测到 `navigator.vendor` 以 `Apple` 开头且支持 `image-orientation: from-image` 时，会把禁用状态实现为 `readonly` 与 `tabindex="-1"`，用于保留既有的 Safari 禁用文字颜色兼容处理。禁用期间这两个属性以组件设置为准，重新启用后恢复透传。切换为只读或只读节点收到焦点时会主动失焦。只读兼容分支跳过 Enter 确认处理，并省略组件生成的 `enterkeyhint`、`pattern` 和 `autocomplete`。动态启用或禁用直接更新原生根节点。模板上的输入补充监听见 [`@input`](#input)。 [Safari 分支检测](./packages/uni-components/src/helpers/useField.ts#L570) · [原生属性透传](./packages/uni-components/src/vue/input/index-vapor.tsx#L86)

## `auto-focus`

对应 `autoFocus`，接受 `Boolean` 或 `String`，默认值为 `false`。这是保留的历史属性。挂载时根据 `autoFocus || focus` 判断是否需要聚焦，在下一次 `nextTick` 调用同一原生节点的 `focus()`。它没有绑定 HTML `autofocus`，动态聚焦和失焦由 `focus` 属性驱动。 [焦点实现](./packages/uni-components/src/helpers/useField.ts#L361)

## `focus`

接受 `Boolean` 或 `String`，默认值为 `false`。初始值参与挂载聚焦。挂载后，变化为真时调用原生 `focus()`，变化为假时调用 `blur()`。共享监听器收到原生焦点事件后，更新组件的焦点状态并发出 `focus` 或 `blur`。只有组件状态实际变化时，watcher 才发出用于 `v-model:focus` 的 `update:focus`。焦点事件携带当前值，失焦事件额外携带光标位置。 [焦点状态监听](./packages/uni-components/src/helpers/useField.ts#L263) · [焦点命令](./packages/uni-components/src/helpers/useField.ts#L361) · [原生事件处理](./packages/uni-components/src/helpers/useField.ts#L475)

焦点事件还会应用光标和选区配置。同一个原生节点承担受控焦点和实际编辑，`ref.focus()`、`ref.blur()` 直接使用平台方法。 [选区应用](./packages/uni-components/src/helpers/useField.ts#L478) · [原生元素类型](./packages/uni-components/src/vue/input/element-vapor.ts#L5)

## `cursor`

接受 `Number` 或 `String`，默认值为 `-1`。使用 `Number()` 转换，无法转换时使用 `-1`。聚焦事件或 `cursor` 变化时，只有当前处于聚焦状态、`cursor > -1`、两个选区端点都小于零且原生节点支持 `selectionStart` 时才应用。写入时让 `selectionStart` 和 `selectionEnd` 都等于 `cursor`，表示一个折叠的光标位置。 [数值转换](./packages/uni-components/src/helpers/useField.ts#L217) · [光标定位](./packages/uni-components/src/helpers/useField.ts#L455)

## `selection-start`

对应 `selectionStart`，接受 `Number` 或 `String`，默认值为 `-1`。使用 `Number()` 转换，无法转换时回退到 `-1`。当节点聚焦、两个端点都大于 `-1` 且浏览器支持文本选区时，把该值写到原生节点的 `selectionStart`。获得焦点及任一端点变化时都会重新检查。 [端点转换](./packages/uni-components/src/helpers/useField.ts#L217) · [选区写入与监听](./packages/uni-components/src/helpers/useField.ts#L442)

## `selection-end`

对应 `selectionEnd`，接受 `Number` 或 `String`，默认值为 `-1`。它与 `selection-start` 成对生效。在符合条件时先写原生 `selectionStart`，再写 `selectionEnd`，范围由浏览器按当前文本处理。原生 `number` 控件通常不提供文本选区，此时组件跳过选区写入，输入和失焦事件中的 `detail.cursor` 取 `null`。 [选区与事件游标](./packages/uni-components/src/helpers/useField.ts#L442)

## `cursor-color`

对应 `cursorColor`，类型为 `String`，默认值为 `''`。传入非空值时，组件将其转成根节点的内联 `caret-color`。业务 `style` 同时设置 `caretColor` 或 `caret-color` 时，组件属性优先。清空 `cursor-color` 后，光标颜色由业务样式和 CSS 层叠决定。 [光标颜色样式](./packages/uni-components/src/vue/input/index-vapor.tsx#L107)

## `placeholder`

类型为 `String`，默认值为 `''`。直接绑定原生 `placeholder`，显示和隐藏取决于浏览器中的实际输入值与编辑状态。`::placeholder` 继承输入框字体，默认颜色为 `rgba(60, 60, 67, 0.3)`。项目启用 `darkmode` 且系统偏好深色时，占位文字的默认颜色为 `rgba(255, 255, 255, 0.35)`。更新占位文字时，组件改写根节点上的 `placeholder` 属性。 [原生占位文字](./packages/uni-components/src/vue/input/index-vapor.tsx#L128) · [默认占位样式](./packages/uni-h5/style/vapor/input.css#L78) · [深色样式过滤](./packages/uni-cli-shared/src/postcss/plugins/uniapp.ts#L136)

## `placeholder-class`

对应 `placeholderClass`，类型为 `String`，Input 默认值为 `input-placeholder`。组件保留传入的属性原值，把空格分隔的类名各自映射为根节点上的内部占位类。例如 `hint` 生成 `uni-input-ph-hint`。动态更新只切换类。来自父组件的外部类作用域前缀只在生成内部类时处理，`getAttribute('placeholder-class')` 仍读组件接收到的原值。 [默认值](./packages/uni-components/src/vue/input/useInput.ts#L21) · [类名映射](./packages/uni-components/src/helpers/useInputStyles.ts#L17) · [属性读取](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L23093)

Web Vapor 的 PostCSS 在保留业务原规则的同时，将符合条件的类规则生成为 `::placeholder` 规则。例如 `.hint { color: red }` 会额外生成 `.uni-input-ph-hint:where([uni-input])::placeholder` 对应的颜色规则。普通类、scoped 类和常规后代选择器可以参与转换。原生 CSS 嵌套按父选择器展开占位规则，并保留嵌套条件与声明顺序。对不支持 `:is()` 的旧内核，回退会展开简单父选择器列表。对于 `#email .hint` 或 `.field[data-state="invalid"] .hint`，转换同时保留真实祖先匹配，并允许这些条件匹配到 Input 根节点。运行时可在已编译的占位类之间切换。生成的占位类规则只在旧浏览器回退中保留 Autoprefixer 生成的占位伪元素前缀。转换跳过 H5 框架内置样式，也不会自动迁移依赖旧占位节点父子关系、末端复杂伪类或未经该编译流程的样式。 [转换调用](./packages/uni-cli-shared/src/postcss/plugins/uniapp.ts#L219) · [选择器生成](./packages/uni-cli-shared/src/postcss/plugins/vaporInputStyles.ts#L236) · [声明筛选](./packages/uni-cli-shared/src/postcss/plugins/vaporInputStyles.ts#L389) · [规则来源](./packages/uni-cli-shared/src/postcss/plugins/vaporInputStyles.ts#L337)

## `placeholder-style`

对应 `placeholderStyle`，类型为 `String`，默认值为 `''`。实现把样式字符串转换成只作用于 `::placeholder` 的规则。处理时先转换 `rpx`、`upx` 再解析 CSS 声明，保留允许的颜色、字体、文本和背景属性及合法的自定义属性。过滤后的普通声明和 `!important` 声明分开输出，各自保留顺序和重复声明，让浏览器继续处理回退和层叠。旧占位元素的布局属性，例如 `padding`，不在转换范围内。 [声明转换](./packages/uni-shared/src/dom2/inputStyle.ts#L33) · [允许的属性](./packages/uni-shared/src/dom2/inputStyle.ts#L144)

有效声明生成稳定的样式键，根节点使用 `uni-input-style-<key>` 匹配规则。同一种样式在一个文档中复用同一份 `<style>`，动态更新或卸载时释放对应引用，最后一个使用者离开后删除规则。 [样式挂载](./packages/uni-components/src/helpers/useInputStyles.ts#L30) · [复用和清理](./packages/uni-components/src/helpers/inputStyleSheet.ts#L9)

服务端按请求收集占位样式，将去重后的规则写入首屏 `head`。最小对照用例中，客户端重新创建输入框后复用了同键的 `<style>`。运行时创建样式时会使用页面已有的 Vite CSP nonce。SSR 响应只替换原模板中的标记，已插入的样式文本按原样保留。 [SSR 样式输出](./packages/uni-h5-vite/lib/ssr/entry-server.js#L89) · [客户端样式复用](./packages/uni-components/src/helpers/inputStyleSheet.ts#L13) · [模板替换](./packages/vite-plugin-uni/src/cli/server.ts#L63)

普通内联占位声明输出在占位类样式层之外，内联 `!important` 声明输出在优先声明的专用层里。浏览器不支持 CSS 层叠层时，默认样式、占位类样式和内联占位样式通过 `@supports not (color: revert-layer)` 下的层外规则生效。生成的规则目标是原生占位伪元素，输入值文字的样式继续由根节点的 CSS 决定。 [规则序列化](./packages/uni-shared/src/dom2/inputStyle.ts#L62) · [层叠层顺序](./packages/uni-h5/style/framework/uvue-vapor.css#L7) · [默认样式回退](./packages/uni-h5/style/vapor/input.css#L94) · [占位类回退](./packages/uni-cli-shared/src/postcss/plugins/vaporInputStyles.ts#L329)

## `confirm-type`

对应 `confirmType`，类型为 `String`，默认值为 `done`。一般通过原生 `enterkeyhint` 提示软键盘的确认键样式，具体显示由浏览器和输入法决定。当 `type="text"` 且 `password` 未开启时，`confirm-type="search"` 会将原生输入类型改为 `search`。原生搜索装饰和清除按钮由样式隐藏。Safari 只读禁用分支省略确认键提示。 [搜索类型映射](./packages/uni-components/src/vue/input/useInput.ts#L91) · [确认键绑定](./packages/uni-components/src/vue/input/index-vapor.tsx#L137) · [搜索控件样式](./packages/uni-h5/style/vapor/input.css#L112)

`confirm-type="search"` 时，组件忽略透传的 `form`，原生根节点保持 `form=""`，使搜索框与外层 HTML 表单解除关联。此时按 Enter 不会从这个输入框隐式提交外层表单。切回其他确认模式后，`form` 照常透传，表单归属由浏览器决定。单独设置 `type="search"` 不触发表单隔离。 [透传过滤](./packages/uni-components/src/vue/input/index-vapor.tsx#L86) · [搜索表单关联](./packages/uni-components/src/vue/input/index-vapor.tsx#L130) · [确认事件](#confirm)

## `confirm-hold`

对应 `confirmHold`，类型为 `Boolean`，默认值为 `false`。组件在派发 `confirm` 后读取这个属性。值为 `false` 时调用原生 `blur()`，值为 `true` 时跳过该调用。 [确认与失焦](./packages/uni-components/src/vue/input/useInput.ts#L240)

## `id`

由 Vue Vapor 透传到原生根节点，可用来定位组件的实际输入框。选择器和模板 ref 因此指向同一个 DOM 节点，节点同时具有 `uni-input` 标记与 Input 的逻辑身份。 [根节点定义](./packages/uni-components/src/vue/input/index-vapor.tsx#L45) · [元素身份](./packages/uni-components/src/vue/input/element-vapor.ts#L5)

## `class`

业务类合并到原生根节点。内部同时保留 `uni-input-input`，并按需增加由 `placeholder-class` 和 `placeholder-style` 生成的类。编译器把组件标签选择器 `input` 映射为 `input:where([uni-input])`，保留原有标签权重。scoped 标记也落在根节点上。 [根节点类](./packages/uni-components/src/vue/input/index-vapor.tsx#L65) · [标签映射](./packages/uni-cli-shared/src/postcss/plugins/uniapp.ts#L70) · [作用域标记](./packages/uni-components/src/helpers/useScopedAttrs.ts#L6)

## `style`

业务内联样式合并到原生根节点，作用于实际编辑框。组件根据实际布局父级决定是否补偿宽度，并跳过 `display: contents` 容器。使用默认对齐的普通块容器内，未显式设置宽度的 Input 填满可用宽度。Grid 和 Flex 继续使用父级对齐，支持块级对齐的浏览器也保留普通块父级的显式对齐。旧浏览器使用 `-moz-available` 或 `-webkit-fill-available` 补偿块宽度，并允许 Input 在横向 Flex 中收缩。 [布局父级识别](./packages/uni-components/src/helpers/useInputLayout.ts#L32) · [宽度补偿](./packages/uni-h5/style/vapor/input.css#L26)

## `data-*`

业务数据属性由 Vapor 写到原生根节点。带 `uni-input` 标记的 `HTMLInputElement` 通过安装的 getter 暴露 uni 的 `dataset` Map 语义，组件收到的对象值可以通过 `dataset.get(key)` 读取。原生属性读写和业务 Map 分开维护。 [dataset 适配](./packages/uni-shared/src/dom/vaporDataset.ts#L10)

## 方法

组件挂载后，模板 ref 直接返回带 `uni-input` 标记的 `HTMLInputElement`。节点保留 `UniInputElement` 的逻辑类型，`focus()`、`blur()` 等公开方法见 uni-app x 的 `UniElement` 文档。 [元素类型](./packages/uni-components/src/vue/input/element-vapor.ts#L5) · [模板 ref 取值](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L22213) · [UniInputElement 文档](https://doc.dcloud.net.cn/uni-app-x/api/dom/uniinputelement.html) · [UniElement 方法文档](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#unielement-methods)

Web 上的原生选区、校验和点击方法按 `HTMLInputElement` 的语义执行。例如，普通禁用分支使用原生 `disabled`，浏览器会抑制对该节点的 `click()`。 [禁用绑定](./packages/uni-components/src/vue/input/index-vapor.tsx#L131) · [HTML click 规范](https://html.spec.whatwg.org/multipage/interaction.html#dom-click-dev)

组件实例通过 `expose` 提供内部的 `$triggerInput`，依次派发 `update:modelValue`、`update:value` 并写入字段状态。表单的 `getValue()` 和 `reset()` 通过字段注册协议交给 `uni-form`。 [实例内部值更新](./packages/uni-components/src/vue/input/useInput.ts#L252) · [表单字段](./packages/uni-components/src/helpers/form-vapor.ts#L32)

### `focus()`

通过 `inputRef.value?.focus()` 直接调用原生输入框的方法。Web JavaScript 传入的 `FocusOptions` 由浏览器处理。共享监听器收到原生 `focus` 时，将组件焦点状态设为 `true`、派发 `focus`，再按属性设置光标和选区。普通禁用状态由浏览器阻止聚焦，Safari 只读兼容分支收到焦点时会主动失焦。 [焦点事件与选区](./packages/uni-components/src/helpers/useField.ts#L478) · [Safari 只读分支](./packages/uni-components/src/vue/input/index-vapor.tsx#L144) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#focus)

### `blur()`

通过 `inputRef.value?.blur()` 让当前输入框失焦。旧版的 ref 指向外层容器，对容器调用 `blur()` 无法让内部输入框失焦。单根实现的 ref 就是实际聚焦的节点，因此原生调用会进入共享的失焦处理。组字尚未结束时先提交当时的值，再把组件焦点状态设为 `false` 并派发带有值和光标位置的 `blur` 事件。 [失焦处理](./packages/uni-components/src/helpers/useField.ts#L504) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#blur)

### `getAttribute()`

初始化节点时，Vapor 安装组件属性读取方法。它先把属性名转换为驼峰命名，再查找组件声明的属性。已声明属性的值为 `null` 或 `undefined` 时，以及属性未声明时，调用原生 `Element.getAttribute()`。其余值转为字符串返回，空字符串也会保留。比如传入 `type="digit"` 时，`getAttribute('type')` 返回 `'digit'`，浏览器实际使用的 `input.type` 是 `'number'`。 [初始化与读取](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L23081) · [类型映射](./packages/uni-components/src/vue/input/useInput.ts#L89) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#getattribute)

### `setAttribute()`

该方法直接设置原生输入框的 DOM 属性，组件的 prop 值由模板绑定管理。模板绑定变化时，Vue 会按新值更新对应的 DOM 属性。原生属性变化也可能触发组件监听的浏览器事件。例如，在 Chrome 中对聚焦的输入框调用 `setAttribute('disabled', '')`，会触发原生失焦并派发组件的 `blur` 事件。 [原生属性绑定](./packages/uni-components/src/vue/input/index-vapor.tsx#L121) · [失焦处理](./packages/uni-components/src/helpers/useField.ts#L504) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#setattribute)

### `hasAttribute()`

浏览器检查根节点上是否存在指定的 DOM 属性。例如，`hasAttribute('uni-input')` 读取组件标记。组件声明和 DOM 属性是两套数据，因此 `getAttribute()` 读到一个组件属性时，`hasAttribute()` 仍以 DOM 上是否存在该属性为准。 [根节点标记](./packages/uni-components/src/vue/input/index-vapor.tsx#L122) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#hasattribute)

### `removeAttribute()`

浏览器从原生输入框上移除指定的 DOM 属性。组件声明的值仍由 Vue 管理，`getAttribute()` 读到的组件属性值受模板绑定控制。 [组件属性读取](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L23093) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#removeattribute)

### `getBoundingClientRect()`

直接调用浏览器原生方法，同步返回输入框相对于视口的 `DOMRect`。测量对象随 ref 从旧版外层容器变为原生输入框，因此返回值取决于当前输入框自身的盒子。 [根节点定义](./packages/uni-components/src/vue/input/index-vapor.tsx#L121) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#getboundingclientrect)

### `getBoundingClientRectAsync()`

Web Vapor 入口把公共实现装到 `HTMLInputElement.prototype`。实现读取同一节点的 `getBoundingClientRect()`。省略参数时返回一个以 `DOMRect` 为结果的 Promise。传入回调对象时，依次调用已提供的 `success(rect)`、`complete(rect)`，该调用形式返回 `undefined`。两种形式都在调用时读取布局。 [原型安装](./packages/uni-components/src/vue/web-vapor-elements.ts#L115) · [公共实现](./packages/uni-components/src/helpers/UniElement-vapor.ts#L14) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#getboundingclientrectasync)

### `getPage()`

这是官方已废弃的公共方法，现有实现兼容保留。它从根节点向祖先查找 `uni-page`，找不到时再查找 `uni-page-body`，从登记表读取页面对象。未找到已登记的页面时返回 `null`。`uniPage` 属性的 getter 复用同一查找逻辑。 [页面查找](./packages/uni-shared/src/dom2/elementPage.ts#L7) · [原型安装](./packages/uni-components/src/vue/web-vapor-elements.ts#L115) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#getpage)

### `querySelector()`

由浏览器查询根节点的后代。旧版可以通过 `ref.querySelector('input')` 找到内部输入框，单根实现中应直接使用 ref 获取实际输入框。`querySelector()` 不会匹配节点自身。 [根节点模板](./packages/uni-components/src/vue/input/index-vapor.tsx#L121) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#queryselector)

### `querySelectorAll()`

同样查询根节点的后代，Web 直接返回浏览器的 `NodeList`。组件模板只包含一个原生输入框，因此查询结果中没有旧版的内部输入框、占位节点或搜索表单。 [根节点模板](./packages/uni-components/src/vue/input/index-vapor.tsx#L121) · [官方方法说明](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html#queryselectorall)

## 事件

`input`、`focus`、`blur`、`confirm` 是官方标记为 Web 支持的 Input 事件。共享逻辑将浏览器事件包装为带 `type`、`timeStamp`、`target`、`currentTarget` 和 `detail` 的对象，再通过 Vue 组件发出。单根重构后，`target` 和 `currentTarget` 都指向实际的 `<input uni-input>`，旧版这两个字段指向外层容器。 [官方兼容表](https://doc.dcloud.net.cn/uni-app-x/component/input.html#属性) · [事件包装](./packages/uni-components/src/helpers/useEvent.ts#L14) · [根节点引用](./packages/uni-components/src/vue/input/index-vapor.tsx#L116)

### `@input`

共享监听器收到原生 `input` 时阻止其冒泡，并读取输入框当前的 `value` 更新字段状态。组件传给业务回调的 `detail` 只包含 `value` 和 `cursor`。原生类型为 `number` 时，组件直接返回 `cursor: null`。其他类型读取原生 `selectionEnd`，`email` 等不支持文本选区的类型也会得到 `null`。组件忽略 Web 回调的返回值。 [光标取值](./packages/uni-components/src/helpers/useField.ts#L468) · [值同步及派发](./packages/uni-components/src/helpers/useField.ts#L331) · [官方事件类型](https://doc.dcloud.net.cn/uni-app-x/component/input.html#uniinputevent)

对外派发经过 100 ms 节流。同一窗口内的后续输入合并为最近一次。组字期间继续更新字段状态。正常结束组字时，最终值进入节流流程。若先失焦，则立即派发当前值。设置组件的 `value`、`model-value` 或直接写入原生 `value` 只走相应的值更新路径，不触发业务 `input`。 [节流实现](./packages/uni-components/src/helpers/throttle.ts#L1) · [组字结束处理](./packages/uni-components/src/helpers/useField.ts#L526) · [组字期间失焦](#blur) · [外部值同步](./packages/uni-components/src/helpers/useField.ts#L295)

模板还通过 `onInput` 同步输入值并补充处理数字输入。当前 JSX 将监听编译成节点创建时执行的一次调用，简化后为 `on(node, 'input', readonly.value ? undefined : onFieldInput)`。该调用位于响应式更新之外。Safari 兼容分支切换禁用状态时，单根节点保留初始的绑定状态，业务 `input` 仍由共享监听器处理。 [模板监听](./packages/uni-components/src/vue/input/index-vapor.tsx#L143) · [Vapor 监听注册](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L12626) · [共享监听注册](./packages/uni-components/src/helpers/useField.ts#L520)

### `@focus`

实际输入框收到原生 `focus` 后，组件将焦点状态设为 `true`，以当前字段状态发出 `detail: { value }`，随后应用 `cursor`、`selection-start` 和 `selection-end`。Web 的焦点事件只传 `value`，键盘高度 `height` 在官方兼容表中标记为 Web 不支持。 [焦点处理](./packages/uni-components/src/helpers/useField.ts#L478) · [官方事件类型与字段兼容性](https://doc.dcloud.net.cn/uni-app-x/component/input.html#uniinputfocusevent)

### `@blur`

实际输入框收到原生 `blur` 后，如仍在组字则立即派发当前输入并跳过这次派发的节流等待，再将焦点状态设为 `false` 并发出 `detail: { value, cursor }`。`value` 读取当时的字段状态，`cursor` 沿用 `@input` 的取值规则，可能为 `null`。 [失焦处理](./packages/uni-components/src/helpers/useField.ts#L504) · [立即派发](./packages/uni-components/src/helpers/useField.ts#L339) · [光标取值规则](#input) · [官方事件类型](https://doc.dcloud.net.cn/uni-app-x/component/input.html#uniinputblurevent)

### `@confirm`

组件处理 Enter 的原生 `keyup` 时会阻止该事件向祖先冒泡，再读取当时的原生输入值并发出 `detail: { value }`。Safari 只读禁用兼容分支跳过 Enter 处理。透传原生 `readonly` 的输入框收到 Enter `keyup` 时仍可触发 `confirm`。业务绑定的 `@keyup` 位于同一个根节点上，可以收到这次按键。 [根节点键盘监听](./packages/uni-components/src/vue/input/index-vapor.tsx#L147) · [确认处理](./packages/uni-components/src/vue/input/useInput.ts#L240) · [确认后失焦](#confirm-hold) · [官方事件类型](https://doc.dcloud.net.cn/uni-app-x/component/input.html#uniinputconfirmevent)

### 双向绑定更新事件

| 更新事件            | 模板绑定        | 组件发出的原始值 |
| ------------------- | --------------- | ---------------- |
| `update:modelValue` | `v-model`       | 输入值字符串     |
| `update:value`      | `v-model:value` | 输入值字符串     |
| `update:focus`      | `v-model:focus` | 组件的焦点状态   |

用户输入进入节流派发时，先发 `update:modelValue`，再发 `update:value`，最后发 `input`。Vue 在调用模型更新回调前处理 `.trim` 和 `.number`。`.trim` 去除字符串两端的空白，`.number` 将可转换的输入值转成数字。使用 `v-model.lazy` 时，绑定值也按上述输入节流规则更新。`@input.detail.value` 仍使用原生输入框的字符串值。 [输入派发顺序](./packages/uni-components/src/helpers/useField.ts#L331) · [焦点状态监听](./packages/uni-components/src/helpers/useField.ts#L273) · [模型修饰符处理](./packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js#L6003)

## Web 不支持的属性和事件

- Web Vapor 单根 Input 不提供 `step` 和 `ignore-composition-event` 两个组件属性。数字步长和输入法组字的默认行为分别见 [`type`](#type) 和 [`value`](#value)。 [组件属性声明](./packages/uni-components/src/vue/input/index-vapor.tsx#L37) · [原生属性透传](./packages/uni-components/src/vue/input/index-vapor.tsx#L86)
- Web Vapor 单根 Input 会过滤 `text-content-type`。可编辑时默认输出原生 `autocomplete="off"`，业务仍可直接透传原生 `autocomplete`。普通 H5 的 VDOM Input 保留验证码映射，`text-content-type` 为 `oneTimeCode` 或 `one-time-code` 时输出原生 `autocomplete="one-time-code"`。 [Vapor 属性过滤](./packages/uni-components/src/vue/input/index-vapor.tsx#L23) · [验证码映射](./packages/uni-components/src/vue/input/useInput.ts#L114)
- `cursor-spacing`、`adjust-position`、`show-confirm-bar`、`auto-blur` 存在于共享属性声明中，相关键盘处理只在 App 分支执行。 [共享属性](./packages/uni-components/src/helpers/useKeyboard.ts#L105) · [App 键盘分支](./packages/uni-components/src/helpers/useKeyboard.ts#L143)
- 属性 `hold-keyboard`、`safe-password-cert-path`、`safe-password-length`、`safe-password-time-stamp`、`safe-password-nonce`、`safe-password-salt`、`safe-password-custom-hash`、`random-number`、`controlled`、`always-system`、`always-embed`
- 官方兼容表将 `keyboardheightchange`、`change`、`nicknamereview` 标为 Web 不支持。键盘高度由 App 键盘分支派发，昵称审核事件由微信小程序提供。 [官方兼容表](https://doc.dcloud.net.cn/uni-app-x/component/input.html#属性) · [键盘事件实现](./packages/uni-components/src/helpers/useKeyboard.ts#L168)
- 组件声明 `change` 是为了拦截 `@change` 向根节点透传。共享监听器阻止原生 `change` 向祖先冒泡，组件也不派发 `change`。同一原生节点上直接通过 `addEventListener` 注册的监听仍按浏览器语义执行。 [组件事件声明](./packages/uni-components/src/vue/input/index-vapor.tsx#L44) · [原生事件拦截](./packages/uni-components/src/helpers/useField.ts#L516)
- 原生 `compositionstart`、`compositionupdate`、`compositionend` 由共享输入逻辑处理。Web Vapor 固定使用默认组字处理，组件不对外派发这些组字事件。 [组字开关默认行为](./packages/uni-components/src/helpers/useField.ts#L437) · [原生组字监听](./packages/uni-components/src/helpers/useField.ts#L521)
