<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <view class="page-section-title">默认样式</view>
                <view class="body-view">
                    <switch checked @change="switch1Change" />
                    <switch @change="switch2Change" />
                </view>
            </view>

            <view class="page-section">
                <view class="page-section-title">推荐展示样式</view>
                <view class="uni-list">
                    <view class="uni-list-cell uni-list-cell-pd">
                        <view class="uni-list-cell-db">开启中</view>
                        <switch checked />
                    </view>
                    <view class="uni-list-cell uni-list-cell-pd">
                        <view class="uni-list-cell-db">关闭</view>
                        <switch />
                    </view>
                </view>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    export default {
        data() {
            return {
                title: 'switch'
            }
        },
        methods: {
            switch1Change: function (e) {
                console.log('switch1 发生 change 事件，携带值为', e.target.value)
            },
            switch2Change: function (e) {
                console.log('switch2 发生 change 事件，携带值为', e.target.value)
            }
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    @import "../../../common/uni.css";
</style>
