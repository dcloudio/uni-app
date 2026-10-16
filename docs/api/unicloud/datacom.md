# datacom

## datacomProps @datacomprops

<!-- UTSUNICLOUDAPIJSON.datacomProps.description -->

<!-- UTSUNICLOUDAPIJSON.datacomProps.compatibility -->

<!-- UTSUNICLOUDAPIJSON.datacomProps.param -->

<!-- UTSUNICLOUDAPIJSON.datacomProps.returnValue -->

<!-- UTSUNICLOUDAPIJSON.datacomProps.tutorial -->

## useDatacom(props) @usedatacom

<!-- UTSUNICLOUDAPIJSON.useDatacom.description -->

<!-- UTSUNICLOUDAPIJSON.useDatacom.compatibility -->

<!-- UTSUNICLOUDAPIJSON.useDatacom.param -->

<!-- UTSUNICLOUDAPIJSON.useDatacom.returnValue -->

<!-- UTSUNICLOUDAPIJSON.useDatacom.tutorial -->

## mixinDatacom @mixindatacom

<!-- UTSUNICLOUDAPIJSON.mixinDatacom.description -->

<!-- UTSUNICLOUDAPIJSON.mixinDatacom.compatibility -->

<!-- UTSUNICLOUDAPIJSON.mixinDatacom.param -->

<!-- UTSUNICLOUDAPIJSON.mixinDatacom.returnValue -->

<!-- UTSUNICLOUDAPIJSON.mixinDatacom.tutorial -->


## 组合式组件示例

以下组件展开 datacom 属性，并将查询结果、加载状态和错误信息用于模板展示。示例将 `manual` 的默认值设为 `true`，在组件挂载后显式加载数据。

```html
<!-- datacom.uvue -->
<template>
  <view>
    <view v-if="loading">加载中...</view>
    <view v-else-if="errorMessage">请求错误：{{ errorMessage }}</view>
    <view v-else>
      <!-- 按业务需要展示查询结果 -->
      <text>{{ resData }}</text>
    </view>
    <button :disabled="loading" @click="refresh">刷新</button>
  </view>
</template>

<script setup lang="ts">
  const props = defineProps({
    ...uniCloud.datacomProps,
    manual: {
      type: Boolean,
      default: true
    }
  })

  const datacom = uniCloud.useDatacom(props)
  const { loading, resData, errorMessage } = datacom

  function loadData() {
    datacom.easyGet()
  }

  function refresh() {
    datacom.refresh()
  }

  onMounted(() => {
    loadData()
  })

  defineExpose({
    loadData,
    refresh,
    clear: datacom.reset
  })
</script>
```

在页面中使用该组件。示例表 `unicloud-db-test` 需已创建，并配置好对应的读取权限。

```html
<template>
  <datacom collection="unicloud-db-test" :getcount="true" />
</template>

<script setup lang="ts">
  import datacom from './datacom.uvue'
</script>
```
