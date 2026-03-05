# 内置内容

## 指令 @directives

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| v-text | 4.0 | - | x | x | x |
| v-html | 4.0 | - | 3.99 | x | x |
| v-show | 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |
| v-if | 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |
| v-else | 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |
| v-else-if | 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |
| v-for | 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |
| v-on | 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |
| v-bind | 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |
| v-model | 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |
| v-slot | 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |
| v-pre | 4.0 | - | 3.99 | 4.11 | 4.61 |
| v-once | x | - | 3.99 | 4.11 | 4.61 |
| v-memo | x | - | 3.99 | 4.11 | 4.61 |
| v-cloak | 4.0 | - | x | x | x |

### v-text

更新元素的文本内容。

- 期望的绑定值类型：string
- 详细信息

  v-text 将覆盖元素中所有现有的内容。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-text/v-text-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-text/v-text-options

>选项式 API

```vue
<template>
  <view class="page">
    <view class="flex flex-row justify-between mb-10">
      <text>v-txt for text:</text>
      <text id="v-text-text" v-text="vTextForText"></text>
    </view>
    <view class="flex flex-row justify-between mb-10">
      <text>v-txt for view:</text>
      <view id="v-text-view" v-text="vTextForView"></view>
    </view>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      vTextForText: 'v-text for text',
      vTextForView: 'v-text for view',
    }
  }
}
</script>

```

> 组合式 API

```vue
<template>
  <view class="page">
    <view class="flex flex-row justify-between mb-10">
      <text>v-txt for text:</text>
      <text id="v-text-text" v-text="vTextForText"></text>
    </view>
    <view class="flex flex-row justify-between mb-10">
      <text>v-txt for view:</text>
      <view id="v-text-view" v-text="vTextForView"></view>
    </view>
  </view>
</template>

<script setup lang="uts">
const vTextForText = ref('v-text for text')
const vTextForView = ref('v-text for view')
</script>

```

:::

### v-html

更新元素的内容，并且不会被解析。

::: warning 注意
在 `App-android` 平台，`v-html` 指令通过编译为 [rich-text](../component/rich-text.md) 组件实现。因此，`v-html` 指令的内容必须是 `rich-text` 支持的格式, 并且要遵循标签嵌套规则，例如， `swiper` 标签内只允许嵌套 `swiper-item` 标签。\
同时，受限于 `rich-text` 组件不支持 `class` 样式，`v-html` 指令中同样不支持 `class` 样式。\
绑定 `v-html` 的标签内的内容会被忽略，`v-html` 指令的内容会编译为 `rich-text` 组件渲染为该标签的子节点。
:::

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-html/v-html-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-html/v-html-options

>选项式 API

```vue
<template>
  <view v-html="html" />
</template>

<script lang="uts">
export default {
  data() {
    return {
      html: '<p class="p" style="color: red;">hello world for options API!</p>'
    }
  }
}
</script>

```

> 组合式 API

```vue
<template>
  <view v-html="html" />
</template>

<script setup lang="uts">
const  html = '<p class="p" style="color: red;">hello world for composition API!</p>'
</script>

```

:::


### v-show

基于表达式值的真假性，来改变元素的可见性。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-show/v-show-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-show/v-show-options

>选项式 API

```vue
<template>
  <view class="page">
    <button id="toggle-btn" @click="toggleShow">toggle show/hide</button>
    <text>点击上方按钮，切换下方 view 显示/隐藏</text>
    <text>show default true: {{dataInfo.showDefaultTrue}}</text>
    <view class="mt-10 default-true" id="v-show-element-default-true" v-show="dataInfo.showDefaultTrue"></view>
    <text>show default false: {{dataInfo.showDefaultFalse}}</text>
    <view class="mt-10 default-false" id="v-show-element-default-false" v-show="dataInfo.showDefaultFalse"></view>
    <Foo v-show="dataInfo.showDefaultFalse" />
  </view>
</template>

<script lang="uts">
  import Foo from './Foo.uvue'

  type DataInfo = {
    showDefaultTrue : boolean
    showDefaultFalse : boolean
  }

  export default {
    components: { Foo },
    data() {
      return {
        dataInfo: {
          showDefaultTrue: true,
          showDefaultFalse: false
        } as DataInfo
      }
    },
    methods: {
      toggleShow() {
        this.dataInfo.showDefaultTrue = !this.dataInfo.showDefaultTrue
        this.dataInfo.showDefaultFalse = !this.dataInfo.showDefaultFalse
      }
    }
  }
</script>

<style>
  .default-true,
  .default-false {
    display: flex;
    width: 100px;
    height: 50px;
  }

  .default-true {
    background-color: greenyellow;
  }

  .default-false {
    background-color: antiquewhite;
  }
</style>
```

> 组合式 API

```vue
<template>
  <view class="page">
    <button id="toggle-btn" @click="toggleShow">toggle show/hide</button>
    <text>点击上方按钮，切换下方 view 显示/隐藏</text>
    <text>show default true: {{dataInfo.showDefaultTrue}}</text>
    <view class="mt-10 default-true" id="v-show-element-default-true" v-show="dataInfo.showDefaultTrue"></view>
    <text>show default false: {{dataInfo.showDefaultFalse}}</text>
    <view class="mt-10 default-false" id="v-show-element-default-false" v-show="dataInfo.showDefaultFalse"></view>
    <Foo v-show="dataInfo.showDefaultFalse" />
  </view>
</template>

<script setup lang="uts">
  import Foo from './Foo.uvue'

  type DataInfo = {
    showDefaultTrue : boolean
    showDefaultFalse : boolean
  }

  const dataInfo = reactive({
    showDefaultTrue: true,
    showDefaultFalse: false
  } as DataInfo)

  const toggleShow = () => {
    dataInfo.showDefaultTrue = !dataInfo.showDefaultTrue
    dataInfo.showDefaultFalse = !dataInfo.showDefaultFalse
  }

  defineExpose({
    dataInfo
  })
</script>

<style>
  .default-true,
  .default-false {
    display: flex;
    width: 100px;
    height: 50px;
  }

  .default-true {
    background-color: greenyellow;
  }

  .default-false {
    background-color: antiquewhite;
  }
</style>
```

:::

### v-if

基于表达式值的真假性，来条件性地渲染元素或者模板片段。

- 详细信息

  当 `v-if` 元素被触发，元素及其所包含的指令/组件都会销毁和重构。如果初始条件是假，那么其内部的内容根本都不会被渲染。

  可用于 `<template>` 表示仅包含文本或多个元素的条件块。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-if/v-if-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-if/v-if-options

>选项式 API

```vue
<template>
  <view class="page">
    <view class="mb-10 flex justify-between flex-row">
      <text>v-if</text>
      <text id="v-if-show" v-if="show">show</text>
    </view>
    <button id="switch-v-if-btn" @click="show = !show">switch v-if</button>

    <view class="mt-10 mb-10 flex justify-between flex-row">
      <text>num:</text>
      <text id="num">{{ num }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>v-if v-else-if v-else</text>
      <text id="num-v-if" v-if="num == 1">v-if num = 1</text>
      <text id="num-v-else-if" v-else-if="num == 2">v-else-if num = 2</text>
      <text id="num-v-else" v-else>v-else</text>
    </view>
    <button id="change-num-btn" @click="changeNum">change num</button>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      show: true,
      num: 1
    }
  },
  methods: {
    changeNum() {
      if(this.num<3) {
        this.num++
      } else {
        this.num = 1
      }
    },
  }
}
</script>

```

> 组合式 API

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
      <view class="page">
        <view class="mb-10 flex justify-between flex-row">
          <text>v-if</text>
          <text id="v-if-show" v-if="show">show</text>
        </view>
        <button id="switch-v-if-btn" @click="show = !show">switch v-if</button>

        <view class="mt-10 mb-10 flex justify-between flex-row">
          <text>num:</text>
          <text id="num">{{ num }}</text>
        </view>
        <view class="mb-10 flex justify-between flex-row">
          <text>v-if v-else-if v-else</text>
          <text id="num-v-if" v-if="num == 1">v-if num = 1</text>
          <text id="num-v-else-if" v-else-if="num == 2">v-else-if num = 2</text>
          <text id="num-v-else" v-else>v-else</text>
        </view>
        <button id="change-num-btn" @click="changeNum">change num</button>

        <!-- 测试标题 -->
        <view class="mt-10">
          <text class="section-title">多层嵌套v-if测试</text>
        </view>

        <!-- view 普通版本 -->
        <view class="mt-10">
          <text class="test-label">1. view 普通版本 </text>
          <view class="test-item" v-if="viewNormalChild1">
            <view v-if="viewNormalChild1" id="view-normal-child1">
              <text>view二层嵌套内容</text>
              <view v-if="viewNormalChild2" id="view-normal-child2">
                <text>view三层嵌套内容</text>
              </view>
              <button id="toggle-view-normal-child2" @click="viewNormalChild2 = !viewNormalChild2">内层切换显示</button>
            </view>
          </view>
          <button id="toggle-view-normal-child1" @click="viewNormalChild1 = !viewNormalChild1">外层切换显示</button>
        </view>

        <!-- view 拍平版本 -->
        <view class="mt-10">
          <text class="test-label">2. view 拍平版本 </text>
          <view class="test-item" v-if="viewFlattenChild1">
            <view flatten v-if="viewFlattenChild1" id="view-flatten-child1">
              <view flatten v-if="viewFlattenChild1">
                <text>view拍平三层嵌套内容（应该能消失）</text>
              </view>
            </view>
          </view>
          <button id="toggle-view-flatten-child1" @click="viewFlattenChild1 = !viewFlattenChild1">
            切换显示
          </button>
        </view>

        <!-- text 普通版本 -->
        <view class="mt-10">
          <text class="test-label">3. text 普通版本 </text>
          <view class="test-item">
            <text v-if="textNormalChild1">
              <text v-if="textNormalChild1" id="text-normal-child1">text二层嵌套内容（应该能消失）</text>
            </text>
          </view>
          <button id="toggle-text-normal-child1" @click="textNormalChild1 = !textNormalChild1">
            切换显示
          </button>
        </view>

        <!-- text 拍平版本 -->
        <view class="mt-10">
          <text class="test-label">4. text 拍平版本 </text>
          <view flatten class="test-item">
            <text flatten v-if="textFlattenChild1">
              <text flatten v-if="textFlattenChild1" id="text-flatten-child1">text拍平二层嵌套内容（应该能消失）</text>
            </text>
          </view>
          <button id="toggle-text-flatten-child1" @click="textFlattenChild1 = !textFlattenChild1">
            切换显示
          </button>
        </view>

        <!-- image 普通版本 -->
        <view class="mt-10">
          <text class="test-label">5. image 普通版本 </text>
          <view class="test-item">
              <image v-if="imageNormalChild1" id="image-normal-child1" src="/static/logo.png" class="test-image"></image>
          </view>
          <button id="toggle-image-normal-child1" @click="imageNormalChild1 = !imageNormalChild1">
            切换显示
          </button>
        </view>

        <!-- image 拍平版本 -->
        <view class="mt-10">
          <text class="test-label">6. image 拍平版本（多层嵌套v-if）</text>
          <view flatten class="test-item">
              <image flatten v-if="imageFlattenChild1" id="image-flatten-child1" src="/static/logo.png" class="test-image"></image>
          </view>
          <button id="toggle-image-flatten-child1" @click="imageFlattenChild1 = !imageFlattenChild1">
            切换显示
          </button>
        </view>
        
        <!-- scroll-view：动态切换 -->
        <view class="mt-10">
          <text class="test-label">8. scroll-view（动态v-if）</text>
          <view class="test-item">
            <scroll-view v-if="scrollViewChild1" id="scroll-view-child1" class="scroll-view-test">
              <text>scroll-view内容1（应该能消失）</text>
              <view><text>scroll-view内容2（应该能消失）</text></view>
            </scroll-view>
            <button id="toggle-scroll-view-child1" @click="scrollViewChild1 = !scrollViewChild1">
              切换scroll-view显示
            </button>
          </view>
        </view>

        <!-- 自定义 child 组件 -->
        <view class="mt-10">
          <text class="test-label">9. child 组件（子child动态v-if普通版本➕拍平版本）</text>
          <view class="test-item">
            <child v-if="childComponent1" id="child-component1"></child>
            <view flatten>
                <child v-if="childComponent1" id="child-component2" flatten></child>
            </view>
            <button id="toggle-child-component1" @click="childComponent1 = !childComponent1">
              切换child组件显示
            </button>
          </view>
        </view>

      </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
import child from './child.uvue'

// 原有变量
const show = ref(true)
const num = ref(1)

// view 测试变量
const viewNormalChild1 = ref(true)
const viewNormalChild2 = ref(true)
const viewFlattenChild1 = ref(true)

// text 测试变量
const textNormalChild1 = ref(true)
const textFlattenChild1 = ref(true)

// image 测试变量
const imageNormalChild1 = ref(true)
const imageFlattenChild1 = ref(true)

// scroll-view 测试变量
const scrollViewChild1 = ref(true)

// child 组件测试变量
const childComponent1 = ref(true)

const changeNum = () => {
  if(num.value<3) {
    num.value++
  } else {
    num.value = 1
  }
}
</script>

<style>
.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.test-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.test-item {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.test-image {
  width: 50px;
  height: 50px;
}

.scroll-view-test {
  height: 100px;
  background-color: #e0e0e0;
  padding: 10px;
}
</style>

```

:::

### v-for

基于原始数据多次渲染元素或模板块。

- 期望的绑定值类型：`Array | UTSJSONObject | number | string | Iterable`

- 详细信息

  指令值必须使用特殊语法 `alias in expression` 为正在迭代的元素提供一个别名：

  ```vue
  <view v-for="item in items">
  {{ item.text }}
  </view>
  ```
  `v-for` 的默认方式是尝试就地更新元素而不移动它们。要强制其重新排序元素，你需要用特殊 attribute `key` 来提供一个排序提示：

  ```vue
  <view v-for="item in items" :key="item.id">
  {{ item.text }}
  </view>
  ```

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-for/v-for-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-for/v-for-options

>选项式 API

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
    <!-- #endif -->
    <view class="page">
      <text class="bold mb-10">v-for number</text>
      <view class="mb-10" v-for="item in 3" :key="item">
        <text :id="`number-${item}`">{{ item }}</text>
      </view>
      
      <view class="mb-10" v-for="item in utsNumber" :key="item">
        <text :id="`uts-number-${item}`">{{ item }}</text>
      </view>

      <view class="bold mb-10">v-for object</view>
      <view
        v-for="(value, key) in object"
        :key="key"
        class="mb-10 flex justify-between flex-row">
        <text :id="key">{{ key }}</text>
        <text :id="value">{{ value }}</text>
      </view>

      <view class="bold mb-10">v-for & v-if list items</view>
      <view
        id="v-for-v-if-list-items"
        v-for="item in listItems"
        :key="item.name">
        <template v-if="item.show">
          <view class="mb-10 flex justify-between flex-row">
            <text :id="item.name">{{ item.name }}</text>
            <text @click="item.count++" :id="`v-if-${item.name}-count`">{{
              item.count
            }}</text>
          </view>
          <template v-for="child in item.items">
            <view
              v-if="child.show"
              :key="child.name"
              class="mb-10 flex justify-between flex-row">
              <text :id="child.name">{{ child.name }}</text>
              <text @click="child.count++" :id="`v-if-${child.name}-count`">{{
                child.count
              }}</text>
            </view>
          </template>
        </template>
      </view>

      <view class="bold mb-10">v-for & v-show list items</view>
      <view
        id="v-for-v-show-list-items"
        v-for="item in listItems"
        v-show="item.show"
        :key="item.name">
        <view class="mb-10 flex justify-between flex-row">
          <text :id="item.name">{{ item.name }}</text>
          <text @click="item.count++" :id="`v-show-${item.name}-count`">{{
            item.count
          }}</text>
        </view>
        <view
          v-for="child in item.items"
          v-show="child.show"
          :key="child.name"
          class="mb-10 flex justify-between flex-row">
          <text :id="child.name">{{ child.name }}</text>
          <text @click="child.count++" :id="`v-show-${child.name}-count`">{{
            child.count
          }}</text>
        </view>
      </view>

      <view
        class="mb-10 flex justify-between flex-row"
        v-for="item in mapList"
        :key="item[0]">
        <text>{{ item[0] }}</text>
        <text :id="item[0]">{{ item[1] }}</text>
      </view>

      <view class="mb-10" v-for="(item, index) in setList" :key="index">
        <text :id="`set-value-${index + 1}`">{{ item }}</text>
      </view>

      <view class="bold mb-10">v-for UTSJSONObject</view>
      <view
        v-for="(value, key) in utsJSONObject"
        :key="key"
        class="mb-10 flex justify-between flex-row">
        <text :id="key">{{ key }}</text>
        <text :id="value">{{ value }}</text>
      </view>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
type VForObject = {
  key1 : string
  key2 : string
  key3 : string
}

type ListItem = {
  name: string
  count : number
  show: boolean
  items?: ListItem[]
}

// TODO: v-for map set deep array 动态增加删除
export default {
  data() {
    return {
      object: { key1: 'value1', key2: 'value2', key3: 'value3' } as VForObject,
      listItems: [
        { name: '1',
          count: 0,
          show: true,
          items:[
            { name: '1-1', count: 0, show: false },
            { name: '1-2', count: 0, show: true },
          ]
        },
        { name: '2',
          count: 0,
          show: true,
          items:[
            { name: '2-1', count: 0, show: true },
            { name: '2-2', count: 0, show: false },
          ]
        },
        { name: '3',
          count: 0,
          show: false,
          items:[
            { name: '3-1', count: 0, show: true },
            { name: '3-2', count: 0, show: true },
          ]
        },
      ] as ListItem[],
      mapList: new Map<string, string>([
        ['map-key-1', 'map value 1'],
        ['map-key-2', 'map value 2'],
        ['map-key-3', 'map value 3'],
      ]),
      setList: new Set<string>(['set value 1', 'set value 2', 'set value 3']),
      utsJSONObject: { utsKey1: 'UTSJSONObject-value1', utsKey2: 'UTSJSONObject-value2', utsKey3: 'UTSJSONObject-value3' },
      utsNumber: JSON.parse("3") as number
    }
  }
}
</script>

```

> 组合式 API

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
    <!-- #endif -->
    <view class="page">
      <text class="bold mb-10">v-for number</text>
      <view class="mb-10" v-for="item in 3" :key="item">
        <text :id="`number-${item}`">{{ item }}</text>
      </view>
      
      <view class="mb-10" v-for="item in utsNumber" :key="item">
        <text :id="`uts-number-${item}`">{{ item }}</text>
      </view>

      <view class="bold mb-10">v-for object</view>
      <view
        v-for="(value, key) in object"
        :key="key"
        class="mb-10 flex justify-between flex-row">
        <text :id="key">{{ key }}</text>
        <text :id="value">{{ value }}</text>
      </view>

      <view class="bold mb-10">v-for & v-if list items</view>
      <view
        id="v-for-v-if-list-items"
        v-for="item in listItems"
        :key="item.name">
        <template v-if="item.show">
          <view class="mb-10 flex justify-between flex-row">
            <text :id="item.name">{{ item.name }}</text>
            <text @click="item.count++" :id="`v-if-${item.name}-count`">{{
              item.count
            }}</text>
          </view>
          <template v-for="child in item.items">
            <view
              v-if="child.show"
              :key="child.name"
              class="mb-10 flex justify-between flex-row">
              <text :id="child.name">{{ child.name }}</text>
              <text @click="child.count++" :id="`v-if-${child.name}-count`">{{
                child.count
              }}</text>
            </view>
          </template>
        </template>
      </view>

      <view class="bold mb-10">v-for & v-show list items</view>
      <view
        id="v-for-v-if-list-items"
        v-for="item in listItems"
        :key="item.name"
        v-show="item.show">
        <view class="mb-10 flex justify-between flex-row">
          <text :id="item.name">{{ item.name }}</text>
          <text @click="item.count++" :id="`v-show-${item.name}-count`">{{
            item.count
          }}</text>
        </view>
        <view
          v-for="child in item.items"
          v-show="child.show"
          :key="child.name"
          class="mb-10 flex justify-between flex-row">
          <text :id="child.name">{{ child.name }}</text>
          <text @click="child.count++" :id="`v-show-${child.name}-count`">{{
            child.count
          }}</text>
        </view>
      </view>

      <view
        class="mb-10 flex justify-between flex-row"
        v-for="item in mapList"
        :key="item[0]">
        <text>{{ item[0] }}</text>
        <text :id="item[0]">{{ item[1] }}</text>
      </view>

      <view class="mb-10" v-for="(item, index) in setList" :key="index">
        <text :id="`set-value-${index + 1}`">{{ item }}</text>
      </view>

      <view class="bold mb-10">v-for UTSJSONObject</view>
      <view
        v-for="(value, key) in utsJSONObject"
        :key="key"
        class="mb-10 flex justify-between flex-row">
        <text :id="key">{{ key }}</text>
        <text :id="value">{{ value }}</text>
      </view>
    </view>
    <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
type VForObject = {
  key1 : string
  key2 : string
  key3 : string
}

type ListItem = {
  name: string
  count : number
  show: boolean
  items?: ListItem[]
}

// 可通过泛型指定类型
const object = reactive<VForObject>({ key1: 'value1', key2: 'value2', key3: 'value3' })
const listItems = ref<ListItem[]>([
  { name: '1',
    count: 0,
    show: true,
    items:[
      { name: '1-1', count: 0, show: false },
      { name: '1-2', count: 0, show: true },
    ]
  },
  { name: '2',
    count: 0,
    show: true,
    items:[
      { name: '2-1', count: 0, show: true },
      { name: '2-2', count: 0, show: false },
    ]
  },
  { name: '3',
    count: 0,
    show: false,
    items:[
      { name: '3-1', count: 0, show: true },
      { name: '3-2', count: 0, show: true },
    ]
  },
])

const mapList = new Map<string, string>([
  ['map-key-1', 'map value 1'],
  ['map-key-2', 'map value 2'],
  ['map-key-3', 'map value 3'],
])

const setList = new Set<string>(['set value 1', 'set value 2', 'set value 3'])

const utsJSONObject = reactive({ utsKey1: 'UTSJSONObject-value1', utsKey2: 'UTSJSONObject-value2', utsKey3: 'UTSJSONObject-value3' })

const utsNumber = JSON.parse("3") as number
</script>

```

:::

### v-on

给元素绑定事件监听器。

- 缩写：`@`

- 期望的绑定值类型：`Function | Object (不带参数)`

- 参数：`event` (使用对象语法则为可选项)

- 修饰符
  - `.stop` - 调用 `event.stopPropagation()`
  - `.once` - 最多触发一次处理函数。

- 详见[事件修饰符](https://uniapp.dcloud.net.cn/tutorial/vue3-basics.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-on/v-on-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-on/v-on-options

>选项式 API

```vue
<template>
  <view class="page">
    <text class="bold mb-10">下方按钮点击累加 count</text>
    <view class="flex justify-between flex-row mb-10">
      <text>count:</text>
      <text id="count">{{ count }}</text>
    </view>
    <button class="mb-10 btn" @click="handleClick">@click="handleClick" 缩写</button>
    <button class="mb-10 btn" v-on:click="handleClick">
      v-on:click="handleClick" 方法处理函数
    </button>
    <button class="mb-10 btn" v-on:click="count++">
      v-on:click="count++" 内联事件
    </button>
    <button class="mb-10 btn" v-on:click="handleClick($event as MouseEvent)">
      v-on:click="handleClick($event as MouseEvent)"
      内联声明，注意要显式声明$event的类型
    </button>
    <!-- #ifndef MP -->
    <button class="mb-10 btn" v-on:[event]="handleClick">
      v-on:[event]="handleClick" 动态事件
    </button>
    <button class="mb-10 btn" v-on="{ click: handleClick }">
      v-on="{ click: handleClick }" 对象语法
    </button>
    <!-- #endif -->
    <!-- TODO: ios 不支持 -->
    <!-- #ifndef APP-IOS || MP || APP-HARMONY -->
    <button class="mb-10 btn" id="btn-once" @click.once="handleClick">@click once</button>
    <!-- #endif -->
    <view @click="handleClick">
      <button class="mb-10 btn" id="btn-stop" @click.stop="handleClick">@click stop</button>
    </view>
    <button class="mb-10" id="btn-prevent" @touchstart.prevent="handleTouchstart" @click="handleClick">@touch prevent</button>
  </view>
</template>

<script lang="uts">
type BtnPreventRect = {
  value: DOMRect | null
}
  
export default {
  data() {
    return {
      count: 0,
      event: 'click',
      btnPreventRect: {
        value: null as DOMRect | null
      } as BtnPreventRect
    }
  },
	// #ifdef APP-ANDROID || APP-IOS
  onReady(){
    const btnPrevent = uni.getElementById("btn-prevent")
    console.log('btnPrevent', btnPrevent);
    this.btnPreventRect.value = btnPrevent?.getBoundingClientRect()
    console.log('btnPreventRect', this.btnPreventRect.value);
    this.btnPreventRect.value!.y += uni.getSystemInfoSync().safeArea.top + 44
  },
	// #endif
  methods: {
    handleTouchstart(){
      console.log('handleTouchstart')
    },
    handleClick(e : MouseEvent) {
      this.count++
      console.log('handleClick', e)
    }
  }
}
</script>

```

> 组合式 API

```vue
<template>
  <view class="page">
    <text class="bold mb-10">下方按钮点击累加 count</text>
    <view class="flex justify-between flex-row mb-10">
      <text>count:</text>
      <text id="count">{{ count }}</text>
    </view>
    <button class="mb-10 btn" @click="handleClick">
      @click="handleClick" 缩写
    </button>
    <button class="mb-10 btn" v-on:click="handleClick">
      v-on:click="handleClick" 方法处理函数
    </button>
    <button class="mb-10 btn" v-on:click="count++">
      v-on:click="count++" 内联事件
    </button>
    <button class="mb-10 btn" v-on:click="handleClick($event as MouseEvent)">
      v-on:click="handleClick($event as MouseEvent)"
      内联声明，注意要显式声明$event的类型
    </button>
    <!-- #ifndef MP -->
    <button class="mb-10 btn" v-on:[event]="handleClick">
      v-on:[event]="handleClick" 动态事件
    </button>
    <button class="mb-10 btn" v-on="{ click: handleClick }">
      v-on="{ click: handleClick }" 对象语法
    </button>
    <!-- #endif -->
    <!-- TODO: ios 不支持 -->
    <!-- #ifndef APP-IOS || MP || APP-HARMONY -->
    <button class="mb-10 btn" id="btn-once" @click.once="handleClick">@click once</button>
    <!-- #endif -->
    <view @click="handleClick">
      <button class="mb-10 btn" id="btn-stop" @click.stop="handleClick">@click stop</button>
    </view>
    <button class="mb-10" id="btn-prevent" @touchstart.prevent="handleTouchstart" @click="handleClick">@touch prevent</button>
  </view>
</template>

<script setup lang="uts">
const count = ref(0)

const event = ref('click')

type BtnPreventRect = {
  value: DOMRect | null
}

let btnPreventRect = reactive({
  value: null
} as BtnPreventRect)
// #ifdef APP-ANDROID || APP-IOS
onReady(() => {
  const btnPrevent = uni.getElementById("btn-prevent")
  btnPreventRect.value = btnPrevent!.getBoundingClientRect()
  btnPreventRect.value!.y += uni.getSystemInfoSync().safeArea.top + 44
})
// #endif

const handleTouchstart = () => {
  console.log('handleTouchstart')
}

const handleClick = (e : MouseEvent) => {
  count.value++
  console.log('handleClick', e)
}

defineExpose({
  btnPreventRect
})
</script>

```

:::

### v-bind

动态的绑定一个或多个 attribute，也可以是组件的 prop。

- 缩写：
  - `:` 或者 `.` (当使用 `.prop` 修饰符)
  - 值可以省略 (当 attribute 和绑定的值同名时)

- 期望：`any (带参数) | Object (不带参数)`

- 参数：`attrOrProp (可选的)`

- 用途

  当用于绑定 `class` 或 `style` attribute，`v-bind` 支持额外的值类型如数组或对象。

  当用于组件 props 绑定时，所绑定的 props 必须在子组件中已被正确声明。

  当不带参数使用时，可以用于绑定一个包含了多个 attribute 名称-绑定值对的对象。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-bind/v-bind-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-bind/v-bind-options

>选项式 API

```vue
<template>
<!-- #ifdef APP -->
<scroll-view style="flex: 1">
  <!-- #endif -->
  <view class="page">
    <!-- v-bind attribute -->
    <button id="disabled-btn" class="mb-10" :disabled="true">:disabled true</button>
    <button id="v-bind-disabled-btn" class="mb-10" v-bind:disabled="false">v-bind:disabled false</button>

    <!-- v-bind style -->
    <view class="flex justify-between flex-row mb-10">
      <text>bind object style fontSize:</text>
      <text id="bind-object-style" :style="{ fontSize: dataInfo.fontSize }">
        {{ dataInfo.fontSize }}
      </text>
    </view>
    <view id="bind-array-style" class="mb-10 p-10" :style="[dataInfo.backgroundColor, dataInfo.border]">
      <view>bind arr style</view>
      <view class="my-10">{{ dataInfo.backgroundColor }}</view>
      <view>{{ dataInfo.border }}</view>
    </view>
    <view class="mb-10 p-10">
        <text id="bind-raw-object-style" :style="rawObjectStyle">rawObjectStyle</text>
    </view>
    <view class="mb-10 p-10">
        <text id="bind-raw-array-style" :style="rawArrayStyle">rawArrayStyle</text>
    </view>

    <!-- v-bind props -->
    <Foo :title="dataInfo.fooProps.title" :num="dataInfo.fooProps.num" :obj="dataInfo.fooProps.obj" />

    <!-- v-bind props -->
    <Foo checked />
    
    <!-- #ifndef MP -->
    <!-- 绑定对象 -->
    <Foo v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <Foo v-bind="fooProps"/>
    <Foo id="bindObj1" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <!-- 绑定对象合并 v-bind 在前 -->
    <Foo v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" id="bindObj2" :title="dataInfo.fooProps.title + ' override'" />
    <!-- 绑定对象合并 v-bind 在后 -->
    <Foo id="bindObj3" title="foo" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <!-- 绑定对象合并 v-bind 在中间（UTSJSONObject）-->
    <Foo id="bindObj4" v-bind="fooProps" title="foo title(json) override" />
    <!-- 绑定对象合并（UTSJSONObject）-->
    <Foo id="bindObj5" title="foo" v-bind="fooProps" />
    <!-- #endif -->
    
    <!-- v-bind in style -->
    <!-- #ifdef WEB -->
    <view class="mb-10 v-bind-css"></view>
    <!-- #endif -->
  </view>
<!-- #ifdef APP -->
</scroll-view>
<!-- #endif -->
</template>

<script lang="uts">
  import Foo from './Foo-options.uvue'
  import { FooProps, FooPropsObj } from './type.uts'

  type DataInfo = {
    fontSize : string
    backgroundColor : string
    border : string
    fooProps : FooProps
    vBindClassBackgroundColor : string
    vBindClassRpxHeight : string
  }

  export default {
    components: { Foo },
    data() {
      return {
        dataInfo: {
          fontSize: '20px',
          backgroundColor: 'background-color: green',
          border: 'border: 2px solid red',
          fooProps: {
            title: 'foo title',
            num: 1,
            obj: {
              name: 'foo obj name'
            } as FooPropsObj
          },
          vBindClassBackgroundColor: 'red',
          vBindClassRpxHeight: '300rpx'
        } as DataInfo,
        fooProps:{
            title: 'foo title(json)',
            num: 2,
        },
        rawObjectStyle: {
            width: '100%',
            height: '30px',
            'background-color': 'red'
        },
        rawArrayStyle: [
            {
              width: '100%',
              height: '30px'
            },
            {
              'background-color': 'red'
            }
        ]
      }
    }
  }
</script>

<style>
  /* #ifdef WEB */
  .v-bind-css {
    background-color: v-bind(dataInfo.vBindClassBackgroundColor);
    height: v-bind(dataInfo.vBindClassRpxHeight);
  }
  /* #endif */
</style>
```

> 组合式 API

```vue
<template>
<!-- #ifdef APP -->
<scroll-view style="flex: 1">
  <!-- #endif -->    
  <view class="page">
    <!-- v-bind attribute -->
    <button id="disabled-btn" class="mb-10" :disabled="true">
      :disabled true
    </button>
    <button id="v-bind-disabled-btn" class="mb-10" v-bind:disabled="false">
      v-bind:disabled false
    </button>

    <!-- v-bind style -->
    <view class="flex justify-between flex-row mb-10">
      <text>bind object style fontSize:</text>
      <text id="bind-object-style" :style="{ fontSize: dataInfo.fontSize }">
        {{ dataInfo.fontSize }}
      </text>
    </view>
    <view id="bind-array-style" class="mb-10 p-10" :style="[dataInfo.backgroundColor, dataInfo.border]">
      <view>bind arr style</view>
      <view class="my-10">{{ dataInfo.backgroundColor }}</view>
      <view>{{ dataInfo.border }}</view>
    </view>
    <view class="mb-10 p-10">
        <text id="bind-raw-object-style" :style="rawObjectStyle">rawObjectStyle</text>
    </view>
    <!-- 目前仅android平台在内部重新调用了normalizeStyle，其他端暂时没有，这应该是vue的bug -->
    <view class="mb-10 p-10">
        <text id="bind-raw-array-style" :style="rawArrayStyle">rawArrayStyle</text>
    </view>

    <!-- v-bind props -->
    <Foo :title="dataInfo.fooProps.title" :num="dataInfo.fooProps.num" :obj="dataInfo.fooProps.obj" />

    <!-- v-bind props -->
    <Foo checked />
    <!-- #ifndef MP -->
    <!-- 绑定对象 -->
    <Foo id="bindObj1" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <!-- 绑定对象合并-->
    <Foo id="bindObj2" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" title="foo title override" />
    <!-- 绑定对象合并-->
    <Foo id="bindObj3" title="foo" v-bind="{ title: dataInfo.fooProps.title,num: dataInfo.fooProps.num,obj: dataInfo.fooProps.obj }" />
    <!-- 绑定对象合并（UTSJSONObject）-->
    <Foo id="bindObj4" v-bind="fooProps" title="foo title(json) override" />
    <!-- 绑定对象合并（UTSJSONObject）-->
    <Foo id="bindObj5" title="foo" v-bind="fooProps" />
    <!-- #endif -->
    <!-- v-bind in style -->
    <!-- #ifdef WEB -->
    <view class="mb-10 v-bind-css"></view>
    <!-- #endif -->
  </view>
<!-- #ifdef APP -->
</scroll-view>
<!-- #endif -->  
</template>

<script setup lang="uts">
  import Foo from './Foo-composition.uvue'
  import { FooProps, FooPropsObj } from './type.uts'

  type DataInfo = {
    fontSize : string
    backgroundColor : string
    border : string
    fooProps : FooProps
    vBindClassBackgroundColor : string,
    vBindClassRpxHeight : string,
  }

  const dataInfo = reactive({
    fontSize: '20px',
    backgroundColor: 'background-color: green',
    border: 'border: 2px solid red',
    fooProps: {
      title: 'foo title',
      num: 1,
      obj: {
        name: 'foo obj name',
      } as FooPropsObj
    },
    vBindClassBackgroundColor: 'red',
    vBindClassRpxHeight: '300rpx'
  } as DataInfo)
  
  const fooProps = reactive({
      title: 'foo title(json)',
      num: 2,
  })
  
  const rawObjectStyle = {
      width: '100%',
      height: '30px',
      'background-color': 'red'
  }
  
  const rawArrayStyle = [
      {
        width: '100%',
        height: '30px'
      },
      {
        'background-color': 'red'
      }
  ]

  defineExpose({
    dataInfo
  })
</script>

<style>
  /* #ifdef WEB */
  .v-bind-css {
    background-color: v-bind(dataInfo.vBindClassBackgroundColor);
    height: v-bind(dataInfo.vBindClassRpxHeight);
  }
  /* #endif */
</style>
```

:::

### v-model

在表单输入元素或组件上创建双向绑定。

- 期望的绑定值类型：根据表单输入元素或组件输出的值而变化

- 仅限：
  - `<input>`
  - `<textarea>`

- 修饰符 <Badge text="仅 Android"/>
  - `.lazy` - 监听 `change` 事件而不是 `input` 事件
  - `.number` - 将输入的合法字符串转为数字
  - `.trim` - 移除输入内容两端空格

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-model/v-model-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-model/v-model-options

>选项式 API

```vue
<template>
  <view class="page">
    <view class="mb-10 flex justify-between flex-row">
      <text>str:</text>
      <text id="str">{{ str }}</text>
    </view>
    <input class="mb-10 input" id="model-str" v-model="str" @input="onInput" />
    <input class="mb-10 input" id="model-num" v-model.number="num" type="text" />
    <input class="mb-10 input" id="model-str-trim" v-model.trim="strForTrim" />
    <input class="mb-10 input" id="model-str-lazy" v-model.lazy="str" type="text" />
    <view class="mb-10 flex justify-between flex-row">
      <text>typeof num:</text>
      <text id="typeof-num">{{ typeof num }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>str for trim length:</text>
      <text id="str-length">{{ strForTrim.length }}</text>
    </view>
    <Parent v-model="value"></Parent>
    <Parent v-model="utsObj['modelValue']"></Parent>
    <Parent v-model="typeObj.modelValue"></Parent>
    <Parent v-model="typeObj.modelValue as string"></Parent>
  </view>
</template>

<script lang="uts">
import Parent from './Parent.uvue'
import { VModelObj } from './types.uts'
export default {
  data(){
    return {
      str: 'str',
      num: 1,
      strForTrim: ' abc ',
      value: 'nested',
      utsObj: {
        modelValue: 'utsObj.value'
      },
      typeObj: {
        modelValue: 'typeObj.value'
      } as VModelObj
    }
  },
  components: {
      Parent
  },
  methods: {
    onInput(){
      // noop
    }
  }
}
</script>

<style>
.input {
  padding: 0px 10px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

```

> 组合式 API

```vue
<template>
  <view class="page">
    <Foo
      v-model="str"
      v-model:msg="msg"
      v-model:strArr="strArr"
      v-model:numArr="numArr"
      v-model:utsObjModelValue="utsObj['modelValue']"
      v-model:typeObjModelValue="typeObj.modelValue"
      @update:modelValue="handleModelValueUpdate"
      @update:msg="handleModelMsgUpdate"
       />
    <input class="mb-10 input" id="model-value-input" v-model="str" @input="onInput" />
    <input class="mb-10 input" id="model-msg-input" v-model="msg" />
    <input class="mb-10 input" id="model-uts-obj-value-input" v-model="utsObj['modelValue']" />
    <input class="mb-10 input" id="model-type-obj-value-input" v-model="typeObj.modelValue" />
    <view class="mb-10 flex justify-between flex-row">
      <text>handle modelValue update res:</text>
      <text id="handle-model-value-update-res">{{ handleModelValueUpdateRes }}</text>
    </view>
    <view class="mb-10 flex justify-between flex-row">
      <text>handle model msg update res:</text>
      <text id="handle-model-msg-update-res">{{ handleModelMsgUpdateRes }}</text>
    </view>
    <Parent v-model="value"></Parent>
    <view class="mb-10 flex justify-between flex-row">
      <text>arrayValue:</text>
      <text id="array-value">{{ arrayValue.region }}</text>
    </view>
    <ArrayModelChild v-model="arrayValue.region"></ArrayModelChild>
  </view>
</template>

<script setup lang="uts">
import Foo from './Foo-composition.uvue'
import Parent from './Parent.uvue'
import ArrayModelChild from './ArrayModelChild.uvue'
import { VModelObj } from './types.uts'

const str = ref('str')
const msg = ref('msg')
const strArr = ref<string[]>(['0'])
const numArr = ref<number[]>([0])
const value = ref("nested");
const arrayValue = reactive({
	region: [] as string[]
});
const handleModelValueUpdateRes = ref('')
const handleModelValueUpdate = (val : string) => {
  handleModelValueUpdateRes.value = val
}
const handleModelMsgUpdateRes = ref('')
const handleModelMsgUpdate = (val : string) => {
  handleModelMsgUpdateRes.value = val
}

const utsObj = reactive({ modelValue: 'utsObj.value' })
const typeObj = reactive({ modelValue: 'typeObj.value' } as VModelObj)

function onInput(){
  // noop
}
</script>

<style>
.input {
  padding: 0px 10px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

```

:::

### v-pre

跳过该元素及其所有子元素的编译。

- 无需传入

- 详细信息

  元素内具有 `v-pre`，所有 Vue 模板语法都会被保留并按原样渲染。最常见的用例就是显示原始双大括号标签及内容。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-pre/v-pre.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-pre/v-pre

```vue
<template>
  <view class="page">
    <text class="bold mb-10">v-pre 跳过该元素及其所有子元素的编译</text>
    <text class="mb-10 v-pre-text" v-pre>{{ this will not be compiled }}</text>
  </view>
</template>

```

:::

### v-once

仅渲染元素和组件一次，并跳过之后的更新。

- 无需传入

- 详细信息

  在随后的重新渲染，元素/组件及其所有子项将被当作静态内容并跳过渲染。这可以用来优化更新时的性能。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-once/v-once-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-once/v-once-options

>选项式 API

```vue
<template>
  <view class="page">
    <!-- #ifndef MP -->
    <view class="flex flex-row justify-between mb-10" v-once>
      <text>This msg will never change:</text>
      <text id='v-once-msg'>{{ msg }}</text>
    </view>
    <!-- #endif -->
    <view class="flex flex-row justify-between mb-10">
      <text>msg:</text>
      <text id="msg">{{ msg }}</text>
    </view>
    <button id="btn" class="mb-10" type="primary" @click="changeMessage">
      change message
    </button>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      msg: 'hello world'
    }
  },
  methods: {
    changeMessage() {
      this.msg = 'msg changed'
    }
  }
}
</script>

```

> 组合式 API

```vue
<template>
  <view class="page">
    <!-- #ifndef MP -->
    <view class="flex flex-row justify-between mb-10" v-once>
      <text>This msg will never change:</text>
      <text id='v-once-msg'>{{ msg }}</text>
    </view>
    <!-- #endif -->
    <view class="flex flex-row justify-between mb-10">
      <text>msg:</text>
      <text id="msg">{{ msg }}</text>
    </view>
    <button id="btn" class="mb-10" type="primary" @click="changeMessage">
      change message
    </button>
  </view>
</template>

<script setup lang="uts">
  const msg = ref('hello world')
  const changeMessage = () => {
    msg.value = 'msg changed'
  }
</script>

```

:::

### v-slot

用于声明具名插槽或是期望接收 props 的作用域插槽。

- 缩写：`#`

- 期望的绑定值类型：能够合法在函数参数位置使用的 JavaScript 表达式。支持解构语法。绑定值是可选的——只有在给作用域插槽传递 props 才需要。

- 参数：插槽名 (可选，默认是 `default`)

- 仅限：
  - `<template>`
  - [components](./component.md) (用于带有 prop 的单个默认插槽)

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-slot/v-slot-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-slot/v-slot-options

>选项式 API

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

> 组合式 API

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

<script setup lang="uts">
  import Foo from './Foo-composition.uvue'

  const msgTrue = ref({
    isShow: true,
    name: 'msgTrue'
  })
  const msgFalse = ref({
    isShow: false,
    name: 'msgFalse'
  })
</script>
```

:::

### v-memo

- 期望的绑定值类型：`any[]`

- 详细信息

  缓存一个模板的子树。在元素和组件上都可以使用。为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。举例来说：

    ```vue
    <view v-memo="[valueA, valueB]">
      ...
    </view>
    ```

  当组件重新渲染，如果 `valueA` 和 `valueB` 都保持不变，这个 `<view>` 及其子项的所有更新都将被跳过。实际上，甚至虚拟 DOM 的 vnode 创建也将被跳过，因为缓存的子树副本可以被重新使用。

  正确指定缓存数组很重要，否则应该生效的更新可能被跳过。`v-memo` 传入空依赖数组 (`v-memo="[]"`) 将与 `v-once` 效果相同。

  v-memo 仅用于性能至上场景中的微小优化，应该很少需要。最常见的情况可能是有助于渲染海量 v-for 列表 (长度超过 1000 的情况)：

  当组件的 `selected` 状态改变，默认会重新创建大量的 vnode，尽管绝大部分都跟之前是一模一样的。`v-memo` 用在这里本质上是在说“只有当该项的被选中状态改变时才需要更新”。这使得每个选中状态没有变的项能完全重用之前的 vnode 并跳过差异比较。注意这里 memo 依赖数组中并不需要包含 `item.id`，因为 Vue 也会根据 item 的 `:key` 进行判断。

  ::: warning 警告
  当搭配 `v-for` 使用 `v-memo`，确保两者都绑定在同一个元素上。`v-memo` 不能用在 `v-for` 内部。
  :::

  `v-memo` 也能被用于在一些默认优化失败的边际情况下，手动避免子组件出现不需要的更新。但是一样的，开发者需要负责指定正确的依赖数组以免跳过必要的更新。

示例 [详情](https://gitcode.com/dcloud/hello-uvue/blob/alpha/pages/directive/v-memo/v-memo-options.uvue)

::: preview https://hellouvue.dcloud.net.cn/#/pages/directive/v-memo/v-memo-options

>选项式 API

```vue
<template>
  <view class="page">
    <view class="flex flex-row justify-between mb-10" v-memo="[]">
      <text>msg will never change:</text>
      <text id="v-memo-never-change-msg">{{ msg }}</text>
    </view>
    <view class="flex flex-row justify-between mb-10">
      <text>msg:</text>
      <text id="msg">{{ msg }}</text>
    </view>
    <view class="flex flex-row justify-between mb-10" v-memo="[num]">
      <text>msg will change when num chang:</text>
      <text id="v-memo-num-change-msg">{{ msg }}</text>
    </view>
    <view class="flex flex-row justify-between mb-10">
      <text>num:</text>
      <text id="num">{{ num }}</text>
    </view>
    <button
      id="change-message-btn"
      class="mb-10"
      type="primary"
      @click="changeMessage">
      change message
    </button>
    <button
      id="increment-num-btn"
      class="mb-10"
      type="primary"
      @click="incrementNum">
      increment num
    </button>
  </view>
</template>

<script lang="uts">
export default {
  data() {
    return {
      msg: 'hello world',
      num: 0
    }
  },
  methods: {
    changeMessage() {
      this.msg = 'msg changed'
    },
    incrementNum(){
      this.num++
    }
  }
}
</script>

```

> 组合式 API

```vue
<template>
  <view class="page">
    <view class="flex flex-row justify-between mb-10" v-memo="[]">
      <text>msg will never change:</text>
      <text id="v-memo-never-change-msg">{{ msg }}</text>
    </view>
    <view class="flex flex-row justify-between mb-10">
      <text>msg:</text>
      <text id="msg">{{ msg }}</text>
    </view>
    <view class="flex flex-row justify-between mb-10" v-memo="[num]">
      <text>msg will change when num chang:</text>
      <text id="v-memo-num-change-msg">{{ msg }}</text>
    </view>
    <view class="flex flex-row justify-between mb-10">
      <text>num:</text>
      <text id="num">{{ num }}</text>
    </view>
    <button
      id="change-message-btn"
      class="mb-10"
      type="primary"
      @click="changeMessage">
      change message
    </button>
    <button
      id="increment-num-btn"
      class="mb-10"
      type="primary"
      @click="incrementNum">
      increment num
    </button>
  </view>
</template>

<script setup lang="uts">
const msg = ref('hello world')

const num = ref(0)

const changeMessage = () => {
  msg.value = 'msg changed'
}

const incrementNum = () =>{
  num.value++
}
</script>

```

:::

## 组件 @component

- [props](../component/README.md#props)
- [自定义事件](../component/README.md#自定义事件)
- [计算属性和侦听器](../component/README.md#计算属性和侦听器)
- [作用域插槽的类型](../component/README.md#作用域插槽的类型)
- [监听页面生命周期](../component/README.md#监听页面生命周期)
- [vue 与 uvue 不同文件后缀的优先级](../component/README.md#priority)

::: warning 注意
- App 端，如需页面级滚动，根节点必须是 `scroll-view` 标签。
:::

### \<KeepAlive> @keep-alive

> 组件类型：string 

 <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

##### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| include | string | - | Web: 4.0; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 字符串或正则表达式。只有名称匹配的组件会被缓存。 |
| exclude | string | - | Web: 4.0; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 字符串或正则表达式。任何名称匹配的组件都不会被缓存。 |
| max | string | - | Web: 4.0; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 最多可以缓存多少组件实例。 |






##### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 4.0 | 4.11 | 4.61 |





##### 参见
- [Reference](https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive)

### \<Transition> @transition

> 组件类型：string 

 <transition> 元素作为单个元素/组件的过渡效果。<transition> 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在检测过的组件层级中。

##### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| name | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 "v" |
| appear | boolean | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 是否在初始渲染时使用过渡。默认为 false。 |
| css | boolean | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 是否使用 CSS 过渡类。默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子。 |
| type | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 指定过渡事件类型，侦听过渡何时结束。有效值为 "transition" 和 "animation"。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。 |
| mode | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 控制离开/进入的过渡时间序列。有效的模式有 "out-in" 和 "in-out"；默认同时生效。 |
| duration | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 指定过渡的持续时间。默认情况下，Vue 会等待过渡所在根元素的第一个 transitionend 或 animationend 事件。 |
| enter-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| leave-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| appear-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| enter-to-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| leave-to-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| appear-to-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| enter-active-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| leave-active-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| appear-active-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @before-enter | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @before-leave | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @before-appear | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @enter | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @leave | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @appear | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @after-enter | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @after-leave | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @after-appear | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @enter-cancelled | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @leave-cancelled | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | v-show only |
| @appear-cancelled | Any | - | - | - |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| transition | - | - |
| animation | - | - |

#### mode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| out-in | - | - |
| in-out | - | - |






##### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |





##### 参见
- [Reference](https://v3.cn.vuejs.org/api/built-in-components.html#transition)


### \<TransitionGroup> @transition-group

> 组件类型：string 

 <transition-group> 元素作为多个元素/组件的过渡效果。<transition-group> 渲染一个真实的 DOM 元素。默认渲染 <span>，可以通过 tag 属性配置哪个元素应该被渲染。

##### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| tag | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 默认为 span。 |
| move-class | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 覆盖移动过渡期间应用的 CSS 类。 |
| name | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 "v" |
| appear | boolean | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 是否在初始渲染时使用过渡。默认为 false。 |
| css | boolean | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 是否使用 CSS 过渡类。默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子。 |
| type | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 指定过渡事件类型，侦听过渡何时结束。有效值为 "transition" 和 "animation"。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。 |
| mode | Any | - | - | - |
| duration | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 指定过渡的持续时间。默认情况下，Vue 会等待过渡所在根元素的第一个 transitionend 或 animationend 事件。 |
| enter-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| leave-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| appear-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| enter-to-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| leave-to-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| appear-to-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| enter-active-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| leave-active-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| appear-active-class | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @before-enter | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @before-leave | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @before-appear | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @enter | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @leave | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @appear | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @after-enter | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @after-leave | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @after-appear | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @enter-cancelled | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |
| @leave-cancelled | string | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | v-show only |
| @appear-cancelled | Any | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | - |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| transition | - | - |
| animation | - | - |






##### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |





##### 参见
- [Reference](https://v3.cn.vuejs.org/api/built-in-components.html#transition-group)


### \<Teleport> @teleport

> 组件类型：string 

 Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下呈现 HTML，而不必求助于全局状态或将其拆分为两个组件。

##### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| to | string | - | Web: 4.0; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 必须是有效的查询选择器或 HTMLElement (如果在浏览器环境中使用)。指定将在其中移动 \<teleport> 内容的目标元素 |
| disabled | boolean | - | Web: 4.0; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 此可选属性可用于禁用 \<teleport> 的功能，这意味着其插槽内容将不会移动到任何位置，而是在您在周围父组件中指定了 \<teleport> 的位置渲染。 |

**注意：**
- App-Android 平台暂不支持动态修改 `to` 属性。






##### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 4.0 | 4.11 | 4.61 |





##### 参见
- [Reference](https://v3.vuejs.org/api/built-in-components.html#teleport)

## 特殊元素 @special-elements

### \<template> @template

> 组件类型：string 

 当我们想要使用内置指令而不在 DOM 中渲染元素时，<template> 标签可以作为占位符使用。

`<template>` 有2个用途：
1. 作为单文件组件规范的模板根节点。在 `<template>` 下面放置页面模板真正的组件内容。
此时lang属性生效。但vue指令不生效。

2. 在根 `<template>` 下面，继续放置`<template>`虚节点，可以让多个组件遵守相同的vue指令。
比如下面的示例中，通过`<template v-if="isShow">`包裹了text和button，让2个组件共同遵守同一个`v-if`指令，且不增加层级。
如果把这个子`<template>`改成`<view>`，会增加一层节点，层级太多会影响性能。
```vue
<template>
  <view>
    <template v-if="isShow">
      <text>abc</text>
      <button>按钮</button>
    </template>
		<view></view>
  </view>
</template>
```

此时lang属性不生效。

::: warning 注意
对非根的 `<template>` 的特殊处理，只有在它与以下任一指令一起使用时才会被触发：

- `v-if`、`v-else-if` 或 `v-else`
- `v-for`
- `v-slot`

正常情况下，应该搭配如上vue指令使用。但异常情况下，如果这些指令都不存在，那么容错策略如下：\
在 `Web` 端将被渲染成一个[原生的 `<template>` 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)；\
在 `App` 端将被渲染成 `view`。此时会多个层级。

:::

##### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| lang | string | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 |  |

#### lang 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| html | Web: 4.0; 微信小程序: 4.11; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | html |
| pug | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | pug |






##### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 3.9 | 4.11 | 4.61 |





##### 参见
- [Reference](https://cn.vuejs.org/api/built-in-special-elements.html#template)


### \<slot> @slot

> 组件类型：string 

 <slot> 元素作为组件模板之中的内容分发插槽。<slot> 元素自身将被替换。

##### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| name | string | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 用于命名插槽。 |






##### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.11 | 3.9 | 4.11 | 4.61 |





##### 参见
- [Reference](https://cn.vuejs.org/api/built-in-special-elements.html#slot)

### \<component> @component

> 组件类型：string 

 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。

##### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| is | Any | - | Web: 4.0; 微信小程序: -; Android: 3.99; iOS: 4.11; HarmonyOS: 4.61 | - |
| inline-template | boolean | - | Web: 4.0; 微信小程序: -; Android: 3.99; iOS: 4.11; HarmonyOS: 4.61 | - |






##### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | 3.99 | 4.11 | 4.61 |





##### 参见
- [Reference](https://cn.vuejs.org/api/built-in-special-elements.html#component)

## 特殊 Attributes @special-attributes

|  | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| key | 4.0 | - | 3.9 | 4.11 | 4.61 |
| ref | 4.0 | - | 3.9 | 4.11 | 4.61 |
| is | 4.0 | - | 3.99 | 4.11 | 4.61 |



### key

`key` 这个特殊的 attribute 主要作为 Vue 的虚拟 DOM 算法提示，在比较新旧节点列表时用于识别 vnode。

- 预期：`number | string | symbol`

- 详细信息

  在没有 key 的情况下，Vue 将使用一种最小化元素移动的算法，并尽可能地就地更新/复用相同类型的元素。如果传了 key，则将根据 key 的变化顺序来重新排列元素，并且将始终移除/销毁 key 已经不存在的元素。

  同一个父元素下的子元素必须具有唯一的 key。重复的 key 将会导致渲染异常。

  最常见的用例是与 `v-for` 结合：

  ```vue
  <view>
    <text v-for="item in items" :key="item.id">...</text>
  </view>
  ```

  也可以用于强制替换一个元素/组件而不是复用它。当你想这么做时它可能会很有用：

  - 在适当的时候触发组件的生命周期钩子
  - 触发过渡

  举例来说：

  ```vue
  <transition>
    <text :key="text">{{ text }}</text>
  </transition>
  ```

  当 `text` 变化时，`<text>` 总是会被替换而不是更新，因此 transition 将会被触发。

### ref

用于注册模板引用。

- 预期：`string | Function`

- 详细信息

`ref` 用于注册元素或子组件的引用。

使用选项式 API，引用将被注册在组件的 `this.$refs` 对象里：

```vue
<script lang="uts">
  import Foo from '@/components/Foo.uvue'

  export default {
    components: { Foo },
    mounted() {
      // #ifdef APP
      (this.$refs['input'] as UniInputElement).setAttribute('value', 'input value');
      // #endif
      // #ifdef WEB
      (this.$refs['input'] as UniInputElement).value = 'input value';
      // #endif
      // 当在 v-for 中使用模板引用时，this.$refs 中对应的值是一个数组
      (this.$refs['textItems'] as UniTextElement[]).forEach((item : UniTextElement) => {
        item.style.setProperty('color', 'red')
      });
      // 调用自定义组件方法
      (this.$refs['foo'] as ComponentPublicInstance).$callMethod('updateTitle');
      // 获取自定义组件响应式数据
      console.log((this.$refs['foo'] as ComponentPublicInstance).$data['title']); // new title
    }
  }
</script>

<template>
  <view>
    <input ref="input" />
    <text v-for="item in 3" ref="textItems" :key="item">{{
      item
    }}</text>
    <Foo ref="foo" />
  </view>
</template>
```
`this.$refs` 也是非响应式的，因此你不应该尝试在模板中使用它来进行数据绑定。

使用组合式 API，引用将存储在与名字匹配的 ref 里：
```vue
<script setup lang="uts">
  import Foo from '@/components/Foo.uvue'

  // 声明一个 ref 来存放该元素的引用, 必须和模板里的 ref 同名
  const input = ref<UniInputElement | null>(null)
  // 当在 v-for 中使用模板引用时，对应的 ref 中包含的值是一个数组
  const textItems = ref<UniTextElement[] | null>(null)
  // 声明一个 ref 来存放自定义组件的引用, 必须和模板里的 ref 同名
  const foo = ref<ComponentPublicInstance | null>(null)

  onMounted(() => {
    // #ifdef APP
    input.value!.setAttribute('value', 'input value')
    // #endif
    // #ifdef WEB
    input.value!.value = 'input value'
    // #endif
    textItems.value!.forEach((item: UniTextElement) => {
      item.style.setProperty('color', 'red')
    })
    // 调用自定义组件方法
    foo.value!.$callMethod('updateTitle')
    // 获取自定义组件响应式数据
    console.log(foo.value!.$data['title']) // new title
  })
</script>

<template>
  <view>
    <input ref="input" />
    <text v-for="item in 3" ref="textItems" :key="item">{{
      item
    }}</text>
    <Foo ref="foo" />
  </view>
</template>
```

```vue
<!-- components/Foo.uvue -->
<template>
  <view>
    <text>title: {{title}}</text>
  </view>
</template>

<script>
  export default {
    name:"Foo",
    data() {
      return {
        title: 'default title'
      }
    },
    methods: {
      updateTitle(){
        this.title = 'new title'
      }
    }
  }
</script>
```

#### 获取内置组件与自定义组件的区别
- 使用 `ref` 获取内置组件实例时会获取到对应的 `Element`，例如上述代码示例中，`input` 组件获取到的是 `UniInputElement`, `text` 组件获取到的是 `UniTextElement`，可以调用 `Element` 的方法和属性。
- 使用 `ref` 获取自定义组件实例时会获取到对应的 vue 组件实例，例如上述代码示例中，`Foo` 组件获取到的是 `ComponentPublicInstance`，可以获取自定义组件的属性或调用方法，[详情](./component.md#page-call-component-method)。
- 小程序平台如果期望使用`ref`获取到`UniElement`需要在此`UniElement`上设置id，此外小程序平台的`UniElement`使用是受限的，详情参考：[UniElement](../mp/README.md#unielement)


### is

用于绑定动态组件。

- 预期：`string | Component`
