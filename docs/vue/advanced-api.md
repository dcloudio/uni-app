# 进阶 API

## 渲染函数

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| h() | 4.0 | x | 3.99 | 4.11 | 4.61 |
| mergeProps() | 4.0 | - | 4.0 | 4.11 | 4.61 |
| cloneVNode() | 4.0 | - | 4.0 | x | x |
| isVNode() | 4.0 | - | √ | 4.11 | 4.61 |
| resolveComponent() | 4.0 | x | √ | 4.11 | 4.61 |
| resolveDirective() | - | - | - | - | - |
| withDirectives() | 4.0 | 4.41 | x | 4.11 | 4.61 |
| withModifiers() | 4.0 | - | √ | 4.11 | 4.61 |

### 示例代码 @example

#### h()

创建虚拟 DOM 节点 (vnode)。

- 详细信息

  第一个参数既可以是一个字符串 (用于原生元素) 也可以是一个 Vue 组件定义。第二个参数是要传递的 prop，第三个参数是子节点。

  当创建一个组件的 vnode 时，子节点必须以插槽函数进行传递。如果组件只有默认槽，可以使用单个插槽函数进行传递。否则，必须以插槽函数的对象形式来传递。

  为了方便阅读，当子节点不是插槽对象时，可以省略 prop 参数。

- 示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/render-function/render/render-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/render-function/render/render-options

> 组合式 API
```vue
<script setup lang="uts">
import CompForHFunction from '@/components/CompForHFunction.uvue'
import CompForHFunctionWithSlot from '@/components/CompForHFunctionWithSlot.uvue'
import Foo from './Foo.uvue'
const msg = ref('default msg')
const list = ref(['a','b'])
// 故意外部声明为UTSJSONObject
const msgProps = { class: 'mt-10 msg', style: { color: 'blue' } }
// #ifdef APP-ANDROID
const render = computed(():VNode => {
// #endif
// #ifndef APP-ANDROID
const render = ():VNode => {
// #endif
  const textList: VNode[] = []
  list.value.forEach((item) => {
    textList.push(h('text', { class: 'text-item' }, item))
  })
  return h('view', { class: 'page' }, [
    h(CompForHFunctionWithSlot, {}, () : VNode[] => [h('text', { class: 'comp-slot' }, 'component slot')]),
    h(CompForHFunction, { msg: msg.value }),
    h('text', msgProps, msg.value),
    h(Foo, null, {
        header: (): VNode[] => [h('text', { id: "header" }, 'header')],
        footer: (): VNode[] => [h('text', { id: "footer" }, 'footer')]
    }),
    h('view', null, textList),
    h(
      'button',
      {
        class: 'mt-10 btn',
        type: 'primary',
        onClick: () => {
          msg.value = 'new msg'
          list.value.push('c')
        }
      },
      'click'
    )
  ])
}
// #ifdef APP-ANDROID
)
// #endif
</script>

<template><render /></template>

<style>
.btn {
  color: red;
}
</style>

```

> 选项式 API
```vue
<script lang="uts">
import CompForHFunction from '@/components/CompForHFunction.uvue'
import CompForHFunctionWithSlot from '@/components/CompForHFunctionWithSlot.uvue'
import Foo from './Foo.uvue'
// 故意外部声明为UTSJSONObject
const msgProps = { class: 'mt-10 msg', style: { color: 'blue' } }
export default {
  data() {
    return {
      msg: 'default msg',
      list: ['a','b']
    }
  },
  render() : VNode {
    const textList: VNode[] = []
    this.list.forEach((item) => {
      textList.push(h('text', { class: 'text-item' }, item))
    })
    return h('view', { class: 'page' }, [
      h(CompForHFunctionWithSlot, {}, () : VNode[] => [h('text', { class: 'comp-slot' }, 'component slot')]),
      h(CompForHFunction, { msg: this.msg }),
      h('text', msgProps, this.msg),
      h(Foo, null, {
          header: (): VNode[] => [h('text', { id: "header" }, 'header')],
          footer: (): VNode[] => [h('text', { id: "footer" }, 'footer')]
      }),
      h('view', null, textList),
      h(
        'button',
        {
          class: 'mt-10 btn',
          type: 'primary',
          onClick: () => {
            this.msg = 'new msg'
            this.list.push('c')
          }
        },
        'click'
      )
    ])
  }
}
</script>

<style>
.btn {
  color: red;
}
</style>
```
:::

#### mergeProps()

合并多个 props 对象，用于处理含有特定的 props 参数的情况。

- 详细信息

  mergeProps() 支持以下特定 props 参数的处理，将它们合并成一个对象。

  - class
  - style
  - onXxx 事件监听器——多个同名的事件监听器将被合并到一个数组。
  如果你不需要合并行为而是简单覆盖，可以使用原生 object spread 语法来代替。

- 示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/render-function/mergeProps/mergeProps-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/render-function/mergeProps/mergeProps-options

> 组合式 API
```vue
<template>
  <view class="page">
    <view class="mb-10 flex flex-row justify-between">
      <text>merged class</text>
      <text id="merged-class">{{mergedProps['class']}}</text>
    </view>
    <button class="mb-10" id="trigger-merged-click" @click="triggerMergedClick">trigger merged onClick</button>
    <view>
      <text class="mb-10">prop function result list</text>
      <text class="click-res" v-for="(item, index) in propFnResList" :key="index">{{item}}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
  type PropFn = () => string

  const propA = {
    class: 'foo',
    onClick: () : string => 'propA click res'
  }
  const propB = {
    class: { bar: true },
    onClick: () : string => 'propB click res'
  }
  const mergedProps = ref({})
  const propFnResList = ref<string[]>([])

  mergedProps.value = mergeProps(propA, propB)

  const triggerMergedClick = () => {
    (mergedProps.value['onClick'] as PropFn[]).forEach(fn => { propFnResList.value.push(fn()) })
  }
</script>
```

> 选项式 API
```vue
<template>
  <view class="page">
    <view class="mb-10 flex flex-row justify-between">
      <text>merged class</text>
      <text id="merged-class">{{mergedProps['class']}}</text>
    </view>
    <button class="mb-10" id="trigger-merged-click" @click="triggerMergedClick">trigger merged onClick</button>
    <view>
      <text class="mb-10">prop function result list</text>
      <text class="click-res" v-for="(item, index) in propFnResList" :key="index">{{item}}</text>
    </view>
  </view>
</template>

<script lang="uts">
  type PropFn = () => string
  export default {
    data() {
      return {
        propA: {
          class: 'foo',
          onClick: () : string => 'propA click res'
        },
        propB: {
          class: { bar: true },
          onClick: () : string => 'propB click res'
        },
        mergedProps: {},
        propFnResList: [] as string[],
      }
    },
    onLoad() {
      this.mergedProps = mergeProps(this.propA, this.propB)
    },
    methods: {
      triggerMergedClick() {
        (this.mergedProps['onClick'] as PropFn[]).forEach(fn => { this.propFnResList.push(fn()) })
      }
    }
  }
</script>
```
:::

#### cloneVNode()

克隆一个 vnode。

- 详细信息

  返回一个克隆的 vnode，可在原有基础上添加一些额外的 prop。

  Vnode 被认为是一旦创建就不能修改的，你不应该修改已创建的 vnode 的 prop，而应该附带不同的/额外的 prop 来克隆它。

  Vnode 具有特殊的内部属性，因此克隆它并不像 object spread 一样简单。cloneVNode() 处理了大部分这样的内部逻辑。

- 示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/render-function/cloneVNode/cloneVNode-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/render-function/cloneVNode/cloneVNode-options

> 组合式 API
```vue
<script setup lang="uts">
  defineOptions({
    render() : VNode {
      const originalVNode = h('view', { class: 'original' }, [
        h('text', {}, 'Hello World'),
      ])
      const clonedVNode = cloneVNode(originalVNode, { class: 'cloned' })

      return h('view', { class: 'flex flex-col' }, [originalVNode, clonedVNode])
    }
  })
</script>

<style>
  .original {
    background-color: #ff0000;
  }

  .cloned {
    background-color: #00ff00;
  }
</style>
```

> 选项式 API
```vue
<script lang="uts">
  export default {
    render() : VNode {
      const originalVNode = h('view', { class: 'original' }, [
        h('text', {}, 'Hello World'),
      ])
      const clonedVNode = cloneVNode(originalVNode, { class: 'cloned' })

      return h('view', { class: 'flex flex-col' }, [originalVNode, clonedVNode])
    }
  }
</script>

<style>
  .original {
    background-color: #ff0000;
  }

  .cloned {
    background-color: #00ff00;
  }
</style>
```
:::

#### isVNode()

判断一个值是否为 vnode 类型。

- 示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/render-function/isVNode/isVNode-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/render-function/isVNode/isVNode-options

> 组合式 API
```vue
<template>
  <view class="page">
    <view class="mb-10 flex flex-row justify-between">
      <text>isVNode VNode:</text>
      <text id="is-vnode-vnode">{{ isVNodeVNode }}</text>
    </view>
    <view class="mb-10 flex flex-row justify-between">
      <text>isVNode string:</text>
      <text id="is-vnode-string">{{ isVNodeString }}</text>
    </view>
  </view>
</template>

<script setup lang="uts">
  const isVNodeVNode = ref(false)
  const isVNodeString = ref(false)
  const vnode = h('text', {}, 'Hello World')
  isVNodeVNode.value = isVNode(vnode)
  isVNodeString.value = isVNode('abc')
</script>
```

> 选项式 API
```vue
<template>
  <view class="page">
    <view class="mb-10 flex flex-row justify-between">
      <text>isVNode VNode:</text>
      <text id="is-vnode-vnode">{{ isVNodeVNode }}</text>
    </view>
    <view class="mb-10 flex flex-row justify-between">
      <text>isVNode string:</text>
      <text id="is-vnode-string">{{ isVNodeString }}</text>
    </view>
  </view>
</template>

<script lang="uts">
  export default {
    data() {
      return {
        isVNodeVNode: false,
        isVNodeString: false
      }
    },
    onLoad() {
      const vnode = h('text', {}, 'Hello World')
      this.isVNodeVNode = isVNode(vnode)
      this.isVNodeString = isVNode('abc')
    }
  }
</script>
```
:::

#### resolveComponent()

按名称手动解析已注册的组件。

- 详细信息

  备注：如果你可以直接引入组件就不需使用此方法。

  为了能从正确的组件上下文进行解析，`resolveComponent()` 必须在 `setup()` 或渲染函数内调用。

  如果组件未找到，会抛出一个运行时警告，并返回组件名字符串。

- 示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/render-function/resolveComponent/resolveComponent-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/render-function/resolveComponent/resolveComponent-options

> 组合式 API
```vue
<script setup lang="uts">
  defineOptions({
    render() : VNode {
      const CompForAppComponent = resolveComponent('CompForAppComponent')
      return h(CompForAppComponent)
    }
  })
</script>

```

> 选项式 API
```vue
<script lang="uts">
  export default {
    setup() {
      const CompForAppComponent = resolveComponent('CompForAppComponent')

      return ():VNode => {
        return h(CompForAppComponent)
      }
    }
  }
</script>
```
:::

#### withDirectives()

用于给 vnode 增加自定义指令。

- 详细信息

  用自定义指令包装一个现有的 vnode。第二个参数是自定义指令数组。每个自定义指令也可以表示为 `[Directive, value, argument, modifiers]` 形式的数组。如果不需要，可以省略数组的尾元素。

- 示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/render-function/withDirectives/withDirectives-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/render-function/withDirectives/withDirectives-options

> 组合式 API
```vue
<script setup lang="ts">
  defineOptions({
    data() {
      return {
        isMounted: false
      }
    },
    render() : VNode {
      const instance = getCurrentInstance()!.proxy!
      
      const customDirective = {
        mounted(el : UniElement, binding : DirectiveBinding, vnode : VNode, prevVNode: VNode | null) {
          console.log(el, binding, vnode, prevVNode)
          instance.$data['isMounted'] = true
        }
      } as Directive
      return h('view', { class: 'page' }, [
        withDirectives(h('text', 'Hello World'), [[customDirective]]),
        h('view', { class: 'mt-10 flex flex-row justify-between' }, [
          h('text', {}, `isMounted:`),
          h('text', { id: 'is-mounted' }, `${instance.$data['isMounted']}`),
        ])
      ])
    }
  })
</script>
```

> 选项式 API
```vue
<script lang="uts">
  export default {
    data() {
      return {
        isMounted: false
      }
    },
    render() : VNode {
      const instance = this

      const customDirective = {
        mounted(el : UniElement, binding : DirectiveBinding, vnode : VNode, prevVNode : VNode | null) {
          console.log(el, binding, vnode, prevVNode)
          instance.$data['isMounted'] = true
        }
      } as Directive
      return h('view', { class: 'page' }, [
        withDirectives(h('text', 'Hello World'), [[customDirective]]),
        h('view', { class: 'mt-10 flex flex-row justify-between' }, [
          h('text', {}, `isMounted:`),
          h('text', { id: 'is-mounted' }, `${instance.$data['isMounted']}`),
        ])
      ])
    }
  }
</script>
```
:::

#### withModifiers()

用于向事件处理函数添加内置 [v-on](./built-in.md#v-on) 修饰符。
