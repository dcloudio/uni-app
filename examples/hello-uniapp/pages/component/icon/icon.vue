<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="flex-container">
			<view class="icon-item" v-for="(item,index) in iconClassList" :key="index">
				<view class="uni-icon" :class="[item, activeIndex === index ? 'uni-active' : '']" @click="switchActive(index)"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import pageHead from '../../../components/page-head.vue'

	export default {
		data() {
			return {
				iconClassList: [
					'uni-icon-contact',
					'uni-icon-person',
					'uni-icon-personadd',
					'uni-icon-contact-filled',
					'uni-icon-person-filled',
					'uni-icon-personadd-filled',
					'uni-icon-phone',
					'uni-icon-email',
					'uni-icon-chatbubble',
					'uni-icon-chatboxes',
					'uni-icon-phone-filled',
					'uni-icon-email-filled',
					'uni-icon-chatbubble-filled',
					'uni-icon-chatboxes-filled',
					'uni-icon-weibo',
					'uni-icon-weixin',
					'uni-icon-pengyouquan',
					'uni-icon-chat',
					'uni-icon-qq',
					'uni-icon-videocam',
					'uni-icon-camera',
					'uni-icon-mic',
					'uni-icon-location',
					'uni-icon-mic-filled',
					'uni-icon-location-filled',
					'uni-icon-micoff',
					'uni-icon-image',
					'uni-icon-map',
					'uni-icon-compose',
					'uni-icon-trash',
					'uni-icon-upload',
					'uni-icon-download',
					'uni-icon-close',
					'uni-icon-redo',
					'uni-icon-undo',
					'uni-icon-refresh',
					'uni-icon-star',
					'uni-icon-plus',
					'uni-icon-minus',
					'uni-icon-circle',
					'uni-icon-clear',
					'uni-icon-refresh-filled',
					'uni-icon-star-filled',
					'uni-icon-plus-filled',
					'uni-icon-minus-filled',
					'uni-icon-circle-filled',
					'uni-icon-checkbox-filled',
					'uni-icon-closeempty',
					'uni-icon-refreshempty',
					'uni-icon-reload',
					'uni-icon-starhalf',
					'uni-icon-spinner',
					'uni-icon-spinner-cycle',
					'uni-icon-search',
					'uni-icon-plusempty',
					'uni-icon-forward',
					'uni-icon-back',
					'uni-icon-checkmarkempty',
					'uni-icon-home',
					'uni-icon-navigate',
					'uni-icon-gear',
					'uni-icon-paperplane',
					'uni-icon-info',
					'uni-icon-help',
					'uni-icon-locked',
					'uni-icon-more',
					'uni-icon-flag',
					'uni-icon-home-filled',
					'uni-icon-gear-filled',
					'uni-icon-info-filled',
					'uni-icon-help-filled',
					'uni-icon-more-filled',
					'uni-icon-settings',
					'uni-icon-list',
					'uni-icon-bars',
					'uni-icon-loop',
					'uni-icon-paperclip',
					'uni-icon-eye',
					'uni-icon-arrowup',
					'uni-icon-arrowdown',
					'uni-icon-arrowleft',
					'uni-icon-arrowright',
					'uni-icon-arrowthinup',
					'uni-icon-arrowthindown',
					'uni-icon-arrowthinleft',
					'uni-icon-arrowthinright',
					'uni-icon-pulldown'
				],
				title: 'icon',
				activeIndex: -1
			};
		},
		components: {
			pageHead
		},
		methods: {
			switchActive(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style>
	@import "../../../common/icon.css";
	.flex-container {
		padding: 20px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-flow: row wrap;
		justify-content: space-between;
		text-align: center;
	}

	.flex-container .icon-item {
		display: inline-block;
		width: 100px;
		height: 100px;
		text-align: center;
		border: 2px solid #dddddd;
		border-radius: 50px;
		margin: 6px;
	}

	.uni-icon {
		margin-top: 24px;
		color: #8f8f94;
	}
</style>
