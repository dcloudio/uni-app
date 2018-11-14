<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view class="uni-helllo-text uni-common-mt uni-center">
				请点击下面的按钮进行体验
			</view>
			<!-- 居中 -->
			<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup">
				<view class="uni-center" style="font-size:0;">
					<image class="image" style="width:150upx;" mode="widthFix" src="../../../static/uni@2x.png" />
				</view>
				<view class="uni-common-mt uni-helllo-text uni-center">
					消息内容使用 slot 形式定义
				</view>
			</uni-popup>
			<!-- 顶部 -->
			<uni-popup :show="showPopupTop" :type="popType" :msg="msg" v-on:hidePopup="hidePopup"></uni-popup>
			<!-- 底部 -->
			<uni-popup :show="showPopupBottom" :type="popType" :msg="msg" v-on:hidePopup="hidePopup"></uni-popup>
			<view class="uni-btn-v uni-common-mt">
				<button type="button" @click="showMiddlePopup">居中弹出 popup</button>
				<button type="button" @click="showTopPopup" data-position="top">顶部弹出 popup</button>
				<button type="button" @click="showBottomPopup" data-position="bottom">底部弹出 popup</button>
			</view>
		</view>
	</view>
</template>
<script>
	import uniPopup from "../../../components/uni-popup.vue";
	export default {
		data() {
			return {
				popType : 'middle',
				title : "popup",
				showPopupMiddle : false,
				showPopupTop : false,
				showPopupBottom : false,
				msg : ""
			}
		},
		methods: {
			//统一的关闭popup方法
			hidePopup : function(){
				this.showPopupMiddle = false;
				this.showPopupTop    = false;
				this.showPopupBottom = false;
			},
			//展示居中 popup
			showMiddlePopup : function(){
				this.hidePopup();
				this.popType   = "middle";
				this.showPopupMiddle = true;
			},
			//展示顶部 popup
			showTopPopup: function(){
				this.hidePopup();
				this.popType = 'top';
				this.msg = "顶部 popup 信息内容";
				this.showPopupTop = true;
			},
			//展示底部 popup
			showBottomPopup: function(){
				this.hidePopup();
				this.popType = 'top';
				this.msg = "底部 popup 信息内容";
				this.showPopupBottom = true;
			}
		},
		components:{
			uniPopup
		}
	}
</script>
<style>
	
</style>