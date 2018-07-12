<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <form class="page-body" @submit="setNaivgationBarTitle">
            <view class="uni-list">
                <view class="uni-list-cell">
                    <view class="uni-list-cell-left">
                        页面标题
                    </view>
                    <view class="uni-list-cell-db">
                        <input class="uni-input" type="text" placeholder="请输入页面标题并点击设置即可" name="title"></input>
                    </view>
                </view>
            </view>
            <view class="btn-area">
                <button formType="submit">设置</button>
            </view>
        </form>
        
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'
    
    export default {
        data() {
            return {
                title: 'setNaivgationBarTitle'
            }
        },
        methods: {
            setNaivgationBarTitle: function (e) {
                var title = e.target.value.title
                console.log(title)
                uni.setNavigationBarTitle({
                    title: title,
                    success: function () {
                        console.log('setNavigationBarTitle success')
                    },
                    fail: function (err) {
                        console.log('setNavigationBarTitle fail, err is', err)
                    }
                })
                return false
            }
        },
        components: {
            pageHead
            
        }
    }
</script>

<style>
    @import "../../../common/uni.css";
    
    button{
    	background-color:#007aff;
    	color: #ffffff;
    }
</style>
