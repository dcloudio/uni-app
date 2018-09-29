<template>
	<view class="grace-padding">
		<!-- 评论区 start -->
		<view class="grace-comment">
			<view class="grace-comment-list">
				<view class="grace-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>刘美丽</text>
						<text class="grace-iconfont icon-zan"></text>
					</view>
					<view class="grace-comment-date">
						<text>08/10 08:12</text>
						<text>102</text>
					</view>
					<view class="grace-comment-content">上天呀！我渴望与你相知相惜，长存此心永不褪减。</view>
				</view>
			</view>
			<view class="grace-comment-list">
				<view class="grace-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>马克一天</text>
						<text class="grace-iconfont icon-zan grace-comment-zan"> 100</text>
					</view>
					<view class="grace-comment-content">除非巍巍群山消逝不见，除非滔滔江水干涸枯竭。除非凛凛寒冬雷声翻滚，除非炎炎酷暑白雪纷飞，除非天地相交聚合连接，直到这样的事情全都发生时，我才敢将对你的情意抛弃决绝！</view>
				</view>
			</view>
			<view class="grace-comment-list">
				<view class="grace-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>今生缘</text>
						<text class="grace-iconfont icon-zan"> 66</text>
					</view>
					<view class="grace-comment-content">人面不知何处去，桃花依旧笑春风。</view>
					<view class="grace-comment-date">
						<text>08/10 07:55</text>
					</view>
				</view>
			</view>
			<view class="grace-comment-list">
				<view class="grace-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>小猫咪</text>
						<text class="grace-iconfont icon-zan"> 120</text>
					</view>
					<view class="grace-comment-content">海上生明月，天涯共此时。。</view>
					<view class="grace-comment-date">
						<text>2天前<text class="grace-comment-replay-btn">5回复</text></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论区 end -->
	</view>
</template>

<script>
export default {
	data:{
		title:"评论界面"
	}
}
</script>

<style>
view{display:flex; flex-wrap:wrap; font-size:28upx; width:100%; height:auto; align-items:flex-start;}
.grace-padding{padding:2%; width:96%;}
.grace-comment{padding:5rpx 0;}
.grace-comment-list{flex-wrap:nowrap; padding:10rpx 0; margin:10rpx 0;}
.grace-comment-face{width:70upx; height:70upx; border-radius:100%; margin-right:20upx; flex-shrink:0; overflow:hidden;}
.grace-comment-face image{width:100%; border-radius:100%;}
.grace-comment-body{width:100%;}
.grace-comment-top{line-height:1.5em; justify-content:space-between;}
.grace-comment-top text{color:#0A98D5; font-size:24upx;}
.grace-comment-top text:last-child{color:#666666;}
.grace-comment-date{line-height:1.5em; justify-content:space-between;}
.grace-comment-date text{color:#666666; font-size:24upx;}
.grace-comment-content{line-height:1.6em; font-size:28upx; padding:8rpx 0;}
.grace-comment-zan{color:#0A98D5 !important;}
.grace-comment-replay-btn{background:#F4F5F6; font-size:24upx; padding:8rpx 15upx; border-radius:30upx; color:#333 !important; margin:0 10upx;}
</style>
