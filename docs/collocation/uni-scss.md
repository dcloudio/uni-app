
``uni-app`` 内置了常用的样式变量，采用 scss 预处理方式，文件名为  ``uni.scss``，在代码中无需 import 这个文件即可使用这些样式变量。

 ``uni-app`` 官方扩展插件及 [插件市场](https://ext.dcloud.net.cn) 上很多三方插件均使用了这些样式变量，如果你是插件开发者，建议你使用 scss 预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App。
 
开发阶段，每个 ``uni-app`` 项目在目录都会有一个 ``uni.scss`` 的文件，可以通过修改 scss 文件的变量来定制自己的插件主题，实现自定义主题功能。

**注意：** 

1. 如要使用这些常用变量，需要在 HBuilderX 里面安装 scss 插件；
2. 使用时需要在 style 节点上加上 ``lang="scss"``。
3. pages.json不支持scss，原生导航栏和tabbar的动态修改只能使用js api

**以下是 uni.scss 的相关变量：**

```
/* 颜色变量 */

/* 行为相关颜色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;

/* 文字基本颜色 */
$uni-text-color:#333;//基本色
$uni-text-color-inverse:#fff;//反色
$uni-text-color-grey:#999;//辅助灰色，如加载更多的提示信息
$uni-text-color-placeholder: #808080;
$uni-text-color-disable:#c0c0c0;

/* 背景颜色 */
$uni-bg-color:#ffffff;
$uni-bg-color-grey:#f8f8f8;
$uni-bg-color-hover:#f1f1f1;//点击状态颜色
$uni-bg-color-mask:rgba(0, 0, 0, 0.4);//遮罩颜色

/* 边框颜色 */
$uni-border-color:#c8c7cc;

/* 尺寸变量 */

/* 文字尺寸 */
$uni-font-size-sm:24rpx;
$uni-font-size-base:28rpx;
$uni-font-size-lg:32rpx;

/* 图片尺寸 */
$uni-img-size-sm:40rpx;
$uni-img-size-base:52rpx;
$uni-img-size-lg:80rpx;

/* Border Radius */
$uni-border-radius-sm: 4rpx;
$uni-border-radius-base: 6rpx;
$uni-border-radius-lg: 12rpx;
$uni-border-radius-circle: 50%;

/* 水平间距 */
$uni-spacing-row-sm: 10px;
$uni-spacing-row-base: 20rpx;
$uni-spacing-row-lg: 30rpx;

/* 垂直间距 */
$uni-spacing-col-sm: 8rpx;
$uni-spacing-col-base: 16rpx;
$uni-spacing-col-lg: 24rpx;

/* 透明度 */
$uni-opacity-disabled: 0.3; // 组件禁用态的透明度

/* 文章场景相关 */
$uni-color-title: #2C405A; // 文章标题颜色
$uni-font-size-title:40rpx;
$uni-color-subtitle: #555555; // 二级标题颜色
$uni-font-size-subtitle:36rpx;
$uni-color-paragraph: #3F536E; // 文章段落颜色
$uni-font-size-paragraph:30rpx;
```