<template>
    <view>
        <view class="content">
            <view class="title">延迟加载的理念：页面初始化时，暂不加载处于屏幕可见区域之外的图片。该方案会有如下几大好处：</view>
            <view class="ul">
                <view>加快页面渲染速度</view>
                <view>提升页面滚动性能</view>
                <view>默认不下载屏幕外的图片，减少网络流量</view>
            </view>
        </view>
        <view class="uni-list">
            <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index">
                <view class="uni-media-list">
                    <view class="uni-media-list-logo">
                        <image class="image" lazy-load :src="item.src" />
                    </view>
                    <view class="uni-media-list-body">
                        <view class="uni-media-list-text-top">主标题</view>
                        <view class="uni-media-list-text-bottom uni-ellipsis">列表二级标题</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            var imgs = ['shuijiao', 'muwu', 'cbd']
            var list = []

            for (let i = 0; i < 40; i++) {
                list.push({
                    src: `https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/${imgs[i%3]}.jpg`
                })
            }

            return {
                list: list
            }
        }
    }
</script>

<style>
    @import "../../../common/uni.css";

    .content {
        font-size: 30upx;
        line-height: 50upx;
        color: #666666;
        padding: 30upx;
    }

    .content>.title {
        font-size: 32upx;
        text-indent: 2em;
    }

    .content>.ul {
        padding-left: 40upx;
        color: #999999;
    }
</style>
