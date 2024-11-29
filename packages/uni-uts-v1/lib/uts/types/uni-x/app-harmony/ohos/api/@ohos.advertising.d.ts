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
 * @file Provides the capability to load and display advertisements
 * @kit AdsKit
 */
import type web_webview from './@ohos.web.webview';
import type common from './@ohos.app.ability.common';
import type { Advertisement as _Advertisement } from './advertising/advertisement';
/**
 * Provides the capability to load and display advertisements.
 * @namespace advertising
 * @syscap SystemCapability.Advertising.Ads
 * @since 11
 */
/**
 * Provides the capability to load and display advertisements.
 * @namespace advertising
 * @syscap SystemCapability.Advertising.Ads
 * @atomicservice
 * @since 12
 */
declare namespace advertising {
    /**
     * Indicates the advertisement data model.
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * Indicates the advertisement data model.
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    export type Advertisement = _Advertisement;
    /**
     * The parameters in the request for loading one or more advertisements.
     * @typedef AdRequestParams
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The parameters in the request for loading one or more advertisements.
     * @typedef AdRequestParams
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    export interface AdRequestParams {
        /**
         * The advertisement slot id.
         * @type { string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The advertisement slot id.
         * @type { string }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        adId: string;
        /**
         * The advertisement type of request.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The advertisement type of request.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        adType?: number;
        /**
         * The advertisement quantity of request.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The advertisement quantity of request.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        adCount?: number;
        /**
         * The advertisement view size width that expects.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The advertisement view size width that expects.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        adWidth?: number;
        /**
         * The advertisement view size height that expects.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The advertisement view size height that expects.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        adHeight?: number;
        /**
         * The advertisement search keyword.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The advertisement search keyword.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        adSearchKeyword?: string;
        /**
         * The extended attributes for request parameters.
         * @type { number | boolean | string | undefined }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The extended attributes for request parameters.
         * @type { number | boolean | string | undefined }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        [key: string]: number | boolean | string | undefined;
    }
    /**
     * The ad options of loading ads.
     * @typedef AdOptions
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The ad options of loading ads.
     * @typedef AdOptions
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    export interface AdOptions {
        /**
         * The tags for children's content.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The tags for children's content.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        tagForChildProtection?: number;
        /**
         * Advertisement content classification setting.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Advertisement content classification setting.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        adContentClassification?: string;
        /**
         * Non-personalized ad settings.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Non-personalized ad settings.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        nonPersonalizedAd?: number;
        /**
         * The extended attributes for ad options.
         * @type { number | boolean | string | undefined }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The extended attributes for ad options.
         * @type { number | boolean | string | undefined }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        [key: string]: number | boolean | string | undefined;
    }
    /**
     * The interaction options info for displaying ad.
     * @typedef AdDisplayOptions
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The interaction options info for displaying ad.
     * @typedef AdDisplayOptions
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    export interface AdDisplayOptions {
        /**
         * Ad custom data.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Ad custom data.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        customData?: string;
        /**
         * User id.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * User id.
         * @type { ?string }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        userId?: string;
        /**
         * Indicates whether a dialog box is displayed to notify users of video playback
         * and application download in non-Wi-Fi scenarios.
         * @type { ?boolean }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Indicates whether a dialog box is displayed to notify users of video playback
         * and application download in non-Wi-Fi scenarios.
         * @type { ?boolean }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        useMobileDataReminder?: boolean;
        /**
         * Indicates whether to mute the playback of the ad video.
         * @type { ?boolean }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Indicates whether to mute the playback of the ad video.
         * @type { ?boolean }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        mute?: boolean;
        /**
         * The type of the scenario where the audio focus is obtained during video playback.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The type of the scenario where the audio focus is obtained during video playback.
         * @type { ?number }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        audioFocusType?: number;
        /**
         * The extended attributes for interaction options.
         * @type { number | boolean | string | undefined }
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * The extended attributes for interaction options.
         * @type { number | boolean | string | undefined }
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        [key: string]: number | boolean | string | undefined;
    }
    /**
     * The listener of ad interaction.
     * @interface AdInteractionListener
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The listener of ad interaction.
     * @interface AdInteractionListener
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
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
        /**
         * Ads status callback.
         * @param { string } status - The current ad status. The status contains onAdOpen,onAdClose,onAdReward,onAdClick,onVideoPlayBegin and onVideoPlayEnd.
         * @param { Advertisement } ad - The ad which status is changed.
         * @param { string } data - The data of current ad status.
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        onStatusChanged(status: string, ad: Advertisement, data: string);
    }
    /**
     * The listener of loading ad.
     * @interface AdLoadListener
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The listener of loading ad.
     * @interface AdLoadListener
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    export interface AdLoadListener {
        /**
         * Called by system when the ad load has been failed.
         * @param { number } errorCode - code of ad loading failure.
         * @param { string } errorMsg - error message.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Called by system when the ad load has been failed.
         * @param { number } errorCode - code of ad loading failure.
         * @param { string } errorMsg - error message.
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        onAdLoadFailure(errorCode: number, errorMsg: string): void;
        /**
         * Called by system when the ad load has been succeeded.
         * @param { Array<Advertisement> } ads - advertisements are loaded successfully.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Called by system when the ad load has been succeeded.
         * @param { Array<Advertisement> } ads - advertisements are loaded successfully.
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        onAdLoadSuccess(ads: Array<Advertisement>): void;
    }
    /**
     * The listener of loading multi-slots ad.
     * @interface MultiSlotsAdLoadListener
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The listener of loading multi-slots ad.
     * @interface MultiSlotsAdLoadListener
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    export interface MultiSlotsAdLoadListener {
        /**
         * Called by system when the ad load has been failed.
         * @param { number } errorCode - code of ad loading failure.
         * @param { string } errorMsg - error message.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Called by system when the ad load has been failed.
         * @param { number } errorCode - code of ad loading failure.
         * @param { string } errorMsg - error message.
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        onAdLoadFailure(errorCode: number, errorMsg: string): void;
        /**
         * Called by system when the ad load has been succeeded.
         * @param { Map<string, Array<Advertisement>> } adsMap - advertisements are loaded successfully.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Called by system when the ad load has been succeeded.
         * @param { Map<string, Array<Advertisement>> } adsMap - advertisements are loaded successfully.
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        onAdLoadSuccess(adsMap: Map<string, Array<Advertisement>>): void;
    }
    /**
     * Show the reward and interstitial ad.
     * @param { Advertisement } ad - Indicates the advertisement content information. ad is required.
     * @param { AdDisplayOptions } options - Indicates interaction option object use to show the ad. options is required.
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @throws { BusinessError } 401 - Invalid input parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * @throws { BusinessError } 21800001 - System internal error.
     * @throws { BusinessError } 21800004 - Failed to display the ad.
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * Show the reward and interstitial ad.
     * @param { Advertisement } ad - Indicates the advertisement content information. ad is required.
     * @param { AdDisplayOptions } options - Indicates interaction option object use to show the ad. options is required.
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @throws { BusinessError } 401 - Invalid input parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * @throws { BusinessError } 21800001 - System internal error.
     * @throws { BusinessError } 21800004 - Failed to display the ad.
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    function showAd(ad: Advertisement, options: AdDisplayOptions, context?: common.UIAbilityContext): void;
    /**
     * Provides the functions of loading ads.
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * Provides the functions of loading ads.
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    export class AdLoader {
        /**
         * Constructs a adLoader object, context should be transferred.
         * @param { common.Context } context - Indicates the context of the media application.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Constructs a adLoader object, context should be transferred.
         * @param { common.Context } context - Indicates the context of the media application.
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        constructor(context: common.Context);
        /**
         * Load ad.
         * @param { AdRequestParams } adParam - Indicates the parameters in the request. adParam.adId is required.
         * <br>adParam.adType must be number and valid. adParam.adWidth and adParam.adHeight must be number and greater than zero
         * @param { AdOptions } adOptions - Indicates the ad options.
         * @param { AdLoadListener } listener - Indicates the listener to be registered that use to load ad.
         * @throws { BusinessError } 401 - Invalid input parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed
         * @throws { BusinessError } 21800001 - System internal error.
         * @throws { BusinessError } 21800003 - Failed to load the ad request.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Load ad.
         * @param { AdRequestParams } adParam - Indicates the parameters in the request. adParam.adId is required.
         * <br>adParam.adType must be number and valid. adParam.adWidth and adParam.adHeight must be number and greater than zero
         * @param { AdOptions } adOptions - Indicates the ad options.
         * @param { AdLoadListener } listener - Indicates the listener to be registered that use to load ad.
         * @throws { BusinessError } 401 - Invalid input parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed
         * @throws { BusinessError } 801 - Device not supported.
         * @throws { BusinessError } 21800001 - System internal error.
         * @throws { BusinessError } 21800003 - Failed to load the ad request.
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        loadAd(adParam: AdRequestParams, adOptions: AdOptions, listener: AdLoadListener): void;
        /**
         * Load ad with multi-slots.
         * @param { AdRequestParams[] } adParams - Indicates the parameters in the request. adParam.adId is required.
         * <br>adParam.adType must be number and valid. adParam.adWidth and adParam.adHeight must be number and greater than zero
         * @param { AdOptions } adOptions - Indicates the ad options.
         * @param { MultiSlotsAdLoadListener } listener - Indicates the listener to be registered that use to load ad.
         * @throws { BusinessError } 401 - Invalid input parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed
         * @throws { BusinessError } 21800001 - System internal error.
         * @throws { BusinessError } 21800003 - Failed to load the ad request.
         * @syscap SystemCapability.Advertising.Ads
         * @since 11
         */
        /**
         * Load ad with multi-slots.
         * @param { AdRequestParams[] } adParams - Indicates the parameters in the request. adParam.adId is required.
         * <br>adParam.adType must be number and valid. adParam.adWidth,adParam.adHeight must be number and greater than zero
         * @param { AdOptions } adOptions - Indicates the ad options.
         * @param { MultiSlotsAdLoadListener } listener - Indicates the listener to be registered that use to load ad.
         * @throws { BusinessError } 401 - Invalid input parameter. Possible causes: 1. Mandatory parameters are left unspecified.
         * <br>2. Incorrect parameter types. 3.Parameter verification failed
         * @throws { BusinessError } 801 - Device not supported.
         * @throws { BusinessError } 21800001 - System internal error.
         * @throws { BusinessError } 21800003 - Failed to load the ad request.
         * @syscap SystemCapability.Advertising.Ads
         * @atomicservice
         * @since 12
         */
        loadAdWithMultiSlots(adParams: AdRequestParams[], adOptions: AdOptions, listener: MultiSlotsAdLoadListener): void;
    }
    /**
     * Get message body for ad requesting.
     * @param { AdRequestParams[] } adParams - Indicates the parameters in the request.
     * @param { AdOptions } adOptions - Indicates the ad options.
     * @returns { Promise<string> } The promise of ad request message body.
     * @throws { BusinessError } 401 - Invalid input parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * @throws { BusinessError } 801 - Device not supported.
     * @throws { BusinessError } 21800001 - System internal error.
     * @syscap SystemCapability.Advertising.Ads
     * @since 12
     */
    function getAdRequestBody(adParams: AdRequestParams[], adOptions: AdOptions): Promise<string>;
    /**
     * Pass ad response message and parse into advertisements.
     * @param { string } adResponse - Indicate the ad response message.
     * @param { MultiSlotsAdLoadListener } listener - Indicates the listener to be registered that use to load ad.
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @throws { BusinessError } 401 - Invalid input parameter.Possible causes: 1. Mandatory parameters are left unspecified.
     * @throws { BusinessError } 801 - Device not supported.
     * @throws { BusinessError } 21800001 - System internal error.
     * @throws { BusinessError } 21800005 - Failed to parse the ad response.
     * @syscap SystemCapability.Advertising.Ads
     * @since 12
     */
    function parseAdResponse(adResponse: string, listener: MultiSlotsAdLoadListener, context: common.UIAbilityContext): void;
    /**
     * Register ad javascript proxy interface into webview in order to enable web Ad.
     * @param { web_webview.WebviewController } controller - Indicates webview controller to register ad javascript proxy interface.
     * @param { common.UIAbilityContext } context - Indicates the ui ability context of the media application.
     * @throws { BusinessError } 401 - Invalid input parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * @throws { BusinessError } 21800001 - System internal error.
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    function registerWebAdInterface(controller: web_webview.WebviewController, context: common.UIAbilityContext): void;
}
export default advertising;
