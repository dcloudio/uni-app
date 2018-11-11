<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-textarea">
				<textarea :value="value" placeholder="语音识别内容展示区域" disabled />
			</view>
			<view class="uni-common-mt uni-btn-v">
				<button type="primary" @tap="startRecognize">开始语音识别</button>
				<button type="primary" @tap="startRecognizeEnglish">开始语音识别（英语）</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'speech',
				value: ''
			}
		},
		onUnload(){
			this.value = ""
		},
		methods: {
			startRecognize: function () {
				var options = {};
				var that = this;
				options.engine = 'baidu';
				that.value = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.value += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			},
			startRecognizeEnglish: function () {
				var options = {};
				var that = this;
				options.engine = 'baidu';
				options.lang = 'en-us';
				that.value = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.value += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			}
		}
	}
</script>

<style>
	
</style>