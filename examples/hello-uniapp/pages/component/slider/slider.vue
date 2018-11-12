<template>
    <view>
        <page-head :title="title"></page-head>
        <view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">设置step</view>
			<view>
				<slider value="60" @change="sliderChange" step="5" />
			</view>
			
			<view class="uni-title">显示当前value</view>
			<view>
				<slider value="50" @change="sliderChange" show-value />
			</view>
            
			<view class="uni-title">设置最小/最大值</view>
			<view>
				<slider value="100" @change="sliderChange" min="50" max="200" show-value />
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
