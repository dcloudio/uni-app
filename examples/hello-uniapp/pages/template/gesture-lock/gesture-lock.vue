<template>
    <view class="index-page">
        <mpvue-gesture-lock :containerWidth="600" :cycleRadius="70" @end="onEnd" :password="password"></mpvue-gesture-lock>
        <view class="result">{{text}}</view>
    </view>
</template>

<script>
    import mpvueGestureLock from '@/components/mpvueGestureLock';

    export default {
        components: {
            mpvueGestureLock
        },
        data() {
            return {
                password: [],
                text: '请设定手势'
            }
        },
        methods: {
            onEnd(data) {
                if (this.password.length) {
                    if (this.password.join('') === data.join('')) {
                        this.text = '手势设定完成'
                        this.password = []
                    } else {
                        this.text = '两次手势设定不一致'
                        this.password = []
                    }
                } else {
                    this.text = '请确认手势设定'
                    this.password = data
                }
            }
        }
    }
</script>

<style>
    .index-page {
        box-sizing: border-box;
        padding-top: 30px;
        height: 100vh;
        width: 100vw;
    }

    .index-page .result {
        text-align: center;
        margin-top: 30px;
    }
</style>
