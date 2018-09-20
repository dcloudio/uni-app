<template>
    <view class="page">
        <page-head :title="title"></page-head>
        <view class="uni-card">
            <view class="uni-list">
                <view class="uni-list-cell-divider">
                    右侧带箭头
                </view>
                <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                    <view class="uni-list-cell-navigate uni-navigate-right">
                        Item1
                    </view>
                </view>
                <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                    <view class="uni-list-cell-navigate uni-navigate-right">
                        Item2
                    </view>
                </view>
                <view class="uni-list-cell-divider">
                    右侧带数字角标
                </view>
                <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                    <view class="uni-list-cell-navigate">
                        Item2
                        <text class="uni-badge uni-badge-danger">23</text>
                    </view>
                </view>
                <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                    <view class="uni-list-cell-navigate">
                        Item1
                        <text class="uni-badge uni-badge-success">123</text>
                    </view>
                </view>
                <view class="uni-list-cell-divider">
                    右侧带数字角标+箭头
                </view>
                <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                    <view class="uni-list-cell-navigate uni-navigate-right">
                        Item1
                        <text class="uni-badge uni-badge-success uni-navigate-badge">123</text>
                    </view>
                </view>
                <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover">
                    <view class="uni-list-cell-navigate uni-navigate-right">
                        Item2
                        <text class="uni-badge uni-badge-primary uni-navigate-badge">12</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                title: 'list-with-badges'
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
