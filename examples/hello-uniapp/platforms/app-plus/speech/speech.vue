<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-section-spacing">
					<button type="primary" @tap="startRecognize">开始语音识别</button>
					<button type="primary" @tap="startRecognizeEnglish">开始语音识别（英语）</button>
				</view>
			</view>
			<view class="page-section">
				<view class="page-section-spacing">
					<textarea :value="value" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'

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
				options.engine = 'iFly';
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
				options.engine = 'iFly';
				options.lang = 'en-us';
				that.value = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.value += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	textarea {
		border: 2px solid #7A7E83;
		height: 76px;
		width: 100%;
	}
</style>
