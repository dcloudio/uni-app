# uts-progressNotification

## 使用说明

Android平台创建显示进度的通知栏消息

**注意: 需要自定义基座，否则点击通知栏消息不会拉起应用**

### 导入

需要import导入插件

### createNotificationProgress(options : CreateNotificationProgressOptions) : void,

创建显示进度的通知栏消息

参数说明

```
export type CreateNotificationProgressOptions = {
	/**
	 * 通知标题
	 * @defaultValue 应用名称
	 */
	title ?: string | null
	/**
	 * 通知内容
	 */
	content : string,
	/**
	 * 进度
	 */
	progress : number,
	/**
	 * 点击通知消息回调
	 * @defaultValue null
	 */
	onClick? : (() => void) | null
}
```

### finishNotificationProgress(options: FinishNotificationProgressOptions) : void

完成时调用的API，比如下载完成后需要显示下载完成并隐藏进度时调用。

参数说明


```
export type FinishNotificationProgressOptions = {
	/**
	 * 通知标题
	 * @defaultValue 应用名称
	 */
	title ?: string | null
	/**
	 * 通知内容
	 */
	content : string,
	/**
	 * 点击通知消息回调
	 */
	onClick : () => void
}
```


### cancelNotificationProgress() : void

取消通知消息显示

