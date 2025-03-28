import { PreviewImageOptions, PreviewImage, ClosePreviewImage, ClosePreviewImageOptions } from "../interface.uts"
import { __closePreviewImage, __previewImage } from "../PreviewImage.uts"
export { LongPressActionsSuccessResult, LongPressActionsOptions } from "../interface.uts"
export const previewImage : PreviewImage = function (option : PreviewImageOptions) {
	__previewImage(option)
}
export const closePreviewImage : ClosePreviewImage = function (option : ClosePreviewImageOptions) {
	__closePreviewImage(option)
}