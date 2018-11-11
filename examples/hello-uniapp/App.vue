<script>
	export default {
		onLaunch: function () {
			console.log('App Launch');
			//#ifdef APP-PLUS
			/* 5+环境锁定屏幕方向 */
			plus.screen.lockOrientation('portrait-primary'); //锁定
			/* 5+环境升级提示 */
			var server = "https://uniapp.dcloud.io/update"; //检查更新地址
			var req = { //升级检测数据
				"appid": plus.runtime.appid,
				"version": plus.runtime.version,
				"imei": plus.device.imei
			};
			uni.request({
				url: server,
				data: req,
				success: (res) => {
					console.log("success", res);
					if (res.statusCode == 200 && res.data.isUpdate) {
						let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
						uni.showModal({ //提醒用户更新
							title: '更新提示',
							content: res.data.note ? res.data.note : '是否选择更新',
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
	/* uni.css - 通用组件、模板样式库，可以在创建项目后应用，当作一套ui库 */
	@import "./common/uni.css";
	
	/* 以下样式用于 hello uni-app 演示所需，新版本已经简化 */
	page {
		background-color:#F4F5F6;
		height: 100%;
		font-size:28upx;
		line-height: 1.8;
	},
	.uni-header-logo{
		padding:30upx;
		text-align:center;
		margin-top:10upx;
	}
	.uni-header-logo image{
		width: 140upx;
		height: 140upx;
	}
	.uni-hello-text{
		color:#7A7E83;
	}
	.uni-hello-addfile{
		text-align:center; 
		line-height:300upx;
		background:#FFF;
		padding:50upx;
		margin-top:10px;
		font-size:38upx;
		color:#808080;
	}
</style>