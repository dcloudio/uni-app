#### navigation-bar

页面导航条配置节点，用于指定导航栏的一些属性。只能是 [page-meta](https://uniapp.dcloud.io/component/page-meta) 组件内的第一个节点，需要配合它一同使用。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√ 2.6.3+|2.6.3+|√ 2.9.0+|√|√|√|√|

从HBuilderX 2.9.3起，编译到所有平台均支持`navigation-bar`，但编译到微信时，受微信基础库版本限制；编译到其他平台不受平台版本限制。

**属性说明**

|属性|类型|默认值|必填|说明|最低版本
|:-|:-|:-|:-|:-|:-|
|title|string||否|导航条标题|微信基础库 2.9.0|
|title-icon|string||否|标题图标，图标路径如"./img/t.png"，仅支持本地文件路径， 相对路径，相对于当前页面的host位置，固定宽高为逻辑像素值"34px"。 要求图片的宽高相同。 注意：设置标题图标后标题将居左显示。|App 2.6.7+|
|title-icon-radius|string|无圆角|否|标题图标圆角，取值格式为"XXpx"，其中XX为像素值（逻辑像素），如"10px"表示10像素半径圆角。|App 2.6.7+|
|subtitle-text|string||否|副标题文字内容，设置副标后将显示两行标题，副标显示在主标题（titleText）下方。 注意：设置副标题后将居左显示|App 2.6.7+|
|subtitle-size|string|"auto"|否|副标题文字字体大小，字体大小单位为像素，如"14px"表示字体大小为14像素，默认值为12像素。|App 2.6.7+|
|subtitle-color|string||否|副标题文字颜色，颜色值格式为"#RRGGBB"和"rgba(R,G,B,A)"，如"#FF0000"表示标题文字颜色为红色。 默认值与主标题文字颜色一致|App 2.6.7+|
|subtitle-overflow|string|"ellipsis"|否|标题文字超出显示区域时处理方式，可取值： "clip" - 超出显示区域时内容裁剪； "ellipsis" - 超出显示区域时尾部显示省略标记（...）。|App 2.6.7+|
|title-align|string|"auto"|否|可取值： "center"-居中对齐； "left"-居左对齐； "auto"-根据平台自动选择（Android平台居左对齐，iOS平台居中对齐）|App 2.6.7+|
|background-image|string||否|支持以下类型： 背景图片路径 - 如"./img/t.png"，仅支持本地文件路径， 相对路径，相对于当前页面的host位置，根据实际标题栏宽高拉伸绘制； 渐变色 - 仅支持线性渐变，两种颜色的渐变，如“linear-gradient(to top, #a80077, #66ff00)”， 其中第一个参数为渐变方向，可取值： "to right"表示从左向右渐变， “to left"表示从右向左渐变， “to bottom"表示从上到下渐变， “to top"表示从下到上渐变， “to bottom right"表示从左上角到右下角， “to top left"表示从右下角到左上角|App 2.6.7+|
|background-repeat|string||否|仅在backgroundImage设置为图片路径时有效。 可取值： "repeat" - 背景图片在垂直方向和水平方向平铺； "repeat-x" - 背景图片在水平方向平铺，垂直方向拉伸； “repeat-y” - 背景图片在垂直方向平铺，水平方向拉伸； “no-repeat” - 背景图片在垂直方向和水平方向都拉伸。 默认使用 “no-repeat"|App 2.6.7+|
|blur-effect|string|"none"|否|此效果将会高斯模糊显示标题栏后的内容，仅在type为"transparent"或"float"时有效。 可取值： "dark" - 暗风格模糊，对应iOS原生UIBlurEffectStyleDark效果； "extralight" - 高亮风格模糊，对应iOS原生UIBlurEffectStyleExtraLight效果； "light" - 亮风格模糊，对应iOS原生UIBlurEffectStyleLight效果； "none" - 无模糊效果。 注意：使用模糊效果时应避免设置背景颜色，设置背景颜色可能覆盖模糊效果。|App 2.6.7+|
|loading|string|false|否|是否在导航条显示 loading 加载提示|微信基础库 2.9.0|
|front-color|string||否|导航条前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000|微信基础库 2.9.0|
|background-color|string||否|导航条背景颜色值，有效值为十六进制颜色|微信基础库 2.9.0|
|color-animation-duration|number|0|否|改变导航栏颜色时的动画时长，默认为 0 （即没有动画效果）|微信基础库 2.9.0|
|color-animation-timing-func|string|"linear"|否|改变导航栏颜色时的动画方式，支持 linear 、 easeIn 、 easeOut 和 easeInOut|微信基础库 2.9.0|

属性说明 [/collocation/pages?id=app-titlenview](/collocation/pages?id=app-titlenview)

**注意**
- `navigation-bar` 目前支持的配置仅为上表所列，并不支持 page.json 中关于导航栏的所有配置
- `navigation-bar` 与 pages.json 的设置相冲突时，会覆盖 page.json 的配置


#### 示例代码

```html
<template>
  <page-meta>
    <navigation-bar
      :title="nbTitle"
      :title-icon="titleIcon"
      :title-icon-radius="titleIconRadius"
      :subtitle-text="subtitleText"
      :subtitle-color="nbFrontColor"
      :loading="nbLoading"
      :front-color="nbFrontColor"
      :background-color="nbBackgroundColor"
      :color-animation-duration="2000"
      color-animation-timing-func="easeIn"
    />
  </page-meta>
  <view class="content"></view>
</template>

<script>
  export default {
    data() {
      return {
        nbTitle: '标题',
        titleIcon: '/static/logo.png',
        titleIconRadius: '20px',
        subtitleText: 'subtitleText',
        nbLoading: false,
        nbFrontColor: '#000000',
        nbBackgroundColor: '#ffffff'
      }
    },
    onLoad() {
    },
    methods: {
    }
  }
</script>
```
