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


export type CreateNotificationProgress = (options : CreateNotificationProgressOptions) => void;


export type CancelNotificationProgress = () => void;


export type FinishNotificationProgress = (options: FinishNotificationProgressOptions) => void
