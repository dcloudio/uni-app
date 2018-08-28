<template>
	<view class="page">
		<view class="banner">
			<image class="banner-img" :src="banner.cover"></image>
			<view class="banner-title">{{banner.title}}</view>
		</view>
		<view class="article-meta">
			<text class="article-author">{{banner.author_name}}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{banner.published_at}}</text>
		</view>
		<view class="article-content">
			<rich-text :nodes="htmlString"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'list-triplex-row',
				banner: {},
				htmlString: ""
			}
		},
		onShareAppMessage() {
			return {
				title: this.banner.title,
				path: '/pages/template/list2detail-detail/list2detail-detail?detailDate=' + JSON.stringify(this.banner)
			}
		},
		onLoad(e) {
			this.banner = JSON.parse(e.detailDate);
			this.getDetail();
			uni.setNavigationBarTitle({
				title: this.banner.title
			})
		},
		methods: {
			getDetail() {
				uni.request({
					url: 'https://spider.dcloud.net.cn/api/news/36kr/' + this.banner.post_id,
					success: (data) => {
						if (data.statusCode == 200) {
							this.htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			}
		}
	}
</script>

<style>
	@import "../../../common/uni.css";
	page {
		background: #efeff4;
	}

	.banner {
		height: 360px;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84px;
		overflow: hidden;
		position: absolute;
		left: 30px;
		bottom: 30px;
		width: 90%;
		font-size: 32px;
		font-weight: 400;
		line-height: 42px;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20px 40px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26px;
		line-height: 50px;
		margin: 0 20px;
	}

	.article-author,
	.article-time {
		font-size: 30px;
	}

	.article-content {
		padding: 0 30px;
		overflow: hidden;
		font-size: 30px;
	}
</style>
