<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-section-title">输入区域高度自适应，不会出现滚动条</view>
                <view class="textarea-wrp">
                    <textarea @blur="bindTextAreaBlur" auto-height />
                </view>
            </view>

            <view class="page-section">
                <view class="page-section-title">这是一个可以自动聚焦的textarea</view>
                <view class="textarea-wrp">
                    <textarea auto-focus="true" style="height: 3em" />
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
                title: 'textarea',
                focus: false
            }
        },
        methods: {
            bindTextAreaBlur: function (e) {
                console.log(e.detail.value)
            }
        },
        components: {
            pageHead
            
        }
    }
</script>

<style>
    textarea {
        width: 700rpx;
        padding: 25rpx 0;
    }

    .textarea-wrp {
        padding: 0 25rpx;
        background-color: #fff;
    }
</style>
