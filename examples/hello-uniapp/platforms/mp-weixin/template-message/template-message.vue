<template>
	<view>
		<page-head :title="title"></page-head>
		<form class="page-body" @submit="submitForm" report-submit="true">
			<view class="page-section-title">点击提交，发送示例模板消息</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">购买地点</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" :value="formData.address" name="address"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">购买时间</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" :value="formData.time" name="time"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">物品名称</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" :value="formData.name" name="name"></input>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						<view class="uni-label">交易单号</view>
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" type="text" :disabled="true" :value="formData.serial" name="serial"></input>
					</view>
				</view>
			</view>
			<view class="btn-area">
				<button size="40" formType="submit" :loading="loading">点我提交</button>
			</view>
		</form>

	</view>
</template>
<script>
	import {
		mapActions
	} from 'vuex'
	import pageHead from '../../../components/page-head.vue'

	const templateMessageUrl = `https://www.example.com/templateMessage`; //开发者自己的接口地址
	export default {
		data() {
			return {
				title: 'templateMessage',
				formData: {
					address: 'T.I.T 造舰厂',
					time: '2017.01.09',
					name: '帝国歼星舰',
					serial: '123456789'
				},
				loading: false
			}
		},
		methods: {
			...mapActions(['getUserOpenId']),
			submitForm: async function (e) {
				var form_id = e.target.formId
				var formData = e.target.value

				console.log('form_id is:', form_id)

				this.loading = true
				try {
					const openid = await this.getUserOpenId()
					console.log('openid:::::' + openid)
					uni.request({
						url: templateMessageUrl,
						method: 'POST',
						data: {
							form_id,
							openid,
							formData
						},
						success: (res) => {
							console.log('submit form success', res)
							uni.showToast({
								title: '发送成功',
								icon: 'success'
							})
							this.loading = false
						}

					})
				} catch (e) {
					this.loading = false
					console.log('submit form fail, errMsg is:', e)
				}
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	@import "../../../common/uni.css";
	button {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
