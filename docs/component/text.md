<!-- ## text -->

::: sourceCode
## text
:::

> 组件类型：[UniTextElement](/api/dom/unitextelement.md) 

 文本


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


在app-uvue和app-nvue中，文本只能写在text中，而不能写在view的text区域。文本样式的控制也应该在text组件上写style，而不是在view的样式里写。

虽然app-uvue中写在view的text区域的文字，也会被编译器自动包裹一层text组件，看起来也可以使用。但这样会造成无法修改该text文字的样式，详见uvue的[样式不继承](../css/README.md#stylenoextends)章节。

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| selectable | boolean | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 文本是否可选 |
| space | string | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 显示连续空格，App平台蒸汽模式（Vapor）将废弃此属性 |
| decode | boolean | false | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 是否解码，App平台蒸汽模式（Vapor）将废弃此属性 |
| user-select | boolean | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | *(boolean)*<br/>文本是否可选，该属性会使文本节点显示为 inline-block |
| hover-class | string([string.ClassString](/uts/data-type.md#ide-string)) | "none" | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS 系统版本: 6.0; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 |
| hover-stop-propagation | boolean | false | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS 系统版本: 6.0; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 指定是否阻止本节点的祖先节点出现点击态(祖先节点：指根节点到该节点路径上的所有节点都是这个节点的祖先节点) |
| hover-start-time | number | 50 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS 系统版本: 6.0; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 按住后多久出现点击态，单位毫秒 |
| hover-stay-time | number | 400 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS 系统版本: 6.0; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 手指松开后点击态保留时间，单位毫秒 |
| max-lines | number | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS 系统版本: 6.0; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 文本的最大行数，默认不限制最大行数 |
| flatten | boolean | false | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS 系统版本: 6.0; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 是否拍平组件 |

#### space 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ensp | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 中文字符空格一半大小 |
| emsp | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 中文字符空格大小 |
| nbsp | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 根据字体设置的空格大小 |



<!-- UTSCOMJSON.text.component_type-->

### hover-class
App平台蒸汽模式（Vapor） `text` 组件新增支持 `hover-class` 实现点击态效果。

**注意**
- 蒸汽模式（Vapor）子 `text` 组件不支持 hover 相关功能
- 非蒸汽模式（Vapor) `text` 组件不支持 hover 相关功能


### 空白字符
`空白字符`并不只是指空格键敲出来的那个`空格`字符，它是一个字符集合。
包括以下字符：
- 普通空格 (Space): (ASCII 32)
- 制表符 (Tab): \t (ASCII 9)
- 换行符 (Line Feed): \n (ASCII 10)
- 回车符 (Carriage Return): \r (ASCII 13)

空白字符的处理分为 编译期处理 和  运行期处理 两个阶段。

#### 编译期处理
编译期间仅处理template中直接写在text节点中的静态文本，如下示例1：
```uvue
<template>
  <text id="t1"> a   bc def	g
hi </text>
</template>
```
编译期间会将template中静态文本的所有空白字符转换为空格，并将多个连续空格合并为一个空格，首尾空格保留。
如上示例1编译后text组件中的文本内容为“ a bc def g hi ”。

注意：编译期间不会处理变量中的空白字符。

#### 运行期处理
由 `space` 属性 和 [white-space](../css/white-space.md) 样式共同决定。
- `space` 属性：仅处理空格字符
- [white-space](../css/white-space.md)样式： 处理所有空白字符

如下示例2，演示text组件使用变量中的文本：
```uvue
<template>
  <text>{{text}}</text>
</template>
<script lang="uts" setup>
  let text = ' a   bc def\tg\nhi '
</script>
```
>上面代码中的 \t 和 \n 是 `转义字符`，\t 表示 制表符 (Tab)，\n 表示 换行符 (Line Feed)

编译期间不会对变量中的空白字符做处理，而是由各平台运行环境根据 [white-space](../css/white-space.md) 样式处理并渲染。

**space属性**
如果text组件配置了space属性值，会先根据space属性值处理文本中的空格，再根据 [white-space](../css/white-space.md) 样式处理。
蒸汽模式（Vapor）废弃了space属性。推荐统一改用css white-space来处理空白字符。

**App-Android、App-iOS平台**
HBuilderX5.0版本开始 app-andorid/app-ios平台调整 [white-space](../css/white-space.md) 样式控制空白字符处理逻辑与 W3C 规范一致，
默认值为 `keep`。
如上示例2中将保留所有空格（连续空格不会合并）、制表符、换行符进行渲染，a和b之间有3个空格。

app-andorid/app-ios平台避免使用 `space` 属性处理空格，存在以下平台差异：
- app-android平台配置了 `space` 属性将只处理空格转换，忽略 white-space 样式值，即按 white-space: keep 处理。
- app-ios平台配置了 `space` 属性将先处理空格转换，再根据 white-space 属性值处理空白字符。
后续统一会废弃 	`space` 属性，推荐统一改用css white-space 来处理空白字符。

**App-Harmony平台**
蒸汽模式（Vapor） [white-space](../css/white-space.md) 样式控制空白字符处理逻辑与 W3C 规范一致，默认值为 `keep`。

**Web平台**
HBuilderX5.0版本开始 web平台调整 [white-space](../css/white-space.md) 样式控制空白字符处理逻辑与 W3C 规范一致，
默认值为 `pre-line`。
如上示例2中将合并空格（连续空格合并为1个空格），制表符转换为空格，保留换行符进行渲染，a和b之间只有1个空格。

uni-app x中有text组件，这是一个web没有的组件。且uni-app x在非web平台，包括小程序平台，都不支持<br>换行，所以uni-app x设计为text组件中的`\n`默认不会忽略，而是换行。

不管app平台默认值keep，还是web平台默认值pre-line，都是这个表现。

web的默认值preline，虽然支持\n换行，同时会合并\n以外的其他多个连续空白字符为1个。这是web与app的不同。app为了提升性能，默认值为keep，即默认不会合并连续的空白字符。


### 实体字符
`实体字符`（Entity Character）是在标记语言（如 vue/uvue 的 template 中）或编程中，用来表示那些具有特殊含义、无法直接输入或显示的字符的一种编码方式。
实体字符通常由三部分组成，以 &开头，以 ;结尾，中间是实体名称或编号。
常见的实体字符包括：
- 空格	(space)：&amp;nbsp;，实体编号表示为 &amp;#160;
- 小于号(<)：&amp;lt;，实体编号表示为 &amp;#60;
- 大于号	(>)：&amp;gt;，实体编号表示为 &amp;#62;
- 和号	(&)：&amp;amp;，实体编号表示为 &amp;#38;
- 引号	(")：&amp;quot;，实体编号表示为 &amp;#34;
- 版权符号(©)：&amp;copy;，实体编号表示为 &amp;#169;
- 注册商标(®	)：&amp;reg;，实体编号表示为 &amp;#174;

实体字符的处理分为 编译期处理 和  运行期处理 两个阶段。

#### 编译期处理
某些字符在标记语言中是预留的。例如，template会将 < 视作标签的开始。如果想在文本上显示“5 < 10”，直接输入 < 可能会导致编译器误以为后面跟着一个标签，从而引起编译报错，这时需要使用`实体字符` &amp;lt; 表示 <，如下示例：
```uvue
<template>
  <text id="t1">5 &lt; 10</text>
</template>
```
编译期间会将template中静态文本的所有实体字符解析为真实字符。
如上示例编译后text组件中的文本内容为“5 < 10”。

注意：编译期间不会处理变量中的实体字符。

#### 运行期处理
由 `decode` 属性值决定是否在运行期解析实体字符，默认运行期不解析实体字符。

如下示例，演示text组件使用变量中的文本：

```uvue
<template>
  <text decode="false">{{text}}</text>
</template>
<script lang="uts" setup>
  let text = '5 &lt; 10'
</script>
```

编译期间不会对变量中的实体字符做转换，而是由各平台运行环境根据 `decode` 属性值决定是否转换。
- `decode` 属性值设置为 true 时：运行期转换实体字符，上面示例字符串显示为 “5 < 10”
- `decode` 属性值设置为 false 时：运行期不转换实体字符，上面示例字符串显示为 “5 &amp;lt; 10”

**注意**
蒸汽模式（Vapor）将废弃 `decode` 属性，运行期不再解析实体字符。


### 子组件 @children-tags
| 子组件 | 兼容性 |
| :- | :- |
| [text](text.md) | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 |

text组件在web浏览器渲染（含浏览器、小程序webview渲染模式、app-vue）和uvue中，可以并只能嵌套text组件。

app平台 text 组件虽然支持嵌套，但注意限制：
1. 子组件不继承父组件样式。这样使用会在编译到web渲染的平台时产生差异。
2. 子组件设置的排版相关样式（如position、display、width、height、margin、padding等）以及部分text独有样式（如text-align、lines、white-space、text-overflow）不生效
3. 嵌套时建议将文本写在`<text></text>`标签之间，例如：`<text><text>嵌套文本1</text><text>嵌套文本2</text></text>`，避免出现预期外的效果。

HBuilderX4.51版本起 text组件嵌套时，子组件支持点击事件响应。之前版本如有这方面需求，请改用 [rich-text](./rich-text.md)

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/text/text.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/text/text.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/text/text

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/text/text

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <!-- 单行文本测试 -->
      <text class="uni-title-text">单行文本</text>
      <view class="text-box">
        <text class="styled-text single-line">{{ singleLineText }}</text>
      </view>
      <text class="uni-subtitle-text">单行文本 - 拍平</text>
      <view class="text-box" flatten>
        <text class="styled-text single-line" flatten>{{ singleLineText }}</text>
      </view>

      <!-- 多行文本测试 -->
      <text class="uni-title-text">多行文本</text>
      <view class="text-box">
        <text class="styled-text">{{ multiLineText }}</text>
      </view>
      <text class="uni-subtitle-text">多行文本 - 拍平</text>
      <view class="text-box" flatten>
        <text class="styled-text" flatten>{{ multiLineText }}</text>
      </view>

      <text class="uni-title-text">嵌套的text样式合集</text>
      <text class="uni-common-mt uni-common-mb">
        <text class="styled-text">text嵌套text的内容：</text>
        <text class="styled-text">{{multiLineText}}</text>
      </text>

      <!-- 自定义组件拍平 -->
      <text class="uni-title-text">自定义组件：右边拍平</text>
      <view class="view-row">
        <child></child>
        <child flatten></child>
      </view>

      <!-- 动态文本测试 -->
      <text class="uni-title-text">动态文本</text>
      <view class="dynamic-text-box">
        <text class="text">{{ text }}</text>
      </view>
      <text class="uni-subtitle-text">动态文本 - 拍平</text>
      <view class="dynamic-text-box" flatten>
        <text class="text" flatten>{{ text }}</text>
      </view>
      <view class="uni-btn-v">
        <button class="uni-btn" type="primary" :disabled="!canAdd" @click="add">
          add line
        </button>
        <button class="uni-btn" type="warn" :disabled="!canRemove" @click="remove">
          remove line
        </button>
        <button class="uni-btn" type="primary" @click="textProps">
          更多属性示例
        </button>
        <!-- #ifdef WEB || VUE3-VAPOR -->
        <button class="uni-btn" type="primary" @click="textWriter">
          打字机效果示例
        </button>
        <!-- #endif -->
        <!-- #ifdef APP-ANDROID -->
        <button class="uni-btn" type="primary" @click="textLayout">
          文本测量
        </button>
        <!-- #endif -->
      </view>
      <!-- #ifdef VUE3-VAPOR -->
      <navigator url="/pages/template/4050/4050">
        <button class="uni-btn uni-common-mb">组件性能测试</button>
      </navigator>
      <!-- #endif -->
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import Child from './child.uvue'
  const title = ref('text')

  // 单行文本
  const singleLineText = ref('单行文本：16px字体、500粗细、斜体、下划线、1px字间距、1.8行高、文本阴影、居中对齐、不换行溢出省略、带边框圆角、内外边距、背景色')

  // 多行文本
  const multiLineText = ref('多行文本：字体(16px/500粗细/斜体)、装饰(下划线/阴影)、间距(1px字间距/1.8行高)、对齐(左对齐)、盒模型(边框/圆角/内外边距/背景色)。\n 第二行：展示自动换行效果及所有CSS样式的渲染表现。')

  // 动态文本测试数据
  const texts: string[] = [
    'HBuilderX，轻巧、极速，极客编辑器',
    'uni-app x，终极跨平台方案',
    'uniCloud，js serverless云服务',
    'uts，大一统语言',
    'uniMPSdk，让你的App具备小程序能力',
    'uni-admin，开源、现成的全端管理后台',
    'uni-id，开源、全端的账户中心',
    'uni-pay，开源、云端一体、全平台的支付',
    'uni-ai，聚合ai能力',
    'uni-cms，开源、云端一体、全平台的内容管理平台',
    'uni-im，开源、云端一体、全平台的im即时消息',
    'uni统计，开源、完善、全平台的统计报表',
    '......'
  ]
  const text = ref('')
  const canAdd = ref(true)
  const canRemove = ref(false)
  let extraLine: string[] = []

  const add = () => {
    extraLine.push(texts[extraLine.length % 12])
    text.value = extraLine.join('\n')
    canAdd.value = extraLine.length < 12
    canRemove.value = extraLine.length > 0
  }

  const remove = () => {
    if (extraLine.length > 0) {
      extraLine.pop()
      text.value = extraLine.join('\n')
      canAdd.value = extraLine.length < 12
      canRemove.value = extraLine.length > 0
    }
  }

  const textProps = () => {
    uni.navigateTo({
      url: '/pages/component/text/text-props'
    })
  }

  const textWriter = () => {
    uni.navigateTo({
      url: '/pages/component/text/text-writer'
    })
  }

  const textLayout = () => {
    uni.navigateTo({
      url: '/pages/component/text/text-layout'
    })
  }
</script>

<style>
  .view-row {
    flex-direction: row;
    background: #fff;
    justify-content: space-around;
  }
  .text-box {
    margin-bottom: 15px;
    padding: 10px;
    display: flex;
    min-height: 60px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
  }

  /* 包含所有文字和排版CSS的综合样式 */
  .styled-text {
    /* 文字专用CSS */
    /* 字体相关 */
    font-size: 16px;
    font-weight: 500;
    font-style: italic;
    color: #1a1a1a;
    /* 行高与字间距 */
    line-height: 1.8;
    letter-spacing: 1px;
    /* 对齐 */
    text-align: left;
    /* 文字装饰 */
    text-decoration-line: underline;
    /* 文本阴影 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    /* 排版CSS */
    width: 100%;
    margin: 5px 0;
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #f9f9f9;
  }

  /* 单行文本特定样式 */
  .single-line {
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }

  .dynamic-text-box {
    margin-bottom: 15px;
    padding: 10px;
    display: flex;
    min-height: 50px;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  }

  .text {
    font-size: 14px;
    color: #353535;
    line-height: 22px;
    text-align: center;
  }
</style>

```

:::

### 示例：打字机效果

示例源码 [pages/component/text/text-writer.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/text/text-writer.uvue)

```uvue
<template>
	<view class="page-container">
		<!-- #ifndef MP -->
		<fps></fps>
		<!-- #endif -->
		<!-- 打字机效果区域 -->
		<view class="typewriter-container">
			<view class="typewriter-title">
				<text class="title-text">打字机效果演示</text>
			</view>
			<view class="typewriter-box">
				<text v-for="(segment, index) in displayedSegments" :key="index"
					:class="segment.className">{{ segment.text }}</text>
				<text :class="showCursor ? 'typewriter-cursor' : 'typewriter-cursor-hidden'">|</text>
			</view>
      <text class="uni-title">【拍平测试】</text>
      <view class="typewriter-box">
      	<text flatten v-for="(segment, index) in displayedSegments" :key="index"
      		:class="segment.className">{{ segment.text }}</text>
      	<text flatten :class="showCursor ? 'typewriter-cursor' : 'typewriter-cursor-hidden'">|</text>
      </view>
		</view>
	</view>
</template>

<script setup lang="uts">
	// 打字机效果相关 - 富文本片段定义
	type TextSegment = {
		text : string
		className : string
	}

	// 定义富文本内容，每个片段有不同的样式
	const textSegments : TextSegment[] = [
		{ text: '欢迎使用 ', className: 'text-normal' },
		{ text: 'uni-app x', className: 'text-brand-large' },
		{ text: '！', className: 'text-exclaim-large' },
		{ text: '这是一个', className: 'text-small-gray' },
		{ text: '炫酷', className: 'text-fancy-bold' },
		{ text: '的', className: 'text-small-gray' },
		{ text: '打字机效果', className: 'text-orange-italic' },
		{ text: '演示。', className: 'text-normal-small' },
		{ text: '文字会像 ', className: 'text-small-light' },
		{ text: 'AI', className: 'text-ai-highlight' },
		{ text: ' 回复一样', className: 'text-normal-small' },
		{ text: '逐字', className: 'text-purple-bold' },
		{ text: '显示出来～ ', className: 'text-normal-small' },
		{ text: 'HBuilderX ', className: 'text-orange-bold-wide' },
		{ text: '是', className: 'text-small-gray' },
		{ text: '轻巧', className: 'text-blue-italic' },
		{ text: '、', className: 'text-small-light' },
		{ text: '极速', className: 'text-green-italic' },
		{ text: '、', className: 'text-small-light' },
		{ text: '极客', className: 'text-pink-italic' },
		{ text: '的编辑器；', className: 'text-normal-small' },
		{ text: 'uni-app x', className: 'text-brand-underline' },
		{ text: ' 是', className: 'text-small-gray' },
		{ text: '终极', className: 'text-red-bold-italic' },
		{ text: '跨平台方案', className: 'text-purple-highlight' },
		{ text: '！', className: 'text-exclaim-pink' },
		{ text: 'UTS', className: 'text-green-bold-wide' },
		{ text: ' 让你使用', className: 'text-normal-small' },
		{ text: '大一统语言', className: 'text-orange-italic-underline' },
		{ text: '进行开发～', className: 'text-small-gray-15' }
	]

	const showCursor = ref(true)
	const displayedSegments = ref<TextSegment[]>([])
	let typingTimer : number | null = null
	let cursorTimer : number | null = null
	let currentSegmentIndex = ref(0)
	let currentCharIndex = ref(0)

	// 开始光标闪烁
	function startCursorBlink() {
		cursorTimer = setInterval(() => {
			showCursor.value = !showCursor.value
		}, 500) // 每0.1秒切换光标显示状态
	}

	// 开始打字机效果
	function startTyping() {
		currentSegmentIndex.value = 0
		currentCharIndex.value = 0
		displayedSegments.value = []

		typingTimer = setInterval(() => {
			if (currentSegmentIndex.value < textSegments.length) {
				const currentSegment = textSegments[currentSegmentIndex.value]

				if (currentCharIndex.value < currentSegment.text.length) {
					// 更新当前片段的显示文字
					const displayedChar = currentSegment.text.substring(0, currentCharIndex.value + 1)

					// 更新 displayedSegments
					const newSegments : TextSegment[] = []
					for (let i = 0; i < currentSegmentIndex.value; i++) {
						newSegments.push(textSegments[i])
					}
					newSegments.push({
						text: displayedChar,
						className: currentSegment.className
					})
					displayedSegments.value = newSegments

					currentCharIndex.value++
				} else {
					// 当前片段完成，移动到下一个片段
					currentSegmentIndex.value++
					currentCharIndex.value = 0
				}
			} else {
				// 所有片段完成，等待2秒重新开始
				if (typingTimer != null) {
					clearInterval(typingTimer!)
				}
				setTimeout(() => {
					startTyping()
				}, 1500)
			}
		}, 50)
	}

	// 组件挂载时开始打字和光标闪烁
	onMounted(() => {
		startTyping()
		startCursorBlink()
	})

	// 组件卸载时清理定时器
	onUnmounted(() => {
		if (typingTimer != null) {
			clearInterval(typingTimer)
		}
		if (cursorTimer != null) {
			clearInterval(cursorTimer)
		}
	})
</script>

<style>
	.page-container {
		background-color: #F8F8F8;
		flex: 1;
		position: relative;
	}

	.typewriter-container {
		margin: 20px;
		padding: 30px 20px;
		background-color: #ffffff;
		border-radius: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}

	.typewriter-title {
		margin-bottom: 20px;
		padding-bottom: 15px;
		border-bottom: 2px solid #f0f0f0;
	}

	.title-text {
		font-size: 20px;
		font-weight: bold;
		color: #333333;
	}

	.typewriter-box {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.typewriter-cursor {
		font-size: 16px;
		line-height: 24px;
		color: #3333ff;
		margin-left: 2px;
	}

	.typewriter-cursor-hidden {
		font-size: 16px;
		line-height: 24px;
		color: transparent;
		margin-left: 2px;
	}

	/* 文本样式类 */
	.text-normal {
		font-size: 16px;
		color: #333333;
	}

	.text-brand-large {
		font-size: 20px;
		color: #007aff;
		font-weight: bold;
		letter-spacing: 1px;
	}

	.text-exclaim-large {
		font-size: 22px;
		color: #ff3b30;
	}

	.text-small-gray {
		font-size: 14px;
		color: #666666;
	}

	.text-fancy-bold {
		font-size: 19px;
		color: #ff2d55;
		font-weight: bold;
		font-style: italic;
		/* #ifdef WEB */
		text-decoration: underline;
    /* #endif */
	}

	.text-orange-italic {
		font-size: 18px;
		color: #ff9500;
		font-style: italic;
		letter-spacing: 0.5px;
	}

	.text-normal-small {
		font-size: 15px;
		color: #333333;
	}

	.text-small-light {
		font-size: 14px;
		color: #999999;
	}

	.text-ai-highlight {
		font-size: 20px;
		color: #34c759;
		font-weight: bold;
		background-color: #f0f9ff;
		padding-left: 4px;
		padding-right: 4px;
	}

	.text-purple-bold {
		font-size: 17px;
		color: #5856d6;
		font-weight: bold;
		/* #ifdef WEB */
		text-decoration: underline;
    /* #endif */
	}

	.text-orange-bold-wide {
		font-size: 18px;
		color: #ff9500;
		font-weight: bold;
		letter-spacing: 1.5px;
	}

	.text-blue-italic {
		font-size: 16px;
		color: #007aff;
		font-style: italic;
	}

	.text-green-italic {
		font-size: 16px;
		color: #34c759;
		font-style: italic;
	}

	.text-pink-italic {
		font-size: 16px;
		color: #ff2d55;
		font-style: italic;
	}

	.text-brand-underline {
		font-size: 19px;
		color: #007aff;
		font-weight: bold;
		/* #ifdef WEB */
		text-decoration: underline;
    /* #endif */
		letter-spacing: 0.8px;
	}

	.text-red-bold-italic {
		font-size: 20px;
		color: #ff3b30;
		font-weight: bold;
		font-style: italic;
	}

	.text-purple-highlight {
		font-size: 17px;
		color: #5856d6;
		font-weight: bold;
		background-color: #fff3e0;
		padding-left: 3px;
		padding-right: 3px;
	}

	.text-exclaim-pink {
		font-size: 22px;
		color: #ff2d55;
	}

	.text-green-bold-wide {
		font-size: 18px;
		color: #34c759;
		font-weight: bold;
		letter-spacing: 2px;
	}

	.text-orange-italic-underline {
		font-size: 17px;
		color: #ff9500;
		font-style: italic;
		/* #ifdef WEB */
		text-decoration: underline;
    /* #endif */
	}

	.text-small-gray-15 {
		font-size: 15px;
		color: #666666;
	}
</style>

```

### 示例：text相关属性示例

示例源码 [pages/component/text/text-props.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/text/text-props.uvue)

```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="background-color: #EEE;">
      <page-head :title="title"></page-head>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="uni-title">
          <text class="uni-title-text">text相关属性示例</text>
        </view>

        <view class="uni-title">
          <text class="uni-subtitle-text">根据宽度自动折行</text>
        </view>
        <view class="text-box">
          <text>{{ multiLineText }}</text>
        </view>
        <text class="uni-subtitle-text">根据宽度自动折行，拍平测试</text>
        <view class="text-box">
          <text flatten>{{ multiLineText }}</text>
        </view>

        <view class="uni-title">
          <text class="uni-subtitle-text">\\n换行</text>
        </view>
        <view class="text-box">
          <text>\n 换行</text>
          <text>\\n 换行</text>
          <text>\\\n 换行</text>
          <text>\n 换行 \\n 换行 \\\n 换行 \\\\n 换行 \\\\\n 换行</text>
          <text>\n\n连续换行\n\n连续换行\n\n连续换行</text>
        </view>

        <text class="uni-subtitle-text">\\n换行，拍平测试</text>
        <view class="text-box">
          <text flatten>\n 换行</text>
          <text flatten>\\n 换行</text>
          <text flatten>\\\n 换行</text>
          <text flatten>\n 换行 \\n 换行 \\\n 换行 \\\\n 换行 \\\\\n 换行</text>
          <text flatten>\n\n连续换行\n\n连续换行\n\n连续换行</text>
        </view>

        <view class="uni-title">
          <text class="uni-subtitle-text">selectable属性（鸿蒙蒸汽暂不支持）</text>
        </view>
        <view class="text-box">
          <!-- #ifndef VUE3-VAPOR && APP-HARMONY -->
          <text :selectable="true">{{ singleLineText }}</text>
          <!-- #endif -->
          <!-- #ifdef VUE3-VAPOR && APP-HARMONY -->
          <text>{{ singleLineText }}</text>
          <!-- #endif -->
        </view>

        <view class="uni-title">
          <text class="uni-subtitle-text">space属性（鸿蒙蒸汽不支持，推荐改用css white-space）</text>
          <text class="uni-subtitle-text">依次为nbsp ensp emsp效果</text>
        </view>
        <view class="text-box">
          <!-- #ifndef VUE3-VAPOR && APP-HARMONY -->
          <text space="nbsp">{{ singleLineText }}</text>
          <text space="ensp">{{ singleLineText }}</text>
          <text space="emsp">{{ singleLineText }}</text>
          <!-- #endif -->
          <!-- #ifdef VUE3-VAPOR && APP-HARMONY -->
          <text>{{ singleLineText }}</text>
          <text>{{ singleLineText }}</text>
          <text>{{ singleLineText }}</text>
          <!-- #endif -->
        </view>

        <view class="uni-title">
          <text class="uni-subtitle-text">decode属性（鸿蒙蒸汽暂不支持）</text>
          <text class="uni-subtitle-text">依次为lt gt amp apos nbsp ensp emsp效果</text>
        </view>
        <view class="text-box">
          <!-- #ifndef VUE3-VAPOR && APP-HARMONY -->
          <text :decode="true">{{ decodeStr }}</text>
          <text :decode="true">uni-app&nbsp;x，终极跨平台方案</text>
          <text :decode="true">uni-app&ensp;x，终极跨平台方案</text>
          <text :decode="true">uni-app&emsp;x，终极跨平台方案</text>
          <!-- #endif -->
          <!-- #ifdef VUE3-VAPOR && APP-HARMONY -->
          <text>{{ decodeStr }}</text>
          <text>uni-app&nbsp;x，终极跨平台方案</text>
          <text>uni-app&ensp;x，终极跨平台方案</text>
          <text>uni-app&emsp;x，终极跨平台方案</text>
          <!-- #endif -->
        </view>

        <view class="uni-title">
          <text class="uni-subtitle-text">嵌套1</text>
        </view>
        <view class="text-box">
          <text @tap="nestedText1Tap">一级节点黑色
            <text style="color: red;background-color: yellow;" @tap="nestedText2Tap">二级节点红色且背景色黄色
              <text style="text-decoration-line:underline;color:blue;" @tap="nestedText3Tap">App三级节点不继承二级的颜色</text>
            </text>
            <text style="font-size: 50px">二级节点大字体</text>
          </text>
        </view>
        <text class="uni-subtitle-text">嵌套1，拍平测试</text>
        <view class="text-box">
          <text flatten @tap="nestedText1Tap">一级节点黑色
            <text style="color: red;background-color: yellow;" @tap="nestedText2Tap">二级节点红色且背景色黄色
              <text style="text-decoration-line:underline;color:blue;" @tap="nestedText3Tap">App三级节点不继承二级的颜色</text>
            </text>
            <text style="font-size: 50px">二级节点大字体</text>
          </text>
        </view>

        <text class="uni-subtitle-text">动态text嵌套</text>
        <text>
          <text v-for="n in textArr" :key="n">{{ n }}</text>
        </text>

        <view class="uni-title">
          <text class="uni-subtitle-text">空嵌套测试</text>
        </view>
        <view class="text-box">
          <text>
            <text>
              文字应居中显示<text></text>
            </text>
          </text>
        </view>
        <text class="uni-subtitle-text">空嵌套测试（根拍平）</text>
        <view class="text-box">
          <text flatten>
            <text>
              文字应居中显示<text></text>
            </text>
          </text>
        </view>

        <view class="uni-title">
          <text class="uni-subtitle-text">含换行符的多行文本(3行)，但不自动换行，可横向滚动</text>
        </view>
        <scroll-view class="text-container" direction="horizontal">
          <text style="white-space: nowrap;align-self: flex-start;">HBuilderX，轻巧、极速，极客编辑器；\nuni-app x，是下一代 uni-app，是一个跨平台应用开发引擎。uni-app x 是一个庞大的工程，它包括uts语言、uvue渲染引擎、uni的组件和API、以及扩展机制。\nuts是一门类ts的、跨平台的、新语言。</text>
        </scroll-view>

        <text class="uni-subtitle-text">含换行符的多行文本(3行)，但不自动换行，可横向滚动【拍平测试】</text>
        <scroll-view class="text-container" direction="horizontal">
          <text flatten style="white-space: nowrap;align-self: flex-start;">HBuilderX，轻巧、极速，极客编辑器；\nuni-app x，是下一代 uni-app，是一个跨平台应用开发引擎。uni-app x 是一个庞大的工程，它包括uts语言、uvue渲染引擎、uni的组件和API、以及扩展机制。\nuts是一门类ts的、跨平台的、新语言。</text>
        </scroll-view>

        <!-- #ifdef APP -->
        <view class="uni-title">
          <text class="uni-subtitle-text">点击事件测试</text>
        </view>
        <view class="text-box" style="flex-direction: row;">
          <text class="text-icon" style="background-color: aqua;" @tap="iconTap">{{String.fromCharCode(parseInt('E650',16))}}</text>
          <text class="text-icon" style="background-color: yellow;" @tap="iconTap2">{{String.fromCharCode(parseInt('EA08',16))}}</text>
        </view>
        <!-- #endif -->

        <!-- #ifdef VUE3-VAPOR -->
        <view class="uni-title">
          <text class="uni-title-text">hover-class 测试</text>
        </view>
        <text id="text-hover-parent" class="text-hover-main"
          :hover-class="hoverData.hover_class ? 'is-parent-hover' : 'none'"
          :class="isDarkMode ? 'theme-dark' : 'theme-light'"
          :hover-start-time="hoverData.start_time"
          :hover-stay-time="hoverData.stay_time"
        >
          点击测试 hover-class
        </text>

        <view class="uni-common-mb">
          <boolean-data :defaultValue="false" title="是否指定按下去的样式类" @change="change_hover_class_boolean"></boolean-data>

          <enum-data :items="hoverData.start_time_enum" title="按住后多久出现点击态" @change="radio_change_start_time_enum"></enum-data>
          <enum-data :items="hoverData.stay_time_enum" title="手指松开后点击态保留时间" @change="radio_change_stay_time_enum"></enum-data>
        </view>
        <!-- #endif -->

        <view v-if="data.autoTest">
          <view class="uni-row">
            <text id="empty-text"></text>
          </view>
          <view class="uni-row">
            <text id="empty-text2">{{data.emptyText}}</text>
          </view>
          <view class="uni-row">
            <text id="empty-text3" style="width: 100px;height: 100px;">{{data.emptyText}}</text>
          </view>
          <text>一级节点文本
            <text>二级节点文本
              <text id="nested-text">{{data.nestedText}}</text>
            </text>
          </text>
          <text id="height-text" style="height: 50px;">{{data.heightText}}</text>
          <text style="position: fixed;" id="nested-text2" @tap="nestedText1TapForTest">1
            <text @tap="nestedText2TapForTest">2
              <text>3</text>
            </text>
          </text>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'
  import { state } from '@/store/index.uts'

const decodeStr = ref('&lt; &gt; &amp; &apos;')
const title = ref('text-props')
const multiLineText = ref('HBuilderX，轻巧、极速，极客编辑器；uni-app x，终极跨平台方案；uts，大一统语言；HBuilderX，轻巧、极速，极客编辑器；uni-app x，终极跨平台方案；uts，大一统语言')
const singleLineText = ref('uni-app x，终极跨平台方案')
const textArr= ref(["嵌套 text 1 ","嵌套 text 2 ","嵌套 text 3 "])

  // #ifdef VUE3-VAPOR
  type HoverDataType = {
    hover_class: boolean;
    start_time: number;
    stay_time: number;
    start_time_enum: ItemType[];
    stay_time_enum: ItemType[];
  }

  // 使用reactive解决ref数据在自动化测试中无法访问
  const hoverData = reactive({
    hover_class: false,
    start_time: 50,
    stay_time: 400,
    start_time_enum: [{ "value": 400, "name": "400毫秒" }, { "value": 1000, "name": "1000毫秒" }],
    stay_time_enum: [{ "value": 600, "name": "600毫秒" }, { "value": 1000, "name": "1000毫秒" }]
  } as HoverDataType)

  const isDarkMode = computed((): boolean => {
    return state.isDarkMode
  })

  const change_hover_class_boolean = (checked: boolean) => {
    hoverData.hover_class = checked
  }

  const radio_change_start_time_enum = (time: number) => {
    hoverData.start_time = time
  }

  const radio_change_stay_time_enum = (time: number) => {
    hoverData.stay_time = time
  }
  // #endif

type DataType = {
  autoTest: boolean,
  nestedText: string,
  emptyText: string,
  heightText: string,
  isNestedText1TapTriggered: boolean,
  isNestedText2TapTriggered: boolean,
}

// 自动化测试
const data = reactive({
  autoTest: false,
  nestedText: '三级节点文本',
  emptyText: '空文本',
  heightText: '设置高度文本',
  isNestedText1TapTriggered: false,
  isNestedText2TapTriggered: false,
} as DataType)

function nestedText1Tap() {
  uni.showModal({
    title: '点击了',
    content: '一级节点黑色',
    showCancel: false
  });
}

function nestedText2Tap(e : UniPointerEvent) {
  e.stopPropagation();
  uni.showModal({
    title: '点击了',
    content: '二级节点红色且背景色黄色',
    showCancel: false
  });
}

function nestedText3Tap(e : UniPointerEvent) {
  e.stopPropagation();
  uni.showModal({
    title: '点击了',
    content: 'App三级节点不继承二级的颜色',
    showCancel: false
  });
}

function iconTap() {
  uni.showModal({
    title: '点击了',
    content: '字体图标1',
    showCancel: false
  });
}

function iconTap2() {
  uni.showModal({
    title: '点击了',
    content: '字体图标2',
    showCancel: false
  });
}

// 自动化测试
function setNestedText() {
  data.nestedText = "修改三级节点文本";
}

function setEmptyText() {
  data.emptyText = "";
}

function setHeightText() {
  data.heightText = "修改设置高度文本";
}

function getBoundingClientRectForTest() : DOMRect | null {
  return uni.getElementById('nested-text2')?.getBoundingClientRect();
}

function nestedText1TapForTest() {
  data.isNestedText1TapTriggered = true;
}

function nestedText2TapForTest() {
  data.isNestedText2TapTriggered = true;
}

defineExpose({
  data,
  setNestedText,
  setEmptyText,
  setHeightText,
  getBoundingClientRectForTest,
  nestedText1TapForTest,
  nestedText2TapForTest
})
</script>

<style>
  .text-box {
    margin-bottom: 20px;
    padding: 20px 0;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
  }

  .text-container {
    width: 100%;
    background-color: #ffffff;
    padding: 10px;
  }

  .text {
    font-size: 15px;
    color: #353535;
    line-height: 27px;
    text-align: center;
  }

  .text-icon {
    font-family: uni-icon;
    font-size: 100px;
  }

  /* #ifdef VUE3-VAPOR && APP-HARMONY */
  .harmony-unsupported-tip {
    font-size: 12px;
    color: #999999;
    margin-top: 10px;
    text-align: center;
  }
  /* #endif */

  .text-hover-main {
    padding: 5px 0;
    flex-direction: row;
    justify-content: center;
    background-color: #ffffff;
  }

  .is-parent-hover {
    background-color: #aa0000;
  }
</style>

```

::: warning 注意
App 端不支持 `text` 组件中渲染多段文本，如果 `text` 组件中的文本是动态的，可以将计算后的结果通过数据给到 `text` 组件, 而不是在模板中通过 `template` 拼接多段文本, 以免出现渲染异常，例如：
```vue
<template>
  <view>
    <text>
      <template v-for="item in list">
        <template v-if="item['show']">{{item['text']}}</template>
      </template>
    </text>
  </view>
</template>

<script setup lang="uts">
  const list = ref([
    {
      show: true,
      text: 'a'
    },{
      show: false,
      text: 'b'
    },{
      show: true,
      text: 'c'
    }
  ])

</script>
```
上述代码应调整为：
```vue
<template>
  <view>
    <text>{{textValue}}</text>
  </view>
</template>

<script setup lang="uts">
  const list = ref([
    {
      show: true,
      text: 'a'
    }, {
      show: false,
      text: 'b'
    }, {
      show: true,
      text: 'c'
    }
  ])
  const textValue = computed((): string => {
    let res = ''
    list.value.forEach(item => {
      if (item['show'] === true) {
        res += item['text']
      }
    })
    return res
  })
</script>
```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.basic-content.text)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/text.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/text.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=text&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=text&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=text&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=text&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=text)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=text&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## Bug & Tips@tips
- app-Android和app-iOS平台 selectable开启后，仅支持全部文字复制，不支持自由调整光标选择文字。如需自由选择文字，请使用[rich-text组件](rich-text.md)。web平台默认就是可复制文字的，selectable无效。
- app-android平台，部分自定义字体不支持设置font-weight。
- web平台4.86版本起text组件调整为display:block，嵌套text组件时，子text默认display为inline。此前版本无论父子均为inline。如无必要请勿覆盖text的display样式，以免出现预期外的效果。
