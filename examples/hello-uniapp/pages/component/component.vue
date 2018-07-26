<template>
	<view class="index">
		<view class="index-hd">
			<image class="index-logo" src="../../static/componentIndex.png"></image>
			<view class="page-section-title">以下将展示uni-app官方组件能力，组件样式仅供参考，开发者可根据自身需求自定义组件样式，具体属性参数详见uni-app开发文档。</view>
		</view>
		<view class="uni-card" v-for="(list,index) in lists" :key="index">
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse">
					<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.open ? 'uni-active' : ''"
					    @click="trigerCollapse(index)">
						{{list.name}}
					</view>
					<view class="uni-list uni-collapse" :class="list.open ? 'uni-active' : ''">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.pages" :key="key" @click="goDetailPage(item)">
							<view class="uni-list-cell-navigate uni-navigate-right"> {{item}} </view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				lists: [{
					id: 'view',
					name: '视图容器',
					open: false,
					pages: ['view', 'scroll-view', 'swiper']
				}, {
					id: 'content',
					name: '基础内容',
					open: false,
					pages: ['text', 'rich-text', 'icon', 'progress']
				}, {
					id: 'form',
					name: '表单组件',
					open: false,
					pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider',
						'switch', 'textarea'
					]
				}, {
					id: 'nav',
					name: '导航',
					open: false,
					pages: ['navigator']
				}, {
					id: 'media',
					name: '媒体组件',
					open: false,
					pages: ['image', 'audio', 'video']
				}, {
					id: 'map',
					name: '地图',
					open: false,
					pages: ['map']
				}, {
					id: 'canvas',
					name: '画布',
					open: false,
					pages: ['canvas']
				}, {
					id: 'web-view',
					name: '网页',
					open: false,
					pages: ['web-view']
				}]
			}
		},
		onShareAppMessage() {
			return {
				title: '欢迎体验uniapp',
				path: '/pages/component/component'
			}
		},
		methods: {
			trigerCollapse(e) {
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					if (e === i) {
						this.lists[i].open = !this.lists[i].open;
					} else {
						this.lists[i].open = false;
					}
				}
			},
			goDetailPage(e) {
				uni.navigateTo({
					url: '/pages/component/' + e + '/' + e
				})
			}
		}
	}
</script>

<style>
	@import "../../common/uni.css";

	.index {
		padding-bottom: 1px;
	}

	.uni-card {
		box-shadow: none;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-list:before {
		height: 0;
	}
</style>
