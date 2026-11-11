# uni-fab-button 悬浮加号按钮

本组件常用于页面中右下角悬浮的、里面有一个加号的圆形按钮。

## 用途和场景

- 页面右下角悬浮的“新增/创建”入口
- 需要醒目圆形按钮的操作入口

## 使用方式

组件负责：

- 绘制圆形按钮背景、阴影和居中的加号
- 对外抛出 `click` 事件
- 通过 `plus-class` 外部样式类暴露加号的自定义能力

使用者负责：

- 用 `class` 或 `style` 调整圆形按钮本身的样式、尺寸和位置
- 用 `plus-class` 调整加号的颜色、尺寸和圆角
- 监听 `click` 事件处理点击逻辑

组件根 view 默认是一个圆形，蓝色背景（`#007AFF`），并带有阴影。使用组件时注意组件的父容器要留出阴影的空间，避免被裁剪。

非 Web 端使用 2 个带 `flatten` 属性的 view 交叉组成加号，在支持拍平的 App 渲染模式下绘制到父级上。Web 端默认使用根 view 的 `::before` 和 `::after` 伪元素绘制加号，不创建内部 view，其中竖线通过 `transform` 旋转 90 度实现。

传入 `plus-class` 时，Web 端使用 1 个内部 view 绘制横线，并由其 `::after` 伪元素继承背景色、尺寸和圆角绘制竖线，兼容自定义样式写法。加号的默认样式为背景白色、粗细 `2px`、尺寸 `40%`。

## 基本用法

```vue
<uni-fab-button @click="onAdd" />
```

自定义圆形按钮与加号样式：

```vue
<uni-fab-button class="my-fab" plus-class="my-plus" @click="onAdd" />

<style>
.my-fab {
	width: 56px;
	height: 56px;
	background-color: #0f766e;
}

.my-plus {
	width: 60%;
	height: 4px;
	background-color: #ffffff;
}
</style>
```

## 注意事项

- 鸿蒙平台按下 fab-button 不缩放的问题，需升级到 HBuilderX 5.09+ 解决。
- 阴影绘制在根 view 之外，父容器需预留空间，避免阴影被裁剪。
