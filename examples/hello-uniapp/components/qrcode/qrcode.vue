<template>
	<view class="qrcode">
		<image class="image" v-if="img != ''" :src="img" :style="{ width: size+'px', height: size + 'px' }"/>
	</view>
</template>
<script>
	import QR from "./qrcode.js";
	export default {
		name: 'number-box',
		props: {
			val: {
				type: String,
				default: ''
			},
			size:{
				type:Number,
				default:100
			}
		},
		data(){
			return{
				img:''
			}
		},
		onUnload(){
		},
		methods: {
			creatQrcode(){
				let val = String(this.val)
				if(val == ''){
					return false
				}
				let img = QR.createQrCodeImg(val, {
					size: parseInt(this.size)
				})
				this.img = img;
			},
			clearQrcode(){
				this.img = '';
			}
		},
		watch:{
			size(newVal, oldVal){
				if(newVal != oldVal){
					this.size = newVal;
					this.creatQrcode()
				}
			}
		}
	}
</script>
<style>
	.qrcode{
		display: flex;
		justify-content: center;
	}
</style>
