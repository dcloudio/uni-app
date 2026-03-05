<!-- ## label -->

::: sourceCode
## label
:::

用来改进表单组件的可用性，使用for属性找到对应的id，或者将控件放在该标签下，当点击时，就会触发对应的控件


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.71 | 5.0 |


App平台可以用view加事件来替代label。

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| disabled | boolean | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 是否禁用 |
| for | string | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 绑定控件的 id |



<!-- UTSCOMJSON.label.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/label/label.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/label/label.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/label/label

>示例
```vue
<template>
  <view>
    <page-head :title="data.title"></page-head>
    <view class="uni-common-mt">
      <view class="uni-form-item uni-column">
        <view class="title">表单组件在label内</view>
        <checkbox-group class="uni-list" @change="checkboxChange">
          <label class="uni-list-cell uni-list-cell-pd checkboxItemsTest label" v-for="item in data.checkboxItems"
            :key="item.name">
            <view>
              <checkbox :value="item.name" :checked="item.checked"></checkbox>
            </view>
            <view>{{item.value}}</view>
          </label>
        </checkbox-group>
      </view>

      <!-- #ifndef VUE3-VAPOR -->
      <view class="uni-form-item uni-column">
        <view class="title">label用for标识表单组件</view>
        <radio-group class="uni-list radio-group" @change="radioChange">
          <view class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in data.radioItems" :key="index">
            <view>
              <radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
            </view>
            <label class="label-2-text" :for="item.name">
              <text>{{item.value}}</text>
            </label>
          </view>
        </radio-group>
      </view>
      <!-- #endif -->

      <view class="uni-form-item uni-column">
        <view class="title">label内有多个时选中第一个</view>
        <checkbox-group class="uni-list" @change="checkboxForChange">
          <label class="label-3 label">
            <view class="uni-list-cell uni-list-cell-pd">
              <checkbox value="for1">选项一</checkbox>
            </view>
            <view class="uni-list-cell uni-list-cell-pd">
              <checkbox value="for2">选项二</checkbox>
            </view>
            <view class="uni-center" style="margin:10px 0;">
              <text class="uni-link">点击该label下的文字默认选中第一个checkbox</text>
            </view>
          </label>
        </checkbox-group>
      </view>
    </view>

    <navigator class="uni-common-mb" url="/pages/template/label-100/label-100">
      <button>组件性能测试</button>
    </navigator>
  </view>
</template>
<script setup lang="uts">
  type controlItem = {
    name : string,
    value : string,
    checked ?: boolean
  }

  type DataType = {
    title: string;
    checkboxItems: controlItem[];
    radioItems: controlItem[];
    hidden: boolean;
    checkboxValue: string[];
    checkboxForValue: string[];
    radioValue: string;
  }

  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    title: 'label',
    checkboxItems: [{
      name: 'USA',
      value: '美国'
    },
    {
      name: 'CHN',
      value: '中国',
      checked: true
    }
    ],
    radioItems: [{
      name: 'USA',
      value: '美国'
    },
    {
      name: 'CHN',
      value: '中国',
      checked: true
    }
    ],
    hidden: false,
    checkboxValue: [] as string[],
    checkboxForValue: [] as string[],
    radioValue: ''
  } as DataType)

  const checkboxChange = (e : UniCheckboxGroupChangeEvent) => {
    console.log(e.detail.value)
    data.checkboxValue = e.detail.value
  }
  const checkboxForChange = (e : UniCheckboxGroupChangeEvent) => {
    console.log(e.detail.value)
    data.checkboxForValue = e.detail.value
  }
  const radioChange = (e : UniRadioGroupChangeEvent) => {
    console.log(e.detail.value)
    data.radioValue = e.detail.value
  }

  defineExpose({
    data
  })
</script>

<style>
  .uni-list-cell {
    justify-content: flex-start
  }

  .label-3 {
    padding: 0;
  }

  .label-2-text {
    flex: 1;
  }

  .uni-form-item {
    display: flex;
    width: 100%;
    padding: 5px 0;
  }

  .title {
    padding: 5px 12px;
  }

  .radio-group {
    padding: 0 10px;
  }

  .label {
    margin: 0 10px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.form-component.label)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/label.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/label.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=label&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=label&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=label&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=label&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=label)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=label&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
