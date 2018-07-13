<script>
    export default {
        onLaunch: function () {
            console.log('App Launch');
            //#ifdef APP-PLUS
                /* 5+环境锁定屏幕方向 */
                plus.screen.unlockOrientation(); //解除锁定
                plus.screen.lockOrientation('portrait-primary'); //锁定
                /* 5+环境升级提示 */
                var server = "http://uni-app.dcloud.io/update"; //检查更新地址
                var req = { //升级检测数据
                    "appid": plus.runtime.appid,
                    "version": plus.runtime.version,
                    "imei": plus.device.imei
                };
                uni.request({
                    url: server,
                    data: req,
                    success: (res) => {
                        console.log("success",res);
                        if (res.statusCode == 200 && res.data.isUpdate) {
                            let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
                            uni.showModal({ //提醒用户更新
                                title: '更新提示',
                                content: '是否选择更新',
                                success: (res) => {
                                    if (res.confirm) {
                                        plus.runtime.openURL(openUrl);
                                    }
                                }
                            })
                        }
                    }
                })
            //#endif
        },
        onShow: function () {
            console.log('App Show')
        },
        onHide: function () {
            console.log('App Hide')
        }
    }
</script>

<style>
    /* reset */

    page {
        background-color: #F8F8F8;
        height: 100%;
        font-size: 32rpx;
        line-height: 1.6;
    }

    checkbox,
    radio {
        margin-right: 10rpx;
    }

    button {
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }

    form {
        width: 100%;
    }
    /* page */

    .container {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        justify-content: space-between;
        font-size: 32rpx;
        font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
    }

    .page-head {
        padding: 60rpx 50rpx 80rpx;
        text-align: center;
        line-height: initial;
        height: 60rpx;
    }

    .page-head-title {
        display: inline-block;
        padding: 0 40rpx;
        font-size: 30rpx;
        height: 60rpx;
        line-height: 60rpx;
        color: #BEBEBE;
        box-sizing: border-box;
        border-bottom: 2rpx solid #D8D8D8;
    }

    .page-head-desc {
        padding-top: 20rpx;
        color: #9B9B9B;
        font-size: 32rpx;
    }

    .page-body {
        width: 100%;
        flex-grow: 1;
        overflow-x: hidden;
    }

    .page-body-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .page-body-wording {
        text-align: center;
        padding: 200rpx 100rpx;
    }

    .page-body-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        width: 100%;
        padding: 50rpx 0 150rpx 0;
    }

    .page-body-title {
        margin-bottom: 100rpx;
        font-size: 32rpx;
    }

    .page-body-text {
        font-size: 30rpx;
        line-height: 26px;
        color: #ccc;
    }

    .page-body-text-small {
        font-size: 24rpx;
        color: #000;
        margin-bottom: 100rpx;
    }

    .page-foot {
        margin: 100rpx 0 30rpx 0;
        text-align: center;
        color: #1aad19;
        font-size: 0;
    }

    .icon-foot {
        width: 152rpx;
        height: 23rpx;
    }

    .page-section {
        width: 100%;
        margin-bottom: 60rpx;
    }

    .page-section_center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .page-section:last-child {
        margin-bottom: 0;
    }

    .page-section-gap {
        box-sizing: border-box;
        padding: 0 30rpx;
    }

    .page-section-spacing {
        box-sizing: border-box;
        padding: 0 80rpx;
    }

    .page-section-title {
        font-size: 28rpx;
        color: #999999;
        margin-top: 10rpx;
        margin-bottom: 10rpx;
        padding-left: 30rpx;
        padding-right: 30rpx;
    }

    .page-section-gap .page-section-title {
        padding-left: 0;
        padding-right: 0;
    }
    /* example */

    .index-hd {
        padding: 90rpx;
        text-align: center;
    }

    .index-logo {
        width: 140rpx;
        height: 140rpx;
    }

    .btn-area {
        margin-top: 60rpx;
        box-sizing: border-box;
        width: 100%;
        padding: 0 30rpx;
    }

    .image-plus {
        width: 150rpx;
        height: 150rpx;
        border: 2rpx solid #D9D9D9;
        position: relative;
    }

    .image-plus-nb {
        border: 0;
    }

    .image-plus-text {
        color: #888888;
        font-size: 28rpx;
    }

    .image-plus-horizontal {
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: #d9d9d9;
        width: 4rpx;
        height: 80rpx;
        transform: translate(-50%, -50%);
    }

    .image-plus-vertical {
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: #d9d9d9;
        width: 80rpx;
        height: 4rpx;
        transform: translate(-50%, -50%);
    }

    .color1 {
        background-color: #1AAD19;
        color: #FFFFFF;
    }

    .color2 {
        background-color: #2782D7;
        color: #FFFFFF;
    }

    .color3 {
        background-color: #F1F1F1;
        color: #353535;
    }
</style>
