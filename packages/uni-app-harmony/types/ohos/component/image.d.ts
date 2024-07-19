/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * Use the DrawableDescriptor class to get drawable image.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Use the DrawableDescriptor class to get drawable image.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare type DrawableDescriptor = import('../api/@ohos.arkui.drawableDescriptor').DrawableDescriptor;
/**
 * Import the DrawingColorFilter type object for image color filter setting.
 *
 * @typedef DrawingColorFilter
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare type DrawingColorFilter = import('../api/@ohos.graphics.drawing').default.ColorFilter;
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare enum ImageRenderMode {
    /**
     * Render according to the original image, including colors.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Render according to the original image, including colors.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Render according to the original image, including colors.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Render according to the original image, including colors.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Original,
    /**
     * Render the image as a template image, ignoring the color information of the image.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Render the image as a template image, ignoring the color information of the image.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Render the image as a template image, ignoring the color information of the image.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Render the image as a template image, ignoring the color information of the image.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Template
}
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 12
 */
declare enum DynamicRangeMode {
    /**
     * Allow image content to use an unrestricted extended range.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    HIGH = 0,
    /**
     * Allow image content to use some extended range.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    CONSTRAINT = 1,
    /**
     * Restrict the image content dynamic range to the standard range.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    STANDARD = 2
}
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare enum ImageInterpolation {
    /**
     * Do not use interpolated image data.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Do not use interpolated image data.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Do not use interpolated image data.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Do not use interpolated image data.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    None,
    /**
     * Low usage of interpolated image data.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Low usage of interpolated image data.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Low usage of interpolated image data.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Low usage of interpolated image data.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Low,
    /**
     * Interpolated image data is used moderately.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Interpolated image data is used moderately.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Interpolated image data is used moderately.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Interpolated image data is used moderately.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Medium,
    /**
     * High usage of interpolated image data may affect the speed of image rendering.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * High usage of interpolated image data may affect the speed of image rendering.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * High usage of interpolated image data may affect the speed of image rendering.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * High usage of interpolated image data may affect the speed of image rendering.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    High
}
/**
 * @interface ImageInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * @interface ImageInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * @interface ImageInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * @interface ImageInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface ImageInterface {
    /**
     * Set src to obtain images.
     *
     * @param { PixelMap | ResourceStr | DrawableDescriptor } src
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set src to obtain images
     *
     * @param { PixelMap | ResourceStr | DrawableDescriptor } src
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Set src to obtain images
     *
     * @param { PixelMap | ResourceStr | DrawableDescriptor } src
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set src to obtain images
     *
     * @param { PixelMap | ResourceStr | DrawableDescriptor } src
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (src: PixelMap | ResourceStr | DrawableDescriptor): ImageAttribute;
}
/**
 * @extends CommonMethod<ImageAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * @extends CommonMethod<ImageAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * @extends CommonMethod<ImageAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * @extends CommonMethod<ImageAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class ImageAttribute extends CommonMethod<ImageAttribute> {
    /**
     * Placeholder displayed on load
     *
     * @param { string | Resource } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Placeholder displayed on load
     *
     * @param { string | Resource } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Placeholder displayed on load
     *
     * @param { string | Resource } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Placeholder displayed on load
     *
     * @param { string | Resource } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    /**
     * Placeholder displayed on load
     *
     * @param { string | Resource | PixelMap } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 12
     */
    alt(value: string | Resource | PixelMap): ImageAttribute;
    /**
     * match Text Direction
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * match Text Direction
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * match Text Direction
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * match Text Direction
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    matchTextDirection(value: boolean): ImageAttribute;
    /**
     * Sets whether the display size of the image follows the source size.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets whether the display size of the image follows the source size.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets whether the display size of the image follows the source size.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets whether the display size of the image follows the source size.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fitOriginalSize(value: boolean): ImageAttribute;
    /**
     * fill Color
     *
     * @param { ResourceColor } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * fill Color
     *
     * @param { ResourceColor } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * fill Color
     *
     * @param { ResourceColor } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * fill Color
     *
     * @param { ResourceColor } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fillColor(value: ResourceColor): ImageAttribute;
    /**
     * Sets the zoom type of an image.
     *
     * @param { ImageFit } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the zoom type of an image.
     *
     * @param { ImageFit } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the zoom type of an image.
     *
     * @param { ImageFit } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the zoom type of an image.
     *
     * @param { ImageFit } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    objectFit(value: ImageFit): ImageAttribute;
    /**
     * Set the repeat style of the picture
     *
     * @param { ImageRepeat } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set the repeat style of the picture
     *
     * @param { ImageRepeat } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Set the repeat style of the picture
     *
     * @param { ImageRepeat } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the repeat style of the picture
     *
     * @param { ImageRepeat } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    objectRepeat(value: ImageRepeat): ImageAttribute;
    /**
     * Set the auto style of the picture
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set the auto style of the picture
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Set the auto style of the picture
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Set the auto style of the picture
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    autoResize(value: boolean): ImageAttribute;
    /**
     * Sets the image rendering mode.
     *
     * @param { ImageRenderMode } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the image rendering mode.
     *
     * @param { ImageRenderMode } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the image rendering mode.
     *
     * @param { ImageRenderMode } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the image rendering mode.
     *
     * @param { ImageRenderMode } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    renderMode(value: ImageRenderMode): ImageAttribute;
    /**
     * Set dynamic range mode of image.
     *
     * @param { DynamicRangeMode } value - Indicates the resizable options.
     * @returns { ImageAttribute } Returns the instance of the ImageAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    dynamicRangeMode(value: DynamicRangeMode): ImageAttribute;
    /**
     * Sets the interpolation effect of an image. The interpolation effect is only magnified for the image.
     *
     * @param { ImageInterpolation } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the interpolation effect of an image. The interpolation effect is only magnified for the image.
     *
     * @param { ImageInterpolation } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the interpolation effect of an image. The interpolation effect is only magnified for the image.
     *
     * @param { ImageInterpolation } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the interpolation effect of an image. The interpolation effect is only magnified for the image.
     *
     * @param { ImageInterpolation } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    interpolation(value: ImageInterpolation): ImageAttribute;
    /**
     * Specifies the picture decoding size.
     * The original picture is decoded into a picture of a specified size. The unit of the number type is px.
     *
     * @param { object } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Specifies the picture decoding size.
     * The original picture is decoded into a picture of a specified size. The unit of the number type is px.
     *
     * @param { object } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Specifies the picture decoding size.
     * The original picture is decoded into a picture of a specified size. The unit of the number type is px.
     *
     * @param { object } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Specifies the picture decoding size.
     * The original picture is decoded into a picture of a specified size. The unit of the number type is px.
     *
     * @param { object } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    sourceSize(value: {
        width: number;
        height: number;
    }): ImageAttribute;
    /**
     * Sets the synchronous or asynchronous mode for image loading.
     * The default parameter type is bool, and the default value is false.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the synchronous or asynchronous mode for image loading.
     * The default parameter type is bool, and the default value is false.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the synchronous or asynchronous mode for image loading.
     * The default parameter type is bool, and the default value is false.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the synchronous or asynchronous mode for image loading.
     * The default parameter type is bool, and the default value is false.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    syncLoad(value: boolean): ImageAttribute;
    /**
     * Sets the color filter effect on the image.
     *
     * @param { ColorFilter } value ColorFilter object.
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the color filter effect on the image.
     *
     * @param { ColorFilter } value ColorFilter object.
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the color filter effect on the image.
     *
     * @param { ColorFilter } value ColorFilter object.
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    /**
     * Sets the color filter effect on the image.
     *
     * @param { ColorFilter | DrawingColorFilter } value ColorFilter object.
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    colorFilter(value: ColorFilter | DrawingColorFilter): ImageAttribute;
    /**
     * Allow replication.
     *
     * @param { CopyOptions } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Allow replication.
     *
     * @param { CopyOptions } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Allow replication.
     *
     * @param { CopyOptions } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    copyOption(value: CopyOptions): ImageAttribute;
    /**
     * Enable image dragging.
     * Default value is false.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Enable image dragging.
     * Default value is true.
     *
     * @param { boolean } value
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    draggable(value: boolean): ImageAttribute;
    /**
     * This callback is triggered when an image is successfully loaded.
     * The size of the image source that is successfully loaded is returned, in pixels.
     *
     * @param { function } callback
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * This callback is triggered when an image is successfully loaded.
     * The size of the image source that is successfully loaded is returned, in pixels.
     *
     * @param { function } callback
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * This callback is triggered when an image is successfully loaded.
     * The size of the image source that is successfully loaded is returned, in pixels.
     *
     * @param { function } callback
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * This callback is triggered when an image is successfully loaded.
     * The size of the image source that is successfully loaded is returned, in pixels.
     *
     * @param { function } callback
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    onComplete(callback: (event?: {
        /**
         * The width of the image source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * The width of the image source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 9
         * @form
         */
        /**
         * The width of the image source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         * @form
         */
        /**
         * The width of the image source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         * @form
         */
        width: number;
        /**
         * The height of the image source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * The height of the image source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 9
         * @form
         */
        /**
         * The height of the image source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         * @form
         */
        /**
         * The height of the image source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         * @form
         */
        height: number;
        /**
         * The width of the component source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * The width of the component source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 9
         * @form
         */
        /**
         * The width of the component source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         * @form
         */
        /**
         * The width of the component source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         * @form
         */
        componentWidth: number;
        /**
         * The height of the component source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * The height of the component source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 9
         * @form
         */
        /**
         * The height of the component source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         * @form
         */
        /**
         * The height of the component source.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         * @form
         */
        componentHeight: number;
        /**
         * The value of the status of the image being loaded successfully.
         * If the returned status value is 0, the image data is successfully loaded.
         * If the returned status value is 1, the image is successfully decoded.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * The value of the status of the image being loaded successfully.
         * If the returned status value is 0, the image data is successfully loaded.
         * If the returned status value is 1, the image is successfully decoded.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 9
         * @form
         */
        /**
         * The value of the status of the image being loaded successfully.
         * If the returned status value is 0, the image data is successfully loaded.
         * If the returned status value is 1, the image is successfully decoded.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         * @form
         */
        /**
         * The value of the status of the image being loaded successfully.
         * If the returned status value is 0, the image data is successfully loaded.
         * If the returned status value is 1, the image is successfully decoded.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         * @form
         */
        loadingStatus: number;
        /**
         * The width of the picture that is actually drawn.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         * @form
         */
        /**
         * The width of the picture that is actually drawn.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         * @form
         */
        contentWidth: number;
        /**
         * The height of the picture that is actually drawn.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         * @form
         */
        /**
         * The height of the picture that is actually drawn.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         * @form
         */
        contentHeight: number;
        /**
         * The actual draw is offset from the x-axis of the component itself.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         * @form
         */
        /**
         * The actual draw is offset from the x-axis of the component itself.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         * @form
         */
        contentOffsetX: number;
        /**
         * The actual draw is offset from the y-axis of the component itself.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         * @form
         */
        /**
         * The actual draw is offset from the y-axis of the component itself.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         * @form
         */
        contentOffsetY: number;
    }) => void): ImageAttribute;
    /**
     * This callback is triggered when an exception occurs during image loading.
     * The field of "message" carries the detailed information of failed image loading.
     *
     * @param { function } callback
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * This callback is triggered when an exception occurs during image loading.
     * The field of "message" carries the detailed information of failed image loading.
     *
     * @param { function } callback
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * This callback is triggered when an exception occurs during image loading.
     * The field of "message" carries the detailed information of failed image loading.
     *
     * @param { ImageErrorCallback } callback
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    onError(callback: ImageErrorCallback): ImageAttribute;
    /**
     * When the loaded source file is a svg image, this callback is triggered when the playback of the svg image is complete.
     * If the svg image is a wireless loop image, this callback is not triggered.
     *
     * @param { function } event
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * When the loaded source file is a svg image, this callback is triggered when the playback of the svg image is complete.
     * If the svg image is a wireless loop image, this callback is not triggered.
     *
     * @param { function } event
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * When the loaded source file is a svg image, this callback is triggered when the playback of the svg image is complete.
     * If the svg image is a wireless loop image, this callback is not triggered.
     *
     * @param { function } event
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * When the loaded source file is a svg image, this callback is triggered when the playback of the svg image is complete.
     * If the svg image is a wireless loop image, this callback is not triggered.
     *
     * @param { function } event
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    onFinish(event: () => void): ImageAttribute;
    /**
     * Enable image analyzer.
     *
     * @param { boolean} config
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 11
     */
    /**
     * Enable image analyzer.
     *
     * @param { boolean} config
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    enableAnalyzer(enable: boolean): ImageAttribute;
    /**
     * Set image resizable options.
     *
     * @param { ResizableOptions } value - Indicates the resizable options.
     * @returns { ImageAttribute } Returns the instance of the ImageAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Set image resizable options.
     *
     * @param { ResizableOptions } value - Indicates the resizable options.
     * @returns { ImageAttribute } Returns the instance of the ImageAttribute.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    resizable(value: ResizableOptions): ImageAttribute;
    /**
     * Whether to support sensitive privacy information
     *
     * @param { boolean } supported - Whether to support sensitive privacy information.
     * @returns { ImageAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 12
     */
    privacySensitive(supported: boolean): ImageAttribute;
}
/**
 * Defines Image Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Image Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Image Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Image Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Image: ImageInterface;
/**
 * Defines Image Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Image Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Image Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Image Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const ImageInstance: ImageAttribute;
/**
 * @type ImageErrorCallback
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * @type ImageErrorCallback
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
type ImageErrorCallback = (error: ImageError) => void;
/**
 * @interface ImageError
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * @interface ImageError
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * @interface ImageError
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface ImageError {
    /**
     * Component width.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Component width.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Component width.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    componentWidth: number;
    /**
     * Component height.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Component height.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Component height.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    componentHeight: number;
    /**
     * Message.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Message.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    message: string;
}
/**
 * Image resizable options
 *
 * @interface ResizableOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
/**
 * Image resizable options
 *
 * @interface ResizableOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare interface ResizableOptions {
    /**
     * Image slice widths.
     *
     * @type { ?EdgeWidths }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    /**
     * Image slice widths.
     *
     * @type { ?EdgeWidths }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    slice?: EdgeWidths;
}
