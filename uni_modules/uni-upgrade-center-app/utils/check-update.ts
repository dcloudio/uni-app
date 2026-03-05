import callCheckVersion, { UniUpgradeCenterResult } from "./call-check-version"
import { platform_iOS } from './utils'
// #ifdef UNI-APP-X
import { openSchema } from '@/uni_modules/uts-openSchema'
// #endif

// 推荐再App.vue中使用
const PACKAGE_INFO_KEY = '__package_info__'
// #ifdef APP-HARMONY
export default function (component?: any) : Promise<UniUpgradeCenterResult> {
// #endif
// #ifndef APP-HARMONY
export default function () : Promise<UniUpgradeCenterResult> {
// #endif
	return new Promise<UniUpgradeCenterResult>((resolve, reject) => {
		callCheckVersion().then(async (uniUpgradeCenterResult) => {
			// NOTE uni-app x 3.96 解构有问题
			const code = uniUpgradeCenterResult.code
			const message = uniUpgradeCenterResult.message
			const url = uniUpgradeCenterResult.url // 安装包下载地址
        // 此处逻辑仅为示例，可自行编写
        if (code > 0) {
          // 腾讯云获取下载链接
          if (/^cloud:\/\//.test(url)) {
              const tcbRes = await uniCloud.getTempFileURL({ fileList: [url] });
              if (typeof tcbRes.fileList[0].tempFileURL !== 'undefined') uniUpgradeCenterResult.url = tcbRes.fileList[0].tempFileURL;
          }

          /**
           * 提示升级一
           * 使用 uni.showModal
           */
          // return updateUseModal(uniUpgradeCenterResult)

          // #ifndef UNI-APP-X
          // 静默更新，只有wgt有
          if (uniUpgradeCenterResult.is_silently) {
            uni.downloadFile({
              url: uniUpgradeCenterResult.url,
              success: res => {
                if (res.statusCode == 200) {
                  // 下载好直接安装，下次启动生效
                  plus.runtime.install(res.tempFilePath, {
                    force: false
                  });
                }
              }
            });
            return;
          }
          // #endif

          /**
           * 提示升级二
           * 官方适配的升级弹窗，可自行替换资源适配UI风格
           */
          // #ifndef UNI-APP-X
          // #ifdef APP-PLUS
          uni.setStorageSync(PACKAGE_INFO_KEY, uniUpgradeCenterResult)
          uni.navigateTo({
            url: `/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
            fail: (err) => {
              console.error('更新弹框跳转失败', err)
              uni.removeStorageSync(PACKAGE_INFO_KEY)
            }
          })
          // #endif
          // #ifdef APP-HARMONY
          if (component) {
            component.show(true, uniUpgradeCenterResult)
          } else {
            reject({
              code: -1,
              message: '在 HarmonyOS Next 平台请传递组件使用'
            })
          }
          // #endif
          // #endif
          // #ifdef UNI-APP-X
          uni.setStorageSync(PACKAGE_INFO_KEY, uniUpgradeCenterResult)
          uni.openDialogPage({
            url: `/uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
            disableEscBack: true,
            fail: (err) => {
              console.error('更新弹框跳转失败', err)
              uni.removeStorageSync(PACKAGE_INFO_KEY)
            }
          })
          // #endif

          return resolve(uniUpgradeCenterResult)
        } else if (code < 0) {
          console.error(message)
          return reject(uniUpgradeCenterResult)
        }
        return resolve(uniUpgradeCenterResult)
      }).catch((err) => {
        reject(err)
      })
    });
  }

/**
 * 使用 uni.showModal 升级
 */
function updateUseModal(packageInfo : UniUpgradeCenterResult) : void {
	// #ifdef APP
	const {
		title, // 标题
		contents, // 升级内容
		is_mandatory, // 是否强制更新
		url, // 安装包下载地址
		type,
		platform
	} = packageInfo;

	let isWGT = type === 'wgt'
	let isiOS = !isWGT ? platform.includes(platform_iOS) : false;

	// #ifndef UNI-APP-X
	let confirmText = isiOS ? '立即跳转更新' : '立即下载更新'
	// #endif
	// #ifdef UNI-APP-X
	let confirmText = '立即下载更新'
	// #endif

	uni.showModal({
      title,
      content: contents,
      showCancel: !is_mandatory,
      confirmText,
      success: res => {
        if (res.cancel) return;

			if (isiOS) {
				// iOS 平台跳转 AppStore
				// #ifndef UNI-APP-X
				plus.runtime.openURL(url);
				// #endif
				// #ifdef UNI-APP-X
				openSchema(url)
				// #endif
				return;
			}

        uni.showToast({
          title: '后台下载中……',
          duration: 1000
        });

			// wgt 和 安卓下载更新
			uni.downloadFile({
				url,
				success: res => {
					if (res.statusCode !== 200) {
						console.error('下载安装包失败');
						return;
					}
					// 下载好直接安装，下次启动生效
          // uni-app x 项目没有 plus5+ 故使用条件编译
					// #ifndef UNI-APP-X
					plus.runtime.install(res.tempFilePath, {
						force: false
					}, () => {
						if (is_mandatory) {
							//更新完重启app
							// #ifdef APP-PLUS
							plus.runtime.restart();
							// #endif
							// #ifdef APP-HARMONY
							uni.showModal({
								title: '安装成功',
								content: '请手动重启应用',
								showCancel: false,
								success: res => {
									plus.runtime.quit();
								}
							});
							// #endif
							return;
						}
						uni.showModal({
							title: '安装成功是否重启？',
							success: res => {
								if (res.confirm) {
									//更新完重启app
									// #ifdef APP-PLUS
									plus.runtime.restart();
									// #endif
									// #ifdef APP-HARMONY
									plus.runtime.quit();
									// #endif
								}
							}
						});
					}, err => {
						uni.showModal({
							title: '更新失败',
							content: err
								.message,
							showCancel: false
						});
					});
					// #endif

          // #ifdef UNI-APP-X
          uni.installApk({
          	filePath: res.tempFilePath,
          	success: () => {
          		uni.showModal({
          			title: '安装成功请手动重启'
          		});
          	},
          	fail: err => {
          		uni.showModal({
          			title: '更新失败',
          			content: err.errMsg,
          			showCancel: false
          		});
          	}
          });
          // #endif
				}
			});
		}
	});
	// #endif
}
