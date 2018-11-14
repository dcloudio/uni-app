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
						</view>
						<view class="uni-comment-content">上天呀！我渴望与你相知相惜，长存此心永不褪减。</view>
					</view>
				</view>
				<view class="uni-comment-list">
					<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>马克一天</text>
						</view>
						<view class="uni-comment-content">除非巍巍群山消逝不见，除非滔滔江水干涸枯竭。除非凛凛寒冬雷声翻滚，除非炎炎酷暑白雪纷飞，除非天地相交聚合连接，直到这样的事情全都发生时，我才敢将对你的情意抛弃决绝！</view>
					</view>
				</view>
				<view class="uni-comment-list">
					<view class="uni-comment-face"><image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>今生缘</text>
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
						</view>
						<view class="uni-comment-content">海上生明月，天涯共此时。。</view>
						<view class="uni-comment-date">
							<view>2天前</view><view class="uni-comment-replay-btn">5回复</view>
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
	data() {
		return {
			title:"评论界面"
		}
	}
}
</script>

<style>

</style>
