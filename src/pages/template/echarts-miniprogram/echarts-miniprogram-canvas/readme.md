# echarts-miniprogram-canvas

基于 Canvas 2D 的 eCharts 小程序版组件，用于在 uni-app x 中渲染 ECharts 图表。

## 平台说明

- Web
- 微信小程序
- App：仅支持蒸汽模式

App 普通模式不支持此组件。

## 基本用法

组件符合 easycom 目录规范，无需手动导入：

```vue
<template>
  <echarts-miniprogram-canvas
    canvas-id="sales-chart"
    height="300px"
    :ec="ec"
    @inited="onChartInited"
  ></echarts-miniprogram-canvas>
</template>

<script setup>
const ec = ref({
  option: {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'bar',
      data: [120, 210, 180, 260, 310]
    }]
  }
})

function onChartInited(chart) {
  console.log('chart inited', chart)
}
</script>
```

更新 `ec.option` 后，组件会调用图表实例的 `setOption` 更新图表。

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
| :-- | :-- | :-- | :-- |
| canvas-id | String | `ec-canvas` | Canvas 标识，同一页面内应保持唯一 |
| ec | Object | - | ECharts 配置对象，通过 `option` 传入图表配置 |
| height | String | `300px` | Canvas 高度 |

`ec` 还支持以下配置：

| 字段 | 类型 | 默认值 | 说明 |
| :-- | :-- | :-- | :-- |
| option | Object | - | ECharts option |
| lazyLoad | Boolean | `false` | 是否延迟初始化；启用后需调用组件暴露的 `init` 方法 |
| stopTouchEvent | Boolean | `false` | 是否阻止触摸事件继续传递给图表 |

## 事件

| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| inited | 图表初始化完成 | ECharts 实例 |
| touchstart | Canvas 触摸开始 | 触摸事件 |
| touchmove | Canvas 触摸移动 | 触摸事件 |
| touchend | Canvas 触摸结束 | 触摸事件 |

完整示例见 `pages/template/echarts-miniprogram/echarts-miniprogram.uvue`。
