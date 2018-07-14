<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <view class="page-section-title">默认样式</view>
                <label class="checkbox">
                    <checkbox value="cb" checked="true" />选中
                </label>
                <label class="checkbox">
                    <checkbox value="cb" />未选中
                </label>
            </view>

            <view class="page-section">
                <view class="page-section-title">推荐展示样式</view>
                <view class="uni-list">
                    <checkbox-group bindchange="checkboxChange">
                        <label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
                            <view>
                                <checkbox :value="item.value" :checked="item.checked" />
                            </view>
                            <view>{{item.name}}</view>
                        </label>
                    </checkbox-group>
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
                title: 'checkbox',
                items: [{
                        value: 'USA',
                        name: '美国'
                    },
                    {
                        value: 'CHN',
                        name: '中国',
                        checked: 'true'
                    },
                    {
                        value: 'BRA',
                        name: '巴西'
                    },
                    {
                        value: 'JPN',
                        name: '日本'
                    },
                    {
                        value: 'ENG',
                        name: '英国'
                    },
                    {
                        value: 'FRA',
                        name: '法国'
                    }
                ]
            }
        },
        methods: {
            checkboxChange: function (e) {
                var items = this.items,
                    values = e.target.value;
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    items[i].checked = false;
                    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                        if (items[i].value == values[j]) {
                            items[i].checked = true;
                            break
                        }
                    }
                }
            }
        },
        components: {
            pageHead

        }
    }
</script>

<style>
    @import "../../../common/uni.css";

    .uni-list-cell {
        justify-content: flex-start
    }
</style>
