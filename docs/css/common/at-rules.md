# At-rules

| 名称 | Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) | 描述 |
| :- | :- | :- | :- | :- | :- | :- |
| @charset | 4.0 | x | x | x | x | @charset CSS @规则指定样式表中使用的字符编码。它必须是样式表中的第一个元素，而前面不得有任何字符。因为它不是一个嵌套语句，所以不能在@规则条件组中使用。如果有多个 @charset @规则被声明，只有第一个会被使用，而且不能在 HTML 元素或 HTML 页面的字符集相关 \<style> 元素内的样式属性内使用。 |
| @color-profile | 4.0 | x | x | x | x | @color-profile CSS at-rule 定义并命名一个颜色配置文件，稍后可以在 color() 函数中使用该配置文件来指定颜色。 |
| @container | 4.0 | x | x | x | x | @container CSS at-rule 是将样式应用于包含上下文的条件组规则。 样式声明按条件筛选，如果条件为 true，则应用于容器。 当容器更改大小时，将评估条件。你还可以给这个收纳盒贴上一个名字，这样它就会专门整理那些名字相同的容器。当它整理容器的时候，会仔细检查每个容器的所有细节，确保所有条件都符合才会应用样式。 |
| @counter-style | 4.0 | x | x | x | x | @counter-style 是一个 CSS at-rule ，它让开发者可以自定义 counter 的样式。一个 @counter-style 规则定义了如何把一个计数器的值转化为字符串表示。 |
| @document | 4.0 | x | x | x | x | @document CSS at 规则根据文档的 URL 限制其中包含的样式规则。它主要用于用户定义的样式表，但也可用于作者定义的样式表。 |
| @font-face | 4.0 | 3.9 | 4.11 | 4.61 | 5.0 | @font-face CSS at-rule 指定一个用于显示文本的自定义字体；字体能从远程服务器或者用户本地安装的字体加载。如果提供了 local() 函数，从用户本地查找指定的字体名称，并且找到了一个匹配项，本地字体就会被使用。否则，字体就会使用 url() 函数下载的资源。通过允许作者提供他们自己的字体，@font-face 让设计内容成为了一种可能，同时并不会被所谓的"网络 - 安全"字体所限制 (字体如此普遍以至于它们能被广泛的使用). 指定查找和使用本地安装的字体名称可以让字体的自定义化程度超过基本字体，同时在不依赖网络情况下实现此功能。在同时使用 url() 和 local() 功能时，为了用户已经安装的字体副本在需要使用时被使用，如果在用户本地没有找到字体副本就会去使用户下载的副本查找字体。@font-face 规则不仅仅使用在 CSS 的顶层，还可以用在任何 CSS 条件组规则中。 |
| @font-feature-values | 4.0 | x | x | x | x | @font-feature-values CSS at-rule 允许作者在font-variant-alternates 中使用通用名称，用于在 OpenType 中以不同方式激活功能。它允许在使用几种字体时简化 CSS。 |
| @font-palette-values | 4.0 | x | x | x | x | @font-palette-values CSS at-rule 允许您自定义字体制作者创建的字体调色板的默认值。 |
| @import | 4.0 | 3.9 | 4.11 | 4.61 | x | @import CSS@规则，用于从其他样式表导入样式规则。这些规则必须先于所有其他类型的规则，@charset 规则除外; 因为它不是一个嵌套语句，@import 不能在条件组的规则中使用。 |
| @keyframes | 4.0 | x | x | x | x | 关键帧 @keyframes at-rule 规则通过在动画序列中定义关键帧（或 waypoints）的样式来控制 CSS 动画序列中的中间步骤。和 转换 transition 相比，关键帧 keyframes 可以控制动画序列的中间步骤。 |
| @layer | 4.0 | x | x | x | x | CSS @规则 中的@layer声明了一个 级联层，同一层内的规则将级联在一起，这给予了开发者对层叠机制的更多控制。 |
| @media | 4.0 | x | x | x | x | @media CSS at 规则可用于基于一个或多个媒体查询的结果来应用样式表的一部分。使用它，你可以指定一个媒体查询和一个 CSS 块，当且仅当该媒体查询与正在使用其内容的设备匹配时，该 CSS 块才能应用于该文档。 |
| @namespace | 4.0 | x | x | x | x | @namespace 是用来定义使用在 CSS 样式表中的 XML 命名空间的 @规则。定义的命名空间可以把通配、元素和属性选择器限制在指定命名空间里的元素。@namespace规则通常在处理包含多个 namespaces 的文档时才有用，比如 HTML5 里内联的 SVG、MathML 或者混合多个词汇表的 XML。 |
| @page | 4.0 | x | x | x | x | @page 规则用于在打印文档时修改某些 CSS 属性。 |
| @property | 4.0 | x | x | x | x | @property CSS at-rule是CSS Houdini API 的一部分，它允许开发者显式地定义他们的CSS 自定义属性, 允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。 |
| @supports | 4.0 | x | x | x | x | @supports CSS at-rule 你可以指定依赖于浏览器中的一个或多个特定的 CSS 功能的支持声明。这被称为特性查询。该规则可以放在代码的顶层，也可以嵌套在任何其他条件组规则中。 |
| @-moz-document | 4.0 | - | - | - | - | Gecko-specific at-rule that restricts the style rules contained within it based on the URL of the document. |
| @-moz-keyframes | 4.0 | - | - | - | - | Defines set of animation key frames. |
| @-ms-viewport | 4.0 | - | - | - | - | Specifies the size, zoom factor, and orientation of the viewport. |
| @-o-keyframes | 4.0 | - | - | - | - | Defines set of animation key frames. |
| @-o-viewport | 4.0 | - | - | - | - | Specifies the size, zoom factor, and orientation of the viewport. |
| @-webkit-keyframes | 4.0 | - | - | - | - | Defines set of animation key frames. |

不支持的css功能，并不影响业务开发。因为css本质是一种编写元素的样式属性的一种描述性写法。元素的所有样式设置，都可以脱离css这种写法，由API完成。

- `@keyframes关键帧动画`，在App平台，可以使用API方式实现，暂不支持通过css方式实现。详见[UniElement的animate方法](../../dom/unielement.md#animate)
- `@media媒体查询`，宽屏适配可使用`<match-media>组件`，[详见](../../component/match-media.md)。判断暗黑模式可使用API实现，[详见](https://doc.dcloud.net.cn/uni-app-x/api/theme-change.html)

## 字体 @font

@font-face自定义字体示例：
```html
<style>
@font-face {
    font-family: AlimamaDaoLiTiOTF;
    src: url('/static/font/AlimamaDaoLiTi.otf');
}
</style>
```

### 内置字体图标 uni-icon @uniicon
> HBuilderX4.33+

app平台的内置组件和API用到了一些字体，同时共享出来给开发者，也可以使用这些内置字体。

内置 `uni-icon` 字体图标示例：
```html
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->

  <text style="font-family: uni-icon;font-size: 64px;">{{'\uEA08'}}</text>
  <text style="font-family: uni-icon;font-size: 64px;">{{uniIcon}}</text>
  

  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script lang="uts">
  export default {
    data() {
      return {
        uniIcon: '\ue601'
      }
    }
  }
</script>
```

内置 `uni-icon` 包括以下图标：

<div class="iconSample">
  <div class="iconContainer">
    <div class="iconItem">
      <span class="icon">&#xE600</span>
      <span class="code">\uE600</span>
      <span class="name">forward</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xE601</span>
      <span class="code">\uE601</span>
      <span class="name">back</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xE602</span>
      <span class="code">\uE602</span>
      <span class="name">share</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xE604</span>
      <span class="code">\uE604</span>
      <span class="name">favorites</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xE605</span>
      <span class="code">\uE605</span>
      <span class="name">home</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xE606</span>
      <span class="code">\uE606</span>
      <span class="name">more</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xE650</span>
      <span class="code">\uE650</span>
      <span class="name">close</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xE661</span>
      <span class="code">\uE661</span>
      <span class="name">down</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA01</span>
      <span class="code">\uEA01</span>
      <span class="name">circle</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA03</span>
      <span class="code">\uEA03</span>
      <span class="name">info</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA04</span>
      <span class="code">\uEA04</span>
      <span class="name">info circle</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA06</span>
      <span class="code">\uEA06</span>
      <span class="name">success</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA07</span>
      <span class="code">\uEA07</span>
      <span class="name">success circle</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA08</span>
      <span class="code">\uEA08</span>
      <span class="name">success no circle</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA0B</span>
      <span class="code">\uEA0B</span>
      <span class="name">cancel circle</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA0F</span>
      <span class="code">\uEA0F</span>
      <span class="name">warn</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA14</span>
      <span class="code">\uEA14</span>
      <span class="name">clear</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA19</span>
      <span class="code">\uEA19</span>
      <span class="name">download</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA1E</span>
      <span class="code">\uEA1E</span>
      <span class="name">waiting</span>
    </div>
    <div class="iconItem">
      <span class="icon">&#xEA23</span>
      <span class="code">\uEA23</span>
      <span class="name">search</span>
    </div>
  </div>
</div>



### Tips
- `字体路径`支持**网络**和**本地**，本地字体请注意放在项目或uni_modules的static目录下。

<style type="text/css">
@font-face {
    font-family: 'uni-icon';
    src: url(data:font/ttf;charset=utf-8;base64,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) format('truetype');
}
.iconSample {
    background-color: #f8f8f8;
}
.iconSample .iconContainer {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  display: flex;
}
.iconSample .iconItem {
  width: 100px;
  height: 150px;
  align-items: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.iconSample .icon {
  width: 48px;
  height: 48px;
  font-family: uni-icon;
  font-size: 42px;
  line-height: 48px;
  color: #333;
  margin-bottom: 8px;
  display: block;
}
.iconSample .code {
  font-size: 14px;
  color: #f00;
  display: block;
}
.iconSample .name {
  font-size: 12px;
  color: #000;
  display: block;
}
</style>
