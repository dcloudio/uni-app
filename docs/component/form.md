#### form
表单，将组件内的用户输入的``<switch>`` ``<input>`` ``<checkbox>`` ``<slider>`` ``<radio>`` ``<picker>`` 提交。

当点击 ``<form>`` 表单中 formType 为 submit 的 ``<button>`` 组件时，会将表单组件中的 value 值进行提交，需要在表单组件中加上 name 来作为 key。

**属性说明**

|属性名|类型|说明|平台差异说明|
|:-|:-|:-|:-|
|report-submit|Boolean|是否返回 formId 用于发送[模板消息](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html)|微信小程序、支付宝小程序|
|@submit|EventHandle|携带 form 中的数据触发 submit 事件，event.detail = {value : {'name': 'value'} , formId: ''}，report-submit 为 true 时才会返回 formId||
|@reset|EventHandle|表单重置时会触发 reset 事件|&nbsp;|

**示例**
 
```html
<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">switch</view>
					<view>
						<switch name="switch" />
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">radio</view>
					<radio-group name="radio">
						<label>
							<radio value="radio1" />选项一
						</label>
						<label>
							<radio value="radio2" />选项二
						</label>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">checkbox</view>
					<checkbox-group name="checkbox">
						<label>
							<checkbox value="checkbox1" />选项一
						</label>
						<label>
							<checkbox value="checkbox2" />选项二
						</label>
					</checkbox-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">slider</view>
					<slider value="50" name="slider" show-value></slider>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">input</view>
					<input class="uni-input" name="input" placeholder="这是一个输入框" />
				</view>
				<view class="uni-btn-v">
					<button formType="submit">Submit</button>
					<button type="default" formType="reset">Reset</button>
				</view>
			</form>
		</view>
	</view>
</template>
```
 
```javascript
export default {
    data() {
        return {
            pickerHidden: true,
            chosen: ''
        }
    },
    methods: {
        pickerConfirm: function(e) {
            this.pickerHidden = true
            this.chosen = e.target.value
        },
        pickerCancel: function(e) {
            this.pickerHidden = true
        },
        pickerShow: function(e) {
            this.pickerHidden = false
        },
        formSubmit: function(e) {
            console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
        },
        formReset: function(e) {
            console.log('清空数据')
            this.chosen = ''
        }
    }
}
```

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/form.png?t=201857)

**tips**
- [插件市场](http://ext.dcloud.net.cn/search?q=%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C)有表单校验插件