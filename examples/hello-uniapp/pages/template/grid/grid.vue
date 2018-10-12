<template>
    <view class="page">
        <page-head :title="title"></page-head>
        <view class="uni-grid-9">
            <view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in grids" :key="index" :class="index % 3 === 2 ? 'no-border-right' : ''">
                <image class="uni-grid-9-image" :src="item"></image>
                <text class="uni-grid-9-text">grid</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                title: 'grid',
                grids: ["../../../static/c1.png", "../../../static/c2.png", "../../../static/c3.png",
                    "../../../static/c4.png", "../../../static/c5.png", "../../../static/c6.png",
                    "../../../static/c7.png", "../../../static/c8.png", "../../../static/c9.png"
                ]
            }
        }
    }
</script>

<style>
    .page {
        padding-top: 60upx;
    }

    page {
        background: #efeff4;
    }
</style>
