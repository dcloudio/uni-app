import { ClosePreviewImageOptions, ClosePreviewImageSuccess, LongPressActionsFailResult, LongPressActionsSuccessResult, PreviewImageOptions, PreviewImageSuccess } from "./interface";
import { PreviewImageErrorImpl, UniErrorPreviewImage } from "./unierror";

export function __previewImage(option : PreviewImageOptions) {
	if (option.urls.length == 0) {
		// 失败回调
		let error = new PreviewImageErrorImpl(1101002, UniErrorPreviewImage);
		option.fail?.(error)
		option.complete?.(error)
		return
	}
	uni.$once("__onPreviewLoad", () => {
		var object = {
			current: option.current,
			urls: option.urls,
			indicator: option.indicator,
			loop: option.loop
		}
		if (option.longPressActions != null) {
			object.longPressActions = {
				itemList: option.longPressActions!.itemList,
				itemColor: option.longPressActions!.itemColor,
			}
		}
		uni.$emit("__onPreviewLoadCallback", object)
	})

	uni.$on("__UNIPREVIEWLONGPRESS", (value : UTSJSONObject) => {
		if (option.longPressActions != null) {
			var type = value["type"] as string
			var tapIndex = value["tapIndex"] as number
			var index = value["index"] as number
			if (type == "success") {
				var success : LongPressActionsSuccessResult = { tapIndex: tapIndex, index: index }
				option.longPressActions?.success?.(success)
				option.longPressActions?.complete?.(success)
			} else {
				var fail : LongPressActionsFailResult = new PreviewImageErrorImpl(1101001, UniErrorPreviewImage);
				option.longPressActions?.fail?.(fail)
				option.longPressActions?.complete?.(fail)
			}
		}
	})
	uni.openDialogPage({
		url: '/uni_modules/uni-previewImage/pages/previewImage/previewImage',
		animationType: "fade-in",
		success(_) {
			let success : PreviewImageSuccess = { errMsg: 'ok', "errSubject": UniErrorPreviewImage }
			option.success?.(success)
			option.complete?.(success)
		},
		fail(_) {
			let error = new PreviewImageErrorImpl(1101010, UniErrorPreviewImage);
			option.fail?.(error)
			option.complete?.(error)
		}
	})
}

export function __closePreviewImage(option : ClosePreviewImageOptions) {
	uni.$emit("__CLOSEPREVIEWIMAGE", null)
	let callback : ClosePreviewImageSuccess = {
		errMsg: "ok"
	}
	option.success?.(callback)
	option.complete?.(callback)
}