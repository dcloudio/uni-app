<!-- ## uni.shareWithSystem(options) @sharewithsystem -->

::: sourceCode
## uni.shareWithSystem(options) @sharewithsystem

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-shareWithSystem


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-shareWithSystem

:::

使用系统分享。

系统分享不同于SDK分享。不需要配置三方SDK的key信息。手机上安装的、可接受分享的应用都会出现在列表中。如需三方SDK分享请见[插件市场](https://ext.dcloud.net.cn/search?q=%E5%88%86%E4%BA%AB&orderBy=Relevance&uni-appx=1)

### shareWithSystem 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.33 | 4.33 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShareWithSystemOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: x; HarmonyOS: x | 分享类型,默认为text。 |
| summary | string | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 分享的文字内容 |
| href | string | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 分享链接 |
| imageUrl | string | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 分享单个图片，仅支持本地路径 |
| imagePaths | Array&lt;string&gt; | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 分享图片，仅支持本地路径 |
| videoPaths | Array&lt;string&gt; | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 分享video，仅支持本地路径 |
| audioPaths | Array&lt;string&gt; | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 分享audio，仅支持本地路径 |
| filePaths | Array&lt;string&gt; | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 分享文件，仅支持本地路径 |
| success | (res: ShareWithSystemSuccess) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | uni.shareWithSystem成功回调函数定义 |
| fail | (res: [ShareWithSystemFail](#sharewithsystemfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | uni.shareWithSystem失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | uni.shareWithSystem完成回调函数定义 | 

##### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| text | Web: x; 微信小程序: -; Android: 4.33; iOS: x; HarmonyOS: x | text类型 |
| image | Web: x; 微信小程序: -; Android: 4.33; iOS: x; HarmonyOS: x | image类型 |
| video | Web: x; 微信小程序: -; Android: 4.33; iOS: x; HarmonyOS: x | video类型 |
| audio | Web: x; 微信小程序: -; Android: 4.33; iOS: x; HarmonyOS: x | audio类型 |
| file | Web: x; 微信小程序: -; Android: 4.33; iOS: x; HarmonyOS: x | file类型 |

#### ShareWithSystemFail 的属性值 @sharewithsystemfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1310600 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 取消分享 |
| 1310601 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 分享内容不可以为空 |
| 1310602 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 已经成功调用系统分享接口，系统分享出错 |
| 1310603 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 图片路径无效 |
| 1310604 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | 无效的链接 |
| 1310605 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | video 路径无效 |
| 1310606 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | file 文件不存在 |
| 1310607 | Web: x; 微信小程序: -; Android: 4.33; iOS: 4.33; HarmonyOS: x | audio 路径无效 |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/share-with-system/share-with-system.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/share-with-system/share-with-system.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/share-with-system/share-with-system
```uvue
<template>
	<!-- #ifdef APP -->
	<scroll-view direction="vertical" style="flex:1;">
	<!-- #endif -->
		<view id="viewshot">
			<button class="button" @click="shareText()">分享文本</button>
			<button class="button" @click="shareLink()">分享链接</button>
			<button class="button" @click="sharePrivateImg()">分享单个本地图片</button>
			<button class="button" @click="sharePrivateImgs()">分享多个本地图片</button>
			<button class="button" @click="shareAll()">分享链接、文本、一张图片</button>
			<button class="button" @click="sharePrivateVideo()">分享video文件(单个)</button>
			<button class="button" @click="sharePrivateVideos()">分享video文件(多个)</button>
			<button class="button" @click="sharePrivateAudio()">分享Audio文件(单个)</button>
			<button class="button" @click="sharePrivateAudios()">分享Audio文件(多个)</button>
			<button class="button" @click="sharePrivateFile()">分享文件(单个)</button>
			<button class="button" @click="sharePrivateFiles()">分享文件(多个)</button>
      <button class="button" @click="sharePubImg()">选择图片并分享</button>
      <button class="button" @click="sharePubMedias()">选择video并分享</button>
      <button class="button" @click="shareSnapShot()">指定view截图并分享</button>

			<button class="button" type="warn" @click="sharePrivateErrorImg()">分享单个本地图片(错误路径)</button>
			<button class="button" type="warn" @click="sharePrivateErrorImgs()">分享多个本地图片(含有错误路径)</button>
			<button class="button" type="warn" @click="sharePrivateErrorVideos()">分享Video文件(错误路径)</button>
			<button class="button" type="warn" @click="sharePrivateErrorAudios()">分享Audio文件(错误路径)</button>
			<button class="button" type="warn" @click="sharePrivateErrorFiles()">分享文件(错误路径)</button>


		</view>
	</scroll-view>
</template>

<script setup lang="uts">
	const summary = '欢迎使用hello uniapp-x'

	const sharePrivateErrorAudios = () => {
		uni.hideToast()
		const path1 : string = "/static/test-audio/ForElise.mp3";
		const path2 : string = "/static/test-audio/ForElise.mp32";

		uni.shareWithSystem({
			audioPaths: [path1, path2],
			type:'audio',
			success() {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateErrorFiles = () => {
		uni.hideToast()
		const path1 : string = "/static/filemanager1/to.zip";
		const path2 : string = "/static/filemanager/11.txt.br";

		uni.shareWithSystem({
			filePaths: [path1, path2],
			type:'file',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateFile = () => {
		uni.hideToast()
		const path1 : string = "/static/filemanager/to.zip";

		uni.shareWithSystem({
			filePaths: [path1],
			type:'file',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateFiles = () => {
		uni.hideToast()
		const path1 : string = "/static/filemanager/to.zip";
		const path2 : string = "/static/filemanager/1.txt.br";

		uni.shareWithSystem({
			filePaths: [path1, path2],
			type:'file',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateAudio = () => {
		uni.hideToast()
		const path1 : string = "/static/test-audio/ForElise.mp3";

		uni.shareWithSystem({
			audioPaths: [path1],
			type:'audio',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateAudios = () => {
		uni.hideToast()
		const path1 : string = "/static/test-audio/ForElise.mp3";
		const path2 : string = "/static/test-audio/ForElise.mp3";

		uni.shareWithSystem({
			audioPaths: [path1, path2],
			type:'audio',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateErrorVideos = () => {
		uni.hideToast()
		const path1 : string = "/static/test-video/10second-demo.mp4";
		const path2 : string = "/static/test-video/10second-demo1.mp4";

		uni.shareWithSystem({
			videoPaths: [path1, path2],
			type:'video',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateVideo = () => {
		uni.hideToast()
		const path1 : string = "/static/test-video/10second-demo.mp4";
		uni.shareWithSystem({
			videoPaths: [path1],
			type:'video',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateVideos = () => {
		uni.hideToast()
		const path1 : string = "/static/test-video/10second-demo.mp4";
		const path2 : string = "/static/test-video/10second-demo.mp4";

		uni.shareWithSystem({
			videoPaths: [path1, path2],
			type:'video',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePubMedias = () => {
		uni.hideToast()

		uni.chooseVideo({
			success(res) {
				uni.shareWithSystem({
					videoPaths: [res.tempFilePath],
					type:'video',
					success(_) {
						console.log('Shared----------------------------success')
					},
					fail(res) {
						console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
						uni.showToast({
							icon: "error",
							title: "errorCode=" + res.errCode
						})
					},
					complete(_) {

					}
				})
			}
		})
	}

	const shareText = () => {
		uni.hideToast()
		uni.shareWithSystem({
			summary: summary,
			type:'text',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const shareLink = () => {
		uni.hideToast()
		uni.shareWithSystem({
			type:'text',
			href: 'https://uniapp.dcloud.io',
			success(_) {
				console.log('Shared----------------------------success')
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateImg = () => {
		uni.hideToast()
		const imageSrc : string = "/static/test-image/logo.gif";
		uni.shareWithSystem({
			type:'image',
			imageUrl: imageSrc,
			success(_) {
				console.log('Shared----------------------------success')
				// 分享完成，请注意此时不一定是成功分享
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
				// 分享失败
			},
			complete(_) {

			}
		})
	}

	const sharePrivateErrorImg = () => {
		uni.hideToast()
		const imageSrc : string = "/static/test-image/logo.jpg11";
		uni.shareWithSystem({
			imageUrl: imageSrc,
			type:'image',
			success(_) {
				console.log('Shared----------------------------success')
				// 分享完成，请注意此时不一定是成功分享
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
				// 分享失败
			},
			complete(_) {

			}
		})
	}

	const sharePrivateImgs = () => {
		uni.hideToast()
		const errorImageSrc1 : string = "/static/test-image/logo.gif";
		const errorImageSrc2 : string = "/static/test-image/logo.png";
		const imageSrc : string = "/static/test-image/logo.jpg";
		let imageUrlList : string[] = new Array()
		imageUrlList.push(errorImageSrc2)
		imageUrlList.push(imageSrc)
		// imageUrlList.push(errorImageSrc1)

		uni.shareWithSystem({
			imagePaths: imageUrlList,
			type:'image',
			success(_) {
				console.log('Shared----------------------------success')
				// 分享完成，请注意此时不一定是成功分享
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePrivateErrorImgs = () => {
		uni.hideToast()
		const errorImageSrc1 : string = "/static/test-image/logo.jpg1";
		const errorImageSrc2 : string = "/static/test-image/logo.jpg3";
		const imageSrc : string = "/static/test-image/logo.jpg";
		let imageUrlList : string[] =new Array()
		imageUrlList.push(imageSrc)
		imageUrlList.push(errorImageSrc1)
		imageUrlList.push(errorImageSrc2)
		uni.shareWithSystem({
			imagePaths: imageUrlList,
			type:'image',
			success(_) {
				console.log('Shared----------------------------success')
				// 分享完成，请注意此时不一定是成功分享
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const shareAll = () => {
		uni.hideToast()
		const imageSrc : string = "/static/test-video/fast-forward.png";
		let imageUrlList : string[] = new Array()
		imageUrlList.push(imageSrc)
		uni.shareWithSystem({
			summary: summary,
			href: 'https://uniapp.dcloud.io',
			imagePaths: imageUrlList,
			type:'image',
			success(_) {
				console.log('Shared----------------------------success')
				// 分享完成，请注意此时不一定是成功分享
			},
			fail(res) {
				console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)
				uni.showToast({
					icon: "error",
					title: "errorCode=" + res.errCode
				})
			},
			complete(_) {

			}
		})
	}

	const sharePubImg = () => {
		uni.hideToast()
		uni.chooseImage({
			count: 3,
			sourceType: ['camera', 'album'],
			success(e) {
				console.log(e)
				console.log(JSON.stringify(e))
				uni.shareWithSystem({
					// summary: "aa",
					// href: 'https://uniapp.dcloud.io',
					imagePaths: e.tempFilePaths,
					type:'image',
					success(_) {
						console.log('Shared----------------------------success')
						// 分享完成，请注意此时不一定是成功分享
					},
					fail(res) {
						console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)

						uni.showToast({
							icon: "error",
							title: "errorCode=" + res.errCode
						})
					},
					complete(_) {

					}
				})
			}
		})
	}

	const shareSnapShot = () => {
		uni.hideToast()
		uni.getElementById("viewshot")?.takeSnapshot(
			{
				success: function (res) {
					uni.shareWithSystem({
						imageUrl: res.tempFilePath,
						type:'image',
						success(_) {
							console.log('Shared----------------------------success')
							// 分享完成，请注意此时不一定是成功分享
						},
						fail(res) {
							console.log('Share failed, ' + "res.errCode =" + res.errCode + '---res.errMsg= ' + res.errMsg)

							uni.showToast({
								icon: "error",
								title: "errorCode=" + res.errCode
							})
						},
						complete(_) {

						}
					})

				},
				fail: function (res) {
					console.log(res)
					uni.showToast({
						icon: 'error',
						title: '截图失败'
					})
				}
			}
		)
	}

</script>

<style>
	.button {
		margin-left: 30px;
		margin-right: 30px;
		margin-bottom: 15px;
	}
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.share.shareWithSystem)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/share.html#sharewithsystem)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=shareWithSystem&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=shareWithSystem&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=shareWithSystem&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=shareWithSystem&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=shareWithSystem&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=shareWithSystem)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=shareWithSystem&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## 注意
系统分享和微信SDK分享在Android上有些差异
1. 系统分享单张图片可以进朋友圈，多张图片进朋友圈只能使用微信SDK。
2. Android的系统分享，分享链接到微信只能以文本方式分享，如需方条链接需使用微信SDK。iOS的系统分享可以分享方条链接。
3. Android的系统分享同时分享链接和图片到微信最终只能分享图片。而iOS的系统分享同时分享链接和图片，会把图片作为链接的题图。
插件市场有[微信分享](https://ext.dcloud.net.cn/search?q=%E5%BE%AE%E4%BF%A1%E5%88%86%E4%BA%AB&orderBy=Relevance&uni-appx=1)插件。
