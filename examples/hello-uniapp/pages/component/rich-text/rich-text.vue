<template>
    <view class="content">
        <page-head :title="title"></page-head>
        <view class="uni-padding-wrap">
			<view class="uni-title uni-common-mt">
				数组类型
				<text>\nnodes属性为Array</text>
			</view>
            <view class="uni-common-mt" style="background:#FFF; padding:20upx;">
            	<rich-text :nodes="nodes" @tap="tap"></rich-text>
            </view>
			<view class="uni-title uni-common-mt">
				字符串类型
				<text>\nnodes属性为String</text>
			</view>
            <view class="uni-common-mt" style="background:#FFF; padding:20upx;">
            	<rich-text :nodes="strings" @tap="tap"></rich-text>
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
                        style: 'line-height: 60px; color: red; text-align:center;'
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