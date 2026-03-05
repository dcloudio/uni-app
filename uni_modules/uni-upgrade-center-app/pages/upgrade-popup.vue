<template>
	<view class="mask flex-center" v-if="shown">
		<view class="content botton-radius">
			<view class="content-top">
				<text class="content-top-text">{{ title }}</text>
				<image class="content-top" style="top: 0" width="100%" height="100%" src="/uni_modules/uni-upgrade-center-app/static/app/bg_top.png"></image>
			</view>
			<view class="content-header"></view>
			<view class="content-body">
				<view class="title">
					<text>{{ subTitle }}</text>
					<text class="content-body-version">{{ version }}</text>
				</view>
				<view class="body">
					<scroll-view class="box-des-scroll" scroll-y="true">
						<text class="box-des">
							{{ contents }}
						</text>
					</scroll-view>
				</view>
				<view class="footer flex-center">
					<template v-if="isApplicationStore">
						<button class="content-button" style="border: none; color: #fff" plain @click="jumpToApplicationStore">
							{{ downLoadBtnTextiOS }}
						</button>
					</template>
					<template v-else>
						<template v-if="!downloadSuccess">
							<view class="progress-box flex-column" v-if="downloading">
								<progress class="progress" :percent="downLoadPercent" activeColor="#3DA7FF" show-info stroke-width="10" />
								<view style="width: 100%; font-size: 28rpx; display: flex; justify-content: space-around">
									<text>{{ downLoadingText }}</text>
									<text>({{ downloadedSize }}/{{ packageFileSize }}M)</text>
								</view>
							</view>

							<button v-else class="content-button" style="border: none; color: #fff" plain @click="updateApp">
								{{ downLoadBtnText }}
							</button>
						</template>
						<button
							v-else-if="downloadSuccess && !installed"
							class="content-button"
							style="border: none; color: #fff"
							plain
							:loading="installing"
							:disabled="installing"
							@click="installPackage"
						>
							{{ installing ? '正在安装……' : '下载完成，立即安装' }}
						</button>
						<button
							v-else-if="installed && !isWGT"
							class="content-button"
							style="border: none; color: #fff"
							plain
							:loading="installing"
							:disabled="installing"
							@click="installPackage"
						>
							安装未完成，点击安装
						</button>

						<button v-else-if="installed && isWGT" class="content-button" style="border: none; color: #fff" plain @click="restart">安装完毕，点击重启</button>
					</template>
				</view>
			</view>

			<image v-if="!is_mandatory" class="close-img" src="/uni_modules/uni-upgrade-center-app/static/app/app_update_close.png" @click.stop="closeUpdate"></image>
		</view>
	</view>
</template>

<script>
// #ifdef APP-PLUS
import { createNotificationProgress, cancelNotificationProgress, finishNotificationProgress } from '@/uni_modules/uts-progressNotification';
// #endif
import { compare, platform_iOS, platform_Android, platform_Harmony } from '../utils/utils'
const localFilePathKey = 'UNI_ADMIN_UPGRADE_CENTER_LOCAL_FILE_PATH';

let downloadTask = null;
let openSchemePromise;

export default {
    emits: ['close', 'show'],
	data() {
		return {
			// 从之前下载安装
			installForBeforeFilePath: '',

			// 安装
			installed: false,
			installing: false,

			// 下载
			downloadSuccess: false,
			downloading: false,

			downLoadPercent: 0,
			downloadedSize: 0,
			packageFileSize: 0,

			tempFilePath: '', // 要安装的本地包地址

			// 默认安装包信息
			title: '更新日志',
			contents: '',
			version: '',
			is_mandatory: false,
			url: '',
			platform: [],
			store_list: null,

			// 可自定义属性
			subTitle: '发现新版本',
			downLoadBtnTextiOS: '立即跳转更新',
			downLoadBtnText: '立即下载更新',
			downLoadingText: '安装包下载中，请稍后',

			// #ifdef APP-PLUS
			shown: true,
			// #endif
			// #ifdef APP-HARMONY
			shown: false,
			// #endif
		};
	},
	onLoad({ local_storage_key }) {
		if (!local_storage_key) {
			console.error('local_storage_key为空，请检查后重试');
			uni.navigateBack();
			return;
		}

		const localPackageInfo = uni.getStorageSync(local_storage_key);
		if (!localPackageInfo) {
			console.error('安装包信息为空，请检查后重试');
			uni.navigateBack();
			return;
		}

		this.setLocalPackageInfo(localPackageInfo)
	},
	onBackPress() {
		// 强制更新不允许返回
		if (this.is_mandatory) return true;
		if (!this.needNotificationProgress) downloadTask && downloadTask.abort();
	},
	onHide() {
		openSchemePromise = null;
	},
	computed: {
		isWGT() {
			return this.type === 'wgt';
		},
		isNativeApp() {
			return this.type === 'native_app';
		},
		isiOS() {
			return this.platform.indexOf(platform_iOS) !== -1;
		},
		isAndroid() {
			return this.platform.indexOf(platform_Android) !== -1;
		},
		isHarmony() {
			return this.platform.indexOf(platform_Harmony) !== -1;
		},
		isApplicationStore() {
			return !this.isWGT && this.isNativeApp && (
				this.isiOS ||
				this.isHarmony
			)
			// return this.isiOS || (!this.isiOS && !this.isWGT && this.url.indexOf('.apk') === -1);
		},
		needNotificationProgress() {
			return this.platform.indexOf(platform_iOS) === -1 && !this.is_mandatory && !this.isHarmony;
		}
	},
	methods: {
		show(shown, localPackageInfo) {
			// #ifdef APP-HARMONY
			this.$emit('show')
			if (localPackageInfo) {
				this.shown = shown
				this.setLocalPackageInfo(localPackageInfo)
			} else {
				console.error(`安装包信息为空，请检查后重试`);
			}
			// #endif
		},
		setLocalPackageInfo(localPackageInfo) {
			const requiredKey = ['version', 'url', 'type'];
			for (let key in localPackageInfo) {
				if (requiredKey.indexOf(key) !== -1 && !localPackageInfo[key]) {
					console.error(`参数 ${key} 必填，请检查后重试`);
					// #ifdef APP-PLUS
					uni.navigateBack();
					// #endif
					// #ifdef APP-HARMONY
					this.shown = false
					// #endif
					return;
				}
			}

			Object.assign(this, localPackageInfo);
			this.checkLocalStoragePackage();
		},
		checkLocalStoragePackage() {
			// 如果已经有下载好的包，则直接提示安装
			const localFilePathRecord = uni.getStorageSync(localFilePathKey);
			if (localFilePathRecord) {
				const { version, savedFilePath, installed } = localFilePathRecord;

				// 比对版本
				if (!installed && compare(version, this.version) === 0) {
					this.downloadSuccess = true;
					this.installForBeforeFilePath = savedFilePath;
					this.tempFilePath = savedFilePath;
				} else {
					// 如果保存的包版本小 或 已安装过，则直接删除
					this.deleteSavedFile(savedFilePath);
				}
			}
		},
		askAbortDownload() {
			uni.showModal({
				title: '是否取消下载？',
				cancelText: '否',
				confirmText: '是',
				success: (res) => {
					if (res.confirm) {
						downloadTask && downloadTask.abort();
            if (this.needNotificationProgress) {
              cancelNotificationProgress();
            }
						uni.navigateBack();
					}
				}
			});
		},
		async closeUpdate() {
			if (this.downloading) {
				if (this.is_mandatory) {
					return uni.showToast({
						title: '下载中，请稍后……',
						icon: 'none',
						duration: 500
					});
				}
				if (!this.needNotificationProgress) {
					this.askAbortDownload();
					return;
				}
			}

			if (!this.needNotificationProgress && this.downloadSuccess && this.tempFilePath) {
				// 包已经下载完毕，稍后安装，将包保存在本地
				await this.saveFile(this.tempFilePath, this.version);
			}

			// #ifdef APP-PLUS
			uni.navigateBack();
			// #endif
			// #ifdef APP-HARMONY
			this.shown = false
			this.$emit('close')
			// #endif
		},
		updateApp() {
			this.checkStoreScheme()
				.catch(() => {
					this.downloadPackage();
				})
				.finally(() => {
					openSchemePromise = null;
				});
		},
		// 跳转应用商店
		checkStoreScheme() {
			const storeList = (this.store_list || []).filter((item) => item.enable);
			if (storeList && storeList.length) {
				storeList
					.sort((cur, next) => next.priority - cur.priority)
					.map((item) => item.scheme)
					.reduce((promise, cur, curIndex) => {
						openSchemePromise = (promise || (promise = Promise.reject())).catch(() => {
							return new Promise((resolve, reject) => {
								plus.runtime.openURL(cur, (err) => {
									reject(err);
								});
							});
						});
						return openSchemePromise;
					}, openSchemePromise);
				return openSchemePromise;
			}

			return Promise.reject();
		},
		downloadPackage() {
			this.downloading = true;
			//下载包
			downloadTask = uni.downloadFile({
				url: this.url,
				success: (res) => {
					if (res.statusCode == 200) {
						// fix: wgt 文件下载完成后后缀不是 wgt
						if (this.isWGT && res.tempFilePath.split('.').slice(-1)[0] !== 'wgt') {
							const failCallback = (e) => {
								console.log('[FILE RENAME FAIL]：', JSON.stringify(e));
							};
							// #ifndef APP-HARMONY
							plus.io.resolveLocalFileSystemURL(
								res.tempFilePath,
								(entry) => {
									entry.getParent((parent) => {
										const newName = `new_wgt_${Date.now()}.wgt`;
										entry.copyTo(
											parent,
											newName,
											(res) => {
												this.tempFilePath = res.fullPath;
												this.downLoadComplete();
											},
											failCallback
										);
									}, failCallback);
								},
								failCallback
							);
							// #endif
							// #ifdef APP-HARMONY
							failCallback({code: -1, message: 'Download content error, is not wgt.'})
							// #endif
						} else {
							this.tempFilePath = res.tempFilePath;
							this.downLoadComplete();
						}
					} else {
						console.log('下载错误：' + JSON.stringify(res))
            this.downloadFail()
					}
				},
        fail: (err) => {
          console.log('下载错误：' + JSON.stringify(err))
          this.downloadFail()
        }
			});

			downloadTask.onProgressUpdate((res) => {
				this.downLoadPercent = res.progress;
				this.downloadedSize = (res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2);
				this.packageFileSize = (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2);

				if (this.needNotificationProgress && !this.downloadSuccess) {
					createNotificationProgress({
						title: '升级中心正在下载安装包……',
						content: `${this.downLoadPercent}%`,
						progress: this.downLoadPercent,
						onClick: () => {
							this.askAbortDownload();
						}
					});
				}
			});
			if (this.needNotificationProgress) {
				uni.navigateBack();
			}
		},
    downloadFail() {
      const errMsg = '下载失败，请点击重试'

      this.downloadSuccess = false;
      this.downloading = false;

      this.downLoadPercent = 0;
      this.downloadedSize = 0;
      this.packageFileSize = 0;

      this.downLoadBtnText = errMsg

      downloadTask = null;

      if (this.needNotificationProgress) {
        finishNotificationProgress({
          title: '升级包下载失败',
          content: '请重新检查更新',
					onClick: () => {}
        });
      }
    },
		downLoadComplete() {
			this.downloadSuccess = true;
			this.downloading = false;

			this.downLoadPercent = 0;
			this.downloadedSize = 0;
			this.packageFileSize = 0;

			downloadTask = null;

			if (this.needNotificationProgress) {
				finishNotificationProgress({
					title: '安装升级包',
					content: '下载完成',
					onClick: () => {}
				});

				this.installPackage();
				return;
			}

			// 强制更新，直接安装
			if (this.is_mandatory) {
				this.installPackage();
			}
		},
		installPackage() {
			// #ifdef APP-PLUS || APP-HARMONY
			// wgt资源包安装
			if (this.isWGT) {
				this.installing = true;
			}
			plus.runtime.install(
				this.tempFilePath,
				{
					force: false
				},
				async (res) => {
					this.installing = false;
					this.installed = true;

					// wgt包，安装后会提示 安装成功，是否重启
					if (this.isWGT) {
						// 强制更新安装完成重启
						if (this.is_mandatory) {
							// #ifdef APP-PLUS
							uni.showLoading({
								icon: 'none',
								title: '安装成功，正在重启……'
							});
							// #endif

							setTimeout(() => {
								// #ifdef APP-PLUS
								uni.hideLoading();
								// #endif
								this.restart();
							}, 1000);
						}
					} else {
						const localFilePathRecord = uni.getStorageSync(localFilePathKey);
						uni.setStorageSync(localFilePathKey, {
							...localFilePathRecord,
							installed: true
						});
					}
				},
				async (err) => {
					// 如果是安装之前的包，安装失败后删除之前的包
					if (this.installForBeforeFilePath) {
						await this.deleteSavedFile(this.installForBeforeFilePath);
						this.installForBeforeFilePath = '';
					}

					// 安装失败需要重新下载安装包
					this.installing = false;
					this.installed = false;

					uni.showModal({
						title: '更新失败，请重新下载',
						content: err.message,
						showCancel: false
					});
				}
			);

			// 非wgt包，安装跳出覆盖安装，此处直接返回上一页
			if (!this.isWGT && !this.is_mandatory) {
				uni.navigateBack();
			}
			// #endif
		},
		restart() {
			this.installed = false;
			// #ifdef APP-HARMONY
			uni.showModal({
				title: '更新完毕',
				content: '请手动重启',
				showCancel: false,
				success(res) {
					plus.runtime.quit()
				}
			})
			// #endif
			// #ifdef APP-PLUS
			//更新完重启app
			plus.runtime.restart();
			// #endif
		},
		saveFile(tempFilePath, version) {
			return new Promise((resolve, reject) => {
				uni.saveFile({
					tempFilePath,
					success({ savedFilePath }) {
						uni.setStorageSync(localFilePathKey, {
							version,
							savedFilePath
						});
					},
					complete() {
						resolve();
					}
				});
			});
		},
		deleteSavedFile(filePath) {
			uni.removeStorageSync(localFilePathKey);
			return uni.removeSavedFile({
				filePath
			});
		},
		jumpToApplicationStore() {
			plus.runtime.openURL(this.url);
		}
	}
};
</script>

<style>
page {
	background: transparent;
}

.flex-center {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
}

.mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.65);
}

.botton-radius {
	border-bottom-left-radius: 30rpx;
	border-bottom-right-radius: 30rpx;
}

.content {
	position: relative;
	top: 0;
	width: 600rpx;
	background-color: #fff;
	box-sizing: border-box;
	padding: 0 50rpx;
	font-family: Source Han Sans CN;
}

.text {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	line-height: 200px;
	text-align: center;
	color: #ffffff;
}

.content-top {
	position: absolute;
	top: -195rpx;
	left: 0;
	width: 600rpx;
	height: 270rpx;
}

.content-top-text {
	font-size: 45rpx;
	font-weight: bold;
	color: #f8f8fa;
	position: absolute;
	top: 120rpx;
	left: 50rpx;
	z-index: 1;
}

.content-header {
	height: 70rpx;
}

.title {
	font-size: 33rpx;
	font-weight: bold;
	color: #3da7ff;
	line-height: 38px;
}

.content-body {
  width: 100%;
}

.content-body-version {
	padding-left: 20rpx;
	color: #fff;
	font-size: 20rpx;
	margin-left: 10rpx;
	padding: 4rpx 8rpx;
	border-radius: 20rpx;
	background: #50aefd;
}

.footer {
	height: 150rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.box-des-scroll {
	box-sizing: border-box;
	padding: 0 40rpx;
	height: 200rpx;
	text-align: left;
}

.box-des {
	font-size: 26rpx;
	color: #000000;
	line-height: 50rpx;
}

.progress-box {
	width: 100%;
}

.progress {
	width: 90%;
	height: 40rpx;
	/* border-radius: 35px; */
}

.close-img {
	width: 70rpx;
	height: 70rpx;
	z-index: 1000;
	position: absolute;
	bottom: -120rpx;
	left: calc(50% - 70rpx / 2);
}

.content-button {
	text-align: center;
	flex: 1;
	font-size: 30rpx;
	font-weight: 400;
	color: #ffffff;
	border-radius: 40rpx;
	margin: 0 18rpx;

	height: 80rpx;
	line-height: 80rpx;

	background: linear-gradient(to right, #1785ff, #3da7ff);
}

.flex-column {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
