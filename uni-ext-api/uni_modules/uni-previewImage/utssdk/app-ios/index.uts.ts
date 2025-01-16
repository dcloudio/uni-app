import { PreviewImageOptions, PreviewImage, ClosePreviewImage, ClosePreviewImageOptions } from "../interface.uts"
import { __previewImage, __closePreviewImage } from "../PreviewImage.uts"
export const previewImage : PreviewImage = function (option : PreviewImageOptions) {
	__previewImage(option)
}
export const closePreviewImage : ClosePreviewImage = function (option : ClosePreviewImageOptions) {
	__closePreviewImage(option)
}