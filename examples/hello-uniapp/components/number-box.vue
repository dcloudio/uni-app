<template>
    <view class="uni-numbox">
        <view class="uni-numbox-minus" :class="{'uni-numbox-disabled': disableSubtract}" @click="subtract">-</view>
        <input class="uni-numbox-value" type="number" v-model="value" @blur="handleBlur">
        <view class="uni-numbox-plus" :class="{'uni-numbox-disabled': disableAdd}" @click="add">+</view>
    </view>
</template>
<script>
    export default {
        name: 'number-box',
        props: {
            value: {
                type: Number,
                default: 0
            },
            min: {
                type: Number,
                default: -Infinity
            },
            max: {
                type: Number,
                default: Infinity
            },
            step: {
                type: Number,
                default: 1
            }
        },
        computed: {
            disableSubtract() {
                return this.value <= this.min
            },
            disableAdd() {
                return this.value >= this.max
            }
        },
        methods: {
            subtract(evt) {
                this._handleStep('subtract');
            },
            add(evt) {
                this._handleStep('add');
            },
            _handleStep(type) {
                let value = this.value;
                if (type === 'subtract') {
                    value -= this.step
                } else if (type === 'add') {
                    value += this.step
                }
                if (value < this.min || value > this.max) {
                    return
                }
                this.value = value
            },
            handleBlur(evt) {
                let value = evt.detail.value;
                if (!value) {
                    this.value = 0;
                    return
                }
                value = +value;
                if (value > this.max) {
                    value = this.max;
                } else if (value < this.min) {
                    value = this.min
                }
                this.value = value
            }
        }
    }
</script>
<style>
    .uni-numbox {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 70rpx;
    }

    .uni-numbox-minus,
    .uni-numbox-plus {
        margin: 0;
        background-color: #f9f9f9;
        width: 80rpx;
        height: 100%;
        line-height: 70rpx;
        text-align: center;
        color: #555555;
    }

    .uni-numbox-minus {
        border: 2rpx solid #cccccc;
        border-right: none;
        border-top-left-radius: 6rpx;
        border-bottom-left-radius: 6rpx;
    }

    .uni-numbox-plus {
        border: 2rpx solid #cccccc;
        border-left: none;
        border-top-right-radius: 6rpx;
        border-bottom-right-radius: 6rpx;
    }

    .uni-numbox-value {
        border: 2rpx solid #cccccc;
        background-color: #ffffff;
        width: 80rpx;
        height: 100%;
        text-align: center;
    }

    .uni-numbox-disabled {
        color: #c0c0c0;
    }
</style>
