<template>
	<view>
    
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-hello-text">
				逐一点击执行，观察测试反馈
			</view>
		</view>
		
		<button @click="getAppContextClick">getAppContext</button>
		<button @click="getUniActivityClick">getUniActivity</button>
    <button @click="getJavaClassClick">getJavaClass</button>
		<button @click="getAppTempPathClick">getAppTempPath</button>
		<button @click="typeofClick">typeof</button>
		<button @click="arrayPermissionFlowClick">组权限申请流程测试</button>
		<button @click="singlePermissionFlowClick">单权限申请流程测试</button>
		<button @click="dispatchAsyncClick">任务分发测试</button>
		<button @click="pathTestClick">路径转换测试</button>
		<button @click="privacyStateClick">隐私协议状态测试</button>
    <button @click="privacyStateCallBackClick">隐私协议回调测试</button>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-hello-text">
				1. 当前页面已通过initAppLifecycle函数注册了生命周期监听。
			</view>
			<view class="uni-hello-text">
				2. 手动切换其他APP再返回，可在控制台和界面观察事件日志
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="text-box" scroll-y="true">
				<text>{{text}}</text>
			</view>
		</view>
		<button @click="gotoSystemPermissionActivityClick">手动申请权限测试</button>
		<button @tap="testGoOtherActivity">跳转拍照界面</button>
		<button @tap="testUnRegLifecycle">取消注册周期函数</button>
		<image :src="selectImage" v-if="selectImage"></image>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-hello-text">
				获取设备信息，观察是否符合预期
			</view>
		</view>
		<button @tap="getDeviceInfoClick">获取设备基础信息</button>
    
	</view>
</template>

<script>
	import {
		getAppContextTest,
		getUniActivityTest,
    getJavaClassTest,
		getAppTempPathTest,
		typeofClickTest,
		gotoSystemPermissionActivityTest,
		arrayPermissionFlowTest,
		singlePermissionFlowTest,
		dispatchAsyncTest,
		convert2AbsFullPathTest,
		unRegLifecycle,
		initAppLifecycle,
		gotoCameraTake,
		getDeviceInfoTest,
		privacyStateTest,
    privacyStateCallBackTest
	} from '@/uni_modules/uts-platform-api'
	/**
	 * 测试在页面生命周期之外，使用api
	 */
	export default {
		data() {
			return {
				text: '',
				selectImage:''
			}
		},
		onLoad:function(){
			let that = this;
			initAppLifecycle(function(eventLog){
				// 展示捕捉到的声明周期日志
				that.text = that.text += eventLog;
				that.text = that.text += '\n';
			});
		},
		methods: {
			privacyStateClick(){
				privacyStateTest(function(ret,desc){
					if (ret) {
						uni.showToast({
							title: '测试通过'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '失败：' + desc
						})
					}
				})
			},
      privacyStateCallBackClick() {
        privacyStateCallBackTest(function(ret, desc) {
          if (ret) {
            uni.showToast({
              title: '测试通过'
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: '失败：' + desc
            })
          }
        })
      },
			getDeviceInfoClick(){
				this.text = getDeviceInfoTest()
			},
			testGoOtherActivity(){
				var that = this;
				let ret = gotoCameraTake(function(file){
					// 展示捕捉到的声明周期日志
					console.log(file);
					that.selectImage = "file://" + file;
				});
				
				if(!ret){
					uni.showToast({
						icon:'none',
						title:'测试失败'
					})
				}
			},
			testUnRegLifecycle(){
				// 取消注册生命周期
				unRegLifecycle();
			},
      getJavaClassClick() {
        if (getJavaClassTest()) {
        	uni.showToast({
        		title: '测试通过'
        	})
        } else {
        	uni.showToast({
        		icon: 'error',
        		title: '测试失败'
        	})
        }
      },
			getAppContextClick() {
				if (getAppContextTest()) {
					uni.showToast({
						title: '测试通过'
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: '测试失败'
					})
				}
			},

			getUniActivityClick() {
				if (getUniActivityTest()) {
					uni.showToast({
						title: '测试通过'
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: '测试失败'
					})
				}
			},
			pathTestClick() {
				if (convert2AbsFullPathTest()) {
					uni.showToast({
						title: '测试通过'
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: '测试失败'
					})
				}
			},
			getAppTempPathClick() {
				if (getAppTempPathTest()) {
					uni.showToast({
						title: '测试通过'
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: '测试失败'
					})
				}
			},
			dispatchAsyncClick() {
				dispatchAsyncTest(function(ret,desc){
					if (ret) {
						uni.showToast({
							title: '测试通过'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '失败：' + desc
						})
					}
				})
			},
			typeofClick() {
				if (typeofClickTest()) {
					uni.showToast({
						title: '测试通过'
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: '测试失败'
					})
				}
			},
			
			gotoSystemPermissionActivityClick() {
				gotoSystemPermissionActivityTest()
			},
			arrayPermissionFlowClick() {
				arrayPermissionFlowTest(function(ret,desc){
					if (ret) {
						uni.showToast({
							icon: 'none',
							title: '测试通过'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '失败：' + desc
						})
					}
				})
			},
			singlePermissionFlowClick() {
				singlePermissionFlowTest(function(ret,desc){
					if (ret) {
						uni.showToast({
							icon: 'none',
							title: '测试通过'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '失败：' + desc
						})
					}
				})
			}
			
			
		}
	}
</script>

<style>
	.testButton{
		width:100%
	}
</style>