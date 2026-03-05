<template>
    <view class="content">
		<page-head :title="title"></page-head>
        <view v-for="(item,name) in result" :key="name" class="result">
            <view>{{name}}测试结果：</view>
             <view>
                测试api：{{item.passed.join(', ')}}
            </view>
            <view>总共：{{item.total}}</view>
            <view>通过：{{item.passed.length}}</view>
            <view>失败：{{item.failed.length}}</view>
            <view v-for="(fail,index) in item.failed" :key="index" class="failed">
                <view>{{fail.split('\n')[0]}}</view>
                <view>{{fail.split('\n')[1]}}</view>
            </view>
        </view>
    </view>
</template>
<script>
    import {
        runTests
    } from '../../uni_modules/uts-tests'
    import { testSyntaxUnion } from '@/uni_modules/uts-test-syntax-union'
    export default {
        data() {
            return {
				title: 'UTS基础语法',
                result: {}
            }
        },
        onReady() {
            testSyntaxUnion()
            this.test()
        },
        methods: {
            test() {
                this.result = runTests()
                console.log(this.result)
            }
        }
    }
</script>
<style>
	@import '@/common/uni-uvue.css';
	
    .content {
		min-height: 100%;
        padding: 32rpx;
    }

    .passed {
        color: green;
    }

    .failed {
        color: red;
    }
    .result {
        margin-bottom: 20rpx;
    }
</style>
