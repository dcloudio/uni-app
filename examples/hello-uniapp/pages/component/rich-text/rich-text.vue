<template>
    <view class="content">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <view class="page-section-title">nodes属性为Aarry</view>
                <view class="page-section-ctn">
                    <rich-text class="richText" :nodes="nodes" @tap="tap"></rich-text>
                </view>
            </view>
            <view class="page-section page-section-gap">
                <view class="page-section-title">nodes属性为String</view>
                <view class="page-section-ctn">
                    <rich-text class="richText" :nodes="strings" @tap="tap"></rich-text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                title: 'rich-text',
                nodes: [{
                    name: 'div',
                    attrs: {
                        class: 'div_class',
                        style: 'line-height: 60px; color: red;text-align:center;'
                    },
                    children: [{
                        type: 'text',
                        text: 'Hello&nbsp;uni-app!'
                    }]
                }],
                strings: "<div style='text-align:center;'><img src='https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png' /></div>"
            }
        }
    }
</script>
