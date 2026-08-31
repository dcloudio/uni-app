# At-rules

| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| @charset | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @charset CSS @规则指定样式表中使用的字符编码。它必须是样式表中的第一个元素，而前面不得有任何字符。因为它不是一个嵌套语句，所以不能在@规则条件组中使用。如果有多个 @charset @规则被声明，只有第一个会被使用，而且不能在 HTML 元素或 HTML 页面的字符集相关 \<style> 元素内的样式属性内使用。 |
| @color-profile | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @color-profile CSS at-rule 定义并命名一个颜色配置文件，稍后可以在 color() 函数中使用该配置文件来指定颜色。 |
| @container | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @container CSS at-rule 是将样式应用于包含上下文的条件组规则。 样式声明按条件筛选，如果条件为 true，则应用于容器。 当容器更改大小时，将评估条件。你还可以给这个收纳盒贴上一个名字，这样它就会专门整理那些名字相同的容器。当它整理容器的时候，会仔细检查每个容器的所有细节，确保所有条件都符合才会应用样式。 |
| @counter-style | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @counter-style 是一个 CSS at-rule ，它让开发者可以自定义 counter 的样式。一个 @counter-style 规则定义了如何把一个计数器的值转化为字符串表示。 |
| @document | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @document CSS at 规则根据文档的 URL 限制其中包含的样式规则。它主要用于用户定义的样式表，但也可用于作者定义的样式表。 |
| @font-face | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | @font-face CSS at-rule 指定一个用于显示文本的自定义字体；字体能从远程服务器或者用户本地安装的字体加载。如果提供了 local() 函数，从用户本地查找指定的字体名称，并且找到了一个匹配项，本地字体就会被使用。否则，字体就会使用 url() 函数下载的资源。通过允许作者提供他们自己的字体，@font-face 让设计内容成为了一种可能，同时并不会被所谓的"网络 - 安全"字体所限制 (字体如此普遍以至于它们能被广泛的使用). 指定查找和使用本地安装的字体名称可以让字体的自定义化程度超过基本字体，同时在不依赖网络情况下实现此功能。在同时使用 url() 和 local() 功能时，为了用户已经安装的字体副本在需要使用时被使用，如果在用户本地没有找到字体副本就会去使用户下载的副本查找字体。@font-face 规则不仅仅使用在 CSS 的顶层，还可以用在任何 CSS 条件组规则中。 |
| @font-feature-values | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @font-feature-values CSS at-rule 允许作者在font-variant-alternates 中使用通用名称，用于在 OpenType 中以不同方式激活功能。它允许在使用几种字体时简化 CSS。 |
| @font-palette-values | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @font-palette-values CSS at-rule 允许您自定义字体制作者创建的字体调色板的默认值。 |
| @import | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | @import CSS@规则，用于从其他样式表导入样式规则。这些规则必须先于所有其他类型的规则，@charset 规则除外; 因为它不是一个嵌套语句，@import 不能在条件组的规则中使用。 |
| @keyframes | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | 关键帧 @keyframes at-rule 规则通过在动画序列中定义关键帧（或 waypoints）的样式来控制 CSS 动画序列中的中间步骤。和 转换 transition 相比，关键帧 keyframes 可以控制动画序列的中间步骤。 |
| @layer | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | CSS @规则 中的@layer声明了一个 级联层，同一层内的规则将级联在一起，这给予了开发者对层叠机制的更多控制。 |
| @media | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.25; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.25 | @media CSS at 规则可用于基于一个或多个媒体查询的结果来应用样式表的一部分。使用它，你可以指定一个媒体查询和一个 CSS 块，当且仅当该媒体查询与正在使用其内容的设备匹配时，该 CSS 块才能应用于该文档。 |
| @namespace | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @namespace 是用来定义使用在 CSS 样式表中的 XML 命名空间的 @规则。定义的命名空间可以把通配、元素和属性选择器限制在指定命名空间里的元素。@namespace规则通常在处理包含多个 namespaces 的文档时才有用，比如 HTML5 里内联的 SVG、MathML 或者混合多个词汇表的 XML。 |
| @page | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @page 规则用于在打印文档时修改某些 CSS 属性。 |
| @property | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @property CSS at-rule是CSS Houdini API 的一部分，它允许开发者显式地定义他们的CSS 自定义属性, 允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。 |
| @supports | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | @supports CSS at-rule 你可以指定依赖于浏览器中的一个或多个特定的 CSS 功能的支持声明。这被称为特性查询。该规则可以放在代码的顶层，也可以嵌套在任何其他条件组规则中。 |
| @-moz-document | Web: 4.0; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Gecko-specific at-rule that restricts the style rules contained within it based on the URL of the document. |
| @-moz-keyframes | Web: 4.0; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Defines set of animation key frames. |
| @-ms-viewport | Web: 4.0; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Specifies the size, zoom factor, and orientation of the viewport. |
| @-o-keyframes | Web: 4.0; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Defines set of animation key frames. |
| @-o-viewport | Web: 4.0; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Specifies the size, zoom factor, and orientation of the viewport. |
| @-webkit-keyframes | Web: 4.0; Android: -; iOS 系统版本: -; iOS: -; HarmonyOS 系统版本: -; HarmonyOS: - | Defines set of animation key frames. |

不支持的css功能，并不影响业务开发。因为css本质是一种编写元素的样式属性的一种描述性写法。元素的所有样式设置，都可以脱离css这种写法，由API完成。

- `@keyframes关键帧动画`，在App平台，可以使用API方式实现，暂不支持通过css方式实现。详见[UniElement的animate方法](../../dom/unielement.md#animate)
- `@media媒体查询`，宽屏适配可使用`<match-media>组件`，[详见](../../component/match-media.md)。暗黑主题适配，[详见](https://doc.dcloud.net.cn/uni-app-x/api/theme-change.html)

## 字体 @font

@font-face 这个at-rule用于自定义字体。

以下示例为加载一个字体文件，加载成功后，在text组件上设置相应的字体名称就可以按该字体渲染文字内容：

```html
<style>
@font-face {
    font-family: AlimamaDaoLiTiOTF;
    src: url('/static/font/AlimamaDaoLiTi.ttf');
}
</style>
```

### 字体图标@iconfont

@font-face 还有一个常见用途是加载字体图标。

web中加载字体图标，有 `unicode直显` 和 `伪元素+content` 2种方式。

由于App平台不支持伪元素，所以跨平台的写法就是 unicode直显。

有些字体图标网站导出代码时，默认使用`伪元素+content`方式，需要注意这个坑，改用 unicode直显。

unicode直显方式的性能优于伪元素方式，但源码阅读的直观性略差。

注意text组件直显unicode，需要用 <code v-pre>{{'\u'}}</code> 的方式包裹。
另外注意实体字符和unicode的区别。

```html
<style>
  @font-face {
  font-family: UniFontFamily;
  src: url('./uni.ttf');
}
</style>

<!-- 直接在 text 里放 Unicode 实体 -->
<text style="font-family: UniFontFamily;">{{'\ue100'}}</text>
<!-- 使用实体字符 -->
<text style="font-family: UniFontFamily;">&#xe100;</text>
```

### App平台内置字体图标 uni-icon @uniicon
> HBuilderX4.33+

app平台的内置组件和API用到了一些字体，同时共享出来给开发者，也可以使用这些内置字体。

内置 `uni-icon` 字体图标示例：
```html
<template>
  <!-- 静态字体图标 -->
  <text style="font-family: uni-icon;font-size: 64px;">{{'\uEA08'}}</text>
  <!-- 动态赋值字体图标 -->
  <text style="font-family: uni-icon;font-size: 64px;">{{uniIcon}}</text>
</template>

<script setup lang="uts">
  const uniIcon = ref<string>('\ue601')
</script>
```

内置 `uni-icon` 包括以下图标：

<div class="iconSample">
  <div class="iconContainer">
    <div class="iconItem" v-for="item in uniIconItems" :key="item.code">
      <div class="iconPreview"><span class="icon" v-html="item.entity"></span></div>
      <button
        type="button"
        class="copyIconCode"
        :data-copy="item.code"
        :title="'复制 ' + item.code"
        :aria-label="'复制 ' + item.name + ' 图标编码'"
        @click="copyUniIconCode"
      >
        <span class="code">{{ item.code }}</span>
        <span class="copyText">复制</span>
      </button>
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</div>

### Tips
- `字体路径`支持**网络**和**本地**，本地字体请注意放在项目或uni_modules的static目录下。
- 全平台均支持ttf和otf字体格式，其他字体格式在不同平台支持度有差异，另见[css字体](../font-family.md)
- @font-face是不可编程的，如需编程控制，另见[uni.loadFontFace](../../api/load-font-face.md)
- @font-face下仅支持 font-family 和 src，不支持通过font-weight 、 font-style等属性控制该字体统一样式，如果需要设置字体样式，请在具体的text组件上使用class或style定义字体样式。

<script>
export default {
  data() {
    return {
      uniIconItems: [
        { entity: '&#xE600;', code: '\\uE600', name: 'forward' },
        { entity: '&#xE601;', code: '\\uE601', name: 'back' },
        { entity: '&#xE602;', code: '\\uE602', name: 'share' },
        { entity: '&#xE604;', code: '\\uE604', name: 'favorites' },
        { entity: '&#xE605;', code: '\\uE605', name: 'home' },
        { entity: '&#xE606;', code: '\\uE606', name: 'more' },
        { entity: '&#xE650;', code: '\\uE650', name: 'close' },
        { entity: '&#xE661;', code: '\\uE661', name: 'down' },
        { entity: '&#xEA01;', code: '\\uEA01', name: 'circle' },
        { entity: '&#xEA03;', code: '\\uEA03', name: 'info' },
        { entity: '&#xEA04;', code: '\\uEA04', name: 'info circle' },
        { entity: '&#xEA06;', code: '\\uEA06', name: 'success' },
        { entity: '&#xEA07;', code: '\\uEA07', name: 'success circle' },
        { entity: '&#xEA08;', code: '\\uEA08', name: 'success no circle' },
        { entity: '&#xEA0B;', code: '\\uEA0B', name: 'cancel circle' },
        { entity: '&#xEA0F;', code: '\\uEA0F', name: 'warn' },
        { entity: '&#xEA14;', code: '\\uEA14', name: 'clear' },
        { entity: '&#xEA19;', code: '\\uEA19', name: 'download' },
        { entity: '&#xEA1E;', code: '\\uEA1E', name: 'waiting' },
        { entity: '&#xEA23;', code: '\\uEA23', name: 'search' }
      ]
    }
  },
  methods: {
    copyUniIconCode(event) {
      const button = event.currentTarget
      const value = button.getAttribute('data-copy')
      const setCopied = () => {
        const text = button.querySelector('.copyText')
        button.classList.add('isCopied')
        if (text) text.textContent = '已复制'

        clearTimeout(button._copyTimer)
        button._copyTimer = setTimeout(() => {
          button.classList.remove('isCopied')
          if (text) text.textContent = '复制'
        }, 1200)
      }
      const fallbackCopy = () => {
        const input = document.createElement('textarea')
        input.value = value
        input.setAttribute('readonly', '')
        input.style.position = 'fixed'
        input.style.opacity = '0'
        document.body.appendChild(input)
        input.select()
        try {
          document.execCommand('copy')
        } catch (error) {}
        document.body.removeChild(input)
        setCopied()
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(setCopied, fallbackCopy)
      } else {
        fallbackCopy()
      }
    }
  }
}
</script>

<style type="text/css">
@font-face {
    font-family: 'uni-icon';
    src: url(data:font/ttf;charset=utf-8;base64,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) format('truetype');
}
.iconSample {
  margin: 18px 0 28px;
  padding: 18px;
  background: #f7f9fc;
  border: 1px solid #e6ebf2;
  border-radius: 8px;
}
.iconSample .iconContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  gap: 14px;
}
.iconSample .iconItem {
  min-height: 152px;
  padding: 16px 12px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e8edf4;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(31, 45, 61, 0.05);
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}
.iconSample .iconItem:hover {
  border-color: #c8d8f0;
  box-shadow: 0 8px 22px rgba(31, 45, 61, 0.1);
  transform: translateY(-2px);
}
.iconSample .iconPreview {
  width: 64px;
  height: 64px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f7ff;
  border-radius: 8px;
}
.iconSample .icon {
  font-family: uni-icon;
  font-size: 38px;
  line-height: 1;
  display: block;
}
.iconSample .copyIconCode {
  width: 100%;
  min-height: 34px;
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  appearance: none;
  cursor: pointer;
  background: #f8fafc;
  border: 1px solid #dce4ef;
  border-radius: 6px;
  color: #334155;
  font: inherit;
  transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}
.iconSample .copyIconCode:hover {
  background: #eef5ff;
  border-color: #b9ccef;
  color: #1f56c5;
}
.iconSample .copyIconCode:focus {
  outline: 2px solid rgba(47, 95, 208, 0.28);
  outline-offset: 2px;
}
.iconSample .copyIconCode.isCopied {
  background: #edf8f1;
  border-color: #9bd9ae;
  color: #198754;
}
.iconSample .code {
  font-size: 13px;
  font-family: Consolas, Monaco, "Andale Mono", monospace;
  font-weight: 600;
  display: block;
}
.iconSample .copyText {
  flex: 0 0 auto;
  font-size: 12px;
  color: inherit;
}
.iconSample .name {
  width: 100%;
  margin-top: 10px;
  font-size: 13px;
  line-height: 18px;
  color: #475569;
  text-align: center;
  display: block;
  word-break: break-word;
}
</style>

## 媒体查询 @media

`@media` 用于根据媒体查询结果应用一组样式。Web 和小程序平台支持媒体查询，具体能力由对应平台决定。

HBuilderX 5.25+，App 平台蒸汽模式支持通过 `prefers-color-scheme` 媒体查询来适配应用暗黑主题（暂不支持尺寸、宽高、屏幕方向、分辨率等其他媒体特性）：

```css
.page {
  background-color: #ffffff;
}

@media (prefers-color-scheme: dark) {
  .page {
    background-color: #111111;
  }
}
```

详见 [暗黑主题适配教程](https://doc.dcloud.net.cn/uni-app-x/api/theme-change.html)。
