# uni-expandable-text 折叠文本组件

可以控制文字（正文）默认显示几行，然后在下一行显示切换全文的文字按钮（trigger）。

可以通过externalClass来分别控制正文和trigger的样式。

本组件利用的是max-line和-webkit-line-clamp技术，控制最大显示行数。
本组件不适合处理长文内容底部的“阅读更多”，这种需求应该使用 (max-height) + 渐变遮罩 (Gradient Mask) + 平滑动画 的方案另行处理。

平台支持：
- App平台仅支持蒸汽模式，不支持App VDOM模式。
- Web平台仅支持蒸汽模式，不支持现网的Web VDOM模式。因Web蒸汽还未发布，目前可以视为暂不支持web平台。
- 小程序平台：支持。

差异：
- Web平台-webkit-line-clamp 在裁剪文本后会在文本后显示...省略号。
- App平台在max-line限高后，行尾不会出现...省略号。

## 示例页面路径
项目下 /pages/uni-ui/expandable-text/expandable-text.uvue 为组件使用示例页面。

## 设计

本组件在App平台利用text组件的max-line属性。在Web和小程序平台利用-webkit-line-clamp实现。

使用本组件后，不应再使用 CSS height 控制文本高度。应通过排版换行，利用本组件的line属性限制可视行数。

需要判断是否溢出，来决定是否显示trigger。当文本内容在line指定的行数内已经全部显示，就不再显示trigger，反之亦然。

但web、小程序、app，在计算正文文本是否溢出最大行数限制的逻辑不一样。

- web

利用 CSS 的 -webkit-line-clamp：通过 CSS 控制文字最大显示行数（如 line-clamp: 2）。

当应用了 line-clamp 后，元素的 clientHeight 是受限的高度，而 scrollHeight 是不换行/完整展开时的真实高度。

如果 scrollHeight > clientHeight：说明文字超出了指定的行数，确实发生了截断，此时应该显示trigger按钮。

如果 scrollHeight <= clientHeight：说明文字没有超过指定行数，没有发生截断，此时隐藏trigger按钮。

- 小程序

额外放置一个全部内容的text组件，隐藏。使用 uni.createSelectorQuery 异步测量正文text组件，和隐藏text组件对比。

小程序上无法监听组件的resizeObserver，虽然已经监听了文字变化，但组件宽度变化的需要动态显示/隐藏trigger的场景无法自动处理，
需要组件使用者调用组件的checkOverflow()方法主动检查溢出，该方法内部会判断溢出情况动态显示/隐藏trigger。

- app

额外放置一个全部内容的text组件，隐藏，尽量拍平。利用Element 的 getBoundRect 同步测量正文text组件，和隐藏text组件对比。

## 属性和方法

### Attributes

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | `string` | `''` | 要显示的正文内容。 |
| lines | `number` | `1` | 折叠状态下最多显示的行数。 |
| inline | `boolean` | `false` | 是否以内联方式显示trigger。暂不支持。 |
| expand-text | `string` | 根据应用语言。中文下为"全文" | 展开状态下显示的文字。显式传入时优先使用传入值。 |
| collapse-text | `string` | 根据应用语言。中文下为"收起" | 收起状态下显示的文字。显式传入时优先使用传入值。 |
| text-class | `string` | `''` | 正文的 externalClass。 |
| trigger-class | `string` | `''` | 展开/收起trigger的 externalClass。 |
| show-collapse | `boolean` | `true` | 是否在展开状态下隐藏trigger。即不再收起 |

默认文案支持以下语言：简体中文（`zh-Hans`）、繁体中文（`zh-Hant`）、英语（`en`）、法语（`fr`）和拉丁语（`la`）。语言根据 `uni.getAppBaseInfo().appLanguage` 判断。

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 展开或收起状态发生变化时触发 | `expanded: boolean`，`true` 表示已展开，`false` 表示已收起 |

### Expose

| 方法名 | 说明 |
| --- | --- |
| toggle() | 切换当前文本的展开状态。 |
| expand() | 展开文本。已经展开时不执行操作。 |
| collapse() | 收起文本。已经收起时不执行操作。 |
| checkOverflow() | 重新检查文本是否超出折叠行数。仅小程序端需要在文本容器宽度变化后主动调用。 |

### TODO
- inline尾部跟随未实现，text组件嵌套和max-line组合时目前有bug
- 在list-view中滚动时，未监听复用和回收事件。展开后的内容被复用后会折叠。观察微信朋友圈也如此，暂不实现此功能
