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
 * @kit AdsKit
 */
import type common from './@ohos.app.ability.common';
import type { Advertisement as _Advertisement } from './advertising/advertisement';
/**
 * Provides the capability to load and display advertisements.
 * @namespace advertising
 * @syscap SystemCapability.Advertising.Ads
 * @since 11
 */
declare namespace advertising {
    /**
     * Indicates the advertisement data model.
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    export type Advertisement = _Advertisement;
    /**
     * The parameters in the request for loading one or more advertisements.
     * @typedef AdRequestParams
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    export interface AdRequestParams {
        /**
         * The advertisement slot id.
         * @type { string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        adId: string;
        /**
         * The advertisement type of request.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        adType?: number;
        /**
         * The advertisement quantity of request.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        adCount?: number;
        /**
         * The advertisement view size width that expects.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        adWidth?: number;
        /**
         * The advertisement view size height that expects.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        adHeight?: number;
        /**
         * The advertisement search keyword.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        adSearchKeyword?: string;
        /**
         * The extended attributes for request parameters.
         * @type { number | boolean | string | undefined }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        [key: string]: number | boolean | string | undefined;
    }
    /**
     * The ad options of loading ads.
     * @typedef AdOptions
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    export interface AdOptions {
        /**
         * The tags for children's content.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        tagForChildProtection?: number;
        /**
         * Advertisement content classification setting.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        adContentClassification?: string;
        /**
         * Non-personalized ad settings.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        nonPersonalizedAd?: number;
        /**
         * The extended attributes for ad options.
         * @type { number | boolean | string | undefined }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        [key: string]: number | boolean | string | undefined;
    }
    /**
     * The interaction options info for displaying ad.
     * @typedef AdDisplayOptions
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    export interface AdDisplayOptions {
        /**
         * Ad custom data.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        customData?: string;
        /**
         * User id.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        userId?: string;
        /**
         * Indicates whether a dialog box is displayed to notify users of video playback
         * and application download in non-Wi-Fi scenarios.
         * @type { ?boolean }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        useMobileDataReminder?: boolean;
        /**
         * Indicates whether to mute the playback of the ad video.
         * @type { ?boolean }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        mute?: boolean;
        /**
         * The type of the scenario where the audio focus is obtained during video playback.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        audioFocusType?: number;
        /**
         * The extended attributes for interaction options.
         * @type { number | boolean | string | undefined }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        [key: string]: number | boolean | string | undefined;
    }
    /**
     * The listener of ad interaction.
     * @interface AdInteractionListener
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    export interface AdInteractionListener {
        /**
         * Ads status callback.
         * @param { string } status - The current ad status. The status contains onAdOpen,onAdClose,onAdReward,onAdClick,onVideoPlayBegin and onVideoPlayEnd.
         * @param { Advertisement } ad - The ad which status is changed.
         * @param { string } data - The data of current ad status.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        onStatusChanged(status: string, ad: Advertisement, data: string);
    }
    /**
     * The listener of loading ad.
     * @interface AdLoadListener
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    export interface AdLoadListener {
        /**
         * Called by system when the ad load has been failed.
         * @param { number } errorCode - code of ad loading failure.
         * @param { string } errorMsg - error message.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        onAdLoadFailure(errorCode: number, errorMsg: string): void;
        /**
         * Called by system when the ad load has been succeeded.
         * @param { Array<Advertisement> } ads - advertisements are loaded successfully.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        onAdLoadSuccess(ads: Array<Advertisement>): void;
    }
    /**
     * The listener of loading multi-slots ad.
     * @interface MultiSlotsAdLoadListener
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    export interface MultiSlotsAdLoadListener {
        /**
         * Called by system when the ad load has been failed.
         * @param { number } errorCode - code of ad loading failure.
         * @param { string } errorMsg - error message.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        onAdLoadFailure(errorCode: number, errorMsg: string): void;
        /**
         * Called by system when the ad load has been succeeded.
         * @param { Map<string, Array<Advertisement>> } adsMap - advertisements are loaded successfully.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        onAdLoadSuccess(adsMap: Map<string, Array<Advertisement>>): void;
    }
    /**
     * Show the reward and interstitial ad.
     * @param { Advertisement } ad - Indicates the advertisement content information.
     * @param { AdDisplayOptions } options - Indicates interaction option object use to show the ad.
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @throws { BusinessError } 401 - Invalid input parameter.
     * @throws { BusinessError } 21800001 - System internal error.
     * @throws { BusinessError } 21800004 - Failed to display the ad.
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    function showAd(ad: Advertisement, options: AdDisplayOptions, context?: common.UIAbilityContext): void;
    /**
     * Provides the functions of loading ads.
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    export class AdLoader {
        /**
         * Constructs a adLoader object, context should be transferred.
         * @param { common.Context } context - Indicates the context of the media application.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        constructor(context: common.Context);
        /**
         * Load ad.
         * @param { AdRequestParams } adParam - Indicates the parameters in the request.
         * @param { AdOptions } adOptions - Indicates the ad options.
         * @param { AdLoadListener } listener - Indicates the listener to be registered that use to load ad.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 21800001 - System internal error.
         * @throws { BusinessError } 21800003 - Failed to load the ad request.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        loadAd(adParam: AdRequestParams, adOptions: AdOptions, listener: AdLoadListener): void;
        /**
         * Load ad with multi-slots.
         * @param { AdRequestParams[] } adParams - Indicates the parameters in the request.
         * @param { AdOptions } adOptions - Indicates the ad options.
         * @param { MultiSlotsAdLoadListener } listener - Indicates the listener to be registered that use to load ad.
         * @throws { BusinessError } 401 - Invalid input parameter.
         * @throws { BusinessError } 21800001 - System internal error.
         * @throws { BusinessError } 21800003 - Failed to load the ad request.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        loadAdWithMultiSlots(adParams: AdRequestParams[], adOptions: AdOptions, listener: MultiSlotsAdLoadListener): void;
    }
}
export default advertising;
