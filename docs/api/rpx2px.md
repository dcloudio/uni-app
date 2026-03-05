<!-- ## uni.rpx2px(number) @rpx2px -->

::: sourceCode
## uni.rpx2px(number) @rpx2px

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-rpx2px


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-rpx2px

:::

将rpx单位值转换成px

### rpx2px 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.02 | 4.41 | 4.02 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| number | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


### 返回值 

| 类型 |
| :- |
| number |
 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/rpx2px/rpx2px.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/rpx2px/rpx2px.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/rpx2px/rpx2px

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/rpx2px/rpx2px

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view class="page">
      <page-head :title="data.title"></page-head>
      <view>
        <view class="item">
          <text class="item-k">输入:</text>
          <text class="item-v">{{data.rpxValue}}rpx</text>
        </view>
        <view class="item">
          <text class="item-k">返回:</text>
          <text class="item-v">{{data.pxValue}}px</text>
        </view>
      </view>
      <view>
        <button id="convert" @click="rpx2px">转换</button>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">
  type DataType = {
    title: string;
    rpxValue: number;
    pxValue: number;
    result: boolean;
  }

  const data = reactive({
    title: 'rpx2px',
    rpxValue: 750,
    pxValue: 0,
    result: false
  } as DataType)

  const rpx2px = () => {
    data.pxValue = uni.rpx2px(data.rpxValue);

    // 仅限自动化测试
    const windowInfo = uni.getWindowInfo();
    if (windowInfo.windowWidth == data.pxValue) {
      data.result = true
    }
  }

  defineExpose({
    data
  })
</script>

<style>
  .page {
    padding: 15px;
  }

  .item {
    flex-direction: row;
  }

  .item-k {
    width: 72px;
    line-height: 2;
  }

  .item-v {
    font-weight: bold;
    line-height: 2;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.rpx2px)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/font.html#upx2px)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

