#### recycle-list

app端nvue专用组件。

`<recycle-list>` 是一个新的列表容器，具有回收和复用的能力，可以大幅优化内存占用和渲染性能。它的性能比list组件更高，但写法受限制。它除了会释放不可见区域的渲染资源，在非渲染的数据结构上也有更多优化。

此组件自HBuilderX 2.2.6+起支持。

#### 子组件
`<recycle-list>` 只能使用 `<cell-slot>` 作为其直接子节点，使用其他节点无效。

#### <cell-slot>
<cell-slot> 代表的是列表每一项的模板，它只用来描述模板的结构，并不对应实际的节点。`<cell-slot>` 的个数只表示模板的种类数，真实列表项的个数是由数据决定的。


属性|说明
:--|:--|
case|声明了当前模板的类型，只有和数据中的类型与当前类型匹配时才会渲染，语义和编程语言里的 case 一致。所有模板中最多只会匹配到一项，按照模板的顺序从上到下匹配，一旦匹配成功就不在继续匹配下一个。
default|表示当前模板为默认模板类型，不需要指定值。如果数据项没有匹配到任何 case 类型，则渲染带有 default 模板。如果存在多个 default，则只会使用第一个默认模板。
key|可选属性，用于指定列表数据中可以作为唯一标识的键值，可以优化渲染性能。

- warning 属性的省略 - 如果没写 `switch`，无论有没有写 `case` 或 `default`，都只使用第一个模板 - 在写了 `switch` 的情况下，`case` 和 `default` 必须写一个，否则该模板将会被忽略


属性

- for
在 `<recycle-list>` 添加 for 属性即可描述如何循环展开列表的数据，语法和 Vue 的 v-for 指令类似，但是它循环的是自己内部的子节点，并不是当前节点。写法：
  - `alias in expression`
  - `(alias, index) in expression`
- switch
在 `<recycle-list>` 添加 switch 属性可以用来指定数据中用于区分子模板类型的字段名，语义和编程语言里的 switch 一致，配合 `<cell-slot>` 中的 case 和 default 属性一起使用。
如果省略了 switch 属性，则只会将第一个 `<cell-slot>` 视为模板，多余的模板将会被忽略。

```
<recycle-list for="(item, i) in longList" switch="type">
  <cell-slot case="A">
    <text>- A {{i}} -</text>
  </cell-slot>
  <cell-slot case="B">
    <text>- B {{i}} -</text>
  </cell-slot>
</recycle-list>
```

可复用的组件

在 `<recycle-list>` 中使用的子组件也将被视为模板，在开发组件时给 `<template>` 标签添加 recyclable 属性，才可以用在 `<recycle-list>` 中。

```
<template recyclable>
  <div>
    <text>...</text>
  </div>
</template>
<script>
  // ...
</script>
```

> 添加了 recyclable 属性并不会影响组件本身的功能，它仍然可以用在其他正常的组件里。

注意事项
#### 属性和文本的绑定
绑定属性或者文本时，仅支持表达式，不支持函数调用，也不支持使用 filter，可以参考 Implementation.md#支持的表达式。

例如，下列写法不可用：

```
<div :prop="capitalize(card.title)">
  <text>{{ card.title | capitalize }}</text>
</div>
```
针对这种场景，推荐使用 computed 属性来实现。
因为模板的取值是由客户端实现的，而函数的定义在前端（filter 可以认为是在模板里调用函数的语法糖），如果每次取值都走一次通信的话，会大幅降低渲染性能。

#### <slot>不可用
`<cell-slot>` 的功能和 `<slot>` 有部分重叠，而且更为激进，在概念上有冲突，存在很多边界情况无法完全支持。不要在 `<cell-slot>` 及其子组件里使用 `<slot>`。

#### v-once 不会优化渲染性能
和前端框架中的理解不同，客户端里要实现复用的逻辑，会标记模板节点的状态，添加了 v-once 能保证节点只渲染一次，但是并不一定能优化渲染性能，反而可能会拖慢客户端复用节点时的比对效率。

#### 样式功能的限制
计划支持。目前版本里还不支持绑定样式类名（v-bind:class），原因和进展可以参考 #14。

#### 双向绑定
计划支持。v-model 还未调通，暂时不要使用。

#### 子组件的限制
没有 Virtual DOM！ 使用在 `<recycle-list>` 中的组件没有 Virtual DOM！与 Virtual DOM 相关的功能也不支持。在开发过程中尽量只处理数据，不要操作生成后的节点。

下列这些属性都不再有意义，请不要使用：

- vm.$el
- vm.$refs.xxx
- vm.$vnode
- vm.#slots
- vm.#scopedSlots

`vm.$refs` 里的值可能是数组、子组件的实例、DOM 元素，在前端里比较常用，如果不支持，对 Weex 里的 `dom` 模块和 `animation` 模块的功能也有影响。

目前正在讨论技术方案，部分接口可能会重新设计，或者是在 `vm` 上透出专为 `<recycle-list>` 设计的接口。

组件的属性 目前子组件的属性不支持函数。（正在讨论实现方案）

```
<sub-component :prop="item.xxx" />
```

因为子组件的属性值需要在前端和客户端之间传递，所以仅支持可序列化的值。`item.xxx` 的类型可以是对象、数组、字符串、数字、布尔值等，不支持函数。

生命周期的行为差异 由于列表的渲染存在回收机制，节点渲染与否也与用户的滚动行为有关，组件的生命周期行为会有一些不一致。

可回收长列表不会立即渲染所有节点，只有即将滚动到可视区域（以及可滚动的安全区域）内时才开始渲染，组件生命周期的语义没变，但是会延迟触发。

假设有 100 条数据，一条数据了对应一个组件。渲染首屏时只能展示 8 条数据的节点，那就只有前 8 个组件被创建了，也只有前 8 个组件的生命周期被触发。

组件的 `beforeCreate` 和 `created` 也只有在组件即将创建和创建完成时才会触发
同理，组件的 `beforeMount` 和 `mounted` 也只有页面真正渲染到了该组件，在即将挂载和已经挂载时才会触发
组件的自定义事件
计划支持。`vm.$on`, `vm.$once`, `vm.$emit`, `vm.$off` 等功能还未完全调通，接口可用，但是行为可能有些差异（参数丢失），暂时不要使用。

#### 示例
```
<recycle-list for="(item, i) in longList" switch="type">
  <cell-slot case="A">
    <text>- A {{i}} -</text>
  </cell-slot>
  <cell-slot case="B">
    <text>- B {{i}} -</text>
  </cell-slot>
</recycle-list>
```
如果有如下数据：

```
const longList = [
  { type: 'A' },
  { type: 'B' },
  { type: 'B' },
  { type: 'A' },
  { type: 'B' }
]
```

则会生成如下等价节点：

```
<text>- A 0 -</text>
<text>- B 1 -</text>
<text>- B 2 -</text>
<text>- A 3 -</text>
<text>- B 4 -</text>
```

如果将模板合并成一个，也可以省略 `switch` 和 `case`，将例子进一步简化：

```
<recycle-list for="(item, i) in longList">
  <cell-slot>
    <text>- {{item.type}} {{i}} -</text>
  </cell-slot>
</recycle-list>
```
