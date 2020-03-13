#### picker-view

嵌入页面的滚动选择器

**属性说明**

|属性名|类型|默认值|平台差异说明|
|:-|:-|:-|:-|
|value|Array＜Number＞|数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。||
|indicator-style|String|设置选择器中间选中框的样式||
|indicator-class|String|设置选择器中间选中框的类名|app-nvue和头条小程序不支持|
|mask-style|String|设置蒙层的样式||
|mask-class|String|设置蒙层的类名|app-nvue和头条小程序不支持|
|@change|EventHandle|当滚动选择，value 改变时触发 change 事件，event.detail = {value: value}；value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）|&nbsp;|
|@pickstart|eventhandle||当滚动选择开始时候触发事件|微信小程序2.3.1|
|@pickend|eventhandle||当滚动选择结束时候触发事件|微信小程序2.3.1|

**注意：**其中只可放置 `<picker-view-column/>` 组件，其他节点不会显示。

#### picker-view-column

`<picker-view />` 的子组件，仅可放置于 `<picker-view />` 中，其子节点的高度会自动设置成与 picker-view 的选中框的高度一致

**示例** [查看演示](https://uniapp.dcloud.io/h5/pages/component/picker-view/picker-view)

```html
<template>
    <view>
        <view class="uni-padding-wrap">
			<view class="uni-title">日期：{{year}}年{{month}}月{{day}}日</view>
		</view>
        <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
            <picker-view-column>
                <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
            </picker-view-column>
        </picker-view>
    </view>
</template>
```

```javascript
export default {
    data: function () {
        const date = new Date()
        const years = []
        const year = date.getFullYear()
        const months = []
        const month = date.getMonth() + 1
        const days = []
        const day = date.getDate()
        for (let i = 1990; i <= date.getFullYear(); i++) {
            years.push(i)
        }
        for (let i = 1; i <= 12; i++) {
            months.push(i)
        }
        for (let i = 1; i <= 31; i++) {
            days.push(i)
        }
        return {
            title: 'picker-view',
            years,
            year,
            months,
            month,
            days,
            day,
            value: [9999, month - 1, day - 1],
            visible: true,
            indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
        }
    },
    methods: {
        bindChange: function (e) {
            const val = e.detail.value
            this.year = this.years[val[0]]
            this.month = this.months[val[1]]
            this.day = this.days[val[2]]
        }
    }
}
```

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/picker-view.png)

**Tips**
- 微信小程序端，滚动时在iOS自带振动反馈，可在系统设置 -> 声音与触感 -> 系统触感反馈中关闭
- 如果需要在PC端使用`picker-view`，可以配置[H5模版](https://uniapp.dcloud.io/collocation/manifest?id=h5-template)，并引入[touch-emulator.js](https://github.com/dcloudio/touchemulator)
