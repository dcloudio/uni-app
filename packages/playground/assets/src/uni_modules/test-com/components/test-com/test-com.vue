<template>
    <view>
        <view>
            <view>1:{{ shuijiao }}</view>
            <image style="width: 50px;height: 50px;" src="../../static/uni_modules-test-com-static_shuijiao.jpg"></image>
        </view>
        <view>
            <view>2:{{ logo }}</view>
            <image style="width: 50px;height: 50px;" :src="logo"></image>
        </view>
    </view>
</template>
<script>
import shuijiao from '../../static/uni_modules-test-com-static_shuijiao.jpg'
import logo from '../../static/uni_modules-test-com-static_logo.png'
export default {
    data() {
        return {
            shuijiao,
            logo
        }
    }
}
</script>
<style></style>