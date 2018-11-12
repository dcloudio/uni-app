<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title">可自动聚焦的input</view>
				<input class="uni-input" focus placeholder="自动获得焦点" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">键盘右下角按钮显示为搜索</view>
				<input class="uni-input" confirm-type="search" placeholder="键盘右下角按钮显示为搜索" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">控制最大输入长度的input</view>
				<input class="uni-input" maxlength="10" placeholder="最大输入长度为10" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">实时获取输入值：{{inputValue}}</view>
				<input class="uni-input" @input="bindKeyInput" placeholder="输入同步到view中" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">控制输入的input</view>
				<input class="uni-input" @input="bindReplaceInput" v-model="changeValue" placeholder="连续的两个1会变成2" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">控制键盘的input</view>
				<input class="uni-input" ref="input1" @input="bindHideKeyboard" placeholder="输入123自动收起键盘" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">数字输入的input</view>
				<input class="uni-input" type="number" placeholder="这是一个数字输入框" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码输入的input</view>
				<input class="uni-input" password type="text" placeholder="这是一个密码输入框" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">带小数点的input</view>
				<input class="uni-input" type="digit" placeholder="带小数点的数字键盘" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">身份证输入的input</view>
				<input class="uni-input" type="idcard" placeholder="身份证输入键盘" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">控制占位符颜色的input</view>
				<input class="uni-input" placeholder-style="color:#F76260" placeholder="占位符字体是红色的" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">带清除按钮的输入框</view>
				<view class="with-fun">
					<input class="uni-input" placeholder="带清除按钮的输入框" :value="inputClearValue" @input="bindClearInput" />
					<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">可查看密码的输入框</view>
				<view class="with-fun">
					<input class="uni-input" placeholder="请输入密码" :password="showPassword" />
					<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'input',
				focus: false,
				inputValue: '',
				showClearIcon: false,
				inputClearValue: "",
				changeValue:"",
				showPassword: true,
				src: "../../../static/eye-1.png"
			}
		},
		methods: {
			bindKeyInput: function (e) {
				this.inputValue = e.target.value
			},
			bindReplaceInput: function (e) {
				var value = e.target.value;
				if(value === '11'){
					this.changeValue = "2";
				}
			},
			bindHideKeyboard: function (e) {
				if (e.target.value === '123') {
					// 收起键盘
					uni.hideKeyboard();
				}
			},
			bindClearInput: function (e) {
				this.inputClearValue = e.target.value;
				if (e.target.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function () {
				this.inputClearValue = "";
				this.showClearIcon = false;
			},
			changePassword: function () {
				this.showPassword = !this.showPassword;
			}
		}
	}
</script>

<style>
	@import "../../../common/icon.css";
	.title{padding:10upx 25upx;}
</style>
