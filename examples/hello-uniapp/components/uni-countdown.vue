<template name="uni-countdown">
	<view class="uni-countdown">
		<view class="uni-countdown-numbers" :style="{borderColor:borderColor, color:fontColor, background:bgrColor}">{{h}}</view>
		<view class="uni-countdown-splitor" :style="{color:splitorColor}">:</view>
		<view class="uni-countdown-numbers" :style="{borderColor:borderColor, color:fontColor, background:bgrColor}">{{i}}</view>
		<view class="uni-countdown-splitor" :style="{color:splitorColor}">:</view>
		<view class="uni-countdown-numbers" :style="{borderColor:borderColor, color:fontColor, background:bgrColor}">{{s}}</view>
	</view>
</template>
<script>
export default {
	name: "uni-countdown",
	props: {
		bgrColor: {
			type: String,
			default: "#FFFFFF"
		},
		borderColor:{
			type:String,
			default : "#000000"
		},
		fontColor: {
			type: String,
			value: "#000000"
		},
		splitorColor: {
			type: String,
			default: "#000000"
		},
		timer:{
			type:String,
			default:""
		}
	},
	data() {
		return {
            setTime:null,
			h: '00',
			i: '00',
			s: '00',
			leftTime: 0
		}
	},
	created:function(e){
		var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
		var res = this.timer.match(reg);
		if (res == null){
			console.log('时间格式错误'); return false;
		}else{
			var year = parseInt(res[1]);
			if (year < 1000) { console.log('时间格式错误'); return false; }
			var month = parseInt(res[2]);
			var day = parseInt(res[3]);
			var h = parseInt(res[4]);
			if (h < 0 || h > 24) { console.log('时间格式错误'); return false; }
			var i = parseInt(res[5]);
			if (i < 0 || i > 60) { console.log('时间格式错误'); return false; }
			var s = parseInt(res[6]);
			if (s < 0 || s > 60) { console.log('时间格式错误'); return false; }
			var leftTime = new Date(year, month - 1, day, h, i, s);
			this.leftTime = leftTime;
			this.countDown(this);
			this.setInterValFunc(this);
		}
	},
    beforeDestroy(){
        clearInterval(this.setTime)
    },
	methods: {
		setInterValFunc:function(obj){
			this.setTime = setInterval(function(){ obj.countDown(obj);}, 1000);
		},
		countDown: function (self){
			var leftTime = self.leftTime - new Date();
			if (leftTime > 0) {
				var hours = parseInt(leftTime / 1000 / 60 / 60 , 10);
				var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
				var seconds = parseInt(leftTime / 1000 % 60, 10);
			}else{
				var hours = 0, minutes = 0, seconds = 0;
			}
			if (hours < 10) { hours = '0' + hours;}
			if (minutes < 10) { minutes = '0' + minutes; }
			if (seconds < 10) { seconds = '0' + seconds; }
			self.h = hours; self.i = minutes; self.s = seconds;
		}
	}
}
</script>
<style>
.uni-countdown{padding:2rpx 0; flex-wrap:nowrap;}
.uni-countdown-splitor{width:auto !important; justify-content:center; line-height:44upx; padding:0 5upx;}
.uni-countdown-numbers{line-height:44upx; width:auto !important; padding:0 10upx; justify-content:center; height:44upx; border-radius:8upx; margin:0 5upx; border:1px solid #000000; font-size:22upx;}
</style>