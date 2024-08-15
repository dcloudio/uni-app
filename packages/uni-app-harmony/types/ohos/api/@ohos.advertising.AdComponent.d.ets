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
 * @file Defines the ad component
 * @kit AdsKit
 */
import advertising from './@ohos.advertising';
/**
 * Defines the ad component.
 * @syscap SystemCapability.Advertising.Ads
 * @since 11
 */
/**
 * Defines the ad component.
 * @syscap SystemCapability.Advertising.Ads
 * @atomicservice
 * @since 12
 */
@Component
declare struct AdComponent {
    /**
     * The ads to display.
     * @type { Advertisement[] }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The ads to display.
     * @type { Advertisement[] }
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    ads: advertising.Advertisement[];
    /**
     * The interaction options info for displaying ads.
     * @type { AdDisplayOptions }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The interaction options info for displaying ads.
     * @type { AdDisplayOptions }
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    displayOptions: advertising.AdDisplayOptions;
    /**
     * The interaction listener to be registered that use to show ads.
     * @type { AdInteractionListener }
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The interaction listener to be registered that use to show ads.
     * @type { AdInteractionListener }
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    interactionListener: advertising.AdInteractionListener;
    /**
     * The builder param to render customized ad content.
     * @type { ?() => void }
     * @syscap SystemCapability.Advertising.Ads
     * @since 12
     */
    @BuilderParam
    adRenderer?: () => void;
    /**
     * The method to build ad component.
     * @syscap SystemCapability.Advertising.Ads
     * @since 11
     */
    /**
     * The method to build ad component.
     * @syscap SystemCapability.Advertising.Ads
     * @atomicservice
     * @since 12
     */
    build(): void;
}
export { AdComponent };
