<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-section-spacing">
                    <button class="btn-orientation" @tap="getOrient">获取设备的方向信息</button>
                    <button class="btn-orientation" @tap="watchOrient">监听设备的方向变化</button>
                    <button class="btn-orientation" @tap="watchStop">停止监听</button>
                </view>
            </view>
            <view class="page-section">
                <view class="page-section-spacing">
                    <textarea :value="value" style="height: 9em" />
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    var id = null
    export default {
        data() {
            return {
                title: 'orientation',
                value: ''
            }
        },
        methods: {
            getOrient: function () {
                var that = this;
                plus.orientation.getCurrentOrientation(function (o) {
                    that.value = "alpha：" + o.alpha + "\nbeta：" + o.beta + "\ngamma：" + o.gamma;
                }, function (e) {
                    console.log("获取失败:" + e.message);
                });
            },
            watchOrient: function () {
                var that = this;
                if (id) {
                    return;
                }
                id = plus.orientation.watchOrientation(function (o) {
                    that.value = "监听设备方向变化信息\n" + "alpha：" + o.alpha + "\nbeta：" + o.beta + "\ngamma：" + o.gamma;
                }, function (e) {
                    plus.orientation.clearWatch(id);
                    id = null;
                    console.log("监听失败:" + e.message);
                });
            },
            watchStop: function () {
                if (id) {
                    plus.orientation.clearWatch(id);
                    id = null;
                } else {
                    console.log("没有监听设备方向变化");
                }
            }
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    .btn-orientation {
        background-color: #007aff;
        color: #ffffff;
    }

    textarea {
        border: 2rpx solid #7A7E83;
    }
</style>
