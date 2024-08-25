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
 * Provides the interface for scoring bars.
 *
 * @interface RatingInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides the interface for scoring bars.
 *
 * @interface RatingInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Provides the interface for scoring bars.
 *
 * @interface RatingInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Provides the interface for scoring bars.
 *
 * @interface RatingInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface RatingInterface {
    /**
     * Called when a score bar is created.
     *
     * @param { object } options
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when a score bar is created.
     *
     * @param { object } options
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when a score bar is created.
     *
     * @param { object } options
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when a score bar is created.
     *
     * @param { object } options
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (options?: {
        rating: number;
        indicator?: boolean;
    }): RatingAttribute;
}
/**
 * RatingConfiguration used by rating content modifier.
 *
 * @interface RatingConfiguration
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface RatingConfiguration extends CommonConfiguration<RatingConfiguration> {
    /**
     * Current number of Rating.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    rating: number;
    /**
     * Indicates whether Rating is used as an indicator.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    indicator: boolean;
    /**
     * Total stars of Rating.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    stars: number;
    /**
     * The step size of the Rating.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    stepSize: number;
    /**
     * Trigger Rating select change.
     *
     * @type { Callback<number> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    triggerChange: Callback<number>;
}
/**
 * Defines the rating attribute functions.
 *
 * @extends CommonMethod<RatingAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the rating attribute functions.
 *
 * @extends CommonMethod<RatingAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines the rating attribute functions.
 *
 * @extends CommonMethod<RatingAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines the rating attribute functions.
 *
 * @extends CommonMethod<RatingAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class RatingAttribute extends CommonMethod<RatingAttribute> {
    /**
     * Called when the total number of stars is set.
     *
     * @param { number } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the total number of stars is set.
     *
     * @param { number } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the total number of stars is set.
     *
     * @param { number } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the total number of stars is set.
     *
     * @param { number } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    stars(value: number): RatingAttribute;
    /**
     * Called when the step size of the operation rating.
     *
     * @param { number } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the step size of the operation rating.
     *
     * @param { number } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the step size of the operation rating.
     *
     * @param { number } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the step size of the operation rating.
     *
     * @param { number } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    stepSize(value: number): RatingAttribute;
    /**
     * Called when a picture is set.
     *
     * @param { object } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when a picture is set.
     *
     * @param { object } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when a picture is set.
     *
     * @param { object } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when a picture is set.
     *
     * @param { object } value
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    starStyle(value: {
        backgroundUri: string;
        foregroundUri: string;
        secondaryUri?: string;
    }): RatingAttribute;
    /**
     * Called when the star rating of the operation scoring bar changes.
     *
     * @param { function } callback
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the star rating of the operation scoring bar changes.
     *
     * @param { function } callback
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the star rating of the operation scoring bar changes.
     *
     * @param { function } callback
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the star rating of the operation scoring bar changes.
     *
     * @param { function } callback
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    onChange(callback: (value: number) => void): RatingAttribute;
    /**
     * Set the content modifier of rating.
     *
     * @param { ContentModifier<RatingConfiguration> } modifier - The content modifier of rating.
     * @returns { RatingAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    contentModifier(modifier: ContentModifier<RatingConfiguration>): RatingAttribute;
}
/**
 * Defines Rating Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Rating Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Rating Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Rating Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Rating: RatingInterface;
/**
 * Defines Rating Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Rating Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Rating Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Rating Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const RatingInstance: RatingAttribute;
