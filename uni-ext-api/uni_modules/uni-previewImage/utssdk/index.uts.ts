import type { ClosePreviewImage, ClosePreviewImageOptions, PreviewImage, PreviewImageOptions } from "./interface.uts"
import { __closePreviewImage, __previewImage } from "./PreviewImage.uts"

// #ifdef APP-ANDROID || APP-IOS
@UTSJS.keepAlive
// #endif
export const previewImage: PreviewImage = (option : PreviewImageOptions) => {
	__previewImage(option)
}
export const closePreviewImage : ClosePreviewImage = (option : ClosePreviewImageOptions) => {
	__closePreviewImage(option)
}