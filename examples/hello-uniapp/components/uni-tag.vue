<template>
    <view class="uni-tag" v-if="text" :class="[disabled === true || disabled === 'true' ? 'uni-tag-disabled' : '',inverted === true || inverted === 'true' ? 'uni-tag-inverted' : '',circle === true || circle === 'true' ? 'uni-tag-circle' : '','uni-tag-'+size,'uni-tag-'+type]" @click="onClick()">{{text}}</view>
</template>

<script>
    export default {
        props: {
            type: { //标签类型default、primary、success、warning、danger、royal
                type: String,
                default: 'default'
            },
            size: { //标签大小 normal, small
                type: String,
                default: 'normal'
            },
            text: String, //标签内容
            disabled: { //是否为禁用状态
            	type: [String, Boolean],
            	defalut: false
            },
            inverted: { //是否为空心
            	type: [String, Boolean],
            	defalut: false
            },
            circle: { //是否为圆角
                type: [String, Boolean],
                defalut: false
            }
        },
        methods: {
            onClick() {
                if(this.disabled === true || this.disabled === 'true'){
                    return;
                }
                this.$emit('click')
            }
        }
    }
</script>

<style>
    .uni-tag,
    .uni-tag-default {
        box-sizing: border-box;
        padding: 0px 32upx;
        height: 60upx;
        line-height: calc(60upx - 2px);
        font-size: 28upx;
        display: inline-block;
        color: #666;
        border-radius: 8upx;
        background-color: #F1F1F1;
        border: 1px solid #F1F1F1;
    }
    .uni-tag-circle{
        border-radius: 30upx;
    }
    .uni-tag-small{
        height: 40upx;
        padding: 0px 16upx;
        line-height: calc(40upx - 2px);
        font-size: 20rpx;
    }
    .uni-tag-disabled{
        opacity: 0.5;
    }
    .uni-tag.uni-tag-inverted {
        color: #666;
        background-color: #FFFFFF;
        border: 1px solid # F1F1F1;
    }

    .uni-tag-primary {
        color: #fff;
        background-color: #007aff;
        border: 1px solid #007aff;
    }

    .uni-tag-primary.uni-tag-inverted {
        color: #007aff;
        background-color: #FFFFFF;
        border: 1px solid #007aff;
    }

    .uni-tag-success {
        color: #fff;
        background-color: #4cd964;
        border: 1px solid #4cd964;
    }

    .uni-tag-success.uni-tag-inverted {
        color: #4cd964;
        background-color: #FFFFFF;
        border: 1px solid #4cd964;
    }

    .uni-tag-warning {
        color: #fff;
        background-color: #f0ad4e;
        border: 1px solid #f0ad4e;
    }

    .uni-tag-warning.uni-tag-inverted{
        color: #f0ad4e;
        background-color: #FFFFFF;
        border: 1px solid #f0ad4e;
    }

    .uni-tag-danger{
        color: #fff;
        background-color: #dd524d;
        border: 1px solid #dd524d;
    }

    .uni-tag-danger.uni-tag-inverted {
        color: #dd524d;
        background-color: #FFFFFF;
        border: 1px solid #dd524d;
    }

    .uni-tag-royal {
        color: #fff;
        background-color: #8a6de9;
        border: 1px solid #8a6de9;
    }

    .uni-tag-royal.uni-tag-inverted {
        color: #8a6de9;
        background-color: #FFFFFF;
        border: 1px solid #8a6de9;
    }
</style>
