<template>
	<view class="index">
		<view class="tags">
			<bclok v-for="(value, index) in data" :key="index">
				<view class="tag" @tap="goList(value)">
					<image class="tag-img" :src="value.icon"></image>
					<text class="tag-text">{{value.type}}</text>
				</view>
			</bclok>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [
					{
						type: '动物',
						id: 1,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '风景',
						id: 2,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '建筑',
						id: 3,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '美女',
						id: 4,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '汽车',
						id: 5,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '运动',
						id: 6,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '动物',
						id: 1,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '风景',
						id: 2,
						icon: 'http://placehold.it/150x150'
					}
				]
			}
		},
		methods: {
			goList(value) {
				uni.navigateTo({
					url:'../list/list?type=' + value.type + '&id=' + value.id
				})
			}
		}
	}
</script>

<style>
	
</style>
