<template>
    <scroll-view>
        <navigator url="/pages/sub/test/test">test</navigator>
        <test-com></test-com>
        <view>
            <view>3:{{ invalidStatic }}</view>
            <image src="./static/pages-index-static_invalid-static.jpg" />
        </view>
        <view>
            <view>4:{{ logo }}</view>
            <image src="../../static/static_logo.png" />
        </view>
    </scroll-view>
</template>
<script>
import invalidStatic from './static/pages-index-static_invalid-static.jpg'
import logo from '../../static/static_logo.png'
export default {
    data() {
        return {
            invalidStatic,
            logo
        }
    }
}
</script>