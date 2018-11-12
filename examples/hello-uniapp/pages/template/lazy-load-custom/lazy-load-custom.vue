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
                        <image class="image" :class="{lazy:!item.show}" :data-index="index" @load="onLoad" :src="item.show?item.src:''" />
                        <image class="image defaul" :class="{loaded:item.loaded}" :src="defaultSrc" />
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

            for (let i = 0; i < 20; i++) {
                list.push({
                    src: `https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/${imgs[i%3]}.jpg`,
                    show: false,
                    loaded: false
                })
            }

            return {
                windowHeight: 0,
                defaultSrc: '../../../static/60x60.png',
                list: list,
                show: false
            }
        },
        methods: {
            load() {
                uni.createSelectorQuery().selectAll('.lazy').boundingClientRect((images) => {
                    images.forEach((image, index) => {
                        if (image.top <= this.windowHeight) {
                            this.list[image.dataset.index].show = true
                        }
                    })
                }).exec()
            },
            onLoad(e) {
                this.list[e.target.dataset.index].loaded = true
            }
        },
        onLoad() {
            this.windowHeight = uni.getSystemInfoSync().windowHeight
        },
        onShow() {
            if (!this.show) {
                this.show = true
                setTimeout(() => {
                    this.load()
                }, 100)
            }
        },
        onPageScroll() {
            this.load()
        }
    }
</script>

<style>
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

    .uni-media-list-logo {
        position: relative;
    }

    .uni-media-list-logo image {
        position: absolute;
        left: 0;
        top: 0;
    }

    .defaul {
        opacity: 1;
        transition: opacity 0.4s linear;
    }

    .defaul.loaded {
        opacity: 0;
    }
</style>
