<template>
    <view>
        <page-head :title="title"></page-head>
        <view class="uni-btn-v uni-common-mt">
            <button @tap="callKotlinMethodGetInfoTest">调用kotlin方法</button>
            <button @tap="callJavaMethodGetInfoTest">调用java方法(需自定义基座)</button>
            <view style="height: 10px;width: 100%;"></view>
            <button @tap="kotlinMemListenTest">kotlin监听内存并持续回调</button>
            <button @tap="kotlinStopMemListenTest">停止监听</button>
            <text>{{memInfo}}</text>
        </view>
    </view>
</template>
<script>
    import { callKotlinMethodGetInfo, callJavaMethodGetInfo,callKotlinCallbackUTS,callKotlinStopCallbackUTS} from "../../uni_modules/uts-syntaxcase";
    
    export default {
        data() {
            return {
                title: 'UTS混编示例',
                memInfo:''
            }
        },

        methods: {
            callKotlinMethodGetInfoTest: function () {

                let phoneInfo = callKotlinMethodGetInfo();
                uni.showToast({
                  title:phoneInfo
                })
            },
            callJavaMethodGetInfoTest: function () {
                let javaInfo = callJavaMethodGetInfo();
                uni.showToast({
                  title:javaInfo
                })
            },
            kotlinMemListenTest: function () {
                callKotlinCallbackUTS((ret) =>{
                  this.memInfo = ret
                })
            },
            
            kotlinStopMemListenTest:function () {
                callKotlinStopCallbackUTS()
            },

        }
    }
</script>

<style>


</style>