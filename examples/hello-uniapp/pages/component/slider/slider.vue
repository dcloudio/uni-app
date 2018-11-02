<template>
    <view>
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <view class="page-section-title">设置step</view>
                <view class="body-view">
                    <slider value="60" @change="sliderChange" step="5" />
                </view>
            </view>

            <view class="page-section page-section-gap">
                <view class="page-section-title">显示当前value</view>
                <view class="body-view">
                    <slider value="50" @change="sliderChange" show-value />
                </view>
            </view>

            <view class="page-section page-section-gap">
                <view class="page-section-title">设置最小/最大值</view>
                <view class="body-view">
                    <slider value="100" @change="sliderChange" min="50" max="200" show-value />
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                title: 'slider'
            }
        },
        methods: {
            sliderChange(e) {
                console.log('value 发生变化：' + e.detail.value)
            }
        }
    }
</script>
