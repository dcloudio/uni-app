<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="icon-box">
            <icon class="icon-box-img" type="success" size="93"></icon>
            <view class="icon-box-ctn">
                <view class="icon-box-title">成功</view>
                <view class="icon-box-desc">用于表示操作顺利完成</view>
            </view>
        </view>
        <view class="icon-box">
            <icon class="icon-box-img" type="info" size="93"></icon>
            <view class="icon-box-ctn">
                <view class="icon-box-title">提示</view>
                <view class="icon-box-desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</view>
            </view>
        </view>
        <view class="icon-box">
            <icon class="icon-box-img" type="warn" size="93" color="#C9C9C9"></icon>
            <view class="icon-box-ctn">
                <view class="icon-box-title">普通警告</view>
                <view class="icon-box-desc">用于表示操作后将引起一定后果的情况；也用于表示由于系统原因而造成的负向结果</view>
            </view>
        </view>
        <view class="icon-box">
            <icon class="icon-box-img" type="warn" size="93"></icon>
            <view class="icon-box-ctn">
                <view class="icon-box-title">强烈警告</view>
                <view class="icon-box-desc">用于表示由于用户原因造成的负向结果；也用于表示操作后将引起不可严重的挽回的后果的情况</view>
            </view>
        </view>
        <view class="icon-box">
            <icon class="icon-box-img" type="waiting" size="93"></icon>
            <view class="icon-box-ctn">
                <view class="icon-box-title">等待</view>
                <view class="icon-box-desc">用于表示等待，告知用户结果需等待</view>
            </view>
        </view>
        <view class="icon-box">
            <view class="icon-small-wrp">
                <icon class="icon-small" type="success" size="23"></icon>
            </view>
            <view class="icon-box-ctn">
                <view class="icon-box-title">多选控件图标_已选择</view>
                <view class="icon-box-desc">用于多选控件中，表示已选择该项目</view>
            </view>
        </view>
        <view class="icon-box">
            <view class="icon-small-wrp">
                <icon class="icon-small" type="circle" size="23"></icon>
            </view>
            <view class="icon-box-ctn">
                <view class="icon-box-title">多选控件图标_未选择</view>
                <view class="icon-box-desc">用于多选控件中，表示该项目可被选择，但还未选择</view>
            </view>
        </view>
        <view class="icon-box">
            <view class="icon-small-wrp">
                <icon class="icon-small" type="warn" size="23"></icon>
            </view>
            <view class="icon-box-ctn">
                <view class="icon-box-title">错误提示</view>
                <view class="icon-box-desc">用于在表单中表示出现错误</view>
            </view>
        </view>
        <view class="icon-box">
            <view class="icon-small-wrp">
                <icon class="icon-small" type="success_no_circle" size="23"></icon>
            </view>
            <view class="icon-box-ctn">
                <view class="icon-box-title">单选控件图标_已选择</view>
                <view class="icon-box-desc">用于单选控件中，表示已选择该项目</view>
            </view>
        </view>
        <view class="icon-box">
            <view class="icon-small-wrp">
                <icon class="icon-small" type="download" size="23"></icon>
            </view>
            <view class="icon-box-ctn">
                <view class="icon-box-title">下载</view>
                <view class="icon-box-desc">用于表示可下载</view>
            </view>
        </view>
        <view class="icon-box">
            <view class="icon-small-wrp">
                <icon class="icon-small" type="info_circle" size="23"></icon>
            </view>
            <view class="icon-box-ctn">
                <view class="icon-box-title">提示</view>
                <view class="icon-box-desc">用于在表单中表示有信息提示</view>
            </view>
        </view>
        <view class="icon-box">
            <view class="icon-small-wrp">
                <icon class="icon-small" type="cancel" size="23"></icon>
            </view>
            <view class="icon-box-ctn">
                <view class="icon-box-title">停止或关闭</view>
                <view class="icon-box-desc">用于在表单中，表示关闭或停止</view>
            </view>
        </view>
        <view class="icon-box">
            <view class="icon-small-wrp">
                <icon class="icon-small" type="search" size="14"></icon>
            </view>
            <view class="icon-box-ctn">
                <view class="icon-box-title">搜索</view>
                <view class="icon-box-desc">用于搜索控件中，表示可搜索</view>
            </view>
        </view>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    export default {
        data() {
            return {
                title: 'icon'
            }
        },
        methods: {},
        components: {
            pageHead
            
        }
    }
</script>

<style>
    .icon-box {
        margin-bottom: 40rpx;
        padding: 0 75rpx;
        display: flex;
        align-items: center;
    }

    .icon-box-img {
        margin-right: 46rpx;
    }

    .icon-box-ctn {
        flex-shrink: 100;
    }

    .icon-box-title {
        font-size: 34rpx;
    }

    .icon-box-desc {
        margin-top: 12rpx;
        font-size: 26rpx;
        color: #888;
    }

    .icon-small-wrp {
        margin-right: 46rpx;
        width: 93px;
        height: 93px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
