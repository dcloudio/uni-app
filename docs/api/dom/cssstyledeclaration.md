## CSSStyleDeclaration

CSSStyleDeclaration表示一个CSS 声明块对象，它是一个 CSS 属性键值对的集合，暴露样式信息和各种与样式相关的方法和属性。





### 方法
#### setProperty(name: string \| string.cssPropertyString, value?: string): void @setproperty

对CSS指定样式设置一个新值，如有此样式已存在则更新。

##### setProperty 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.51 | 4.51 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string ([string.cssPropertyString](/uts/data-type.md#ide-string)) | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | CSS样式名称 |
| value | string | 否 | "" | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要设置的新CSS样式值 默认值空字符串 | 







#### getPropertyValue(property: string \| string.cssPropertyString): string @getpropertyvalue

获取CSS指定的样式值，如果指定的样式不存在则返回空字符串。

##### getPropertyValue 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.51 | 4.51 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| property | string ([string.cssPropertyString](/uts/data-type.md#ide-string)) | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要获取的CSS样式名称 | 


##### 返回值 

| 类型 |
| :- |
| string |
 


#### App平台

> HBuilderX4.51版本调整 `getPropertyValue` 返回值类型为 string  

App平台获取样式值与Web平台存在部分差异：  
- 组件通过 class 设置的 CSS 样式，App平台可通过 `getPropertyValue` 获取生效的样式值，Web平台不可获取（返回空字符串）。  
  如下示例，在class中设置background-color样式，App平台可通过 getPropertyValue 获取：  
  ```vue
  <template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <text class="inf">{{text}}</text>
    <button @click="onClick">获取样式值</button>
    <view ref="testElement" class="element">
      <view class="des">
        <text>获取通过class设置的样式</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
  </template>

  <script setup lang="uts">
  const text = ref('')
  const testElement = ref<UniElement | null>(null)

  const onClick = () => {
    text.value = testElement.value!.style.getPropertyValue('background-color')
    //App平台获取的值为 "#FFFF00"
    //Web平台获取的值为 ""
  }
  </script>

  <style>
  .element {
    background-color: #FFFF00;
  }
  .inf {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .des {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    align-self: center;
  }
  </style>
  ```
  注意：App平台在 class 中设置部分的css样式会做转换，规则如下  
  + named-color 会转换为十六进制颜色六值语法（即 #RRGGBB 格式），如在class中设置 background-color 为 blue，获取的值为 #0000FF  

- 组件通过 class 和 style 同时设置的 CSS 样式，App平台通过 `getPropertyValue` 获取的是合并计算后生效的样式，Web平台获取的是 style 属性设置的样式。  
  如下示例，在class中设置的border-top-style样式覆盖了style中设置的border-top-style样式，App平台可通过 getPropertyValue 获取计算后生效的样式值：  
  ```vue
  <template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <text class="inf">{{text}}</text>
    <button @click="onClick">获取样式值</button>
    <view ref="testElement" class="element" style="border-top-style: solid;">
      <view class="des">
        <text>获取通过class覆盖style的样式</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
  </template>

  <script setup lang="uts">
  const text = ref('')
  const testElement = ref<UniElement | null>(null)

  const onClick = () => {
    //获取border-top-style样式
    const borderTopStyle = testElement.value!.style.getPropertyValue('border-top-style')
    //App平台获取border-top-style为最终生效的值 "dotted"
    //Web平台获取border-top-style为style设置的值 "solid"
    text.value = `border-top-style=${borderTopStyle}`;
  }
  </script>

  <style>
  .element {
    border-top-style: dotted !important;
  }
  .inf {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .des {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    align-self: center;
  }
  </style>
  ```

- 组件通过 style 设置的 CSS 简写样式，App平台会拆解（Expansion）部分简写样式，拆解（Expansion）的样式通过 `getPropertyValue` 只能获取拆解后的样式，获取拆解前的简写样式返回空字符串。  
  拆解的简写样式包括：  
  + border  
  + border-bottom  
  + border-left  
  + border-right  
  + border-top  
  + border-color  
  + border-raidus  
  + border-style  
  + broder-width  
  + margin  
  + padding  
  
  如下示例，在style中设置简写样式border-color，App平台通过 getPropertyValue 获取拆解前样式 border-color 返回空字符串，获取拆解后样式 border-top-color 返回"#FFFF00"：  
  ```vue
  <template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <text class="inf">{{text}}</text>
    <button @click="onClick">获取样式值</button>
    <view ref="testElement" class="element" style="border-color: #FFFF00;">
      <view class="des">
        <text>获取通过style/class设置的简写样式</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
  </template>

  <script setup lang="uts">
  const text = ref('')
  const testElement = ref<UniElement | null>(null)

  const onClick = () => {
    //style设置的样式
    const borderColor = testElement.value!.style.getPropertyValue('border-color')
    //App平台获取简写样式border-color的值为 ""
    const borderTopColor = testElement.value!.style.getPropertyValue('border-top-color')
    //App平台获取拆解样式border-top-color的值为 "#FFFF00"

    //class设置的样式
    const borderStyle = testElement.value!.style.getPropertyValue('border-style')
    //App平台获取简写样式border-style的值为 ""
    const borderTopStyle = testElement.value!.style.getPropertyValue('border-top-style')
    //App平台获取拆解样式border-top-style的值为 "dotted"

    text.value = `style: border-color=${borderColor}; border-top-color=${borderTopColor}\nclass: border-style=${borderStyle}; border-top-style=${borderTopStyle}`;
  }
  </script>

  <style>
  .element {
    border-style: dotted;
  }
  .inf {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .des {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    align-self: center;
  }
  </style>
  ```
  注意：通过 class 设置的 CSS 简写样式，App平台获取的也是拆解（Expansion）后的样式  

- 通过 `setProperty` 设置的 CSS 简写样式，App平台通过 `getPropertyValue` 只能获取简写样式，获取拆解（Expansion）后的样式返回空字符串。  
  如下示例，通过 setProperty 设置 border-style 简写样式为 "dotted"，App平台通过 getPropertyValue 获取 border-style 会返回设置的值"dotted"，获取 border-top-style 返回空字符串：  
  ```vue
  <!-- #endif -->
    <text class="inf">{{text}}</text>
    <button @click="onClick">获取样式值</button>
    <view ref="testElement">
      <view class="des">
        <text>获取通过setProperty设置的样式</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
  </template>

  <script setup lang="uts">
  const text = ref('')
  const testElement = ref<UniElement | null>(null)

  onReady(()=>{
    //通过setProperty设置border-style
    testElement.value!.style.setProperty('border-style', 'dotted')
  })

  const onClick = () => {
    //获取border-style样式
    const borderStyle = testElement.value!.style.getPropertyValue('border-style')
    //App平台获取border-style为setProperty设置的值 "dotted"
    
    //获取border-top-style样式
    const borderTopStyle = testElement.value!.style.getPropertyValue('border-top-style')
    //App平台获取拆解样式border-top-style为空字符串 ""

    text.value = `border-style=${borderStyle}; border-top-style=${borderTopStyle}`;
  }
  </script>

  <style>
  .inf {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .des {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    align-self: center;
  }
  </style>
  ```
  注意：通过 `setProperty` 设置的 CSS 所有样式，App平台不会做转换处理，获取时原样返回  


**蒸汽模式（Vapor）**  

蒸汽模式（Vapor）为了提升 CSS 的性能，App平台将所有样式数据在编译器和运行期都做了类型化转换，丢失了原始字符串数据（即获取值与设置值不完全一致），与非蒸汽模式存在以下差异：  
- 没有设置的样式，App平台蒸汽模式（Vapor）下通过 `getPropertyValue` 获取将返回默认值，非蒸汽模式返回空字符串。  
  如下示例，没有设置 flex-direction 样式，App平台在蒸汽模式（Vapor）下通过 getPropertyValue 获取 flex-direction 返回 "column"，非蒸汽模式下返回空字符串：  
  ```vue
  <template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <text class="inf">{{text}}</text>
    <button @click="onClick">获取样式值</button>
    <view ref="testElement">
      <view class="des">
        <text>获取没有设置过的样式</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
  </template>

  <script setup lang="uts">
  const text = ref('')
  const testElement = ref<UniElement | null>(null)

  const onClick = () => {
    //获取flex-direction样式
    const borderStyle = testElement.value!.style.getPropertyValue('flex-direction')
    //App平台蒸汽模式（Vapor） 获取flex-direction的值为 "column"
    //App平台非蒸汽模式 获取flex-direction的值为 ""
    
    text.value = `border-style=${borderStyle}`;
  }
  </script>

  <style>
  .inf {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .des {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    align-self: center;
  }
  </style>
  ```

- CSS 简写样式，App平台蒸汽模式（Vapor）下通过 `getPropertyValue` 获取将返回完整的拆解值。  
  如下示例，设置 flex 为 "1"，getPropertyValue 获取 flex 返回 "1 1 0%"：  
  ```vue
  <template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <text class="inf">{{text}}</text>
    <button @click="onClick">获取样式值</button>
    <view ref="testElement" style="flex: 1;">
      <view class="des">
        <text>获取简写的样式</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
  </template>

  <script setup lang="uts">
  const text = ref('')
  const testElement = ref<UniElement | null>(null)

  const onClick = () => {
    //获取简写flex样式
    const borderStyle = testElement.value!.style.getPropertyValue('flex')
    //App平台蒸汽模式（Vapor） 获取flex的值为 "1 1 0%"
    //App平台非蒸汽模式 获取flex的值为 "1"
    
    text.value = `border-style=${borderStyle}`;
  }
  </script>

  <style>
  .inf {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .des {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    align-self: center;
  }
  </style>
  ```
  注意：这里 flex 简写样式在非蒸汽模式不会拆解  

- 通过 `getPropertyValue` 获取的颜色值（如background-color、color、border-color、border-*-color）格式为十六进制颜色八值语法“#RRGGBBAA”，其中 RR、GG、BB、AA分别对应红色、绿色、蓝色、透明值，使用大写字符。  
  如下示例，设置 background-color 为 "blue"，App平台在蒸汽模式（Vapor）下通过getPropertyValue 获取 background-color 返回 "#0000FFFF"：  
  ```vue
  <template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <text class="inf">{{text}}</text>
    <button @click="onClick">获取样式值</button>
    <view ref="testElement" style="background-color: blue;">
      <view class="des">
        <text>获取background-color设置为blue时返回的样式值</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
  </template>

  <script setup lang="uts">
  const text = ref('')
  const testElement = ref<UniElement | null>(null)

  const onClick = () => {
    //获取background-color样式
    const borderStyle = testElement.value!.style.getPropertyValue('background-color')
    //App平台蒸汽模式（Vapor） 获取background-color的值为 "#0000FFFF"
    //App平台非蒸汽模式 获取background-color的值为 "blue"
    
    text.value = `border-style=${borderStyle}`;
  }
  </script>

  <style>
  .inf {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .des {
    width: 50%;
    height: 100px;
    background-color: aquamarine;
    align-self: center;
  }
  </style>
  ```

  特殊值对应的颜色  
  + transparent: 对应十六进制颜色八值语法为 #00000000  

- 通过 `setProperty` 设置布局相关的 CSS 样式，不能立即通过 `getPropertyValue` 同步获取设置的样式，此时返回的是设置前的样式，需要在 `nexttick` 异步回调中通过 `getPropertyValue` 才能获取到设置的值  
  ```vue
  <template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <text class="inf">{{text}}</text>
    <button @click="onClick">获取样式值</button>
    <view ref="testElement">
      <view class="des">
        <text></text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
  </template>

  <script setup lang="uts">
  const text = ref('')
  const testElement = ref<UniElement | null>(null)

  const onClick = () => {
    testElement.value!.style.setProperty('width', '100%');
    const width = testElement.value!.style.getPropertyValue('width');
    //App平台蒸汽模式（Vapor） 获取width的值为 "auto"，默认值
    
    nextTick(()=>{
      const nexttickWidth = testElement.value!.style.getPropertyValue('width');
      //App平台蒸汽模式（Vapor） 此时才能获取width的值为 "100%"

      text.value = `width=${width}; width(nextTick)=${nexttickWidth}`;
    })
  }
  </script>

  <style>
  .inf {
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .des {
    width: 50%;
    height: 100px;
    background-color: aquamarine;
    align-self: center;
  }
  </style>
  ```
  注意：与排版无关的CSS样式（如 background-color、color、font-size等）可通过 `getPropertyValue` 同步获取设置的样式值  
  





#### removeProperty(property: string \| string.cssPropertyString): string @removeproperty

删除CSS指定的样式值

##### removeProperty 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | - | 4.51 | 4.51 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| property | string ([string.cssPropertyString](/uts/data-type.md#ide-string)) | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要删除的CSS样式名称 | 


##### 返回值 

| 类型 |
| :- |
| string |
 





## 示例
```html
<template>
	<button @click="showPop">显示弹层</button>
	<view ref="pop" style="position: absolute; display: none;">
		<text>123</text>
	</view>
</template>
<script lang="uts">
	export default {
		methods: {
			showPop: function () {
				(this.$refs["pop"] as Element).style.setProperty("display","flex")
			}
		}
	}
</script>
```
