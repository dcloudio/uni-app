/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
import image from './@ohos.multimedia.image';
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
/**
 * Use the DrawableDescriptor class to get drawable image.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class DrawableDescriptor {
    /**
     * Get pixelMap of drawable image.
     *
     * @returns { image.PixelMap } Return the PixelMap of the calling DrawableDescriptor object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get pixelMap of drawable image.
     *
     * @returns { image.PixelMap } Return the PixelMap of the calling DrawableDescriptor object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Get pixelMap of drawable image.
     *
     * @returns { image.PixelMap } Return the PixelMap of the calling DrawableDescriptor object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getPixelMap(): image.PixelMap;
}
/**
 * Use the LayeredDrawableDescriptor class to get the foreground, the background and the mask DrawableDescriptor.
 *
 * @extends DrawableDescriptor
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Use the LayeredDrawableDescriptor class to get the foreground, the background and the mask DrawableDescriptor.
 *
 * @extends DrawableDescriptor
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
/**
 * Use the LayeredDrawableDescriptor class to get the foreground, the background and the mask DrawableDescriptor.
 *
 * @extends DrawableDescriptor
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class LayeredDrawableDescriptor extends DrawableDescriptor {
    /**
     * Creates a new LayeredDrawableDescriptor.
     *
     * @param { DrawableDescriptor } [foreground] - Indicates the foreground option to create LayeredDrawableDescriptor.
     * @param { DrawableDescriptor } [background] - Indicates the background option to create LayeredDrawableDescriptor.
     * @param { DrawableDescriptor } [mask] - Indicates the mask option to create LayeredDrawableDescriptor.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    constructor(foreground?: DrawableDescriptor, background?: DrawableDescriptor, mask?: DrawableDescriptor);
    /**
     * Get DrawableDescriptor for the foreground.
     *
     * @returns { DrawableDescriptor } Return the DrawableDescriptor object of foreground.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get DrawableDescriptor for the foreground.
     *
     * @returns { DrawableDescriptor } Return the DrawableDescriptor object of foreground.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Get DrawableDescriptor for the foreground.
     *
     * @returns { DrawableDescriptor } Return the DrawableDescriptor object of foreground.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getForeground(): DrawableDescriptor;
    /**
     * Get DrawableDescriptor for the background.
     *
     * @returns { DrawableDescriptor } Return the DrawableDescriptor object of background.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get DrawableDescriptor for the background.
     *
     * @returns { DrawableDescriptor } Return the DrawableDescriptor object of background.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Get DrawableDescriptor for the background.
     *
     * @returns { DrawableDescriptor } Return the DrawableDescriptor object of background.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getBackground(): DrawableDescriptor;
    /**
     * Get DrawableDescriptor for the mask.
     *
     * @returns { DrawableDescriptor } Return the DrawableDescriptor object of mask.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get DrawableDescriptor for the mask.
     *
     * @returns { DrawableDescriptor } Return the DrawableDescriptor object of mask.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Get DrawableDescriptor for the mask.
     *
     * @returns { DrawableDescriptor } Return the DrawableDescriptor object of mask.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getMask(): DrawableDescriptor;
    /**
     * Get the clip path info of the adaptive icon mask.
     *
     * @returns { string } Return the clip path info of mask.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get the clip path info of the adaptive icon mask.
     *
     * @returns { string } Return the clip path info of mask.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    /**
     * Get the clip path info of the adaptive icon mask.
     *
     * @returns { string } Return the clip path info of mask.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    static getMaskClipPath(): string;
}
/**
 * Use the PixelMapDrawableDescriptor class to get the resource of pixelmap or resource descriptor information.
 *
 * @extends DrawableDescriptor
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
export class PixelMapDrawableDescriptor extends DrawableDescriptor {
    /**
     * Creates a new PixelMapDrawableDescriptor.
     * @param { image.PixelMap } src - Indicates the resource to create PixelMapDrawableDescriptor.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    constructor(src?: image.PixelMap);
}
/**
 * Animation control options
 *
 * @interface AnimationOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare interface AnimationOptions {
    /**
     * The duration of animation playback once.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    duration?: number;
    /**
     * Animation playback times.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    iterations?: number;
}
/**
 * Define the data structure for PixelMap animations.
 *
 * @extends DrawableDescriptor
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class AnimatedDrawableDescriptor extends DrawableDescriptor {
    /**
     * Creates a new AnimatedDrawableDescriptor.
     *
     * @param { Array<image.PixelMap> } pixelMaps - PixelMap List.
     * @param { AnimationOptions } [options] - Animation control options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor(pixelMaps: Array<image.PixelMap>, options?: AnimationOptions);
}
