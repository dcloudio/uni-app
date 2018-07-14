<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <form @submit="openLocation">
                    <view class="uni-list">
                        <view class="uni-list-cell">
                            <view class="uni-list-cell-left">
                                <view class="uni-label">经度</view>
                            </view>
                            <view class="uni-list-cell-db">
                                <input class="uni-input" type="text" :disabled="true" value="116.39742" name="longitude"></input>
                            </view>
                        </view>
                        <view class="uni-list-cell">
                            <view class="uni-list-cell-left">
                                <view class="uni-label">纬度</view>
                            </view>
                            <view class="uni-list-cell-db">
                                <input class="uni-input" type="text" :disabled="true" value="39.909" name="latitude"></input>
                            </view>
                        </view>
                        <view class="uni-list-cell">
                            <view class="uni-list-cell-left">
                                <view class="uni-label">位置名称</view>
                            </view>
                            <view class="uni-list-cell-db">
                                <input class="uni-input" type="text" :disabled="true" value="天安门" name="name"></input>
                            </view>
                        </view>
                        <view class="uni-list-cell">
                            <view class="uni-list-cell-left">
                                <view class="uni-label">详细位置</view>
                            </view>
                            <view class="uni-list-cell-db">
                                <input class="uni-input" type="text" :disabled="true" value="北京市东城区东长安街" name="address"></input>
                            </view>
                        </view>
                    </view>
                    <view class="btn-area">
                        <button formType="submit">查看位置</button>
                    </view>
                </form>
            </view>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data() {
            return {
                title: 'openLocation'
            }
        },
        methods: {
            openLocation: function (e) {
                console.log(e)
                var value = e.target.value
                console.log(value)
                uni.openLocation({
                    longitude: Number(value.longitude),
                    latitude: Number(value.latitude),
                    name: value.name,
                    address: value.address
                })
            }
        },
        components: {
            pageHead

        }
    }
</script>

<style>
    @import "../../../common/uni.css";
    .page-body-info {
        height: 250rpx;
    }

    .page-body-text-small {
        font-size: 24rpx;
        color: #000;
        margin-bottom: 100rpx;
    }

    .page-body-text-location {
        display: flex;
        font-size: 50rpx;
    }

    .page-body-text-location text {
        margin: 10rpx;
    }

    .uni-list-cell-left {
        padding: 0 30rpx;
    }

    button {
        background-color: #007aff;
        color: #ffffff;
    }
</style>
