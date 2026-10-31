# uni-forms X 版迁移设计基线

> 状态：迁移备忘。正式说明已写到 [表单使用说明](../../docs/表单使用说明.md) 和 [表单设计说明](../../docs/表单设计说明.md)。下文里的 DOM、externalClasses 描述若与这两份文档不一致，以这两份为准。

当前实现已经建立 `uni-forms`、`uni-forms-item`、原版 DB Schema `validate.js` 兼容层和 Standard Schema 接口；`uni-easyinput` 已接入字段上下文，`uni-combox` 可通过 `v-model` 参与字段收集和 submit 校验。本轮已在 HBuilder 完成 Web 编译/交互回归，并完成 iOS 模拟器基座的编译启动；Android 基座可识别并重新运行，Harmony、微信和支付宝仍需在对应工具链中单独验收。

## 0. 本轮方案冻结

1. 原版 `validate.js` 是 DB Schema、datacom 和 schema2code 的兼容基线，文件保留在 `components/uni-forms/validate.js`，规则执行语义不重写。原校验器每个规则对象只选择一种内置规则类型（优先级为 `required`、`format`、`arrayType`、`range`、数值范围、长度、`pattern`、自定义函数）；需要同时表达必填、格式和范围时，必须拆成多个规则对象。`validateExpr` 按旧实现仅以返回 `false` 判定失败，错误文案由 `errorMessage` 提供；返回字符串不会自动成为错误信息。
2. `validation.ts` 只负责把原版结果转换为 X 版 `{ key, path, errorMessage, source }`，并负责触发器过滤和 Standard Schema 适配。
3. `resetFields` 基于表单挂载时的本地初始快照生成新模型；只定向更新已注册字段，不清空或重建调用方整个 model。新增 `reset` 作为更短的别名，旧方法继续保留。
4. 全表校验一次只执行一次 Standard Schema；字段校验只执行目标字段的 legacy 规则。过期的整表异步校验结果不得触发事件或覆盖 UI。
5. 旧 Props、旧事件、旧方法和旧规则名称不删除。新能力通过新增属性或方法提供，废弃项只在文档中逐步迁移。
6. Valibot 不是 `uni-forms` 的直接依赖。只通过 Standard Schema 接入，应用自行管理 Valibot 版本和打包；没有传入 `schema` 时，组件不加载任何 Valibot 代码。项目示例页为了脱离 `package.json` 安装条件，随页面保留了 Valibot 1.5.0 的本地 ESM 副本；业务项目仍推荐通过 `npm install valibot` 管理版本，并从 `valibot` 导入。
7. 为避免原型污染，`__proto__`、`prototype`、`constructor` 不作为表单路径或规则键；实现会安全忽略这些保留键，业务字段应避开这些名称。

## 1. 迁移目标

将旧版 `uni-forms` 迁移到 uni-app x，保持旧版公开用法兼容，同时建立跨平台、可扩展的 Vue 表单协议。

核心目标：

- 使用 Vue `v-model` 作为跨平台表单数据接入方式。
- 通过 `uni-forms` 管理模型、字段注册、校验调度和表单方法。
- 通过 `uni-forms-item` 管理字段路径、label、错误信息和字段状态。
- 内置表单控件、uni-ui 控件和第三方控件都可以接入。
- 保留旧版 DB Schema 风格规则。
- 通过 Standard Schema 接入 Valibot 等校验库，但不绑定 Valibot 私有 API。
- 根节点支持调用方 `class/style`，内部节点通过 `externalClasses` 定制样式。

## 2. 不采用的方案

`uni-forms` 不应依赖以下能力作为跨端协议：

- Web Component 的原生 form-associated 机制。
- 微信小程序或其他小程序的专有表单扩展。
- 原生 `<form>` 的字段注册结果。
- 通过 `binddata` 作为第三方组件的必选接入方式。

原生 `<form>` 可以保留为语义容器，但不能作为数据源、字段注册协议或校验协议。即使去掉原生 `<form>`，`uni-forms` 的数据收集和校验也必须正常工作。

## 3. 现状

旧版实现已经具备字段注册和 `provide/inject` 基础：

- `uni-forms` 维护字段列表和内部 `formData`。
- `uni-forms-item` 注册字段、读取模型路径并执行字段校验。
- 原生控件和部分第三方控件仍需要 `binddata` 或 `setValue`。

X 版现状：

- `uni-combox` 已发出 `update:modelValue`，可通过普通 `v-model` 参与基本表单流程。
- `uni-combox` 当前没有标准 `blur` 事件，也没有表单字段上下文。
- X 版 `uni-easyinput` 已接入 `uni-forms-item` 上下文。

因此，表单控件应分为两个接入等级：

| 能力 | 只使用 `v-model` | 注入字段上下文 |
| --- | --- | --- |
| 表单数据收集 | 支持 | 支持 |
| submit 校验 | 支持 | 支持 |
| bind 校验 | 支持，通过字段值变化监听 | 支持 |
| blur 校验 | 不完整 | 支持 |
| 错误态联动 | 不支持 | 支持 |
| pending 状态 | 不支持 | 支持 |

## 4. 组件架构

### 4.1 `uni-forms`

负责：

- 表单模型和初始值快照。
- 字段注册、注销和动态字段管理。
- 表单级规则注册。
- 全表校验和指定字段校验。
- 校验错误状态管理。
- `resetFields`、`clearValidate` 等公共方法。
- 向下提供表单上下文。

### 4.2 `uni-forms-item`

负责：

- `name` 路径规范化。
- 字段值读取和写入。
- 表单级规则与字段级规则合并。
- label 布局。
- 写了 `labelWidth` 时，长 label 在这个宽度内换行。左侧布局默认不写宽度，标签按文字本身排列。顶部布局是一个根节点，标签占满整行，写在表单项上的 class 和 style 包住下面的控件。
- 错误信息展示。
- 当前字段的校验状态。
- 字段注册和注销。
- 向子控件提供字段上下文。

### 4.3 表单控件

最低接入标准是标准 `v-model`：

```vue
<my-control v-model="formData.name" />
```

高级接入能力建议包括：

```ts
fieldContext.onFieldChange(value)
fieldContext.onFieldBlur(value)
fieldContext.clearValidate()
fieldContext.errorMessage
fieldContext.validateState
```

第三方控件不应强制依赖 `uni-forms`。只支持 `v-model` 时，可以完成数据收集和 submit 校验；需要 blur 校验、错误态或异步 pending 时，再使用字段上下文。

## 5. 公开 API 兼容范围

### 5.1 `uni-forms` Props

| 属性 | 处理方式 |
| --- | --- |
| `modelValue` | 新代码的标准模型入口，支持 `v-model` |
| `model` | 旧版兼容入口 |
| `value` | 旧版兼容入口，保留并标记废弃 |
| `rules` | DB Schema 风格规则 |
| `schema` | 已实现，接收表单级 Standard Schema；Valibot 由应用侧自行引入 |
| `errShowType` | 保留 `undertext`、`toast`、`modal`。默认改为 `toast`，只有 toast 给出错项加红框 |
| `validateTrigger` | 支持 `bind`、`blur`、`submit` |
| `labelPosition` | 支持 `left`、`top` |
| `labelWidth` | 支持 `String`、`Number` |
| `labelAlign` | 支持 `left`、`center`、`right` |
| `border` | 保留 |

同时传入 `model`、`modelValue`、`value` 时，应给出开发期警告，并固定优先级。为兼容旧版，暂按 `model > modelValue > value` 处理；新代码统一使用 `v-model`。

### 5.2 `uni-forms` Methods

| 方法 | 处理方式 |
| --- | --- |
| `setRules(rules)` | 保留，支持动态更新规则 |
| `setValue(name, value)` | 保留，兼容原生和第三方控件；沿用旧版立即校验该字段的行为 |
| `validate(keepItem?, callback?)` | 保留 Promise 和 callback 两种调用方式 |
| `validateField(names?, callback?)` | 保留，支持字符串、数组和嵌套路径 |
| `clearValidate(names?)` | 保留，不传参数时清除全部错误 |
| `resetFields(names?)` | 实现并补齐旧文档承诺的能力 |
| `reset(names?)` | 新增的短别名，行为与 `resetFields` 相同 |
| `submit(keepItem?, callback?, type?)` | 保留但标记废弃，使用与 `validate` 相同的校验调度并继续触发 `submit` 事件；第三参数保留旧版静默警告行为 |

兼容行为：

- Promise 调用时，校验成功返回表单数据，失败返回错误数组。
- 并发校验中，较早且已被新一轮校验取消的 Promise 会以 `{ stale: true, cancelled: true }` 拒绝，callback 也会收到这个对象。它不是 `null`，不能当成校验成功。
- 全表 `validate`/`submit` 的返回数据只包含已注册 `uni-forms-item` 字段；`keepItem` 字段按当前模型补回，保持旧版提交数据范围。
- callback 调用时，第一个参数为错误结果，第二个参数为表单数据。
- 使用 callback 时，`validate` 返回值保持旧版行为，不再额外返回 Promise。
- 错误对象至少兼容旧版的 `key`、`errorMessage` 字段。
- `submit` 继续触发旧的 `submit` 事件。
- `errShowType` 为 `toast` 或 `modal` 时只弹出第一个错误，字段下面不写文字。只有 `toast` 会给出错的表单项加红框。`undertext` 在表单项下方显示错误文本，不加红框。

### 5.3 `uni-forms-item` Props

保留：

- `name: String | Array`
- `rules`
- `required`
- `label`
- `labelWidth`
- `labelAlign`
- `errorMessage`
- `label` 插槽
- 默认插槽

以下旧属性不再渲染对应节点：

- `leftIcon`
- `iconColor`

`validateTrigger` 和 `labelPosition` 继续生效。

字段级 `rules` 覆盖表单级相同字段规则。

## 6. 字段路径和模型规则

必须支持以下路径格式：

```text
user.name
user.address[0].name
user.address.0.name
['user', 'address', 0, 'name']
_formdata_#user#address#0#name（旧版内部真实名）
```

内部可以使用规范化路径作为 key，但对外错误信息和返回数据不能暴露内部编码名称。

需要特别保证以下值不会被错误转换为空值：

- `0`
- `false`
- `null`
- `''`
- `[]`

模型是数据真源。表单可以维护初始值快照和校验状态，但不应长期维护一份与外部模型不一致的可变副本。

## 7. 校验设计

内部统一抽象为 `ValidationAdapter`。

### 7.1 `LegacyRulesAdapter`

兼容现有 DB Schema 风格规则：

- `required`
- `range`
- `format`
- `pattern`
- `minimum`
- `maximum`
- `minLength`
- `maxLength`
- `validateExpr`
- `validateFunction`
- `label`
- `errorMessage`
- `trigger` / `validateTrigger`

### 7.2 `StandardSchemaAdapter`

接收 Standard Schema V1，不直接依赖 Valibot 私有类型。Valibot 作为推荐实现之一，其他兼容 Standard Schema 的库也可以接入。

建议允许 `rules` 和 `schema` 并存：

```vue
<uni-forms
  v-model="formData"
  :rules="legacyRules"
  :schema="formSchema"
>
  <uni-forms-item name="user.name" label="姓名">
    <uni-easyinput v-model="formData.user.name" />
  </uni-forms-item>
</uni-forms>
```

统一错误结构建议为：

```ts
{
  key: 'user.name',
  path: ['user', 'name'],
  errorMessage: '请输入姓名',
  source: 'legacy' | 'standard'
}
```

执行规则：

- `rules` 和 `schema` 都执行。
- 错误按字段路径和消息去重。
- bind/blur 只更新当前字段相关错误。
- submit/validate 校验整张表。
- `validateField` 先执行目标字段的 legacy 规则，再读取整份 schema 里属于这些字段的错误。`bind` 不跑 schema。失焦会跑 schema，并把同一次结果里其它字段的 schema 错误写到对应项上，且不清除那些字段已有的规则错误。
- 异步校验使用执行序号，过期结果不得覆盖新输入结果。
- 高频 `v-model` 写入只复制路径上的对象/数组容器；校验返回和 reset 快照仍使用隔离副本。
- 原版校验器按字段和规则源缓存，规则未变化时不重复创建实例；Standard Schema 按模型版本缓存，避免同一模型的字段 blur 重复执行。
- Standard Schema 应通过替换对象更新，不要对同一对象内部规则就地改写后继续复用。
- 整表 `validate()` 成功且 schema 返回 `value` 时，转换结果写回已注册字段。失焦和 `validateField` 不写回。
- Standard Schema 的错误路径映射到对应的 `uni-forms-item name`。

### 7.3 DB Schema 与 Valibot 的边界

- DB Schema 继续负责数据库字段约束、入库安全和数据库层校验。
- Valibot/Standard Schema 负责页面表单、业务参数、云函数和云对象输入校验。
- 客户端和云函数可以共享纯校验模块，但服务端仍必须独立校验。
- 第一阶段不实现 DB Schema 与 Valibot 的双向自动转换。
- 在确认 Web、Android、iOS、Harmony、微信小程序运行时兼容前，不把 Valibot 设为硬依赖。

## 8. 校验触发时机

支持：

- `bind`：模型值变化时校验。
- `blur`：字段失焦时校验。
- `submit`：调用 `validate` 或 `submit` 时校验。

优先级固定为：

```text
规则 > uni-forms-item > uni-forms
```

没有规则或 schema 的字段，不应因为模型值变化而产生错误。

## 9. resetFields 语义

`resetFields` 在旧文档中存在，但当前旧源码并未完整实现，新版本应补齐。

当前实现规则：

- 表单挂载时复制当前模型建立初始值快照；挂载后动态注册的字段记录注册时的当前值。
- 动态注册字段时，记录该字段当前值作为初始值。
- 动态注销字段时，同时移除其校验状态和内部记录。
- `resetFields(names?)` 只重置已注册字段。
- 重置后清除对应校验错误。
- 重置产生的模型变更不会立即重新触发 `bind` 校验。
- 没有使用 `v-model` 的外部控件，不能保证控件内部状态自动重置，需在文档中明确。
- 不使用简单 JSON 深拷贝作为唯一快照方案，避免丢失特殊类型。

## 10. ExternalClasses 和样式

X 版样式原则：组件根节点直接接受调用处的 `class/style`，内部节点通过 `externalClasses` 暴露。

### 10.1 `uni-forms`

| 部位 | 方案 |
| --- | --- |
| 组件根节点 | 直接支持 `class/style` |
| 内部原生 form 容器 | 第一版不新增 `form-class` |
| 表单布局 | 由根节点和子项 class/style 控制 |
| 校验状态 | 由组件状态和稳定内部类控制 |

### 10.2 `uni-forms-item`

当前 externalClasses：

| 部位 | externalClass |
| --- | --- |
| label 文本 | `label-class` |
| 说明文字 | `description-class` |
| 必填标记 | `required-class` |
| 左侧布局的控件列 | `content-class`。顶部布局没有这层节点 |
| 错误文本 | `error-message-class` |
| toast 红框 | `error-class`。只在红框出现时挂上 |

`label-wrap-class` 和 `error-wrap-class` 已去掉。对应节点被合并后，没有单独的容器可以挂这两个类。

以下内容继续使用属性或内部状态控制，不通过 externalClasses 暴露：

- `labelWidth`
- `labelAlign`
- `labelPosition`
- 错误显隐
- 校验状态逻辑
- 字段注册状态
- 表单数据值

需要验证 externalClass 是否能够稳定控制：颜色、字号、字重、行高、间距和背景。

## 11. 迁移阶段

### 阶段一：行为基线

- 整理旧版 API 测试。
- 固定 Promise/callback 返回行为。
- 固定嵌套路径和动态字段行为。
- 固定 `0`、`false`、`null`、空数组等边界值。

### 阶段二：表单核心

- 实现 `uni-forms`。
- 实现 `uni-forms-item` 注册、注销和路径读写。
- 实现字段状态和错误状态。
- 实现 `LegacyRulesAdapter`。

### 阶段三：布局和样式

- 实现 label、内容区和错误区。
- 增加 externalClasses。
- 完成根节点 `class/style` 支持。
- 验证 Web、Android、iOS、Harmony、微信、支付宝平台行为。

### 阶段四：控件接入

- 接入 X 版 `uni-easyinput`。
- 接入 X 版 `uni-combox`。
- 验证原生 `input`、`textarea`、`picker`、`switch`。
- 验证只使用 `v-model` 的第三方控件。
- 验证注入字段上下文的第三方控件。

### 阶段五：Standard Schema

- 保持 `StandardSchemaAdapter` 为可选适配层，不引入 Valibot 运行时依赖。
- 验证 Valibot 在各目标平台的运行时兼容性。
- 支持表单级 schema。
- 再评估字段级 schema 和异步业务校验 API。

### 阶段六：发布和收尾

- 接入 number-box、picker、checkbox、file-picker 等组件。
- 更新聚合包依赖。
- 更新 X 版 readme 和迁移文档。
- 将本文档中的稳定内容迁移到正式 API 文档。
- 删除本文档。

## 12. 验收清单

- [x] 普通字符串字段。
- [x] 数字 `0`。
- [x] 布尔值 `false`。
- [x] `null`、空字符串和空数组。
- [x] `user.address[0].name` 等嵌套路径。
- [x] 动态增加和删除 `uni-forms-item`。
- [x] 字段规则覆盖表单规则。
- [x] `bind`、`blur`、`submit` 三种触发方式。
- [x] 规则、item、form 的触发优先级。
- [x] 同步和异步校验。
- [x] 异步旧结果不能覆盖新输入结果。
- [x] `validate` Promise 和 callback 调用。
- [x] `validateField`、`clearValidate`、`resetFields`。
- [x] `setValue` 兼容调用。
- [x] `uni-combox` 只使用 `v-model`。
- [x] 第三方控件只使用 `v-model`。
- [x] 第三方控件注入字段上下文。
- [x] externalClasses 覆盖颜色、字号、字重、间距和背景的代码路径。
- [x] Web 编译、forms-validation 错误展示和年龄输入焦点回归。
- [x] iOS 模拟器基座编译启动，项目入口可见。
- [ ] Android、Harmony、微信、支付宝的完整构建和交互回归。

上述已勾选项表示代码路径已实现并完成静态检查，或已经在对应平台完成本轮实测；原版规则和 schema2code 规则已做 Node 级样例验证，路径更新和所有 forms 脚本已做转译检查。Android 当前只确认基座可识别并重新运行，未把它等同于完整交互验收；Harmony、微信和支付宝仍需要目标工具链的真实回归后，才能成为发布验收结论。

## 13. 待最终确认的问题

当前仍需后续确认：

1. 是否在 `schema` 之外新增字段级 Standard Schema 属性。
2. 支付宝小程序是否纳入第一版正式支持矩阵。
3. `errShowType=toast/modal` 是否继续作为核心能力，还是仅作为兼容层保留。
4. 是否同时提供字段上下文的公共 composable；当前继续兼容字符串注入 `uniFormItem`。

## 14. 实现原则

1. `v-model` 是最低跨端接入标准。
2. 字段上下文是高级能力，不是第三方控件的强制依赖。
3. `uni-forms` 不依赖原生 `<form>` 完成核心功能。
4. DB Schema 保持兼容。
5. Valibot 通过 Standard Schema 接入，不作为硬编码依赖。
6. 不做 DB Schema 和 Valibot 的自动双向转换。
7. 根节点使用 `class/style`，内部节点使用分类后的 externalClasses。
8. 先用行为测试冻结旧版契约，再开始迁移实现。
9. 兼容旧 API，但不复制旧版的数据丢失、深拷贝和异步竞态问题。
