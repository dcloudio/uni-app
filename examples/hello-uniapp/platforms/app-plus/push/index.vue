<template>
    <view class="index">
        <page-head :title="title"></page-head>
        <view class="page-body" v-if="provider[0]">
            <view class="btn-area">
                <button @tap="openPush">开启push</button>
                <button @tap="closePush">关闭push</button>
                <button @tap="listenTranMsg">监听透传数据</button>
                <button @tap="removeTranMsg">移除监听透传数据</button>
            </view>
            <view class="btn-area">
                <button @tap="requireTranMsg">发送"透传数据"消息</button>
            </view>
        </view>
    </view>
</template>
<script>
    import pageHead from '../../../components/page-head.vue'

    export default {
        data() {
            return {
                title: 'push',
                provider: [],
                pushServer: 'http://demo.dcloud.net.cn/push/?'
            }
        },
        onLoad: function () {
            uni.getProvider({
                service: "push",
                success: (e) => {
                    console.log("payment success", e);
                    this.provider = e.provider;
                },
                fail: (e) => {
                    console.log("获取推送通道失败", e);
                }
            });
        },
        methods: {
            openPush() {
                uni.subscribePush({
                    provider: this.provider[0],
                    success: (e) => {
                        console.log("开启push");
                        uni.showToast({
                            title: "已开启push接收"
                        })
                    }
                })
            },
            closePush() {
                uni.unsubscribePush({
                    provider: this.provider[0],
                    success: (e) => {
                        console.log("关闭push");
                        uni.showToast({
                            title: "已关闭push接收"
                        })
                    }
                })
            },
            listenTranMsg() {
                uni.onPush({
                    provider: this.provider[0],
                    success: (e) => {
                        console.log("监听透传数据")
                        uni.showToast({
                            title: "开始监听透传数据"
                        })
                    },
                    callback: (e) => {
                        console.log(123963)
                        uni.showToast({
                            title: "接收到透传数据"
                        });
                        console.log(123)
                        console.log(e);
                    }
                })
            },
            removeTranMsg() {
                uni.offPush({
                    provider: this.provider[0],
                    success: (e) => {
                        console.log("移除监听透传数据");
                        uni.showToast({
                            title: "移除监听透传数据"
                        })
                    }
                })
            },
            requireTranMsg() { //请求‘透传数据’推送消息
                var inf = plus.push.getClientInfo();
                var url = this.pushServer + 'type=tran&appid=' + encodeURIComponent(plus.runtime.appid);
                inf.id && (url += '&id=' + inf.id);
                url += ('&cid=' + encodeURIComponent(inf.clientid));
                if (plus.os.name == 'iOS') {
                    url += ('&token=' + encodeURIComponent(inf.token));
                }
                url += ('&title=' + encodeURIComponent('Hello H5+'));
                url += ('&content=' + encodeURIComponent('带透传数据推送通知，可通过plus.push API获取数据并进行业务逻辑处理！'));
                url += ('&payload=' + encodeURIComponent(
                    '{"title":"Hello H5+ Test","content":"test content","payload":"1234567890"}'));
                url += ('&version=' + encodeURIComponent(plus.runtime.version));
                plus.runtime.openURL(url);
            }
        },
        components: {
            pageHead
        }
    }
</script>

<style>
    button {
        background-color: #007aff;
        color: #ffffff;
    }
</style>
