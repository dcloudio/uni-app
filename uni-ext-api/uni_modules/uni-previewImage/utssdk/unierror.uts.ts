import { IPreviewImageError, PreviewImageErrorCode } from "./interface.uts";

/**
 * 错误主题
 */
export const UniErrorPreviewImage = 'uni-previewImage';
/**
 * 错误码
 * @UniError
 */
export const PreviewImageUniErrors : Map<number, string> = new Map([
	/**
	 * 用户取消
	 */
	[1101001, 'user cancel'],
	/**
	 * urls至少包含一张图片地址
	 */
	[1101002, 'fail parameter error: parameter.urls should have at least 1 item'],
	/**
	 * 文件不存在
	 */
	[1101003, "file not find"],
	/**
	 * 图片加载失败
	 */
	[1101004, "Failed to load resource"],
	/**
	 * 未获取权限
	 */
	[1101005, "No Permission"],
	/**
	 * 其他错误
	 */
	[1101010, "unexpect error:please check previewImage.uvue is in page.json"]
]);

export class PreviewImageErrorImpl extends UniError implements IPreviewImageError {
	// #ifndef APP-IOS
	override errCode : PreviewImageErrorCode
	// #endif
	constructor(errCode : PreviewImageErrorCode, uniErrorSubject : string) {
		super()
		this.errSubject = uniErrorSubject
		this.errCode = errCode
		this.errMsg = PreviewImageUniErrors.get(errCode) ?? "";
	}
}