<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body">
            <view class="page-section">
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-left">
                            <view class="uni-label">key</view>
                        </view>
                        <view class="uni-list-cell-db">
                            <input class="uni-input" type="text" placeholder="请输入key" name="key" :value="key" @input="keyChange"></input>
                        </view>
                    </view>
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-left">
                            <view class="uni-label">value</view>
                        </view>
                        <view class="uni-list-cell-db">
                            <input class="uni-input" type="text" placeholder="请输入value" name="data" :value="data" @input="dataChange"></input>
                        </view>
                    </view>
                </view>
                <view class="btn-area">
                    <button class="btn-setstorage" @tap="setStorage">存储数据</button>
                    <button @tap="getStorage">读取数据</button>
                    <button @tap="clearStorage">清理数据</button>
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
                title: 'get/set/clearStorage',
                key: '',
                data: ''
            }
        },
        methods: {
            keyChange: function (e) {
                this.key = e.target.value
            },
            dataChange: function (e) {
                this.data = e.target.value
            },
            getStorage: function () {
                var key = this.key,
                    data = this.data
                var storageData

                if (key.length === 0) {
                    this.key = key,
                        this.data = data
                    uni.showModal({
                        title: '读取数据失败',
                        content: "key 不能为空"
                    })
                } else {
                    storageData = uni.getStorageSync(key)
                    if (storageData === "") {
                        this.key = key,
                            this.data = data
                        uni.showModal({
                            title: '读取数据失败',
                            content: "找不到 key 对应的数据"
                        })
                    } else {
                        this.key = key,
                            this.data = data
                        uni.showModal({
                            title: '读取数据成功',
                            content: "data: '" + storageData + "'"
                        })
                    }
                }
            },
            setStorage: function () {
                var key = this.key
                var data = this.data
                if (key.length === 0) {
                    this.key = key,
                        this.data = data
                    uni.showModal({
                        title: '保存数据失败',
                        content: 'key 不能为空'
                    })
                } else {
                    uni.setStorageSync(key, data)
                    this.key = key,
                        this.data = data
                    uni.showModal({
                        title: '存储数据成功',
                        content: ' '
                    })
                }
            },
            clearStorage: function () {
                uni.clearStorageSync()
                this.key = '',
                    this.data = ''
                uni.showModal({
                    title: '清除数据成功',
                    content: ' '
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
    .btn-setstorage{
        background-color:#007aff;
        color: #ffffff;
    }
</style>
