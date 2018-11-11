<template>
	<view>
	<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<!-- 评论区 start -->
			<view class="uni-comment">
				<view class="uni-comment-list">
					<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>刘美丽</text>
							<text class="uni-iconfont icon-zan"></text>
						</view>
						<view class="uni-comment-date">
							<text>08/10 08:12</text>
							<text>102</text>
						</view>
						<view class="uni-comment-content">上天呀！我渴望与你相知相惜，长存此心永不褪减。</view>
					</view>
				</view>
				<view class="uni-comment-list">
					<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>马克一天</text>
							<text class="uni-iconfont icon-zan uni-comment-zan"> 100</text>
						</view>
						<view class="uni-comment-content">除非巍巍群山消逝不见，除非滔滔江水干涸枯竭。除非凛凛寒冬雷声翻滚，除非炎炎酷暑白雪纷飞，除非天地相交聚合连接，直到这样的事情全都发生时，我才敢将对你的情意抛弃决绝！</view>
					</view>
				</view>
				<view class="uni-comment-list">
					<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>今生缘</text>
							<text class="uni-iconfont icon-zan"> 66</text>
						</view>
						<view class="uni-comment-content">人面不知何处去，桃花依旧笑春风。</view>
						<view class="uni-comment-date">
							<text>08/10 07:55</text>
						</view>
					</view>
				</view>
				<view class="uni-comment-list">
					<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>小猫咪</text>
							<text class="uni-iconfont icon-zan"> 120</text>
						</view>
						<view class="uni-comment-content">海上生明月，天涯共此时。。</view>
						<view class="uni-comment-date">
							<text>2天前<text class="uni-comment-replay-btn">5回复</text></text>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论区 end -->
		</view>
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
.uni-comment{padding:5rpx 0; display: flex; flex-grow:1; flex-direction: column;}
.uni-comment-list{flex-wrap:nowrap; padding:10rpx 0; margin:10rpx 0; width:100%; display: flex;}
.uni-comment-face{width:70upx; height:70upx; border-radius:100%; margin-right:20upx; flex-shrink:0; overflow:hidden;}
.uni-comment-face image{width:100%; border-radius:100%;}
.uni-comment-body{width:100%;}
.uni-comment-top{line-height:1.5em; justify-content:space-between;}
.uni-comment-top text{color:#0A98D5; font-size:24upx;}
.uni-comment-top text:last-child{color:#666666;}
.uni-comment-date{line-height:1.5em; justify-content:space-between;}
.uni-comment-date text{color:#666666; font-size:24upx;}
.uni-comment-content{line-height:1.6em; font-size:28upx; padding:8rpx 0;}
.uni-comment-zan{color:#0A98D5 !important;}
.uni-comment-replay-btn{background:#F4F5F6; font-size:24upx; padding:8rpx 15upx; border-radius:30upx; color:#333 !important; margin:0 10upx;}
</style>
