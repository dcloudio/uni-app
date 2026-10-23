# 抖音小程序 Fragment 组件事件补偿实施文档

## 1. 背景

uni-app x 抖音小程序默认开启组件 Fragment 渲染。抖音原生配置名为 `applyFragment`，开启后自定义组件宿主节点不会作为普通布局节点参与渲染，可以解决默认 Flex 布局下的组件占位问题。

Fragment 同时带来一个限制：绑定在自定义组件节点上的原生事件不会按普通组件节点方式触发。当前编译器会把组件上的 `@tap` 等事件直接生成到自定义组件节点，导致这些事件在抖音 Fragment 模式下失效。

本方案通过编译期事件转发和按需生成 `display: contents` wrapper，恢复原生事件，同时保留 Vue 自定义事件语义。

## 2. 目标与范围

### 2.1 目标

- 仅处理启用 Fragment 能力的 Vue 自定义组件。
- 恢复 `@tap`、`@longpress` 等可冒泡原生事件。
- 保证 `emit('custom')` 和 `emit('tap')` 可以触发父组件监听器。
- 无原生事件的组件不生成额外节点。
- 非 Fragment 平台和非用户组件产物保持不变。
- 保持现有 `vOn` handler、参数解包、`once` 和错误处理链路。

### 2.2 不在本次范围内

- 自定义组件上 `v-bind="$attrs"` 中动态原生事件的全量转发。
- 插件、动态库、ext、weui 和原生小程序组件。
- 通过全局事件注册表或全量 dispatcher 处理所有事件。
- 改变 `currentTarget` 的语义。wrapper 方案下原生事件的 `currentTarget` 是 wrapper。

## 3. 术语和能力配置

公共编译器不使用抖音原生的 `applyFragment` 名称。

在 `MiniProgramCompilerOptions.component` 中增加平台无关配置：

```ts
component?: {
  /** 自定义组件宿主节点是否按 Fragment 方式渲染 */
  fragment?: boolean
  /** 可以通过 wrapper 接收的原生冒泡事件 */
  fragmentEvents?: string[]
}
```

抖音 compiler 配置开启该能力，并提供事件列表：

```ts
component: {
  fragment: true,
  fragmentEvents: [
    'tap',
    'longtap',
    'longpress',
    'touchstart',
    'touchmove',
    'touchcancel',
    'touchend',
    'touchforcechange',
    'transitionend',
    'animationstart',
    'animationiteration',
    'animationend',
  ],
}
```

实际开启条件必须与 runtime 的 `__UNI_FEATURE_VIRTUAL_HOST__`、`enableVirtualHost` 保持一致，避免 compiler 生成 wrapper 而 runtime 未开启 Fragment。

抖音 runtime 继续单独完成原生配置映射：

```ts
options.applyFragment = true
```

`mergeVirtualHostAttributes` 继续只负责 `class`、`style`、`id`、`hidden` 等虚拟节点属性处理，不与 `fragment` 合并。

## 4. 最终模板行为

### 4.1 只有 Vue 自定义事件

源代码：

```vue
<my-component @custom="onCustom" />
```

结果：

```html
<my-component u-p="{{p}}" />
```

`onCustom` 写入 `u-p`，不生成额外 wrapper。子组件调用 `emit('custom')` 时，由 runtime 直接调用父组件的 Vue handler。

### 4.2 存在原生事件

源代码：

```vue
<my-component @tap="onTap" @custom="onCustom" />
```

结果：

```html
<view style="display: contents" bindtap="{{a}}">
  <my-component u-p="{{p}}" />
</view>
```

render data 概念结构：

```ts
{
  a: _o(_ctx.onTap),
  b: _o(_ctx.onCustom),
  p: _p({
    onTap: a,
    onCustom: b,
  }),
}
```

wrapper 和 `u-p` 必须使用同一个 handler ID，不能重复调用 `_o()` 创建不同 invoker。

### 4.3 无事件

```vue
<my-component />
```

保持原有输出，不生成 wrapper。

## 5. 编译器实施步骤

### 5.1 增加配置类型

修改：

```text
packages/uni-cli-shared/src/mp/template.ts
```

增加 `component.fragment` 和 `component.fragmentEvents` 类型及中文注释。

### 5.2 配置抖音平台

修改：

```text
packages/uni-mp-toutiao/src/compiler/options.ts
```

仅对实际启用 Fragment 的 uni-app x 编译目标开启 `fragment`，并配置 `fragmentEvents`。普通抖音小程序不得误开启。

### 5.3 收集组件事件并写入 `u-p`

修改：

```text
packages/uni-mp-compiler/src/transforms/transformComponent.ts
```

处理条件：

```text
component.fragment === true
且节点是 Vue 用户自定义组件
且不是原生、plugin、dynamicLib、ext、weui 组件
```

在 `rewriteBinding()` 中补充 `v-on` 处理：

1. 使用 `transformOn` 和 `rewriteExpression` 已经生成的最终 handler ID。
2. 将事件写入 `u-p` 对象，属性名统一为 `on${camelize(event)}`。
3. 将属于 `fragmentEvents` 的事件记录到内部元数据。
4. 从组件节点的普通模板事件输出中移除这些事件，避免 Fragment 下继续生成失效的 `bindxxx`。

内部元数据只供 codegen 使用，不作为 Vue 用户属性。例如：

```ts
node.__uniFragmentEvents = [
  {
    name: 'tap',
    handler: 'a',
    modifiers: [],
  },
]
```

不要保存原始函数表达式；必须保存最终 handler ID。

### 5.4 在 codegen 中生成 wrapper

修改：

```text
packages/uni-mp-compiler/src/template/codegen.ts
```

在 `genElement()` 中检测 Fragment 事件元数据。存在原生事件时调用独立的 `genFragmentComponent()`，否则继续使用原有逻辑。

`genFragmentComponent()` 不创建新的 Vue AST 节点，也不重复执行 transform，只负责输出两层模板节点：

```text
wrapper:
  display: contents
  原生事件
  v-if/v-else/v-for
  key
  slot

component:
  普通 props
  class/style/id/hidden
  ref/u-i/u-p
  children/slots
```

不要直接对同一个节点重复调用完整的 `genElement()`。当前 `genVFor()` 会移除 `key` 等 props，重复生成可能导致属性重复或归属错误。应拆分 wrapper 属性生成和组件节点生成逻辑。

事件属性继续复用现有 `formatMiniProgramEvent()`：

- `@tap` 生成 `bindtap`；
- `@tap.stop` 或 `@tap.prevent` 生成对应的 catch 事件；
- 自定义事件如 `@custom` 不生成 wrapper 事件。

### 5.5 处理结构指令和特殊属性

#### `v-if`、`v-else`、`v-for`

结构指令属于 wrapper。这样循环生成的是完整的 wrapper + 组件单元。

#### `key`

`key` 必须生成在 wrapper 上，保证小程序列表 diff 识别的是完整的循环单元。

#### `slot`

当自定义组件自身带有 `slot` 属性时，`slot` 必须移动到 wrapper：

```vue
<my-component slot="header" @tap="onTap" />
```

生成：

```html
<view slot="header" style="display: contents" bindtap="{{a}}">
  <my-component />
</view>
```

组件内部传入的 slot 内容不需要移动：

```vue
<my-component>
  <view slot="header" />
</my-component>
```

#### `class`、`style`、`id`、`hidden`

继续保留在自定义组件节点，不能为了方便移动到 wrapper。Fragment 的虚拟节点属性分发仍由现有逻辑负责。

## 6. runtime 实施步骤

### 6.1 增加 Fragment handler 查找

修改：

```text
packages/uni-mp-core/src/runtime/componentInstance.ts
```

封装 `isFragmentComponent()` 和 `invokeFragmentHandler()`，当前只让抖音 Fragment 返回 true，未来其他平台在平台适配层扩展。

处理流程：

```text
scope.properties.uP
  -> findPropsData()
  -> on${camelize(event)}
  -> handler ID
  -> instance.parent.ctx.$scope[handlerId]
  -> vOn invoker
```

调用 handler 时使用：

```ts
{
  type: event,
  detail: {
    __args__: args,
  },
}
```

这样可以复用现有 `vOn` 的参数解包、`once`、错误处理和事件调度逻辑。

### 6.2 保留非 Fragment 路径

只有抖音 uni-app x 且 `__UNI_FEATURE_VIRTUAL_HOST__` 开启时才执行 Fragment handler 查找；非 X、关闭 `enableVirtualHost` 或其他平台都会继续调用现有的：

```ts
scope.triggerEvent(event, detail)
oldEmit(...)
```

Fragment handler 找到后必须直接返回，不能再继续调用这两条路径，避免重复触发或把 handler ID 当作函数处理。

### 6.3 使用最新 `u-p`

handler 必须从当前 `scope.properties.uP` 查找，不能依赖 `instance.vnode.props`。父组件更新后，`u-p` 中的 handler ID 可能变化，runtime 必须使用最新值。

抖音当前已经在组件创建前建立了 Vue 父子关系，可以通过 `instance.parent` 获取父组件 scope，不需要增加全局事件注册表。

## 7. Slot 和节点结构风险

`display: contents` 只影响布局，不会从小程序逻辑节点树中删除 wrapper。以下情况必须做真机验证：

- 组件自身带 `slot` 属性；
- `selectComponent()`、`selectAllComponents()`；
- 依赖直接子节点的 CSS 选择器；
- `swiper`、`form`、`label` 等对直接子节点有要求的场景；
- `event.currentTarget`；
- 节点查询和 ref。

如果某个平台组件必须保持直接子节点关系，第一版应避免对该节点生成 wrapper，或单独提供平台能力配置，不应通过全局 wrapper 规则强行处理。

## 8. 测试计划

### 8.1 编译器测试

- `fragment: false` 时现有快照完全不变；
- 无事件组件不生成 wrapper；
- 只有 `@custom` 不生成 wrapper；
- `@tap` 生成 `display: contents` wrapper；
- 多个原生事件只生成一个 wrapper；
- `@click` 按小程序事件规则映射为 `tap` 绑定到 wrapper，同时保留 `emit('click')` 的 Vue 事件转发；
- `@tap.stop`、`@tap.prevent`；
- `v-if`、`v-else`、`v-for`；
- `v-for` 中的 `key` 输出在 wrapper；
- 组件自身 `slot` 输出在 wrapper；
- 组件内部 slot 内容不受影响；
- `class/style/id/hidden` 仍在组件节点；
- plugin、dynamicLib、ext、weui 和原生组件不处理；
- 自定义组件上的 `v-bind="$attrs"` 不触发全量动态原生事件绑定。

### 8.2 runtime 测试

- `emit('custom')` 正常触发；
- `emit('tap', value)` 参数正常；
- 原生 tap 正常触发；
- `@tap.once` 在 native 和 emit 混合触发时只执行一次；
- 父组件重新渲染后新的 handler ID 生效；
- Fragment 未找到 handler 时不会破坏非 Fragment fallback；
- 父子组件关系未建立时不会抛出异常。

### 8.3 抖音真机测试

- 多根节点组件点击；
- Fragment 下 Flex 布局；
- slot 组件；
- `v-for` 列表更新和重排；
- `selectComponent`、ref 和节点查询；
- 表单、swiper、label 等直接子节点场景；
- `currentTarget` 行为。

## 9. 性能和兼容性验收

满足以下条件才算完成：

- 没有原生事件的组件零额外节点；
- 只有静态原生事件组件增加一个 wrapper；
- wrapper 只包含静态 `display: contents`，不增加响应式数据；
- 没有全局 listener registry；
- 没有预置全部事件绑定；
- emit 只进行一次 `u-p` props 缓存查找；
- 非 Fragment 平台模板和 runtime 行为不变。

## 10. 实施顺序

1. 增加 compiler 配置类型。
2. 增加抖音 Fragment 配置和实际启用条件判断。
3. 在 `rewriteBinding()` 中收集事件并写入 `u-p`。
4. 在 codegen 中增加 `genFragmentComponent()`。
5. 在 runtime 中增加 Fragment emit handler bridge。
6. 先补 compiler 快照和 runtime 单测。
7. 使用抖音测试工程进行真机验证。
8. 修复 slot、key、直接子节点场景后再合入。
