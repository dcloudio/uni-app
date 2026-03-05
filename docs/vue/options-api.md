# 选项式 API @options-api

选项式 API，要求在script里编写`export default {}`，在其中定义data、methods、生命周期等选项。

## 状态选项

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| data | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |
| props | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |
| computed | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |
| methods | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |
| watch | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |
| emits | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |
| expose | 4.0 | 4.41 | x | x | x |

### 示例代码 @example

#### data

用于声明组件初始响应式状态的函数。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/data/data-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/data/data-options
```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>str: </text>
      <text id="str">{{ str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>num: </text>
      <text id="num">{{ num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>arr: </text>
      <text id="arr">{{ arr.join(',') }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.str: </text>
      <text id="obj-str">{{ obj.str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.num: </text>
      <text id="obj-num">{{ obj.num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.arr: </text>
      <text id="obj-arr">{{ obj.arr.join(',') }}</text>
    </view>
    <view ref='htmlRef' id="idRef" class="flex justify-between flex-row mb-10">
      <text>data 存储 element不需要被包装</text>
      <text id="isSameRefText">{{ refElementIsSame }}</text>
    </view>

    <button @click="updateData">update data</button>
  </view>
</template>

<script lang="uts">
  type Obj = {
    str : string,
    num : number,
    arr : number[]
  }
  export default {
    data() {
      return {
        str: 'default str',
        num: 0,
        arr: [1, 2, 3],
        // 特殊类型需要通过 as 指定类型
        obj: {
          str: 'default obj.str',
          num: 10,
          arr: [4, 5, 6]
        } as Obj,
        refElement: null as UniElement | null,
        refElementIsSame: false
      }
    },
    methods: {
      refTest() {
        const queryElementById1 = uni.getElementById('idRef')
        const queryElementById2 = uni.getElementById('idRef')
        const htmlRefElement = this.$refs['htmlRef'] as UniElement;
        this.refElement = htmlRefElement
        if (queryElementById1 === queryElementById2
          && queryElementById1 === htmlRefElement
          && queryElementById1 === this.refElement) {
          this.refElementIsSame = true
        }
      },
      updateData() {
        this.str = 'new str'
        this.num = 1
        this.arr = [4, 5, 6]

        this.obj.str = 'new obj.str'
        this.obj.num = 100
        this.obj.arr = [7, 8, 9]

        this.refTest()


      },
    },
  }
</script>

```
:::

#### props

用于声明一个组件的 props。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/props/props-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/props/props-options
```vue
<template>
  <view class="page">
    <array-literal :str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <object-type str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <same-name-prop-default-value />
    <props-with-defaults />
    <!-- #ifdef APP-ANDROID -->
    <reference-types :list="[1,2,3]" />
    <!-- #endif -->
    <!-- #ifndef APP-ANDROID -->
    <reference-types :list="['a','b','c']" />
    <!-- #endif -->
  </view>
</template>

<script lang="uts">
  import ArrayLiteral from './array-literal-options.uvue'
  import ObjectType from "./object-type-options.uvue";
  import SameNamePropDefaultValue from "./same-name-prop-default-value-options.uvue";
  import PropsWithDefaults from "./props-with-defaults.uvue";
  import ReferenceTypes from './reference-types-options.uvue'

  export default {
    components: {
      ArrayLiteral,
      ObjectType,
      SameNamePropDefaultValue,
      PropsWithDefaults,
      ReferenceTypes
    },
    data() {
      return {
        str: 'str',
        num: 10,
        bool: true,
        obj: { age: 18 },
        arr: ['a', 'b', 'c']
      }
    },
  }
</script>
```
:::

#### computed

用于声明要在组件实例上暴露的计算属性。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/computed/computed-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/computed/computed-options

```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>count:</text>
      <text id="count">{{ count }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>computed double count:</text>
      <text id="double-count">{{ doubleCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>computed triple count:</text>
      <text id="triple-count">{{ tripleCount }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.arr:</text>
      <text id="obj-arr">{{ JSON.stringify(obj.arr) }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>computed obj.arr.length:</text>
      <text id="obj-arr-len">{{ objArrLen }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
        <text>computed stateText(1):</text>
        <text id="computed-with-argument">{{ stateText(1) }}</text>
    </view>
    <button id="update-btn" @click="update">update</button>
  </view>
</template>

<script lang="uts">
type Obj = {
  arr : number[]
}

export default {
  data(){
    return {
      count: 0,
      obj:{
        arr: [1,2,3]
      } as Obj
    }
  },
  computed: {
    doubleCount(): number {
      return this.count * 2
    },
    tripleCount(): number {
      return this.count * 3
    },
    objArrLen(): number {
      return this.obj.arr.length
    },
    stateText() {
      return (state: number) => {
        const stateArr = ['未审核', '审核中', '审核通过']
        return stateArr[state]
      }
    }
  },
  methods: {
    update(){
      this.count++
      this.obj.arr.push(this.obj.arr.length + 1)
    }
  }
}
</script>

```

:::

#### methods

用于声明要混入到组件实例中的方法。

声明的方法可以直接通过组件实例访问，或者在模板语法表达式中使用。所有的方法都会将它们的 `this` 上下文自动绑定为组件实例，即使在传递时也如此。

在声明方法时避免使用箭头函数，因为它们不能通过 `this` 访问组件实例。

[详情点击查看](./component.md#page-call-component-method)

#### watch

用于声明在数据更改时调用的侦听回调。

::: warning 注意
- `watch immediate` 第一次调用时，App-Android 平台旧值为初始值，web 平台为 null。
:::

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/watch/watch-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/watch/watch-options

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1; padding-bottom: 20px">
  <!-- #endif -->
    <view class="page">
      <view class="flex justify-between flex-row mb-10">
        <text>count:</text>
        <text id="count" ref="countRef">{{ count }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count result:</text>
        <text id="watch-count-res">{{ watchCountRes }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch count track number:</text>
        <text id="watch-count-track-num">{{ watchCountTrackNum }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count cleanup number:</text>
        <text id="watch-count-cleanup-res">{{ watchCountCleanupRes }}</text>
      </view>

      <button class="increment-btn mb-10" @click="increment">increment</button>
      <button class="stop-watch-count-btn mb-10" @click="triggerStopWatchCount">
        stop watch count
      </button>

      <view class="flex justify-between flex-row mb-10">
        <text>obj.str:</text>
        <text id="obj-str" ref="objStrRef">{{ obj.str }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch obj.str trigger number:</text>
        <text id="watch-obj-str-trigger-num">{{ watchObjStrTriggerNum }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.num:</text>
        <text id="obj-num">{{ obj.num }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.bool:</text>
        <text id="obj-bool" ref="objBoolRef">{{ obj.bool }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.arr:</text>
        <text id="obj-arr" ref="objArrRef">{{ JSON.stringify(obj.arr) }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj result:</text>
        <text id="watch-obj-res">{{ watchObjRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.str result:</text>
        <text id="watch-obj-str-res">{{ watchObjStrRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.bool result:</text>
        <text id="watch-obj-bool-res">{{ watchObjBoolRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.arr result:</text>
        <text id="watch-obj-arr-res">{{ watchObjArrRes }}</text>
      </view>

      <button class="update-obj-btn mb-10" @click="updateObj">
        update obj
      </button>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
  type Obj = {
    num : number,
    str : string,
    bool : boolean,
    arr : number[]
  }

  export default {
    data() {
      return {
        countRef: null as UniTextElement | null,
        count: 0,
        watchCountRes: '',
        watchCountCleanupRes: '',
        watchCountTrackNum: 0,
        stopWatchCount: () => { },
        obj: {
          num: 0,
          str: 'num: 0',
          bool: false,
          arr: [0]
        } as Obj,
        watchObjRes: '',
        objStrRef: null as UniTextElement | null,
        watchObjStrRes: '',
        watchObjStrTriggerNum: 0,
        objBoolRef: null as UniTextElement | null,
        watchObjBoolRes: '',
        watchObjArrRes: '',
      }
    },
    onReady() {
      // TODO: app-android this.$watch 返回类型不对
      // watchCountTrackNum 各端表现也不一致
      const self = this
      // #ifdef APP
      this.$watch('count',
        (count : number, prevCount : number, onCleanup : OnCleanup) => {
          this.watchCountRes = `count: ${count}, prevCount: ${prevCount}, count ref text (flush sync): ${(this.$refs['countRef'] as UniTextElement).value}`
          const cancel = () => {
            this.watchCountCleanupRes = `watch count cleanup: ${count}`
          }
          onCleanup(cancel)
        },
        {
          // 侦听器在响应式依赖改变时立即触发
          flush: 'sync',
          // 响应属性或引用作为依赖项被跟踪时调用
          onTrack(event : DebuggerEvent) {
            if (event.type === 'get') {
              self.watchCountTrackNum++
            }
          }
          // TODO: vue>3.4.15 开始 监听函数、onTrack、onTrigger 同时存在修改响应式数据时,会报错 Maximum call stack size exceeded
          // 所以将 onTrack 与 onTrigger 调整到两个 watch 里
        })
      // #endif
      // #ifdef WEB
      this.stopWatchCount = this.$watch(
        'count',
        (count : number, prevCount : number, onCleanup : OnCleanup) => {
          this.watchCountRes = `count: ${count}, prevCount: ${prevCount}, count ref text (flush sync): ${(this.$refs['countRef'] as UniTextElement).childNodes[0].getAttribute('value')}`
          const cancel = () => {
            this.watchCountCleanupRes = `watch count cleanup: ${count}`
          }
          onCleanup(cancel)
        },
        {
          // 侦听器在响应式依赖改变时立即触发
          flush: 'sync',
          // 响应属性或引用作为依赖项被跟踪时调用
          onTrack(event : DebuggerEvent) {
            if (event.type === 'get') {
              self.watchCountTrackNum++
            }
          }
          // TODO: 3.5.22 以上代码也会报错 Maximum call stack size exceeded，因为页面渲染读取 count，count 被 $watch 侦听，这个读取操作会触发 onTrack 钩子函数
          // onTrack 中修改了响应式数据 watchCountTrackNum，响应式数据的修改都会通知 Vue 进行重新渲染，再次读取 count，形成死循环
          // TODO: vue>3.4.15 开始 监听函数、onTrack、onTrigger 同时存在修改响应式数据时,会报错 Maximum call stack size exceeded
          // 所以将 onTrack 与 onTrigger 调整到两个 watch 里
        })
      // #endif
    },
    watch: {
      obj: {
        handler(obj : Obj, prevObj ?: Obj) {
          if (prevObj == null) {
            this.watchObjRes = `obj: {"num":${obj.num},"str":"${obj.str}","bool":${obj.bool},"arr":${JSON.stringify(obj.arr)}}, prevObj: ${JSON.stringify(prevObj)}`
          } else {
            // #ifdef WEB
            this.watchObjRes = `obj: {"num":${obj.num},"str":"${obj.str}","bool":${obj.bool},"arr":${JSON.stringify(obj.arr)}}, prevObj: {"num":${prevObj?.num},"str":"${prevObj?.str}","bool":${prevObj?.bool},"arr":${JSON.stringify(prevObj?.arr)}}`
            // #endif
            // #ifndef WEB
            this.watchObjRes = `obj: {"num":${obj.num},"str":"${obj.str}","bool":${obj.bool},"arr":${JSON.stringify(obj.arr)}}, prevObj: {"num":${prevObj.num},"str":"${prevObj.str}","bool":${prevObj.bool},"arr":${JSON.stringify(prevObj.arr)}}`
            // #endif
          }
        },
        // immediate: true 第一次触发, 旧值应该是 undefined, 现在 app 是初始值
        immediate: true,
        deep: true
      },
      'obj.str': function (str : string, prevStr : string) {
        // #ifdef APP
        this.watchObjStrRes = `str: ${str}, prevStr: ${prevStr}, obj.str ref text (flush pre): ${(this.$refs['objStrRef'] as UniTextElement).value}`
        // #endif
        // #ifdef WEB
        this.watchObjStrRes = `str: ${str}, prevStr: ${prevStr}, obj.str ref text (flush pre): ${(this.$refs.objStrRef as UniTextElement).childNodes[0].getAttribute('value')}`
        // #endif
      },
      'obj.bool': {
        handler: function (bool : boolean, prevBool : boolean) {
          // #ifdef APP
          this.watchObjBoolRes = `bool: ${bool}, prevBool: ${prevBool}, obj.bool ref text (flush post): ${(this.$refs['objBoolRef'] as UniTextElement).value}`
          // #endif
          // #ifdef WEB
          this.watchObjBoolRes = `bool: ${bool}, prevBool: ${prevBool}, obj.bool ref text (flush post): ${(this.$refs.objBoolRef as UniTextElement).childNodes[0].getAttribute('value')}`
          // #endif
        },
        // 侦听器延迟到组件渲染之后触发
        flush: 'post',
        deep: true
      },
      'obj.arr': {
        handler: function (arr : number[], prevArr : number[]) {
          this.watchObjArrRes = `arr: ${JSON.stringify(arr)}, prevArr: ${JSON.stringify(prevArr)}`
        },
        deep: true
      }
    },
    methods: {
      triggerStopWatchCount() {
        // #ifdef WEB
        this.stopWatchCount()
        // #endif
      },
      increment() {
        this.count++
      },
      updateObj() {
        this.obj.num++
        this.obj.str = `num: ${this.obj.num}`
        this.obj.bool = !this.obj.bool
        this.obj.arr.push(this.obj.num)
      }
    }
  }
</script>
```

:::

#### emits

用于声明由组件触发的自定义事件。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/emit-function/emit-function-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/emit-function/emit-function-options

```vue
<template>
  <view>
    <button @click="click" class="call-parent-btn">调用父组件事件</button>
  </view>
</template>

<script>
export default {
  emits: ['callback'],
  methods: {
    click () {
      this.$emit('callback', `${Date.now()}`)
    }
  }
}
</script>

<style scoped>

</style>

```

:::

## 渲染选项 @rendering-options

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| template | x | 4.41 | x | x | 4.61 |
| render | 4.0 | - | 3.9 | 4.11 | 4.61 |
| compilerOptions | x | x | x | x | 4.61 |
| slots | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |

### 示例代码 @example

#### template

用于声明组件的字符串模板。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/built-in/special-elements/template/template-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/built-in/special-elements/template/template-options
```vue
<template>
  <view class="page">
    <template v-if="dataInfo.isShow">
      <text id="title">{{ title }}</text>
    </template>
    <template v-else>
      <text>隐藏标题时显示</text>
    </template>
    <text class="mt-10 btn" id="show-botton" @click="handleShow">{{ dataInfo.isShow ? '点击隐藏' : '点击显示' }}</text>
    <template v-for="(item, index) in list" :key="index">
      <text :class="'item'">{{ index + 1 }}.{{ item.name }}</text>
    </template>
    <button @click="goMapStyle">跳转绑定 Map 类型 style 页面</button>
  </view>
</template>

<script lang='uts'>
type DataInfo = {
  isShow: boolean
}
type objType = {
  name : string
}
export default {
  data() {
    return {
      title: "hello",
      dataInfo: {
        isShow: false,
      } as DataInfo,
      list: [{
        name: 'foo1'
      },
      {
        name: 'foo2'
      }
      ] as objType[]
    }
  },
  methods: {
    handleShow() {
      this.dataInfo.isShow = !this.dataInfo.isShow
    },
    goMapStyle() {
      uni.navigateTo({ url: '/pages/built-in/special-elements/template/template-map-style-options' })
    }
  }
}
</script>

<style>
.btn{
  border: 1px solid #eee;
  border-radius: 4px;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
}
.item {
  margin: 15px;
  padding: 4px 8px;
  border: #eee solid 1px;
}
</style>

```
:::

#### render

用于编程式地创建组件虚拟 DOM 树的函数。

`render` 是字符串模板的一种替代，可以使你利用 JavaScript 的丰富表达力来完全编程式地声明组件最终的渲染输出。

预编译的模板，例如单文件组件中的模板，会在构建时被编译为 `render` 选项。如果一个组件中同时存在 `render` 和 `template，则` `render` 将具有更高的优先级。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/render-function/render/render-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/render-function/render/render-options
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

#### slots

一个在渲染函数中以编程方式使用插槽时辅助类型推断的选项。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-slot/v-slot-options.uvue)

作用域插槽需在组件中指定插槽数据类型
::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-slot/v-slot-options

```vue
<template>
  <view class="page">
    <Foo>
      <template #header="{ msg }">
        <view class="mb-10 flex justify-between flex-row">
          <text>header slot msg:</text>
          <text id="slot-header">{{ msg }}</text>
        </view>
      </template>
      <template #default="{ num }">
        <view class="mb-10 flex justify-between flex-row">
          <text>default slot num:</text>
          <text id="slot-default">{{ num }}</text>
        </view>
      </template>
      <!-- #ifndef MP -->
      <template v-for="item in 2" #[`num${item}`]="{ num }">
        <view class="mb-10 flex justify-between flex-row">
          <text>num{{ item }} slot:</text>
          <text :id="`slot-num${item}`">{{ num }}</text>
        </view>
      </template>
      <template v-if="msgTrue['isShow']" #[msgTrue['name']]="{ msg }">
        <view class="mb-10 flex justify-between flex-row">
          <text>{{ msgTrue['name'] }} slot msg:</text>
          <text id="slot-msg-true">{{ msg }}</text>
        </view>
      </template>
      <template v-if="msgFalse['isShow']" #[msgFalse['name']]="{ msg }">
        <view class="mb-10 flex justify-between flex-row">
          <text>{{ msgFalse['name'] }} slot msg:</text>
          <text id="slot-msg-false">{{ msg }}</text>
        </view>
      </template>
      <!-- #endif -->
      <template #footer="{ arr }">
        <view class="mb-10 flex justify-between flex-row">
          <text>footer slot arr:</text>
          <text id="slot-footer">{{ JSON.stringify(arr) }}</text>
        </view>
      </template>
    </Foo>
  </view>
</template>

<script lang="uts">
import Foo from './Foo-options.uvue'
export default {
  components: {Foo},
  data(){
    return {
      msgTrue: {
        isShow: true,
        name: 'msgTrue'
      },
      msgFalse: {
        isShow: false,
        name: 'msgFalse'
      }
    }
  }
}
</script>

```

:::

## 生命周期选项 @lifecycle-options

> [页面及组件生命周期流程图](../page.md#lifecycleflow)

### 页面生命周期 @page-lifecycle-options

#### 兼容性 @page-lifecycle-compatibility

[页面生命周期](../page.md#lifecycle)

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/lifecycle/page/page-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/lifecycle/page/page-options

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1" :bounces="false">
    <!-- #endif -->
    <view class="page container">
      <text>page lifecycle 选项式 API</text>
      <view class="flex flex-row justify-between mt-10">
        <text>onLoad 触发：</text>
        <text>{{ isOnloadTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onShow 触发：</text>
        <text>{{ isOnShowTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onReady 触发：</text>
        <text>{{ isOnReadyTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onPullDownRefresh 触发：</text>
        <text>{{ isOnPullDownRefreshTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onReachBottom 触发：</text>
        <text>{{ isOnReachBottomTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onBackPress 触发：</text>
        <text>{{ isOnBackPressTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onHide 触发：</text>
        <text>{{ isOnHideTriggered }}</text>
      </view>
      <view class="flex flex-row justify-between mt-10">
        <text>onResize 触发：</text>
        <text>{{ isOnResizeTriggered }}</text>
      </view>
			<MonitorPageLifecycleOptions />
      <button class="mt-10" @click="scrollToBottom">scrollToBottom</button>
      <button class="mt-10" @click="pullDownRefresh">
        trigger pullDownRefresh
      </button>
			<button class="mt-10" @click="goOnBackPress">
        跳转 onBackPress 示例
      </button>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
import { state, setLifeCycleNum } from '@/store/index.uts'
import MonitorPageLifecycleOptions from './monitor-page-lifecycle-options.uvue'
 type DataInfo = {
 	isScrolled: boolean
 }
export default {
	components: { MonitorPageLifecycleOptions },
	data() {
		return {
			isOnloadTriggered: false,
			isOnShowTriggered: false,
			isOnReadyTriggered: false,
			isOnPullDownRefreshTriggered: false,
			isOnPageScrollTriggered: false,
			isOnReachBottomTriggered: false,
			isOnBackPressTriggered: false,
			isOnHideTriggered: false,
			isOnResizeTriggered: false,
			dataInfo: {
         isScrolled: false,
       } as DataInfo
		}
	},
	onLoad(options : OnLoadOptions) {
		console.log('onLoad', options)
		this.isOnloadTriggered = true
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum + 100)
	},
	onShow() {
		this.isOnShowTriggered = true
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum + 10)
	},
	onReady() {
		this.isOnReadyTriggered = true
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum + 10)
	},
	onPullDownRefresh() {
		this.isOnPullDownRefreshTriggered = true
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum + 10)
	},
	onPageScroll(e: OnPageScrollOptions) {
		console.log('onPageScroll', e)
  	this.isOnPageScrollTriggered = true
		// 自动化测试
		this.dataInfo.isScrolled = true
	},
	onReachBottom() {
		this.isOnReachBottomTriggered = true
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum + 10)
	},
	onBackPress(options : OnBackPressOptions) : boolean | null {
		console.log('onBackPress', options)
		this.isOnBackPressTriggered = true
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum - 10)
		return null
	},
	onHide() {
		this.isOnHideTriggered = true
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum - 10)
	},
	onUnload() {
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum - 100)
	},
	onResize(options: OnResizeOptions) {
		console.log('onBackPress', options)
		this.isOnResizeTriggered = true
		// 自动化测试
		setLifeCycleNum(state.lifeCycleNum + 10)
	},
	methods: {
		// 自动化测试
		pageGetLifeCycleNum() : number {
			return state.lifeCycleNum
		},
		// 自动化测试
		pageSetLifeCycleNum(num : number) {
			setLifeCycleNum(num)
		},
		// 自动化测试
		pullDownRefresh() {
			uni.startPullDownRefresh({
				success() {
					setTimeout(() => {
						uni.stopPullDownRefresh()
						// 一秒后立即停止下拉刷新不会触发 onPullDownRefresh，因为下拉动画时间大概需要1.1～1.2秒
					}, 1500)
				},
			})
		},
		scrollToBottom() {
			uni.pageScrollTo({
				scrollTop: 2000,
			})
		},
		goOnBackPress() {
			uni.navigateTo({url: '/pages/lifecycle/page/onBackPress/on-back-press-options'})
		}
	},
}
</script>

<style>
.container {
  height: 1200px;
}
</style>

```

:::

### 组件生命周期 @page-component-options

#### 兼容性 @component-lifecycle-compatibility

|  | Web | 微信小程序 | Android | iOS | HarmonyOS | 描述 |
| :- | :- | :- | :- | :- | :- | :- |
| beforeCreate | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件实例初始化完成之后立即调用。<br/>在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。 |
| created | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件实例处理完所有与状态相关的选项后调用。<br/>在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。<br/>然而，此时挂载阶段还未开始，因此 $el 属性仍不可用。 |
| beforeMount | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件被挂载之前调用。<br/>相关的 render 函数首次被调用。<br/>当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。<br/>它即将首次执行 DOM 渲染过程。 |
| mounted | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件被挂载之后调用。<br/>el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。<br/>如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。 |
| beforeUpdate | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件即将因为一个响应式状态变更而更新其 DOM 树之前调用。<br/>数据更新时调用，发生在虚拟 DOM 打补丁之前。<br/>这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。 |
| updated | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在组件因为一个响应式状态变更而更新其 DOM 树之后调用。<br/>父组件的更新钩子将在其子组件的更新钩子之后调用。<br/>这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。<br/>如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 nextTick() 作为替代。 |
| beforeUnmount | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在一个组件实例被卸载之前调用。<br/>当这个钩子被调用时，组件实例依然还保有全部的功能。 |
| unmounted | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 在一个组件实例被卸载之后调用。<br/>可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。 |
| errorCaptured | 4.0 | 4.41 | x | x | x | 在捕获了后代组件传递的错误时调用。<br/>这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串。<br/>这个钩子可以通过返回 false 来阻止错误继续向上传递。 |
| renderTracked | 4.0 | 4.41 | x | x | x | 在一个响应式依赖被组件的渲染作用追踪后调用。<br/>跟踪虚拟 DOM 重新渲染时调用。钩子接收 debugger event 作为参数。<br/>此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。 |
| renderTriggered | 4.0 | 4.41 | x | x | x | 在一个响应式依赖被组件触发了重新渲染之后调用。<br/>当虚拟 DOM 重新渲染为 triggered.Similarly 为renderTracked，接收 debugger event 作为参数。<br/>此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。 |
| activated | 4.0 | x | 4.0 | 4.11 | 4.61 | 若组件实例是 \<KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用。<br/>keep-alive 组件激活时调用。 |
| deactivated | 4.0 | x | 4.0 | 4.11 | 4.61 | 若组件实例是 \<KeepAlive> 缓存树的一部分，当组件从 DOM 中被移除时调用。<br/>keep-alive 组件停用时调用。 |
| serverPrefetch | x | x | x | x | x | 当组件实例在服务器上被渲染之前要完成的异步函数。<br/>如果这个钩子返回了一个 Promise，服务端渲染会在渲染该组件前等待该 Promise 完成。 |

#### mounted、unmounted 使用注意事项 @mounted-unmounted-tips

目前 mounted、unmounted 可以保证当前数据已经同步到 DOM，但是由于排版和渲染是异步的的，所以 mounted、unmounted 不能保证 DOM 排版以及渲染完毕。\
如果需要获取排版后的节点信息推荐使用 [uni.createSelectorQuery](../api/nodes-info.md) 不推荐直接使用 [Element](../dom/unielement.md) 对象。\
在修改 DOM 后，立刻使用 [Element](../dom/unielement.md) 对象的同步接口获取 DOM 状态可能获取到的是排版之前的，而 [uni.createSelectorQuery](../api/nodes-info.md) 可以保障获取到的节点信息是排版之后的。

#### activated、deactivated 使用注意事项 @activated-deactivated-tips

当 A 页面存在 `keepAlive` 组件，A 页面 `navigateTo` B 页面时
- Web 端 A 页面中 `keepAlive` 的组件会触发 `deactivated` 生命周期
- App 端 A 页面中 `keepAlive` 的组件不会触发 `deactivated` 生命周期

当 B 页面 back 返回 A 页面时
- Web 端 A 页面中 `keepAlive` 的组件会触发 `activated` 生命周期
- App 端 A 页面中 `keepAlive` 的组件不会触发 `activated` 生命周期

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/lifecycle/component/ChildComponentOptions.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/lifecycle/component/ChildComponentOptions

```vue
<template>
  title: {{ title }}
  <button class="component-lifecycle-btn mt-10" @click="updateTitle">
    updateTitle
  </button>
</template>

<script lang='uts'>
  import { state, setLifeCycleNum } from '@/store/index.uts';
  export default {
    name: 'OptionsAPIComponentLifecycle',
    data() {
      return {
        title: 'component for options API lifecycle test',
      };
    },
    beforeCreate() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test beforeCreate');
    },
    created() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test created');
    },
    beforeMount() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test beforeMount');
    },
    mounted() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test mounted');
    },
    beforeUpdate() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test beforeUpdate');
    },
    updated() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test updated');
    },
    beforeUnmount() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum - 1);
      console.log('component for lifecycle test beforeUnmount');
    },
    unmounted() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum - 1);
      console.log('component for lifecycle test unmounted');
    },
    activated() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum + 1);
      console.log('component for lifecycle test activated');
    },
    deactivated() {
      // 自动化测试
      setLifeCycleNum(state.lifeCycleNum - 1);
      console.log('component for lifecycle test deactivated');
    },
    methods: {
      updateTitle() {
        this.title = 'component for lifecycle test updated';
      },
    },
  };
</script>
```

:::


## 组合选项 @options-composition

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| provide | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| inject | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| mixins | 4.0 | 4.41 | 3.99 | 4.11 | 4.61 |
| extends | - | - | - | - | - |

### inject

当使用 `inject` 声明从上层提供方注入的属性时，支持两种写法：字符串数组和对象。推荐使用对象写法，因为当使用数组方法时，类型会被推导为 `any | null` 类型。\
使用对象写法时，额外增加 `type` 属性用于标记类型。如果注入的属性类型不是基础数据类型，需要通过 `PropType` 来标记类型：

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/inject/inject-options-1.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/provide/provide-options-1

> inject 1

```vue
<template>
  <view>
    <text class="mt-10 bold">component for inject 1</text>
    <text class="mt-10 alias-provide-page-title"
      >aliasProvidePageTitle: {{ aliasProvidePageTitle }}</text
    >
    <text class="mt-10 provide-page-str"
      >providePageStr: {{ providePageStr }}</text
    >
    <text class="mt-10 provide-page-num"
      >providePageNum: {{ providePageNum }}</text
    >
    <text class="mt-10 provide-page-bool"
      >providePageBool: {{ providePageBool }}</text
    >
    <text class="mt-10 provide-page-object-title"
      >providePageObject.title: {{ providePageObject['title'] }}</text
    >
    <text class="mt-10 provide-page-object-content"
      >providePageObject.content: {{ providePageObject['content'] }}</text
    >
    <text class="mt-10 provide-page-arr"
      >providePageArr: {{ JSON.stringify(providePageArr) }}</text
    >
   <text class="mt-10 provide-page-map"
      >providePageMap: {{ JSON.stringify(providePageMapObj) }}</text
    >
    <text class="mt-10 provide-page-set"
      >providePageSet: {{ JSON.stringify(providePageSetArr) }}</text
    >
    <text class="mt-10 test-inject-string-default-value"
      >testInjectStringDefaultValue: {{ testInjectStringDefaultValue }}</text
    >
    <text class="mt-10 test-inject-object-default-value-title"
      >testInjectObjectDefaultValue.title:
      {{ testInjectObjectDefaultValue['title'] }}</text
    >
    <text class="mt-10 test-inject-object-default-value-content"
      >testInjectObjectDefaultValue.content:
      {{ testInjectObjectDefaultValue['content'] }}</text
    >
  </view>
</template>

<script lang="uts">
export default {
  inject: {
    aliasProvidePageTitle: {
      type: String,
      from: 'providePageTitle',
      default: 'default alias provide page title'
    },
    providePageStr: {
      type: String,
      default: 'default provide page str'
    },
    providePageNum: {
      type: Number,
      default: 0
    },
    providePageBool: {
      type: Boolean,
      default: false
    },
    providePageObject: {
      type: UTSJSONObject,
      default: (): UTSJSONObject => {
        return {
          title: 'default provide page object title',
          content: 'default provide page object content'
        }
      }
    },
    providePageArr: {
      type: Array as PropType<String[]>,
      default: (): String[] => {
        return ['default provide page arr']
      }
    },
    providePageMap: {
      type: Object as PropType<Map<string, string>>,
      default: (): Map<string, string> => {
        return new Map<string, string>([['key', 'default provide page map']])
      }
    },
    providePageSet: {
      type: Object as PropType<Set<string>>,
      default: (): Set<string> => {
        return new Set<string>(['default provide page set'])
      }
    },
    testInjectStringDefaultValue: {
      type: String,
      default: 'test inject string default value'
    },
    testInjectObjectDefaultValue: {
      type: UTSJSONObject,
      default(): UTSJSONObject {
        return {
          title: 'test inject object default value title',
          content: 'test inject object default value content'
        }
      }
    }
  },
	computed: {
		providePageMapObj(): UTSJSONObject {
			const obj: UTSJSONObject = {}
			this.providePageMap.forEach((value, key) => {
				obj[key] = value
			})
			return obj
		},
		providePageSetArr(): string[] {
			const arr: string[] = []
			this.providePageSet.forEach((value) => {
				arr.push(value)
			})
			return arr
		}
	}
}
</script>

```

> inject 2

```vue
<template>
  <view>
    <text class="mt-10 bold">component for inject 2</text>
    <text class="mt-10 provide-page-title"
      >providePageTitle: {{ providePageTitle }}</text
    >
    <text class="mt-10 provide-page-str">providePageStr: {{ providePageStr }}</text>
    <text class="mt-10 provide-page-num">providePageNum: {{ providePageNum }}</text>
    <text class="mt-10 provide-page-bool">providePageBool: {{ providePageBool }}</text>
    <text class="mt-10 provide-page-object-title"
      >providePageObject.title: {{ providePageObject['title'] }}</text
    >
    <text class="mt-10 provide-page-object-content"
      >providePageObject.content: {{ providePageObject['content'] }}</text
    >
    <text class="mt-10 provide-page-arr">providePageArr: {{ JSON.stringify(providePageArr) }}</text>
    <text class="mt-10 provide-page-map">providePageMap: {{ JSON.stringify(providePageMapObj) }}</text>
    <text class="mt-10 provide-page-set">providePageSet: {{ JSON.stringify(providePageSetArr) }}</text>
  </view>
</template>

<script lang="uts">
export default {
  inject: {
    providePageTitle: {
      type: String,
      default: 'default provide page title'
    },
    providePageStr: {
      type: String,
      default: 'default provide page str'
    },
    providePageNum: {
      type: Number,
      default: 0
    },
    providePageBool: {
      type: Boolean,
      default: false
    },
    providePageObject: {
      type: UTSJSONObject,
      default: (): UTSJSONObject => {
        return {
          title: 'default provide page object title',
          content: 'default provide page object content'
        }
      }
    },
    providePageArr: {
      type: Array as PropType<String[]>,
      default: (): String[] => {
        return ['default provide page arr']
      }
    },
    providePageMap: {
      type: Object as PropType<Map<string, string>>,
      default: (): Map<string, string> => {
        return new Map<string, string>([['key', 'default provide page map']])
      }
    },
    providePageSet: {
      type: Object as PropType<Set<string>>,
      default: (): Set<string> => {
        return new Set<string>(['default provide page set'])
      }
    },
  },
	computed: {
		providePageMapObj(): UTSJSONObject {
			const obj: UTSJSONObject = {}
			this.providePageMap.forEach((value, key) => {
				obj[key] = value
			})
			return obj
		},
		providePageSetArr(): string[] {
			const arr: string[] = []
			this.providePageSet.forEach((value) => {
				arr.push(value)
			})
			return arr
		}
	}
}
</script>

```

:::


### mixins

一个包含组件选项对象的数组，这些选项都将被混入到当前组件的实例中。

`mixins` 选项接受一个 mixin 对象数组。这些 mixin 对象可以像普通的实例对象一样包含实例选项，它们将使用一定的选项合并逻辑与最终的选项进行合并。举例来说，如果你的 mixin 包含了一个 `created` 钩子，而组件自身也有一个，那么这两个函数都会被调用。

- `mixins` 仅支持通过字面量对象方式和 `defineMixin` 函数方式定义。
- 在 app-android 平台, `App.uvue` 不支持 `mixins`，全局 mixins 也不会对 `App.uvue` 生效，另外也不支持运行时根据条件动态构造mixins。
  ```ts
  const mixin1 = defineMixin({
    onLoad() {
      console.log('mixin1 onLoad')
    }
  })
  export default {
    mixins: [
      mixin1,
      {
        data() {
          return {
            mixin2: 'mixin2'
          }
        }
      }
    ]
  }
  ```
- 同名属性会被覆盖，同名生命周期会依次执行。同名属性的优先级如下：
  - 在 `app.mixin` 内嵌入的 mixin `<` 在 `app.mixin` 中声明的 mixin `<` 在 `page.mixin` 内嵌入的 mixin `<` 在 `page.mixin` 中声明的 mixin `<` 在 `component.mixin` 内嵌入的 mixin `<` 在 `component.mixin` 中声明的 mixin
  - 同名生命周期的执行顺序如下：
    1. 在 `app.mixin` 内嵌入的 mixin
    2. 在 `app.mixin` 中声明的 mixin
    3. 在 `page.mixin` 内嵌入的 mixin
    4. 在 `page.mixin` 中声明的 mixin
    5. 在 `component.mixin` 内嵌入的 mixin
    6. 在 `component.mixin` 中声明的 mixin

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/mixins/mixins-web

示例 [详情](<!-- VUEJSON.E_component-instance.mixins-app-page-namesake.gitUrl -->)

> mixins-web

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
    <!-- #endif -->
    <view class="page">
      <text id="mixin-prop" class="mb-10">mixinProp: {{mixinProp}}</text>
      <text id="mixin-data-msg" class="mb-10">mixinDataMsg: {{mixinDataMsg}}</text>
      <text id="mixin-onload-msg" class="mb-10">mixinOnloadMsg: {{mixinOnloadMsg}}</text>
      <text id="mixin-computed" class="mb-10">mixinComputed: {{mixinComputed}}</text>

      <Comp1 title="title" @globalMixinEmit1="(arg: string) => handleMixinEmitter('globalMixinEmit1', arg)"
        @globalChildMixinEmit1="(arg: string) => handleMixinEmitter('globalChildMixinEmit1', arg)"
        @globalMixinEmit2="(arg: string) => handleMixinEmitter('globalMixinEmit2', arg)"
        @globalChildMixinEmit2="(arg: string) => handleMixinEmitter('globalChildMixinEmit2', arg)"
        @mixinEmit="(arg: string) => handleMixinEmitter('mixinEmit', arg)"
        @childMixinEmit="(arg: string) => handleMixinEmitter('childMixinEmit', arg)" />
      <text v-if="handleMixinEmitterMsg" class="mt-10 handle-mixin-emitter-msg">
        handleMixinEmitterMsg: {{ handleMixinEmitterMsg }}
      </text>
      <Comp2 class='comp2' title="title" />
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
  import Comp1 from './components/Comp1.uvue'
  import Comp2 from './components/Comp2.uvue'
  export default {
    components: {
      Comp1,
      Comp2,
    },
    mixins: [defineMixin({
      props: {
        mixinProp: {
          type: String,
          default: '通过字面量定义非全局 mixin props'
        }
      },
      data() {
        return {
          handleMixinEmitterMsg: '',
          mixinDataMsg: '通过字面量定义非全局 mixin data',
          mixinOnloadMsg: ''
        }
      },
      computed: {
        mixinComputed(): string {
          const res = `通过字面量定义非全局 mixin computed, 更新后的 mixinOnloadMsg: ${this.mixinOnloadMsg}`
          console.log(res)
          return res
        }
      },
      onLoad() {
        this.mixinOnloadMsg = 'mixin onLoad msg in onLoad'
      },
      methods: {
        mixinMethod(): string {
          const res = '通过字面量定义非全局 mixin method'
          console.log(res)
          return res
        },
        handleMixinEmitter(emit: string, arg: string) {
          this.handleMixinEmitterMsg = `触发 ${emit}, 参数为 ${arg}`
          console.log(this.handleMixinEmitterMsg)
        }
      },
    })]
  }
</script>

```

> mixins-app-page-namesake

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
    <!-- #endif -->
    <view class="page">
      <text class="bold">props:</text>
      <text class="mt-10 namesake-mixin-prop">{{ namesakeMixinProp }}</text>
      <text class="mt-10 namesake-child-mixin-prop">{{ namesakeChildMixinProp }}</text>

      <text class="bold mt-10">data:</text>
      <text class="mt-10 namesake-mixin-data-msg">{{ namesakeMixinDataMsg }}</text>
      <text class="mt-10 namesake-child-mixin-data-msg">{{ namesakeChildMixinDataMsg }}</text>

      <text class="bold mt-10">computed:</text>
      <text class="mt-10 namesake-mixin-computed">{{ namesakeMixinComputed }}</text>
      <text class="mt-10 namesake-child-mixin-computed">{{ namesakeChildMixinComputed }}</text>

      <text class="mt-10 bold">method:</text>
      <text class="mt-10 namesake-mixin-method">{{ namesakeMixinMethod() }}</text>
      <text class="mt-10 namesake-child-mixin-method">{{ namesakeChildMixinMethod() }}</text>

      <text class="mt-10 bold">mixin component:</text>
      <GlobalMixinComp1 />
      <GlobalChildMixinComp1 />
      <GlobalMixinComp2 />
      <GlobalChildMixinComp2 />
      <MixinComp1 />
      <ChildMixinComp1 />
      <MixinComp2 />
      <ChildMixinComp2 />
      <MixinComp />
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
import MixinComp2 from './components/MixinComp2.uvue'
import ChildMixinComp2 from './components/ChildMixinComp2.uvue'
import CompForPage from './components/CompForPage.uvue'
import { pageMixin } from './mixins'

export default {
  components: {
    MixinComp: CompForPage
  },
  mixins: [
    pageMixin,
    {
      mixins: [{
        components: {ChildMixinComp2},
        props: {
          childMixinProp2: {
            type: String,
            default: '通过字面量定义非全局 child mixin props'
          },
          namesakeChildMixinProp: {
            type: String,
            default: '通过字面量定义非全局同名 child mixin props'
          }
        },
        data() {
          return {
            childMixinDataMsg2: '通过字面量定义非全局 child mixin data',
            namesakeChildMixinDataMsg: '通过字面量定义非全局同名 child mixin data',
            childMixinOnLoadMsg2: '',
            childMixinWatchMsg2: ''
          }
        },
        computed: {
          childMixinComputed2(): string {
            const res = `通过字面量定义非全局 child mixin computed, 更新后的 childMixinOnLoadMsg2: ${this.childMixinOnLoadMsg2}`
            console.log(res)
            return res
          },
          namesakeChildMixinComputed(): string {
            const res = '通过字面量定义非全局同名 child mixin computed'
            console.log(res)
            return res
          }
        },
        watch: {
          globalMixinOnloadMsg1(newVal: string) {
            this.childMixinWatchMsg2 = `通过字面量定义非全局 child mixin watch, 更新后的 globalMixinOnloadMsg1: ${newVal}`
            console.log(this.childMixinWatchMsg2)
          },
        },
        onLoad() {
          const res = '通过字面量定义非全局 child mixin onLoad'
          console.log(res)
          this.childMixinOnLoadMsg2 = res
        },
        methods: {
          childMixinMethod2(): string {
            const res = '通过字面量定义非全局 child mixin method'
            console.log(res)
            return res
          },
          namesakeChildMixinMethod(): string {
            const res = '通过字面量定义非全局同名 child mixin method'
            console.log(res)
            return res
          },
        },
      }],
      components: {MixinComp2},
      props: {
        mixinProp2: {
          type: String,
          default: '通过字面量定义非全局 mixin props'
        },
        namesakeMixinProp: {
          type: String,
          default: '通过字面量定义非全局同名 mixin props'
        }
      },
      data() {
        return {
          mixinDataMsg2: '通过字面量定义非全局 mixin data',
          namesakeMixinDataMsg: '通过字面量定义非全局同名 mixin data',
          mixinOnloadMsg2: '',
          mixinWatchMsg2: ''
        }
      },
      computed: {
        mixinComputed2(): string {
          const res = `通过字面量定义非全局 mixin computed, 更新后的 mixinOnloadMsg2: ${this.mixinOnloadMsg2}`
          console.log(res)
          return res
        },
        namesakeMixinComputed(): string {
          const res = '通过字面量定义非全局同名 mixin computed'
          console.log(res)
          return res
        }
      },
      watch: {
        globalMixinOnloadMsg1(newVal: string) {
          this.mixinWatchMsg2 = `通过 defineMixin 定义非全局 child mixin watch, 更新后的 globalMixinOnloadMsg1: ${newVal}`
          console.log(this.mixinWatchMsg2)
        },
      },
      onLoad() {
        const res = '通过字面量定义非全局 mixin onLoad'
        console.log(res)
        this.mixinOnloadMsg2 = res
      },
      methods: {
        mixinMethod2(): string {
          const res = '通过字面量定义非全局 mixin method'
          console.log(res)
          return res
        },
        namesakeMixinMethod(): string {
          const res = '通过字面量定义非全局同名 mixin method'
          console.log(res)
          return res
        }
      },
    },
  ],
  props: {
    namesakeMixinProp: {
      type: String,
      default: '页面内的同名 props'
    },
    namesakeChildMixinProp: {
      type: String,
      default: '页面内的同名 child props'
    },
  },
  data(){
    return {
      namesakeMixinDataMsg: '页面内的同名 data',
      namesakeChildMixinDataMsg: '页面内的同名 child data',
      mixinWatchMsg: ''
    }
  },
  watch: {
    globalMixinOnloadMsg1(newVal: string) {
      this.mixinWatchMsg = `页面内部定义的 watch, 更新后的 globalMixinOnloadMsg1: ${newVal}`
      console.log(this.mixinWatchMsg)
    },
  },
  computed: {
    namesakeMixinComputed(): string {
      const res = '页面内的同名 computed'
      console.log(res)
      return res
    },
    namesakeChildMixinComputed(): string {
      const res = '页面内的同名 child computed'
      console.log(res)
      return res
    }
  },
  methods: {
    namesakeMixinMethod(): string {
      const res = '页面内的同名 method'
      console.log(res)
      return res
    },
    namesakeChildMixinMethod(): string {
      const res = '页面内的同名 child method'
      console.log(res)
      return res
    },
  }
}
</script>

```

> mixins-app

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
    <!-- #endif -->
    <view class="page">
      <button type="primary" @click="goMixinPageNamesake">go mixin page namesake</button>
      <text class="mt-10 bold">props:</text>
      <text class="mt-10 global-mixin-prop-1">{{ globalMixinProp1 }}</text>
      <text class="mt-10 global-child-mixin-prop-1">{{ globalChildMixinProp1 }}</text>
      <text class="mt-10 global-mixin-prop-2">{{ globalMixinProp2 }}</text>
      <text class="mt-10 global-child-mixin-prop-2">{{ globalChildMixinProp2 }}</text>
      <text class="mt-10 mixin-prop-1">{{ mixinProp1 }}</text>
      <text class="mt-10 child-mixin-prop-1">{{ childMixinProp1 }}</text>
      <text class="mt-10 mixin-prop-2">{{ mixinProp2 }}</text>
      <text class="mt-10 child-mixin-prop-2">{{ childMixinProp2 }}</text>
      <text class="mt-10 namesake-mixin-prop">{{ namesakeMixinProp }}</text>
      <text class="mt-10 namesake-child-mixin-prop">{{ namesakeChildMixinProp }}</text>

      <text class="bold mt-10">data:</text>
      <text class="mt-10 global-mixin-data-msg-1">{{ globalMixinDataMsg1 }}</text>
      <text class="mt-10 global-child-mixin-data-msg-1">{{ globalChildMixinDataMsg1 }}</text>
      <text class="mt-10 global-mixin-data-msg-2">{{ globalMixinDataMsg2 }}</text>
      <text class="mt-10 global-child-mixin-data-msg-2">{{ globalChildMixinDataMsg2 }}</text>
      <text class="mt-10 mixin-data-msg-1">{{ mixinDataMsg1 }}</text>
      <text class="mt-10 child-mixin-data-msg-1">{{ childMixinDataMsg1 }}</text>
      <text class="mt-10 mixin-data-msg-2">{{ mixinDataMsg2 }}</text>
      <text class="mt-10 child-mixin-data-msg-2">{{ childMixinDataMsg2 }}</text>
      <text class="mt-10 namesake-mixin-data-msg">{{ namesakeMixinDataMsg }}</text>
      <text class="mt-10 namesake-child-mixin-data-msg">{{ namesakeChildMixinDataMsg }}</text>

      <text class="bold mt-10">computed:</text>
      <text class="mt-10 global-mixin-computed-1">{{ globalMixinComputed1 }}</text>
      <text class="mt-10 global-child-mixin-computed-1">{{ globalChildMixinComputed1 }}</text>
      <text class="mt-10 global-mixin-computed-2">{{ globalMixinComputed2 }}</text>
      <text class="mt-10 global-child-mixin-computed-2">{{ globalChildMixinComputed2 }}</text>
      <text class="mt-10 mixin-computed-1">{{ mixinComputed1 }}</text>
      <text class="mt-10 child-mixin-computed-1">{{ childMixinComputed1 }}</text>
      <text class="mt-10 mixin-computed-2">{{ mixinComputed2 }}</text>
      <text class="mt-10 child-mixin-computed-2">{{ childMixinComputed2 }}</text>
      <text class="mt-10 namesake-mixin-computed">{{ namesakeMixinComputed }}</text>
      <text class="mt-10 namesake-child-mixin-computed">{{ namesakeChildMixinComputed }}</text>

      <text class="bold mt-10">watch:</text>
      <text class="mt-10 global-mixin-watch-1">{{ globalMixinWatchMsg1 }}</text>
      <text class="mt-10 global-child-mixin-watch-1">{{ globalChildMixinWatchMsg1 }}</text>
      <text class="mt-10 global-mixin-watch-2">{{ globalMixinWatchMsg2 }}</text>
      <text class="mt-10 global-child-mixin-watch-2">{{ globalChildMixinWatchMsg2 }}</text>
      <text class="mt-10 mixin-watch-1">{{ mixinWatchMsg1 }}</text>
      <text class="mt-10 child-mixin-watch-1">{{ childMixinWatchMsg1 }}</text>
      <text class="mt-10 mixin-watch-2">{{ mixinWatchMsg2 }}</text>
      <text class="mt-10 child-mixin-watch-2">{{ childMixinWatchMsg2 }}</text>
      <text class="mt-10 mixin-watch">{{ mixinWatchMsg }}</text>

      <text class="bold mt-10">lifecycle:</text>
      <text class="mt-10">{{ globalMixinOnloadMsg1 }}</text>
      <text class="mt-10">{{ globalMixinOnloadMsg2 }}</text>
      <text class="mt-10">{{ globalChildMixinOnloadMsg1 }}</text>
      <text class="mt-10">{{ globalChildMixinOnloadMsg2 }}</text>
      <text class="mt-10">{{ mixinOnloadMsg1 }}</text>
      <text class="mt-10">{{ mixinOnloadMsg2 }}</text>
      <text class="mt-10">{{ childMixinOnloadMsg1 }}</text>
      <text class="mt-10">{{ childMixinOnloadMsg2 }}</text>
      <text class="mt-10">{{ onloadMsg }}</text>

      <text class="mt-10 bold">method:</text>
      <text class="mt-10 global-mixin-method-1">{{ globalMixinMethod1() }}</text>
      <text class="mt-10 global-child-mixin-method-1">{{ globalChildMixinMethod1() }}</text>
      <text class="mt-10 global-mixin-method-2">{{ globalMixinMethod2() }}</text>
      <text class="mt-10 global-child-mixin-method-2">{{ globalChildMixinMethod2() }}</text>
      <text class="mt-10 mixin-method-1">{{ mixinMethod1() }}</text>
      <text class="mt-10 child-mixin-method-1">{{ childMixinMethod1() }}</text>
      <text class="mt-10 mixin-method-2">{{ mixinMethod2() }}</text>
      <text class="mt-10 child-mixin-method-2">{{ childMixinMethod2() }}</text>
      <text class="mt-10 namesake-mixin-method">{{ namesakeMixinMethod() }}</text>
      <text class="mt-10 namesake-child-mixin-method">{{ namesakeChildMixinMethod() }}</text>

      <text class="mt-10 bold">component:</text>
      <Comp1
        title="title"
        @globalMixinEmit1="(arg: string) => handleMixinEmitter('globalMixinEmit1', arg)"
        @globalChildMixinEmit1="(arg: string) => handleMixinEmitter('globalChildMixinEmit1', arg)"
        @globalMixinEmit2="(arg: string) => handleMixinEmitter('globalMixinEmit2', arg)"
        @globalChildMixinEmit2="(arg: string) => handleMixinEmitter('globalChildMixinEmit2', arg)"
        @mixinEmit="(arg: string) => handleMixinEmitter('mixinEmit', arg)"
        @childMixinEmit="(arg: string) => handleMixinEmitter('childMixinEmit', arg)" />
      <text v-if="handleMixinEmitterMsg" class="mt-10 handle-mixin-emitter-msg"
        >handleMixinEmitterMsg: {{ handleMixinEmitterMsg }}</text
      >
      <Comp2 class='comp2' title="title" />
      <text class="mt-10 bold">mixin component:</text>
      <GlobalMixinComp1 />
      <GlobalChildMixinComp1 />
      <GlobalMixinComp2 />
      <GlobalChildMixinComp2 />
      <MixinComp1 />
      <ChildMixinComp1 />
      <MixinComp2 />
      <ChildMixinComp2 />
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
import Comp1 from './components/Comp1.uvue'
import Comp2 from './components/Comp2.uvue'
import MixinComp2 from './components/MixinComp2.uvue'
import ChildMixinComp2 from './components/ChildMixinComp2.uvue'
import { pageMixin } from './mixins'

export default {
  components: {
    Comp1,
    Comp2,
  },
  mixins: [
    pageMixin,
    {
      mixins: [{
        components: {ChildMixinComp2},
        props: {
          childMixinProp2: {
            type: String,
            default: '通过字面量定义非全局 child mixin props'
          },
          namesakeChildMixinProp: {
            type: String,
            default: '通过字面量定义非全局同名 child mixin props'
          }
        },
        data() {
          return {
            childMixinDataMsg2: '通过字面量定义非全局 child mixin data',
            namesakeChildMixinDataMsg: '通过字面量定义非全局同名 child mixin data',
            childMixinOnloadMsg2: '',
            childMixinOnloadTime2: 0,
            childMixinWatchMsg2: ''
          }
        },
        computed: {
          childMixinComputed2(): string {
            const res = `通过字面量定义非全局 child mixin computed, 更新后的 childMixinOnloadMsg2: ${this.childMixinOnloadMsg2}`
            console.log(res)
            return res
          },
          namesakeChildMixinComputed(): string {
            const res = '通过字面量定义非全局同名 child mixin computed'
            console.log(res)
            return res
          }
        },
        watch: {
          globalMixinOnloadMsg1(newVal: string) {
            this.childMixinWatchMsg2 = `通过字面量定义非全局 child mixin watch, 更新后的 globalMixinOnloadMsg1: ${newVal}`
            console.log(this.childMixinWatchMsg2)
          },
        },
        onLoad() {
          this.childMixinOnloadTime2 = Date.now()
          const res = '通过字面量定义非全局 child mixin onLoad'
          console.log(res)
          this.childMixinOnloadMsg2 = res
        },
        methods: {
          childMixinMethod2(): string {
            const res = '通过字面量定义非全局 child mixin method'
            console.log(res)
            return res
          },
          namesakeChildMixinMethod(): string {
            const res = '通过字面量定义非全局同名 child mixin method'
            console.log(res)
            return res
          },
        },
      }],
      components: {MixinComp2},
      props: {
        mixinProp2: {
          type: String,
          default: '通过字面量定义非全局 mixin props'
        },
        namesakeMixinProp: {
          type: String,
          default: '通过字面量定义非全局同名 mixin props'
        }
      },
      data() {
        return {
          mixinDataMsg2: '通过字面量定义非全局 mixin data',
          namesakeMixinDataMsg: '通过字面量定义非全局同名 mixin data',
          mixinOnloadMsg2: '',
          mixinOnloadTime2: 0,
          mixinWatchMsg2: ''
        }
      },
      computed: {
        mixinComputed2(): string {
          const res = `通过字面量定义非全局 mixin computed, 更新后的 mixinOnloadMsg2: ${this.mixinOnloadMsg2}`
          console.log(res)
          return res
        },
        namesakeMixinComputed(): string {
          const res = '通过字面量定义非全局同名 mixin computed'
          console.log(res)
          return res
        }
      },
      watch: {
        globalMixinOnloadMsg1(newVal: string) {
          this.mixinWatchMsg2 = `通过字面量定义非全局 mixin watch, 更新后的 globalMixinOnloadMsg1: ${newVal}`
          console.log(this.mixinWatchMsg2)
        },
      },
      onLoad() {
        this.mixinOnloadTime2 = Date.now()
        const res = '通过字面量定义非全局 mixin onLoad'
        console.log(res)
        this.mixinOnloadMsg2 = res
      },
      methods: {
        mixinMethod2(): string {
          const res = '通过字面量定义非全局 mixin method'
          console.log(res)
          return res
        },
        namesakeMixinMethod(): string {
          const res = '通过字面量定义非全局同名 mixin method'
          console.log(res)
          return res
        }
      },
    },
  ],
  data(){
    return {
      handleMixinEmitterMsg: '',
      mixinWatchMsg: '',
      mixinOnloadTime: 0,
      onloadMsg: ''
    }
  },
  watch: {
    globalMixinOnloadMsg1(newVal: string) {
      this.mixinWatchMsg = `页面内部定义的 watch, 更新后的 globalMixinOnloadMsg1: ${newVal}`
      console.log(this.mixinWatchMsg)
    },
  },
  onLoad(){
    this.mixinOnloadTime = Date.now()
    const res = '页面内的 onLoad'
    console.log(res)
    this.onloadMsg = res
  },
  methods: {
    goMixinPageNamesake(){
      uni.navigateTo({url: './mixins-app-page-namesake'})
    },
    handleMixinEmitter(emit: string, arg: string){
      this.handleMixinEmitterMsg = `触发 ${emit}, 参数为 ${arg}`
      console.log(this.handleMixinEmitterMsg)
    }
  }
}
</script>

```

:::


## 其他杂项

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| name | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |
| inheritAttrs | 4.0 | - | 3.9 | 4.11 | 4.61 |
| components | 4.0 | 4.41 | 3.9 | 4.11 | 4.61 |
| directives | - | - | - | - | - |


### 示例代码 @example

#### name

用于显式声明组件展示时的名称。

组件的名字有以下用途：

- 在组件自己的模板中递归引用自己时
- 在 Vue 开发者工具中的组件树显示时
- 在组件抛出的警告追踪栈信息中显示时

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/circular-reference/circular-reference-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/circular-reference/circular-reference-options


```vue
<template>
  <view class="page">
    <!-- #ifdef APP-ANDROID -->
    <!-- TODO: ios & web 不支持 a b 互相引用 -->
    <child-a :limit="5" />
    <!-- #endif -->
    <child-c :limit="5" />
  </view>
</template>

<script lang='uts'>
  // #ifdef APP-ANDROID
  import ChildA from './ChildA-options.uvue'
  // #endif
  import ChildC from './ChildC-options.uvue'

  export default {
    components: {
      // #ifdef APP-ANDROID
      ChildA,
      // #endif
      ChildC
    }
  }
</script>
```

:::

#### inheritAttrs

用于控制是否启用默认的组件 attribute 透传行为。

默认情况下，父组件传递的，但没有被子组件解析为 props 的 attributes 绑定会被“透传”。这意味着当我们有一个单根节点的子组件时，这些绑定会被作为一个常规的 attribute 应用在子组件的根节点元素上。当你编写的组件想要在一个目标元素或其他组件外面包一层时，可能并不期望这样的行为。我们可以通过设置 `inheritAttrs` 为 `false` 来禁用这个默认行为。这些 attributes 可以通过 `$attrs` 这个实例属性来访问，并且可以通过 `v-bind` 来显式绑定在一个非根节点的元素上。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/mixins/mixins-web.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/mixins/mixins-web

> inheritAttrs: true

```vue
<template>
  <view class="mt-10" ref="mixin-comp-root">
    <text class="bold">Comp1: inheritAttrs: false</text>
    <text class="mt-10" style="color:#ccc;"
      >rootElementTitle should be null</text
    >
    <text class="mt-10 root-element-title-1">rootElementTitle: {{ rootElementTitle }}</text>
    <!-- #ifdef APP -->
    <text class="mt-10 bold">trigger emitter:</text>
    <button class="mt-10 global-mixin-emit-1" @click="triggerEmitter('globalMixinEmit1')">
      trigger globalMixinEmit1
    </button>
    <button
      class="mt-10 global-child-mixin-emit-1"
      @click="triggerEmitter('globalChildMixinEmit1')">
      trigger globalChildMixinEmit1
    </button>
    <button class="mt-10 global-mixin-emit-2" @click="triggerEmitter('globalMixinEmit2')">
      trigger globalMixinEmit2
    </button>
    <button
      class="mt-10 global-child-mixin-emit-2"
      @click="triggerEmitter('globalChildMixinEmit2')">
      trigger globalChildMixinEmit2
    </button>
    <button class="mt-10 mixin-emit" @click="triggerEmitter('mixinEmit')">
      trigger mixinEmit
    </button>
    <button class="mt-10 child-mixin-emit" @click="triggerEmitter('childMixinEmit')">
      trigger childMixinEmit
    </button>
    <MixinComp />
    <!-- #endif -->
  </view>
</template>

<script lang="uts">
export default {
  mixins:[{
    mixins: [{
      emits: ['childMixinEmit']
    }],
    inheritAttrs: false,
    emits:['mixinEmit']
  }],
  data(){
    return {
      rootElementTitle: '' as string | null
    }
  },
  mounted(){
    const rootElement = this.$refs['mixin-comp-root'] as UniElement
    this.rootElementTitle = JSON.stringify(rootElement.getAttribute('title'))
  },
  methods: {
    triggerEmitter(emit: string){
      this.$emit(emit, emit)
    },
  }
}
</script>

```

> inheritAttrs: false

```vue
<template>
  <view class="mt-10" ref="mixin-comp-root">
    <text class="bold">Comp2: inheritAttrs: true</text>
    <text class="mt-10" style="color:#ccc;">rootElementTitle should not be null</text>
    <text class="mt-10 root-element-title-2">rootElementTitle: {{ rootElementTitle }}</text>
    <text class="mt-10">{{ namesakeMixinProp }}</text>
    <text class="mt-10">{{ namesakeMixinDataMsg }}</text>
    <text class="mt-10">{{ namesakeMixinComputed }}</text>
    <text class="mt-10 mixin-watch-msg">{{ mixinWatchMsg }}</text>
    <text class="mt-10">{{ namesakeMixinMethod() }}</text>
    <button class="mt-10" @click="changeGlobalMixinOnloadMsg1">
      change globalMixinOnloadMsg1
    </button>
    <MixinComp />
  </view>
</template>

<script lang="uts">
  import CompForComp from './CompForComp.uvue'

  export default {
    mixins: [{
      inheritAttrs: true,
    }],
    components: { MixinComp: CompForComp },
    props: {
      namesakeMixinProp: {
        type: String,
        default: '组件内部的同名 props'
      }
    },
    data() {
      return {
        namesakeMixinDataMsg: '组件内部的同名 data',
        mixinWatchMsg: '',
        rootElementTitle: '' as string | null
      }
    },
    computed: {
      namesakeMixinComputed() : string {
        const res = '组件内部的同名 computed'
        console.log(res)
        return res
      }
    },
    mounted() {
      const rootElement = this.$refs['mixin-comp-root'] as UniElement
      this.rootElementTitle = rootElement.getAttribute('title')
    },
    watch: {
      globalMixinOnloadMsg1(newVal : string) {
        this.mixinWatchMsg = `组件内部定义的 watch, 更新后的 globalMixinOnloadMsg1: ${newVal}`
        console.log(this.mixinWatchMsg)
      },
    },
    methods: {
      namesakeMixinMethod() : string {
        const res = '组件内部的同名 method'
        console.log(res)
        return res
      },
      changeGlobalMixinOnloadMsg1() {
        // #ifdef WEB
        (this.globalMixinOnloadMsg1 as string) = 'new globalMixinOnloadMsg1 changed in comp2'
        // #endif
        // #ifndef WEB
        this.globalMixinOnloadMsg1 = 'new globalMixinOnloadMsg1 changed in comp2'
        // #endif
      }
    }
  }
</script>
```

:::

#### components

一个对象，用于注册对当前组件实例可用的组件。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/attrs/attrs-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/attrs/attrs-options

```vue
<template>
  <view class="page">
    <child
      class="child-class"
      str="str from parent"
      style="background-color: lightblue;"
      @childClick="() => {}" />

    <child-multi-tag
      class="child-class"
      str="str from parent"
      style='background-color: lightblue;'
      @childClick="() => {}" />
  </view>
</template>

<script lang="uts">
import child from './child-options.uvue'
import childMultiTag from './child-composition-multi-tag.uvue'
export default {
  components: {
    child,
    childMultiTag
  },
}
</script>

```

:::

- 参考[组件](./component.md)

## 组件实例 @component-instance

|  | Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| $data | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $props | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $attrs | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $slots | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $refs | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $parent | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $root | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $options | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $nextTick | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $forceUpdate | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $el | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $callMethod | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $emit | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $watch | 4.0 | 4.41 | √ | 4.11 | x | 4.61 |
| $page | 4.31 | - | 4.31 | 4.31 | x | - |

### 示例代码 @example

#### $data

从 `data` 选项函数中返回的对象，会被组件赋为响应式。组件实例将会代理对其数据对象的属性访问。

##### 使用注意事项 @options-data

data内 $ 开头的属性不可直接使用 `this.$xxx`访问，需要使用 `this.$data['$xxx']` ，这是vue的规范

> 目前安卓端可以使用 this.$xxx 访问是Bug而非特性，请勿使用此特性。

示例

```vue
<template>
  <view></view>
</template>
<script>
export default {
  data() {
    return {
      $a: 1
    }
  },
  onReady() {
    console.log(this.$data['$a'] as number) // 1
  }
}
</script>
```


示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/data/data-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/data/data-options
```vue
<template>
  <view class="page">
    <view class="flex justify-between flex-row mb-10">
      <text>str: </text>
      <text id="str">{{ str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>num: </text>
      <text id="num">{{ num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>arr: </text>
      <text id="arr">{{ arr.join(',') }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.str: </text>
      <text id="obj-str">{{ obj.str }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.num: </text>
      <text id="obj-num">{{ obj.num }}</text>
    </view>
    <view class="flex justify-between flex-row mb-10">
      <text>obj.arr: </text>
      <text id="obj-arr">{{ obj.arr.join(',') }}</text>
    </view>
    <view ref='htmlRef' id="idRef" class="flex justify-between flex-row mb-10">
      <text>data 存储 element不需要被包装</text>
      <text id="isSameRefText">{{ refElementIsSame }}</text>
    </view>

    <button @click="updateData">update data</button>
  </view>
</template>

<script lang="uts">
  type Obj = {
    str : string,
    num : number,
    arr : number[]
  }
  export default {
    data() {
      return {
        str: 'default str',
        num: 0,
        arr: [1, 2, 3],
        // 特殊类型需要通过 as 指定类型
        obj: {
          str: 'default obj.str',
          num: 10,
          arr: [4, 5, 6]
        } as Obj,
        refElement: null as UniElement | null,
        refElementIsSame: false
      }
    },
    methods: {
      refTest() {
        const queryElementById1 = uni.getElementById('idRef')
        const queryElementById2 = uni.getElementById('idRef')
        const htmlRefElement = this.$refs['htmlRef'] as UniElement;
        this.refElement = htmlRefElement
        if (queryElementById1 === queryElementById2
          && queryElementById1 === htmlRefElement
          && queryElementById1 === this.refElement) {
          this.refElementIsSame = true
        }
      },
      updateData() {
        this.str = 'new str'
        this.num = 1
        this.arr = [4, 5, 6]

        this.obj.str = 'new obj.str'
        this.obj.num = 100
        this.obj.arr = [7, 8, 9]

        this.refTest()


      },
    },
  }
</script>

```
:::

#### $props

表示组件当前已解析的 props 对象。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/props/props-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/props/props-options
```vue
<template>
  <view class="page">
    <array-literal :str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <object-type str="str" :num="num" :bool="bool" :obj="obj" :arr="arr" />
    <same-name-prop-default-value />
    <props-with-defaults />
    <!-- #ifdef APP-ANDROID -->
    <reference-types :list="[1,2,3]" />
    <!-- #endif -->
    <!-- #ifndef APP-ANDROID -->
    <reference-types :list="['a','b','c']" />
    <!-- #endif -->
  </view>
</template>

<script lang="uts">
  import ArrayLiteral from './array-literal-options.uvue'
  import ObjectType from "./object-type-options.uvue";
  import SameNamePropDefaultValue from "./same-name-prop-default-value-options.uvue";
  import PropsWithDefaults from "./props-with-defaults.uvue";
  import ReferenceTypes from './reference-types-options.uvue'

  export default {
    components: {
      ArrayLiteral,
      ObjectType,
      SameNamePropDefaultValue,
      PropsWithDefaults,
      ReferenceTypes
    },
    data() {
      return {
        str: 'str',
        num: 10,
        bool: true,
        obj: { age: 18 },
        arr: ['a', 'b', 'c']
      }
    },
  }
</script>
```
:::

#### $el

该组件实例管理的 DOM 根节点。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/el/el-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/el/el-options
```vue
<template>
  <view class="page flex justify-between flex-row">
    <text class="child">root node tagName：</text>
    <text class="tag-name">{{ el }}</text>
  </view>
</template>

<script lang='uts'>
export default {
  data() {
    return {
      el: '',
    }
  },
  mounted() {
    this.el = this.$el?.nodeName ?? ''
  },
}
</script>

```
:::

#### $options

已解析的用于实例化当前组件的组件选项。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/options/options-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/options/options-options
```vue
<template>
  <view class="page">
    <view class="mb-10 flex justify-between flex-row">
      <text>component name: </text>
      <text id="component-name">{{ dataInfo.name }}</text>
    </view>
    <!-- #ifndef APP-ANDROID -->
    <view class="mb-10 flex justify-between flex-row">
      <text>custom key: </text>
      <text id="custom-key">{{ dataInfo.customKey }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>mixin data str: </text>
      <text id="mixin-data-str">{{ dataInfo.mixinDataStr }}</text>
    </view>
    <!-- #endif -->
  </view>
</template>

<script lang="uts">
import mixins from "./mixins.uts"

type DataInfo = {
  name: string
  customKey: string
  mixinDataStr: string
}

export default {
  mixins: [mixins],
  name: "$options",
  _customKey: "custom key",
  data() {
    return {
      dataInfo: {
        name: "",
        customKey: "",
        mixinDataStr: "",
      } as DataInfo
    }
  },
  mounted() {
    this.dataInfo.name = this.$options.name!
    // #ifndef APP-ANDROID
    this.dataInfo.customKey = this.$options._customKey
    // @ts-ignore
    this.dataInfo.mixinDataStr = this.$options.data({})['str']
    // #endif
  },
}
</script>

```
:::

#### $parent

当前组件可能存在的父组件实例，如果当前组件是顶层组件，则为 `null`。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/parent/parent-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/parent/parent-options
```vue
<template>
  <view class="page">
    <child ref='child' />
  </view>
</template>

<script lang='uts'>
import child from './child-options.uvue'

export default {
  components: {
    child
  },
  data() {
    return {
      str: "parent str",
      num: 1
    }
  },
  methods: {
    getNum() : number {
      return this.num
    },
    callMethodByChild(): number {
      const child = this.$refs['child'] as ComponentPublicInstance
      return child.$parent!.$callMethod('getNum') as number
    }
  }
}
</script>

```
:::


#### $root

当前组件树的根组件实例。如果当前实例没有父组件，那么这个值就是它自己。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/root/root-options.uvue)

::: preview
```vue
<template>
  <view class="page">
    <view class="mb-10 flex justify-between flex-row">
      <text>root str in parent component: </text>
      <text id="root-str-parent">{{ rootStr }}</text>
    </view>
    <child />
  </view>
</template>

<script lang="uts">
import Child from './child-options.uvue'

export default {
  components: {Child},
  data () {
    return {
      str: 'root component str',
      rootStr: ''
    }
  },
  onReady() {
    this.rootStr = this.$root!.$data['str'] as string
  }
}
</script>

```
:::


#### $slots

一个表示父组件所传入插槽的对象。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/slots/slots-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/slots/slots-options
```vue
<template>
  <view class="page">
    <SlotComp id="slot-comp">
      <template v-slot:header>header</template>
      <template v-slot:default>default</template>
      <template v-slot:footer>footer</template>
    </SlotComp>
  </view>
</template>

<script lang="uts">
  import SlotComp from './slot-options.uvue'

  export default {
    components: {
      SlotComp
    }
  }
</script>

```
:::


#### $refs

一个包含 DOM 元素和组件实例的对象，通过模板引用注册。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/refs/refs-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/refs/refs-options
```vue
<template>
  <view class="page">
    <view class="row">
      <text>NodeRef: </text>
      <text ref="node">{{ dataInfo.existRef }}</text>
    </view>
    <view class="row">
      <text>childRef:</text>
      <text>{{ dataInfo.existChildRef }}</text>
    </view>
    <view class="row">
      <text>existTextItems:</text>
      <text>{{ dataInfo.existTextItems }}</text>
    </view>
    <view>
      <text v-for="item in dataInfo.textItemsExpectNum" ref="textItems" :key="item">{{
        item
      }}</text>
    </view>
    <child class="mt-10" ref="childRef">ComponentRef</child>
  </view>
</template>

<script lang="uts">
import child from './child-options.uvue'

type DataInfo = {
  existRef: boolean
  existChildRef: boolean
  textItemsExpectNum: number
  existTextItems: boolean
}
export default {
  components: {
    child
  },
  data() {
    return {
      dataInfo: {
        existRef: false,
        existChildRef: false,
        textItemsExpectNum: 3,
        existTextItems: false
      } as DataInfo
    }
  },
  onReady() {
    this.dataInfo.existRef = this.$refs['node'] !== null
    this.dataInfo.existChildRef = this.$refs['childRef'] !== null
    const textItems = this.$refs['textItems'] as Array<UniElement>
    this.dataInfo.existTextItems = textItems.length === this.dataInfo.textItemsExpectNum
  }
}
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>

```
:::


#### $attrs

一个包含了组件所有透传 attributes 的对象。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/attrs/attrs-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/attrs/attrs-options
```vue
<template>
  <view class="page">
    <child
      class="child-class"
      str="str from parent"
      style="background-color: lightblue;"
      @childClick="() => {}" />

    <child-multi-tag
      class="child-class"
      str="str from parent"
      style='background-color: lightblue;'
      @childClick="() => {}" />
  </view>
</template>

<script lang="uts">
import child from './child-options.uvue'
import childMultiTag from './child-composition-multi-tag.uvue'
export default {
  components: {
    child,
    childMultiTag
  },
}
</script>

```
:::


#### $watch()

用于命令式地创建侦听器的 API。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/reactivity/core/watch/watch-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/reactivity/core/watch/watch-options
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1; padding-bottom: 20px">
  <!-- #endif -->
    <view class="page">
      <view class="flex justify-between flex-row mb-10">
        <text>count:</text>
        <text id="count" ref="countRef">{{ count }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count result:</text>
        <text id="watch-count-res">{{ watchCountRes }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch count track number:</text>
        <text id="watch-count-track-num">{{ watchCountTrackNum }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch count cleanup number:</text>
        <text id="watch-count-cleanup-res">{{ watchCountCleanupRes }}</text>
      </view>

      <button class="increment-btn mb-10" @click="increment">increment</button>
      <button class="stop-watch-count-btn mb-10" @click="triggerStopWatchCount">
        stop watch count
      </button>

      <view class="flex justify-between flex-row mb-10">
        <text>obj.str:</text>
        <text id="obj-str" ref="objStrRef">{{ obj.str }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>watch obj.str trigger number:</text>
        <text id="watch-obj-str-trigger-num">{{ watchObjStrTriggerNum }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.num:</text>
        <text id="obj-num">{{ obj.num }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.bool:</text>
        <text id="obj-bool" ref="objBoolRef">{{ obj.bool }}</text>
      </view>
      <view class="flex justify-between flex-row mb-10">
        <text>obj.arr:</text>
        <text id="obj-arr" ref="objArrRef">{{ JSON.stringify(obj.arr) }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj result:</text>
        <text id="watch-obj-res">{{ watchObjRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.str result:</text>
        <text id="watch-obj-str-res">{{ watchObjStrRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.bool result:</text>
        <text id="watch-obj-bool-res">{{ watchObjBoolRes }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text>watch obj.arr result:</text>
        <text id="watch-obj-arr-res">{{ watchObjArrRes }}</text>
      </view>

      <button class="update-obj-btn mb-10" @click="updateObj">
        update obj
      </button>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
  type Obj = {
    num : number,
    str : string,
    bool : boolean,
    arr : number[]
  }

  export default {
    data() {
      return {
        countRef: null as UniTextElement | null,
        count: 0,
        watchCountRes: '',
        watchCountCleanupRes: '',
        watchCountTrackNum: 0,
        stopWatchCount: () => { },
        obj: {
          num: 0,
          str: 'num: 0',
          bool: false,
          arr: [0]
        } as Obj,
        watchObjRes: '',
        objStrRef: null as UniTextElement | null,
        watchObjStrRes: '',
        watchObjStrTriggerNum: 0,
        objBoolRef: null as UniTextElement | null,
        watchObjBoolRes: '',
        watchObjArrRes: '',
      }
    },
    onReady() {
      // TODO: app-android this.$watch 返回类型不对
      // watchCountTrackNum 各端表现也不一致
      const self = this
      // #ifdef APP
      this.$watch('count',
        (count : number, prevCount : number, onCleanup : OnCleanup) => {
          this.watchCountRes = `count: ${count}, prevCount: ${prevCount}, count ref text (flush sync): ${(this.$refs['countRef'] as UniTextElement).value}`
          const cancel = () => {
            this.watchCountCleanupRes = `watch count cleanup: ${count}`
          }
          onCleanup(cancel)
        },
        {
          // 侦听器在响应式依赖改变时立即触发
          flush: 'sync',
          // 响应属性或引用作为依赖项被跟踪时调用
          onTrack(event : DebuggerEvent) {
            if (event.type === 'get') {
              self.watchCountTrackNum++
            }
          }
          // TODO: vue>3.4.15 开始 监听函数、onTrack、onTrigger 同时存在修改响应式数据时,会报错 Maximum call stack size exceeded
          // 所以将 onTrack 与 onTrigger 调整到两个 watch 里
        })
      // #endif
      // #ifdef WEB
      this.stopWatchCount = this.$watch(
        'count',
        (count : number, prevCount : number, onCleanup : OnCleanup) => {
          this.watchCountRes = `count: ${count}, prevCount: ${prevCount}, count ref text (flush sync): ${(this.$refs['countRef'] as UniTextElement).childNodes[0].getAttribute('value')}`
          const cancel = () => {
            this.watchCountCleanupRes = `watch count cleanup: ${count}`
          }
          onCleanup(cancel)
        },
        {
          // 侦听器在响应式依赖改变时立即触发
          flush: 'sync',
          // 响应属性或引用作为依赖项被跟踪时调用
          onTrack(event : DebuggerEvent) {
            if (event.type === 'get') {
              self.watchCountTrackNum++
            }
          }
          // TODO: 3.5.22 以上代码也会报错 Maximum call stack size exceeded，因为页面渲染读取 count，count 被 $watch 侦听，这个读取操作会触发 onTrack 钩子函数
          // onTrack 中修改了响应式数据 watchCountTrackNum，响应式数据的修改都会通知 Vue 进行重新渲染，再次读取 count，形成死循环
          // TODO: vue>3.4.15 开始 监听函数、onTrack、onTrigger 同时存在修改响应式数据时,会报错 Maximum call stack size exceeded
          // 所以将 onTrack 与 onTrigger 调整到两个 watch 里
        })
      // #endif
    },
    watch: {
      obj: {
        handler(obj : Obj, prevObj ?: Obj) {
          if (prevObj == null) {
            this.watchObjRes = `obj: {"num":${obj.num},"str":"${obj.str}","bool":${obj.bool},"arr":${JSON.stringify(obj.arr)}}, prevObj: ${JSON.stringify(prevObj)}`
          } else {
            // #ifdef WEB
            this.watchObjRes = `obj: {"num":${obj.num},"str":"${obj.str}","bool":${obj.bool},"arr":${JSON.stringify(obj.arr)}}, prevObj: {"num":${prevObj?.num},"str":"${prevObj?.str}","bool":${prevObj?.bool},"arr":${JSON.stringify(prevObj?.arr)}}`
            // #endif
            // #ifndef WEB
            this.watchObjRes = `obj: {"num":${obj.num},"str":"${obj.str}","bool":${obj.bool},"arr":${JSON.stringify(obj.arr)}}, prevObj: {"num":${prevObj.num},"str":"${prevObj.str}","bool":${prevObj.bool},"arr":${JSON.stringify(prevObj.arr)}}`
            // #endif
          }
        },
        // immediate: true 第一次触发, 旧值应该是 undefined, 现在 app 是初始值
        immediate: true,
        deep: true
      },
      'obj.str': function (str : string, prevStr : string) {
        // #ifdef APP
        this.watchObjStrRes = `str: ${str}, prevStr: ${prevStr}, obj.str ref text (flush pre): ${(this.$refs['objStrRef'] as UniTextElement).value}`
        // #endif
        // #ifdef WEB
        this.watchObjStrRes = `str: ${str}, prevStr: ${prevStr}, obj.str ref text (flush pre): ${(this.$refs.objStrRef as UniTextElement).childNodes[0].getAttribute('value')}`
        // #endif
      },
      'obj.bool': {
        handler: function (bool : boolean, prevBool : boolean) {
          // #ifdef APP
          this.watchObjBoolRes = `bool: ${bool}, prevBool: ${prevBool}, obj.bool ref text (flush post): ${(this.$refs['objBoolRef'] as UniTextElement).value}`
          // #endif
          // #ifdef WEB
          this.watchObjBoolRes = `bool: ${bool}, prevBool: ${prevBool}, obj.bool ref text (flush post): ${(this.$refs.objBoolRef as UniTextElement).childNodes[0].getAttribute('value')}`
          // #endif
        },
        // 侦听器延迟到组件渲染之后触发
        flush: 'post',
        deep: true
      },
      'obj.arr': {
        handler: function (arr : number[], prevArr : number[]) {
          this.watchObjArrRes = `arr: ${JSON.stringify(arr)}, prevArr: ${JSON.stringify(prevArr)}`
        },
        deep: true
      }
    },
    methods: {
      triggerStopWatchCount() {
        // #ifdef WEB
        this.stopWatchCount()
        // #endif
      },
      increment() {
        this.count++
      },
      updateObj() {
        this.obj.num++
        this.obj.str = `num: ${this.obj.num}`
        this.obj.bool = !this.obj.bool
        this.obj.arr.push(this.obj.num)
      }
    }
  }
</script>
```
:::


#### $emit()

在当前组件触发一个自定义事件。任何额外的参数都会传递给事件监听器的回调函数。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/emit-function/emit-function-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/emit-function/emit-function-options
```vue
<template>
  <view class="page">
    <view class="row">
      <text>子组件传的参数</text>
      <text id="value">
        {{ value }}
      </text>
    </view>
    <child @callback="callback"></child>
  </view>
</template>

<script>
import child from './child-options.uvue'

export default {
  components: {
    child
  },
  data () {
    return {
      value: ""
    }
  },
  methods: {
    callback (str: string) {
      this.value = str
    }
  }
}
</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>

```
:::


#### $forceUpdate()

强制该组件重新渲染。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/force-update/force-update-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/force-update/force-update-options
```vue
<template>
  <view class="page">
    <view class="split-title">$forceUpdate</view>
    <text class="mt-10 time">Date.now(): {{ Date.now() }}</text>
    <button
      class="mt-10 trigger-force-update-btn"
      type="primary"
      @click="triggerForceUpdate">
      trigger $forceUpdate
    </button>
  </view>
</template>

<script lang="uts">
export default {
  methods: {
    triggerForceUpdate(){
      this.$forceUpdate()
    }
  }
}
</script>

```
:::


#### $nextTick()

绑定在实例上的 nextTick() 函数。

##### 使用注意事项 @options-nextTick

目前 $nextTick 可以保证当前数据已经同步到 DOM，但是由于排版和渲染是异步的，所以 $nextTick 不能保证 DOM 排版以及渲染完毕。\
如果需要获取排版后的节点信息推荐使用 [uni.createSelectorQuery](../api/nodes-info.md) 不推荐直接使用 [Element](../dom/unielement.md) 对象。\
在修改 DOM 后，立刻使用 [Element](../dom/unielement.md) 对象的同步接口获取 DOM 状态可能获取到的是排版之前的，而 [uni.createSelectorQuery](../api/nodes-info.md) 可以保障获取到的节点信息是排版之后的。


示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/component-instance/nextTick/nextTick-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/component-instance/nextTick/nextTick-options
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view class="page">
      <view class="flex justify-between mb-10">
        <text ref="text">title for callback:</text>
        <text id="page-text-callback">{{ dataInfo.titleForCallback }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text ref="text">before $nextTick callback title123:</text>
        <text>{{ dataInfo.beforeNextTickCallbackTitle }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text ref="text">after $nextTick callback title:</text>
        <text>{{ dataInfo.afterNextTickCallbackTitle }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text ref="text">title for promise:</text>
        <text id="page-text-promise">{{ dataInfo.titleForPromise }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text ref="text">before $nextTick promise title:</text>
        <text>{{ dataInfo.beforeNextTickPromiseTitle }}</text>
      </view>
      <view class="flex justify-between mb-10">
        <text ref="text">after $nextTick promise title:</text>
        <text>{{ dataInfo.afterNextTickPromiseTitle }}</text>
      </view>
      <button id="page-test-next-tick-btn" @click="pageTestNextTick">page test $nextTick</button>
      <Child id="child-component" />
      <button class="mt-10" id="after-next-tick-get-text-btn" @click="afterNextTickGetText">toggle v-if text</button>
      <text v-if="showTestText" class="mt-10" id="v-if-next-tick-should-getable">测试 v-if & nextTick 后获取元素</text>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
  import Child from './child-options.uvue'
  
  type DataInfo = {
    titleForCallback : string
    beforeNextTickCallbackTitle : string
    afterNextTickCallbackTitle : string
    titleForPromise : string
    beforeNextTickPromiseTitle : string
    afterNextTickPromiseTitle : string
  }

  export default {
    components: {
      Child
    },
    data() {
      return {
        dataInfo: {
          titleForCallback: 'default title for callback',
          beforeNextTickCallbackTitle: '',
          afterNextTickCallbackTitle: '',
          titleForPromise: 'default title for promise',
          beforeNextTickPromiseTitle: '',
          afterNextTickPromiseTitle: '',
        } as DataInfo,
        showTestText: false,
        vIfNextTickTestTextGetAble: false
      }
    },
    methods: {
      pageTestNextTick() {
        this.nextTickCallback()
        this.nextTickPromise()
      },
      nextTickCallback() {
        const pageText = uni.getElementById('page-text-callback')!
        this.dataInfo.titleForCallback = 'new title for callback'

        // #ifdef APP
        this.dataInfo.beforeNextTickCallbackTitle = (pageText as UniTextElement).value
        // #endif
        // #ifdef WEB
        // @ts-ignore
        this.dataInfo.beforeNextTickCallbackTitle = pageText.textContent
        // #endif
        
        this.$nextTick(() => {
          // #ifdef APP
          this.dataInfo.afterNextTickCallbackTitle = (pageText as UniTextElement).value
          // #endif
          // #ifdef WEB
          // @ts-ignore
          this.dataInfo.afterNextTickCallbackTitle = pageText.textContent
          // #endif
        })
      },
      nextTickPromise() {
        const pageText = uni.getElementById('page-text-promise')!
        this.dataInfo.titleForPromise = 'new title for promise'

        // #ifdef APP
        this.dataInfo.beforeNextTickPromiseTitle = (pageText as UniTextElement).value
        // #endif
        // #ifdef WEB
        // @ts-ignore
        this.dataInfo.beforeNextTickPromiseTitle = pageText.textContent
        // #endif
        
        this.$nextTick().then(() => {
          // #ifdef APP
          this.dataInfo.afterNextTickPromiseTitle = (pageText as UniTextElement).value
          // #endif
          // #ifdef WEB
          // @ts-ignore
          this.dataInfo.afterNextTickPromiseTitle = pageText.textContent
          // #endif
        })
      },
      afterNextTickGetText(){
        this.showTestText = !this.showTestText
        this.$nextTick(() => {
          const text = uni.getElementById('v-if-next-tick-should-getable')
          this.vIfNextTickTestTextGetAble = text != null
          console.log('after v-if nextTick should getable text:', this.vIfNextTickTestTextGetAble)
        })
      }
    }
  }
</script>
```
:::
