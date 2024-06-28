/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ArkUI
 */
/**
 * Provide image decoration in the text component.
 *
 * @interface ImageSpanInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Provide image decoration in the text component.
 *
 * @interface ImageSpanInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ImageSpanInterface {
    /**
     * Called when image is entered in span.
     *
     * @param { ResourceStr | PixelMap } value - The image resource.
     * @returns { ImageSpanAttribute } The attribute of the image span.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when image is entered in span.
     *
     * @param { ResourceStr | PixelMap } value - The image resource.
     * @returns { ImageSpanAttribute } The attribute of the image span.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (value: ResourceStr | PixelMap): ImageSpanAttribute;
}
/**
 * Define the ImageSpan attribute functions.
 *
 * @extends CommonMethod<ImageSpanAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Define the ImageSpan attribute functions.
 *
 * @extends BaseSpan<ImageSpanAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class ImageSpanAttribute extends BaseSpan<ImageSpanAttribute> {
    /**
     * Called when the alignment of image span is set.
     *
     * @param { ImageSpanAlignment } value - The alignment type of image span.
     * @returns { ImageSpanAttribute } The attribute of the image span.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the alignment of image span is set.
     *
     * @param { ImageSpanAlignment } value - The alignment type of image span.
     * @returns { ImageSpanAttribute } The attribute of the image span.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    verticalAlign(value: ImageSpanAlignment): ImageSpanAttribute;
    /**
     * Sets the zoom type of an image.
     *
     * @param { ImageFit } value - Image display mode.
     * @returns { ImageSpanAttribute } The attribute of the image span.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Sets the zoom type of an image.
     *
     * @param { ImageFit } value - Image display mode.
     * @returns { ImageSpanAttribute } The attribute of the image span.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    objectFit(value: ImageFit): ImageSpanAttribute;
    /**
     * Sets a callback which is triggered when the image is successfully loaded.
     * The size of the image source that is successfully loaded is returned, in pixels.
     *
     * @param { ImageCompleteCallback } callback - Triggered when the image is successfully loaded.
     * @returns { ImageSpanAttribute } The attribute of the image span.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onComplete(callback: ImageCompleteCallback): ImageSpanAttribute;
    /**
     * Sets a callback which is triggered when an exception occurs during image loading.
     * The field of "message" returned in the callback carries the detailed information of failed image loading.
     *
     * @param { ImageErrorCallback } callback - Triggered when an exception occurs during image loading.
     * @returns { ImageSpanAttribute } The attribute of the image span.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    onError(callback: ImageErrorCallback): ImageSpanAttribute;
    /**
     * Placeholder displayed on load
     *
     * @param { PixelMap } value
     * @returns { ImageSpanAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    alt(value: PixelMap): ImageSpanAttribute;
}
/**
 * Defines ImageSpan Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines ImageSpan Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const ImageSpan: ImageSpanInterface;
/**
 * Defines ImageSpan Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines ImageSpan Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const ImageSpanInstance: ImageSpanAttribute;
/**
 * Callback function triggered when the image is successfully loaded.
 *
 * @typedef { function } ImageCompleteCallback
 * @param { ImageLoadResult } result - the information about the successfully loaded image.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
type ImageCompleteCallback = (result: ImageLoadResult) => void;
/**
 * The information about the successfully loaded image.
 *
 * @interface ImageLoadResult
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface ImageLoadResult {
    /**
     * The width of the image source.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    width: number;
    /**
     * The height of the image source.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    height: number;
    /**
     * The width of the component source.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    componentWidth: number;
    /**
     * The height of the component source.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    componentHeight: number;
    /**
     * The value of the status of the image being loaded successfully.
     * If the returned status value is 0, the image data is successfully loaded.
     * If the returned status value is 1, the image is successfully decoded.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    loadingStatus: number;
    /**
     * The width of the picture that is actually drawn.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentWidth: number;
    /**
     * The height of the picture that is actually drawn.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentHeight: number;
    /**
     * The offset between image content and image component on the X-axis.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentOffsetX: number;
    /**
     * The offset between image content and image component on the Y-axis.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentOffsetY: number;
}
