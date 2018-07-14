<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="page-section-spacing">
                    <button class="shake" @tap="shake">摇一摇</button>
                </view>
                <view class="page-section-spacing">
                    <button class="btn" @tap="watchAcce">监听设备的加速度变化</button>
                    <button class="btn" @tap="stopAcce">停止监听设备的加速度变化</button>
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

    export default {
        data() {
            return {
                title: 'onAccelerometerChange',
                value: ''
            }
        },
        onUnload() {
            uni.stopAccelerometer();
        },
        methods: {
            watchAcce() {
                uni.onAccelerometerChange((res) => {
                    this.value = "监听设备的加速度变化:\n" + "Z轴：" + res.x.toFixed(2) + "\nY轴：" + res.y.toFixed(2) +
                        "\nZ轴：" + res.z.toFixed(2);
                })
            },
            stopAcce() {
                uni.stopAccelerometer()
            },
            shake() {
                uni.navigateTo({
                    url: 'shake'
                })
            }
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    .btn {
        background-color: #007aff;
        color: #ffffff;
    }

    .shake {
        background-color: #FFCC33;
        color: #ffffff;
        margin-bottom: 50rpx;
    }

    textarea {
        border: 2rpx solid #7A7E83;
    }
</style>
