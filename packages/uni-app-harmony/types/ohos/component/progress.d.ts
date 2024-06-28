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
 * Defines the option of Progress.
 *
 * @interface ProgressOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the option of Progress.
 *
 * @interface ProgressOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the option of Progress.
 *
 * @interface ProgressOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the option of Progress.
 *
 * @interface ProgressOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface ProgressOptions<Type extends keyof ProgressStyleMap> {
    /**
     * Sets the value of Progress.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the value of Progress.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the value of Progress.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the value of Progress.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    value: number;
    /**
     * Sets the total of Progress.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Sets the total of Progress.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the total of Progress.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the total of Progress.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    total?: number;
    /**
     * Sets the style of Progress.
     *
     * @type { ?ProgressStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 8
     * @useinstead type
     */
    style?: ProgressStyle;
    /**
     * Sets the type of Progress.
     *
     * @type { ?Type }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the type of Progress.
     *
     * @type { ?Type }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the type of Progress.
     *
     * @type { ?Type }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the type of Progress.
     *
     * @type { ?Type }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    type?: Type;
}
/**
 * Type of progress bar
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Type of progress bar
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Type of progress bar
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Type of progress bar
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare enum ProgressType {
    /**
     * Linear progress bar style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Linear progress bar style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Linear progress bar style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Linear progress bar style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Linear = 0,
    /**
     * Ring progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Ring progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Ring progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Ring progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Ring = 1,
    /**
     * Eclipse progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Eclipse progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Eclipse progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Eclipse progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Eclipse = 2,
    /**
     * ScaleRing progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * ScaleRing progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * ScaleRing progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * ScaleRing progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    ScaleRing = 3,
    /**
     * Capsule progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Capsule progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Capsule progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Capsule progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Capsule = 4
}
/**
 * Current status of progress bar.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Current status of progress bar.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum ProgressStatus {
    /**
     * Loading status.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Loading status.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    LOADING,
    /**
     * Processing status.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Processing status.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    PROGRESSING
}
/**
 * Defines style options for progress component.
 *
 * @interface ProgressStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines style options for progress component.
 *
 * @interface ProgressStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines style options for progress component.
 *
 * @interface ProgressStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines style options for progress component.
 *
 * @interface ProgressStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface ProgressStyleOptions extends CommonProgressStyleOptions {
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    strokeWidth?: Length;
    /**
     * Defines the scaleCount property.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Defines the scaleCount property.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Defines the scaleCount property.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Defines the scaleCount property.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    scaleCount?: number;
    /**
     * Defines the scaleWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Defines the scaleWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Defines the scaleWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Defines the scaleWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    scaleWidth?: Length;
}
/**
 * Progress common style options.
 *
 * @interface CommonProgressStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Progress common style options.
 *
 * @interface CommonProgressStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface CommonProgressStyleOptions {
    /**
     * Enable smooth effect.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Enable smooth effect.
     *
     * @type { ?boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enableSmoothEffect?: boolean;
}
/**
 * Defines the enable scan effect.
 *
 * @interface ScanEffectOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the enable scan effect.
 *
 * @interface ScanEffectOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface ScanEffectOptions {
    /**
     * Enable scan effect.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Enable scan effect.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    enableScanEffect?: boolean;
}
/**
 * Defines the Eclipse style Options.
 *
 * @interface EclipseStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the Eclipse style Options.
 *
 * @interface EclipseStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare interface EclipseStyleOptions extends CommonProgressStyleOptions {
}
/**
 * Defines the ScaleRing style Options.
 *
 * @interface ScaleRingStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the ScaleRing style Options.
 *
 * @interface ScaleRingStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface ScaleRingStyleOptions extends CommonProgressStyleOptions {
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    strokeWidth?: Length;
    /**
     * Defines the scaleWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the scaleWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scaleWidth?: Length;
    /**
     * Defines the scaleCount property.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the scaleCount property.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    scaleCount?: number;
}
/**
 * Defines the ring style Options.
 *
 * @interface RingStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the ring style Options.
 *
 * @interface RingStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface RingStyleOptions extends ScanEffectOptions, CommonProgressStyleOptions {
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    strokeWidth?: Length;
    /**
     * Enables progress shadow.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Enables progress shadow.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    shadow?: boolean;
    /**
     * The status of progress, default is PROGRESSING. Set to LOADING status will trigger the loading animation.
     *
     * @type { ?ProgressStatus }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The status of progress, default is PROGRESSING. Set to LOADING status will trigger the loading animation.
     *
     * @type { ?ProgressStatus }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    status?: ProgressStatus;
}
/**
 * Defines the linear style Options.
 *
 * @interface LinearStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the linear style Options.
 *
 * @interface LinearStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface LinearStyleOptions extends ScanEffectOptions, CommonProgressStyleOptions {
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the strokeWidth property.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    strokeWidth?: Length;
    /**
     * Defines the stroke radius property.
     *
     * @type { ?(PX | VP | LPX | Resource) }
     * @default strokeWidth / 2
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the stroke radius property.
     *
     * @type { ?(PX | VP | LPX | Resource) }
     * @default strokeWidth / 2
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    strokeRadius?: PX | VP | LPX | Resource;
}
/**
 * Defines the capsule style Options.
 *
 * @interface CapsuleStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the capsule style Options.
 *
 * @interface CapsuleStyleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface CapsuleStyleOptions extends ScanEffectOptions, CommonProgressStyleOptions {
    /**
     * Set the inner border color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set the inner border color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    borderColor?: ResourceColor;
    /**
     * Set the border width.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set the border width.
     *
     * @type { ?Length }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    borderWidth?: Length;
    /**
     * Set the text content.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set the text content.
     *
     * @type { ?string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    content?: string;
    /**
     * Set the text style.
     *
     * @type { ?Font }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set the text style.
     *
     * @type { ?Font }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    font?: Font;
    /**
     * Set the text fontColor.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set the text fontColor.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    fontColor?: ResourceColor;
    /**
     * show default percentage.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * show default percentage.
     *
     * @type { ?boolean }
     * @default false
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    showDefaultPercentage?: boolean;
}
/**
 * Type of progress bar
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Type of progress bar
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Type of progress bar
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Type of progress bar
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare enum ProgressStyle {
    /**
     * Linear progress bar style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Linear progress bar style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Linear progress bar style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Linear progress bar style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Linear,
    /**
     * Ring progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Ring progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Ring progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Ring progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Ring,
    /**
     * Eclipse progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Eclipse progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Eclipse progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Eclipse progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Eclipse,
    /**
     * ScaleRing progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * ScaleRing progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * ScaleRing progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * ScaleRing progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    ScaleRing,
    /**
     * Capsule progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Capsule progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Capsule progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Capsule progress bar.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    Capsule
}
/**
 * Defines the map for progress type and style.
 *
 * @interface ProgressStyleMap
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the map for progress type and style.
 *
 * @interface ProgressStyleMap
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare interface ProgressStyleMap {
    /**
     * Defines the map for Linear progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the map for Linear progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    [ProgressType.Linear]: LinearStyleOptions | ProgressStyleOptions;
    /**
     * Defines the map for Ring progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the map for Ring progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    [ProgressType.Ring]: RingStyleOptions | ProgressStyleOptions;
    /**
     * Defines the map for Eclipse progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the map for Eclipse progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    [ProgressType.Eclipse]: EclipseStyleOptions | ProgressStyleOptions;
    /**
     * Defines the map for ScaleRing progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the map for ScaleRing progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    [ProgressType.ScaleRing]: ScaleRingStyleOptions | ProgressStyleOptions;
    /**
     * Defines the map for Capsule progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Defines the map for Capsule progress.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    [ProgressType.Capsule]: CapsuleStyleOptions | ProgressStyleOptions;
}
/**
 * Provides the progress bar interface.
 *
 * @interface ProgressInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides the progress bar interface.
 *
 * @interface ProgressInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Provides the progress bar interface.
 *
 * @interface ProgressInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Provides the progress bar interface.
 *
 * @interface ProgressInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface ProgressInterface {
    /**
     * Called when the progress bar is set.
     *
     * @param { ProgressOptions<Type> } options
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the progress bar is set.
     *
     * @param { ProgressOptions<Type> } options
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the progress bar is set.
     *
     * @param { ProgressOptions<Type> } options
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the progress bar is set.
     *
     * @param { ProgressOptions<Type> } options
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    <Type extends keyof ProgressStyleMap>(options: ProgressOptions<Type>): ProgressAttribute<Type>;
}
/**
 * Defines the progress attribute functions.
 *
 * @extends CommonMethod<ProgressAttribute<Type>>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the progress attribute functions.
 *
 * @extends CommonMethod<ProgressAttribute<Type>>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the progress attribute functions.
 *
 * @extends CommonMethod<ProgressAttribute<Type>>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the progress attribute functions.
 *
 * @extends CommonMethod<ProgressAttribute<Type>>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class ProgressAttribute<Type extends keyof ProgressStyleMap = keyof ProgressStyleMap, Style extends ProgressStyleMap[Type] = ProgressStyleMap[Type]> extends CommonMethod<ProgressAttribute<Type>> {
    /**
     * Called when the current progress value is set.
     *
     * @param { number } value
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the current progress value is set.
     *
     * @param { number } value
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the current progress value is set.
     *
     * @param { number } value
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the current progress value is set.
     *
     * @param { number } value
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    value(value: number): ProgressAttribute<Type>;
    /**
     * Called when the progress bar foreground is set.
     *
     * @param { ResourceColor | LinearGradient } value
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the progress bar foreground is set.
     *
     * @param { ResourceColor | LinearGradient } value
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the progress bar foreground is set.
     *
     * @param { ResourceColor | LinearGradient } value - indicates the color of the progress.
     * @returns { ProgressAttribute<Type> } the attribute of the progress.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the progress bar foreground is set.
     *
     * @param { ResourceColor | LinearGradient } value - indicates the color of the progress.
     * @returns { ProgressAttribute<Type> } the attribute of the progress.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    color(value: ResourceColor | LinearGradient): ProgressAttribute<Type>;
    /**
     * Called when the style of progress bar is set.
     *
     * @param { Style } value
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Called when the style of progress bar is set.
     *
     * @param { Style } value
     * @returns { ProgressAttribute<Type> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the style of progress bar is set.
     *
     * @param { Style } value - indicates the style of the progress.
     * @returns { ProgressAttribute<Type> } the attribute of the progress.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the style of progress bar is set.
     *
     * @param { Style } value - indicates the style of the progress.
     * @returns { ProgressAttribute<Type> } the attribute of the progress.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    style(value: Style): ProgressAttribute<Type>;
    /**
     * Set the contentModifier of progress.
     *
     * @param { ContentModifier<ProgressConfiguration> } modifier - The contentModifier of progress.
     * @returns { ProgressAttribute<Type> } the attribute of the progress.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentModifier(modifier: ContentModifier<ProgressConfiguration>): ProgressAttribute<Type>;
    /**
     * Sets if mark to privacy sensitive.
     *
     * @param { Optional<boolean> } isPrivacySensitiveMode - indicates if mark to privacy sensitive.
     * @returns { ProgressAttribute<Type> } the attribute of the progress.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    privacySensitive(isPrivacySensitiveMode: Optional<boolean>): ProgressAttribute<Type>;
}
/**
 * ProgressConfiguration used by progress contentModifier
 *
 * @interface ProgressConfiguration
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface ProgressConfiguration extends CommonConfiguration<ProgressConfiguration> {
    /**
     * The value of Progress.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    value: number;
    /**
     * The total of Progress.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    total: number;
}
/**
 * Defines Progress Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Progress Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Progress Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Progress Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Progress: ProgressInterface;
/**
 * Defines Progress Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Progress Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Progress Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Progress Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const ProgressInstance: ProgressAttribute<keyof ProgressStyleMap>;
