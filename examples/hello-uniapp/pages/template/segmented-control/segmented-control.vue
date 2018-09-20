<template>
	<view class="page">
		<view class="head">
			<segmented-control :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></segmented-control>
		</view>
		<view class="content">
			<view v-show="current === 0">
				选项卡1的内容
			</view>
			<view v-show="current === 1">
				选项卡2的内容
			</view>
			<view v-show="current === 2">
				选项卡3的内容
			</view>
		</view>
		<view class="page-section">
			<view class="page-section-title">Style</view>
			<view class="uni-list">
				<radio-group @change="styleChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in styles" :key="item.value">
						{{item.text}}
						<radio :value="item.value" :checked="item.checked" />
					</label>
				</radio-group>
			</view>
		</view>
		<view class="page-section">
			<view class="page-section-title">Color</view>
			<view class="uni-list">
				<radio-group @change="colorChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in colors" :key="index">
						<view class="color-tag" :style="{backgroundColor: item}"></view>
						<radio :value="item" :checked="index === 0" />
					</label>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	import segmentedControl from '../../../components/segmented-control.vue';

	export default {
		data() {
			return {
				items: [
					'选项卡1',
					'选项卡2',
					'选项卡3'
				],
				styles: [{
					value: 'button',
					text: '按钮',
					checked: true
				}, {
					value: 'text',
					text: '文字'
				}],
				colors: [
					'#007aff',
					'#4cd964',
					'#dd524d'
				],
				current: 0,
				activeColor: '#007aff',
				styleType: 'button'
			}
		},
		components: {
			segmentedControl
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			},
			styleChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.styleType = evt.target.value;
				}
			},
			colorChange(evt) {
				if (this.styleType !== evt.target.value) {
					this.activeColor = evt.target.value;
				}
			}
		}
	}
</script>

<style>
	.head {
		padding: 0 20upx;
		margin-top: 20upx;
		height: 100upx;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300upx;
		text-align: center;
	}

	.color-tag {
		width: 50upx;
		height: 50upx;
	}
</style>
