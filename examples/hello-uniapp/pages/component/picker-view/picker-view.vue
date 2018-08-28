<template>
    <view>
        <page-head :title="title"></page-head>
        <view class="title">日期：{{year}}年{{month}}月{{day}}日</view>
        <picker-view indicator-style="height: 50px;" :value="value" @change="bindChange">
            <picker-view-column>
                <view class="item" v-for="item in years">{{item}}年</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="item in months">{{item}}月</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="item in days">{{item}}日</view>
            </picker-view-column>
        </picker-view>
    </view>
</template>

<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data: function () {
            const date = new Date()
            const years = []
            const months = []
            const days = []

            for (let i = 1990; i <= date.getFullYear(); i++) {
                years.push(i)
            }

            for (let i = 1; i <= 12; i++) {
                months.push(i)
            }

            for (let i = 1; i <= 31; i++) {
                days.push(i)
            }
            return {
                title: 'picker-view',
                years: years,
                year: date.getFullYear(),
                months: months,
                month: 2,
                days: days,
                day: 2,
                value: [9999, 1, 1]
            }
        },
        methods: {
            bindChange: function (e) {
                const val = e.detail.value
                this.year = this.years[val[0]]
                this.month = this.months[val[1]]
                this.day = this.days[val[2]]
            }
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    .title {
        padding: 0 50px;
    }

    picker-view {
        width: 100%;
        height: 600px;
        margin-top: 50px;
    }

    .item {
        line-height: 100px;
        text-align: center;
    }
</style>
